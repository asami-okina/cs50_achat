use axum::{
    response::Json,
    extract::{Path,Query},
};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use serde::{Serialize, Deserialize};
use serde_json::{Value, json};

use sqlx::mysql::MySqlPool;
use std::{env, fmt::Debug};
/*
  該当友達とのdirectChatRoomIdを取得(すでに友達かどうか)
*/
#[derive(Debug, Deserialize, Serialize)]
pub struct FetchIsAlreadyFriendPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchIsAlreadyFriendQuery {
    friend_user_id: String,
}

// デフォルト値の取得
impl Default for FetchIsAlreadyFriendQuery {
    fn default() -> Self {
        Self { friend_user_id: String::from("") }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchIsAlreadyFriendResult {
    direct_chat_room_id: Option<u64>,
    already_friend: bool
}

// handler
pub async fn handler_fetch_is_already_friend(
    Path(path): Path<FetchIsAlreadyFriendPath>,
    query: Option<Query<FetchIsAlreadyFriendQuery>>,
) -> Json<Value> {
    let user_id = path.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(query) = query.unwrap_or_default();
    let friend_user_id = query.friend_user_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let result = fetch_is_already_friend(&pool, &user_id, &friend_user_id).await.unwrap();
    
    Json(json!({ "result": result }))
}

// SQL実行部分
pub async fn fetch_is_already_friend(pool: &MySqlPool, user_id: &str, friend_user_id: &str) -> anyhow::Result<FetchIsAlreadyFriendResult> {
    let is_alread_friend = sqlx::query!(
        r#"
            SELECT
                direct_chat_room_id
            FROM
                follow
            WHERE
                from_user_id = ?
            AND to_user_id = ?
        "#,
        user_id,
        friend_user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let result:FetchIsAlreadyFriendResult;

    if is_alread_friend.len() == 0 {
        // まだ友達ではない
        result = FetchIsAlreadyFriendResult {
            direct_chat_room_id: None,
            already_friend: false
        }
    } else {
        // 既に友達である
        result = FetchIsAlreadyFriendResult {
            direct_chat_room_id: Some(is_alread_friend[0].direct_chat_room_id),
            already_friend: true
        }
    }

    Ok(result)
}