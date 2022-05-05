// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, StyleSheet, Image, Text } from 'react-native';

// components
import { TopAreaWrapper } from "../../../components/common/topAreaWrapper"
import { Header } from '../_clickedFriendIcon/_alreadyFriendModal/header';
import { Button } from "../../../components/common/button"

// constantsCommonStyles
import { constantsCommonStyles } from '../../../constants/styles/commonStyles'

// layouts
import { MAIN_NAVY_COLOR, PROFILE_IMAGE_BORDER_RADIUS, TAB_TITLE_TEXT_SIZE, TAB_FONT } from '../../../constants/layout'

export function AlreadyFriendModal({ route, navigation }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"
	const { user, groupChatRoomId, groupImage, groupName } = route.params
	const friendImage = user.avatar
	const friendNickName = user.name
	const friendUserId = user._id
	const [directChatRoomId, setDirectChatRoomId] = useState('')
	console.log('friendImage', friendImage)

	// 該当友達とのdirectChatRoomIdを取得
	async function fetchDirectChatRoomIdByUserId() {
		try {
			// paramsを生成
			const params = { "friendUserId": friendUserId }
			const query_params = new URLSearchParams(params);
			// APIリクエスト
			const response = await fetch(`https://a-chat/api/users/${userId}/friend?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})
			// レスポンスをJSONにする
			const parse_response = await response.json()
			setDirectChatRoomId(parse_response.directChatRoomId)
		} catch (e) {
			console.error(e)
		}
	}
	useEffect(() => {
		if (userId) {
			fetchDirectChatRoomIdByUserId()
		}
	}, [friendUserId])

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"alreadyFriendModal"}>
					<Header navigation={navigation} groupChatRoomId={groupChatRoomId} groupImage={groupImage} groupName={groupName} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分*/}
				<View style={constantsCommonStyles.mainContainerStyle}>
					<View style={styles.profileImageWrapperStyle} >
						{friendImage ? (
							<Image source={friendImage} style={{ width: 80, height: 80, borderRadius: PROFILE_IMAGE_BORDER_RADIUS, }} />
						) :
							<View style={styles.circleStyle}></View>
						}
						<View style={styles.friendNickNameContainerStyle}>
							<Text style={styles.friendNickNameStyle}>{friendNickName}</Text>
						</View>
						<Button navigation={navigation} link={null} buttonText={'Talk'} enable={true} scene={'alreadyFriendModal'} propsList={{ "directChatRoomId": directChatRoomId, "friendImage": friendImage, "friendNickName": friendNickName }} />
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}


const styles = StyleSheet.create({
	profileImageWrapperStyle: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 100,
	},
	circleStyle: {
		width: 80,
		height: 80,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	friendNickNameContainerStyle: {
		marginTop: 20,
		marginBottom: 20
	},
	friendNickNameStyle: {
		fontSize: TAB_TITLE_TEXT_SIZE,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
	},
})
