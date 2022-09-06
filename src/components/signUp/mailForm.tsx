// libs
import React, { useState } from "react";
import { Text, View, Image, TextInput, Pressable } from "react-native";
import { API_SERVER_URL } from "../../constants/api";
import { getFetchApiHeader } from "../../constants/common";

// components
import { MailFormDescription } from "./_description/mailFormDescription";

// style
import { searchStyles } from "../../constants/styles/searchStyles";

type MailFormPropsType = {
  inputAccessoryViewID: string;
  isCorrectMail: boolean;
  setIsCorrectMail: React.Dispatch<React.SetStateAction<boolean>>;
  emailFormText: string;
  onChangeEmailFormText: React.Dispatch<React.SetStateAction<string>>;
  isAvailableMail: boolean;
  setIsAvailableMail: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MailForm({
  inputAccessoryViewID,
  isCorrectMail,
  setIsCorrectMail,
  emailFormText,
  onChangeEmailFormText,
  isAvailableMail,
  setIsAvailableMail,
}: MailFormPropsType) {
  const [displayMailDescription, setDisplayMailDescription] =
    useState<boolean>(false);
  const [defaultDisplayMailIcons, setDefaultDisplayMailIcons] =
    useState<boolean>(false);
  const [defaultMailBorderColor, setDefaultMailBorderColor] =
    useState<boolean>(false);

  // メールフォームのラベル化
  let textInputEmail;

  function _mailValidation() {
    const regexp =
      /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (!regexp.test(emailFormText)) {
      setDisplayMailDescription(true);
    }
    setIsCorrectMail(regexp.test(emailFormText));
  }

  // メールアドレス(使用可能かどうか)のバリデーション
  async function _isAvailableMailValidation() {
    try {
      const params = { mail: emailFormText };
      const query_params = new URLSearchParams(params);
      const response = await fetch(
        API_SERVER_URL +
          `/api/signup/is_available_mail_validation?${query_params}`,
        getFetchApiHeader
      );
      const parseResponse = await response.json();
      if (parseResponse.is_available_mail) {
        setIsAvailableMail(true);
      } else {
        setIsAvailableMail(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View>
      {/* Email */}
      <View style={searchStyles.searchBoxStyle}>
        <View style={searchStyles.searchWrapperStyle}>
          <Pressable
            style={searchStyles.searchContainerStyle}
            onPress={() => textInputEmail.focus()}
          >
            <Text style={searchStyles.searchTitleStyle}>Email</Text>
            <View
              style={
                defaultMailBorderColor
                  ? isCorrectMail
                    ? searchStyles.searchViewStyle
                    : [
                        searchStyles.searchViewStyle,
                        searchStyles.inputIncorrectBorderColorStyle,
                      ]
                  : searchStyles.searchViewStyle
              }
            >
              <Image
                source={require("../../../assets/images/email.png")}
                style={searchStyles.searchIconStyle}
              />
              <TextInput
                onChangeText={onChangeEmailFormText}
                style={searchStyles.searchContentWithIconStyle}
                value={emailFormText}
                placeholder="a-chat@test.com"
                inputAccessoryViewID={inputAccessoryViewID}
                ref={(input) => (textInputEmail = input)}
                autoCapitalize="none"
                textContentType="emailAddress"
                onFocus={() => {
                  setDefaultMailBorderColor(false);
                  setDefaultDisplayMailIcons(true);
                }}
                onEndEditing={() => {
                  _mailValidation();
                  setDefaultMailBorderColor(true);
                  setDefaultDisplayMailIcons(false);
                  _isAvailableMailValidation();
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
      {/* メールアドレスの説明文 */}
      <MailFormDescription
        isCorrectMail={isCorrectMail}
        isAvailableMail={isAvailableMail}
        displayMailDescription={displayMailDescription}
        defaultDisplayMailIcons={defaultDisplayMailIcons}
      />
    </View>
  );
}
