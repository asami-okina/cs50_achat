import React from 'react';
import { Text,View, Image} from 'react-native';
import { styles } from '../../../styles/signUpAndLogIn/signUpAndLogInStyles';


export function UserIdFormDescription({
    displayUserIdDescription,
    isCorrectUserIdSymbol,
    isCorrectUserIdStringCount,
    isAvailableUserId,
    defaultDisplayUserIcons
}) {
    return (
      <View>
        {/* ユーザーIDの説明文 */}
        {displayUserIdDescription ? !isCorrectUserIdSymbol || !isCorrectUserIdStringCount || !isAvailableUserId ? (
        <View style={styles.descriptionBoxStyle}>
        <View style={styles.descriptionWrapperStyle}>
            <View style={styles.descriptionContainerStyle}>
            {!defaultDisplayUserIcons ? isCorrectUserIdSymbol ?  <Image source={require("../../../../assets/images/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
            <Text style={styles.descriptionTextStyle}>Half-width alphanumeric characters only.</Text>
            </View>
            <View style={styles.descriptionContainerStyle}>
            {!defaultDisplayUserIcons ? isCorrectUserIdStringCount ?  <Image source={require("../../../../assets/images/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
            <Text style={styles.descriptionTextStyle} >More than 4 words and less than 100 words.</Text>
            </View>
            <View style={styles.descriptionContainerStyle}>
            {!defaultDisplayUserIcons ? isAvailableUserId ?  <Image source={require("../../../../assets/images/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
            <Text style={styles.descriptionTextStyle} >Available.</Text>
            </View>
        </View>
        </View>
    ) : null: null}
    </View>
  )
}