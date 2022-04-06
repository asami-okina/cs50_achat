import React, {useState} from 'react';
import { Text,View, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, AlfaSlabOne_400Regular } from '@expo-google-fonts/alfa-slab-one';
import { ABeeZee_400Regular_Italic } from '@expo-google-fonts/abeezee';
import { MailForm } from './components/SignUp/mailForm';
import { PasswordForm } from './components/SignUp/passwordForm';
import { UserIdForm } from './components/SignUp/userIdForm';
import { styles } from './styles/SignUp/signUpStyles';

function SignUp({navigation}) {
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
                    />
                    {/* 画面下 */}
                    <View style={styles.bottomStyle}>
                        {isCorrectMail && isCorrectPassewordSymbol && isCorrectPassewordStringCount && isCorrectUserIdSymbol && isCorrectUserIdStringCount && isAvailableUserId ?
                        (
                            <TouchableOpacity
                                style={styles.buttonContainerStyle}>
                                    <Text style={styles.buttonTextStyle}>Sign Up</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[styles.buttonContainerStyle, styles.buttonContainerInvalidStyle]}
                                onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={styles.buttonTextStyle}>Sign Up</Text>
                            </TouchableOpacity>
                        )}
                        <View style={styles.toLoginStyle}>
                            <Text style={styles.toLoginTextStyle}>Do you have an account?</Text>
                            <Text style={[styles.toLoginTextStyle, styles.toLoginTextLinkStyle]}>Login here</Text>
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
}


export default SignUp;