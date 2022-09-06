// libs
import React, { ReactNode } from "react";
import { View } from "react-native";

// sameStyles
import { sameStyles } from "../../constants/styles/sameStyles";

type TopAreaWrapperType = {
  type: string;
  children?: ReactNode;
};

// 丸みを帯びている白いトップ部分
export function TopAreaWrapper({
  type,
  children,
}: TopAreaWrapperType) {
  return (
    <View
      style={
        type === "addGroupSetting"
          ? sameStyles.topAreaContainerGroupSettingStyle
          : sameStyles.topAreaContainerStyle
      }
    >
      {children}
    </View>
  );
}
