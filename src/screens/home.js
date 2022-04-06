import React, { Component } from 'react';
import {
  Text,View,Button,StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity
} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, AlfaSlabOne_400Regular } from '@expo-google-fonts/alfa-slab-one';
import { ABeeZee_400Regular_Italic } from '@expo-google-fonts/abeezee';

function Home({navigation}) {
    // フォントファミリーを導入
    let [fontsLoaded] = useFonts({
        AlfaSlabOne_400Regular,
        ABeeZee_400Regular_Italic
      });
    
      // フォントがダウンロードできていなかったら、ローディング画面を出す
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
      // フォントがダウンロードできたら、画面を出力する 
        return (
            <SafeAreaView style={styles.containerStyle}>
                <Text>asami</Text>
            </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
});

export default Home;