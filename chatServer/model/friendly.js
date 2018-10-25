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
    findFriendByUserId:function(userId, callback){ // 通过userM查找userY信息
        return this
            .find({userM : userId}).populate({path: 'userY', select: 'signature photo nickname'})  // 关联查询
            .exec(callback)
    }
};

let friendly = db.model("friendly", friendlySchema); // friendly model