// libs
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";
import { chatsclickedTypeEnum } from "../../../../constants/enum";

// layouts
import {
  MAIN_WHITE_COLOR,
  MAIN_PINK_COLOR,
} from "../../../../constants/layout";

type HiddenListItemType = {
  setDeleteGroupModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setHiddenGroupModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRowMap: React.Dispatch<React.SetStateAction<string>>;
  setkey: React.Dispatch<React.SetStateAction<string>>;
  setClickedType: React.Dispatch<React.SetStateAction<chatsclickedTypeEnum>>;
  rowMap: string;
  data: ListRenderItemInfo<ChatRoomListType>;
  setGroupChatRoomId: React.Dispatch<React.SetStateAction<string>>;
  setDirectChatRoomId: React.Dispatch<React.SetStateAction<string>>;
};

export function HiddenListItem({
  setDeleteGroupModalVisible,
  setHiddenGroupModalVisible,
  setRowMap,
  setkey,
  setClickedType,
  rowMap,
  data,
  setGroupChatRoomId,
  setDirectChatRoomId,
}: HiddenListItemType) {
  return (
    <View style={styles.rowBackStyle}>
      {/* deleteボタン */}
      <TouchableOpacity
        style={[styles.backRightBtnStyle, styles.backRightBtnRightStyle]}
        onPress={() => {
          setDeleteGroupModalVisible(true);
          // 削除時のモーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する用に使用
          setRowMap(rowMap);
          setkey(data.item.key);
          if ("group_chat_room_id" in data.item) {
            setGroupChatRoomId(data.item.group_chat_room_id);
          }
          if ("direct_chat_room_id" in data.item) {
            setDirectChatRoomId(data.item.direct_chat_room_id);
          }
          setClickedType(chatsclickedTypeEnum.Delete);
        }}
      >
        <Text style={styles.backTextWhiteStyle}>Delete</Text>
      </TouchableOpacity>
      {/* Hiddenボタン */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          setHiddenGroupModalVisible(true);
          // 削除時のモーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する用に使用
          setRowMap(rowMap);
          setkey(data.item.key);
          if ("group_chat_room_id" in data.item) {
            setGroupChatRoomId(data.item.group_chat_room_id);
          }
          if ("direct_chat_room_id" in data.item) {
            setDirectChatRoomId(data.item.direct_chat_room_id);
          }
          setClickedType(chatsclickedTypeEnum.Hidden);
        }}
      >
        <Text style={styles.backTextWhiteStyle}>Hidden</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backTextWhiteStyle: {
    color: MAIN_WHITE_COLOR,
  },
  rowFrontStyle: {
    alignItems: "center",
    backgroundColor: MAIN_WHITE_COLOR,
    justifyContent: "center",
  },
  rowBackStyle: {
    alignItems: "center",
    backgroundColor: MAIN_WHITE_COLOR,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtnStyle: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRightStyle: {
    backgroundColor: MAIN_PINK_COLOR,
    right: 0,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "#A3A3A3",
    right: 75,
  },
  backTextWhite: {
    color: "#FFF",
  },
});
