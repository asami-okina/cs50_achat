import React, { useState } from 'react';
import { Text, View, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { fetchIsAvailableUserId } from "../../api/api";
import { UserIdFormDescription } from './_description/userIdFormDescription';
import { MAIN_WHITE_COLOR, CONTENT_WIDTH, MAIN_PINK_COLOR,STANDARD_FONT } from '../../constants/layout'


export function UserIdForm({
	inputAccessoryViewID,
	isCorrectUserIdSymbol,
	setIsCorrectUserIdSymbol,
	isCorrectUserIdStringCount,
	setIsCorrectUserIdStringCount,
	isAvailableUserId,
	setIsAvailableUserId,
	pageType,
}) {
	// 入力フォーム
	const [userIdText, onChangeUserIdText] = useState("");

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
	function _isAvailableUserIdValidation() {
		// resultには、APIからの戻り値を入れる
		let result = fetchIsAvailableUserId(userIdText)
		if (result.isAvailableUserId) {
			setIsAvailableUserId(true)
		} else {
			setIsAvailableUserId(false)
		}
	}

	return (
		<View>
			<View style={styles.searchBoxStyle}>
				<View style={styles.searchWrapperStyle}>
					<Pressable style={styles.searchContainerStyle} onPress={() => textInputUserId.focus()}>
						<Text style={styles.searchTitleStyle}>UserId</Text>
						{/* <KeyboardAvoidingView behavior="padding"> */}
						<View style={defaultUserIdBorderColor ? isCorrectUserIdSymbol && isCorrectUserIdStringCount ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle] : styles.searchViewStyle}>
							<Image source={require("../../../assets/images/profile.png")} style={styles.searchIconStyle} />
							{/* <KeyboardAvoidingView behavior="padding"> */}
							<TextInput
								onChangeText={onChangeUserIdText}
								style={styles.searchContentStyle}
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
