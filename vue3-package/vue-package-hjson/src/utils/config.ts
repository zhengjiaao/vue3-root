// src/config.ts
// 读取配置，方式一：静态导入（适用于构建时加载）
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
    let configContent: string;

    try {
        // 统一使用 import.meta.env.VITE_CONFIG_PATH 来加载配置
        const configPath = import.meta.env.VITE_CONFIG_PATH;

        if (!configPath) {
            throw new Error('VITE_CONFIG_PATH is not defined');
        }
        // 动态加载配置文件内容
        configContent = (await import(`${configPath}?raw`)).default;

        // 解析并验证配置
        const parsed = HJSON.parse(configContent as string) as AppConfig;

        if (!parsed.app || typeof parsed.app.port !== 'number') {
            throw new Error('Invalid configuration format');
        }

        return parsed;
    } catch (error) {
        console.error('Configuration load failed:', error);
        return {
            app: {
                name: 'Fallback App',
                port: 8080,
                features: ['default'],
            },
        };
    }
};

// 3. 导出单例配置
let appConfig: AppConfig | null = null;

export const getAppConfig = async (): Promise<AppConfig> => {
    if (!appConfig) {
        appConfig = await loadConfig();
    }
    return appConfig;
};