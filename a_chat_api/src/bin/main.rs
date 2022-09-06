use axum::{routing::get, routing::post, Router};
mod common;
mod fetch_component;
mod post_component;
use dotenv::dotenv;

#[tokio::main]
async fn main() {
    // .endファイルの中身の変数を取得し、環境変数として使用できるようにする
    dotenv().ok();
    //単一ルートでアプリケーションを構築する
    // handler: 何らかの処理要求が発生した時に起動されるプログラムのこと
    // handlerはアプリケーションのロジックが存在する場所
    let app = Router::new()
        .route("/api/fetch-all-users", get(fetch_component::fetch_all_users::handler_fetch_all_users))
        .route("/api/signup", post(post_component::sign_up::handler_sign_up))
        .route("/api/signup/is_available_mail_validation", get(fetch_component::is_available_mail_validation::handler_is_available_mail_validation))
        .route("/api/signup/is_available_user_id_validation/:user_id", get(fetch_component::is_available_user_id_validation::handler_is_available_user_id_validation))
        .route("/api/login", post(post_component::log_in::handler_log_in))
        .route("/api/users/:user_id/home", get(fetch_component::search_name::handler_search_name))
        .route("/api/users/:user_id/groups", get(fetch_component::fetch_group_list::handler_fetch_group_list))
        .route("/api/users/:user_id/groups/leave", post(post_component::leave_group::handler_leave_group))
        .route("/api/users/:user_id/groups/add", post(post_component::add_group::handler_add_group))
        .route("/api/users/:user_id/group-count", get(fetch_component::fetch_group_count::handler_fetch_group_count))
        .route("/api/users/:user_id/friend-count", get(fetch_component::fetch_friend_count::handler_fetch_friend_count))
        .route("/api/users/:user_id/friends", get(fetch_component::fetch_friend_list::handler_fetch_friend_list))
        .route("/api/users/:user_id/friends", post(post_component::add_friend::handler_add_friend))
        .route("/api/users/:user_id/profile", get(fetch_component::fetch_profile_by_user_id::handler_fetch_profile_by_user_id))
        .route("/api/users/:user_id/profile", post(post_component::update_profile::handler_update_profile))
        .route("/api/users/:user_id/user", get(fetch_component::fetch_friend_info_by_friend_user_id::handler_fetch_friend_info_by_friend_user_id))
        .route("/api/users/:user_id/chat-room", get(fetch_component::fetch_chat_room_list::handler_fetch_chat_room_list))
        .route("/api/users/:user_id/chat-room", post(post_component::chat_room_hidden_or_delete::handler_update_chat_room_hidden_or_delete))
        .route("/api/users/:user_id/message", get(fetch_component::fetch_message_by_chat_room_id::handler_fetch_message_by_chat_room_id))
        .route("/api/users/:user_id/message", post(post_component::post_message::handler_post_message))
        .route("/api/users/:user_id/last-read-time", post(post_component::update_last_read_time::handler_update_last_read_time))
        .route("/api/users/:user_id/group-member", post(post_component::add_group_member::handler_add_group_member))
        .route("/api/users/:user_id/friend", get(fetch_component::fetch_is_already_friend::handler_fetch_is_already_friend))
        .route("/api/users/:user_id/chat", get(fetch_component::fetch_user_ids_by_direct_or_group_chat_room_id::handler_fetch_user_ids_by_direct_or_group_chat_room_id));

    // localhost:3000 で hyper と共に実行する
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
