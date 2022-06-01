use diesel::prelude::*;
use a_chat_api::schema::users as users_schema;
use a_chat_api::utils::establish_connection;

fn main() {
    let connection = establish_connection();
    // ユーザーテーブルの主キー(id)が1のレコードについて、nameカラムの値をupdate_userに更新
    diesel::update(users_schema::dsl::users.find(1))
        .set(users_schema::name.eq("update_user"))
        .execute(&connection)
        .expect("Error updating users");
}