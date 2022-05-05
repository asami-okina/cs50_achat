import uuid from 'react-native-uuid';

export const addMessages = [
	{
		_id: 101,
		text: 'add Message',
		createdAt: "2022-04-24T12:00:10.189Z",
		user: {
			_id: "friend 1",
			name: "friend 1",
			avatar: require("../../../assets/images/friend_profile_image_1.jpg"),
		},
		sent: true,
		received: true
	},
	{
		_id: 102,
		text: 'add Message',
		createdAt: "2022-04-24T09:00:10.189Z",
		user: {
			_id: "friend 1",
			name: "friend 1",
			avatar: require("../../../assets/images/friend_profile_image_1.jpg"),
		},
		sent: true,
		received: true
	}
]
