interface Some<T> {
	type: "Some";
	value: T;
}

interface None {
	type: "None";
	value: null;
}

type Option<T> = Some<T> | None;

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
	type?: string;
}

type NewGroupListPropsType = {
	key: string;
	group_chat_room_id: string;
	group_name: string;
	group_image: string;
}

type MessageType = {
	_id: number;
	createdAt: number;
	text: string;
	image?: string;
	type: string;
	user: {
		_id: string;
		avatar?: string;
		name?: string;
	}

}

type FriendInfoType = {
	exist_user_id: boolean;
	friend_search_flag: boolean;
	friend_use_id: string;
	friend_profile_image: string;
	friend_nickname: string;
}

type ChatRoomListType = {
	key: string;
	direct_chat_room_id: string;
	friend_nickname: string;
	friend_profile_image: string;
	friend_user_id: string;
	last_message_content: string;
	last_message_created_at: number;
	type: string;
	unread_count: number;
} | {
	key: string;
	group_chat_room_id: string;
	group_image: string;
	group_member_user_id: string[];
	group_name: string;
	last_message_content: string;
	last_message_created_at: number;
	type: string;
	unread_count: number;
}

type addFriendList = {
	already_follow_requested?: boolean,
	exist_user_id: boolean,
	friend_nickname: string,
	friend_profile_image: string,
	friend_search_flag: boolean,
	friend_use_id: string,
}