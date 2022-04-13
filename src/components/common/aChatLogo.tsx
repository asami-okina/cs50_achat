import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MAIN_WHITE_COLOR, A_CHAT_LOG_SIZE } from '../../constants/layout'

export function AChatLogo() {
	return (
		<View style={styles.logoContainerStyle}>
			<Image style={styles.logoStyle} source={require("../../../assets/images/a-chat-logo-after.png")} />
		</View>
	);
}

const styles = StyleSheet.create({
	logoContainerStyle: {
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR,
	},
	logoStyle: {
		width: A_CHAT_LOG_SIZE,
		height: A_CHAT_LOG_SIZE,
	},
});
