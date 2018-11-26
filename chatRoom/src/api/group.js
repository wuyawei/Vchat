import fetch from './fetch';

export default {
    createGroup(params) { //新建群
        return fetch.post('v/group/createGroup', params);
    },
    getMyGroup() { //查找我的群
        return fetch.post('v/group/getMyGroup');
    },
    getGroupUsers(params) {
        return fetch.post('v/group/getGroupUsers', params);
    },
    huntGroups(params) {
        return fetch.post('v/group/huntGroups', params);
    },
    getGroupInfo(params) {
        return fetch.post('v/group/getGroupInfo', params);
    }
}

