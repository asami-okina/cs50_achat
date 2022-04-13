// libs
import React from 'react';
import { Text, View, Image } from 'react-native';

// constantsFormDescriptionStyles
import { formDescriptionStyles } from '../../../constants/styles/formDescriptionStyles';

export function MailFormDescription({
	isCorrectMail,
	displayMailDescription,
	defaultDisplayMailIcons,
}) {
	return (
		<View>
			{/* メールアドレスの説明文 */}
			{displayMailDescription ? !isCorrectMail ? (
				<View style={formDescriptionStyles.descriptionBoxStyle}>
					<View style={formDescriptionStyles.descriptionWrapperStyle}>
						<View style={formDescriptionStyles.descriptionContainerStyle}>
							{!defaultDisplayMailIcons ? isCorrectMail ? null : <Image source={require("../../../../assets/images/incorrect.png")} style={formDescriptionStyles.descriptionIconStyle} /> : null}
							<Text style={formDescriptionStyles.descriptionTextStyle}>Email address format is incorrect.</Text>
						</View>
					</View>
				</View>
			) : null : null}
		</View>
	)
}
