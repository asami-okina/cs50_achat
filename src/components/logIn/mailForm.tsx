// libs
import React from "react";
import { Text, View, Image, TextInput, Pressable } from "react-native";

// constantsSearchStyles
import { searchStyles } from "../../constants/styles/searchStyles";

type MailFormPropsType = {
  inputAccessoryViewID: string;
  emailFormText: string;
  setEmailFormText: React.Dispatch<React.SetStateAction<string>>;
  executedLoginAuthentication: boolean;
  onFocusInputMailOrPasseword: boolean;
  setOnFocusInputMailOrPasseword: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MailForm({
  inputAccessoryViewID,
  emailFormText,
  setEmailFormText,
  executedLoginAuthentication,
  onFocusInputMailOrPasseword,
  setOnFocusInputMailOrPasseword,
}: MailFormPropsType) {
  // メールフォームのラベル化
  let textInputEmail;
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
                source={require("../../../assets/images/email.png")}
                style={searchStyles.searchIconStyle}
              />
              <TextInput
                onChangeText={setEmailFormText}
                style={searchStyles.searchContentWithIconStyle}
                value={emailFormText}
                placeholder="a-chat@test.com"
                inputAccessoryViewID={inputAccessoryViewID}
                ref={(input) => (textInputEmail = input)}
                autoCapitalize="none"
                textContentType="emailAddress"
                onFocus={() => {
                  setOnFocusInputMailOrPasseword(true);
                }}
                onEndEditing={() => {}}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
