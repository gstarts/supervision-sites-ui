<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="堆场" prop="yardId">
        <el-select v-model="queryParams.yardId" placeholder="请选择堆场">
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
      <el-form-item label="区域类型" prop="zoneType">
        <el-select v-model="queryParams.zoneType" placeholder="请选择区域类型" clearable size="small">
          <el-option
            v-for="dict in yardZoneTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="库位编号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位状态" prop="storeState">
        <el-select v-model="queryParams.storeState" placeholder="请选择库位状态" clearable size="small">
          <el-option
            v-for="dict in storeStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
     <!-- <el-form-item label="变更原因" prop="updateReason">
        <el-select v-model="queryParams.updateReason" placeholder="请选择变更原因" clearable size="small">
          <el-option
            v-for="dict in updateReasonOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!--<el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['yard:store:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['yard:store:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['yard:store:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:store:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="storeList">
     <!-- <el-table-column type="selection" width="55" align="center" />-->
      <!--<el-table-column label="ID" align="center" prop="id" />-->
      <el-table-column label="堆场" align="center" prop="yardId" :fixed="true">
        <template slot-scope="scope">
          <span> {{depts.find(item=>item.deptId === scope.row.yardId).deptName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域类型" align="center" prop="zoneType" >
        <template slot-scope="scope">
          <span> {{yardZoneTypeOptions.find(item=>item.dictValue === scope.row.zoneType).dictLabel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域编号" align="center" prop="zoneCode" >
        <template slot-scope="scope">
          <span> {{depts.find(item=>item.deptId === scope.row.yardId).deptName}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="区域ID" align="center" prop="zoneId" />-->
      
      <el-table-column label="库位编号" align="center" prop="storeCode" />
      <!--<el-table-column label="库位层级" align="center" prop="storeLevel" />-->
      <el-table-column label="库位状态" align="center" prop="storeState" :formatter="storeStateFormat" />
      <!--<el-table-column label="集装箱号" align="center" prop="containerNo" />-->
      <el-table-column label="库位容量(KG)" align="center" prop="storeCapacity" />
      <!--<el-table-column label="空/重箱" align="center" prop="isHeavy" :formatter="isHeavyFormat" />-->
      <!--<el-table-column label="货物净重(KG)" align="center" prop="netWeight" />-->
     <!-- <el-table-column label="货物毛重(KG)" align="center" prop="roughWight" />-->
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo" />
      <el-table-column label="变更原因" align="center" prop="updateReason" />
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
import { listStore, getStore, delStore, addStore, updateStore } from "@/api/yard/store";
import {getUserDepts} from '@/utils/charutils'

export default {
  name: "Store",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      depts: [],
      // 总条数
      total: 0,
      // 堆场库存明细 表格数据
      storeList: [],
      // 库位状态字典
      storeStateOptions: [],
      yardZoneTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        yardId: undefined,
        zoneCode: undefined,
        zoneId: undefined,
        zoneType: undefined,
        storeCode: undefined,
        storeState: undefined,
        goodsBatchNo: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      
    };
  },
  created() {
    
    this.getDicts("yard_store_state").then(response => {
      this.storeStateOptions = response.data;
    });
    
    this.getDicts("yard_zone_type").then(response => {
      this.yardZoneTypeOptions = response.data;
    });

	  this.depts = getUserDepts('2')
	  if (this.depts.length > 0) {
		  this.queryParams.yardId = this.depts[0].deptId
		  this.getList();
	  }
   
  },
  methods: {
    /** 查询堆场库存明细 列表 */
    getList() {
      this.loading = true;
      listStore(this.queryParams).then(response => {
        this.storeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 库位状态字典翻译
    storeStateFormat(row, column) {
      return this.selectDictLabel(this.storeStateOptions, row.storeState);
    },
    // 变更原因字典翻译
    updateReasonFormat(row, column) {
      return this.selectDictLabel(this.updateReasonOptions, row.updateReason);
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
      this.download('yard/store/export', {
        ...this.queryParams
      }, `yard_store.xlsx`)
    }
  }
};
</script>
