import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, A_CHAT_LOG_SIZE, MAIN_PINK_COLOR, HEAD_CONTAINER_HEIGHT, TOP_AREA_STYLE, TOP_AREA_LEFT_RADIUS, MAIN_TITLE_SIZE, MAIN_TITLE_FONT, START_SCREEN_HEIGHT, BUTTON_HEIGHT, CONTENT_WIDTH, STANDARD_FONT, BUTTON_TEXT_SIZE } from '../constants/layout'

// ------------------------------------------------------------------------------------------------
// 全画面共通
//一番親のコンポーネント
export const screenContainerStyle = {
	flex: 1,
	backgroundColor: MAIN_NAVY_COLOR,
}

// 画面一番上にある青色の余白部分
export const topMarginViewStyle = {
	height: HEAD_CONTAINER_HEIGHT,
	backgroundColor: MAIN_NAVY_COLOR,
}

// 丸みを帯びている白いトップ部分
export const topAreaContainerStyle = {
	height: TOP_AREA_STYLE,
	backgroundColor: MAIN_WHITE_COLOR,
	borderTopLeftRadius: TOP_AREA_LEFT_RADIUS,
	alignItems: 'center',
}

// トップ部分を除くメイン部分
export const mainContainerStyle = {
	minHeight: START_SCREEN_HEIGHT,
	backgroundColor: MAIN_WHITE_COLOR,
}

// ------------------------------------------------------------------------------------------------
// Welcome,SignUp,LogIn画面共通
// 下部分のロゴとボタンの間
export const bottomStyleByWelcomeAndSignUpAndLogin = {
	alignItems: "center",
	marginTop: 32,
	flex: 1,
	backgroundColor: MAIN_WHITE_COLOR,
}
