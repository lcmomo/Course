// 1. then要比Promise晚
// 2. reject 拒绝当前这块服务
// 3. 完善Promise状态pending -> fulfilled
// 4. Promise.all 所有的promise进行调用，原子操作
// 5. race 只要有一个状态发生变化就返回
function Promise(fn) {
  var callback;
  this.then = function(done){
    callback = done;
  }

  // 假如resolve先执行了，会报错（callbak is not a function）
  function resolve(data){
    // 因此需要then先执行
    setTimeout(function () {
      callback(data)
    }, 0)
    // callback(data)
  }
  fn(resolve)
}