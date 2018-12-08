/**
 * Created by wyw on 2018/10/11.
 */
const apiModel = require("../model/apiModel");

const saveMessage = (params, callback) => {
    apiModel.saveMessage(params, callback);
};

const removeMessage = (req, res) => { // 删除消息
    let params = req.body;
    apiModel.removeMessage(params, r => {
        if (r.code === 0) {
            res.json({
                code : 0,
                data : '删除成功'
            })
        } else {
            res.json({
                code : -1,
                data : '删除失败'
            })
        }
    })
};

const getHistoryMessages = (params, reverse, callback) => {
    apiModel.getHistoryMessages(params, reverse, callback);
};

const loadMoreMessages = (req, res) => { // 加载更多消息
    let params = req.body;
    apiModel.getHistoryMessages(params, 2, r => {
        if (r.code === 0) {
            res.json(r);
        } else {
            res.json({
                code : -1,
                data : '获取失败'
            })
        }
    })
};

const setReadStatus = (params) => {
    apiModel.setReadStatus(params);
};

const setMessageStatus = (params) => {
    apiModel.setMessageStatus(params);
};

const upMessage = (params, callback = function () {}) => {
    apiModel.upMessage(params, callback);
};

module.exports = {
    saveMessage,
    getHistoryMessages,
    setReadStatus,
    upMessage,
    removeMessage,
    setMessageStatus,
    loadMoreMessages
};