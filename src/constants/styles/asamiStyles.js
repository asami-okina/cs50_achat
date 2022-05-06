// libs
import { StyleSheet } from 'react-native';

// layouts
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, HEAD_CONTAINER_HEIGHT, TOP_AREA_HEIGHT, TOP_AREA_LEFT_RADIUS, MAIN_TITLE_FONT, OPERATION_SCREEN_HEIGHT, WITH_FOOTER_OPERATION_SCREEN_HEIGHT, WITH_FOOTER_OPERATION_SCREEN_HEIGHT_IPHONE_X, MAIN_TITLE_SIZE, TOP_AREA_GROUP_SETTING_HEIGHT, WITH_FOOTER_OPERATION_SCREEN_HEIGHT_NONE_BOTTOM_BUTTON, WITH_FOOTER_OPERATION_SCREEN_HEIGHT_IPHONE_X_NONE_BOTTOM_BUTTON, OPERATION_SCREEN_HEIGHT_IPHONE_X } from '../layout'

export const asamiStyles = StyleSheet.create({
	// 全画面共通
	//一番親のコンポーネント
	screenContainerStyle: {
		flex: 1,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	// 全画面共通
	// 画面一番上にある青色の余白部分
	topMarginViewStyle: {
		height: HEAD_CONTAINER_HEIGHT,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	// 全画面共通
	// 丸みを帯びている白いトップ部分
	topAreaContainerStyle: {
		display: "flex",
		height: TOP_AREA_HEIGHT,
		backgroundColor: MAIN_WHITE_COLOR,
		borderTopLeftRadius: TOP_AREA_LEFT_RADIUS,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 35,
	},
	// 全画面共通
	// 丸みを帯びている白いトップ部分(グループ作成設定画面)
	topAreaContainerGroupSettingStyle: {
		display: "flex",
		height: TOP_AREA_GROUP_SETTING_HEIGHT,
		backgroundColor: MAIN_WHITE_COLOR,
		borderTopLeftRadius: TOP_AREA_LEFT_RADIUS,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 35,
	},
	// 全画面共通
	// Welcome,SignUp,LogIn画面共通
	// 下部分のロゴとボタンの間
	bottomStyleByWelcomeAndSignUpAndLogin: {
		alignItems: "center",
		marginTop: 32,
		flex: 1,
		backgroundColor: MAIN_WHITE_COLOR,
	},
	// Welcome,SignUp,LogIn画面共通
	// 丸みを帯びている白いトップ部分のタイトル
	topAreaTitleStyle: {
		fontSize: MAIN_TITLE_SIZE,
		fontFamily: MAIN_TITLE_FONT,
		color: MAIN_NAVY_COLOR,
	},
	// フッター無画面の操作画面の高さ(iphonex以外)
	mainContainerStyle: {
		minHeight: OPERATION_SCREEN_HEIGHT,
		maxHeight: OPERATION_SCREEN_HEIGHT,
		backgroundColor: MAIN_WHITE_COLOR,
	},
	// フッター無画面の操作画面の高さ(iphonex以外)
	mainContainerIphoneXStyle: {
		minHeight: OPERATION_SCREEN_HEIGHT_IPHONE_X,
		maxHeight: OPERATION_SCREEN_HEIGHT_IPHONE_X,
		backgroundColor: MAIN_WHITE_COLOR,
	},
	// フッター有画面の操作画面の高さ(iphoneX以外)
	withFooterMainContainerStyle: {
		minHeight: WITH_FOOTER_OPERATION_SCREEN_HEIGHT,
		maxHeight: WITH_FOOTER_OPERATION_SCREEN_HEIGHT,
		backgroundColor: MAIN_WHITE_COLOR,
	},
	// フッター有画面の操作画面の高さ(iphoneX)
	withFooterMainContainerIphoneXStyle: {
		minHeight: WITH_FOOTER_OPERATION_SCREEN_HEIGHT_IPHONE_X,
		maxHeight: WITH_FOOTER_OPERATION_SCREEN_HEIGHT_IPHONE_X,
		backgroundColor: MAIN_WHITE_COLOR,
	},
	// フッター有かつ下部のボタンない場合の画面の操作画面の高さ(iphoneX以外)
	// 友達検索画面
	withFooterMainContainerNoneBottomButtonStyle: {
		minHeight: WITH_FOOTER_OPERATION_SCREEN_HEIGHT_NONE_BOTTOM_BUTTON,
		maxHeight: WITH_FOOTER_OPERATION_SCREEN_HEIGHT_NONE_BOTTOM_BUTTON,
		backgroundColor: MAIN_WHITE_COLOR,
	},
	// フッター有かつ下部のボタンない場合の画面の操作画面の高さ(iphoneX)
	// 友達検索、Chats画面
	withFooterMainContainerIphoneXNoneBottomButtonStyle: {
		minHeight: WITH_FOOTER_OPERATION_SCREEN_HEIGHT_IPHONE_X_NONE_BOTTOM_BUTTON,
		maxHeight: WITH_FOOTER_OPERATION_SCREEN_HEIGHT_IPHONE_X_NONE_BOTTOM_BUTTON,
		backgroundColor: MAIN_WHITE_COLOR,
	},
})
