const db = require('../utils/database');

let messages = db.model("messages", {
    roomid: String, // 房间id
    name: String, // 用户登录名
    nickname: String, // 用户昵称
    time: String, // 时间
    avatar: String, // 用户头像
    mes: String, // 消息
    read: Number // 是否已读 0/1
});

const saveMessage = (params, callback) => { // 保存消息
    messages.create(params).then(r => {
        if (r['_id']) {
            callback({code: 0, data: 'ok'});
        } else {
            callback({code: -1});
        }
    })
};

module.exports = {
    saveMessage
};