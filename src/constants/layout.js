import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

// ------------------------------------------------------------------------------------------------
// 高さ
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

// Welcome, SignUp ,Login画面の高さ
export const START_SCREEN_HEIGHT = SCREEN_HEIGHT -(HEAD_CONTAINER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_STYLE)

// 検索フォームの高さ
export const SEARCH_FORM_HEIGHT = 60

// ボタンの高さ
export const BIG_BUTTON_HEIGHT = 60

// ------------------------------------------------------------------------------------------------
// 幅
// コンテンツ表示横幅
export const CONTENT_WIDTH = 300


// ------------------------------------------------------------------------------------------------
// 大きさ
// アイコンの大きさ
export const ICON_SIZE = 24

// A-Chatロゴの大きさ
export const A_CHAT_LOG_SIZE = 250

// メインタイトルの大きさ
export const MAIN_TITLE_SIZE = 50

// ------------------------------------------------------------------------------------------------
// 色
// ネイビー
export const MAIN_NAVY_COLOR = "#1B1C56"

// 白
export const MAIN_WHITE_COLOR = "#feffff"

// ピンク
export const MAIN_PINK_COLOR = "#ED195E"

// ------------------------------------------------------------------------------------------------
// borderRadius(丸み)
export const TOP_AREA_LEFT_RADIUS = 50

// ------------------------------------------------------------------------------------------------
// フォント
// メインタイトル
export const MAIN_TITLE_FONT = "AlfaSlabOne_400Regular"

// 標準文字
export const STANDARD_FONT = "ABeeZee_400Regular_Italic"
