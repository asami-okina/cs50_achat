import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import {
  MAIN_NAVY_COLOR,
  CONTENT_WIDTH,
  MAIN_GRAY_COLOR,
  TAB_FONT,
  MAIN_WHITE_COLOR,
  TAB_HEIGHT,
  TAB_TITLE_TEXT_SIZE,
} from "../../constants/layout";

type FriendOrGroupSelectTabPropsType = {
  setOpenFriendList: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenGroupList: React.Dispatch<React.SetStateAction<boolean>>;
  openFriendList: boolean;
  openGroupList: boolean;
  friendCount: number;
  groupCount: number;
};

export function FriendOrGroupSelectTab({
  setOpenFriendList,
  setOpenGroupList,
  openFriendList,
  openGroupList,
  friendCount,
  groupCount,
}: FriendOrGroupSelectTabPropsType) {
  return (
    <View style={styles.wrapperStyle}>
      <View style={styles.containerStyle}>
        <Pressable
          style={
            openFriendList
              ? [styles.tabStyle, styles.tabOpenStyle]
              : styles.tabStyle
          }
          onPress={() => {
            setOpenFriendList(true);
            setOpenGroupList(false);
          }}
        >
          <Text style={styles.textStyle}>Friend</Text>
          <Text style={styles.countStyle}>{friendCount ? friendCount : 0}</Text>
        </Pressable>
        <Pressable
          style={
            openGroupList
              ? [styles.tabStyle, styles.tabOpenStyle]
              : styles.tabStyle
          }
          onPress={() => {
            setOpenFriendList(false);
            setOpenGroupList(true);
          }}
        >
          <Text style={styles.textStyle}>Group</Text>
          <Text style={styles.countStyle}>{groupCount ? groupCount : 0}</Text>
        </Pressable>
        <View style={styles.remainBorderStyle}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperStyle: {
    alignItems: "center",
  },
  containerStyle: {
    width: CONTENT_WIDTH,
    marginTop: 5,
    height: TAB_HEIGHT,
    flexDirection: "row",
  },
  tabStyle: {
    backgroundColor: MAIN_WHITE_COLOR,
    width: "50%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: MAIN_GRAY_COLOR,
    flexDirection: "row",
  },
  tabOpenStyle: {
    borderBottomWidth: 1,
    borderBottomColor: MAIN_NAVY_COLOR,
  },
  remainBorderStyle: {
    borderBottomWidth: 1,
    borderBottomColor: MAIN_GRAY_COLOR,
    flex: 1,
  },
  textStyle: {
    fontSize: TAB_TITLE_TEXT_SIZE,
    fontFamily: TAB_FONT,
    color: MAIN_NAVY_COLOR,
  },
  countStyle: {
    marginLeft: 8,
    color: MAIN_NAVY_COLOR,
    fontFamily: TAB_FONT,
    fontSize: TAB_TITLE_TEXT_SIZE,
  },
});
