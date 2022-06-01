use diesel::prelude::*;
use a_chat_api::models::NewUser;
use a_chat_api::schema::user as user_schema;
use a_chat_api::utils::establish_connection;

fn main() {
    // utils.rsのestablish_connection関数からDBとの接続インスタンスを取得
    let connection = establish_connection();

    // model.rsで定義したNewUser構造体のインスタンスを生成
    // この時、String型の所有権ごと構造体に渡す
    let new_users = vec![
        NewUser {
            id: String::from("pcAsami"),
            nickname: String::from("pcAsami"),
            mail: String::from("pcAsami@g.com"),
            password: String::from("pcAsami"),
            profile_image: String::from("https://pbs.twimg.com/profile_images/1257586310077796352/XWNIr3Fr_400x400.jpg"),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063149,
            updated_at: 0
        },
        NewUser {
            id: String::from("spAsami"),
            nickname: String::from("spAsami"),
            mail: String::from("spAsami@g.com"),
            password: String::from("spAsami"),
            profile_image: String::from("https://pbs.twimg.com/profile_images/1522452340611358720/8AqTz3iz_400x400.jpg"),
            delete_flag: false,
            search_flag: true,
            created_at: 1654063209,
            updated_at: 0
        },
    ];

    // INSERT処理を実行
    diesel::insert_into(user_schema::dsl::user)
        .values(&new_users)
        .execute(&connection)
        .expect("Error saving new user");
}