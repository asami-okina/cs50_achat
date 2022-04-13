// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Text,Modal,Pressable,StyleSheet } from 'react-native';

// components
import { Footer } from '../components/common/footer'
import { TopAreaContainer } from '../components/common/topAreaContainer'
import { FriendAndGroupList } from '../components/home/friendAndgroupList'
import { FriendOrGroupSelectTab } from '../components/common/friendOrGroupSelectTab'
import { AddButton } from '../components/common/addButton'

// apis
import { fetchNickNameOrGroupNameBySearchForm, fetchGroupList, fetGroupCount, fetchFriendList, fetchFriendCount } from '../api/api'

// constantsStyles
import { constantsStyles } from '../constants/styles'

// constantsLayout
import { IPHONE_X_BOTTOM_SPACE,CONTENT_WIDTH,MAIN_NAVY_COLOR,MAIN_PINK_COLOR, MAIN_GRAY_COLOR,MORDAL_WIDTH,MORDAL_TEXT_CONTENT_WIDTH } from '../constants/layout'

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

	// 削除時のモーダルでCancelを押したかどうか
	const [clickedCancelMordal, setClickedCancelMordal] = useState(false)

	// 削除時のモーダルでOkを押したかどうか
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
		<KeyboardAvoidingView behavior="padding" style={constantsStyles.screenContainerStyle}>
			<SafeAreaView style={constantsStyles.screenContainerStyle}>
				{/* Delete確認モーダル */}
				<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>When you leave a group, the group member list and all group talk history will be deleted. Do you want to leave the group?</Text>
            <View style={styles.borderStyle}>

						</View>
						<View style={styles.buttonContainerStyle}>
							<Pressable
								style={[styles.button, styles.cancelButtonStyle]}
								onPress={() => {
									setModalVisible(false)
									setClickedCancelMordal(true)
									console.log('cancel')
								}}
							>
								<Text style={styles.cancelTextStyle}>Cancel</Text>
							</Pressable>
							<Pressable
								style={[styles.button, styles.okButtonStyle]}
								onPress={() => {
									setModalVisible(!modalVisible)
									setClickedOkMordal(true)
								}}
							>
								<Text style={styles.okTextStyle}>Ok</Text>
							</Pressable>
						</View>
          </View>
        </View>
      </Modal>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaContainer title={null} searchForm={true} searchFormProps={{ "setSearchText": setSearchText, "searchText": searchText, "textInputSearch": textInputSearch, "_searchName": _searchName }} />
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? constantsStyles.withFooterMainContainerStyle : constantsStyles.withFooterMainContainerIphoneXStyle}>
					{/* FriendとGroupの選択タブ */}
					<FriendOrGroupSelectTab setOpenFriendList={setOpenFriendList} setOpenGroupList={setOpenGroupList} openFriendList={openFriendList} openGroupList={openGroupList} friendCount={friendCount} groupCount={groupCount} />
					{/* 友達一覧 */}
					{openFriendList && (
						<FriendAndGroupList friendListProps={{ "friendCount": friendCount, "setOpenFriendList": setOpenFriendList, "openFriendList": openFriendList, "friendList": friendList }} groupListProps={null} type={"Friend"} setModalVisible={setModalVisible} clickedCancelMordal={clickedCancelMordal} setClickedCancelMordal={setClickedCancelMordal} clickedOkMordal={clickedOkMordal} setClickedOkMordal={setClickedOkMordal}/>
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#feffff",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
		width: MORDAL_WIDTH,
  },
  button: {
    padding: 10,
    elevation: 2,
		width: "50%",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  cancelButtonStyle: {
    borderBottomLeftRadius: 20,
  },
	okButtonStyle: {
    borderBottomRightRadius: 20,
		borderLeftColor: MAIN_GRAY_COLOR,
		borderLeftWidth: 0.5,
	},
	cancelTextStyle: {
		color: MAIN_NAVY_COLOR,
    fontWeight: "bold",
    textAlign: "center",
		fontFamily: "ABeeZee_400Regular"
	},
  okTextStyle: {
    color: MAIN_PINK_COLOR,
    fontWeight: "bold",
    textAlign: "center",
		fontFamily: "ABeeZee_400Regular",
  },
  modalText: {
    textAlign: "center",
		width: MORDAL_TEXT_CONTENT_WIDTH,
		marginTop: ((MORDAL_WIDTH) - (MORDAL_TEXT_CONTENT_WIDTH)) / 2,
		marginBottom: ((MORDAL_WIDTH) - (MORDAL_TEXT_CONTENT_WIDTH)) / 2,
		fontFamily: "ABeeZee_400Regular"
  },
	buttonContainerStyle:{
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 50,
	},
	borderStyle: {
		// bordeBottomrColor: MAIN_GRAY_COLOR,
		// borderBottomWidth: 0.5,
		borderBottomColor: MAIN_GRAY_COLOR,
		borderBottomWidth: 0.5,
		width: MORDAL_WIDTH,
	}
});
