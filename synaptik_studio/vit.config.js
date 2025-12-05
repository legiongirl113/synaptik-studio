import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // These fix the variable errors in the main app code
    __firebase_config: JSON.stringify("{}"),
    __app_id: JSON.stringify("synaptik-v1"),
    __initial_auth_token: JSON.stringify("")
  }
})
