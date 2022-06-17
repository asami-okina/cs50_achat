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
  directChatRoomId/groupChatRoomIdに紐づくメンバーのユーザーIDを取得(自分も含む)
*/
#[derive(Debug, Deserialize, Serialize)]
pub struct FetchUserIdsByDirectOrGroupChatRoomIdPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchUserIdsByDirectOrGroupChatRoomIdQuery {
    chat_room_type: FetchUserIdsByDirectOrGroupChatRoomIdQueryType,
    chat_room_id: Option<u64>
}

#[derive(Debug, Deserialize, Serialize,PartialEq)]
pub enum FetchUserIdsByDirectOrGroupChatRoomIdQueryType {
    DirectChatRoomId,
    GroupChatRoomId,
    None
}

// デフォルト値の取得
impl Default for FetchUserIdsByDirectOrGroupChatRoomIdQuery {
    fn default() -> Self {
        // direct_chat_room_id,group_chat_room_id、どちらかをnullで渡すとunwrapがpanicしてしまうため、typeで渡す
        Self { chat_room_type: FetchUserIdsByDirectOrGroupChatRoomIdQueryType::None, chat_room_id: None}
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchUserIdsByDirectOrGroupChatRoomIdResult {
    user_ids: Vec<String>,
}

// handler
pub async fn handler_fetch_user_ids_by_direct_or_group_chat_room_id(
    Path(path): Path<FetchUserIdsByDirectOrGroupChatRoomIdPath>,
    query: Option<Query<FetchUserIdsByDirectOrGroupChatRoomIdQuery>>,
) -> Json<Value> {
    let _user_id = path.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(query) = query.unwrap_or_default();
    let chat_room_type = query.chat_room_type;
    let chat_room_id = query.chat_room_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let result = fetch_user_ids_by_direct_or_group_chat_room_id(&pool, &chat_room_type, chat_room_id).await.unwrap();
    
    Json(json!({ "user_ids": result, "char_room_type": &chat_room_type }))
}

// SQL実行部分
pub async fn fetch_user_ids_by_direct_or_group_chat_room_id(pool: &MySqlPool, chat_room_type: &FetchUserIdsByDirectOrGroupChatRoomIdQueryType, chat_room_id: Option<u64>) -> anyhow::Result<Vec<String>> {
    let mut result_list:Vec<String> = vec![];
    
    if chat_room_type == &FetchUserIdsByDirectOrGroupChatRoomIdQueryType::DirectChatRoomId {
        let result = sqlx::query!(
            r#"
                SELECT
                    user_id
                FROM
                    direct_member
                WHERE
                    direct_chat_room_id = ?
            "#,
            chat_room_id
        )
        .fetch_all(pool)
        .await
        .unwrap();

        for list in &result {
            result_list.push(list.user_id.clone());
        }
    }
    if chat_room_type == &FetchUserIdsByDirectOrGroupChatRoomIdQueryType::GroupChatRoomId {
        let result = sqlx::query!(
            r#"
                SELECT
                    user_id
                FROM
                    group_member
                WHERE
                    group_chat_room_id = ?
                AND
                    leave_flag = 0
            "#,
            chat_room_id
        )
        .fetch_all(pool)
        .await
        .unwrap();

        for list in &result {
            result_list.push(list.user_id.clone());
        }
    }
    
    Ok(result_list)
}