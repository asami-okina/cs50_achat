use axum::{
    response::Json,
};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use serde::{Serialize, Deserialize};
use serde_json::{Value, json};

use sqlx::mysql::MySqlPool;
use std::{env, fmt::Debug};
/*
  ログイン
*/
#[derive(Debug, Deserialize, Serialize)]
pub struct LoginResult {
    user_id: Option<String>,
    certification_result: bool
}

// handler
pub async fn handler_log_in(body_json: Json<Value>) -> Json<Value> {
    // mailの取得
    let mail = body_json.0.get("mail")
    .unwrap()
    .as_str()
    .unwrap();

    // passwordの取得
    let password = body_json.0.get("password")
    .unwrap()
    .as_str()
    .unwrap();

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let result = log_in(&pool, &mail, &password).await.unwrap();
    Json(json!({ "user_id": result.user_id, "certification_result": result.certification_result }))
}

// SQL実行部分
pub async fn log_in(pool: &MySqlPool, mail: &str, password: &str ) -> anyhow::Result<LoginResult> {
    let user = sqlx::query!(
        r#"
            SELECT *
            FROM user
            WHERE mail = ? AND password = ?
        "#,
        mail,
        password
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let result;

    if user.len() == 0 {
        // まだ会員登録されていない
        result = LoginResult {
            user_id : None ,
            certification_result: false
        }
    } else {
        // 既に会員登録されている
        result = LoginResult {
            user_id : Some(user[0].id.to_string()) ,
            certification_result: true
        }
    }
    Ok(result)
}