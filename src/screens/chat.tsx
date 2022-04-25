// libs
import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat'
import uuid from 'react-native-uuid';

// components
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle"

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// layouts
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, FOOTER_HEIGHT, CONTENT_WIDTH, SEARCH_FORM_BORDER_RADIUS, SEND_BUTTON_HEIGHT } from '../constants/layout'

export function Chat({ navigation, route }) {
	// 引数を取得
	const { groupChatRoomId, directChatRoomId, profileImage, name } = route.params

	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// メッセージ
	const [messages, setMessages] = useState([]);

	// 画像と名前を取得
	async function _fetchProfileImageAndName() {
		try {
			// paramsを生成
			const params = { "groupChatRoomId": groupChatRoomId, "directChatRoomId": directChatRoomId }
			const query_params = new URLSearchParams(params);
			// APIリクエスト
			const response = await fetch(`https://a-chat/api/users/${userId}/chats?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// ステータスコードを取得
			const parse_response_code = await response.status
			// レスポンスをJSONにする
			const parse_response = await response.json()

			// // 成功した場合
			// if (parse_response_code === 200) {
			// 	setAlreadyFriend(false)
			// 	setExistUserId(true)
			// }
			// // 既に友達になっている場合
			// if (parse_response_code === 400 && parse_response.already_follow_requested) {
			// 	setAlreadyFriend(true)
			// 	setExistUserId(true)
			// }
			// // 該当のユーザーIDが存在しない場合
			// if (parse_response_code === 400 && !parse_response.exist) {
			// 	setAlreadyFriend(false)
			// 	setExistUserId(false)
			// }
			// // 友達一覧のstateを更新
			// setFriendInfo(parse_response)
		} catch (e) {
			console.error(e)
		}
	}

	// メッセージを送信
	const _onSendMessage = useCallback((messages = []) => {
		setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
		// メッセージ更新API実行
	}, [])

	// カスタム送信ボタンのスタイル変更
	const _renderSend = (props) => {
		// カスタム送信ボタン
		return (
			<Send {...props} containerStyle={styles.sendContainer}>
				<Image source={require("../../assets/images/send-button.png")} style={styles.sendButtonStyle} />
			</Send>
		);
	}

	// 送信メッセージのスタイル変更
	const _renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: MAIN_NAVY_COLOR,
						color: MAIN_WHITE_COLOR,
						width: 200,
						borderBottomRightRadius: 0,
					},
					left: {
						color: MAIN_WHITE_COLOR,
						width: 200,
						borderBottomLeftRadius: 0
					}
				}}
			/>
		)
	}

	// 画面下のフッター部分
	const _messengerBarContainer = (props) => {
		return (
			<InputToolbar
				{...props}
				containerStyle={{
					backgroundColor: MAIN_NAVY_COLOR,
					alignContent: "center",
					justifyContent: "center",
					height: FOOTER_HEIGHT,
				}}
				primaryStyle={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					color: MAIN_WHITE_COLOR,
				}}
			/>
		)
	}

	useEffect(() => {
		_fetchProfileImageAndName()
	}, [])

	useEffect(() => {
		setMessages([
			{
				_id: uuid.v4(),
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
		])
	}, [])

	// 検索フォームのラベル化
	let textInputSearch;

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"Chats"}>
					<MainTitle navigation={navigation} title={null} link={"Home"} props={{ "profileImage": profileImage, "name": name }} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={constantsCommonStyles.mainContainerStyle}>
					<GiftedChat
						messages={messages}
						onSend={messages => _onSendMessage(messages)}
						user={{
							_id: 1,
						}}
						// 画面下のフッター部分
						renderInputToolbar={(props) => _messengerBarContainer(props)}
						// Sendボタンを常に表示するか
						alwaysShowSend={true}
						// カスタム送信ボタンのスタイル変更
						renderSend={(props) => _renderSend(props)}
						// 送信メッセージのスタイル変更
						renderBubble={(props) => _renderBubble(props)}
						// 画面下のTextInputのスタイル変更
						textInputProps={styles.textInputStyle}
						// フッターの高さ
						minInputToolbarHeight={FOOTER_HEIGHT}
					/>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	sendContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	sendButtonStyle: {
		width: SEND_BUTTON_HEIGHT,
		height: SEND_BUTTON_HEIGHT
	},
	textInputStyle: {
		"backgroundColor": MAIN_WHITE_COLOR,
		"width": CONTENT_WIDTH - 44, // Sendアイコン分引く
		marginRight: 10,
		height: SEND_BUTTON_HEIGHT, // sendボタンの高さ
		paddingTop: 14, // sendボタンの高さ 44 - input文字サイズ 16 / 2 = 14
		paddingBottom: 14,
		borderRadius: SEARCH_FORM_BORDER_RADIUS,
	}
});