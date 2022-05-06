// libs
import React from 'react';
import { View, SafeAreaView } from 'react-native';

// components
import { Button } from '../components/common/button'
import { HeadTitle } from '../components/common/headTitle';
import { AChatLogo } from '../components/common/aChatLogo'
import { ToSignUpOrLoginTextArea } from '../components/common/toSignUpOrLoginTextArea'
import { TopAreaWrapper } from "../components/common/topAreaWrapper"

// asamiStyles
import { asamiStyles } from '../constants/styles/asamiStyles'

export function Welcome({ navigation }) {
	return (
		<SafeAreaView style={asamiStyles.screenContainerStyle}>
			{/* 画面一番上にある青色の余白部分 */}
			<View style={asamiStyles.topMarginViewStyle}></View>
			{/* 丸みを帯びている白いトップ部分 */}
			<TopAreaWrapper type={"welcome"}>
			</TopAreaWrapper>
			<View style={asamiStyles.mainContainerStyle}>
				{/* タイトル */}
				<HeadTitle title={"Welcome"} />
				{/* A-Chatロゴ */}
				<AChatLogo />
				<View style={asamiStyles.bottomStyleByWelcomeAndSignUpAndLogin}>
					{/* 遷移ボタン */}
					<Button navigation={navigation} link={'SignUp'} buttonText={'Sign Up'} enable={true} scene={'Welcome'} propsList={null} />
					{/* サインアップまたはログインへのリンク */}
					<ToSignUpOrLoginTextArea navigation={navigation} description={'Do you have an account?'} link={'LogIn'} />
				</View>
			</View>
		</SafeAreaView>
	);
}
