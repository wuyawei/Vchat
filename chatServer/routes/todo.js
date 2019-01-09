/**
 * Created by wyw on 2019/1/9.
 */

const api = require('../controller/apiList');
let express = require('express');
let router = express.Router();

router.post('/getTodoList', api.getTodoList); // 查找日程
router.post('/addTodo', api.addTodo); // 添加日程
router.post('/upTodo', api.upTodo); // 更新日程
router.post('/delTodo', api.delTodo); // 删除日程

module.exports = router;