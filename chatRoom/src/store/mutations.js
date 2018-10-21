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
            let arr = state.conversationsList.filter(v => v.id === data.id);
            if (!arr.length) { // 添加
                state.conversationsList.push(data);
            } else {
                if (data.d) { // 移除
                    state.conversationsList = state.conversationsList.filter(v => v.id !== data.id);
                }
            }
        }
    },
    setOnlineUser(state, data) {
        state.OnlineUser = data;
    },
    setUnRead(state, data) {
        if (data.clear) {
            state.unRead.forEach(v => {
                if (v.roomid === data.roomid) {
                    v.count = 0;
                }
            });
            return;
        }
        let unRead = state.unRead.filter(v => v.roomid === data.roomid);
        if (unRead.length) {
            state.unRead.forEach(v => {
                if (v.roomid === data.roomid) {
                    if (data.add) {
                        v.count ++;
                    } else {
                        v.count = data.count;
                    }
                }
            });
        } else {
            state.unRead.push({roomid: data.roomid, count: data.count});
        }
    }
}