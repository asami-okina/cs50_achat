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
  グループメンバーの追加
*/
#[derive(Debug, Deserialize, Serialize)]
pub struct AddGroupMemberPath {
    user_id: String
}
#[derive(Debug, Deserialize, Serialize)]
pub struct AddGroupMemberJson {
    group_chat_room_id: u64,
    add_user_ids: Vec<String>
}

pub async fn handler_add_group_member(
    Path(path): Path<AddGroupMemberPath>,
    body_json: Json<AddGroupMemberJson>
) -> Json<Value> {
    // user_idの取得
    let _user_id = path.user_id;

    // group_chat_room_idの取得
    let group_chat_room_id = &body_json.group_chat_room_id;

    // add_user_idsの取得
    let add_user_ids = &body_json.add_user_ids;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    add_group_member(&pool, &group_chat_room_id, add_user_ids).await.unwrap();
    Json(json!({ "status_code": 200 }))
}

// SQL実行部分
pub async fn add_group_member(pool: &MySqlPool, group_chat_room_id: &u64, add_user_ids: &Vec<String>) -> anyhow::Result<()> {
    let now = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs();

    for user_id in add_user_ids {
        sqlx::query!(
            r#"
                INSERT INTO group_member ( group_chat_room_id, user_id, entry_date, last_read_time )
                VALUES ( ?, ? , ? , ? )
            "#,
            group_chat_room_id,
            user_id,
            now,
            now
        )
        .execute(pool)
        .await
        .unwrap();
    }

    Ok(())
}