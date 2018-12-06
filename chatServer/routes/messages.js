/**
 * Created by wyw on 2018/12/6.
 */

const api = require('../controller/apiList');
let express = require('express');
let router = express.Router();

router.post('/removeMessage', api.removeMessage); // 新建群

module.exports = router;
