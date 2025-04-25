import axios from '@/utils/request'
import type { RouteItem } from '@/types'

export const getRouteList = () =>
  axios.get<RouteItem[]>('/api/routes')
