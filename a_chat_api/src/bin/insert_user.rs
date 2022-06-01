use diesel::prelude::*;
use a_chat_api::models::NewUser;
use a_chat_api::schema::users as users_schema;
use a_chat_api::utils::establish_connection;

fn main() {
    // utils.rsのestablish_connection関数からDBとの接続インスタンスを取得
    let connection = establish_connection();

    // model.rsで定義したNewUser構造体のインスタンスを生成
    // この時、String型の所有権ごと構造体に渡す
    let new_user = NewUser {
        name: String::from("new_user"),
    };

    // INSERT処理を実行
    diesel::insert_into(users_schema::dsl::users)
        .values(new_user)
        .execute(&connection)
        .expect("Error saving new user");
}