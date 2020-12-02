<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="120px">
      <el-form-item label="货物运输批次号" prop="declarationId">
        <el-input
          v-model="queryParams.declarationId"
          placeholder="请输入货物运输批次号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单证名称" prop="messageType">
        <el-select v-model="queryParams.messageType" clearable filterable placeholder="请选择查询的单证">
          <el-option
            v-for="dict in router"
            :key="dict.messageType"
            :label="dict.value"
            :value="dict.messageType"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="单证状态" prop="statementCode">
        <el-select v-model="queryParams.statementCode" clearable filterable placeholder="请选择状态">
          <el-option
            v-for="dict in statementCodeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="录入时间" prop="optime">
        <el-date-picker
          clearable
          size="small"
          style="width: 350px"
          v-model="dateRange"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-thumb"
          size="mini"
          :disabled="multiple"
          @click="declare"
          v-hasPermi="['manifest:head:declare']"
        >申报
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['manifest:head:remove']"
        >删除
        </el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="manifestList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="货物运输批次号" align="center" prop="declarationId"/>
      <el-table-column label="录入时间" align="center" prop="createTime"/>
      <el-table-column label="单证状态" align="center" prop="statementCode" :formatter="statementFormat"/>
      <el-table-column label="单证名称" align="center" prop="messageType" :formatter="messageTypeFormat"/>
      <!-- <el-table-column
        label="报文功能"
        align="center"
        prop="functionCode"
        :formatter="viaVehicleFormat"
      /> -->
      <el-table-column label="回执说明" align="center" prop="statementDescription"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="detail(scope.row)"
          >详情
          </el-button>
          <el-button
            v-if="scope.row.statementCode=='10' || scope.row.statementCode=='20'|| scope.row.statementCode=='0'|| scope.row.statementCode=='FF'|| scope.row.statementCode=='3' "
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            v-if="scope.row.statementCode!='2'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import {manifestList, declareManifest, logicDetailsByIds} from '@/api/manifest/query'
import {delReport} from "@/api/yard/report";

export default {
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 日期范围
      dateRange: [],
      // 总条数
      total: 0,
      // 舱单列表
      manifestList: [],
      // 单证状态
      statementCodeOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      router: [
        {path: '/rmft1401', messageType: 'MT1401', value: '原始舱单'},
        {path: '/rmft2401', messageType: 'MT2401', value: '预配舱单'},
        {path: '/rmft5402', messageType: 'MT5402', value: '出口理货报告'},
        {path: '/rmft3402', messageType: 'MT3402', value: '运抵报告'},
        {path: '/rmft4401', messageType: 'MT4401', value: '载货进境确报'},
        {path: '/rmft4403', messageType: 'MT4403', value: '空载进境确报'},
        {path: '/rmft4404', messageType: 'MT4404', value: '空载出境确报'},
        {path: '/rmft4406', messageType: 'MT4406', value: '空箱出境确报'}],
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        statementCode: undefined,
        declarationId: undefined,
        messageType: undefined,
        del: 0,
      }
    }
  },
  mounted() {
    this.getList()
    /** 单证状态 */
    this.getDicts("station_declear_status").then(response => {
      this.statementCodeOptions = response.data;
    });
  },
  methods: {
    /** 查询公路舱单列表 */
    getList() {
      //this.queryParams.statementCode="0"
      manifestList(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.manifestList = response.rows
          this.total = response.total
          this.loading = false
          //this.queryParams.statementCode=undefined
        }
      )
    },

    // 单证状态翻译
    statementFormat(row) {
      return this.selectDictLabel(this.statementCodeOptions, row.statementCode);
    },
    // 单证名称翻译
    messageTypeFormat(row) {
      const data = this.router.find(el => el.messageType === row.messageType)
      return data.value
    },

    // 报文功能翻译
    viaVehicleFormat() {

    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      const id = row.id || this.ids
      console.log(row)
      // 跳转到原始舱单页面
      const data = this.router.find(el => el.messageType === row.messageType)
      this.$router.push({path: '/singlewindow' + data.path, query: {id: id}})
    },
    /** 申报按钮操作 */
    declare(row) {
      const ids = row.id || this.ids;
      this.$confirm("是否确认进行批量申报", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function () {
          return declareManifest(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("申报成功");
        })
        .catch(function () {
        });
    },
    /**详情按钮 */
    detail(row) {
      const id = row.id || this.ids
      const data = this.router.find(el => el.messageType === row.messageType)
      // 调用 某页面 的初始化方法
      this.$router.push({path: '/singlewindow' + data.path, query: {id: id, flag: true}})
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除选中的舱单数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return logicDetailsByIds(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
  }
}
</script>
<style>

</style>
