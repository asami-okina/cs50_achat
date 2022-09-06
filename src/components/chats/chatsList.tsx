// libs
import React from "react";
import { View, StyleSheet } from "react-native";

// components
import ChatBasic from "./_chatsList/chatBasic";

type ChatsListType = {
  chatRoomList: ChatRoomListType[];
  setDeleteGroupModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  clickedDeleteGroupCancelMordal: boolean;
  setClickedDeleteGroupCancelMordal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  clickedDeleteGroupOkMordal: boolean;
  setClickedDeleteGroupOkMordal: React.Dispatch<React.SetStateAction<boolean>>;
  setHiddenGroupModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  clickedHiddenGroupCancelMordal: boolean;
  setClickedHiddenGroupCancelMordal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  clickedHiddenGroupOkMordal: boolean;
  setClickedHiddenGroupOkMordal: React.Dispatch<React.SetStateAction<boolean>>;
  setGroupChatRoomId: React.Dispatch<React.SetStateAction<string>>;
  setDirectChatRoomId: React.Dispatch<React.SetStateAction<string>>;
  groupChatRoomId: string;
  directChatRoomId: string;
};

export function ChatsList({
  chatRoomList,
  setDeleteGroupModalVisible,
  clickedDeleteGroupCancelMordal,
  setClickedDeleteGroupCancelMordal,
  clickedDeleteGroupOkMordal,
  setClickedDeleteGroupOkMordal,
  setHiddenGroupModalVisible,
  clickedHiddenGroupCancelMordal,
  setClickedHiddenGroupCancelMordal,
  clickedHiddenGroupOkMordal,
  setClickedHiddenGroupOkMordal,
  setGroupChatRoomId,
  setDirectChatRoomId,
  groupChatRoomId,
  directChatRoomId,
}: ChatsListType) {
  return (
    <>
      <View style={styles.listBoxStyle}>
        <ChatBasic
          chatRoomList={chatRoomList}
          setDeleteGroupModalVisible={setDeleteGroupModalVisible}
          clickedDeleteGroupCancelMordal={clickedDeleteGroupCancelMordal}
          setClickedDeleteGroupCancelMordal={setClickedDeleteGroupCancelMordal}
          clickedDeleteGroupOkMordal={clickedDeleteGroupOkMordal}
          setClickedDeleteGroupOkMordal={setClickedDeleteGroupOkMordal}
          setHiddenGroupModalVisible={setHiddenGroupModalVisible}
          clickedHiddenGroupCancelMordal={clickedHiddenGroupCancelMordal}
          setClickedHiddenGroupCancelMordal={setClickedHiddenGroupCancelMordal}
          clickedHiddenGroupOkMordal={clickedHiddenGroupOkMordal}
          setClickedHiddenGroupOkMordal={setClickedHiddenGroupOkMordal}
          setGroupChatRoomId={setGroupChatRoomId}
          setDirectChatRoomId={setDirectChatRoomId}
          groupChatRoomId={groupChatRoomId}
          directChatRoomId={directChatRoomId}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listBoxStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
