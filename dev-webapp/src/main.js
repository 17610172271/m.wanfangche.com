// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import FastClick from 'fastclick'
import { LoadingPlugin } from 'vux'

import store from './store'
import axios from './axios'
import router from './router'
import App from './App'
import Vuex from 'vuex'
import VueAMap from 'vue-amap'
import 'lib-flexible'

// vux 插件注册
Vue.use(LoadingPlugin)
Vue.use(Vuex)
Vue.use(VueAMap)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '1f5bb764839780ea3e025d33cd657585',
  // 插件集合
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'CircleEditor', 'Geolocation', 'Geocoder'],
  v: '1.4.4'
})

// FastClick.attach(document.body)

// 开发环境下开启
Vue.config.productionTip = false

// 阿里云存储图片裁切规则
import ossResize from '@/filters/oss-resize'
Vue.filter('ossResize', ossResize)

// 文件大小显示转换
import formatSize from '@/filters/format-size'
Vue.filter('formatSize', formatSize)

// 营地类型
import camptype from '@/filters/camp-type'
Vue.filter('camptype', camptype)

// 营地距离
import distance from '@/filters/distance'
Vue.filter('distance', distance)

// 地图搜索列表返回区别
import searchtype from '@/filters/serach-type'
Vue.filter('searchtype', searchtype)

// tocuth
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

// 挂载 axios, 可以使用 this.axios
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app-box')
