<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
    <el-form-item label="过磅时间" prop="keeper">
      <el-date-picker
          clearable
          size="mini"
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

    <el-table v-loading="loading" :data="sheetList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="过磅时间" align="center" prop="finalInspectionTime" />
      <el-table-column label="车牌号" align="center" prop="plateNum" />
      <el-table-column label="货物名称" align="center" prop="goodsName" />
      <el-table-column label="规格" align="center" prop="specification" />
      <el-table-column label="毛重" align="center" prop="grossWeight" />
      <el-table-column label="皮重" align="center" prop="tare" />
      <el-table-column label="箱皮重" align="center" prop="tareWeight" />
      <el-table-column label="净重" align="center" prop="netWeight" />
      <el-table-column label="供货单位" align="center" prop="deliveryUnit" />
      <el-table-column label="收货单位" align="center" prop="receivingUnit" />
      <el-table-column label="磅单状态 " align="center" prop="status" :formatter="poundStatusFormat"/>
      <el-table-column label="箱号" align="center" prop="containerNum" />
      <el-table-column label="保管员" align="center" prop="keeper" />
      <el-table-column label="计量员" align="center" prop="measurer" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
        <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="agree(scope.row)"
            v-hasPermi="['pound:sheet:edit']"
          >同意</el-button>
        <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="turndown(scope.row)"
            v-hasPermi="['pound:sheet:remove']"
          >驳回</el-button>
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
import { listSheet, getSheet, delSheet, addSheet, updateSheet, analysis } from "@/api/pound/poundlist";

export default {
  name: "Sheet",
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
      // 总条数
      total: 0,
      // 计量单表格数据
      sheetList: [],
      // 磅单状态
      poundStatusOptions:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        finalInspectionTime: undefined,
        measurementNum: undefined,
        plateNum: undefined,
        goodsName: undefined,
        specification: undefined,
        carrier: undefined,
        grossWeight: undefined,
        tare: undefined,
        tareWeight: undefined,
        netWeight: undefined,
        deliveryUnit: undefined,
        receivingUnit: undefined,
        flowDirection: undefined,
        status: "1",
        coalBillNum: undefined,
        containerNum: undefined,
        keeper: undefined,
        measurer: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getDicts("pound_measurement_status").then(response => {
      this.poundStatusOptions = response.data;
    });
    this.getList();
  },
  methods: {
    /** 查询计量单列表 */
    getList() {
      this.loading = true;
      listSheet(this.queryParams).then(response => {
        this.sheetList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
  
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        finalInspectionTime: undefined,
        measurementNum: undefined,
        plateNum: undefined,
        goodsName: undefined,
        specification: undefined,
        carrier: undefined,
        grossWeight: undefined,
        tare: undefined,
        tareWeight: undefined,
        netWeight: undefined,
        deliveryUnit: undefined,
        receivingUnit: undefined,
        flowDirection: undefined,
        status: "0",
        coalBillNum: undefined,
        containerNum: undefined,
        keeper: undefined,
        measurer: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 磅单翻译
    poundStatusFormat(row, column) {
      return this.selectDictLabel(this.poundStatusOptions, row.status);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
 
     /** 驳回 */
    turndown(row) {
      const ids = row.id || this.ids;
      const form={
                id:ids,
                status:'0'}
      updateSheet(form).then(response => {
        if (response.code === 200) {
                this.msgSuccess("操作成功");
                this.open = false;
                this.getList();
              }
            });
      
    },
    /** 同意 */
    agree(row) {
      const ids = row.id
      console.log(ids)
      const form={
                id:ids,
                status:'2'}
      updateSheet(form).then(response => {
        if (response.code === 200) {
                this.msgSuccess("操作成功");
                this.open = false;
                this.getList();
              }
            });
      
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('pound/sheet/export', {
        ...this.queryParams
      }, `pound_sheet.xlsx`)
    }
  }
};
</script>