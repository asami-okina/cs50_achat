// libs
import React from 'react';
import { Text, View, Image } from 'react-native';

// constantsFormDescriptionStyles
import { formDescriptionStyles } from '../../../constants/styles/formDescriptionStyles';

export function PasswordFormDescription({
	displayPasswordDescription,
	isCorrectPassewordSymbol,
	isCorrectPassewordStringCount,
	defaultDisplayPasswordIcons,
}) {
	return (
		<View>
			{displayPasswordDescription ? !isCorrectPassewordSymbol || !isCorrectPassewordStringCount ? (
				<View style={formDescriptionStyles.descriptionBoxStyle}>
					<View style={formDescriptionStyles.descriptionWrapperStyle}>
						<View style={formDescriptionStyles.descriptionContainerStyle}>
							{!defaultDisplayPasswordIcons ? isCorrectPassewordSymbol ? <Image source={require("../../../../assets/images/correct.png")} style={formDescriptionStyles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={formDescriptionStyles.descriptionIconStyle} /> : null}
							<Text style={formDescriptionStyles.descriptionTextStyle}>Half-width alphanumeric symbols only.</Text>
						</View>
						<View style={formDescriptionStyles.descriptionContainerStyle}>
							{!defaultDisplayPasswordIcons ? isCorrectPassewordStringCount ? <Image source={require("../../../../assets/images/correct.png")} style={formDescriptionStyles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={formDescriptionStyles.descriptionIconStyle} /> : null}
							<Text style={formDescriptionStyles.descriptionTextStyle} >More than 5 and less than 200 characters.</Text>
						</View>
					</View>
				</View>
			) : null : null}
		</View>
	)
}
