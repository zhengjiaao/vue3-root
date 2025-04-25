import axios from '@/utils/request'
import type { LogItem } from '@/types'

interface LogListParams {
  type?: string
  startTime?: string
  endTime?: string
  page?: number
  size?: number
}

export const getLogList = (params: LogListParams) =>
  axios.get<{ total: number; list: LogItem[] }>('/api/logs', { params })
