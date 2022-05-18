use std::thread;
use std::sync::mpsc;
use std::sync::Arc;
use std::sync::Mutex;


trait FnBox {
    fn call_box(self: Box<Self>);
}

impl<F:FnOnce()> FnBox for F {
    fn call_box(self: Box<F>){
        (*self)()
    }
}

pub struct ThreadPool {
    workers: Vec<Worker>,
    sender: mpsc::Sender<Job>,
}

// ThreadPoolはチャネルを生成し、チャネルの送信側に就く
impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        // 複数のsender、単独のreceiver
        let (sender, receiver) = mpsc::channel();

        // Arc<Mutex<T>>: 複数のスレッドで所有権を共有しつつ、スレッドに値を可変化させる
        // Rc: 単独の値が複数の所有者を持つ場合があり、Rc<T>型は、値がまだ使用中かどうか決定する値への参照の数を追跡する
        // Arc: Rc<T>はスレッド間で共有するには安全ではない。Arc<T>はスレッドセーフに行える。
        // ただ、スレッド安全性は本当に必要な時だけ支払いたいパフォーマンスの犠牲とともに得られるものだから、標準ライブラリはRc<T>を使っている
        // Mutex: どんな時も1つのスレッドにしか何らかのデータへのアクセスを許可しない
        let receiver = Arc::new(Mutex::new(receiver));
        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            // スレッドを生成してベクタに格納する
            // スレッドプールにJoinHandle<()>インスタンスのベクタを格納する代わりに、Worker構造体のインスタンスを格納し
            // 各Workerが単独のJoinHandle<()>インスタンスを格納する
            // Workerに実行するコードのクロージャを取り、既に走っているスレッドに実行してもらうために送信するメソッドを実装する
            workers.push(Worker::new(id, Arc::clone(&receiver)));
        }
        ThreadPool {
            workers,
            sender
        }
    }

    pub fn execute<F>(&self, f:F)
    // where句を使った明確なトレイト境界では、ジェネリック型に対して「このトレイトを実装していなければならない」という成約を課すもの
    // トレイト境界により、ジェネリック型は指定されたトレイトのメソッド等を使用できるようになる
    where
        F: FnOnce() + Send + 'static
    {
        // 各クロージャを保持するBoxに対してJob型エイリアスを生成し、そこからチャネルに仕事を送信する
        let job = Box::new(f);
        self.sender.send(job).unwrap();

    }
}

type Job = Box<dyn FnBox + Send + 'static>;


// ThreadPoolからスレッドにコードを送信する責任を負うWorker構造体
// Workerはチャネルの受信側
struct Worker {
    id: usize,
    thread: thread::JoinHandle<()>,
}

// Workerのスレッドで仕事を受け取り、実行する
impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        // thread::spawn: クロージャを渡して、スレッドを立ち上げる
        let thread = thread::spawn(move||{
            loop {
                // recv():チャネルからJobを受け取る
                let job = receiver.lock().unwrap().recv().unwrap();

                // ワーカー{}は仕事を得ました; 実行します
                println!("Worker {} got a job; executing.", id);
                job.call_box();
            }
        });

        Worker {
            id,
            thread,
        }
    }
}