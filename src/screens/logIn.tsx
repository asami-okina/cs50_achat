import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { MailForm } from '../components/logIn/mailForm';
import { PasswordForm } from '../components/logIn/passwordForm';
import { postLoginAuthentication } from '../api/api';
import { TopAreaContainer } from '../components/common/topAreaContainer'
import { ToSignUpOrLoginTextArea } from '../components/common/toSignUpOrLoginTextArea'
import { Button } from '../components/common/button'
import { AuthErrorText } from '../components/logIn/authErrorText';
import { ForgotPassword } from '../components/logIn/forgotPasseword';

// constantsStyles
import {constantsStyles} from '../constants/styles'

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
	function _loginAuthentication() {
		// resultには、APIからの戻り値を入れる
		let result = postLoginAuthentication(emailText, passwordText)
		if (result.certificationResult) {
			// Home画面へ遷移
			navigation.navigate('Home')
		} else {
			// ログインボタンを押した場合
			setExecutedLoginAuthentication(true)
			setOnFocusInputMailOrPasseword(false)
		}
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsStyles.screenContainerStyle}>
			<SafeAreaView style={constantsStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaContainer title={'Log In'} searchForm={null} searchFormProps={null}  />
				<ScrollView style={constantsStyles.mainContainerStyle}>
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
					<View style={constantsStyles.bottomStyleByWelcomeAndSignUpAndLogin}>
						<Button navigation={navigation} link={'Home'} buttonText={'Log In'} scene={'LogIn'} loginProps={{ 'emailText': emailText, 'passwordText': passwordText, 'executedLoginAuthentication': executedLoginAuthentication, 'onFocusInputMailOrPasseword': onFocusInputMailOrPasseword, 'onPressFunction': _loginAuthentication }} enable={false} />
						{/* サインアップまたはログインへのリンク */}
						<ToSignUpOrLoginTextArea navigation={navigation} description={`Don't you have an account?`} link={'SignUp'} />
					</View>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
