import Vue from 'vue'
import Router from 'vue-router'
import bpmnIndex from '../views/bpmn/index'
import TreeFlowChart from '../views/treeFlowChart/index'
import TransverseTree from '../views/transverseTree/index'
import G6CustomTree from '../views/G6CustomTree/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bpmnIndex',
      component: bpmnIndex
    },
    {
      path: '/treeFlowChart',
      component: TreeFlowChart
    },
    {
      path: '/transverseTree',
      component: TransverseTree
    },
    {
      path: '/g6CustomTree',
      component: G6CustomTree
    }
  ]
})
