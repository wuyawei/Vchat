/**
 * Created by wyw on 2018/9/25.
 */
let api = require('../controller/apiList');

let express = require('express');
let router = express.Router();

router.get('/getUser', api.getUser); // 获取用户、测试接口
router.post('/login', api.login); // 登录
router.post('/signUp', api.signUp); // 注册
router.post('/upUserInfo', api.upUserInfo); // 修改个人信息、主题等
router.post('/loginOut', api.loginOut); // 退出
router.post('/getUserInfo', api.getUserInfo); // 登录状态获取用户信息
router.post('/getUserDetail', api.getUserDetail); // 登录状态获取用户详细信息
router.post('/getVchatInfo', api.getVchatInfo); // 获取vchat官方账号信息
router.post('/addConversitionList', api.addConversitionList); // 添加会话
router.post('/removeConversitionList', api.removeConversitionList); // 移除会话
router.post('/huntFriends', api.huntFriends); // 搜索好友

module.exports = router;
