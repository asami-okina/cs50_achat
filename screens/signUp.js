import React from 'react';
import { Text,View, SafeAreaView, ScrollView, TouchableOpacity,TouchableWithoutFeedback, InputAccessoryView, Keyboard, Pressable} from 'react-native';
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

  // フォントがダウンロードできていなかったら、ローディング画面を出す
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  // フォントがダウンロードできたら、画面を出力する 
    return (
        <TouchableWithoutFeedback>
            <SafeAreaView style={styles.containerStyle}>
                <ScrollView>
                    <View style={styles.headContainerStyle}></View>
                    <View style={styles.mainContainerStyle}></View>
                    <View style={styles.headMessageContainerStyle}>
                        <Text style={styles.headMessageTextStyle}>Sign Up</Text>
                    </View>
                    {/* Email */}
                    <MailForm inputAccessoryViewID={inputAccessoryViewID} />
                    {/* Password */}
                    <PasswordForm inputAccessoryViewID={inputAccessoryViewID} />
                    {/* UserId */}
                    <UserIdForm inputAccessoryViewID={inputAccessoryViewID} />
                    {/* 下の部分 */}
                    <View style={styles.paddingStyle}></View>
                    <View style={styles.bottomStyle}>
                        <TouchableOpacity
                            style={styles.buttonContainerStyle}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                          <Text style={styles.buttonTextStyle}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={styles.toLoginStyle}>
                            <Text style={styles.toLoginTextStyle}>Do you have an account?</Text>
                            <Text style={[styles.toLoginTextStyle, styles.toLoginTextLinkStyle]}>Login here</Text>
                        </View>
                    </View>
                    <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor= "hsl(0, 0%, 95%)" >
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity style={styles.completeBoxStyle} onPress={() => Keyboard.dismiss()}>
                            <Text style={styles.completeTextStyle}>完了</Text>
                            </TouchableOpacity>
                        </View>
                    </InputAccessoryView>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
  }
}


export default SignUp;

