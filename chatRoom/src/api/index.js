import fetch from './fetch';

export default {
    getUser(params) {
        return fetch.get('/getUser', params);
    },
    login(params) {
        return fetch.post('/login', params);
    }
}
