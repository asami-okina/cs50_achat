// libs
import React from 'react';
import { View, Pressable, Image, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


// layouts
import { ICON_SIZE, MAIN_NAVY_COLOR, CONTENT_WIDTH, PROFILE_IMAGE_BORDER_RADIUS } from '../../../constants/layout'


// 丸みを帯びている白いトップ部分
export function GroupImageAndGroupName({
	image,
	setImage,
	groupName,
	setGroupName,
	friendListNames
}) {
	// グループ名のラベル化
	let groupNameLabel;

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result: ImageInfo = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});
		if (!result.cancelled) {
			setImage(result.uri);
		}
	};


	return (
		<View style={styles.wrapperStyle}>
			<View style={styles.groupImageContainerStyle}>
				<Pressable onPress={() => { pickImage() }} >
					<View>
						{image ? (
							<Image source={{ uri: image }} style={{ width: 80, height: 80, borderRadius: PROFILE_IMAGE_BORDER_RADIUS, }} />
						) :
							<View style={styles.circleStyle}></View>
						}
						<Image source={require("../../../../assets/images/camera.png")} style={styles.cameraStyle} />
					</View>
				</Pressable>
			</View>
			<View style={styles.groupNameContainertyle}>
				<Pressable onPress={() => groupNameLabel.focus()} >
					<TextInput
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
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
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
