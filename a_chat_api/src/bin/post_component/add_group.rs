use axum::{
    response::Json,
};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use serde::{Serialize, Deserialize};
use serde_json::{Value, json};

use sqlx::mysql::MySqlPool;
use std::{env, fmt::Debug};
use std::time::SystemTime;
/*
  グループ追加
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct AddGroupJson {
    group_image: Option<String>,
    group_name: String,
    group_member_user_ids: Vec<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct AddGroupResult {
    group_image: Option<String>,
    group_name: String,
    group_chat_room_id : String
}

// handler
pub async fn handler_add_group(
    body_json: Json<AddGroupJson>
) -> Json<Value> {
    // group_imageの取得
    let group_image = match &body_json.group_image{
        Some(group_image) => Some(group_image),
        None => None
    };

    // group_nameの取得
    let group_name = &body_json.group_name;

    // group_member_user_idsの取得
    let group_member_user_ids = &body_json.group_member_user_ids;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let result = add_group(&pool, group_image, &group_name, &group_member_user_ids).await.unwrap();
    Json(json!({ "group_info": result }))
}

// SQL実行部分
pub async fn add_group(pool: &MySqlPool, group_image:Option<&String>, group_name: &str, group_member_user_ids: &Vec<String>) -> anyhow::Result<AddGroupResult> {
    let now = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs();
    // group_chat_roomテーブルの追加
    let group_chat_room_id = sqlx::query!(
        r#"
            INSERT INTO group_chat_room ( group_name, group_image, created_at )
            VALUES ( ?, ? , ? )
        "#,
        &group_name,
        &group_image,
        &now
    )
    .execute(pool)
    .await
    .unwrap()
    .last_insert_id();

    // group_memberテーブルの追加
    for user_id in group_member_user_ids {
        sqlx::query!(
            r#"
                INSERT INTO group_member ( group_chat_room_id, user_id, entry_date, last_read_time )
                VALUES ( ?, ? , ?, ? )
            "#,
            &group_chat_room_id,
            user_id,
            &now,
            &now
        )
        .execute(pool)
        .await
        .unwrap();
    }

    let result = AddGroupResult {
        // group_image: match group_image {
        //     Some(group_image) => Some(group_image),
        //     None => None
        // },
        group_image: match group_image{
            Some(group_image) => Some(group_image.clone()), // &StringをStringにするには、.clone()を行う
            None => None
        },
        group_name: group_name.to_string(),
        group_chat_room_id : group_chat_room_id.to_string()
    };

    // group_chat_room、group_memberテーブルのレコード削除SQL
    // DELETE FROM group_member WHERE group_chat_room_id = 【対象id】;
    // DELETE FROM group_chat_room WHERE id = 【対象group_chat_room_id】;
    
    Ok(result)
}