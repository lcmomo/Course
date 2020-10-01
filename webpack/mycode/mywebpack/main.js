/******/ (function(modules) { // webpackBootstrap  webpack启动文件
/******/ 	// The module cache
            
          //模块缓存
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache  //检测模块是否被安装过
/******/ 		if(installedModules[moduleId]) {
                //把模块导出的资源注入到缓存里
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId, //模块的名字
/******/ 			l: false,    
/******/ 			exports: {} //模块导出的值
/******/ 		};
/******/
/******/ 		// Execute the module function
            //特别核心
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports

          //加载主入口
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test.js */ \"./src/test.js\");\n//const result=\"李刘超\";\r\n//console.log(result)\r\n\r\n\r\nObject(_test_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst result=()=>{\r\n    console.log(\"li李刘超\")\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (result);\n\n//# sourceURL=webpack:///./src/test.js?");

/***/ })

/******/ });

//webpack 生成的结构
//Template
(function(modules){
 function __webpack_require__ (moduleId){
    // 1. 找该模块缓存结果，
    // 2. 没有就注册moduleId到缓存
    //    3. 执行moduleId
        4.(function(module, __webpack_exports__, __webpack_require__) {})()
        const module={
          exports:{}
        }
        moduleId.call(this,module, module.exports, __webpack_require__);
        return module.exports;

 }
//  0. 注册 __webpack_require__ 函数
//  1. 执行modules的入口key
 return  __webpack_require__(modules[ "./src/index.js"])
 
})({
  "./src/index.js":123,    //commonJs语法，同步加载
  "./src/test.js":value

})


eval("__webpack_require__.r(__webpack_exports__);\nconst result=()=>{\r\n    console.log(\"li李刘超\")\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (result);\n\n//# sourceURL=webpack:///./src/test.js?");

function moduleId(module,__webpack_exports__,__webpack_require__){
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  const result=()=>{
    console.log("li李刘超");
    __webpack_exports__["defalut"]=(result);
  }

}