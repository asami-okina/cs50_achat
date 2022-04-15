// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';

// components
import { Footer } from '../components/common/footer'
import { TopAreaContainer } from '../components/common/topAreaContainer'
import { SmallButton } from '../components/common/smallButton';
import { AddGroupTitle } from '../components/addGroup/addGroupTitle'
import { FriendList } from '../components/addGroup/friendList'
import { AddFriendList } from '../components/addGroup/addFriendList'

// api
import { fetchNickNameOrGroupNameBySearchForm, fetchFriendList } from '../api/api'

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// layouts
import { IPHONE_X_BOTTOM_SPACE } from '../constants/layout'

export function AddGroup({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// 検索フォーム
	const [searchText, setSearchText] = useState('')

	// 友達一覧リスト
	const [friendList, setFriendList] = useState([])

	// どの友達を選択したか
	const [selectedFriendList, setSelectedFriendList] = useState([])

	// ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
	function _searchName(searchText) {
		let result = fetchNickNameOrGroupNameBySearchForm(searchText);
		// 友達一覧のstateを更新
		if (result[0]["friend"].length !== 0) {
			setFriendList(result[0]["friend"])
		}
	}

	// 友達一覧を取得
	function _fetchFriendList(userId) {
		let result = fetchFriendList(userId)
		if (result.length !== 0) {
			setFriendList(result)
		}
	}

	useEffect(() => {
		if (userId) {
			// 友達一覧を取得
			_fetchFriendList(userId)
		}
	}, [])

	// 検索フォームのラベル化
	let textInputSearch;

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaContainer title={null} searchForm={true} searchFormProps={{ "setSearchText": setSearchText, "searchText": searchText, "textInputSearch": textInputSearch, "_searchName": _searchName }} />
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? constantsCommonStyles.withFooterMainContainerStyle : constantsCommonStyles.withFooterMainContainerIphoneXStyle}>
					{/* 選択された友達一覧 */}
					{selectedFriendList.length !== 0 && (
					<AddFriendList selectedFriendList={selectedFriendList} />
					)}
					{/* タイトル */}
					<AddGroupTitle text={"Friend"} />
					{/* 友達一覧 */}
					<FriendList friendList={friendList} selectedFriendList={selectedFriendList} setSelectedFriendList={setSelectedFriendList} />
				</View>
				{/* 右下のボタン(Next, Create) */}
				<SmallButton text={"Next"} />
				{/*フッター */}
				<Footer navigation={navigation} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
