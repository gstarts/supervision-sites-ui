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
      <el-dialog title="通知人信息" :visible.sync="detailVisible" :before-close="close">
      <el-form :model="Notifyparty" class="mb20" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="通知人代码" prop="notifypartyId" >
              <el-input
                v-model="Notifyparty.notifypartyId"
                placeholder="通知人代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通知人名称" prop="name" >
              <el-input
                v-model="Notifyparty.name"
                placeholder="通知人名称"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="通知人地址(街道,邮箱)" prop="address" >
              <el-input
                v-model="Notifyparty.address"
                placeholder="通知人地址(街道,邮箱)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="联系号码" prop="communicationId" >
              <el-input
                v-model="Notifyparty.communicationId"
                placeholder="联系号码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通讯方式类别代码" prop="communication" >
              <el-select v-model="Notifyparty.communication" filterable placeholder="通讯方式类别代码">
                <el-option
                  v-for="item in Communication_type"
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
        <el-table-column prop="communicationId" label="联系号码" min-width="120"/>
        <el-table-column prop="communication" label="通讯方式类别代码" min-width="150" />
      </el-table>
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
      Notifyparty: {
        notifypartyId:'',//通知人代码
        name:'',//通知人名称
        address:'',//通知人地址
        communicationId:'',//联系号码
        communication:'',//通讯方式类别代码
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
      Communication_type:[],
      index:-1,
      selectInfo:[]
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
      this.data = this.$store.state.originalManifest.noticeInfo
      /** 通讯方式类别代码 */
      this.getDicts("Communication_type").then((response) => {
        this.Communication_type = response.data;
      });
    },
    // 新增
    handleAdd(){
      if(this.data.length===3) return
      const data = JSON.parse(JSON.stringify(this.Notifyparty))
      data.notifypartyId  =this.Notifyparty.notifypartyId
      data.name  =this.Notifyparty.name
      data.address  =this.Notifyparty.address
      this.data.push(data)
      this.dataEmpty()
    },
    // 暂存
    handleSave(){
      if(this.index ===-1) return
      this.data[this.index] = JSON.parse(JSON.stringify(this.Notifyparty))
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
      this.Notifyparty = JSON.parse(JSON.stringify(row))
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
      this.Notifyparty={
        notifypartyId:'',//通知人代码
        name:'',//通知人名称
        address:'',//通知人地址
        communicationId:'',//联系号码
        communication:'',//通讯方式类别代码
      }
    },
    // 关闭回调
    close(){
      console.log('关闭组件');
      this.$store.dispatch('originalManifest/noticeInfo',this.data)
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>