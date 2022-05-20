use axum::{
    routing::get,
    routing::post,
    Router,
    response::Json,
    extract::Path,
};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use serde::{Serialize, Deserialize};
use serde_json::{Value, json};


#[tokio::main]
async fn main() {
    //単一ルートでアプリケーションを構築する
        // handler: 何らかの処理要求が発生した時に起動されるプログラムのこと
        // handlerはアプリケーションのロジックが存在する場所
        let app = Router::new()
        .route("/api/signup/isAvailableUserIdValidation/:user_id", get(is_available_user_id_validation))
        .route("/api/signup", post(sign_up))
        .route("/api/login", post(log_in));

    // localhost:3000 で hyper と共に実行する
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
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
    Json(json!({ "user_id": user_id }))
}