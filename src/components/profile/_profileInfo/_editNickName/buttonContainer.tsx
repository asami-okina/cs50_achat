// libs
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { API_SERVER_URL } from "../../../../constants/api";
import { storage } from "../../../../../storage";
import { useNavigationAChat } from "../../../../hooks/useNavigationAChat";
import { post_fetch_api_header } from "../../../../constants/common";

// components
import { Button } from "../../../common/button";

// layouts
import { STANDARD_FONT, MAIN_PINK_COLOR } from "../../../../constants/layout";

type ButtonContainerType = {
  nickName: string;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
  wordCount: number;
  isValidInput: boolean;
  defaultInput: boolean;
};

export function ButtonContainer({
  nickName,
  setNickName,
  wordCount,
  isValidInput,
  defaultInput,
}: ButtonContainerType) {
  // navigation
  const navigation = useNavigationAChat();

  // ユーザーID(今後は認証から取得するようにする)
  const [userId, setUserId] = useState<string>(null);

  // ニックネームの更新
  async function _updateNickName() {
    try {
      // APIリクエスト
      const bodyData = {
        nickName: nickName,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/profile`,
        post_fetch_api_header(bodyData)
      );
    } catch (e) {
      console.error(e);
    }
  }

  // ユーザーIDの取得
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
    <View style={styles.buttonContainerStyle}>
      {isValidInput && !defaultInput && wordCount >= 1 && (
        <Button
          link={"Profile"}
          buttonText={"Save"}
          enable={true}
          scene={"ProfileSettingNickName"}
          propsList={{
            _updateNickName: _updateNickName,
            nickName: nickName,
            setNickName: setNickName,
          }}
        />
      )}
      {!isValidInput && !defaultInput && (
        <View style={styles.inValidErrorContainerStyle}>
          {!defaultInput && (
            <Text style={styles.errorText}>
              Nicknames can be entered from a single character.
            </Text>
          )}
          <Button
            link={null}
            buttonText={"Save"}
            enable={false}
            scene={"ProfileSettingNickName"}
            propsList={null}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  inValidErrorContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontFamily: STANDARD_FONT,
    color: MAIN_PINK_COLOR,
    marginBottom: 32,
  },
});
