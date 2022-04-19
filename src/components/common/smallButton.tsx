// libs
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

// layouts
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, ADD_BUTTON_SIZE, CONTENT_WIDTH, BUTTON_BORDER_RADIUS, MAIN_BLACK_COLOR, SMALL_BUTTON_WIDTH } from '../../constants/layout'

export function SmallButton({ text, onPressFunction }) {
	return (
		<View style={styles.boxStyle}>
			<View style={styles.wrapperStyle}>
				<View style={styles.containerStyle}>
					<TouchableOpacity
						style={styles.buttonStyle}
						onPress={() => {
							onPressFunction()
						}}
					>
						<Text style={styles.textStyle}>{text}</Text>
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
		height: ADD_BUTTON_SIZE,
		alignItems: "flex-end",
	},
	buttonStyle: {
		alignItems: "center",
		justifyContent: "center",
		width: SMALL_BUTTON_WIDTH,
		height: 50,
		borderRadius: BUTTON_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
		textAlign: "center",
		shadowColor: MAIN_BLACK_COLOR,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 1,
	},
	textStyle: {
		color: MAIN_WHITE_COLOR,
	}
});

