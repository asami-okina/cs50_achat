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
        .route("/api/users/:user_id/chat-room", get(component::fetch_chat_room_list::handler_fetch_chat_room_list))
        .route("/api/users/:user_id/chat-room", post(component::chat_room_hidden_or_delete::handler_update_chat_room_hidden_or_delete))
        .route("/api/users/:user_id/message", get(component::fetch_message_by_chat_room_id::handler_fetch_message_by_chat_room_id))
        .route("/api/users/:user_id/message", post(component::post_message::handler_post_message))
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