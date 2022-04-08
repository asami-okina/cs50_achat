import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, A_CHAT_LOG_SIZE,MAIN_PINK_COLOR,HEAD_CONTAINER_HEIGHT,TOP_AREA_STYLE,TOP_AREA_LEFT_RADIUS,MAIN_TITLE_SIZE,MAIN_TITLE_FONT,START_SCREEN_HEIGHT,BUTTON_HEIGHT,CONTENT_WIDTH,STANDARD_FONT,BUTTON_TEXT_SIZE } from '../../constants/layout'

export function AChatLogo() {
	// フォントがダウンロードできたら、画面を出力する
	return (
	<View style={styles.logoContainerStyle}>
		<Image style={styles.logoStyle} source={require("../../../assets/images/a-chat-logo-after.png")} />
	</View>
	);
}

const styles = StyleSheet.create({
	logoContainerStyle: {
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR,
	},
	logoStyle: {
		width: A_CHAT_LOG_SIZE,
		height: A_CHAT_LOG_SIZE,
	},
});
