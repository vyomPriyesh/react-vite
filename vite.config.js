import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '192.168.29.202', // This binds to all available network interfaces.
  //   port: 5174,       // Default Vite port.
  // }
})
