<template>
  <div class="app-container">
<!--    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">-->

<!--      <el-form-item label="库位编号" prop="storeNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.storeNo"-->
<!--          placeholder="请输入库位编号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->

<!--      <el-form-item>-->
<!--        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:storelst:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="storelstList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="库位编号" align="center" prop="storeNo" />
      <el-table-column label="商品ID" align="center" prop="goodsId" />
      <el-table-column label="使用标识" align="center" prop="isUse" />
      <el-table-column label="开始使用时间" align="center" prop="startUseDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startUseDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endUseDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endUseDate, '{y}-{m}-{d}') }}</span>
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
import { listStorelst, listByStoreid} from "@/api/tax/storelst";
import {listByGoodsid} from "@/api/tax/goodslst";

export default {
  name: "Storelst",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 库位明细表格数据
      storelstList: [],
      //商品ID
      storeId: this.$route.query.storeId,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        storeNo: undefined
      },
    };
  },
  created() {
    this.getLstData(this.storeId);
  },
  methods: {
    /** 查询库位明细列表 */
    getList() {
      this.loading = true;
      listStorelst(this.queryParams).then(response => {
        this.storelstList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询明细 */
    getLstData(storeId) {
      listByStoreid(storeId).then((response) => {
        this.storelstList = response.rows;
        this.total = response.total;
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.storeLstId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/storelst/export', {
        ...this.queryParams
      }, `tax_storelst.xlsx`)
    }
  }
};
</script>
