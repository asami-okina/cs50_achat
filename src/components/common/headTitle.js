import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, A_CHAT_LOG_SIZE,MAIN_PINK_COLOR,HEAD_CONTAINER_HEIGHT,TOP_AREA_STYLE,TOP_AREA_LEFT_RADIUS,MAIN_TITLE_SIZE,MAIN_TITLE_FONT,START_SCREEN_HEIGHT,BUTTON_HEIGHT,CONTENT_WIDTH,STANDARD_FONT,BUTTON_TEXT_SIZE } from '../../constants/layout'

export function HeadTitle({ navigation, title }) {
	// フォントがダウンロードできたら、画面を出力する
	return (
		<View style={styles.headMessageContainerStyle}>
			<Text style={styles.headMessageStyle}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	headMessageContainerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		alignItems: 'center',
	},
	headMessageStyle: {
		fontSize: MAIN_TITLE_SIZE,
		fontFamily: MAIN_TITLE_FONT,
		color: MAIN_NAVY_COLOR,
	},
});
