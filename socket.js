const socketIo = require('socket.io');
const httpServer = require('./app.js');

const io = socketIo(httpServer);

io.on('connection', (sock) => {
  console.log(sock.id, '님이 연결 되었습니다.');


  sock.on('disconnect', () => {
    console.log(sock.id, '님의 연결이 끊어졌습니다.');
  })
});