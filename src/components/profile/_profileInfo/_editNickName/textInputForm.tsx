// libs
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Image } from 'react-native';

// constantsSearchStyles
import { searchStyles } from '../../../../constants/styles/searchStyles'

// layouts
import { CONTENT_WIDTH, STANDARD_FONT, MAIN_PINK_COLOR, MAIN_YELLOW_GREEN, IN_SEARCH_FORM_SIDE_MARGIN, ICON_SIZE } from '../../../../constants/layout'

type TextInputFormType = {
	defaultInput: boolean;
	setDefaultInput: React.Dispatch<React.SetStateAction<boolean>>;
	isValidInput: boolean;
	setIsValidInput: React.Dispatch<React.SetStateAction<boolean>>;
	wordCount: number;
	setWordCount: React.Dispatch<React.SetStateAction<number>>;
	nickName: string;
	setNickName: React.Dispatch<React.SetStateAction<string>>;
}
export function TextInputForm({
	defaultInput,
	setDefaultInput,
	isValidInput,
	setIsValidInput,
	wordCount,
	setWordCount,
	nickName,
	setNickName
}: TextInputFormType) {
	// 検索フォームの削除アイコン表示/非表示
	const [deleteIconDisplay, setDeleteIconDisplay] = useState<boolean>(false)

	const onChangeText = (text: string) => {
		setNickName(text)
		setWordCount(text.length);
		if (text.length > 20) {
			setIsValidInput(false)
		} else {
			setIsValidInput(true)
		}
	};

	// 入力フォームのラベル化
	let textInputSearch;

	return (
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
						<Image source={require("../../../../../assets/images/close_gray.png")} style={[searchStyles.searchIconStyle, styles.searchIconStyle]} />
					</Pressable>
				)}
			</Pressable>
		</View>
	);
}


const styles = StyleSheet.create({
	searchContentNoneLeftIconStyle: {
		paddingLeft: IN_SEARCH_FORM_SIDE_MARGIN,
		flex: 1,
		fontFamily: STANDARD_FONT,
		height: 100,
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
})
