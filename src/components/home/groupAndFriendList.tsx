import React from 'react';
import { Text, View, Pressable, Image, StyleSheet } from 'react-native';
import { CONTENT_WIDTH, ICON_SIZE, MAIN_WHITE_COLOR } from '../../constants/layout'

import { ListItem } from './_groupAndFriendList/listItem'

export function GroupAndFriendList({ groupListProps, friendListProps, type }) {
	return (
		<View style={styles.groupAndFriendWrapperStyle}>
			<View style={styles.groupAndFriendContainerStyle}>
				<View style={styles.topContainerStyle}>
					<Text style={styles.titleStyle}>{type}</Text>
					{type === "Group" && (
						<Text style={styles.countStyle}>{groupListProps?.groupCount ? groupListProps.groupCount : 0}</Text>
					)}
					{type === "Friend" && (
						<Text style={styles.countStyle}>{friendListProps?.friendCount ? friendListProps.friendCount : 0}</Text>
					)}
					<View style={styles.iconsBoxStyle}>
						<Pressable>
							<Image source={require("../../../assets/images/plus.png")} style={styles.plusIconStyle} />
						</Pressable>
						<Pressable onPress={() => {
							if (type === "Group") {
								groupListProps?.setOpenGroupList(!groupListProps?.openGroupList)
							} else {
								friendListProps?.setOpenFriendList(!friendListProps?.openFriendList)
							}
						}}>
							<Image source={require("../../../assets/images/open.png")} style={styles.openIconStyle} />
						</Pressable>
					</View>
				</View>
				{/* グループ一覧をmapで回して表示 */}
				{type === "Group" && (
					<ListItem groupListProps={{ "openGroupList": groupListProps?.openGroupList, "groupList": groupListProps?.groupList }} friendListProps={null} type={"Group"} />
				)}
				{/* 友達一覧をmapで回して表示 */}
				{type === "Friend" && (
					<ListItem friendListProps={{ "openFriendList": friendListProps?.openFriendList, "friendList": friendListProps?.friendList }} groupListProps={null} type={"Friend"} />
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
		justifyContent: "space-between",
	},
	iconsBoxStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "40%",
	},
	plusIconStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
	openIconStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
	titleStyle: {
		fontFamily: "MPLUS1p_700Bold",
		fontSize: 36,
	},
	countStyle: {
		fontFamily: "MPLUS1p_400Regular",
		fontSize: 36,
	},
});
