// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'

import './components/bpmn/bpmn-js/dist/assets/diagram-js.css'
import './components/bpmn/bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import './components/bpmn/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import './components/bpmn/custom/app.css'
import './components/bpmn/custom/custom-panel/custom.css'
import '@/assets/font/iconfont.css'
require('./mock')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
