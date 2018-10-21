import fetch from './fetch';

export default {
    getUser(params) { // 获取所有用户
        return fetch.get('user/getUser', params);
    },
    login(params) { // 登录
        return fetch.post('user/login', params);
    },
    signUp(params) { // 注册
        return fetch.post('user/signUp', params);
    },
    loginOut() { // 注册
        return fetch.post('user/loginOut');
    },
    getUserInfo() { //获取用户信息
        return fetch.post('user/getUserInfo');
    },
    upUserInfo(params) { // 设置主题
        return fetch.post('user/upUserInfo', params);
    },
    getUserDetail() { // 获取个人设置用户信息
        return fetch.post('user/getUserDetail');
    },
    getVchatInfo() { // 获取vchat官方账号信息
        return fetch.post('user/getVchatInfo');
    },
    addConversitionList(params) { // 添加会话
        return fetch.post('user/addConversitionList', params);
    },
    removeConversitionList(params) { // 移除会话
        return fetch.post('user/removeConversitionList', params);
    }
}

