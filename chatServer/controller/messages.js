/**
 * Created by wyw on 2018/10/11.
 */
const apiModel = require("../model/apiModel");

const saveMessage = (params, callback) => {
    apiModel.saveMessage(params, callback);
};

module.exports = {
    saveMessage
};