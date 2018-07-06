import fetch from './fetch';

export default {
    getUser(params) {
        return fetch.get('/getUser', params);
    }
}
