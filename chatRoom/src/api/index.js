import fetch from './fetch';

export default {
    getUser(params) { // 获取用户
        return fetch.get('/getUser', params);
    },
    login(params) { // 登录
        return fetch.post('/login', params);
    },
    signUp(params) { // 注册
        return fetch.post('/signUp', params);
    },
    loginOut(params) { // 注册
        return fetch.post('/loginOut', params);
    }
}
