// libs
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { API_SERVER_URL } from "../../constants/api";
import { storage } from "../../../storage";

// components
import { Footer } from "../common/footer";
import { SmallButton } from "../common/smallButton";
import { AddGroupTitle } from "../addGroup/addGroupTitle";
import { FriendList } from "../addGroup/friendList";
import { AddFriendList } from "../addGroup/addFriendList";
import { TopAreaWrapper } from "../common/topAreaWrapper";
import { SearchForm } from "../common/_topAreaContainer/searchForm";
import { get_fetch_api_header } from "../../constants/common";

// sameStyles
import { sameStyles } from "../../constants/styles/sameStyles";

// layouts
import { IPHONE_X_BOTTOM_SPACE } from "../../constants/layout";

export function AddGroupMember({ navigation, route }) {
  // 引数を取得
  const { groupChatRoomId, groupMemberUserId, image, name } = route.params;
  // ユーザーID(今後は認証から取得するようにする)
  const [userId, setUserId] = useState<string>(null);

  // 検索フォームのテキスト
  const [searchText, setSearchText] = useState<string>("");

  // [検索前]APIから取得した友達一覧リスト
  const [beforeFriendListSearch, setBeforeFriendListSearch] = useState<
    NewFriendListPropsType[]
  >([]);

  // [検索後]APIから取得した友達一覧リスト
  const [afterFriendListSearch, setAfterFriendListSearch] = useState<
    NewFriendListPropsType[]
  >([]);

  // [検索前後]選択した友達一覧リスト
  const [mergedSelectedFriendList, setMergerdSelectedFriendList] = useState<
    NewFriendListPropsType[]
  >([]);

  // [検索前]選択した友達一覧リスト
  const [beforeSelectedFriendList, setBeforeSelectedFriendList] = useState<
    NewFriendListPropsType[]
  >([]);

  // [検索後]選択した友達一覧リスト
  const [afterSelectedFriendList, setAfterSelectedFriendList] = useState<
    NewFriendListPropsType[]
  >([]);

  // 検索中かどうか
  const [isDuringSearch, setIsDuringSearch] = useState<boolean>(false);

  // ニックネームでヒットするユーザーの取得
  async function _searchName(searchText: string) {
    try {
      // paramsを生成
      const params = { search_text: searchText };
      const query_params = new URLSearchParams(params);
      // APIリクエスト
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/home?${query_params}`,
        get_fetch_api_header
      );
      // レスポンスをJSONにする
      const parse_response = await response.json();
      // 友達一覧のstateを更新
      setAfterFriendListSearch(
        parse_response.friend.map((_, i) => ({
          ..._,
          key: `${i + "after"}`,
          type: "after",
        }))
      );
    } catch (e) {
      console.error(e);
    }
  }

  // 友達一覧を取得
  async function _fetchFriendList(userId: string) {
    try {
      // APIリクエスト
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/friends`,
        get_fetch_api_header
      );
      // レスポンスをJSONにする
      const parse_response = await response.json();
      setBeforeFriendListSearch(
        parse_response.friend_list.map((_, i) => ({
          ..._,
          key: `${i + "before"}`,
          type: "before",
        }))
      );
    } catch (e) {
      console.error(e);
    }
  }

  // 選択された友達リストの追加
  const _addFriendList = (rowKey, type) => {
    if (type === "before") {
      // Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
      const beforeNewData = [...beforeSelectedFriendList];
      // findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
      const prevIndex = beforeFriendListSearch.findIndex(
        (item) => item.key === rowKey
      );
      beforeNewData.push(beforeFriendListSearch[prevIndex]);
      setBeforeSelectedFriendList(beforeNewData);

      // beforeとafterをマージする
      // beforeを展開
      const beforeData = [...beforeNewData];
      // afterを展開
      const after = [...afterSelectedFriendList];
      const newData = [...beforeData, ...after];
      setMergerdSelectedFriendList(newData);
    }
    if (type === "after") {
      // Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
      const afterNewData = [...afterSelectedFriendList];
      // findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
      const prevIndex = afterFriendListSearch.findIndex(
        (item) => item.key === rowKey
      );
      afterNewData.push(afterFriendListSearch[prevIndex]);
      setAfterSelectedFriendList(afterNewData);

      // beforeとafterをマージする
      // afterを展開
      const afterData = [...afterNewData];
      // beforeを展開
      const before = [...beforeSelectedFriendList];
      const newData = [...afterData, ...before];
      setMergerdSelectedFriendList(newData);
    }
  };

  // 選択された友達リストの削除
  const _deleteFriendList = (rowKey, type) => {
    if (type === "before") {
      // mergeリストから該当リストを削除
      // Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
      const mergedNewData = [...mergedSelectedFriendList];
      // findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
      const prev1Index = mergedSelectedFriendList.findIndex(
        (item) => item.key === rowKey
      );
      mergedNewData.splice(prev1Index, 1);
      setMergerdSelectedFriendList(mergedNewData);

      // beforeリストから該当リストを削除
      // Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
      const beforeNewData = [...beforeSelectedFriendList];
      // findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
      const prev2Index = beforeSelectedFriendList.findIndex(
        (item) => item.key === rowKey
      );
      beforeNewData.splice(prev2Index, 1);
      setBeforeSelectedFriendList(beforeNewData);
    }
    if (type === "after") {
      // mergeリストから該当リストを削除
      // Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
      const mergedNewData = [...mergedSelectedFriendList];
      // findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
      const prev1Index = mergedSelectedFriendList.findIndex(
        (item) => item.key === rowKey
      );
      mergedNewData.splice(prev1Index, 1);
      setMergerdSelectedFriendList(mergedNewData);

      // afterリストから該当リストを削除
      // Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
      const afterNewData = [...afterSelectedFriendList];
      // findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
      const prev2Index = afterSelectedFriendList.findIndex(
        (item) => item.key === rowKey
      );
      afterNewData.splice(prev2Index, 1);
      setAfterSelectedFriendList(afterNewData);
    }
  };

  // ユーザーIDの取得
  useEffect(() => {
    storage
      .load({
        key: "key",
      })
      .then((data) => {
        setUserId(data.userId);
        // 友達一覧を取得
        _fetchFriendList(data.userId);
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
        <TopAreaWrapper type={"searchForm"}>
          <SearchForm
            setSearchText={setSearchText}
            searchText={searchText}
            searchName={_searchName}
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
              ? sameStyles.withFooterMainContainerStyle
              : sameStyles.withFooterMainContainerIphoneXStyle
          }
        >
          {/* 選択された友達一覧 */}
          {mergedSelectedFriendList.length !== 0 && (
            <AddFriendList
              selectedFriendList={mergedSelectedFriendList}
              deleteFriendList={_deleteFriendList}
            />
          )}
          {/* タイトル */}
          <AddGroupTitle text={"Friend"} groupMemberCount={null} />
          {/* 友達一覧 */}
          {/* 検索中ではない場合 */}
          {!isDuringSearch && (
            <FriendList
              listData={beforeFriendListSearch}
              addFriendList={_addFriendList}
              deleteFriendList={_deleteFriendList}
              selectedFriendList={beforeSelectedFriendList}
              groupMemberUserId={groupMemberUserId}
            />
          )}
          {/* 検索中の場合 */}
          {isDuringSearch && (
            <FriendList
              listData={afterFriendListSearch}
              addFriendList={_addFriendList}
              deleteFriendList={_deleteFriendList}
              selectedFriendList={afterSelectedFriendList}
              groupMemberUserId={groupMemberUserId}
            />
          )}
        </View>
        {/* 右下のボタン(Next) */}
        <SmallButton
          text={"Add"}
          addGroupFriendList={mergedSelectedFriendList}
          addFriendList={null}
          groupSetting={null}
          type={"addGroupMember"}
          friendListNames={null}
          alreadyFriend={null}
          addGroupMemberGroupChatRoomId={groupChatRoomId}
          addGroupMemberGroupImage={image}
          addGroupMemberGroupName={name}
          backGroupName={null}
          backGroupImage={null}
        />
        {/*フッター */}
        <Footer />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
