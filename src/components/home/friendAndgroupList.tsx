// libs
import React from 'react';
import { View, StyleSheet } from 'react-native';

// layouts
import { CONTENT_WIDTH, MAIN_WHITE_COLOR } from '../../constants/layout'

// components
import { ListItem } from './_friendAndGroupList/listItem'

export function FriendAndGroupList({
	groupListProps,
	friendListProps,
	type,
	setModalVisible,
	clickedCancelMordal,
	setClickedCancelMordal,
	clickedOkMordal,
	setClickedOkMordal
}) {
	return (
		<View style={styles.groupAndFriendWrapperStyle}>
			<View style={styles.groupAndFriendContainerStyle}>
				<View style={styles.topContainerStyle}>
				</View>
				{/* グループ一覧をmapで回して表示 */}
				{type === "Group" && groupListProps.openGroupList && (
					<ListItem groupListProps={{ "openGroupList": groupListProps?.openGroupList, "groupList": groupListProps?.groupList }} friendListProps={null} type={"Group"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
				)}
				{/* 友達一覧をmapで回して表示 */}
				{type === "Friend" && friendListProps.openFriendList && (
					<ListItem friendListProps={{ "openFriendList": friendListProps?.openFriendList, "friendList": friendListProps?.friendList }} groupListProps={null} type={"Friend"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
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
});
