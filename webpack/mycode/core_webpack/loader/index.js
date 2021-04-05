//1.use:["xx1-loader","xx2-loadder"]
//2.最后的loader最早调用 传入原始的资源
//3.中间loader执行的时候 传入的就是上一个loader的执行结果
//4.loader需要异步 this.async() this.callcalk();

module.exports = function (content, map, meta) {
    console.log("loader执行了")
    return content + this.data.value;
}

//前置钩子
module.exports.pitch = function (remainRequest, preRequest, data) {
    data.value = "234";
}

//6.前置钩子的执行顺序
// xx1loader -> pitch
// xx2loader -> pitch
// xx2
// xx1