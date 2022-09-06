// libs
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { API_SERVER_URL } from "../../constants/api";
import { storage } from "../../../storage";
import { useNavigationAChat } from "../../hooks/useNavigationAChat";
import { postFetchApiHeader } from "../../constants/common";

// layouts
import {
  MAIN_NAVY_COLOR,
  MAIN_WHITE_COLOR,
  ADD_BUTTON_SIZE,
  CONTENT_WIDTH,
  BUTTON_BORDER_RADIUS,
  MAIN_BLACK_COLOR,
  SMALL_BUTTON_WIDTH,
  MAIN_GRAY_COLOR,
} from "../../constants/layout";

type SmallButtonType = {
  text: string;
  addGroupFriendList?: NewFriendListPropsType[];
  addFriendList: addFriendList;
  groupSetting: {
    groupName?: string;
    groupImage?: string;
  };
  type: string;
  friendListNames: string;
  isAlreadyFriend: boolean;
  addGroupMemberGroupChatRoomId: string;
  addGroupMemberGroupImage: string;
  addGroupMemberGroupName: string;
  backGroupName: string | null;
  backGroupImage: string | null;
};
export function SmallButton({
  text,
  addGroupFriendList,
  addFriendList,
  groupSetting,
  type,
  friendListNames,
  isAlreadyFriend,
  addGroupMemberGroupChatRoomId,
  addGroupMemberGroupImage,
  addGroupMemberGroupName,
  backGroupName,
  backGroupImage,
}: SmallButtonType) {
  const navigation = useNavigationAChat();
  const [userId, setUserId] = useState<string>(null);
  const [groupChatRoomId, setGroupChatRoomId] = useState<string>("");
  const [groupMemberUseridsIncludedMe, setGroupMemberUseridsIncludedMe] =
    useState<string[]>([]);
  const [addedGroupMemberUserNames, setAddedGroupMemberUserNames] = useState<
    string[]
  >([]);
  const [addedFriendUsersInfo, setAddedFriendUsersInfo] = useState<
    FriendListPropsType[] | []
  >([]);

  // グループ追加
  async function _addGroup() {
    try {
      const bodyData = {
        group_image: groupSetting.groupImage,
        group_name: groupSetting.groupName || friendListNames,
        group_member_user_ids: groupMemberUseridsIncludedMe,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/groups/add`,
        postFetchApiHeader(bodyData)
      );
      const parseResponse = await response.json();
      const groupChatRoomId = parseResponse.group_info.group_chat_room_id;
      setGroupChatRoomId(groupChatRoomId);
      navigation.navigate("Chat", {
        groupChatRoomId: parseResponse.group_info.group_chat_room_id,
        directChatRoomId: null,
        profileImage: parseResponse.group_info.group_image,
        name: parseResponse.group_info.group_name,
      });
    } catch (e) {
      console.error(e);
    }
  }

  // 友達追加
  async function _addFriend() {
    try {
      const bodyData = {
        friend_user_id: addFriendList.friend_use_id,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/friends`,
        postFetchApiHeader(bodyData)
      );
      const parseResponse = await response.json();
      setAddedFriendUsersInfo(parseResponse.friend_info);
      // 友達チャットに遷移
      navigation.navigate("Chat", {
        groupChatRoomId: null,
        directChatRoomId: parseResponse.friend_info.direct_chat_room_id,
        profileImage: parseResponse.friend_info.friend_profile_image,
        name: parseResponse.friend_info.friend_nickname,
      });
    } catch (e) {
      console.error(e);
    }
  }

  // グループメンバーの追加
  async function _addGroupMember() {
    try {
      // ユーザーID一覧
      let newDataUserIds = [];
      let newDataUserNames = [];
      for (let i = 0; i < addGroupFriendList.length; i++) {
        newDataUserIds.push(addGroupFriendList[i].friend_use_id);
        newDataUserNames.push(addGroupFriendList[i].friend_nickname);
      }
      setAddedGroupMemberUserNames(newDataUserNames);
      const bodyData = {
        group_chat_room_id: Number(addGroupMemberGroupChatRoomId),
        add_user_ids: newDataUserIds,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/group-member`,
        postFetchApiHeader(bodyData)
      );
      const parseResponse = await response.json();
      const addedUserIdsList = parseResponse.adduserIds;
    } catch (e) {
      console.error(e);
    }
  }

  // グループメンバーに追加されたら、チャット画面に遷移
  useEffect(() => {
    if (addedGroupMemberUserNames.length !== 0) {
      navigation.navigate("Chat", {
        groupChatRoomId: addGroupMemberGroupChatRoomId,
        directChatRoomId: null,
        profileImage: addGroupMemberGroupImage,
        name: addGroupMemberGroupName,
        addedGroupMemberUserNames: addedGroupMemberUserNames,
      });
    }
  }, [addedGroupMemberUserNames]);

  useEffect(() => {
    storage
      .load({
        key: "key",
      })
      .then((data) => {
        setUserId(data.userId);
      });
  }, []);

  // friendListからuserIdだけ取り出し、自分のuserIdも追加
  useEffect(() => {
    if (addGroupFriendList && type === "addGroupSetting" && userId) {
      let groupMemberUseridsIncludedMe = [];
      for (let i = 0; i < addGroupFriendList.length; i++) {
        groupMemberUseridsIncludedMe.push(addGroupFriendList[i].friend_use_id);
      }
      groupMemberUseridsIncludedMe.push(userId);
      setGroupMemberUseridsIncludedMe(groupMemberUseridsIncludedMe);
    }
  }, [addGroupFriendList, userId]);

  return (
    <View style={styles.boxStyle}>
      <View style={styles.wrapperStyle}>
        <View
          style={
            type === "addFriend"
              ? styles.addFriendContainerStyle
              : styles.containerStyle
          }
        >
          <TouchableOpacity
            style={
              isAlreadyFriend
                ? [styles.buttonStyle, styles.buttonGrayStyle]
                : styles.buttonStyle
            }
            onPress={() => {
              // グループ追加画面からグループ設定画面への遷移
              if (type === "addGroup") {
                navigation.navigate("AddGroupSetting", {
                  friendList: addGroupFriendList,
                  backGroupName: backGroupName,
                  backGroupImage: backGroupImage,
                });
              }
              if (type === "addGroupSetting") {
                // グループ追加API実行
                _addGroup().then(() => {
                  // グループ設定画面からグループチャットに遷移
                  // 本番では、"group 6"部分を修正。現在は仮で実装している。
                  navigation.navigate("Chat", {
                    groupChatRoomId: groupChatRoomId,
                    directChatRoomId: null,
                    profileImage: groupSetting.groupImage,
                    name: groupSetting.groupName || friendListNames,
                  });
                });
              }
              if (type === "addFriend" && !isAlreadyFriend) {
                // 友達追加API実行
                // 友だち追加画面から友達とのチャットに遷移
                _addFriend();
              }
              if (type === "addGroupMember") {
                // グループメンバーの追加
                _addGroupMember();
              }
            }}
          >
            <Text style={styles.textStyle}>{text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MAIN_WHITE_COLOR,
  },
  wrapperStyle: {
    backgroundColor: MAIN_WHITE_COLOR,
    width: CONTENT_WIDTH,
  },
  containerStyle: {
    height: ADD_BUTTON_SIZE,
    alignItems: "flex-end",
  },
  addFriendContainerStyle: {
    height: ADD_BUTTON_SIZE,
    alignItems: "center",
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: SMALL_BUTTON_WIDTH,
    height: 50,
    borderRadius: BUTTON_BORDER_RADIUS,
    backgroundColor: MAIN_NAVY_COLOR,
    textAlign: "center",
    shadowColor: MAIN_BLACK_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonGrayStyle: {
    backgroundColor: MAIN_GRAY_COLOR,
  },
  textStyle: {
    color: MAIN_WHITE_COLOR,
  },
});
