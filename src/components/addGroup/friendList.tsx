// libs
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

// layouts
import { MAIN_WHITE_COLOR } from '../../constants/layout'

// components
import { FriendListItem } from '../addGroup/_friendList/friendListItem'

export function FriendList({
	listData,
	addFriendList,
	deleteFriendList,
	selectedFriendList
}) {
	return (
		<ScrollView>
			<View style={styles.wrapperStyle}>
			</View>
			<View style={styles.containerStyle}>
				{listData.length !== 0 && listData !== undefined && listData.map((list) => {
					// 該当友達が選択されているかどうかの判定
					const prevIndex = selectedFriendList.findIndex(item => item.key === list.key);
					let clecked = false
					if (prevIndex !== -1) {
						clecked = true
					}
					return (
						<FriendListItem list={list} key={list.key} addFriendList={addFriendList} deleteFriendList={deleteFriendList} clecked={clecked} />
					)
				})
				}
			</View>
		</ScrollView>
	);
}

export const styles = StyleSheet.create({
	wrapperStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR,
	},
	containerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		marginTop: 12,
	},
});
