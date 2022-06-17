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
  登録するユーザーIDが使用可能かどうかチェック
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct IsAvailableUserIdValidationPath {
    user_id: String,
}

pub async fn handler_is_available_user_id_validation(Path(path): Path<IsAvailableUserIdValidationPath>) -> Json<Value> {
    let user_id = path.user_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let is_available_user_id_validation = is_available_user_id_validation(&pool, &user_id).await.unwrap();
    Json(json!({ "is_available_user_id_validation": is_available_user_id_validation }))
}

// SQL実行部分
pub async fn is_available_user_id_validation(pool: &MySqlPool, user_id:&str) -> anyhow::Result<bool>{
    let user = sqlx::query!(
        r#"
            SELECT *
            FROM user
            WHERE id = ?
        "#,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let result;

    if user.len() == 0 {
        // まだ該当user_idは使用されていない
        result = true
    } else {
        // 既に該当user_idは使用されている
        result = false
    }
    Ok(result)
}