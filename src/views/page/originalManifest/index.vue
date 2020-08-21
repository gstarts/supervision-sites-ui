<template>
  <div class="app-container">
    <div class="mb20">
      <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd">新增</el-button>
      <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave">暂存</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete">删除</el-button>
      <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
      <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>
    </div>
    <el-card class="mb10">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物运输批次号" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入岗位编码"
                clearable
                size="small"
              >
                <el-tooltip slot="append" class="item" effect="dark" content="系统分配批次号" placement="top-start">
                  <el-button  icon="el-icon-plus" @click="numFun"></el-button>
                </el-tooltip>
              </el-input>
            </el-form-item>
          </el-col>
         <el-col :span="6">
            <el-form-item label="运输方式代码" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="运输方式代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进出境口岸海关代码" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="进出境口岸海关代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承运人代码" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="承运人代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="运输工具代理企业代码" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="运输工具代理企业代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
         <el-col :span="6">
            <el-form-item label="货物装载时间" prop="postCode" >
              <el-date-picker
                class="datePicker" 
                v-model="dateTimeVal"
                type="datetime"
                placeholder="选择日期时间" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="卸货地代码" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="卸货地代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="到达卸货地日期" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="到达卸货地日期"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="传输企业备案关区" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="传输企业备案关区"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
         <el-col :span="6">
            <el-form-item label="企业代码" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="企业代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="舱单传输人名称" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="舱单传输人名称"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="备注"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>提运单信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd">新增</el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave">暂存</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete">删除</el-button>
          <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
          <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>
          <span>&nbsp;&nbsp;注：对选中数据修改完成之后请点击左侧“保存”按钮</span>
        </el-col>
      </el-row>
        <el-table
          ref="multipleTable"
          :data="data"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" min-width="55"/>
          <el-table-column prop="num" label="序号" min-width="120"/>
          <el-table-column prop="num" label="提(运)单号" min-width="120"/>
          <el-table-column prop="num" label="海关货物通关代码" min-width="150" />
          <el-table-column prop="num" label="货物总件数" min-width="120"/>
          <el-table-column prop="num" label="货物总毛重(kg)" min-width="120"/>
          <el-table-column prop="num" label="货物价值" min-width="120"/>
          <el-table-column prop="num" label="收货人名称" min-width="120"/>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // 按钮禁用状态
      btnDisable:{
        addBtn:false,
        saveBtn:false,
        delBtn:false,
        repBtn:true,
        copyBtn:false,
        refBtn:false,
      },
      // 查询参数
      queryParams: {
        postCode: undefined
      },
      statusOptions:[],
      dateTimeVal:'',
      data:[]
    }
  },
  methods:{
    // 新增
    handleAdd(){},
    // 暂存
    handleSave(){},
    // 删除
    handleDelete(){},
    // 申报
    handleReport(){},
    // 复制
    handleCopy(){},
    // 刷新
    handleRefresh(){},
    handleSelectionChange(){},
    numFun(){
      console.log(123)
    }
  }

}
</script>

<style lang="scss" scope>
.datePicker{
  width: auto !important;
}
</style>