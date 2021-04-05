const express = require('express');
const socket = require('socket.io');
const app = express();

app.use(express.static('public'));

const server = app.listen(3000, (req, res) => {
  console.log('Server is running in port 3000....')
})

const io = socket(server);

// 解决跨域问题
io.transports = ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket'];
io.origins = '*:*';

io.on('connection', (socket) => {
  console.log('实现socket连接: ', socket.id);
  // 获取客户端发送的数据（chat）
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });
  // 广播消息
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  })
})
