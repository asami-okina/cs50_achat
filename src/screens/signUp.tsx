// libs
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
} from "react-native";

// components
import { MailForm } from "../components/signUp/mailForm";
import { PasswordForm } from "../components/signUp/passwordForm";
import { UserIdForm } from "../components/signUp/userIdForm";
import { TopAreaWrapper } from "../components/common/topAreaWrapper";
import { ToSignUpOrLoginTextArea } from "../components/common/toSignUpOrLoginTextArea";

// components
import { Button } from "../components/common/button";

// style
import { sameStyles } from "../constants/styles/sameStyles";

export function SignUp() {
  // キーボードに完了ボタンを表示
  const inputAccessoryViewID: string = "uniqueID";
  const [isCorrectMail, setIsCorrectMail] = useState<boolean>(false);
  const [isCorrectPassewordSymbol, setIsCorrectPassewordSymbol] =
    useState<boolean>(false);
  const [isCorrectPassewordStringCount, setIsCorrectPassewordStringCount] =
    useState<boolean>(false);
  const [isCorrectUserIdSymbol, setIsCorrectUserIdSymbol] =
    useState<boolean>(false);
  const [isCorrectUserIdStringCount, setIsCorrectUserIdStringCount] =
    useState<boolean>(false);
  const [isAvailableUserId, setIsAvailableUserId] = useState<boolean>(false);
  const [isAvailableMail, setIsAvailableMail] = useState<boolean>(false);
  const [emailFormText, onChangeEmailFormText] = useState<string>("");
  const [passwordFormText, onChangePasswordFormText] = useState<string>("");
  const [userIdFormText, onChangeUserIdFormText] = useState<string>("");

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={sameStyles.screenContainerStyle}
    >
      <SafeAreaView style={sameStyles.screenContainerStyle}>
        {/* 画面一番上にある青色の余白部分 */}
        <View style={sameStyles.topMarginViewStyle}></View>
        {/* 丸みを帯びている白いトップ部分 */}
        <TopAreaWrapper type={"signUp"}>
          <Text style={sameStyles.topAreaTitleStyle}>Sign Up</Text>
        </TopAreaWrapper>
        {/* トップ部分を除くメイン部分 */}
        <ScrollView style={sameStyles.mainContainerStyle}>
          {/* Email */}
          <MailForm
            inputAccessoryViewID={inputAccessoryViewID}
            isCorrectMail={isCorrectMail}
            setIsCorrectMail={setIsCorrectMail}
            emailFormText={emailFormText}
            onChangeEmailFormText={onChangeEmailFormText}
            setIsAvailableMail={setIsAvailableMail}
            isAvailableMail={isAvailableMail}
          />
          {/* Password */}
          <PasswordForm
            inputAccessoryViewID={inputAccessoryViewID}
            isCorrectPassewordSymbol={isCorrectPassewordSymbol}
            setIsCorrectPassewordSymbol={setIsCorrectPassewordSymbol}
            isCorrectPassewordStringCount={isCorrectPassewordStringCount}
            setIsCorrectPassewordStringCount={setIsCorrectPassewordStringCount}
            passwordFormText={passwordFormText}
            onChangePasswordFormText={onChangePasswordFormText}
          />
          {/* UserId */}
          <UserIdForm
            inputAccessoryViewID={inputAccessoryViewID}
            isCorrectUserIdSymbol={isCorrectUserIdSymbol}
            setIsCorrectUserIdSymbol={setIsCorrectUserIdSymbol}
            isCorrectUserIdStringCount={isCorrectUserIdStringCount}
            setIsCorrectUserIdStringCount={setIsCorrectUserIdStringCount}
            isAvailableUserId={isAvailableUserId}
            setIsAvailableUserId={setIsAvailableUserId}
            pageType={"SignUp"}
            userIdFormText={userIdFormText}
            onChangeUserIdFormText={onChangeUserIdFormText}
          />
          {/* 画面下 */}
          <View style={sameStyles.bottomStyleByWelcomeAndSignUpAndLogin}>
            {isCorrectMail &&
            isCorrectPassewordSymbol &&
            isCorrectPassewordStringCount &&
            isCorrectUserIdSymbol &&
            isCorrectUserIdStringCount &&
            isAvailableUserId ? (
              <Button
                link={"Home"}
                buttonText={"Sign Up"}
                enable={true}
                scene={"SignUp"}
                propsList={{
                  email: emailFormText,
                  password: passwordFormText,
                  userId: userIdFormText,
                }}
              />
            ) : (
              <Button
                link={"Home"}
                buttonText={"Sign Up"}
                enable={false}
                scene={"SignUp"}
                propsList={null}
              />
            )}
            {/* サインアップまたはログインへのリンク */}
            <ToSignUpOrLoginTextArea
              description={"Do you have an account?"}
              link={"LogIn"}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
