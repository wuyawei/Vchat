import axios from 'axios';
let instance = axios.create({
    baseURL: '/api'
});
export default {
    get(url, params) {
        return new Promise((resolve, reject) => {
            instance.get(url, {params}).then(r => {
                resolve(r.data);
            })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            instance.post(url, params).then(r => {
                resolve(r.data);
            })
        })
    }
}
