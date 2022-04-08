// libs
import React from 'react';
import { View, SafeAreaView, Text} from 'react-native';

// styles
import { topAreaTitleStyle, screenContainerStyle, topMarginViewStyle, topAreaContainerStyle, mainContainerStyle, bottomStyleByWelcomeAndSignUpAndLogin } from '../../constants/styles'

// 丸みを帯びている白いトップ部分
export function TopAreaContainer({ title }) {
	return (
			<View style={topAreaContainerStyle}>
				{/* タイトルがあれば表示 */}
				{title !== 0 && (
					<Text style={topAreaTitleStyle}>{title}</Text>
				)}
			</View>
	);
}
