use axum::response::Json;
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect;
use pwhash::bcrypt;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;

/*
  ログイン
*/
#[derive(Debug, Deserialize, Serialize)]
pub struct LoginResult {
    user_id: Option<String>,
    certification_result: bool,
}

// handler
pub async fn handler_log_in(body_json: Json<Value>) -> Json<Value> {
    // mailの取得
    let mail = body_json.0.get("mail").unwrap().as_str().unwrap();

    // passwordの取得
    let password = body_json.0.get("password").unwrap().as_str().unwrap();

    let pool = mysqlpool_connect::mysqlpool_connect().await;
    let result = log_in(&pool, &mail, &password).await.unwrap();
    Json(json!({ "user_id": result.user_id, "certification_result": result.certification_result }))
}

// SQL実行部分
pub async fn log_in(pool: &MySqlPool, mail: &str, password: &str) -> anyhow::Result<LoginResult> {
    let user = sqlx::query!(
        r#"
            SELECT
                *
            FROM
                user
            WHERE
                mail = ?
        "#,
        mail
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let result;
    if user.len() == 0 {
        // まだ会員登録されていない
        result = LoginResult {
            user_id: None,
            certification_result: false,
        }
    } else {
        // 既に会員登録されている
        // パスワードのチェック
        let db_password = user[0].password.clone();
        let verify: bool = verify_password(&password.to_string(), &db_password);
        result = LoginResult {
            user_id: Some(user[0].id.to_string()),
            certification_result: verify,
        }
    }
    Ok(result)
}

// 生成したハッシュとの突き合わせ
fn verify_password(password: &str, hashed_password: &String) -> bool {
    bcrypt::verify(password, &hashed_password)
}
