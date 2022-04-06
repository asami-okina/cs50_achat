import React from 'react';
import {
  Text,View,StyleSheet, SafeAreaView, Image, TouchableOpacity
} from 'react-native';
import AppLoading from 'expo-app-loading';
import { expoGoogleFonts } from '../../assets/fonts/expoGoogleFonts'

function Welcome({navigation}) {
    // フォントがダウンロードできていなかったら、ローディング画面を出す
    if (!expoGoogleFonts) {
    return <AppLoading />;
    } else {
    // フォントがダウンロードできたら、画面を出力する 
    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.headContainerStyle}></View>
            <View style={styles.mainContainerStyle}></View>
            <View style={styles.paddingStyle}></View>
            <View style={styles.headMessageContainerStyle}>
                <Text style={styles.headMessageStyle}>Welcome</Text>
            </View>
            <View style={styles.paddingStyle}></View>
            <View style={styles.logoContainerStyle}>
                <Image style={styles.logoStyle} source={require("../../assets/images/a-chat-logo-after.png")}/>
            </View>
            <View style={styles.paddingStyle}></View>
            <View style={styles.bottomStyle}>
                <TouchableOpacity
                    style={styles.buttonContainerStyle}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.buttonTextStyle}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.toLoginStyle}>
                    <Text style={styles.toLoginTextStyle}>Do you have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                        <Text style={[styles.toLoginTextStyle, styles.toLoginTextLinkStyle]}>Login here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: "#1B1C56",
    },
    headContainerStyle: {
        width: "100%",
        height: "10%",
        backgroundColor: "#1B1C56"
    },
    headMessageContainerStyle: {
        backgroundColor: "#feffff",
        alignItems: 'center',
    },
    mainContainerStyle: {
        width: "100%",
        height: "15%",
        backgroundColor: "#feffff",
        borderTopLeftRadius: 50,
        alignItems: 'center',
    },
    headMessageStyle: {
        fontSize: 50,
        fontFamily: "AlfaSlabOne_400Regular",
        color: "#1B1C56",
    },
    paddingStyle: {
        height: "4%",
        backgroundColor: "#feffff",
        // backgroundColor: "red"
    },
    logoContainerStyle: {
        alignItems: "center",
        backgroundColor: "#feffff",
    },
    logoStyle: {
        width: 250,
        height: 250,
    },
    bottomStyle: {
        alignItems: "center",
        height: "48%",
        backgroundColor: "#feffff",
    },
    buttonContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1B1C56",
        width: 247,
        height: "15%",
        borderRadius: 10,
        fontSize: 18,
    },
    buttonTextStyle: {
        color: "#feffff",
        fontFamily: "ABeeZee_400Regular_Italic",
    },
    toLoginStyle: {
        marginTop: 10,
        height: "5%",
        flexDirection: "row"
    },
    toLoginTextStyle: {
        fontFamily: "ABeeZee_400Regular_Italic",
    },
    toLoginTextLinkStyle: {
        color: "#ED195E",
        marginLeft: 10,
    },
});

export default Welcome;