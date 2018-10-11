/**
 * Created by wyw on 2018/8/4.
 */
export default {
    setUser(state, data) {
        if (data === 'out') {
            state.user = {};
            return;
        }
        state.user = Object.assign({}, state.user, data);
    },
    setIslogin(state, data) {
        state.isLogin = data;
    },
    setConversationsList(state, data) { // 设置会话列表
        if (Array.isArray(data)) {
            state.conversationsList = data;
        } else {
            state.conversationsList.push(data);
        }
        window.localStorage.conversationsList = JSON.stringify(state.conversationsList);
    }
}