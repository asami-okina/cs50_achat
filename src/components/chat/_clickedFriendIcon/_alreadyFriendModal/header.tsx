// libs
import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

// layouts
import { CONTENT_WIDTH } from '../../../../constants/layout'

export function Header({ navigation, groupChatRoomId, groupImage, groupName }) {
	return (
		<View style={styles.titleWrapperStyle}>
			<Pressable onPress={() => {
				navigation.navigate('Chat', { "groupChatRoomId": groupChatRoomId, "directChatRoomId": null, "profileImage": groupImage, "groupName": groupName, "groupMemberUserId": null })
			}} >
				<View style={styles.closeContainerStyle}>
					<Image source={require("../../../../../assets/images/close.png")} style={styles.closeStyle} />
				</View>
			</Pressable>
		</View>
	);
}


const styles = StyleSheet.create({
	titleWrapperStyle: {
		width: CONTENT_WIDTH,
		flexDirection: "row",
		alignItems: "center",
	},
	closeContainerStyle: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center"
	},
	closeStyle: {
		width: 24,
		height: 24,
	},
})
