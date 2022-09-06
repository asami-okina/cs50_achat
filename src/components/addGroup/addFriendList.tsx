// libs
import React, { useRef } from "react";
import { View, ScrollView } from "react-native";

// components
import { AddFriendListItem } from "./_addFriendList/addFriendListItem";

// style
import { selectedFriendStyles } from "../../constants/styles/selectedFriendStyles";

type AddFriendListType = {
  selectedFriendList: NewFriendListPropsType[];
  deleteFriendList: (rowKey: string, type: string) => void;
};

export function AddFriendList({
  selectedFriendList,
  deleteFriendList,
}: AddFriendListType) {
  const scrollViewRef = useRef<ScrollView | null>(null);
  return (
    <View style={selectedFriendStyles.wrapperStyle}>
      <View style={selectedFriendStyles.containerStyle}>
        {/* 横スクロールで常に右端に自動スクロール */}
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          horizontal={true} // スクロールバーを水平方向にする
          showsHorizontalScrollIndicator={false} // 水平スクロールバー非表示
        >
          {selectedFriendList.length !== 0 &&
            selectedFriendList !== undefined &&
            selectedFriendList.map((list) => {
              return (
                <AddFriendListItem
                  list={list}
                  key={list.key}
                  deleteFriendList={deleteFriendList}
                />
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}
