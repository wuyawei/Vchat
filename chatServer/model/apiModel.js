const db = require('../utils/database');

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
            callback({code: 1});
        } else {
            users.create({name: params.name}).then(r => {
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
    login
};
