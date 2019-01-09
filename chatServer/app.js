let express = require('express');
let path = require('path');
let utils = require('./utils/utils');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser'); // cookie
let bodyParser = require('body-parser'); // post请求需要的中间件
let session = require("express-session"); // session
let proxy = require('http-proxy-middleware');
let compression = require('compression');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

const api = require('./routes/api');
const user = require('./routes/user');
const group = require('./routes/group');
const friend = require('./routes/friendly');
const expression = require('./routes/expression');
const messages = require('./routes/messages');
const todo = require('./routes/todo');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
let options = { // 解决静态资源跨域问题（或者使用cors模块）
    setHeaders: function (res, path, stat) {
        res.set('Access-Control-Allow-Origin', '*')
    }
};
app.use(express.static(path.join(__dirname, 'public'), options)); // 静态资源中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
// 后端解决跨域的方式 , 现选择前端代理
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });


app.use('^/api*', proxy({ // 配置代理转发
    target: "http://api.budejie.com",
    changeOrigin: true
}));
app.use('^/touch*', proxy({ // 配置代理转发
    target: "https://3g.163.com",
    changeOrigin: true
}));

app.use('/v*', (req, res, next) => {
    if (req.session.login) {
        next();
    } else {
        if (req.originalUrl === '/v/user/login' || req.originalUrl === '/v/user/signUp') {
            next();
        } else {
            res.json({
                status: 0
            });
        }
    }
});
app.use('/v/api', api);
app.use('/v/user', user);
app.use('/v/group', group);
app.use('/v/friend', friend);
app.use('/v/expre', expression);
app.use('/v/mes', messages);
app.use('/v/todo', todo);

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/index.html');
});

// io.in(pramas.roomid).emit('getHistoryMessages', res.data); // 包括发送者
// socket.to(val.roomid).emit('joined', OnlineUser); // 不包括发送者
const OnlineUser = {};
const apiList = require('./controller/apiList');
const onconnection = (socket) => {
    console.log('启动了Socket.io');

    socket.on('join', (val) => {
        // if (OnlineUser[val.name]) {
        //     console.log('yijiaru', val.name);
        //     return;
        // }
        socket.join(val.roomid, () => {
            console.log('加入了', val.name);
            OnlineUser[val.name] = socket.id;
            io.in(val.roomid).emit('joined', OnlineUser); // 包括发送者
            // console.log('join', val.roomid, OnlineUser);
        });
    });
    socket.on('leave', (val) => {
        delete OnlineUser[val.name];
        console.log('leave', OnlineUser);
        socket.leave(val.roomid, () => {
            socket.to(val.roomid).emit('leaved', OnlineUser);
            // console.log('leave', val.roomid, OnlineUser);
        });
    });
    socket.on('mes', (val) => { // 聊天消息
        apiList.saveMessage(val);
        console.log('OnlineUser', val.roomid);
        socket.to(val.roomid).emit('mes', val);
    });
    socket.on('getHistoryMessages', (pramas) => { // 获取历史消息
        apiList.getHistoryMessages(pramas, 1, (res) => { // 1 正序
            if (res.code === 0) {
                socket.emit('getHistoryMessages', res.data); // 发送给发送者（当前客户端）
            } else {
                console.log('查询历史记录失败');
            }
        });
    });

    socket.on('getSystemMessages', (pramas) => { // 获取历史消息
        apiList.getHistoryMessages(pramas, -1, (res) => { // -1 倒序
            if (res.code === 0) {
                socket.emit('getSystemMessages', res.data); // 发送给发送者（当前客户端）
            } else {
                console.log('查询vchat历史记录失败');
            }
        });
    });

    socket.on('agreeValidate', (val) => { // 同意好友或加群申请
        if (val.state === 'group') { // 群聊验证
            apiList.InsertGroupUsers(val, r => {
                if (r.code === -1) {
                    console.log('加入群聊失败');
                } else if (r.code === -2) {
                    console.log('更新群成员数量失败');
                } else if (r.code === -3) {
                    console.log('群成员已存在');
                } else if (r.code === 0) {
                    let pr = {
                        status: '1',
                        userM: val['userM']
                    };
                    apiList.setMessageStatus(pr);
                    // 通知申请人验证已同意
                    let value = {
                        name: '',
                        mes: val.userYname + '同意你加入' + val.groupName + '!',
                        time: utils.formatTime(new Date()),
                        avatar: val.userYphoto,
                        nickname: val.userYname,
                        groupName: val.groupName,
                        groupId: val.groupId,
                        groupPhoto: val.groupPhoto,
                        read: [],
                        status: '1', // 同意
                        state: 'group',
                        type: 'info',
                        roomid: val.userM + '-' + val.roomid.split('-')[1]
                    };
                    apiList.saveMessage(value); // 保存通知消息
                    let params = {
                        name: val.groupName,
                        photo: val.groupPhoto,
                        id: val.groupId,
                        type: 'group'
                    };
                    apiList.ServeraddConversitionList(val.name, params, () => {
                        socket.to(value.roomid).emit('takeValidate', value);
                        // 通知群聊
                        let org = {
                            type: 'org',
                            nickname: val.nickname,
                            time: utils.formatTime(new Date()),
                            roomid: val.groupId
                        };
                        apiList.saveMessage(org); // 保存通知消息
                        socket.to(org.roomid).emit('org', org);
                    }); // 添加到申请人会话列表
                }
            });
        } else if (val.state === 'friend') { // 写入好友表
            apiList.addFriend(val, r => {
                if (r.code === 0) {
                    let pr = {
                        status: '1',
                        userM: val['userM']
                    };
                    apiList.setMessageStatus(pr);
                    // 通知申请人验证已同意
                    let value = {
                        name: '',
                        mes: val.userYname + '同意了你的好友请求！',
                        time: utils.formatTime(new Date()),
                        avatar: val.userYphoto,
                        nickname: val.userYname,
                        read: [],
                        state: 'friend',
                        type: 'info',
                        status: '1', // 同意
                        roomid: val.userM + '-' + val.roomid.split('-')[1]
                    };
                    apiList.saveMessage(value); // 保存通知消息
                    let userMparams = { // 申请人信息
                        name: val.nickname,
                        photo: val.avatar,
                        id: val.friendRoom,
                        type: 'friend'
                    };
                    let userYparams = { // 好友信息
                        name: val.userYname,
                        photo: val.userYphoto,
                        id: val.friendRoom,
                        type: 'friend'
                    };
                    apiList.ServeraddConversitionList(val.name, userYparams, () => {
                        apiList.ServeraddConversitionList(val.userYloginName, userMparams, () => {
                            socket.to(value.roomid).emit('takeValidate', value);
                            socket.emit('ValidateSuccess', 'ok');
                        }); // 添加到自己会话列表
                    }); // 添加到申请人会话列表
                }else {
                    console.log('添加好友失败');
                }
            });
        }
    });

    socket.on('refuseValidate', (val) => { // 拒绝申请
        let pr = {
            status: '2',
            _id: val['_id']
        };
        apiList.upMessage(pr);
        // console.log('refuseValidate', val);
        if (val.state === 'group') {
            let value = {
                name: '',
                mes: val.userYname + '拒绝了你加入 ' + val.groupName + ' 的申请!',
                time: utils.formatTime(new Date()),
                avatar: val.userYphoto,
                nickname: val.userYname,
                groupName: val.groupName,
                read: [],
                state: 'group',
                type: 'info',
                status: '-1', // 拒绝
                roomid: val.userM + '-' + val.roomid.split('-')[1]
            };
            apiList.saveMessage(value); // 保存通知消息
            socket.to(value.roomid).emit('takeValidate', value);
        } else if (val.state === 'friend') {
            let value = {
                name: '',
                mes: val.userYname + '拒绝了你的好友请求！',
                time: utils.formatTime(new Date()),
                avatar: val.userYphoto,
                nickname: val.userYname,
                read: [],
                state: 'friend',
                status: '-1', // 拒绝
                type: 'info',
                roomid: val.userM + '-' + val.roomid.split('-')[1]
            };
            // console.log('saveMessage', value);
            apiList.saveMessage(value); // 保存通知消息
            socket.to(value.roomid).emit('takeValidate', value);
        }
        // 通知申请人验证已拒绝
    });

    socket.on('setReadStatus', (params) => { // 已读状态
        apiList.setReadStatus(params);
    });
    socket.on('sendValidate', (val) => { // 发送验证消息
        apiList.saveMessage(val);
        socket.to(val.roomid).emit('takeValidate', val);
    });
    socket.on('disconnect', () => {
        let k;
        for (k in OnlineUser) {
            if (OnlineUser[k] === socket.id) {
                delete OnlineUser[k];
            }
        }
        socket.broadcast.emit('leaved', OnlineUser); // 广播通知该客户端下线
        console.log('user disconnected', OnlineUser);
    });
};
io.on('connection', onconnection);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

server.listen(9988, () => {
    console.log('服务器在9988启动')
});
