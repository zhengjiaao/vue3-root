export interface User {
  id: number
  username: string
  password?: string
  role: string
  status: number
  createTime: string
}

export interface Role {
  id: number
  name: string
  code: string
  description: string
  createTime: string
}

export interface RouteItem {
  path: string
  name: string
  component: string
  meta: {
    title: string
    icon?: string
  }
}

export interface LogItem {
  id: number
  type: string
  username: string
  action: string
  result: string
  createTime: string
}

// 定义头像上传响应的接口
export interface UserAvatar {
  code: number;
  message?: string;
  data?: {
    avatarUrl?: string;
    avatarBase64?: string;
  };
}
