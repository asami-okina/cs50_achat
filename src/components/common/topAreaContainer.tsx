// libs
import React from 'react';
import { Text, View } from 'react-native';

// constantsCommonStyles
import { constantsCommonStyles } from '../../constants/styles/commonStyles'


// components
import { SearchForm } from "../common/_topAreaContainer/searchForm"

// 丸みを帯びている白いトップ部分
export function TopAreaContainer({
	title,
	type,
	searchFormProps
}) {
	return (
		<View style={constantsCommonStyles.topAreaContainerStyle}>
			{/* タイトルがあれば表示 */}
			{title !== 0 && (
				<Text style={constantsCommonStyles.topAreaTitleStyle}>{title}</Text>
			)}
			{type === "searchForm" && (
				<SearchForm searchFormProps={searchFormProps} />
			)}
		</View>
	);
}
