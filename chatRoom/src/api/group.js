import fetch from './fetch';

export default {
    createGroup(params) { //新建群
        return fetch.post('group/createGroup', params);
    },
    getMyGroup() { //查找我的群
        return fetch.post('group/getMyGroup');
    },
    getGroupUsers(params) {
        return fetch.post('group/getGroupUsers', params);
    },
    huntGroups(params) {
        return fetch.post('group/huntGroups', params);
    }
}

