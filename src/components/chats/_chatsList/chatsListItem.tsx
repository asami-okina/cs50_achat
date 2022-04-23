// libs
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';


// layouts
import { CONTENT_WIDTH, PROFILE_IMAGE_BORDER_RADIUS, MAIN_NAVY_COLOR, PROFILE_IMAGE_SIZE, MAIN_GRAY_COLOR, STANDARD_FONT, MAIN_WHITE_COLOR } from '../../../constants/layout'

export function ChatsListItem({ navigation, profileImage, name, lastMessageCreationDate, lastMessageContent, unreadCount }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	return (
		<Pressable style={styles.listWrapperStyle} onPress={() => { console.log("友達押したよ") }}>
			{profileImage ? (
				<Image source={{ uri: profileImage }} style={{ width: PROFILE_IMAGE_SIZE, height: PROFILE_IMAGE_SIZE, borderRadius: PROFILE_IMAGE_BORDER_RADIUS }} />
			) :
				<View style={styles.circleStyle}></View>
			}
			<View>
				<View style={styles.listSeparatoContainer}>
					<Text style={[styles.textStyle, styles.nameStyle]}>{name}</Text>
					<Text style={[styles.textStyle, styles.lastMessageCreationDateStyle]}>{lastMessageCreationDate}</Text>
				</View>
				<View style={styles.listSeparatoContainer}>
					<Text style={styles.textStyle}>{lastMessageContent}</Text>
					<View style={unreadCount !== 0 ? styles.circleWithUnReadCountContainerStyle : null}>
						<Text style={[styles.textStyle, styles.circleWithUnReadCountStyle]}>{unreadCount}</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	listWrapperStyle: {
		width: CONTENT_WIDTH,
		flexDirection: "row",
	},
	circleStyle: {
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	listSeparatoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "yellow",
		alignItems: "center",
		width: CONTENT_WIDTH - PROFILE_IMAGE_SIZE - 12, // marginLeftの分引く
		marginLeft: 12,
	},
	textStyle: {
		fontFamily: STANDARD_FONT,
		color: MAIN_NAVY_COLOR,
	},
	nameStyle: {
		fontSize: 16,
		marginBottom: 7,
	},
	lastMessageCreationDateStyle: {
		fontSize: 12,
		color: MAIN_GRAY_COLOR,
	},
	circleWithUnReadCountContainerStyle: {
		height: 20,
		width: 20,
		borderRadius: 50,
		lineHeight: 50,
		backgroundColor: MAIN_NAVY_COLOR,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	circleWithUnReadCountStyle: {
		color: MAIN_WHITE_COLOR,
	},
})
