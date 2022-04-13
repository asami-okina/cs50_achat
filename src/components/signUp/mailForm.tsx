import React, { useState } from 'react';
import { Text, View, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { MailFormDescription } from './_description/mailFormDescription';

// constantsSearchStyles
import {searchStyles} from '../../constants/styles/searchStyles'

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
			<View style={searchStyles.searchBoxStyle}>
				<View style={searchStyles.searchWrapperStyle}>
					<Pressable style={searchStyles.searchContainerStyle} onPress={() => textInputEmail.focus()} >
						<Text style={searchStyles.searchTitleStyle}>Email</Text>
						<View style={defaultMailBorderColor ? isCorrectMail ? searchStyles.searchViewStyle : [searchStyles.searchViewStyle, searchStyles.inputIncorrectBorderColorStyle] : searchStyles.searchViewStyle}>
							<Image source={require("../../../assets/images/email.png")} style={searchStyles.searchIconStyle} />
							<TextInput
								onChangeText={onChangeEmailText}
								style={searchStyles.searchContentStyle}
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
