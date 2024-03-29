// libs
import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { API_SERVER_URL } from "../../constants/api";
import { storage } from "../../../storage";
import { useNavigationAChat } from "../../hooks/useNavigationAChat";
import { postFetchApiHeader } from "../../constants/common";
import { authContext } from "../../context/authContext";

// layouts
import {
  MAIN_NAVY_COLOR,
  MAIN_WHITE_COLOR,
  BUTTON_HEIGHT,
  CONTENT_WIDTH,
  STANDARD_FONT,
  BUTTON_TEXT_SIZE,
  MAIN_GRAY_COLOR,
  BUTTON_BORDER_RADIUS,
} from "../../constants/layout";

type ButtonPropsType = {
  link: string;
  buttonText: string;
  enable: boolean;
  scene: string;
  propsList: {
    directChatRoomId?: string;
    friendImage?: string;
    friendNickName?: string;
    friendUserId?: string;
    _updateNickName?: () => Promise<void>;
    nickName?: string;
    setNickName?: React.Dispatch<React.SetStateAction<string>>;
    emailFormText?: string;
    passwordFormText?: string;
    executedLoginAuthentication?: boolean;
    onFocusInputMailOrPasseword?: boolean;
    onPressFunction?: () => Promise<void>;
    email?: string;
    password?: string;
    userId?: string;
  };
};

type AddedFriendInfoType = {
  direct_chat_room_id: string;
  friend_use_id: string;
  friend_profile_image: Option<String>;
  friend_nickname: string;
};

export function Button({
  link,
  buttonText,
  enable,
  scene,
  propsList,
}: ButtonPropsType) {
  const auth = useContext(authContext);
  const navigation = useNavigationAChat();
  const [userId, setUserId] = useState<string>();
  const [addedFriendUserInfo, setAddedFriendUserInfo] =
    useState<AddedFriendInfoType>();

  // 友達追加(ループチャット画面で友達ではないユーザーアイコンをクリックした場合、友達追加する)
  async function _addFriend() {
    try {
      const bodyData = {
        friend_user_id: propsList.friendUserId,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/friends`,
        postFetchApiHeader(bodyData)
      );
      const parseResponse = await response.json();
      setAddedFriendUserInfo(parseResponse.friend_info);
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

  // 会員登録
  async function _signUp() {
    try {
      const bodyData = {
        mail: propsList?.email,
        password: propsList?.password,
        user_id: propsList?.userId,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/signup`,
        postFetchApiHeader(bodyData)
      );
      const parseResponse = await response.json();
      const response_user_id = parseResponse.user_id;
      await storage.save({
        key: "key",
        data: {
          userId: response_user_id,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (auth) {
      setUserId(auth);
    }
  }, []);

  return (
    <>
      {
        // ログイン画面の場合
        scene === "LogIn" ? (
          <TouchableOpacity
            style={
              propsList.emailFormText.length !== 0 &&
              propsList.passwordFormText.length !== 0
                ? propsList.executedLoginAuthentication
                  ? propsList.onFocusInputMailOrPasseword
                    ? styles.buttonContainerStyle
                    : [
                        styles.buttonContainerStyle,
                        styles.buttonContainerInvalidStyle,
                      ]
                  : styles.buttonContainerStyle
                : [
                    styles.buttonContainerStyle,
                    styles.buttonContainerInvalidStyle,
                  ]
            }
            onPress={() => {
              if (
                propsList.emailFormText.length !== 0 &&
                propsList.passwordFormText.length !== 0
              ) {
                propsList.onPressFunction();
              }
            }}
          >
            <Text style={styles.buttonTextStyle}>Log In</Text>
          </TouchableOpacity>
        ) : (
          // ログイン以外の画面の場合(scene === 'Welcome' || scene === 'SignUp')等
          <TouchableOpacity
            style={
              enable
                ? styles.buttonContainerStyle
                : [
                    styles.buttonContainerStyle,
                    styles.buttonContainerInvalidStyle,
                  ]
            }
            onPress={() => {
              // プロフィール設定画面にてニックネームの更新
              if (
                enable &&
                scene === "ProfileSettingNickName" &&
                propsList.nickName.length !== 0 &&
                link
              ) {
                propsList._updateNickName();
                navigation.navigate("Profile");
              }
              // グループチャット画面で既に友達であるユーザーアイコンをクリックした場合、チャット画面２千位
              if (enable && scene === "alreadyFriendModal") {
                navigation.navigate("Chat", {
                  groupChatRoomId: null,
                  directChatRoomId: propsList.directChatRoomId,
                  profileImage: propsList.friendImage,
                  name: propsList.friendNickName,
                  groupMemberUserId: null,
                });
              }
              // グループチャット画面で友達ではないユーザーアイコンをクリックした場合、友だち追加する
              if (enable && scene === "notFriendModal") {
                // 友達追加
                _addFriend();
              }
              if (enable && link && scene !== "ProfileSettingNickName") {
                // welcomeページからsignupページに遷移
                if (scene == "Welcome" && link == "SignUp") {
                  navigation.navigate(link);
                }
                // signUpページからhomeページに遷移
                if (scene == "SignUp" && link == "Home") {
                  // サインアップ
                  _signUp().then(() => {
                    navigation.navigate(link);
                  });
                }
              }
            }}
          >
            <Text style={styles.buttonTextStyle}>{buttonText}</Text>
          </TouchableOpacity>
        )
      }
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: CONTENT_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_BORDER_RADIUS,
    fontSize: BUTTON_TEXT_SIZE,
    backgroundColor: MAIN_NAVY_COLOR,
  },
  buttonTextStyle: {
    color: MAIN_WHITE_COLOR,
    fontFamily: STANDARD_FONT,
  },
  buttonContainerInvalidStyle: {
    backgroundColor: MAIN_GRAY_COLOR,
  },
});
