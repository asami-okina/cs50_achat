// libs
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

// layouts
import {
  MAIN_WHITE_COLOR,
  STANDARD_FONT,
  CONTENT_WIDTH,
} from "../../constants/layout";

export function ForgotPassword() {
  return (
    <View style={styles.forgotPasswordWrapperStyle}>
      <TouchableOpacity
        style={styles.forgotPasswordContainerStyle}
        onPress={() => console.log("検討予定")}
      >
        <Text style={styles.forgotPasswordTextStyle}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  forgotPasswordWrapperStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MAIN_WHITE_COLOR,
    paddingBottom: 32,
  },
  forgotPasswordContainerStyle: {
    backgroundColor: MAIN_WHITE_COLOR,
    alignItems: "flex-end",
    width: CONTENT_WIDTH,
  },
  forgotPasswordTextStyle: {
    fontFamily: STANDARD_FONT,
  },
});
