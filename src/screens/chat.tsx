// libs
import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, StyleSheet, Image, Text, Pressable } from 'react-native';
import { GiftedChat, Send, Bubble, InputToolbar, MessageText, LoadEarlier, Day, Time, Actions } from 'react-native-gifted-chat'
import { addMessages } from "../components/chat/messages"
import _ from 'lodash';
import moment from "moment"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import ImageModal from 'react-native-image-modal';
import { useIsMounted } from "../hooks/useIsMounted"
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { API_SERVER_URL } from "../constants/api"
import { storage } from '../../storage'
import { sock } from "../../websocket"
import { StackScreenProps } from '@react-navigation/stack';

// components
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle"

// sameStyles
import { sameStyles } from '../constants/styles/sameStyles'

// layouts
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, FOOTER_HEIGHT, CONTENT_WIDTH, SEARCH_FORM_BORDER_RADIUS, SEND_BUTTON_HEIGHT, STANDARD_FONT, MAIN_YELLOW_COLOR, IPHONE_X_BOTTOM_SPACE, OPERATION_SCREEN_HEIGHT_IPHONE_X } from '../constants/layout'

// type
type ChatRoomIdType = "DirectChatRoomId" | "GroupChatRoomId";

type MainProps = StackScreenProps<RootStackParamListType, 'Chat'>;

export function Chat({ navigation, route }: MainProps) {
	// 引数を取得
	// addGroupMemberName: 今後、○○がグループに参加しました。というメッセージに使用する
	const { groupChatRoomId, directChatRoomId, profileImage, name, groupMemberUserId, addGroupMemberName } = route.params
	const [loadEarlier, setLoadEarlier] = useState<boolean>(false)
	const [initialApiCount, setInitialApiCount] = useState<boolean>(true)

	// ユーザーID(今後は認証から取得するようにする)
	const [userId, setUserId] = useState<string>(null)

	// メッセージ
	const [messages, setMessages] = useState<MessageType[] | []>([]);

	// 画像
	const [image, setImage] = useState<string>('')

	// マウント判定
	const isMounted = useIsMounted()
	const [sendUserIds, setSendUserIds] = useState<string[]>(null)

	// メッセージを送信した場合に実行
	useEffect(() => {
		const handler = e => {
			console.log("サーバーからメッセージを受信したときに呼び出されるイベント");
			const newMessage = JSON.parse(e.data)
			if (isMounted.current) {
				// ユーザーが開いているチャットルームに一致する場合のみメッセージを表示する
				const messageDirectChatRoomId = newMessage[0].directChatRoomId
				const messageGroupChatRoomId = newMessage[0].groupChatRoomId
				if ((directChatRoomId !== null && directChatRoomId === messageDirectChatRoomId) || (groupChatRoomId !== null && groupChatRoomId === messageGroupChatRoomId)) {
					setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
				}
			}
		}
		// 第2引数に関数を指定することで、任意のイベントが発生した時に関数内に書かれた処理を実行する
		sock.addEventListener("message", handler)

		return () => {
			sock.removeEventListener("message", handler)
		}
	}, [directChatRoomId, groupChatRoomId])


	// チャットルームIDに紐づくチャット履歴の取得
	async function _fetchMessageByChatRoomId() {
		try {
			// paramsを生成
			let params;
			if (directChatRoomId) {
				params = { "chat_room_type": "DirectChatRoomId", "chat_room_id": Number(directChatRoomId) }
			}
			if (groupChatRoomId) {
				params = { "chat_room_type": "GroupChatRoomId", "chat_room_id": Number(groupChatRoomId) }
			}
			const query_params = new URLSearchParams(params);
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/message?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			if (parse_response.messages.length !== 0) {
				setMessages(parse_response.messages)
			} else {
				setMessages([])
			}
		} catch (e) {
			console.error(e)
		}
	}

	// directChatRoomId/groupChatRoomIdに紐づくメンバーのユーザーIDを取得
	async function _fetchUserIdsByDirectOrGroupChatRoomId() {
		try {
			// paramsを生成
			let params;
			if (directChatRoomId) {
				params = { "chat_room_type": "DirectChatRoomId", "chat_room_id": Number(directChatRoomId) }
			}
			if (groupChatRoomId) {
				params = { "chat_room_type": "GroupChatRoomId", "chat_room_id": Number(groupChatRoomId) }
			}
			const query_params = new URLSearchParams(params);
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/chat?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			setSendUserIds(parse_response.user_ids)
		} catch (e) {
			console.error(e)
		}
	}

	// メッセージ送信
	async function _postMessage(messages: MessageType[]) {
		try {
			// APIリクエスト
			let bodyData = {}
			let chat_room_type: ChatRoomIdType;
			let chat_room_id;

			if (directChatRoomId) {
				chat_room_type = "DirectChatRoomId"
				chat_room_id = Number(directChatRoomId)
			} else {
				chat_room_type = "GroupChatRoomId"
				chat_room_id = Number(groupChatRoomId)
			}

			// テキストと画像両方ある場合は、2回メッセージを送信する
			if (messages[0]["text"] && messages[0]["image"]) {
				// 1回目の送信(テキストのみ)
				bodyData = {
					"chat_room_type": chat_room_type, // Rustでenumのためキャメルケース
					"chat_room_id": chat_room_id,
					"content": messages[0]["text"],
					"content_type": "Text",
					"sender_user_id": messages[0]["user_id"],
					"created_at": messages[0]["createdAt"],
				}
				let response = await fetch(API_SERVER_URL + `/api/users/${userId}/message`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(bodyData),
				})
				// 2回目の送信(画像のみ)
				bodyData = {
					"chat_room_type": chat_room_type, // Rustでenumのためキャメルケース
					"chat_room_id": chat_room_id,
					"content": messages[0]["image"],
					"content_type": "Image",
					"sender_user_id": messages[0]["user_id"],
					"created_at": messages[0]["createdAt"],
				}
				response = await fetch(API_SERVER_URL + `/api/users/${userId}/message`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(bodyData),
				})
			} else {
				// テキスト、画像どちらか1つのみの場合
				bodyData = {
					"chat_room_type": chat_room_type, // Rustでenumのためキャメルケース
					"chat_room_id": chat_room_id,
					"content": messages[0]["text"] ? messages[0]["text"] : messages[0]["image"],
					"content_type": messages[0]["text"] ? "Text" : "Image",
					"sender_user_id": messages[0]["user_id"],
					"created_at": messages[0]["createdAt"],
				}
				const response = await fetch(API_SERVER_URL + `/api/users/${userId}/message`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(bodyData),
				})
			}
		} catch (e) {
			console.error(e)
		}
	}

	// 最終既読日時の更新
	async function _updateLastReadTime() {
		try {
			// APIリクエスト
			let bodyData;

			if (directChatRoomId !== null) {
				bodyData = {
					"chat_room_type": "DirectChatRoomId", // Rustでenumのためキャメルケース
					"chat_room_id": Number(directChatRoomId),
				}
			}
			if (groupChatRoomId !== null) {
				bodyData = {
					"chat_room_type": "GroupChatRoomId", // Rustでenumのためキャメルケース
					"chat_room_id": Number(groupChatRoomId),
				}
			}

			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/last-read-time`, {
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

	// メッセージを送信
	const _onSendMessage = useCallback((messages = [], image) => {
		// 画像しかない場合
		if (image && messages.length === 0) {
			messages = [
				{
					"_id": null, // バックエンドで発行したい(messageテーブルのid)
					"createdAt": null, // バックエンドで発行したい(messageテーブルのcreated_at)
					"text": "",
					"user": {
						"_id": userId,
					},
				},
			]
			messages[0]["image"] = image
		}
		// 画像とテキスト両方ある場合
		if (image && messages.length !== 0) {
			messages[0]["image"] = image
		}
		// messagesに要素追加
		messages[0]["type"] = "sendMessage"
		messages[0]["sendUserIds"] = sendUserIds // 送るべきユーザーID
		messages[0]["user_id"] = userId // 送った人のユーザーID

		if (directChatRoomId) {
			messages[0]["chat_room_type"] = "DirectChatRoomId"
			messages[0]["chat_room_id"] = directChatRoomId
		}

		if (groupChatRoomId) {
			messages[0]["chat_room_type"] = "GroupChatRoomId"
			messages[0]["chat_room_id"] = groupChatRoomId
		}

		// websocketでメッセージをサーバーに送る
		// ★websocketは一旦やめておき、実装予定
		sock.send(JSON.stringify(messages))
		_postMessage(messages)
		setImage('')
		// メッセージ更新API実行
	}, [userId, sendUserIds])

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
							{props.currentMessage.image && (
								<Pressable
									onPress={() => { _openShareDialogAsync(props.currentMessage.image) }}>
									<FontAwesome name='download' color={MAIN_NAVY_COLOR} size={24} margin={0} />
								</Pressable>
							)}
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
		} if (initialApiCount) {
			setTimeout(() => {
				// マウントされているか判定
				if (isMounted.current) {
					const newData = [...messages, ...addMessages];
					setMessages(newData)
					setLoadEarlier(false)
					setInitialApiCount(false)
				}
			}, 1000)
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
		let result: ImageInfo = await ImagePicker.launchImageLibraryAsync({
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
						borderTopLeftRadius: 15,
						borderTopRightRadius: 15,
						borderRadius: props.currentMessage.user._id === userId ? 0 : 15,
						// 自分が送った画像の場合は、右下のborderRadiusを15に設定
						borderBottomLeftRadius: props.currentMessage.user._id === userId ? 15 : 0,
						resizeMode: "cover",
					}}
					source={{ uri: props.currentMessage.image }}
				/>
			</View>
		);
	};
	// 画像のシェア
	let _openShareDialogAsync = async (image) => {
		if (!(await Sharing.isAvailableAsync())) {
			alert(`Uh oh, sharing isn't available on your platform`);
			return;
		}

		const result = await FileSystem.downloadAsync(
			image,
			FileSystem.documentDirectory + "asami.jpeg"
		);
		await Sharing.shareAsync(result.uri, { mimeType: result.mimeType, UTI: "public" + result.mimeType });
	}

	// グループトーク画面で、クリックした人とのdirectChatRoomId(ない場合は、まだ友達ではない)
	const [selectedFriendDirectChatRoomId, setSelectedFriendDirectChatRoomId] = useState(null)
	// グループトーク画面でクリックした人と既に友達かどうか
	const [selectedUserAlreadyFriend, setSelectedUserAlreadyFriend] = useState(false)
	// グループトーク画面でユーザーアイコンをクリックしたかどうか
	const [clickedUserIcon, setClickedUserIcon] = useState(false)
	// グループトーク画面でクリックした人のuser情報
	const [selectedUserInfo, setSelectedUserInfo] = useState(null)

	// 該当友達とのdirectChatRoomIdを取得
	async function fetchDirectChatRoomIdByUserId(friendUserId: string) {
		try {
			// paramsを生成
			const params = { "friend_user_id": friendUserId }
			const query_params = new URLSearchParams(params);
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/friend?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// グループトーク画面でクリックした人と既に友達かどうか
			setSelectedUserAlreadyFriend(parse_response.result.already_friend)
			// グループトーク画面で、クリックした人とのdirectChatRoomId(ない場合は、まだ友達ではない)
			setSelectedFriendDirectChatRoomId(parse_response.result.direct_chat_room_id)
			// グループトーク画面でユーザーアイコンをクリックしたかどうか
			setClickedUserIcon(true)
		} catch (e) {
			console.error(e)
		}
	}

	// ユーザーアイコンをクリックした場合
	const _onPressAvatar = (user) => {
		// グループチャットの場合のみ、ユーザーアイコンをクリックできるようにする
		if (groupChatRoomId !== null || groupChatRoomId != undefined) {
			setSelectedUserInfo(user)
			// クリックした人と既に友達かどうかをチェック
			const friendUserId = user._id
			fetchDirectChatRoomIdByUserId(friendUserId)
		}
	}

	useEffect(() => {
		// チャットルームIDに紐づくチャット履歴の取得
		if ((directChatRoomId || groupChatRoomId) && userId) {
			_fetchMessageByChatRoomId()
			// 最終既読日時の更新
			_updateLastReadTime()
			// directChatRoomId/groupChatRoomIdに紐づくメンバーのユーザーIDを取得
			_fetchUserIdsByDirectOrGroupChatRoomId()
		}
	}, [userId, directChatRoomId, groupChatRoomId])

	useEffect(() => {
		// グループトーク画面でユーザーアイコンをクリックしたかどうかをfalseに戻す
		setClickedUserIcon(false)
		// グループトーク画面でユーザーアイコンをクリックした場合
		if (clickedUserIcon) {
			// 既に友達の場合、Talkが選べるモーダルを表示
			if (selectedFriendDirectChatRoomId && selectedUserAlreadyFriend) {
				navigation.navigate('AlreadyFriendModal', { "user": selectedUserInfo, "groupChatRoomId": groupChatRoomId, "groupImage": image, "groupName": name, "directChatRoomId": selectedFriendDirectChatRoomId })
			}
			if (!selectedUserAlreadyFriend) {
				navigation.navigate('NotFriendModal', { "user": selectedUserInfo, "groupChatRoomId": groupChatRoomId, "groupImage": image, "groupName": name, "directChatRoomId": null })
			}
		}
	}, [clickedUserIcon])

	// ユーザーIDの取得
	useEffect(() => {
		storage.load({
			key: "key"
		}).then((data) => {
			setUserId(data.userId)
			sock.send(JSON.stringify([{ "userId": data.userId, type: "setUserId" }]))
		})
	}, [])


	return (
		<KeyboardAvoidingView behavior="padding" style={sameStyles.screenContainerStyle}>
			<SafeAreaView style={sameStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={sameStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"Chats"}>
					<MainTitle title={null} link={"Chats"} props={{ "profileImage": profileImage, "name": name }} groupChatRoomId={groupChatRoomId} groupMemberUserId={groupMemberUserId} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? sameStyles.mainContainerStyle : sameStyles.mainContainerIphoneXStyle}>
					<GiftedChat
						messages={messages}
						onSend={messages => {
							_onSendMessage(messages, image)
						}}
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
						// フッターに画像送信ボタン追加
						renderActions={(props) => _renderActions(props)}
						// 画像送信ボタンを押したときに送信したい処理
						onPressActionButton={() => _onPressActionButton()}
						// メッセージに画像を表示
						renderMessageImage={(props) => _renderMessageImage(props)}
						// ユーザーアイコンをクリックした場合
						onPressAvatar={(user) => _onPressAvatar(user)}
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
		marginRight: -5,
	},
	readRightContainerStyle: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		marginLeft: -5,
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

