import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { MAIN_NAVY_COLOR, CONTENT_WIDTH, MAIN_GRAY_COLOR,TAB_FONT,MAIN_WHITE_COLOR } from '../../constants/layout'

export function FriendOrGroupSelectTab({ setOpenFriendList, setOpenGroupList, openFriendList, openGroupList, friendCount, groupCount }) {
	return (
		<View style={styles.wrapperStyle}>
			<View style={styles.containerStyle}>
				<Pressable style={openFriendList ? [styles.tabStyle, styles.tabOpenStyle] : styles.tabStyle} onPress={() => {
					setOpenFriendList(true)
					setOpenGroupList(false)
				}}>
					<Text style={styles.textStyle}>Friend</Text>
					<Text style={styles.countStyle}>{friendCount ? friendCount : 0}</Text>
				</Pressable>
				<Pressable style={openGroupList ? [styles.tabStyle, styles.tabOpenStyle] : styles.tabStyle} onPress={() => {
					setOpenFriendList(false)
					setOpenGroupList(true)
				}}>
					<Text style={styles.textStyle}>Group</Text>
					<Text style={styles.countStyle}>{groupCount ? groupCount : 0}</Text>
				</Pressable>
				<View style={styles.remainBorderStyle}></View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapperStyle: {
		alignItems: "center",
	},
	containerStyle: {
		width: CONTENT_WIDTH,
		marginTop: 5,
		height: 40,
		flexDirection: "row",
	},
	tabStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		width: 85,
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: MAIN_GRAY_COLOR,
		flexDirection: "row",
	},
	tabOpenStyle: {
		borderBottomWidth: 1,
		borderBottomColor: MAIN_NAVY_COLOR,
	},
	remainBorderStyle: {
		borderBottomWidth: 1,
		borderBottomColor: MAIN_GRAY_COLOR,
		flex: 1,
	},
	textStyle: {
		fontSize: 16,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
	},
	countStyle: {
		marginLeft: 10,
		color: MAIN_NAVY_COLOR,
	}
})
