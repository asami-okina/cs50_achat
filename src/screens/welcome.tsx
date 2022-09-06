// libs
import React from "react";
import { View, SafeAreaView } from "react-native";

// components
import { Button } from "../components/common/button";
import { HeadTitle } from "../components/common/headTitle";
import { AChatLogo } from "../components/common/aChatLogo";
import { ToSignUpOrLoginTextArea } from "../components/common/toSignUpOrLoginTextArea";
import { TopAreaWrapper } from "../components/common/topAreaWrapper";

// sameStyles
import { sameStyles } from "../constants/styles/sameStyles";

export function Welcome() {
  return (
    <SafeAreaView style={sameStyles.screenContainerStyle}>
      {/* 画面一番上にある青色の余白部分 */}
      <View style={sameStyles.topMarginViewStyle}></View>
      {/* 丸みを帯びている白いトップ部分 */}
      <TopAreaWrapper type={"welcome"}></TopAreaWrapper>
      <View style={sameStyles.mainContainerStyle}>
        {/* タイトル */}
        <HeadTitle title={"Welcome"} />
        {/* A-Chatロゴ */}
        <AChatLogo />
        <View style={sameStyles.bottomStyleByWelcomeAndSignUpAndLogin}>
          {/* 遷移ボタン */}
          <Button
            link={"SignUp"}
            buttonText={"Sign Up"}
            enable={true}
            scene={"Welcome"}
            propsList={null}
          />
          {/* サインアップまたはログインへのリンク */}
          <ToSignUpOrLoginTextArea
            description={"Do you have an account?"}
            link={"LogIn"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
