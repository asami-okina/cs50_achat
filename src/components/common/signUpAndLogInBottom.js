import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { MAIN_WHITE_COLOR } from '../../constants/layout'
import { Button } from '../../components/common/button'
import { ToSignUpOrLoginTextArea } from '../../components/common/toSignUpOrLoginTextArea'

// SignUp,LogIn画面の下部分
export function SignUpAndLogInBottom({ navigation }) {
	return (
		<View style={styles.bottomStyle}>
			{/* 遷移ボタン */}
			<Button navigation={navigation} link={'SignUp'} buttonText={'Sign Up'} />
			{/* サインアップまたはログインへのリンク */}
			<ToSignUpOrLoginTextArea navigation={navigation} description={'Do you have an account?'} link={'LogIn'} linkText={'Login'} />
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
