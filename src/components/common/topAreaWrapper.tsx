// libs
import React from 'react';
import { View } from 'react-native';

// constantsCommonStyles
import { constantsCommonStyles } from '../../constants/styles/commonStyles'

// 丸みを帯びている白いトップ部分
export function TopAreaWrapper({
	type,
	children,
}) {
	return (
		<View style={type === "addGroupSetting" ? constantsCommonStyles.topAreaContainerGroupSettingStyle : constantsCommonStyles.topAreaContainerStyle}>
			{children}
		</View>
	);
}
