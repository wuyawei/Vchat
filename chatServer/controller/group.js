/**
 * Created by wyw on 2018/9/25.
 */
const apiModel = require("../model/apiModel");

const createGroup = (req, res) => { // 新建群
    let params = req.body;
    params.userName = req.session.login;
    apiModel.createGroup(params, r => {
        if (r.code === 0) {
            res.json({
                code : 0,
                data : r.data['_id']
            });
        } else {
            res.json({
                code : -1,
                data : '创建失败'
            });
        }
    })
};

const getMyGroup = (req, res) => { // 查找我的群聊
    let params = {userName: req.session.login};
    apiModel.getMyGroup(params, r => {
        if (r.code === 0) {
            res.json({
                code : 0,
                data : r.data
            });
        } else {
            res.json({
                code : -1,
                data : '查询失败'
            });
        }
    })
};

const getGroupUsers = (req, res) => { // 查找指定群聊成员
    let params = req.body;
    apiModel.getGroupUsers(params, r => {
        if (r.code === 0) {
            res.json({
                code : 0,
                data : r.data
            });
        } else {
            res.json({
                code : -1,
                data : '查询失败'
            });
        }
    })
};

const huntGroups = (req, res) => { // 搜索聊天群（名称/code）
    let params = req.body;
    params.userName = req.session.login;
    apiModel.huntGroups(params, r => {
        if (r.code === 0) {
            res.json({
                code : 0,
                data : r.data,
                count: r.count
            });
        } else {
            res.json({
                code : -1,
                data : '查询失败'
            });
        }
    })
};

const getGroupInfo = (req, res) => { // 查找群详细信息
    let params = req.body;
    apiModel.getGroupInfo(params, r => {
        if (r.code === 0) {
            res.json({
                code : 0,
                data : r.data,
                users: r.users
            });
        } else {
            res.json({
                code : -1,
                data : '查询失败'
            });
        }
    })
};

const InsertGroupUsers = (params, callback) => {
    apiModel.InsertGroupUsers(params, callback);
};

module.exports = {
    createGroup,
    getMyGroup,
    getGroupUsers,
    huntGroups,
    getGroupInfo,
    InsertGroupUsers
};