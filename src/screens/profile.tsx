// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, StyleSheet } from 'react-native';

// components
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle"
import { ProfileInfo } from "../components/profile/profileInfo"
import { ProfileImage } from "../components/profile/profileImage"
import {EditNickName} from "../components/profile/_profileInfo/editNickName"

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'


export function Profile({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// ニックネーム
	const [nickName, setNickName] = useState("")

	// プロフィール画像
	const [profileImage, setProfileImage] = useState(null)

		// 検索可能トグル
		const [isEnabled, setIsEnabled] = useState(false);

	// ニックネームの更新
	async function _updateProfileImage() {
		try {
			// APIリクエスト
			const bodyData = {
				"nickName": nickName,
			}
			const response = await fetch(`https://a-chat/api/users/${userId}/profile`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// 新しいニックネームに更新
			setNickName(parse_response.nickName)
		} catch (e) {
			console.error(e)
		}
	}

	// [自分の情報]ユーザーIDに紐づくニックネーム、プロフィール画像の取得
	async function _fetchProfileByUserId() {
		try {
			// APIリクエスト
			const response = await fetch(`https://a-chat/api/users/${userId}/profile`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// console.log('parse_response',parse_response)
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

	useEffect(() => {
		if (userId) {
			_fetchProfileByUserId()
		}
	}, [])

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"addFriend"}>
					<MainTitle navigation={navigation} title={"Profile Setting"} link={"Home"} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分*/}
				<View style={constantsCommonStyles.mainContainerStyle}>
					<View style={styles.profileImageWrapperStyle} >
						{/* プロフィール画像 */}
						<ProfileImage image={profileImage} setImage={setProfileImage} />
						{/* プロフィール */}
						<ProfileInfo navigation={navigation} setNickName={setNickName} nickName={nickName} isEnabled={isEnabled} setIsEnabled={setIsEnabled} fetchProfileByUserId={_fetchProfileByUserId}  />
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
