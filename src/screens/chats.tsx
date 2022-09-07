// libs
import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getFetchApiHeader } from "../constants/common";
import { authContext } from "../context/authContext";

// components
import { Footer } from "../components/common/footer";
import { ConfirmModal } from "../components/common/confirmModal";
import { TopAreaWrapper } from "../components/common/topAreaWrapper";
import { SearchForm } from "../components/common/_topAreaContainer/searchForm";
import { ChatsList } from "../components/chats/chatsList";
import { API_SERVER_URL } from "../constants/api";

// style
import { sameStyles } from "../constants/styles/sameStyles";

// layouts
import { IPHONE_X_BOTTOM_SPACE } from "../constants/layout";

export function Chats() {
  const auth = useContext(authContext);
  const [userId, setUserId] = useState<string>(null);
  const [searchFormText, setSearchFormText] = useState<string>("");
  const [isDuringSearch, setIsDuringSearch] = useState<boolean>(false);
  const [deleteGroupModalVisible, setDeleteGroupModalVisible] =
    useState<boolean>(false);
  const [clickedDeleteGroupCancelMordal, setClickedDeleteGroupCancelMordal] =
    useState<boolean>(false);
  const [clickedDeleteGroupOkMordal, setClickedDeleteGroupOkMordal] =
    useState<boolean>(false);
  const [hiddenGroupModalVisible, setHiddenGroupModalVisible] =
    useState<boolean>(false);
  const [clickedHiddenGroupCancelMordal, setClickedHiddenGroupCancelMordal] =
    useState<boolean>(false);
  const [clickedHiddenGroupOkMordal, setClickedHiddenGroupOkMordal] =
    useState<boolean>(false);
  // [検索前]APIから取得したグループ一覧リスト
  const [beforeChatRoomListSearch, setBeforeChatRoomListSearch] = useState<
    ChatRoomListType[]
  >([]);
  // [検索後]APIから取得したグループ一覧リスト
  const [afterChatRoomListSearch, setAfterChatRoomListSearch] = useState<
    ChatRoomListType[]
  >([]);

  const [groupChatRoomId, setGroupChatRoomId] = useState<string>("");
  const [directChatRoomId, setDirectChatRoomId] = useState<string>("");

  const isScreenFocused: boolean = useIsFocused();

  // ニックネームまたはグループ名の検索でヒットするチャット情報取得
  async function _searchChatByNickNameOrGroupName(searchFormText: string) {
    try {
      const params_search = { searchFormText: searchFormText };
      const query_params = new URLSearchParams(params_search);
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/chatRoom?${query_params}`,
        getFetchApiHeader
      );
      const parseResponse = await response.json();
      setAfterChatRoomListSearch(parseResponse);
    } catch (e) {
      console.error(e);
    }
  }

  // ユーザーIDに紐づくチャットルーム一覧を取得
  async function _fetchChatsList(userId: string) {
    try {
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/chat-room`,
        getFetchApiHeader
      );
      const parseResponse = await response.json();
      setBeforeChatRoomListSearch(parseResponse.chat_room_list);
    } catch (e) {
      console.error(e);
    }
  }

  // 文字追加or削除ごとにヒット(名前またはグループ名)したチャット一覧を表示
  const _autoSuggestSearchChatByNickNameOrGroupName = (text: string) => {
    setSearchFormText(text);
    _searchChatByNickNameOrGroupName(searchFormText);
    if (setIsDuringSearch) {
      setIsDuringSearch(true);
    }
  };

  useEffect(() => {
    if (auth) {
      setUserId(auth);
      // navigationがリレンダーされないので、画面にフォーカスが当たった時に再実行するよう実装
      _fetchChatsList(auth);
    }
  }, [isScreenFocused]);

  useEffect(() => {
    // サジェスト機能を使うために、searchTextが変わったら、毎回APIを実行する
    if (userId) {
      _searchChatByNickNameOrGroupName(searchFormText);
    }
  }, [searchFormText]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={sameStyles.screenContainerStyle}
    >
      <SafeAreaView style={sameStyles.screenContainerStyle}>
        {/* Delete確認モーダル */}
        <ConfirmModal
          modalVisible={deleteGroupModalVisible}
          setModalVisible={setDeleteGroupModalVisible}
          setClickedCancelMordal={setClickedDeleteGroupCancelMordal}
          setClickedOkMordal={setClickedDeleteGroupOkMordal}
          modalText={"Delete chat room.Are you okay?"}
        />
        <ConfirmModal
          modalVisible={hiddenGroupModalVisible}
          setModalVisible={setHiddenGroupModalVisible}
          setClickedCancelMordal={setClickedHiddenGroupCancelMordal}
          setClickedOkMordal={setClickedHiddenGroupOkMordal}
          modalText={"Chat content will not be deleted."}
        />
        {/* 画面一番上にある青色の余白部分 */}
        <View style={sameStyles.topMarginViewStyle}></View>
        {/* 丸みを帯びている白いトップ部分 */}
        <TopAreaWrapper type={"searchForm"}>
          <SearchForm
            setSearchFormText={_autoSuggestSearchChatByNickNameOrGroupName}
            searchFormText={searchFormText}
            searchName={_searchChatByNickNameOrGroupName}
            fetchGroupCount={null}
            fetchFriendCount={null}
            setIsDuringSearch={setIsDuringSearch}
            placeholder={"Search by name"}
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
          {/* チャット一覧 */}
          {/* 検索中ではない場合 */}
          {!isDuringSearch && beforeChatRoomListSearch.length !== 0 && (
            <ChatsList
              chatRoomList={beforeChatRoomListSearch}
              setDeleteGroupModalVisible={setDeleteGroupModalVisible}
              clickedDeleteGroupCancelMordal={clickedDeleteGroupCancelMordal}
              setClickedDeleteGroupCancelMordal={
                setClickedDeleteGroupCancelMordal
              }
              clickedDeleteGroupOkMordal={clickedDeleteGroupOkMordal}
              setClickedDeleteGroupOkMordal={setClickedDeleteGroupOkMordal}
              setHiddenGroupModalVisible={setHiddenGroupModalVisible}
              clickedHiddenGroupCancelMordal={clickedHiddenGroupCancelMordal}
              setClickedHiddenGroupCancelMordal={
                setClickedHiddenGroupCancelMordal
              }
              clickedHiddenGroupOkMordal={clickedHiddenGroupOkMordal}
              setClickedHiddenGroupOkMordal={setClickedHiddenGroupOkMordal}
              setGroupChatRoomId={setGroupChatRoomId}
              setDirectChatRoomId={setDirectChatRoomId}
              groupChatRoomId={groupChatRoomId}
              directChatRoomId={directChatRoomId}
            />
          )}
          {/* 検索中の場合 */}
          {isDuringSearch && afterChatRoomListSearch.length !== 0 && (
            <ChatsList
              chatRoomList={afterChatRoomListSearch}
              setDeleteGroupModalVisible={setDeleteGroupModalVisible}
              clickedDeleteGroupCancelMordal={clickedDeleteGroupCancelMordal}
              setClickedDeleteGroupCancelMordal={
                setClickedDeleteGroupCancelMordal
              }
              clickedDeleteGroupOkMordal={clickedDeleteGroupOkMordal}
              setClickedDeleteGroupOkMordal={setClickedDeleteGroupOkMordal}
              setHiddenGroupModalVisible={setHiddenGroupModalVisible}
              clickedHiddenGroupCancelMordal={clickedHiddenGroupCancelMordal}
              setClickedHiddenGroupCancelMordal={
                setClickedHiddenGroupCancelMordal
              }
              clickedHiddenGroupOkMordal={clickedHiddenGroupOkMordal}
              setClickedHiddenGroupOkMordal={setClickedHiddenGroupOkMordal}
              setGroupChatRoomId={setGroupChatRoomId}
              setDirectChatRoomId={setDirectChatRoomId}
              groupChatRoomId={groupChatRoomId}
              directChatRoomId={directChatRoomId}
            />
          )}
        </View>
        {/*フッター */}
        <Footer />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
