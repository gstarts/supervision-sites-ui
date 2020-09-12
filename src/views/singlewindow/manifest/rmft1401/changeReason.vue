<!--
 * @Author: your name
 * @Date: 2020-08-24 09:38:32
 * @LastEditTime: 2020-08-24 13:57:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supervision-sites-ui/src/views/page/originalManifest/noticeInfo.vue
-->
<template>
  <div>
      <el-dialog title="变更原因信息" :visible.sync="detailVisible" :before-close="close">
      <el-form :model="queryParams" class="mb20" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="变更原因" prop="change" >
              <el-select v-model="queryParams.change" filterable placeholder="变更原因">
                <el-option
                  v-for="item in chgCode"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd">新增</el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave">保存</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete">删除</el-button>
        </el-row>
      </el-form>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        :row-class-name="tableRowClassName"
        @row-click='rowClick'
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column type="index" label="序号" min-width="120"/>
        <el-table-column prop="change" label="变更原因" min-width="120"/>
      </el-table>
      <el-form :model="queryParams" class="mb20" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="变更申请联系人姓名" prop="name" >
              <el-input
                v-model="queryParams.name"
                placeholder="变更申请联系人姓名"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更申请联系人电话" prop="communication" >
              <el-input
                v-model="queryParams.communication"
                placeholder="变更申请联系人电话"
                clearable

              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="变更原因" prop="reason" >
              <el-input
                type="textarea"
                v-model="queryParams.reason"
                placeholder="变更原因描述"
                clearable

              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    detailVisible:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      data:[],
      // 查询参数
      queryParams: {
        change:'',
        name:'',
        communication:'',
        reason:''
      },
      // 按钮禁用状态
      btnDisable:{
        addBtn:false,
        saveBtn:false,
        delBtn:false,
        repBtn:true,
        copyBtn:false,
        refBtn:false,
      },
      chgCode:[]
    }
  },
  mounted(){
    this.init()
  },
  watch:{
    'detailVisible': {
        handler: function(newVal) {
          if(newVal) this.init()
        },
    }
  },
  methods:{
    init(){
      this.data = this.$store.state.originalManifest.changeReason.list
      this.queryParams.name=this.$store.state.originalManifest.changeReason.name
      this.queryParams.communication=this.$store.state.originalManifest.changeReason.communication
      this.queryParams.reason=this.$store.state.originalManifest.changeReason.reason

      /** 变更原因 */
      this.getDicts("sw_change_reason").then((response) => {
        this.chgCode = response.data;
      });
    },
    // 新增
    handleAdd(){
      const data = {change:this.queryParams.change}
      this.data.push(data)
      this.dataEmpty()
    },
    // 暂存
    handleSave(){
      console.log('保存');
      this.$saveStore("a","123")
    },
  // 暂存
    handleSave(){
      if(this.index ===-1) return
      this.data[this.index] = JSON.parse(JSON.stringify(this.queryParams))
      this.data = JSON.parse(JSON.stringify(this.data))
      this.index =-1
    },
    // 删除
    handleDelete(){
      this.data=this.data.filter(el=>!this.selectInfo.includes(el))
    },
    // 点击行复制
    rowClick(row, column, event){
      this.index = JSON.parse(JSON.stringify(row)).rowIndex
      this.queryParams.change = JSON.parse(JSON.stringify(row)).change
    },
    handleSelectionChange(data){
      console.log(data);
      this.selectInfo = data
    },
    // 添加index
    tableRowClassName(data){
      //把每一行的索引放进row
      data.row.rowIndex = data.rowIndex;
    },
    // 数据清空
    dataEmpty(){
      this.queryParams.change = ''
    },
    close(){
      console.log('关闭组件');
      const data = JSON.parse(JSON.stringify(this.queryParams))
      data.list = JSON.parse(JSON.stringify(this.data))
      this.$store.dispatch('originalManifest/changeReason',data)
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
