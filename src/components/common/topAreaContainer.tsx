// libs
import React, { useState } from 'react';
import { Text, View, Pressable, Image, TextInput,StyleSheet } from 'react-native';

// constantsCommonStyles
import { constantsCommonStyles } from '../../constants/styles/commonStyles'

// constantsSearchStyles
import { searchStyles } from '../../constants/styles/searchStyles'

// layouts
import { ICON_SIZE } from '../../constants/layout'

// 丸みを帯びている白いトップ部分
export function TopAreaContainer({
	title,
	searchForm,
	searchFormProps
}) {
	const [deleteIconDisplay, setDeleteIconDisplay] = useState(false)
	return (
		<View style={constantsCommonStyles.topAreaContainerStyle}>
			{/* タイトルがあれば表示 */}
			{title !== 0 && (
				<Text style={constantsCommonStyles.topAreaTitleStyle}>{title}</Text>
			)}
			{searchForm && (
				<Pressable onPress={() => searchFormProps.textInputSearch.focus()} >
					<View style={searchStyles.searchViewStyle}>
						<TextInput
							onChangeText={searchFormProps.setSearchText}
							style={searchStyles.searchContentNoneLeftIconStyle}
							value={searchFormProps.searchText}
							placeholder="Search by name"
							ref={(input) => searchFormProps.textInputSearch = input}
							autoCapitalize="none"
							textContentType="username"
							onFocus={() => {
								setDeleteIconDisplay(true)
							}}
							onEndEditing={() => {
								searchFormProps._searchName(searchFormProps.searchText)

								// 検索中フラグをtrueにする
								if (searchFormProps.setIsDuringSearch) {
									searchFormProps.setIsDuringSearch(true)
								}

								// 削除アイコンの表示/非表示切り替え
								setDeleteIconDisplay(true)
							}}
						/>
						{deleteIconDisplay && (
							<Pressable onPress={() => {
								searchFormProps.textInputSearch.clear();
								searchFormProps.setIsDuringSearch(false)
							}} >
								<Image source={require("../../../assets/images/close_gray.png")} style={[searchStyles.searchIconStyle, styles.searchIconStyle]} />
							</Pressable>
						)}
						<Image source={require("../../../assets/images/search.png")} style={searchStyles.searchIconStyle} />
					</View>
				</Pressable>
			)}
		</View>
	);
}

export const styles = StyleSheet.create({
	searchIconStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,

	},
});
