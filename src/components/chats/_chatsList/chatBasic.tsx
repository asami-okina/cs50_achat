// libs
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { API_SERVER_URL } from "../../../constants/api"
import { storage } from '../../../../storage'

// components
import { ListItem } from "./_chatBasic/listItem"
import { HiddenListItem } from "./_chatBasic/hiddenListItem"

// layouts
import { MAIN_WHITE_COLOR } from '../../../constants/layout'

export default function ChatBasic({ navigation, chatRoomList, setDeleteModalVisible, clickedDeleteCancelMordal, setClickedDeleteCancelMordal, clickedDeleteOkMordal, setClickedDeleteOkMordal, setHiddenModalVisible, clickedHiddenCancelMordal, setClickedHiddenCancelMordal, clickedHiddenOkMordal, setClickedHiddenOkMordal, setGroupChatRoomId, setDirectChatRoomId, groupChatRoomId, directChatRoomId }) {
	// ユーザーID(今後は認証から取得するようにする)
	const [userId, setUserId] = useState(null)

	// 削除時の確認モーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
	const [rowMap, setRowMap] = useState('')
	const [key, setkey] = useState('')

	// HiddenかDeleteどちらをクリックされたか
	const [clickedType, setClickedType] = useState('')

	// 一覧のリストを作成
	const [listData, setListData] = useState(
		chatRoomList.map((_, i) => ({ ..._, key: `${i}` }))
	);

	// chatRoomListの更新
	useEffect(() => {
		if (chatRoomList) {
			setListData(chatRoomList.map((_, i) => ({ ..._, key: `${i}` })))
		}
	}, [chatRoomList])


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
			{/* 友達の場合 */}
			{data.item.friends_user_id && (
				<ListItem navigation={navigation} profileImage={data.item.friends_profile_image} name={data.item.friends_nick_name} lastMessageCreationDate={data.item.friends_last_message_creation_date} lastMessageContent={data.item.friends_last_message_content} unreadCount={data.item.unread_count} groupChatRoomId={null} directChatRoomId={data.item.direct_chat_room_id} groupMemberUserId={null} />
			)}
			{/* グループの場合 */}
			{data.item.group_chat_room_id && (
				<ListItem navigation={navigation} profileImage={data.item.group_image} name={data.item.group_name} lastMessageCreationDate={data.item.group_last_message_creation_date} lastMessageContent={data.item.group_last_message_content} unreadCount={data.item.unread_count} groupChatRoomId={data.item.group_chat_room_id} directChatRoomId={null} groupMemberUserId={data.item.group_member_user_id} />
			)}
		</>
	);

	// スワップできるようにする
	const renderHiddenItem = (data, rowMap) => (
		<	HiddenListItem setDeleteModalVisible={setDeleteModalVisible} setHiddenModalVisible={setHiddenModalVisible} setRowMap={setRowMap} setkey={setkey} setGroupChatRoomId={setGroupChatRoomId} setDirectChatRoomId={setDirectChatRoomId} setClickedType={setClickedType} rowMap={rowMap} data={data} />
	);

	// チャットの表示/非表示、削除API
	async function _updateChatRoomHiddenOrDeleteByUserId() {
		try {
			// APIリクエスト
			const bodyData = {
				"userId": userId,
				"directChatRoomId": directChatRoomId,
				"groupChatRoomId": groupChatRoomId,
				"type": clickedType
			}
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/chatRoom`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
		} catch (e) {
			console.error(e)
		}
	}

	// 削除時の確認モーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
	useEffect(() => {
		// Cancelを押された場合
		if (clickedDeleteCancelMordal || clickedHiddenCancelMordal) {
			// スワイプされた行をデフォルト状態に戻す
			rowMap[key].closeRow();
			// 初期化
			setRowMap('')
			setkey('')
			setClickedDeleteCancelMordal(false)
			setClickedHiddenCancelMordal(false)
			setGroupChatRoomId('')
			setDirectChatRoomId('')
		}
		if (clickedDeleteOkMordal || clickedHiddenOkMordal) {
			// スワイプされた行を削除
			if (clickedType === "Delete") {
				deleteRow(rowMap, key)
				setClickedDeleteOkMordal(false)
				// チャットの削除API実行
				_updateChatRoomHiddenOrDeleteByUserId()
			}
			if (clickedType === "Hidden") {
				deleteRow(rowMap, key)
				setClickedHiddenOkMordal(false)
				// チャットの非表示API実行
				_updateChatRoomHiddenOrDeleteByUserId()
			}
			// 初期化
			setRowMap('')
			setkey('')
			setGroupChatRoomId('')
			setDirectChatRoomId('')
			setClickedType('')
		}
	}, [clickedDeleteCancelMordal, clickedDeleteOkMordal, clickedHiddenCancelMordal, clickedHiddenOkMordal])

	// ユーザーIDの取得
	useEffect(() => {
		storage.load({
			key: "key"
		}).then((data) => {
			setUserId(data.userId)
		})
	}, [])

	return (
		<View style={styles.containerStyle}>
			<SwipeListView
				data={listData}
				renderItem={renderItem}
				renderHiddenItem={renderHiddenItem}
				rightOpenValue={-150}
				disableRightSwipe={true}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
	},
});
