// libs
import React, { useContext, useEffect, useState } from "react";
import { View, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getFetchApiHeader } from "../constants/common";
import { authContext, setAuthContext } from "../context/authContext";

// components
import { Footer } from "../components/common/footer";
import { FriendAndGroupList } from "../components/home/friendAndgroupList";
import { FriendOrGroupSelectTab } from "../components/common/friendOrGroupSelectTab";
import { AddButton } from "../components/common/addButton";
import { ConfirmModal } from "../components/common/confirmModal";
import { TopAreaWrapper } from "../components/common/topAreaWrapper";
import { SearchForm } from "../components/common/_topAreaContainer/searchForm";
import { API_SERVER_URL } from "../constants/api";
import { storage } from "../../storage";

// style
import { sameStyles } from "../constants/styles/sameStyles";

// layouts
import { IPHONE_X_BOTTOM_SPACE } from "../constants/layout";

export function Home() {
  const auth = useContext(authContext);
  const setAuth = useContext(setAuthContext);
  const [userId, setUserId] = useState<string>(null);
  const [searchFormText, setSearchFormText] = useState<string>("");
  const [isDuringSearch, setIsDuringSearch] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [clickedCancelMordal, setClickedCancelMordal] =
    useState<boolean>(false);
  const [clickedOkMordal, setClickedOkMordal] = useState<boolean>(false);
  // [検索前]APIから取得した友達一覧リスト
  const [beforeFriendListSearch, setBeforeFriendListSearch] = useState<
    FriendListPropsType[]
  >([]);
  // [検索後]APIから取得した友達一覧リスト
  const [afterFriendListSearch, setAfterFriendListSearch] = useState<
    FriendListPropsType[]
  >([]);
  const [isOpenFriendList, setIsOpenFriendList] = useState<boolean>(true);
  const [friendCount, setFriendCount] = useState<number>(0);

  // [検索前]APIから取得したグループ一覧リスト
  const [beforeGroupListSearch, setBeforeGroupListSearch] = useState<
    GroupListPropsType[]
  >([]);
  // [検索後]APIから取得したグループ一覧リスト
  const [afterGroupListSearch, setAfterGroupListSearch] = useState<
    GroupListPropsType[]
  >([]);
  const [isOpenGroupList, setIsOpenGroupList] = useState(false);
  const [groupCount, setGroupCount] = useState<number>(0);
  const isScreenFocused: boolean = useIsFocused();

  // ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
  async function _searchName(searchFormText: string) {
    try {
      const params_search = { search_text: searchFormText };
      const query_params = new URLSearchParams(params_search);
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/home?${query_params}`,
        getFetchApiHeader
      );
      const parse_response = await response.json();
      setAfterFriendListSearch(parse_response.friends);
      setFriendCount(parse_response.friends.length);
      setAfterGroupListSearch(parse_response.groups);
      setGroupCount(parse_response.groups.length);
    } catch (e) {
      console.error(e);
    }
  }

  // ユーザが所属するグループ一覧を取得
  async function _fetchGroupList(userId: string) {
    try {
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/groups`,
        getFetchApiHeader
      );
      const parse_response = await response.json();
      setBeforeGroupListSearch(parse_response.groups);
      setGroupCount(parse_response.groups.length);
    } catch (e) {
      console.error(e);
    }
  }

  // ユーザが所属するグループ数を取得
  async function _fetchGroupCount(userId: string) {
    try {
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/group-count`,
        getFetchApiHeader
      );
      const parse_response = await response.json();
      setGroupCount(parse_response.group_count);
    } catch (e) {
      console.error(e);
    }
  }

  // 友達一覧を取得
  async function _fetchFriendList(userId: string) {
    try {
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/friends`,
        getFetchApiHeader
      );
      const parse_response = await response.json();
      setBeforeFriendListSearch(parse_response.friend_list);
      setFriendCount(parse_response.friend_list.length);
    } catch (e) {
      console.error(e);
    }
  }

  // ユーザが所属するグループ数を取得
  async function _fetchFriendCount(userId: string) {
    try {
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/friend-count`,
        getFetchApiHeader
      );
      const parse_response = await response.json();
      setFriendCount(parse_response.friend_count);
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
        setAuth(data.userId);
        setUserId(data.userId);
        _fetchGroupList(data.userId);
        _fetchFriendList(data.userId);
      });
  }, [isScreenFocused]);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={sameStyles.screenContainerStyle}
    >
      <SafeAreaView style={sameStyles.screenContainerStyle}>
        {/* Delete確認モーダル */}
        <ConfirmModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setClickedCancelMordal={setClickedCancelMordal}
          setClickedOkMordal={setClickedOkMordal}
          modalText={
            "When you leave a group, the group member list and all group talk history will be deleted. Do you want to leave the group?"
          }
        />
        {/* 画面一番上にある青色の余白部分 */}
        <View style={sameStyles.topMarginViewStyle}></View>
        {/* 丸みを帯びている白いトップ部分 */}
        <TopAreaWrapper type={"searchForm"}>
          <SearchForm
            setSearchFormText={setSearchFormText}
            searchFormText={searchFormText}
            searchName={_searchName}
            fetchGroupCount={_fetchGroupCount}
            fetchFriendCount={_fetchFriendCount}
            setIsDuringSearch={setIsDuringSearch}
            placeholder={"Search by name"}
          />
        </TopAreaWrapper>
        {/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
        <View
          style={
            IPHONE_X_BOTTOM_SPACE === 0
              ? sameStyles.withFooterMainContainerStyle
              : sameStyles.withFooterMainContainerIphoneXStyle
          }
        >
          {/* FriendとGroupの選択タブ */}
          <FriendOrGroupSelectTab
            setIsOpenFriendList={setIsOpenFriendList}
            setIsOpenGroupList={setIsOpenGroupList}
            isOpenFriendList={isOpenFriendList}
            isOpenGroupList={isOpenGroupList}
            friendCount={friendCount}
            groupCount={groupCount}
          />
          {/* 友達一覧 */}
          {/* 検索中ではない場合 */}
          {!isDuringSearch && isOpenFriendList && (
            <FriendAndGroupList
              isOpenFriendList={isOpenFriendList}
              friendList={beforeFriendListSearch}
              isOpenGroupList={null}
              groupList={null}
              type={"Friend"}
              setModalVisible={setModalVisible}
              clickedCancelMordal={clickedCancelMordal}
              setClickedCancelMordal={setClickedCancelMordal}
              clickedOkMordal={clickedOkMordal}
              setClickedOkMordal={setClickedOkMordal}
              setGroupCount={setGroupCount}
            />
          )}
          {/* 検索中の場合 */}
          {isDuringSearch && isOpenFriendList && (
            <FriendAndGroupList
              isOpenFriendList={isOpenFriendList}
              friendList={afterFriendListSearch}
              isOpenGroupList={null}
              groupList={null}
              type={"Friend"}
              setModalVisible={setModalVisible}
              clickedCancelMordal={clickedCancelMordal}
              setClickedCancelMordal={setClickedCancelMordal}
              clickedOkMordal={clickedOkMordal}
              setClickedOkMordal={setClickedOkMordal}
              setGroupCount={setGroupCount}
            />
          )}
          {/* グループ一覧 */}
          {/* 検索中ではない場合 */}
          {!isDuringSearch && isOpenGroupList && (
            <FriendAndGroupList
              isOpenFriendList={null}
              friendList={null}
              isOpenGroupList={isOpenGroupList}
              groupList={beforeGroupListSearch}
              type={"Group"}
              setModalVisible={setModalVisible}
              clickedCancelMordal={clickedCancelMordal}
              setClickedCancelMordal={setClickedCancelMordal}
              clickedOkMordal={clickedOkMordal}
              setClickedOkMordal={setClickedOkMordal}
              setGroupCount={setGroupCount}
            />
          )}
          {/* 検索中の場合 */}
          {isDuringSearch && isOpenGroupList && (
            <FriendAndGroupList
              isOpenFriendList={null}
              friendList={null}
              isOpenGroupList={isOpenGroupList}
              groupList={afterGroupListSearch}
              type={"Group"}
              setModalVisible={setModalVisible}
              clickedCancelMordal={clickedCancelMordal}
              setClickedCancelMordal={setClickedCancelMordal}
              clickedOkMordal={clickedOkMordal}
              setClickedOkMordal={setClickedOkMordal}
              setGroupCount={setGroupCount}
            />
          )}
        </View>
        {/* 友達またはグループ追加ボタン */}
        <AddButton
          isOpenFriendList={isOpenFriendList}
          isOpenGroupList={isOpenGroupList}
        />
        {/*フッター */}
        <Footer />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
