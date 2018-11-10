/**
 * Created by wyw on 2018/11/1.
 */
import fetch from './fetch';

export default {
    findMyfriends(params) { //查找我的好友
        return fetch.post('friend/findMyfriends', params);
    },
    checkMyfriends(params) { //查找我的好友
        return fetch.post('friend/checkMyfriends', params);
    }
}

