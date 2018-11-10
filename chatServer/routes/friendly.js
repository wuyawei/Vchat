/**
 * Created by wyw on 2018/11/1.
 */

const api = require('../controller/apiList');
let express = require('express');
let router = express.Router();

router.post('/findMyfriends', api.findMyfriends); // 查找我的好友
router.post('/checkMyfriends', api.checkMyfriends); // 验证是否已加为好友


module.exports = router;