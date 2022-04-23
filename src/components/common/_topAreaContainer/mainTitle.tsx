// libs
import React from 'react';
import { View,  Text, StyleSheet, Image, Pressable } from 'react-native';

// layouts
import {  TAB_FONT, MAIN_NAVY_COLOR, CONTENT_WIDTH } from '../../../constants/layout'

export function MainTitle({ navigation, title, link }) {
	return (
		<View style={styles.titleWrapperStyle}>
		<Pressable onPress={() => { navigation.navigate(link) }} >
			<Image source={require("../../../../assets/images/back-icon.png")} style={styles.backIconStyle} />
		</Pressable>
		<Text style={styles.titleStyle}>{title}</Text>
	</View>
	);
}


const styles = StyleSheet.create({
	titleWrapperStyle: {
		width: CONTENT_WIDTH,
		flexDirection: "row",
		alignItems: "center",
	},
	titleStyle: {
		fontSize: 24,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
		marginLeft: 12,
	},
	backIconStyle: {
		width: 50,
		height: 50,
	},
})
