// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { storage } from '../../storage'

// components
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle"
import { ProfileInfo } from "../components/profile/profileInfo"
import { ProfileImage } from "../components/profile/profileImage"
import { API_SERVER_URL } from "../constants/api"

// sameStyles
import { sameStyles } from '../constants/styles/sameStyles'

export function Profile({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const [userId, setUserId] = useState(null)

	// ニックネーム
	const [nickName, setNickName] = useState("")

	// プロフィール画像
	const [profileImage, setProfileImage] = useState(null)

	// 検索可能トグル
	const [isEnabled, setIsEnabled] = useState(false);

	// 現在画面がフォーカスされているかをbooleanで保持
	const isFocused = useIsFocused()

	// [自分の情報]ユーザーIDに紐づくニックネーム、プロフィール画像の取得
	async function _fetchProfileByUserId(userId) {
		try {
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/profile`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// // プロフィール画像の登録
			setProfileImage(parse_response.profileImage)
			// // ニックネームの登録
			setNickName(parse_response.nickName)
			// // 検索可能フラグの登録
			setIsEnabled(parse_response.searchFlag)
		} catch (e) {
			console.error(e)
		}
	}

	// ユーザーIDの取得
	useEffect(() => {
		storage.load({
			key: "key"
		}).then((data) => {
			setUserId(data.userId)
			// navigationがリレンダーされないので、画面にフォーカスが当たった時に再実行するよう実装
			_fetchProfileByUserId(data.userId)
		})
	}, [isFocused])

	return (
		<KeyboardAvoidingView behavior="padding" style={sameStyles.screenContainerStyle}>
			<SafeAreaView style={sameStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={sameStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"addFriend"}>
					<MainTitle navigation={navigation} title={"Profile Setting"} link={"Home"} props={null} groupChatRoomId={null} groupMemberUserId={null} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分*/}
				<View style={sameStyles.mainContainerStyle}>
					<View style={styles.profileImageWrapperStyle} >
						{/* プロフィール画像 */}
						<ProfileImage image={profileImage} setImage={setProfileImage} />
						{/* プロフィール */}
						<ProfileInfo navigation={navigation} setNickName={setNickName} nickName={nickName} isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}


const styles = StyleSheet.create({
	profileImageWrapperStyle: {
		justifyContent: "center",
		alignItems: "center",
	},
})
