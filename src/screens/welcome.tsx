// libs
import React from 'react';
import { View, SafeAreaView, } from 'react-native';

// components
import { Button } from '../components/common/button'
import { HeadTitle } from '../components/common/headTitle';
import { AChatLogo } from '../components/common/aChatLogo'
import { ToSignUpOrLoginTextArea } from '../components/common/toSignUpOrLoginTextArea'
import {TopAreaContainer} from '../components/common/topAreaContainer'

// constantsCommonStyles
import {constantsCommonStyles} from '../constants/styles/commonstyles'

export function Welcome({ navigation }) {
	return (
		<SafeAreaView style={constantsCommonStyles.screenContainerStyle}>
			{/* 画面一番上にある青色の余白部分 */}
			<View style={constantsCommonStyles.topMarginViewStyle}></View>
			{/* 丸みを帯びている白いトップ部分 */}
			<TopAreaContainer title={null} searchForm={null} searchFormProps={null} />
			<View style={constantsCommonStyles.mainContainerStyle}>
				{/* タイトル */}
				<HeadTitle title={"Welcome"} />
				{/* A-Chatロゴ */}
				<AChatLogo />
				<View style={constantsCommonStyles.bottomStyleByWelcomeAndSignUpAndLogin}>
					{/* 遷移ボタン */}
					<Button navigation={navigation} link={'SignUp'} buttonText={'Sign Up'} enable={true} scene={'Welcome'} loginProps={null} />
					{/* サインアップまたはログインへのリンク */}
					<ToSignUpOrLoginTextArea navigation={navigation} description={'Do you have an account?'} link={'LogIn'} />
				</View>
			</View>
		</SafeAreaView>
	);
}
