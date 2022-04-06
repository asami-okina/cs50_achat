import React, {useState} from 'react';
import { Text,View, Image, TextInput, Pressable} from 'react-native';
import { styles } from '../../styles/signUpAndLogIn/signUpAndLogInStyles.js';
import { MailFormDescription } from './_description/mailFormDescription';


export function MailForm({
  inputAccessoryViewID,
  isCorrectMail,
  setIsCorrectMail,
}) {


    // 入力フォーム
    const [emailText, onChangeEmailText] = useState("");

    // メールアドレスの説明文表示
    const [displayMailDescription, setDisplayMailDescription] = useState(false);
    // メールアドレスアイコンのデフォルト表示
    const [defaultDisplayMailIcons, setDefaultDisplayMailIcons] = useState(false)
    // メールアドレスの入力フォームの枠線のデフォルト表示
    const [defaultMailBorderColor, setDefaultMailBorderColor] = useState(false)

    // メールフォームのラベル化
    let textInputEmail;

    // メールアドレスのバリデーション関数
    function mailValidation(){
      const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      if (!regexp.test(emailText)){
        // メールアドレスの説明文表示
        setDisplayMailDescription(true);
      }
      setIsCorrectMail(regexp.test(emailText))
    }
 
    return (
      <View>
      {/* Email */}
      <View style={styles.searchBoxStyle}>
        <View style={styles.searchWrapperStyle}>
          <Pressable style={styles.searchContainerStyle} onPress={() => textInputEmail.focus()} >
              <Text style={styles.searchTitleStyle}>Email</Text>
              <View style={defaultMailBorderColor ? isCorrectMail ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle]: styles.searchViewStyle}>
                  <Image source={require("../../../assets/images/email.png")} style={styles.searchIconStyle} onPress={() => textInputEmail.focus()}/>
                  <TextInput
                      onChangeText={onChangeEmailText}
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
                        // メールアドレスアイコンのデフォルト表示
                        setDefaultDisplayMailIcons(true)
                      }}
                      onEndEditing={() => {
                        // メールアドレスのバリデーション
                        mailValidation()
                        // メールアドレスの入力フォームの枠線のデフォルト表示
                        setDefaultMailBorderColor(true)
                        // メールアドレスアイコンのデフォルト表示
                        setDefaultDisplayMailIcons(false)
                      }}
                  />
              </View>
          </Pressable>
        </View>
    </View>
    {/* メールアドレスの説明文 */}
      <MailFormDescription isCorrectMail={isCorrectMail} displayMailDescription={displayMailDescription} defaultDisplayMailIcons={defaultDisplayMailIcons}/>
    </View>
  )
}

