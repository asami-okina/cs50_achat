import React from 'react';
import { Text, View, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import { MAIN_WHITE_COLOR, CONTENT_WIDTH,MAIN_PINK_COLOR,STANDARD_FONT,LIGHT_GRAY_COLOR,MAIN_BLACK_COLOR } from '../../constants/layout';


export function MailForm({
	inputAccessoryViewID,
	emailText,
	setEmailText,
	executedLoginAuthentication,
	onFocusInputMailOrPasseword,
	setOnFocusInputMailOrPasseword,
}) {
	// メールフォームのラベル化
	let textInputEmail;
	return (
		<View>
			{/* Email */}
			<View style={styles.searchBoxStyle}>
				<View style={styles.searchWrapperStyle}>
					<Pressable style={styles.searchContainerStyle} onPress={() => textInputEmail.focus()} >
						<Text style={styles.searchTitleStyle}>Email</Text>
						<View style={executedLoginAuthentication ? onFocusInputMailOrPasseword ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle] : styles.searchViewStyle}>
							<Image source={require("../../../assets/images/email.png")} style={styles.searchIconStyle} />
							<TextInput
								onChangeText={setEmailText}
								style={styles.searchContentStyle}
								value={emailText}
								placeholder="a-chat@test.com"
								inputAccessoryViewID={inputAccessoryViewID}
								ref={(input) => textInputEmail = input}
								autoCapitalize="none"
								textContentType="emailAddress"
								onFocus={() => {
									// メールアドレスもしくはパスワード入力中判定
									setOnFocusInputMailOrPasseword(true)
								}}
								onEndEditing={() => {
								}}
							/>
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
		color: MAIN_BLACK_COLOR,
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
		backgroundColor: LIGHT_GRAY_COLOR,
		borderWidth: 0.5,
		height: 60,
		borderRadius: 5,
		width: CONTENT_WIDTH,
		borderColor: LIGHT_GRAY_COLOR,
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
