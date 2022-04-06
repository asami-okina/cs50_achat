import React from 'react';
import { Text,View, Image} from 'react-native';
import { styles } from '../../../styles/signUpAndLogIn/signUpAndLogInStyles';


export function PasswordFormDescription({
    displayPasswordDescription,
    isCorrectPassewordSymbol,
    isCorrectPassewordStringCount,
    defaultDisplayPasswordIcons,
}) {
    return (
      <View>
        {displayPasswordDescription ? !isCorrectPassewordSymbol || !isCorrectPassewordStringCount ? (
        <View style={styles.descriptionBoxStyle}>
            <View style={styles.descriptionWrapperStyle}>
                <View style={styles.descriptionContainerStyle}>
                    {!defaultDisplayPasswordIcons ? isCorrectPassewordSymbol ?  <Image source={require("../../../../assets/images/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
                    <Text style={styles.descriptionTextStyle}>Half-width alphanumeric symbols only.</Text>
                </View>
                <View style={styles.descriptionContainerStyle}>
                    {!defaultDisplayPasswordIcons ? isCorrectPassewordStringCount ?  <Image source={require("../../../../assets/images/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
                    <Text style={styles.descriptionTextStyle} >More than 5 and less than 200 characters.</Text>
                </View>
            </View>
        </View>
        ) : null: null}
    </View>
  )
}

