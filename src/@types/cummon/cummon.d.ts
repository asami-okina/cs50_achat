type FriendListPropsType = {
	direct_chat_room_id: string;
	friend_use_id: string;
	friend_profile_image: string;
	friend_nickname: string;
}

type GroupListPropsType = {
	group_chat_room_id: string;
	group_name: string;
	group_image: string;
}

type NewFriendListPropsType = {
	key: string;
	direct_chat_room_id: string;
	friend_use_id: string;
	friend_profile_image: string;
	friend_nickname: string;
}

type NewGroupListPropsType = {
	key: string;
	group_chat_room_id: string;
	group_name: string;
	group_image: string;
}