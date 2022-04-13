import React from 'react';
import { Text, View, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import { MAIN_WHITE_COLOR, CONTENT_WIDTH,MAIN_PINK_COLOR,STANDARD_FONT,MAIN_GRAY_COLOR ,MAIN_BLACK_COLOR} from '../../constants/layout';

// constantsSearchStyles
import {searchStyles} from '../../constants/styles/searchStyles'

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
			<View style={searchStyles.searchBoxStyle}>
				<View style={searchStyles.searchWrapperStyle}>
					<Pressable style={searchStyles.searchContainerStyle} onPress={() => textInputPassword.focus()}>
						<Text style={searchStyles.searchTitleStyle}>Password</Text>
						<View style={executedLoginAuthentication ? onFocusInputMailOrPasseword ? searchStyles.searchViewStyle : [searchStyles.searchViewStyle, searchStyles.inputIncorrectBorderColorStyle] : searchStyles.searchViewStyle}>
							<Image source={require("../../../assets/images/lock.png")} style={searchStyles.searchIconStyle} />
							<TextInput
								placeholder="Password"
								style={searchStyles.searchContentStyle}
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
								<MaterialCommunityIcons image={rightIcon} size={22} color={MAIN_GRAY_COLOR} style={searchStyles.passwordIconStyle} />
							</Pressable>
						</View>
					</Pressable>
				</View>
			</View>
		</View>
	)
}
