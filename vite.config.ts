import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const alias = fs.readdirSync('./src', { withFileTypes: true })
  .filter(file => file.isDirectory())
  .map(file => ({
    find: file.name,
    replacement: path.resolve(__dirname, 'src', file.name),
  }))

const development = !process.argv.find(arg => arg === 'build')

export default defineConfig({
  plugins: [react()],
  resolve: { alias },
  publicDir: development ? 'public' : false,
  build: {
    outDir: path.resolve('..', 'docs')
  }
})
