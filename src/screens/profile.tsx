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

export function Profile() {
	// ユーザーID(今後は認証から取得するようにする)
	const [userId, setUserId] = useState<string>(null)

	// ニックネーム
	const [nickName, setNickName] = useState<string>("")

	// プロフィール画像
	const [profileImage, setProfileImage] = useState<string>(null)

	// 検索可能トグル
	const [isEnabled, setIsEnabled] = useState<boolean>(false);

	// 現在画面がフォーカスされているかをbooleanで保持
	const isFocused = useIsFocused()

	async function _fetchProfileByUserId(userId: string) {
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

			// 自分のニックネームの設定
			if (parse_response.profile.nickname) {
				setNickName(parse_response.profile.nickname)
			}
			// 自分のプロフィール画像の設定
			if (parse_response.profile.profile_image) {
				setProfileImage(parse_response.profile.profile_image)
			}
			// 自分の検索可能フラグの設定
			if (parse_response.profile.search_flag) {
				setIsEnabled(parse_response.profile.search_flag)
			}
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
					<MainTitle title={"Profile Setting"} link={"Home"} props={null} groupChatRoomId={null} groupMemberUserId={null} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分*/}
				<View style={sameStyles.mainContainerStyle}>
					<View style={styles.profileImageWrapperStyle} >
						{/* プロフィール画像 */}
						<ProfileImage image={profileImage} setImage={setProfileImage} />
						{/* プロフィール */}
						<ProfileInfo setNickName={setNickName} nickName={nickName} isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
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
