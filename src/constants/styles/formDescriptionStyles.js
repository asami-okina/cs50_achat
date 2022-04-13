// libs
import { StyleSheet } from 'react-native';

// layouts
import { MAIN_WHITE_COLOR, CONTENT_WIDTH, MAIN_BLACK_COLOR, SMALL_ICON_SIZE, STANDARD_FONT, FORM_DESCRIPTION_TEXT_SIZE, IN_SEARCH_FORM_SIDE_MARGIN } from '../layout'

export const formDescriptionStyles = StyleSheet.create({
	// フォームの説明文
	descriptionBoxStyle: {
		display: "flex",
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR,
		paddingBottom: 10,
	},
	descriptionWrapperStyle: {
	},
	descriptionContainerStyle: {
		flexDirection: "row",
		width: CONTENT_WIDTH,
	},
	descriptionTextStyle: {
		color: MAIN_BLACK_COLOR,
		fontSize: FORM_DESCRIPTION_TEXT_SIZE,
		overflow: "visible",
		fontFamily: STANDARD_FONT,
	},
	// 共通説明文のアイコンの大きさ
	descriptionIconStyle: {
		marginRight: IN_SEARCH_FORM_SIDE_MARGIN,
		width: SMALL_ICON_SIZE,
		height: SMALL_ICON_SIZE,
	},
});
