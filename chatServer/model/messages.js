const db = require('../utils/database');

let messages = db.model("messages", {
    roomid: String, // 房间id
    name: String, // 用户登录名
    nickname: String, // 用户昵称
    time: String, // 时间
    avatar: String, // 用户头像
    mes: String, // 消息
    read: Array, // 是否已读 0/1
    signature: String,
    emoji: String, // 表情地址
    style: String, // 消息类型 emoji/mes
    groupId: String, // 加入群聊id
    groupName: String, // 加入群聊名称
    groupPhoto: String, //加入群聊头像
    userM: String, // 申请加好友人id
    userY: String, // 好友id
    userYname: String, // 好友昵称
    userYphoto: String, // 好友头像
    friendRoom: String, // 好友房间
    state: String, // group/ frend
    type: String, // validate
    status: {type: String, default: '0'} // 0 未操作 1 同意 2 拒绝
});

const saveMessage = (params, callback = function () {}) => { // 保存消息
    messages.create(params).then(r => {
        if (r['_id']) {
            callback({code: 0, data: 'ok'});
        } else {
            callback({code: -1});
        }
    })
};

const getHistoryMessages = (params, order, callback) => { // 保存消息
    messages.find(params)
        .sort({'time': order})
        .then(r => {
            callback({code: 0, data: r});
        }).catch(err => {
            console.log(err);
            callback({code: -1});
        });
};
// updateMany 一次更新多条
const setReadStatus = (params) => { // 消息设置为已读
    messages.find({'roomid': params.roomid})
        .then(raw => {
            raw.forEach(v => {
                if (v.read.indexOf(params.name) === -1) {
                    v.read.push(params.name);
                    v.save();
                }
            })
        })
        .catch(err => console.log('setReadStatus失败', err));
};

const upMessage = (params, callback) => { // 更新status
    messages.update({'_id': params['_id']}, {status: params.status}).then(raw => {
        if (raw.nModified > 0) {
            callback({code: 0});
        } else {
            callback({code: -1});
        }
    })
};

module.exports = {
    saveMessage,
    getHistoryMessages,
    setReadStatus,
    upMessage
};