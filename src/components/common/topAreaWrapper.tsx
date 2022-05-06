// libs
import React from 'react';
import { View } from 'react-native';

// sameStyles
import { sameStyles } from '../../constants/styles/sameStyles'

// 丸みを帯びている白いトップ部分
export function TopAreaWrapper({
	type,
	children,
}) {
	return (
		<View style={type === "addGroupSetting" ? sameStyles.topAreaContainerGroupSettingStyle : sameStyles.topAreaContainerStyle}>
			{children}
		</View>
	);
}
