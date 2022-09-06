// libs
import React from "react";
import { View, StyleSheet } from "react-native";

// layouts
import { CONTENT_WIDTH, MAIN_WHITE_COLOR } from "../../constants/layout";

// components
import { ListItem } from "./_friendAndGroupList/listItem";

type FriendAndGroupListlPropsType = {
  type: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  clickedCancelMordal: boolean;
  setClickedCancelMordal: React.Dispatch<React.SetStateAction<boolean>>;
  clickedOkMordal: boolean;
  setClickedOkMordal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenFriendList: boolean;
  friendList: FriendListPropsType[] | null;
  isOpenGroupList: boolean;
  groupList: GroupListPropsType[] | null;
  setGroupCount: React.Dispatch<React.SetStateAction<number>>;
};

export function FriendAndGroupList({
  type,
  setModalVisible,
  clickedCancelMordal,
  setClickedCancelMordal,
  clickedOkMordal,
  setClickedOkMordal,
  isOpenFriendList,
  friendList,
  isOpenGroupList,
  groupList,
  setGroupCount,
}: FriendAndGroupListlPropsType) {
  return (
    <View style={styles.groupAndFriendWrapperStyle}>
      <View style={styles.groupAndFriendContainerStyle}>
        <View style={styles.topContainerStyle}></View>
        {/* グループ一覧をmapで回して表示 */}
        {type === "Group" && isOpenGroupList && (
          <ListItem
            groupList={groupList}
            friendList={null}
            type={"Group"}
            setModalVisible={setModalVisible}
            clickedCancelMordal={clickedCancelMordal}
            setClickedCancelMordal={setClickedCancelMordal}
            clickedOkMordal={clickedOkMordal}
            setClickedOkMordal={setClickedOkMordal}
            setGroupCount={setGroupCount}
          />
        )}
        {/* 友達一覧をmapで回して表示 */}
        {type === "Friend" && isOpenFriendList && (
          <ListItem
            groupList={null}
            friendList={friendList}
            type={"Friend"}
            setModalVisible={setModalVisible}
            clickedCancelMordal={clickedCancelMordal}
            setClickedCancelMordal={setClickedCancelMordal}
            clickedOkMordal={clickedOkMordal}
            setClickedOkMordal={setClickedOkMordal}
            setGroupCount={setGroupCount}
          />
        )}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  groupAndFriendWrapperStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MAIN_WHITE_COLOR,
    marginBottom: 40,
  },
  groupAndFriendContainerStyle: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: MAIN_WHITE_COLOR,
    width: CONTENT_WIDTH,
  },
  topContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
