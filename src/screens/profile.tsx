// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Text, StyleSheet, Image, Pressable, Switch } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// components
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle"
import { ProfileInfo } from "../components/profile/profileInfo"

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// layouts
import { TAB_TITLE_TEXT_SIZE, TAB_FONT, MAIN_NAVY_COLOR, CONTENT_WIDTH, STANDARD_FONT, PROFILE_IMAGE_BORDER_RADIUS, MAIN_WHITE_COLOR, MAIN_GRAY_COLOR, MAIN_YELLOW_GREEN } from '../constants/layout'

export function Profile({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// ニックネーム
	const [nickName, setNickName] = useState("")

	// プロフィール画像
	const [image, setImage] = useState(null)

	// ニックネームの更新
	async function _postNickName() {
		try {
			// APIリクエスト
			const bodyData = {
				"nickName": nickName,
			}
			const response = await fetch(`https://a-chat/api/users/${userId}/nick-name`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
			// レスポンスをJSONにする
			// const parse_response = await response.json()
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
			// プロフィール画像の登録
			setImage(parse_response.profileImage)
			// ニックネームの登録
			setNickName(parse_response.nickName)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (userId) {
			_fetchProfileByUserId()
		}
	}, [])

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
		}
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"addFriend"}>
					<MainTitle navigation={navigation} title={"Profile Setting"} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分*/}
				<View style={constantsCommonStyles.mainContainerStyle}>
					<View style={styles.profileImageWrapperStyle} >
						<Pressable onPress={() => { pickImage() }} style={styles.profileImageContainerStyle}>
							<View style={styles.addImageContainerStyle}>
								<Image source={require('../../assets/images/add-circle.png')} style={styles.addImageStyle} />
							</View>
							{image ? (
								<Image source={{ uri: image }} style={{ width: 80, height: 80, borderRadius: PROFILE_IMAGE_BORDER_RADIUS, }} />
							) :
								<View style={styles.circleStyle}></View>
							}
						</Pressable>
						{/* プロフィール */}
						<ProfileInfo nickName={nickName} />
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
	profileImageContainerStyle: {
		marginTop: 32
	},
	addImageContainerStyle: {
		position: "absolute",
		left: 65,
		top: -5,
		zIndex: 1,
	},
	addImageStyle: {
		width: 40,
		height: 40,
	},
	circleStyle: {
		width: 80,
		height: 80,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
	},
})
