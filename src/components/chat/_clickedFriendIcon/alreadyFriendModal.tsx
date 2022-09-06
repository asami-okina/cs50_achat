// libs
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Text,
} from "react-native";

// components
import { TopAreaWrapper } from "../../../components/common/topAreaWrapper";
import { Header } from "../_clickedFriendIcon/_alreadyFriendModal/header";
import { Button } from "../../../components/common/button";

// style
import { sameStyles } from "../../../constants/styles/sameStyles";

// layouts
import {
  MAIN_NAVY_COLOR,
  PROFILE_IMAGE_BORDER_RADIUS,
  TAB_TITLE_TEXT_SIZE,
  TAB_FONT,
} from "../../../constants/layout";

export function AlreadyFriendModal({ route, navigation }) {
  const { user, groupChatRoomId, groupImage, groupName, directChatRoomId } =
    route.params;
  const friendImage: string = user.avatar;
  const friendNickName: string = user.name;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={sameStyles.screenContainerStyle}
    >
      <SafeAreaView style={sameStyles.screenContainerStyle}>
        {/* 画面一番上にある青色の余白部分 */}
        <View style={sameStyles.topMarginViewStyle}></View>
        {/* 丸みを帯びている白いトップ部分 */}
        <TopAreaWrapper type={"alreadyFriendModal"}>
          <Header
            navigation={navigation}
            groupChatRoomId={groupChatRoomId}
            groupImage={groupImage}
            groupName={groupName}
          />
        </TopAreaWrapper>
        {/* トップ部分を除くメイン部分*/}
        <View style={sameStyles.mainContainerStyle}>
          <View style={styles.profileImageWrapperStyle}>
            {friendImage ? (
              <Image
                source={{ uri: friendImage }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
                }}
              />
            ) : (
              <View style={styles.circleStyle}></View>
            )}
            <View style={styles.friendNickNameContainerStyle}>
              <Text style={styles.friendNickNameStyle}>{friendNickName}</Text>
            </View>
            <Button
              link={null}
              buttonText={"Talk"}
              enable={true}
              scene={"alreadyFriendModal"}
              propsList={{
                directChatRoomId: directChatRoomId,
                friendImage: friendImage,
                friendNickName: friendNickName,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  profileImageWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  circleStyle: {
    width: 80,
    height: 80,
    borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
    backgroundColor: MAIN_NAVY_COLOR,
  },
  friendNickNameContainerStyle: {
    marginTop: 20,
    marginBottom: 20,
  },
  friendNickNameStyle: {
    fontSize: TAB_TITLE_TEXT_SIZE,
    fontFamily: TAB_FONT,
    color: MAIN_NAVY_COLOR,
  },
});
