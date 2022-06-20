// libs
import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

// components
import { MailForm } from '../components/signUp/mailForm';
import { PasswordForm } from '../components/signUp/passwordForm';
import { UserIdForm } from '../components/signUp/userIdForm';
import { TopAreaWrapper } from "../components/common/topAreaWrapper"
import { ToSignUpOrLoginTextArea } from '../components/common/toSignUpOrLoginTextArea'

// components
import { Button } from '../components/common/button'

// sameStyles
import { sameStyles } from '../constants/styles/sameStyles'

export function SignUp() {
	// キーボードに完了ボタンを表示
	const inputAccessoryViewID: string = 'uniqueID';

	// バリデーション
	// メールアドレスのバリデーション
	const [isCorrectMail, setIsCorrectMail] = useState<boolean>(false);

	// パスワードのバリデーション(半角英数字記号)
	const [isCorrectPassewordSymbol, setIsCorrectPassewordSymbol] = useState<boolean>(false);
	// パスワードのバリデーション(文字数)
	const [isCorrectPassewordStringCount, setIsCorrectPassewordStringCount] = useState<boolean>(false);

	// ユーザーIDのバリデーション(半角英数字)
	const [isCorrectUserIdSymbol, setIsCorrectUserIdSymbol] = useState<boolean>(false);
	// ユーザーIDのバリデーション(文字数)
	const [isCorrectUserIdStringCount, setIsCorrectUserIdStringCount] = useState<boolean>(false);
	// ユーザーIDのバリデーション(使用可能かどうか)
	const [isAvailableUserId, setIsAvailableUserId] = useState<boolean>(false)

	// メールアドレスのバリデーション(使用可能かどうか)
	const [isAvailableMail, setIsAvailableMail] = useState<boolean>(false)

	// メールアドレス入力フォーム
	const [emailText, onChangeEmailText] = useState<string>("");
	// パスワード入力フォーム
	const [passwordText, onChangePasswordText] = useState<string>("");
	// ユーザーID入力フォーム
	const [userIdText, onChangeUserIdText] = useState<string>("");

	return (
		<KeyboardAvoidingView behavior="padding" style={sameStyles.screenContainerStyle}>
			<SafeAreaView style={sameStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={sameStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"signUp"}>
					<Text style={sameStyles.topAreaTitleStyle}>Sign Up</Text>
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分 */}
				<ScrollView style={sameStyles.mainContainerStyle}>
					{/* Email */}
					<MailForm
						inputAccessoryViewID={inputAccessoryViewID}
						isCorrectMail={isCorrectMail}
						setIsCorrectMail={setIsCorrectMail}
						emailText={emailText}
						onChangeEmailText={onChangeEmailText}
						setIsAvailableMail={setIsAvailableMail}
						isAvailableMail={isAvailableMail}
					/>
					{/* Password */}
					<PasswordForm
						inputAccessoryViewID={inputAccessoryViewID}
						isCorrectPassewordSymbol={isCorrectPassewordSymbol}
						setIsCorrectPassewordSymbol={setIsCorrectPassewordSymbol}
						isCorrectPassewordStringCount={isCorrectPassewordStringCount}
						setIsCorrectPassewordStringCount={setIsCorrectPassewordStringCount}
						passwordText={passwordText}
						onChangePasswordText={onChangePasswordText}
					/>
					{/* UserId */}
					<UserIdForm
						inputAccessoryViewID={inputAccessoryViewID}
						isCorrectUserIdSymbol={isCorrectUserIdSymbol}
						setIsCorrectUserIdSymbol={setIsCorrectUserIdSymbol}
						isCorrectUserIdStringCount={isCorrectUserIdStringCount}
						setIsCorrectUserIdStringCount={setIsCorrectUserIdStringCount}
						isAvailableUserId={isAvailableUserId}
						setIsAvailableUserId={setIsAvailableUserId}
						pageType={"SignUp"}
						userIdText={userIdText}
						onChangeUserIdText={onChangeUserIdText}
					/>
					{/* 画面下 */}
					<View style={sameStyles.bottomStyleByWelcomeAndSignUpAndLogin}>
						{isCorrectMail && isCorrectPassewordSymbol && isCorrectPassewordStringCount && isCorrectUserIdSymbol && isCorrectUserIdStringCount && isAvailableUserId ?
							(
								<Button link={'Home'} buttonText={'Sign Up'} enable={true} scene={'SignUp'} propsList={{ "email": emailText, "password": passwordText, "userId": userIdText }} />
							) : (
								<Button link={'Home'} buttonText={'Sign Up'} enable={false} scene={'SignUp'} propsList={null} />
							)}
						{/* サインアップまたはログインへのリンク */}
						<ToSignUpOrLoginTextArea description={'Do you have an account?'} link={'LogIn'} />
					</View>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}