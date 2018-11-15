/**
 * Created by wyw on 2018/11/1.
 */

const api = require('../controller/apiList');
let express = require('express');
let router = express.Router();

router.post('/getExpression', api.getExpression); // 获取表情库


module.exports = router;