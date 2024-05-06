import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
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
        // target: "https://reco-back-979f321211cf.herokuapp.com",
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  test: {
    globals: true,
    //    environment: 'jsdom',
    //    setupFiles: 'src/setupTests.js',
  },
});
