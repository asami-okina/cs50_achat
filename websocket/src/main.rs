// websocketには2つの要素が必要
// ①コネクションを管理する人
// ②メッセージを受信した際に何かをする人

// ★channelから生成した、送信機と転送機に対してメッセージのやりとりを行う(対になっている)

use axum::{
    extract::{
        // WebSocketUpgrade: 受信したHTTPリクエストをWebsocketにアップグレードするために使用する
        ws::{Message, WebSocket, WebSocketUpgrade},
        // リクエストからデータを抽出する
        Extension,
    },
    response::{IntoResponse},
    routing::get,
    Router,
};
// sink: 他の値を非同期で送信できる値
use futures::{sink::SinkExt, stream::StreamExt};
use std::{
    // HashSetとはHashMapと同じようにアイテムをまとめて格納できるもの。
    // HashMapとの違いは「キー/値」で格納するのではなく1つの値を入れるだけ。同じアイテムは追加できない。
    collections::HashSet,
    // IPv4 または IPv6 のいずれかのインターネットソケットアドレス
    net::SocketAddr,
    // Mutexとは同時に1つのプログラムの流れのみが資源を占有し、他の使用を排除する方式。また、Cell系のように内部可変性を提供する
    // Rc<T>は参照カウントの値を作ることで、1つの値に複数の所有者を与える。しかし、スレッド間で共有するには安全ではない。
    // Arc<T>は複数スレッドで1つの値に複数の所有権を与える。
    // RefCecc<T>は実行時に精査される可変借用を許可するので、RefCell<T>が不変でも、RefCell<T>内の値を可変化できる
    sync::{Arc, Mutex},
};
// tokio::sync::broadcastは、feature="sync"のみに対応。
// Senderは、接続されているすべてのReceiverに値をブロードキャストするために使用される。
// Senderハンドルはクローン可能であり、同時に送信と受信を行うことができる
// SenderとReceiverはTがそれぞれSend(スレッド間の所有権の転送を許可)またはSync(複数のスレッドからのアクセスを許可)である限り、SendとSyncの両方となる。
// 値が送信されると、すべてのReceiverハンドルに通知され、その値を受信します。
// 値はチャネル内に一旦保存され、各レシーバに対してオンデマンドでクローン化されます。すべてのレシーバが値のクローンを受信すると、値はチャネルから解放されます
use tokio::sync::broadcast;
use serde_json::Value;
use tower_http::add_extension::AddExtensionLayer;

// シリアライズ: RustのオブジェクトをJSON形式に変換
// デシリアライズ : JSON形式をRpustのオブジェクトに変換
use serde::{Serialize, Deserialize};

// Our shared state
#[derive(Debug)]
struct AppState {
    user_id_set: Arc<Mutex<HashSet<String>>>,
    tx: broadcast::Sender<String>,
}

#[tokio::main]
async fn main() {
    // ロギングの設定
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        .init();
    tracing::debug!("this is a tracing line");

    let user_id_set = Arc::new(Mutex::new(HashSet::new()));
    let (tx, _rx) = broadcast::channel(100);

    let app_state = Arc::new(AppState { user_id_set, tx });

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

#[derive(Debug, Deserialize, Serialize,PartialEq)]
enum MessageTypeEnum {
    SetUserId,
    SendMessage,
    None
}
#[derive(Debug, Deserialize, Serialize)]
pub struct MessageStruct {
    _id: String,
    chat_room_id: u64,
    chat_room_type: String,
    created_at: String,
    send_user_ids: Vec<String>,
    text: String,
    message_type: MessageTypeEnum,
    user: User,
    user_id: String,
}


#[derive(Debug, Deserialize, Serialize)]
pub struct SendUserIds {
    send_user_ids: Option<Vec<String>>
}

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    _id: String
}

// メッセージの初回に送信
#[derive(Debug, Deserialize, Serialize)]
pub struct MessageType {
    message_type: String
}

async fn websocket(stream: WebSocket, state: Arc<AppState>) {
    let (mut sender, mut receiver) = stream.split();

    let mut user_id: String = String::new();
    // let mut result:Option<MessageStruct> = None;
    let mut message_type: String = String::new();
    let message_type_enum: MessageTypeEnum;

    while let Some(Ok(message)) = receiver.next().await {
        if let Message::Text(message_text) = message {
            parse_message_type_and_user_id(&state, &mut user_id, &mut message_type, message_text);
            message_type_enum = {
                if message_type == "SetUserId" {
                    MessageTypeEnum::SetUserId
                } else {
                    MessageTypeEnum::None
                }
            };
            if message_type_enum == MessageTypeEnum::SetUserId {
                break;
            } else {
                return;
            }
        }
    }
    // 新しいReceiverハンドルは、Sender::subscribeを呼び出すことで生成される
    // 生成されたReceiverは、subscribeの呼び出し後に送られた値を受け取る
    // tx(送信側)はブロードキャスト
    let mut rx = state.tx.subscribe();
    
    let message_type = MessageType {
        message_type: message_type.clone()
    };

    let msg = serde_json::to_string(&message_type).unwrap();
    let _ = state.tx.send(msg);

    // ★send_taskとrecv_taskが対になり、send_taskでsenderが送ったらrecv_taskでreceiverが受け取り、
    // ★recv_taskでtxが送ったらsend_taskでrxが受け取る。

     // このタスクは、ブロードキャストメッセージを受信し、クライアントにテキストメッセージを送信する
    // tokio::spawn: asyncファンクションを別スレッドで実行してくれる
    // move: あるスレッドのデータを別のスレッドで使用できるようになる(所有権を移す)
    // 立ち上げたスレッドは、メッセージをチャネルを通して送信できるように、チャネルの送信側を所有する必要がある
    let mut send_task = {
        // HashSetはreadonlyだから、cloneしても問題ない
        let user_id_set = state.user_id_set.lock().unwrap().clone();
        tokio::spawn(async move {
        // rx: receiver(受信側)
        // rx: receiver(受信側)は.next()で消費される
        while let Ok(msg) = rx.recv().await {
            // In any websocket error, break loop.
            // sendメソッドはResult<T,E>型を返すので、エラーの場合にはpanicするようにunwrapを呼び出す
            let send_user_ids: SendUserIds = serde_json::from_str(&msg).unwrap();
            match send_user_ids.send_user_ids {
                Some(ids) => {
                    for send_user_id in ids {
                        if user_id_set.contains(&send_user_id) {
                            let clone_msg = msg.clone();
                            if sender.send(Message::Text(clone_msg)).await.is_err() {
                                break;
                            }
                            // 1度送れば、フロントでchat_room_idが一致する人にsetMessageする
                            break;
                        }
                    }
                },
                None => {
                    if sender.send(Message::Text(msg)).await.is_err() {
                        break;
                    }
                }
            };

        }
    })};

    // 受信側のタスクに渡したいもの(Senderとuser_id)をクローンする
    // tx: Senderをクローンする
    let tx = state.clone().tx.clone();

    // このタスクは、クライアントからメッセージを受信し、ブロードキャスト購読者に送信する
    // tokio::spawn: asyncファンクションを別スレッドで実行してくれる
    let mut recv_task = tokio::spawn(async move {
        while let Some(Ok(Message::Text(text))) = receiver.next().await {
            let result = parse_result(text).await.unwrap();
            match result {
                Some(res) => {
                    // txはブロードキャスト用
                    // tx(送信機)の対であるrxに向けて送信される(send_taskに対して送信)
                    if res.message_type == MessageTypeEnum::SendMessage {
                        let msg = serde_json::to_string(&res).unwrap();
                        let _ = tx.send(msg);
                    }
                }, 
                None => {
                }
            }
        }
    });

    // If any one of the tasks exit, abort the other.
    tokio::select! {
        _ = (&mut send_task) => recv_task.abort(),
        _ = (&mut recv_task) => send_task.abort(),
    };
}

async fn parse_result(message_text: String) -> anyhow::Result<Option<MessageStruct>> {
    // 項目
    let mut _id = String::from("");
    let mut chat_room_id:u64 = 0;
    let mut chat_room_type =  String::from("");
    let mut created_at = String::from("");
    let mut message_type:MessageTypeEnum = MessageTypeEnum::None;
    let mut send_user_ids:Vec<String> = vec![];
    let mut text = String::from("");
    let mut user = User {
        _id : String::from("")
    };
    let mut copy_id = String::from("");
    let mut user_id = String::new();

    let messages: Value = serde_json::from_str(&message_text).unwrap();
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
        message_type = {
            if message_type_string == "SendMessage" {
                MessageTypeEnum::SendMessage
            } else {
                MessageTypeEnum::None
            }
        };
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
                };
            }
        }
    }

    // user_idの取り出し
    if let Value::String(user_id_string) = &message["user_id"] {
        user_id.push_str(user_id_string.as_str());
    }

    // resultの整形
    let result = MessageStruct {
        _id: _id,
        chat_room_id: chat_room_id,
        chat_room_type:chat_room_type,
        created_at: created_at,
        send_user_ids: send_user_ids,
        text: text,
        message_type: message_type,
        user: user,
        user_id: user_id.clone(),
    };
    return Ok(Some(result))
}

fn parse_message_type_and_user_id(state: &AppState, user_id_text: &mut String, message_type_text: &mut String, message_text: String) {
    let mut user_id = String::new();

    let messages: Value = serde_json::from_str(&message_text).unwrap();
    let message = messages[0].clone();
    // user_idの取り出し
    if let Value::String(user_id_string) = &message["user_id"] {
        user_id.push_str(user_id_string.as_str());
    }

    let mut user_id_set = state.user_id_set.lock().unwrap();

    if !user_id_set.contains(&user_id) {
        user_id_set.insert(user_id.to_owned());

        user_id_text.push_str(&user_id);
    }

    // message_typeの取り出し
    if let Value::String(message_type_string) = &message["message_type"] {
        message_type_text.push_str(&message_type_string);
    }

}