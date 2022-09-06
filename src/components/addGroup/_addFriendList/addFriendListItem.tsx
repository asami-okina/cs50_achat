// libs
import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";

// layouts
import { ADD_FRIEND_WIDTH } from "../../../constants/layout";

// constantsSelectedFriendStyles
import { selectedFriendStyles } from "../../../constants/styles/selectedFriendStyles";

type AddFriendListItemType = {
  list: NewFriendListPropsType;
  deleteFriendList: (rowKey: string, type: string) => void;
};

export function AddFriendListItem({
  list,
  deleteFriendList,
}: AddFriendListItemType) {
  return (
    <View style={styles.containerStyle} key={list.key}>
      <Pressable
        onPress={() => {
          deleteFriendList(list.key, list.type);
        }}
      >
        <View style={selectedFriendStyles.closeImageContainerStyle}>
          <Image
            source={require("../../../../assets/images/close-icon.png")}
            style={selectedFriendStyles.closeImageStyle}
          />
        </View>
        <Image
          source={{ uri: list.friend_profile_image }}
          style={selectedFriendStyles.profileImageStyle}
        />
        <Text
          style={selectedFriendStyles.listItemNameStyle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {list.friend_nickname}
        </Text>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  containerStyle: {
    width: ADD_FRIEND_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
});
