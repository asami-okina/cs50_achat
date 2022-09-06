// libs
import React, { useState } from "react";
import { Text, View, Image, TextInput, Pressable } from "react-native";
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PasswordFormDescription } from "./_description/passwordFormDescription";
import { MAIN_GRAY_COLOR } from "../../constants/layout";

// style
import { searchStyles } from "../../constants/styles/searchStyles";

type PasswordFormPropsType = {
  inputAccessoryViewID: string;
  isCorrectPassewordSymbol: boolean;
  setIsCorrectPassewordSymbol: React.Dispatch<React.SetStateAction<boolean>>;
  isCorrectPassewordStringCount: boolean;
  setIsCorrectPassewordStringCount: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  passwordFormText: string;
  onChangePasswordFormText: React.Dispatch<React.SetStateAction<string>>;
};

export function PasswordForm({
  inputAccessoryViewID,
  isCorrectPassewordSymbol,
  setIsCorrectPassewordSymbol,
  isCorrectPassewordStringCount,
  setIsCorrectPassewordStringCount,
  passwordFormText,
  onChangePasswordFormText,
}: PasswordFormPropsType) {
  const [displayPasswordDescription, setDisplayPasswordDescription] =
    useState<boolean>(false);
  const { passwordIconVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [defaultDisplayPasswordIcon, setDefaultDisplayPasswordIcon] =
    useState<boolean>(false);
  const [defaultPasswordBorderColor, setDefaultPasswordBorderColor] =
    useState<boolean>(false);

  // パスワードフォームのラベル化
  let textInputPassword;

  // パスワード(半角英数字記号)のバリデーション関数
  function _passwordSymbolValidation() {
    const regexp = /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/;
    setIsCorrectPassewordSymbol(regexp.test(passwordFormText));
  }

  // パスワード(文字数:5文字以上200文字未満)のバリデーション
  function _passwordStringCountValidation() {
    let passwordLength = passwordFormText.length;

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
            <Text style={searchStyles.searchTitleStyle}>Password</Text>
            <View
              style={
                defaultPasswordBorderColor
                  ? isCorrectPassewordSymbol && isCorrectPassewordStringCount
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
                secureTextEntry={passwordIconVisibility}
                value={passwordFormText}
                enablesReturnKeyAutomatically
                onChangeText={onChangePasswordFormText}
                inputAccessoryViewID={inputAccessoryViewID}
                ref={(input) => (textInputPassword = input)}
                maxLength={200}
                onFocus={() => {
                  setDisplayPasswordDescription(true);
                  setDefaultDisplayPasswordIcon(true);
                  setDefaultPasswordBorderColor(false);
                }}
                onEndEditing={() => {
                  _passwordSymbolValidation();
                  _passwordStringCountValidation();
                  setDefaultDisplayPasswordIcon(false);
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
        defaultDisplayPasswordIcon={defaultDisplayPasswordIcon}
      />
    </View>
  );
}
