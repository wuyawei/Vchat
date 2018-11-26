import fetch from './fetch';

export default {
    getExpression(params) { //获取表情库
        return fetch.post('v/expre/getExpression', params);
    }
}

