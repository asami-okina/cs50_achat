// DBの操作に用いる構造体をまとめる
use crate::schema::user; // useコマンドでユーザーテーブルのスキーマ(構造)を取得

#[derive(Insertable)] // データ追加用の構造体はInsertableトレイトを継承する必要あり
#[table_name = "user"] // その際にtable_nameとして対象のスキーマを設定

// 構造体はINSERTする際に必要なフィールドを持っている
// その型は各対応カラムの型に合わせて設定する
// カラムの方はschema.rsを見ると確認できるが、その型はdisel内で定義されている型であるため、構造体にそのまま使うわけではない
// 今回の場合はVarchar→Stringとして構造体のフィールドの型としている
// 検索方法「rust diesel 型名」
pub struct NewUser {
    pub id: String,
    pub nickname: String,
    pub mail: String,
    pub password: String,
    pub profile_image: String,
    pub delete_flag: bool,
    pub search_flag: bool,
    pub created_at: i32,
    pub updated_at: i32
}

// 読み込み用
#[derive(Debug, Queryable)]
pub struct User {
    pub id: String,
    pub nickname: String,
    pub mail: String,
    pub password: String,
    pub profile_image: String,
    pub delete_flag: bool,
    pub search_flag: bool,
    pub created_at: i32,
    pub updated_at: i32
}