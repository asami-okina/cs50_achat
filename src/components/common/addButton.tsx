import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, ADD_BUTTON_SIZE, SCREEN_WIDTH,CONTENT_WIDTH } from '../../constants/layout'

export function AddButton({ }) {
	console.log('SCREEN_WIDTH', SCREEN_WIDTH)
	const buttonSize = SCREEN_WIDTH - CONTENT_WIDTH / 8
	return (
		<View style={styles.boxStyle}>
		<View style={styles.wrapperStyle}>
			<View style={styles.containerStyle}>
				<TouchableOpacity
					style={styles.buttonStyle}
					onPress={() => { console.log('追加ボタンだよ')}}
				>
					<Image source={require('../../../assets/images/white_plus.png')} />
				</TouchableOpacity>
			</View>
		</View>
		</View>
	);
}

const styles = StyleSheet.create({
	boxStyle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: MAIN_WHITE_COLOR,
	},
	wrapperStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		width: CONTENT_WIDTH,
	},
	containerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		height: ADD_BUTTON_SIZE,
		alignItems: "flex-end",
		paddingBottom: 10,
	},
	buttonStyle: {
		alignItems: "center",
		justifyContent: "center",
		width: ADD_BUTTON_SIZE - 10, // containerStyleのpaddingBottom分引く
		height: ADD_BUTTON_SIZE - 10, // containerStyleのpaddingBottom分引く
		borderRadius: 10,
		backgroundColor: MAIN_NAVY_COLOR,
		textAlign: "center",
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 1,
	},
});

