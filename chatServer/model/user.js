/**
 * Created by wyw on 2018/9/25.
 */
const db = require('../utils/database');
const crypto = require('crypto'); // 加密

const md5 = pass => { // 避免多次调用MD5报错
    let md5 = crypto.createHash('md5');
    return md5.update(pass).digest("hex");
};

let users = db.model("users", { //Schema
    name: String,
    pass: String,
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
    lastLoginTime: { type: Date, default: Date.now() } // 最后一次登录
});
const getUser = (callback) => { // 测试
    users.find().then(r => {
        callback(r);
    })
};

const login = (params, callback) => { // 登录
    users.find({name: params.name}).then(r => {
        if (r.length) {
            let pass = md5(params.pass);
            if (r[0]['pass'] === pass) {
                // 此处直接写Date.now 会报错 需要Date.now()!!!;
                users.update({name: params.name}, {lastLoginTime: Date.now()}).then(raw => {
                    console.log(raw);
                });
                callback({code: 0, data: {name: r[0].name, photo: r[0].photo}});
            } else {
                callback({code: -1});
            }
        } else {
            callback({code: -1});
        }

    })
};

const upUserInfo = (userName, params, callback) => { //修改个人信息、主题等
    users.update({name: userName}, params).then(raw => {
        if (raw.nModified > 0) {
            callback({code: 0});
        } else {
            callback({code: -1});
        }
    })
};

const signUp = (params, callback) => { // 注册
    users.find({name: params.name}).then(r => {
        if (r.length) {
            callback({code: 1});
        } else {
            let pass = md5(params.pass);
            users.create({name: params.name, pass: pass}).then(r => {
                if (r['_id']) {
                    callback(r);
                } else {
                    callback({code: -1});
                }
            })
        }

    })
};

const getUserInfo = (userName, callback) => { // 获取登录用户信息
    users.find({name: userName}).then(r => {
        if (r.length) {
            callback({code: 0, data: {name: r[0].name, photo: r[0].photo, bubble: r[0].bubble, chatTheme: r[0].chatTheme, projectTheme: r[0].projectTheme, wallpaper: r[0].wallpaper, nickname: r[0].nickname, signature: r[0].signature}});
        } else {
            callback({code: -1});
        }
    })
};

const getUserDetail = (userName, callback) => { // 获取登录用户详细信息
    users.find({name: userName}).then(r => {
        if (r.length) {
            callback({code: 0, data: { nickname: r[0].nickname, signature: r[0].signature, sex: r[0].sex, phone: r[0].phone, email: r[0].email }});
        } else {
            callback({code: -1});
        }
    })
};

module.exports = {
    getUser,
    login,
    upUserInfo,
    signUp,
    getUserInfo,
    getUserDetail
};