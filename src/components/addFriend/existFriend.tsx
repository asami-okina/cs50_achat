// libs
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// components
import { SmallButton } from "../common/smallButton";

// style
import { selectedFriendStyles } from "../../constants/styles/selectedFriendStyles";

// layouts
import {
  CONTENT_WIDTH,
  BIG_PROFILE_IMAGE_SIZE,
  STANDARD_FONT,
  MAIN_PINK_COLOR,
  PROFILE_IMAGE_BORDER_RADIUS,
  MAIN_NAVY_COLOR,
} from "../../constants/layout";

type ExistFriendType = {
  friendInfoByUserId: FriendInfoType;
  isAlreadyFriend: boolean;
};

export function ExistFriend({
  friendInfoByUserId,
  isAlreadyFriend,
}: ExistFriendType) {
  return (
    <View style={styles.searchInfoWrapperStyle}>
      <View style={styles.searchInfoContainerStyle}>
        {friendInfoByUserId.friend_profile_image ? (
          <Image
            source={{ uri: friendInfoByUserId.friend_profile_image }}
            style={styles.profileImageStyle}
          />
        ) : (
          <View style={styles.circleStyle}></View>
        )}
        <Text style={selectedFriendStyles.bigProfilelistItemNameStyle}>
          {friendInfoByUserId.friend_nickname}
        </Text>
      </View>
      <SmallButton
        text={"Add"}
        addFriendList={friendInfoByUserId}
        addGroupFriendList={null}
        groupSetting={null}
        type={"addFriend"}
        friendListNames={null}
        isAlreadyFriend={isAlreadyFriend}
        addGroupMemberGroupChatRoomId={null}
        addGroupMemberGroupImage={null}
        addGroupMemberGroupName={null}
        backGroupName={null}
        backGroupImage={null}
      />
      {isAlreadyFriend && (
        <Text style={styles.errorTextStyle}>Already requested.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchInfoWrapperStyle: {
    marginTop: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInfoContainerStyle: {
    width: CONTENT_WIDTH,
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageStyle: {
    width: BIG_PROFILE_IMAGE_SIZE,
    height: BIG_PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
  },
  circleStyle: {
    width: BIG_PROFILE_IMAGE_SIZE,
    height: BIG_PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
    backgroundColor: MAIN_NAVY_COLOR,
  },
  errorTextStyle: {
    fontFamily: STANDARD_FONT,
    color: MAIN_PINK_COLOR,
    textAlign: "center",
  },
});
