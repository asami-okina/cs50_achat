// libs
import React from 'react';
import { View, Text} from 'react-native';

// constantsStyles
import {constantsStyles} from '../../constants/styles'

// 丸みを帯びている白いトップ部分
export function TopAreaContainer({ title }) {
	return (
			<View style={constantsStyles.topAreaContainerStyle}>
				{/* タイトルがあれば表示 */}
				{title !== 0 && (
					<Text style={constantsStyles.topAreaTitleStyle}>{title}</Text>
				)}
			</View>
	);
}
