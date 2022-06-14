// libs
import React, { useEffect } from 'react';
import { StyleSheet, View, } from 'react-native';

// components
import Basic from './examples/basic';

// layouts
import { MAIN_WHITE_COLOR } from '../../../constants/layout'

type ListItemPropsType = {
	navigation: any; // ★navigationの型がわからない。一番親のコンポーネントはできたけど、子コンポーネントとしてnavigationをもらう方法がわからなかった
	type: string;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	clickedCancelMordal: boolean;
	setClickedCancelMordal: React.Dispatch<React.SetStateAction<boolean>>;
	clickedOkMordal: boolean;
	setClickedOkMordal: React.Dispatch<React.SetStateAction<boolean>>;
	groupList: GroupListPropsType[];
	friendList: FriendListPropsType[];
}

export function ListItem({
	navigation,
	type,
	setModalVisible,
	clickedCancelMordal,
	setClickedCancelMordal,
	clickedOkMordal,
	setClickedOkMordal,
	groupList,
	friendList,
}: ListItemPropsType) {
	return (
		<View style={styles.containerStyle}>
			{/* groupの場合 */}
			{groupList && groupList.length !== 0 && groupList !== undefined && (
				<Basic navigation={navigation} groupList={groupList} friendList={null} type={type} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
			)}
			{/* friendの場合 */}
			{friendList && friendList.length !== 0 && friendList !== undefined && (
				<Basic navigation={navigation} groupList={null} friendList={friendList} type={type} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
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
