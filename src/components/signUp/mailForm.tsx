// libs
import React, { useState } from 'react';
import { Text, View, Image, TextInput, Pressable } from 'react-native';
import { API_SERVER_URL } from "../../constants/api"

// components
import { MailFormDescription } from './_description/mailFormDescription';

// constantsSearchStyles
import { searchStyles } from '../../constants/styles/searchStyles'

type MailFormPropsType = {
	inputAccessoryViewID: string;
	isCorrectMail: boolean;
	setIsCorrectMail: React.Dispatch<React.SetStateAction<boolean>>;
	emailText: string;
	onChangeEmailText: React.Dispatch<React.SetStateAction<string>>;
	isAvailableMail: boolean;
	setIsAvailableMail: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MailForm({
	inputAccessoryViewID,
	isCorrectMail,
	setIsCorrectMail,
	emailText,
	onChangeEmailText,
	isAvailableMail,
	setIsAvailableMail
}) {

	// メールアドレスの説明文表示
	const [displayMailDescription, setDisplayMailDescription] = useState<boolean>(false);
	// メールアドレスアイコンのデフォルト表示
	const [defaultDisplayMailIcons, setDefaultDisplayMailIcons] = useState<boolean>(false)
	// メールアドレスの入力フォームの枠線のデフォルト表示
	const [defaultMailBorderColor, setDefaultMailBorderColor] = useState<boolean>(false)

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

	// メールアドレス(使用可能かどうか)のバリデーション
	async function _isAvailableMailValidation() {
		try {
			// paramsを生成
			const params = { "mail": emailText }
			const query_params = new URLSearchParams(params);

			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/signup/is_available_mail_validation?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})

			// レスポンスをJSONにする
			const parse_response = await response.json()
			if (parse_response.is_available_mail) {
				setIsAvailableMail(true)
			} else {
				setIsAvailableMail(false)
			}
		} catch (e) {
			console.error(e)
		}
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
								style={searchStyles.searchContentWithIconStyle}
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
									// メールアドレス(使用可能かどうか)のバリデーション
									_isAvailableMailValidation()
								}}
							/>
						</View>
					</Pressable>
				</View>
			</View>
			{/* メールアドレスの説明文 */}
			<MailFormDescription isCorrectMail={isCorrectMail} isAvailableMail={isAvailableMail} displayMailDescription={displayMailDescription} defaultDisplayMailIcons={defaultDisplayMailIcons} />
		</View>
	)
}
