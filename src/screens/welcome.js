import React from 'react';
import {
	Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity
} from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR } from '../constants/layout'

export function Welcome({ navigation }) {
	// フォントがダウンロードできたら、画面を出力する
	return (
		<SafeAreaView style={styles.containerStyle}>
			<View style={styles.headContainerStyle}></View>
			<View style={styles.mainContainerStyle}></View>
			<View style={styles.paddingStyle}></View>
			<View style={styles.headMessageContainerStyle}>
				<Text style={styles.headMessageStyle}>Welcome</Text>
			</View>
			<View style={styles.paddingStyle}></View>
			<View style={styles.logoContainerStyle}>
				<Image style={styles.logoStyle} source={require("../../assets/images/a-chat-logo-after.png")} />
			</View>
			<View style={styles.paddingStyle}></View>
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	headContainerStyle: {
		width: "100%",
		height: "10%",
		backgroundColor: MAIN_NAVY_COLOR
	},
	headMessageContainerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		alignItems: 'center',
	},
	mainContainerStyle: {
		width: "100%",
		height: "15%",
		backgroundColor: MAIN_WHITE_COLOR,
		borderTopLeftRadius: 50,
		alignItems: 'center',
	},
	headMessageStyle: {
		fontSize: 50,
		fontFamily: "AlfaSlabOne_400Regular",
		color: MAIN_NAVY_COLOR,
	},
	paddingStyle: {
		height: "4%",
		backgroundColor: MAIN_WHITE_COLOR,
		// backgroundColor: "red"
	},
	logoContainerStyle: {
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR,
	},
	logoStyle: {
		width: 250,
		height: 250,
	},
	bottomStyle: {
		alignItems: "center",
		height: "48%",
		backgroundColor: MAIN_WHITE_COLOR,
	},
	buttonContainerStyle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: MAIN_NAVY_COLOR,
		width: 247,
		height: "15%",
		borderRadius: 10,
		fontSize: 18,
	},
	buttonTextStyle: {
		color: MAIN_WHITE_COLOR,
		fontFamily: "ABeeZee_400Regular_Italic",
	},
	toLoginStyle: {
		marginTop: 10,
		height: "5%",
		flexDirection: "row"
	},
	toLoginTextStyle: {
		fontFamily: "ABeeZee_400Regular_Italic",
	},
	toLoginTextLinkStyle: {
		color: "#ED195E",
		marginLeft: 10,
	},
});
