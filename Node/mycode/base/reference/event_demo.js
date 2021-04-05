// 引入模块
const EventEmitter = require('events');

// 创建MyEmitter类
class MyEmitter extends EventEmitter{}

// 实例化对象
const myEmitter = new MyEmitter();

// 注册事件
myEmitter.on('event',(msg)=> {
    setImmediate(() => {
        console.log(msg);
      });
})

// 触发事件
myEmitter.emit('event','实现事件并传递此参数到注册事件的回调函数中');

console.log(1);