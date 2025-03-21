import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
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
    define: {
      VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL), 
    },
  };
});
