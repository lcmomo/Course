// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import  'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/js/collapse.js'
import store        from './store/'
import axios from "axios"

import PubSub from 'pubsub-js'
import GeminiScrollbar from 'vue-gemini-scrollbar'

import './assets/css/iconfont.css'


Vue.use(GeminiScrollbar)
Vue.prototype.axios = axios
Vue.prototype.$PubSub=PubSub
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  //el: '#app',
  router,
  store,
 
 // components: { App },
 // template: '<App/>'
  render:h=>h(App)
}).$mount('#app')
