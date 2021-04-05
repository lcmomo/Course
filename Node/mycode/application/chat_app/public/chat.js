// 实现和服务端连接
const serverHost = 'http://localhost:3000'
// 解决跨域
// {transports:['websocket','xhr-polling','jsonp-polling']}
const socket = io.connect(serverHost, {transports:['websocket','xhr-polling','jsonp-polling']});
// 获取节点
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// 绑定事件
btn.addEventListener('click', () => {
  // 向服务端发送数据
  socket.emit('chat', { message: message.value, handle: handle.value });
  message.value = '';
});

message.addEventListener('keypress',()=>{
  socket.emit('typing', handle.value);
})

// 获取服务端传输的数据
socket.on('chat', (data) => {
  feedback.innerHTML = '',
  output.innerHTML += `<p><strong>${data.handle}: ${data.message}</strong></p>`
})

// 获取服务端广播事件
socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em> ${data} 正在输入 </em></p>`
})

