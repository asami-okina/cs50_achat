// libs
import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';


// layouts
import { ADD_FRIEND_WIDTH } from '../../../constants/layout'

// constantsSelectedFriendStyles
import { selectedFriendStyles } from '../../../constants/styles/selectedFriendStyles'

export function AddFriendListItem({
	list,
	deleteFriendList,
}) {
	return (
		<View style={styles.containerStyle} key={list.key} >
			<Pressable style={selectedFriendStyles.closeImageContainerStyle} onPress={() => {
				deleteFriendList(list.key, list.type)
			}}>
				<Image source={require('../../../../assets/images/close-icon.png')} style={selectedFriendStyles.closeImageStyle} />
			</Pressable>
			<Image source={list.friend_profile_image} style={selectedFriendStyles.profileImageStyle} />
			<Text style={selectedFriendStyles.listItemNameStyle} numberOfLines={1} ellipsizeMode="tail">{list.friend_nickname}</Text>
		</View>
	);
}

export const styles = StyleSheet.create({
	containerStyle: {
		width: ADD_FRIEND_WIDTH,
		justifyContent: "center",
		alignItems: "center",
	},
});
