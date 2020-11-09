## 一、基本使用

npm install lodash-es --save  (lodash-es是scope内的，是函数式编程模块，webpack自带的tree-shaking 筛选不到)

lodash-es 与lodash区别 ：lodash 不支持解构 如：import { isArray} from 'lodash' 会报错

2.深度tree-shaking（针对js）
webpack-deep-scope-plugin

3.
css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]  //name css文件所在文件夹（模块）名,local-》css类名

4. mini-css-extract-plugin  提取css到单独文件
npm install --save-dev mini-css-extract-plugin


# 5. 终端打字
cnpm install --save-dev set-iterm2-badge

const setIterm2Badge = require('set-iterm2-badge');
setIterm2Badge("我的开发环境")

6. webpack-merge
cnpm install --save-dev webpack-merge  


7. yargs-parser
cnpm install --save-dev yargs-parser

# 8. clean-webpack-plugin
npm install --save-dev clean-webpack-plugin

9. html-webpack-plugin
npm i --save-dev html-webpack-plugin


## 二、优化：

 =================开发环境=================
1. 开启多核压缩：
npm install uglifyjs-webpack-plugin --save-dev

2. 监控面板:
npm install --save-dev speed-measure-webpack-plugin
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap(merge(_mergeConfig,webpackConfig));

3. 开启通知：
npm install --save-dev webpack-build-notifier


4. 开启打包进度：
npm i --save-dev progress-bar-webpack-plugin

5. 开发面板更清晰
npm install webpack-dashboard --save-dev

6. 开启窗口标题
npm install node-bash-title --save

7. 窗口打印更直接


=============================上线环境======================================
1. es6不需要编译

2. 判断浏览器是否支持相关特性
set map es9 
https://cdn.polyfill.io/v2/polyfill.min.js?features=Map,Set

3. 前端缓存小负载 webapp
  a.js -> a.xxx1.js
  a.xxx.js -> 代码 后台每次计算出当前包

4. 真正的loading

5. 单页 问题 多页转单页 webapp 性能 请求的数量 runtime
6. 分析打包结果 CI

（2）github 搜索：
webpack chart :
json->script添加：
"dev:chart": "webpack --mode development --profile --json > stats.json",
http://webpack.github.io/analyse/#chunks
webpack-bundle-analyzer
https://alexkuz.github.io/webpack-chart/
6.test exculde include 非常重要 很快
7.压缩JS CSS happypack ts-loader optimize-css-assets-webpack-plugin
8.devtool eval