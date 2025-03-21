import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    base: "/",
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      {
        // default settings on build (i.e. fail on error)
        ...eslint(),
        apply: "build",
      },
      {
        // do not fail on serve (i.e. local development)
        ...eslint({
          failOnWarning: false,
          failOnError: false,
        }),
        apply: "serve",
        enforce: "post",
      },
    ],
    server: {
      port: 3001,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    test: {
      globals: true,
      // environment: "jsdom",
      //    setupFiles: 'src/setupTests.js',
    },
  });
};
