import React from 'react';
import { Text,View, Image, TextInput, Pressable} from 'react-native';
import { styles } from '../../styles/signUpAndLogIn/signUpAndLogInStyles.js';


export function MailForm({
  inputAccessoryViewID,
  emailText,
  setEmailText,
  executedLoginAuthentication,
  onFocusInputMailOrPasseword,
  setOnFocusInputMailOrPasseword,
}) {
    return (
      <View>
      {/* Email */}
      <View style={styles.searchBoxStyle}>
        <View style={styles.searchWrapperStyle}>
          <Pressable style={styles.searchContainerStyle} onPress={() => textInputEmail.focus()} >
              <Text style={styles.searchTitleStyle}>Email</Text>
              <View style={executedLoginAuthentication ? onFocusInputMailOrPasseword ? styles.searchViewStyle:[styles.searchViewStyle, styles.inputIncorrectBorderColorStyle]: styles.searchViewStyle}>
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
                        // メールアドレスもしくはパスワード入力中判定
                        setOnFocusInputMailOrPasseword(true)
                      }}
                      onEndEditing={() => {
                      }}
                  />
              </View>
          </Pressable>
        </View>
    </View>
  </View>
  )
}

