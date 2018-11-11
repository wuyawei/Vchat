/**
 * Created by wyw on 2018/10/11.
 */
const apiModel = require("../model/apiModel");

const saveMessage = (params, callback) => {
    apiModel.saveMessage(params, callback);
};

const getHistoryMessages = (params, order, callback) => {
    apiModel.getHistoryMessages(params, order, callback);
};

const setReadStatus = (params) => {
    apiModel.setReadStatus(params);
};

const upMessage = (params, callback = function () {}) => {
    apiModel.upMessage(params, callback);
};

module.exports = {
    saveMessage,
    getHistoryMessages,
    setReadStatus,
    upMessage
};