const db = require('../utils/database');

let friendlySchema = new db.Schema({
    userM: {
        type : db.Schema.ObjectId,
        ref : 'users'
    },
    userY: {
        type : db.Schema.ObjectId,
        ref : 'users'
    },
    createDate: { type: Date, default: Date.now() }, // 加好友时间
});

friendlySchema.statics = {
    findFriendByUserM:function(userId, callback){ // 通过userM查找userY信息
        return this
            .find({userM: userId}).populate({path: 'userY', select: 'signature photo nickname'})  // 关联查询
            .exec(callback)
    },
    findFriendByUserY:function(userId, callback){ // 通过userM查找userY信息
        return this
            .find({userY: userId}).populate({path: 'userM', select: 'signature photo nickname'})  // 关联查询
            .exec(callback)
    }
};

let friendly = db.model("friendlies", friendlySchema); // friendly 创建的文档是 friendlies 坑！！！

const findMyfriends = (params, callback) => { // 查找我的好友
    friendly.findFriendByUserM(params.userId).then(userM => {
        friendly.findFriendByUserY(params.userId).then(userY => {
            let data = [];
            // 重新组合文档
            userM.forEach(v => {
                data.push({
                    createDate: v.createDate,
                    nickname: v.userY.nickname,
                    photo: v.userY.photo,
                    signature: v.userY.signature,
                    id: v.userY._id,
                    roomid: params.userId + '-' + v.userY._id
                })
            });
            userY.forEach(v => {
                data.push({
                    createDate: v.createDate,
                    nickname: v.userM.nickname,
                    photo: v.userM.photo,
                    signature: v.userM.signature,
                    id: v.userM._id,
                    roomid: v.userM._id + '-' + params.userId
                })
            });
            callback({code: 0, data: data})
        })
    })
};

const checkMyfriends = (params, callback) => { // 验证是否已加为好友
    let pr = {userM: params.userY, userY: params.userM};
    friendly.find(params).then(r => {
        if (r.length > 0) {
            callback({code: 0, data: true})
        } else {
            friendly.find(pr).then(r => {
                if (r.length > 0) {
                    callback({code: 0, data: true})
                } else {
                    callback({code: 0, data: false})
                }
            })
        }
    }).catch(err => {
        callback({code: -1, data: err})
    })
};

const addFriend = (params, callback) => { // 增加好友记录
    let pr = {
        userM: params.userM,
        userY: params.userY
    };
    friendly.find(pr).then(m => {
        friendly.find({
            userM: params.userY,
            userY: params.userM
        }).then(y => {
            if (!(m.length + y.length)) {
                friendly.create(pr).then(r => {
                    if (r['_id']) {
                        callback({code: 0});
                    } else {
                        callback({code: -1});
                    }
                })
            } else {
                callback({code: -3});
            }
        });
    });
};

module.exports = {
    findMyfriends,
    checkMyfriends,
    addFriend
};
