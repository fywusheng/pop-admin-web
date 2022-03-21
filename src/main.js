import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import _ from 'lodash';
import Element from 'element-ui'
import './styles/page.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import ElementUICustom from './element-ui-custom';

import * as filters from './filters' // global filters
import components from './components'

Object.keys(components).forEach(function (key) {
  Vue.component(key, components[key])
})
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})
Vue.use(ElementUICustom);
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
window._ = _;

/**
 * 注册全局
 */
Vue.mixin({
  data() {
    return {
      ENV,
      TT,
      timeList: []
    }
  },
  computed: {
    _: ()=>_
  }
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
