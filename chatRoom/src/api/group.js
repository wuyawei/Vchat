import fetch from './fetch';

export default {
    createGroup(params) { //新建群
        return fetch.post('/createGroup', params);
    },
    getMyGroup() { //查找我的群
        return fetch.post('/getMyGroup');
    },
    getGroupUsers(params) {
        return fetch.post('/getGroupUsers', params);
    }
}

