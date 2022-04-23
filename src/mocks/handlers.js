// すべてのリクエストハンドラを格納するモジュール
// src/mocks/handlers.js
import { rest } from 'msw'

let profileInfo =
{
	"userId": "asami11",
	"nickName": "かひんご",
	"profileImage": "file:///Users/asami/Library/Developer/CoreSimulator/Devices/02928183-1C86-49FB-9F91-B42D0E7553C1/data/Containers/Data/Application/EC802C19-0A27-477A-AE8A-168DF3DEE120/Library/Caches/ExponentExperienceData/%2540asamin8105%252FA-chat/ImagePicker/4A0FF21E-81A4-40B1-9B81-9F168889663E.jpg",
	"searchFlag": true
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
		return res(
			ctx.status(200),
			ctx.json(
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
				]
			),
		)
	}),
	// ユーザが所属するグループ一覧
	rest.get('https://a-chat/api/users/:userId/groups', (req, res, ctx) => {
		const { userId } = req.params
		return res(
			ctx.status(200),
			ctx.json(
				[
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

		return res(
			// 200のステータスコードで応答する
			ctx.status(200)
		)
	}),
	// ユーザーの所属するグループ数
	rest.get('https://a-chat/api/users/:userId/group-count', (req, res, ctx) => {
		const { userId } = req.params
		return res(
			ctx.status(200),
			ctx.text(4),
		)
	}),
	// ユーザの友達数
	rest.get('https://a-chat/api/users/:userId/friend-count', (req, res, ctx) => {
		const { userId } = req.params
		return res(
			ctx.status(200),
			ctx.text(4),
		)
	}),
	// ユーザーの友達一覧
	rest.get('https://a-chat/api/users/:userId/friends', (req, res, ctx) => {
		const { userId } = req.params
		return res(
			ctx.status(200),
			ctx.json(
				[
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
			),
		)
	}),
	// 友達追加
	rest.post('https://a-chat/api/users/:userId/friends', (req, res, ctx) => {
		const { friendUserId } = req.body
		const { ownUserId } = req.body
		return res(
			// 200のステータスコードで応答する
			ctx.status(200)
		)
	}),
	// ユーザーIDに紐づくニックネーム、プロフィール画像の取得
	rest.get(`https://a-chat/api/users/:userId/profile`, (req, res, ctx) => {
		// userIdの取得
		console.log('きたおおお')
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
			console.log('nickName',nickName)
			profileInfo.nickName = nickName
			console.log('profileInfo.nickName',profileInfo.nickName)
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
		if (searchUserId === "aa") {
			return res(
				ctx.status(400),
				ctx.json(
					{
						"already_follow_requested": true,
						"exist": true,
						"friend_use_id": "friend 9",
						"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
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
						"friend_use_id": "friend 9",
						"friend_profile_image": require("../../assets/images/friend_profile_image_2.jpg"),
						"friend_nickname": "asami9"
					}
				),
			)
		}
	}),
]
