use axum::{
    routing::get,
    routing::post,
    Router,
    response::Json,
    extract::{Path,Query},
};
mod component;
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use serde::{Serialize, Deserialize};
use serde_json::{Value, json};

use sqlx::mysql::MySqlPool;
use std::env;
use dotenv::dotenv;
use std::time::SystemTime;

#[tokio::main]
async fn main(){
    // .endファイルの中身の変数を取得し、環境変数として使用できるようにする
    dotenv().ok();
    // 外部モジュールの呼び出し(2015年版)
    // component::header::headers();
    //単一ルートでアプリケーションを構築する
    // handler: 何らかの処理要求が発生した時に起動されるプログラムのこと
    // handlerはアプリケーションのロジックが存在する場所
    let app = Router::new()
        .route("/api/getAllUsers", get(handler_get_all_users))
        .route("/api/signup", post(handler_sign_up))
        .route("/api/signup/isAvailableUserIdValidation/:user_id", get(handler_is_available_user_id_validation))
        .route("/api/login", post(handler_log_in))
        .route("/api/users/:user_id/home", get(search_name));

    // localhost:3000 で hyper と共に実行する
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
        
}

/*
  全ユーザ情報を取得
*/
// handler
async fn handler_get_all_users() -> Json<Value> {
    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let users = get_all_users(&pool).await.unwrap();
    Json(json!({ "users": users }))
}

// SQL実行部分
use a_chat_api::models::User;
async fn get_all_users(pool: &MySqlPool) -> anyhow::Result<Vec<User>> {
    let users = sqlx::query!(
        r#"
            SELECT *
            FROM user
        "#
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut result:Vec<User> = vec![];

    for row in &users {
        let user = User {
            id: row.id.to_string(),
            nickname:  match &row.nickname {
                Some(nickname) => Some(nickname.to_string()),
                None => None
            },
            mail: row.mail.to_string(),
            password: row.password.to_string(),
            profile_image:  match &row.profile_image {
                Some(profile_image) => Some(profile_image.to_string()),
                None => None
            },
            delete_flag: if row.delete_flag == 1 {true} else {false},
            search_flag: if row.search_flag == 1 {true} else {false},
            created_at: row.created_at,
            updated_at: row.updated_at
          };
          result.push(user);
    }
    Ok(result)
}

/*
  会員登録
*/
// handler
async fn handler_sign_up(body_json: Json<Value>) -> Json<Value> {
    // user_idの取得
    let user_id = body_json.0.get("user_id")
    .unwrap()
    .as_str()
    .unwrap();

    // mailの取得
    let mail = body_json.0.get("mail")
    .unwrap()
    .as_str()
    .unwrap();

    // passwordの取得
    let password = body_json.0.get("password")
    .unwrap()
    .as_str()
    .unwrap();

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    sign_up(&pool, user_id, mail, password).await.unwrap();

    Json(json!({ "user_id": user_id }))
}

// 会員登録
async fn sign_up(pool: &MySqlPool, user_id:&str, mail: &str, password: &str) -> anyhow::Result<()> {
    let now = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs();
    sqlx::query!(
        r#"
INSERT INTO user ( id, mail, password, created_at )
VALUES ( ?, ? , ? , ? )
        "#,
        user_id,
        mail,
        password,
        now
    )
    .execute(pool)
    .await
    .unwrap();
    
    Ok(())
}

/*
  登録するユーザーIDが使用可能かどうかチェック
*/
// handler
async fn handler_is_available_user_id_validation(Path(params): Path<IsAvailableUserIdValidationParams>) -> Json<Value> {
    let user_id = params.user_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let is_available_user_id_validation = is_available_user_id_validation(&pool, &user_id).await.unwrap();
    Json(json!({ "is_available_user_id_validation": is_available_user_id_validation }))
}

#[derive(Debug, Deserialize, Serialize)]
struct IsAvailableUserIdValidationParams {
    user_id: String,
}

// userIdがあれば、登録するユーザーIDが使用可能かどうかチェック
async fn is_available_user_id_validation(pool: &MySqlPool, user_id:&str) -> anyhow::Result<bool>{
    let user = sqlx::query!(
        r#"
            SELECT *
            FROM user
            WHERE id = ?
        "#,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let result;

    if user.len() == 0 {
        // まだ該当user_idは使用されていない
        result = true
    } else {
        // 既に該当user_idは使用されている
        result = false
    }
    Ok(result)
}

/*
  ログイン
*/
#[derive(Debug, Deserialize, Serialize)]
struct LoginResult {
    user_id: Option<String>,
    certification_result: bool
}

// handler
async fn handler_log_in(body_json: Json<Value>) -> Json<Value> {
    // mailの取得
    let mail = body_json.0.get("mail")
    .unwrap()
    .as_str()
    .unwrap();

    // passwordの取得
    let password = body_json.0.get("password")
    .unwrap()
    .as_str()
    .unwrap();

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let result = log_in(&pool, &mail, &password).await.unwrap();
    Json(json!({ "user_id": result.user_id, "certification_result": result.certification_result }))
}

// ログイン
async fn log_in(pool: &MySqlPool, mail: &str, password: &str ) -> anyhow::Result<LoginResult> {
    let user = sqlx::query!(
        r#"
            SELECT *
            FROM user
            WHERE mail = ? AND password = ?
        "#,
        mail,
        password
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let result;

    if user.len() == 0 {
        // まだ会員登録されていない
        result = LoginResult {
            user_id : None ,
            certification_result: false
        }
    } else {
        // 既に会員登録されている
        result = LoginResult {
            user_id : Some(user[0].id.to_string()) ,
            certification_result: true
        }
    }
    Ok(result)
}

#[derive(Debug, Deserialize, Serialize)]
struct SearchNameParams {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct SearchNameQuery {
    search_text: String,
}

// デフォルト値の取得
impl Default for SearchNameQuery {
    fn default() -> Self {
        Self { search_text: String::from("") }
    }
}

async fn search_name(
    Path(params): Path<SearchNameParams>,
    search_name_query: Option<Query<SearchNameQuery>>,
) -> Json<Value> {
    let user_id = params.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(search_name_query) = search_name_query.unwrap_or_default();
    Json(json!({ "user_id": user_id, "search_text": search_name_query.search_text  }))
}


// ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
// queryとPathは両立できないため、どちらか1つしか利用できない(https://docs.rs/axum/0.5.6/axum/extract/index.html#extracting-request-bodies)
// async fn search_name(Query(params): Query<HashMap<String, String>>)-> Json<Value> {
//     // search_textの取得
    // let _search_text = match  params.get("search_text") {
    //     Some(search_text) => search_text,
    //     None => panic!("error")
    // };
//     // user_idの取得
//     let user_id = match  params.get("user_id") {
//         Some(user_id) => user_id,
//         None => panic!("error")
//     };

//     Json(json!({ "user_id": user_id  }))
// }

