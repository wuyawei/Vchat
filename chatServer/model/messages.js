const db = require('../utils/database');

let messages = db.model("messages", {
    roomid: String, // 房间id
    name: String, // 用户登录名
    nickname: String, // 用户昵称
    time: String, // 时间
    avatar: String, // 用户头像
    mes: String, // 消息
    read: Array, // 是否已读 0/1
    signature: String, // 个性签名
    emoji: String, // 表情地址
    style: String, // 消息类型 emoji/mess/img/file
    groupId: String, // 加入群聊id
    groupName: String, // 加入群聊名称
    groupPhoto: String, //加入群聊头像
    userM: {
        type : db.Schema.ObjectId,
        ref : 'users'
    }, // 申请人id、消息发送人
    userY: String, // 好友id
    userYname: String, // 好友昵称
    userYphoto: String, // 好友头像
    userYloginName: String, // 好友登录名
    friendRoom: String, // 好友房间
    state: String, // group/ frend
    type: String, // validate
    status: String // 0 未操作 1 同意 2 拒绝
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

const removeMessage = (params, callback) => { // 删除消息
    messages.remove(params).then(raw => {
        if (raw.n > 0) {
            callback({code: 0});
        } else {
            callback({code: -1});
        }
    })
};

let getMessage = (params, callback, count = 0) => {
    messages.find({roomid: params.roomid})
        .populate({path: 'userM', select: 'signature photo nickname'}) // 关联用户基本信息
        .sort({'time': -1})
        .skip((params.offset - 1) * params.limit)
        .limit(params.limit)
        .then(r => {
            r.forEach(v => { // 防止用户修改资料后，信息未更新
                if (v.userM) {
                    v.nickname = v.userM.nickname;
                    v.avatar = v.userM.photo;
                    v.signature = v.userM.signature;
                }
            });
            r.reverse();
            callback({code: 0, data: r, count: count});
        }).catch(err => {
        console.log(err);
        callback({code: -1});
    });
};
const getHistoryMessages = (params, reverse, callback) => { // 保存消息
    if (reverse === 2) { // 聊天记录
        messages.count({roomid: params.roomid}, (err, count) => {
            if (count > 0) {
                getMessage(params, callback, count);
            } else {
                callback({code: 0, data: [], count: 0});
            }
        });
    } else if (reverse === 1) {
        getMessage(params, callback);
    } else if (reverse === -1) {
        messages.find({roomid: params.roomid})
            .sort({'time': -1})
            .skip((params.offset - 1) * params.limit)
            .limit(params.limit)
            .then(r => {
                callback({code: 0, data: r});
            }).catch(err => {
            console.log(err);
            callback({code: -1});
        });
    }
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

const setMessageStatus = (params) => { // 验证消息设置为已通过
    messages.find({'userM': params.userM})
        .then(raw => {
            raw.forEach(v => {
                if (v.type === "validate" && (v.state === 'friend' || v.state === 'group')) {
                    v.status = params.status;
                    v.save();
                }
            })
        })
        .catch(err => console.log('setMessageStatus失败', err));
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
    upMessage,
    removeMessage,
    setMessageStatus
};