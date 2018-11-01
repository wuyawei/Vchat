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

let friendly = db.model("friendlies", friendlySchema); // friendly model

const findMyfriends = (params, callback) => { // 查找我的好友
    friendly.findFriendByUserM(params.userId).then(userM => {
        friendly.findFriendByUserY(params.userId).then(userY => {
            let data = [];
            userM.forEach(v => {
                data.push({
                    createDate: v.createDate,
                    nickname: v.userM.nickname,
                    photo: v.userM.photo,
                    signature: v.userM.signature
                })
            });
            userY.forEach(v => {
                data.push({
                    createDate: v.createDate,
                    nickname: v.userM.nickname,
                    photo: v.userM.photo,
                    signature: v.userM.signature
                })
            });
            callback({code: 0, data: data})
        })
    })
};

module.exports = {
    findMyfriends
};
