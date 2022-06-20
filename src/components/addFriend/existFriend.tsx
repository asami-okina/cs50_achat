// libs
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// components
import { SmallButton } from '../common/smallButton';

// constantsSelectedFriendStyles
import { selectedFriendStyles } from '../../constants/styles/selectedFriendStyles'

// layouts
import { CONTENT_WIDTH, BIG_PROFILE_IMAGE_SIZE, STANDARD_FONT, MAIN_PINK_COLOR, PROFILE_IMAGE_BORDER_RADIUS, MAIN_NAVY_COLOR } from '../../constants/layout'

type ExistFriendType = {
	friendInfo: FriendInfoType;
	alreadyFriend: boolean;
}
export function ExistFriend({
	friendInfo,
	alreadyFriend
}: ExistFriendType) {

	return (
		<View style={styles.searchInfoWrapperStyle}>
			<View style={styles.searchInfoContainerStyle}>
				{friendInfo.friend_profile_image ? (
					<Image source={{ uri: friendInfo.friend_profile_image }} style={styles.profileImageStyle} />
				) :
					<View style={styles.circleStyle}></View>
				}
				<Text style={selectedFriendStyles.bigProfilelistItemNameStyle}>{friendInfo.friend_nickname}</Text>
			</View>
			<SmallButton text={"Add"} friendList={friendInfo} groupSetting={null} type={"addFriend"} friendListNames={null} alreadyFriend={alreadyFriend} addGroupMemberGroupChatRoomId={null} addGroupMemberGroupImage={null} addGroupMemberGroupName={null} backGroupName={null} backGroupImage={null} />
			{alreadyFriend && (
				<Text style={styles.errorTextStyle}>Already requested.</Text>
			)}
		</View>
	);
}


const styles = StyleSheet.create({
	searchInfoWrapperStyle: {
		marginTop: 32,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	searchInfoContainerStyle: {
		width: CONTENT_WIDTH,
		height: 150,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	profileImageStyle: {
		width: BIG_PROFILE_IMAGE_SIZE,
		height: BIG_PROFILE_IMAGE_SIZE,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
	},
	circleStyle: {
		width: BIG_PROFILE_IMAGE_SIZE,
		height: BIG_PROFILE_IMAGE_SIZE,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	errorTextStyle: {
		fontFamily: STANDARD_FONT,
		color: MAIN_PINK_COLOR,
		textAlign: "center",
	},
})
