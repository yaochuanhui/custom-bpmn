
<template>
  <div class="shuxing">
    <el-dialog :visible="show" @close="handleCancel">
      <div class="content" v-show="data.extensionData">
        <el-row style="margin-top: 20px;">
          <el-col :span="8">标签名称</el-col>
          <el-col :span="16"><el-input v-model="data.name"></el-input></el-col>
        </el-row>
        <el-row style="margin-top: 20px;" v-if="data.nodeType==='ServiceTask'">
          <el-col :span="8">是否自动执行</el-col>
          <el-col :span="16">
            <el-radio-group v-model="data.checkList">
              <el-radio :label="3">是</el-radio>
              <el-radio :label="6">否</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-col :span="8">下拉选择</el-col>
          <el-col :span="16">
            <el-select v-model="data.selectList" multiple placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 30px;">
          <el-col :span="8">属性名</el-col>
          <el-col :span="14">属性值</el-col>
          <el-col :span="2"><span @click="add">+</span></el-col>
        </el-row>
        <el-row style="margin-top: 10px;" v-for="(attr, index) in data.extensionData" :key="index">
          <el-col :span="8"><el-input v-model="attr.name"></el-input></el-col>
          <el-col :span="14"><el-input v-model="attr.value"></el-input></el-col>
          <el-col :span="2"><span @click="deleate(data.extensionData, index)">x</span></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'task-modal',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: [Object, Array]
    }
  },
  methods: {
    handleOk () {
      this.$emit('handleOk', this.data)
    },
    handleCancel () {
      this.$emit('handleCancel')
    },
    add () {
      this.data.extensionData.push({
        name: '',
        value: ''
      })
    },
    deleate (rows, index) {
      rows.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">

</style>
