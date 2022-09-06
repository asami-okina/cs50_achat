// libs
import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigationAChat } from "../../hooks/useNavigationAChat";

// components
import { AddFriendList } from "../../components/addGroup/addFriendList";

// layouts
import {
  PROFILE_IMAGE_SIZE,
  ADD_FRIEND_WIDTH,
} from "../../constants/layout";

// constantsSelectedFriendStyles
import { selectedFriendStyles } from "../../constants/styles/selectedFriendStyles";

type SelectedFriendSpaceType = {
  friendList: NewFriendListPropsType[];
  setFriendList: React.Dispatch<
    React.SetStateAction<NewFriendListPropsType[]>
  >;
  ownNickName: string;
  ownProfileImage: string;
  groupName: string;
  groupImage: string;
};

export function SelectedFriendSpace({
  friendList,
  setFriendList,
  ownNickName,
  ownProfileImage,
  groupName,
  groupImage,
}: SelectedFriendSpaceType) {
  // navigation
  const navigation = useNavigationAChat();

  // 選択された友達リストの削除
  const _deleteFriendList = (rowKey: string) => {
    // 選択されたリストから該当リストを削除
    // Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
    const newData = [...friendList];
    // findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
    const prev2Index = friendList.findIndex(
      (item) => item.key === rowKey
    );
    newData.splice(prev2Index, 1);
    setFriendList(newData);
  };

  // refの生成
  const scrollViewRef = useRef();

  return (
    <View style={selectedFriendStyles.wrapperStyle}>
      <View style={selectedFriendStyles.containerStyle}>
        {/* 追加ボタン */}
        <Pressable
          style={styles.ownWrapperStyle}
          onPress={() =>
            navigation.navigate("AddGroup", {
              groupName: groupName,
              groupImage: groupImage,
              backFriendList: friendList,
            })
          }
        >
          <View style={selectedFriendStyles.closeImageStyle}></View>
          <Image
            source={require("../../../assets/images/add-circle.png")}
            style={selectedFriendStyles.profileImageStyle}
          />
          <Text
            style={selectedFriendStyles.listItemNameStyle}
            numberOfLines={1}
            ellipsizeMode="tail"
          ></Text>
        </Pressable>
        {/* 自分 */}
        {ownNickName.length !== 0 && ownProfileImage.length !== 0 && (
          <View style={styles.ownWrapperStyle}>
            <View style={selectedFriendStyles.closeImageStyle}></View>
            <Image
              source={require("../../../assets/images/friend_profile_image_1.jpg")}
              style={selectedFriendStyles.profileImageStyle}
            />
            <Text
              style={selectedFriendStyles.listItemNameStyle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {ownNickName}
            </Text>
          </View>
        )}
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => {}}
          horizontal={true} // スクロールバーを水平方向にする
          showsHorizontalScrollIndicator={false} // 水平スクロールバー非表示
          style={styles.scrollViewStyle}
        >
          {/* 選択された友達一覧 */}
          {friendList.length !== 0 && (
            <AddFriendList
              selectedFriendList={friendList}
              deleteFriendList={_deleteFriendList}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ownWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: ADD_FRIEND_WIDTH,
  },
  scrollViewStyle: {
    flex: 1,
  },
  addCircleContainerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addCircleStyle: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
  },
});
