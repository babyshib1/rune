import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, {VantResolve} from 'vite-plugin-style-import'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import viteCompression from 'vite-plugin-compression'
import copy from 'rollup-plugin-cpy'
import importToCDN from 'vite-plugin-cdn-import'
import {initCdnModules} from './cdn.config'

/* 打包分析 */
// import { visualizer } from 'rollup-plugin-visualizer'

const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({mode}) => {
  const {
    VITE_PORT,
    VITE_NODE_ENV,
    VITE_BASE_API,
    VITE_ACTIVITY_PATH,
    VITE_JSCDN_URL
  } = loadEnv(mode, process.cwd())

  const port = VITE_PORT || 8888
  const IS_PRODUCTION = VITE_NODE_ENV === 'production'

  return defineConfig({
    base: IS_PRODUCTION ? './' : './',
    resolve: {
      alias: {
        '@': resolve('src'), // 主目录
        views: resolve('src/views'), // 页面
        components: resolve('src/components'), // 组件
        api: resolve('src/api'), // 接口
        utils: resolve('src/utils'), // 通用功能
        assets: resolve('src/assets'), // 静态资源
        style: resolve('src/style') // 通用样式
      }
    },
    plugins: [
      // visualizer(),
      vue(),
      VueSetupExtend(),
      styleImport({
        resolves: [VantResolve()],
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: name => `../es/${name}/style`
          }
        ]
      }),
      // importToCDN({ modules: initCdnModules(VITE_JSCDN_URL) }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false
      }),
      copy([
        {files: 'static/config/*.txt', dest: `dist/${VITE_ACTIVITY_PATH}`},
        {
          files: 'static/js/*.js',
          dest: `dist/${VITE_ACTIVITY_PATH}/static/js`
        }
      ])
    ],
    server: {
      server: 'localhost',
      host: '0.0.0.0',
      port,
      open: true,
      strictPort: false,
      proxy: {
        [VITE_BASE_API]: {
          target: `http://127.0.0.1:${port}/`,
          changeOrigin: true,
          pathRewrite: {
            ['^' + VITE_BASE_API]: ''
          }
        },
        '/app': {
          target: `https://www.bscs.market`,
          changeOrigin: true
        }
        // '/app': {
        //   target: `http://127.0.0.1:8080`,
        //   changeOrigin: true
        // }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: '@import "@/style/common.scss";'
        }
      }
    },
    build: {
      outDir: `dist/${VITE_ACTIVITY_PATH}`,
      assetsDir: 'static',
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/assets/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor' // 代码分割为第三方包
            }
            /* 路由懒加载则不使用此操作 */
            // if (id.includes('src')) {
            //   return 'app'
            // }
          }
        }
      },
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: IS_PRODUCTION,
          drop_debugger: true
        }
      }
    }
  })
}
