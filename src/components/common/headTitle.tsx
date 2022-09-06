import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  MAIN_NAVY_COLOR,
  MAIN_WHITE_COLOR,
  MAIN_TITLE_SIZE,
  MAIN_TITLE_FONT,
} from "../../constants/layout";

type HeadTitleType = {
  title: string;
};

export function HeadTitle({ title }: HeadTitleType) {
  // フォントがダウンロードできたら、画面を出力する
  return (
    <View style={styles.headMessageContainerStyle}>
      <Text style={styles.headMessageStyle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headMessageContainerStyle: {
    backgroundColor: MAIN_WHITE_COLOR,
    alignItems: "center",
  },
  headMessageStyle: {
    fontSize: MAIN_TITLE_SIZE,
    fontFamily: MAIN_TITLE_FONT,
    color: MAIN_NAVY_COLOR,
  },
});
