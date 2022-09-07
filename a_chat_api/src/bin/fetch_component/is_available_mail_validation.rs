use axum::{extract::Query, response::Json};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;

/*
  登録するメールアドレスが使用可能かどうかチェック
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct IsAvailableMailValidationQyery {
    mail: String,
}

// デフォルト値の取得
impl Default for IsAvailableMailValidationQyery {
    fn default() -> Self {
        Self {
            mail: String::from(""),
        }
    }
}

// handler
pub async fn handler_is_available_mail_validation(
    query: Option<Query<IsAvailableMailValidationQyery>>,
) -> Json<Value> {
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(query) = query.unwrap_or_default();
    let mail = query.mail;

    let pool = mysqlpool_connect().await;
    let is_available_mail = is_available_mail_validation(&pool, &mail).await.unwrap();

    Json(json!({ "is_available_mail": is_available_mail, }))
}

// SQL実行部分
pub async fn is_available_mail_validation(pool: &MySqlPool, mail: &str) -> anyhow::Result<bool> {
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
        // まだ該当メールアドレスは使用されていない
        result = true
    } else {
        // 既に該当メールアドレスは使用されている
        result = false
    }
    Ok(result)
}
