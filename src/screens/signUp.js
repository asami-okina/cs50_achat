import React, {useState} from 'react';
import { Text,View, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import AppLoading from 'expo-app-loading';
import { MailForm } from '../components/signUp/mailForm';
import { PasswordForm } from '../components/signUp/passwordForm';
import { UserIdForm } from '../components/signUp/userIdForm';
import { styles } from '../styles/signUpAndLogIn/signUpAndLogInStyles';

function SignUp({navigation}) {
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

    return (
    <KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
        <SafeAreaView style={styles.containerStyle}>
            <ScrollView style={styles.containerStyle}>
                <View style={styles.headContainerStyle}></View>
                <View style={styles.mainContainerStyle}></View>
                <View style={styles.headMessageContainerStyle}>
                    <Text style={styles.headMessageTextStyle}>Sign Up</Text>
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
                {/* UserId */}
                <UserIdForm
                    inputAccessoryViewID={inputAccessoryViewID}
                    isCorrectUserIdSymbol={isCorrectUserIdSymbol}
                    setIsCorrectUserIdSymbol={setIsCorrectUserIdSymbol}
                    isCorrectUserIdStringCount={isCorrectUserIdStringCount}
                    setIsCorrectUserIdStringCount={setIsCorrectUserIdStringCount}
                    isAvailableUserId={isAvailableUserId}
                    setIsAvailableUserId={setIsAvailableUserId}
                    pageType={"SignUp"}
                />
                {/* 画面下 */}
                <View style={styles.bottomStyle}>
                    {isCorrectMail && isCorrectPassewordSymbol && isCorrectPassewordStringCount && isCorrectUserIdSymbol && isCorrectUserIdStringCount && isAvailableUserId ?
                    (
                        <TouchableOpacity
                            style={styles.buttonContainerStyle}
                            onPress={() => navigation.navigate('Home')}>
                                <Text style={styles.buttonTextStyle}>Sign Up</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}>
                                <Text style={styles.buttonTextStyle}>Sign Up</Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.toLoginStyle}>
                        <Text style={styles.toLoginTextStyle}>Do you have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                            <Text style={[styles.toLoginTextStyle, styles.toLoginTextLinkStyle]}>Login here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor= "hsl(0, 0%, 95%)" >
                    <View style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity style={styles.completeBoxStyle} onPress={() => Keyboard.dismiss()}>
                        <Text style={styles.completeTextStyle}>完了</Text>
                        </TouchableOpacity>
                    </View>
                </InputAccessoryView> */}
            </ScrollView>
        </SafeAreaView>
    </KeyboardAvoidingView>
    );
}


export default SignUp;