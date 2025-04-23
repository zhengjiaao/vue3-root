// src/utils/config-loader.ts
// 读取配置，方式二：动态加载（适用于运行时加载）
import HJSON from 'hjson'

// 1. 定义类型
export interface AppConfig {
    app: {
        name: string
        port: number
        features: string[]
    }
}

// 2. 创建配置加载函数
export const loadConfig = async (): Promise<AppConfig> => {
    try {
        // 1. 动态获取配置文件
        const response = await fetch('/config.hjson') // 文件需要放在 public 目录
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        // 2. 读取并解析内容
        const text = await response.text()
        const config = HJSON.parse(text) as AppConfig

        // 3. 增强验证（可选）
        const validator: Record<string, (c: AppConfig) => boolean> = {
            validPort: c => c.app.port > 0 && c.app.port < 65535,
            validFeatures: c => Array.isArray(c.app.features)
        }

        if (!Object.values(validator).every(check => check(config))) {
            throw new Error('Configuration validation failed')
        }

        return config
    } catch (error) {
        console.error('Failed to load config:', error)
        // 返回默认配置
        return {
            app: {
                name: 'Default App',
                port: 3000,
                features: ['basic']
            }
        }
    }
}