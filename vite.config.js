import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "trix-editor",
        },
      },
    }),
  ],
  base:
    process.env.VITE_TARGET === "gh"
      ? "/rhresume/"
      : process.env.NODE_ENV === "production"
        ? "./"
        : "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
