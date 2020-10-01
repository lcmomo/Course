# storesense

> my item for store sense

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



//package.json文件修改：
"start": "npm run dev",修改前
"start": "node build/dev-server.js",修改后

"webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",修改前

"dev": "node build/dev-server.js",修改后

