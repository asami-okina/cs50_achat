import { Dimensions } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'

// ------------------------------------------------------------------------------------------------
// 大きさ
// アイコンの大きさ
export const ICON_SIZE = 24

// A-Chatロゴの大きさ
export const A_CHAT_LOG_SIZE = 250

// メインタイトルの大きさ
export const MAIN_TITLE_SIZE = 50

// ボタンの文字の大きさ
export const BUTTON_TEXT_SIZE = 18

// チャット関連のプロフィール画像の大きさ
export const PROFILE_IMAGE_SIZE = 40

// 友達、グループ追加ボタンの大きさ
export const ADD_BUTTON_SIZE = 65

// ------------------------------------------------------------------------------------------------
// 高さ
// 画面の高さ
export const SCREEN_HEIGHT = Dimensions.get('screen').height

// 画面の幅
export const SCREEN_WIDTH = Dimensions.get('screen').width

// 全画面共通の青色のヘッド部分の高さ
export const HEAD_CONTAINER_HEIGHT = 40

// フッターの高さ
export const FOOTER_HEIGHT = 60

// ステータスバーの高さ
export const STATUS_BAR_HEIGHT = getStatusBarHeight()

// iphone Xの底の高さ
export const IPHONE_X_BOTTOM_SPACE = getBottomSpace()

// トップ領域の高さ
export const TOP_AREA_STYLE = 100

// フッター有画面の操作画面の高さ:iphoneX以外 　(画面の高さ - (全画面共通の青色のヘッド部分の高さ + フッターの高さ + ステータスバーの高さ + トップ領域の高さ + 友達、グループ追加ボタンの大きさ))
export const WITH_FOOTER_OPERATION_SCREEN_HEIGHT = SCREEN_HEIGHT - (HEAD_CONTAINER_HEIGHT + FOOTER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_STYLE + ADD_BUTTON_SIZE)

// フッター有画面の操作画面の高さ:iphoneX 　(画面の高さ - (全画面共通の青色のヘッド部分の高さ + フッターの高さ + ステータスバーの高さ + トップ領域の高さ + iphoeXの底の高さ + 友達、グループ追加ボタンの大きさ))
export const WITH_FOOTER_OPERATION_SCREEN_HEIGHT_IPHONE_X = SCREEN_HEIGHT - (HEAD_CONTAINER_HEIGHT + FOOTER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_STYLE + IPHONE_X_BOTTOM_SPACE + ADD_BUTTON_SIZE)

// フッター無画面の操作画面の高さ　(画面の高さ - (全画面共通の青色のヘッド部分の高さ + ステータスバーの高さ + トップ領域の高さ))
export const OPERATION_SCREEN_HEIGHT = SCREEN_HEIGHT - (HEAD_CONTAINER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_STYLE)

// 検索フォームの高さ
export const SEARCH_FORM_HEIGHT = 60

// ボタンの高さ
export const BUTTON_HEIGHT = 60

// ------------------------------------------------------------------------------------------------
// 幅
// コンテンツ表示幅
export const CONTENT_WIDTH = 350


// モーダルの親幅
export const MORDAL_WIDTH = CONTENT_WIDTH - 100

// モーダルのテキストコンテンツ表示幅
export const MORDAL_TEXT_CONTENT_WIDTH = CONTENT_WIDTH - 150


// ------------------------------------------------------------------------------------------------
// 色
// ネイビー
export const MAIN_NAVY_COLOR = "#1B1C56"

// 白
export const MAIN_WHITE_COLOR = "#feffff"

// ピンク
export const MAIN_PINK_COLOR = "#ED195E"

// グレー
export const MAIN_GRAY_COLOR = "#C4C4C4"

// ------------------------------------------------------------------------------------------------
// borderRadius(丸み)
export const TOP_AREA_LEFT_RADIUS = 50

// ------------------------------------------------------------------------------------------------
// フォント
// メインタイトル
export const MAIN_TITLE_FONT = "AlfaSlabOne_400Regular"

// 標準文字
export const STANDARD_FONT = "ABeeZee_400Regular_Italic"

// ------------------------------------------------------------------------------------------------
// マージン
// Welcome,SignUp,LogIn画面のロゴとボタンの間
export const LOGO_TO_BUTTON_MARGIN_BY_SIGN_UP_AND_LOG_IN = 32

// 全画面共通
// 検索フォーム内アイコンの左右マージン
export const IN_SEARCH_FORM_SIDE_MARGIN = 10
