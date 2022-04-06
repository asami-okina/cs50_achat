import React, {useState} from 'react';
import { Text,View, Image, TextInput, Pressable} from 'react-native';
import { styles } from '../../styles/signUpAndLogIn/signUpAndLogInStyles.js';


export function MailForm({
  inputAccessoryViewID,
  isAvailableMailAndPassword,
  emailText,
  setEmailText,
  isAvailableButton,
}) {
    // メールアドレスの入力フォームの枠線のデフォルト表示
    const [defaultMailBorderColor, setDefaultMailBorderColor] = useState(false)
    return (
      <View>
      {/* Email */}
      <View style={styles.searchBoxStyle}>
        <View style={styles.searchWrapperStyle}>
          <Pressable style={styles.searchContainerStyle} onPress={() => textInputEmail.focus()} >
              <Text style={styles.searchTitleStyle}>Email</Text>
              <View style={isAvailableButton ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle]}>
                  <Image source={require("../../../assets/images/email.png")} style={styles.searchIconStyle} onPress={() => textInputEmail.focus()}/>
                  <TextInput
                      onChangeText={setEmailText}
                      style={styles.searchContentStyle}
                      value={emailText}
                      placeholder="a-chat@test.com"
                      inputAccessoryViewID={inputAccessoryViewID}
                      ref={(input) => textInputEmail = input}
                      autoCapitalize="none"
                      textContentType="emailAddress"
                      onFocus={() => {
                        // メールアドレスの入力フォームの枠線のデフォルト表示
                        setDefaultMailBorderColor(false)
                      }}
                      onEndEditing={() => {
                        // メールアドレスの入力フォームの枠線のデフォルト表示
                        setDefaultMailBorderColor(true)
                      }}
                  />
              </View>
          </Pressable>
        </View>
    </View>
  </View>
  )
}

