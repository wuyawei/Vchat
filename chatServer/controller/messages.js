/**
 * Created by wyw on 2018/10/11.
 */
const apiModel = require("../model/apiModel");

const saveMessage = (params, callback) => {
    apiModel.saveMessage(params, callback);
};

const getHistoryMessages = (params, callback) => {
    apiModel.getHistoryMessages(params, callback);
};

const setReadStatus = (params) => {
    apiModel.setReadStatus(params);
};

module.exports = {
    saveMessage,
    getHistoryMessages,
    setReadStatus
};