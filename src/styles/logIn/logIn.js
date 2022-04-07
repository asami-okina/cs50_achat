import { StyleSheet } from 'react-native';

export const logInStyles = StyleSheet.create({
    errorContainerStyle: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#feffff",
        paddingBottom: 32,
    },
    errorTextStyle:{
        color: "#ED195E",
        backgroundColor: "#feffff",
        fontFamily: "ABeeZee_400Regular_Italic",
        fontWeight: "bold"
    },
    forgotPasswordWrapperStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#feffff",
        paddingBottom: 32,
    },
    forgotPasswordContainerStyle:{
        backgroundColor: "#feffff",
        alignItems: "flex-end",
        width: 300,
    },
    forgotPasswordTextStyle: {
        fontFamily: "ABeeZee_400Regular_Italic",
    }
  });