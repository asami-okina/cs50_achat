// libs
import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Text } from 'react-native';

// components
import { ToSignUpOrLoginTextArea } from '../components/common/toSignUpOrLoginTextArea'
import { Button } from '../components/common/button'
import { AuthErrorText } from '../components/logIn/authErrorText';
import { ForgotPassword } from '../components/logIn/forgotPasseword';
import { MailForm } from '../components/logIn/mailForm';
import { PasswordForm } from '../components/logIn/passwordForm';
import { TopAreaWrapper } from "../components/common/topAreaWrapper"

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonStyles'

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
	async function _loginAuthentication() {
		try {
			// APIリクエスト
			const bodyData = {
				"mail": emailText,
				"password": passwordText
			}
			const response = await fetch(`https://a-chat/api/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})

			// レスポンスをJSONにする
			const parse_response = await response.json()
			if (parse_response.certificationResult) {
				// Home画面へ遷移
				navigation.navigate('Home')
			} else {
				// ログインボタンを押した場合
				setExecutedLoginAuthentication(true)
				setOnFocusInputMailOrPasseword(false)
			}
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"login"}>
					<Text style={constantsCommonStyles.topAreaTitleStyle}>Log In</Text>
				</TopAreaWrapper>
				<ScrollView style={constantsCommonStyles.mainContainerStyle}>
					{/* ログイン認証エラー */}
					{executedLoginAuthentication ? onFocusInputMailOrPasseword ? null : (
						<AuthErrorText />
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
					<ForgotPassword />
					{/* 画面下 */}
					<View style={constantsCommonStyles.bottomStyleByWelcomeAndSignUpAndLogin}>
						<Button navigation={navigation} link={'Home'} buttonText={'Log In'} scene={'LogIn'} propsList={{ 'emailText': emailText, 'passwordText': passwordText, 'executedLoginAuthentication': executedLoginAuthentication, 'onFocusInputMailOrPasseword': onFocusInputMailOrPasseword, 'onPressFunction': _loginAuthentication }} enable={false} />
						{/* サインアップまたはログインへのリンク */}
						<ToSignUpOrLoginTextArea navigation={navigation} description={`Don't you have an account?`} link={'SignUp'} />
					</View>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
