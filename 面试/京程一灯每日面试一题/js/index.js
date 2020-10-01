// day 1:
// 写出下面代码执行结果
// console.log(1);

// setTimeout(() => {

//   console.log(2);
//   process.nextTick(() => {
//     console.log(3);
//   });

//   new Promise((resolve) => {
//     console.log(4);
//     resolve();
//   }).then(() => {
//     console.log(5);
//   });

// });

// new Promise((resolve) => {
  
//   console.log(7);
//   resolve();
// }).then(() => {
//   console.log(8);
// });

// process.nextTick(() => {
//   console.log(6);
// });

// setTimeout(() => {

//   console.log(9);

//   process.nextTick(() => {
//     console.log(10);

//   });
//   new Promise((resolve) => {

//     console.log(11);
//     resolve();
//   }).then(() => {
//     console.log(12)
//   });
// });

// 答案
// node < 11:
// 1 7 6 8 2 4 9 11 3 10 5 12
// //node 》=11

// 1 7 6 8 2 4 3 5 9 11 10 12

// 解析
// 宏任务和微任务

//  .宏任务: macrotask,包括setTimeout、

// setInerVal、setlmmediate(node独有 )、

// requestAnimationFrame(浏览器独有)、

// I/O、UI rendering(浏览器独有)

//  .微任务: microtask,包括

// process.nextTick(Node独有)、

// Promise.then()、Object.observe、

// MutationObserver

// .Promise构造函数中的代码是同步执行的，newPromise() 构造函数中的代码是同步代码，并不是微任务

// .Node.js中的EventLoop执行宏队列的回调任务有6个阶段

// .. 1. timers阶段:这个阶段执行setTimeout和setInterval预定的callback

// .. 2. I/O callback阶段:执行除了close事件的callbacks、被timers设定的callbacks、setlmmediate()设定的callbacks这些之外的callbacks

// .. 3. idle, prepare阶段:仅node内部使用

// .. 4. poll阶段:获取新的I/O事件， 适当的条件下node将阻塞在这里

// .. 5. check阶段:执行setlmmediate()设定的callbacks

// .. 6. close callbacks 阶段:执行socket.on('close', ..这些callbacks



// .NodeJs中宏队列主要有4个

// 1. Timers Queue

// 2. IO Calbacks Queue

// 3. Check Queue

// 4. Close Callbacks Queue


// . 这4个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的macrotask都会被加到这一个宏队列中，但是在NodeJS中，不同的macrotask会被放置在不同的宏队列中。

//  .NodeJS中微队列主要有2个

// 1. Next Tick Queue:是放置process.nextTick(callback)的回调任务的

// 2. Other Micro Queue :放置其他microtask,比如Promise等

// .在浏览器中，也可以认为只有一个微队列，所有的microtask都会被加到这一个微队列中，但是在NodeJS中，不同的microtask会被放置在不同的微队列中。


// .Node.js中的EventLoop过程

//   1. 执行全局Script的同步代码

//   2. 执行microtask微任务，先执行所有NextTick Queue中的所有任务，再执行Other Microtask Queue中的所有任务

//   3. 开始执行macrotask宏任务，共6个阶段，从第1个阶段开始执行相应每一一个阶段,macrotask中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的Event Loop中是只取宏队列的第-个任务出来执行，每一个阶段的macrotask任务 执行完毕后，开始执行微任务，也就是步骤2
  
//   4. Timers Queue ->步骤2 -> I/O Queue->步骤2 -> Check Queue ->步骤2 -> Close Callback Queue ->步骤2 -> Timers Queue...
  
//   5. 这就是Node的Event Loop

//  .Node 11.x新变化

// .现在nodel1在timer阶段的setTimeout,setlntervl ...和在check阶段的immediate都在node11里面都修改为一旦执行--个阶段里的--个任务就立刻执行微任务队列。为了和浏览器更加趋同.


// day2 写出执行结果:
function side(arr) {
  arr[0] = arr[2];
}

function a(a, b, c = 3) {
  c = 10;
  side(arguments);
  return a + b + c;
}
console.log(a(1, 1, 1));  // => 12

// arguments 中 c的值还是1 不会变成10， 因为a函数加了默认值，就按ES方式解析，ES6有块级作用域，所以C的值不会改变

// day 3: 写出执行结果
var min = Math.min();
max = Math.max();
console.log(min < max) // => false

// false
// MDN相关文档解释
// Math.min 参数是0或多个，若为多个，返回其中最小的，若为0个，返回Infinity（无穷大）
// Math.max 没有传递参数返回-Infinity，因此输出false

//day 4： 写出执行结果

var a = 1;
(function a () {
  a = 2;
  console.log(a);
})()

// 输出 f a () { a = 2 ;console.log(a)}
// 解析: 立即执行函数表达式（IIFE）有一个自己独立的作用域，若果函数名称与内部变量名冲突，就会永远执行函数本身，因此输出函数本身

