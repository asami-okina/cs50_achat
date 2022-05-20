
// libs
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { API_SERVER_URL } from "../../constants/api"
import { storage } from '../../../storage';

// layouts
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, BUTTON_HEIGHT, CONTENT_WIDTH, STANDARD_FONT, BUTTON_TEXT_SIZE, MAIN_GRAY_COLOR, BUTTON_BORDER_RADIUS } from '../../constants/layout'

export function Button({
	navigation,
	link,
	buttonText,
	enable,
	scene,
	propsList
}) {
	// ユーザーID(今後は認証から取得するようにする)
	const [userId, setUserId] = useState(null)
	// 友達追加したユーザーの情報
	const [friendInfo, setFriendInfo] = useState(null)

	// 友達追加
	async function _addFriend() {
		try {
			// APIリクエスト
			const bodyData = {
				"friendUserId": propsList.friendUserId,
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

		// 会員登録
		async function _signUp() {
			try {
				// paramsを生成
				const params = { "mail": propsList?.email, "password": propsList?.password, "userId": propsList?.userId, "type": "signUp" }
				const query_params = new URLSearchParams(params);
	
				// APIリクエスト
				const response = await fetch(API_SERVER_URL + `/api/signup?${query_params}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
				})
	
				// レスポンスをJSONにする
				const parse_response = await response.json()
				const response_user_id = parse_response.userId
				// ローカルストレージにユーザーIDを保存
				await storage.save({
					key: "key",
					data: {
						userId: response_user_id,
					},
				});
			} catch (e) {
				console.error(e)
			}
		}


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
		<>
			{
				// ログイン画面の場合
				scene === 'LogIn' ? (
					<TouchableOpacity
						style={propsList.emailText.length !== 0 && propsList.passwordText.length !== 0 ? propsList.executedLoginAuthentication ? propsList.onFocusInputMailOrPasseword ? styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle] : styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
						onPress={() => {
							if (propsList.emailText.length !== 0 && propsList.passwordText.length !== 0) {
								propsList.onPressFunction()
							}
						}}>
						<Text style={styles.buttonTextStyle}>Log In</Text>
					</TouchableOpacity>
				) : (
					// ログイン以外の画面の場合(scene === 'Welcome' || scene === 'SignUp')等
					<TouchableOpacity
						style={enable ? styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
						onPress={() => {
							// プロフィール設定画面にてニックネームの更新
							if (enable && scene === "ProfileSettingNickName" && propsList.nickName.length !== 0 && link) {
								propsList._updateNickName()
								navigation.navigate(link)
							}
							// グループチャット画面で既に友達であるユーザーアイコンをクリックした場合、チャット画面２千位
							if (enable && scene === "alreadyFriendModal") {
								navigation.navigate('Chat', { "groupChatRoomId": null, "directChatRoomId": propsList.directChatRoomId, "profileImage": propsList.friendImage, "name": propsList.friendNickName, "groupMemberUserId": null })
							}
							// グループチャット画面で友達ではないユーザーアイコンをクリックした場合、友だち追加する
							if (enable && scene === "notFriendModal") {
								// 友達追加
								_addFriend()
							}
							if (enable && link && scene !== "ProfileSettingNickName") {
								// サインアップ
								_signUp().then(() => {
									navigation.navigate(link)
								})
							}
						}}
					>
						<Text style={styles.buttonTextStyle}>{buttonText}</Text>
					</TouchableOpacity>
				)
			}
		</>
	);
}

const styles = StyleSheet.create({
	buttonContainerStyle: {
		alignItems: "center",
		justifyContent: "center",
		width: CONTENT_WIDTH,
		height: BUTTON_HEIGHT,
		borderRadius: BUTTON_BORDER_RADIUS,
		fontSize: BUTTON_TEXT_SIZE,
		backgroundColor: MAIN_NAVY_COLOR
	},
	buttonTextStyle: {
		color: MAIN_WHITE_COLOR,
		fontFamily: STANDARD_FONT,
	},
	buttonContainerInvalidStyle: {
		backgroundColor: MAIN_GRAY_COLOR,
	},
});

