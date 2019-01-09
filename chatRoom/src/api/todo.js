/**
 * Created by wyw on 2019/1/9.
 */
import fetch from './fetch';

export default {
    getTodoList() { // 查找日程
        return fetch.post('v/todo/getTodoList');
    },
    addTodo(params) { // 添加日程
        return fetch.post('v/todo/addTodo', params);
    },
    upTodo(params) { // 更新日程
        return fetch.post('v/todo/upTodo', params);
    },
    delTodo(params) { // 删除日程
        return fetch.post('v/todo/delTodo', params);
    }
}