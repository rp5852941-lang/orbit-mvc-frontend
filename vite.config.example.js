// Copy this file to vite.config.js only when running this CRA app with Vite instead.
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    resolve: { alias: { "@": `${process.cwd()}/src` } },
    define: {
      "process.env.REACT_APP_API_URL": JSON.stringify(env.VITE_API_URL || "/api"),
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/orbit-api/api"),
        },
      },
    },
  };
});
