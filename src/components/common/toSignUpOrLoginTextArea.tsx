import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MAIN_PINK_COLOR, STANDARD_FONT } from '../../constants/layout'


type ToSignUpOrLoginTextAreaType = {
	navigation: any; // ★修正予定
	description: string;
	link: string;
}
// SignUp,LogIn画面のアカウントを持っているか確認している部分
export function ToSignUpOrLoginTextArea({
	navigation,
	description,
	link
}: ToSignUpOrLoginTextAreaType) {
	return (
		<View style={styles.toLoginStyle}>
			<Text style={styles.toLoginTextStyle}>{description}</Text>
			<TouchableOpacity onPress={() => navigation.navigate(link)}>
				<Text style={[styles.toLoginTextStyle, styles.toLoginTextLinkStyle]}>{link} here</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	toLoginStyle: {
		marginTop: 10,
		flexDirection: "row",
	},
	toLoginTextStyle: {
		fontFamily: STANDARD_FONT,
	},
	toLoginTextLinkStyle: {
		color: MAIN_PINK_COLOR,
		marginLeft: 10,
	},
});
