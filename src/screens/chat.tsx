// libs
import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, StyleSheet, Image, Text } from 'react-native';
import { GiftedChat, Send, Bubble, InputToolbar, MessageText, LoadEarlier, Day, Time, Actions } from 'react-native-gifted-chat'
import uuid from 'react-native-uuid';
import { temporaryMessages, addMessages } from "../components/chat/messages"
import _ from 'lodash';
import moment from "moment"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import ImageModal from 'react-native-image-modal';

// components
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle"

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// layouts
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, FOOTER_HEIGHT, CONTENT_WIDTH, SEARCH_FORM_BORDER_RADIUS, SEND_BUTTON_HEIGHT, STANDARD_FONT, MAIN_YELLOW_COLOR } from '../constants/layout'

export function Chat({ navigation, route }) {
	// 引数を取得
	const { groupChatRoomId, directChatRoomId, profileImage, name } = route.params

	const [loadEarlier, setLoadEarlier] = useState(false)
	const [initialApiCount, setInitialApiCount] = useState(true)

	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// メッセージ
	const [messages, setMessages] = useState([]);

	// 画像
	const [image, setImage] = useState('')

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
	const _onSendMessage = useCallback((messages = [], image) => {
		// 画像しかない場合
		if (image && messages.length === 0) {
			messages = [
				{
					"_id": uuid.v4(),
					"createdAt": new Date(),
					"text": "",
					"user": {
						"_id": userId,
					},
				},
			]
			messages[0]["image"] = image
		}
		// 画像とテスト両方ある場合
		if (image && messages.length !== 0) {
			messages[0]["image"] = image
		}
		setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
		setImage('')
		// メッセージ更新API実行
	}, [])

	// カスタム送信ボタンのスタイル変更
	const _renderSend = (props) => {
		// カスタム送信ボタン
		return (
			<Send {...props}
				containerStyle={styles.sendContainer}
			>
				<Image source={require("../../assets/images/send-button.png")} style={styles.sendButtonStyle} />
			</Send>
		);
	}
	// 送信メッセージのスタイル変更
	const _renderBubble = (props) => {
		const ownUserId: boolean = props.currentMessage.user._id === userId
		return (
			<View>
				<View
					style={styles.readWrapperStyle}
				>
					{ownUserId && (
						<View style={[styles.readRightContainerStyle, styles.readRightContainerStyle]}>
							<Text style={styles.readStyle}>{props.currentMessage.received ? "Read" : "Unread"}</Text>
							<Text style={styles.readStyle}>{moment(props.currentMessage.createdAt).format("HH:mm")}</Text>
						</View>
					)}
					{ownUserId && (
						<Bubble
							{...props}
							wrapperStyle={{
								right: {
									backgroundColor: MAIN_NAVY_COLOR,
									color: MAIN_WHITE_COLOR,
									width: 200,
									borderBottomRightRadius: 0,
									minHeight: 50,
									justifyContent: "center",
								},
							}}
						/>
					)}
					{!ownUserId && (
						<Bubble
							{...props}
							wrapperStyle={{
								left: {
									color: MAIN_WHITE_COLOR,
									width: 200,
									borderBottomLeftRadius: 0,
									borderTopLeftRadius: 15,
									minHeight: 50,
									justifyContent: "center",

								}
							}}
						/>
					)}
					{!ownUserId && (
						<View style={styles.readLeftContainerStyle}>
							<Text style={styles.readStyle}>{moment(props.currentMessage.createdAt).format("HH:mm")}</Text>
						</View>
					)}
				</View>
			</View>
		)
	}

	// メッセージのスタイル変更
	const _changeMessageStyle = (props) => {
		return (
			<MessageText
				{...props}
				textStyle={{
					left: {
						"fontFamily": STANDARD_FONT
					},
					right: {
						"fontFamily": STANDARD_FONT
					},
				}}
			/>
		)
	}

	// 日時部分のスタイル変更
	const _renderDay = (props) => {
		return (
			<Day {...props}
				textStyle={{
					"fontFamily": STANDARD_FONT,
					color: MAIN_NAVY_COLOR
				}}
				containerStyle={{
					justifyContent: "center",
					alignItems: "center",
				}}
				wrapperStyle={{
					backgroundColor: MAIN_YELLOW_COLOR,
					justifyContent: "center",
					alignItems: "center",
					width: 80,
					height: 20,
					borderRadius: 5
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
					minHeight: FOOTER_HEIGHT,
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

	// メッセージ内に時間を表示しない
	const _renderTime = (props) => {
		return (
			<Time
				{...props}
				containerStyle={{
					left: {
						display: "none"
					},
					right: {
						display: "none"
					}
				}}
			/>
		)
	}

	// 以前のメッセージを取得する
	const _onEndReached = () => {
		// setTimeoutは時間切れになると関数を実行する(ミリ秒で指定)
		// テスト段階では、1回だけAPIを取得したいため、initialApiCountを使って1回だけAPIを実行するよう調整。
		// APIが完成したら、initialApiCountのif文とsetInitialApiCountは削除する
		// 追加のメッセージがある場合のみ、API実行中のローディングを表示
		if (addMessages.length !== 0 && initialApiCount) {
			setLoadEarlier(true)
		}
		if (initialApiCount) {
			setTimeout(() => {
				const newData = [...messages, ...addMessages];
				setMessages(newData)
				setLoadEarlier(false)
				setInitialApiCount(false)
			}, 2000)
		}
	}

	// 「以前のメッセージを読み込む」ボタンのスタイル変更
	const _renderLoadEarlier = (props) => {
		return (
			<LoadEarlier
				{...props}
				wrapperStyle={{
					backgroundColor: MAIN_NAVY_COLOR,
				}}
			/>
		)
	}


	// フッターに画像送信ボタン追加
	const _renderActions = (props) => {
		return (
			<Actions {...props}
				containerStyle={{ width: 24, height: 24, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 10, marginBottom: 0 }}
				icon={() => <FontAwesome name='image' color={MAIN_WHITE_COLOR} size={24} margin={0} />}
			/>
		)
	}

	// イメージピッカー
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result: any = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});
		if (!result.cancelled) {
			setImage(result.uri);
			// イメージを送信
			_onSendMessage([], result.uri)
		}
	};

	// 画像送信ボタンを押したときに送信したい処理
	const _onPressActionButton = () => {
		pickImage()
	}

	// メッセージに画像を表示
	const _renderMessageImage = (props) => {
		return (
			<View
				style={{
				}}
			>
				<ImageModal
					resizeMode="contain"
					style={{
						width: 200,
						height: 200,
						padding: 6,
						borderRadius: 15,
						// 自分が送った画像の場合は、右下のborderRadiusを15に設定
						borderBottomLeftRadius: props.currentMessage.user._id === userId ? 15 : 0,
						resizeMode: "cover",
					}}
					source={{ uri: props.currentMessage.image }}
				/>
			</View>
		);
	};


	useEffect(() => {
		_fetchProfileImageAndName()
	}, [])

	useEffect(() => {
		// 仮のメッセージ取得
		setMessages(temporaryMessages)
	}, [])


	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"Chats"}>
					<MainTitle navigation={navigation} title={null} link={"Chats"} props={{ "profileImage": profileImage, "name": name }} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={constantsCommonStyles.mainContainerStyle}>
					<GiftedChat
						messages={messages}
						onSend={messages => _onSendMessage(messages, image)}
						user={{
							_id: userId,
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
						// メッセージのスタイル変更
						renderMessageText={(props) => _changeMessageStyle(props)}
						// メッセージコンテナの上部に到達すると無限スクロールアップし、onLoadEarlier関数があれば自動的に呼び出される。loadEarlierプロパティも追加する必要あり
						infiniteScroll={true}
						// infiniteScrollに必要な"load earlier messages"ボタンを有効にする
						loadEarlier={loadEarlier}
						// 以前のメッセージの読み込み時にActivityIndicator(進行状況)を表示する
						isLoadingEarlier={true}
						// 「以前のメッセージを読み込む」ボタンのカスタム
						renderLoadEarlier={(props) => _renderLoadEarlier(props)}
						// メッセージ<ListView>に渡される追加のprops。いくつかのpropsはオーバーライドできない。
						// onEndReachedThresholdで指定した距離までスクロールされたら、onEndReachedに指定された関数が一度だけ実行される
						// onEndReached内に任意の処理を記述し、以前のメッセージを取得する
						listViewProps={{
							onEndReached: _onEndReached,
							onEndReachedThreshold: 0.4,
						}}
						// 日時部分のスタイル変更
						renderDay={(props) => _renderDay(props)}
						// メッセージ内に時間を表示しない
						renderTime={(props) => _renderTime(props)}
						renderActions={(props) => _renderActions(props)}
						onPressActionButton={() => _onPressActionButton()}
						// メッセージに画像を表示
						renderMessageImage={(props) => _renderMessageImage(props)}
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
		minHeight: SEND_BUTTON_HEIGHT, // sendボタンの高さ
		paddingTop: 14, // sendボタンの高さ 44 - input文字サイズ 16 / 2 = 14
		paddingBottom: 14,
		borderRadius: SEARCH_FORM_BORDER_RADIUS,
	},
	readWrapperStyle: {
		flexDirection: "row",
		width: 250,
		marginBottom: 5,
	},
	readLeftContainerStyle: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		marginRight: -5
	},
	readRightContainerStyle: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		marginLeft: -5
	},
	readStyle: {
		width: 50,
		"fontFamily": STANDARD_FONT,
		color: MAIN_NAVY_COLOR,
	},
	addImageStyle: {
		width: 40,
		height: 40,
	},
});
