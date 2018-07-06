const api = require('../controller/apiList');
let express = require('express');
let router = express.Router();

router.get('/getUser', api.getUser); // 获取用户、测试接口
router.post('/login', api.login); // 注册

module.exports = router;
