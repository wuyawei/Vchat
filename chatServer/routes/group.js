/**
 * Created by wyw on 2018/9/25.
 */

const api = require('../controller/apiList');
let express = require('express');
let router = express.Router();

router.post('/createGroup', api.createGroup); // 新建群
router.post('/getMyGroup', api.getMyGroup); // 查找我的群聊
router.post('/getGroupUsers', api.getGroupUsers); // 查找指定群聊成员
router.post('/huntGroups', api.huntGroups); // 搜索聊天群（名称/code）
router.post('/getGroupInfo', api.getGroupInfo);  // 查找群详细信息


module.exports = router;
