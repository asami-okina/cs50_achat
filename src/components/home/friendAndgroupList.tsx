// libs
import React from 'react';
import { View, StyleSheet } from 'react-native';

// layouts
import { CONTENT_WIDTH, MAIN_WHITE_COLOR } from '../../constants/layout'

// components
import { ListItem } from './_friendAndGroupList/listItem'

export function FriendAndGroupList({
	type,
	setModalVisible,
	clickedCancelMordal,
	setClickedCancelMordal,
	clickedOkMordal,
	setClickedOkMordal,
	openFriendList,
	friendList,
	openGroupList,
	groupList
}) {
	return (
		<View style={styles.groupAndFriendWrapperStyle}>
			<View style={styles.groupAndFriendContainerStyle}>
				<View style={styles.topContainerStyle}>
				</View>
				{/* グループ一覧をmapで回して表示 */}
				{type === "Group" && openGroupList && (
					<ListItem  groupList={groupList} friendList={null} type={"Group"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
				)}
				{/* 友達一覧をmapで回して表示 */}
				{type === "Friend" && openFriendList && (
					<ListItem  groupList={null} friendList={friendList}  type={"Friend"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
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
