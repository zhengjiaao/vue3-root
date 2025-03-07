// api.js
const baseURL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    // 获取用户列表
    async getUsers(page, size, name, age) {
        try {
            const response = await apiClient.get('/rest/user/page/list', {
                params: {
                    page,
                    size,
                    name,
                    age,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // 添加用户
    async addUser(userData) {
        try {
            const response = await apiClient.post('/rest/user/add', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // 更新用户
    async updateUser(userId, userData) {
        try {
            const response = await apiClient.put(`/rest/user/update/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // 删除用户
    async deleteUser(userId) {
        try {
            const response = await apiClient.delete(`/rest/user/delete/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};