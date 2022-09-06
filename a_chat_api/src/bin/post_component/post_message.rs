use axum::{extract::Path, response::Json};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;
use std::time::SystemTime;
use std::{env, fmt::Debug};
/*
  チャット送信
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct PostMessagePath {
    user_id: String,
}
#[derive(Debug, Deserialize, Serialize)]
pub struct PostMessageJson {
    chat_room_type: PostMessageChatRoomIdTypeEnum,
    chat_room_id: u64,
    content: String,
    content_type: PostMessageContentTypeEnum,
    sender_user_id: String,
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
pub enum PostMessageChatRoomIdTypeEnum {
    DirectChatRoomId,
    GroupChatRoomId,
    None,
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
pub enum PostMessageContentTypeEnum {
    Text,
    Image,
}

pub async fn handler_post_message(
    Path(path): Path<PostMessagePath>,
    body_json: Json<PostMessageJson>,
) -> Json<Value> {
    // user_idの取得
    let _user_id = path.user_id;

    // chat_room_typeの取得
    let chat_room_type = &body_json.chat_room_type;

    // chat_room_idの取得
    let chat_room_id = &body_json.chat_room_id;

    // contentの取得
    let content = &body_json.content;

    // content_typeの取得
    let content_type = &body_json.content_type;

    // sender_user_idの取得
    let sender_user_id = &body_json.sender_user_id;

    let pool = mysqlpool_connect::mysqlpool_connect().await;
    post_message(
        &pool,
        chat_room_type,
        &chat_room_id,
        &content,
        content_type,
        &sender_user_id,
    )
    .await
    .unwrap();
    Json(json!({ "status_code": 200 }))
}

// SQL実行部分
pub async fn post_message(
    pool: &MySqlPool,
    chat_room_type: &PostMessageChatRoomIdTypeEnum,
    chat_room_id: &u64,
    content: &String,
    content_type: &PostMessageContentTypeEnum,
    sender_user_id: &String,
) -> anyhow::Result<()> {
    let now = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_secs();
    // content_typeが「Text」の場合は「1」、「Image」の場合は「２」
    let content_type_id = if content_type == &PostMessageContentTypeEnum::Text {
        1
    } else {
        2
    };

    if chat_room_type == &PostMessageChatRoomIdTypeEnum::DirectChatRoomId {
        sqlx::query!(
            r#"
                INSERT INTO message(
                    content_type_id,
                    sender_id,
                    direct_chat_room_id,
                    content,
                    created_at
                )
                VALUES(
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            "#,
            content_type_id,
            sender_user_id,
            chat_room_id,
            content,
            now
        )
        .execute(pool)
        .await
        .unwrap();
    }

    if chat_room_type == &PostMessageChatRoomIdTypeEnum::GroupChatRoomId {
        sqlx::query!(
            r#"
                INSERT INTO message(
                    content_type_id,
                    sender_id,
                    group_chat_room_id,
                    content,
                    created_at
                )
                VALUES(
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            "#,
            content_type_id,
            sender_user_id,
            chat_room_id,
            content,
            now
        )
        .execute(pool)
        .await
        .unwrap();
    }

    Ok(())
}
