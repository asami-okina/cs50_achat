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
use std::time::SystemTime;
/*
  最終既読日時の更新
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct UpdateLastReadTimePath {
    user_id: String
}
#[derive(Debug, Deserialize, Serialize)]
pub struct UpdateLastReadTimeJson {
    chat_room_type: UpdateLastReadTimeEnum,
    chat_room_id: u64,
}

#[derive(Debug, Deserialize, Serialize,PartialEq)]
pub enum UpdateLastReadTimeEnum {
    DirectChatRoomId,
    GroupChatRoomId,
    None
}

pub async fn handler_update_last_read_time(
    Path(path): Path<UpdateLastReadTimePath>,
    body_json: Json<UpdateLastReadTimeJson>
) -> Json<Value> {
    // user_idの取得
    let user_id = path.user_id;

    // chat_room_typeの取得
    let chat_room_type = &body_json.chat_room_type;

    // chat_room_idの取得
    let chat_room_id = &body_json.chat_room_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    update_last_read_time(&pool, &user_id, chat_room_type, &chat_room_id).await.unwrap();
    Json(json!({ "status_code": 200 }))
}

// SQL実行部分
pub async fn update_last_read_time(pool: &MySqlPool, user_id: &String,chat_room_type: &UpdateLastReadTimeEnum, chat_room_id: &u64) -> anyhow::Result<()> {
    let now = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs();
    if chat_room_type == &UpdateLastReadTimeEnum::DirectChatRoomId {
        sqlx::query!(
            r#"
                UPDATE
                    direct_member
                SET
                    last_read_time = ?
                WHERE
                    direct_chat_room_id = ?
                AND user_id = ?
            "#,
            now,
            chat_room_id,
            user_id
        )
        .execute(pool)
        .await?
        .rows_affected();
    }

    if chat_room_type == &UpdateLastReadTimeEnum::GroupChatRoomId {
        sqlx::query!(
            r#"
                UPDATE
                    group_member
                SET
                    last_read_time = ?
                WHERE
                    group_chat_room_id = ?
                AND user_id = ?
            "#,
            now,
            chat_room_id,
            user_id
        )
        .execute(pool)
        .await?
        .rows_affected();
    }

    Ok(())
}