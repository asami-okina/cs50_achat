// 共通操作（今回ではDBとの接続インスタンスの生成）をまとめる
use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use std::env;

pub fn establish_connection() -> MysqlConnection {
    // .endファイルの中身の変数を取得し、環境変数として使用できるようにする
    dotenv().ok();

    // 環境変数DATABASE_URLの値を取得し、database_urlに代入
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    
    // DBとの接続インスタンスを確立し、呼び出し元に返す
    MysqlConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}