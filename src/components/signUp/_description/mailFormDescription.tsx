// libs
import React from 'react';
import { Text, View, Image } from 'react-native';

// constantsFormDescriptionStyles
import { formDescriptionStyles } from '../../../constants/styles/formDescriptionStyles';

export function MailFormDescription({
	isCorrectMail,
	displayMailDescription,
	defaultDisplayMailIcons,
	isAvailableMail
}) {
	return (
		<View>
			{/* メールアドレスの説明文 */}
			{displayMailDescription ? !isCorrectMail || !isAvailableMail ? (
				<View style={formDescriptionStyles.descriptionBoxStyle}>
					<View style={formDescriptionStyles.descriptionWrapperStyle}>
						<View style={formDescriptionStyles.descriptionContainerStyle}>
							{!defaultDisplayMailIcons ? isCorrectMail ? <Image source={require("../../../../assets/images/correct.png")} style={formDescriptionStyles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={formDescriptionStyles.descriptionIconStyle} /> : null}
							<Text style={formDescriptionStyles.descriptionTextStyle}>Email address format is incorrect.</Text>
						</View>
					</View>
					<View style={formDescriptionStyles.descriptionContainerStyle}>
						{!defaultDisplayMailIcons ? isAvailableMail ? <Image source={require("../../../../assets/images/correct.png")} style={formDescriptionStyles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={formDescriptionStyles.descriptionIconStyle} /> : null}
						<Text style={formDescriptionStyles.descriptionTextStyle} >Available.</Text>
					</View>
				</View>
			) : null : null}
		</View>
	)
}
