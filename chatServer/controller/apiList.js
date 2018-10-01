let users = require('./user');
let groups = require('./group');

module.exports = {
    ...users,
    ...groups
};
