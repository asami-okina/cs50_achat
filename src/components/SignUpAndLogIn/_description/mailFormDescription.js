import React from 'react';
import { Text,View, Image} from 'react-native';
import { styles } from '../../../styles/SignUpAndLogIn/signUpAndLogInStyles';


export function MailFormDescription({
  isCorrectMail,
  displayMailDescription,
  defaultDisplayMailIcons,
}) {
    return (
    <View>
    {/* メールアドレスの説明文 */}
    {displayMailDescription ? !isCorrectMail ? (
      <View style={styles.descriptionBoxStyle}>
        <View style={styles.descriptionWrapperStyle}>
          <View style={styles.descriptionContainerStyle}>
          {!defaultDisplayMailIcons ? isCorrectMail ?  null:  <Image source={require("../../../../assets/images/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
          <Text style={styles.descriptionTextStyle}>Email address format is incorrect.</Text>
          </View>
        </View>
      </View>
      ): null: null}
    </View>
  )
}

