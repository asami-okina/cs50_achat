use axum::{extract::Path, response::Json};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;

/*
  ユーザが所属するグループ一覧
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
pub struct FetchGroupListPath {
    user_id: String,
}

pub async fn handler_fetch_group_list(Path(path): Path<FetchGroupListPath>) -> Json<Value> {
    let user_id = path.user_id;

    let pool = mysqlpool_connect::mysqlpool_connect().await;
    let group_list = fetch_group_list(&pool, &user_id).await.unwrap();
    Json(json!({ "groups": group_list }))
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchGroupListResult {
    group_chat_room_id: String,
    group_name: String,
    group_image: Option<String>,
    group_member_user_ids: Vec<String>,
}

// SQL実行部分(Groups)
pub async fn fetch_group_list(
    pool: &MySqlPool,
    user_id: &str,
) -> anyhow::Result<Vec<FetchGroupListResult>> {
    let group_list = sqlx::query!(
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
            AND g.delete_flag = FALSE
        "#,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut group_member_user_ids: Vec<String> = vec![];

    let mut result: Vec<FetchGroupListResult> = vec![];

    for row in &group_list {
        let user_ids = sqlx::query!(
            r#"
                SELECT
                    user_id
                FROM
                    group_member
                WHERE
                    group_chat_room_id = ?
            "#,
            &row.group_chat_room_id
        )
        .fetch_all(pool)
        .await
        .unwrap();

        for list in &user_ids {
            group_member_user_ids.push(list.user_id.clone());
        }

        let group = FetchGroupListResult {
            group_chat_room_id: row.group_chat_room_id.to_string(),
            group_name: row.group_name.to_string(),
            group_image: match &row.group_image {
                Some(group_image) => Some(group_image.to_string()),
                None => None,
            },
            group_member_user_ids: group_member_user_ids.clone(),
        };
        result.push(group);

        // group_member_user_idsの初期化
        group_member_user_ids = vec![]
    }
    Ok(result)
}
