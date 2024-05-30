import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [
      react(),

      // When building for production, we have to run "tsc --noEmit" separately. When testing, this plugin would only show the errors but wouldn't block the tests.
      process.env.NODE_ENV === "development" &&
        checker({
          typescript: true,
        }),
    ],
    server: {
      port: 8080,
      proxy: {
        "/api": {
          target: "http://localhost:5000",
        },
      },
    },
  };
});
