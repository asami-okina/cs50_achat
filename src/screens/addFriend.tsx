// libs
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { API_SERVER_URL } from "../constants/api"
import { storage } from '../../storage';
import { StackScreenProps } from '@react-navigation/stack';

// components
import { Footer } from '../components/common/footer'
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { SearchForm } from "../components/common/_topAreaContainer/searchForm"
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle"
import { ExistFriend } from '../components/addFriend/existFriend';
import { NotExistFriend } from "../components/addFriend/notExistFriend"

// sameStyles
import { sameStyles } from '../constants/styles/sameStyles'

// layouts
import { IPHONE_X_BOTTOM_SPACE } from '../constants/layout'

type MainProps = StackScreenProps<RootStackParamListType, 'AddFriend'>;

export function AddFriend({ navigation }: MainProps) {
	// ユーザーID(今後は認証から取得するようにする)
	const [userId, setUserId] = useState<string>(null)

	// 検索フォームのテキスト
	const [searchText, setSearchText] = useState<string>('')

	// ユーザーIDを条件にAPIから取得した友達情報
	const [friendInfo, setFriendInfo] = useState<any>(null)

	// すでに友達になっているか
	const [alreadyFriend, setAlreadyFriend] = useState(false)

	// 該当ユーザーIDが存在する場合
	const [existUserId, setExistUserId] = useState(true)

	// ユーザーID検索にヒットしたユーザー情報(プロフィール画像、ニックネーム)
	async function _searchId(searchText: string) {
		try {
			// paramsを生成
			const params = { "search_user_id": searchText }
			const query_params = new URLSearchParams(params);
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/user?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// すでに友達になっているかどうか
			const already_follow_requested = parse_response.result.already_follow_requested
			// 該当user_idが存在するかどうか
			const exist_user_id = parse_response.result.exist_user_id
			// 成功した場合
			if (!already_follow_requested && exist_user_id) {
				setAlreadyFriend(false)
				setExistUserId(true)
			}
			// 既に友達になっている場合
			if (already_follow_requested && exist_user_id) {
				setAlreadyFriend(true)
				setExistUserId(true)
			}
			// 該当のユーザーIDが存在しない場合
			if (!exist_user_id) {
				setAlreadyFriend(false)
				setExistUserId(false)
			}
			// 友達一覧のstateを更新
			setFriendInfo(parse_response.result)
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
		})
	}, [])

	return (
		<KeyboardAvoidingView behavior="padding" style={sameStyles.screenContainerStyle}>
			<SafeAreaView style={sameStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={sameStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"addFriend"}>
					<MainTitle navigation={navigation} title={"Friend Search"} link={"Home"} props={null} groupChatRoomId={null} groupMemberUserId={null} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? sameStyles.withFooterMainContainerNoneBottomButtonStyle : sameStyles.withFooterMainContainerIphoneXNoneBottomButtonStyle}>
					{/* 検索フォーム */}
					<View style={styles.searchFormContainerStyle}>
						<SearchForm setSearchText={setSearchText} searchText={searchText} searchName={_searchId} fetchGroupCount={null} fetchFriendCount={null} setIsDuringSearch={null} placeholder={"Search by frinend's userID"} />
					</View>
					{/* 検索結果が存在する場合 */}
					{friendInfo && existUserId && (
						<ExistFriend navigation={navigation} friendInfo={friendInfo} alreadyFriend={alreadyFriend} />
					)}
					{/* 検索結果が存在しない場合 */}
					{!existUserId && (
						<NotExistFriend />
					)}
				</View>
				{/*フッター */}
				<Footer navigation={navigation} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}


const styles = StyleSheet.create({
	searchFormContainerStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
})
