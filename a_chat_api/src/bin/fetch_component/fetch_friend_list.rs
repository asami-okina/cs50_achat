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
  ユーザーの友達一覧取得
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct FetchFriendListPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchFriendListResult {
    direct_chat_room_id: u64,
    friend_use_id: String,
    friend_profile_image: Option<String>,
    friend_nickname: Option<String>
}

pub async fn handler_fetch_friend_list(Path(path): Path<FetchFriendListPath>) -> Json<Value> {
    let user_id = path.user_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let friend_list = fetch_friend_list(&pool, &user_id).await.unwrap();
    Json(json!({ "friend_list": friend_list }))
}

// SQL実行部分
pub async fn fetch_friend_list(pool: &MySqlPool, user_id:&str) -> anyhow::Result<Vec<FetchFriendListResult>>{
    let friend_list = sqlx::query!(
        r#"
            SELECT
                f.direct_chat_room_id as direct_chat_room_id,
                u.id as friend_use_id,
                u.profile_image as friend_profile_image,
                u.nickname as friend_nickname
            FROM
                user as u
                INNER JOIN
                    follow as f
                ON  u.id = f.to_user_id
            WHERE
                u.id IN(
                    SELECT
                        f.to_user_id
                    FROM
                        follow as f
                    WHERE
                        f.from_user_id = ?
                )
            AND f.from_user_id = ?
        "#,
        user_id,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut result:Vec<FetchFriendListResult> = vec![];

    for row in &friend_list {
        let friend = FetchFriendListResult {
            direct_chat_room_id: row.direct_chat_room_id,
            friend_use_id: row.friend_use_id.to_string(),
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