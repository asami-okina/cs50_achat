// libs
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

// components
import { ChatsListItem } from "../chats/_chatsList/chatsListItem"

export function ChatsList({ navigation, beforeChatRoomListSearch }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	return (
		<ScrollView>
			{beforeChatRoomListSearch.length !== 0 && beforeChatRoomListSearch.map((list) => (
				<View style={styles.listBoxStyle} key={list.key}>
					{/* 友達の場合 */}
					{list.friends_user_id && (
						<ChatsListItem navigation={navigation} profileImage={list.friends_profile_image} name={list.friends_nick_name} lastMessageCreationDate={list.friends_last_message_creation_date} lastMessageContent={list.friends_last_message_content} unreadCount={list.unread_count} />
					)}
					{/* グループの場合 */}
					{list.group_chat_room_id && (
						<ChatsListItem navigation={navigation} profileImage={list.group_image} name={list.group_name} lastMessageCreationDate={list.group_last_message_creation_date} lastMessageContent={list.group_last_message_content} unreadCount={list.unread_count} />
					)}
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	listBoxStyle: {
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
		height: 70,
		marginBottom: 5,
	},
})
