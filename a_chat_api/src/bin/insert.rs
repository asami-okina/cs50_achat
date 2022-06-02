use diesel::prelude::*;
use a_chat_api::models::NewUser;
use a_chat_api::schema::user as user_schema;
use a_chat_api::utils::establish_connection;

fn main() {
    // utils.rsのestablish_connection関数からDBとの接続インスタンスを取得
    let connection = establish_connection();

    /*
      userテーブルの追加
    */
    let new_users = vec![
        NewUser {
            id: String::from("pcAsami"),
            nickname: Some(String::from("pcAsami")),
            mail: String::from("pcAsami@g.com"),
            password: String::from("pcAsami"),
            profile_image: Some(String::from("https://pbs.twimg.com/profile_images/1257586310077796352/XWNIr3Fr_400x400.jpg")),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063149,
            updated_at: None
        },
        NewUser {
            id: String::from("spAsami"),
            nickname: Some(String::from("spAsami")),
            mail: String::from("spAsami@g.com"),
            password: String::from("spAsami"),
            profile_image: Some(String::from("https://pbs.twimg.com/profile_images/1522452340611358720/8AqTz3iz_400x400.jpg")),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063209,
            updated_at: None
        },
        NewUser {
            id: String::from("pcAsami1"),
            nickname: Some(String::from("FANP")),
            mail: String::from("pcAsami1@g.com"),
            password: String::from("pcAsami1"),
            profile_image: Some(String::from("https://pbs.twimg.com/profile_images/1257586310077796352/XWNIr3Fr_400x400.jpg")),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063149,
            updated_at: None
        },
    ];

    // INSERT処理を実行
    diesel::insert_into(user_schema::dsl::user)
        .values(&new_users)
        .execute(&connection)
        .expect("Error saving new user");


    /*
      direct_chat_roomテーブルの追加
    */
    use a_chat_api::models::NewDirectChatRoom;
    use a_chat_api::schema::direct_chat_room as direct_chat_room_schema;
    let new_direct_chat_room = vec![
        NewDirectChatRoom {
            id: 1,
            created_at: 1654063149
        },
        NewDirectChatRoom {
            id: 2,
            created_at: 1654063149
        }
    ];

    // INSERT処理を実行
    diesel::insert_into(direct_chat_room_schema::dsl::direct_chat_room)
        .values(&new_direct_chat_room)
        .execute(&connection)
        .expect("Error saving new direct chat room");

    
    /*
      direct_memberテーブルの追加
    */
    use a_chat_api::models::NewDirectMember;
    use a_chat_api::schema::direct_member as direct_member_schema;
    let new_direct_members = vec![
        NewDirectMember {
            id: 1,
            direct_chat_room_id: 1,
            user_id: String::from("pcAsami"),
            delete_flag: false,
            hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149
        },
        NewDirectMember {
            id: 2,
            direct_chat_room_id: 1,
            user_id: String::from("spAsami"),
            delete_flag: false,
            hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149
        },
        NewDirectMember {
            id: 3,
            direct_chat_room_id: 2,
            user_id: String::from("pcAsami"),
            delete_flag: false,
            hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149
        },
        NewDirectMember {
            id: 4,
            direct_chat_room_id: 2,
            user_id: String::from("pcAsami1"),
            delete_flag: false,
            hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149
        },
    ];

    // INSERT処理を実行
    diesel::insert_into(direct_member_schema::dsl::direct_member)
        .values(&new_direct_members)
        .execute(&connection)
        .expect("Error saving new user");


    /*
      followテーブルの追加
    */
    use a_chat_api::models::NewFollow;
    use a_chat_api::schema::follow as follow_schema;
    let new_follows = vec![
        NewFollow {
            id: 1,
            to_user_id: String::from("spAsami"),
            from_user_id: String::from("pcAsami"),
            direct_chat_room_id: 1,
            created_at: 1654063149,
        },
        NewFollow {
            id: 2,
            to_user_id: String::from("pcAsami"),
            from_user_id: String::from("spAsami"),
            direct_chat_room_id: 1,
            created_at: 1654063149,
        },
        NewFollow {
            id: 3,
            to_user_id: String::from("pcAsami1"),
            from_user_id: String::from("pcAsami"),
            direct_chat_room_id: 1,
            created_at: 1654063149,
        },
    ];

    // INSERT処理を実行
    diesel::insert_into(follow_schema::dsl::follow)
        .values(&new_follows)
        .execute(&connection)
        .expect("Error saving new follow");

    /*
      group_chat_roomテーブルの追加
    */
    use a_chat_api::models::NewGroupChatRoom;
    use a_chat_api::schema::group_chat_room as group_chat_room_schema;
    let new_group_chat_rooms = vec![
        NewGroupChatRoom {
            id: 1,
            group_name: String::from("FANP"),
            group_image: Some(String::from("https://pbs.twimg.com/media/E16OXztUYAIpisv?format=jpg&name=large")),
            created_at: 1654063149,
            delete_flag: false
        },
        NewGroupChatRoom {
            id: 2,
            group_name: String::from("FANP"),
            group_image: Some(String::from("https://pbs.twimg.com/media/E16OXztUYAIpisv?format=jpg&name=large")),
            created_at: 1654063149,
            delete_flag: false
        },
    ];

    // INSERT処理を実行
    diesel::insert_into(group_chat_room_schema::dsl::group_chat_room)
        .values(&new_group_chat_rooms)
        .execute(&connection)
        .expect("Error saving new group chat room");

    /*
      group_memberテーブルの追加
    */
    use a_chat_api::models::NewGroupMember;
    use a_chat_api::schema::group_member as group_member_schema;
    let new_group_members = vec![
        NewGroupMember {
            id: 1,
            group_chat_room_id: 1,
            user_id: String::from("pcAsami"),
            delete_flag: false,
            hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149,
        },
        NewGroupMember {
            id: 2,
            group_chat_room_id: 1,
            user_id: String::from("spAsami"),
            delete_flag: false,
            hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149,
        },
        NewGroupMember {
            id: 3,
            group_chat_room_id: 2,
            user_id: String::from("pcAsami"),
            delete_flag: false,
            hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149,
        },
        NewGroupMember {
            id: 4,
            group_chat_room_id: 2,
            user_id: String::from("pcAsami1"),
            delete_flag: false,
            hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149,
        },
        
    ];

    // INSERT処理を実行
    diesel::insert_into(group_member_schema::dsl::group_member)
        .values(&new_group_members)
        .execute(&connection)
        .expect("Error saving new group member");

    /*
      message_content_typeテーブルの追加
    */
    use a_chat_api::models::NewMessageContentType;
    use a_chat_api::schema::message_content_type as message_content_type_schema;
    let new_message_content_typws = vec![
        NewMessageContentType {
            id: 1,
            content_type: String::from("text"),
        },
        NewMessageContentType {
            id: 2,
            content_type: String::from("image"),
        },
        
    ];

    // INSERT処理を実行
    diesel::insert_into(message_content_type_schema::dsl::message_content_type)
        .values(&new_message_content_typws)
        .execute(&connection)
        .expect("Error saving new group member");


    /*
      messageテーブルの追加
    */
    use a_chat_api::models::NewMessage;
    use a_chat_api::schema::message as message_schema;
    let new_messages = vec![
        NewMessage {
            id: 1,
            content_type_id: 1,
            sender_id: String::from("pcAsami"),
            direct_chat_room_id: None,
            group_chat_room_id: Some(1),
            content: String::from("グループだよ"),
            created_at: 1654063149,
        },
        NewMessage {
            id: 2,
            content_type_id: 2,
            sender_id: String::from("spAsami"),
            direct_chat_room_id: None,
            group_chat_room_id: Some(1),
            content: String::from("https://pbs.twimg.com/media/E16OXztUYAIpisv?format=jpg&name=large"),
            created_at: 1654063149,
        },
        NewMessage {
            id: 3,
            content_type_id: 1,
            sender_id: String::from("spAsami"),
            direct_chat_room_id: Some(1),
            group_chat_room_id: None,
            content: String::from("友達だよ"),
            created_at: 1654063149,
        },
    ];

    // INSERT処理を実行
    diesel::insert_into(message_schema::dsl::message)
        .values(&new_messages)
        .execute(&connection)
        .expect("Error saving new message");


}