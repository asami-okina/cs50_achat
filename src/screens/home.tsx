// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView } from 'react-native';

// components
import { Footer } from '../components/common/footer'
import { TopAreaContainer } from '../components/common/topAreaContainer'
import { FriendAndGroupList } from '../components/home/friendAndgroupList'
import { FriendOrGroupSelectTab } from '../components/common/friendOrGroupSelectTab'
import { AddButton } from '../components/common/addButton'
import { ConfirmModal } from '../components/common/confirmModal'

// api
import { fetchNickNameOrGroupNameBySearchForm, fetchGroupList, fetGroupCount, fetchFriendList, fetchFriendCount } from '../api/api'

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// layouts
import { IPHONE_X_BOTTOM_SPACE } from '../constants/layout'

export function Home({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// 検索フォーム
	const [searchText, setSearchText] = useState('')

	// グループ削除確認モーダル
	const [modalVisible, setModalVisible] = useState(false);

	// 友達一覧リスト
	const [friendList, setFriendList] = useState([])
	// 友達一覧を開くかどうか
	const [openFriendList, setOpenFriendList] = useState(true)
	// 友達数
	const [friendCount, setFriendCount] = useState(0)

	// グループ一覧リスト
	const [groupList, setGroupList] = useState([])
	// グループ一覧を開くかどうか
	const [openGroupList, setOpenGroupList] = useState(false)
	// 所属グループ数
	const [groupCount, setGroupCount] = useState(0)

	// 削除時の確認モーダルでCancelを押したかどうか
	const [clickedCancelMordal, setClickedCancelMordal] = useState(false)
	// 削除時の確認モーダルでOkを押したかどうか
	const [clickedOkMordal, setClickedOkMordal] = useState(false)

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
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* Delete確認モーダル */}
				<ConfirmModal modalVisible={modalVisible} setModalVisible={setModalVisible} setClickedCancelMordal={setClickedCancelMordal} setClickedOkMordal={setClickedOkMordal} modalText={"When you leave a group, the group member list and all group talk history will be deleted. Do you want to leave the group?"} />
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaContainer title={null} searchForm={true} searchFormProps={{ "setSearchText": setSearchText, "searchText": searchText, "textInputSearch": textInputSearch, "_searchName": _searchName }} />
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? constantsCommonStyles.withFooterMainContainerStyle : constantsCommonStyles.withFooterMainContainerIphoneXStyle}>
					{/* FriendとGroupの選択タブ */}
					<FriendOrGroupSelectTab setOpenFriendList={setOpenFriendList} setOpenGroupList={setOpenGroupList} openFriendList={openFriendList} openGroupList={openGroupList} friendCount={friendCount} groupCount={groupCount} />
					{/* 友達一覧 */}
					{openFriendList && (
						<FriendAndGroupList friendListProps={{ "friendCount": friendCount, "setOpenFriendList": setOpenFriendList, "openFriendList": openFriendList, "friendList": friendList }} groupListProps={null} type={"Friend"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
					)}
					{/* グループ一覧 */}
					{openGroupList && (
						<FriendAndGroupList groupListProps={{ "groupCount": groupCount, "setOpenGroupList": setOpenGroupList, "openGroupList": openGroupList, "groupList": groupList }} friendListProps={null} type={"Group"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} />
					)}
				</View>
				{/* 友達またはグループ追加ボタン */}
				<AddButton />
				{/*フッター */}
				<Footer navigation={navigation} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
