// libs
import React from "react";
import { StyleSheet, View } from "react-native";

// components
import Basic from "./examples/basic";

// layouts
import { MAIN_WHITE_COLOR } from "../../../constants/layout";

type ListItemPropsType = {
  type: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  clickedCancelMordal: boolean;
  setClickedCancelMordal: React.Dispatch<React.SetStateAction<boolean>>;
  clickedOkMordal: boolean;
  setClickedOkMordal: React.Dispatch<React.SetStateAction<boolean>>;
  groupList: GroupListPropsType[];
  friendList: FriendListPropsType[];
  setGroupCount: React.Dispatch<React.SetStateAction<number>>;
};

export function ListItem({
  type,
  setModalVisible,
  clickedCancelMordal,
  setClickedCancelMordal,
  clickedOkMordal,
  setClickedOkMordal,
  groupList,
  friendList,
  setGroupCount,
}: ListItemPropsType) {
  return (
    <View style={styles.containerStyle}>
      {/* groupの場合 */}
      {groupList && groupList.length !== 0 && groupList !== undefined && (
        <Basic
          groupList={groupList}
          friendList={null}
          type={type}
          setModalVisible={setModalVisible}
          clickedCancelMordal={clickedCancelMordal}
          setClickedCancelMordal={setClickedCancelMordal}
          clickedOkMordal={clickedOkMordal}
          setClickedOkMordal={setClickedOkMordal}
          setGroupCount={setGroupCount}
        />
      )}
      {/* friendの場合 */}
      {friendList && friendList.length !== 0 && friendList !== undefined && (
        <Basic
          groupList={null}
          friendList={friendList}
          type={type}
          setModalVisible={setModalVisible}
          clickedCancelMordal={clickedCancelMordal}
          setClickedCancelMordal={setClickedCancelMordal}
          clickedOkMordal={clickedOkMordal}
          setClickedOkMordal={setClickedOkMordal}
          setGroupCount={setGroupCount}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: MAIN_WHITE_COLOR,
    marginTop: 12,
  },
});
