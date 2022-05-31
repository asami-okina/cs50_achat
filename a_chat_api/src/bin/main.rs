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

    // type PcProfileInfo = HashMap<String, String>;
    
    // let mut pc_profileInfo:PcProfileInfo = HashMap::new();
    // pc_profileInfo.insert(String::from("userId"), String::from("pcAsami"));
    // pc_profileInfo.insert(String::from("nickName"), String::from("あさみん"));
    // pc_profileInfo.insert(String::from("profileImage"), String::from("https://pbs.twimg.com/profile_images/1257586310077796352/XWNIr3Fr_400x400.jpg"));
    // pc_profileInfo.insert(String::from("searchFlag"), String::from("true"));
        
}
// 会員登録
async fn sign_up(body_json: Json<Value>) -> Json<Value> {
    // user_idの取得
    let user_id = match body_json.0.get("user_id") {
        Some(user_id) => user_id,
        None => panic!("error")
    };
    // mailの取得
    let _mail = match body_json.0.get("mail") {
        Some(mail) => mail,
        None => panic!("error")
    };
    // passwordの取得
    let _password = match body_json.0.get("password") {
        Some(password) => password,
        None => panic!("error")
    };
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

