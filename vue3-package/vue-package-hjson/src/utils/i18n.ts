// src/i18n.ts
import HJSON from 'hjson'
import { ref } from 'vue'

interface LocaleData {
    greeting: string
    buttons: {
        confirm: string
        cancel: string
    }
}

const currentLocale = ref<LocaleData | null>(null)

export const useI18n = () => {
    const loadLocale = async (lang: string): Promise<void> => {
        try {
            const response = await fetch(`/locales/${lang}.hjson`)
            if (!response.ok) {
                const errorMessage = `Failed to fetch locale file: ${response.statusText} (${response.status})`
                console.error(errorMessage)
                throw new Error(errorMessage) // 抛出错误供外部捕获
            }
            const text = await response.text()
            currentLocale.value = HJSON.parse(text)
        } catch (error) {
            console.error('Error loading locale:', error)
            currentLocale.value = null
            throw error // 确保错误传递到外部调用者
        }
    }

    return { currentLocale, loadLocale }
}
