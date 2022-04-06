import React from 'react';
import { Text,View, Image, TextInput, Pressable} from 'react-native';
import { styles } from '../../styles/signUpAndLogIn/signUpAndLogInStyles.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';


export function PasswordForm({
    inputAccessoryViewID,
    passwordText,
    setPasswordText,
    executedLoginAuthentication,
    onFocusInputMailOrPasseword,
    setOnFocusInputMailOrPasseword,

}) {
    // パスワードの表示/非表示アイコン
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

    return (
      <View>
        {/* Password */}
        <View style={styles.searchBoxStyle}>
            <View style={styles.searchWrapperStyle}>
                <Pressable style={styles.searchContainerStyle} onPress={() => textInputPassword.focus()}>
                    <Text style={styles.searchTitleStyle}>Password</Text>
                    <View style={executedLoginAuthentication ? onFocusInputMailOrPasseword ? styles.searchViewStyle:[styles.searchViewStyle, styles.inputIncorrectBorderColorStyle]: styles.searchViewStyle}>
                        <Image source={require("../../../assets/images/lock.png")} style={styles.searchIconStyle}/>
                        <TextInput
                            name="password"
                            placeholder="Password"
                            style={styles.searchContentStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="newPassword"
                            secureTextEntry={passwordVisibility}
                            value={passwordText}
                            enablesReturnKeyAutomatically
                            onChangeText={setPasswordText}
                            inputAccessoryViewID={inputAccessoryViewID}
                            ref={(input) => textInputPassword = input}
                            maxLength={200}
                            onFocus={() => {
                                // メールアドレスもしくはパスワード入力中判定
                                setOnFocusInputMailOrPasseword(true)
                            }}
                            onEndEditing={() => {
                            }}
                        />
                        <Pressable onPress={handlePasswordVisibility}>
                            <MaterialCommunityIcons name={rightIcon} size={22} color="#C5C5C7" style={styles.passwordIconStyle} />
                        </Pressable>
                    </View>
                </Pressable>
            </View>
        </View>
    </View>
  )
}

