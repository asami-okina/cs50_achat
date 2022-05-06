// libs
import React from 'react';
import { View, SafeAreaView } from 'react-native';

// components
import { Button } from '../components/common/button'
import { HeadTitle } from '../components/common/headTitle';
import { AChatLogo } from '../components/common/aChatLogo'
import { ToSignUpOrLoginTextArea } from '../components/common/toSignUpOrLoginTextArea'
import { TopAreaWrapper } from "../components/common/topAreaWrapper"

// commonStyles
import { commonStyles } from '../constants/styles/commonStyles'

export function Welcome({ navigation }) {
	return (
		<SafeAreaView style={commonStyles.screenContainerStyle}>
			{/* 画面一番上にある青色の余白部分 */}
			<View style={commonStyles.topMarginViewStyle}></View>
			{/* 丸みを帯びている白いトップ部分 */}
			<TopAreaWrapper type={"welcome"}>
			</TopAreaWrapper>
			<View style={commonStyles.mainContainerStyle}>
				{/* タイトル */}
				<HeadTitle title={"Welcome"} />
				{/* A-Chatロゴ */}
				<AChatLogo />
				<View style={commonStyles.bottomStyleByWelcomeAndSignUpAndLogin}>
					{/* 遷移ボタン */}
					<Button navigation={navigation} link={'SignUp'} buttonText={'Sign Up'} enable={true} scene={'Welcome'} propsList={null} />
					{/* サインアップまたはログインへのリンク */}
					<ToSignUpOrLoginTextArea navigation={navigation} description={'Do you have an account?'} link={'LogIn'} />
				</View>
			</View>
		</SafeAreaView>
	);
}
