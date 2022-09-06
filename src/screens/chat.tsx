// libs
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
  MessageText,
  LoadEarlier,
  Day,
  Time,
  Actions,
} from "react-native-gifted-chat";
import _ from "lodash";
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import ImageModal from "react-native-image-modal";
import { useIsMounted } from "../hooks/useIsMounted";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { API_SERVER_URL } from "../constants/api";
import { storage } from "../../storage";
import { sock } from "../../websocket";
import { StackScreenProps } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { getFetchApiHeader } from "../constants/common";
import { postFetchApiHeader } from "../constants/common";

// components
import { TopAreaWrapper } from "../components/common/topAreaWrapper";
import { MainTitle } from "../components/common/_topAreaContainer/mainTitle";

// style
import { sameStyles } from "../constants/styles/sameStyles";

// layouts
import {
  MAIN_NAVY_COLOR,
  MAIN_WHITE_COLOR,
  FOOTER_HEIGHT,
  CONTENT_WIDTH,
  SEARCH_FORM_BORDER_RADIUS,
  SEND_BUTTON_HEIGHT,
  STANDARD_FONT,
  MAIN_YELLOW_COLOR,
  IPHONE_X_BOTTOM_SPACE,
} from "../constants/layout";

type ChatRoomIdType = "DirectChatRoomId" | "GroupChatRoomId";
type MainProps = StackScreenProps<RootStackParamListType, "Chat">;

export function Chat({ navigation, route }: MainProps) {
  // addedGroupMemberUserNames: 今後、○○がグループに参加しました。というメッセージに使用する
  const {
    groupChatRoomId,
    directChatRoomId,
    profileImage,
    name,
    groupMemberUserId,
    // addedGroupMemberUserNames,
  } = route.params;
  const [loadEarlier, setLoadEarlier] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>(null);
  const [messages, setMessages] = useState<MessageType[] | []>([]);
  const [image, setImage] = useState<string>("");
  const isMounted = useIsMounted();
  const [sendUserIds, setSendUserIds] = useState<string[]>(null);
  const isScreanFocused: boolean = useIsFocused();

  useEffect(() => {
    const handler = (e) => {
      let newMessage = JSON.parse(e.data);
      newMessage.created_at = moment().unix();
      if (isMounted.current) {
        // チャット画面に遷移してきた際にのみ実行
        if (newMessage["message_type"] === "SetUserId") {
          return;
        } else {
          // newMessage["message_type"] === "SendMessage"
          // メッセージを送った際に実行
          // ユーザーが開いているチャットルームに一致する場合のみメッセージを表示する
          if (directChatRoomId) {
            newMessage["chat_room_id"] = directChatRoomId;
          }

          if (groupChatRoomId) {
            newMessage["chat_room_id"] = groupChatRoomId;
          }
          const messageDirectChatRoomId =
            newMessage.chat_room_type === "DirectChatRoomId"
              ? newMessage.chat_room_id
              : null;
          const messageGroupChatRoomId =
            newMessage.chat_room_type === "GroupChatRoomId"
              ? newMessage.chat_room_id
              : null;
          if (
            (directChatRoomId !== null &&
              directChatRoomId === messageDirectChatRoomId) ||
            (groupChatRoomId !== null &&
              groupChatRoomId === messageGroupChatRoomId)
          ) {
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, newMessage)
            );
          }
        }
      }
    };
    sock.addEventListener("message", handler);
    return () => {
      sock.removeEventListener("message", handler);
    };
  }, [userId]);

  // チャットルームIDに紐づくチャット履歴の取得
  async function _fetchMessageByChatRoomId() {
    try {
      let params;
      if (directChatRoomId) {
        params = {
          chat_room_type: "DirectChatRoomId",
          chat_room_id: Number(directChatRoomId),
        };
      }
      if (groupChatRoomId) {
        params = {
          chat_room_type: "GroupChatRoomId",
          chat_room_id: Number(groupChatRoomId),
        };
      }
      const query_params = new URLSearchParams(params);
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/message?${query_params}`,
        getFetchApiHeader
      );
      const parseResponse = await response.json();
      if (parseResponse.messages.length !== 0) {
        setMessages(parseResponse.messages);
      } else {
        setMessages([]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // directChatRoomId/groupChatRoomIdに紐づくメンバーのユーザーIDを取得
  async function _fetchUserIdsByDirectOrGroupChatRoomId() {
    try {
      let params;
      if (directChatRoomId) {
        params = {
          chat_room_type: "DirectChatRoomId",
          chat_room_id: Number(directChatRoomId),
        };
      }
      if (groupChatRoomId) {
        params = {
          chat_room_type: "GroupChatRoomId",
          chat_room_id: Number(groupChatRoomId),
        };
      }
      const query_params = new URLSearchParams(params);
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/chat?${query_params}`,
        getFetchApiHeader
      );
      const parseResponse = await response.json();
      setSendUserIds(parseResponse.user_ids);
    } catch (e) {
      console.error(e);
    }
  }

  // メッセージ送信
  async function _postMessage(messages: MessageType[]) {
    try {
      let bodyData = {};
      let chat_room_type: ChatRoomIdType;
      let chat_room_id;
      if (directChatRoomId) {
        chat_room_type = "DirectChatRoomId";
        chat_room_id = Number(directChatRoomId);
      } else {
        chat_room_type = "GroupChatRoomId";
        chat_room_id = Number(groupChatRoomId);
      }

      // テキストと画像両方ある場合は、2回メッセージを送信する
      if (messages[0]["text"] && messages[0]["image"]) {
        // 1回目の送信(テキストのみ)
        bodyData = {
          chat_room_type: chat_room_type, // Rustでenumのためキャメルケース
          chat_room_id: chat_room_id,
          content: messages[0]["text"],
          content_type: "Text",
          sender_user_id: messages[0]["user_id"],
          created_at: messages[0]["createdAt"],
        };
        let response = await fetch(
          API_SERVER_URL + `/api/users/${userId}/message`,
          postFetchApiHeader(bodyData)
        );
        // 2回目の送信(画像のみ)
        bodyData = {
          chat_room_type: chat_room_type, // Rustでenumのためキャメルケース
          chat_room_id: chat_room_id,
          content: messages[0]["image"],
          content_type: "Image",
          sender_user_id: messages[0]["user_id"],
          created_at: messages[0]["createdAt"],
        };
        response = await fetch(
          API_SERVER_URL + `/api/users/${userId}/message`,
          postFetchApiHeader(bodyData)
        );
      } else {
        // テキスト、画像どちらか1つのみの場合
        bodyData = {
          chat_room_type: chat_room_type, // Rustでenumのためキャメルケース
          chat_room_id: chat_room_id,
          content: messages[0]["text"]
            ? messages[0]["text"]
            : messages[0]["image"],
          content_type: messages[0]["text"] ? "Text" : "Image",
          sender_user_id: messages[0]["user_id"],
          created_at: messages[0]["createdAt"],
        };
        const response = await fetch(
          API_SERVER_URL + `/api/users/${userId}/message`,
          postFetchApiHeader(bodyData)
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 最終既読日時の更新
  async function _updateLastReadTime() {
    try {
      let bodyData;

      if (directChatRoomId !== null) {
        bodyData = {
          chat_room_type: "DirectChatRoomId", // Rustでenumのためキャメルケース
          chat_room_id: Number(directChatRoomId),
        };
      }
      if (groupChatRoomId !== null) {
        bodyData = {
          chat_room_type: "GroupChatRoomId", // Rustでenumのためキャメルケース
          chat_room_id: Number(groupChatRoomId),
        };
      }

      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/last-read-time`,
        postFetchApiHeader(bodyData)
      );
    } catch (e) {
      console.error(e);
    }
  }

  // メッセージを送信
  const _onSendMessage = useCallback(
    (messages = [], image) => {
      // 画像しかない場合
      if (image && messages.length === 0) {
        messages = [
          {
            _id: uuid.v4(),
            createdAt: new Date().toLocaleString(),
            text: "",
            user: {
              _id: userId,
            },
          },
        ];
        messages[0]["image"] = image;
      }
      // 画像とテキスト両方ある場合
      if (image && messages.length !== 0) {
        messages[0]["image"] = image;
      }
      // messagesに要素追加
      messages[0]["message_type"] = "SendMessage";
      messages[0]["send_user_ids"] = sendUserIds; // 送るべきユーザーID
      messages[0]["user_id"] = userId; // 送った人のユーザーID

      if (directChatRoomId) {
        messages[0]["chat_room_type"] = "DirectChatRoomId";
        messages[0]["chat_room_id"] = directChatRoomId;
      }

      if (groupChatRoomId) {
        messages[0]["chat_room_type"] = "GroupChatRoomId";
        messages[0]["chat_room_id"] = groupChatRoomId;
      }

      setImage("");

      // websocketでメッセージをサーバーに送る
      sock.send(JSON.stringify(messages));
      _postMessage(messages);
    },
    [userId, sendUserIds]
  );

  // カスタム送信ボタンのスタイル変更
  const _renderSend = (props) => {
    // カスタム送信ボタン
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <Image
          source={require("../../assets/images/send-button.png")}
          style={styles.sendButtonStyle}
        />
      </Send>
    );
  };
  // 送信メッセージのスタイル変更
  const _renderBubble = (props) => {
    const ownUserId: boolean = props.currentMessage.user._id === userId;
    // console.log("props.currentMessage",props.currentMessage)
    return (
      <View>
        <View style={styles.readWrapperStyle}>
          {ownUserId && (
            <View
              style={[
                styles.readRightContainerStyle,
                styles.readRightContainerStyle,
              ]}
            >
              {/* 既読未読処理はアップデート対応 */}
              {/* <Text style={styles.readStyle}>{props.currentMessage.received ? "Read" : "Unread"}</Text> */}
              <Text style={styles.readStyle}>
                {moment(props.currentMessage.created_at * 1000).format("HH:mm")}
              </Text>
            </View>
          )}
          {ownUserId && (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: MAIN_NAVY_COLOR,
                  color: MAIN_WHITE_COLOR,
                  width: 200,
                  borderBottomRightRadius: 0,
                  minHeight: 50,
                  justifyContent: "center",
                },
              }}
            />
          )}
          {!ownUserId && (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  color: MAIN_WHITE_COLOR,
                  width: 200,
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 15,
                  minHeight: 50,
                  justifyContent: "center",
                },
              }}
            />
          )}
          {!ownUserId && (
            <View style={styles.readLeftContainerStyle}>
              {props.currentMessage.image && (
                <Pressable
                  onPress={() => {
                    _openShareDialogAsync(props.currentMessage.image);
                  }}
                >
                  <FontAwesome
                    name="download"
                    color={MAIN_NAVY_COLOR}
                    size={24}
                    margin={0}
                  />
                </Pressable>
              )}
              <Text style={styles.readStyle}>
                {moment(props.currentMessage.created_at * 1000).format("HH:mm")}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  // メッセージのスタイル変更
  const _changeMessageStyle = (props) => {
    return (
      <MessageText
        {...props}
        textStyle={{
          left: {
            fontFamily: STANDARD_FONT,
          },
          right: {
            fontFamily: STANDARD_FONT,
          },
        }}
      />
    );
  };

  // 日時部分のスタイル変更
  const _renderDay = (props) => {
    return (
      <Day
        {...props}
        textStyle={{
          fontFamily: STANDARD_FONT,
          color: MAIN_NAVY_COLOR,
        }}
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        wrapperStyle={{
          backgroundColor: MAIN_YELLOW_COLOR,
          justifyContent: "center",
          alignItems: "center",
          width: 80,
          height: 20,
          borderRadius: 5,
        }}
      />
    );
  };

  // 画面下のフッター部分
  const _messengerBarContainer = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: MAIN_NAVY_COLOR,
          alignContent: "center",
          justifyContent: "center",
          minHeight: FOOTER_HEIGHT,
        }}
        primaryStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: MAIN_WHITE_COLOR,
        }}
      />
    );
  };
  // メッセージ内に時間を表示しない
  const _renderTime = (props) => {
    return (
      <Time
        {...props}
        containerStyle={{
          left: {
            display: "none",
          },
          right: {
            display: "none",
          },
        }}
      />
    );
  };

  // 「以前のメッセージを読み込む」ボタンのスタイル変更
  const _renderLoadEarlier = (props) => {
    return (
      <LoadEarlier
        {...props}
        wrapperStyle={{
          backgroundColor: MAIN_NAVY_COLOR,
        }}
      />
    );
  };

  // フッターに画像送信ボタン追加
  const _renderActions = (props) => {
    return (
      <Actions
        {...props}
        containerStyle={{
          width: 24,
          height: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 10,
          marginBottom: 0,
        }}
        icon={() => (
          <FontAwesome
            name="image"
            color={MAIN_WHITE_COLOR}
            size={24}
            margin={0}
          />
        )}
      />
    );
  };

  const pickImage = async () => {
    let result: ImageInfo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      _onSendMessage([], result.uri);
    }
  };

  // 画像送信ボタンを押したときに送信したい処理
  const _onPressActionButton = () => {
    pickImage();
  };

  // メッセージに画像を表示
  const _renderMessageImage = (props) => {
    return (
      <View style={{}}>
        <ImageModal
          resizeMode="contain"
          style={{
            width: 200,
            height: 200,
            padding: 6,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderRadius: props.currentMessage.user._id === userId ? 0 : 15,
            // 自分が送った画像の場合は、右下のborderRadiusを15に設定
            borderBottomLeftRadius:
              props.currentMessage.user._id === userId ? 15 : 0,
            resizeMode: "cover",
          }}
          source={{ uri: props.currentMessage.image }}
        />
      </View>
    );
  };
  // 画像のシェア
  let _openShareDialogAsync = async (image) => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    const result = await FileSystem.downloadAsync(
      image,
      FileSystem.documentDirectory + "asami.jpeg"
    );
    await Sharing.shareAsync(result.uri, {
      mimeType: result.mimeType,
      UTI: "public" + result.mimeType,
    });
  };

  const [
    userIdBySelectedUserAlreadyFriend,
    setUserIdBySelectedUserAlreadyFriend,
  ] = useState<string>();
  const [selectedUserIsAlreadyFriend, setSelectedUserIsAlreadyFriend] =
    useState<boolean>(false);
  const [
    isClickedUserIconOnGroupChatScreen,
    setIsClickedUserIconOnGroupChatScreen,
  ] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);

  // 該当友達とのdirectChatRoomIdを取得
  async function fetchDirectChatRoomIdByUserId(friendUserId: string) {
    try {
      const params = { friend_user_id: friendUserId };
      const query_params = new URLSearchParams(params);
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/friend?${query_params}`,
        getFetchApiHeader
      );
      const parseResponse = await response.json();
      setSelectedUserIsAlreadyFriend(parseResponse.result.already_friend);
      setUserIdBySelectedUserAlreadyFriend(
        parseResponse.result.direct_chat_room_id
      );
      setIsClickedUserIconOnGroupChatScreen(true);
    } catch (e) {
      console.error(e);
    }
  }

  // ユーザーアイコンをクリックした場合
  const _onPressAvatar = (user) => {
    // グループチャットの場合のみ、ユーザーアイコンをクリックできるようにする
    if (groupChatRoomId !== null || groupChatRoomId != undefined) {
      setSelectedUserInfo(user);
      // クリックした人と既に友達かどうかをチェック
      const friendUserId = user._id;
      fetchDirectChatRoomIdByUserId(friendUserId);
    }
  };

  useEffect(() => {
    // チャットルームIDに紐づくチャット履歴の取得
    if (isMounted) {
      if (directChatRoomId || groupChatRoomId) {
        _fetchMessageByChatRoomId();
      }
      _updateLastReadTime();
      _fetchUserIdsByDirectOrGroupChatRoomId();
    }
  }, [isScreanFocused]);

  useEffect(() => {
    if (isClickedUserIconOnGroupChatScreen) {
      // 既に友達の場合、Talkが選べるモーダルを表示
      if (userIdBySelectedUserAlreadyFriend && selectedUserIsAlreadyFriend) {
        navigation.navigate("AlreadyFriendModal", {
          user: selectedUserInfo,
          groupChatRoomId: groupChatRoomId,
          groupImage: image,
          groupName: name,
          directChatRoomId: userIdBySelectedUserAlreadyFriend,
        });
      }
      if (!selectedUserIsAlreadyFriend) {
        navigation.navigate("NotFriendModal", {
          user: selectedUserInfo,
          groupChatRoomId: groupChatRoomId,
          groupImage: image,
          groupName: name,
          directChatRoomId: null,
        });
      }
    }
  }, [isClickedUserIconOnGroupChatScreen]);

  useEffect(() => {
    storage
      .load({
        key: "key",
      })
      .then((data) => {
        setUserId(data.userId);
        // websocketにuser_idを送信
        sock.send(
          JSON.stringify([{ user_id: data.userId, message_type: "SetUserId" }])
        );
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
        <TopAreaWrapper type={"Chats"}>
          <MainTitle
            title={null}
            link={"Chats"}
            props={{ profileImage: profileImage, name: name }}
            groupChatRoomId={groupChatRoomId}
            groupMemberUserId={groupMemberUserId}
          />
        </TopAreaWrapper>
        {/* トップ部分を除くメイン部分: iphoneXの場合は、底のマージンを考慮 */}
        <View
          style={
            IPHONE_X_BOTTOM_SPACE === 0
              ? sameStyles.mainContainerStyle
              : sameStyles.mainContainerIphoneXStyle
          }
        >
          <GiftedChat
            messages={messages}
            onSend={(messages) => {
              _onSendMessage(messages, image);
            }}
            user={{
              _id: userId,
            }}
            // 画面下のフッター部分
            renderInputToolbar={(props) => _messengerBarContainer(props)}
            // Sendボタンを常に表示するか
            alwaysShowSend={true}
            // カスタム送信ボタンのスタイル変更
            renderSend={(props) => _renderSend(props)}
            // 送信メッセージのスタイル変更
            renderBubble={(props) => _renderBubble(props)}
            // 画面下のTextInputのスタイル変更
            textInputProps={styles.textInputStyle}
            // フッターの高さ
            minInputToolbarHeight={FOOTER_HEIGHT}
            // メッセージのスタイル変更
            renderMessageText={(props) => _changeMessageStyle(props)}
            // メッセージコンテナの上部に到達すると無限スクロールアップし、onLoadEarlier関数があれば自動的に呼び出される。loadEarlierプロパティも追加する必要あり
            infiniteScroll={true}
            // infiniteScrollに必要な"load earlier messages"ボタンを有効にする
            loadEarlier={loadEarlier}
            // 以前のメッセージの読み込み時にActivityIndicator(進行状況)を表示する
            isLoadingEarlier={true}
            // 「以前のメッセージを読み込む」ボタンのカスタム
            renderLoadEarlier={(props) => _renderLoadEarlier(props)}
            // 日時部分のスタイル変更
            renderDay={(props) => _renderDay(props)}
            // メッセージ内に時間を表示しない
            renderTime={(props) => _renderTime(props)}
            // フッターに画像送信ボタン追加
            renderActions={(props) => _renderActions(props)}
            // 画像送信ボタンを押したときに送信したい処理
            onPressActionButton={() => _onPressActionButton()}
            // メッセージに画像を表示
            renderMessageImage={(props) => _renderMessageImage(props)}
            // ユーザーアイコンをクリックした場合
            onPressAvatar={(user) => _onPressAvatar(user)}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  sendButtonStyle: {
    width: SEND_BUTTON_HEIGHT,
    height: SEND_BUTTON_HEIGHT,
  },
  textInputStyle: {
    backgroundColor: MAIN_WHITE_COLOR,
    width: CONTENT_WIDTH - 44, // Sendアイコン分引く
    marginRight: 10,
    minHeight: SEND_BUTTON_HEIGHT, // sendボタンの高さ
    paddingTop: 14, // sendボタンの高さ 44 - input文字サイズ 16 / 2 = 14
    paddingBottom: 14,
    borderRadius: SEARCH_FORM_BORDER_RADIUS,
  },
  readWrapperStyle: {
    flexDirection: "row",
    width: 250,
    marginBottom: 5,
  },
  readLeftContainerStyle: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: -5,
  },
  readRightContainerStyle: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: -5,
  },
  readStyle: {
    width: 50,
    fontFamily: STANDARD_FONT,
    color: MAIN_NAVY_COLOR,
  },
  addImageStyle: {
    width: 40,
    height: 40,
  },
});
