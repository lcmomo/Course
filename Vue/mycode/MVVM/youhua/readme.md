## Vue首屏优化


1.Vue如何优化首页加载速度？首页白屏什么问题引起，如何解决？
白屏原因：
FP FMP FCP
FP：第一帧像素落点时间
FCP：第一次有效绘制
FMP：第一次有意义（有数据）绘制

Spa单页加载过程
===html     
《静态资源》 
《div id=app》</div> FP
===加载静态资源，css，js   FCP
===解析js=》生成html
《div id=app》
《div class=“head”》《/div》
</div>
===ajax 请求
=== 渲染 FMP
渲染之前都是白屏

优化：
1.动态加载路由，提取公共组件，设置缓存
Bable: plugin-syntax-dynamic-import  ==》路由动态加载

Vue,compinent(‘async-component’,(resolve)=>{
Import(‘./AsyncComponent.js’)
.then((AsyncComponent)=>{
resolve(AsyncComponent)=>{
Resolve(AsyncComponent.default);
});
})

提取公共库：
Webpack4 打开 optimization.splitChunks

2.Vue 的预渲染 ssr 同构
Ssr  ==> 服务端渲染
同构渲染=>一套代码多端使用（vue，react，nuxt）

Vue的ssr : vue->json->vue-server->renderer->html
预渲染：预先渲染 webpack 本地打包Vue-》无头浏览器执行-》获取到预渲染页面的html内容-》index.html  -> cdn

SSR:
->请求-》node-》解析

3.Loading -》骨架屏
4. Webpack entry 单页到多页
5.资源请求时间片处理 可以配置webpack插件
6.Quicklink -》浏览器空闲的时候去加载我可能要跳转的页面
7.Prefetch preload preconnect
Preload：只是预加载浏览器中声明的资源
Prefetch:优先级比较低，允许浏览器空闲时获取将来可能使用的资源并缓存
分类：
Dns-prefetch:(udp协议)
《link rel=’dns-prefetch’ href=””》
Link prefetch
<link rel=’dns-prefrtch’ >
Prerendering:
<link rel=”prerender” >

Preconnect:
DNS TLS 协商 TCP握手

大项目选型为什么不用vue，大项目容易出现内存泄漏的原因是什么？


<template></template>

  内存泄漏情况1.（Vue）：
<script>
  Import { XXX } from “xxx” //第三方
  XXX是个方法：
  data（）{
  Return{
  XXX  //全部变成响应式数据，如果是嵌套数组，还会不断遍历
  }
  }
Object.defineproperty()
将其变成响应式
挂载到 vue实例，即使本组件销毁，只要Vue实例存在（var vm = new Vue（）），该方法就存在，造成泄漏

</script>
2.源码层面：Vue Dep 维护依赖 Watcher（v-html,v-if...） => 用来连接视图层和响应数据层的

MVVM  vm=》（连接Watcher 有一个唯一的id）

```javascript

let uid = 0
export default class Watcher {
  constructor () {
    this.id = ++uid  // uid for batching
    /**
    * v-on   0
    * v-show 1
    * ....
    <div v-if><div v-on=""></div></div>
    [watcher, undefined, watcher]   // if生效，watcher数组中会出现undefined 导致数组断裂，可能出现内存泄漏
    */
  }
}
```

keep-alive 也会造成内存泄漏 怎么实现的？

## 二、Object.defineProperty()能否监听到数组变化

```js
function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      console.log(`get == 获取的key: ${key}, value: ${value}`)
    },
    set (newVal) {
      console.log(`SET == 设置key: ${key}, value: ${value}`)
    }
  })
}

function observe(data) {
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key])
  })
}

var arr = ['小米', '二批', '马'] // index : 0, 1,2 

observe(arr)

arr.unshift()
```
Object.defineProperty() 只能检测到对象一开始时的数据已经拥有的key，对于数组，设置已监听数据的下标时，才会触发, 数组push时，不会触发。unshift()，可能触发，pop（），shift（）可能触发

在vue2源码中为什么会重写数组的监听和操作方法：

A： 不是因为Object.defineProperty 监听不到数组变更，因为对于数组的每一次操作，都可能影响其他key的索引的变更。在多数情况下，需要遍历数组，重新检测
// 


Vue2 数组怎么处理?

[].__proto__ = 

Object.defineProperty 只能劫持已有属性，并且需要遍历每个属性，对于新增属性，需要手动遍历

$set 内部做了什么，怎么处理

1. 判断是否是数组，如果是，且是数组已有的下标，触发已经被重写的数组方法（splice） =》 添加数据 =》 触发observeArray
2. 对象同理： (key in Object.prototype ===》 Object.prototype ？ 判断key是否是原始对象上面的方法
3. 如果不是响应式数据，则改变原数据，对其进行响应式处理


离线编译与在线编译
```
new Vue({
  template: '<div></div>'
})

这里的template为在线编译

```
## Vue3初探


一、 源码实现：

1.  Compiler ？？ 
词法分析-》 语法分析-》 构建AST -》 构建成render函数
Vue3 中 单独抽出


** 模块化架构

2. Runtime
immutable
- 为什么更快？
- Proxy

Composition API + Options API

tree shake

```javascript
<script src="./reactivity.global.js"></script>
<script>
  const { reactive, effect } = VueObserver
  const origin = {
    count: 1
  };
  const state = reactive(origin) // 把原始数据变成响应式数据
  const fn = () => {
    const count = state.count
    console.log(`值: ${count}`)  // 视图渲染
  }

  effect(fn) // 监听响应式数据所在的函数，当响应式数据发生变更，函数触发
</script>
```
Proxy: 对于数据的一个代理
```javascript
var data = [1,2,3]

var data2 = {
  foo: 'foo',
  bar: {
    key: 1
  },
  arr: ['a', 'b']
}

var p = new Proxy(data, {
  get (target, key, receiver)  {
    console.log('get val: ', key);
    return Reflect.get(target, key, receiver)
  },
  set (target) {
    console.log('set value: ', key);
    return Reflect.set(target, key, value, receiver)
  }
})
p.push(4) 
// 该方式为元编程
p.bar.key = 2  // 只会触发get （对于嵌套对象，只会代理一层）

已经代理过数组所有key，所以push时不再像Object.defineProperty 需要遍历，
也是其执行快（使用Proxy）的一个因素

// 问题： 会触发很多次set，每一次都会触发渲染，怎么维护？ 对于嵌套数据，做了什么优化
```

3. Ref 对于基础数据类型的代理

