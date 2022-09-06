use axum::{extract::Path, response::Json};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;
use std::{env, fmt::Debug};
/*
  ユーザーIDに紐づくニックネーム、プロフィール画像の取得
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct FetchProfileByUserIdPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchProfileByUserIdResult {
    user_id: String,
    nickname: Option<String>,
    profile_image: Option<String>,
    search_flag: bool,
}

pub async fn handler_fetch_profile_by_user_id(
    Path(path): Path<FetchProfileByUserIdPath>,
) -> Json<Value> {
    let user_id = path.user_id;

    let pool = mysqlpool_connect::mysqlpool_connect().await;
    let profile = fetch_profile_by_user_id(&pool, &user_id).await.unwrap();
    Json(json!({ "profile": profile }))
}

// SQL実行部分
pub async fn fetch_profile_by_user_id(
    pool: &MySqlPool,
    user_id: &str,
) -> anyhow::Result<FetchProfileByUserIdResult> {
    let result = sqlx::query!(
        r#"
            SELECT
                nickname,
                profile_image,
                search_flag
            FROM
                user
            WHERE
                id = ?
        "#,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let profile_info = FetchProfileByUserIdResult {
        user_id: user_id.to_string(),
        nickname: match &result[0].nickname {
            Some(nickname) => Some(nickname.to_string()),
            None => None,
        },
        profile_image: match &result[0].profile_image {
            Some(profile_image) => Some(profile_image.to_string()),
            None => None,
        },
        search_flag: if result[0].search_flag == 1 {
            true
        } else {
            false
        },
    };

    Ok(profile_info)
}
