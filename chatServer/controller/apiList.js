let users = require('./user');
let groups = require('./group');
let {
    getUser,
    login,
    upUserInfo,
    signUp,
    loginOut,
    getUserInfo,
    getUserDetail
} = users;
let {
    createGroup,
    getMyGroup,
    getGroupUsers
} = groups;

module.exports = {
    getUser,
    login,
    upUserInfo,
    signUp,
    loginOut,
    getUserInfo,
    getUserDetail,
    createGroup,
    getMyGroup,
    getGroupUsers
};
