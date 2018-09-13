/**
 * Created by wyw on 2018/8/4.
 */
export default {
    setUser(state, data) {
        if (data === 'out') {
            state.user = {};
            return;
        }
        state.user = Object.assign(state.user, data);
    },
    setIslogin(state, data) {
        state.isLogin = data;
    }
}