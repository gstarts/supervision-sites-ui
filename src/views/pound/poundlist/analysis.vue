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
        <el-button
          type="info"
          size="small"
          v-print="'#testdayin'"
          @click="testprint">
          <!-- v-show="this.form.netWeight !== undefined && this.form.netWeight !== '' &&  this.form.plateNum !== undefined && this.form.plateNum !==''
           && this.form.locationNumber !== undefined &&  this.form.locationNumber !=='' && this.PoundForm.stationViaType ==='01'"-->
          <i class="fa fa-print" aria-hidden="true">&nbsp;&nbsp;测试打印</i>
        </el-button>
      </el-form-item>
    </el-form>

    <el-table  v-loading="loading" :data="analysisList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="过磅时间" align="center" prop="finalInspectionTime" />
      <el-table-column label="货物名称" align="center" prop="goodsName" />
      <el-table-column label="供货单位" align="center" prop="deliveryUnit" />
      <el-table-column label="收货单位" align="center" prop="receivingUnit" />
      <el-table-column label="进场净重" align="center" prop="netWeight" />
      <el-table-column label="出场净重" align="center" prop="netWeightE" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />


    <!--    获取实时重量-->
    <div id="testdayin">
      <div v-for="(item,index) in viewArr">
        <div :id="gennerateId(index)"></div>
        <div>{{item.goodsName}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import { listSheet, getSheet, delSheet, addSheet, updateSheet,analysis } from "@/api/pound/poundlist";

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
      // 测试数据
      viewArr:[],

      // 统计表格数据
      analysisList:[],
      // 磅单状态
      poundStatusOptions:[],
      // 日期范围
      dateRange: [],
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
        status: undefined,
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
  mounted() {
    //磅单状态
       this.getDicts("pound_measurement_status").then(response => {
      this.poundStatusOptions = response.data;
    });
    this.analysis();
  },
  methods: {
    /** 查询计量单列表 */
    getList() {
      this.loading = true;
      listSheet(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.sheetList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /**统计分析 */
    analysis(){
        this.show=false
        const form ={}
        analysis(form).then(response=>{
            this.analysisList= response.rows
          console.log(response.rows)
        })
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
      this.analysis();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 磅单翻译
      poundStatusFormat(row, column) {
      return this.selectDictLabel(this.poundStatusOptions, row.status);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {

      this.viewArr = selection
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },

    /** 申请作废按钮 */
    abolition(row) {
      const ids = row.id || this.ids;
      if(row.status !='1'){
          this.$confirm('是否确认申请作废', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
            const form={
                id:ids,
                status:'1'}
          return updateSheet(form);
        }).then(() => {
          this.getList();
          this.msgSuccess("申请成功");
        }).catch(function() {});
        }else{
            this.msgSuccess("申请中... 请稍后")
        }

    },

    /** 导出按钮操作 */
    handleExport() {
      this.download('pound/sheet/export', {
        ...this.queryParams
      }, `pound_sheet.xlsx`)
    },

    // testprint(){
    //
    //
    // },



    gennerateId:function (index) {
      return "printDiv"+index
    },
  }
};
</script>
