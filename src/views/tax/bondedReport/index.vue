<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="显示类型" prop="deptId">
        <el-select
          v-model="queryParams.deptId"
          placeholder="请选择"
          clearable
          size="small"
          @change="handleQuery">
          <el-option
            v-for="dept in bondedReportOption"
            :key="dept.dictValue"
            :label="dept.dictLabel"
            :value="dept.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
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
      <el-table-column label="入库" align="center">
        <el-table-column label="批数" align="center" prop="InStoreBatchNo" />
        <el-table-column label="不含袋净重（kg)" align="center" prop="InStoreBagNetWeight" v-if="this.queryParams.deptId == 1 || this.queryParams.deptId == undefined ? true : false" >
          <template slot-scope="scope">
            {{ (scope.row.InStoreBagNetWeight).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column label="含袋净重（kg)" align="center" prop="InStoreBagRoughWeight" v-if="this.queryParams.deptId == 0 || this.queryParams.deptId == undefined ? true : false" >
          <template slot-scope="scope">
            {{ (scope.row.InStoreBagRoughWeight).toFixed(2)}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="出库" align="center">
        <el-table-column label="批数" align="center" prop="OutStoreBagSealNo" />
        <el-table-column label="不含袋净重（kg)" align="center" prop="OutStoreBagNetWeight" v-if="this.queryParams.deptId == 1 || this.queryParams.deptId == undefined ? true : false" >
        <template slot-scope="scope">
          {{ (scope.row.OutStoreBagNetWeight).toFixed(2)}}
        </template>
        </el-table-column>
        <el-table-column label="含袋净重（kg)" align="center" prop="OutStoreBagRoughWeight" v-if="this.queryParams.deptId == 0 || this.queryParams.deptId == undefined ? true : false" >
          <template slot-scope="scope">
            {{ (scope.row.OutStoreBagRoughWeight).toFixed(2)}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="库存" align="center">
        <el-table-column label="批数" align="center" prop="GoodsInfoBatchNo" />
        <el-table-column label="不含袋净重（kg)" align="center" prop="GoodsInfoBagNetWeight" v-if="this.queryParams.deptId == 1 || this.queryParams.deptId == undefined ? true : false" >
          <template slot-scope="scope">
            {{ (scope.row.GoodsInfoBagNetWeight).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column label="含袋净重（kg)" align="center" prop="GoodsInfoBagRoughWeight" v-if="this.queryParams.deptId == 0 || this.queryParams.deptId == undefined ? true : false">
          <template slot-scope="scope">
            {{ (scope.row.GoodsInfoBagRoughWeight).toFixed(2)}}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-row style="float:right;padding-top: 15px">
      <el-col span="24">
        <span>制表人：</span>{{this.$store.state.user.nickName}}
      </el-col>
      <el-col span="24">
        <span>审核人：</span>
      </el-col>
    </el-row>

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
import {selectAll} from "@/api/tax/sampling/lord";
// import {getUserDepts} from "@/utils/charutils";

export default {
  name: "Goods",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 总条数
      total: 0,
      // 货品表格数据
      reportList: [],
      // 日期范围
      dateRange: [],
      //查询方式字典集
      bondedReportOption:[],

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        deptId:undefined,
      },
    };
  },
  created() {
    this.getDicts("bondedReport_select").then(response =>{
      this.bondedReportOption=response.data;
    })
    // 0 监管场所，1保税库，2堆场，3企业
    // this.depts = getUserDepts('1')
    // if (this.depts.length > 0) {
    //   //默认选中第一个
    //   this.queryParams.deptId = this.depts[0].deptId;
    //   this.deptId = this.depts[0].deptId;
    //   this.getList()
    // }
this.getList();
  },
  methods: {
    /** 查询货品列表 */
    getList() {
      this.loading = true;
      this.reportList=[];
      selectAll(this.addDateRange(this.queryParams,this.dateRange)).then(response =>{
        if(response.code === 200){
          this.reportList.push(response.data);
          this.loading = false;
        }
      })
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
