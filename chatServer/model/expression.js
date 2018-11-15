const db = require('../utils/database');

let expression = db.model("expression", {
    name: String, // 表情包名称
    info: String, // 描述
    list: Array // 表情列表
});

const getExpression = (params, callback) => {
    expression.find().then(r => {
        callback({code: 0, data: r});
    }).catch(err => {
        console.log(err);
        callback({code: -1})
    })
};

module.exports = {
    getExpression
};