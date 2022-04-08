import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, A_CHAT_LOG_SIZE,MAIN_PINK_COLOR,HEAD_CONTAINER_HEIGHT,TOP_AREA_STYLE,TOP_AREA_LEFT_RADIUS,MAIN_TITLE_SIZE,MAIN_TITLE_FONT,START_SCREEN_HEIGHT,BUTTON_HEIGHT,CONTENT_WIDTH,STANDARD_FONT,BUTTON_TEXT_SIZE } from '../constants/layout'
import {Button} from '../components/common/button'
import { HeadTitle } from '../components/common/headTitle';
import {AChatLogo} from '../components/common/aChatLogo'
import {ToSignUpOrLoginTextArea} from '../components/common/toSignUpOrLoginTextArea'

export function Welcome({ navigation }) {
	// フォントがダウンロードできたら、画面を出力する
	return (
		<SafeAreaView style={styles.containerStyle}>
			<View style={styles.headContainerStyle}></View>
			<View style={styles.mainContainerStyle}></View>
			<View style={{minHeight: START_SCREEN_HEIGHT, backgroundColor: MAIN_WHITE_COLOR}}>
				{/* タイトル */}
				<HeadTitle navigation={navigation} title={"Welcome"} />
				{/* A-Chatロゴ */}
				<AChatLogo />
				<View style={styles.bottomStyle}>
					{/* 遷移ボタン */}
					<Button navigation={navigation} link={'SignUp'} buttonText={'Sign Up'}/>
					{/* サインアップまたはログインへのリンク */}
					<ToSignUpOrLoginTextArea navigation={navigation} description={'Do you have an account?'} link={'LogIn'} linkText={'Login'}/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	headContainerStyle: {
		height: HEAD_CONTAINER_HEIGHT,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	headMessageContainerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		alignItems: 'center',
	},
	mainContainerStyle: {
		height: TOP_AREA_STYLE,
		backgroundColor: MAIN_WHITE_COLOR,
		borderTopLeftRadius: TOP_AREA_LEFT_RADIUS,
		alignItems: 'center',
	},
	headMessageStyle: {
		fontSize: MAIN_TITLE_SIZE,
		fontFamily: MAIN_TITLE_FONT,
		color: MAIN_NAVY_COLOR,
	},
	logoContainerStyle: {
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR,
	},
	logoStyle: {
		width: A_CHAT_LOG_SIZE,
		height: A_CHAT_LOG_SIZE,
	},
	bottomStyle: {
		alignItems: "center",
		flex: 1,
		backgroundColor: MAIN_WHITE_COLOR,
	},
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
