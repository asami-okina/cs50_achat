// libs
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { API_SERVER_URL } from "../../../constants/api";
import { postFetchApiHeader } from "../../../constants/common";
import { chatsclickedTypeEnum } from "../../../constants/enum";
import { authContext } from "../../../context/authContext";

// components
import { ListItem } from "./_chatBasic/listItem";
import { HiddenListItem } from "./_chatBasic/hiddenListItem";

// layouts
import { MAIN_WHITE_COLOR } from "../../../constants/layout";

type ChatBasicType = {
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

export default function ChatBasic({
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
}: ChatBasicType) {
  const auth = useContext(authContext);
  const [userId, setUserId] = useState<string>(null);
  // 削除時の確認モーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
  const [rowMap, setRowMap] = useState<string>("");
  const [key, setkey] = useState<string>("");
  const [clickedType, setClickedType] = useState<chatsclickedTypeEnum>();

  // 一覧のリストを作成
  const [listData, setListData] = useState<ChatRoomListType[]>(
    chatRoomList.map((_, i) => ({ ..._, key: `${i}` }))
  );

  useEffect(() => {
    if (chatRoomList) {
      setListData(chatRoomList.map((_, i) => ({ ..._, key: `${i}` })));
    }
  }, [chatRoomList]);

  // スワップされた該当行をデフォルト状態に戻す
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  // 全体リストから該当のリストを削除
  // rowMap: オブジェクト , rowKey: 削除するindex
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    // Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
    const newData = [...listData];
    // findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = (data) => (
    <>
      {/* 友達の場合 */}
      {data.item.friend_user_id && (
        <ListItem
          profileImage={data.item.friend_profile_image}
          name={data.item.friend_nickname}
          lastMessageCreationDate={data.item.last_message_created_at}
          lastMessageContent={data.item.last_message_content}
          unreadCount={data.item.unread_count}
          groupChatRoomId={null}
          directChatRoomId={data.item.direct_chat_room_id}
          groupMemberUserId={null}
        />
      )}
      {/* グループの場合 */}
      {data.item.group_chat_room_id && (
        <ListItem
          profileImage={data.item.group_image}
          name={data.item.group_name}
          lastMessageCreationDate={data.item.last_message_created_at}
          lastMessageContent={data.item.last_message_content}
          unreadCount={data.item.unread_count}
          groupChatRoomId={data.item.group_chat_room_id}
          directChatRoomId={null}
          groupMemberUserId={data.item.group_member_user_id}
        />
      )}
    </>
  );

  // スワップできるようにする
  const renderHiddenItem = (data, rowMap) => (
    <HiddenListItem
      setDeleteGroupModalVisible={setDeleteGroupModalVisible}
      setHiddenGroupModalVisible={setHiddenGroupModalVisible}
      setRowMap={setRowMap}
      setkey={setkey}
      setGroupChatRoomId={setGroupChatRoomId}
      setDirectChatRoomId={setDirectChatRoomId}
      setClickedType={setClickedType}
      rowMap={rowMap}
      data={data}
    />
  );

  // チャットの表示/非表示、削除API
  async function _updateChatRoomHiddenOrDeleteByUserId() {
    try {
      const bodyData = {
        direct_chat_room_id: directChatRoomId ? Number(directChatRoomId) : null,
        group_chat_room_id: groupChatRoomId ? Number(groupChatRoomId) : null,
        update_type: clickedType,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/chat-room`,
        postFetchApiHeader(bodyData)
      );
    } catch (e) {
      console.error(e);
    }
  }

  // 削除時の確認モーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
  useEffect(() => {
    // Cancelを押された場合
    if (clickedDeleteGroupCancelMordal || clickedHiddenGroupCancelMordal) {
      // スワイプされた行をデフォルト状態に戻す
      rowMap[key].closeRow();
      // 初期化
      setRowMap("");
      setkey("");
      setClickedDeleteGroupCancelMordal(false);
      setClickedHiddenGroupCancelMordal(false);
      setGroupChatRoomId("");
      setDirectChatRoomId("");
    }
    if (clickedDeleteGroupOkMordal || clickedHiddenGroupOkMordal) {
      // スワイプされた行を削除
      if (clickedType === chatsclickedTypeEnum.Delete) {
        deleteRow(rowMap, key);
        setClickedDeleteGroupOkMordal(false);
        // チャットの削除API実行
        _updateChatRoomHiddenOrDeleteByUserId();
      }
      if (clickedType === chatsclickedTypeEnum.Hidden) {
        deleteRow(rowMap, key);
        setClickedHiddenGroupOkMordal(false);
        // チャットの非表示API実行
        _updateChatRoomHiddenOrDeleteByUserId();
      }
      // 初期化
      setRowMap("");
      setkey("");
      setGroupChatRoomId("");
      setDirectChatRoomId("");
      setClickedType(null);
    }
  }, [
    clickedDeleteGroupCancelMordal,
    clickedDeleteGroupOkMordal,
    clickedHiddenGroupCancelMordal,
    clickedHiddenGroupOkMordal,
  ]);

  useEffect(() => {
    if (auth) {
      setUserId(auth);
    }
  }, []);

  return (
    <View style={styles.containerStyle}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
        disableRightSwipe={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: MAIN_WHITE_COLOR,
  },
});
