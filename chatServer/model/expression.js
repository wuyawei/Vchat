const db = require('../utils/database');

let expression = db.model("expression", {
    name: String, // 表情包名称
    info: String, // 描述
    list: Array // 表情列表
});

module.exports = {
};