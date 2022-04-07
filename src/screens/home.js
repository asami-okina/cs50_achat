import React, {useEffect, useState} from 'react';
import { Text,View, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, Pressable, Image, TextInput, Dimensions, StyleSheet} from 'react-native';
import { styles } from '../styles/home/home';
import {fetchNickNameOrGroupNameBySearchForm, fetchGroupList, fetGroupCount,fetchFriendList,fetchFriendCount} from '../api/api'

function Home({navigation}) {
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
	function _searchName(searchText){
		let result = fetchNickNameOrGroupNameBySearchForm(searchText);
		// 友達一覧のstateを更新
		if (result[0]["friend"].length !== 0){
			setFriendList(result[0]["friend"])
		}
		// グループ一覧のstateを更新
		if (result[1]["group"].length !== 0){
			setGroupList(result[1]["group"])
		}
	}

	// ユーザが所属するグループ一覧を取得
	function _fetchGroupList(userId){
		let result = fetchGroupList(userId)
		if(result.length !== 0){
			setGroupList(result)
		}
	}

	// ユーザが所属するグループ数を取得
	function _fetGroupCount(userId) {
		let result = fetGroupCount(userId)
		setGroupCount(result)
	}

	// 友達一覧を取得
	function _fetchFriendList(userId){
		let result = fetchFriendList(userId)
		if(result.length !== 0){
			setFriendList(result)
		}
	}

	// 友達数を取得
	function _fetchFriendCount(userId){
		let result = fetchFriendCount(userId)
		setFriendCount(result)
	}

	useEffect(() => {
		if(userId){
			// ユーザが所属するグループ一覧を取得
			_fetchGroupList(userId)
			// ユーザが所属するグループ数を取得
			_fetGroupCount(userId)
			// 友達一覧を取得
			_fetchFriendList(userId)
			// 友達数を取得
			_fetchFriendCount(userId)
		}
	},[])

	// 検索フォームのラベル化
	let textInputSearch;

	// 画面情報を取得
	const { width, height, scale } = Dimensions.get('window');
    return (
    <KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
        <SafeAreaView style={styles.containerStyle}>
            <ScrollView style={styles.containerStyle}>
							<View style={styles.headContainerStyle}></View>
                <View style={styles.mainContainerStyle}>
									{/* 検索フォーム */}
									<View style={styles.searchWrapperStyle}>
										<Pressable style={styles.searchContainerStyle} onPress={() => textInputSearch.focus()} >
												<View style={styles.searchViewStyle}>
														<TextInput
																onChangeText={setSearchText}
																style={styles.searchContentStyle}
																value={searchText}
																placeholder="Search by name"
																ref={(input) => textInputSearch = input}
																autoCapitalize="none"
																textContentType="username"
																onFocus={() => {
																}}
																onEndEditing={() => {
																	_searchName()
																}}
														/>
														<Image source={require("../../assets/images/search.png")} style={styles.searchIconStyle} onPress={() => textInputEmail.focus()}/>
												</View>
										</Pressable>
									</View>
								</View>
								<View style={styles.searchBoxStyle}>
								</View>
								{/* グループ一覧 */}
								<View style={styles.groupAndFriendWrapperStyle}>
									<View style={styles.groupAndFriendContainerStyle}>
										<View style={styles.topContainerStyle}>
											<Text style={styles.titleStyle}>Group</Text>
											<Text style={styles.countStyle}>{groupCount}</Text>
											<View style={styles.iconsBoxStyle}>
												<Pressable>
													<Image source={require("../../assets/images/plus.png")} style={styles.plusIconStyle}/>
												</Pressable>
												<Pressable onPress={() => setOpenGroupList(!openGroupList)}>
													<Image source={require("../../assets/images/open.png")}style={styles.openIconStyle}/>
												</Pressable>
											</View>
										</View>
										{/* グループ一覧をmapで回して表示 */}
										{openGroupList && groupList.length != 0 && groupList.map((list) => {
											return (
												<View style={styles.listWrapperStyle} key={list.group_chat_room_id}>
												<Pressable style={styles.listItemContainerStyle}>
													<Image source={list.group_image} style={styles.profileImageStyle}/>
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
													<Image source={require("../../assets/images/plus.png")} style={styles.plusIconStyle}/>
												</Pressable>
												<Pressable onPress={() => setOpenFriendList(!openFriendList)}>
													<Image source={require("../../assets/images/open.png")}style={styles.openIconStyle}/>
												</Pressable>
											</View>
										</View>
										{/* 友達一覧をmapで回して表示 */}
										{openFriendList && friendList.length != 0 && friendList.map((list) => {
											return (
												<View style={styles.listWrapperStyle} key={list.direct_chat_room_id}>
												<Pressable style={styles.listItemContainerStyle}>
													<Image source={list.friend_profile_image} style={styles.profileImageStyle}/>
													<Text style={styles.listItemNameStyle}>{list.friend_nickname}</Text>
												</Pressable>
											</View>
											)
										})}
									</View>
								</View>
								<View style={{height: height - 200, backgroundColor: "#feffff"}}></View>
            </ScrollView>
						{/*フッター */}
						<View style={styles.footerStyle}>
							<Pressable style={styles.footerItemStyle}>
								<Image source={require('../../assets/images/home.png')}/>
								<Text style={styles.footerTextStyle}>Home</Text>
							</Pressable>
							<Pressable style={styles.footerItemStyle}>
								<Image source={require('../../assets/images/message.png')}/>
								<Text style={styles.footerTextStyle}>Chats</Text>
							</Pressable>
							<Pressable style={styles.footerItemStyle}>
							<Image source={require('../../assets/images/white_profile.png')}/>
							<Text style={styles.footerTextStyle}>Profile</Text>
							</Pressable>
						</View>
        </SafeAreaView>
    </KeyboardAvoidingView>
    );
}


export default Home;
