import React, {useEffect, useState} from 'react';
import { Text,View, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import AppLoading from 'expo-app-loading';
import { MailForm } from '../components/logIn/mailForm';
import { PasswordForm } from '../components/logIn/passwordForm';
import { styles } from '../styles/signUpAndLogIn/signUpAndLogInStyles';
import { logInStyles } from '../styles/logIn/logIn';
import { postLoginAuthentication } from '../api/api';

function LogIn({navigation}) {
    // キーボードに完了ボタンを表示
    const inputAccessoryViewID = 'uniqueID';

    // メールアドレスの入力フォーム
    const [emailText, setEmailText] = useState("");

    // パスワードの入力フォーム
    const [passwordText, setPasswordText] = useState("");

    // メールアドレスもしくはパスワード入力中
    const [onFocusInputMailOrPasseword, setOnFocusInputMailOrPasseword] = useState(false)

    // ログインボタンをしたかどうか
    const [executedLoginAuthentication, setExecutedLoginAuthentication] = useState(false)


    // ログイン認証
    function loginAuthentication(){
        // resultには、APIからの戻り値を入れる
        let result = postLoginAuthentication(emailText, passwordText)
        if (result.certificationResult){
            // Home画面へ遷移
            navigation.navigate('Home')
        } else {
            // ログインボタンを押した
            setExecutedLoginAuthentication(true)
            setOnFocusInputMailOrPasseword(false)
        }
    }

    return (
    <KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
        <SafeAreaView style={styles.containerStyle}>
            <ScrollView style={styles.containerStyle}>
                <View style={styles.headContainerStyle}></View>
                <View style={styles.mainContainerStyle}></View>
                <View style={styles.headMessageContainerStyle}>
                    <Text style={styles.headMessageTextStyle}>Log In</Text>
                </View>
                {/* ログイン認証エラー */}
                {executedLoginAuthentication ? onFocusInputMailOrPasseword ? null: (
                    <View style={logInStyles.errorContainerStyle}>
                        <Text style={logInStyles.errorTextStyle}>Your e-mail address or password is incorrect.</Text>
                    </View>
                ): null}
                {/* Email */}
                <MailForm
                    inputAccessoryViewID={inputAccessoryViewID}
                    emailText={emailText}
                    setEmailText={setEmailText}
                    executedLoginAuthentication={executedLoginAuthentication}
                    onFocusInputMailOrPasseword={onFocusInputMailOrPasseword}
                    setOnFocusInputMailOrPasseword={setOnFocusInputMailOrPasseword}
                />
                {/* Password */}
                <PasswordForm
                    inputAccessoryViewID={inputAccessoryViewID}
                    passwordText={passwordText}
                    setPasswordText={setPasswordText}
                    executedLoginAuthentication={executedLoginAuthentication}
                    onFocusInputMailOrPasseword={onFocusInputMailOrPasseword}
                    setOnFocusInputMailOrPasseword={setOnFocusInputMailOrPasseword}
                />
                {/* パスワードを忘れた場合 */}
                <View style={logInStyles.forgotPasswordWrapperStyle}>
                    <TouchableOpacity style={logInStyles.forgotPasswordContainerStyle} onPress={() => console.log('検討予定')}>
                        <Text style={logInStyles.forgotPasswordTextStyle}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                {/* 画面下 */}
                <View style={styles.bottomStyle}>
                    <TouchableOpacity
                        style={emailText.length !== 0 && passwordText.length !== 0 ? executedLoginAuthentication ? onFocusInputMailOrPasseword ? styles.buttonContainerStyle : [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle] :styles.buttonContainerStyle: [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
                        onPress={() => {
                            if(emailText.length !== 0 && passwordText.length !== 0) {
                                loginAuthentication()
                            }
                        }}>
                        <Text style={styles.buttonTextStyle}>Log In</Text>
                    </TouchableOpacity>
                    <View style={styles.toLoginStyle}>
                        <Text style={styles.toLoginTextStyle}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('SignUp');
                        }}>
                            <Text style={[styles.toLoginTextStyle, styles.toLoginTextLinkStyle]}>Sign up here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </KeyboardAvoidingView>
    );
}


export default LogIn;