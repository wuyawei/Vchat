const OnlineUser = {};
const api = require('../controller/apiList');
const onconnection = (socket) => {
    console.log('启动了Socket.io');

    socket.on('join', (val) => {
        socket.join(val.roomid, () => {
            OnlineUser[val.name] = socket.id;
            socket.to(val.roomid).emit('joined', OnlineUser);
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
        api.saveMessage(val);
        socket.to(val.roomid).emit('mes', val);
    });
    socket.on('getHistoryMessages', (pramas) => {
        api.getHistoryMessages(pramas, (res) => {
            if (res.code === 0) {
                io.in(pramas.roomid).emit('getHistoryMessages', res.data); // 包括发送者
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
        console.log('user disconnected', OnlineUser);
    });
};
module.exports = onconnection;