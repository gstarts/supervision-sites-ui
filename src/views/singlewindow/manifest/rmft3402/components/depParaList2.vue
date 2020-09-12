<template>
<div>
  <el-dialog title="进出境口岸海关代码" :visible.sync="tableVisible" :before-close="close">
      <el-table class="mb20" :data="gridData.slice((this.diaPage.num - 1) * this.diaPage.size, (this.diaPage.num - 1) * this.diaPage.size + this.diaPage.size)">
        <el-table-column property="codeValue" label="海关代码" min-width="150"></el-table-column>
        <el-table-column property="codeName" label="海关名称" min-width="200"></el-table-column>
        <el-table-column  align="right" width="200">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入海关名称关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="right"
        background
        layout="prev, pager, next"
        :current-page="diaPage.num"
        :total="diaPage.total"
        :page-size="diaPage.size"
        @current-change="diaCurrentChange" />
    </el-dialog>
</div>
</template>
<script>
// 假数据
import depParaList from '@/mock/depParaList2.json'
export default {
  props:{
    tableVisible:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      search:'',
      gridData:[],
      diaPage:{
        num:1,
        size:10,
        total:100
      },
    }
  },
  watch:{
    search(){
      this.gridData = depParaList.filter(data => !this.search || data.codeName.toLowerCase().includes(this.search.toLowerCase()))
      this.diaPage.total = this.gridData.length
    }
  },
  mounted(){
    // 使用假数据
    this.gridData = depParaList
    this.diaPage.total = depParaList.length
  },
  methods:{
    // 选择某一条
    handleEdit(index,row){
      this.$emit('choose',row)
    },
    // 翻页
    diaCurrentChange(page){
      this.diaPage.num = page
    },
    // 关闭回调
    close(){
      console.log('关闭组件');
      this.$emit('close')
    }
  },
};
</script>
<style scoped>
</style>