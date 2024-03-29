// libs
import React, { useState } from "react";
import { View, SafeAreaView, KeyboardAvoidingView } from "react-native";

// components
import { TopAreaWrapper } from "../../../components/common/topAreaWrapper";
import { MainTitle } from "../../../components/common/_topAreaContainer/mainTitle";
import { NickNameStringCount } from "../_profileInfo/_editNickName/nickNameStringCount";
import { TextInputForm } from "../_profileInfo/_editNickName/textInputForm";
import { ButtonContainer } from "../_profileInfo/_editNickName/buttonContainer";

// syyle
import { sameStyles } from "../../../constants/styles/sameStyles";

export function EditNickName() {
  const [nickName, setNickName] = useState<string>("");
  const [inputLength, setInputLength] = useState<number>(0);
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const [isNotInput, setIsNotInput] = useState<boolean>(true);

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
            title={"NickName"}
            link={"Profile"}
            props={null}
            groupChatRoomId={null}
            groupMemberUserId={null}
          />
        </TopAreaWrapper>
        {/* トップ部分を除くメイン部分*/}
        <View style={sameStyles.mainContainerStyle}>
          <NickNameStringCount inputLength={inputLength} />
          <TextInputForm
            isNotInput={isNotInput}
            setIsNotInput={setIsNotInput}
            isValidInput={isValidInput}
            setIsValidInput={setIsValidInput}
            inputLength={inputLength}
            setInputLength={setInputLength}
            nickName={nickName}
            setNickName={setNickName}
          />
          {/* 遷移ボタン */}
          {/* ニックネームが1文字以上20文字以内で有効である場合 */}
          <ButtonContainer
            nickName={nickName}
            setNickName={setNickName}
            inputLength={inputLength}
            isValidInput={isValidInput}
            isNotInput={isNotInput}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
