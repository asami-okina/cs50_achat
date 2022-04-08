import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Pressable, Image, TextInput, StyleSheet } from 'react-native';
import { fetchNickNameOrGroupNameBySearchForm, fetchGroupList, fetGroupCount, fetchFriendList, fetchFriendCount } from '../api/api'
import { WITH_FOOTER_OPERATION_SCREEN_HEIGHT, HEAD_CONTAINER_HEIGHT, TOP_AREA_STYLE, SEARCH_FORM_HEIGHT, CONTENT_WIDTH, ICON_SIZE, MAIN_NAVY_COLOR, MAIN_WHITE_COLOR,IN_SEARCH_FORM_SIDE_MARGIN } from '../constants/layout'
import { Footer } from '../components/common/footer'
import {TopAreaContainer} from '../components/common/topAreaContainer'

// constantsStyles
import {constantsStyles} from '../constants/styles'

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
				<TopAreaContainer  title={null} searchForm={true} searchFormProps={{"setSearchText": setSearchText, "searchText": searchText, "textInputSearch": textInputSearch, "_searchName": _searchName }}/>
				{/* トップ部分を除くメイン部分 */}
				<ScrollView style={constantsStyles.withFooterMainContainerStyle}>
						{/* グループ一覧 */}
						<View style={styles.groupAndFriendWrapperStyle}>
							<View style={styles.groupAndFriendContainerStyle}>
								<View style={styles.topContainerStyle}>
									<Text style={styles.titleStyle}>Group</Text>
									<Text style={styles.countStyle}>{groupCount}</Text>
									<View style={styles.iconsBoxStyle}>
										<Pressable>
											<Image source={require("../../assets/images/plus.png")} style={styles.plusIconStyle} />
										</Pressable>
										<Pressable onPress={() => setOpenGroupList(!openGroupList)}>
											<Image source={require("../../assets/images/open.png")} style={styles.openIconStyle} />
										</Pressable>
									</View>
								</View>
								{/* グループ一覧をmapで回して表示 */}
								{openGroupList && groupList.length != 0 && groupList.map((list) => {
									return (
										<View style={styles.listWrapperStyle} key={list.group_chat_room_id}>
											<Pressable style={styles.listItemContainerStyle}>
												<Image source={list.group_image} style={styles.profileImageStyle} />
												<Text style={styles.listItemNameStyle}>{list.group_name}</Text>
											</Pressable>
										</View>
									)
								})}
							</View>
						</View>
						{/* 友達一覧 */}
						<View style={styles.groupAndFriendWrapperStyle}>
							<View style={styles.groupAndFriendContainerStyle}>
								<View style={styles.topContainerStyle}>
									<Text style={styles.titleStyle}>Friend</Text>
									<Text style={styles.countStyle}>{friendCount}</Text>
									<View style={styles.iconsBoxStyle}>
										<Pressable>
											<Image source={require("../../assets/images/plus.png")} style={styles.plusIconStyle} />
										</Pressable>
										<Pressable onPress={() => setOpenFriendList(!openFriendList)}>
											<Image source={require("../../assets/images/open.png")} style={styles.openIconStyle} />
										</Pressable>
									</View>
								</View>
								{/* 友達一覧をmapで回して表示 */}
								{openFriendList && friendList.length != 0 && friendList.map((list) => {
									return (
										<View style={styles.listWrapperStyle} key={list.direct_chat_room_id}>
											<Pressable style={styles.listItemContainerStyle}>
												<Image source={list.friend_profile_image} style={styles.profileImageStyle} />
												<Text style={styles.listItemNameStyle}>{list.friend_nickname}</Text>
											</Pressable>
										</View>
									)
								})}
							</View>
						</View>
				</ScrollView>
				{/*フッター */}
				<Footer />
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

export const styles = StyleSheet.create({
	groupAndFriendWrapperStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR
	},
	groupAndFriendContainerStyle: {
		display: "flex",
		justifyContent: "center",
		backgroundColor: MAIN_WHITE_COLOR,
		width: CONTENT_WIDTH,
	},
	topContainerStyle: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	iconsBoxStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "40%",
	},
	plusIconStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
	openIconStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
	titleStyle: {
		fontFamily: "MPLUS1p_700Bold",
		fontSize: 36,
	},
	countStyle: {
		fontFamily: "MPLUS1p_400Regular",
		fontSize: 36,
	},
	listWrapperStyle: {
		height: 60,
		width: CONTENT_WIDTH,
		display: "flex",
		justifyContent: "center",
		marginBottom: 5,
	},
	listItemContainerStyle: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	profileImageStyle: {
		width: 50,
		height: 50,
		borderRadius: 50
	},
	listItemNameStyle: {
		fontFamily: "ABeeZee_400Regular",
		marginLeft: 12,
	}
});
