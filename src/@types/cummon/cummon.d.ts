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