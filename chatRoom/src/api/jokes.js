/**
 * Created by wyw on 2018/11/1.
 */
import fetch from './fetch';

export default {
    getJokes(type) { //获取段子
        return fetch.get(`api/api_open.php?a=list&c=data&type=${type}`);
    }
}