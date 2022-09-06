use axum::{
    extract::{Path, Query},
    response::Json,
};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;
use std::{env, fmt::Debug};
/*
  ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
*/
#[derive(Debug, Deserialize, Serialize)]
pub struct SearchNamePath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SearchNameQuery {
    search_text: String,
}

// デフォルト値の取得
impl Default for SearchNameQuery {
    fn default() -> Self {
        Self {
            search_text: String::from(""),
        }
    }
}

// handler
pub async fn handler_search_name(
    Path(path): Path<SearchNamePath>,
    search_name_query: Option<Query<SearchNameQuery>>,
) -> Json<Value> {
    let user_id = path.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(search_name_query) = search_name_query.unwrap_or_default();
    let search_text = search_name_query.search_text;

    // friends
    let pool = mysqlpool_connect::mysqlpool_connect().await;
    let friends = search_name_friends(&pool, &user_id, &search_text)
        .await
        .unwrap();

    // groups
    let pool = mysqlpool_connect::mysqlpool_connect().await;
    let groups = search_name_groups(&pool, &user_id, &search_text)
        .await
        .unwrap();
    Json(json!({ "friends": friends, "groups": groups  }))
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SearchNameFriendListResult {
    direct_chat_room_id: u64,
    friend_use_id: String,
    friend_profile_image: Option<String>,
    friend_nickname: Option<String>,
}

// SQL実行部分(Friends)
pub async fn search_name_friends(
    pool: &MySqlPool,
    user_id: &str,
    search_text: &str,
) -> anyhow::Result<Vec<SearchNameFriendListResult>> {
    // 取得したいデータ
    // "direct_chat_room_id": "1",
    // "friend_use_id": "asami111",
    // "friend_profile_image": null,
    // "friend_nickname": "検索結果name"

    // 条件
    // ①userテーブルのnicknameが一致
    // ②followテーブルのfrom_user_idが自分の場合のto_user_idが友達のuser_id
    // ②direct_memberテーブルのdeleteフラグがfalseである(非表示の友達も表示する)
    let like_query = format!("{}{}{}", "%", search_text, "%");
    let search_name_friend_list = sqlx::query!(
        r#"
            SELECT
                u.id as friend_user_id,
                u.nickname as friend_nickname,
                u.profile_image as friend_profile_image,
                f.direct_chat_room_id as direct_chat_room_id
            FROM
                user as u
                INNER JOIN
                    follow as f
                ON  u.id = f.to_user_id
            WHERE
                u.id IN(
                    SELECT
                        id
                    FROM
                        user
                    WHERE
                        nickname LIKE ?
                )
            AND u.id IN(
                    SELECT
                        f.to_user_id
                    FROM
                        follow as f
                    WHERE
                        f.from_user_id = ?
                )
            AND f.direct_chat_room_id IN(
                    SELECT
                        direct_chat_room_id
                    FROM
                        direct_member
                    WHERE
                        user_id = ?
                )
        "#,
        like_query,
        user_id,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut result: Vec<SearchNameFriendListResult> = vec![];
    for row in &search_name_friend_list {
        let friend = SearchNameFriendListResult {
            direct_chat_room_id: row.direct_chat_room_id,
            friend_use_id: row.friend_user_id.to_string(),
            friend_profile_image: match &row.friend_profile_image {
                Some(friend_profile_image) => Some(friend_profile_image.to_string()),
                None => None,
            },
            friend_nickname: match &row.friend_nickname {
                Some(friend_nickname) => Some(friend_nickname.to_string()),
                None => None,
            },
        };
        result.push(friend);
    }

    Ok(result)
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SearchNameGroupListResult {
    group_chat_room_id: String,
    group_name: String,
    group_image: Option<String>,
}

// SQL実行部分(Groups)
pub async fn search_name_groups(
    pool: &MySqlPool,
    user_id: &str,
    search_text: &str,
) -> anyhow::Result<Vec<SearchNameGroupListResult>> {
    // 取得したいデータ
    // "group_chat_room_id": "12",
    // "group_name": "検索結果グループ",
    // "group_image": null)

    // 条件
    // ①group_memberテーブルのuser_idが自分のuser_idであるかつdelete_flagとhidden_flagがfalseであるgroup_chat_room_id
    // ②①の取得結果のgroup_chat_room_idのうち、group_nameが一致
    let like_query = format!("{}{}{}", "%", search_text, "%");
    let search_name_group_list = sqlx::query!(
        r#"
            SELECT
                g.id as group_chat_room_id,
                g.group_name as group_name,
                g.group_image as group_image
            FROM
                group_chat_room as g
                INNER JOIN
                    group_member as gm
                ON  g.id = gm.group_chat_room_id
            WHERE
                gm.user_id = ?
            AND gm.leave_flag = FALSE
            AND g.group_name LIKE ?
            AND g.delete_flag = FALSE
        "#,
        user_id,
        like_query
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut result: Vec<SearchNameGroupListResult> = vec![];

    for row in &search_name_group_list {
        let group = SearchNameGroupListResult {
            group_chat_room_id: row.group_chat_room_id.to_string(),
            group_name: row.group_name.to_string(),
            group_image: match &row.group_image {
                Some(group_image) => Some(group_image.to_string()),
                None => None,
            },
        };
        result.push(group);
    }

    Ok(result)
}
