// libs
import React from 'react';
import { View, StyleSheet, TouchableHighlight, Image, Text } from 'react-native';


// layouts
import { CONTENT_WIDTH, MAIN_WHITE_COLOR, PROFILE_IMAGE_SIZE, STANDARD_FONT, ICON_SIZE } from '../../../constants/layout'


export function FriendListItem({
	list,
	addFriendList,
	deleteFriendList,
	clecked,
}) {

	return (
		<TouchableHighlight
			onPress={() => {
				// clickedがtrueの場合(この時点ではtrueに変わっていないので、falseで判定)
				if (!clecked) {
					addFriendList(list.key)
				}
				// clickedがfalseの場合(この時点ではfalseに変わっていないので、trueで判定)
				if (clecked) {
					deleteFriendList(list.key)
				}

			}}
			style={styles.rowFrontStyle}
			underlayColor={'#feffff'}
		>
			<View style={styles.listBoxStyle}>
				<View style={styles.listWrapperStyle}>
					<View style={styles.listItemContainerStyle}>
						<Image source={list.friend_profile_image} style={styles.profileImageStyle} />
						<Text style={styles.listItemNameStyle}>{list.friend_nickname}</Text>
					</View>
				</View>
				<View style={styles.circleContainerStyle}>
					{clecked ? (
						<Image source={require("../../../../assets/images/checked-circle.png")} style={styles.circleStyle} />
					) :
						(
							<Image source={require("../../../../assets/images/gray-circle.png")} style={styles.circleStyle} />
						)}
				</View>
			</View>
		</TouchableHighlight>
	);
}

export const styles = StyleSheet.create({
	rowFrontStyle: {
		alignItems: 'center',
		backgroundColor: MAIN_WHITE_COLOR,
		justifyContent: 'center',
		height: 50,
	},
	profileImageStyle: {
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
		borderRadius: 50
	},
	listBoxStyle: {
		flexDirection: "row",
		width: CONTENT_WIDTH,
		justifyContent: "space-between",
		marginBottom: 10,
	},
	listWrapperStyle: {
		height: "100%",
		justifyContent: "center",
		marginBottom: 5,
	},
	listItemContainerStyle: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	listItemNameStyle: {
		fontFamily: STANDARD_FONT,
		marginLeft: 12,
	},
	circleContainerStyle: {
		justifyContent: "center",
	},
	circleStyle: {
		width: ICON_SIZE,
		height: ICON_SIZE,
	},
});
