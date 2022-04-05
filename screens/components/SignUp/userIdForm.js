import React, {useState} from 'react';
import { Text,View, Image, TextInput, Pressable} from 'react-native';
import { styles } from '../../styles/SignUp/signUpStyles';
import {fetchIsAvailableUserId} from "../../../api/api";


export function UserIdForm(props) {
    // 引数の展開
    const {inputAccessoryViewID} = props

    // 入力フォーム
    const [userIdText, onChangeUserIdText] = useState("");

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
    
    // ユーザーIDフォームのラベル化
    let textInputUserId;

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
 
    return (
      <View>
        {/* UserId */}
        <View style={styles.searchBoxStyle}>
            <View style={styles.searchWrapperStyle}>
                <Pressable style={styles.searchContainerStyle} onPress={() => textInputUserId.focus()}>
                    <Text style={styles.searchTitleStyle}>UserId</Text>
                    <View style={defaultUserIdBorderColor ? isCorrectUserIdSymbol && isCorrectUserIdStringCount ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle]: styles.searchViewStyle}>
                        <Image source={require("../../../assets/profile.png")} style={styles.searchIconStyle}/>
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
            {!defaultDisplayUserIcons ? isCorrectUserIdSymbol ?  <Image source={require("../../../assets/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../../../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
            <Text style={styles.descriptionTextStyle}>Half-width alphanumeric characters only.</Text>
            </View>
            <View style={styles.descriptionContainerStyle}>
            {!defaultDisplayUserIcons ? isCorrectUserIdStringCount ?  <Image source={require("../../../assets/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../../../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
            <Text style={styles.descriptionTextStyle} >More than 4 words and less than 100 words.</Text>
            </View>
            <View style={styles.descriptionContainerStyle}>
            {!defaultDisplayUserIcons ? isAvailableUserId ?  <Image source={require("../../../assets/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../../../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
            <Text style={styles.descriptionTextStyle} >Available.</Text>
            </View>
        </View>
        </View>
    ) : null: null}
    </View>
  )
}

