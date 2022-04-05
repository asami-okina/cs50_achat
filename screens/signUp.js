import React, {useState} from 'react';
import { Text,View,StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput,TouchableWithoutFeedback, InputAccessoryView, Keyboard, Pressable} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, AlfaSlabOne_400Regular } from '@expo-google-fonts/alfa-slab-one';
import { ABeeZee_400Regular_Italic } from '@expo-google-fonts/abeezee';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from './hooks/useTogglePasswordVisibility';
import {fetchIsAvailableUserId} from "../api/api";

function SignUp({navigation}) {
    // 入力フォーム
    const [emailText, onChangeEmailText] = useState("");
    const [passwordText, onChangePasswordText] = useState("");
    const [userIdText, onChangeUserIdText] = useState("");

    // メールアドレスの説明文表示
    const [displayMailDescription, setDisplayMailDescription] = useState(false);
    // メールアドレスアイコンのデフォルト表示
    const [defaultDisplayMailIcons, setDefaultDisplayMailIcons] = useState(false)
    // メールアドレスのバリデーション
    const [isCorrectMail, setIsCorrectMail] =  useState(false);
    // メールアドレスの入力フォームの枠線のデフォルト表示
    const [defaultMailBorderColor, setDefaultMailBorderColor] = useState(false)
    
    
    // パスワードの説明文表示
    const [displayPasswordDescription, setDisplayPasswordDescription] = useState(false);
    // パスワードの表示/非表示アイコン
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    // パスワードアイコンのデフォルト表示
    const [defaultDisplayPasswordIcons, setDefaultDisplayPasswordIcons] = useState(false)
    // パスワードのバリデーション(半角英数字記号)
    const [isCorrectPassewordSymbol, setIsCorrectPassewordSymbol] = useState(false);
    // パスワードのバリデーション(文字数)
    const [isCorrectPassewordStringCount, setIsCorrectPassewordStringCount] = useState(false);
    // パスワードの入力フォームの枠線のデフォルト表示
    const [defaultPasswordBorderColor, setDefaultPasswordBorderColor] = useState(false)

    // ユーザーIDの説明文表示
    const [displayUserIdDescription, setDisplayUserIdDescription] = useState(false);
    // ユーザーIDアイコンのデフォルト表示
    const [defaultDisplayUserIcons, setDefaultDisplayUserIcons] = useState(false)
    // ユーザーIDのバリデーション(半角英数字)
    const [isCorrectUserIdSymbol, setIsCorrectUserIdSymbol] =  useState(false);
    // ユーザーIDのバリデーション(文字数)
    const [isCorrectUserIdStringCount, setIsCorrectUserIdStringCount] = useState(false);
    // ユーザーIDのバリデーション(使用可能かどうか)
    const [isAvailableUserId, setIsAvailableUserId] = useState(false)
    // ユーザーIDの入力フォームの枠線のデフォルト表示
    const [defaultUserIdBorderColor, setDefaultUserIdBorderColor] = useState(false)
 

    // メールフォームのラベル化
    let textInputEmail;
    // パスワードフォームのラベル化
    let textInputPassword;
    // ユーザーIDフォームのラベル化
    let textInputUserId;

    // キーボードに完了ボタンを表示
    const inputAccessoryViewID = 'uniqueID';

    // フォントファミリーを導入
    let [fontsLoaded] = useFonts({
        AlfaSlabOne_400Regular,
        ABeeZee_400Regular_Italic
    });

    // メールアドレスのバリデーション関数
    function mailValidation(){
      const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      if (!regexp.test(emailText)){
        // メールアドレスの説明文表示
        setDisplayMailDescription(true);
      }
      setIsCorrectMail(regexp.test(emailText))
    }

    // パスワード(半角英数字記号)のバリデーション関数
    function passwordSymbolVaridation(){
      const regexp = /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/;
      setIsCorrectPassewordSymbol(regexp.test(passwordText))
    }

    // パスワード(文字数:5文字以上200文字未満)のバリデーション
    function passwordStringCountValidation(){
      let passwordLength = passwordText.length;

      // パスワードの文字数が5文字以上200文字未満であれば、バリデーションが通る
      if (passwordLength >= 5 && passwordLength < 200) {
        setIsCorrectPassewordStringCount(true)
      } else {
        setIsCorrectPassewordStringCount(false)
      }
    }

    // ユーザーID(半角英数字)のバリデーション
    function userIdSymbolValidation(){
      const regexp = /^[0-9a-zA-Z]*$/;
      setIsCorrectUserIdSymbol(regexp.test(userIdText))
    }

    // ユーザーID(文字数:4文字以上100文字以内)のバリデーション
    function userIdStringCountValidation(){
      let userIdLength = userIdText.length;

      // ユーザーIDの文字数が4文字以上100文字以内であれば、バリデーションが通る
      if (userIdLength >= 4 && userIdLength <= 100){
        setIsCorrectUserIdStringCount(true)
      } else {
        setIsCorrectUserIdStringCount(false)
      }
    }

    // ユーザーID(使用可能かどうか)のバリデーション
    function isAvailableUserIdValidation(){
      // checkedUserIdには、APIからの戻り値を入れる
      let result = fetchIsAvailableUserId()
      if (result.isAvailableUserId){
        setIsAvailableUserId(true)
      } else {
        setIsAvailableUserId(false)
      }
    }

    
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
                        <View style={styles.searchBoxStyle}>
                            <View style={styles.searchWrapperStyle}>
                                <Pressable style={styles.searchContainerStyle} onPress={() => textInputEmail.focus()} >
                                    <Text style={styles.searchTitleStyle}>Email</Text>
                                    <View style={defaultMailBorderColor ? isCorrectMail ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle]: styles.searchViewStyle}>
                                        <Image source={require("../assets/email.png")} style={styles.searchIconStyle} onPress={() => textInputEmail.focus()}/>
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
                        {displayMailDescription ? !isCorrectMail ? (
                        <View style={styles.descriptionBoxStyle}>
                          <View style={styles.descriptionWrapperStyle}>
                            <View style={styles.descriptionContainerStyle}>
                            {!defaultDisplayMailIcons ? isCorrectMail ?  null:  <Image source={require("../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
                            <Text style={styles.descriptionTextStyle}>Email address format is incorrect.</Text>
                            </View>
                          </View>
                        </View>
                        ): null: null}
                        {/* Password */}
                        <View style={styles.searchBoxStyle}>
                            <View style={styles.searchWrapperStyle}>
                                <Pressable style={styles.searchContainerStyle} onPress={() => textInputPassword.focus()}>
                                    <Text style={styles.searchTitleStyle}>Password</Text>
                                    <View style={defaultPasswordBorderColor ? isCorrectPassewordSymbol && isCorrectPassewordStringCount ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle]: styles.searchViewStyle}>
                                        <Image source={require("../assets/lock.png")} style={styles.searchIconStyle}/>
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
                                            onChangeText={onChangePasswordText}
                                            inputAccessoryViewID={inputAccessoryViewID}
                                            ref={(input) => textInputPassword = input}
                                            maxLength={200}
                                            onFocus={() => {
                                              // パスワードの説明文表示
                                              setDisplayPasswordDescription(true);
                                              // パスワードアイコンのデフォルト表示
                                              setDefaultDisplayPasswordIcons(true);
                                              // パスワードの入力フォームの枠線のデフォルト表示
                                              setDefaultPasswordBorderColor(false);
                                            }}
                                            onEndEditing={() => {
                                              // パスワード(半角英数字記号)のバリデーション
                                              passwordSymbolVaridation();
                                              // パスワード(文字数)のバリデーション
                                              passwordStringCountValidation();
                                              // パスワードアイコンのデフォルト表示を無くす
                                              setDefaultDisplayPasswordIcons(false);
                                              // パスワードの入力フォームの枠線のデフォルト表示
                                              setDefaultPasswordBorderColor(true);
                                            }}
                                        />
                                        <Pressable onPress={handlePasswordVisibility}>
                                          <MaterialCommunityIcons name={rightIcon} size={22} color="#C5C5C7" style={styles.passwordIconStyle} />
                                        </Pressable>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        {/* パスワードの説明文 */}
                        {displayPasswordDescription ? !isCorrectPassewordSymbol || !isCorrectPassewordStringCount ? (
                          <View style={styles.descriptionBoxStyle}>
                            <View style={styles.descriptionWrapperStyle}>
                              <View style={styles.descriptionContainerStyle}>
                                {!defaultDisplayPasswordIcons ? isCorrectPassewordSymbol ?  <Image source={require("../assets/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
                                <Text style={styles.descriptionTextStyle}>Half-width alphanumeric symbols only.</Text>
                              </View>
                              <View style={styles.descriptionContainerStyle}>
                              {!defaultDisplayPasswordIcons ? isCorrectPassewordStringCount ?  <Image source={require("../assets/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
                                <Text style={styles.descriptionTextStyle} >More than 5 and less than 200 characters.</Text>
                              </View>
                            </View>
                          </View>
                        ) : null: null}
                        {/* UserId */}
                        <View style={styles.searchBoxStyle}>
                            <View style={styles.searchWrapperStyle}>
                                <Pressable style={styles.searchContainerStyle} onPress={() => textInputUserId.focus()}>
                                    <Text style={styles.searchTitleStyle}>UserId</Text>
                                    <View style={defaultUserIdBorderColor ? isCorrectUserIdSymbol && isCorrectUserIdStringCount ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle]: styles.searchViewStyle}>
                                        <Image source={require("../assets/profile.png")} style={styles.searchIconStyle}/>
                                        <TextInput
                                            onChangeText={onChangeUserIdText}
                                            style={styles.searchContentStyle}
                                            value={userIdText}
                                            placeholder="test1234"
                                            inputAccessoryViewID={inputAccessoryViewID}
                                            ref={(input) => textInputUserId = input}
                                            autoCapitalize="none"
                                            maxLength={100}
                                            textContentType="username"
                                            onFocus={() => {
                                              // ユーザーIDの説明文表示
                                              setDisplayUserIdDescription(true);
                                              // ユーザーIDアイコンのデフォルト表示
                                              setDefaultDisplayUserIcons(true);
                                              // ユーザーIDの入力フォームの枠線のデフォルト表示
                                              setDefaultUserIdBorderColor(false);
                                            }}
                                            onEndEditing={() => {
                                              // ユーザーID(半角英数字)のバリデーション
                                              userIdSymbolValidation();
                                              // ユーザーID(文字数)のバリデーション
                                              userIdStringCountValidation();
                                              // ユーザーIDアイコンのデフォルト表示を無くす
                                              setDefaultDisplayUserIcons(false);
                                              // ユーザーIDの入力フォームの枠線のデフォルト表示
                                              setDefaultUserIdBorderColor(true);
                                              // ユーザーID(使用可能かどうか)のバリデーション
                                              isAvailableUserIdValidation()
                                            }}
                                        />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        {/* ユーザーIDの説明文 */}
                        {displayUserIdDescription ? !isCorrectUserIdSymbol || !isCorrectUserIdStringCount || !isAvailableUserId ? (
                          <View style={styles.descriptionBoxStyle}>
                            <View style={styles.descriptionWrapperStyle}>
                              <View style={styles.descriptionContainerStyle}>
                                {!defaultDisplayUserIcons ? isCorrectUserIdSymbol ?  <Image source={require("../assets/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
                                <Text style={styles.descriptionTextStyle}>Half-width alphanumeric characters only.</Text>
                              </View>
                              <View style={styles.descriptionContainerStyle}>
                              {!defaultDisplayUserIcons ? isCorrectUserIdStringCount ?  <Image source={require("../assets/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
                                <Text style={styles.descriptionTextStyle} >More than 4 words and less than 100 words.</Text>
                              </View>
                              <View style={styles.descriptionContainerStyle}>
                              {!defaultDisplayUserIcons ? isAvailableUserId ?  <Image source={require("../assets/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
                                <Text style={styles.descriptionTextStyle} >Available.</Text>
                              </View>
                            </View>
                          </View>
                        ) : null: null}
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

const styles = StyleSheet.create({
  // ヘッダー
    containerStyle: {
        flex: 1,
        backgroundColor: "#1B1C56",
    },
    headContainerStyle: {
        width: "100%",
        height: "10%",
        backgroundColor: "#1B1C56"
    },
    headMessageContainerStyle: {
        backgroundColor: "#feffff",
        alignItems: 'center',
    },
    headMessageTextStyle: {
      fontSize: 50,
      fontFamily: "AlfaSlabOne_400Regular",
      color: "#1B1C56",
      marginBottom: 32,
    },
    // main部分
    mainContainerStyle: {
        width: "100%",
        height: "15%",
        backgroundColor: "#feffff",
        borderTopLeftRadius: 50,
        alignItems: 'center',
    },
    // 検索フォーム
    searchBoxStyle: {
      height: 70,
      flex: 1,
      backgroundColor: "#feffff",
    },
    searchWrapperStyle: {
        flex: 1,
        alignItems: "center",
        paddingBottom: 10,

    },
    searchContainerStyle: {
    },
    searchTitleStyle: {
        fontFamily: "ABeeZee_400Regular_Italic",
        color: "#262626",
    },
    searchIconStyle: {
        width: 24,
        height: 24,
        marginRight: 10,
        marginLeft: 10,
    },
    searchViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F7FB',
        borderWidth: 0.5,
        height: 40,
        borderRadius: 5,
        width: 250,
        borderColor: "#F6F7FB",
    },
    searchContentStyle: {
      flex: 1
    },
    // 入力が間違っている場合のフォーム枠線の色
    inputIncorrectBorderColorStyle:{
      borderWidth: 2,
      borderColor: "#ED195E",
    },
    // キーボードに「完了」を表示
    completeBoxStyle: {
        width: 60,
        alignItems: "center",
        padding: 10,
    },
    completeTextStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "hsl(210, 100%, 60%)"
    },
    // パスワードアイコンの表示/非表示
    passwordIconStyle: {
      marginRight: 10
    },
    // 説明文
    descriptionBoxStyle:{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#feffff",
      paddingBottom: 10,
    },
    descriptionWrapperStyle: {
    },
    descriptionContainerStyle: {
      flexDirection: "row",
      width: 250,
    },
    descriptionTextStyle: {
      color: "#262626",
      fontSize: 12,
      overflow: "visible"
    },
    // 共通説明文のアイコンの大きさ
    descriptionIconStyle:{
      marginRight: 10,
      width: 12,
      height: 12,
    },
    // 余白調整
    paddingStyle: {
        height: "30%",
        backgroundColor: "#feffff",
        backgroundColor: "yellow"
    },
    // 画面下部分
    bottomStyle: {
        alignItems: "center",
        height: "100%",
        backgroundColor: "#feffff",
    },
    buttonContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1B1C56",
        width: 247,
        height: "15%",
        borderRadius: 10,
        fontSize: 18,
    },
    buttonTextStyle: {
        color: "#feffff",
        fontFamily: "ABeeZee_400Regular_Italic",
    },
    toLoginStyle: {
        marginTop: 10,
        height: "5%",
        flexDirection: "row"
    },
    toLoginTextStyle: {
        fontFamily: "ABeeZee_400Regular_Italic",
    },
    toLoginTextLinkStyle: {
        color: "#ED195E",
        marginLeft: 10,
    },
});

export default SignUp;