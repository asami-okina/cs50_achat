import React, {useState} from 'react';
import { Text,View, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, AlfaSlabOne_400Regular } from '@expo-google-fonts/alfa-slab-one';
import { ABeeZee_400Regular_Italic } from '@expo-google-fonts/abeezee';
import { MailForm } from '../components/logIn/mailForm';
import { PasswordForm } from '../components/logIn/passwordForm';
import { styles } from '../styles/signUpAndLogIn/signUpAndLogInStyles';
import { postLoginAuthentication } from '../api/api';

function LogIn({navigation}) {
    // フォントファミリーを導入
    let [fontsLoaded] = useFonts({
        AlfaSlabOne_400Regular,
        ABeeZee_400Regular_Italic
    });

    // キーボードに完了ボタンを表示
    const inputAccessoryViewID = 'uniqueID';

    // ログイン認証結果
    const [isAvailableMailAndPassword, setIsAvailableMailAndPassword] = useState(false)

    // ログインボタンカラー
    const [isAvailableButton, setIsAvailableButton] = useState(true)

    // メールアドレスの入力フォーム
    const [emailText, setEmailText] = useState("");

    // パスワードの入力フォーム
    const [passwordText, setPasswordText] = useState("");

    // ログイン認証
    function loginAuthentication(){
        // resultには、APIからの戻り値を入れる
        let result = postLoginAuthentication(emailText, passwordText)
        if (result.certificationResult){
            setIsAvailableMailAndPassword(true)
            setIsAvailableButton(true)
            // Home画面へ遷移
            navigation.navigate('Home')
        } else {
            setIsAvailableMailAndPassword(false)
            setIsAvailableButton(false)
        }
    }

    // フォントがダウンロードできていなかったら、ローディング画面を出す
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    // フォントがダウンロードできたら、画面を出力する 
        return (
        <KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
            <SafeAreaView style={styles.containerStyle}>
                <ScrollView style={styles.containerStyle}>
                    <View style={styles.headContainerStyle}></View>
                    <View style={styles.mainContainerStyle}></View>
                    <View style={styles.headMessageContainerStyle}>
                        <Text style={styles.headMessageTextStyle}>Log In</Text>
                    </View>
                    {/* Email */}
                    <MailForm
                        inputAccessoryViewID={inputAccessoryViewID}
                        isAvailableMailAndPassword={isAvailableMailAndPassword}
                        emailText={emailText}
                        setEmailText={setEmailText}
                        isAvailableButton={isAvailableButton}
                    />
                    {/* Password */}
                    <PasswordForm
                        inputAccessoryViewID={inputAccessoryViewID}
                        isAvailableMailAndPassword={isAvailableMailAndPassword}
                        passwordText={passwordText}
                        setPasswordText={setPasswordText}
                        isAvailableButton={isAvailableButton}
                    />
                    {/* 画面下 */}
                    <View style={styles.bottomStyle}>
                        <TouchableOpacity
                            style={isAvailableButton ? styles.buttonContainerStyle: [styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
                            onPress={() => loginAuthentication()}>
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
}


export default LogIn;