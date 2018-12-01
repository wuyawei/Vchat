/**
 * Created by wyw on 2018/12/1.
 */
import fetch from './fetch';

export default {
    getHotNews() { //获取头条
        return fetch.get(`touch/reconstruct/article/list/BA10TA81wangning/0-10.html`);
    },
    getNewsDetail() {
        return fetch.get(`ent/18/1201/13/E1UNO7VG00038FO9.html`);
    }
}