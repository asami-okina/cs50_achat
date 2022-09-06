use axum::{extract::Path, response::Json};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;
use std::time::SystemTime;
use std::{env, fmt::Debug};
/*
  プロフィールの更新
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct UpdateProfilePath {
    user_id: String,
}
#[derive(Debug, Deserialize, Serialize)]
pub struct UpdateProfileJson {
    nickname: Option<String>,
    profile_image: Option<String>,
    search_flag: Option<bool>,
}

#[derive(Debug, Deserialize, Serialize)]
pub enum UpdateProfileResultEnum {
    UpdateNicknameResult { nickname: Option<String> },
    UpdateProfileImageResult { profile_image: Option<String> },
    UpdateSearchFlagResult { search_flag: Option<bool> },
}

// handler
pub async fn handler_update_profile(
    Path(path): Path<UpdateProfilePath>,
    body_json: Json<UpdateProfileJson>,
) -> Json<Value> {
    // user_idの取得
    let user_id = path.user_id;

    // nicknameの取得
    let nickname = &body_json.nickname;

    // profile_imageの取得
    let profile_image = &body_json.profile_image;

    // search_flagの取得
    let search_flag = &body_json.search_flag;

    let pool = mysqlpool_connect::mysqlpool_connect().await;
    update_profile(
        &pool,
        &user_id,
        nickname.as_ref(),
        profile_image.as_ref(),
        search_flag.as_ref(),
    )
    .await
    .unwrap();
    Json(json!({ "status_code": 200 }))
}

// SQL実行部分
pub async fn update_profile(
    pool: &MySqlPool,
    user_id: &str,
    nickname: Option<&String>,
    profile_image: Option<&String>,
    search_flag: Option<&bool>,
) -> anyhow::Result<()> {
    let now = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_secs();

    // nicknameの更新
    if let Some(_) = nickname {
        sqlx::query!(
            r#"
                UPDATE
                    user
                SET
                    nickname = ?,
                    updated_at = ?
                WHERE
                    id = ?
            "#,
            nickname,
            now,
            user_id,
        )
        .execute(pool)
        .await?
        .rows_affected();
    }

    // profile_imageの更新
    if let Some(_) = profile_image {
        sqlx::query!(
            r#"
                UPDATE
                    user
                SET
                    profile_image = ?,
                    updated_at = ?
                WHERE
                    id = ?
            "#,
            profile_image,
            now,
            user_id
        )
        .execute(pool)
        .await?
        .rows_affected();
    }

    // search_flagの更新
    if let Some(_) = search_flag {
        sqlx::query!(
            r#"
                UPDATE
                    user
                SET
                    search_flag = ?,
                    updated_at = ?
                WHERE
                    id = ?
            "#,
            search_flag,
            now,
            user_id
        )
        .execute(pool)
        .await?
        .rows_affected();
    }

    Ok(())
}
