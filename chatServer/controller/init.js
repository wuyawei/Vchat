const initModel = require("../model/init.js"); // 初始化数据库表
const account = require("../utils/accountBase"); // 初始化数据库表
let db = {
    initUser() {
        initModel.initUser();
    },
    initEmoji() { // 初始化表情包
        initModel.initEmoji('./public/expression');
    },
    initAccount() {
        account.initAccount();
    },
    init() {
        this.initUser();
        this.initEmoji();
        this.initAccount();
    }
};

// db.initUser();
// db.initEmoji('../public/expression');
module.exports = db;