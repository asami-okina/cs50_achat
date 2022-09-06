use axum::{extract::Path, response::Json};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use sqlx::mysql::MySqlPool;

/*
  グループからの脱退
*/
// handler
// pathはクエリの一部
// paramsは?以降
#[derive(Debug, Deserialize, Serialize)]
pub struct LeaveGroupPath {
    user_id: String,
}

pub async fn handler_leave_group(Path(path): Path<LeaveGroupPath>, body_json: Json<Value>) -> () {
    let user_id = path.user_id;

    // group_chat_room_idの取得
    let group_chat_room_id = body_json
        .0
        .get("group_chat_room_id")
        .unwrap() // group_chat_room_idはNOT NULLなのでunwrap()使える
        .as_str()
        .unwrap();

    // friends
    let pool = mysqlpool_connect::mysqlpool_connect().await;
    leave_group(&pool, &user_id, &group_chat_room_id)
        .await
        .unwrap();
}

// SQL実行部分
pub async fn leave_group(
    pool: &MySqlPool,
    user_id: &str,
    group_chat_room_id: &str,
) -> anyhow::Result<()> {
    sqlx::query!(
        r#"
            UPDATE
                group_member
            SET
                leave_flag = TRUE
            WHERE
                group_chat_room_id = ?
            AND user_id = ?
        "#,
        group_chat_room_id,
        user_id
    )
    .execute(pool)
    .await?
    .rows_affected();
    Ok(())
}
