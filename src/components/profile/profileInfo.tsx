// libs
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, Pressable } from 'react-native';

// layouts
import { TAB_TITLE_TEXT_SIZE, TAB_FONT, MAIN_NAVY_COLOR, CONTENT_WIDTH, STANDARD_FONT, MAIN_WHITE_COLOR, MAIN_GRAY_COLOR, MAIN_YELLOW_GREEN } from '../../constants/layout'

export function ProfileInfo({ navigation, nickName, setNickName, isEnabled, setIsEnabled, fetchProfileByUserId }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// 検索可能トグルの変更関数
	const toggleSwitch = () => {
		// リレンダーするまではisEnabledは変わらないため、反転させた値を変数に保持しておく
		const newIsEnabled = !isEnabled
		setIsEnabled(newIsEnabled)
		_updateSearchFlag(newIsEnabled)
	}

	// 検索可能トグルの更新
	async function _updateSearchFlag(newIsEnabled) {
		try {
			// APIリクエスト
			const bodyData = {
				"isSetSearchFlag": true,
				"searchFlag": newIsEnabled,
			}
			const response = await fetch(`https://a-chat/api/users/${userId}/profile`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<View style={styles.profileContainerStyle}>
			{/* ユーザーID */}
			<View style={styles.listContainerStyle}>
				<Text style={styles.titleStyle}>User ID</Text>
				<Text style={styles.textStyle}>{userId}</Text>
			</View>
			{/* ニックネーム */}
			<Pressable onPress={() => { navigation.navigate('EditNickName', {"fetchProfileByUserId": fetchProfileByUserId}) }}>
				<View style={styles.listContainerStyle}>
					<Text style={styles.titleStyle}>NickName</Text>
					<View style={styles.nickNameContainerStyle}>
						<Text style={styles.textStyle}>{nickName}</Text>
						<Image source={require('../../../assets/images/back-arrow-icon.png')} style={styles.nextIconStyle} />
					</View>
				</View>
			</Pressable>
			{/* 検索許可トグル */}
			<View style={styles.listContainerStyle}>
				<Text style={styles.searchTitleStyle}>Search for friends by ID</Text>
				<View style={styles.searchContainerStyle}>
					<Switch
						trackColor={{ false: MAIN_GRAY_COLOR, true: MAIN_YELLOW_GREEN }}
						thumbColor={MAIN_WHITE_COLOR}
						ios_backgroundColor={MAIN_GRAY_COLOR}
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
				</View>
			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	titleStyle: {
		fontSize: TAB_TITLE_TEXT_SIZE,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
		width: 120,
	},
	profileContainerStyle: {
		marginTop: 64
	},
	listContainerStyle: {
		width: CONTENT_WIDTH,
		marginBottom: 30,
		flexDirection: "row",
	},
	nickNameContainerStyle: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row"
	},
	nextIconStyle: {
		width: 25,
		height: 25
	},
	textStyle: {
		fontFamily: STANDARD_FONT,
		fontSize: 16,
	},
	searchContainerStyle: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-end",
	},
	searchTitleStyle: {
		fontSize: TAB_TITLE_TEXT_SIZE,
		fontFamily: TAB_FONT,
		color: MAIN_NAVY_COLOR,
	},
})
