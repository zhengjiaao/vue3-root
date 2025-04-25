import type {MockMethod} from 'vite-plugin-mock'
import Mock from 'mockjs'

// 定义日志数据结构
interface LogItem {
  id: number
  type: 'operation' | 'system' | 'error'
  username: string
  action: string
  result: string
  createTime: string
}

// 定义查询参数结构
interface QueryParams {
  page?: number
  size?: number
  startTime?: string
  endTime?: string

  // [key: string]: any // 允许其他动态键值对
  [key: string]: unknown // 使用 unknown 替代 any
}

const logs = Mock.mock({
  'list|500': [{
    'id|+1': 1,
    'type|1': ['operation', 'system', 'error'],
    username: '@name',
    action: '@ctitle(10,20)',
    result: '@csentence(5,10)',
    createTime: '@datetime'
  }]
}).list as LogItem[]

export default [
  {
    url: '/api/logs',
    method: 'get',
    response: ({query}: { query: QueryParams }) => {
      const {page = 1, size = 20, ...rest} = query

      // 直接返回全部
      // return {
      //   code: 200,
      //   data: {
      //     total: logs.length,
      //     list: logs.slice((page - 1) * size, page * size)
      //   }
      // }

      // 支持筛选数据
      const filtered = logs.filter((l: LogItem) => {
        return Object.entries(rest).every(([key, value]) => {
          if (key === 'startTime' && value) {
            const startTime = new Date(value as string).toISOString(); // 转换为标准时间格式
            return new Date(l.createTime) >= new Date(startTime);
          }
          if (key === 'endTime' && value) {
            const endTime = new Date(value as string).toISOString(); // 转换为标准时间格式
            return new Date(l.createTime) <= new Date(endTime);
          }

          // 类型保护：确保 key 是 LogItem 的合法属性
          if (!(key in l)) return true; // 如果查询参数中包含无关字段，则忽略该字段
          if (typeof value !== 'string') return false; // 确保 value 是字符串类型

          return String(l[key as keyof LogItem]).includes(value as string);
        });
      });

      console.log('Filtered Logs:', filtered); // 输出过滤后的日志数据

      return {
        code: 200,
        data: {
          total: filtered.length,
          list: filtered.slice((page - 1) * size, page * size)
        }
      };

    }
  }
] as MockMethod[]
