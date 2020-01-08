<template>
    <div class="treechart">
    <table v-if="treeData && treeData.partnerName">
      <tr>
        <td :colspan="treeData.childers ? treeData.childers.length * 2 : 1" :class="{parentLevel: treeData.childers, extend: treeData.childers && treeData.extend}">
          <div :class="{node: true, hasMate: treeData.mate}">
            <div class="person" @click="$emit('click-node', treeData)">
              <el-popover
                v-if="isDetail"
                placement="top"
                width="180"
                trigger="hover">
                <div style="margin: 0">
                  <el-button size="mini" type="primary" @click="addStock(0)" v-if="treeData.partnerType !== 1 && treeData.partnerType !== 3">添加</el-button>
                  <el-button type="primary" size="mini" @click="addStock(1)" v-if="treeData.proportionShares">编辑</el-button>
                  <el-button type="primary" size="mini" @click="dialogVisible2 = true" v-if="treeData.proportionShares">删除</el-button>
                </div>
                <div class="avat" :class="{parent: !treeData.proportionShares, company: Number(treeData.partnerType) === 2, other: Number(treeData.partnerType) === 3}" slot="reference">
                  {{treeData.partnerName}}({{treeData.proportionShares ? treeData.proportionShares : 100}}%)
                </div>
              </el-popover>
              <div class="avat" :class="{parent: !treeData.proportionShares, company: Number(treeData.partnerType) === 2, other: Number(treeData.partnerType) === 3}" v-else>
                {{treeData.partnerName}}({{treeData.proportionShares}}%)
              </div>
            </div>
            <div class="person" v-if="treeData.mate" @click="$emit('click-node', treeData.mate)">
              <el-popover
                v-if="isDetail"
                placement="top"
                width="180"
                trigger="hover">
                <div style="margin: 0">
                  <el-button size="mini" type="primary" @click="addStock">添加</el-button>
                  <el-button type="primary" size="mini" @click="editStock">编辑</el-button>
                  <el-button type="primary" size="mini" @click="dialogVisible2 = true">删除</el-button>
                </div>
                <div class="avat" slot="reference">
                  {{treeData.mate.name}}
                </div>
              </el-popover>
              <div class="avat" v-else>
                {{treeData.mate.name}}
              </div>
            </div>
          </div>
          <div class="extend_handle" v-if="treeData.childers && treeData.childers.length" @click="toggleExtend(treeData)"></div>
        </td>
      </tr>
      <!-- 这是一个递归组件,注意,这里还要调用,需要传递的数据这里也要传递,否则操作时拿不到子级的数据 -->
      <tr v-show="treeData" v-if="treeData.childers && treeData.childers.length && treeData.extend">
        <td v-for="(childers, index) in treeData.childers" :key="index" colspan="2" class="childLevel">
          <TreeChart :totalRates="totalRates" :json="childers" :oldTreeData="treeData" :isDetail="isDetail" :id="lastId" @click-node="$emit('click-node', $event)"/>
        </td>
      </tr>
    </table>

    <!-- 添加编辑弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      @close="clearDialog"
      :close-on-click-modal="false"
      width="30%">
      <div class="tips">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="类型" @change="changeType" :disabled="isEdit === 1">
              <el-option
                v-for="item in shareholderTypeOptions"
                :key="item.value"
                :label="item.labelZh"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="partnerName">
            <el-input :disabled="isDisable" placeholder="输入姓名" :maxlength="32" v-model="ruleForm.partnerName"></el-input>
          </el-form-item>
          <el-form-item label="占比" prop="proportionShares">
            <el-input @blur="checkRate" placeholder="输入占比" :maxlength="5" v-model="ruleForm.proportionShares" @keyup.native="limitNumber"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="tip-left">
          <el-button type="info" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 删除提示弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%">
      <div class="tips">
        <p style="text-align: left">确定删除该股东信息?</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="tip-left">
          <el-button type="info" @click="dialogVisible2=false">取消</el-button>
          <el-button type="primary" @click="deleteStock">保存</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TreeChart',
  props: {
    json: {}, // 渲染数据
    oldTreeData: {}, // 原始数据
    totalRates: 0, // 股东占股比例
    isDetail: {
      default: true // 是否是详情
    },
    id: null // 最后一级id,前端添加数据需要
  },
  data () {
    var checkShare = (rule, value, callback) => {
      let zero = /^0+\d*$/
      let dublue = /^0{2,}\.\d+$/
      var point = /^\d+\.?\d+$/
      var reg = /^[1-9]{1}$/
      if (value !== 0 && !value) {
        callback(new Error('请输入占股比例(%)'))
      }
      setTimeout(() => {
        if (zero.test(value) || dublue.test(value)) {
          callback(new Error('输入正确的数字格式'))
        } else if (point.test(value) || reg.test(value)) {
          this.ruleForm.proportionShares = Number(value)
          callback()
        } else {
          callback(new Error('输入正确的数字格式'))
        }
        callback()
      }, 100)
    }
    return {
      treeData: {},
      // oldTreeData: {},
      rateCount: 0, // 股东占比总和
      oldCount: 0, // 编辑之前的总和
      oldRate: 0, // 编辑之前的单个值
      dialogVisible: false, // 添加股东弹框
      dialogVisible2: false, // 删除提示弹框
      isEdit: 0, // 是否编辑 0 新增 1 编辑
      ruleForm: {
        type: 1,
        partnerName: '',
        proportionShares: null
      },
      rules: {
        proportionShares: [
          { required: true, validator: checkShare, trigger: 'blur' }
        ]
      },
      isCompany: true, // 添加类型是否为企业
      shareholderTypeOptions: [
        {
          labelEn: 'Individual',
          labelZh: '个人',
          value: 1
        },
        {
          labelEn: 'Company',
          labelZh: '公司',
          value: 2
        },
        {
          labelEn: 'Other',
          labelZh: '其他',
          value: 3
        }
      ], // 股东类型
      isDisable: false,
      totalRate: 0,
      lastId: null // 最后一级id
    }
  },

  created () {
    // 设置语言
    this.setRule()
    this.lastId = Number(this.id)
    // console.log(this.json)
  },

  watch: {
    isDetail: function (val) { // 是否是详情,详情不能添加编辑
      this.isDetail = val
    },
    json: {
      // 遍历当前的数据
      handler: function (Props) {
        let extendKey = function (jsonData) {
          jsonData.extend =
            jsonData.extend === void 0 ? true : !!jsonData.extend
          if (Array.isArray(jsonData.children) && jsonData.children.length) {
            jsonData.children.forEach(c => {
              extendKey(c)
            })
          }
          return jsonData
        }
        if (Props) {
          this.treeData = extendKey(Props)
        }
      },
      immediate: true
    }
  },
  methods: {
    // 设置规则
    setRule () {
      let getRule = {
        partnerName: [
          { required: true, message: '请输入股东名称', trigger: 'blur' }
        ],
        cardId: [
          { required: true, message: '请输入证件号', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ]
      }
      this.rules = Object.assign(this.rules, getRule)
    },

    toggleExtend (treeData) {
      treeData.extend = !treeData.extend
      this.$forceUpdate()
    },

    // 改变添加类型
    changeType (val) {
      if (Number(val) === 3) {
        this.isDisable = true
        this.ruleForm.partnerName = '其他'
      } else {
        this.isDisable = false
        this.ruleForm.partnerName = ''
      }
    },

    // 新增股东,val: 0 新增, 1 编辑
    addStock (val) {
      // console.log(this.treeData)
      this.isDisable = false
      // 如果是新增,直接循环当前节点数据下的子级,
      // 如果是编辑,要通过当前节点数据的parentID遍历原始数据

      this.isEdit = val
      if (val) {
        // this.$emit('click-node', {flag: 2, id: this.treeData.parentId})
        this.rateCount = 0
        this.rateCount = this.getRate(
          this.oldTreeData,
          this.treeData.prePartnerCode
        )
        // 不使用=赋值,内存相同,改变后,treeData数据也会改变
        this.ruleForm = Object.assign(this.ruleForm, this.treeData)
        this.ruleForm.type = this.treeData.partnerType
        if (Number(this.ruleForm.type === 3)) {
          this.isDisable = true
          this.ruleForm.partnerName = '其他'
        }
        this.oldRate = this.treeData.proportionShares
      } else {
        let obj = this.forData(this.treeData)
        this.rateCount = obj.totalRate
      }
      this.dialogVisible = true
    },

    // 循环股东树形图 获得股东比例和个数
    forData (data) {
      let obj = {
        totalRate: 0,
        leg: 0
      }
      if (data.childers && data.childers.length) {
        data.childers.forEach(v => {
          obj.totalRate += v.proportionShares
        })
        obj.leg = data.childers.length
      }
      return obj
    },

    // 循环股东树形图 获得股东比例
    getRate (data, id) {
      // 如果是第一级
      if (!id || data.partnerCode === id) {
        if (data.childers && data.childers.length) {
          data.childers.forEach(v => {
            this.rateCount += v.proportionShares
          })
        }
        return this.rateCount
      } else if (data.childers && data.childers.length) {
        data.childers.some(v => {
          this.getRate(v, id)
        })
      }
    },

    // 编辑
    editStock () {
      this.dialogVisible = true
      this.ruleForm = this.treeData
    },

    // 删除股东
    deleteStock () {
      // const loading = Loading.service();
      // 前端删除
      // 前端删除这里不好操作,需要遍历整个原始数据删除,再赋值,比较麻烦

      // 后端删除
      // const url = apiPath.shareholder.deleteHolder(this.treeData.id);
      // this.$post(url).then(res => {
      //   if (res.success) {
      //     loading.close();
      //     this.treeData = {};
      //     this.dialogVisible2 = false;
      //     this.$emit("click-node", { flag: 1 });
      //     this.$message({
      //       type: "success",
      //       message: "删除成功"
      //     });
      //   } else loading.close();
      // });
    },

    // 限制只能输入数字
    limitNumber () {
      this.ruleForm.proportionShares = common.limitInputPointNumber(
        this.ruleForm.proportionShares
      )
    },

    // 验证比例
    checkRate () {
      if (this.isEdit) {
        if (
          Number(this.ruleForm.proportionShares) +
            Number(this.rateCount) -
            Number(this.oldRate) >
          100
        ) {
          this.$message({
            type: 'warning',
            message: '股东占股比例之和不能大于100'
          })
          this.ruleForm.proportionShares = ''
        }
        this.ruleForm.proportionShares = this.ruleForm.proportionShares
      } else {
        if (
          Number(this.ruleForm.proportionShares) + Number(this.rateCount) >
          100
        ) {
          this.$message({
            type: 'warning',
            message: '股东占股比例之和不能大于100'
          })
          this.ruleForm.proportionShares = ''
        }
      }
    },

    // 保存添加股东
    confirm () {
      // this.checkRate()
      let loading = Loading.service()
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.sendData()
        } else {
          loading.close()
        }
      })
    },

    // 发送添加股东数据
    sendData () {
      let loading = Loading.service()
      let data = {
        partnerType: this.ruleForm.type,
        partnerName: this.ruleForm.partnerName,
        proportionShares: this.ruleForm.proportionShares
      }
      if (this.isEdit) {
        // data.id = this.treeData.id;
        // 前端编辑数据
        this.treeData.partnerType = data.partnerType
        this.treeData.partnerName = data.partnerName
        this.treeData.proportionShares = data.proportionShares
        this.$message({
          type: 'success',
          message: '成功'
        })
        this.clearDialog()
        loading.close()
      } else {
        // 前端添加数据,需要自己生成子级id,可以传数据的时候把最后一级id传过来,进行累加
        data.prePartnerCode = this.treeData.partnerCode
        data.id = this.lastId++
        if (this.treeData.childers) {
          this.treeData.childers.push(data)
        } else {
          this.treeData.childers = [data]
        }
        console.log(this.lastId, this.treeData)
        this.$message({
          type: 'success',
          message: '成功'
        })
        this.clearDialog()
        loading.close()
      }
      // 后台添加编辑数据
      // console.log(data, this.treeData);
      // const url = apiPath.shareholder.addShareHolder;
      // this.$post(url, data)
      //   .then(res => {
      //     loading.close();
      //     if (res && res.success) {
      //       this.$emit("click-node", { flag: 1, id: data.parentId });
      //       this.$message({
      //         type: "success",
      //         message: "成功"
      //       });
      //       this.clearDialog();
      //     } else {
      //       this.rateCount = this.oldCount;
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },

    // 清除表单信息
    clearDialog () {
      // this.ruleForm = {}
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
    },

    changeOpen () {}
  }
}
</script>

<style lang="scss" scoped>
.treechart {
  table{border-collapse: separate!important;border-spacing: 0!important;}
td{position: relative; vertical-align: top;padding:0 0 50px 0;text-align: center; }

.parent {
  background: #199ed8 !important;
  font-weight: bold;
}
.extend_handle{position: absolute;left:50%;bottom:27px; width:10px;height: 10px;padding:10px;transform: translate3d(-15px,0,0);cursor: pointer;}
.extend_handle:before{content:""; display: block; width:100%;height: 100%;box-sizing: border-box; border:2px solid;border-color:#ccc #ccc transparent transparent;
transform: rotateZ(135deg);transform-origin: 50% 50% 0;transition: transform ease 300ms;}
.extend_handle:hover:before{border-color:#333 #333 transparent transparent;}
.extend .extend_handle:before{transform: rotateZ(-45deg);}

.extend::after{content: "";position: absolute;left:50%;bottom:15px;height:15px;border-left:2px solid #ccc;transform: translate3d(-1px,0,0)}
.childLevel::before{content: "";position: absolute;left:50%;bottom:100%;height:15px;border-left:2px solid #ccc;transform: translate3d(-1px,0,0)}
.childLevel::after{content: "";position: absolute;left:0;right:0;top:-15px;border-top:2px solid #ccc;}
.childLevel:first-child:before, .childLevel:last-child:before{display: none;}
.childLevel:first-child:after{left:50%;height:15px; border:2px solid;border-color:#ccc transparent transparent #ccc;border-radius: 6px 0 0 0;transform: translate3d(1px,0,0)}
.childLevel:last-child:after{right:50%;height:15px; border:2px solid;border-color:#ccc #ccc transparent transparent;border-radius: 0 6px 0 0;transform: translate3d(-1px,0,0)}
.childLevel:first-child.childLevel:last-child::after{left:auto;border-radius: 0;border-color:transparent #ccc transparent transparent;transform: translate3d(1px,0,0)}

.node{position: relative; display: inline-block;box-sizing: border-box; text-align: center;padding: 0 5px;}
.node .person{padding-top: 15px; position: relative; display: inline-block;z-index: 2;width:120px; overflow: hidden;}
.node .person .avat{
  padding: 5px;
  padding-top: 10px;
  display: block;width:100%;height: 100%;margin:auto;word-break: break-all; background:#ffcc00;box-sizing: border-box;border-radius: 4px;
  .opreate_icon {
    display: none;
  }
  &:hover {
    .opreate_icon {
      display: block;
      position: absolute;
      top: -3px;
      right: -3px;
      padding: 5px;
    }
  }
  &.company {
    background:#199ed8;
  }
  &.other {
    background:#ccc;
  }
}
.node .person .avat img{cursor: pointer;}
.node .person .name{height:2em;line-height: 2em;overflow: hidden;width:100%;}
.node.hasMate::after{content: "";position: absolute;left:2em;right:2em;top:15px;border-top:2px solid #ccc;z-index: 1;}
.node.hasMate .person:last-child{margin-left:1em;}

.landscape{transform: rotate(-90deg); padding:0 4em;}
.landscape .node{text-align: left;height: 8em;width:8em;}
.landscape .person{position: relative; transform: rotate(90deg);padding-left: 4.5em;height: 4em;top:4em;left: -1em;}
.landscape .person .avat{position: absolute;left: 0;}
.landscape .person .name{height: 4em; line-height: 4em;}
.landscape .hasMate{position: relative;}
.landscape .hasMate .person{position: absolute; }
.landscape .hasMate .person:first-child{left:auto; right:-4em;}
.landscape .hasMate .person:last-child{left: -4em;margin-left:0;}
// .tree_color_description .tree_color_item .content {background-color: #ffcc00;  width: 80px; height: 20px;}
// .tree_color_description .tree_color_item .blue {background-color: #199ed8;}
// .tree_color_description .tree_color_item .grey {background-color: #ccc;}
// .tree_color_description .tree_color_item .word {font-size: 14px; margin-left: 5px;}

.el-dialog__header {
    padding: 0;
    padding-top: 30px;
    margin: 0 30px;
    border-bottom: 1px solid #F1F1F1;
    text-align: left;
    .el-dialog__title {
      font-size: 14px;
      font-weight: bold;
      color: #464C5B;
      line-height: 20px;
    }
  }
  .tips {
    padding: 0 20px;
    .el-select {
      width: 100%;
    }
    .blue {
      color: #00B5EF;
    }
    .check {
      margin-left: 100px;
    }
    .inquiry {
      font-weight: bold;
    }
    .el-form-item__label {
      display: block;
      float: none;
      text-align: left;
    }
    .el-form-item__content {
      margin-left: 0;
    }
  }
  .el-dialog__body {
    padding: 30px 25px;
    p {
      margin-bottom: 15px;
    }
  }
  .el-dialog__headerbtn {
    top: 30px;
    right: 30px;
  }
}
.el-popover {
  .el-button {
    padding: 8px !important;
    margin-left: 5px !important;
    float: left;
  }
}
</style>
