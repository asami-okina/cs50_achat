// libs
import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// layouts
import { MAIN_NAVY_COLOR, PROFILE_IMAGE_BORDER_RADIUS } from '../../constants/layout'

export function ProfileImage({ image, setImage }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// プロフィール画像の更新
	async function _updateProfileImage(newImageUri) {
		try {
			// APIリクエスト
			const bodyData = {
				"profileImage": newImageUri,
			}
			const response = await fetch(`https://a-chat/api/users/${userId}/profile`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
		} catch (e) {
			console.error(e)
		}
	}

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result: any = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});
		if (!result.cancelled) {
			// リレンダーのタイミングまでstateが変わらないので、変更値を変数に保持して、useStateや関数に渡す
			const newImageUri = result.uri
			setImage(newImageUri);
			// プロフィール画像更新APIを実行
			_updateProfileImage(newImageUri)
		}
	};

	return (
		<Pressable onPress={() => { pickImage() }} style={styles.profileImageContainerStyle}>
			<View style={styles.addImageContainerStyle}>
				<Image source={require('../../../assets/images/add-circle.png')} style={styles.addImageStyle} />
			</View>
			{image ? (
				<Image source={{ uri: image }} style={{ width: 80, height: 80, borderRadius: PROFILE_IMAGE_BORDER_RADIUS, }} />
			) :
				<View style={styles.circleStyle}></View>
			}
		</Pressable>
	);
}


const styles = StyleSheet.create({
	profileImageContainerStyle: {
		marginTop: 32
	},
	addImageContainerStyle: {
		position: "absolute",
		left: 65,
		top: -5,
		zIndex: 1,
	},
	addImageStyle: {
		width: 40,
		height: 40,
	},
	circleStyle: {
		width: 80,
		height: 80,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
	},
})
