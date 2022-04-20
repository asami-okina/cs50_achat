// すべてのリクエストハンドラを格納するモジュール
// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
	// req: 一致したリクエストに関する情報
	// res: モックレスポンスを作成するための機能ユーティリティ
	// ctx: 模擬応答のステータスコード、ヘッダ、ボディなどを設定するための関数群
  rest.post('https://asami.dev/api/login', (req, res, ctx) => {
    // Pユーザーの認証をセッションに永続させる
    sessionStorage.setItem('is-authenticated', 'true')
    return res(
      // 200のステータスコードで応答する
      ctx.status(200),
    )
  }),
  rest.get('https://asami.dev/api/user', (req, res, ctx) => {
    // このセッションでユーザーが認証されているかどうかを確認する
    const isAuthenticated = sessionStorage.getItem('is-authenticated')
    if (!isAuthenticated) {
      // 認証されていない場合、403エラーで応答する
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }
    // 認証された場合、模擬ユーザの詳細を返します。
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
	rest.get('https://asami.dev/api/asami', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
]
