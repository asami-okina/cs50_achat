// libs
import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';


// layouts
import { PROFILE_IMAGE_SIZE, STANDARD_FONT, ADD_FRIEND_WIDTH } from '../../../constants/layout'


export function AddFriendListItem({
	list,
}) {
	return (
		<View style={styles.containerStyle} key={list.key}>
			<Image source={list.friend_profile_image} style={styles.profileImageStyle} />
			<Text style={styles.listItemNameStyle} numberOfLines={1} ellipsizeMode="tail">{list.friend_nickname}</Text>
		</View>
	);
}

export const styles = StyleSheet.create({
	containerStyle: {
		width: ADD_FRIEND_WIDTH,
		backgroundColor: "blue",
		justifyContent: "center",
		alignItems: "center",

	},
	profileImageStyle: {
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
		borderRadius: 50
	},
	listItemNameStyle: {
		fontFamily: STANDARD_FONT,
		width: ADD_FRIEND_WIDTH,
		backgroundColor: "yellow",
		textAlign: "center"
	},
});
