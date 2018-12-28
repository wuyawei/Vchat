/**
 * Created by wyw on 2018/8/4.
 */
import api from '../api';
export default {
    getUserInfo({commit, state, dispatch}, that) { // 获取用户登录信息
        api.getUserInfo().then(r => {
            if (r.code === 0) {
                commit('setUser', r.data);
                commit('setConversationsList', r.data.conversationsList);
                document.body.id = 'theme-' + r.data.projectTheme;
                dispatch('getVchatInfo');
                if (that) {
                    that.loading = false;
                    that.$router.replace('/main/personalMain');
                }
            } else {
                commit('setUser', '');
            }
        });
    },
    setTheme({state}) { // 设置主题
        document.body.id = 'theme-' + state.user.projectTheme;
    },
    setTransitionName({state}) { // 设置页面过渡动画类型
        state.transitionName = 'moveOut';
        setTimeout(_ => {
            state.transitionName = '';
        }, 500)
    },
    getVchatInfo({commit, state}) { // 获取官方账号信息
        api.getVchatInfo().then(r => {
            if (r.code === 0) {
                let id = state.user.id + '-' + r.data.id;
                state.Vchat = Object.assign({}, r.data, {type: 'vchat'}, {id});
                commit('setConversationsList', state.Vchat);
            }
        })
    }
}