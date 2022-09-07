use axum::{extract::Path, response::Json};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;

/*
  チャットの表示/非表示、削除
*/

// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct UpdateChatRoomHiddenOrDeletePath {
    user_id: String,
}
#[derive(Debug, Deserialize, Serialize)]
pub struct UpdateChatRoomHiddenOrDeleteJson {
    direct_chat_room_id: Option<u64>,
    group_chat_room_id: Option<u64>,
    update_type: String,
}

pub async fn handler_update_chat_room_hidden_or_delete(
    Path(path): Path<UpdateChatRoomHiddenOrDeletePath>,
    body_json: Json<UpdateChatRoomHiddenOrDeleteJson>,
) -> Json<Value> {
    // user_idの取得
    let user_id = path.user_id;

    // direct_chat_room_idの取得
    let direct_chat_room_id = match &body_json.direct_chat_room_id {
        Some(direct_chat_room_id) => Some(direct_chat_room_id),
        None => None,
    };

    // group_chat_room_idの取得
    let group_chat_room_id = match &body_json.group_chat_room_id {
        Some(group_chat_room_id) => Some(group_chat_room_id),
        None => None,
    };

    // search_flagの取得
    let update_type = &body_json.update_type;

    let pool = mysqlpool_connect().await;
    update_chat_room_hidden_or_delete(
        &pool,
        &user_id,
        direct_chat_room_id,
        group_chat_room_id,
        &update_type,
    )
    .await
    .unwrap();
    Json(json!({ "status_code": 200 }))
}

// SQL実行部分
pub async fn update_chat_room_hidden_or_delete(
    pool: &MySqlPool,
    user_id: &str,
    direct_chat_room_id: Option<&u64>,
    group_chat_room_id: Option<&u64>,
    update_type: &String,
) -> anyhow::Result<()> {
    // message_hidden_flagの更新
    if update_type == "Hidden" {
        // direct_chat_room_idが存在する場合
        if let Some(_) = direct_chat_room_id {
            sqlx::query!(
                r#"
                    UPDATE
                        direct_member
                    SET
                        message_hidden_flag = ?
                    WHERE
                        user_id = ?
                    AND direct_chat_room_id = ?
                "#,
                true,
                user_id,
                direct_chat_room_id
            )
            .execute(pool)
            .await?
            .rows_affected();
        }

        // group_chat_room_idが存在する場合
        if let Some(_) = group_chat_room_id {
            sqlx::query!(
                r#"
                    UPDATE
                        group_member
                    SET
                        message_hidden_flag = ?
                    WHERE
                        user_id = ?
                    AND group_chat_room_id = ?
                "#,
                true,
                user_id,
                group_chat_room_id
            )
            .execute(pool)
            .await?
            .rows_affected();
        }
    }

    // message_delete_flagの更新
    if update_type == "Delete" {
        // direct_chat_room_idが存在する場合
        if let Some(_) = direct_chat_room_id {
            sqlx::query!(
                r#"
                    UPDATE
                        direct_member
                    SET
                        message_delete_flag = ?
                    WHERE
                        user_id = ?
                    AND direct_chat_room_id = ?
                "#,
                true,
                user_id,
                direct_chat_room_id
            )
            .execute(pool)
            .await?
            .rows_affected();
        }

        // group_chat_room_idが存在する場合
        if let Some(_) = group_chat_room_id {
            sqlx::query!(
                r#"
                    UPDATE
                        group_member
                    SET
                        message_delete_flag = ?
                    WHERE
                        user_id = ?
                    AND group_chat_room_id = ?
                "#,
                true,
                user_id,
                group_chat_room_id
            )
            .execute(pool)
            .await?
            .rows_affected();
        }
    }

    Ok(())
}
