let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser'); // cookie
let bodyParser = require('body-parser'); // post请求需要的中间件
let session = require("express-session"); // session

let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

const api = require('./routes/api');
const user = require('./routes/user');
const group = require('./routes/group');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
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
app.use('/*', (req, res, next) => {
    if (req.session.login) {
        next();
    } else {
        if (req.originalUrl === '/user/login' || req.originalUrl === '/user/signUp') {
            next();
        } else {
            res.json({
                status: 0
            });
        }
    }
});
app.use('/api', api);
app.use('/user', user);
app.use('/group', group);

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
        socket.join(val.roomid, () => {
            OnlineUser[val.name] = socket.id;
            io.in(val.roomid).emit('joined', OnlineUser); // 包括发送者
            console.log('join', val.roomid, OnlineUser);
        });
    });
    socket.on('leave', (val) => {
        socket.leave(val.roomid, () => {
            delete OnlineUser[val.name];
            socket.to(val.roomid).emit('leaved', OnlineUser);
            console.log('leave', val.roomid, OnlineUser);
        });
    });
    socket.on('mes', (val) => {
        apiList.saveMessage(val);
        socket.to(val.roomid).emit('mes', val);
    });
    socket.on('getHistoryMessages', (pramas) => {
        apiList.getHistoryMessages(pramas, (res) => {
            if (res.code === 0) {
                console.log('socket.id', socket.id);
                socket.emit('getHistoryMessages', res.data); // 发送给发送者（当前客户端）
            } else {
                console.log('查询历史记录失败');
            }
        });
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
