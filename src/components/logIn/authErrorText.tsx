// libs
import React from "react";
import { Text, View, StyleSheet } from "react-native";

// layouts
import {
  MAIN_WHITE_COLOR,
  MAIN_PINK_COLOR,
  STANDARD_FONT,
} from "../../constants/layout";

// ログイン認証エラー
export function AuthErrorText() {
  return (
    <View style={styles.errorContainerStyle}>
      <Text style={styles.errorTextStyle}>
        Your e-mail address or password is incorrect.
      </Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  errorContainerStyle: {
    display: "flex",
    alignItems: "center",
    backgroundColor: MAIN_WHITE_COLOR,
    paddingBottom: 32,
  },
  errorTextStyle: {
    color: MAIN_PINK_COLOR,
    backgroundColor: MAIN_WHITE_COLOR,
    fontFamily: STANDARD_FONT,
    fontWeight: "bold",
  },
});
