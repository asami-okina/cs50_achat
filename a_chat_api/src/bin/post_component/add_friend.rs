use axum::{extract::Path, response::Json};
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use crate::common::mysqlpool_connect::mysqlpool_connect;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::mysql::MySqlPool;
use std::time::SystemTime;

/*
  友達追加
*/

#[derive(Debug, Deserialize, Serialize)]
pub struct AddFriendPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct AddFriendJson {
    friend_user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct AddFriendResult {
    direct_chat_room_id: String,
    friend_use_id: String,
    friend_profile_image: Option<String>,
    friend_nickname: Option<String>,
}

// handler
pub async fn handler_add_friend(
    Path(path): Path<AddFriendPath>,
    body_json: Json<AddFriendJson>,
) -> Json<Value> {
    // own_user_idの取得
    let user_id = path.user_id;

    // friend_user_idの取得
    let friend_user_id = &body_json.friend_user_id;

    let pool = mysqlpool_connect().await;
    let result = add_friend(&pool, &user_id, &friend_user_id).await.unwrap();
    Json(json!({ "friend_info": result }))
}

// SQL実行部分
pub async fn add_friend(
    pool: &MySqlPool,
    user_id: &str,
    friend_user_id: &str,
) -> anyhow::Result<AddFriendResult> {
    let now = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_secs();

    // followテーブルで、from_user_idが相手、to_user_idが自分のdirect_chat_room_idがあるか確認
    let result = sqlx::query!(
        r#"
            SELECT
                *
            FROM
                follow
            WHERE
                to_user_id = ?
            AND from_user_id = ?
        "#,
        user_id,
        friend_user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    if result.len() == 0 {
        // まだdirect_chat_roomテーブルが存在しない場合
        // ①direct_chat_roomテーブルの作成
        let direct_chat_room_id = sqlx::query!(
            r#"
                INSERT INTO direct_chat_room(
                    created_at
                )
                VALUES(
                    ?
                )
            "#,
            &now
        )
        .execute(pool)
        .await
        .unwrap()
        .last_insert_id();

        // direct_chat_room_idをu64からStringに変換
        let direct_chat_room_id = &direct_chat_room_id.to_string();

        // ②direct_memberテーブルの作成
        // 自分のレコード追加
        sqlx::query!(
            r#"
                INSERT INTO direct_member(
                    direct_chat_room_id,
                    user_id,
                    entry_date,
                    last_read_time
                )
                VALUES(
                    ?,
                    ?,
                    ?,
                    ?
                )
            "#,
            &direct_chat_room_id,
            &user_id,
            &now,
            &now
        )
        .execute(pool)
        .await
        .unwrap();

        // 友達のレコード追加
        sqlx::query!(
            r#"
                INSERT INTO direct_member(
                    direct_chat_room_id,
                    user_id,
                    entry_date,
                    last_read_time
                )
                VALUES(
                    ?,
                    ?,
                    ?,
                    ?
                )
            "#,
            &direct_chat_room_id,
            &friend_user_id,
            &now,
            &now
        )
        .execute(pool)
        .await
        .unwrap();

        // ③followテーブルの作成
        sqlx::query!(
            r#"
                INSERT INTO follow(
                    to_user_id,
                    from_user_id,
                    direct_chat_room_id,
                    created_at
                )
                VALUES(
                    ?,
                    ?,
                    ?,
                    ?
                )
            "#,
            &friend_user_id,
            &user_id,
            &direct_chat_room_id,
            &now
        )
        .execute(pool)
        .await
        .unwrap();

        // 友達情報の取得
        let result = add_friend_result(&pool, &friend_user_id, &direct_chat_room_id)
            .await
            .unwrap();
        Ok(result)
    } else {
        let direct_chat_room_id = &result[0].direct_chat_room_id.to_string();
        // 既にdirect_chat_roomテーブルが存在する場合
        // 既にfollowテーブルが作成されていないか確認(APIテスターでの誤り防止)
        let result = sqlx::query!(
            r#"
                SELECT
                    *
                FROM
                    follow
                WHERE
                    to_user_id = ?
                AND from_user_id = ?
            "#,
            &friend_user_id,
            &user_id
        )
        .fetch_all(pool)
        .await
        .unwrap();

        if result.len() == 0 {
            // まだfollowテーブルが生成されていない場合
            // ①followテーブルの作成
            sqlx::query!(
                r#"
                    INSERT INTO follow(
                        to_user_id,
                        from_user_id,
                        direct_chat_room_id,
                        created_at
                    )
                    VALUES(
                        ?,
                        ?,
                        ?,
                        ?
                    )
                "#,
                &friend_user_id,
                &user_id,
                &direct_chat_room_id,
                &now
            )
            .execute(pool)
            .await
            .unwrap();
        } else {
            // すでにfollowテーブルが生成されている場合(APIテスターでの重複登録の場合)
            // 何もしない
        }
        // 友達情報の取得
        let result = add_friend_result(&pool, &friend_user_id, &direct_chat_room_id)
            .await
            .unwrap();
        Ok(result)
    }

    // group_chat_room、group_memberテーブルのレコード削除SQL
    // DELETE FROM direct_member WHERE direct_chat_room_id = 【対象id】;
    // DELETE FROM direct_chat_room WHERE id = 【対象group_chat_room_id】;
}

pub async fn add_friend_result(
    pool: &MySqlPool,
    friend_user_id: &str,
    direct_chat_room_id: &str,
) -> anyhow::Result<AddFriendResult> {
    let friend_info = sqlx::query!(
        r#"
            SELECT
                *
            FROM
                user
            WHERE
                id = ?
        "#,
        &friend_user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let result = AddFriendResult {
        direct_chat_room_id: direct_chat_room_id.to_string(),
        friend_use_id: friend_user_id.to_string(),
        friend_profile_image: match &friend_info[0].profile_image {
            Some(friend_profile_image) => Some(friend_profile_image.to_string()),
            None => None,
        },
        friend_nickname: match &friend_info[0].nickname {
            Some(friend_nickname) => Some(friend_nickname.to_string()),
            None => None,
        },
    };

    Ok(result)
}
