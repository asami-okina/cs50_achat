import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { MAIN_WHITE_COLOR, CONTENT_WIDTH,MAIN_BLACK_COLOR } from '../../../constants/layout';

export function PasswordFormDescription({
	displayPasswordDescription,
	isCorrectPassewordSymbol,
	isCorrectPassewordStringCount,
	defaultDisplayPasswordIcons,
}) {
	return (
		<View>
			{displayPasswordDescription ? !isCorrectPassewordSymbol || !isCorrectPassewordStringCount ? (
				<View style={styles.descriptionBoxStyle}>
					<View style={styles.descriptionWrapperStyle}>
						<View style={styles.descriptionContainerStyle}>
							{!defaultDisplayPasswordIcons ? isCorrectPassewordSymbol ? <Image source={require("../../../../assets/images/correct.png")} style={styles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle} /> : null}
							<Text style={styles.descriptionTextStyle}>Half-width alphanumeric symbols only.</Text>
						</View>
						<View style={styles.descriptionContainerStyle}>
							{!defaultDisplayPasswordIcons ? isCorrectPassewordStringCount ? <Image source={require("../../../../assets/images/correct.png")} style={styles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle} /> : null}
							<Text style={styles.descriptionTextStyle} >More than 5 and less than 200 characters.</Text>
						</View>
					</View>
				</View>
			) : null : null}
		</View>
	)
}

export const styles = StyleSheet.create({
	// 説明文
	descriptionBoxStyle: {
		display: "flex",
		alignItems: "center",
		backgroundColor: MAIN_WHITE_COLOR,
		paddingBottom: 10,
	},
	descriptionWrapperStyle: {
	},
	descriptionContainerStyle: {
		flexDirection: "row",
		width: CONTENT_WIDTH,
	},
	descriptionTextStyle: {
		color: MAIN_BLACK_COLOR,
		fontSize: 12,
		overflow: "visible"
	},
	// 共通説明文のアイコンの大きさ
	descriptionIconStyle: {
		marginRight: 10,
		width: 12,
		height: 12,
	},
});
