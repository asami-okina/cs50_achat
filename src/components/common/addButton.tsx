// libs
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useNavigationAChat } from "../../hooks/useNavigationAChat"

// layouts
import { MAIN_NAVY_COLOR, MAIN_WHITE_COLOR, ADD_BUTTON_SIZE, CONTENT_WIDTH, BUTTON_BORDER_RADIUS, MAIN_BLACK_COLOR } from '../../constants/layout'

type AddButtonPropsType = {
	openFriendList: boolean;
	openGroupList: boolean;
}

export function AddButton({ openFriendList, openGroupList }: AddButtonPropsType) {
	// navigation
	const navigation = useNavigationAChat()
	return (
		<View style={styles.boxStyle}>
			<View style={styles.wrapperStyle}>
				<View style={styles.containerStyle}>
					<TouchableOpacity
						style={styles.buttonStyle}
						onPress={() => {
							if (openFriendList) {
								navigation.navigate('AddFriend')
							}
							if (openGroupList) {
								navigation.navigate('AddGroup', { "groupName": null, "groupImage": null })
							}
						}}
					>
						<Image source={require('../../../assets/images/white_plus.png')} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	boxStyle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: MAIN_WHITE_COLOR,
	},
	wrapperStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		width: CONTENT_WIDTH,
	},
	containerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
		height: ADD_BUTTON_SIZE,
		alignItems: "flex-end",
		paddingBottom: 10,
	},
	buttonStyle: {
		alignItems: "center",
		justifyContent: "center",
		width: ADD_BUTTON_SIZE - 10, // containerStyleのpaddingBottom分引く
		height: ADD_BUTTON_SIZE - 10, // containerStyleのpaddingBottom分引く
		borderRadius: BUTTON_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
		textAlign: "center",
		shadowColor: MAIN_BLACK_COLOR,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 1,
	},
});

