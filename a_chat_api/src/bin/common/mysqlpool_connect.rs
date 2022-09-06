use sqlx::mysql::{MySql, MySqlPool};
use sqlx::Pool;
use std::env;
/*
  全ユーザ情報を取得
*/
// handler
pub async fn mysqlpool_connect() -> Pool<MySql> {
    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap())
        .await
        .unwrap();
    return pool;
}
