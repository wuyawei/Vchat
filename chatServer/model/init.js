const db = require('../utils/database.js'); // 初始化数据库表

let users = db.model("users",{ // user
    name: String,
    pass: String
});

const inituser = (callback) => {
    let user = new users({
        name: 'admin',
        pass: '123456'
    });
    user.save().then((res) => {
        callback(res)
    })
};

module.exports = {
    inituser
};
