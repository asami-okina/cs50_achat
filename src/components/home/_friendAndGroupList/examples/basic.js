import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	Image,
} from 'react-native';

// api.js
import { leaveGroup } from '../../../../api/api'

// constantsLayout
import { CONTENT_WIDTH, PROFILE_IMAGE_SIZE } from '../../../../constants/layout'

import { SwipeListView } from 'react-native-swipe-list-view';

export default function Basic({ groupList, friendList, type, setModalVisible, clickedCancelMordal, setClickedCancelMordal, clickedOkMordal, setClickedOkMordal }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// 削除時の確認モーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
	const [rowMap, setRowMap] = useState('')
	const [key, setkey] = useState('')
	const [groupChatRoomId, setGroupChatRoomId] = useState('')

	// 一覧のリストを作成
	const [listData, setListData] = useState(
		type === "Group" ? groupList.map((_, i) => ({ ..._, key: `${i}` }))
			: friendList.map((_, i) => ({ ..._, key: `${i}` }))
	);

	// スワップされた該当行をデフォルト状態に戻す
	const closeRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};

	// 全体リストから該当のリストを削除
	// rowMap: オブジェクト , rowKey: 削除するindex
	const deleteRow = (rowMap, rowKey) => {
		closeRow(rowMap, rowKey);
		// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
		const newData = [...listData];
		// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
		const prevIndex = listData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		setListData(newData);
	};

	const renderItem = data => (
		<>
			{type === "Group" && (
				<TouchableHighlight
					onPress={() => console.log('You touched me')}
					style={styles.rowFront}
					underlayColor={'#feffff'}
				>
					<View style={styles.listWrapperStyle}>
						<View style={styles.listItemContainerStyle}>
							<Image source={data.item.group_image} style={styles.profileImageStyle} />
							<Text style={styles.listItemNameStyle}>{data.item.group_name}</Text>
						</View>
					</View>
				</TouchableHighlight>
			)}
			{type === "Friend" && (
				<TouchableHighlight
					onPress={() => console.log('You touched me')}
					style={styles.rowFront}
					underlayColor={'#feffff'}
				>
					<View style={styles.listWrapperStyle}>
						<View style={styles.listItemContainerStyle}>
							<Image source={data.item.friend_profile_image} style={styles.profileImageStyle} />
							<Text style={styles.listItemNameStyle}>{data.item.friend_nickname}</Text>
						</View>
					</View>
				</TouchableHighlight>
			)}
		</>
	);

	// スワップできるようにする
	const renderHiddenItem = (data, rowMap) => (
		<View style={styles.rowBack}>
			{/* deleteボタン */}
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnRight]}
				onPress={() => {
					// 確認モーダルを表示
					setModalVisible(true)
					// 削除時のモーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
					setRowMap(rowMap)
					setkey(data.item.key)
					setGroupChatRoomId(data.item.group_chat_room_id)
				}}
			>
				<Text style={styles.backTextWhite}>Delete</Text>
			</TouchableOpacity>
		</View>
	);

	// 削除時の確認モーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
	useEffect(() => {
		// Cancelを押された場合
		if (clickedCancelMordal) {
			// スワイプされた行をデフォルト状態に戻す
			rowMap[key].closeRow();
			// 初期化
			setRowMap('')
			setkey('')
			setClickedCancelMordal(false)
			setGroupChatRoomId('')
		}
		if (clickedOkMordal) {
			// スワイプされた行を削除
			deleteRow(rowMap, key)
			// グループ脱退関数実行
			leaveGroup(userId, groupChatRoomId)
			// 初期化
			setRowMap('')
			setkey('')
			setClickedOkMordal(false)
			setGroupChatRoomId('')
		}
	}, [clickedCancelMordal, clickedOkMordal])

	return (
		<View style={styles.container}>
			{type === "Group" && (
				<SwipeListView
					data={listData}
					renderItem={renderItem}
					renderHiddenItem={renderHiddenItem}
					rightOpenValue={-75}
					disableRightSwipe={true}
				/>
			)}
			{
				type === "Friend" && (
					<SwipeListView
						data={listData}
						renderItem={renderItem}
					/>
				)
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#feffff',
	},
	backTextWhite: {
		color: '#FFF',
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#feffff',
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#feffff',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75,
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0,
	},
	profileImageStyle: {
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
		borderRadius: 50
	},
	listWrapperStyle: {
		height: 60,
		width: CONTENT_WIDTH,
		display: "flex",
		justifyContent: "center",
		marginBottom: 5,
	},
	listItemContainerStyle: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	listItemNameStyle: {
		fontFamily: "ABeeZee_400Regular",
		marginLeft: 12,
	}
});
