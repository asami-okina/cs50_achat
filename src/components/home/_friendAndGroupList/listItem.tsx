// libs
import React from 'react';
import { StyleSheet, View, } from 'react-native';

// components
import Basic from './examples/basic';

// layouts
import { MAIN_WHITE_COLOR } from '../../../constants/layout'

export function ListItem({ groupListProps, friendListProps, type, setModalVisible, clickedCancelMordal, setClickedCancelMordal, clickedOkMordal, setClickedOkMordal }) {
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
		backgroundColor: MAIN_WHITE_COLOR,
		marginTop: 12,
	}
});
