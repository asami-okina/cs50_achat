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
        .route("/api/getAllUsers", get(handler_fetch_all_users))
        .route("/api/signup", post(handler_sign_up))
        .route("/api/signup/isAvailableUserIdValidation/:user_id", get(handler_is_available_user_id_validation))
        .route("/api/login", post(handler_log_in))
        .route("/api/users/:user_id/home", get(handler_search_name))
        .route("/api/users/:user_id/groups", get(handler_fetch_group_list));

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
async fn handler_fetch_all_users() -> Json<Value> {
    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let users = fetch_all_users(&pool).await.unwrap();
    Json(json!({ "users": users }))
}

// SQL実行部分
use a_chat_api::models::User;
async fn fetch_all_users(pool: &MySqlPool) -> anyhow::Result<Vec<User>> {
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

// SQL実行部分
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

// SQL実行部分
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

// SQL実行部分
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

/*
  ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
*/
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

// handler
async fn handler_search_name(
    Path(params): Path<SearchNameParams>,
    search_name_query: Option<Query<SearchNameQuery>>,
) -> Json<Value> {
    let user_id = params.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(search_name_query) = search_name_query.unwrap_or_default();
    let search_text = search_name_query.search_text;

    // friends
    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let friends = search_name_friends(&pool, &user_id, &search_text).await.unwrap();
    
    // groups
    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let groups = search_name_groups(&pool, &user_id, &search_text).await.unwrap();
    Json(json!({ "friends": friends, "groups": groups  }))
}

#[derive(Debug, Deserialize, Serialize)]
struct SearchNameFriendListResult {
    direct_chat_room_id: String,
    friend_use_id: String,
    friend_profile_image: Option<String>,
    friend_nickname: Option<String>
}

// SQL実行部分(Friends)
async fn search_name_friends(pool: &MySqlPool, user_id: &str, search_text: &str) -> anyhow::Result<Vec<SearchNameFriendListResult>> {
    // 取得したいデータ
    // "direct_chat_room_id": "1",
    // "friend_use_id": "asami111",
    // "friend_profile_image": null,
    // "friend_nickname": "検索結果name"
    
    // 条件
    // ①userテーブルのnicknameが一致
    // ②followテーブルのfrom_user_idが自分の場合のto_user_idが友達のuser_id
    // ②direct_memberテーブルのdeleteフラグがfalseである(非表示の友達も表示する)
    let search_name_friend_list = sqlx::query!(
        r#"
            SELECT
                u.id as friend_user_id,
                u.nickname as friend_nickname,
                u.profile_image as friend_profile_image,
                f.direct_chat_room_id as direct_chat_room_id
            FROM
                user as u
                LEFT JOIN
                    follow as f
                ON  u.id = f.to_user_id
            WHERE
                u.id IN(
                    SELECT
                        id
                    FROM
                        user
                    WHERE
                        nickname = ?
                )
            AND u.id IN(
                    SELECT
                        f.to_user_id
                    FROM
                        follow as f
                    WHERE
                        f.from_user_id = ?
                )
            AND f.direct_chat_room_id IN(
                    SELECT
                        direct_chat_room_id
                    FROM
                        direct_member
                    WHERE
                        user_id = ?
                )
        "#,
        search_text,
        user_id,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut result:Vec<SearchNameFriendListResult> = vec![];

    for row in &search_name_friend_list {
        let friend = SearchNameFriendListResult {
            direct_chat_room_id: row.direct_chat_room_id.unwrap().to_string(),
            friend_use_id: row.friend_user_id.to_string(),
            friend_profile_image:  match &row.friend_profile_image {
                Some(friend_profile_image) => Some(friend_profile_image.to_string()),
                None => None
            },
            friend_nickname:  match &row.friend_nickname {
                Some(friend_nickname) => Some(friend_nickname.to_string()),
                None => None
            },
          };
          result.push(friend);
    }

    Ok(result)
}

#[derive(Debug, Deserialize, Serialize)]
struct SearchNameGroupListResult {
    group_chat_room_id: String,
    group_name: String,
    group_image: Option<String>
}

// SQL実行部分(Groups)
async fn search_name_groups(pool: &MySqlPool, user_id: &str, search_text: &str) -> anyhow::Result<Vec<SearchNameGroupListResult>> {
    // 取得したいデータ
    // "group_chat_room_id": "12",
    // "group_name": "検索結果グループ",
    // "group_image": null)
    
    // 条件
    // ①group_memberテーブルのuser_idが自分のuser_idであるかつdelete_flagとhidden_flagがfalseであるgroup_chat_room_id
    // ②①の取得結果のgroup_chat_room_idのうち、group_nameが一致
    let search_name_group_list = sqlx::query!(
        r#"
            SELECT
            g.id as group_chat_room_id,
            g.group_name as group_name,
            g.group_image as group_image
            FROM
                group_chat_room as g
                LEFT JOIN
                    group_member as gm
                ON  g.id = gm.group_chat_room_id
            WHERE
                gm.user_id = ?
            AND gm.leave_flag = FALSE
            AND g.group_name = ?
            AND g.delete_flag = FALSE
        "#,
        user_id,
        search_text
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut result:Vec<SearchNameGroupListResult> = vec![];

    for row in &search_name_group_list {
        let group = SearchNameGroupListResult {
            group_chat_room_id: row.group_chat_room_id.to_string(),
            group_name: row.group_name.to_string(),
            group_image:  match &row.group_image {
                Some(group_image) => Some(group_image.to_string()),
                None => None
            },
          };
          result.push(group);
    }

    Ok(result)
}

/*
  ユーザが所属するグループ一覧
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
struct FetchGroupListParams {
    user_id: String,
}
async fn handler_fetch_group_list(Path(params): Path<FetchGroupListParams>) -> Json<Value> {
    let user_id = params.user_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let group_list = fetch_group_list(&pool, &user_id).await.unwrap();
    Json(json!({ "groups": group_list }))
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchGroupListResult {
    group_chat_room_id: String,
    group_name: String,
    group_image: Option<String>
}

// SQL実行部分(Groups)
async fn fetch_group_list(pool: &MySqlPool, user_id:&str) -> anyhow::Result<Vec<FetchGroupListResult>>{
    let group_list = sqlx::query!(
        r#"
            SELECT
                g.id as group_chat_room_id,
                g.group_name as group_name,
                g.group_image as group_image
            FROM
                group_chat_room as g
                LEFT JOIN
                    group_member as gm
                ON  g.id = gm.group_chat_room_id
            WHERE
                gm.user_id = ?
            AND gm.leave_flag = FALSE
            AND g.delete_flag = FALSE
        "#,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut result:Vec<FetchGroupListResult> = vec![];

    for row in &group_list {
        let group = FetchGroupListResult {
            group_chat_room_id: row.group_chat_room_id.to_string(),
            group_name: row.group_name.to_string(),
            group_image:  match &row.group_image {
                Some(group_image) => Some(group_image.to_string()),
                None => None
            },
          };
          result.push(group);
    }
    Ok(result)
}