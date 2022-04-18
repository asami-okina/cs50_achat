
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MAIN_NAVY_COLOR, CONTENT_WIDTH, TAB_FONT, TAB_HEIGHT, TAB_TITLE_TEXT_SIZE } from '../../constants/layout'

export function AddGroupTitle({
	text
}) {
	return (
		<View style={styles.wrapperStyle}>
			<View style={styles.containerStyle}>
				<Text style={styles.textStyle}>{text}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapperStyle: {
		flex: 1,
		alignItems: "center",
		marginBottom: 10,
		minHeight: 40,
		maxHeight: 40,
	},
	containerStyle: {
		width: CONTENT_WIDTH,
		marginTop: 5,
		height: TAB_HEIGHT,
		flexDirection: "row",
		alignItems: "center",
	},
	textStyle: {
		fontSize: TAB_TITLE_TEXT_SIZE,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
	},
})
