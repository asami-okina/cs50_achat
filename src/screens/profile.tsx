// libs
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { storage } from "../../storage";
import { getFetchApiHeader } from "../constants/common";

// components
import { TopAreaWrapper } from "../components/common/topAreaWrapper";
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle";
import { ProfileInfo } from "../components/profile/profileInfo";
import { ProfileImage } from "../components/profile/profileImage";
import { API_SERVER_URL } from "../constants/api";

// style
import { sameStyles } from "../constants/styles/sameStyles";

export function Profile() {
  const [userId, setUserId] = useState<string>(null);
  const [nickName, setNickName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>(null);
  const [isEnabledToggle, setIsEnabledToggle] = useState<boolean>(false);
  const isScreenFocused = useIsFocused();

  async function _fetchProfileByUserId(userId: string) {
    try {
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/profile`,
        getFetchApiHeader
      );
      const parseResponse = await response.json();

      if (parseResponse.profile.nickname) {
        setNickName(parseResponse.profile.nickname);
      }
      if (parseResponse.profile.profile_image) {
        setProfileImage(parseResponse.profile.profile_image);
      }
      if (parseResponse.profile.search_flag) {
        setIsEnabledToggle(parseResponse.profile.search_flag);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    storage
      .load({
        key: "key",
      })
      .then((data) => {
        setUserId(data.userId);
        // navigationがリレンダーされないので、画面にフォーカスが当たった時に再実行するよう実装
        _fetchProfileByUserId(data.userId);
      });
  }, [isScreenFocused]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={sameStyles.screenContainerStyle}
    >
      <SafeAreaView style={sameStyles.screenContainerStyle}>
        {/* 画面一番上にある青色の余白部分 */}
        <View style={sameStyles.topMarginViewStyle}></View>
        {/* 丸みを帯びている白いトップ部分 */}
        <TopAreaWrapper type={"addFriend"}>
          <MainTitle
            title={"Profile Setting"}
            link={"Home"}
            props={null}
            groupChatRoomId={null}
            groupMemberUserId={null}
          />
        </TopAreaWrapper>
        {/* トップ部分を除くメイン部分*/}
        <View style={sameStyles.mainContainerStyle}>
          <View style={styles.profileImageWrapperStyle}>
            {/* プロフィール画像 */}
            <ProfileImage image={profileImage} setImage={setProfileImage} />
            {/* プロフィール */}
            <ProfileInfo
              setNickName={setNickName}
              nickName={nickName}
              isEnabledToggle={isEnabledToggle}
              setIsEnabledToggle={setIsEnabledToggle}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  profileImageWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
