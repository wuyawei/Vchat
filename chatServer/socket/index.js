
const onconnection = (socket) => {
    console.log('启动了Socket.io');

    socket.on('join', (val) => {
        console.log('join', val);
        socket.join(val.roomid, () => {
            let rooms = Object.keys(socket.rooms);
            console.log('rooms', rooms);
            socket.to(val.roomid).emit('joined', val);
        });
    });
    socket.on('mes', (val) => {
        socket.broadcast.emit('mes', val);
        console.log('mes', val);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
};
module.exports = onconnection;