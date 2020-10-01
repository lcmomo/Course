(function(modules){
    function  __webpack_require__(moduleId){
        const module ={
            exports:{}
        }
        //函数体
        modules[moduleId].call(module.exports,module, module.exports, __webpack_require__);
        return module.exports;
    }
    return __webpack_require__(0);
})([(function(module,exports){
    console.log("liliuc")
})]);