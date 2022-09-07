// libs
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  ListRenderItemInfo,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { API_SERVER_URL } from "../../../../constants/api";
import { storage } from "../../../../../storage";
import { useNavigationAChat } from "../../../../hooks/useNavigationAChat";
import { Component } from "react";
import { postFetchApiHeader } from "../../../../constants/common";

// layouts
import {
  CONTENT_WIDTH,
  PROFILE_IMAGE_SIZE,
  STANDARD_FONT,
  MAIN_WHITE_COLOR,
  MAIN_PINK_COLOR,
  PROFILE_IMAGE_BORDER_RADIUS,
  MAIN_NAVY_COLOR,
} from "../../../../constants/layout";

type BasicPropsType = {
  groupList: GroupListPropsType[] | null;
  friendList: FriendListPropsType[] | null;
  type: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  clickedCancelMordal: boolean;
  setClickedCancelMordal: React.Dispatch<React.SetStateAction<boolean>>;
  clickedOkMordal: boolean;
  setClickedOkMordal: React.Dispatch<React.SetStateAction<boolean>>;
  setGroupCount: React.Dispatch<React.SetStateAction<number>>;
};

type NewListType =
  | {
      key: string;
      group_chat_room_id: string;
      group_name: string;
      group_image: string;
    }
  | {
      key: string;
      direct_chat_room_id: string;
      friend_use_id: string;
      friend_profile_image: string;
      friend_nickname: string;
    };

// RowMapの型生成(ライブラリより引用:/Users/asami/Desktop/A-Chat/develop/A-chat/node_modules/react-native-swipe-list-view/types/index.d.ts)
type RowMap<T> = { [open_cell_key: string]: SwipeRow<T> };

export class SwipeRow<T> extends Component<Partial<IPropsSwipeRow<T>>> {
  closeRow: () => void;
  closeRowWithoutAnimation: () => void;
  manuallySwipeRow: (toValue: number, onAnimationEnd?: () => void) => void;
}

export default function Basic({
  groupList,
  friendList,
  type,
  setModalVisible,
  clickedCancelMordal,
  setClickedCancelMordal,
  clickedOkMordal,
  setClickedOkMordal,
  setGroupCount,
}: BasicPropsType) {
  const navigation = useNavigationAChat();
  const [userId, setUserId] = useState<string>(null);

  // 削除時の確認モーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
  const [rowMap, setRowMap] = useState<RowMap<NewListType>>(null);
  const [key, setkey] = useState<string>(null);
  const [groupChatRoomId, setGroupChatRoomId] = useState<string>("");

  // 一覧のリストを作成
  const [listData, setListData] = useState<
    NewFriendListPropsType[] | NewGroupListPropsType[] | NewListType[]
  >(
    type === "Group"
      ? groupList.map((_, i) => ({ ..._, key: `${i}` }))
      : friendList.map((_, i) => ({ ..._, key: `${i}` }))
  );

  // friendListの更新
  useEffect(() => {
    if (friendList) {
      setListData(friendList.map((_, i) => ({ ..._, key: `${i}` })));
    }
  }, [friendList]);

  // groupListの更新
  useEffect(() => {
    if (groupList) {
      setListData(groupList.map((_, i) => ({ ..._, key: `${i}` })));
    }
  }, [groupList]);

  useEffect(() => {
    storage
      .load({
        key: "key",
      })
      .then((data) => {
        setUserId(data.userId);
      });
  }, []);

  // スワップされた該当行をデフォルト状態に戻す
  const closeRow = (rowMap: RowMap<NewListType>, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  // 全体リストから該当のリストを削除
  // rowMap: オブジェクト , rowKey: 削除するindex
  const deleteRow = (rowMap: RowMap<NewListType>, rowKey: string) => {
    closeRow(rowMap, rowKey);
    // Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
    const newData = [...listData];
    // findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
    // グループ数の変更
    setGroupCount(newData.length);
  };

  const renderItem = (data: ListRenderItemInfo<FriendOrGroupHomeListType>) => (
    <>
      {"group_chat_room_id" in data.item && type === "Group" && (
        <TouchableHighlight
          onPress={() => {
            if ("group_chat_room_id" in data.item) {
              navigation.navigate("Chat", {
                groupChatRoomId: data.item.group_chat_room_id,
                directChatRoomId: null,
                profileImage: data.item.group_image,
                name: data.item.group_name,
                groupMemberUserId: data.item.group_member_user_ids,
              });
            }
          }}
          style={styles.rowFrontStyle}
          underlayColor={"#feffff"}
        >
          <View style={styles.listWrapperStyle}>
            <View style={styles.listItemContainerStyle}>
              {data.item.group_image ? (
                <Image
                  source={{ uri: data.item.group_image }}
                  style={styles.profileImageStyle}
                />
              ) : (
                <View style={styles.profileImageNoneStyle}></View>
              )}
              <Text style={styles.listItemNameStyle}>
                {data.item.group_name}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      )}
      {"direct_chat_room_id" in data.item && type === "Friend" && (
        <TouchableHighlight
          onPress={() => {
            if ("direct_chat_room_id" in data.item) {
              navigation.navigate("Chat", {
                groupChatRoomId: null,
                directChatRoomId: data.item.direct_chat_room_id,
                profileImage: data.item.friend_profile_image,
                name: data.item.friend_nickname,
              });
            }
          }}
          style={styles.rowFrontStyle}
          underlayColor={"#feffff"}
        >
          <View style={styles.listWrapperStyle}>
            <View style={styles.listItemContainerStyle}>
              {data.item.friend_profile_image ? (
                <Image
                  source={{ uri: data.item.friend_profile_image }}
                  style={styles.profileImageStyle}
                />
              ) : (
                <View style={styles.profileImageNoneStyle}></View>
              )}
              <Text style={styles.listItemNameStyle}>
                {data.item.friend_nickname}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      )}
    </>
  );

  // スワップできるようにする
  const renderHiddenItem = (
    data: ListRenderItemInfo<FriendOrGroupHomeListType>,
    rowMap: RowMap<NewListType>
  ) => {
    return (
      <View style={styles.rowBackStyle}>
        {/* deleteボタン */}
        <TouchableOpacity
          style={[styles.backRightBtnStyle, styles.backRightBtnRightStyle]}
          onPress={() => {
            // 確認モーダルを表示
            setModalVisible(true);
            // 削除時のモーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
            setRowMap(rowMap);
            setkey(data.item.key);
            if ("group_chat_room_id" in data.item) {
              setGroupChatRoomId(data.item.group_chat_room_id);
            }
          }}
        >
          <Text style={styles.backTextWhiteStyle}>Leave</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // 削除時の確認モーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
  useEffect(() => {
    if (clickedCancelMordal) {
      // スワイプされた行をデフォルト状態に戻す
      rowMap[key].closeRow();
      // 初期化
      setRowMap(null);
      setkey(null);
      setClickedCancelMordal(false);
      setGroupChatRoomId("");
    }
    if (clickedOkMordal) {
      // スワイプされた行を削除
      deleteRow(rowMap, key);
      // グループ脱退関数実行
      _leaveGroup(userId, groupChatRoomId);
      // 初期化
      setRowMap(null);
      setkey(null);
      setClickedOkMordal(false);
      setGroupChatRoomId("");
    }
  }, [clickedCancelMordal, clickedOkMordal]);

  // グループから脱退
  async function _leaveGroup(userId: string, groupChatRoomId: string) {
    try {
      const bodyData = {
        group_chat_room_id: groupChatRoomId,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/groups/leave`,
        postFetchApiHeader(bodyData)
      );
      // グループ数の再取得
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.containerStyle}>
      {type === "Group" && (
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
          disableRightSwipe={true}
        />
      )}
      {type === "Friend" && (
        <SwipeListView data={listData} renderItem={renderItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: MAIN_WHITE_COLOR,
  },
  backTextWhiteStyle: {
    color: MAIN_WHITE_COLOR,
  },
  rowFrontStyle: {
    alignItems: "center",
    backgroundColor: MAIN_WHITE_COLOR,
    justifyContent: "center",
    height: 50,
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
  profileImageStyle: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
  },
  profileImageNoneStyle: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
    backgroundColor: MAIN_NAVY_COLOR,
  },
  listWrapperStyle: {
    height: 60,
    width: CONTENT_WIDTH,
    display: "flex",
    justifyContent: "center",
    marginBottom: 5,
  },
  listItemContainerStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  listItemNameStyle: {
    fontFamily: STANDARD_FONT,
    marginLeft: 12,
  },
});
