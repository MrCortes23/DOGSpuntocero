import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { streamText, convertToCoreMessages } from 'ai'
import { groq } from '@ai-sdk/groq'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'api-server',
      configureServer(server) {
        server.middlewares.use(async (req: any, res: any, next) => {
          if (req.url === '/api/nutritionai' && req.method === 'POST') {
            console.log('Incoming AI Request...')
            try {
              let body = ''
              for await (const chunk of req) {
                body += chunk
              }
              const { messages } = JSON.parse(body)

              console.log('Calling Groq with', messages.length, 'messages')
              const result = streamText({
                model: groq('llama-3.3-70b-versatile'),
                system: `Eres un experto veterinario y nutricionista canino. Tu nombre es NutriCan.
Tu rol es ayudar a los dueños de perros con consultas sobre nutrición.
Responde siempre en español de manera amable, clara y profesional.
Mantén las respuestas concisas pero informativas.`,
                messages: convertToCoreMessages(messages),
              })

              result.pipeDataStreamToResponse(res)
            } catch (error) {
              console.error('API Error detailed:', error)
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }))
            }
            return
          }
          next()
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
