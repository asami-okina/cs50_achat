table! {
    direct_chat_room (id) {
        id -> Unsigned<Bigint>,
        created_at -> Integer,
    }
}

table! {
    direct_member (id) {
        id -> Unsigned<Bigint>,
        direct_chat_room_id -> Unsigned<Bigint>,
        user_id -> Varchar,
        delete_flag -> Nullable<Bool>,
        hidden_flag -> Nullable<Bool>,
        entry_date -> Integer,
        last_read_time -> Nullable<Integer>,
    }
}

table! {
    follow (id) {
        id -> Unsigned<Bigint>,
        to_user_id -> Varchar,
        from_user_id -> Varchar,
        direct_chat_room_id -> Unsigned<Bigint>,
        created_at -> Integer,
    }
}

table! {
    group_chat_room (id) {
        id -> Unsigned<Bigint>,
        group_name -> Varchar,
        group_image -> Varchar,
        created_at -> Integer,
        delete_flag -> Nullable<Bool>,
    }
}

table! {
    group_member (id) {
        id -> Unsigned<Bigint>,
        group_chat_room_id -> Unsigned<Bigint>,
        user_id -> Varchar,
        delete_flag -> Nullable<Bool>,
        hidden_flag -> Nullable<Bool>,
        entry_date -> Integer,
        last_read_time -> Nullable<Integer>,
    }
}

table! {
    message (id) {
        id -> Unsigned<Bigint>,
        content_type_id -> Unsigned<Bigint>,
        sender_id -> Varchar,
        direct_chat_room_id -> Nullable<Unsigned<Bigint>>,
        group_chat_room_id -> Nullable<Unsigned<Bigint>>,
        content -> Text,
        created_at -> Integer,
    }
}

table! {
    message_content_type (id) {
        id -> Unsigned<Bigint>,
        content_type -> Nullable<Varchar>,
    }
}

table! {
    user (id) {
        id -> Varchar,
        nickname -> Varchar,
        mail -> Varchar,
        password -> Varchar,
        profile_image -> Varchar,
        delete_flag -> Nullable<Bool>,
        search_flag -> Nullable<Bool>,
        created_at -> Integer,
        updated_at -> Nullable<Integer>,
    }
}

joinable!(direct_member -> direct_chat_room (direct_chat_room_id));
joinable!(direct_member -> user (user_id));
joinable!(follow -> direct_chat_room (direct_chat_room_id));
joinable!(group_member -> group_chat_room (group_chat_room_id));
joinable!(group_member -> user (user_id));
joinable!(message -> direct_chat_room (direct_chat_room_id));
joinable!(message -> group_chat_room (group_chat_room_id));
joinable!(message -> message_content_type (content_type_id));
joinable!(message -> user (sender_id));

allow_tables_to_appear_in_same_query!(
    direct_chat_room,
    direct_member,
    follow,
    group_chat_room,
    group_member,
    message,
    message_content_type,
    user,
);
