use axum::{
    extract::{Path, Query},
    response::Json,
};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;

/*
  チャット履歴取得
*/
#[derive(Debug, Deserialize, Serialize)]
pub struct FetchMessageByChatRoomIdPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchMessageByChatRoomIdQuery {
    chat_room_type: FetchMessageByChatRoomIdQueryType,
    chat_room_id: Option<u64>,
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
pub enum FetchMessageByChatRoomIdQueryType {
    DirectChatRoomId,
    GroupChatRoomId,
    None,
}

// デフォルト値の取得
impl Default for FetchMessageByChatRoomIdQuery {
    fn default() -> Self {
        // direct_chat_room_id,group_chat_room_id、どちらかをnullで渡すとunwrapがpanicしてしまうため、typeで渡す
        Self {
            chat_room_type: FetchMessageByChatRoomIdQueryType::None,
            chat_room_id: None,
        }
    }
}

// handler
pub async fn handler_fetch_message_by_chat_room_id(
    Path(path): Path<FetchMessageByChatRoomIdPath>,
    query: Option<Query<FetchMessageByChatRoomIdQuery>>,
) -> Json<Value> {
    let _user_id = path.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(query) = query.unwrap();
    let chat_room_type = query.chat_room_type;
    let chat_room_id = query.chat_room_id;

    let pool = mysqlpool_connect::mysqlpool_connect().await;
    let messages = fetch_message_by_chat_room_id(&pool, chat_room_type, chat_room_id)
        .await
        .unwrap();

    if let FetchMessageByChatRoomIdResultEnum::Some(m) = messages {
        Json(json!({ "messages": m }))
    } else {
        return Json(json!({ "messages": null }));
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub enum FetchMessageByChatRoomIdResultEnum {
    // 検索にヒットしない場合(何も返さない)
    None,
    // 検索にヒットした場合
    Some(Vec<FetchMessageByChatRoomIdResultTypeEnum>),
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(tag = "type")]
pub enum FetchMessageByChatRoomIdResultTypeEnum {
    // メッセージ内容がTextの場合
    FetchMessageByChatRoomIdTextResult(FetchMessageByChatRoomIdTextResult),
    // メッセージ内容がImageの場合
    FetchMessageByChatRoomIdImageResult(FetchMessageByChatRoomIdImageResult),
}

#[derive(Debug, Deserialize, Serialize)]
// メッセージ内容がtextの場合
pub struct FetchMessageByChatRoomIdTextResult {
    _id: u64,        // messageテーブルのid
    created_at: i32, // messageテーブルのcreated_at
    user: FetchMessageByChatRoomIdUserResult,
    text: Option<String>, // messageテーブルのcontent(type_idがtextのもの)
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchMessageByChatRoomIdImageResult {
    _id: u64,        // messageテーブルのid
    created_at: i32, // messageテーブルのcreated_at
    user: FetchMessageByChatRoomIdUserResult,
    image: Option<String>, // messageテーブルのcontent(type_idがimageのもの)
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchMessageByChatRoomIdUserResult {
    _id: String,            // messageテーブルのsender_id
    name: Option<String>,   // messageテーブルのsender_idに紐づくuserテーブルのnickname
    avatar: Option<String>, //  messageテーブルのsender_idに紐づくuserテーブルのprofile_image
}

// SQL実行部分
pub async fn fetch_message_by_chat_room_id(
    pool: &MySqlPool,
    chat_room_type: FetchMessageByChatRoomIdQueryType,
    chat_room_id: Option<u64>,
) -> anyhow::Result<FetchMessageByChatRoomIdResultEnum> {
    // direct_chat_room_idが存在する場合
    if chat_room_type == FetchMessageByChatRoomIdQueryType::DirectChatRoomId {
        let messages = parse_friend_fetch_message_by_chat_room_id_result(&pool, &chat_room_id)
            .await
            .unwrap();
        return Ok(FetchMessageByChatRoomIdResultEnum::Some(messages));
    }
    // group_chat_room_idが存在する場合
    else if chat_room_type == FetchMessageByChatRoomIdQueryType::GroupChatRoomId {
        let messages = parse_group_fetch_message_by_chat_room_id_result(&pool, &chat_room_id)
            .await
            .unwrap();
        return Ok(FetchMessageByChatRoomIdResultEnum::Some(messages));
    }
    // 該当しない場合
    else {
        return Ok(FetchMessageByChatRoomIdResultEnum::None);
    }
}

// resultの型に変換(Friend)
pub async fn parse_friend_fetch_message_by_chat_room_id_result(
    pool: &MySqlPool,
    chat_room_id: &Option<u64>,
) -> anyhow::Result<Vec<FetchMessageByChatRoomIdResultTypeEnum>> {
    let result = sqlx::query!(
        r#"
            SELECT
                m.id as message_id,
                m.created_at as created_at,
                m.content as content,
                m.content_type_id as content_type_id,
                u.profile_image as sender_profile_image,
                u.nickname as sender_nickname,
                u.id as sender_user_id
            FROM
                message as m
                INNER JOIN
                    user as u
                ON  m.sender_id = u.id
            WHERE
                m.direct_chat_room_id = ?
            ORDER BY
                m.created_at DESC
        "#,
        chat_room_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut messages: Vec<FetchMessageByChatRoomIdResultTypeEnum> = vec![];

    for list in &result {
        let text_sender_info = FetchMessageByChatRoomIdUserResult {
            _id: list.sender_user_id.clone(),
            name: list.sender_nickname.clone(),
            avatar: list.sender_profile_image.clone(),
        };
        // textの場合
        if list.content_type_id == 1 {
            let message_list =
                FetchMessageByChatRoomIdResultTypeEnum::FetchMessageByChatRoomIdTextResult(
                    FetchMessageByChatRoomIdTextResult {
                        _id: list.message_id,        // messageテーブルのid
                        created_at: list.created_at, // messageテーブルのcreated_at
                        user: text_sender_info,
                        text: Some(list.content.clone()), // messageテーブルのcontent(type_idがtextのもの)
                    },
                );
            messages.push(message_list);
        }
        let image_sender_info = FetchMessageByChatRoomIdUserResult {
            _id: list.sender_user_id.clone(),
            name: list.sender_nickname.clone(),
            avatar: list.sender_profile_image.clone(),
        };

        // imageの場合
        if list.content_type_id == 2 {
            let message_list =
                FetchMessageByChatRoomIdResultTypeEnum::FetchMessageByChatRoomIdImageResult(
                    FetchMessageByChatRoomIdImageResult {
                        _id: list.message_id,        // messageテーブルのid
                        created_at: list.created_at, // messageテーブルのcreated_at
                        user: image_sender_info,
                        image: Some(list.content.clone()), // messageテーブルのcontent(type_idがimageのもの)
                    },
                );
            messages.push(message_list);
        }
    }

    Ok(messages)
}

// resultの型に変換(Group)
pub async fn parse_group_fetch_message_by_chat_room_id_result(
    pool: &MySqlPool,
    chat_room_id: &Option<u64>,
) -> anyhow::Result<Vec<FetchMessageByChatRoomIdResultTypeEnum>> {
    let result = sqlx::query!(
        r#"
            SELECT
                m.id as message_id,
                m.created_at as created_at,
                m.content as content,
                m.content_type_id as content_type_id,
                u.profile_image as sender_profile_image,
                u.nickname as sender_nickname,
                u.id as sender_user_id
            FROM
                message as m
                INNER JOIN
                    user as u
                ON  m.sender_id = u.id
            WHERE
                m.group_chat_room_id = ?
            ORDER BY
                m.created_at DESC
        "#,
        chat_room_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut messages: Vec<FetchMessageByChatRoomIdResultTypeEnum> = vec![];

    for list in &result {
        let text_sender_info = FetchMessageByChatRoomIdUserResult {
            _id: list.sender_user_id.clone(),
            name: list.sender_nickname.clone(),
            avatar: list.sender_profile_image.clone(),
        };
        // textの場合
        if list.content_type_id == 1 {
            let message_list =
                FetchMessageByChatRoomIdResultTypeEnum::FetchMessageByChatRoomIdTextResult(
                    FetchMessageByChatRoomIdTextResult {
                        _id: list.message_id,        // messageテーブルのid
                        created_at: list.created_at, // messageテーブルのcreated_at
                        user: text_sender_info,
                        text: Some(list.content.clone()), // messageテーブルのcontent(type_idがtextのもの)
                    },
                );
            messages.push(message_list);
        }
        let image_sender_info = FetchMessageByChatRoomIdUserResult {
            _id: list.sender_user_id.clone(),
            name: list.sender_nickname.clone(),
            avatar: list.sender_profile_image.clone(),
        };

        // imageの場合
        if list.content_type_id == 2 {
            let message_list =
                FetchMessageByChatRoomIdResultTypeEnum::FetchMessageByChatRoomIdImageResult(
                    FetchMessageByChatRoomIdImageResult {
                        _id: list.message_id,        // messageテーブルのid
                        created_at: list.created_at, // messageテーブルのcreated_at
                        user: image_sender_info,
                        image: Some(list.content.clone()), // messageテーブルのcontent(type_idがimageのもの)
                    },
                );
            messages.push(message_list);
        }
    }

    Ok(messages)
}
