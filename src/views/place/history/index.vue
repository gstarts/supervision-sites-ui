<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择场所">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区域编号" prop="zoneCode">
        <el-input
          v-model="queryParams.zoneCode"
          placeholder="请输入区域编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集装箱号" prop="containerNo">
        <el-input
          v-model="queryParams.containerNo"
          placeholder="请输入集装箱号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货物批次号" prop="goodsBatchNo" label-width="90px">
        <el-input
          v-model="queryParams.goodsBatchNo"
          placeholder="请输入货物批次号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货物名称" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入货物名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报关单号" prop="declarationNo">
        <el-input
          v-model="queryParams.declarationNo"
          placeholder="请输入报关单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务类型" prop="businessType">
        <el-input
          v-model="queryParams.businessType"
          placeholder="请输入业务类型进出移"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.updateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择更新时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:history:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="historyList">
      <el-table-column label="场所" align="center" prop="placeId" >
        <template slot-scope="scope">
          <span>{{depts.find(item=>item.deptId === scope.row.placeId).deptName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域编号" align="center" prop="zoneCode" />
      <el-table-column label="库位号" align="center" prop="storeCode" width="120px" />
      <!--<el-table-column label="占用状态" align="center" prop="storeState" />-->
      <el-table-column label="集装箱号" align="center" prop="containerNo" />
      <el-table-column label="空重状态" align="center" prop="isHeavy" />
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo" />
      <el-table-column label="货物名称" align="center" prop="goodsName" />
      <el-table-column label="货物种类" align="center" prop="goodsType" />
      <el-table-column label="件数单位" align="center" prop="countUnit" />
      <el-table-column label="毛重(KG)" align="center" prop="roughWight" />
      <el-table-column label="净重(KG)" align="center" prop="netWight" />
      <el-table-column label="货物标识码" align="center" prop="goodsIdentificationCode" />
      <el-table-column label="数量单位" align="center" prop="numUnit" />
      <el-table-column label="报关单号" align="center" prop="declarationNo" />
      <el-table-column label="业务编号" align="center" prop="businessNo" />
      <el-table-column label="业务类型" align="center" prop="businessType" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="更新人" align="center" prop="updateBy" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
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
import { listHistory} from "@/api/place/history";
import {getUserDepts} from '@/utils/charutils'

export default {
  name: "History",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      depts: [],
      // 总条数
      total: 0,
      // 场所库存明细历史 表格数据
      historyList: [],
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        zoneCode: undefined,
        storeCode: undefined,
        storeState: undefined,
        containerNo: undefined,
        isHeavy: undefined,
        goodsBatchNo: undefined,
        goodsName: undefined,
        goodsType: undefined,
        countUnit: undefined,
        roughWight: undefined,
        netWight: undefined,
        goodsIdentificationCode: undefined,
        numUnit: undefined,
        declarationNo: undefined,
        businessNo: undefined,
        businessType: undefined,
        updateTime: undefined
      },
    };
  },
  created() {
	  // 0 监管场所，1保税库，2场所，3企业
	  this.depts = getUserDepts('0')
	  if (this.depts.length > 0) {
		  this.queryParams.placeId = this.depts[0].deptId
		  this.getList();
	  }
  },
  methods: {
    /** 查询场所库存明细历史 列表 */
    getList() {
      this.loading = true;
      listHistory(this.queryParams).then(response => {
        this.historyList = response.rows;
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
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/history/export', {
        ...this.queryParams
      }, `place_history.xlsx`)
    }
  }
};
</script>
