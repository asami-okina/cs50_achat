// libs
import React from "react";
import { View, StyleSheet, Text } from "react-native";

// layouts
import {
  CONTENT_WIDTH,
  STANDARD_FONT,
  MAIN_GRAY_COLOR,
} from "../../../../constants/layout";

type NickNameStringCountType = {
  wordCount: number;
};

export function NickNameStringCount({ wordCount }: NickNameStringCountType) {
  return (
    <View style={styles.nickNameWrapperStyle}>
      <View
        style={[
          styles.nickNameContainerStyle,
          styles.stringCountContainerStyle,
        ]}
      >
        <Text style={styles.stringCountTextStyle}>{wordCount} / 20</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nickNameWrapperStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 30,
  },
  nickNameContainerStyle: {
    width: CONTENT_WIDTH,
    justifyContent: "center",
    height: 30,
    marginTop: 32,
  },
  stringCountContainerStyle: {
    alignItems: "flex-end",
  },
  stringCountTextStyle: {
    fontSize: 14,
    color: MAIN_GRAY_COLOR,
    fontFamily: STANDARD_FONT,
  },
});
