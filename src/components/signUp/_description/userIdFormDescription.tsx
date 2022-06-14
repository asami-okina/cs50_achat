// libs
import React from 'react';
import { Text, View, Image } from 'react-native';

// constantsFormDescriptionStyles
import { formDescriptionStyles } from '../../../constants/styles/formDescriptionStyles';

type UserIdFormDescriptionPropsType = {
	displayUserIdDescription: boolean;
	isCorrectUserIdSymbol: boolean;
	isCorrectUserIdStringCount: boolean;
	isAvailableUserId: boolean;
	defaultDisplayUserIcons: boolean;
}

export function UserIdFormDescription({
	displayUserIdDescription,
	isCorrectUserIdSymbol,
	isCorrectUserIdStringCount,
	isAvailableUserId,
	defaultDisplayUserIcons
}:UserIdFormDescriptionPropsType) {
	return (
		<View>
			{/* ユーザーIDの説明文 */}
			{displayUserIdDescription ? !isCorrectUserIdSymbol || !isCorrectUserIdStringCount || !isAvailableUserId ? (
				<View style={formDescriptionStyles.descriptionBoxStyle}>
					<View style={formDescriptionStyles.descriptionWrapperStyle}>
						<View style={formDescriptionStyles.descriptionContainerStyle}>
							{!defaultDisplayUserIcons ? isCorrectUserIdSymbol ? <Image source={require("../../../../assets/images/correct.png")} style={formDescriptionStyles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={formDescriptionStyles.descriptionIconStyle} /> : null}
							<Text style={formDescriptionStyles.descriptionTextStyle}>Half-width alphanumeric characters only.</Text>
						</View>
						<View style={formDescriptionStyles.descriptionContainerStyle}>
							{!defaultDisplayUserIcons ? isCorrectUserIdStringCount ? <Image source={require("../../../../assets/images/correct.png")} style={formDescriptionStyles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={formDescriptionStyles.descriptionIconStyle} /> : null}
							<Text style={formDescriptionStyles.descriptionTextStyle} >More than 4 words and less than 100 words.</Text>
						</View>
						<View style={formDescriptionStyles.descriptionContainerStyle}>
							{!defaultDisplayUserIcons ? isAvailableUserId ? <Image source={require("../../../../assets/images/correct.png")} style={formDescriptionStyles.descriptionIconStyle} /> : <Image source={require("../../../../assets/images/incorrect.png")} style={formDescriptionStyles.descriptionIconStyle} /> : null}
							<Text style={formDescriptionStyles.descriptionTextStyle} >Available.</Text>
						</View>
					</View>
				</View>
			) : null : null}
		</View>
	)
}
