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
let onconnection = require('./socket');

let api = require('./routes/api');

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
        if (req.originalUrl === '/api/login' || req.originalUrl === '/api/signUp') {
            next();
        } else {
            res.json({
                status: 0
            });
        }
    }
});
app.use('/api', api);

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/index.html');
});

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
