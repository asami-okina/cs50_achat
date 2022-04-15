// libs
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

// layouts
import { MAIN_WHITE_COLOR } from '../../constants/layout'

// components
import { FriendListItem } from '../addGroup/_friendList/friendListItem'

export function FriendList({
	friendList,
	setSelectedFriendList,
	selectedFriendList
}) {
	// 一覧のリストを作成
	const [listData, setListData] = useState([]);


	// 選択された友達リストの追加
	const addFriendList = (rowKey) => {
		// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
		const newData = [...selectedFriendList]
		// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
		const prevIndex = listData.findIndex(item => item.key === rowKey);
		newData.push(listData[prevIndex]);
		setSelectedFriendList(newData)
	}

	// 選択された友達リストの削除
	const deleteFriendList = (rowKey) => {
		// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
		const newData = [...selectedFriendList];
		// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
		const prevIndex = selectedFriendList.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		setSelectedFriendList(newData);
	}

	useEffect(() => {
		if (friendList.length !== 0 && friendList !== undefined) {
			setListData(friendList.map((_, i) => ({ ..._, key: `${i}` })))
		}
	}, [friendList])

	return (
		<ScrollView>
			<View style={styles.wrapperStyle}>
			</View>
			<View style={styles.containerStyle}>
				{listData.length !== 0 && listData !== undefined && listData.map((list) => (
					<FriendListItem list={list} key={list.key} addFriendList={addFriendList} deleteFriendList={deleteFriendList} />
				))
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
