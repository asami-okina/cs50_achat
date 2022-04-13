// libs
import React from 'react';
import { Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Pressable, Image, TextInput, StyleSheet } from 'react-native';

// constantsCommonStyles
import {constantsCommonStyles} from '../../constants/styles/commonstyles'

import {SEARCH_FORM_HEIGHT, CONTENT_WIDTH, ICON_SIZE,STANDARD_FONT,LIGHT_GRAY_COLOR } from '../../constants/layout'

// 丸みを帯びている白いトップ部分
export function TopAreaContainer({ title,searchForm,searchFormProps }) {
	return (
			<View style={constantsCommonStyles.topAreaContainerStyle}>
				{/* タイトルがあれば表示 */}
				{title !== 0 && (
					<Text style={constantsCommonStyles.topAreaTitleStyle}>{title}</Text>
				)}
				{searchForm && (
					<Pressable onPress={() => searchFormProps.textInputSearch.focus()} >
						<View style={styles.searchViewStyle}>
							<TextInput
								onChangeText={searchFormProps.setSearchText}
								style={styles.searchContentStyle}
								value={searchFormProps.searchText}
								placeholder="Search by name"
								ref={(input) => searchFormProps.textInputSearch = input}
								autoCapitalize="none"
								textContentType="username"
								onFocus={() => {
								}}
								onEndEditing={() => {
									searchFormProps._searchName(searchFormProps.searchText)
								}}
								clearButtonMode="while-editing"
								clearTextOnFocus={true}
							/>
							<Image source={require("../../../assets/images/search.png")} style={styles.searchIconStyle} />
						</View>
					</Pressable>
				)}
			</View>
	);
}


export const styles = StyleSheet.create({
	// 検索フォーム
	searchIconStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		marginRight: 10,
		marginLeft: 10,
	},
	searchViewStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: LIGHT_GRAY_COLOR,
		height: SEARCH_FORM_HEIGHT,
		borderRadius: 5,
		width: CONTENT_WIDTH,
	},
	searchContentStyle: {
		paddingLeft: 10,
		flex: 1,
		fontFamily:STANDARD_FONT
	},
});
