## markdown-loader 分析
```js
"use strict";

// markdown模块
const marked = require("marked");
const loaderUtils = require("loader-utils");

module.exports = function (markdown) {
    // merge params and default config
    // 使用loaderUtils获取一些loader配置项
    // this 构建运行时间一些上下文的信息
    const options = loaderUtils.getOptions(this);

    this.cacheable();

  // 传递配置
    marked.setOptions(options);

    return marked(markdown);
};

```