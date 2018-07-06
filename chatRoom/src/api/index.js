import fetch from './fetch';

export default {
    getUser(params) { // 获取用户
        return fetch.get('/getUser', params);
    },
    login(params) { // 添加用户
        return fetch.post('/login', params);
    }
}
