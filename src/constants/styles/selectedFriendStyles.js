// libs
import { StyleSheet } from 'react-native';

// layouts
import { CONTENT_WIDTH, STANDARD_FONT, PROFILE_IMAGE_SIZE, ADD_FRIEND_WIDTH } from '../layout'

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
		borderRadius: 50,
	},
	listItemNameStyle: {
		fontFamily: STANDARD_FONT,
		width: ADD_FRIEND_WIDTH,
		textAlign: "center"
	},
	closeImageContainerStyle: {
		position: "relative",
		left: 20,
		top: 8,
	},
	closeImageStyle: {
		width: 20,
		height: 20,
	},
});

