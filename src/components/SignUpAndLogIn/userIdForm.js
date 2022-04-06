import React, {useState} from 'react';
import { Text,View, Image, TextInput, Pressable, KeyboardAvoidingView} from 'react-native';
import { styles } from '../../styles/SignUpAndLogIn/signUpAndLogInStyles.js';
import {fetchIsAvailableUserId} from "../../api/api";
import { UserIdFormDescription } from './_description/userIdFormDescription';


export function UserIdForm({
    inputAccessoryViewID,
    isCorrectUserIdSymbol,
    setIsCorrectUserIdSymbol,
    isCorrectUserIdStringCount,
    setIsCorrectUserIdStringCount,
    isAvailableUserId,
    setIsAvailableUserId,
    pageType,
}) {
    // 入力フォーム
    const [userIdText, onChangeUserIdText] = useState("");

    // ユーザーIDの説明文表示
    const [displayUserIdDescription, setDisplayUserIdDescription] = useState(false);
    // ユーザーIDアイコンのデフォルト表示
    const [defaultDisplayUserIcons, setDefaultDisplayUserIcons] = useState(false)
    // ユーザーIDの入力フォームの枠線のデフォルト表示
    const [defaultUserIdBorderColor, setDefaultUserIdBorderColor] = useState(false)
    
    // ユーザーIDフォームのラベル化
    let textInputUserId;

    // ユーザーID(半角英数字)のバリデーション
    function userIdSymbolValidation(){
        const regexp = /^[0-9a-zA-Z]+$/;
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
 
    return (
      <View>
        <View style={styles.searchBoxStyle}>
            <View style={styles.searchWrapperStyle}>
                <Pressable style={styles.searchContainerStyle} onPress={() => textInputUserId.focus()}>
                    <Text style={styles.searchTitleStyle}>UserId</Text>
                    {/* <KeyboardAvoidingView behavior="padding"> */}
                    <View style={defaultUserIdBorderColor ? isCorrectUserIdSymbol && isCorrectUserIdStringCount ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle]: styles.searchViewStyle}>
                        <Image source={require("../../../assets/images/profile.png")} style={styles.searchIconStyle}/>
                        {/* <KeyboardAvoidingView behavior="padding"> */}
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
        {pageType === "SignUp" ? (
            <UserIdFormDescription displayUserIdDescription={displayUserIdDescription} isCorrectUserIdSymbol={isCorrectUserIdSymbol} isCorrectUserIdStringCount={isCorrectUserIdStringCount} isAvailableUserId={isAvailableUserId} defaultDisplayUserIcons={defaultDisplayUserIcons}/>
        ): null}

    </View>
  )
}