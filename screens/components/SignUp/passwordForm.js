import React, {useState} from 'react';
import { Text,View, Image, TextInput, Pressable} from 'react-native';
import { styles } from '../../styles/SignUp/signUpStyles';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export function PasswordForm(props) {
    // 引数の展開
    const {inputAccessoryViewID} = props

    // 入力フォーム
    const [passwordText, onChangePasswordText] = useState("");

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

    // パスワードフォームのラベル化
    let textInputPassword;

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

    return (
      <View>
        {/* Password */}
        <View style={styles.searchBoxStyle}>
            <View style={styles.searchWrapperStyle}>
                <Pressable style={styles.searchContainerStyle} onPress={() => textInputPassword.focus()}>
                    <Text style={styles.searchTitleStyle}>Password</Text>
                    <View style={defaultPasswordBorderColor ? isCorrectPassewordSymbol && isCorrectPassewordStringCount ? styles.searchViewStyle : [styles.searchViewStyle, styles.inputIncorrectBorderColorStyle]: styles.searchViewStyle}>
                        <Image source={require("../../../assets/lock.png")} style={styles.searchIconStyle}/>
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
                    {!defaultDisplayPasswordIcons ? isCorrectPassewordSymbol ?  <Image source={require("../../../assets/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../../../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
                    <Text style={styles.descriptionTextStyle}>Half-width alphanumeric symbols only.</Text>
                </View>
                <View style={styles.descriptionContainerStyle}>
                    {!defaultDisplayPasswordIcons ? isCorrectPassewordStringCount ?  <Image source={require("../../../assets/correct.png")} style={styles.descriptionIconStyle}/>:  <Image source={require("../../../assets/incorrect.png")} style={styles.descriptionIconStyle}/>: null}
                    <Text style={styles.descriptionTextStyle} >More than 5 and less than 200 characters.</Text>
                </View>
            </View>
        </View>
        ) : null: null}
    </View>
  )
}

