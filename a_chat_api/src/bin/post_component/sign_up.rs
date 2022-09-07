use crate::common::mysqlpool_connect::mysqlpool_connect;
use axum::response::Json;
use pwhash::bcrypt;
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;
use std::time::SystemTime;
/*
  会員登録
*/
// handler
pub async fn handler_sign_up(body_json: Json<Value>) -> Json<Value> {
    // user_idの取得
    let user_id = body_json.0.get("user_id").unwrap().as_str().unwrap();

    // mailの取得
    let mail = body_json.0.get("mail").unwrap().as_str().unwrap();

    // passwordの取得
    let password = body_json.0.get("password").unwrap().as_str().unwrap();

    let new_password = hashing_password(&password.to_string());

    let pool = mysqlpool_connect().await;
    sign_up(&pool, user_id, mail, &new_password).await.unwrap();

    Json(json!({ "user_id": user_id }))
}

// SQL実行部分
async fn sign_up(
    pool: &MySqlPool,
    user_id: &str,
    mail: &str,
    password: &str,
) -> anyhow::Result<()> {
    let now = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_secs();
    sqlx::query!(
        r#"
            INSERT INTO user(
                id,
                nickname,
                mail,
                password,
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
        user_id,
        user_id,
        mail,
        password,
        now
    )
    .execute(pool)
    .await
    .unwrap();

    Ok(())
}

// パスワードハッシング
fn hashing_password(password: &String) -> String {
    bcrypt::hash(password).unwrap()
}
