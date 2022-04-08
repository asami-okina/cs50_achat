import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { MAIN_WHITE_COLOR, CONTENT_WIDTH } from '../../../constants/layout';

export function UserIdFormDescription({
	displayUserIdDescription,
	isCorrectUserIdSymbol,
	isCorrectUserIdStringCount,
	isAvailableUserId,
	defaultDisplayUserIcons
}) {
	return (
		<View>
			{/* ユーザーIDの説明文 */}
			{displayUserIdDescription ? !isCorrectUserIdSymbol || !isCorrectUserIdStringCount || !isAvailableUserId ? (
				<View style={styles.descriptionBoxStyle}>
					<View style={styles.descriptionWrapperStyle}>
						<View style={styles.descriptionContainerStyle}>
							{!defaultDisplayUserIcons ? isCorrectUserIdSymbol ? <Image source={require("../../../../assets/images/correct.png")} style={styles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle} /> : null}
							<Text style={styles.descriptionTextStyle}>Half-width alphanumeric characters only.</Text>
						</View>
						<View style={styles.descriptionContainerStyle}>
							{!defaultDisplayUserIcons ? isCorrectUserIdStringCount ? <Image source={require("../../../../assets/images/correct.png")} style={styles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle} /> : null}
							<Text style={styles.descriptionTextStyle} >More than 4 words and less than 100 words.</Text>
						</View>
						<View style={styles.descriptionContainerStyle}>
							{!defaultDisplayUserIcons ? isAvailableUserId ? <Image source={require("../../../../assets/images/correct.png")} style={styles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle} /> : null}
							<Text style={styles.descriptionTextStyle} >Available.</Text>
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
