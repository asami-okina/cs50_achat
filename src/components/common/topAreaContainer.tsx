// libs
import React from 'react';
import { Text, View, Pressable, Image, TextInput } from 'react-native';

// constantsCommonStyles
import { constantsCommonStyles } from '../../constants/styles/commonStyles'

// constantsSearchStyles
import { searchStyles } from '../../constants/styles/searchStyles'

// 丸みを帯びている白いトップ部分
export function TopAreaContainer({
	title,
	searchForm,
	searchFormProps
}) {
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
							}}
							onEndEditing={() => {
								searchFormProps._searchName(searchFormProps.searchText)
							}}
							clearButtonMode="while-editing"
							clearTextOnFocus={true}
						/>
						<Image source={require("../../../assets/images/search.png")} style={searchStyles.searchIconStyle} />
					</View>
				</Pressable>
			)}
		</View>
	);
}
