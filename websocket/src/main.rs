use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        Extension,
    },
    response::{IntoResponse},
    routing::get,
    Router,
};
use tower_http::add_extension::AddExtensionLayer;
use futures::{sink::SinkExt, stream::StreamExt};
use std::{
    collections::HashSet,
    net::SocketAddr,
    sync::{Arc, Mutex},
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use tokio::sync::broadcast;
use serde_json::Value;

// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRpustのオブジェクトに変換
use serde::{Serialize, Deserialize};

// Our shared state
#[derive(Debug)]
struct AppState {
    user_set: Mutex<HashSet<String>>,
    tx: broadcast::Sender<String>,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
    .with(tracing_subscriber::EnvFilter::new(
        std::env::var("RUST_LOG").unwrap_or_else(|_| "example_chat=trace".into()),
    ))
    .with(tracing_subscriber::fmt::layer())
    .init();

    let user_set = Mutex::new(HashSet::new());
    let (tx, _rx) = broadcast::channel(100);

    let app_state = Arc::new(AppState { user_set, tx });

    let app = Router::new()
        .route("/websocket", get(websocket_handler))
        .layer(AddExtensionLayer::new(app_state));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3012));

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn websocket_handler(
    ws: WebSocketUpgrade,
    Extension(state): Extension<Arc<AppState>>,
) -> impl IntoResponse {
    ws.on_upgrade(|socket| websocket(socket, state))
}

#[derive(Debug, Deserialize, Serialize)]
enum ChatRoomTypeEnum {
    Initial,
    DirectChatRoomId,
    GroupChatRoomId
}

#[derive(Debug, Deserialize, Serialize)]
enum MessageTypeEnum {
    SendMessage(String)
}
#[derive(Debug, Deserialize, Serialize)]
pub struct MessageStruct {
    _id: String,
    chat_room_id: u64,
    chat_room_type: String,
    created_at: String,
    send_user_ids: Vec<String>,
    text: String,
    message_type: String,
    user: User,
    user_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    _id: String
}

async fn websocket(stream: WebSocket, state: Arc<AppState>) {
    let (mut sender, mut receiver) = stream.split();
    
    while let Some(Ok(message)) = receiver.next().await {
        // 項目
        let mut _id = String::from("");
        let mut chat_room_id:u64 = 0;
        let mut chat_room_type =  String::from("");
        let mut created_at = String::from("");
        let mut message_type = String::from("");
        let mut send_user_ids:Vec<String> = vec![];
        let mut text = String::from("");
        let mut user = User {
            _id : String::from("")
        };
        let mut user_id = String::from("");
        let result: MessageStruct;
        let mut copy_id = String::from("");
    
        if let Message::Text(name) = message {
            let messages: Value = serde_json::from_str(&name).unwrap();
            let message = messages[0].clone();

            // _idの取り出し
            if let Value::String(id) = &message["_id"] {
                _id.push_str(id.as_str());
                copy_id.push_str(id.as_str());
            }
            
            // chat_room_idの取り出し
            if let Value::Number(chat_room_id_number) = &message["chat_room_id"] {
                match chat_room_id_number.as_u64() {
                    Some(num) => {
                        chat_room_id = num;
                    },
                    None => {

                    }
                }
            }

            // chat_room_typeの取り出し
            if let Value::String(chat_room_type_string) = &message["chat_room_type"] {
                chat_room_type.push_str(chat_room_type_string);
            }

            // created_atの取り出し
            if let Value::String(created_at_string) = &message["created_at"] {
                created_at.push_str(created_at_string);
            }

            // message_typeの取り出し
            if let Value::String(message_type_string) = &message["message_type"] {
                message_type.push_str(message_type_string);
            }

            // send_user_idsの取り出し
            if let Value::Array(send_user_ids_vec) = &message["send_user_ids"] {
                for list in send_user_ids_vec {
                    if let Value::String(user_id) = list {
                        send_user_ids.push(user_id.to_string());
                    }
                }
            }

            // textの取り出し
            if let Value::String(text_string) = &message["text"] {
                text.push_str(text_string.as_str());
            }

            // userの取り出し
            if let Value::Object(user_obj) = &message["user"] {
                let user_list = user_obj.get(&String::from("_id"));
                if let Some(sub_user_list) = user_list {
                    if let Value::String(main_user_list) = sub_user_list {
                        user = User {
                            _id : main_user_list.to_string()
                        }
                    }
                }
            }

            // user_idの取り出し
            if let Value::String(user_id_string) = &message["user_id"] {
                user_id.push_str(user_id_string.as_str());
            }

            // resultの整形
            result = MessageStruct {
                _id: _id,
                chat_room_id: chat_room_id,
                chat_room_type:chat_room_type,
                created_at: created_at,
                send_user_ids: send_user_ids,
                text: text,
                message_type: message_type,
                user: user,
                user_id: user_id,
            };

            // メッセージが入力されたらwhile文を抜ける
            if !copy_id.is_empty() {
                // メッセージを送信
                let msg = serde_json::to_string(&result).unwrap();
                let _ = sender
                .send(Message::Text(msg))
                .await;
            } else {
                let _ = sender
                .send(Message::Text(String::from("Error")))
                .await;

            return;
            }
        }
    }
    // Subscribe before sending joined message.
    let mut rx = state.tx.subscribe();
}