// libs
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// layouts
import { STANDARD_FONT, MAIN_PINK_COLOR } from "../../constants/layout";

export function NotExistFriend() {
  return (
    <View style={styles.notExistContainerStyle}>
      <Text style={styles.errorTextStyle}>
        The user with the entered ID does not exist
      </Text>
      <Text style={styles.errorTextStyle}>or is not allowed to search.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontFamily: STANDARD_FONT,
    color: MAIN_PINK_COLOR,
    textAlign: "center",
  },
  notExistContainerStyle: {
    marginTop: 32,
  },
});
