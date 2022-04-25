// libs
import React, { useEffect } from 'react';
<Text>あさみ</Text>
import { View, SafeAreaView, KeyboardAvoidingView, Text } from 'react-native';

// components
import { Footer } from '../components/common/footer'
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle"

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// layouts
import { IPHONE_X_BOTTOM_SPACE } from '../constants/layout'

export function Chat({ navigation, route }) {
	const { groupChatRoomId, directChatRoomId, profileImage, name } = route.params
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

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

	useEffect(() => {
		_fetchProfileImageAndName()
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
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? constantsCommonStyles.withFooterMainContainerNoneBottomButtonStyle : constantsCommonStyles.withFooterMainContainerIphoneXNoneBottomButtonStyle}>
					{/* 検索結果が存在する場合 */}
					{/* {friendInfo && existUserId && (
						<ExistFriend navigation={navigation} friendInfo={friendInfo} alreadyFriend={alreadyFriend} />
					)} */}
					{/* 検索結果が存在しない場合 */}
					{/* {!existUserId && (
						<NotExistFriend />
					)} */}
				</View>
				{/*フッター */}
				<Footer navigation={navigation} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
