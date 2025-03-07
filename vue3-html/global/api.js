// api.js
const baseURL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

window.api = {
    // 获取用户列表
    getUsers(page, size, name, age) {
        return apiClient.get('/rest/user/page/list', {
            params: {
                page,
                size,
                name,
                age,
            },
        });
    },

    // 添加用户
    addUser(user) {
        return apiClient.post('/rest/user/add', user);
    },

    // 更新用户
    updateUser(id, user) {
        return apiClient.put(`/rest/user/update/${id}`, user);
    },

    // 删除用户
    deleteUser(id) {
        return apiClient.delete(`/rest/user/delete/${id}`);
    },
};