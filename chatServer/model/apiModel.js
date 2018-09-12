const db = require('../utils/database');
const crypto = require('crypto'); // 加密

const md5 = pass => { // 避免多次调用MD5报错
    let md5 = crypto.createHash('md5');
    return md5.update(pass).digest("hex");
};

let users = db.model("users", { //Schema
    name: String,
    pass: String,
    photo: String,
    signature: { type: String, default: '这个人很懒，暂时没有签名哦！' },
    nickname: { type: String, default: 'vChat-' + Date.now()},
    email: String,
    phone: String,
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

const upTheme = (params, callback) => { //修改主题
    let {bubble, projectTheme, wallpaper, chatTheme} = params;
    let upParams = {};
    bubble ? upParams.bubble = bubble : '';
    projectTheme ? upParams.projectTheme = projectTheme : '';
    wallpaper ? upParams.wallpaper = wallpaper : '';
    chatTheme ? upParams.chatTheme = chatTheme : '';
    users.update({name: params.name}, upParams).then(raw => {
        if (raw.nModified > 0) {
            callback({code: 0});
        } else {
            callback({code: -1});
        }
    });
};

const signUp = (params, callback) => { // 注册
    users.find({name: params.name}).then(r => {
        if (r.length) {
            callback({code: 1});
        } else {
            let pass = md5(params.pass);
            users.create({name: params.name, pass: pass, photo: ''}).then(r => {
                if (r['_id']) {
                    callback(r);
                } else {
                    callback({code: -1});
                }
            })
        }

    })
};

const getUserInfo = (params, callback) => { // 获取登录用户信息
    users.find({name: params}).then(r => {
        if (r.length) {
            callback({code: 0, data: {name: r[0].name, photo: r[0].photo}});
        } else {
            callback({code: -1});
        }
    })
};

let groups = db.model("groups", {
    title: String,
    desc: String,
    img: String
});

let groupUserSchema = new db.Schema({
    groupId: {
        type : db.Schema.ObjectId,
        ref : 'groups'
    },
    userId: {
        type : db.Schema.ObjectId,
        ref : 'users'
    },
    userName: { type: String },
    manager: { type: Number, default: 0 },
    holder: { type: Number, default: 0 }
});

groupUserSchema.statics = {
    findGroupByUserName:function(userName, callback){ // 通过用户名查找所在群聊列表
        return this
            .find({userName : userName}).populate('groupId')  // 关联查询
            .exec(callback)
    },
    findGroupUsersByGroupId:function(groupId, callback){ // 通过群id查找用户信息
        return this
            .find({groupId : groupId}).populate({path: 'userId', select: 'signature photo'})  // 关联查询
            .exec(callback)
    }
};

let groupUser = db.model("groupUser", groupUserSchema);

const createGroup = (params, callback) => { // 新建群
    groups.create({title: params.groupName, desc: params.groupDesc, img: params.groupImage}).then(r => {
        if (r['_id']) {
            users.find({name: params.userName}).then(rs => {
                if (rs.length) {
                    groupUser.create({userName: params.userName, userId: rs[0]._id, manager: 0, holder: 1, groupId: r['_id']}).then(res => { // 建群后创建群主
                        if (res['_id']) {
                            callback({code: 0, data: r});
                        } else {
                            groups.remove({'_id':r['_id']}, 1);
                            callback({code: -1});
                        }
                    });
                } else {
                    groups.remove({'_id':r['_id']}, 1);
                    callback({code: -1});
                }
            });
        } else {
            callback({code: -1});
        }
    })
};

const getMyGroup = (params, callback) => { // 查找我的群
    groupUser.findGroupByUserName(params.userName, (err, groups) => {
        if(err) {
            console.log(err);
        } else {
            callback({code: 0, data: groups})
        }
    })
};

const getGroupUsers = (params, callback) => { // 查找指定群聊成员
    groupUser.findGroupUsersByGroupId(params.groupId, (err, users) => {
        if(err) {
            console.log(err);
        } else {
            callback({code: 0, data: users})
        }
    })
};

module.exports = {
    getUser,
    login,
    upTheme,
    signUp,
    getUserInfo,
    createGroup,
    getMyGroup,
    getGroupUsers
};
