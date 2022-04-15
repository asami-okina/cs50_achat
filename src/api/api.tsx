// 登録するユーザーIDが使用可能かどうか(すでに存在していないか)
export const fetchIsAvailableUserId = (userId) => {
	let result = {
		"isAvailableUserId": true
	}
	return result
};

// ログイン認証
export const postLoginAuthentication = (mail, password) => {
	let result = {
		"certificationResult": true
	}
	return result
}

// ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
export const fetchNickNameOrGroupNameBySearchForm = (keyword) => {
	// 検索にヒットする場合
	let result =
		[
			{
				"friend": [
					{
						"direct_chat_room_id": "1",
						"friend_use_id": "asami111",
						"friend_profile_image": require("../../assets/images/friend_profile_image_1.jpg"),
						"friend_nickname": "検索結果name"
					}
				]
			},
			{
				"group": [
					{
						"group_chat_room_id": "12",
						"group_name": "検索結果グループ",
						"group_image": require("../../assets/images/group_image_1.jpg")
					}
				]
			}
		];
	// 検索にヒットしない場合
	// let result = [
	// 	{
	// 		"friend": []
	// 	},
	// 	{"group": []
	// 	}
	// ]
	return result
}

// ユーザが所属するグループ一覧
export const fetchGroupList = (userId) => {
	let result = [
		{
			"group_chat_room_id": "1",
			"group_name": "group 1",
			"group_image": require("../../assets/images/group_image_1.jpg")
		},
		{
			"group_chat_room_id": "2",
			"group_name": "group 2",
			"group_image": require("../../assets/images/group_image_2.jpg")
		},
		{
			"group_chat_room_id": "3",
			"group_name": "group 3",
			"group_image": require("../../assets/images/group_image_2.jpg")
		},
		{
			"group_chat_room_id": "4",
			"group_name": "group 4",
			"group_image": require("../../assets/images/group_image_2.jpg")
		},
	]
	// 検索にヒットしない場合
	// let result = []
	return result
}

// ユーザーの所属するグループ数
export const fetGroupCount = (userId) => {
	let result = 4
	return result
}

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
