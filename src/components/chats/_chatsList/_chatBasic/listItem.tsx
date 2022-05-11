// libs
import React from 'react';
import { View, StyleSheet, Pressable, Image, Text } from 'react-native';

// layouts
import { CONTENT_WIDTH, PROFILE_IMAGE_SIZE, STANDARD_FONT, MAIN_WHITE_COLOR, PROFILE_IMAGE_BORDER_RADIUS, MAIN_NAVY_COLOR, MAIN_GRAY_COLOR } from '../../../../constants/layout'

export function ListItem({ navigation, profileImage, name, lastMessageCreationDate, lastMessageContent, unreadCount, groupChatRoomId, directChatRoomId, groupMemberUserId }) {
	return (
		<Pressable style={styles.listWrapperStyle} onPress={() => { navigation.navigate('Chat', { "groupChatRoomId": groupChatRoomId, "directChatRoomId": directChatRoomId, "profileImage": profileImage, "name": name }) }}>
			<View style={styles.imageContainerStyle}>
				{profileImage ? (
					<Image source={profileImage} style={{ width: PROFILE_IMAGE_SIZE, height: PROFILE_IMAGE_SIZE, borderRadius: PROFILE_IMAGE_BORDER_RADIUS }} />
				) :
					<View style={styles.circleStyle}></View>
				}
			</View>
			<View style={styles.listSeparateWrapperStyle}>
				<View style={[styles.listSeparateContainer, styles.listSeparateTopContainerStyle]}>
					<Text style={[styles.textStyle, styles.nameStyle]}>{name}</Text>
					<Text style={[styles.textStyle, styles.lastMessageCreationDateStyle]}>{lastMessageCreationDate}</Text>
				</View>
				<View style={styles.listSeparateContainer}>
					<Text style={styles.textStyle}>{lastMessageContent}</Text>
					<View style={unreadCount !== 0 ? styles.circleWithUnReadCountContainerStyle : null}>
						<Text style={[styles.textStyle, styles.circleWithUnReadCountStyle]}>{unreadCount}</Text>
					</View>
				</View>
				<View>
				</View>
			</View>
		</Pressable>
	);
}


const styles = StyleSheet.create({
	listWrapperStyle: {
		flexDirection: "row",
		backgroundColor: MAIN_WHITE_COLOR,
		height: 60,
	},
	circleStyle: {
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	listSeparateWrapperStyle: {
		marginLeft: 12,
	},
	listSeparateContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 50 / 2,
		width: CONTENT_WIDTH - PROFILE_IMAGE_SIZE - 12, // marginLeftの分引く
	},
	listSeparateTopContainerStyle: {
		alignItems: "flex-end",
	},
	textStyle: {
		fontFamily: STANDARD_FONT,
		color: MAIN_NAVY_COLOR,
		fontSize: 10,
	},
	nameStyle: {
		fontSize: 13,
	},
	lastMessageCreationDateStyle: {
		fontSize: 10,
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
	imageContainerStyle: {
		justifyContent: "center",
		alignItems: "center",
	},
});
