use axum::{
    routing::get,
    Router,
};

#[tokio::main]
async fn main() {
    //単一ルートでアプリケーションを構築する
        // handler: 何らかの処理要求が発生した時に起動されるプログラムのこと
        // handlerはアプリケーションのロジックが存在する場所
    let app = Router::new().route("/", get(|| async { "Hello, Asami!" }));

    // localhost:3000 で hyper と共に実行する
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
