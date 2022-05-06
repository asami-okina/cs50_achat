// libs
import React, { useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView } from 'react-native';


// components
import { TopAreaWrapper } from "../../../components/common/topAreaWrapper"
import { MainTitle } from "../../../components/common/_topAreaContainer/mainTitle"
import { NickNameStringCount } from "../_profileInfo/_editNickName/nickNameStringCount"
import { TextInputForm } from "../_profileInfo/_editNickName/textInputForm"
import { ButtonContainer } from "../_profileInfo/_editNickName/buttonContainer";

// asamiStyles
import { asamiStyles } from '../../../constants/styles/asamiStyles'

export function EditNickName({ navigation }) {

	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	const [nickName, setNickName] = useState('')

	// 入力文字数
	const [wordCount, setWordCount] = useState<number>(0);

	// 有効な入力かどうか
	const [isValidInput, setIsValidInput] = useState(true)

	// 未入力状態
	const [defaultInput, setDefaultInput] = useState(true)

	return (
		<KeyboardAvoidingView behavior="padding" style={asamiStyles.screenContainerStyle}>
			<SafeAreaView style={asamiStyles.screenContainerStyle}>
				{/* 画面一番上にある青色の余白部分 */}
				<View style={asamiStyles.topMarginViewStyle}></View>
				{/* 丸みを帯びている白いトップ部分 */}
				<TopAreaWrapper type={"addFriend"}>
					<MainTitle navigation={navigation} title={"NickName"} link={"Profile"} props={null} />
				</TopAreaWrapper>
				{/* トップ部分を除くメイン部分*/}
				<View style={asamiStyles.mainContainerStyle}>
					<NickNameStringCount wordCount={wordCount} />
					<TextInputForm defaultInput={defaultInput} setDefaultInput={setDefaultInput} isValidInput={isValidInput} setIsValidInput={setIsValidInput} wordCount={wordCount} setWordCount={setWordCount} nickName={nickName} setNickName={setNickName} />
					{/* 遷移ボタン */}
					{/* ニックネームが1文字以上20文字以内で有効である場合 */}
					<ButtonContainer navigation={navigation} nickName={nickName} setNickName={setNickName} wordCount={wordCount} isValidInput={isValidInput} defaultInput={defaultInput} />
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
