// libs
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, StyleSheet, Text, TextInput, Pressable, Image } from 'react-native';


// components
import { TopAreaWrapper } from "../../../components/common/topAreaWrapper"
import { MainTitle } from "../../../components/common/_topAreaContainer/mainTitle"
import { Button } from "../../common/button"
import {NickNameStringCount} from "../_profileInfo/_editNickName/nickNameStringCount"

// constantsCommonStyles
import { constantsCommonStyles } from '../../../constants/styles/commonStyles'

// constantsSearchStyles
import { searchStyles } from '../../../constants/styles/searchStyles'

// layouts
import { TAB_TITLE_TEXT_SIZE, TAB_FONT, MAIN_NAVY_COLOR, CONTENT_WIDTH, STANDARD_FONT, MAIN_WHITE_COLOR, MAIN_PINK_COLOR, MAIN_GRAY_COLOR, MAIN_YELLOW_GREEN, IN_SEARCH_FORM_SIDE_MARGIN, ICON_SIZE } from '../../../constants/layout'

export function EditNickName({ route, navigation }) {

	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	const [nickName, setNickName] = useState('')

	// 入力文字数
	const [wordCount, setWordCount] = useState<number>(0);

	// 検索フォームの削除アイコン表示/非表示
	const [deleteIconDisplay, setDeleteIconDisplay] = useState(false)

	// 有効な入力かどうか
	const [isValidInput, setIsValidInput] = useState(true)

	// 未入力状態
	const [defaultInput, setDefaultInput] = useState(true)

	const onChangeText = (text: string) => {
		setNickName(text)
		setWordCount(text.length);
		if (text.length > 20) {
			setIsValidInput(false)
		} else {
			setIsValidInput(true)
		}
	};

	// ニックネームの更新
	async function _updateNickName() {
		try {
			// APIリクエスト
			const bodyData = {
				"nickName": nickName,
			}
			const response = await fetch(`https://a-chat/api/users/${userId}/profile`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
		} catch (e) {
			console.error(e)
		}
	}

	// 入力フォームのラベル化
	let textInputSearch;

	return (
		<KeyboardAvoidingView behavior="padding" style={constantsCommonStyles.screenContainerStyle}>
			<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={constantsCommonStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"addFriend"}>
					<MainTitle navigation={navigation} title={"NickName"} link={"Profile"} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分*/}
				<View style={constantsCommonStyles.mainContainerStyle}>
					<View style={styles.nickNameWrapperStyle}>
						<NickNameStringCount wordCount={wordCount} />
					</View>
					<View style={styles.inputTextWrapperStyle}>
						<Pressable onPress={() => textInputSearch.focus()} style={defaultInput ? styles.inputTextContainerStyle : isValidInput ? styles.inputTextContainerStyle : [styles.inputTextContainerStyle, styles.errorInputTextContainerStyle]} >
							<TextInput
								onChangeText={onChangeText}
								style={searchStyles.searchContentNoneLeftIconStyle}
								value={nickName}
								placeholder="Please Enter your NickName"
								ref={(input) => textInputSearch = input}
								autoCapitalize="none"
								textContentType="username"
								onFocus={() => {
									setDeleteIconDisplay(true)
									setDefaultInput(false)
								}}
								onEndEditing={() => {
									// 削除アイコンの表示/非表示切り替え
									setDeleteIconDisplay(true)

									// ニックネームの入力が1文字以下の場合はエラーを出す
									if (wordCount < 1) {
										setIsValidInput(false)
									}
								}}
							/>
							{deleteIconDisplay && (
								<Pressable onPress={() => {
									textInputSearch.clear();
									if (!defaultInput) {
										setIsValidInput(false)
									}
								}} >
									<Image source={require("../../../../assets/images/close_gray.png")} style={[searchStyles.searchIconStyle, styles.searchIconStyle]} />
								</Pressable>
							)}
						</Pressable>
					</View>
					{/* 遷移ボタン */}
					{/* ニックネームが1文字以上20文字以内で有効である場合 */}
					<View style={styles.buttonContainerStyle}>
						{isValidInput && !defaultInput && wordCount >= 1 && (
							<Button navigation={navigation} link={"Profile"} buttonText={'Save'} enable={true} scene={'ProfileSettingNickName'} propsList={{ "_updateNickName": _updateNickName, "nickName": nickName, "setNickName": setNickName }} />
						)}
						{(!isValidInput && !defaultInput) && (
							<View style={styles.inValidErrorContainerStyle}>
								{!defaultInput && (
									<Text style={styles.errorText}>Nicknames can be entered from a single character.</Text>
								)}
								<Button navigation={navigation} link={null} buttonText={'Save'} enable={false} scene={'ProfileSettingNickName'} propsList={null} />
							</View>
						)}
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}


const styles = StyleSheet.create({
	searchContentNoneLeftIconStyle: {
		paddingLeft: IN_SEARCH_FORM_SIDE_MARGIN,
		flex: 1,
		fontFamily: STANDARD_FONT,
		height: 100,
	},
	nickNameWrapperStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		height: 30,
	},
	nickNameContainerStyle: {
		width: CONTENT_WIDTH,
		justifyContent: "center",
		height: 30,
		marginTop: 32,
	},
	stringCountContainerStyle: {
		alignItems: "flex-end",
	},
	titleStyle: {
		fontSize: TAB_TITLE_TEXT_SIZE,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
	},
	stringCountTextStyle: {
		fontSize: 14,
		color: MAIN_GRAY_COLOR,
		fontFamily: STANDARD_FONT
	},
	inputTextWrapperStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	inputTextContainerStyle: {
		marginTop: 20,
		width: CONTENT_WIDTH,
		height: 50,
		flexDirection: "row",
		borderBottomColor: MAIN_YELLOW_GREEN,
		borderBottomWidth: 1,
	},
	errorInputTextContainerStyle: {
		borderBottomColor: MAIN_PINK_COLOR,
	},
	searchIconStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		marginLeft: 0,
		marginRight: 0
	},
	buttonContainerStyle: {
		marginTop: 32,
		justifyContent: "center",
		alignItems: "center",
	},
	inValidErrorContainerStyle: {
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontFamily: STANDARD_FONT,
		color: MAIN_PINK_COLOR,
		marginBottom: 32,
	}
})
