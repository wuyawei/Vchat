const db = require('../utils/database');
const crypto = require('crypto'); // 加密
const md5 = pass => { // 避免多次调用MD5报错
    let md5 = crypto.createHash('md5');
    return md5.update(pass).digest("hex");
};

let users = db.model("users", {
    name: String,
    pass: String,
    photo: String
});
const getUser = (callback) => {
    users.find().then(r => {
        callback(r);
    })
};
const login = (params, callback) => {
    users.find({name: params.name}).then(r => {
        if (r.length) {
            let pass = md5(params.pass);
            if (r[0]['pass'] === pass) {
                callback({code: 0, data: {name: r[0].name, photo: r[0].photo}});
            } else {
                callback({code: -1});
            }
        } else {
            callback({code: -1});
        }

    })
};
const signUp = (params, callback) => {
    users.find({name: params.name}).then(r => {
        if (r.length) {
            callback({code: 1});
        } else {
            let pass = md5.update(params.pass).digest("hex");
            users.create({name: params.name, pass: pass}).then(r => {
                if (r['_id']) {
                    callback(r);
                } else {
                    callback({code: -1});
                }
            })
        }

    })
};

module.exports = {
    getUser,
    login,
    signUp
};
