use axum::{
    routing::get,
    routing::post,
    Router,
    response::Json,
    extract::{Path,Query},
    http::{Request, header::HeaderMap},
    body::{Bytes, Body},
};
mod component;
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use serde::{Serialize, Deserialize};
use serde_json::{Value, json};
use std::collections::HashMap;


use diesel::prelude::*;
use a_chat_api::utils::establish_connection;

#[tokio::main]
async fn main() {
    // 外部モジュールの呼び出し(2015年版)
    // component::header::headers();
    //単一ルートでアプリケーションを構築する
        // handler: 何らかの処理要求が発生した時に起動されるプログラムのこと
        // handlerはアプリケーションのロジックが存在する場所
        let app = Router::new()
        .route("/api/signup/isAvailableUserIdValidation/:user_id", get(is_available_user_id_validation))
        .route("/api/signup", post(sign_up))
        .route("/api/login", post(log_in))
        .route("/api/users/:user_id/home", get(search_name));

    // localhost:3000 で hyper と共に実行する
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
        
}

// 会員登録
async fn sign_up(body_json: Json<Value>) -> Json<Value> {
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

    use a_chat_api::models::get_user;

    // // DBへの追加
    // use a_chat_api::models::NewUser;
    // use a_chat_api::schema::user as user_schema;
    // let connection = establish_connection();
    // let new_user = 
    //     NewUser {achat.monster
    //         id: user_id.to_string(),
    //         nickname: None,
    //         mail: mail.to_string(),
    //         password:password.to_string(),
    //         profile_image: None,
    //         delete_flag: false,
    //         search_flag: true,
    //         created_at: 1654063149,
    //         updated_at: None
    //     };

    // // INSERT処理を実行
    // diesel::insert_into(user_schema::dsl::user)
    //     .values(new_user)
    //     .execute(&connection)
    //     .expect("Error saving new user");
    println!("{:?}",get_user());

    Json(json!({ "user_id": user_id }))
}

// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
#[derive(Debug, Deserialize, Serialize)]
struct IsAvailableUserIdValidationParams {
    user_id: String,
}

// userIdがあれば、登録するユーザーIDが使用可能かどうかチェック
async fn is_available_user_id_validation(Path(params): Path<IsAvailableUserIdValidationParams>) -> Json<Value> {
    let user_id = params.user_id;
    Json(json!({ "user_id": user_id  }))
}
// ログイン
async fn log_in(body_json: Json<Value>) -> Json<Value> {
    // mailの取得
    let mail = match body_json.0.get("mail") {
        Some(mail) => mail,
        None => panic!("error")
    };
    // passwordの取得
    let _password = match body_json.0.get("password") {
        Some(password) => password,
        None => panic!("error")
    };
    let mut user_id = "";

    if mail == "pcAsami@g.com" {
		user_id = "pcAsami"
	}
	if mail == "spAsami@g.com" {
		user_id = "spAsami"
	}
    Json(json!({ "user_id": user_id, "certificationResult": true }))
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

