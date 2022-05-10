const express = require('express')
const app = express()

app.use(express.json())

// websocket
const server = require("ws").Server;
const s = new server({ port: 5001 });

const messages = [{ "messages": [] }]

s.on("connection", ws => {
	// クライアントからサーバに送られてきたメッセージ
	ws.on("message", message => {
		console.log("Received: " + message);
		if (message.toString() === "opened") {
			s.clients.forEach(client => {
				// 自分がリロードした時のみメッセージ履歴を取得
				if (client === ws) {
					client.send(JSON.stringify(messages));
				}
			});
		} else {
			messages[0].messages.push({ message: message.toString() })
			// 接続しているクライアント全てに送信
			s.clients.forEach(client => {
				const message_content = [{ "message": [] }]
				message_content[0].message.push(message.toString())
				client.send(JSON.stringify(message_content));
			});
		}
	});
});



let _count = 0;
function _id() {
	return _count++;
}

let profileInfo =
{
	"userId": "asami11",
	"nickName": "あさみん",
	"profileImage": "https://pbs.twimg.com/profile_images/1257586310077796352/XWNIr3Fr_400x400.jpg",
	"searchFlag": true
}

let friends = [
	{
		"direct_chat_room_id": "friend 1",
		"friend_use_id": "friend 1",
		"friend_profile_image": null,
		"friend_nickname": "friend 1"
	},
	{
		"direct_chat_room_id": "friend 2",
		"friend_use_id": "friend 2",
		"friend_profile_image": null,
		"friend_nickname": "friend 2"
	},
	{
		"direct_chat_room_id": "friend 3",
		"friend_use_id": "friend 3",
		"friend_profile_image": null,
		"friend_nickname": "friend 3"
	},
	{
		"direct_chat_room_id": "friend 4",
		"friend_use_id": "friend 4",
		"friend_profile_image": null,
		"friend_nickname": "friend 4"
	},
	{
		"direct_chat_room_id": "friend 5",
		"friend_use_id": "friend 5",
		"friend_profile_image": null,
		"friend_nickname": "friend 5"
	},
	{
		"direct_chat_room_id": "friend 6",
		"friend_use_id": "friend 6",
		"friend_profile_image": null,
		"friend_nickname": "friend 6"
	},
	{
		"direct_chat_room_id": "friend 7",
		"friend_use_id": "friend 7",
		"friend_profile_image": null,
		"friend_nickname": "friend 7"
	},
	{
		"direct_chat_room_id": "friend 8",
		"friend_use_id": "friend 8",
		"friend_profile_image": null,
		"friend_nickname": "friend 8"
	},
	{
		"direct_chat_room_id": "friend 9",
		"friend_use_id": "friend 9",
		"friend_profile_image": null,
		"friend_nickname": "friend 9"
	},
	{
		"direct_chat_room_id": "friend 10",
		"friend_use_id": "friend 10",
		"friend_profile_image": null,
		"friend_nickname": "friend 10"
	},
]

let groups = [
	{
		"group_chat_room_id": "group 1",
		"group_name": "group 1",
		"group_image": null,
		"group_member_user_id": [
			"friend 1",
			"friend 2"
		]
	},
	{
		"group_chat_room_id": "group 2",
		"group_name": "group 2",
		"group_image": null,
		"group_member_user_id": [
			"friend 1",
			"friend 2",
			"friend 3"
		]
	},
	{
		"group_chat_room_id": "group 3",
		"group_name": "group 3",
		"group_image": null,
		"group_member_user_id": [
			"friend 1",
			"friend 4",
			"friend 5",
			"friend 6"
		]
	},
	{
		"group_chat_room_id": "group 4",
		"group_name": "group 4",
		"group_image": null,
		"group_member_user_id": [
			"friend 1",
			"friend 6",
			"friend 7",
		]
	},
	{
		"group_chat_room_id": "group 5",
		"group_name": "group 5",
		"group_image": null,
		"group_member_user_id": [
			"friend 1",
			"friend 7",
			"friend 8",
			"friend 9"
		]
	},
]

// 個別のメッセージ履歴
let temporaryMessages_friend1 = [
	{
		_id: 1,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: 2,
			name: "friend 1",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 2,
		text: 'いいよん',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: 2,
			name: "friend 1",
			avatar: null,
		},
		sent: true,
		received: true
	},
]


let temporaryMessages_friend2 = [
	{
		_id: 3,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: 3,
			name: "friend 2",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 4,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: 4,
			name: "friend 2",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_friend3 = [
	{
		_id: 5,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: 5,
			name: "friend 3",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 6,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: 6,
			name: "friend 3",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_friend4 = [
	{
		_id: 7,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: 7,
			name: "friend 4",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 8,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: 8,
			name: "friend 4",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_friend5 = [
	{
		_id: 9,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: 9,
			name: "friend 5",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 10,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: 10,
			name: "friend 5",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_friend6 = [
	{
		_id: 11,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: 11,
			name: "friend 6",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 12,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: 12,
			name: "friend 6",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_friend7 = [
	{
		_id: 13,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: 13,
			name: "friend 7",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 14,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: 14,
			name: "friend 7",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_friend8 = [
	{
		_id: 15,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: 15,
			name: "friend 8",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 16,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: 16,
			name: "friend 8",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_friend9 = [
	{
		_id: 17,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: 17,
			name: "friend 9",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 18,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: 18,
			name: "friend 9",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_friend10 = [
	{
		_id: 19,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: 19,
			name: "friend 10",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 20,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: 20,
			name: "friend 10",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_friend11 = [
]

let temporaryMessages_group1 = [
	{
		_id: 30,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: "friend 1",
			name: "friend 1",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 31,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: "friend 2",
			name: "friend 2",
			avatar: null,
		},
		sent: true,
		received: true
	},
	{
		_id: 32,
		text: 'we are not friend',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: "friend 20",
			name: "friend 20",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_group2 = [
	{
		_id: 33,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: "friend 1",
			name: "friend 1",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 34,
		text: "group 2",
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: "friend 2",
			name: "friend 2",
			avatar: null,
		},
		sent: true,
		received: true
	},
	{
		_id: 35,
		text: "group 3",
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: "friend 3",
			name: "friend 3",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_group3 = [
	{
		_id: 36,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: "friend 4",
			name: "friend 4",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 37,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: "friend 5",
			name: "friend 5",
			avatar: null,
		},
		sent: true,
		received: true
	},
	{
		_id: 38,
		text: "friend 6",
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: "friend 6",
			name: "friend 6",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_group4 = [
	{
		_id: 39,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: "friend 6",
			name: "friend 6",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 40,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: "friend 7",
			name: "friend 7",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_group5 = [
	{
		_id: 41,
		createdAt: "2022-04-27T02:10:29.189Z",
		user: {
			_id: "friend 7",
			name: "friend 7",
			avatar: null,
		},
		sent: true,
		received: true,
		image: 'https://placeimg.com/140/140/any',
	},
	{
		_id: 42,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: "friend 8",
			name: "friend 8",
			avatar: null,
		},
		sent: true,
		received: true
	},
	{
		_id: 43,
		text: 'Hello developer',
		createdAt: "2022-04-27T02:08:10.189Z",
		user: {
			_id: "friend 9",
			name: "friend 9",
			avatar: null,
		},
		sent: true,
		received: true
	},
]

let temporaryMessages_group6 = [
]

// Chats一覧に表示する、最終メッセージ一覧
function getChats() {
	return [
		{
			"direct_chat_room_id": "friend 1",
			"friends_user_id": "friend 1",
			"friends_nick_name": "friend 1",
			"friends_profile_image": null,
			"friends_last_message_content": temporaryMessages_friend1[0].text ? temporaryMessages_friend1[0].text : temporaryMessages_friend1[0].image,
			"friends_last_message_creation_date": "2022/3/20",
			"unread_count": 3
		},
		{
			"direct_chat_room_id": "friend 2",
			"friends_user_id": "friend 2",
			"friends_nick_name": "friend 2",
			"friends_profile_image": null,
			"friends_last_message_content": temporaryMessages_friend2[0].text ? temporaryMessages_friend2[0].text : temporaryMessages_friend2[0].image,
			"friends_last_message_creation_date": "2022/3/22",
			"unread_count": 2
		},
		{
			"direct_chat_room_id": "friend 3",
			"friends_user_id": "friend 3",
			"friends_nick_name": "friend 3",
			"friends_profile_image": null,
			"friends_last_message_content": temporaryMessages_friend3[0].text ? temporaryMessages_friend3[0].text : temporaryMessages_friend3[0].image,
			"friends_last_message_creation_date": "13:00",
			"unread_count": 0
		},
		{
			"group_chat_room_id": "group 1",
			"group_name": "group 1",
			"group_image": null,
			"group_last_message_content": temporaryMessages_group1[0].text ? temporaryMessages_group1[0].text : temporaryMessages_group1[0].image,
			"group_last_message_creation_date": "2022/3/19",
			"group_member_user_id": [
				"friend 1",
				"friend 2",
			],
			"unread_count": 2
		},
		{
			"group_chat_room_id": "group 2",
			"group_name": "group 2",
			"group_image": null,
			"group_last_message_content": temporaryMessages_group2[0].text ? temporaryMessages_group2[0].text : temporaryMessages_group2[0].image,
			"group_last_message_creation_date": "2022/3/21",
			"group_member_user_id": [
				"friend 1",
				"friend 2",
				"friend 3"
			],
			"unread_count": 0
		},
		{
			"group_chat_room_id": "group 3",
			"group_name": "group 3",
			"group_image": null,
			"group_last_message_content": temporaryMessages_group3[0].text ? temporaryMessages_group3[0].text : temporaryMessages_group3[0].image,
			"group_last_message_creation_date": "10:00",
			"group_member_user_id": [
				"friend 4",
				"friend 5",
				"friend 6"
			],
			"unread_count": 2
		},
		{
			"group_chat_room_id": "group 4",
			"group_name": "group 4",
			"group_image": null,
			"group_last_message_content": temporaryMessages_group4[0].text ? temporaryMessages_group4[0].text : temporaryMessages_group4[0].image,
			"group_last_message_creation_date": "11:00",
			"group_member_user_id": [
				"friend 6",
				"friend 7",
			],
			"unread_count": 2
		}
	]
}

// 会員登録
app.get('/api/signup', (req, res, ctx) => {
	const userId = req.params.userId
	return res.status(200).send(
		JSON.stringify({
			"isAvailableUserId": true,
		}),
	)
})
// ログイン認証
app.post('/api/login', (req, res, ctx) => {
	const mail = req.param("mail")
	const password = req.param("password")
	return res.status(200).send(
		JSON.stringify({
			"certificationResult": true
		})
	)
})
// ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
app.get(`/api/users/:userId/home`, (req, res, ctx) => {
	// userIdの取得
	const userId = req.param("userId")
	// search文言の取得
	const searchText = req.params.search

	const result = [
		{
			"friend": []
		},
		{
			"group": []
		}
	]
	for (let i = 0; i < friends.length; i++) {
		if (friends[i].friend_nickname && friends[i].friend_nickname.trim().indexOf(searchText.trim()) > -1) {
			result[0].friend.push(friends[i])
		}
	}
	for (let i = 0; i < groups.length; i++) {
		if (groups[i].group_name && groups[i].group_name.trim().indexOf(searchText.trim()) > -1) {
			result[1].group.push(groups[i])
		}
	}
	return res.status(200).send(
		JSON.stringify(
			result
			// [
			// 	{
			// 		"friend": [
			// 			{
			// 				"direct_chat_room_id": "1",
			// 				"friend_use_id": "asami111",
			// 				"friend_profile_image": null,
			// 				"friend_nickname": "検索結果name"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"group": [
			// 			{
			// 				"group_chat_room_id": "12",
			// 				"group_name": "検索結果グループ",
			// 				"group_image": null)
			// 			}
			// 		]
			// 	}
			// ]
		),
	)
})
// ユーザが所属するグループ一覧
app.get('/api/users/:userId/groups', (req, res, ctx) => {
	const userId = req.param("userId")
	return res.status(200).send(
		JSON.stringify(
			groups
		),
	)
})
// グループから脱退
app.delete('/api/users/:userId/groups', (req, res, ctx) => {
	const userId = req.param("userId")
	const groupChatRoomId = req.param("groupChatRoomId")
	return res.status(200).send("")
})
// グループ追加
app.post('/api/users/:userId/groups', (req, res, ctx) => {
	const groupImage = req.param("groupImage")
	const groupName = req.param("groupName")
	const groupMemberUserIds = req.param("groupMemberUserIds")
	const groupChatRoomId = _id()

	groups.push(
		{
			"group_chat_room_id": "group 6",
			"group_name": groupName,
			"group_image": groupImage,
			"group_member_user_id": groupMemberUserIds
		}
	)

	return res.status(200).send(
		JSON.stringify(
			{
				"group_chat_room_id": groupChatRoomId
			}
		),
	)
})
// ユーザーの所属するグループ数
app.get('/api/users/:userId/group-count', (req, res, ctx) => {
	const userId = req.param("userId")
	return res.status(200).send(`${groups.length}`)
})
// ユーザの友達数
app.get('/api/users/:userId/friend-count', (req, res, ctx) => {
	const userId = req.param("userId")
	return res.status(200).send(
		`${friends.length}`
	)
})
// ユーザーの友達一覧
app.get('/api/users/:userId/friends', (req, res, ctx) => {
	const userId = req.param("userId")
	return res.status(200).send(
		JSON.stringify(
			friends
		),
	)
})
// 友達追加
app.post('/api/users/:userId/friends', (req, res, ctx) => {
	const friendUserId = req.param("friendUserId")
	const ownUserId = req.param("ownUserId")
	// mock用
	friends.push(
		{
			"direct_chat_room_id": "friend 11",
			"friend_use_id": "friend 11",
			"friend_profile_image": null,
			"friend_nickname": "friend 11"
		}
	)
	return res.status(200).send(
		JSON.stringify({
			"direct_chat_room_id": "friend 11",
			"friend_use_id": "friend 11",
			"friend_profile_image": null,
			"friend_nickname": "friend 11"
		})
	)
})
// ユーザーIDに紐づくニックネーム、プロフィール画像の取得
app.get(`/api/users/:userId/profile`, (req, res, ctx) => {
	// userIdの取得
	const userId = req.param("userId")
	return res.status(200).send(
		JSON.stringify(profileInfo
		),
	)
})
// プロフィールの更新
app.post('/api/users/:userId/profile', (req, res, ctx) => {
	const nickName = req.param("nickName")
	const profileImage = req.param("profileImage")

	// 検索可能フラグの引数が存在するかどうか
	const isSetSearchFlag = req.param("isSetSearchFlag")
	const searchFlag = req.param("searchFlag")

	//　ニックネームの更新
	if (nickName) {
		profileInfo.nickName = nickName
		return res.status(200).send(
			JSON.stringify(
				{
					"nickName": nickName,
				}
			)
		)
	}
	// プロフィール画像の更新
	if (profileImage) {
		profileInfo.profileImage = profileImage
		return res.status(200).send(
			JSON.stringify(
				{
					"profileImage": profileImage,
				}
			)
		)
	}
	// 検索可能フラグの更新
	if (isSetSearchFlag) {
		profileInfo.searchFlag = searchFlag
		return res.status(200).send(
			JSON.stringify(
				{
					"searchFlag": searchFlag,
				}
			)
		)
	}
	return res.status(200).send("")
}),
	app.get('/api/users/:userId/user', (req, res, ctx) => {
		const searchUserId = req.params.searchUserId
		const userId = req.param("userId")

		// 既に友達になっている場合
		if (searchUserId === "9") {
			return res.status(400).send(
				JSON.stringify(
					{
						"already_follow_requested": true,
						"exist": true,
						"friend_use_id": "friend 9",
						"friend_profile_image": null,
						"friend_nickname": "asami9"
					}
				),

			)
		} else if (searchUserId === "bb") {
			// 該当ユーザーIDが存在しない場合
			return res.status(400).send(
				JSON.stringify(
					{
						"already_follow_requested": false,
						"exist": false,
						"friend_use_id": null,
						"friend_profile_image": null,
						"friend_nickname": null
					}
				),

			)
		} else {
			// まだ友達になっていない場合
			return res.status(200).send(
				JSON.stringify(
					{
						"already_follow_requested": false,
						"exist": true,
						"friend_use_id": "friend 11",
						"friend_profile_image": null,
						"friend_nickname": "friend 11"
					}
				),
			)
		}
	})
// チャットルーム一覧取得
app.get('/api/users/:userId/chatRoom', (req, res, ctx) => {
	const searchText = req.params.searchText
	const userId = req.param("userId")
	const result = []
	const chats = getChats()
	// ニックネームまたはグループ名の検索でヒットするチャット情報取得
	// 以下はmock甩に、仮配列から検索結果を出力
	if (searchText) {
		for (let i = 0; i < chats.length; i++) {
			if (chats[i].friends_nick_name && chats[i].friends_nick_name.indexOf(searchText) > -1) {
				result.push(chats[i])
			}
			if (chats[i].group_name && chats[i].group_name.indexOf(searchText) > -1) {
				result.push(chats[i])
			}
		}
		return res.status(200).send(
			JSON.stringify(
				result
			),
		)

	}
	// ユーザーIDに紐づくチャットルーム一覧を取得
	if (!searchText) {
		return res.status(200).send(
			JSON.stringify(
				getChats()
			),
		)
	}
})
// チャットの表示/非表示、削除API
app.post('/api/users/:userId/chatRoom', (req, res, ctx) => {
	const userId = req.param("userId")
	const directChatRoomId = req.param("directChatRoomId")
	const groupChatRoomId = req.param("groupChatRoomId")
	const type = req.param("type")
	if (type === "Hidden") {
		return res.status(200).send("")
	}
	if (type === "Delete") {
		return res.status(200).send("")
	}
})
// チャット履歴取得
app.get('/api/users/:userId/message', (req, res, ctx) => {
	const groupChatRoomId = req.param("groupChatRoomId")
	const directChatRoomId = req.param("directChatRoomId")

	// 友達とのチャットの場合
	if (directChatRoomId) {
		if (directChatRoomId === "friend 1") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend1
				),
			)
		}
		if (directChatRoomId === "friend 2") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend2
				),
			)
		}
		if (directChatRoomId === "friend 3") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend3
				),
			)
		}
		if (directChatRoomId === "friend 4") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend4
				),
			)
		}
		if (directChatRoomId === "friend 5") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend5
				),
			)
		}
		if (directChatRoomId === "friend 6") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend6
				),
			)
		}
		if (directChatRoomId === "friend 7") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend7
				),
			)
		}
		if (directChatRoomId === "friend 8") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend8
				),
			)
		}
		if (directChatRoomId === "friend 9") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend9
				),
			)
		}
		if (directChatRoomId === "friend 10") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend10
				),
			)
		}
		if (directChatRoomId === "friend 11") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_friend11
				),
			)
		}

	}
	// グループチャットの場合
	if (groupChatRoomId) {
		// 本番は、以下を使用
		// return res.status(200).send(
		// 	JSON.stringify(
		// 		temporaryMessages
		// 	),
		// )
		if (groupChatRoomId === "group 1") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_group1
				),
			)
		}
		if (groupChatRoomId === "group 2") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_group2
				),
			)
		}
		if (groupChatRoomId === "group 3") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_group3
				),
			)
		}
		if (groupChatRoomId === "group 4") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_group4
				),
			)
		}
		if (groupChatRoomId === "group 5") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_group5
				),
			)
		}
		if (groupChatRoomId === "group 6") {
			return res.status(200).send(
				JSON.stringify(
					temporaryMessages_group6
				),
			)
		}

		return res.status(404).send("not found")
	}
})
// チャット送信
app.post('/api/users/:userId/message', (req, res, ctx) => {
	const userId = req.param("userId")
	const directChatRoomId = req.param("directChatRoomId")
	const groupChatRoomId = req.param("groupChatRoomId")
	const type = req.param("type")
	const content = req.param("content")
	const created_at = req.param("created_at")
	// mockserviceworker甩に以下保持
	const all = req.param("all")

	// 配列の最初に追加
	// 本番時は、バックエンドにて詳細実装する
	if (directChatRoomId === "friend 1") {
		temporaryMessages_friend1 = [all, ...temporaryMessages_friend1]
	}
	if (directChatRoomId === "friend 2") {
		temporaryMessages_friend2 = [all, ...temporaryMessages_friend2]
	}
	if (directChatRoomId === "friend 3") {
		temporaryMessages_friend3 = [all, ...temporaryMessages_friend3]
	}
	if (directChatRoomId === "friend 4") {
		temporaryMessages_friend4 = [all, ...temporaryMessages_friend4]
	}
	if (directChatRoomId === "friend 5") {
		temporaryMessages_friend5 = [all, ...temporaryMessages_friend5]
	}
	if (directChatRoomId === "friend 6") {
		temporaryMessages_friend6 = [all, ...temporaryMessages_friend6]
	}
	if (directChatRoomId === "friend 7") {
		temporaryMessages_friend7 = [all, ...temporaryMessages_friend7]
	}
	if (directChatRoomId === "friend 8") {
		temporaryMessages_friend8 = [all, ...temporaryMessages_friend8]
	}
	if (directChatRoomId === "friend 9") {
		temporaryMessages_friend9 = [all, ...temporaryMessages_friend9]
	}
	if (directChatRoomId === "friend 10") {
		temporaryMessages_friend10 = [all, ...temporaryMessages_friend10]
	}
	if (directChatRoomId === "friend 11") {
		temporaryMessages_friend11 = [all, ...temporaryMessages_friend11]
	}
	if (groupChatRoomId === "group 1") {
		temporaryMessages_group1 = [all, ...temporaryMessages_group1]
	}
	if (groupChatRoomId === "group 2") {
		temporaryMessages_group2 = [all, ...temporaryMessages_group2]
	}
	if (groupChatRoomId === "group 3") {
		temporaryMessages_group3 = [all, ...temporaryMessages_group3]
	}
	if (groupChatRoomId === "group 4") {
		temporaryMessages_group4 = [all, ...temporaryMessages_group4]
	}
	if (groupChatRoomId === "group 5") {
		temporaryMessages_group5 = [all, ...temporaryMessages_group5]
	}
	if (groupChatRoomId === "group 6") {
		temporaryMessages_group6 = [all, ...temporaryMessages_group6]
	}
	return res.status(200).send("")
})
// 最終既読日時の更新
app.post('/api/users/:userId/lastReadTime', (req, res, ctx) => {
	const userId = req.param("userId")
	const directChatRoomId = req.param("directChatRoomId")
	const groupChatRoomId = req.param("groupChatRoomId")
	const lasReadTime = req.param("lasReadTime")
	return res.status(200).send("")
})
// グループメンバーの追加
app.post('/api/users/:userId/group-member', (req, res, ctx) => {
	const groupChatRoomId = req.param("groupChatRoomId")
	const adduserIds = req.param("adduserIds")
	let newData = []
	for (let i = 0; i < groups.length; i++) {
		if (groups[i].group_chat_room_id === groupChatRoomId) {
			// 既存のグループメンバーユーザーID配列に新規に追加したメンバーのユーザーIDを追加
			newData = groups[i].group_member_user_id.concat(adduserIds)
			groups[i].group_member_user_id = newData
		}
	}

	return res.status(200).send(
		JSON.stringify(
			{
				"adduserIds": adduserIds
			}
		),
	)
})
// 該当友達とのdirectChatRoomIdを取得
app.get('/api/users/:userId/friend', (req, res, ctx) => {
	const friendUserId = req.params.friendUserId
	const userId = req.param("userId")
	// mock甩にfriends配列から取得
	for (let i = 0; i < friends.length; i++) {
		if (friends[i].friend_use_id === friendUserId)
			return res.status(200).send(
				JSON.stringify(
					{
						"directChatRoomId": friends[i].direct_chat_room_id,
						"alreadyFriend": true
					}
				),
			)
	}
	return res.status(200).send(
		JSON.stringify(
			{
				"directChatRoomId": null,
				"alreadyFriend": false
			}
		),
	)
})

app.listen(3000, function () {
	console.log('A-Chat app listening on port 3000!');
});
