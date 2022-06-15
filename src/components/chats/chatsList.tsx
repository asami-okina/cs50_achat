// libs
import React from 'react';
import { View, StyleSheet } from 'react-native';

// components
import ChatBasic from "./_chatsList/chatBasic"

type ChatsListType = {
	navigation: any; // ★後日修正予定
	chatRoomList: FriendListPropsType[] | GroupListPropsType[];
	setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	clickedDeleteCancelMordal: boolean;
	setClickedDeleteCancelMordal: React.Dispatch<React.SetStateAction<boolean>>;
	clickedDeleteOkMordal: boolean;
	setClickedDeleteOkMordal: React.Dispatch<React.SetStateAction<boolean>>;
	setHiddenModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	clickedHiddenCancelMordal: boolean;
	setClickedHiddenCancelMordal: React.Dispatch<React.SetStateAction<boolean>>;
	clickedHiddenOkMordal: boolean;
	setClickedHiddenOkMordal: React.Dispatch<React.SetStateAction<boolean>>;
	setGroupChatRoomId: React.Dispatch<React.SetStateAction<string>>;
	setDirectChatRoomId: React.Dispatch<React.SetStateAction<string>>;
	groupChatRoomId: string;
	directChatRoomId: string;
}

export function ChatsList({
	navigation,
	chatRoomList,
	setDeleteModalVisible,
	clickedDeleteCancelMordal,
	setClickedDeleteCancelMordal,
	clickedDeleteOkMordal,
	setClickedDeleteOkMordal,
	setHiddenModalVisible,
	clickedHiddenCancelMordal,
	setClickedHiddenCancelMordal,
	clickedHiddenOkMordal,
	setClickedHiddenOkMordal,
	setGroupChatRoomId,
	setDirectChatRoomId,
	groupChatRoomId,
	directChatRoomId
}: ChatsListType) {
	return (
		<>
			<View style={styles.listBoxStyle}>
				<ChatBasic navigation={navigation} chatRoomList={chatRoomList} setDeleteModalVisible={setDeleteModalVisible} clickedDeleteCancelMordal={clickedDeleteCancelMordal} setClickedDeleteCancelMordal={setClickedDeleteCancelMordal} clickedDeleteOkMordal={clickedDeleteOkMordal} setClickedDeleteOkMordal={setClickedDeleteOkMordal} setHiddenModalVisible={setHiddenModalVisible} clickedHiddenCancelMordal={clickedHiddenCancelMordal} setClickedHiddenCancelMordal={setClickedHiddenCancelMordal} clickedHiddenOkMordal={clickedHiddenOkMordal} setClickedHiddenOkMordal={setClickedHiddenOkMordal} setGroupChatRoomId={setGroupChatRoomId} setDirectChatRoomId={setDirectChatRoomId} groupChatRoomId={groupChatRoomId} directChatRoomId={directChatRoomId} />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	listBoxStyle: {
		justifyContent: "center",
		alignItems: "center",
	},
})
