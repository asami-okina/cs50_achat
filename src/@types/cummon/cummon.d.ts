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

// ImagePickerの型

type ImageInfo = {
    /**
     * URI to the local image or video file (usable as the source of an `Image` element, in the case of
     * an image) and `width` and `height` specify the dimensions of the media.
     */
    uri?: string;
    /**
     * Width of the image or video.
     */
    width?: number;
    /**
     * Height of the image or video.
     */
    height?: number;
    /**
     * The type of the asset.
     */
    type?: 'image' | 'video';
    /**
     * The `exif` field is included if the `exif` option is truthy, and is an object containing the
     * image's EXIF data. The names of this object's properties are EXIF tags and the values are the
     * respective EXIF values for those tags.
     */
    exif?: Record<string, any>;
    /**
     * Included if the `base64` option is truthy, and is a Base64-encoded string of the selected
     * image's JPEG data. If you prepend this with `'data:image/jpeg;base64,'` to create a data URI,
     * you can use it as the source of an `Image` element; for example:
     * ```ts
     * <Image
     *   source={{ uri: 'data:image/jpeg;base64,' + launchCameraResult.base64 }}
     *   style={{ width: 200, height: 200 }}
     * />
     * ```
     */
    base64?: string;
    /**
     * Length of the video in milliseconds.
     */
    duration?: number;
    /**
     * Boolean flag which shows if request was cancelled. If asset data have been returned this should
     * always be `false`.
     */
    cancelled: boolean;
};
