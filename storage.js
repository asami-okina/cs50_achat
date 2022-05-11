import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

//ストレージの作成
export const storage = new Storage({
    // 最大容量
    size: 1000,
    // バックエンドにAsyncStorageを使う
    storageBackend: AsyncStorage,
    // キャッシュ期限(null=期限なし)
    defaultExpires: null,
    // メモリにキャッシュするかどうか
    enableCache: true,
})