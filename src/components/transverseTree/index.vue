<template>
  <div class="transverseTree">
    <div ref="chart" id="chart"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'transverseTree',
  props: {
    json: {}, // 渲染数据
    id: null // 最后一级id,前端添加数据需要
  },
  data () {
    return {
      ScriptManageObj: [{
        id: 1,
        name: 'A1',
        list: [
          {
            id: 11,
            name: 'B1',
            list: [
              {
                id: 111,
                name: 'C1',
                list: [{
                  id: 111,
                  name: 'D3',
                  list: []
                }, {
                  id: 111,
                  name: 'D4',
                  list: []
                }]
              }
            ]
          },
          {
            id: 12,
            name: 'B2',
            list: [{
              id: 121,
              name: 'C2',
              list: [
                {
                  id: '111www',
                  name: 'D6',
                  list: []
                },
                {
                  id: '111wyyww',
                  name: 'D8',
                  list: []
                }
              ]
            }]
          }
        ]
      }]
    }
  },
  mounted () {
    this.drawTreeChart()
  },

  watch: {
  },
  methods: {
    drawTreeChart () {
      var chart = this.$refs.chart
      var mode1 = function (rowSpanNumber, obj) {
        var table = '<div class="table">'
        obj.forEach(function (item) {
          table += '<div class="tr">'
          if (obj.length > 1) {
            table += '<div class="tr_children"></div>'
          }
          table += '<div class="text-header">'
          if (rowSpanNumber === 1) { // 判断前面的横线要不要
            table += '<div class="before"></div>'
          }
          table += '<div v-on:click="nodeClick(' + "'" + item.id + "'" + ')">' + item.name + '</div>'
          if (item.list && item.list.length !== 0) { // 判断后面的横线要不要
            table += '<div class="after"></div>'
          }
          table += '</div>'
          if (item.list && item.list.length !== 0) {
            table += '<div class="content">'
            table += mode1(1, item.list)// 回调
            table += '</div>'
          }
          table += '</div>'
        })
        table += '</div>'
        return table
      }
      let template = mode1(0, this.ScriptManageObj)
      var MyComponent = Vue.extend({
        template: template,
        methods: {
          nodeClick (item) {
            alert(item)
            // console.log(123, item)
          }
        }
      })
      var component = new MyComponent().$mount()
      chart.appendChild(component.$el)
      // chart.innerHTML = mode1(0, this.ScriptManageObj)// 调用对应的方法写进去就好了哈哈
    }
  }
}
</script>

<style>
  .table{
      /*overflow: hidden;*/
      white-space:nowrap;
  }
  .text-header{
      /*float: left;*/
      display: inline-block;
      white-space:nowrap;
      padding-bottom: 10px;
      padding-top: 10px;
      margin-left: 50px;
      margin-right:50px;
      position: relative;
  }
  .text-header>.after{
      content: '';
      height: 1px;
      width: 50px;
      background: red;
      position: absolute;
      left: 100%;
      top: 49%;
  }
  .text-header>.before{
      content: '';
      height: 1px;
      width: 50px;
      background: red;
      position: absolute;
      right: 100%;
      top: 49%;
  }
  .text-header>div{
      background-color: #000;
      color: #fff;
      width: 100px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      /*margin-left: 20px;*/
      /*margin-bottom: 20px;*/
  }
  .content{
      /*float: left;*/
      display: inline-block;
      white-space:nowrap;

  }

  /*线条*/
  .line,.line-only{
      /*float: left;*/
      display: inline-block;
      white-space:nowrap;

  }
  .line>div,.line-only>div{
      height: 29px;
      width: 30px;
  }
  /* .table>.tr{
      border-left: 1px solid red;
  } */
  .tr>div{
      vertical-align: middle;
  }
  .tr{
      position: relative;
  }
  .tr>.tr_children{
      position: absolute;
      left: 0%;
      height: 100%;
      width: 1px;
      background: red;
      bottom: 0%;
      /* border-left: 1px solid red; */
  }
  .table>.tr:first-child>.tr_children{
      position: absolute;
      left: 0%;
      height: 50%;
      width: 1px;
      background: red;
      top: 50%;
  }
  .table>.tr:last-child>.tr_children{
      position: absolute;
      left: 0%;
      height: 50%;
      width: 1px;
      background: red;
      bottom: 50%;
  }
  .tr>.line>div:nth-of-type(1){
      display: inline-block;
      white-space:nowrap;

      border-left: 1px dashed red;
      border-bottom: 1px dashed red;
  }
  .tr>.line>div:nth-of-type(2){
      border-left: 1px dashed red;
  }
  .tr:nth-of-type(1)>.line>div:nth-of-type(1){
      border-left: none;
  }
  .tr:nth-last-child(1)>.line>div:nth-of-type(2){
      border-left: none;
  }
  .line-only>div:nth-of-type(1){
      border-bottom: 1px dashed red;
  }
</style>
