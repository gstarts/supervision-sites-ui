<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd">新增</el-button>
      <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave">暂存</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete">删除</el-button>
      <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
      <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>
    </div>
    <!-- 基本信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物运输批次号" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="货物运输批次号"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输方式代码" prop="postCode" >
              <el-input
              @focus="$store.dispatch('originalManifest/changeStatus')"
                v-model="queryParams.postCode"
                placeholder="运输方式代码"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进出境口岸代码" prop="postCode" >
              <el-input
                @focus="dialogTableVisible = true"
                v-model="queryParams.postCode"
                placeholder="进出境口岸代码"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="卸货地代码" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="卸货地代码"
                clearable

              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="理货开始时间" prop="postCode" >
              <el-date-picker
                class="datePicker"
                v-model="dateTimeVal"
                type="datetime"
                placeholder="选择日期时间" />
            </el-form-item>
          </el-col>
        <el-col :span="6">
            <el-form-item label="理货结束时间" prop="postCode" >
              <el-date-picker
                class="datePicker"
                v-model="dateTimeVal"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="理货公司代码" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="理货公司代码"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="理货责任人名称" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="理货责任人名称"
                clearable

              >
                <template slot="append" style="cursor: pointer;">联系方式</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="传输企业备案关区" prop="postCode" >
              <el-select v-model="depParaVal" filterable placeholder="传输企业备案关区">
                <el-option
                  v-for="item in depParaListJson"
                  :key="item.codeValue"
                  :label="item.codeName"
                  :value="item.codeValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业代码" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="企业代码"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="备注"
                clearable

              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 提运单信息 -->
    <el-card class="mb20">
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
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column prop="num" label="序号" min-width="120"/>
        <el-table-column prop="num" label="提(运)单号" min-width="120"/>
        <el-table-column prop="num" label="货物体积(M3)" min-width="150" />
        <el-table-column prop="num" label="货物总件数" min-width="120"/>
        <el-table-column prop="num" label="包装种类" min-width="120"/>
        <el-table-column prop="num" label="货物总毛重(KG)" min-width="120"/>
      </el-table>
      <el-pagination
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="提(运)单号" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="提(运)单号"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物体积(M3)" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="货物体积(M3)"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物总件数" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="货物总件数"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包装种类" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="包装种类"
                clearable

              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物总毛重(KG)" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="货物总毛重(KG)"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="变更原因" prop="postCode" >
              <el-button type="primary" size="mini" @click="changeReason=true">详细</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 集装箱信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>集装箱信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd">新增</el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave">暂存</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete">删除</el-button>
          <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
          <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column prop="num" label="序号" min-width="120"/>
        <el-table-column prop="num" label="集装箱(器)编号" min-width="120"/>
      </el-table>
      <el-pagination
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="集装箱(器)编号" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="集装箱(器)编号"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="集装箱(器)残损说明" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="集装箱(器)残损说明"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="变更原因" prop="postCode" >
              <el-button type="primary" size="mini" @click="changeReason=true">详细</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-dialog title="变更原因详细信息" :visible.sync="changeReason">
      <el-form :model="queryParams" class="mb20" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="变更申请联系人姓名" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="变更申请联系人姓名"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更申请联系人电话" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="变更申请联系人电话"
                clearable

              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="变更原因描述" prop="postCode" >
              <el-input
                type="textarea"
                v-model="queryParams.postCode"
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
import depParaListJson from '@/mock/depParaList2.json';
export default {
  data(){
    return{
      changeReason:false,
      depParaVal:'',
      depParaListJson,
      gridData: [],
      page:{
        num:1,
        size:10,
        total:0
      },
      dialogTableVisible:false,
      dialogTableVisible2:false,
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
      dateTimeVal:'',
      data:[]
    }
  },
  mounted(){
    // 初始化
    this.init()
  },
  methods:{
    async init(){
      // await this.depParaList()
    },
    // 新增
    handleAdd(){},
    // 暂存
    handleSave(){
      console.log('保存');
      // this.$saveStore("a","123")
      // this.$getStore('a')
      // this.$delStore("a")
    },
    // 删除
    handleDelete(){},
    // 申报
    handleReport(){},
    // 复制
    handleCopy(){},
    // 刷新
    handleRefresh(){},
    // 翻页
    currentChange(page){
      console.log(page);
    },
    // 组件选择
    choose(row){
      this.queryParams.postCode = row.codeName
      this.dialogTableVisible=false
    },
    // 关闭组件
    close(){
      this.dialogTableVisible=false
    },
    choose2(row){
      this.queryParams.postCode = row.codeName
      this.dialogTableVisible2=false
    },
    close2(){
      this.dialogTableVisible2=false
    },
    handleSelectionChange(){},
    numFun(){
      console.log(123)
    },
    // 请求接口
    depParaList(){
      return new Promise(resolve=>{
        this.$store.dispatch('originalManifest/depParaList',{tableName: 'CUS_CUSTOMS',rowNum: 5000}).then(data=>{
          resolve(data);
        })
      })
    }
  }

}
</script>

<style lang="scss" scope>
.right{
  text-align: right;
}
.datePicker{
  width: auto !important;
}
</style>
