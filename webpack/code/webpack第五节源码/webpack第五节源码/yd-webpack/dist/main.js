(function (modules) {
    function __webpack_require__(moduleId) {
        const module = {
            exports: {}
        }
        //函数体
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    return __webpack_require__(0);
})([(function (module, exports, __webpack_require__) {
        const result = __webpack_require__(1)
        result();
    }),
    (function (module, exports) {
        const result = () => {
            console.log("京程一灯");
        }
        module.exports = result;
    })
]);