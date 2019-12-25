import Vue from 'vue'
import Router from 'vue-router'
import bpmnIndex from '../views/bpmn/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bpmnIndex',
      component: bpmnIndex
    }
  ]
})
