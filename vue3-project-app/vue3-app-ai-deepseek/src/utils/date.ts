import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.locale('zh-cn')

// 完整时间格式（示例：2023年8月15日 14:30）
export function formatFullTime(timestamp: number): string {
    return dayjs(timestamp).format('LL LT')
}

// 短时间格式（示例：08-15 14:30）
export function formatShortTime(timestamp: number): string {
    return dayjs(timestamp).format('MM-DD HH:mm')
}

// 相对时间（示例：2分钟前）
export function formatRelativeTime(timestamp: number): string {
    return dayjs(timestamp).fromNow()
}

// 智能时间显示（结合相对和绝对时间）
export function smartTimeFormat(timestamp: number): {
    primary: string
    secondary: string
    tooltip: string
} {
    const now = dayjs()
    const target = dayjs(timestamp)
    const diffDays = now.diff(target, 'day')

    return {
        // 主显示（相对时间）
        primary: formatRelativeTime(timestamp),
        // 辅助显示（根据时间差决定显示格式）
        secondary: diffDays > 7 ? formatShortTime(timestamp) : formatFullTime(timestamp),
        // 悬浮提示（完整时间）
        tooltip: formatFullTime(timestamp)
    }
}