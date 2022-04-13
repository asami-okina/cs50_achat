import React from 'react';
import { Text, View, Pressable, Image, StyleSheet } from 'react-native';
import { CONTENT_WIDTH, ICON_SIZE, MAIN_WHITE_COLOR, MAIN_NAVY_COLOR } from '../../constants/layout'

import { ListItem } from './_friendAndGroupList/listItem'

export function FriendAndGroupList({ groupListProps, friendListProps, type, setModalVisible }) {
	return (
		<View style={styles.groupAndFriendWrapperStyle}>
			<View style={styles.groupAndFriendContainerStyle}>
				<View style={styles.topContainerStyle}>
				</View>
				{/* グループ一覧をmapで回して表示 */}
				{type === "Group" && groupListProps.openGroupList && (
					<ListItem groupListProps={{ "openGroupList": groupListProps?.openGroupList, "groupList": groupListProps?.groupList }} friendListProps={null} type={"Group"} setModalVisible={setModalVisible}/>
				)}
				{/* 友達一覧をmapで回して表示 */}
				{type === "Friend" && friendListProps.openFriendList && (
					<ListItem friendListProps={{ "openFriendList": friendListProps?.openFriendList, "friendList": friendListProps?.friendList }} groupListProps={null} type={"Friend"} setModalVisible={setModalVisible} />
				)}
			</View>
		</View>
	);
}

export const styles = StyleSheet.create({
	groupAndFriendWrapperStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR
	},
	groupAndFriendContainerStyle: {
		display: "flex",
		justifyContent: "center",
		backgroundColor: MAIN_WHITE_COLOR,
		width: CONTENT_WIDTH,
	},
	topContainerStyle: {
		flexDirection: "row",
		alignItems: "center",
	},
	titleStyle: {
		fontFamily: "MPLUS1p_700Bold",
		color: MAIN_NAVY_COLOR,
		fontSize: 18,
		marginRight: 12,
		marginTop: 5,
		height: "100%",
	},
});
