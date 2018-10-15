const db = require('../utils/database.js'); // 初始化数据库表

let users = db.model("users",{ // 用户
    name: {type: String, unique: true},
    pass: String,
    code: {type: String, unique: true}, // 唯一的code
    photo: {type: String, default: '/img/picture.png'}, // 默认头像
    signature: { type: String, default: '这个人很懒，暂时没有签名哦！' },
    nickname: { type: String, default: 'vChat-' + Date.now()},
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    sex: { type: String, default: '3' }, // 0 男 1 女 3 保密
    bubble: { type: String, default: 'vchat' }, // 气泡
    chatTheme: { type: String, default: 'vchat' }, // 聊天主题
    projectTheme: { type: String, default: 'vchat' }, // 项目主题
    wallpaper: { type: String, default: 'vchat' }, // 聊天壁纸
    signUpTime: { type: Date, default: Date.now() }, // 注册时间
    lastLoginTime: { type: Date, default: Date.now() }, // 最后一次登录
    conversationsList: Array // 会话列表
});

const initUser = (callback) => {
    let user = new users({
        name: 'Vchat',
        pass: '111111',
        photo: '/img/vchat.png',
        signature: 'Vchat团队',
        nickname: 'Vchat官方推送'
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
