// libs
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

// layouts
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, ADD_BUTTON_SIZE, CONTENT_WIDTH, BUTTON_BORDER_RADIUS, MAIN_BLACK_COLOR, SMALL_BUTTON_WIDTH } from '../../constants/layout'

export function SmallButton({ text, navigation, friendList, groupSetting, type, friendListNames }) {
	// console.log('groupName', groupSetting.groupName)
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"
	// 自分を含めたグループメンバーのuserId
	const [groupMemberUserIds, setGroupMemberUserIds] = useState([])

	// グループ追加
	async function _addGroup() {
		try {
			// グループ名が設定されていなかったら、デフォルトの名前を代入
			if (!groupSetting.groupName) {
				groupSetting.groupName = friendListNames
			}
			// APIリクエスト
			const bodyData = {
				"groupImage": groupSetting.image,
				"groupName": groupSetting.groupName,
				"groupMemberUserIds": groupMemberUserIds,
			}
			const response = await fetch(`https://a-chat/api/users/${userId}/groups`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
			// グループ設定画面からグループチャットに遷移

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

	return (
		<View style={styles.boxStyle}>
			<View style={styles.wrapperStyle}>
				<View style={styles.containerStyle}>
					<TouchableOpacity
						style={styles.buttonStyle}
						onPress={() => {
							// グループ追加画面からグループ設定画面への遷移
							if (type === "addGroup") {
								navigation.navigate('AddGroupSetting', { friendList: friendList })
							}
							if (type === "addGroupSetting") {
								// グループ追加API実行
								_addGroup()
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
	textStyle: {
		color: MAIN_WHITE_COLOR,
	}
});

