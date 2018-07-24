const apiModel = require("../model/apiModel");

// 0成功 -1失败
const getUser = (req,res) => {
    apiModel.getUser((r) => { // 获取用户
        res.json({
            code : 0,
            data : r
        })
    })
};

const login = (req, res) => {
    let params = req.body;
    apiModel.login(params, (r) => { // 登录
        if (r.code === 0) {
            res.json({
                code : 0,
                data : '登录成功'
            })
        } else {
            res.json({
                code : -1,
                data : '账号不存在或密码错误'
            })
        }
    })
};

const signUp = (req,res) => {
    let params = req.body;
    apiModel.signUp(params, (r) => { // 添加用户
        if (r.code === 1) {
            res.json({
                code : 1,
                data : '账号已存在'
            })
        } else if (r['_id']) {
            res.json({
                code : 0,
                data : r
            })
        } else {
            res.json({
                code : -1,
                data : '注册失败'
            })
        }
    })
};

module.exports = {
    getUser,
    login,
    signUp
};