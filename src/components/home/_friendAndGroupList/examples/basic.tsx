// libs
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

// layouts
import { CONTENT_WIDTH, PROFILE_IMAGE_SIZE, STANDARD_FONT, MAIN_WHITE_COLOR, MAIN_PINK_COLOR, PROFILE_IMAGE_BORDER_RADIUS } from '../../../../constants/layout'

export default function Basic({ navigation, groupList, friendList, type, setModalVisible, clickedCancelMordal, setClickedCancelMordal, clickedOkMordal, setClickedOkMordal }) {
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

	// friendListの更新
	useEffect(() => {
		if (friendList) {
			setListData(friendList.map((_, i) => ({ ..._, key: `${i}` })))
		}
	}, [friendList])

	// groupListの更新
	useEffect(() => {
		if (groupList) {
			setListData(groupList.map((_, i) => ({ ..._, key: `${i}` })))
		}
	}, [groupList])


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
					onPress={() => {
						navigation.navigate('Chat', { "groupChatRoomId": data.item.group_chat_room_id, "directChatRoomId": null, "profileImage": data.item.group_image, "name": data.item.group_name, "groupMemberUserId": data.item.group_member_user_id })
					}}
					style={styles.rowFrontStyle}
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
					onPress={() => {
						navigation.navigate('Chat', { "groupChatRoomId": null, "directChatRoomId": data.item.direct_chat_room_id, "profileImage": data.item.friend_profile_image, "name": data.item.friend_nickname })
					}}
					style={styles.rowFrontStyle}
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
		<View style={styles.rowBackStyle}>
			{/* deleteボタン */}
			<TouchableOpacity
				style={[styles.backRightBtnStyle, styles.backRightBtnRightStyle]}
				onPress={() => {
					// 確認モーダルを表示
					setModalVisible(true)
					// 削除時のモーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
					setRowMap(rowMap)
					setkey(data.item.key)
					setGroupChatRoomId(data.item.group_chat_room_id)
				}}
			>
				<Text style={styles.backTextWhiteStyle}>Leave</Text>
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
			_leaveGroup(userId, groupChatRoomId)
			// 初期化
			setRowMap('')
			setkey('')
			setClickedOkMordal(false)
			setGroupChatRoomId('')
		}
	}, [clickedCancelMordal, clickedOkMordal])

	// グループから脱退
	async function _leaveGroup(userId, groupChatRoomId) {
		try {
			// APIリクエスト
			const bodyData = {
				"groupChatRoomId": groupChatRoomId
			}
			const response = await fetch(`https://a-chat/api/users/${userId}/groups`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<View style={styles.containerStyle}>
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
	containerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
	},
	backTextWhiteStyle: {
		color: MAIN_WHITE_COLOR,
	},
	rowFrontStyle: {
		alignItems: 'center',
		backgroundColor: MAIN_WHITE_COLOR,
		justifyContent: 'center',
		height: 50,
	},
	rowBackStyle: {
		alignItems: 'center',
		backgroundColor: MAIN_WHITE_COLOR,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtnStyle: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
	},
	backRightBtnRightStyle: {
		backgroundColor: MAIN_PINK_COLOR,
		right: 0,
	},
	profileImageStyle: {
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS
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
		fontFamily: STANDARD_FONT,
		marginLeft: 12,
	}
});
