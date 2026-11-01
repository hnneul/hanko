import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// npm run dev 에서도 /api/ai 가 돌게 (배포에서는 Vercel이 api/ai.js를 실행)
function devApi() {
  return {
    name: 'dev-api',
    configureServer(server) {
      process.env.GEMINI_API_KEY ??= loadEnv('development', process.cwd(), '').GEMINI_API_KEY
      server.middlewares.use('/api/ai', async (req, res) => {
        const { default: handler } = await server.ssrLoadModule('/api/ai.js')
        let raw = ''
        for await (const chunk of req) raw += chunk
        try {
          req.body = JSON.parse(raw)
        } catch {
          req.body = null
        }
        res.status = (code) => ((res.statusCode = code), res)
        res.json = (data) => (res.setHeader('Content-Type', 'application/json'), res.end(JSON.stringify(data)))
        handler(req, res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApi()],
})
