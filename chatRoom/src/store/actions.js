/**
 * Created by wyw on 2018/8/4.
 */
import api from '../api';
export default {
    getUserInfo({commit}) {
        api.getUserInfo().then(r => {
            if (r.code === 0) {
                commit('setUser', r.data);
                commit('setIslogin', true);
            } else {
                commit('setUser', '');
                commit('setIslogin', false);
            }
        });
    }
}