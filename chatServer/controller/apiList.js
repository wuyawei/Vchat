const initModel = require("../model/init.js"); // 初始化数据库表
const initUser = (req,res) => {
    initModel.initUser((result) => { // 初始化user表
        res.json({
            code : 0,
            data : result['_id']
        })
    })
};
const initRoom = (req,res) => {
    initModel.initRoom((result) => { // 初始化user表
        res.json({
            code : 0,
            data : result['_id']
        })
    })
};
const initMessage = (req,res) => {
    initModel.initMessage((result) => { // 初始化user表
        res.json({
            code : 0,
            data : result['_id']
        })
    })
};

module.exports = {
    initUser
};