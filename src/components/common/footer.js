import React from 'react';
import { Text,View, Pressable, Image, StyleSheet } from 'react-native';
import { FOOTER_HEIGHT }from '../../constants/layout'

export function Footer() {
    return (
			<View style={styles.footerStyle}>
				<Pressable style={styles.footerItemStyle}>
					<Image source={require('../../../assets/images/home.png')}/>
					<Text style={styles.footerTextStyle}>Home</Text>
				</Pressable>
				<Pressable style={styles.footerItemStyle}>
					<Image source={require('../../../assets/images/message.png')}/>
					<Text style={styles.footerTextStyle}>Chats</Text>
				</Pressable>
				<Pressable style={styles.footerItemStyle}>
				<Image source={require('../../../assets/images/white_profile.png')}/>
				<Text style={styles.footerTextStyle}>Profile</Text>
				</Pressable>
		</View>
    );
}

const styles = StyleSheet.create({
	footerStyle: {
		height: FOOTER_HEIGHT,
		backgroundColor: "#1B1C56",
		flexDirection: "row"
	},
	footerItemStyle:{
		flex: 1,
		backgroundColor: "#1B1C56",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	footerTextStyle: {
		fontFamily: "ABeeZee_400Regular",
		color: "#feffff"
	}
})
