// libs
import React from 'react';
import { View, SafeAreaView, } from 'react-native';

// components
import { Button } from '../components/common/button'
import { HeadTitle } from '../components/common/headTitle';
import { AChatLogo } from '../components/common/aChatLogo'
import { ToSignUpOrLoginTextArea } from '../components/common/toSignUpOrLoginTextArea'
import {TopAreaContainer} from '../components/common/topAreaContainer'

// constantsStyles
import { screenContainerStyle, topMarginViewStyle, mainContainerStyle, bottomStyleByWelcomeAndSignUpAndLogin } from '../constants/styles'

export function Welcome({ navigation }) {
	return (
		<SafeAreaView style={screenContainerStyle}>
			{/* 画面一番上にある青色の余白部分 */}
			<View style={topMarginViewStyle}></View>
			{/* 丸みを帯びている白いトップ部分 */}
			<TopAreaContainer />
			<View style={mainContainerStyle}>
				{/* タイトル */}
				<HeadTitle navigation={navigation} title={"Welcome"} />
				{/* A-Chatロゴ */}
				<AChatLogo />
				<View style={bottomStyleByWelcomeAndSignUpAndLogin}>
					{/* 遷移ボタン */}
					<Button navigation={navigation} link={'Home'} buttonText={'Sign Up'} enable={true} scene={'Welcome'} />
					{/* サインアップまたはログインへのリンク */}
					<ToSignUpOrLoginTextArea navigation={navigation} description={'Do you have an account?'} link={'LogIn'} linkText={'Login'} />
				</View>
			</View>
		</SafeAreaView>
	);
}
