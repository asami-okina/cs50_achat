import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import { fetchNickNameOrGroupNameBySearchForm, fetchGroupList, fetGroupCount, fetchFriendList, fetchFriendCount } from '../api/api'
import { Footer } from '../components/common/footer'
import { TopAreaContainer } from '../components/common/topAreaContainer'
import { GroupAndFriendList } from '../components/home/groupAndFriendList'

// constantsStyles
import { constantsStyles } from '../constants/styles'

// constantsLayout
import { IPHONE_X_BOTTOM_SPACE } from '../constants/layout'

export function Home({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"
	// 検索フォーム
	const [searchText, setSearchText] = useState('')

	// 友達一覧リスト
	const [friendList, setFriendList] = useState([])
	// 友達一覧を開くかどうか
	const [openFriendList, setOpenFriendList] = useState(true)
	// 友達数
	const [friendCount, setFriendCount] = useState(0)

	// グループ一覧リスト
	const [groupList, setGroupList] = useState([])
	// グループ一覧を開くかどうか
	const [openGroupList, setOpenGroupList] = useState(true)
	// 所属グループ数
	const [groupCount, setGroupCount] = useState(0)

	// ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
	function _searchName(searchText) {
		let result = fetchNickNameOrGroupNameBySearchForm(searchText);
		// 友達一覧のstateを更新
		if (result[0]["friend"].length !== 0) {
			setFriendList(result[0]["friend"])
		}
		// グループ一覧のstateを更新
		if (result[1]["group"].length !== 0) {
			setGroupList(result[1]["group"])
		}
	}

	// ユーザが所属するグループ一覧を取得
	function _fetchGroupList(userId) {
		let result = fetchGroupList(userId)
		if (result.length !== 0) {
			setGroupList(result)
		}
	}

	// ユーザが所属するグループ数を取得
	function _fetGroupCount(userId) {
		let result = fetGroupCount(userId)
		setGroupCount(result)
	}

	// 友達一覧を取得
	function _fetchFriendList(userId) {
		let result = fetchFriendList(userId)
		if (result.length !== 0) {
			setFriendList(result)
		}
	}

	// 友達数を取得
	function _fetchFriendCount(userId) {
		let result = fetchFriendCount(userId)
		setFriendCount(result)
	}

	useEffect(() => {
		if (userId) {
			// ユーザが所属するグループ一覧を取得
			_fetchGroupList(userId)
			// ユーザが所属するグループ数を取得
			_fetGroupCount(userId)
			// 友達一覧を取得
			_fetchFriendList(userId)
			// 友達数を取得
			_fetchFriendCount(userId)
		}
	}, [])

	// 検索フォームのラベル化
	let textInputSearch;

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsStyles.screenContainerStyle}>
			<SafeAreaView style={constantsStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaContainer title={null} searchForm={true} searchFormProps={{ "setSearchText": setSearchText, "searchText": searchText, "textInputSearch": textInputSearch, "_searchName": _searchName }} />
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				{/* <ScrollView style={IPHONE_X_BOTTOM_SPACE === 0 ? constantsStyles.withFooterMainContainerStyle: constantsStyles.withFooterMainContainerIphoneXStyle}> */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? constantsStyles.withFooterMainContainerStyle : constantsStyles.withFooterMainContainerIphoneXStyle}>
					{/* グループ一覧 */}
					<GroupAndFriendList groupListProps={{ "groupCount": groupCount, "setOpenGroupList": setOpenGroupList, "openGroupList": openGroupList, "groupList": groupList }} friendListProps={null} type={"Group"} />
					{/* 友達一覧 */}
					<GroupAndFriendList friendListProps={{ "friendCount": friendCount, "setOpenFriendList": setOpenFriendList, "openFriendList": openFriendList, "friendList": friendList }} groupListProps={null} type={"Friend"} />
					{/* </ScrollView> */}
				</View>
				{/*フッター */}
				<Footer navigation={navigation} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
