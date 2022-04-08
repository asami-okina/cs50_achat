import React, { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { MailForm } from '../components/logIn/mailForm';
import { PasswordForm } from '../components/logIn/passwordForm';
import { postLoginAuthentication } from '../api/api';
import { CONTENT_WIDTH, BUTTON_HEIGHT, MAIN_NAVY_COLOR, MAIN_WHITE_COLOR,MAIN_PINK_COLOR,MAIN_TITLE_FONT,STANDARD_FONT } from '../constants/layout'

export function LogIn({ navigation }) {
	// キーボードに完了ボタンを表示
	const inputAccessoryViewID = 'uniqueID';

	// メールアドレスの入力フォーム
	const [emailText, setEmailText] = useState("");

	// パスワードの入力フォーム
	const [passwordText, setPasswordText] = useState("");

	// メールアドレスもしくはパスワード入力中
	const [onFocusInputMailOrPasseword, setOnFocusInputMailOrPasseword] = useState(false)

	// ログインボタンをしたかどうか
	const [executedLoginAuthentication, setExecutedLoginAuthentication] = useState(false)


	// ログイン認証
	function loginAuthentication() {
		// resultには、APIからの戻り値を入れる
		let result = postLoginAuthentication(emailText, passwordText)
		if (result.certificationResult) {
			// Home画面へ遷移
			navigation.navigate('Home')
		} else {
			// ログインボタンを押した
			setExecutedLoginAuthentication(true)
			setOnFocusInputMailOrPasseword(false)
		}
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
			<SafeAreaView style={styles.containerStyle}>
				<ScrollView style={styles.containerStyle}>
					<View style={styles.headContainerStyle}></View>
					<View style={styles.mainContainerStyle}></View>
					<View style={styles.headMessageContainerStyle}>
						<Text style={styles.headMessageTextStyle}>Log In</Text>
					</View>
					{/* ログイン認証エラー */}
					{executedLoginAuthentication ? onFocusInputMailOrPasseword ? null : (
						<View style={styles.errorContainerStyle}>
							<Text style={styles.errorTextStyle}>Your e-mail address or password is incorrect.</Text>
						</View>
					) : null}
					{/* Email */}
					<MailForm
						inputAccessoryViewID={inputAccessoryViewID}
						emailText={emailText}
						setEmailText={setEmailText}
						executedLoginAuthentication={executedLoginAuthentication}
						onFocusInputMailOrPasseword={onFocusInputMailOrPasseword}
						setOnFocusInputMailOrPasseword={setOnFocusInputMailOrPasseword}
					/>
					{/* Password */}
					<PasswordForm
						inputAccessoryViewID={inputAccessoryViewID}
						passwordText={passwordText}
						setPasswordText={setPasswordText}
						executedLoginAuthentication={executedLoginAuthentication}
						onFocusInputMailOrPasseword={onFocusInputMailOrPasseword}
						setOnFocusInputMailOrPasseword={setOnFocusInputMailOrPasseword}
					/>
					{/* パスワードを忘れた場合 */}
					<View style={styles.forgotPasswordWrapperStyle}>
						<TouchableOpacity style={styles.forgotPasswordContainerStyle} onPress={() => console.log('検討予定')}>
							<Text style={styles.forgotPasswordTextStyle}>Forgot Password</Text>
						</TouchableOpacity>
					</View>
					{/* 画面下 */}
					<View style={styles.bottomStyle}>
						<TouchableOpacity
							style={emailText.length !== 0 && passwordText.length !== 0 ? executedLoginAuthentication ? onFocusInputMailOrPasseword ? styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle] : styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
							onPress={() => {
								if (emailText.length !== 0 && passwordText.length !== 0) {
									loginAuthentication()
								}
							}}>
							<Text style={styles.buttonTextStyle}>Log In</Text>
						</TouchableOpacity>
						<View style={styles.toLoginStyle}>
							<Text style={styles.toLoginTextStyle}>Don't have an account?</Text>
							<TouchableOpacity onPress={() => {
								navigation.navigate('SignUp');
							}}>
								<Text style={[styles.toLoginTextStyle, styles.toLoginTextLinkStyle]}>Sign up here</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

export const styles = StyleSheet.create({
	// ヘッダー
	containerStyle: {
		flex: 1,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	headContainerStyle: {
		height: "10%",
		height: 40,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	headMessageContainerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		alignItems: 'center',
	},
	headMessageTextStyle: {
		fontSize: 50,
		fontFamily: MAIN_TITLE_FONT,
		color: MAIN_NAVY_COLOR,
		marginBottom: 32,
	},
	// main部分
	mainContainerStyle: {
		height: "15%",
		backgroundColor: MAIN_WHITE_COLOR,
		borderTopLeftRadius: 50,
		alignItems: 'center',
	},
	// 検索フォーム
	searchBoxStyle: {
		flex: 1,
		backgroundColor: MAIN_WHITE_COLOR,
	},
	// 画面下部分
	bottomStyle: {
		display: "flex",
		alignItems: "center",
		height: "100%",
		backgroundColor: MAIN_WHITE_COLOR,
	},
	buttonContainerStyle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: MAIN_NAVY_COLOR,
		width: CONTENT_WIDTH,
		height: BUTTON_HEIGHT,
		borderRadius: 10,
		fontSize: 18,
	},
	buttonContainerInvalidStyle: {
		backgroundColor: "#C5C5C7",
	},
	buttonTextStyle: {
		color: MAIN_WHITE_COLOR,
		fontFamily: STANDARD_FONT,
	},
	toLoginStyle: {
		marginTop: 10,
		height: "5%",
		flexDirection: "row"
	},
	toLoginTextStyle: {
		fontFamily: STANDARD_FONT,
	},
	toLoginTextLinkStyle: {
		color: MAIN_PINK_COLOR,
		marginLeft: 10,
	},
	errorContainerStyle: {
		display: "flex",
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR,
		paddingBottom: 32,
	},
	errorTextStyle: {
		color: MAIN_PINK_COLOR,
		backgroundColor: MAIN_WHITE_COLOR,
		fontFamily: STANDARD_FONT,
		fontWeight: "bold"
	},
	forgotPasswordWrapperStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR,
		paddingBottom: 32,
	},
	forgotPasswordContainerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		alignItems: "flex-end",
		width: 300,
	},
	forgotPasswordTextStyle: {
		fontFamily: STANDARD_FONT,
	}
});
