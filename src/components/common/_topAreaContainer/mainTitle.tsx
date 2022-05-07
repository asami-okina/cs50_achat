// libs
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

// layouts
import { TAB_FONT, MAIN_NAVY_COLOR, CONTENT_WIDTH, PROFILE_IMAGE_BORDER_RADIUS, BACK_ICOM_SIZE } from '../../../constants/layout'

export function MainTitle({ navigation, title, link, props, groupChatRoomId, groupMemberUserId }) {
	return (
		<View style={styles.titleWrapperStyle}>
			<Pressable onPress={() => { navigation.navigate(link) }} >
				<Image source={require("../../../../assets/images/back-icon.png")} style={styles.backIconStyle} />
			</Pressable>
			{title && (
				<Text style={styles.titleStyle}>{title}</Text>
			)}
			{props && (
				<View style={styles.topAreaContainerStyle}>
					<View style={styles.imageContainerStyle}>
						{/* ディレクトリの画像はtypeofがnumberとなり、アップロードした画像はstringとなる */}
						{props.profileImage ? typeof props.profileImage === "string" ?
							(
								<Image source={{ uri: props.profileImage }} style={styles.circleStyle} />
							) :
							(
								<Image source={props.profileImage} style={styles.circleStyle} />
							) : <View style={styles.circleStyle}></View>}
					</View>
					<View style={styles.nameAndAddCiecleContainerStyle}>
						<Text style={styles.nameStyle} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
						{groupChatRoomId && (
							<Pressable onPress={() => {
								navigation.navigate('AddGroupMember', { groupChatRoomId: groupChatRoomId, groupMemberUserId: groupMemberUserId, image: props.profileImage, name: props.name })
							}}>
								<Image source={require("../../../../assets/images/add-circle.png")} style={styles.addCircleStyle} />
							</Pressable>
						)}
					</View>
				</View>
			)}
		</View>
	);
}


const styles = StyleSheet.create({
	topAreaContainerStyle: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	titleWrapperStyle: {
		width: CONTENT_WIDTH,
		flexDirection: "row",
		alignItems: "center",
	},
	titleStyle: {
		fontSize: 24,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
		marginLeft: 12,
	},
	imageContainerStyle: {
		marginLeft: 12,
	},
	backIconStyle: {
		width: BACK_ICOM_SIZE,
		height: BACK_ICOM_SIZE,
	},
	addCircleStyle: {
		width: 40,
		height: 40,
	},
	circleStyle: {
		width: 40,
		height: 40,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	nameAndAddCiecleContainerStyle: {
		flexDirection: "row",
		width: CONTENT_WIDTH - BACK_ICOM_SIZE - 40 - 12, // 全体の幅 - 戻るボタン - 画像 - marginLeft
		justifyContent: "space-between",
		alignItems: "center",
	},
	nameStyle: {
		paddingLeft: 12,
		maxWidth: 220,
	}
})
