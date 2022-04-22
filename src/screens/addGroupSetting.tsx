// libs
import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, StyleSheet, Image, Text, ScrollView, Pressable } from 'react-native';

// components
import { AddGroupTitle } from '../components/addGroup/addGroupTitle'
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { GroupImageAndGroupName } from "../components/common/_topAreaContainer/groupImageAndGroupName"
import { AddFriendList } from '../components/addGroup/addFriendList'
import { SmallButton } from "../components/common/smallButton"

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// layouts
import { IPHONE_X_BOTTOM_SPACE, PROFILE_IMAGE_SIZE } from '../constants/layout'

// constantsSelectedFriendStyles
import { selectedFriendStyles } from '../constants/styles/selectedFriendStyles'

export function AddGroupSetting({ route, navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"
	const [friendList, setFriendList] = useState(route.params.friendList)
	const groupMemberCount = friendList.length + 1 // 自分を1としてカウントし、足す

	// 自分のニックネーム
	const [ownNickName, setOwnNickName] = useState('')
	// 自分のプロフィール画像
	const [ownProfileImage, setOwnProfileImage] = useState('')

	// グループ画像
	const [image, setImage] = useState(null)

	// グループ名のplaceholderを生成
	let friendListNames = ''
	if (ownNickName && friendList) {
		// 一番最初に選んだメンバーの名前を取得
		friendListNames = `${ownNickName}`
		// 選択された友達リストからニックネームだけを取り出す
		for (let i = 0; i < friendList.length; i++) {
			friendListNames = friendListNames + ', ' + friendList[i].friend_nickname
		}
	}

	// グループ名
	const [groupName, setGroupName] = useState(friendListNames)

	// 選択された友達リストの削除
	const _deleteFriendList = (rowKey) => {
		// 選択されたリストから該当リストを削除
		// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
		const newData = [...friendList];
		// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
		const prev2Index = friendList.findIndex(item => item.key === rowKey);
		newData.splice(prev2Index, 1);
		setFriendList(newData);
	}

	// [自分の情報]ユーザーIDに紐づくニックネーム、プロフィール画像の取得
	async function _fetchProfileByUserId(userId) {
		try {
			// APIリクエスト
			const response = await fetch(`https://a-chat/api/users/${userId}/profile`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			// 自分のニックネームの設定
			if (parse_response.nickName) {
				setOwnNickName(parse_response.nickName)
			}
			if (parse_response.profileImage) {
				setOwnProfileImage(parse_response.profileImage)
			}
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (userId) {
			_fetchProfileByUserId(userId)
		}
	}, [])

	// refの生成
	const scrollViewRef = useRef<any>();

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"addGroupSetting"}>
					<GroupImageAndGroupName image={image} setImage={setImage} groupName={groupName} setGroupName={setGroupName} friendListNames={friendListNames} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? constantsCommonStyles.withFooterMainContainerStyle : constantsCommonStyles.withFooterMainContainerIphoneXStyle}>
					{/* タイトル */}
					<AddGroupTitle text={"Member"} groupMemberCount={groupMemberCount} />
					<View style={selectedFriendStyles.wrapperStyle}>
						<View style={selectedFriendStyles.containerStyle} >
							{/* 追加ボタン */}
							<Pressable style={styles.ownWrapperStyle} onPress={() => navigation.navigate('AddGroup', { friendList: friendList })}>
								<View style={selectedFriendStyles.closeImageStyle}></View>
								<Image source={require("../../assets/images/add-circle.png")} style={selectedFriendStyles.profileImageStyle} />
								<Text style={selectedFriendStyles.listItemNameStyle} numberOfLines={1} ellipsizeMode="tail"></Text>
							</Pressable>
							{/* 自分 */}
							{ownNickName.length !== 0 && ownProfileImage.length !== 0 && (
								<View style={styles.ownWrapperStyle}>
									<View style={selectedFriendStyles.closeImageStyle}></View>
									<Image source={require("../../assets/images/friend_profile_image_1.jpg")} style={selectedFriendStyles.profileImageStyle} />
									<Text style={selectedFriendStyles.listItemNameStyle} numberOfLines={1} ellipsizeMode="tail">{ownNickName}</Text>
								</View>
							)}
							<ScrollView
								ref={scrollViewRef}
								onContentSizeChange={() => { }}
								horizontal={true} // スクロールバーを水平方向にする
								showsHorizontalScrollIndicator={false} // 水平スクロールバー非表示
								style={styles.scrollViewStyle}
							>
								{/* 選択された友達一覧 */}
								{friendList.length !== 0 && (
									<AddFriendList selectedFriendList={friendList} deleteFriendList={_deleteFriendList} />
								)}
							</ScrollView>
						</View>
					</View>
				</View>
				{/* 右下のボタン(Create) */}
				{friendListNames.length !== 0 && (
					<SmallButton text={"Create"} navigation={navigation} friendList={friendList} groupSetting={{ "groupName": groupName, "image": image }} type={"addGroupSetting"} friendListNames={friendListNames} />
				)}
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	ownWrapperStyle: {
		justifyContent: "center",
		alignItems: "center",
	},
	scrollViewStyle: {
		flex: 1,
	},
	addCircleContainerStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	addCircleStyle: {
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
	}
})

