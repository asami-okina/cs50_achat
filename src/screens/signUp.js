import React, { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { MailForm } from '../components/signUp/mailForm';
import { PasswordForm } from '../components/signUp/passwordForm';
import { UserIdForm } from '../components/signUp/userIdForm';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, CONTENT_WIDTH,MAIN_PINK_COLOR,MAIN_TITLE_FONT,STANDARD_FONT } from '../constants/layout'

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
		<KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
			<SafeAreaView style={styles.containerStyle}>
				<ScrollView style={styles.containerStyle}>
					<View style={styles.headContainerStyle}></View>
					<View style={styles.mainContainerStyle}></View>
					<View style={styles.headMessageContainerStyle}>
						<Text style={styles.headMessageTextStyle}>Sign Up</Text>
					</View>
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
					<View style={styles.bottomStyle}>
						{isCorrectMail && isCorrectPassewordSymbol && isCorrectPassewordStringCount && isCorrectUserIdSymbol && isCorrectUserIdStringCount && isAvailableUserId ?
							(
								<TouchableOpacity
									style={styles.buttonContainerStyle}
									onPress={() => navigation.navigate('Home')}>
									<Text style={styles.buttonTextStyle}>Sign Up</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									style={[styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}>
									<Text style={styles.buttonTextStyle}>Sign Up</Text>
								</TouchableOpacity>
							)}
						<View style={styles.toLoginStyle}>
							<Text style={styles.toLoginTextStyle}>Do you have an account?</Text>
							<TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
								<Text style={[styles.toLoginTextStyle, styles.toLoginTextLinkStyle]}>Login here</Text>
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
		width: "100%",
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
		width: "100%",
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
	searchWrapperStyle: {
		flex: 1,
		alignItems: "center",
		paddingBottom: 10,

	},
	searchContainerStyle: {
	},
	searchTitleStyle: {
		fontFamily: STANDARD_FONT,
		color: "#262626",
		marginBottom: 5,
	},
	searchIconStyle: {
		width: 24,
		height: 24,
		marginRight: 10,
		marginLeft: 10,
	},
	searchViewStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F6F7FB',
		borderWidth: 0.5,
		height: 60,
		borderRadius: 5,
		width: CONTENT_WIDTH,
		borderColor: "#F6F7FB",
	},
	searchContentStyle: {
		flex: 1
	},
	// 入力が間違っている場合のフォーム枠線の色
	inputIncorrectBorderColorStyle: {
		borderWidth: 2,
		borderColor: MAIN_PINK_COLOR,
	},
	// キーボードに「完了」を表示
	completeBoxStyle: {
		width: 60,
		alignItems: "center",
		padding: 10,
	},
	completeTextStyle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "hsl(210, 100%, 60%)"
	},
	// パスワードアイコンの表示/非表示
	passwordIconStyle: {
		marginRight: 10
	},
	// 説明文
	descriptionBoxStyle: {
		display: "flex",
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR,
		paddingBottom: 10,
	},
	descriptionWrapperStyle: {
	},
	descriptionContainerStyle: {
		flexDirection: "row",
		width: CONTENT_WIDTH,
	},
	descriptionTextStyle: {
		color: "#262626",
		fontSize: 12,
		overflow: "visible"
	},
	// 共通説明文のアイコンの大きさ
	descriptionIconStyle: {
		marginRight: 10,
		width: 12,
		height: 12,
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
		height: 60,
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
});
