// libs
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { API_SERVER_URL } from "../../../../constants/api";
import { postFetchApiHeader } from "../../../../constants/common";
import { authContext } from "../../../../context/authContext";

// components
import { Button } from "../../../common/button";

// layouts
import { STANDARD_FONT, MAIN_PINK_COLOR } from "../../../../constants/layout";

type ButtonContainerType = {
  nickName: string;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
  inputLength: number;
  isValidInput: boolean;
  isNotInput: boolean;
};

export function ButtonContainer({
  nickName,
  setNickName,
  inputLength,
  isValidInput,
  isNotInput,
}: ButtonContainerType) {
  const auth = useContext(authContext);
  const [userId, setUserId] = useState<string>(null);

  // ニックネームの更新
  async function _updateNickName() {
    try {
      const bodyData = {
        nickName: nickName,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/profile`,
        postFetchApiHeader(bodyData)
      );
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (auth) {
      setUserId(auth);
    }
  }, []);

  return (
    <View style={styles.buttonContainerStyle}>
      {isValidInput && !isNotInput && inputLength >= 1 && (
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
      {!isValidInput && !isNotInput && (
        <View style={styles.inValidErrorContainerStyle}>
          {!isNotInput && (
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
