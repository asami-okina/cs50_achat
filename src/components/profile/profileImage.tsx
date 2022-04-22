// libs
import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// layouts
import { MAIN_NAVY_COLOR, PROFILE_IMAGE_BORDER_RADIUS } from '../../constants/layout'

export function ProfileImage({ image, setImage }) {

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result: any = await ImagePicker.launchImageLibraryAsync({
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
