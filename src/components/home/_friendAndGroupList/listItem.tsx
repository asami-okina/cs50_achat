// libs
import React, { useState } from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';

// childComponents
import Basic from './examples/basic';

export function ListItem({ groupListProps, friendListProps, type, setModalVisible,clickedCancelMordal,setClickedCancelMordal, clickedOkMordal,setClickedOkMordal}) {
	return (
		<View style={styles.containerStyle}>
			{/* groupの場合 */}
			{groupListProps?.groupList.length !== 0 && groupListProps?.groupList !== undefined && (
				<Basic groupList={groupListProps?.groupList} friendList={null} type={type} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
			)}
			{/* friendの場合 */}
			{friendListProps?.friendList.length !== 0 && friendListProps?.friendList !== undefined && (
				<Basic groupList={null} friendList={friendListProps?.friendList} type={type} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: '#feffff',
		marginTop: 12,
	}
});
