import React from 'react';
import { Text, View, Pressable, Image, StyleSheet } from 'react-native';
import { CONTENT_WIDTH } from '../../../constants/layout'

export function ListItem({ groupListProps, friendListProps, type }) {
	return (
		<>
			{type === "Group" && (
				<>
					{groupListProps.openGroupList && groupListProps.groupList.length != 0 && groupListProps.groupList.map((list) => {
						return (
							<View style={styles.listWrapperStyle} key={list.group_chat_room_id}>
								<Pressable style={styles.listItemContainerStyle}>
									<Image source={list.group_image} style={styles.profileImageStyle} />
									<Text style={styles.listItemNameStyle}>{list.group_name}</Text>
								</Pressable>
							</View>
						)
					})}
				</>
			)}
			{type === "Friend" && (
				<>
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
				</>
			)}
		</>
	);
}

export const styles = StyleSheet.create({
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
		width: 50,
		height: 50,
		borderRadius: 50
	},
	listItemNameStyle: {
		fontFamily: "ABeeZee_400Regular",
		marginLeft: 12,
	}
});
