const apiModel = require("../model/apiModel");

// 0成功 -1失败
const getUser = (req,res) => {
    apiModel.getUser((result) => { // 获取用户
        res.json({
            code : 0,
            data : result
        })
    })
};

module.exports = {
    getUser
};