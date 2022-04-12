// libs
import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Pressable,
	Image,
	Text,
	ScrollView
} from 'react-native';

// childComponents
import Basic from './examples/basic';

// constantsLayout
import { CONTENT_WIDTH, PROFILE_IMAGE_SIZE } from '../../../constants/layout'

export function ListItem({ groupListProps, friendListProps, type }) {
	return (
		<View style={styles.container}>
			{/* groupの場合 */}
			{groupListProps?.groupList.length !== 0 && groupListProps?.groupList !== undefined && (
				<Basic groupList={groupListProps?.groupList} friendList={null} type={type} />
			)}
			{/* friendの場合 */}
			{type === "Friend" && (
				<>
											<ScrollView>
					{friendListProps?.openFriendList && friendListProps?.friendList.length != 0 && friendListProps?.friendList.map((list) => {
						return (
							<View style={styles.listWrapperStyle} key={list.direct_chat_room_id}>
								<Pressable style={styles.listItemContainerStyle}>
									<Image source={list.friend_profile_image} style={styles.profileImageStyle} />
									<Text style={styles.listItemNameStyle}>{list.friend_nickname}</Text>
								</Pressable>
							</View>
						)
					})}
									</ScrollView>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#feffff',
	},
	listWrapperStyle: {
		height: 60,
		width: CONTENT_WIDTH,
		display: "flex",
		justifyContent: "center",
		marginBottom: 5,
	},
	listItemContainerStyle: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	profileImageStyle: {
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
		borderRadius: 50
	},
	listItemNameStyle: {
		fontFamily: "ABeeZee_400Regular",
		marginLeft: 12,
	}
});
