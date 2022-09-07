// libs
import React, { useEffect, useState, useContext } from "react";
import { View, Pressable, Image, TextInput, StyleSheet } from "react-native";
import { chatsSearchFormIconEnum } from "../../../constants/enum";
import { authContext } from "../../../context/authContext";

// style
import { searchStyles } from "../../../constants/styles/searchStyles";

// layouts
import { ICON_SIZE } from "../../../constants/layout";

type SearchFormPropsType = {
  setSearchFormText: React.Dispatch<React.SetStateAction<string>>;
  searchFormText: string;
  searchName: (searchFormText: string) => Promise<void>;
  fetchGroupCount: (userId: string) => Promise<void>;
  fetchFriendCount: (userId: string) => Promise<void>;
  setIsDuringSearch: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder: string;
};

// 丸みを帯びている白いトップ部分
export function SearchForm({
  setSearchFormText,
  searchFormText,
  searchName,
  fetchGroupCount,
  fetchFriendCount,
  setIsDuringSearch,
  placeholder,
}: SearchFormPropsType) {
  const auth = useContext(authContext);
  const [searchFormIconShowOrHide, setSearchFormIconShowOrHide] =
    useState<chatsSearchFormIconEnum>();
  const [userId, setUserId] = useState<string>(null);
  // 検索フォームのラベル化
  let textInputSearch;

  useEffect(() => {
    if (auth) {
      setUserId(auth);
    }
  });
  return (
    <Pressable onPress={() => textInputSearch.focus()}>
      <View style={searchStyles.searchViewStyle}>
        <TextInput
          onChangeText={setSearchFormText}
          style={searchStyles.searchContentNoneLeftIconStyle}
          value={searchFormText}
          placeholder={placeholder}
          ref={(input) => (textInputSearch = input)}
          autoCapitalize="none"
          textContentType="username"
          onFocus={() => {
            setSearchFormIconShowOrHide(chatsSearchFormIconEnum.Show);
          }}
          onEndEditing={() => {
            searchName(searchFormText);
            if (setIsDuringSearch) {
              setIsDuringSearch(true);
            }
            setSearchFormIconShowOrHide(chatsSearchFormIconEnum.Show);
          }}
        />
        {searchFormIconShowOrHide === chatsSearchFormIconEnum.Show && (
          <Pressable
            onPress={() => {
              textInputSearch.clear();
              if (fetchGroupCount) {
                fetchGroupCount(userId);
              }
              if (fetchFriendCount) {
                fetchFriendCount(userId);
              }
              if (setIsDuringSearch) {
                setIsDuringSearch(false);
              }
            }}
          >
            <Image
              source={require("../../../../assets/images/close_gray.png")}
              style={[searchStyles.searchIconStyle, styles.searchIconStyle]}
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
