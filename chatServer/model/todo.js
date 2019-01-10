/**
 * Created by wyw on 2019/1/9.
 */
const db = require('../utils/database');
let todo = db.model("todo", {
    title: String, // 活动名称
    address: String, // 活动地点
    content: String, // 内容
    start: { type: Date, default: Date.now() }, // 开始时间
    end: { type: Date, default: Date.now() }, // 结束时间
    userName: String, // 用户名
    way: String // 活动提醒方式
});

const getTodoList = (params, callback) => { // 查找我的日程
    todo.find(params).then(r => {
        callback({code: 0, data: r});
    }).catch(err => {
        callback({code: -1, data: '查找失败'});
    })
};

const addTodo = (params, callback) => { // 新增日程
    todo.create(params).then(r => {
        if (r['_id']) {
            callback({code: 0, data: r['_id']});
        } else {
            callback({code: -1, data: '添加失败'});
        }
    }).catch(err => {
        callback({code: -1, data: '添加失败'});
    })
};

const upTodo = (params, callback) => { // 编辑日程
    todo.update({'_id': params['_id']}, params).then(raw => {
        if (raw.nModified > 0) {
            callback({code: 0});
        } else {
            callback({code: -1});
        }
    }).catch(err => {
        callback({code: -1, data: '编辑失败'});
    })
};

const delTodo = (params, callback) => { // 删除日程
    todo.remove({'_id': params['_id']}).then(r => {
        if (r.n > 0) {
            callback({code: 0, data: r});
        } else {
            callback({code: -1, data: '删除失败'});
        }
    }).catch(err => {
        callback({code: -1, data: '删除失败'});
    })
};

module.exports = {
    getTodoList,
    addTodo,
    upTodo,
    delTodo
};