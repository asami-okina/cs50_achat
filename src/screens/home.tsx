// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack';

// components
import { Footer } from '../components/common/footer'
import { FriendAndGroupList } from '../components/home/friendAndgroupList'
import { FriendOrGroupSelectTab } from '../components/common/friendOrGroupSelectTab'
import { AddButton } from '../components/common/addButton'
import { ConfirmModal } from '../components/common/confirmModal'
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { SearchForm } from "../components/common/_topAreaContainer/searchForm"
import { API_SERVER_URL } from "../constants/api"
import { storage } from "../../storage"

// sameStyles
import { sameStyles } from '../constants/styles/sameStyles'

// layouts
import { IPHONE_X_BOTTOM_SPACE } from '../constants/layout'

export function Home() {
	const [userId, setUserId] = useState<string>(null)

	// 検索フォーム
	const [searchText, setSearchText] = useState<string>('')
	// 検索中かどうか
	const [isDuringSearch, setIsDuringSearch] = useState<boolean>(false)

	// グループ削除確認モーダル
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	// 削除時の確認モーダルでCancelを押したかどうか
	const [clickedCancelMordal, setClickedCancelMordal] = useState<boolean>(false)
	// 削除時の確認モーダルでOkを押したかどうか
	const [clickedOkMordal, setClickedOkMordal] = useState<boolean>(false)

	// [検索前]APIから取得した友達一覧リスト
	const [beforeFriendListSearch, setBeforeFriendListSearch] = useState<FriendListPropsType[]>([])
	// [検索後]APIから取得した友達一覧リスト
	const [afterFriendListSearch, setAfterFriendListSearch] = useState<FriendListPropsType[]>([])
	// 友達一覧を開くかどうか
	const [openFriendList, setOpenFriendList] = useState<boolean>(true)
	// 友達数
	const [friendCount, setFriendCount] = useState<number>(0)

	// [検索前]APIから取得したグループ一覧リスト
	const [beforeGroupListSearch, setBeforeGroupListSearch] = useState<GroupListPropsType[]>([])
	// [検索後]APIから取得したグループ一覧リスト
	const [afterGroupListSearch, setAfterGroupListSearch] = useState<GroupListPropsType[]>([])
	// グループ一覧を開くかどうか
	const [openGroupList, setOpenGroupList] = useState(false)
	// 所属グループ数
	const [groupCount, setGroupCount] = useState<number>(0)

	// 現在画面がフォーカスされているかをbooleanで保持
	const isFocused = useIsFocused()

	// ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
	async function _searchName(searchText: string) {
		try {
			// paramsを生成
			const params_search = { "search_text": searchText }
			const query_params = new URLSearchParams(params_search);

			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/home?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// 友達一覧のstateを更新
			setAfterFriendListSearch(parse_response.friends)
			// 友達数の更新
			setFriendCount(parse_response.friends.length)
			// グループ一覧のstateを更新
			setAfterGroupListSearch(parse_response.groups)
			// グループ数の更新
			setGroupCount(parse_response.groups.length)
		} catch (e) {
			console.error(e)
		}
	}

	// ユーザが所属するグループ一覧を取得
	async function _fetchGroupList(userId: string) {
		try {
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/groups`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			setBeforeGroupListSearch(parse_response.groups)
			// グループ数の更新
			setGroupCount(parse_response.groups.length)
		} catch (e) {
			console.error(e)
		}
	}

	// ユーザが所属するグループ数を取得
	async function _fetchGroupCount(userId: string) {
		try {
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/group-count`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			setGroupCount(parse_response.group_count)
		} catch (e) {
			console.error(e)
		}
	}

	// 友達一覧を取得
	async function _fetchFriendList(userId: string) {
		try {
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/friends`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			setBeforeFriendListSearch(parse_response.friend_list)
			// 友達数の更新
			setFriendCount(parse_response.friend_list.length)
		} catch (e) {
			console.error(e)
		}
	}

	// ユーザが所属するグループ数を取得
	async function _fetchFriendCount(userId: string) {
		try {
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/friend-count`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			setFriendCount(parse_response.friend_count)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {

	}, [])

	// ユーザーIDの取得
	useEffect(() => {
		storage.load({
			key: "key"
		}).then((data) => {
			setUserId(data.userId)
			// ユーザが所属するグループ一覧を取得
			_fetchGroupList(data.userId)
			// 友達一覧を取得
			_fetchFriendList(data.userId)
		})
	}, [isFocused])
	return (
		<KeyboardAvoidingView behavior="padding" style={sameStyles.screenContainerStyle}>
			<SafeAreaView style={sameStyles.screenContainerStyle}>
				{/* Delete確認モーダル */}
				<ConfirmModal modalVisible={modalVisible} setModalVisible={setModalVisible} setClickedCancelMordal={setClickedCancelMordal} setClickedOkMordal={setClickedOkMordal} modalText={"When you leave a group, the group member list and all group talk history will be deleted. Do you want to leave the group?"} />
				{/* 画面一番上にある青色の余白部分 */}
				<View style={sameStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"searchForm"}>
					<SearchForm setSearchText={setSearchText} searchText={searchText} searchName={_searchName} fetchGroupCount={_fetchGroupCount} fetchFriendCount={_fetchFriendCount} setIsDuringSearch={setIsDuringSearch} placeholder={"Search by name"} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? sameStyles.withFooterMainContainerStyle : sameStyles.withFooterMainContainerIphoneXStyle}>
					{/* FriendとGroupの選択タブ */}
					<FriendOrGroupSelectTab setOpenFriendList={setOpenFriendList} setOpenGroupList={setOpenGroupList} openFriendList={openFriendList} openGroupList={openGroupList} friendCount={friendCount} groupCount={groupCount} />
					{/* 友達一覧 */}
					{/* 検索中ではない場合 */}
					{!isDuringSearch && openFriendList && (
						<FriendAndGroupList openFriendList={openFriendList} friendList={beforeFriendListSearch} openGroupList={null} groupList={null} type={"Friend"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} setGroupCount={setGroupCount} />
					)}
					{/* 検索中の場合 */}
					{isDuringSearch && openFriendList && (
						<FriendAndGroupList openFriendList={openFriendList} friendList={afterFriendListSearch} openGroupList={null} groupList={null} type={"Friend"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} setGroupCount={setGroupCount} />
					)}
					{/* グループ一覧 */}
					{/* 検索中ではない場合 */}
					{!isDuringSearch && openGroupList && (
						<FriendAndGroupList openFriendList={null} friendList={null} openGroupList={openGroupList} groupList={beforeGroupListSearch} type={"Group"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} setGroupCount={setGroupCount} />
					)}
					{/* 検索中の場合 */}
					{isDuringSearch && openGroupList && (
						<FriendAndGroupList openFriendList={null} friendList={null} openGroupList={openGroupList} groupList={afterGroupListSearch} type={"Group"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal} setGroupCount={setGroupCount} />
					)}
				</View>
				{/* 友達またはグループ追加ボタン */}
				<AddButton openFriendList={openFriendList} openGroupList={openGroupList} />
				{/*フッター */}
				<Footer />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
