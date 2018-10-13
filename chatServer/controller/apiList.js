let users = require('./user');
let groups = require('./group');
let messages = require('./messages');

module.exports = {
    ...users,
    ...groups,
    ...messages
};
