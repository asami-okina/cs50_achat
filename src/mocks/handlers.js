// すべてのリクエストハンドラを格納するモジュール
// src/mocks/handlers.js
import { rest } from 'msw'

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
		// const parsedUrl = new URL(req.url)
		// const userId = parsedUrl.searchParams.get("userId")
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
	rest.get('https://a-chat/api/home', (req, res, ctx) => {
		const parsedUrl = new URL(req.url)
		const search = parsedUrl.searchParams.get("search")
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
]
