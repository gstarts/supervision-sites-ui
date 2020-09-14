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
      <el-dialog title="收货人信息" :visible.sync="detailVisible" :before-close="close">
      <h4>收货人联系方式</h4>
      <el-form :model="basic" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="收货人代码" prop="consigneeId" >
              <el-input
                v-model="basic.consigneeId"
                placeholder="收货人代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货人名称" prop="name" >
              <el-input
                v-model="basic.name"
                placeholder="收货人名称"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="queryParams" class="mb20" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="联系号码" prop="communicationId" >
              <el-input
                v-model="queryParams.communicationId"
                placeholder="联系号码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通讯方式类别代码" prop="communication" >
              <el-select v-model="queryParams.communication" filterable placeholder="通讯方式类别代码">
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
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd($event,'one')">新增</el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave($event,'one')">保存</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete($event,'one')">删除</el-button>
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
        <el-table-column prop="communication" label="通讯方式类别代码" min-width="160"/>
      </el-table>
      <h4>收货具体联系人联系方式</h4>
      <el-form :model="basic" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="收货具体联系人名称" prop="specificName" >
              <el-input
                v-model="basic.specificName"
                placeholder="收货具体联系人名称"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="queryParamsInfo" class="mb20" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="联系号码" prop="communicationId" >
              <el-input
                v-model="queryParamsInfo.communicationId"
                placeholder="联系号码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通讯方式类别代码" prop="communication" >
              <el-select v-model="queryParamsInfo.communication" filterable placeholder="通讯方式类别代码">
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
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd($event,'two')">新增</el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave($event,'two')">保存</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete($event,'two')">删除</el-button>
        </el-row>
      </el-form>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="dataInfo"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        :row-class-name="tableRowClassName"
        @row-click='rowClickInfo'
        @selection-change="handleSelectionChangeInfo">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column type="index" label="序号" min-width="120"/>
        <el-table-column prop="communicationId" label="联系号码" min-width="120"/>
        <el-table-column prop="communication" label="通讯方式类别代码" min-width="160"/>
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
      dataInfo:[],
      basic:{
        consigneeId: '',
        name:'',
        specificName:''
      },
      // 查询参数
      queryParams: {
        communicationId:'',
        communication:''
      },
      // 查询参数
      queryParamsInfo: {
        communicationId:'',
        communication:''
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
      indexInfo:-1,
      selectInfo:[],
      selectList:[]

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
      this.data = this.$store.state.originalManifest.receivingInfo.consigneeList
      this.dataInfo = this.$store.state.originalManifest.receivingInfo.manifestContactList
      this.basic.consigneeId = this.$store.state.originalManifest.receivingInfo.consigneeId
      this.basic.name = this.$store.state.originalManifest.receivingInfo.name
      this.basic.specificName = this.$store.state.originalManifest.receivingInfo.specificName
      /** 通讯方式类别代码 */
      this.getDicts("sw_communication_type").then((response) => {
        this.Communication_type = response.data;
      });
    },
    // 新增
    handleAdd(e,name){
      if(name ==='one'){
        if(this.data.length===3) return
        const data = JSON.parse(JSON.stringify(this.queryParams))
        this.data.push(data)
      }
      if(name ==='two'){
        if(this.dataInfo.length===3) return
        const dataInfo = JSON.parse(JSON.stringify(this.queryParamsInfo))
        this.dataInfo.push(dataInfo)
      }
      this.dataEmpty(name)
    },
    // 暂存
    handleSave(e,name){
      if(name ==='one'){
        if(this.index ===-1) return
        this.data[this.index] = JSON.parse(JSON.stringify(this.queryParams))
        this.data = JSON.parse(JSON.stringify(this.data))
        this.index =-1
      }
      if(name ==='two'){
        if(this.indexInfo ===-1) return
        this.dataInfo[this.indexInfo] = JSON.parse(JSON.stringify(this.queryParamsInfo))
        this.dataInfo = JSON.parse(JSON.stringify(this.dataInfo))
        this.indexInfo =-1
      }

    },
    // 删除
    handleDelete(e,name){
      if(name ==='one'){
        this.data=this.data.filter(el=>!this.selectInfo.includes(el))
      }
      if(name ==='two'){
        this.dataInfo=this.dataInfo.filter(el=>!this.selectList.includes(el))
      }
    },
    // 点击行复制
    rowClick(row, column, event){
      this.index = JSON.parse(JSON.stringify(row)).rowIndex
      this.queryParams = JSON.parse(JSON.stringify(row))
    },
    rowClickInfo(row, column, event){
      this.indexInfo = JSON.parse(JSON.stringify(row)).rowIndex
      this.queryParamsInfo = JSON.parse(JSON.stringify(row))
    },
    handleSelectionChange(data){
      this.selectInfo = data
    },
    handleSelectionChangeInfo(data){
      this.selectList = data
    },
    // 添加index
    tableRowClassName(data){
      //把每一行的索引放进row
      data.row.rowIndex = data.rowIndex;
    },
    // 数据清空
    dataEmpty(name){
      if(name ==='one'){
        this.queryParams={
          communicationId:'',
          communication:''
        }
      }
      if(name ==='two'){
        this.queryParamsInfo={
          communicationId:'',
          communication:''
        }
      }
    },
    // 关闭回调
    close(){
      console.log('关闭组件');
      const data = JSON.parse(JSON.stringify(this.basic))
      data.consigneeList=JSON.parse(JSON.stringify(this.data))
      data.manifestContactList=JSON.parse(JSON.stringify(this.dataInfo))
      this.$store.dispatch('originalManifest/receivingInfo',data)
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
