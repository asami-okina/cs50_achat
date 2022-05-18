use std::fs::File;
use std::io::prelude::*;
use std::net::TcpListener;
use std::net::TcpStream;
use std::thread;
use std::time::Duration;

// cargo runでエラーがでないようにする
extern crate a_chat_api;
use a_chat_api::ThreadPool;

#[tokio::main]
async fn main() {
    // TcpListenerはサーバーが公開しているIPアドレスとポートへクライアントが接続する許可を与える
    // TcpListenerのbind関数にサーバ側のIPアドレスとオープンされているポート番号を指定する
    // 許可されたIPアドレスと公開されたポートである場合、そのポートへの接続をリクエストしたクライアントをキャッチするリスナーオブジェクトができる。
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    let pool = ThreadPool::new(4);

    //  TcpListenerのincomingメソッドは、一連のストリームを与えるイテレータを返す
    for stream in listener.incoming() {
        // streamは内部状態を変更するためmutをつけてあげる
        // 以下で成功した時点でTcpListenerの役目は終わりで、後はTcpStreamを扱うだけとなる
        // TcpListenerはこのまま再利用可能で、他のクライアントをaccept関数で受けるようにできる
        let stream = stream.unwrap();

        // 各ストリームに対して新しいスレッドを立ち上げる
        // thread::spawn: 新しいスレッドを生成し、クロージャ内のコードを新しいスレッドで実行
        // thread::spawn(|| {
        //     handle_connection(stream);
        // });
        pool.execute(|| {
            handle_connection(stream);
        });
    }
}

fn handle_connection(mut stream: TcpStream) {
    // この時点で、streamは既に外部からアクセスしてきたクライアントと会話ができる状態
    // クライアント側が何らかの文字列を送信した場合、それがTcpStreamオブジェクト内に保持される
    let mut buffer = [0; 1024]; // バッファを作成
    // クライアントから送られてきたデータを読み込むには、TcpStream::read関数を使う
    stream.read(&mut buffer).unwrap(); // クライアントが送信したものを受信するまで待機

    let get = b"GET / HTTP/1.1\r\n";
    let sleep = b"GET /sleep HTTP/1.1\r\n";

    let (status_line, filename) = if buffer.starts_with(get) {
        ("HTTP/1.1 200 OK\r\n\r\n", "hello.html")
    } else if buffer.starts_with(sleep){
        thread::sleep(Duration::from_secs(5));
        ("HTTP/1.1 200 OK\r\n\r\n", "hello.html")
    } else {
        ("HTTP/1.1 404 NOT FOUND\r\n\r\n", "404.html")
    };

    let body = http_get();
    let contents = match body {
        Ok(v) => v,
        Err(e) => panic!("エラー")
    };

    let response = format!("{}{}", status_line, contents);

    // TcpStream::write関数に文字列のバッファを渡すとクライアント側に送信する
    stream.write(response.as_bytes()).unwrap();
    // flush:バイトが全て接続に書き込まれるまでプログラムが継続するのを防ぐ
    stream.flush().unwrap();
}

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

#[tokio::main]
// async処理はランタイムの上でしか動かないから、tokioランタイムを準備
async fn http_get() -> Result<String> {
    let resp = reqwest::get("https://www.example.com/").await?;
    let body = resp.text().await?;
    Ok(body)
}
