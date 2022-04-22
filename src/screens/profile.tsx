// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Text, StyleSheet, Image, Pressable, TextInput, TouchableOpacity, Switch } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// components
import { TopAreaWrapper } from "../components/common/topAreaWrapper"

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// layouts
import { TAB_TITLE_TEXT_SIZE, TAB_FONT, MAIN_NAVY_COLOR, CONTENT_WIDTH, BIG_PROFILE_IMAGE_SIZE, STANDARD_FONT, PROFILE_IMAGE_BORDER_RADIUS, MAIN_WHITE_COLOR, MAIN_GRAY_COLOR, MAIN_YELLOW_GREEN } from '../constants/layout'

export function Profile({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// ニックネーム
	const [nickName, setNickName] = useState("")

	// 検索可能トグル
	const [isEnabled, setIsEnabled] = useState(false);

	// 検索可能トグルの変更関数
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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

	// 検索フォームのラベル化
	let textInputSearch;

	// キーボードに完了ボタンを表示
	const inputAccessoryViewID = 'uniqueID';

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"addFriend"}>
					<View style={styles.titleWrapperStyle}>
						<Pressable onPress={() => { navigation.navigate('Home') }} >
							<Image source={require("../../assets/images/back-icon.png")} style={styles.backIconStyle} />
						</Pressable>
						<Text style={styles.mainTitleStyle}>Profile Setting</Text>
					</View>
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
						<View style={styles.profileContainerStyle}>
							{/* ユーザーID */}
							<View style={styles.listContainerStyle}>
								<Text style={styles.titleStyle}>User ID</Text>
								<Text style={styles.textStyle}>{userId}</Text>
							</View>
							{/* ニックネーム */}
							<View style={styles.listContainerStyle}>
								<Text style={styles.titleStyle}>NickName</Text>
								<View style={styles.nickNameContainerStyle}>
									<Text style={styles.textStyle}>{nickName}</Text>
									<Image source={require('../../assets/images/back-arrow-icon.png')} style={styles.nextIconStyle} />
								</View>
							</View>
							{/* 検索許可トグル */}
							<View style={styles.listContainerStyle}>
								<Text style={styles.searchTitleStyle}>Search for friends by ID</Text>
								<View style={styles.searchContainerStyle}>
									<Switch
										trackColor={{ false: MAIN_GRAY_COLOR, true: MAIN_YELLOW_GREEN }}
										thumbColor={MAIN_WHITE_COLOR}
										ios_backgroundColor={MAIN_GRAY_COLOR}
										onValueChange={toggleSwitch}
										value={isEnabled}
									/>
								</View>
							</View>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}


const styles = StyleSheet.create({
	titleWrapperStyle: {
		width: CONTENT_WIDTH,
		flexDirection: "row",
		alignItems: "center",
	},
	backIconContainerStyle: {
		width: 20,
	},
	backIconStyle: {
		width: 50,
		height: 50,
	},
	mainTitleContainerStyle: {
		width: CONTENT_WIDTH - 50, // backIconStyleのwidthを引く
		alignItems: "center",
	},
	mainTitleStyle: {
		fontSize: 24,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
		marginLeft: 12,
	},
	titleStyle: {
		fontSize: TAB_TITLE_TEXT_SIZE,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
		width: 120,
	},
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
	profileContainerStyle: {
		marginTop: 64
	},
	listContainerStyle: {
		width: CONTENT_WIDTH,
		marginBottom: 30,
		flexDirection: "row",
	},
	nickNameContainerStyle: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row"
	},
	nextIconStyle: {
		width: 25,
		height: 25
	},
	textStyle: {
		fontFamily: STANDARD_FONT,
		fontSize: 16,
	},
	searchContainerStyle: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-end",
	},
	searchTitleStyle: {
		fontSize: TAB_TITLE_TEXT_SIZE,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
	},
	circleStyle: {
		width: 80,
		height: 80,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
	},
})
