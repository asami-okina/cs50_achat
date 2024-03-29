// libs
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_SERVER_URL } from "../../constants/api";
import { postFetchApiHeader } from "../../constants/common";
import { authContext } from "../../context/authContext";

// layouts
import {
  MAIN_NAVY_COLOR,
  PROFILE_IMAGE_BORDER_RADIUS,
} from "../../constants/layout";

type ProfileImageType = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};
export function ProfileImage({ image, setImage }: ProfileImageType) {
  const auth = useContext(authContext);
  const [userId, setUserId] = useState<string>(null);

  // プロフィール画像の更新
  async function _updateProfileImage(newImageUri: string) {
    try {
      const bodyData = {
        profile_image: newImageUri,
      };
      const response = await fetch(
        API_SERVER_URL + `/api/users/${userId}/profile`,
        postFetchApiHeader(bodyData)
      );
    } catch (e) {
      console.error(e);
    }
  }

  const pickImage = async () => {
    let result: ImageInfo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      // リレンダーのタイミングまでstateが変わらないので、変更値を変数に保持して、useStateや関数に渡す
      const newImageUri = result.uri;
      setImage(newImageUri);
      // プロフィール画像更新APIを実行
      _updateProfileImage(newImageUri);
    }
  };

  useEffect(() => {
    if (auth) {
      setUserId(auth);
    }
  }, []);

  return (
    <Pressable
      onPress={() => {
        pickImage();
      }}
      style={styles.profileImageContainerStyle}
    >
      <View style={styles.addImageContainerStyle}>
        <Image
          source={require("../../../assets/images/add-circle.png")}
          style={styles.addImageStyle}
        />
      </View>
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            width: 80,
            height: 80,
            borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
          }}
        />
      ) : (
        <View style={styles.circleStyle}></View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  profileImageContainerStyle: {
    marginTop: 32,
  },
  addImageContainerStyle: {
    position: "absolute",
    left: 65,
    top: -5,
    zIndex: 1,
  },
  addImageStyle: {
    width: 40,
    height: 40,
  },
  circleStyle: {
    width: 80,
    height: 80,
    borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
    backgroundColor: MAIN_NAVY_COLOR,
  },
});
