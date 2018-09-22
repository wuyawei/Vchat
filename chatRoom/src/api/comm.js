import fetch from './fetch';

export default {
    uploadFile(params) { // 上传文件
        return fetch.post('/uploadFile', params);
    }
}
