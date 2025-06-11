import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

const port = process.env.VITE_PORT
	?	parseInt(process.env.VITE_PORT)
	: 3000

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	server: {
		host: true,
		port: port
	},
})
