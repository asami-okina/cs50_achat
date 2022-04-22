// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Text, StyleSheet, Image, Pressable, TextInput, TouchableOpacity, Switch } from 'react-native';

// components
import { Footer } from '../components/common/footer'
import { SmallButton } from '../components/common/smallButton';
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { SearchForm } from "../components/common/_topAreaContainer/searchForm"
import { AddButton } from "../components/common/addButton"

// constantsSelectedFriendStyles
import { selectedFriendStyles } from '../constants/styles/selectedFriendStyles'

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// constantsSearchStyles
import { searchStyles } from '../constants/styles/searchStyles'

// layouts
import { IPHONE_X_BOTTOM_SPACE, TAB_TITLE_TEXT_SIZE, TAB_FONT, MAIN_NAVY_COLOR, CONTENT_WIDTH, BIG_PROFILE_IMAGE_SIZE, STANDARD_FONT, MAIN_PINK_COLOR, PROFILE_IMAGE_BORDER_RADIUS, MAIN_BLACK_COLOR, ADD_FRIEND_WIDTH, PROFILE_IMAGE_SIZE, ICON_SIZE, MAIN_WHITE_COLOR, ADD_BUTTON_SIZE, SMALL_BUTTON_WIDTH, BUTTON_BORDER_RADIUS, MAIN_GRAY_COLOR, LIGHT_GRAY_COLOR, SEARCH_FORM_HEIGHT, SEARCH_FORM_BORDER_RADIUS, MAIN_YELLOW_GREEN } from '../constants/layout'

export function Profile({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// ユーザーのプロフィール情報
	const [profile, setProfile] = useState<any>([])

	// ニックネーム
	const [nickName, setNickName] = useState("")

	// ニックネーム入力中かどうか
	const [inEntryNickName, setInEntryNickName] = useState(false)

	// ニックネーム更新フォームの削除アイコン表示/非表示
	const [deleteIconDisplay, setDeleteIconDisplay] = useState(false)

	// 検索中かどうか
	const [isDuringSearch, setIsDuringSearch] = useState(false)

	// 検索可能トグル
	const [isEnabled, setIsEnabled] = useState(false);

	// 検索可能トグルの変更関数
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
			// 自分のニックネームの設定
			setProfile(parse_response)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (userId) {
			_fetchProfileByUserId()
		}
	}, [])

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
						<Pressable onPress={() => { navigation.navigate('Home') }} style={styles.backIconContainerStyle} >
							<Image source={require("../../assets/images/back-icon.png")} style={styles.backIconStyle} />
						</Pressable>
						<View style={styles.mainTitleContainerStyle}>
						<Text style={styles.mainTitleStyle}>Profile Setting</Text>
						</View>
					</View>
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分*/}
				<View style={constantsCommonStyles.mainContainerStyle}>
					<View style={styles.profileImageWrapperStyle} >
						<Pressable onPress={() => { }} style={styles.profileImageContainerStyle}>
							<View style={styles.addImageContainerStyle}>
								<Image source={require('../../assets/images/add-circle.png')} style={styles.addImageStyle} />
							</View>
							<Image source={profile.profileImage} style={styles.bigProfileImageStyle} />
						</Pressable>
						<View style={styles.profileContainerStyle}>
							{/* ユーザーID */}
							<View style={styles.listContainerStyle}>
								<Text style={styles.titleStyle}>User ID</Text>
								<Text style={styles.textStyle}>{profile.userId}</Text>
							</View>
							{/* ニックネーム */}
							<View style={styles.listContainerStyle}>
								<Text style={styles.titleStyle}>NickName</Text>
								<View style={styles.nickNameContainerStyle}>
									<Text style={styles.textStyle}>{profile.nickName}</Text>
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
	bigProfileImageStyle: {
		width: BIG_PROFILE_IMAGE_SIZE,
		height: BIG_PROFILE_IMAGE_SIZE,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
		position: "relative",
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
	}
})
