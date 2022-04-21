// libs
import React from 'react';
import { StyleSheet, View, } from 'react-native';

// components
import Basic from './examples/basic';

// layouts
import { MAIN_WHITE_COLOR } from '../../../constants/layout'

export function ListItem({
	type,
	setModalVisible,
	clickedCancelMordal,
	setClickedCancelMordal,
	clickedOkMordal,
	setClickedOkMordal,
	groupList,
	friendList,
}) {
	return (
		<View style={styles.containerStyle}>
			{/* groupの場合 */}
			{groupList && groupList.length !== 0 && groupList !== undefined && (
				<Basic groupList={groupList} friendList={null} type={type} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
			)}
			{/* friendの場合 */}
			{friendList && friendList.length !== 0 && friendList !== undefined && (
				<Basic groupList={null} friendList={friendList} type={type} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
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
