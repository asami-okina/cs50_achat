import { Dimensions} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

// 画面の高さ
export const SCREEN_HEIGHT = Dimensions.get('screen').height

// 全画面共通の青色のヘッド部分の高さ
export const HEAD_CONTAINER_HEIGHT = 40
// フッターの高さ
export const FOOTER_HEIGHT = 60
// ステータスバーの高さ
export const STATUS_BAR_HEIGHT = getStatusBarHeight()

// トップ領域の高さ
export const TOP_AREA_STYLE = 100

// 操作画面の高さ(例:Home画面)
export const OPERATION_SCREENHEIGHT = SCREEN_HEIGHT - (HEAD_CONTAINER_HEIGHT + FOOTER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_STYLE)
