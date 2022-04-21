// libs
import React, { useState } from 'react';
import {  View, Pressable, Image, TextInput,StyleSheet } from 'react-native';

// constantsSearchStyles
import { searchStyles } from '../../../constants/styles/searchStyles'

// layouts
import { ICON_SIZE } from '../../../constants/layout'


// 丸みを帯びている白いトップ部分
export function SearchForm({
	searchFormProps
}) {
	// 検索フォームの削除アイコン表示/非表示
	const [deleteIconDisplay, setDeleteIconDisplay] = useState(false)
	const userId = "asami11"
	return (
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
								// グループ数の再取得
								searchFormProps._fetGroupCount(userId)
								// 友達数の再取得
								searchFormProps._fetchFriendCount(userId)

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
								<Image source={require("../../../../assets/images/close_gray.png")} style={[searchStyles.searchIconStyle, styles.searchIconStyle]} />
							</Pressable>
						)}
						<Image source={require("../../../../assets/images/search.png")} style={searchStyles.searchIconStyle} />
					</View>
				</Pressable>
	);
}

export const styles = StyleSheet.create({
	searchIconStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		marginLeft: 0,
		marginRight: 0
	},
});
