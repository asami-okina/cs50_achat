// libs
import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';

// layouts
import { MAIN_NAVY_COLOR, MAIN_PINK_COLOR, MAIN_GRAY_COLOR, MORDAL_WIDTH, MORDAL_TEXT_CONTENT_WIDTH, STANDARD_FONT, MAIN_WHITE_COLOR } from '../../constants/layout'

export function ConfirmModal({
	modalVisible,
	setModalVisible,
	setClickedCancelMordal,
	setClickedOkMordal,
	modalText
}) {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}
		>
			<View style={styles.centeredViewStyle}>
				<View style={styles.modalViewStyle}>
					<Text style={styles.modalTextStyle}>{modalText}</Text>
					<View style={styles.borderStyle}>

					</View>
					<View style={styles.buttonContainerStyle}>
						<Pressable
							style={[styles.buttonStyle, styles.cancelButtonStyle]}
							onPress={() => {
								// 確認モーダルを閉じる
								setModalVisible(!modalVisible)
								// 確認モーダルで「Cancel」を押した判定
								setClickedCancelMordal(true)
							}}
						>
							<Text style={styles.cancelTextStyle}>Cancel</Text>
						</Pressable>
						<Pressable
							style={[styles.buttonStyle, styles.okButtonStyle]}
							onPress={() => {
								// 確認モーダルを閉じる
								setModalVisible(!modalVisible)
								// 確認モーダルで「Ok」を押した判定
								setClickedOkMordal(true)
							}}
						>
							<Text style={styles.okTextStyle}>Ok</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredViewStyle: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalViewStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		borderRadius: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: MORDAL_WIDTH,
	},
	buttonStyle: {
		padding: 10,
		elevation: 2,
		width: "50%",
	},
	cancelButtonStyle: {
		borderBottomLeftRadius: 20,
	},
	okButtonStyle: {
		borderBottomRightRadius: 20,
		borderLeftColor: MAIN_GRAY_COLOR,
		borderLeftWidth: 0.5,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	cancelTextStyle: {
		color: MAIN_NAVY_COLOR,
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: STANDARD_FONT,
	},
	okTextStyle: {
		color: MAIN_PINK_COLOR,
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: STANDARD_FONT,
	},
	modalTextStyle: {
		textAlign: "center",
		width: MORDAL_TEXT_CONTENT_WIDTH,
		marginTop: ((MORDAL_WIDTH) - (MORDAL_TEXT_CONTENT_WIDTH)) / 2,
		marginBottom: ((MORDAL_WIDTH) - (MORDAL_TEXT_CONTENT_WIDTH)) / 2,
		fontFamily: STANDARD_FONT,
	},
	buttonContainerStyle: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 50,
	},
	borderStyle: {
		borderBottomColor: MAIN_GRAY_COLOR,
		borderBottomWidth: 0.5,
		width: MORDAL_WIDTH,
	}
});
