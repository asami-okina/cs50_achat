// libs
import { StyleSheet } from 'react-native';

// layouts
import { CONTENT_WIDTH, STANDARD_FONT, PROFILE_IMAGE_SIZE, ADD_FRIEND_WIDTH,PROFILE_IMAGE_BORDER_RADIUS,BIG_PROFILE_IMAGE_SIZE } from '../layout'

export const selectedFriendStyles = StyleSheet.create({
	// 選択された友達の部分
	wrapperStyle: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	containerStyle: {
		width: CONTENT_WIDTH,
		flexDirection: "row",
	},
	profileImageStyle: {
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
	},
	listItemNameStyle: {
		fontFamily: STANDARD_FONT,
		width: PROFILE_IMAGE_SIZE,
		textAlign: "center",
		paddingTop: 5,
		fontSize: 10,
	},
	bigProfilelistItemNameStyle: {
		fontFamily: STANDARD_FONT,
		width: BIG_PROFILE_IMAGE_SIZE,
		textAlign: "center",
		paddingTop: 5,
	},
	closeImageContainerStyle: {
		position: "relative",
		left: 24,
		top:17,
		zIndex: 1
	},
	closeImageStyle: {
		width: 20,
		height: 20,
	},
});

