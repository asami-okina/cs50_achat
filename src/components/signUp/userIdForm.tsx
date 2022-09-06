// libs
import React, { useState } from "react";
import { Text, View, Image, TextInput, Pressable } from "react-native";
import { API_SERVER_URL } from "../../constants/api";
import { getFetchApiHeader } from "../../constants/common";

// components
import { UserIdFormDescription } from "./_description/userIdFormDescription";

// style
import { searchStyles } from "../../constants/styles/searchStyles";

type UserIdFormPropsType = {
  inputAccessoryViewID: string;
  isCorrectUserIdSymbol: boolean;
  setIsCorrectUserIdSymbol: React.Dispatch<React.SetStateAction<boolean>>;
  isCorrectUserIdStringCount: boolean;
  setIsCorrectUserIdStringCount: React.Dispatch<React.SetStateAction<boolean>>;
  isAvailableUserId: boolean;
  setIsAvailableUserId: React.Dispatch<React.SetStateAction<boolean>>;
  pageType: string;
  userIdFormText: string;
  onChangeUserIdFormText: React.Dispatch<React.SetStateAction<string>>;
};

export function UserIdForm({
  inputAccessoryViewID,
  isCorrectUserIdSymbol,
  setIsCorrectUserIdSymbol,
  isCorrectUserIdStringCount,
  setIsCorrectUserIdStringCount,
  isAvailableUserId,
  setIsAvailableUserId,
  pageType,
  userIdFormText,
  onChangeUserIdFormText,
}: UserIdFormPropsType) {
  const [displayUserIdDescription, setDisplayUserIdDescription] =
    useState<boolean>(false);
  const [defaultDisplayUserIcon, setDefaultDisplayUserIcon] =
    useState<boolean>(false);
  const [defaultUserIdBorderColor, setDefaultUserIdBorderColor] =
    useState<boolean>(false);

  // ユーザーIDフォームのラベル化
  let textInputUserId;

  // ユーザーID(半角英数字)のバリデーション
  function _userIdSymbolValidation() {
    const regexp = /^[0-9a-zA-Z]+$/;
    setIsCorrectUserIdSymbol(regexp.test(userIdFormText));
  }

  // ユーザーID(文字数:4文字以上100文字以内)のバリデーション
  function _userIdStringCountValidation() {
    let userIdLength: number = userIdFormText.length;

    // ユーザーIDの文字数が4文字以上100文字以内であれば、バリデーションが通る
    if (userIdLength >= 4 && userIdLength <= 100) {
      setIsCorrectUserIdStringCount(true);
    } else {
      setIsCorrectUserIdStringCount(false);
    }
  }

  // ユーザーID(使用可能かどうか)のバリデーション
  async function _isAvailableUserIdValidation() {
    try {
      const response = await fetch(
        API_SERVER_URL +
          `/api/signup/is_available_user_id_validation/${userIdFormText}`,
        getFetchApiHeader
      );

      const parseResponse = await response.json();

      if (parseResponse.is_available_user_id_validation) {
        setIsAvailableUserId(true);
      } else {
        setIsAvailableUserId(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View>
      <View style={searchStyles.searchBoxStyle}>
        <View style={searchStyles.searchWrapperStyle}>
          <Pressable
            style={searchStyles.searchContainerStyle}
            onPress={() => textInputUserId.focus()}
          >
            <Text style={searchStyles.searchTitleStyle}>UserId</Text>
            <View
              style={
                defaultUserIdBorderColor
                  ? isCorrectUserIdSymbol && isCorrectUserIdStringCount
                    ? searchStyles.searchViewStyle
                    : [
                        searchStyles.searchViewStyle,
                        searchStyles.inputIncorrectBorderColorStyle,
                      ]
                  : searchStyles.searchViewStyle
              }
            >
              <Image
                source={require("../../../assets/images/profile.png")}
                style={searchStyles.searchIconStyle}
              />
              <TextInput
                onChangeText={onChangeUserIdFormText}
                style={searchStyles.searchContentWithIconStyle}
                value={userIdFormText}
                placeholder="test1234"
                inputAccessoryViewID={inputAccessoryViewID}
                ref={(input) => (textInputUserId = input)}
                autoCapitalize="none"
                maxLength={100}
                textContentType="username"
                onFocus={() => {
                  setDisplayUserIdDescription(true);
                  setDefaultDisplayUserIcon(true);
                  setDefaultUserIdBorderColor(false);
                }}
                onEndEditing={() => {
                  _userIdSymbolValidation();
                  _userIdStringCountValidation();
                  setDefaultDisplayUserIcon(false);
                  setDefaultUserIdBorderColor(true);
                  _isAvailableUserIdValidation();
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
      {/* ユーザーIDの説明文 */}
      {pageType === "SignUp" ? (
        <UserIdFormDescription
          displayUserIdDescription={displayUserIdDescription}
          isCorrectUserIdSymbol={isCorrectUserIdSymbol}
          isCorrectUserIdStringCount={isCorrectUserIdStringCount}
          isAvailableUserId={isAvailableUserId}
          defaultDisplayUserIcon={defaultDisplayUserIcon}
        />
      ) : null}
    </View>
  );
}
