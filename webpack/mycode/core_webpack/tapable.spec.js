//1.SyncHook 同步的串行 不关心监听函数的返回值
//2.SyncBailHook 同步的串行 只要监听函数有一个函数的返回值不为null 跳过所有的
//3.SyncWaterfallHook 同步串行的 上一个监听函数的返回值可以传给下一个参数
//4.SyncLoopHook 同步循环 监听函数返回true返回的执行
//5.+跟上面的意思都是一样的 异步的
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require("tapable");
//接受一个可选的参数 这个参数是一个字符串的数组
//compiler.hooks
let queue = new SyncHook(["name"]); // 相当于compiler.hooks

// const compiler = new Compiler();
// compiler.hooks = new SyncHook(["name"]);

//订阅
//标识我们的订阅函数
queue.tap("1",function(name){
    console.log(name,1);
    return 1;
})

queue.tap("2",function(name,name2){
    console.log(name,name2,2)
})

queue.call("webpack")



// 1.什么是Tapable？
// webpack核心使用Tapable 来实现插件(plugins)的binding和applying.Tapable是一个用于事件发
// 布订阅执行的可插拔插件架构。Tapable就是webpack用来创建钩子的库。 
// 2.打开webpack->package.json->main -> webpac.js 一起分析~ 
// 3.创建 Compiler -> 
// 调用 compiler.run 开始构建 -> 
// 创建 Compilation -> 
// 基于配置开始创建 Chunk -> 
// 使用 Parser 从 Chunk 开始解析依赖 -> 
// 使用 Module 和 Dependency 管理代码模块相互关系 -> 
// 使用 Template 基于 Compilation 的数据生成结果代码