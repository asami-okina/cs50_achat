// libs
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PasswordFormDescription } from "./_description/passwordFormDescription";
import { MAIN_GRAY_COLOR } from "../../constants/layout";

// constantsSearchStyles
import { searchStyles } from "../../constants/styles/searchStyles";

type PasswordFormPropsType = {
  inputAccessoryViewID: string;
  isCorrectPassewordSymbol: boolean;
  setIsCorrectPassewordSymbol: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isCorrectPassewordStringCount: boolean;
  setIsCorrectPassewordStringCount: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  passwordText: string;
  onChangePasswordText: React.Dispatch<React.SetStateAction<string>>;
};

export function PasswordForm({
  inputAccessoryViewID,
  isCorrectPassewordSymbol,
  setIsCorrectPassewordSymbol,
  isCorrectPassewordStringCount,
  setIsCorrectPassewordStringCount,
  passwordText,
  onChangePasswordText,
}: PasswordFormPropsType) {
  // パスワードの説明文表示
  const [displayPasswordDescription, setDisplayPasswordDescription] =
    useState<boolean>(false);
  // パスワードの表示/非表示アイコン
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  // パスワードアイコンのデフォルト表示
  const [
    defaultDisplayPasswordIcons,
    setDefaultDisplayPasswordIcons,
  ] = useState<boolean>(false);
  // パスワードの入力フォームの枠線のデフォルト表示
  const [defaultPasswordBorderColor, setDefaultPasswordBorderColor] =
    useState<boolean>(false);

  // パスワードフォームのラベル化
  let textInputPassword;

  // パスワード(半角英数字記号)のバリデーション関数
  function _passwordSymbolVaridation() {
    const regexp = /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/;
    setIsCorrectPassewordSymbol(regexp.test(passwordText));
  }

  // パスワード(文字数:5文字以上200文字未満)のバリデーション
  function _passwordStringCountValidation() {
    let passwordLength = passwordText.length;

    // パスワードの文字数が5文字以上200文字未満であれば、バリデーションが通る
    if (passwordLength >= 5 && passwordLength < 200) {
      setIsCorrectPassewordStringCount(true);
    } else {
      setIsCorrectPassewordStringCount(false);
    }
  }

  return (
    <View>
      {/* Password */}
      <View style={searchStyles.searchBoxStyle}>
        <View style={searchStyles.searchWrapperStyle}>
          <Pressable
            style={searchStyles.searchContainerStyle}
            onPress={() => textInputPassword.focus()}
          >
            <Text style={searchStyles.searchTitleStyle}>
              Password
            </Text>
            <View
              style={
                defaultPasswordBorderColor
                  ? isCorrectPassewordSymbol &&
                    isCorrectPassewordStringCount
                    ? searchStyles.searchViewStyle
                    : [
                        searchStyles.searchViewStyle,
                        searchStyles.inputIncorrectBorderColorStyle,
                      ]
                  : searchStyles.searchViewStyle
              }
            >
              <Image
                source={require("../../../assets/images/lock.png")}
                style={searchStyles.searchIconStyle}
              />
              <TextInput
                placeholder="Password"
                style={searchStyles.searchContentWithIconStyle}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                secureTextEntry={passwordVisibility}
                value={passwordText}
                enablesReturnKeyAutomatically
                onChangeText={onChangePasswordText}
                inputAccessoryViewID={inputAccessoryViewID}
                ref={(input) => (textInputPassword = input)}
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
                  _passwordSymbolVaridation();
                  // パスワード(文字数)のバリデーション
                  _passwordStringCountValidation();
                  // パスワードアイコンのデフォルト表示を無くす
                  setDefaultDisplayPasswordIcons(false);
                  // パスワードの入力フォームの枠線のデフォルト表示
                  setDefaultPasswordBorderColor(true);
                }}
              />
              <Pressable onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons
                  name={rightIcon === "eye" ? "eye" : "eye-off"}
                  size={22}
                  color={MAIN_GRAY_COLOR}
                  style={searchStyles.passwordIconStyle}
                />
              </Pressable>
            </View>
          </Pressable>
        </View>
      </View>
      {/* パスワードの説明文 */}
      <PasswordFormDescription
        displayPasswordDescription={displayPasswordDescription}
        isCorrectPassewordSymbol={isCorrectPassewordSymbol}
        isCorrectPassewordStringCount={isCorrectPassewordStringCount}
        defaultDisplayPasswordIcons={defaultDisplayPasswordIcons}
      />
    </View>
  );
}
