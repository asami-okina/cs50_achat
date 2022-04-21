// libs
import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, TextInput, StyleSheet, Text } from 'react-native';


// layouts
import { ICON_SIZE, MAIN_NAVY_COLOR, CONTENT_WIDTH } from '../../../constants/layout'


// 丸みを帯びている白いトップ部分
export function GroupImageAndGroupName({
	friendList,
	ownNickName
}) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"
	// グループ画像が設定されているか
	const [isImageSaved, setIsImageSaved] = useState(false)

	// グループ名が設定されているか
	const [isNameSaved, setIsNameSaved] = useState(false)

	// グループ名フォーム
	const [groupName, setGroupName] = useState('')

	// グループ名のラベル化
	let groupNameLabel;

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

	return (
		<View style={styles.wrapperStyle}>
			<View style={styles.groupImageContainerStyle}>
				{/* <Pressable onPress={() => {}} > */}
				<View>
					<View style={styles.circleStyle}></View>
					<Image source={require("../../../../assets/images/camera.png")} style={styles.cameraStyle} />
				</View>
				{/* </Pressable> */}
			</View>
			<View style={styles.groupNameContainertyle}>
				<Pressable onPress={() => groupNameLabel.focus()} >
					<TextInput
						// style={styles.input}
						onChangeText={setGroupName}
						value={groupName}
						placeholder={friendListNames}
						textContentType="username"
						autoCapitalize="none"
						ref={(input) => groupNameLabel = input}
					/>
				</Pressable>
			</View>
		</View>
	);
}

export const styles = StyleSheet.create({
	wrapperStyle: {
		width: CONTENT_WIDTH,
		flexDirection: "row",
	},
	groupImageContainerStyle: {
		width: "30%",
		alignItems: "center",
		justifyContent: "center",
		position: "relative" // 親
	},
	circleStyle: {
		width: 80,
		height: 80,
		borderRadius: 50,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	cameraStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		position: 'absolute', // 子(親要素を基準)
		left: 60,
		bottom: 0,
	},
	groupNameContainertyle: {
		width: "70%",
		justifyContent: "center",
	},
});
