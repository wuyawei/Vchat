const db = require('../utils/database.js'); // 初始化数据库表
const fs = require('fs');
const path = require('path');

let users = db.model("users",{ // 用户
    name: {type: String, unique: true},
    pass: String,
    code: {type: String, unique: true}, // 唯一的code
    photo: {type: String, default: '/img/picture.png'}, // 默认头像
    signature: { type: String, default: '这个人很懒，暂时没有签名哦！' },
    nickname: { type: String, default: 'vChat-' + Date.now()},
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    sex: { type: String, default: '3' }, // 0 男 1 女 3 保密
    bubble: { type: String, default: 'vchat' }, // 气泡
    chatTheme: { type: String, default: 'vchat' }, // 聊天主题
    projectTheme: { type: String, default: 'vchat' }, // 项目主题
    wallpaper: { type: String, default: 'vchat' }, // 聊天壁纸
    signUpTime: { type: Date, default: Date.now() }, // 注册时间
    lastLoginTime: { type: Date, default: Date.now() }, // 最后一次登录
    conversationsList: Array // 会话列表
});

const expression = db.model("expression", {
    name: String, // 表情包名称
    info: String, // 描述
    list: Array, // 表情列表
    code: Number // 编码
});

const initEmoji = (filePath, objs) => {
    //根据文件路径读取文件，返回文件列表
    let files = fs.readdirSync(filePath); // 异步转同步
    //遍历读取到的文件列表
    files.forEach((filename, i) => {
        //获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let states = fs.statSync(filedir); // 异步转同步
        let isFile = states.isFile();//是文件
        let isDir = states.isDirectory();//是文件夹
        if(isFile){
            if (filePath.slice(filePath.lastIndexOf('\\') + 1) === objs.name) {
                objs.list.push('/expression/' + objs.name + '/' + filename);
            }
            if (i === files.length -1) {
                console.log(objs);
                let expre = new expression(objs);
                expre.save();
            }
        }
        if(isDir){
            let obj = {
                name: filename,
                list: [],
                code: i + 1,
                info: filename
            };
            initEmoji(filedir, obj);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            // for (let k in obj) {
            //     let expre = new expression({
            //         name: k,
            //         list: obj[k]
            //     });
            //     expre.save();
            // }
        }
    });
};

const initUser = (callback) => {
    let user = new users({
        name: 'Vchat',
        pass: '111111',
        photo: '/img/vchat.png',
        signature: 'Vchat团队',
        nickname: 'Vchat官方推送',
        code: 666666
    });
    user.save().then((res) => {
        callback(res)
    })
};

module.exports = {
    initUser,
    initEmoji
};
