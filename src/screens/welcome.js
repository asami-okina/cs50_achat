import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, A_CHAT_LOG_SIZE,MAIN_PINK_COLOR,HEAD_CONTAINER_HEIGHT,TOP_AREA_STYLE,TOP_AREA_LEFT_RADIUS,MAIN_TITLE_SIZE,MAIN_TITLE_FONT,START_SCREEN_HEIGHT,STATUS_BAR_HEIGHT,SCREEN_HEIGHT,BIG_BUTTON_HEIGHT,CONTENT_WIDTH,STANDARD_FONT } from '../constants/layout'

export function Welcome({ navigation }) {
	console.log('START_SCREEN_HEIGHT', START_SCREEN_HEIGHT)
	console.log('STATUS_BAR_HEIGHT', STATUS_BAR_HEIGHT)
	console.log('SCREEN_HEIGHT',SCREEN_HEIGHT)
	// フォントがダウンロードできたら、画面を出力する
	return (
		<SafeAreaView style={styles.containerStyle}>
			<View style={styles.headContainerStyle}></View>
			<View style={styles.mainContainerStyle}></View>
			<View style={{minHeight: START_SCREEN_HEIGHT, backgroundColor: MAIN_WHITE_COLOR}}>
				<View style={styles.headMessageContainerStyle}>
					<Text style={styles.headMessageStyle}>Welcome</Text>
				</View>
				<View style={styles.logoContainerStyle}>
					<Image style={styles.logoStyle} source={require("../../assets/images/a-chat-logo-after.png")} />
				</View>
				<View style={styles.bottomStyle}>
					<TouchableOpacity
						style={styles.buttonContainerStyle}
						onPress={() => navigation.navigate('SignUp')}
					>
						<Text style={styles.buttonTextStyle}>Sign Up</Text>
					</TouchableOpacity>
					<View style={styles.toLoginStyle}>
						<Text style={styles.toLoginTextStyle}>Do you have an account?</Text>
						<TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
							<Text style={[styles.toLoginTextStyle, styles.toLoginTextLinkStyle]}>Login here</Text>
						</TouchableOpacity>
					</View>
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
	buttonContainerStyle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: MAIN_NAVY_COLOR,
		width: CONTENT_WIDTH,
		height: BIG_BUTTON_HEIGHT,
		borderRadius: 10,
		fontSize: 18,
	},
	buttonTextStyle: {
		color: MAIN_WHITE_COLOR,
		fontFamily: STANDARD_FONT,
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
