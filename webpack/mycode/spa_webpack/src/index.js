import { sync } from "./components/sync/index.js"

import(/* webpackChunkName: "async-test" */'./components/async/index.js').then(_ => {
  _.default.init()
})

sync();
console.log("hello world");