// libs
import React, { useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { storage } from "../../storage";
import { StackScreenProps } from "@react-navigation/stack";
import { postFetchApiHeader } from "../constants/common";
import { authContext, setAuthContext } from "../context/authContext";

// components
import { ToSignUpOrLoginTextArea } from "../components/common/toSignUpOrLoginTextArea";
import { Button } from "../components/common/button";
import { AuthErrorText } from "../components/logIn/authErrorText";
import { ForgotPassword } from "../components/logIn/forgotPasseword";
import { MailForm } from "../components/logIn/mailForm";
import { PasswordForm } from "../components/logIn/passwordForm";
import { TopAreaWrapper } from "../components/common/topAreaWrapper";
import { API_SERVER_URL } from "../constants/api";

// style
import { sameStyles } from "../constants/styles/sameStyles";

type MainProps = StackScreenProps<RootStackParamListType, "LogIn">;

export function LogIn({ navigation }: MainProps) {
  const auth = useContext(authContext);
  const setAuth = useContext(setAuthContext);
  // キーボードに完了ボタンを表示
  const inputAccessoryViewID: string = "uniqueID";
  const [emailFormText, setEmailFormText] = useState<string>("");
  const [passwordFormText, setPasswordText] = useState<string>("");
  const [onFocusInputMailOrPasseword, setOnFocusInputMailOrPasseword] =
    useState<boolean>(false);
  const [executedLoginAuthentication, setExecutedLoginAuthentication] =
    useState<boolean>(false);

  // ログイン認証
  async function _loginAuthentication() {
    try {
      const bodyData = {
        mail: emailFormText,
        password: passwordFormText,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/login`,
        postFetchApiHeader(bodyData)
      );
      const parseResponse = await response.json();
      if (parseResponse.certification_result) {
        // ローカルストレージにユーザーIDを保存
        await storage.save({
          key: "key",
          data: {
            userId: parseResponse.user_id,
          },
        });
        navigation.navigate("Home");
      } else {
        // ログインボタンを押した場合
        setExecutedLoginAuthentication(true);
        setOnFocusInputMailOrPasseword(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={sameStyles.screenContainerStyle}
    >
      <SafeAreaView style={sameStyles.screenContainerStyle}>
        {/* 画面一番上にある青色の余白部分 */}
        <View style={sameStyles.topMarginViewStyle}></View>
        {/* 丸みを帯びている白いトップ部分 */}
        <TopAreaWrapper type={"login"}>
          <Text style={sameStyles.topAreaTitleStyle}>Log In</Text>
        </TopAreaWrapper>
        <ScrollView style={sameStyles.mainContainerStyle}>
          {/* ログイン認証エラー */}
          {executedLoginAuthentication ? (
            onFocusInputMailOrPasseword ? null : (
              <AuthErrorText />
            )
          ) : null}
          {/* Email */}
          <MailForm
            inputAccessoryViewID={inputAccessoryViewID}
            emailFormText={emailFormText}
            setEmailFormText={setEmailFormText}
            executedLoginAuthentication={executedLoginAuthentication}
            onFocusInputMailOrPasseword={onFocusInputMailOrPasseword}
            setOnFocusInputMailOrPasseword={setOnFocusInputMailOrPasseword}
          />
          {/* Password */}
          <PasswordForm
            inputAccessoryViewID={inputAccessoryViewID}
            passwordFormText={passwordFormText}
            setPasswordText={setPasswordText}
            executedLoginAuthentication={executedLoginAuthentication}
            onFocusInputMailOrPasseword={onFocusInputMailOrPasseword}
            setOnFocusInputMailOrPasseword={setOnFocusInputMailOrPasseword}
          />
          {/* パスワードを忘れた場合 */}
          {/* <ForgotPassword /> */}
          {/* 画面下 */}
          <View style={sameStyles.bottomStyleByWelcomeAndSignUpAndLogin}>
            <Button
              link={"Home"}
              buttonText={"Log In"}
              scene={"LogIn"}
              propsList={{
                emailFormText: emailFormText,
                passwordFormText: passwordFormText,
                executedLoginAuthentication: executedLoginAuthentication,
                onFocusInputMailOrPasseword: onFocusInputMailOrPasseword,
                onPressFunction: _loginAuthentication,
              }}
              enable={false}
            />
            {/* サインアップまたはログインへのリンク */}
            <ToSignUpOrLoginTextArea
              description={`Don't you have an account?`}
              link={"SignUp"}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
