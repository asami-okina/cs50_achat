// libs
import React from 'react';
import { View } from 'react-native';

// asamiStyles
import { asamiStyles } from '../../constants/styles/asamiStyles'

// 丸みを帯びている白いトップ部分
export function TopAreaWrapper({
	type,
	children,
}) {
	return (
		<View style={type === "addGroupSetting" ? asamiStyles.topAreaContainerGroupSettingStyle : asamiStyles.topAreaContainerStyle}>
			{children}
		</View>
	);
}
