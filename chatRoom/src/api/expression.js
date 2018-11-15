import fetch from './fetch';

export default {
    getExpression(params) { //新建群
        return fetch.post('expre/getExpression', params);
    }
}

