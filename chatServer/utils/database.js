//连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chat');//升级后必须带的,表示客户端去连接服务器
// { useMongoClient: true }
mongoose.Promise = global.Promise; //node里有global的全局变量，让mongose里默认的Promise使用node里的Promise,让mongoose也能用node的语法
module.exports = mongoose;