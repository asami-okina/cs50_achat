import React, {useState} from 'react';
import { Text,View, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, AlfaSlabOne_400Regular } from '@expo-google-fonts/alfa-slab-one';
import { ABeeZee_400Regular_Italic } from '@expo-google-fonts/abeezee';
import { MailForm } from '../components/SignUpAndLogIn/mailForm';
import { PasswordForm } from '../components/SignUpAndLogIn/passwordForm';
import { styles } from '../styles/SignUpAndLogIn/signUpAndLogInStyles';

function LogIn({navigation}) {
    // フォントファミリーを導入
    let [fontsLoaded] = useFonts({
        AlfaSlabOne_400Regular,
        ABeeZee_400Regular_Italic
    });

    // キーボードに完了ボタンを表示
    const inputAccessoryViewID = 'uniqueID';

    // バリデーション
    // メールアドレスのバリデーション
    const [isCorrectMail, setIsCorrectMail] =  useState(false);

    // パスワードのバリデーション(半角英数字記号)
    const [isCorrectPassewordSymbol, setIsCorrectPassewordSymbol] = useState(false);
    // パスワードのバリデーション(文字数)
    const [isCorrectPassewordStringCount, setIsCorrectPassewordStringCount] = useState(false);

    // ユーザーIDのバリデーション(半角英数字)
    const [isCorrectUserIdSymbol, setIsCorrectUserIdSymbol] =  useState(false);
    // ユーザーIDのバリデーション(文字数)
    const [isCorrectUserIdStringCount, setIsCorrectUserIdStringCount] = useState(false);
    // ユーザーIDのバリデーション(使用可能かどうか)
    const [isAvailableUserId, setIsAvailableUserId] = useState(false)

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
                        isCorrectMail={isCorrectMail}
                        setIsCorrectMail={setIsCorrectMail}
                    />
                    {/* Password */}
                    <PasswordForm
                        inputAccessoryViewID={inputAccessoryViewID}
                        isCorrectPassewordSymbol={isCorrectPassewordSymbol}
                        setIsCorrectPassewordSymbol={setIsCorrectPassewordSymbol}
                        isCorrectPassewordStringCount={isCorrectPassewordStringCount}
                        setIsCorrectPassewordStringCount={setIsCorrectPassewordStringCount}
                    />
                    {/* 画面下 */}
                    <View style={styles.bottomStyle}>
                        {isCorrectMail && isCorrectPassewordSymbol && isCorrectPassewordStringCount && isCorrectUserIdSymbol && isCorrectUserIdStringCount && isAvailableUserId ?
                        (
                            <TouchableOpacity
                                style={styles.buttonContainerStyle}
                                onPress={() => navigation.navigate('Home')}>
                                    <Text style={styles.buttonTextStyle}>Log In</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}>
                                    <Text style={styles.buttonTextStyle}>Log In</Text>
                            </TouchableOpacity>
                        )}
                        <View style={styles.toLoginStyle}>
                            <Text style={styles.toLoginTextStyle}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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