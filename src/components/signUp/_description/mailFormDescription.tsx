import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { MAIN_WHITE_COLOR, CONTENT_WIDTH } from '../../../constants/layout';


export function MailFormDescription({
	isCorrectMail,
	displayMailDescription,
	defaultDisplayMailIcons,
}) {
	return (
		<View>
			{/* メールアドレスの説明文 */}
			{displayMailDescription ? !isCorrectMail ? (
				<View style={styles.descriptionBoxStyle}>
					<View style={styles.descriptionWrapperStyle}>
						<View style={styles.descriptionContainerStyle}>
							{!defaultDisplayMailIcons ? isCorrectMail ? null : <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle} /> : null}
							<Text style={styles.descriptionTextStyle}>Email address format is incorrect.</Text>
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
		color: "#262626",
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
