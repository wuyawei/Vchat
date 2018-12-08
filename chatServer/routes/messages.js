/**
 * Created by wyw on 2018/12/6.
 */

const api = require('../controller/apiList');
let express = require('express');
let router = express.Router();

router.post('/removeMessage', api.removeMessage); // 删除消息
router.post('/loadMoreMessages', api.loadMoreMessages); // 加载更多消息

module.exports = router;
