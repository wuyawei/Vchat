const initModel = require("../model/init.js"); // 初始化数据库表
const inituser = (req,res) => {
    initModel.inituser((result) => { // 初始化user表
        res.json({
            code : 0,
            data : result['_id']
        })
    })
};

module.exports = {
    inituser
};