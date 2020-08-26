<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="保税库" prop="deptId">
        <el-select
          v-model="queryParams.deptId"
          placeholder="请输入保税库ID"
          clearable
          size="small"
          @change="handleQuery">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="寄舱客户名称" prop="sendCustomerName" label-width="150px">
        <el-input
          v-model="queryParams.sendCustomerName"
          placeholder="请输入寄舱客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="批次" prop="batch">-->
<!--        <el-input-->
<!--          v-model="queryParams.batch"-->
<!--          placeholder="请输入批次"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="唛头" prop="shippingMarks">-->
<!--        <el-input-->
<!--          v-model="queryParams.shippingMarks"-->
<!--          placeholder="请输入唛头"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="周期">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table v-loading="loading" :data="reportList" >
      <el-table-column label="寄舱客户名称" align="center" prop="sendCustomerName" />
      <el-table-column label="货物总数量" align="center" prop="packages" />
      <el-table-column label="入库总数量" align="center" prop="packagesIn" />
      <el-table-column label="出库总数量" align="center" prop="packagesOut" />
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
import { listReport,} from "@/api/tax/report";
import {getUserDepts} from "@/utils/charutils";

export default {
  name: "Goods",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 货品表格数据
      reportList: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('1')
    if (this.depts.length > 0) {
      //默认选中第一个
      this.queryParams.deptId = this.depts[0].deptId;
      this.deptId = this.depts[0].deptId;
      this.getList()
    }

  },
  methods: {
    /** 查询货品列表 */
    getList() {
      this.loading = true;
      listReport(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.reportList = response.rows;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/goods/export', {
        ...this.queryParams
      }, `tax_goods.xlsx`)
    }
  }
};
</script>
