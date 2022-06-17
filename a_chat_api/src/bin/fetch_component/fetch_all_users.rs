use axum::{
    response::Json,
};
use serde_json::{Value, json};
use sqlx::mysql::MySqlPool;
use std::{env, fmt::Debug};
/*
  全ユーザ情報を取得
*/
// handler
pub async fn handler_fetch_all_users() -> Json<Value> {
    let pool = MySqlPool::connect(&env::var("DATABASE_URL").unwrap()).await.unwrap();
    let users = fetch_all_users(&pool).await.unwrap();
    Json(json!({ "users": users }))
}

// SQL実行部分
use a_chat_api::models::User;
async fn fetch_all_users(pool: &MySqlPool) -> anyhow::Result<Vec<User>> {
    let users = sqlx::query!(
        r#"
            SELECT *
            FROM user
        "#
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut result:Vec<User> = vec![];

    for row in &users {
        let user = User {
            id: row.id.to_string(),
            nickname:  match &row.nickname {
                Some(nickname) => Some(nickname.to_string()),
                None => None
            },
            mail: row.mail.to_string(),
            password: row.password.to_string(),
            profile_image:  match &row.profile_image {
                Some(profile_image) => Some(profile_image.to_string()),
                None => None
            },
            delete_flag: if row.delete_flag == 1 {true} else {false},
            search_flag: if row.search_flag == 1 {true} else {false},
            created_at: row.created_at,
            updated_at: row.updated_at
          };
          result.push(user);
    }
    Ok(result)
}