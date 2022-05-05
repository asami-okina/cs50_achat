// すべてのリクエストハンドラを格納するモジュール
import { rest } from 'msw'
import uuid from 'react-native-uuid';

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
		"friend_profile_image": require("../../assets/images/friend_profile_image_1.jpg"),
		"friend_nickname": "friend 1"
	},
	{
		"direct_chat_room_id": "friend 2",
		"friend_use_id": "friend 2",
		"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
		"friend_nickname": "friend 2"
	},
	{
		"direct_chat_room_id": "friend 3",
		"friend_use_id": "friend 3",
		"friend_profile_image": require("../../assets/images/friend_profile_image_3.jpg"),
		"friend_nickname": "friend 3"
	},
	{
		"direct_chat_room_id": "friend 4",
		"friend_use_id": "friend 4",
		"friend_profile_image": require("../../assets/images/friend_profile_image_4.jpg"),
		"friend_nickname": "friend 4"
	},
	{
		"direct_chat_room_id": "friend 5",
		"friend_use_id": "friend 5",
		"friend_profile_image": require("../../assets/images/friend_profile_image_5.jpg"),
		"friend_nickname": "friend 5"
	},
	{
		"direct_chat_room_id": "friend 6",
		"friend_use_id": "friend 6",
		"friend_profile_image": require("../../assets/images/friend_profile_image_6.jpg"),
		"friend_nickname": "friend 6"
	},
	{
		"direct_chat_room_id": "friend 7",
		"friend_use_id": "friend 7",
		"friend_profile_image": require("../../assets/images/friend_profile_image_7.jpg"),
		"friend_nickname": "friend 7"
	},
	{
		"direct_chat_room_id": "friend 8",
		"friend_use_id": "friend 8",
		"friend_profile_image": require("../../assets/images/friend_profile_image_8.jpg"),
		"friend_nickname": "friend 8"
	},
	{
		"direct_chat_room_id": "friend 9",
		"friend_use_id": "friend 9",
		"friend_profile_image": require("../../assets/images/friend_profile_image_9.jpg"),
		"friend_nickname": "friend 9"
	},
	{
		"direct_chat_room_id": "friend 10",
		"friend_use_id": "friend 10",
		"friend_profile_image": require("../../assets/images/friend_profile_image_10.jpg"),
		"friend_nickname": "friend 10"
	},
]

let groups = [
	{
		"group_chat_room_id": "group 1",
		"group_name": "group 1",
		"group_image": require("../../assets/images/group_image_1.jpg"),
		"group_member_user_id": [
			"friend 1",
			"friend 2"
		]
	},
	{
		"group_chat_room_id": "group 2",
		"group_name": "group 2",
		"group_image": require("../../assets/images/group_image_2.jpg"),
		"group_member_user_id": [
			"friend 1",
			"friend 2",
			"friend 3"
		]
	},
	{
		"group_chat_room_id": "group 3",
		"group_name": "group 3",
		"group_image": require("../../assets/images/group_image_3.jpg"),
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
		"group_image": require("../../assets/images/group_image_4.jpg"),
		"group_member_user_id": [
			"friend 1",
			"friend 6",
			"friend 7",
		]
	},
	{
		"group_chat_room_id": "group 5",
		"group_name": "group 5",
		"group_image": require("../../assets/images/group_image_5.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_1.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_1.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_2.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_2.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_3.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_3.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_4.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_4.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_5.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_5.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_6.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_6.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_7.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_7.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_8.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_8.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_9.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_9.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_10.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_10.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_1.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_2.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_20.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_1.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_2.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_3.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_4.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_5.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_6.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_6.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_7.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_7.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_8.jpg"),
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
			avatar: require("../../assets/images/friend_profile_image_9.jpg"),
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
			"friends_profile_image": require("../../assets/images/friend_profile_image_1.jpg"),
			"friends_last_message_content": temporaryMessages_friend1[0].text ? temporaryMessages_friend1[0].text : temporaryMessages_friend1[0].image,
			"friends_last_message_creation_date": "2022/3/20",
			"unread_count": 3
		},
		{
			"direct_chat_room_id": "friend 2",
			"friends_user_id": "friend 2",
			"friends_nick_name": "friend 2",
			"friends_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
			"friends_last_message_content": temporaryMessages_friend2[0].text ? temporaryMessages_friend2[0].text : temporaryMessages_friend2[0].image,
			"friends_last_message_creation_date": "2022/3/22",
			"unread_count": 2
		},
		{
			"direct_chat_room_id": "friend 3",
			"friends_user_id": "friend 3",
			"friends_nick_name": "friend 3",
			"friends_profile_image": require("../../assets/images/friend_profile_image_3.jpg"),
			"friends_last_message_content": temporaryMessages_friend3[0].text ? temporaryMessages_friend3[0].text : temporaryMessages_friend3[0].image,
			"friends_last_message_creation_date": "13:00",
			"unread_count": 0
		},
		{
			"group_chat_room_id": "group 1",
			"group_name": "group 1",
			"group_image": require("../../assets/images/group_image_1.jpg"),
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
			"group_image": require("../../assets/images/group_image_2.jpg"),
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
			"group_image": require("../../assets/images/group_image_3.jpg"),
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
			"group_image": require("../../assets/images/group_image_4.jpg"),
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

export const handlers = [
	// req: 一致したリクエストに関する情報
	// res: モックレスポンスを作成するための機能ユーティリティ
	// ctx: 模擬応答のステータスコード、ヘッダ、ボディなどを設定するための関数群
	// rest.post('https://a-chat/api/login', (req, res, ctx) => {
	//   // Pユーザーの認証をセッションに永続させる
	//   sessionStorage.setItem('is-authenticated', 'true')
	//   return res(
	//     // 200のステータスコードで応答する
	//     ctx.status(200),
	//   )
	// }),
	// rest.get('https://a-chat/api/user', (req, res, ctx) => {
	//   // このセッションでユーザーが認証されているかどうかを確認する
	//   const isAuthenticated = sessionStorage.getItem('is-authenticated')
	//   if (!isAuthenticated) {
	//     // 認証されていない場合、403エラーで応答する
	//     return res(
	//       ctx.status(403),
	//       ctx.json({
	//         errorMessage: 'Not authorized',
	//       }),
	//     )
	//   }
	//   // 認証された場合、模擬ユーザの詳細を返します。
	//   return res(
	//     ctx.status(200),
	//     ctx.json({
	//       username: 'admin',
	//     }),
	//   )
	// }),
	// 会員登録
	rest.get('https://a-chat/api/signup', (req, res, ctx) => {
		const parsedUrl = new URL(req.url)
		const userId = parsedUrl.searchParams.get("userId")
		return res(
			ctx.status(200),
			ctx.json({
				"isAvailableUserId": true,
			}),
		)
	}),
	// ログイン認証
	rest.post('https://a-chat/api/login', (req, res, ctx) => {
		const { mail } = req.body
		const { password } = req.body
		return res(
			// 200のステータスコードで応答する
			ctx.status(200),
			ctx.json({
				"certificationResult": true
			})
		)
	}),
	// ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
	rest.get(`https://a-chat/api/users/:userId/home`, (req, res, ctx) => {
		// userIdの取得
		const { userId } = req.params
		// search文言の取得
		const parsedUrl = new URL(req.url)
		const searchText = parsedUrl.searchParams.get("search")

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
		return res(
			ctx.status(200),
			ctx.json(
				result
				// [
				// 	{
				// 		"friend": [
				// 			{
				// 				"direct_chat_room_id": "1",
				// 				"friend_use_id": "asami111",
				// 				"friend_profile_image": require("../../assets/images/friend_profile_image_1.jpg"),
				// 				"friend_nickname": "検索結果name"
				// 			}
				// 		]
				// 	},
				// 	{
				// 		"group": [
				// 			{
				// 				"group_chat_room_id": "12",
				// 				"group_name": "検索結果グループ",
				// 				"group_image": require("../../assets/images/group_image_1.jpg")
				// 			}
				// 		]
				// 	}
				// ]
			),
		)
	}),
	// ユーザが所属するグループ一覧
	rest.get('https://a-chat/api/users/:userId/groups', (req, res, ctx) => {
		const { userId } = req.params
		return res(
			ctx.status(200),
			ctx.json(
				groups
			),
		)
	}),
	// グループから脱退
	rest.delete('https://a-chat/api/users/:userId/groups', (req, res, ctx) => {
		const { userId } = req.params
		const { groupChatRoomId } = req.body
		return res(
			// 200のステータスコードで応答する
			ctx.status(200)
		)
	}),
	// グループ追加
	rest.post('https://a-chat/api/users/:userId/groups', (req, res, ctx) => {
		const { groupImage } = req.body
		const { groupName } = req.body
		const { groupMemberUserIds } = req.body
		const groupChatRoomId = uuid.v4()

		groups.push(
			{
				"group_chat_room_id": "group 6",
				"group_name": groupName,
				"group_image": groupImage,
				"group_member_user_id": groupMemberUserIds
			}
		)

		return res(
			// 200のステータスコードで応答する
			ctx.status(200),
			ctx.json(
				{
					"group_chat_room_id": groupChatRoomId
				}
			),
		)
	}),
	// ユーザーの所属するグループ数
	rest.get('https://a-chat/api/users/:userId/group-count', (req, res, ctx) => {
		const { userId } = req.params
		return res(
			ctx.status(200),
			ctx.text(groups.length),
		)
	}),
	// ユーザの友達数
	rest.get('https://a-chat/api/users/:userId/friend-count', (req, res, ctx) => {
		const { userId } = req.params
		return res(
			ctx.status(200),
			ctx.text(friends.length),
		)
	}),
	// ユーザーの友達一覧
	rest.get('https://a-chat/api/users/:userId/friends', (req, res, ctx) => {
		const { userId } = req.params
		return res(
			ctx.status(200),
			ctx.json(
				friends
			),
		)
	}),
	// 友達追加
	rest.post('https://a-chat/api/users/:userId/friends', (req, res, ctx) => {
		const { friendUserId } = req.body
		const { ownUserId } = req.body
		// mock用
		friends.push(
			{
				"direct_chat_room_id": "friend 11",
				"friend_use_id": "friend 11",
				"friend_profile_image": require("../../assets/images/friend_profile_image_11.jpg"),
				"friend_nickname": "friend 11"
			}
		)
		return res(
			// 200のステータスコードで応答する
			ctx.status(200),
			ctx.json({
				"direct_chat_room_id": "friend 11",
				"friend_use_id": "friend 11",
				"friend_profile_image": require("../../assets/images/friend_profile_image_11.jpg"),
				"friend_nickname": "friend 11"
			})
		)
	}),
	// ユーザーIDに紐づくニックネーム、プロフィール画像の取得
	rest.get(`https://a-chat/api/users/:userId/profile`, (req, res, ctx) => {
		// userIdの取得
		const { userId } = req.params
		return res(
			ctx.status(200),
			ctx.json(profileInfo
			),
		)
	}),
	// プロフィールの更新
	rest.post('https://a-chat/api/users/:userId/profile', (req, res, ctx) => {
		const { nickName } = req.body
		const { profileImage } = req.body

		// 検索可能フラグの引数が存在するかどうか
		const { isSetSearchFlag } = req.body
		const { searchFlag } = req.body

		//　ニックネームの更新
		if (nickName) {
			profileInfo.nickName = nickName
			return res(
				// 200のステータスコードで応答する
				ctx.status(200),
				ctx.json(
					{
						"nickName": nickName,
					}
				)
			)
		}
		// プロフィール画像の更新
		if (profileImage) {
			profileInfo.profileImage = profileImage
			return res(
				// 200のステータスコードで応答する
				ctx.status(200),
				ctx.json(
					{
						"profileImage": profileImage,
					}
				)
			)
		}
		// 検索可能フラグの更新
		if (isSetSearchFlag) {
			profileInfo.searchFlag = searchFlag
			return res(
				// 200のステータスコードで応答する
				ctx.status(200),
				ctx.json(
					{
						"searchFlag": searchFlag,
					}
				)
			)
		}
		return res(
			// 200のステータスコードで応答する
			ctx.status(200)
		)
	}),
	rest.get('https://a-chat/api/users/:userId/user', (req, res, ctx) => {
		const parsedUrl = new URL(req.url)
		const searchUserId = parsedUrl.searchParams.get("searchUserId")
		const { userId } = req.params

		// 既に友達になっている場合
		if (searchUserId === "9") {
			return res(
				ctx.status(400),
				ctx.json(
					{
						"already_follow_requested": true,
						"exist": true,
						"friend_use_id": "friend 9",
						"friend_profile_image": require("../../assets/images/friend_profile_image_9.jpg"),
						"friend_nickname": "asami9"
					}
				),

			)
		} else if (searchUserId === "bb") {
			// 該当ユーザーIDが存在しない場合
			return res(
				ctx.status(400),
				ctx.json(
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
			return res(
				ctx.status(200),
				ctx.json(
					{
						"already_follow_requested": false,
						"exist": true,
						"friend_use_id": "friend 11",
						"friend_profile_image": require("../../assets/images/friend_profile_image_11.jpg"),
						"friend_nickname": "friend 11"
					}
				),
			)
		}
	}),
	// チャットルーム一覧取得
	rest.get('https://a-chat/api/users/:userId/chatRoom', (req, res, ctx) => {
		const parsedUrl = new URL(req.url)
		const searchText = parsedUrl.searchParams.get("searchText")
		const { userId } = req.params
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
			return res(
				ctx.status(200),
				ctx.json(
					result
				),
			)

		}
		// ユーザーIDに紐づくチャットルーム一覧を取得
		if (!searchText) {
			return res(
				ctx.status(200),
				ctx.json(
					getChats()
				),
			)
		}
	}),
	// チャットの表示/非表示、削除API
	rest.post('https://a-chat/api/users/:userId/chatRoom', (req, res, ctx) => {
		const { userId } = req.body
		const { directChatRoomId } = req.body
		const { groupChatRoomId } = req.body
		const { type } = req.body
		if (type === "Hidden") {
			return res(
				// 200のステータスコードで応答する
				ctx.status(200)
			)
		}
		if (type === "Delete") {
			return res(
				// 200のステータスコードで応答する
				ctx.status(200)
			)
		}
	}),
	// チャット履歴取得
	rest.get('https://a-chat/api/users/:userId/message', (req, res, ctx) => {
		const parsedUrl = new URL(req.url)
		const groupChatRoomId = parsedUrl.searchParams.get("groupChatRoomId")
		const directChatRoomId = parsedUrl.searchParams.get("directChatRoomId")

		// 友達とのチャットの場合
		if (directChatRoomId) {
			// 本番は、以下を使用
			// return res(
			// 	ctx.status(200),
			// 	ctx.json(
			// 		temporaryMessages
			// 	),
			// )
			if (directChatRoomId === "friend 1") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend1
					),
				)
			}
			if (directChatRoomId === "friend 2") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend2
					),
				)
			}
			if (directChatRoomId === "friend 3") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend3
					),
				)
			}
			if (directChatRoomId === "friend 4") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend4
					),
				)
			}
			if (directChatRoomId === "friend 5") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend5
					),
				)
			}
			if (directChatRoomId === "friend 6") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend6
					),
				)
			}
			if (directChatRoomId === "friend 7") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend7
					),
				)
			}
			if (directChatRoomId === "friend 8") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend8
					),
				)
			}
			if (directChatRoomId === "friend 9") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend9
					),
				)
			}
			if (directChatRoomId === "friend 10") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend10
					),
				)
			}
			if (directChatRoomId === "friend 11") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_friend11
					),
				)
			}

		}
		// グループチャットの場合
		if (groupChatRoomId) {
			// 本番は、以下を使用
			// return res(
			// 	ctx.status(200),
			// 	ctx.json(
			// 		temporaryMessages
			// 	),
			// )
			if (groupChatRoomId === "group 1") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_group1
					),
				)
			}
			if (groupChatRoomId === "group 2") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_group2
					),
				)
			}
			if (groupChatRoomId === "group 3") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_group3
					),
				)
			}
			if (groupChatRoomId === "group 4") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_group4
					),
				)
			}
			if (groupChatRoomId === "group 5") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_group5
					),
				)
			}
			if (groupChatRoomId === "group 6") {
				return res(
					ctx.status(200),
					ctx.json(
						temporaryMessages_group6
					),
				)
			}
		}
	}),
	// チャット送信
	rest.post('https://a-chat/api/users/:userId/message', (req, res, ctx) => {
		const { userId } = req.body
		const { directChatRoomId } = req.body
		const { groupChatRoomId } = req.body
		const { type } = req.body
		const { content } = req.body
		const { created_at } = req.body
		// mockserviceworker甩に以下保持
		const { all } = req.body
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
		return res(
			// 200のステータスコードで応答する
			ctx.status(200)
		)
	}),
	// 最終既読日時の更新
	rest.post('https://a-chat/api/users/:userId/lastReadTime', (req, res, ctx) => {
		const { userId } = req.body
		const { directChatRoomId } = req.body
		const { groupChatRoomId } = req.body
		const { lasReadTime } = req.body
		return res(
			// 200のステータスコードで応答する
			ctx.status(200)
		)
	}),
	// グループメンバーの追加
	rest.post('https://a-chat/api/users/:userId/group-member', (req, res, ctx) => {
		const { groupChatRoomId } = req.body
		const { adduserIds } = req.body
		let newData = []
		for (let i = 0; i < groups.length; i++) {
			if (groups[i].group_chat_room_id === groupChatRoomId) {
				// 既存のグループメンバーユーザーID配列に新規に追加したメンバーのユーザーIDを追加
				newData = groups[i].group_member_user_id.concat(adduserIds)
				groups[i].group_member_user_id = newData
			}
		}

		return res(
			// 200のステータスコードで応答する
			ctx.status(200),
			ctx.json(
				{
					"adduserIds": adduserIds
				}
			),
		)
	}),
	// 該当友達とのdirectChatRoomIdを取得
	rest.get('https://a-chat/api/users/:userId/friend', (req, res, ctx) => {
		const parsedUrl = new URL(req.url)
		const friendUserId = parsedUrl.searchParams.get("friendUserId")
		const { userId } = req.params
		// mock甩にfriends配列から取得
		for (let i = 0; i < friends.length; i++) {
			if (friends[i].friend_use_id === friendUserId)
				return res(
					ctx.status(200),
					ctx.json(
						{
							"directChatRoomId": friends[i].direct_chat_room_id,
							"alreadyFriend": true
						}
					),
				)
		}
		return res(
			ctx.status(200),
			ctx.json(
				{
					"directChatRoomId": null,
					"alreadyFriend": false
				}
			),
		)
	}),
]

