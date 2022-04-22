// libs
import { StyleSheet } from 'react-native';

// layouts
import { MAIN_WHITE_COLOR, CONTENT_WIDTH, MAIN_PINK_COLOR, STANDARD_FONT, LIGHT_GRAY_COLOR, MAIN_NAVY_COLOR, ICON_SIZE, SEARCH_FORM_HEIGHT, IN_SEARCH_FORM_SIDE_MARGIN, SEARCH_FORM_BORDER_RADIUS } from '../layout'

export const searchStyles = StyleSheet.create({
	// 検索フォーム
	searchBoxStyle: {
		flex: 1,
		backgroundColor: MAIN_WHITE_COLOR,
	},
	searchWrapperStyle: {
		flex: 1,
		alignItems: "center",
		paddingBottom: 10,

	},
	searchContainerStyle: {
	},
	searchTitleStyle: {
		fontFamily: STANDARD_FONT,
		color: MAIN_NAVY_COLOR,
		marginBottom: 5,
	},
	searchIconStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		marginRight: IN_SEARCH_FORM_SIDE_MARGIN,
		marginLeft: IN_SEARCH_FORM_SIDE_MARGIN,
	},
	searchViewStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: LIGHT_GRAY_COLOR,
		height: SEARCH_FORM_HEIGHT,
		borderRadius: SEARCH_FORM_BORDER_RADIUS,
		width: CONTENT_WIDTH,
	},
	// 左側にアイコンがある検索フォーム
	searchContentWithIconStyle: {
		flex: 1,
		fontFamily: STANDARD_FONT,
	},
	// 左側にアイコンがない検索フォーム
	searchContentNoneLeftIconStyle: {
		paddingLeft: IN_SEARCH_FORM_SIDE_MARGIN,
		flex: 1,
		fontFamily: STANDARD_FONT
	},
	// 入力が間違っている場合のフォーム枠線の色
	inputIncorrectBorderColorStyle: {
		borderWidth: 2,
		borderColor: MAIN_PINK_COLOR,
	},
	// パスワードアイコンの表示/非表示(パスワード入力の場合のみ)
	passwordIconStyle: {
		marginRight: IN_SEARCH_FORM_SIDE_MARGIN
	},
});

