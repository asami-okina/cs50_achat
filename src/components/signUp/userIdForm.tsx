// libs
import React, { useState } from 'react';
import { Text, View, Image, TextInput, Pressable } from 'react-native';
import { API_SERVER_URL } from "../../constants/api"

// components
import { UserIdFormDescription } from './_description/userIdFormDescription';

// constantsSearchStyles
import { searchStyles } from '../../constants/styles/searchStyles'

export function UserIdForm({
	inputAccessoryViewID,
	isCorrectUserIdSymbol,
	setIsCorrectUserIdSymbol,
	isCorrectUserIdStringCount,
	setIsCorrectUserIdStringCount,
	isAvailableUserId,
	setIsAvailableUserId,
	pageType,
	userIdText,
	onChangeUserIdText
}) {

	// ユーザーIDの説明文表示
	const [displayUserIdDescription, setDisplayUserIdDescription] = useState(false);
	// ユーザーIDアイコンのデフォルト表示
	const [defaultDisplayUserIcons, setDefaultDisplayUserIcons] = useState(false)
	// ユーザーIDの入力フォームの枠線のデフォルト表示
	const [defaultUserIdBorderColor, setDefaultUserIdBorderColor] = useState(false)

	// ユーザーIDフォームのラベル化
	let textInputUserId;

	// ユーザーID(半角英数字)のバリデーション
	function _userIdSymbolValidation() {
		const regexp = /^[0-9a-zA-Z]+$/;
		setIsCorrectUserIdSymbol(regexp.test(userIdText))
	}

	// ユーザーID(文字数:4文字以上100文字以内)のバリデーション
	function _userIdStringCountValidation() {
		let userIdLength = userIdText.length;

		// ユーザーIDの文字数が4文字以上100文字以内であれば、バリデーションが通る
		if (userIdLength >= 4 && userIdLength <= 100) {
			setIsCorrectUserIdStringCount(true)
		} else {
			setIsCorrectUserIdStringCount(false)
		}
	}

	// ユーザーID(使用可能かどうか)のバリデーション
	async function _isAvailableUserIdValidation() {
		try {
			// paramsを生成
			const params = { "userId": userIdText }
			const query_params = new URLSearchParams(params);

			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/signup/isAvailableUserIdValidation?${query_params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})

			// レスポンスをJSONにする
			const parse_response = await response.json()
			if (parse_response.isAvailableUserId) {
				setIsAvailableUserId(true)
			} else {
				setIsAvailableUserId(false)
			}
		} catch (e) {
			console.error(e)
		}
	}



	return (
		<View>
			<View style={searchStyles.searchBoxStyle}>
				<View style={searchStyles.searchWrapperStyle}>
					<Pressable style={searchStyles.searchContainerStyle} onPress={() => textInputUserId.focus()}>
						<Text style={searchStyles.searchTitleStyle}>UserId</Text>
						{/* <KeyboardAvoidingView behavior="padding"> */}
						<View style={defaultUserIdBorderColor ? isCorrectUserIdSymbol && isCorrectUserIdStringCount ? searchStyles.searchViewStyle : [searchStyles.searchViewStyle, searchStyles.inputIncorrectBorderColorStyle] : searchStyles.searchViewStyle}>
							<Image source={require("../../../assets/images/profile.png")} style={searchStyles.searchIconStyle} />
							{/* <KeyboardAvoidingView behavior="padding"> */}
							<TextInput
								onChangeText={onChangeUserIdText}
								style={searchStyles.searchContentWithIconStyle}
								value={userIdText}
								placeholder="test1234"
								inputAccessoryViewID={inputAccessoryViewID}
								ref={(input) => textInputUserId = input}
								autoCapitalize="none"
								maxLength={100}
								textContentType="username"
								onFocus={() => {
									// ユーザーIDの説明文表示
									setDisplayUserIdDescription(true);
									// ユーザーIDアイコンのデフォルト表示
									setDefaultDisplayUserIcons(true);
									// ユーザーIDの入力フォームの枠線のデフォルト表示
									setDefaultUserIdBorderColor(false);
								}}
								onEndEditing={() => {
									// ユーザーID(半角英数字)のバリデーション
									_userIdSymbolValidation();
									// ユーザーID(文字数)のバリデーション
									_userIdStringCountValidation();
									// ユーザーIDアイコンのデフォルト表示を無くす
									setDefaultDisplayUserIcons(false);
									// ユーザーIDの入力フォームの枠線のデフォルト表示
									setDefaultUserIdBorderColor(true);
									// ユーザーID(使用可能かどうか)のバリデーション
									_isAvailableUserIdValidation()
								}}
							/>
						</View>
					</Pressable>
				</View>
			</View>
			{/* ユーザーIDの説明文 */}
			{pageType === "SignUp" ? (
				<UserIdFormDescription displayUserIdDescription={displayUserIdDescription} isCorrectUserIdSymbol={isCorrectUserIdSymbol} isCorrectUserIdStringCount={isCorrectUserIdStringCount} isAvailableUserId={isAvailableUserId} defaultDisplayUserIcons={defaultDisplayUserIcons} />
			) : null}

		</View>
	)
}
