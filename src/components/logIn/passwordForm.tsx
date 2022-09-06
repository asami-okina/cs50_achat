// libs
import React from "react";
import { Text, View, Image, TextInput, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// hooks
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";

// layouts
import { MAIN_GRAY_COLOR } from "../../constants/layout";

// constantsSearchStyles
import { searchStyles } from "../../constants/styles/searchStyles";

type PasswordFormPropsType = {
  inputAccessoryViewID: string;
  passwordFormText: string;
  setPasswordText: React.Dispatch<React.SetStateAction<string>>;
  executedLoginAuthentication: boolean;
  onFocusInputMailOrPasseword: boolean;
  setOnFocusInputMailOrPasseword: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PasswordForm({
  inputAccessoryViewID,
  passwordFormText,
  setPasswordText,
  executedLoginAuthentication,
  onFocusInputMailOrPasseword,
  setOnFocusInputMailOrPasseword,
}: PasswordFormPropsType) {
  const { passwordIconVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  // メールフォームのラベル化
  let textInputPassword;
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
                executedLoginAuthentication
                  ? onFocusInputMailOrPasseword
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
                onChangeText={setPasswordText}
                inputAccessoryViewID={inputAccessoryViewID}
                ref={(input) => (textInputPassword = input)}
                maxLength={200}
                onFocus={() => {
                  setOnFocusInputMailOrPasseword(true);
                }}
                onEndEditing={() => {}}
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
    </View>
  );
}
