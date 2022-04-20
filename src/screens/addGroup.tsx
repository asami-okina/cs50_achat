// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView } from 'react-native';

// components
import { Footer } from '../components/common/footer'
import { TopAreaContainer } from '../components/common/topAreaContainer'
import { SmallButton } from '../components/common/smallButton';
import { AddGroupTitle } from '../components/addGroup/addGroupTitle'
import { FriendList } from '../components/addGroup/friendList'
import { AddFriendList } from '../components/addGroup/addFriendList'
import { AddGroupSetting } from "../screens/addGroupSetting"
// api
import { fetchNickNameOrGroupNameBySearchForm, fetchFriendList } from '../api/api'

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// layouts
import { IPHONE_X_BOTTOM_SPACE } from '../constants/layout'

export function AddGroup({ navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// 検索フォームのテキスト
	const [searchText, setSearchText] = useState('')

	// [検索前]APIから取得した友達一覧リスト
	const [beforeFriendListSearch, setBeforeFriendListSearch] = useState([])

	// [検索後]APIから取得した友達一覧リスト
	const [afterFriendListSearch, setAfterFriendListSearch] = useState([])

	// [検索前後]選択した友達一覧リスト
	const [mergedSelectedFriendList, setMergerdSelectedFriendList] = useState([])

	// [検索前]選択した友達一覧リスト
	const [beforeSelectedFriendList, setBeforeSelectedFriendList] = useState([])

	// [検索後]選択した友達一覧リスト
	const [afterSelectedFriendList, setAfterSelectedFriendList] = useState([])


	// 検索中かどうか
	const [isDuringSearch, setIsDuringSearch] = useState(false)

	// ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
	function _searchName(searchText) {
		let result = fetchNickNameOrGroupNameBySearchForm(searchText);
		// 友達一覧のstateを更新
		if (result[0]["friend"].length !== 0) {
			setAfterFriendListSearch(result[0]["friend"].map((_, i) => ({ ..._, key: `${i + "after"}`, type: "after" })))
		}
	}

	// 友達一覧を取得
	function _fetchFriendList(userId) {
		let result = fetchFriendList(userId)
		if (result.length !== 0) {
			setBeforeFriendListSearch(result.map((_, i) => ({ ..._, key: `${i + "before"}`, type: "before" })))
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

	// 選択された友達リストの追加
	const _addFriendList = (rowKey, type) => {
		if (type === "before") {
			// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
			const beforeNewData = [...beforeSelectedFriendList]
			// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
			const prevIndex = beforeFriendListSearch.findIndex(item => item.key === rowKey);
			beforeNewData.push(beforeFriendListSearch[prevIndex]);
			setBeforeSelectedFriendList(beforeNewData)

			// beforeとafterをマージする
			// beforeを展開
			const beforeData = [...beforeNewData]
			// afterを展開
			const after = [...afterSelectedFriendList]
			const newData = [...beforeData, ...after]
			setMergerdSelectedFriendList(newData)
		}
		if (type === "after") {
			// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
			const afterNewData = [...afterSelectedFriendList]
			// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
			const prevIndex = afterFriendListSearch.findIndex(item => item.key === rowKey);
			afterNewData.push(afterFriendListSearch[prevIndex]);
			setAfterSelectedFriendList(afterNewData)

			// beforeとafterをマージする
			// afterを展開
			const afterData = [...afterNewData]
			// beforeを展開
			const before = [...beforeSelectedFriendList]
			const newData = [...afterData, ...before]
			setMergerdSelectedFriendList(newData)
		}
	}

	// 選択された友達リストの削除
	const _deleteFriendList = (rowKey, type) => {
		if (type === "before") {
			// mergeリストから該当リストを削除
			// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
			const mergedNewData = [...mergedSelectedFriendList];
			// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
			const prev1Index = mergedSelectedFriendList.findIndex(item => item.key === rowKey);
			mergedNewData.splice(prev1Index, 1);
			setMergerdSelectedFriendList(mergedNewData);

			// beforeリストから該当リストを削除
			// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
			const beforeNewData = [...beforeSelectedFriendList];
			// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
			const prev2Index = beforeSelectedFriendList.findIndex(item => item.key === rowKey);
			beforeNewData.splice(prev2Index, 1);
			setBeforeSelectedFriendList(beforeNewData);
		}
		if (type === "after") {
			// mergeリストから該当リストを削除
			// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
			const mergedNewData = [...mergedSelectedFriendList];
			// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
			const prev1Index = mergedSelectedFriendList.findIndex(item => item.key === rowKey);
			mergedNewData.splice(prev1Index, 1);
			setMergerdSelectedFriendList(mergedNewData);

			// afterリストから該当リストを削除
			// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
			const afterNewData = [...afterSelectedFriendList];
			// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
			const prev2Index = afterSelectedFriendList.findIndex(item => item.key === rowKey);
			afterNewData.splice(prev2Index, 1);
			setAfterSelectedFriendList(afterNewData);
		}
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaContainer title={null} type={"searchForm"} searchFormProps={{ "setSearchText": setSearchText, "searchText": searchText, "textInputSearch": textInputSearch, "_searchName": _searchName, "setIsDuringSearch": setIsDuringSearch }} />
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? constantsCommonStyles.withFooterMainContainerStyle : constantsCommonStyles.withFooterMainContainerIphoneXStyle}>
					{/* 選択された友達一覧 */}
					{mergedSelectedFriendList.length !== 0 && (
						<AddFriendList selectedFriendList={mergedSelectedFriendList} deleteFriendList={_deleteFriendList} />
					)}
					{/* タイトル */}
					<AddGroupTitle text={"Friend"} groupMemberCount={null} />
					{/* 友達一覧 */}
					{/* 検索中ではない場合 */}
					{!isDuringSearch && (
						<FriendList listData={beforeFriendListSearch} addFriendList={_addFriendList} deleteFriendList={_deleteFriendList} selectedFriendList={beforeSelectedFriendList} />
					)}
					{/* 検索中の場合 */}
					{isDuringSearch && (
						<FriendList listData={afterFriendListSearch} addFriendList={_addFriendList} deleteFriendList={_deleteFriendList} selectedFriendList={afterSelectedFriendList} />
					)}
				</View>
				{/* 右下のボタン(Next, Create) */}
				<SmallButton text={"Next"} navigation={navigation} friendList={mergedSelectedFriendList} />
				{/*フッター */}
				<Footer navigation={navigation} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
