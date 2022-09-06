// libs
import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
} from "react-native";

// layouts
import {
  CONTENT_WIDTH,
  MAIN_WHITE_COLOR,
  PROFILE_IMAGE_SIZE,
  STANDARD_FONT,
  ICON_SIZE,
  PROFILE_IMAGE_BORDER_RADIUS,
  MAIN_GRAY_COLOR,
  MAIN_NAVY_COLOR,
} from "../../../constants/layout";

type FriendListItem = {
  list: NewFriendListPropsType;
  addFriendList: (rowKey: string, type: string) => void;
  deleteFriendList: (rowKey: string, type: string) => void;
  selectedFriendList: NewFriendListPropsType[];
  groupMemberUserId: string[];
};

export function FriendListItem({
  list,
  addFriendList,
  deleteFriendList,
  selectedFriendList,
  groupMemberUserId,
}: FriendListItem) {
  let clicked = false;
  // 該当友達が選択されているかどうかの判定
  if (selectedFriendList !== null) {
    const prevIndex = selectedFriendList.findIndex(
      (item) => item.friend_use_id === list.friend_use_id
    );
    if (prevIndex !== -1) {
      clicked = true;
    }
  }
  return (
    <TouchableHighlight
      onPress={() => {
        // clickedがtrueの場合(この時点ではtrueに変わっていないので、falseで判定)
        if (
          !clicked &&
          !groupMemberUserId.includes(list.friend_use_id)
        ) {
          addFriendList(list.key, list.type);
        }
        // clickedがfalseの場合(この時点ではfalseに変わっていないので、trueで判定)
        if (
          clicked &&
          !groupMemberUserId.includes(list.friend_use_id)
        ) {
          deleteFriendList(list.key, list.type);
        }
      }}
      style={styles.rowFrontStyle}
      underlayColor={"#feffff"}
    >
      <View style={styles.listBoxStyle}>
        <View style={styles.listWrapperStyle}>
          <View style={styles.listItemContainerStyle}>
            {list.friend_profile_image && list.friend_use_id ? (
              <Image
                source={{ uri: list.friend_profile_image }}
                style={
                  groupMemberUserId.includes(list.friend_use_id)
                    ? styles.selectedProfileImageStyle
                    : styles.profileImageStyle
                }
              />
            ) : (
              <View style={styles.profileImageNoneStyle}></View>
            )}
            <Text
              style={
                groupMemberUserId.includes(list.friend_use_id)
                  ? styles.selectedListItemNameStyle
                  : styles.listItemNameStyle
              }
            >
              {list.friend_nickname}
            </Text>
          </View>
        </View>
        <View style={styles.circleContainerStyle}>
          {clicked ? (
            <Image
              source={require("../../../../assets/images/checked-circle.png")}
              style={styles.circleStyle}
            />
          ) : groupMemberUserId.includes(
              list.friend_use_id
            ) ? null : (
            <Image
              source={require("../../../../assets/images/gray_circle.png")}
              style={styles.circleStyle}
            />
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
}

export const styles = StyleSheet.create({
  rowFrontStyle: {
    alignItems: "center",
    backgroundColor: MAIN_WHITE_COLOR,
    justifyContent: "center",
    height: 50,
  },
  selectedProfileImageStyle: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
    opacity: 0.5,
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
  listBoxStyle: {
    flexDirection: "row",
    width: CONTENT_WIDTH,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  listWrapperStyle: {
    height: "100%",
    justifyContent: "center",
    marginBottom: 5,
  },
  listItemContainerStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectedListItemNameStyle: {
    fontFamily: STANDARD_FONT,
    marginLeft: 12,
    color: MAIN_GRAY_COLOR,
  },
  listItemNameStyle: {
    fontFamily: STANDARD_FONT,
    marginLeft: 12,
  },
  circleContainerStyle: {
    justifyContent: "center",
  },
  circleStyle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
