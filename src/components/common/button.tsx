
// libs
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

// layouts
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, BUTTON_HEIGHT, CONTENT_WIDTH, STANDARD_FONT, BUTTON_TEXT_SIZE, MAIN_GRAY_COLOR, BUTTON_BORDER_RADIUS } from '../../constants/layout'

export function Button({
	navigation,
	link,
	buttonText,
	enable,
	scene,
	propsList
}) {
	return (
		<>
			{
				// ログイン画面の場合
				scene === 'LogIn' ? (
					<TouchableOpacity
						style={propsList.emailText.length !== 0 && propsList.passwordText.length !== 0 ? propsList.executedLoginAuthentication ? propsList.onFocusInputMailOrPasseword ? styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle] : styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
						onPress={() => {
							if (propsList.emailText.length !== 0 && propsList.passwordText.length !== 0) {
								propsList.onPressFunction()
							}
						}}>
						<Text style={styles.buttonTextStyle}>Log In</Text>
					</TouchableOpacity>
				) : (
					// ログイン以外の画面の場合(scene === 'Welcome' || scene === 'SignUp')等
					<TouchableOpacity
						style={enable ? styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
						onPress={() => {
							// プロフィール設定画面にてニックネームの更新
							if (enable && scene === "ProfileSettingNickName" && propsList.nickName.length !== 0 && link) {
								propsList._updateNickName()
								navigation.navigate(link)
							}
							if (enable && link && scene !== "ProfileSettingNickName") {
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
		width: CONTENT_WIDTH,
		height: BUTTON_HEIGHT,
		borderRadius: BUTTON_BORDER_RADIUS,
		fontSize: BUTTON_TEXT_SIZE,
		backgroundColor: MAIN_NAVY_COLOR
	},
	buttonTextStyle: {
		color: MAIN_WHITE_COLOR,
		fontFamily: STANDARD_FONT,
	},
	buttonContainerInvalidStyle: {
		backgroundColor: MAIN_GRAY_COLOR,
	},
});

