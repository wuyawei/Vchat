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
    loginOut() { // 注册
        return fetch.post('/loginOut');
    },
    getUserInfo() { //是否登录
        return fetch.post('/getUserInfo');
    },
    createGroup(params) { //新建群
        return fetch.post('/createGroup', params);
    },
    getMyGroup() { //查找群
        return fetch.post('/getMyGroup');
    }
}
