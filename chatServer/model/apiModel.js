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

module.exports = {
    getUser
};
