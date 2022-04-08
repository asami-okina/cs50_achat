import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, A_CHAT_LOG_SIZE,MAIN_PINK_COLOR,HEAD_CONTAINER_HEIGHT,TOP_AREA_STYLE,TOP_AREA_LEFT_RADIUS,MAIN_TITLE_SIZE,MAIN_TITLE_FONT,START_SCREEN_HEIGHT,BUTTON_HEIGHT,CONTENT_WIDTH,STANDARD_FONT,BUTTON_TEXT_SIZE } from '../../constants/layout'
import {Button} from '../../components/common/button'
import {ToSignUpOrLoginTextArea} from '../../components/common/toSignUpOrLoginTextArea'

// SignUp,LogIn画面の下部分
export function SignUpAndLogInBottom({ navigation }) {
	return (
		<View style={styles.bottomStyle}>
			{/* 遷移ボタン */}
			<Button navigation={navigation} link={'SignUp'} buttonText={'Sign Up'}/>
			{/* サインアップまたはログインへのリンク */}
			<ToSignUpOrLoginTextArea navigation={navigation} description={'Do you have an account?'} link={'LogIn'} linkText={'Login'}/>
		</View>
	);
}

const styles = StyleSheet.create({
	bottomStyle: {
		alignItems: "center",
		flex: 1,
		backgroundColor: MAIN_WHITE_COLOR,
	},
});
