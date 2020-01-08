<template>
  <div class="containers" ref="content">
    <treeFlowChart :json="treeData" id="6"/>
  </div>
</template>
<script>
import treeFlowChart from '../../components/treeFLowChart'
export default {
  data () {
    return {
      treeData: {
        partnerName: '大米科技公司',
        proportionShares: '100',
        partnerType: 2,
        id: 1,
        childers: [{
          partnerName: '李明',
          proportionShares: '50',
          partnerType: 1,
          id: 2,
          partnerCode: 1
        }, {
          partnerName: '张三',
          proportionShares: '20',
          partnerType: 1,
          id: 4,
          partnerCode: 1
        }, {
          partnerName: '西米子公司',
          proportionShares: '20',
          partnerType: 2,
          id: 5,
          partnerCode: 1
        }, {
          partnerName: '其他',
          proportionShares: '10',
          partnerType: 3,
          id: 6,
          partnerCode: 1
        }]
      }
    }
  },
  components: {
    treeFlowChart
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.containers{
}
</style>
