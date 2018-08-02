import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {},
        isLogin: false
    },
    getters: {},
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        setIslogin(state, data) {
            state.isLogin = data;
        }
    },
    actions: {
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
});
export default store;

