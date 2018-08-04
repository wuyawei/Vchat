const db = require('../utils/database.js'); // 初始化数据库表

let users = db.model("users",{ // 用户
    name: String,
    pass: String,
    photo: String
});

const initUser = (callback) => {
    let user = new users({
        name: 'admin',
        pass: '123456',
        photo: ''
    });
    user.save().then((res) => {
        callback(res)
    })
};

let rooms = db.model("rooms",{ // 房间
    title: String
});

const initRoom = (callback) => {
    let room = new rooms({
        title: '第一聊天室'
    });
    room.save().then((res) => {
        callback(res)
    })
};

let msgSchema = new db.Schema(
    { // 消息
        roomid: String,
        roomtitle: String,
        userid: String,
        username: String,
        content: String,
    },
    { timestamps: true } // 设置timestamps为true，schema映射的文档document会自动添加createdAt和updatedAt这两个字段，代表创建时间和更新时间， 也可以自定义名称timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
);
let messages = db.model("message", msgSchema);

const initMessage = (callback, conf) => {
    let message = new messages({
        roomid: conf.roomid,
        roomtitle: '第一聊天室',
        userid: conf.userid,
        username: 'admin',
        content: '我是admin ^_^'
    });
    message.save().then((res) => {
        callback(res)
    })
};

module.exports = {
    initUser,
    initRoom,
    initMessage
};
