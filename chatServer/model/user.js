/**
 * Created by wyw on 2018/9/25.
 */
const db = require('../utils/database');
const baseList = require('./baseList');
const crypto = require('crypto'); // 加密
const fs = require('fs');
const path = require('path');

const md5 = pass => { // 避免多次调用MD5报错
    let md5 = crypto.createHash('md5');
    return md5.update(pass).digest("hex");
};
const getUser = (callback) => { // 测试
    baseList.users.find().then(r => {
        callback(r);
    })
};

const login = (params, callback) => { // 登录
    baseList.users
        .find(
            {
                $or: [{"name": params.name}, {"code": params.name}]
            }
        )
        .then(r => {
        if (r.length) {
            let pass = md5(params.pass);
            if (r[0]['pass'] === pass) {
                // 此处直接写Date.now 会报错 需要Date.now()!!!;
                baseList.users.update({name: params.name}, {lastLoginTime: Date.now()}).then(raw => {
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
    let pr = {};
    if (params.unlink) {
        for (let k in params) {
            if (k !== 'unlink') {
                pr[k] = params[k];
            }
        }
        if (params.unlink.indexOf('/uploads') > -1) { // 此处为./,  按引入至app.js后的位置计算
            fs.unlink('./public' + params.unlink, (error) => {
                if(error){
                    console.log(error);
                    return false;
                }
                console.log('删除文件成功');
            })
        }
    } else {
        pr = params;
    }
    baseList.users.update({name: userName}, pr).then(raw => {
        if (raw.nModified > 0) {
            callback({code: 0});
        } else {
            callback({code: -1});
        }
    })
};

const signUp = (params, callback) => { // 注册
    baseList.users.find({name: params.name}).then(r => {
        if (r.length) {
            callback({code: 1});
        } else {
            function createfun(code) { // 写入数据
                let pass = md5(params.pass);
                baseList.users.create({name: params.name, pass: pass, code: code, nickname: 'vChat' + (Date.now()+'').slice(6)}).then(r => {
                    if (r['_id']) {
                        callback({code: 0, data: code});
                    } else {
                        callback({code: -1});
                    }
                })
            }
            function fineOneAccountBase(createfun) { // 查找code
                let rand = Math.random();
                baseList.accountBase.findOneAndUpdate({type: '1', status: '0', random : { $gte : rand }}, {status: '1'}, (err, doc) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (!doc) {
                            baseList.accountBase.findOneAndUpdate({type: '1', status: '0', random : { $lt : rand }}, {status: '1'}, (err, doc) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (doc) {
                                        createfun(doc.code);
                                    }
                                }
                            });
                        } else {
                            createfun(doc.code);
                        }
                    }
                });
            }
            fineOneAccountBase(createfun);
        }

    })
};

const getUserInfo = (params, callback) => { // 获取登录用户或好友信息
    if (params.id) {
        baseList.users.find({_id: params.key}).then(r => {
            if (r.length) {
                let response = {name: r[0].name, photo: r[0].photo, nickname: r[0].nickname, signature: r[0].signature, code: r[0].code,cover:r[0].cover,sex:r[0].sex, province: r[0].province, city: r[0].city, town: r[0].town};
                callback({code: 0, data: response});
            } else {
                callback({code: -1});
            }
        })
    } else {
        baseList.users.find({name: params.key}).then(r => {
            if (r.length) {
                let response = {name: r[0].name, photo: r[0].photo, bubble: r[0].bubble, chatTheme: r[0].chatTheme, projectTheme: r[0].projectTheme, wallpaper: r[0].wallpaper, nickname: r[0].nickname, signature: r[0].signature, id: r[0]._id, conversationsList: r[0].conversationsList, code: r[0].code, emoji: r[0].emoji, chatColor: r[0].chatColor, province: r[0].province, city: r[0].city, town: r[0].town, bgOpa: r[0].bgOpa};
                callback({code: 0, data: response});
            } else {
                callback({code: -1});
            }
        })
    }
};

const getVchatInfo = (callback) => { // 获取vchat官方账号信息
    baseList.users.find({name: 'Vchat'}).then(r => {
        if (r.length) {
            callback({code: 0, data: {name: r[0].name, photo: r[0].photo, nickname: r[0].nickname, signature: r[0].signature, id: r[0]._id}});
        } else {
            callback({code: -1});
        }
    })
};

const getUserDetail = (userName, callback) => { // 获取登录用户详细信息
    baseList.users.find({name: userName}).then(r => {
        if (r.length) {
            callback({code: 0, data: { nickname: r[0].nickname, signature: r[0].signature, sex: r[0].sex, phone: r[0].phone, email: r[0].email, province: r[0].province, city: r[0].city, town: r[0].town}});
        } else {
            callback({code: -1});
        }
    })
};

const addConversitionList = (userName, params, callback) => { // 添加会话
    baseList.users.update({name: userName}, {$push: {conversationsList: params}}).then(raw => {
        if (raw.nModified > 0) {
            callback({code: 0});
        } else {
            callback({code: -1});
        }
    });
};

const removeConversitionList = (userName, params, callback) => { // 删除会话
    baseList.users.update({name: userName}, {$pull: {conversationsList: {id: params.id}}}).then(raw => {
        if (raw.nModified > 0) {
            callback({code: 0});
        } else {
            callback({code: -1});
        }
    });
};

const huntFriends = (params, callback) => { // 获取登录用户详细信息
    let key = new RegExp(params.key);
    let arr = [];
    params.type === '2' ? arr = [{'nickname': {'$regex': key, $options: '$i'}}] : arr = [{
        'code': {
            '$regex': key,
            $options: '$i'
        }
    }];
    baseList.users.count(
        {
            $or: arr
        },
        (err, count) => {
            if (count > 0) {
                baseList.users.find(
                    {
                        $or: arr,
                        name: {'$ne': 'Vchat'}
                    },
                    {
                        nickname: 1,
                        photo: 1,
                        signature: 1
                    }
                )
                    .skip((params.offset - 1) * params.limit)
                    .limit(params.limit)
                    .sort({'name': 1})
                    .then(r => {
                        callback({code: 0, data: r, count: count});
                    }).catch(err => {
                    console.log(err);
                    callback({code: -1});
                });
            } else {
                callback({code: 0, data: [], count: 0});
            }
        });
};
module.exports = {
    getUser,
    login,
    upUserInfo,
    signUp,
    getUserInfo,
    getUserDetail,
    getVchatInfo,
    addConversitionList,
    removeConversitionList,
    huntFriends
};