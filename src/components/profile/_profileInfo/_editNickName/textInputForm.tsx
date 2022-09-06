// libs
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Image } from "react-native";
import { profileInputFormPasswordIconEnum } from "../../../../constants/enum";

// style
import { searchStyles } from "../../../../constants/styles/searchStyles";

// layouts
import {
  CONTENT_WIDTH,
  STANDARD_FONT,
  MAIN_PINK_COLOR,
  MAIN_YELLOW_GREEN,
  IN_SEARCH_FORM_SIDE_MARGIN,
  ICON_SIZE,
} from "../../../../constants/layout";

type TextInputFormType = {
  isNotInput: boolean;
  setIsNotInput: React.Dispatch<React.SetStateAction<boolean>>;
  isValidInput: boolean;
  setIsValidInput: React.Dispatch<React.SetStateAction<boolean>>;
  inputLength: number;
  setInputLength: React.Dispatch<React.SetStateAction<number>>;
  nickName: string;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
};
export function TextInputForm({
  isNotInput,
  setIsNotInput,
  isValidInput,
  setIsValidInput,
  inputLength,
  setInputLength,
  nickName,
  setNickName,
}: TextInputFormType) {
  const [inputFormPasswordIconShowOrHide, setInputFormPasswordIconShowOrHide] =
    useState<profileInputFormPasswordIconEnum>(
      profileInputFormPasswordIconEnum.Hide
    );

  const onChangeText = (text: string) => {
    setNickName(text);
    setInputLength(text.length);
    if (text.length > 20) {
      setIsValidInput(false);
    } else {
      setIsValidInput(true);
    }
  };

  // 入力フォームのラベル化
  let textInputSearch;

  return (
    <View style={styles.inputTextWrapperStyle}>
      <Pressable
        onPress={() => textInputSearch.focus()}
        style={
          isNotInput
            ? styles.inputTextContainerStyle
            : isValidInput
            ? styles.inputTextContainerStyle
            : [
                styles.inputTextContainerStyle,
                styles.errorInputTextContainerStyle,
              ]
        }
      >
        <TextInput
          onChangeText={onChangeText}
          style={searchStyles.searchContentNoneLeftIconStyle}
          value={nickName}
          placeholder="Please Enter your NickName"
          ref={(input) => (textInputSearch = input)}
          autoCapitalize="none"
          textContentType="username"
          onFocus={() => {
            setInputFormPasswordIconShowOrHide(
              profileInputFormPasswordIconEnum.Show
            );
            setIsNotInput(false);
          }}
          onEndEditing={() => {
            setInputFormPasswordIconShowOrHide(
              profileInputFormPasswordIconEnum.Show
            );
            // ニックネームの入力が1文字以下の場合はエラーを出す
            if (inputLength < 1) {
              setIsValidInput(false);
            }
          }}
        />
        {inputFormPasswordIconShowOrHide ==
          profileInputFormPasswordIconEnum.Show && (
          <Pressable
            onPress={() => {
              textInputSearch.clear();
              if (!isNotInput) {
                setIsValidInput(false);
              }
            }}
          >
            <Image
              source={require("../../../../../assets/images/close_gray.png")}
              style={[searchStyles.searchIconStyle, styles.searchIconStyle]}
            />
          </Pressable>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContentNoneLeftIconStyle: {
    paddingLeft: IN_SEARCH_FORM_SIDE_MARGIN,
    flex: 1,
    fontFamily: STANDARD_FONT,
    height: 100,
  },
  inputTextWrapperStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputTextContainerStyle: {
    marginTop: 20,
    width: CONTENT_WIDTH,
    height: 50,
    flexDirection: "row",
    borderBottomColor: MAIN_YELLOW_GREEN,
    borderBottomWidth: 1,
  },
  errorInputTextContainerStyle: {
    borderBottomColor: MAIN_PINK_COLOR,
  },
  searchIconStyle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginLeft: 0,
    marginRight: 0,
  },
});
