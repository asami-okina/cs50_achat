import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, A_CHAT_LOG_SIZE,MAIN_PINK_COLOR,HEAD_CONTAINER_HEIGHT,TOP_AREA_STYLE,TOP_AREA_LEFT_RADIUS,MAIN_TITLE_SIZE,MAIN_TITLE_FONT,START_SCREEN_HEIGHT,BUTTON_HEIGHT,CONTENT_WIDTH,STANDARD_FONT,BUTTON_TEXT_SIZE } from '../../constants/layout'

export function Button({ navigation,link,buttonText, enable }) {
	return (
		<TouchableOpacity
			style={enable ? styles.buttonContainerStyle: [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
			onPress={() => {
				if (enable){
					navigation.navigate(link)
				}
			}}
		>
			<Text style={styles.buttonTextStyle}>{buttonText}</Text>
		</TouchableOpacity>
	);
}


const styles = StyleSheet.create({
	buttonContainerStyle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: MAIN_NAVY_COLOR,
		width: CONTENT_WIDTH,
		height: BUTTON_HEIGHT,
		borderRadius: 10,
		fontSize: BUTTON_TEXT_SIZE,
		backgroundColor: MAIN_NAVY_COLOR
	},
	buttonTextStyle: {
		color: MAIN_WHITE_COLOR,
		fontFamily: STANDARD_FONT,
	},
	buttonContainerInvalidStyle: {
		backgroundColor: "#C5C5C7",
	},
});

