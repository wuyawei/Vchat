/**
 * Created by wyw on 2018/8/4.
 */
import api from '../api';
export default {
    getUserInfo({commit, state}, that) { // 获取用户登录信息
        api.getUserInfo().then(r => {
            if (r.code === 0) {
                commit('setUser', r.data);
                commit('setIslogin', true);
                document.body.id = 'theme-' + state.user.projectTheme;
            } else {
                commit('setUser', '');
                commit('setIslogin', false);
            }
            if (that) {
                that.$router.push('/main/personalMain');
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
    }
}