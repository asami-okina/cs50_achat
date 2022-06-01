use diesel::prelude::*;
use a_chat_api::models::User;
use a_chat_api::schema::users as users_schema;
use a_chat_api::utils::establish_connection;

fn main() {
    let connection = establish_connection();

    // users_schema::dsl::usersでユーザーテーブルを指定し、その先頭レコードをUser型で返す
    let user = users_schema::dsl::users
        .first::<User>(&connection)
        .expect("Error loading users");

    println!("{:?}", user)
}