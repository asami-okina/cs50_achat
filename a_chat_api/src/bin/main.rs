use axum::{
    routing::get,
    routing::post,
    Router,
    response::Json,
    extract::Path,
    response,
    extract,
};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use serde::{Serialize, Deserialize};
use std::net::SocketAddr;
use std::error::Error;
use std::collections::HashMap;
use serde_json::{Value, json};


#[tokio::main]
async fn main() {
    //単一ルートでアプリケーションを構築する
        // handler: 何らかの処理要求が発生した時に起動されるプログラムのこと
        // handlerはアプリケーションのロジックが存在する場所
        let app = Router::new()
        .route("/users/:user_id/posts/:post_id", get(user_post))
        .route("/foo", get(get_foo).post(post_foo))
        .route("/foo/bar", get(foo_bar));

    // localhost:3000 で hyper と共に実行する
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

// 会員登録
struct Name {
    name: String,
}

// Serializeすれば、RustオブジェクトからJSONに変換
#[derive(Serialize)]
struct Message {
    message: String,
}

// シリアライズ: オブジェクトをJSONに変換
// デシリアライズ: JSONをオブジェクトに変換
#[derive(Debug, Deserialize, Serialize)]
struct Params {
    user_id: u64,
    post_id: String,
}

async fn user_post(Path(params): Path<Params>) -> Json<Value> {
    let user_id = params.user_id;
    let post_id = params.post_id;
    Json(json!({ "user_id": user_id, "post_id": post_id }))
}

async fn get_foo() {}
async fn post_foo() {}
async fn foo_bar() {}