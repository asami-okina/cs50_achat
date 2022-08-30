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
            password: String::from("$2b$08$woEpAvQ5E2rq1v2TeasMAus/5JwATviABKYH7JVD5Y5VNGR303M.a"),
            profile_image: Some(String::from("https://user-images.githubusercontent.com/59192060/187173439-a23f3981-33aa-4761-82a1-1b6524ad4a12.jpg")),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063149,
            updated_at: None
        },
        NewUser {
            id: String::from("spAsami"),
            nickname: Some(String::from("spAsami")),
            mail: String::from("spAsami@g.com"),
            password: String::from("$2b$08$2OaVNxiz9KZEmn0mhgaKkO1YtpCmsEJWqjyxlsp9evC3PknMRYupe"),
            profile_image: Some(String::from("https://user-images.githubusercontent.com/59192060/187173933-fd0d93d2-c457-4788-8ddc-1ddfb2418e3a.png")),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063209,
            updated_at: None
        },
        NewUser {
            id: String::from("pcAsami1"),
            nickname: Some(String::from("FANP")),
            mail: String::from("pcAsami1@g.com"),
            password: String::from("$2b$08$luRjA1nMRkvNS9YNzYo3ReNjI7dR50RDCNtDqTSuOhcSSEIQejK5q"),
            profile_image: Some(String::from("https://user-images.githubusercontent.com/59192060/187173983-0281c398-5f56-4fb4-bf75-46916684c4ef.png")),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063149,
            updated_at: None
        },
        NewUser {
            id: String::from("pcAsami2"),
            nickname: Some(String::from("pcAsami2")),
            mail: String::from("pcAsami2@g.com"),
            password: String::from("$2b$08$lgUOH/1WugittQKUP96I0eFQ.H3sht7C75UQkmxcP9EvO64MpGK7W"),
            profile_image: Some(String::from("https://user-images.githubusercontent.com/59192060/187174022-ecfb1e89-fb2f-4ca3-b356-9556cbebe3b9.png")),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063149,
            updated_at: None
        },
        NewUser {
            id: String::from("pcAsami3"),
            nickname: Some(String::from("pcAsami3")),
            mail: String::from("pcAsami3@g.com"),
            password: String::from("$2b$08$pNHqJInhKkr2/ZcKBnE5nOVJhWlEqbZXDsjMxgslFo9fuSieAgcsa"),
            profile_image: Some(String::from("https://user-images.githubusercontent.com/59192060/187174051-a370f684-3b07-4fd5-92c1-ffa126ae61fe.png")),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063149,
            updated_at: None
        },
        NewUser {
            id: String::from("pcAsami4"),
            nickname: Some(String::from("pcAsami4")),
            mail: String::from("pcAsami4@g.com"),
            password: String::from("$2b$08$FocigP5D4soxULvfRtV2bO9H6JQ1nKdxod4fu/FxkWcvZgKnyMYr6"),
            profile_image: Some(String::from("https://user-images.githubusercontent.com/59192060/187174134-adf723c7-cb1a-492f-b5da-058c71e659ff.png")),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063149,
            updated_at: None
        },
        NewUser {
            id: String::from("pcAsami5"),
            nickname: Some(String::from("pcAsami5")),
            mail: String::from("pcAsami5@g.com"),
            password: String::from("$2b$08$nJMoTt8NhQOe79VRI21dte/2LkPrKTUetxixaPsXF/YpHvJgRcL5m"),
            profile_image: Some(String::from("https://user-images.githubusercontent.com/59192060/187174254-fb4c51ed-1497-4a9a-af1b-f5f4ad179954.png")),
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
            message_delete_flag: false,
            message_hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149
        },
        NewDirectMember {
            id: 2,
            direct_chat_room_id: 1,
            user_id: String::from("spAsami"),
            message_delete_flag: false,
            message_hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149
        },
        NewDirectMember {
            id: 3,
            direct_chat_room_id: 2,
            user_id: String::from("pcAsami"),
            message_delete_flag: false,
            message_hidden_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149
        },
        NewDirectMember {
            id: 4,
            direct_chat_room_id: 2,
            user_id: String::from("pcAsami1"),
            message_delete_flag: false,
            message_hidden_flag: false,
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
            direct_chat_room_id: 2,
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
            group_image: Some(String::from("https://user-images.githubusercontent.com/59192060/187174943-35675f21-394a-4bdd-bb94-ebdf8f6c1c47.png")),
            created_at: 1654063149,
            delete_flag: false
        },
        NewGroupChatRoom {
            id: 2,
            group_name: String::from("Smile"),
            group_image: Some(String::from("https://user-images.githubusercontent.com/59192060/187175026-910aba76-b192-40fd-9ecf-47a0208286a1.png")),
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
            message_delete_flag: false,
            message_hidden_flag: false,
            leave_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149,
        },
        NewGroupMember {
            id: 2,
            group_chat_room_id: 1,
            user_id: String::from("spAsami"),
            message_delete_flag: false,
            message_hidden_flag: false,
            leave_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149,
        },
        NewGroupMember {
            id: 3,
            group_chat_room_id: 2,
            user_id: String::from("pcAsami"),
            message_delete_flag: false,
            message_hidden_flag: false,
            leave_flag: false,
            entry_date: 1654063149,
            last_read_time: 1654063149,
        },
        NewGroupMember {
            id: 4,
            group_chat_room_id: 2,
            user_id: String::from("pcAsami1"),
            message_delete_flag: false,
            message_hidden_flag: false,
            leave_flag: false,
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