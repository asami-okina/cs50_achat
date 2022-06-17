use axum::{
    response::Json,
    extract::{Path},
};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use serde::{Serialize, Deserialize};
use serde_json::{Value, json};

use sqlx::mysql::MySqlPool;
use std::{env, fmt::Debug};
/*
   ユーザの友達数取得
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct FetchFriendCountPath {
    user_id: String,
}
pub async fn handler_fetch_friend_count(Path(path): Path<FetchFriendCountPath>) -> Json<Value> {
    let user_id = path.user_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let friend_count = fetch_friend_count(&pool, &user_id).await.unwrap();
    Json(json!({ "friend_count": friend_count }))
}

// SQL実行部分
pub async fn fetch_friend_count(pool: &MySqlPool, user_id:&str) -> anyhow::Result<i64>{
    let friend_count = sqlx::query!(
        r#"
            SELECT
                COUNT(*) as friend_count
            FROM
                follow
            WHERE
                from_user_id = ?
            "#,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    Ok(friend_count[0].friend_count)
}
