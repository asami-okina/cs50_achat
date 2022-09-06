// DBの操作に用いる構造体をまとめる
use serde::Serialize;
/*
  userテーブル
*/
use crate::schema::user; // useコマンドでユーザーテーブルのスキーマ(構造)を取得

#[derive(Insertable)] // データ追加用の構造体はInsertableトレイトを継承する必要あり
#[table_name = "user"] // その際にtable_nameとして対象のスキーマを設定

// 構造体はINSERTする際に必要なフィールドを持っている
// その型は各対応カラムの型に合わせて設定する
// カラムの方はschema.rsを見ると確認できるが、その型はdisel内で定義されている型であるため、構造体にそのまま使うわけではない
// 今回の場合はVarchar→Stringとして構造体のフィールドの型としている
// 検索方法「rust diesel 型名」

// INSERT用
pub struct NewUser {
    pub id: String,
    pub nickname: Option<String>,
    pub mail: String,
    pub password: String,
    pub profile_image: Option<String>,
    pub delete_flag: bool,
    pub search_flag: bool,
    pub created_at: i32,
    pub updated_at: Option<i32>,
}

// SELECT用
#[derive(Debug, Queryable, Serialize)]
pub struct User {
    pub id: String,
    pub nickname: Option<String>,
    pub mail: String,
    pub password: String,
    pub profile_image: Option<String>,
    pub delete_flag: bool,
    pub search_flag: bool,
    pub created_at: i32,
    pub updated_at: Option<i32>,
}

/*
  direct_chat_roomテーブル
*/
use crate::schema::direct_chat_room;
#[derive(Insertable)]
#[table_name = "direct_chat_room"]

// INSERT用
pub struct NewDirectChatRoom {
    pub id: u64,
    pub created_at: i32,
}

// SELECT用
#[derive(Debug, Queryable)]
pub struct DirectChatRoom {
    pub id: u64,
    pub created_at: i32,
}

/*
  direct_memberテーブル
*/
use crate::schema::direct_member;
#[derive(Insertable)]
#[table_name = "direct_member"]

// INSERT用
pub struct NewDirectMember {
    pub id: u64,
    pub direct_chat_room_id: u64,
    pub user_id: String,
    pub message_delete_flag: bool,
    pub message_hidden_flag: bool,
    pub entry_date: i32,
    pub last_read_time: i32,
}

// SELECT用
#[derive(Debug, Queryable)]
pub struct DirectMember {
    pub id: u64,
    pub direct_chat_room_id: u64,
    pub user_id: String,
    pub message_delete_flag: bool,
    pub message_hidden_flag: bool,
    pub entry_date: i32,
    pub last_read_time: i32,
}

/*
  followテーブル
*/
use crate::schema::follow;
#[derive(Insertable)]
#[table_name = "follow"]

// INSERT用
pub struct NewFollow {
    pub id: u64,
    pub to_user_id: String,
    pub from_user_id: String,
    pub direct_chat_room_id: u64,
    pub created_at: i32,
}

// SELECT用
#[derive(Debug, Queryable)]
pub struct Follow {
    pub id: u64,
    pub to_user_id: String,
    pub from_user_id: String,
    pub direct_chat_room_id: u64,
    pub created_at: i32,
}

/*
  group_chat_roomテーブル
*/
use crate::schema::group_chat_room;
#[derive(Insertable)]
#[table_name = "group_chat_room"]

// INSERT用
pub struct NewGroupChatRoom {
    pub id: u64,
    pub group_name: String,
    pub group_image: Option<String>,
    pub created_at: i32,
    pub delete_flag: bool,
}

// SELECT用
#[derive(Debug, Queryable)]
pub struct GroupChatRoom {
    pub id: u64,
    pub group_name: String,
    pub group_image: Option<String>,
    pub created_at: i32,
    pub delete_flag: bool,
}

/*
  group_memberテーブル
*/
use crate::schema::group_member;
#[derive(Insertable)]
#[table_name = "group_member"]

// INSERT用
pub struct NewGroupMember {
    pub id: u64,
    pub group_chat_room_id: u64,
    pub user_id: String,
    pub message_delete_flag: bool,
    pub message_hidden_flag: bool,
    pub leave_flag: bool,
    pub entry_date: i32,
    pub last_read_time: i32,
}

// SELECT用
#[derive(Debug, Queryable)]
pub struct GroupMember {
    pub id: u64,
    pub group_chat_room_id: u64,
    pub user_id: String,
    pub message_delete_flag: bool,
    pub message_hidden_flag: bool,
    pub leave_flag: bool,
    pub entry_date: i32,
    pub last_read_time: i32,
}

/*
  message_content_typeテーブル
*/
use crate::schema::message_content_type;
#[derive(Insertable)]
#[table_name = "message_content_type"]

// INSERT用
pub struct NewMessageContentType {
    pub id: u64,
    pub content_type: String,
}

// SELECT用
#[derive(Debug, Queryable)]
pub struct MessageContentType {
    pub id: u64,
    pub content_type: String,
}

/*
  messageテーブル
*/
use crate::schema::message;
#[derive(Insertable)]
#[table_name = "message"]

// INSERT用
pub struct NewMessage {
    pub id: u64,
    pub content_type_id: u64,
    pub sender_id: String,
    pub direct_chat_room_id: Option<u64>,
    pub group_chat_room_id: Option<u64>,
    pub content: String,
    pub created_at: i32,
}

// SELECT用
#[derive(Debug, Queryable)]
pub struct Message {
    pub id: u64,
    pub content_type_id: u64,
    pub sender_id: String,
    pub direct_chat_room_id: Option<u64>,
    pub group_chat_room_id: Option<u64>,
    pub content: String,
    pub created_at: i32,
}
