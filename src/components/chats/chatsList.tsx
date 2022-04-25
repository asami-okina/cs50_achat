// libs
import React from 'react';
import { View, StyleSheet } from 'react-native';

// components
import ChatBasic from "./_chatsList/chatBasic"

export function ChatsList({ chatRoomList, setDeleteModalVisible,clickedDeleteCancelMordal, setClickedDeleteCancelMordal, clickedDeleteOkMordal,setClickedDeleteOkMordal, setHiddenModalVisible,clickedHiddenCancelMordal,setClickedHiddenCancelMordal, clickedHiddenOkMordal, setClickedHiddenOkMordal,setGroupChatRoomId,setDirectChatRoomId, groupChatRoomId,directChatRoomId}) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	return (
		<>
			<View style={styles.listBoxStyle}>
				<ChatBasic chatRoomList={chatRoomList} setDeleteModalVisible={setDeleteModalVisible}clickedDeleteCancelMordal={clickedDeleteCancelMordal} setClickedDeleteCancelMordal={setClickedDeleteCancelMordal} clickedDeleteOkMordal={clickedDeleteOkMordal} setClickedDeleteOkMordal={setClickedDeleteOkMordal}  setHiddenModalVisible={setHiddenModalVisible} clickedHiddenCancelMordal={clickedHiddenCancelMordal} setClickedHiddenCancelMordal={setClickedHiddenCancelMordal} clickedHiddenOkMordal={clickedHiddenOkMordal} setClickedHiddenOkMordal={setClickedHiddenOkMordal} setGroupChatRoomId={setGroupChatRoomId} setDirectChatRoomId={setDirectChatRoomId}  groupChatRoomId={groupChatRoomId} directChatRoomId={directChatRoomId}  />
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
