
const apiModel = require("../model/apiModel");

const findMyfriends = (req, res) => { // 查找我的好友
    let params = req.body;
    apiModel.findMyfriends(params, r => {
        if (r.code === 0) {
            res.json({
                code : 0,
                data : r.data
            });
        } else {
            res.json({
                code : -1,
                data : '查找失败'
            });
        }
    });
};

const checkMyfriends = (req, res) => { // 验证是否已加为好友
    let params = req.body;
    apiModel.checkMyfriends(params, r => {
        res.json(r);
    });
};

const addFriend = (params, callback) => { // 验证是否已加为好友
    apiModel.addFriend(params, callback);
};

module.exports = {
    findMyfriends,
    checkMyfriends,
    addFriend
};
