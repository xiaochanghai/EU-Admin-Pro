import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createVitePlugins } from "./build/plugins";
import { createProxy } from "./build/proxy";
import { wrapperEnv } from "./build/getEnv";
import { resolve } from "path";
import pkg from "./package.json";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

const manualChunkGroups: Record<string, string[]> = {
  "antd-vendor": ["antd", "@ant-design/icons"],
  "antd-pro": ["@ant-design/pro-components"],
  charts: ["echarts", "echarts-liquidfill"],
  "react-vendor": ["react", "react-dom", "react-router-dom"],
  "redux-vendor": ["react-redux", "@reduxjs/toolkit", "redux-persist"],
  "utils-vendor": ["dayjs", "axios", "classnames"],
  "dnd-kit-vendor": ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities"],
  "misc-vendor": ["ahooks", "qs", "md5"]
};

const getManualChunk = (id: string) => {
  const normalizedId = id.replace(/\\/g, "/");
  for (const [chunkName, packages] of Object.entries(manualChunkGroups)) {
    if (
      packages.some(pkgName => {
        const pnpmName = pkgName.replace("/", "+");
        return normalizedId.includes(`/node_modules/${pkgName}/`) || normalizedId.includes(`/node_modules/.pnpm/${pnpmName}@`);
      })
    ) {
      return chunkName;
    }
  }
};

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: createVitePlugins(viteEnv, __APP_INFO__.lastBuildTime),
    build: {
      outDir: "dist",
      minify: viteEnv.VITE_DROP_CONSOLE ? "terser" : "esbuild",
      // esbuild is faster to package, but cannot remove console.log, terser is slower to package, but can remove console.log
      // minify: "terser",
      terserOptions: {
        compress: {
          drop_console: viteEnv.VITE_DROP_CONSOLE,
          drop_debugger: viteEnv.VITE_DROP_CONSOLE
        }
      },
      sourcemap: false,
      // Disable gzip compressed size reporting, which slightly reduces pack time
      reportCompressedSize: false,
      // Determine the chunk size that triggers the warning
      chunkSizeWarningLimit: 5000,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          // 代码分割配置 - 对象方式（仅第三方包）
          manualChunks: getManualChunk
        }
      }
    }
  };
});
