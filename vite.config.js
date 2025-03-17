import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';


export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "@locator/babel-jsx/dist",
            {
              env: "development",
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Creates '@' as an alias for 'src'
    },
  },
});