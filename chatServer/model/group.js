/**
 * Created by wyw on 2018/9/25.
 */
const db = require('../utils/database');
const baseList = require('./baseList');
let groups = db.model("groups", {
    title: String,
    desc: String,
    img: String,
    code: String,
    userNum: Number, // 群成员数量，避免某些情况需要多次联表查找，如搜索；所以每次加入一人，数量加一
    createDate: { type: Date, default: Date.now() }, // 建群时间
    grades: { type: String, default: 'V1' }, // 群等级，备用
    holderName: String // 群主账号
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
    holder: { type: Number, default: 0 },
    card: String // 群名片
});

groupUserSchema.statics = {
    findGroupByUserName:function(userName, callback){ // 通过用户名查找所在群聊列表
        return this
            .find({userName : userName})
            .populate('groupId')  // 关联查询
            .exec(callback)
    },
    findGroupUsersByGroupId:function(groupId, callback){ // 通过群id查找用户信息
        return this
            .find({groupId : groupId})
            .populate({path: 'userId', select: 'signature photo nickname'})  // 关联查询
            .exec(callback)
    }
};

let groupUser = db.model("groupUser", groupUserSchema); // groupUser model

const createGroup = (params, callback) => { // 新建群
    function createfun(code) {
        groups.create({title: params.groupName, desc: params.groupDesc, img: params.groupImage, code: code, userNum: 1, holderName: params.userName}).then(r => {
            if (r['_id']) {
                baseList.users.find({name: params.userName}).then(rs => { // 查询userId  loginname 无法关联查询
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
    }
    function fineOneAccountBase(createfun) { // 号码池查找code
        let rand = Math.random();
        baseList.accountBase.findOneAndUpdate({type: '2', status: '0', random : { $gte : rand }}, {status: '1'}, (err, doc) => {
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
};

const getMyGroup = (params, callback) => { // 查找我的群
    groupUser.findGroupByUserName(params.userName, (err, groups) => {
        if(err) {
            console.log(err);
            callback({code: -1, data: err});
        } else {
            callback({code: 0, data: groups})
        }
    })
};

const getGroupUsers = (params, callback) => { // 查找指定群聊成员
    groupUser.findGroupUsersByGroupId(params.groupId, (err, users) => {
        if(err) {
            console.log(err);
            callback({code: -1, data: err});
        } else {
            callback({code: 0, data: users})
        }
    })
};

// $equals 等于 ／ $gt 大于 ／ $gte 大于等于 ／ $lt 小余 ／ $lte 小余等于 ／ $ne 不等于 ／ $in 在数组中 ／ $nin 不在数组中 // $option的$i表示忽略大小写
const huntGroups = (params, callback) => { // 搜索聊天群（名称/code）
    let ids = [];
    groupUser.findGroupByUserName(params.userName, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            res.forEach(v => {
                ids.push(v.groupId['_id']);
            });
            let key = new RegExp(params.key);
            let arr = [];
            params.type === '2' ? arr = [{'title': {'$regex': key, $options: '$i'}}] : arr = [{'code': {'$regex': key, $options: '$i'}}];
            groups.count(
                {
                    $or: arr,
                    '_id': { $nin: ids} // 搜索时排除用户已加入的群
                }, (err, count) => {
                    if (count > 0) {
                        groups.find(
                            {
                                $or: arr,
                                '_id': { $nin: ids}
                            }
                        )
                        .skip((params.offset - 1) * params.limit)
                        .limit(params.limit)
                        .sort({'title':1})
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
        }
    });
};

const getGroupInfo = (params, callback) => { // 查找群详细信息
    groups.find({'_id': params.groupId}).then(r => {
        if (r.length) {
            groupUser.findGroupUsersByGroupId(params.groupId, (err, users) => {
                if(err) {
                    console.log(err);
                } else {
                    callback({code: 0, data: r[0], users: users})
                }
            })
        } else {
            callback({code: -1})
        }
    });
};

const InsertGroupUsers = (params, callback) => { // 添加新成员 userNum + 1  $inc 增加或减少
    let val = {
        groupId: params.groupId,
        userName: params.name,
        userId: params.userM
    };
    groupUser.find({groupId: params.groupId, userId: params.userM}).then(res => {
        if (!res.length) {
            groupUser.create(val).then(r => {
                if (r['_id']) {
                    groups.update({'_id': params.groupId}, { $inc : { "userNum" : 1}}).then(raw => {
                        if (raw.nModified > 0) {
                            callback({code: 0});
                        } else {
                            groupUser.deleteOne({'_id': r['_id']});
                            callback({code: -2});
                        }
                    });
                } else {
                    callback({code: -1});
                }
            });
        } else {
            callback({code: -3});
        }
    });

};

module.exports = {
    createGroup,
    getMyGroup,
    getGroupUsers,
    huntGroups,
    getGroupInfo,
    InsertGroupUsers
};
