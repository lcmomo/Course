// this.liluchao = 20
// function test() {
//   console.log(this.liluchao)
// }
// var result = test.bind(this)
// new result(); // undefined (对new 无效)

// if (!Function.prototype.bind) {
  Function.prototype.bind = function (onThis) {

    if (typeof this != "function") {
      throw new Error("请使用函数方式调用bind")
    }

    var args = Array.prototype.slice.call(arguments, 1),
      fToBind = this
      fNOP = function () {}
      fBound = function () {
        var _args = args.concat(Array.prototype.slice.call(arguments))
        // this instanceof fToBind === true，说明返回fBound 被当做new 构造函数使用

        // [] 模拟
        return fToBind.apply(this instanceof fToBind ? this : onThis, _args);
      }

      // 维护原型链
      if (this.prototype) {
        fNOP.prototype = this.prototype;
      }

      // 修正函数名和构造函数
      fBound.prototype = new fNOP();
    return fBound;
  }
// }