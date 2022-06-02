// libs
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { API_SERVER_URL } from "../../constants/api"
import { storage } from '../../../storage'

// layouts
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, ADD_BUTTON_SIZE, CONTENT_WIDTH, BUTTON_BORDER_RADIUS, MAIN_BLACK_COLOR, SMALL_BUTTON_WIDTH, MAIN_GRAY_COLOR } from '../../constants/layout'

export function SmallButton({ text, navigation, friendList, groupSetting, type, friendListNames, alreadyFriend, addGroupMemberGroupChatRoomId, addGroupMemberGroupImage, addGroupMemberGroupName, backGroupName, backGroupImage }) {
	// ユーザーID(今後は認証から取得するようにする)
	const [userId, setUserId] = useState(null)
	// 自分を含めたグループメンバーのuserId
	const [groupMemberUserIds, setGroupMemberUserIds] = useState([])

	const [groupChatRoomId, setGroupChatRoomId] = useState('')

	// グループに追加したメンバーの名前の配列
	const [addGroupMemberName, setAddGroupMemberName] = useState([])

	// 友達追加したユーザーの情報
	const [friendInfo, setFriendInfo] = useState(null)

	// グループ追加
	async function _addGroup() {
		try {
			// APIリクエスト
			const bodyData = {
				"groupImage": groupSetting.image,
				"groupName": groupSetting.groupName || friendListNames,
				"groupMemberUserIds": groupMemberUserIds,
			}
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/groups/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// グループチャットルームIDを取得
			const groupChatRoomId = parse_response.group_chat_room_id
			setGroupChatRoomId(groupChatRoomId)
		} catch (e) {
			console.error(e)
		}
	}

	// 友達追加
	async function _addFriend() {
		try {
			// APIリクエスト
			const bodyData = {
				"friendUserId": friendList.friend_use_id,
				"ownUserId": userId,
			}
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/friends`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			setFriendInfo(parse_response)
			// 友達チャットに遷移
		} catch (e) {
			console.error(e)
		}
	}

	// グループメンバーの追加
	async function _addGroupMember() {
		try {
			// ユーザーID一覧
			let newDataUserIds = []
			let newDataUserNames = []
			for (let i = 0; i < friendList.length; i++) {
				newDataUserIds.push(friendList[i].friend_use_id)
				newDataUserNames.push(friendList[i].friend_nickname)
			}
			// グループに追加したメンバーの名前の配列を更新
			setAddGroupMemberName(newDataUserNames)
			// APIリクエスト
			const bodyData = {
				"groupChatRoomId": addGroupMemberGroupChatRoomId,
				"adduserIds": newDataUserIds
			}
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/group-member`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// 新規に追加したユーザーIDのリスト
			const adduserIds = parse_response.adduserIds
		} catch (e) {
			console.error(e)
		}
	}

	// friendListからuserIdだけ取り出し、自分のuserIdも追加
	useEffect(() => {
		if (friendList && type === "addGroupSetting") {
			let groupMemberUserIds = []
			for (let i = 0; i < friendList.length; i++) {
				groupMemberUserIds.push(friendList[i].friend_use_id)
			}
			groupMemberUserIds.push(userId)
			setGroupMemberUserIds(groupMemberUserIds)
		}
	}, [friendList])

	// グループメンバーに追加されたら、チャット画面に遷移
	useEffect(() => {
		if (addGroupMemberName.length !== 0) {
			navigation.navigate('Chat', { "groupChatRoomId": addGroupMemberGroupChatRoomId, "directChatRoomId": null, "profileImage": addGroupMemberGroupImage, "name": addGroupMemberGroupName, "addGroupMemberName": addGroupMemberName })
		}
	}, [addGroupMemberName])

	// 友達追加されたら、チャット画面に遷移
	useEffect(() => {
		if (friendInfo) {
			navigation.navigate('Chat', { "groupChatRoomId": null, "directChatRoomId": friendInfo.direct_chat_room_id, "profileImage": friendInfo.friend_profile_image, "name": friendInfo.friend_nickname })
		}
	}, [friendInfo])

	// ユーザーIDの取得
	useEffect(() => {
		storage.load({
			key: "key"
		}).then((data) => {
			setUserId(data.userId)
		})
	}, [])

	return (
		<View style={styles.boxStyle}>
			<View style={styles.wrapperStyle}>
				<View style={type === "addFriend" ? styles.addFriendContainerStyle : styles.containerStyle}>
					<TouchableOpacity
						style={alreadyFriend ? [styles.buttonStyle, styles.buttonGrayStyle] : styles.buttonStyle}
						onPress={() => {
							// グループ追加画面からグループ設定画面への遷移
							if (type === "addGroup") {
								navigation.navigate('AddGroupSetting', { friendList: friendList, backGroupName: backGroupName, backGroupImage: backGroupImage })
							}
							if (type === "addGroupSetting") {
								// グループ追加API実行
								_addGroup().then(() => {
									// グループ設定画面からグループチャットに遷移
									// 本番では、"group 6"部分を修正。現在は仮で実装している。
									navigation.navigate('Chat', { "groupChatRoomId": "group 6", "directChatRoomId": null, "profileImage": groupSetting.image, "name": groupSetting.groupName || friendListNames })
								})
							}
							if (type === "addFriend" && !alreadyFriend) {
								// 友達追加API実行
								// 友だち追加画面から友達とのチャットに遷移
								_addFriend()
							}
							if (type === "addGroupMember") {
								// グループメンバーの追加
								_addGroupMember()
							}
						}}
					>
						<Text style={styles.textStyle}>{text}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	boxStyle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: MAIN_WHITE_COLOR,
	},
	wrapperStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		width: CONTENT_WIDTH,
	},
	containerStyle: {
		height: ADD_BUTTON_SIZE,
		alignItems: "flex-end",
	},
	addFriendContainerStyle: {
		height: ADD_BUTTON_SIZE,
		alignItems: "center"
	},
	buttonStyle: {
		alignItems: "center",
		justifyContent: "center",
		width: SMALL_BUTTON_WIDTH,
		height: 50,
		borderRadius: BUTTON_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
		textAlign: "center",
		shadowColor: MAIN_BLACK_COLOR,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 1,
	},
	buttonGrayStyle: {
		backgroundColor: MAIN_GRAY_COLOR,
	},
	textStyle: {
		color: MAIN_WHITE_COLOR,
	}
});

