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
      <el-dialog title="途径国家/地区信息" :visible.sync="detailVisible" :before-close="close">
      <el-form :model="queryParams" class="mb20" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="选择国家/地区" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="选择国家/地区"
                clearable
                size="small"
              />
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
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column prop="num" label="序号" min-width="120"/>
        <el-table-column prop="num" label="国家/地区代码" min-width="120"/>
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
      queryParams: {
        postCode: undefined
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
    }
  },
  methods:{
    // 新增
    handleAdd(){},
    // 暂存
    handleSave(){
      console.log('保存');
      this.$saveStore("a","123")
    },
    // 删除
    handleDelete(){},
    // 申报
    handleReport(){},
    // 复制
    handleCopy(){},
    // 刷新
    handleRefresh(){},
    handleSelectionChange(){},
    // 关闭回调
    close(){
      console.log('关闭组件');
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>