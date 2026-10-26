import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createAssistantHandler } from './server/assistant/handler.mjs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'kryzect-assistant-api',
      configureServer(server) {
        // Do not define/inject this environment into the client bundle.
        const handler = createAssistantHandler({
          env: { ...process.env, ...loadEnv(mode, process.cwd(), '') },
        })
        server.middlewares.use((request, response, next) => {
          if (
            new URL(request.url, 'http://localhost').pathname ===
            '/api/assistant'
          )
            return handler(request, response)
          next()
        })
      },
    },
  ],
}))
