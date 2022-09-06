// libs
import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { storage } from "../../../../storage";

// constantsSearchStyles
import { searchStyles } from "../../../constants/styles/searchStyles";

// layouts
import { ICON_SIZE } from "../../../constants/layout";

type SearchFormPropsType = {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  searchName: (searchText: string) => Promise<void>;
  fetchGroupCount: (userId: string) => Promise<void>;
  fetchFriendCount: (userId: string) => Promise<void>;
  setIsDuringSearch: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder: string;
};

// 丸みを帯びている白いトップ部分
export function SearchForm({
  setSearchText,
  searchText,
  searchName,
  fetchGroupCount,
  fetchFriendCount,
  setIsDuringSearch,
  placeholder,
}: SearchFormPropsType) {
  // 検索フォームの削除アイコン表示/非表示
  const [deleteIconDisplay, setDeleteIconDisplay] =
    useState<boolean>(false);
  const [userId, setUserId] = useState<string>(null);
  // 検索フォームのラベル化
  let textInputSearch;

  // userIdの取得
  useEffect(() => {
    storage
      .load({
        key: "key",
      })
      .then((data) => {
        setUserId(data.userId);
      });
  });
  return (
    <Pressable onPress={() => textInputSearch.focus()}>
      <View style={searchStyles.searchViewStyle}>
        <TextInput
          onChangeText={setSearchText}
          style={searchStyles.searchContentNoneLeftIconStyle}
          value={searchText}
          placeholder={placeholder}
          ref={(input) => (textInputSearch = input)}
          autoCapitalize="none"
          textContentType="username"
          onFocus={() => {
            setDeleteIconDisplay(true);
          }}
          onEndEditing={() => {
            searchName(searchText);
            // 検索中フラグをtrueにする
            if (setIsDuringSearch) {
              setIsDuringSearch(true);
            }
            // 削除アイコンの表示/非表示切り替え
            setDeleteIconDisplay(true);
          }}
        />
        {deleteIconDisplay && (
          <Pressable
            onPress={() => {
              textInputSearch.clear();
              // グループ数の再取得
              if (fetchGroupCount) {
                fetchGroupCount(userId);
              }
              // 友達数の再取得
              if (fetchFriendCount) {
                fetchFriendCount(userId);
              }

              // 検索中フラグをfalseにする
              if (setIsDuringSearch) {
                setIsDuringSearch(false);
              }
            }}
          >
            <Image
              source={require("../../../../assets/images/close_gray.png")}
              style={[
                searchStyles.searchIconStyle,
                styles.searchIconStyle,
              ]}
            />
          </Pressable>
        )}
        <Image
          source={require("../../../../assets/images/search.png")}
          style={searchStyles.searchIconStyle}
        />
      </View>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  searchIconStyle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginLeft: 0,
    marginRight: 0,
  },
});
