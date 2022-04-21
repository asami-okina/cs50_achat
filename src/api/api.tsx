// ユーザーの友達一覧
export const fetchFriendList = (userId) => {
	let result = [
		{
			"direct_chat_room_id": "1",
			"friend_use_id": "friend 1",
			"friend_profile_image": require("../../assets/images/friend_profile_image_1.jpg"),
			"friend_nickname": "asamiasamiasami1"
		},
		{
			"direct_chat_room_id": "2",
			"friend_use_id": "friend 2",
			"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
			"friend_nickname": "asami2"
		},
		{
			"direct_chat_room_id": "3",
			"friend_use_id": "friend 3",
			"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
			"friend_nickname": "asami3"
		},
		{
			"direct_chat_room_id": "5",
			"friend_use_id": "friend 5",
			"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
			"friend_nickname": "asami5"
		},
		{
			"direct_chat_room_id": "6",
			"friend_use_id": "friend 6",
			"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
			"friend_nickname": "asami6"
		},
		{
			"direct_chat_room_id": "7",
			"friend_use_id": "friend 7",
			"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
			"friend_nickname": "asami7"
		},
		{
			"direct_chat_room_id": "8",
			"friend_use_id": "friend 8",
			"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
			"friend_nickname": "asami8"
		},
		{
			"direct_chat_room_id": "9",
			"friend_use_id": "friend 9",
			"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
			"friend_nickname": "asami9"
		},
		{
			"direct_chat_room_id": "4",
			"friend_use_id": "friend 4",
			"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
			"friend_nickname": "asami4"
		},
		{
			"direct_chat_room_id": "10",
			"friend_use_id": "friend 10",
			"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
			"friend_nickname": "asami10"
		},
	]
	// 検索にヒットしない場合
	// let result = []
	return result
}

// ユーザの友達数
export const fetchFriendCount = (userId) => {
	let result = 4
	return result
}

// グループの脱退を行う
export const leaveGroup = (userId, groupChatRoomId) => {
	// 条件
	// ①user_idが一致
	// ②group_chat_room_idが一致

	// 更新データ
	// ①group_memberテーブルのdelete_flagをtrueに更新
}
