import {fileURLToPath, URL} from 'node:url'

import {defineConfig, ConfigEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {viteMockServe} from 'vite-plugin-mock'

// 根据环境变量决定使用哪个 mock 文件
// const mockPath = process.env.NODE_ENV === 'production' ? './mockProd.js' : './mockDev.js';
// 根据环境变量决定使用哪个 mock 路径下的文件
const mockPath = process.env.NODE_ENV === 'production' ? './src/mock/mockProd' : './src/mock/mockDev';


// https://vite.dev/config/
export default ({command}: ConfigEnv) => {
    return defineConfig({
        plugins: [
            vue(),
            vueDevTools(),
            viteMockServe({
                enable: true,              // 是否启用 Mock 功能
                mockPath: './src/mock/vite',    // Mock 数据文件存放路径, 指定 Mock 文件的存储目录（默认为 mock）
                // mockPath: mockPath,    // 根据环境动态加载 mock 文件, 指定 Mock 文件的存储目录（默认为 mock）
                watchFiles: true,          // 监听文件变化自动更新
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
    })
}
