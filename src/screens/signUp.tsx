// libs
import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';

// components
import { MailForm } from '../components/signUp/mailForm';
import { PasswordForm } from '../components/signUp/passwordForm';
import { UserIdForm } from '../components/signUp/userIdForm';
import {TopAreaContainer} from '../components/common/topAreaContainer'
import { ToSignUpOrLoginTextArea } from '../components/common/toSignUpOrLoginTextArea'
import { Button } from '../components/common/button'

// constantsStyles
import {constantsStyles} from '../constants/styles'

export function SignUp({ navigation }) {
	// キーボードに完了ボタンを表示
	const inputAccessoryViewID = 'uniqueID';

	// バリデーション
	// メールアドレスのバリデーション
	const [isCorrectMail, setIsCorrectMail] = useState(false);

	// パスワードのバリデーション(半角英数字記号)
	const [isCorrectPassewordSymbol, setIsCorrectPassewordSymbol] = useState(false);
	// パスワードのバリデーション(文字数)
	const [isCorrectPassewordStringCount, setIsCorrectPassewordStringCount] = useState(false);

	// ユーザーIDのバリデーション(半角英数字)
	const [isCorrectUserIdSymbol, setIsCorrectUserIdSymbol] = useState(false);
	// ユーザーIDのバリデーション(文字数)
	const [isCorrectUserIdStringCount, setIsCorrectUserIdStringCount] = useState(false);
	// ユーザーIDのバリデーション(使用可能かどうか)
	const [isAvailableUserId, setIsAvailableUserId] = useState(false)

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsStyles.screenContainerStyle}>
			<SafeAreaView style={constantsStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaContainer  title={'SignUp'}/>
				{/* トップ部分を除くメイン部分 */}
				<ScrollView style={constantsStyles.mainContainerStyle}>
					{/* Email */}
					<MailForm
						inputAccessoryViewID={inputAccessoryViewID}
						isCorrectMail={isCorrectMail}
						setIsCorrectMail={setIsCorrectMail}
					/>
					{/* Password */}
					<PasswordForm
						inputAccessoryViewID={inputAccessoryViewID}
						isCorrectPassewordSymbol={isCorrectPassewordSymbol}
						setIsCorrectPassewordSymbol={setIsCorrectPassewordSymbol}
						isCorrectPassewordStringCount={isCorrectPassewordStringCount}
						setIsCorrectPassewordStringCount={setIsCorrectPassewordStringCount}
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
					/>
					{/* 画面下 */}
					<View style={constantsStyles.bottomStyleByWelcomeAndSignUpAndLogin}>
						{isCorrectMail && isCorrectPassewordSymbol && isCorrectPassewordStringCount && isCorrectUserIdSymbol && isCorrectUserIdStringCount && isAvailableUserId ?
							(
								<Button navigation={navigation} link={'Home'} buttonText={'Sign Up'} enable={true} scene={'SignUp'} loginProps={null} />
							) : (
								<Button navigation={navigation} link={'Home'} buttonText={'Sign Up'} enable={false} scene={'SignUp'} loginProps={null} />
							)}
					{/* サインアップまたはログインへのリンク */}
					<ToSignUpOrLoginTextArea navigation={navigation} description={'Do you have an account?'} link={'LogIn'} />
					</View>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

