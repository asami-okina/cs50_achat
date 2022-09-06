import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  MAIN_PINK_COLOR,
  STANDARD_FONT,
} from "../../constants/layout";
import { useNavigationAChat } from "../../hooks/useNavigationAChat";

type ToSignUpOrLoginTextAreaType = {
  description: string;
  link: string;
};
// SignUp,LogIn画面のアカウントを持っているか確認している部分
export function ToSignUpOrLoginTextArea({
  description,
  link,
}: ToSignUpOrLoginTextAreaType) {
  // navigation
  const navigation = useNavigationAChat();
  return (
    <View style={styles.toLoginStyle}>
      <Text style={styles.toLoginTextStyle}>{description}</Text>
      <TouchableOpacity
        onPress={() => {
          if (link === "SignUp") {
            navigation.navigate("SignUp");
          }
          if (link === "LogIn") {
            navigation.navigate("LogIn");
          }
        }}
      >
        <Text
          style={[
            styles.toLoginTextStyle,
            styles.toLoginTextLinkStyle,
          ]}
        >
          {link} here
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toLoginStyle: {
    marginTop: 10,
    flexDirection: "row",
  },
  toLoginTextStyle: {
    fontFamily: STANDARD_FONT,
  },
  toLoginTextLinkStyle: {
    color: MAIN_PINK_COLOR,
    marginLeft: 10,
  },
});
