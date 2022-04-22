// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Text, StyleSheet, Image, Pressable } from 'react-native';

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

// layouts
import { IPHONE_X_BOTTOM_SPACE, TAB_TITLE_TEXT_SIZE, TAB_FONT, MAIN_NAVY_COLOR, CONTENT_WIDTH, BIG_PROFILE_IMAGE_SIZE } from '../constants/layout'

export function AddFriend({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// 検索フォームのテキスト
	const [searchText, setSearchText] = useState('')

	// ユーザーIDを条件にAPIから取得した友達情報
	const [friendInfo, setFriendInfo] = useState<any>(null)


	// ニックネームでヒットするユーザーの取得
	async function _searchId(searchText) {
		try {
			// paramsを生成
			const params = { "searchUserId": searchText }
			const query_params = new URLSearchParams(params);
			// APIリクエスト
			const response = await fetch(`https://a-chat/api/users/${userId}/user?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// 友達一覧のstateを更新
			setFriendInfo(parse_response)
		} catch (e) {
			console.error(e)
		}
	}


	// 検索フォームのラベル化
	let textInputSearch;

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"addFriend"}>
					<View style={styles.titleWrapperStyle}>
						<Pressable style={styles.backIconContainerStyle} onPress={() => { navigation.navigate('Home') }} >
							<Image source={require("../../assets/images/back-icon.png")} style={styles.backIconStyle} />
						</Pressable>
						<Text style={styles.titleStyle}>Friend Search</Text>
					</View>
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? constantsCommonStyles.withFooterMainContainerNoneBottomButtonStyle : constantsCommonStyles.withFooterMainContainerIphoneXNoneBottomButtonStyle}>
					{/* 検索フォーム */}
					<View style={styles.searchFormContainerStyle}>
						<SearchForm setSearchText={setSearchText} searchText={searchText} textInputSearch={textInputSearch} searchName={_searchId} fetchGroupCount={null} fetchFriendCount={null} setIsDuringSearch={null} placeholder={"Search by frinend's userID"} />
					</View>
					{/* 検索結果 */}
					{friendInfo && (
						<View style={styles.searchInfoWrapperStyle}>
							<View style={styles.searchInfoContainerStyle}>
								<Image source={friendInfo.friend_profile_image} style={styles.profileImageStyle} />
								<Text style={selectedFriendStyles.listItemNameStyle}>{friendInfo.friend_nickname}</Text>
							</View>
							<SmallButton text={"Add"} navigation={navigation} friendList={friendInfo} groupSetting={null} type={"addFriend"} friendListNames={null} />
						</View>
					)}
				</View>
				{/*フッター */}
				<Footer navigation={navigation} />
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
	titleStyle: {
		fontSize: TAB_TITLE_TEXT_SIZE,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
		marginLeft: 12,
	},
	backIconContainerStyle: {
	},
	backIconStyle: {
		width: 20,
		height: 20,
	},
	searchFormContainerStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	searchInfoWrapperStyle: {
		marginTop: 32,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	searchInfoContainerStyle: {
		width: CONTENT_WIDTH,
		height: 150,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	profileImageStyle: {
		width: BIG_PROFILE_IMAGE_SIZE,
		height: BIG_PROFILE_IMAGE_SIZE,
		borderRadius: 50,
	},
})
