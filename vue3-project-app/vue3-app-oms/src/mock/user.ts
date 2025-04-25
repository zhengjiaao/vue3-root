import type {MockMethod} from 'vite-plugin-mock';

// 定义用户数据的接口
interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  status: number;
  isBuiltIn: boolean; // 新增字段，标识是否是内置用户
  createTime?: string; // 可选字段
}

// 定义 response 方法的参数接口
interface MockResponseParams<T> {
  body: T;
}

// 模拟用户数据
const users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'pass123',
    role: 'admin',
    status: 1,
    isBuiltIn: true,
    createTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
  },
  {
    id: 2,
    username: 'auditor',
    password: 'pass123',
    role: 'auditor',
    status: 1,
    isBuiltIn: true,
    createTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
  },
  {
    id: 3,
    username: 'user',
    password: 'pass123',
    role: 'user',
    status: 1,
    isBuiltIn: true,
    createTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
  },
  {
    id: 4,
    username: 'user1',
    password: 'pass123',
    role: 'user',
    status: 1,
    isBuiltIn: false,
    createTime: '2023-07-22 15:07:03'
  },
  {
    id: 5,
    username: 'user2',
    password: 'pass123',
    role: 'user',
    status: -1,
    isBuiltIn: false,
    createTime: '2023-07-23 16:18:04'
  },
  {
    id: 6,
    username: 'user3',
    password: 'pass123',
    role: 'user',
    status: -1,
    isBuiltIn: false,
    createTime: '2023-07-24 17:29:05'
  }
].sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime()); // 按 createTime 升序

export default [
  {
    url: '/api/users',
    method: 'get',
    response: ({query}: { query: Record<string, any> }) => {
      const username = String(query.username);
      const status = String(query.status);
      console.log('username = ', username, 'status = ', status);

      let filteredUsers = users;

      if (username) {
        filteredUsers = filteredUsers.filter(user => user.username.includes(username));
      }

      if (status) {
        filteredUsers = filteredUsers.filter(user => user.status === Number(status));
      }

      // 按 createTime 升序
      filteredUsers = filteredUsers.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime());

      return {
        code: 200,
        data: {
          total: filteredUsers.length,
          list: filteredUsers
        }
      };
    }
  },
  {
    url: '/api/users',
    method: 'post',
    response: ({body}: MockResponseParams<{
      username: string;
      password: string;
      role: string;
      status: number
    }>) => {
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 19).replace('T', ' ');
      const newUser: User = {...body, id: Date.now(), isBuiltIn: false, createTime: formattedTime};
      users.unshift(newUser);
      return {
        code: 200,
        data: newUser
      };
    }
  },
  {
    url: '/api/users/:id',
    method: 'patch',
    response: ({body}: MockResponseParams<{
      id: number;
      username?: string;
      role?: string;
      status?: number
    }>) => {
      const userId = body.id;
      if (userId === null) {
        return {
          code: 400,
          message: '无效的用户 ID'
        };
      }

      const user = users.find(u => u.id === userId);
      if (!user) {
        return {
          code: 404,
          message: '用户不存在'
        };
      }

      if (user.isBuiltIn) {
        return {
          code: 403,
          message: '内置用户不能修改'
        };
      }

      Object.assign(user, body);
      return {
        code: 200,
        data: user,
        message: '更新成功'
      };
    }
  },
  {
    url: '/api/users/:id',
    method: 'delete',
    response: ({query}: { query: Record<string, any> }) => {
      console.log('delete id = ', query?.id); // 添加日志
      const userId = Number(query.id);
      if (userId === null) {
        return {
          code: 400,
          message: '无效的用户 ID'
        };
      }

      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return {
          code: 404,
          message: '用户不存在'
        };
      }

      const user = users[userIndex];
      if (user.isBuiltIn) {
        return {
          code: 403,
          message: '内置用户不能删除'
        };
      }

      users.splice(userIndex, 1);
      return {
        code: 200,
        message: '删除成功'
      };
    }
  },
  {
    url: '/api/user/profile',
    method: 'patch',
    response: ({body}: MockResponseParams<{
      id: number;
      username?: string;
      email?: string;
      phone?: string
    }>) => {
      console.log('body', body);

      const userId = body.id;

      if (userId === null) {
        return {
          code: 400,
          message: '无效的用户 ID'
        };
      }

      const user = users.find(u => u.id === userId);
      if (!user) {
        return {
          code: 404,
          message: '用户不存在'
        };
      }

      if (user.isBuiltIn) {
        return {
          code: 403,
          message: '内置用户不能修改'
        };
      }

      Object.assign(user, body);
      return {
        code: 200,
        data: user,
        message: '更新成功'
      };
    }
  },
  {
    url: '/api/user/change-password',
    method: 'post',
    response: ({body}: MockResponseParams<{
      id: number;
      oldPassword: string;
      newPassword: string
    }>) => {
      console.log('body', body);

      const userId = body.id;

      if (userId === null) {
        return {
          code: 400,
          message: '无效的用户 ID'
        };
      }

      const user = users.find(u => u.id === userId);
      if (!user) {
        return {
          code: 404,
          message: '用户不存在'
        };
      }

      if (body.oldPassword !== user.password) {
        return {
          code: 400,
          message: '旧密码不正确'
        };
      }

      user.password = body.newPassword;
      return {
        code: 200,
        message: '密码修改成功'
      };
    }
  },
  {
    url: '/api/user/avatar',
    method: 'post',
    response: () => ({
      code: 200,
      data: {
        avatarUrl: '/avatar_2025.jpg', // 指向 public 目录下的 avatar.jpg
        avatarBase64: '' // 读取public 目录下的 avatar_2025_base64.txt 文件内容 base64 字符串
      }
    })
  }
] as MockMethod[];
