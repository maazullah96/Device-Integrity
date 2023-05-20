import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  vite: {
    define: {
      'process.env.SEPOLIA_CONTRACT_ADDRESS': `"${process.env.SEPOLIA_CONTRACT_ADDRESS}"`,
      // 'process.version': null,
   },
  },
});