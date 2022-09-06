// libs
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { API_SERVER_URL } from "../constants/api";
import { storage } from "../../storage";
import { getFetchApiHeader } from "../constants/common";

// components
import { Footer } from "../components/common/footer";
import { TopAreaWrapper } from "../components/common/topAreaWrapper";
import { SearchForm } from "../components/common/_topAreaContainer/searchForm";
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle";
import { ExistFriend } from "../components/addFriend/existFriend";
import { NotExistFriend } from "../components/addFriend/notExistFriend";

// style
import { sameStyles } from "../constants/styles/sameStyles";

// layouts
import { IPHONE_X_BOTTOM_SPACE } from "../constants/layout";

export function AddFriend() {
  const [userId, setUserId] = useState<string>(null);
  const [searchFormText, setSearchFormText] = useState<string>("");
  const [friendInfoByUserId, setFriendInfoByUserId] =
    useState<FriendInfoType>(null);
  const [isAlreadyFriend, setIsAlreadyFriend] = useState(false);
  const [existUserId, setExistUserId] = useState(true);

  // ユーザーID検索にヒットしたユーザー情報(プロフィール画像、ニックネーム)
  async function _searchId(searchFormText: string) {
    try {
      const params = { search_user_id: searchFormText };
      const query_params = new URLSearchParams(params);
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/user?${query_params}`,
        getFetchApiHeader
      );
      const parseResponse = await response.json();
      const isAlreadyFollowRequested =
        parseResponse.result.already_follow_requested;
      const isExistUserId = parseResponse.result.exist_user_id;
      // 成功した場合
      if (!isAlreadyFollowRequested && isExistUserId) {
        setIsAlreadyFriend(false);
        setExistUserId(true);
      }
      // 既に友達になっている場合
      if (isAlreadyFollowRequested && isExistUserId) {
        setIsAlreadyFriend(true);
        setExistUserId(true);
      }
      // 該当のユーザーIDが存在しない場合
      if (!isExistUserId) {
        setIsAlreadyFriend(false);
        setExistUserId(false);
      }
      setFriendInfoByUserId(parseResponse.result);
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
      });
  }, []);

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
            title={"Friend Search"}
            link={"Home"}
            props={null}
            groupChatRoomId={null}
            groupMemberUserId={null}
          />
        </TopAreaWrapper>
        {/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
        <View
          style={
            IPHONE_X_BOTTOM_SPACE === 0
              ? sameStyles.withFooterMainContainerNoneBottomButtonStyle
              : sameStyles.withFooterMainContainerIphoneXNoneBottomButtonStyle
          }
        >
          {/* 検索フォーム */}
          <View style={styles.searchFormContainerStyle}>
            <SearchForm
              setSearchFormText={setSearchFormText}
              searchFormText={searchFormText}
              searchName={_searchId}
              fetchGroupCount={null}
              fetchFriendCount={null}
              setIsDuringSearch={null}
              placeholder={"Search by frinend's userID"}
            />
          </View>
          {/* 検索結果が存在する場合 */}
          {friendInfoByUserId && existUserId && (
            <ExistFriend
              friendInfoByUserId={friendInfoByUserId}
              isAlreadyFriend={isAlreadyFriend}
            />
          )}
          {/* 検索結果が存在しない場合 */}
          {!existUserId && <NotExistFriend />}
        </View>
        {/*フッター */}
        <Footer />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchFormContainerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
