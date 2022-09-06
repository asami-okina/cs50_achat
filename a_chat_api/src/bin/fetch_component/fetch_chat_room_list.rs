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
/*
  チャットルーム一覧取得
*/
#[derive(Debug, Deserialize, Serialize)]
pub struct FetchChatRoomListPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchChatRoomListQuery {
    search_text: Option<String>,
}

// デフォルト値の取得
impl Default for FetchChatRoomListQuery {
    fn default() -> Self {
        Self { search_text: None }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub enum FetchChatRoomListResultEnum {
    // 検索にヒットしない場合(何も返さない)
    None,
    // 検索にヒットした場合(友達)
    Some(Vec<FetchChatRoomListResultEnumItem>),
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(tag = "type")]

pub enum FetchChatRoomListResultEnumItem {
    FetchChatRoomListSearchHitsFriendResult(FetchChatRoomListSearchHitsFriendResult),
    // 検索にヒットした場合(グループ)
    FetchChatRoomListSearchHitsGroupResult(FetchChatRoomListSearchHitsGroupResult),
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchChatRoomListSearchHitsFriendResult {
    direct_chat_room_id: u64,
    friend_user_id: String,
    friend_nickname: Option<String>,
    friend_profile_image: Option<String>,
    last_message_content: Option<String>,
    last_message_created_at: i32,
    unread_count: i64,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchChatRoomListSearchHitsGroupResult {
    group_chat_room_id: u64,
    group_name: String,
    group_image: Option<String>,
    last_message_content: Option<String>,
    last_message_created_at: i32,
    group_member_user_id: Vec<String>,
    unread_count: i64,
}

// handler
pub async fn handler_fetch_chat_room_list(
    Path(path): Path<FetchChatRoomListPath>,
    query: Option<Query<FetchChatRoomListQuery>>,
) -> Json<Value> {
    let user_id = path.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(query) = query.unwrap_or_default();
    let search_text = query.search_text;
    let search_text_group = search_text.clone();

    // friends
    let pool = mysqlpool_connect::mysqlpool_connect().await;
    let friend_result = fetch_chat_room_list_friend(&pool, &user_id, search_text)
        .await
        .unwrap();

    // group
    let pool = mysqlpool_connect::mysqlpool_connect().await;
    let group_result = fetch_chat_room_list_group(&pool, &user_id, search_text_group)
        .await
        .unwrap();

    // friendsとgroupのリストを合算させる
    let mut all_result = vec![];

    match friend_result {
        FetchChatRoomListResultEnum::Some(res) => {
            for friend_list in res {
                all_result.push(friend_list);
            }
        }
        FetchChatRoomListResultEnum::None => {}
    }

    match group_result {
        FetchChatRoomListResultEnum::Some(res) => {
            for group_result in res {
                all_result.push(group_result);
            }
        }
        FetchChatRoomListResultEnum::None => {}
    }

    // ソート
    // ①ソートするために、last_message_created_atをvecに抽出
    let all_result_last_message_created_at_list: Vec<i32> =
        last_message_created_at_list(&all_result);

    // ②①の配列で数値の比較を行い、同じindexを使用して大元のvecの並び替えを行う
    let sorted_all_result: &mut Vec<FetchChatRoomListResultEnumItem> =
        sort_last_message_created_at_list(&mut all_result, all_result_last_message_created_at_list);

    Json(json!({ "chat_room_list": sorted_all_result }))
}

// ①ソートするために、last_message_created_atをvecに抽出
pub fn last_message_created_at_list(array: &Vec<FetchChatRoomListResultEnumItem>) -> Vec<i32> {
    let mut total_list = vec![];

    for i in 0..array.len() {
        match &array[i] {
            FetchChatRoomListResultEnumItem::FetchChatRoomListSearchHitsFriendResult(res) => {
                total_list.push(res.last_message_created_at)
            }
            FetchChatRoomListResultEnumItem::FetchChatRoomListSearchHitsGroupResult(res) => {
                total_list.push(res.last_message_created_at)
            }
        }
    }
    total_list
}

// ②①の配列で数値の比較を行い、同じindexを使用して大元のvecの並び替えを行う
pub fn sort_last_message_created_at_list(
    all_result: &mut Vec<FetchChatRoomListResultEnumItem>,
    all_result_last_message_created_at_list: Vec<i32>,
) -> &mut Vec<FetchChatRoomListResultEnumItem> {
    let mut all_result_last_message_created_at_list =
        all_result_last_message_created_at_list.clone();
    for i in 0..all_result.len() {
        for j in 0..all_result.len() - i - 1 {
            if all_result_last_message_created_at_list[j + 1]
                < all_result_last_message_created_at_list[j]
            {
                all_result_last_message_created_at_list.swap(j, j + 1);
                all_result.swap(j, j + 1);
            }
        }
    }
    all_result
}

// SQL実行部分(Friends)
pub async fn fetch_chat_room_list_friend(
    pool: &MySqlPool,
    user_id: &str,
    search_text: Option<String>,
) -> anyhow::Result<FetchChatRoomListResultEnum> {
    let mut result_list = vec![];
    match search_text {
        Some(search_text) => {
            // search_textがある場合、user_idに紐づくチャットルーム一覧をsearch_textで更に絞る
            // search_textが友達のnicknameと一致
            // 友達
            // 該当userが関わるdirect_chat_room_idの取得
            let direct_chat_room_list = fetch_chat_room_list_direct_chat_room_id(&pool, &user_id)
                .await
                .unwrap();

            // direct_chat_room_idごとに以下を実行
            for direct_chat_room_id in &direct_chat_room_list {
                // direct_chat_room_idに紐づく2つのuser_idのうち、自分ではないuser_idの取得
                // 自分ではないuser_idのニックネーム、プロフィール画像を取得
                // かつ、相手のnick_nameがsearch_textに一致する
                let like_query = format!("{}{}{}", "%", search_text, "%");

                let result = sqlx::query!(
                    r#"
                        SELECT
                            dm.direct_chat_room_id as direct_chat_room_id,
                            dm.user_id as friend_user_id,
                            u.nickname as friend_nickname,
                            u.profile_image as friend_profile_image
                        FROM
                                direct_member as dm
                                INNER JOIN
                                    user as u
                                ON  u.id = dm.user_id
                        WHERE
                            dm.direct_chat_room_id = ?
                        AND dm.user_id != ?
                        and u.nickname LIKE ?
                    "#,
                    direct_chat_room_id,
                    user_id,
                    like_query
                )
                .fetch_all(pool)
                .await
                .unwrap();

                if result.len() == 0 {
                    // direct_chat_room_idに紐づく相手のuser_idがsearch_textにヒットしない場合
                    continue;
                } else {
                    // direct_chat_room_idに紐づく相手のuser_idがsearch_textにヒットした場合
                    let friend_user_id = &result[0].friend_user_id;
                    let friend_nickname = &result[0].friend_nickname;
                    let friend_profile_image = &result[0].friend_profile_image;

                    // 自分のuser_id、direct_chat_room_idでlast_read_timeを取得
                    let own_last_read_time = fetch_chat_room_list_own_last_read_time_friend(
                        &pool,
                        &user_id,
                        &direct_chat_room_id,
                    )
                    .await
                    .unwrap();

                    // 友達の場合の戻り値を生成
                    result_list = make_chat_room_list_result_list_friend(
                        &pool,
                        &direct_chat_room_id,
                        &own_last_read_time,
                        &friend_user_id,
                        *&friend_nickname.as_ref(),
                        *&friend_profile_image.as_ref(),
                        result_list,
                    )
                    .await
                    .unwrap();
                }
            }
        }
        None => {
            // search_textがない場合、user_idに紐づくチャットルーム一覧を取得
            // 友達
            // 該当userが関わるdirect_chat_room_idの取得
            let direct_chat_room_list = fetch_chat_room_list_direct_chat_room_id(&pool, &user_id)
                .await
                .unwrap();

            // direct_chat_room_idごとに以下を実行
            for direct_chat_room_id in &direct_chat_room_list {
                // direct_chat_room_idに紐づく2つのuser_idのうち、自分ではないuser_idの取得
                // 自分ではないuser_idのニックネーム、プロフィール画像を取得
                let result = sqlx::query!(
                    r#"
                        SELECT
                            dm.direct_chat_room_id as direct_chat_room_id,
                            dm.user_id as friend_user_id,
                            u.nickname as friend_nickname,
                            u.profile_image as friend_profile_image
                        FROM
                            direct_member as dm
                            INNER JOIN
                                user as u
                            ON  u.id = dm.user_id
                        WHERE
                            dm.direct_chat_room_id = ?
                        AND dm.user_id != ?
                    "#,
                    direct_chat_room_id,
                    user_id
                )
                .fetch_all(pool)
                .await
                .unwrap();

                let friend_user_id = &result[0].friend_user_id;
                let friend_nickname = &result[0].friend_nickname;
                let friend_profile_image = &result[0].friend_profile_image;

                // 自分のuser_id、direct_chat_room_idでlast_read_timeを取得
                let own_last_read_time = fetch_chat_room_list_own_last_read_time_friend(
                    &pool,
                    &user_id,
                    &direct_chat_room_id,
                )
                .await
                .unwrap();

                // 友達の場合の戻り値を生成
                result_list = make_chat_room_list_result_list_friend(
                    &pool,
                    &direct_chat_room_id,
                    &own_last_read_time,
                    &friend_user_id,
                    *&friend_nickname.as_ref(),
                    *&friend_profile_image.as_ref(),
                    result_list,
                )
                .await
                .unwrap();
            }
        }
    };

    Ok(FetchChatRoomListResultEnum::Some(result_list))
}

// SQL実行部分(Group)
pub async fn fetch_chat_room_list_group(
    pool: &MySqlPool,
    user_id: &str,
    search_text: Option<String>,
) -> anyhow::Result<FetchChatRoomListResultEnum> {
    let mut result_list = vec![];
    match search_text {
        Some(search_text) => {
            // search_textがある場合、user_idに紐づくチャットルーム一覧をsearch_textで更に絞る
            // search_textがグループ名と一致
            // グループ
            // 該当userが関わるgroup_chat_room_idの取得
            let group_chat_room_list = fetch_chat_room_list_group_chat_room_id(&pool, &user_id)
                .await
                .unwrap();

            // group_chat_room_idごとに以下を実行
            for group_chat_room_id in &group_chat_room_list {
                // direct_chat_room_idに紐づく2つのuser_idのうち、自分ではないuser_idの取得
                // グループのニックネーム、プロフィール画像を取得
                // かつ、グループ名がsearch_textに一致する
                let like_query = format!("{}{}{}", "%", search_text, "%");

                let result = sqlx::query!(
                    r#"
                        SELECT
                            id as group_chat_room_id,
                            group_name,
                            group_image
                        FROM
                            group_chat_room
                        WHERE
                            id = ?
                        AND group_name LIKE ?
                    "#,
                    group_chat_room_id,
                    like_query
                )
                .fetch_all(pool)
                .await
                .unwrap();

                if result.len() == 0 {
                    // group_chat_room_idに紐づくグループのチャットがsearch_textにヒットしない場合
                    continue;
                } else {
                    // group_chat_room_idに紐づくグループのチャットがsearch_textにヒットした場合
                    let group_name = &result[0].group_name;
                    let group_image = &result[0].group_image;

                    // グループメンバーのuser_idを取得
                    let group_member_user_ids: Vec<String> =
                        fetch_group_member_user_ids(&pool, &group_chat_room_id)
                            .await
                            .unwrap();

                    // 自分のuser_id、direct_chat_room_idでlast_read_timeを取得(Group)
                    let own_last_read_time = fetch_chat_room_list_own_last_read_time_group(
                        &pool,
                        &user_id,
                        &group_chat_room_id,
                    )
                    .await
                    .unwrap();

                    // グループの場合の戻り値を生成
                    result_list = make_chat_room_list_result_list_group(
                        &pool,
                        &group_chat_room_id,
                        &own_last_read_time,
                        &user_id,
                        group_name,
                        *&group_image.as_ref(),
                        group_member_user_ids,
                        result_list,
                    )
                    .await
                    .unwrap();
                }
            }
        }
        None => {
            // search_textがない場合、user_idに紐づくチャットルーム一覧を取得
            // グループ
            // 該当userが関わるgroup_chat_room_idの取得
            let group_chat_room_list = fetch_chat_room_list_group_chat_room_id(&pool, &user_id)
                .await
                .unwrap();

            // group_chat_room_idごとに以下を実行
            for group_chat_room_id in &group_chat_room_list {
                // グループのニックネーム、プロフィール画像を取得
                let result = sqlx::query!(
                    r#"
                        SELECT
                            id as group_chat_room_id,
                            group_name,
                            group_image
                        FROM
                            group_chat_room
                        WHERE
                            id = ?
                    "#,
                    group_chat_room_id
                )
                .fetch_all(pool)
                .await
                .unwrap();

                let group_name = &result[0].group_name;
                let group_image = &result[0].group_image;

                // グループメンバーのuser_idを取得
                let group_member_user_ids: Vec<String> =
                    fetch_group_member_user_ids(&pool, &group_chat_room_id)
                        .await
                        .unwrap();

                // 自分のuser_id、group_chat_room_idでlast_read_timeを取得
                let own_last_read_time = fetch_chat_room_list_own_last_read_time_group(
                    &pool,
                    &user_id,
                    &group_chat_room_id,
                )
                .await
                .unwrap();

                // グループの場合の戻り値を生成
                result_list = make_chat_room_list_result_list_group(
                    &pool,
                    &group_chat_room_id,
                    &own_last_read_time,
                    &user_id,
                    group_name,
                    *&group_image.as_ref(),
                    group_member_user_ids,
                    result_list,
                )
                .await
                .unwrap();
            }
        }
    };

    Ok(FetchChatRoomListResultEnum::Some(result_list))
}

// group_member_user_idsの取得(Group)
pub async fn fetch_group_member_user_ids(
    pool: &MySqlPool,
    group_chat_room_id: &u64,
) -> anyhow::Result<Vec<String>> {
    let result = sqlx::query!(
        r#"
            SELECT
            user_id
            FROM
                group_member
            WHERE
                group_chat_room_id = ?
            AND leave_flag = FALSE
        "#,
        group_chat_room_id
    )
    .fetch_all(pool)
    .await
    .unwrap();
    let mut group_member_user_ids = vec![];

    for list in &result {
        group_member_user_ids.push(list.user_id.clone());
    }
    Ok(group_member_user_ids)
}

// 該当userが関わるdirect_chat_room_idの取得
pub async fn fetch_chat_room_list_direct_chat_room_id(
    pool: &MySqlPool,
    user_id: &str,
) -> anyhow::Result<Vec<u64>> {
    let result = sqlx::query!(
        r#"
            SELECT
            direct_chat_room_id
            FROM
                direct_member
            WHERE
                user_id = ?
            AND message_delete_flag = FALSE
            AND message_hidden_flag = FALSE
        "#,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut direct_chat_room_list: Vec<u64> = vec![];

    // direct_chat_room_idをvecに入れ直す
    for list in &result {
        direct_chat_room_list.push(list.direct_chat_room_id);
    }
    Ok(direct_chat_room_list)
}

// 該当userが関わるgroup_chat_room_idの取得
pub async fn fetch_chat_room_list_group_chat_room_id(
    pool: &MySqlPool,
    user_id: &str,
) -> anyhow::Result<Vec<u64>> {
    let result = sqlx::query!(
        r#"
            SELECT
            group_chat_room_id
            FROM
                group_member
            WHERE
                user_id = ?
            AND leave_flag = FALSE
            AND message_hidden_flag = FALSE
            AND message_delete_flag = FALSE
        "#,
        user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut group_chat_room_list: Vec<u64> = vec![];

    // direct_chat_room_idをvecに入れ直す
    for list in &result {
        group_chat_room_list.push(list.group_chat_room_id);
    }
    Ok(group_chat_room_list)
}

// 自分のuser_id、direct_chat_room_idでlast_read_timeを取得(Friend)
pub async fn fetch_chat_room_list_own_last_read_time_friend(
    pool: &MySqlPool,
    user_id: &str,
    direct_chat_room_id: &u64,
) -> anyhow::Result<i32> {
    let result = sqlx::query!(
        r#"
            SELECT
            last_read_time
            FROM
                direct_member
            WHERE
                user_id = ?
            AND direct_chat_room_id = ?
        "#,
        user_id,
        direct_chat_room_id,
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let own_last_read_time = result[0].last_read_time;
    Ok(own_last_read_time)
}

// 自分のuser_id、direct_chat_room_idでlast_read_timeを取得(Group)
pub async fn fetch_chat_room_list_own_last_read_time_group(
    pool: &MySqlPool,
    user_id: &str,
    group_chat_room_id: &u64,
) -> anyhow::Result<i32> {
    let result = sqlx::query!(
        r#"
            SELECT
            last_read_time
            FROM
                group_member
            WHERE
                user_id = ?
            AND group_chat_room_id = ?
        "#,
        user_id,
        group_chat_room_id,
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let own_last_read_time = result[0].last_read_time;
    Ok(own_last_read_time)
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchChatRoomListLastMessageInfoFriendResult {
    direct_chat_room_id: u64,
    sender_id: String,
    content: String,
    created_at: i32,
}

#[derive(Debug, Deserialize, Serialize)]
pub enum FetchChatRoomListLastMessageInfoFriendEnum {
    None,
    Some(Vec<FetchChatRoomListLastMessageInfoFriendResult>),
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FetchChatRoomListLastMessageInfoGroupResult {
    group_chat_room_id: u64,
    sender_id: String,
    content: String,
    created_at: i32,
}

#[derive(Debug, Deserialize, Serialize)]
pub enum FetchChatRoomListLastMessageInfoGroupEnum {
    None,
    Some(Vec<FetchChatRoomListLastMessageInfoGroupResult>),
}

// 最終メッセージ情報の取得(Friend)
pub async fn fetch_chat_room_list_last_message_info_friend(
    pool: &MySqlPool,
    direct_chat_room_id: &u64,
) -> anyhow::Result<FetchChatRoomListLastMessageInfoFriendEnum> {
    let result = sqlx::query!(
        r#"
            SELECT
            direct_chat_room_id,
            sender_id,
            content,
            created_at
            FROM
                message
            WHERE
                direct_chat_room_id = ?
            ORDER BY
                created_at DESC
            LIMIT 1
        "#,
        direct_chat_room_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut message_info_list = vec![];

    if result.len() == 0 {
        // メッセージがない場合
        return Ok(FetchChatRoomListLastMessageInfoFriendEnum::None);
    } else {
        for list in &result {
            let pre_result = FetchChatRoomListLastMessageInfoFriendResult {
                direct_chat_room_id: list.direct_chat_room_id.unwrap(), // direct_chat_room_idは必ず値が入るため、unwrap()を許容
                sender_id: list.sender_id.clone(),
                content: list.content.clone(),
                created_at: list.created_at,
            };
            message_info_list.push(pre_result);
        }
        Ok(FetchChatRoomListLastMessageInfoFriendEnum::Some(
            message_info_list,
        ))
    }
}

// 最終メッセージ情報の取得(Group)
pub async fn fetch_chat_room_list_last_message_info_group(
    pool: &MySqlPool,
    group_chat_room_id: &u64,
) -> anyhow::Result<FetchChatRoomListLastMessageInfoGroupEnum> {
    let result = sqlx::query!(
        r#"
            SELECT
            group_chat_room_id,
            sender_id,
            content,
            created_at
            FROM
                message
            WHERE
                group_chat_room_id = ?
            ORDER BY
                created_at DESC
            LIMIT 1
        "#,
        group_chat_room_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut message_info_list = vec![];

    if result.len() == 0 {
        // メッセージがない場合
        return Ok(FetchChatRoomListLastMessageInfoGroupEnum::None);
    } else {
        for list in &result {
            let pre_result = FetchChatRoomListLastMessageInfoGroupResult {
                group_chat_room_id: list.group_chat_room_id.unwrap(), // group_chat_room_idは必ず値が入るため、unwrap()を許容
                sender_id: list.sender_id.clone(),
                content: list.content.clone(),
                created_at: list.created_at,
            };
            message_info_list.push(pre_result);
        }
        Ok(FetchChatRoomListLastMessageInfoGroupEnum::Some(
            message_info_list,
        ))
    }
}

// unread_countの取得(Friend)
pub async fn fetch_chat_room_list_last_message_info_unread_count_friend(
    pool: &MySqlPool,
    direct_chat_room_id: &u64,
    &own_last_read_time: &i32,
    friend_user_id: &str,
) -> anyhow::Result<i64> {
    let result = sqlx::query!(
        r#"
            SELECT
            COUNT(*) as unread_count
            FROM
                message
            WHERE
                direct_chat_room_id = ?
            AND created_at > ?
            AND sender_id = ?
        "#,
        direct_chat_room_id,
        own_last_read_time,
        friend_user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let unread_count = &result[0].unread_count;
    Ok(*unread_count)
}

// unread_countの取得(Group)
pub async fn fetch_chat_room_list_last_message_info_unread_count_group(
    pool: &MySqlPool,
    group_chat_room_id: &u64,
    &own_last_read_time: &i32,
    own_user_id: &str,
) -> anyhow::Result<i64> {
    let result = sqlx::query!(
        r#"
            SELECT
            COUNT(*) as unread_count
            FROM
                message
            WHERE
                group_chat_room_id = ?
            AND created_at > ?
            AND sender_id != ?
        "#,
        group_chat_room_id,
        own_last_read_time,
        own_user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let unread_count = &result[0].unread_count;
    Ok(*unread_count)
}

// 友達の場合の戻り値を生成
pub async fn make_chat_room_list_result_list_friend(
    pool: &MySqlPool,
    direct_chat_room_id: &u64,
    &own_last_read_time: &i32,
    friend_user_id: &String,
    friend_nickname: Option<&String>,
    friend_profile_image: Option<&String>,
    mut result_list: Vec<FetchChatRoomListResultEnumItem>,
) -> anyhow::Result<Vec<FetchChatRoomListResultEnumItem>> {
    // 最終メッセージ情報の取得
    let last_message_info =
        fetch_chat_room_list_last_message_info_friend(&pool, &direct_chat_room_id)
            .await
            .unwrap();
    match last_message_info {
        FetchChatRoomListLastMessageInfoFriendEnum::Some(last_message_info) => {
            // 過去に該当の友達とメッセージのやりとりをしたことがある場合
            let last_message_content = &last_message_info[0].content;
            let last_message_created_at = &last_message_info[0].created_at;

            // unread_countの取得
            // 相手のメッセージ送信時間が自分のチャット確認時間より後(大きい)の件数を取得
            let unread_count = fetch_chat_room_list_last_message_info_unread_count_friend(
                &pool,
                &direct_chat_room_id,
                &own_last_read_time,
                &friend_user_id,
            )
            .await
            .unwrap();

            let result = FetchChatRoomListResultEnumItem::FetchChatRoomListSearchHitsFriendResult(
                FetchChatRoomListSearchHitsFriendResult {
                    direct_chat_room_id: direct_chat_room_id.clone(),
                    friend_user_id: friend_user_id.to_string(),
                    friend_nickname: match &friend_nickname {
                        Some(friend_nickname) => Some(friend_nickname.to_string()),
                        None => None,
                    },
                    friend_profile_image: match &friend_profile_image {
                        Some(friend_profile_image) => Some(friend_profile_image.to_string()),
                        None => None,
                    },
                    last_message_content: Some(last_message_content.to_string()),
                    last_message_created_at: *last_message_created_at,
                    unread_count: unread_count,
                },
            );

            result_list.push(result);
        }
        FetchChatRoomListLastMessageInfoFriendEnum::None => {
            // まだ該当の友達とメッセージのやり取りをしたことがない場合
        }
    };
    Ok(result_list)
}

// グループの場合の戻り値を生成
pub async fn make_chat_room_list_result_list_group(
    pool: &MySqlPool,
    group_chat_room_id: &u64,
    &own_last_read_time: &i32,
    own_user_id: &str,
    group_name: &String,
    group_image: Option<&String>,
    group_member_user_ids: Vec<String>,
    mut result_list: Vec<FetchChatRoomListResultEnumItem>,
) -> anyhow::Result<Vec<FetchChatRoomListResultEnumItem>> {
    // 最終メッセージ情報の取得
    let last_message_info =
        fetch_chat_room_list_last_message_info_group(&pool, &group_chat_room_id)
            .await
            .unwrap();
    match last_message_info {
        FetchChatRoomListLastMessageInfoGroupEnum::Some(last_message_info) => {
            // 過去に該当の友達とメッセージのやりとりをしたことがある場合
            let last_message_content = &last_message_info[0].content;
            let last_message_created_at = &last_message_info[0].created_at;

            // unread_countの取得
            // 相手のメッセージ送信時間が自分のチャット確認時間より後(大きい)の件数を取得
            let unread_count = fetch_chat_room_list_last_message_info_unread_count_group(
                &pool,
                &group_chat_room_id,
                &own_last_read_time,
                &own_user_id,
            )
            .await
            .unwrap();

            let result = FetchChatRoomListResultEnumItem::FetchChatRoomListSearchHitsGroupResult(
                FetchChatRoomListSearchHitsGroupResult {
                    group_chat_room_id: group_chat_room_id.clone(),
                    group_name: group_name.clone(),
                    group_image: match &group_image {
                        Some(group_image) => Some(group_image.to_string()),
                        None => None,
                    },
                    group_member_user_id: group_member_user_ids,
                    last_message_content: Some(last_message_content.to_string()),
                    last_message_created_at: *last_message_created_at,
                    unread_count: unread_count,
                },
            );

            result_list.push(result);
        }
        FetchChatRoomListLastMessageInfoGroupEnum::None => {
            // まだ該当の友達とメッセージのやり取りをしたことがない場合
        }
    };
    Ok(result_list)
}
