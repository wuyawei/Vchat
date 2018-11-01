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
                    id: v.userY._id
                })
            });
            userY.forEach(v => {
                data.push({
                    createDate: v.createDate,
                    nickname: v.userM.nickname,
                    photo: v.userM.photo,
                    signature: v.userM.signature,
                    id: v.userM._id
                })
            });
            callback({code: 0, data: data})
        })
    })
};

module.exports = {
    findMyfriends
};
