import uuid from 'react-native-uuid';

export const addMessages:MessageType[] = [
	{
		_id: 101,
		text: 'add Message',
		createdAt: 1655193411,
		type: "FetchMessageByChatRoomIdTextResult",
		user: {
			_id: "spAsami",
			name: "spAsami",
			avatar: "https://pbs.twimg.com/profile_images/1522452340611358720/8AqTz3iz_400x400.jpg",
		}
		// sent: true,
		// received: false
	},
	{
		_id: 102,
		text: 'add Message',
		createdAt: 1655193411,
		type: "FetchMessageByChatRoomIdTextResult",
		user: {
			_id: "pcAsami",
			name: "pcAsami",
			avatar: "https://pbs.twimg.com/profile_images/1257586310077796352/XWNIr3Fr_400x400.jpg",
		},
		// sent: true,
		// received: false
	}
]
