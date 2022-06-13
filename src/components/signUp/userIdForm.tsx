// libs
import React, { useState } from 'react';
import { Text, View, Image, TextInput, Pressable } from 'react-native';
import { API_SERVER_URL } from "../../constants/api"

// components
import { UserIdFormDescription } from './_description/userIdFormDescription';

// constantsSearchStyles
import { searchStyles } from '../../constants/styles/searchStyles'

type UserIdFormPropsType = {
	inputAccessoryViewID: string;
	isCorrectUserIdSymbol: boolean;
	setIsCorrectUserIdSymbol: React.Dispatch<React.SetStateAction<boolean>>;
	isCorrectUserIdStringCount: boolean;
	setIsCorrectUserIdStringCount: React.Dispatch<React.SetStateAction<boolean>>;
	isAvailableUserId: boolean;
	setIsAvailableUserId: React.Dispatch<React.SetStateAction<boolean>>;
	pageType: string;
	userIdText: string;
	onChangeUserIdText: React.Dispatch<React.SetStateAction<string>>;
}

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
}: UserIdFormPropsType) {

	// ユーザーIDの説明文表示
	const [displayUserIdDescription, setDisplayUserIdDescription] = useState<boolean>(false);
	// ユーザーIDアイコンのデフォルト表示
	const [defaultDisplayUserIcons, setDefaultDisplayUserIcons] = useState<boolean>(false)
	// ユーザーIDの入力フォームの枠線のデフォルト表示
	const [defaultUserIdBorderColor, setDefaultUserIdBorderColor] = useState<boolean>(false)

	// ユーザーIDフォームのラベル化
	let textInputUserId;

	// ユーザーID(半角英数字)のバリデーション
	function _userIdSymbolValidation() {
		const regexp = /^[0-9a-zA-Z]+$/;
		setIsCorrectUserIdSymbol(regexp.test(userIdText))
	}

	// ユーザーID(文字数:4文字以上100文字以内)のバリデーション
	function _userIdStringCountValidation() {
		let userIdLength: number = userIdText.length;

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
			// APIリクエスト
			const response = await fetch(API_SERVER_URL + `/api/signup/is_available_user_id_validation/${userIdText}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			})

			// レスポンスをJSONにする
			const parse_response = await response.json()

			if (parse_response.is_available_user_id_validation) {
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
						<View style={defaultUserIdBorderColor ? isCorrectUserIdSymbol && isCorrectUserIdStringCount ? searchStyles.searchViewStyle : [searchStyles.searchViewStyle, searchStyles.inputIncorrectBorderColorStyle] : searchStyles.searchViewStyle}>
							<Image source={require("../../../assets/images/profile.png")} style={searchStyles.searchIconStyle} />
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


// やったこと
// _isAvailableUserIdValidationの動作確認
// userIdForm.tsxの型

// 次やること
// 関連ファイルの型、次の関数を組み込み