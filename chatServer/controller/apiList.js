let users = require('./user');
let groups = require('./group');
let messages = require('./messages');
let friendly = require('./friendly');

module.exports = {
    ...users,
    ...groups,
    ...messages,
    ...friendly
};
