import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Only load VITE_-prefixed env vars — safe for esbuild serialization
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    define: {
      // Expose only VITE_ vars under process.env for legacy CJS compat
      'process.env': Object.fromEntries(
        Object.entries(env).map(([k, v]) => [k, JSON.stringify(v)])
      ),
    },
    plugins: [react()],
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  }
})
