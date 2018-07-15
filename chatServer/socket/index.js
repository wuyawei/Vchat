
const onconnection = (socket) => {
    console.log('启动了Socket.io');

    socket.on('login', (id, val) => {
        console.log('id', id);
        socket.to(id).emit('org', val);
    });
    socket.on('mes', (val) => {
        socket.broadcast.emit('mes', val);
        console.log('mess', val);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
};
module.exports = onconnection;