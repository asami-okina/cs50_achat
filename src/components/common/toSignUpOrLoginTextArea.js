import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, A_CHAT_LOG_SIZE,MAIN_PINK_COLOR,HEAD_CONTAINER_HEIGHT,TOP_AREA_STYLE,TOP_AREA_LEFT_RADIUS,MAIN_TITLE_SIZE,MAIN_TITLE_FONT,START_SCREEN_HEIGHT,BUTTON_HEIGHT,CONTENT_WIDTH,STANDARD_FONT,BUTTON_TEXT_SIZE } from '../../constants/layout'

// SignUp,LogIn画面のアカウントを持っているか確認している部分
export function ToSignUpOrLoginTextArea({ navigation, description, link, linkText }) {
	return (
		<View style={styles.toLoginStyle}>
			<Text style={styles.toLoginTextStyle}>{description}</Text>
			<TouchableOpacity onPress={() => navigation.navigate(link)}>
				<Text style={[styles.toLoginTextStyle, styles.toLoginTextLinkStyle]}>{linkText} here</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	toLoginStyle: {
		marginTop: 10,
		flexDirection: "row",
	},
	toLoginTextStyle: {
		fontFamily: STANDARD_FONT,
	},
	toLoginTextLinkStyle: {
		color: MAIN_PINK_COLOR,
		marginLeft: 10,
	},
});
