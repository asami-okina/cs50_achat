// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { storage } from '../../storage'

// components
import { Footer } from '../components/common/footer'
import { ConfirmModal } from '../components/common/confirmModal'
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { SearchForm } from "../components/common/_topAreaContainer/searchForm"
import { ChatsList } from "../components/chats/chatsList";
import { API_SERVER_URL } from "../constants/api"

// sameStyles
import { sameStyles } from '../constants/styles/sameStyles'

// layouts
import { IPHONE_X_BOTTOM_SPACE } from '../constants/layout'

export function Chats({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const [userId, setUserId] = useState(null)

	// 検索フォーム
	const [searchText, setSearchText] = useState('')
	// 検索中かどうか
	const [isDuringSearch, setIsDuringSearch] = useState(false)

	// グループ削除確認モーダル
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	// 削除時の確認モーダルでCancelを押したかどうか
	const [clickedDeleteCancelMordal, setClickedDeleteCancelMordal] = useState(false)
	// 削除時の確認モーダルでOkを押したかどうか
	const [clickedDeleteOkMordal, setClickedDeleteOkMordal] = useState(false)

	// グループ非表示確認モーダル
	const [hiddenModalVisible, setHiddenModalVisible] = useState(false);
	// 非表示時の確認モーダルでCancelを押したかどうか
	const [clickedHiddenCancelMordal, setClickedHiddenCancelMordal] = useState(false)
	// 非表示時の確認モーダルでOkを押したかどうか
	const [clickedHiddenOkMordal, setClickedHiddenOkMordal] = useState(false)

	// [検索前]APIから取得したグループ一覧リスト
	const [beforeChatRoomListSearch, setBeforeChatRoomListSearch] = useState([])
	// [検索後]APIから取得したグループ一覧リスト
	const [afterChatRoomListSearch, setAfterChatRoomListSearch] = useState([])

	// チャットルームIDに紐づくチャット履歴のparams甩
	const [groupChatRoomId, setGroupChatRoomId] = useState('')
	const [directChatRoomId, setDirectChatRoomId] = useState('')

	// 現在画面がフォーカスされているかをbooleanで保持
	const isFocused = useIsFocused()

	// ニックネームまたはグループ名の検索でヒットするチャット情報取得
	async function _searchChatByNickNameOrGroupName(searchText) {
		try {
			// paramsを生成
			const params_search = { "searchText": searchText }
			const query_params = new URLSearchParams(params_search);

			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/chatRoom?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// チャットルーム一覧のstateを更新
			setAfterChatRoomListSearch(parse_response)
		} catch (e) {
			console.error(e)
		}
	}


	// ユーザーIDに紐づくチャットルーム一覧を取得
	async function _fetchChatsList(userId) {
		try {
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/users/${userId}/chatRoom`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			setBeforeChatRoomListSearch(parse_response)
		} catch (e) {
			console.error(e)
		}
	}

	// 文字追加or削除ごとにヒット(名前またはグループ名)したチャット一覧を表示
	const _autoSuggestSearchChatByNickNameOrGroupName = (text) => {
		setSearchText(text)
		_searchChatByNickNameOrGroupName(searchText)
		if (setIsDuringSearch) {
			setIsDuringSearch(true)
		}
	}

	// ユーザーIDの取得
	useEffect(() => {
		storage.load({
			key: "key"
		}).then((data) => {
			setUserId(data.userId)
			// navigationがリレンダーされないので、画面にフォーカスが当たった時に再実行するよう実装
			_fetchChatsList(data.userId)
		})
	}, [isFocused])

	useEffect(() => {
		// サジェスト機能を使うために、searchTextが変わったら、毎回APIを実行する
		if (userId) {
			_searchChatByNickNameOrGroupName(searchText)
		}
	}, [searchText])

	// 検索フォームのラベル化
	let textInputSearch;

	return (
		<KeyboardAvoidingView behavior="padding" style={sameStyles.screenContainerStyle}>
			<SafeAreaView style={sameStyles.screenContainerStyle}>
				{/* Delete確認モーダル */}
				<ConfirmModal modalVisible={deleteModalVisible} setModalVisible={setDeleteModalVisible} setClickedCancelMordal={setClickedDeleteCancelMordal} setClickedOkMordal={setClickedDeleteOkMordal} modalText={"Delete chat room.Are you okay?"} />
				<ConfirmModal modalVisible={hiddenModalVisible} setModalVisible={setHiddenModalVisible} setClickedCancelMordal={setClickedHiddenCancelMordal} setClickedOkMordal={setClickedHiddenOkMordal} modalText={"Chat content will not be deleted."} />
				{/* 画面一番上にある青色の余白部分 */}
				<View style={sameStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"searchForm"}>
					<SearchForm setSearchText={_autoSuggestSearchChatByNickNameOrGroupName} searchText={searchText} textInputSearch={textInputSearch} searchName={_searchChatByNickNameOrGroupName} fetchGroupCount={null} fetchFriendCount={null} setIsDuringSearch={setIsDuringSearch} placeholder={"Search by name"} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? sameStyles.withFooterMainContainerNoneBottomButtonStyle : sameStyles.withFooterMainContainerIphoneXNoneBottomButtonStyle}>
					{/* チャット一覧 */}
					{/* 検索中ではない場合 */}
					{!isDuringSearch && beforeChatRoomListSearch.length !== 0 && (
						<ChatsList navigation={navigation} chatRoomList={beforeChatRoomListSearch} setDeleteModalVisible={setDeleteModalVisible} clickedDeleteCancelMordal={clickedDeleteCancelMordal} setClickedDeleteCancelMordal={setClickedDeleteCancelMordal} clickedDeleteOkMordal={clickedDeleteOkMordal} setClickedDeleteOkMordal={setClickedDeleteOkMordal} setHiddenModalVisible={setHiddenModalVisible} clickedHiddenCancelMordal={clickedHiddenCancelMordal} setClickedHiddenCancelMordal={setClickedHiddenCancelMordal} clickedHiddenOkMordal={clickedHiddenOkMordal} setClickedHiddenOkMordal={setClickedHiddenOkMordal} setGroupChatRoomId={setGroupChatRoomId} setDirectChatRoomId={setDirectChatRoomId} groupChatRoomId={groupChatRoomId} directChatRoomId={directChatRoomId} />
					)}
					{/* 検索中の場合 */}
					{isDuringSearch && afterChatRoomListSearch.length !== 0 && (
						<ChatsList navigation={navigation} chatRoomList={afterChatRoomListSearch} setDeleteModalVisible={setDeleteModalVisible} clickedDeleteCancelMordal={clickedDeleteCancelMordal} setClickedDeleteCancelMordal={setClickedDeleteCancelMordal} clickedDeleteOkMordal={clickedDeleteOkMordal} setClickedDeleteOkMordal={setClickedDeleteOkMordal} setHiddenModalVisible={setHiddenModalVisible} clickedHiddenCancelMordal={clickedHiddenCancelMordal} setClickedHiddenCancelMordal={setClickedHiddenCancelMordal} clickedHiddenOkMordal={clickedHiddenOkMordal} setClickedHiddenOkMordal={setClickedHiddenOkMordal} setGroupChatRoomId={setGroupChatRoomId} setDirectChatRoomId={setDirectChatRoomId} groupChatRoomId={groupChatRoomId} directChatRoomId={directChatRoomId} />
					)}
				</View>
				{/*フッター */}
				<Footer navigation={navigation} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
