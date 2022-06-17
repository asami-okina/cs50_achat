use axum::{
    routing::get,
    routing::post,
    Router,
    response::Json,
    extract::{Path,Query},
};
mod component;
// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRustのオブジェクトに変換
use serde::{Serialize, Deserialize};
use serde_json::{Value, json};

use sqlx::mysql::MySqlPool;
use std::{env, fmt::Debug};
use dotenv::dotenv;
use std::time::SystemTime;

#[tokio::main]
async fn main(){
    // .endファイルの中身の変数を取得し、環境変数として使用できるようにする
    dotenv().ok();
    //単一ルートでアプリケーションを構築する
    // handler: 何らかの処理要求が発生した時に起動されるプログラムのこと
    // handlerはアプリケーションのロジックが存在する場所
    let app = Router::new()
        .route("/api/fetch-all-users", get(component::fetch_all_users::handler_fetch_all_users))
        .route("/api/signup", post(component::sign_up::handler_sign_up))
        .route("/api/signup/is_available_mail_validation", get(component::is_available_mail_validation::handler_is_available_mail_validation))
        .route("/api/signup/is_available_user_id_validation/:user_id", get(component::is_available_user_id_validation::handler_is_available_user_id_validation))
        .route("/api/login", post(component::log_in::handler_log_in))
        .route("/api/users/:user_id/home", get(component::search_name::handler_search_name))
        .route("/api/users/:user_id/groups", get(component::fetch_group_list::handler_fetch_group_list))
        .route("/api/users/:user_id/groups/leave", post(component::leave_group::handler_leave_group))
        .route("/api/users/:user_id/groups/add", post(component::add_group::handler_add_group))
        .route("/api/users/:user_id/group-count", get(component::fetch_group_count::handler_fetch_group_count))
        .route("/api/users/:user_id/friend-count", get(component::fetch_friend_count::handler_fetch_friend_count))
        .route("/api/users/:user_id/friends", get(component::fetch_friend_list::handler_fetch_friend_list))
        .route("/api/users/:user_id/friends", post(component::add_friend::handler_add_friend))
        .route("/api/users/:user_id/profile", get(component::fetch_profile_by_user_id::handler_fetch_profile_by_user_id))
        .route("/api/users/:user_id/profile", post(component::update_profile::handler_update_profile))
        .route("/api/users/:user_id/user", get(component::fetch_friend_info_by_friend_user_id::handler_fetch_friend_info_by_friend_user_id))
        .route("/api/users/:user_id/chat-room", get(handler_fetch_chat_room_list))
        .route("/api/users/:user_id/chat-room", post(handler_update_chat_room_hidden_or_delete))
        .route("/api/users/:user_id/message", get(handler_fetch_message_by_chat_room_id))
        .route("/api/users/:user_id/message", post(handler_post_message))
        .route("/api/users/:user_id/last-read-time", post(handler_update_last_read_time))
        .route("/api/users/:user_id/group-member", post(handler_add_group_member))
        .route("/api/users/:user_id/friend", get(handler_fetch_is_already_friend))
        .route("/api/users/:user_id/chat", get(handler_fetch_user_ids_by_direct_or_group_chat_room_id));

    // localhost:3000 で hyper と共に実行する
    axum::Server::bind(&"127.0.0.1:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
 
}

/*
  チャットルーム一覧取得
*/
#[derive(Debug, Deserialize, Serialize)]
struct FetchChatRoomListPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchChatRoomListQuery {
    search_text: Option<String>,
}

// デフォルト値の取得
impl Default for FetchChatRoomListQuery {
    fn default() -> Self {
        Self { search_text: None }
    }
}

#[derive(Debug, Deserialize, Serialize)]
enum FetchChatRoomListResultEnum {
    // 検索にヒットしない場合(何も返さない)
    None,
    // 検索にヒットした場合(友達)
    Some(Vec<FetchChatRoomListResultEnumItem>)
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(tag = "type")]

enum FetchChatRoomListResultEnumItem {
    FetchChatRoomListSearchHitsFriendResult(FetchChatRoomListSearchHitsFriendResult),
    // 検索にヒットした場合(グループ)
    FetchChatRoomListSearchHitsGroupResult(FetchChatRoomListSearchHitsGroupResult)
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchChatRoomListSearchHitsFriendResult {
    direct_chat_room_id: u64,
    friend_user_id: String,
    friend_nickname: Option<String>,
    friend_profile_image: Option<String>,
    last_message_content: Option<String>,
    last_message_created_at: i32,
    unread_count: i64
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchChatRoomListSearchHitsGroupResult {
    group_chat_room_id: u64,
    group_name: String,
    group_image: Option<String>,
    last_message_content: Option<String>,
    last_message_created_at: i32,
    group_member_user_id: Vec<String>,
    unread_count: i64
}

// handler
async fn handler_fetch_chat_room_list(
    Path(path): Path<FetchChatRoomListPath>,
    query: Option<Query<FetchChatRoomListQuery>>,
) -> Json<Value> {
    let user_id = path.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(query) = query.unwrap_or_default();
    let search_text = query.search_text;
    let search_text_group = search_text.clone();

    // friends
    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let friend_result = fetch_chat_room_list_friend(&pool, &user_id, search_text).await.unwrap();

    // group
    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let group_result = fetch_chat_room_list_group(&pool, &user_id,search_text_group).await.unwrap();

    // friendsとgroupのリストを合算させる
    let mut all_result = vec![];

    match friend_result {
        FetchChatRoomListResultEnum::Some(res) => {
            for friend_list in res {
                all_result.push(friend_list);
            }
        }, 
        FetchChatRoomListResultEnum::None => {
        }
    }

    match group_result {
        FetchChatRoomListResultEnum::Some(res) => {
            for group_result in res {
                all_result.push(group_result);
            }
        }, 
        FetchChatRoomListResultEnum::None => {
        }
    }

    // ソート
    // ①ソートするために、last_message_created_atをvecに抽出
    let all_result_last_message_created_at_list:Vec<i32> = last_message_created_at_list(&all_result);

    // ②①の配列で数値の比較を行い、同じindexを使用して大元のvecの並び替えを行う
    let sorted_all_result:&mut Vec<FetchChatRoomListResultEnumItem> = sort_last_message_created_at_list(&mut all_result, all_result_last_message_created_at_list);

    Json(json!({ "chat_room_list": sorted_all_result }))
}

// ①ソートするために、last_message_created_atをvecに抽出
fn last_message_created_at_list(array: &Vec<FetchChatRoomListResultEnumItem>) -> Vec<i32> {
    let mut total_list = vec![];

    for i in 0..array.len() {
        match &array[i] {
            FetchChatRoomListResultEnumItem::FetchChatRoomListSearchHitsFriendResult(res) => {
                total_list.push(res.last_message_created_at)
            },
            FetchChatRoomListResultEnumItem::FetchChatRoomListSearchHitsGroupResult(res) => {
                total_list.push(res.last_message_created_at)
            }
        }
    }
    total_list
}

// ②①の配列で数値の比較を行い、同じindexを使用して大元のvecの並び替えを行う
fn sort_last_message_created_at_list(all_result: &mut Vec<FetchChatRoomListResultEnumItem>, all_result_last_message_created_at_list:Vec<i32>) -> &mut Vec<FetchChatRoomListResultEnumItem> {
    let mut all_result_last_message_created_at_list = all_result_last_message_created_at_list.clone();
    for i in 0..all_result.len() {
      for j in 0..all_result.len() - i - 1 {
        if all_result_last_message_created_at_list[j + 1] < all_result_last_message_created_at_list[j] {
            all_result_last_message_created_at_list.swap(j, j + 1);
            all_result.swap(j, j + 1);
        }
      }
    }
    all_result
}


// SQL実行部分(Friends)
async fn fetch_chat_room_list_friend(pool: &MySqlPool, user_id: &str, search_text: Option<String>) -> anyhow::Result<FetchChatRoomListResultEnum> {
    let mut result_list = vec![];
    match search_text {
        Some(search_text) => {
        // search_textがある場合、user_idに紐づくチャットルーム一覧をsearch_textで更に絞る
        // search_textが友達のnicknameと一致
        // 友達
        // 該当userが関わるdirect_chat_room_idの取得
        let direct_chat_room_list = fetch_chat_room_list_direct_chat_room_id(&pool, &user_id).await.unwrap();

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
                continue
            } else {
                // direct_chat_room_idに紐づく相手のuser_idがsearch_textにヒットした場合
                let friend_user_id = &result[0].friend_user_id;
                let friend_nickname = &result[0].friend_nickname;
                let friend_profile_image = &result[0].friend_profile_image;
    
                // 自分のuser_id、direct_chat_room_idでlast_read_timeを取得
                let own_last_read_time = fetch_chat_room_list_own_last_read_time_friend(&pool, &user_id, &direct_chat_room_id).await.unwrap();
    
                // 友達の場合の戻り値を生成
                result_list = make_chat_room_list_result_list_friend(&pool, &direct_chat_room_id, &own_last_read_time, &friend_user_id, *&friend_nickname.as_ref(), *&friend_profile_image.as_ref(), result_list).await.unwrap();
            }
        }
        },
        None => {
            // search_textがない場合、user_idに紐づくチャットルーム一覧を取得
            // 友達
            // 該当userが関わるdirect_chat_room_idの取得
            let direct_chat_room_list = fetch_chat_room_list_direct_chat_room_id(&pool, &user_id).await.unwrap();

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
                let own_last_read_time = fetch_chat_room_list_own_last_read_time_friend(&pool, &user_id, &direct_chat_room_id).await.unwrap();
                
                // 友達の場合の戻り値を生成
                result_list = make_chat_room_list_result_list_friend(&pool, &direct_chat_room_id, &own_last_read_time, &friend_user_id, *&friend_nickname.as_ref(), *&friend_profile_image.as_ref(), result_list).await.unwrap();
            }
        },
    };

    Ok(FetchChatRoomListResultEnum::Some(result_list))  
}

// SQL実行部分(Group)
async fn fetch_chat_room_list_group(pool: &MySqlPool, user_id: &str, search_text: Option<String>) -> anyhow::Result<FetchChatRoomListResultEnum> {
    let mut result_list = vec![];
    match search_text {
        Some(search_text) => {
        // search_textがある場合、user_idに紐づくチャットルーム一覧をsearch_textで更に絞る
        // search_textがグループ名と一致
        // グループ
        // 該当userが関わるgroup_chat_room_idの取得
        let group_chat_room_list = fetch_chat_room_list_group_chat_room_id(&pool, &user_id).await.unwrap();

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
                continue
            } else {
                // group_chat_room_idに紐づくグループのチャットがsearch_textにヒットした場合
                let group_name = &result[0].group_name;
                let group_image = &result[0].group_image;

                // グループメンバーのuser_idを取得
                let group_member_user_ids: Vec<String> = fetch_group_member_user_ids(&pool, &group_chat_room_id).await.unwrap();

                // 自分のuser_id、direct_chat_room_idでlast_read_timeを取得(Group)
                let own_last_read_time = fetch_chat_room_list_own_last_read_time_group(&pool, &user_id, &group_chat_room_id).await.unwrap();

                // グループの場合の戻り値を生成
                result_list = make_chat_room_list_result_list_group(&pool, &group_chat_room_id, &own_last_read_time, &user_id, group_name, *&group_image.as_ref(), group_member_user_ids, result_list).await.unwrap();
            }
        }
        },
        None => {
            // search_textがない場合、user_idに紐づくチャットルーム一覧を取得
            // グループ
            // 該当userが関わるgroup_chat_room_idの取得
            let group_chat_room_list = fetch_chat_room_list_group_chat_room_id(&pool, &user_id).await.unwrap();

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
                let group_member_user_ids: Vec<String> = fetch_group_member_user_ids(&pool, &group_chat_room_id).await.unwrap();

                // 自分のuser_id、group_chat_room_idでlast_read_timeを取得
                let own_last_read_time = fetch_chat_room_list_own_last_read_time_group(&pool, &user_id, &group_chat_room_id).await.unwrap();
                
                // グループの場合の戻り値を生成
                result_list = make_chat_room_list_result_list_group(&pool, &group_chat_room_id, &own_last_read_time, &user_id, group_name, *&group_image.as_ref(), group_member_user_ids, result_list).await.unwrap();
            }
        },
    };

    Ok(FetchChatRoomListResultEnum::Some(result_list))  
}

// group_member_user_idsの取得(Group)
async fn fetch_group_member_user_ids(pool: &MySqlPool,group_chat_room_id: &u64) -> anyhow::Result<Vec<String>> {
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
async fn fetch_chat_room_list_direct_chat_room_id(pool: &MySqlPool, user_id:&str) -> anyhow::Result<Vec<u64>>{
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


    let mut direct_chat_room_list:Vec<u64> = vec![];

    // direct_chat_room_idをvecに入れ直す
    for list in &result{
        direct_chat_room_list.push(list.direct_chat_room_id);
    }
    Ok(direct_chat_room_list)
}

// 該当userが関わるgroup_chat_room_idの取得
async fn fetch_chat_room_list_group_chat_room_id(pool: &MySqlPool, user_id:&str) -> anyhow::Result<Vec<u64>>{
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


    let mut group_chat_room_list:Vec<u64> = vec![];

    // direct_chat_room_idをvecに入れ直す
    for list in &result{
        group_chat_room_list.push(list.group_chat_room_id);
    }
    Ok(group_chat_room_list)
}

// 自分のuser_id、direct_chat_room_idでlast_read_timeを取得(Friend)
async fn fetch_chat_room_list_own_last_read_time_friend(pool: &MySqlPool, user_id:&str, direct_chat_room_id: &u64) -> anyhow::Result<i32> {
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
async fn fetch_chat_room_list_own_last_read_time_group(pool: &MySqlPool, user_id:&str, group_chat_room_id: &u64) -> anyhow::Result<i32> {
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
struct  FetchChatRoomListLastMessageInfoFriendResult {
    direct_chat_room_id: u64,
    sender_id: String,
    content: String,
    created_at: i32
}

#[derive(Debug, Deserialize, Serialize)]
enum FetchChatRoomListLastMessageInfoFriendEnum {
    None,
    Some(Vec<FetchChatRoomListLastMessageInfoFriendResult>)
}

#[derive(Debug, Deserialize, Serialize)]
struct  FetchChatRoomListLastMessageInfoGroupResult {
    group_chat_room_id: u64,
    sender_id: String,
    content: String,
    created_at: i32
}

#[derive(Debug, Deserialize, Serialize)]
enum FetchChatRoomListLastMessageInfoGroupEnum {
    None,
    Some(Vec<FetchChatRoomListLastMessageInfoGroupResult>)
}

// 最終メッセージ情報の取得(Friend)
async fn fetch_chat_room_list_last_message_info_friend(pool: &MySqlPool, direct_chat_room_id: &u64) -> anyhow::Result<FetchChatRoomListLastMessageInfoFriendEnum>{
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
        return Ok(FetchChatRoomListLastMessageInfoFriendEnum::None)
    } else {
        for list in &result {
            let pre_result = FetchChatRoomListLastMessageInfoFriendResult {
                direct_chat_room_id: list.direct_chat_room_id.unwrap(), // direct_chat_room_idは必ず値が入るため、unwrap()を許容
                sender_id: list.sender_id.clone(),
                content: list.content.clone(),
                created_at: list.created_at
            };
            message_info_list.push(pre_result);
        }
        Ok(FetchChatRoomListLastMessageInfoFriendEnum::Some(message_info_list))
    }

}

// 最終メッセージ情報の取得(Group)
async fn fetch_chat_room_list_last_message_info_group(pool: &MySqlPool, group_chat_room_id: &u64) -> anyhow::Result<FetchChatRoomListLastMessageInfoGroupEnum>{
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
        return Ok(FetchChatRoomListLastMessageInfoGroupEnum::None)
    } else {
        for list in &result {
            let pre_result = FetchChatRoomListLastMessageInfoGroupResult {
                group_chat_room_id: list.group_chat_room_id.unwrap(), // group_chat_room_idは必ず値が入るため、unwrap()を許容
                sender_id: list.sender_id.clone(),
                content: list.content.clone(),
                created_at: list.created_at
            };
            message_info_list.push(pre_result);
        }
        Ok(FetchChatRoomListLastMessageInfoGroupEnum::Some(message_info_list))
    }
}

// unread_countの取得(Friend)
async fn fetch_chat_room_list_last_message_info_unread_count_friend(pool: &MySqlPool, direct_chat_room_id: &u64, &own_last_read_time: &i32, friend_user_id:&str) -> anyhow::Result<i64>{
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
async fn fetch_chat_room_list_last_message_info_unread_count_group(pool: &MySqlPool, group_chat_room_id: &u64, &own_last_read_time: &i32, own_user_id:&str) -> anyhow::Result<i64>{
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
async fn make_chat_room_list_result_list_friend(pool: &MySqlPool, direct_chat_room_id: &u64, &own_last_read_time:&i32, friend_user_id:&String, friend_nickname:Option<&String>,friend_profile_image: Option<&String> , mut result_list:Vec<FetchChatRoomListResultEnumItem>) -> anyhow::Result<Vec<FetchChatRoomListResultEnumItem>>{
     // 最終メッセージ情報の取得
     let last_message_info = fetch_chat_room_list_last_message_info_friend(&pool, &direct_chat_room_id).await.unwrap();
     match last_message_info {
         FetchChatRoomListLastMessageInfoFriendEnum::Some(last_message_info) => {
             // 過去に該当の友達とメッセージのやりとりをしたことがある場合
             let last_message_content = &last_message_info[0].content;
             let last_message_created_at = &last_message_info[0].created_at;

             // unread_countの取得
             // 相手のメッセージ送信時間が自分のチャット確認時間より後(大きい)の件数を取得
             let unread_count = fetch_chat_room_list_last_message_info_unread_count_friend(&pool, &direct_chat_room_id, &own_last_read_time, &friend_user_id).await.unwrap();

             let result = FetchChatRoomListResultEnumItem::FetchChatRoomListSearchHitsFriendResult ( FetchChatRoomListSearchHitsFriendResult {
                 direct_chat_room_id: direct_chat_room_id.clone(),
                 friend_user_id: friend_user_id.to_string(),
                 friend_nickname: match &friend_nickname{
                     Some(friend_nickname) => Some(friend_nickname.to_string()),
                     None => None
                 },
                 friend_profile_image: match &friend_profile_image{
                     Some(friend_profile_image) => Some(friend_profile_image.to_string()),
                     None => None
                 },
                 last_message_content: Some(last_message_content.to_string()),
                 last_message_created_at: *last_message_created_at,
                 unread_count: unread_count
             });

             result_list.push(result);

         },
         FetchChatRoomListLastMessageInfoFriendEnum::None => {
             // まだ該当の友達とメッセージのやり取りをしたことがない場合
         }
     };
     Ok(result_list)
}

// グループの場合の戻り値を生成
async fn make_chat_room_list_result_list_group(pool: &MySqlPool, group_chat_room_id: &u64, &own_last_read_time:&i32, own_user_id: &str, group_name:&String,group_image: Option<&String> ,group_member_user_ids: Vec<String>, mut result_list:Vec<FetchChatRoomListResultEnumItem>) -> anyhow::Result<Vec<FetchChatRoomListResultEnumItem>> {
    // 最終メッセージ情報の取得
    let last_message_info = fetch_chat_room_list_last_message_info_group(&pool, &group_chat_room_id).await.unwrap();
    match last_message_info {
        FetchChatRoomListLastMessageInfoGroupEnum::Some(last_message_info) => {
            // 過去に該当の友達とメッセージのやりとりをしたことがある場合
            let last_message_content = &last_message_info[0].content;
            let last_message_created_at = &last_message_info[0].created_at;

            // unread_countの取得
            // 相手のメッセージ送信時間が自分のチャット確認時間より後(大きい)の件数を取得
            let unread_count = fetch_chat_room_list_last_message_info_unread_count_group(&pool, &group_chat_room_id, &own_last_read_time, &own_user_id).await.unwrap();

            let result = FetchChatRoomListResultEnumItem::FetchChatRoomListSearchHitsGroupResult ( FetchChatRoomListSearchHitsGroupResult {
                group_chat_room_id: group_chat_room_id.clone(),
                group_name: group_name.clone(),
                group_image: match &group_image{
                    Some(group_image) => Some(group_image.to_string()),
                    None => None
                },
                group_member_user_id: group_member_user_ids,
                last_message_content: Some(last_message_content.to_string()),
                last_message_created_at: *last_message_created_at,
                unread_count: unread_count
            });

            result_list.push(result);

        },
        FetchChatRoomListLastMessageInfoGroupEnum::None => {
            // まだ該当の友達とメッセージのやり取りをしたことがない場合
        }
    };
    Ok(result_list)
}

/*
  チャットの表示/非表示、削除
*/

// handler
#[derive(Debug, Deserialize, Serialize)]
struct UpdateChatRoomHiddenOrDeletePath {
    user_id: String
}
#[derive(Debug, Deserialize, Serialize)]
struct UpdateChatRoomHiddenOrDeleteJson {
    direct_chat_room_id: Option<u64>,
    group_chat_room_id: Option<u64>,
    update_type: String,
}

async fn handler_update_chat_room_hidden_or_delete(
    Path(path): Path<UpdateChatRoomHiddenOrDeletePath>,
    body_json: Json<UpdateChatRoomHiddenOrDeleteJson>
) -> Json<Value> {
    // user_idの取得
    let user_id = path.user_id;

    // direct_chat_room_idの取得
    let direct_chat_room_id = match &body_json.direct_chat_room_id{
        Some(direct_chat_room_id) => Some(direct_chat_room_id),
        None => None
    };

    // group_chat_room_idの取得
    let group_chat_room_id = match &body_json.group_chat_room_id{
        Some(group_chat_room_id) => Some(group_chat_room_id),
        None => None
    };

    // search_flagの取得
    let update_type = &body_json.update_type;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    update_chat_room_hidden_or_delete(&pool, &user_id, direct_chat_room_id, group_chat_room_id, &update_type).await.unwrap();
    Json(json!({ "status_code": 200 }))
}

// SQL実行部分
async fn update_chat_room_hidden_or_delete(pool: &MySqlPool, user_id: &str, direct_chat_room_id:Option<&u64>, group_chat_room_id:Option<&u64>, update_type:&String) -> anyhow::Result<()> {
    // message_hidden_flagの更新
    if update_type == "Hidden" {
        // direct_chat_room_idが存在する場合
        if let Some(_) = direct_chat_room_id {
            sqlx::query!(
                r#"
                    UPDATE
                        direct_member
                    SET
                        message_hidden_flag = ?
                    WHERE
                        user_id = ?
                    AND
                    direct_chat_room_id = ?
                "#,
                true,
                user_id,
                direct_chat_room_id
            )
            .execute(pool)
            .await?
            .rows_affected();
        }
    
        // group_chat_room_idが存在する場合
        if let Some(_) = group_chat_room_id {
            sqlx::query!(
                r#"
                    UPDATE
                        group_member
                    SET
                        message_hidden_flag = ?
                    WHERE
                        user_id = ?
                    AND
                        group_chat_room_id = ?
                "#,
                true,
                user_id,
                group_chat_room_id
            )
            .execute(pool)
            .await?
            .rows_affected();
        }
    }

    // message_delete_flagの更新
    if update_type == "Delete" {
        // direct_chat_room_idが存在する場合
        if let Some(_) = direct_chat_room_id {
            sqlx::query!(
                r#"
                    UPDATE
                        direct_member
                    SET
                        message_delete_flag = ?
                    WHERE
                        user_id = ?
                    AND
                        direct_chat_room_id = ?
                "#,
                true,
                user_id,
                direct_chat_room_id
            )
            .execute(pool)
            .await?
            .rows_affected();
        }
    
        // group_chat_room_idが存在する場合
        if let Some(_) = group_chat_room_id {
            sqlx::query!(
                r#"
                    UPDATE
                        group_member
                    SET
                        message_delete_flag = ?
                    WHERE
                        user_id = ?
                    AND
                        group_chat_room_id = ?
                "#,
                true,
                user_id,
                group_chat_room_id
            )
            .execute(pool)
            .await?
            .rows_affected();
        }
    }
    
    Ok(())
}

/*
  チャット履歴取得
*/
#[derive(Debug, Deserialize, Serialize)]
struct FetchMessageByChatRoomIdPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchMessageByChatRoomIdQuery {
    chat_room_type: FetchMessageByChatRoomIdQueryType,
    chat_room_id: Option<u64>
}

#[derive(Debug, Deserialize, Serialize,PartialEq)]
enum FetchMessageByChatRoomIdQueryType {
    DirectChatRoomId,
    GroupChatRoomId,
    None
}

// デフォルト値の取得
impl Default for FetchMessageByChatRoomIdQuery {
    fn default() -> Self {
        // direct_chat_room_id,group_chat_room_id、どちらかをnullで渡すとunwrapがpanicしてしまうため、typeで渡す
        Self { chat_room_type: FetchMessageByChatRoomIdQueryType::None, chat_room_id: None}
    }
}

// handler
async fn handler_fetch_message_by_chat_room_id(
    Path(path): Path<FetchMessageByChatRoomIdPath>,
    query: Option<Query<FetchMessageByChatRoomIdQuery>>,
) -> Json<Value> {
    let _user_id = path.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(query) = query.unwrap();
    let chat_room_type = query.chat_room_type;
    let chat_room_id = query.chat_room_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let messages = fetch_message_by_chat_room_id(&pool, chat_room_type, chat_room_id).await.unwrap();
    
    if let FetchMessageByChatRoomIdResultEnum::Some(m) = messages {
        Json(json!({ "messages": m }))
    }

    else {
        return Json(json!({ "messages": null }))
    }
}

#[derive(Debug, Deserialize, Serialize)]
enum FetchMessageByChatRoomIdResultEnum {
    // 検索にヒットしない場合(何も返さない)
    None,
    // 検索にヒットした場合
    Some(Vec<FetchMessageByChatRoomIdResultTypeEnum>)
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(tag = "type")]
enum FetchMessageByChatRoomIdResultTypeEnum {
    // メッセージ内容がTextの場合
    FetchMessageByChatRoomIdTextResult(FetchMessageByChatRoomIdTextResult),
    // メッセージ内容がImageの場合
    FetchMessageByChatRoomIdImageResult(FetchMessageByChatRoomIdImageResult)
}

#[derive(Debug, Deserialize, Serialize)]
// メッセージ内容がtextの場合
struct FetchMessageByChatRoomIdTextResult {
    _id: u64, // messageテーブルのid
    created_at: i32, // messageテーブルのcreated_at
    user: FetchMessageByChatRoomIdUserResult,
    text: Option<String>, // messageテーブルのcontent(type_idがtextのもの)
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchMessageByChatRoomIdImageResult {
    _id: u64, // messageテーブルのid
    created_at: i32, // messageテーブルのcreated_at
    user: FetchMessageByChatRoomIdUserResult,
    image: Option<String>, // messageテーブルのcontent(type_idがimageのもの)
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchMessageByChatRoomIdUserResult {
    _id: String, // messageテーブルのsender_id
    name: Option<String>, // messageテーブルのsender_idに紐づくuserテーブルのnickname
    avatar: Option<String>, //  messageテーブルのsender_idに紐づくuserテーブルのprofile_image
}

// SQL実行部分
async fn fetch_message_by_chat_room_id(pool: &MySqlPool, chat_room_type: FetchMessageByChatRoomIdQueryType, chat_room_id: Option<u64>) -> anyhow::Result<FetchMessageByChatRoomIdResultEnum> {
    // direct_chat_room_idが存在する場合
    if chat_room_type == FetchMessageByChatRoomIdQueryType::DirectChatRoomId {
       let  messages = parse_friend_fetch_message_by_chat_room_id_result(&pool, &chat_room_id).await.unwrap();
        return Ok(FetchMessageByChatRoomIdResultEnum::Some(messages))
    }

    // group_chat_room_idが存在する場合
    else if chat_room_type == FetchMessageByChatRoomIdQueryType::GroupChatRoomId {
        let messages = parse_group_fetch_message_by_chat_room_id_result(&pool, &chat_room_id).await.unwrap();
        return Ok(FetchMessageByChatRoomIdResultEnum::Some(messages))
    }

    // 該当しない場合
    else {
        return Ok(FetchMessageByChatRoomIdResultEnum::None)
    }
}


// resultの型に変換(Friend)
async fn parse_friend_fetch_message_by_chat_room_id_result(pool: &MySqlPool, chat_room_id: &Option<u64>) -> anyhow::Result<Vec<FetchMessageByChatRoomIdResultTypeEnum>> {
    let result = sqlx::query!(
        r#"
            SELECT
                m.id as message_id,
                m.created_at as created_at,
                m.content as content,
                m.content_type_id as content_type_id,
                u.profile_image as sender_profile_image,
                u.nickname as sender_nickname,
                u.id as sender_user_id
            FROM
                message as m
                INNER JOIN
                    user as u
                ON  m.sender_id = u.id
            WHERE
                m.direct_chat_room_id = ?
            ORDER BY
                m.created_at
            "#,
            chat_room_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut messages:Vec<FetchMessageByChatRoomIdResultTypeEnum> = vec![];

    for list in &result {
        let text_sender_info = FetchMessageByChatRoomIdUserResult {
            _id: list.sender_user_id.clone(),
            name: list.sender_nickname.clone(),
            avatar: list.sender_profile_image.clone()
        };
        // textの場合
        if list.content_type_id == 1 {
            let message_list = FetchMessageByChatRoomIdResultTypeEnum::FetchMessageByChatRoomIdTextResult(
                FetchMessageByChatRoomIdTextResult {
                    _id: list.message_id, // messageテーブルのid
                    created_at: list.created_at, // messageテーブルのcreated_at
                    user: text_sender_info,
                    text: Some(list.content.clone()), // messageテーブルのcontent(type_idがtextのもの)
                  }
            );
              messages.push(message_list);
        }
        let image_sender_info = FetchMessageByChatRoomIdUserResult {
            _id: list.sender_user_id.clone(),
            name: list.sender_nickname.clone(),
            avatar: list.sender_profile_image.clone()
        };

        // imageの場合
        if list.content_type_id == 2 {
            let message_list = FetchMessageByChatRoomIdResultTypeEnum::FetchMessageByChatRoomIdImageResult(
                FetchMessageByChatRoomIdImageResult {
                    _id: list.message_id, // messageテーブルのid
                    created_at: list.created_at, // messageテーブルのcreated_at
                    user: image_sender_info,
                    image: Some(list.content.clone()), // messageテーブルのcontent(type_idがimageのもの)
                    }
            );
                messages.push(message_list);
        }
    }

    Ok(messages)
}

// resultの型に変換(Group)
async fn parse_group_fetch_message_by_chat_room_id_result(pool: &MySqlPool, chat_room_id: &Option<u64>) -> anyhow::Result<Vec<FetchMessageByChatRoomIdResultTypeEnum>> {
    let result = sqlx::query!(
        r#"
            SELECT
                m.id as message_id,
                m.created_at as created_at,
                m.content as content,
                m.content_type_id as content_type_id,
                u.profile_image as sender_profile_image,
                u.nickname as sender_nickname,
                u.id as sender_user_id
            FROM
                message as m
                INNER JOIN
                    user as u
                ON  m.sender_id = u.id
            WHERE
                m.group_chat_room_id = ?
            ORDER BY
                m.created_at
            "#,
            chat_room_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut messages:Vec<FetchMessageByChatRoomIdResultTypeEnum> = vec![];

    for list in &result {
        let text_sender_info = FetchMessageByChatRoomIdUserResult {
            _id: list.sender_user_id.clone(),
            name: list.sender_nickname.clone(),
            avatar: list.sender_profile_image.clone()
        };
      // textの場合
      if list.content_type_id == 1 {
        let message_list = FetchMessageByChatRoomIdResultTypeEnum::FetchMessageByChatRoomIdTextResult(
            FetchMessageByChatRoomIdTextResult {
                _id: list.message_id, // messageテーブルのid
                created_at: list.created_at, // messageテーブルのcreated_at
                user: text_sender_info,
                text: Some(list.content.clone()), // messageテーブルのcontent(type_idがtextのもの)
              }
        );
          messages.push(message_list);
    }
    let image_sender_info = FetchMessageByChatRoomIdUserResult {
        _id: list.sender_user_id.clone(),
        name: list.sender_nickname.clone(),
        avatar: list.sender_profile_image.clone()
    };

    // imageの場合
    if list.content_type_id == 2 {
        let message_list = FetchMessageByChatRoomIdResultTypeEnum::FetchMessageByChatRoomIdImageResult(
            FetchMessageByChatRoomIdImageResult {
                _id: list.message_id, // messageテーブルのid
                created_at: list.created_at, // messageテーブルのcreated_at
                user: image_sender_info,
                image: Some(list.content.clone()), // messageテーブルのcontent(type_idがimageのもの)
                }
        );
            messages.push(message_list);
    }
    }

    Ok(messages)
}

/*
  チャット送信
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
struct PostMessagePath {
    user_id: String
}
#[derive(Debug, Deserialize, Serialize)]
struct PostMessageJson {
    chat_room_type: PostMessageChatRoomIdTypeEnum,
    chat_room_id: u64,
    content: String,
    content_type: PostMessageContentTypeEnum,
    sender_user_id: String,
}

#[derive(Debug, Deserialize, Serialize,PartialEq)]
enum PostMessageChatRoomIdTypeEnum {
    DirectChatRoomId,
    GroupChatRoomId,
    None
}

#[derive(Debug, Deserialize, Serialize,PartialEq)]
enum PostMessageContentTypeEnum {
    Text,
    Image
}

async fn handler_post_message(
    Path(path): Path<PostMessagePath>,
    body_json: Json<PostMessageJson>
) -> Json<Value> {
    // user_idの取得
    let _user_id = path.user_id;

    // chat_room_typeの取得
    let chat_room_type = &body_json.chat_room_type;

    // chat_room_idの取得
    let chat_room_id = &body_json.chat_room_id;

    // contentの取得
    let content = &body_json.content;
    

    // content_typeの取得
    let content_type = &body_json.content_type;
    

    // sender_user_idの取得
    let sender_user_id = &body_json.sender_user_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    post_message(&pool, chat_room_type, &chat_room_id, &content, content_type, &sender_user_id).await.unwrap();
    Json(json!({ "status_code": 200 }))
}

// SQL実行部分
async fn post_message(pool: &MySqlPool, chat_room_type: &PostMessageChatRoomIdTypeEnum, chat_room_id: &u64, content: &String, content_type: &PostMessageContentTypeEnum, sender_user_id: &String ) -> anyhow::Result<()> {
    let now = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs();
    // content_typeが「Text」の場合は「1」、「Image」の場合は「２」
    let content_type_id = if content_type == &PostMessageContentTypeEnum::Text {1} else {2};

    if chat_room_type == &PostMessageChatRoomIdTypeEnum::DirectChatRoomId {
        sqlx::query!(
            r#"
                INSERT INTO message ( content_type_id, sender_id, direct_chat_room_id, content, created_at )
                VALUES ( ?, ? , ? , ? , ?)
            "#,
            content_type_id,
            sender_user_id,
            chat_room_id,
            content,
            now
        )
        .execute(pool)
        .await
        .unwrap();
    }

    if chat_room_type == &PostMessageChatRoomIdTypeEnum::GroupChatRoomId {
        sqlx::query!(
            r#"
                INSERT INTO message ( content_type_id, sender_id, group_chat_room_id, content, created_at )
                VALUES ( ?, ? , ? , ? , ?)
            "#,
            content_type_id,
            sender_user_id,
            chat_room_id,
            content,
            now
        )
        .execute(pool)
        .await
        .unwrap();
    }

    Ok(())
}

/*
  最終既読日時の更新
*/
// handler
#[derive(Debug, Deserialize, Serialize)]
struct UpdateLastReadTimePath {
    user_id: String
}
#[derive(Debug, Deserialize, Serialize)]
struct UpdateLastReadTimeJson {
    chat_room_type: UpdateLastReadTimeEnum,
    chat_room_id: u64,
}

#[derive(Debug, Deserialize, Serialize,PartialEq)]
enum UpdateLastReadTimeEnum {
    DirectChatRoomId,
    GroupChatRoomId,
    None
}

async fn handler_update_last_read_time(
    Path(path): Path<UpdateLastReadTimePath>,
    body_json: Json<UpdateLastReadTimeJson>
) -> Json<Value> {
    // user_idの取得
    let user_id = path.user_id;

    // chat_room_typeの取得
    let chat_room_type = &body_json.chat_room_type;

    // chat_room_idの取得
    let chat_room_id = &body_json.chat_room_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    update_last_read_time(&pool, &user_id, chat_room_type, &chat_room_id).await.unwrap();
    Json(json!({ "status_code": 200 }))
}

// SQL実行部分
async fn update_last_read_time(pool: &MySqlPool, user_id: &String,chat_room_type: &UpdateLastReadTimeEnum, chat_room_id: &u64) -> anyhow::Result<()> {
    let now = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs();
    if chat_room_type == &UpdateLastReadTimeEnum::DirectChatRoomId {
        sqlx::query!(
            r#"
                UPDATE
                    direct_member
                SET
                    last_read_time = ?
                WHERE
                    direct_chat_room_id = ?
                AND user_id = ?
            "#,
            now,
            chat_room_id,
            user_id
        )
        .execute(pool)
        .await?
        .rows_affected();
    }

    if chat_room_type == &UpdateLastReadTimeEnum::GroupChatRoomId {
        sqlx::query!(
            r#"
                UPDATE
                    group_member
                SET
                    last_read_time = ?
                WHERE
                    group_chat_room_id = ?
                AND user_id = ?
            "#,
            now,
            chat_room_id,
            user_id
        )
        .execute(pool)
        .await?
        .rows_affected();
    }

    Ok(())
}

/*
  グループメンバーの追加
*/
#[derive(Debug, Deserialize, Serialize)]
struct AddGroupMemberPath {
    user_id: String
}
#[derive(Debug, Deserialize, Serialize)]
struct AddGroupMemberJson {
    group_chat_room_id: u64,
    add_user_ids: Vec<String>
}

async fn handler_add_group_member(
    Path(path): Path<AddGroupMemberPath>,
    body_json: Json<AddGroupMemberJson>
) -> Json<Value> {
    // user_idの取得
    let _user_id = path.user_id;

    // group_chat_room_idの取得
    let group_chat_room_id = &body_json.group_chat_room_id;

    // add_user_idsの取得
    let add_user_ids = &body_json.add_user_ids;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    add_group_member(&pool, &group_chat_room_id, add_user_ids).await.unwrap();
    Json(json!({ "status_code": 200 }))
}

// SQL実行部分
async fn add_group_member(pool: &MySqlPool, group_chat_room_id: &u64, add_user_ids: &Vec<String>) -> anyhow::Result<()> {
    let now = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs();

    for user_id in add_user_ids {
        sqlx::query!(
            r#"
                INSERT INTO group_member ( group_chat_room_id, user_id, entry_date, last_read_time )
                VALUES ( ?, ? , ? , ? )
            "#,
            group_chat_room_id,
            user_id,
            now,
            now
        )
        .execute(pool)
        .await
        .unwrap();
    }

    Ok(())
}

/*
  該当友達とのdirectChatRoomIdを取得(すでに友達かどうか)
*/
#[derive(Debug, Deserialize, Serialize)]
struct FetchIsAlreadyFriendPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchIsAlreadyFriendQuery {
    friend_user_id: String,
}

// デフォルト値の取得
impl Default for FetchIsAlreadyFriendQuery {
    fn default() -> Self {
        Self { friend_user_id: String::from("") }
    }
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchIsAlreadyFriendResult {
    direct_chat_room_id: Option<u64>,
    already_friend: bool
}

// handler
async fn handler_fetch_is_already_friend(
    Path(path): Path<FetchIsAlreadyFriendPath>,
    query: Option<Query<FetchIsAlreadyFriendQuery>>,
) -> Json<Value> {
    let user_id = path.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(query) = query.unwrap_or_default();
    let friend_user_id = query.friend_user_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let result = fetch_is_already_friend(&pool, &user_id, &friend_user_id).await.unwrap();
    
    Json(json!({ "result": result }))
}

// SQL実行部分
async fn fetch_is_already_friend(pool: &MySqlPool, user_id: &str, friend_user_id: &str) -> anyhow::Result<FetchIsAlreadyFriendResult> {
    let is_alread_friend = sqlx::query!(
        r#"
            SELECT
                direct_chat_room_id
            FROM
                follow
            WHERE
                from_user_id = ?
            AND to_user_id = ?
        "#,
        user_id,
        friend_user_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let result:FetchIsAlreadyFriendResult;

    if is_alread_friend.len() == 0 {
        // まだ友達ではない
        result = FetchIsAlreadyFriendResult {
            direct_chat_room_id: None,
            already_friend: false
        }
    } else {
        // 既に友達である
        result = FetchIsAlreadyFriendResult {
            direct_chat_room_id: Some(is_alread_friend[0].direct_chat_room_id),
            already_friend: true
        }
    }

    Ok(result)
}

/*
  directChatRoomId/groupChatRoomIdに紐づくメンバーのユーザーIDを取得(自分も含む)
*/
#[derive(Debug, Deserialize, Serialize)]
struct FetchUserIdsByDirectOrGroupChatRoomIdPath {
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchUserIdsByDirectOrGroupChatRoomIdQuery {
    chat_room_type: FetchUserIdsByDirectOrGroupChatRoomIdQueryType,
    chat_room_id: Option<u64>
}

#[derive(Debug, Deserialize, Serialize,PartialEq)]
enum FetchUserIdsByDirectOrGroupChatRoomIdQueryType {
    DirectChatRoomId,
    GroupChatRoomId,
    None
}

// デフォルト値の取得
impl Default for FetchUserIdsByDirectOrGroupChatRoomIdQuery {
    fn default() -> Self {
        // direct_chat_room_id,group_chat_room_id、どちらかをnullで渡すとunwrapがpanicしてしまうため、typeで渡す
        Self { chat_room_type: FetchUserIdsByDirectOrGroupChatRoomIdQueryType::None, chat_room_id: None}
    }
}

#[derive(Debug, Deserialize, Serialize)]
struct FetchUserIdsByDirectOrGroupChatRoomIdResult {
    user_ids: Vec<String>,
}

// handler
async fn handler_fetch_user_ids_by_direct_or_group_chat_room_id(
    Path(path): Path<FetchUserIdsByDirectOrGroupChatRoomIdPath>,
    query: Option<Query<FetchUserIdsByDirectOrGroupChatRoomIdQuery>>,
) -> Json<Value> {
    let _user_id = path.user_id;
    // unwrap_or_default: Okの場合値を返し、Errの場合値の型のデフォルトを返す
    let Query(query) = query.unwrap_or_default();
    let chat_room_type = query.chat_room_type;
    let chat_room_id = query.chat_room_id;

    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let result = fetch_user_ids_by_direct_or_group_chat_room_id(&pool, &chat_room_type, chat_room_id).await.unwrap();
    
    Json(json!({ "user_ids": result, "char_room_type": &chat_room_type }))
}

// SQL実行部分
async fn fetch_user_ids_by_direct_or_group_chat_room_id(pool: &MySqlPool, chat_room_type: &FetchUserIdsByDirectOrGroupChatRoomIdQueryType, chat_room_id: Option<u64>) -> anyhow::Result<Vec<String>> {
    let mut result_list:Vec<String> = vec![];
    
    if chat_room_type == &FetchUserIdsByDirectOrGroupChatRoomIdQueryType::DirectChatRoomId {
        let result = sqlx::query!(
            r#"
                SELECT
                    user_id
                FROM
                    direct_member
                WHERE
                    direct_chat_room_id = ?
            "#,
            chat_room_id
        )
        .fetch_all(pool)
        .await
        .unwrap();

        for list in &result {
            result_list.push(list.user_id.clone());
        }
    }
    if chat_room_type == &FetchUserIdsByDirectOrGroupChatRoomIdQueryType::GroupChatRoomId {
        let result = sqlx::query!(
            r#"
                SELECT
                    user_id
                FROM
                    group_member
                WHERE
                    group_chat_room_id = ?
                AND
                    leave_flag = 0
            "#,
            chat_room_id
        )
        .fetch_all(pool)
        .await
        .unwrap();

        for list in &result {
            result_list.push(list.user_id.clone());
        }
    }
    
    Ok(result_list)
}