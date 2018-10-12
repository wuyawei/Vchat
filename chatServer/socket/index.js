const OnlineUser = {};
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
        socket.to(val.roomid).broadcast.emit('mes', val);
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