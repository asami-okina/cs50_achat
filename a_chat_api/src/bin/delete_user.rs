use diesel::prelude::*;
use a_chat_api::schema::users as users_schema;
use a_chat_api::utils::establish_connection;

fn main() {
    let connection = establish_connection();
    diesel::delete(users_schema::dsl::users.find(1))
        .execute(&connection)
        .expect("Error deleting users");
}