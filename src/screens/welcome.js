// libs
import React from 'react';
import { View, SafeAreaView, } from 'react-native';

// components
import { Button } from '../components/common/button'
import { HeadTitle } from '../components/common/headTitle';
import { AChatLogo } from '../components/common/aChatLogo'
import { ToSignUpOrLoginTextArea } from '../components/common/toSignUpOrLoginTextArea'

// styles
import { screenContainerStyle, topMarginViewStyle, topAreaContainerStyle, mainContainerStyle, bottomStyleByWelcomeAndSignUpAndLogin } from '../constants/styles'

export function Welcome({ navigation }) {
	return (
		<SafeAreaView style={screenContainerStyle}>
			<View style={topMarginViewStyle}></View>
			<View style={topAreaContainerStyle}></View>
			<View style={mainContainerStyle}>
				{/* タイトル */}
				<HeadTitle navigation={navigation} title={"Welcome"} />
				{/* A-Chatロゴ */}
				<AChatLogo />
				<View style={bottomStyleByWelcomeAndSignUpAndLogin}>
					{/* 遷移ボタン */}
					<Button navigation={navigation} link={'SignUp'} buttonText={'Sign Up'} />
					{/* サインアップまたはログインへのリンク */}
					<ToSignUpOrLoginTextArea navigation={navigation} description={'Do you have an account?'} link={'LogIn'} linkText={'Login'} />
				</View>
			</View>
		</SafeAreaView>
	);
}
