# Nodejs ?
一个基于Chrome V8引擎的JavaScript运行环境，node让JavaScript可以运行在服务端的开发平台. 使用事件驱动，非阻塞I/O 模型，轻量又高效。npm是全球最大的开源库生态系统。

## V8引擎？
电脑不认识也不理解JavaScript，JavaScript引擎的作用就是让电脑识别js代码。
1. node.js引擎是C++编写的，V8引擎是node.js的核心，其作用就是让JS代码能被电脑识别
2. 非阻塞I/O模型？回调函数

### module? 
nodejs中，文件和模块是一一对应的（每个文件被视为一个独立的模块）,拥有自己的作用域，变量，方法，对其他模块不可见.

nodejs中，module对象代表为当前模块，导出模块，导出的为module.exports 属性中】

### 模块分类
 1. 核心模块（path， fs，http，。。。）
 2. npm 下载的第三方模块或安装包
 3. 自定义模块




## nodemon?
监听文件改动，文件有变动时，自动重启

## express? 
1. 基于nodejs平台，快速，开发，极简的web开发框架
封装好了 服务器，路由，中间件，网络请求，，，
2. 使用流程： npm安装依赖，引入express模块，实力化express对象，调用方法

## EJS ?
一套简单的模板语言，帮我们利用javascript代码生产html页面

特点： 高效，嵌入式
1. 快速编译和渲染
2. 简单的模板标签
3. 支持浏览器端和服务端
4. 支持express视图系统

