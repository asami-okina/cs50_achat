import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, BUTTON_HEIGHT, CONTENT_WIDTH, STANDARD_FONT, BUTTON_TEXT_SIZE } from '../../constants/layout'

export function Button({ navigation, link, buttonText, enable, scene, loginProps }) {
	return (
		<>
			{
				// ログイン画面の場合
				scene === 'LogIn' ? (
					<TouchableOpacity
						style={loginProps.emailText.length !== 0 && loginProps.passwordText.length !== 0 ? loginProps.executedLoginAuthentication ? loginProps.onFocusInputMailOrPasseword ? styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle] : styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
						onPress={() => {
							if (loginProps.emailText.length !== 0 && loginProps.passwordText.length !== 0) {
								loginProps.onPressFunction()
							}
						}}>
						<Text style={styles.buttonTextStyle}>Log In</Text>
					</TouchableOpacity>
				) : (
					// ログイン以外の画面の場合(scene === 'Welcome' || scene === 'SignUp')
					<TouchableOpacity
						style={enable ? styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
						onPress={() => {
							if (enable) {
								navigation.navigate(link)
							}
						}}
					>
						<Text style={styles.buttonTextStyle}>{buttonText}</Text>
					</TouchableOpacity>
				)
			}
		</>
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

