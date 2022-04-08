import React, { useState } from 'react';
import { Text, View, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { MailFormDescription } from './_description/mailFormDescription';
import { MAIN_WHITE_COLOR, CONTENT_WIDTH, MAIN_PINK_COLOR,STANDARD_FONT } from '../../constants/layout'


export function MailForm({
	inputAccessoryViewID,
	isCorrectMail,
	setIsCorrectMail,
}) {


	// 入力フォーム
	const [emailText, onChangeEmailText] = useState("");

	// メールアドレスの説明文表示
	const [displayMailDescription, setDisplayMailDescription] = useState(false);
	// メールアドレスアイコンのデフォルト表示
	const [defaultDisplayMailIcons, setDefaultDisplayMailIcons] = useState(false)
	// メールアドレスの入力フォームの枠線のデフォルト表示
	const [defaultMailBorderColor, setDefaultMailBorderColor] = useState(false)

	// メールフォームのラベル化
	let textInputEmail;

	// メールアドレスのバリデーション関数
	function _mailValidation() {
		const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
		if (!regexp.test(emailText)) {
			// メールアドレスの説明文表示
			setDisplayMailDescription(true);
		}
		setIsCorrectMail(regexp.test(emailText))
	}

	return (
		<View>
			{/* Email */}
			<View style={styles.searchBoxStyle}>
				<View style={styles.searchWrapperStyle}>
					<Pressable style={styles.searchContainerStyle} onPress={() => textInputEmail.focus()} >
						<Text style={styles.searchTitleStyle}>Email</Text>
						<View style={defaultMailBorderColor ? isCorrectMail ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle] : styles.searchViewStyle}>
							<Image source={require("../../../assets/images/email.png")} style={styles.searchIconStyle} />
							<TextInput
								onChangeText={onChangeEmailText}
								style={styles.searchContentStyle}
								value={emailText}
								placeholder="a-chat@test.com"
								inputAccessoryViewID={inputAccessoryViewID}
								ref={(input) => textInputEmail = input}
								autoCapitalize="none"
								textContentType="emailAddress"
								onFocus={() => {
									// メールアドレスの入力フォームの枠線のデフォルト表示
									setDefaultMailBorderColor(false)
									// メールアドレスアイコンのデフォルト表示
									setDefaultDisplayMailIcons(true)
								}}
								onEndEditing={() => {
									// メールアドレスのバリデーション
									_mailValidation()
									// メールアドレスの入力フォームの枠線のデフォルト表示
									setDefaultMailBorderColor(true)
									// メールアドレスアイコンのデフォルト表示
									setDefaultDisplayMailIcons(false)
								}}
							/>
						</View>
					</Pressable>
				</View>
			</View>
			{/* メールアドレスの説明文 */}
			<MailFormDescription isCorrectMail={isCorrectMail} displayMailDescription={displayMailDescription} defaultDisplayMailIcons={defaultDisplayMailIcons} />
		</View>
	)
}

export const styles = StyleSheet.create({
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
});

