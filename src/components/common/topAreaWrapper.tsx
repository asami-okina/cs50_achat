// libs
import React from 'react';
import { View } from 'react-native';

// commonStyles
import { commonStyles } from '../../constants/styles/commonStyles'

// 丸みを帯びている白いトップ部分
export function TopAreaWrapper({
	type,
	children,
}) {
	return (
		<View style={type === "addGroupSetting" ? commonStyles.topAreaContainerGroupSettingStyle : commonStyles.topAreaContainerStyle}>
			{children}
		</View>
	);
}
