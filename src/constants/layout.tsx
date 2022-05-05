// libs
import { Dimensions } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'

// ------------------------------------------------------------------------------------------------
// タイトル
// libs
// layouts
// components
// api
// constantsCommonStyles
// constantsSearchStyles
// constantsFormDescriptionStyles
// hooks
// fonts

// ------------------------------------------------------------------------------------------------
// 大きさ
// 標準のアイコンの大きさ
export const ICON_SIZE = 24

// 小さいアイコンの大きさ
export const SMALL_ICON_SIZE = ICON_SIZE / 2

// A-Chatロゴの大きさ
export const A_CHAT_LOG_SIZE = 250

// メインタイトルの文字の大きさ
export const MAIN_TITLE_SIZE = 50

// ボタンの文字の大きさ
export const BUTTON_TEXT_SIZE = 18

// チャット関連のプロフィール画像の大きさ
export const PROFILE_IMAGE_SIZE = 40

// 友達、グループ追加ボタンの大きさ
export const ADD_BUTTON_SIZE = 65

// タブのタイトルの文字の大きさ
export const TAB_TITLE_TEXT_SIZE = 16

// 検索フォームの説明文の文字の大きさ
export const FORM_DESCRIPTION_TEXT_SIZE = 12

// プロフィール画像の大きさ
export const BIG_PROFILE_IMAGE_SIZE = 100

// 戻るボタンの大きさ
export const BACK_ICOM_SIZE = 50

// ------------------------------------------------------------------------------------------------
// 幅
// コンテンツ表示幅
export const CONTENT_WIDTH = 350


// モーダルの親幅
export const MORDAL_WIDTH = CONTENT_WIDTH - 100

// モーダルのテキストコンテンツ表示幅
export const MORDAL_TEXT_CONTENT_WIDTH = CONTENT_WIDTH - 150

// 小さいボタンの幅
export const SMALL_BUTTON_WIDTH = 100

// グループに追加するために選択された友達部分の表示幅
export const ADD_FRIEND_WIDTH = 60

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
export const TOP_AREA_HEIGHT = 100

// トップ領域の高さ(グループ作成設定画面)
export const TOP_AREA_GROUP_SETTING_HEIGHT = 150

// フッター有画面の操作画面の高さ:iphoneX以外 　(画面の高さ - (全画面共通の青色のヘッド部分の高さ + フッターの高さ + ステータスバーの高さ + トップ領域の高さ + 友達、グループ追加ボタンの大きさ))
export const WITH_FOOTER_OPERATION_SCREEN_HEIGHT = SCREEN_HEIGHT - (HEAD_CONTAINER_HEIGHT + FOOTER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_HEIGHT + ADD_BUTTON_SIZE)

// フッター有画面の操作画面の高さ:iphoneX 　(画面の高さ - (全画面共通の青色のヘッド部分の高さ + フッターの高さ + ステータスバーの高さ + トップ領域の高さ + iphoeXの底の高さ + 友達、グループ追加ボタンの大きさ))
export const WITH_FOOTER_OPERATION_SCREEN_HEIGHT_IPHONE_X = SCREEN_HEIGHT - (HEAD_CONTAINER_HEIGHT + FOOTER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_HEIGHT + IPHONE_X_BOTTOM_SPACE + ADD_BUTTON_SIZE)

// フッター有画面の操作画面の高さ(下部のボタンなし):iphoneX以外 　(画面の高さ - (全画面共通の青色のヘッド部分の高さ + フッターの高さ + ステータスバーの高さ + トップ領域の高さ))
// 友達検索画面
export const WITH_FOOTER_OPERATION_SCREEN_HEIGHT_NONE_BOTTOM_BUTTON = SCREEN_HEIGHT - (HEAD_CONTAINER_HEIGHT + FOOTER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_HEIGHT)

// フッター有画面の操作画面の高さ:iphoneX(下部のボタンなし) 　(画面の高さ - (全画面共通の青色のヘッド部分の高さ + フッターの高さ + ステータスバーの高さ + トップ領域の高さ + iphoeXの底の高さ))
// 友達検索画面
export const WITH_FOOTER_OPERATION_SCREEN_HEIGHT_IPHONE_X_NONE_BOTTOM_BUTTON = SCREEN_HEIGHT - (HEAD_CONTAINER_HEIGHT + FOOTER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_HEIGHT + IPHONE_X_BOTTOM_SPACE)

// フッター無画面の操作画面の高さ: iphoneX以外　(画面の高さ - (全画面共通の青色のヘッド部分の高さ + ステータスバーの高さ + トップ領域の高さ))
export const OPERATION_SCREEN_HEIGHT = SCREEN_HEIGHT - (HEAD_CONTAINER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_HEIGHT)

// フッター無画面の操作画面の高さ:iphoneX　(画面の高さ - (全画面共通の青色のヘッド部分の高さ + ステータスバーの高さ + トップ領域の高さ + iphoeXの底の高さ))
export const OPERATION_SCREEN_HEIGHT_IPHONE_X = SCREEN_HEIGHT - (HEAD_CONTAINER_HEIGHT + STATUS_BAR_HEIGHT + TOP_AREA_HEIGHT + IPHONE_X_BOTTOM_SPACE)

// 検索フォームの高さ
export const SEARCH_FORM_HEIGHT = 60

// ボタンの高さ
export const BUTTON_HEIGHT = 60

// タブの高さ
export const TAB_HEIGHT = 40

// 小さいボタンの高さ
export const SMALL_BUTTON_HEIGHT = (SMALL_BUTTON_WIDTH / 2)

// チャットSendボタンの高さ
export const SEND_BUTTON_HEIGHT = 44

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

// 検索フォームの背景の薄グレー
export const LIGHT_GRAY_COLOR = "#F6F7FB"

// 黒
export const MAIN_BLACK_COLOR = "#262626"

// 黄緑
export const MAIN_YELLOW_GREEN = "#66E33A"

// 黄色
export const MAIN_YELLOW_COLOR = "#FFF450"

// ------------------------------------------------------------------------------------------------
// borderRadius(丸み)
// 画面上位の白色の丸み部分
export const TOP_AREA_LEFT_RADIUS = 50

// ボタン
export const BUTTON_BORDER_RADIUS = 10

// 検索フォーム
export const SEARCH_FORM_BORDER_RADIUS = 5

// プロフィール画像の丸み
export const PROFILE_IMAGE_BORDER_RADIUS = 50

// ------------------------------------------------------------------------------------------------
// フォント
// メインタイトル
export const MAIN_TITLE_FONT = "AlfaSlabOne_400Regular"

// 標準文字
export const STANDARD_FONT = "ABeeZee_400Regular"

// タブのタイトル
export const TAB_FONT = "MPLUS1p_700Bold"

// ------------------------------------------------------------------------------------------------
// マージン
// Welcome,SignUp,LogIn画面のロゴとボタンの間
export const LOGO_TO_BUTTON_MARGIN_BY_SIGN_UP_AND_LOG_IN = 32

// 全画面共通
// 検索フォーム内アイコンの左右マージン
export const IN_SEARCH_FORM_SIDE_MARGIN = 10
