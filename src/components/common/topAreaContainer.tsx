// libs
import React from 'react';
import { Text, View } from 'react-native';

// constantsCommonStyles
import { constantsCommonStyles } from '../../constants/styles/commonStyles'


// components
import { SearchForm } from "../common/_topAreaContainer/searchForm"
import {GroupImageAndGroupName} from "../common/_topAreaContainer/groupImageAndGroupName"

// 丸みを帯びている白いトップ部分
export function TopAreaContainer({
	title,
	type,
	setSearchText,
	searchText,
	textInputSearch,
	searchName,
	fetchGroupCount,
	fetchFriendCount,
	setIsDuringSearch
}) {
	return (
		<View style={type === "addGroupSetting" ? constantsCommonStyles.topAreaContainerGroupSettingStyle : constantsCommonStyles.topAreaContainerStyle}>
			{/* タイトルがあれば表示 */}
			{title !== 0 && (
				<Text style={constantsCommonStyles.topAreaTitleStyle}>{title}</Text>
			)}
			{type === "searchForm" && (
				<SearchForm setSearchText={setSearchText} searchText={searchText} textInputSearch={textInputSearch} searchName={searchName} fetchGroupCount={fetchGroupCount} fetchFriendCount={fetchFriendCount} setIsDuringSearch={setIsDuringSearch} />
			)}
			{type == "addGroupSetting" && (
				<GroupImageAndGroupName />
			)}
		</View>
	);
}
