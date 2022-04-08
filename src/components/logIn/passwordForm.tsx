import React from 'react';
import { Text, View, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import { MAIN_WHITE_COLOR, CONTENT_WIDTH,MAIN_PINK_COLOR,STANDARD_FONT } from '../../constants/layout';


export function PasswordForm({
	inputAccessoryViewID,
	passwordText,
	setPasswordText,
	executedLoginAuthentication,
	onFocusInputMailOrPasseword,
	setOnFocusInputMailOrPasseword,
}) {
	// パスワードの表示/非表示アイコン
	const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

	// メールフォームのラベル化
	let textInputPassword;
	return (
		<View>
			{/* Password */}
			<View style={styles.searchBoxStyle}>
				<View style={styles.searchWrapperStyle}>
					<Pressable style={styles.searchContainerStyle} onPress={() => textInputPassword.focus()}>
						<Text style={styles.searchTitleStyle}>Password</Text>
						<View style={executedLoginAuthentication ? onFocusInputMailOrPasseword ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle] : styles.searchViewStyle}>
							<Image source={require("../../../assets/images/lock.png")} style={styles.searchIconStyle} />
							<TextInput
								placeholder="Password"
								style={styles.searchContentStyle}
								autoCapitalize="none"
								autoCorrect={false}
								textContentType="newPassword"
								secureTextEntry={passwordVisibility}
								value={passwordText}
								enablesReturnKeyAutomatically
								onChangeText={setPasswordText}
								inputAccessoryViewID={inputAccessoryViewID}
								ref={(input) => textInputPassword = input}
								maxLength={200}
								onFocus={() => {
									// メールアドレスもしくはパスワード入力中判定
									setOnFocusInputMailOrPasseword(true)
								}}
								onEndEditing={() => {
								}}
							/>
							<Pressable onPress={handlePasswordVisibility}>
								<MaterialCommunityIcons image={rightIcon} size={22} color="#C5C5C7" style={styles.passwordIconStyle} />
							</Pressable>
						</View>
					</Pressable>
				</View>
			</View>
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
	// パスワードアイコンの表示/非表示
	passwordIconStyle: {
		marginRight: 10
	},
});
