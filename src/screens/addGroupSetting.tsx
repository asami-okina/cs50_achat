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

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

// layouts
import { IPHONE_X_BOTTOM_SPACE } from '../constants/layout'

export function AddGroupSetting({ route }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"
	const friendList = route.params.friendList
	const groupMemberCount = friendList.length
	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaContainer title={null} type={"addGroupSetting"} setSearchText={null} searchText={null} textInputSearch={null} searchName={null} fetchGroupCount={null} fetchFriendCount={null} setIsDuringSearch={null} />
				{/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
				<View style={IPHONE_X_BOTTOM_SPACE === 0 ? constantsCommonStyles.withFooterMainContainerStyle : constantsCommonStyles.withFooterMainContainerIphoneXStyle}>
					{/* 選択された友達一覧 */}
					{/* {selectedFriendList.length !== 0 && (
						<AddFriendList selectedFriendList={selectedFriendList} deleteFriendList={deleteFriendList} />
					)} */}
					{/* タイトル */}
					<AddGroupTitle text={"Member"} groupMemberCount={groupMemberCount} />
					{/* 友達一覧 */}
					{/* <FriendList listData={listData} addFriendList={addFriendList} deleteFriendList={deleteFriendList} /> */}
				</View>
				{/* 右下のボタン(Next, Create) */}
				{/* <SmallButton text={"Next"} onPressFunction={() => navigation.navigate('AddGroupSetting')}  /> */}
				{/*フッター */}
				{/* <Footer navigation={navigation} /> */}
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
