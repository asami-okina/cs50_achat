use axum::{
    extract::{Path, Query},
    response::Json,
};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;

/*
  ユーザーID検索にヒットしたユーザー情報(プロフィール画像、ニックネーム)
*/
#[derive(Debug, Deserialize, Serialize)]
pub struct FetchFriendInfoByUserIdPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchFriendInfoByUserIdQuery {
    search_user_id: String,
}

// デフォルト値の取得
impl Default for FetchFriendInfoByUserIdQuery {
    fn default() -> Self {
        Self {
            search_user_id: String::from(""),
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchFriendInfoByUserIdResult {
    exist_user_id: bool,
    already_follow_requested: bool,
    friend_search_flag: bool,
    friend_use_id: Option<String>,
    friend_profile_image: Option<String>,
    friend_nickname: Option<String>,
}

// handler
pub async fn handler_fetch_friend_info_by_friend_user_id(
    Path(path): Path<FetchFriendInfoByUserIdPath>,
    query: Option<Query<FetchFriendInfoByUserIdQuery>>,
) -> Json<Value> {
    let user_id = path.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(query) = query.unwrap_or_default();
    let search_user_id = query.search_user_id;

    // friends
    let pool = mysqlpool_connect().await;
    let result = fetch_friend_info_by_friend_user_id(&pool, &user_id, &search_user_id)
        .await
        .unwrap();

    Json(json!({ "result": result }))
}

// SQL実行部分(Friends)
pub async fn fetch_friend_info_by_friend_user_id(
    pool: &MySqlPool,
    user_id: &str,
    search_user_id: &str,
) -> anyhow::Result<FetchFriendInfoByUserIdResult> {
    // パターン
    // ①該当のユーザーIDが存在しない
    // ②該当のユーザーIDが存在する
    // 1. すでに友達である
    // 2. まだ友達ではない
    // (1) search_flagがtrue
    // (2) search_flagがfalse

    // 該当のユーザーIDが存在しているか
    let exist_user_id = sqlx::query!(
        r#"
            SELECT
                count(*) as exist_user_id
            FROM
                user
            WHERE
                id = ?
        "#,
        search_user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let exist_user_id: bool = if exist_user_id[0].exist_user_id == 1 {
        true
    } else {
        false
    };

    if !exist_user_id {
        // 該当のユーザーIDが存在していない場合
        let result = FetchFriendInfoByUserIdResult {
            exist_user_id: false,
            already_follow_requested: false,
            friend_search_flag: false,
            friend_use_id: None,
            friend_profile_image: None,
            friend_nickname: None,
        };
        return Ok(result);
    } else {
        // 該当のユーザーIDが存在している場合
        // search_user_idのユーザーのsearch_flag
        let search_friend_user_info = sqlx::query!(
            r#"
                SELECT
                    *
                FROM
                    user
                WHERE
                    id = ?
            "#,
            search_user_id
        )
        .fetch_all(pool)
        .await
        .unwrap();

        let search_flag: bool = if search_friend_user_info[0].search_flag == 1 {
            true
        } else {
            false
        };

        // 既に友達になっているかのチェック
        let result = sqlx::query!(
            r#"
                SELECT
                    count(*) as already_follow_requested
                FROM
                    follow
                WHERE
                    to_user_id = ?
                AND from_user_id = ?
            "#,
            search_user_id,
            user_id
        )
        .fetch_all(pool)
        .await
        .unwrap();

        let already_follow_requested = if result[0].already_follow_requested == 1 {
            true
        } else {
            false
        };

        if !already_follow_requested {
            // まだ友達になっていない場合
            if search_flag {
                // 該当search_user_idのユーザーのsearch_flagがtrueの場合、友達情報を出力
                let result = FetchFriendInfoByUserIdResult {
                    exist_user_id: exist_user_id,
                    already_follow_requested: already_follow_requested,
                    friend_search_flag: search_flag,
                    friend_use_id: Some(search_friend_user_info[0].id.clone()),
                    friend_profile_image: match &search_friend_user_info[0].profile_image {
                        Some(profile_image) => Some(profile_image.to_string()),
                        None => None,
                    },
                    friend_nickname: match &search_friend_user_info[0].nickname {
                        Some(friend_nickname) => Some(friend_nickname.to_string()),
                        None => None,
                    },
                };
                return Ok(result);
            } else {
                // 該当search_user_idのユーザーのsearch_flagがfalseの場合、友達情報は出力しない
                let result = FetchFriendInfoByUserIdResult {
                    exist_user_id: exist_user_id,
                    already_follow_requested: already_follow_requested,
                    friend_use_id: Some(search_friend_user_info[0].id.clone()),
                    friend_search_flag: search_flag,
                    friend_profile_image: match &search_friend_user_info[0].profile_image {
                        Some(profile_image) => Some(profile_image.to_string()),
                        None => None,
                    },
                    friend_nickname: match &search_friend_user_info[0].nickname {
                        Some(friend_nickname) => Some(friend_nickname.to_string()),
                        None => None,
                    },
                };
                return Ok(result);
            }
        } else {
            // 既に友達である場合
            let result = FetchFriendInfoByUserIdResult {
                exist_user_id: exist_user_id,
                already_follow_requested: already_follow_requested,
                friend_use_id: Some(search_friend_user_info[0].id.clone()),
                friend_search_flag: search_flag,
                friend_profile_image: match &search_friend_user_info[0].profile_image {
                    Some(profile_image) => Some(profile_image.to_string()),
                    None => None,
                },
                friend_nickname: match &search_friend_user_info[0].nickname {
                    Some(friend_nickname) => Some(friend_nickname.to_string()),
                    None => None,
                },
            };
            return Ok(result);
        }
    }
}
