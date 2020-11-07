<template>
  <el-row >
    <div class="app-container">
      <el-col :span="24">
        <div class="mb20">
          <el-button type="primary" icon="el-icon-search"  @click="handleQuery">搜索</el-button>
          <el-button type="warning" icon="el-icon-refresh"  @click="resetQuery">重置</el-button>
        </div>

        <el-card class="mb20">
          <el-col class="mb20" style="font-weight: bold;">
            <span>排序相关:</span>
          </el-col>
          <el-form :model="SelectPoundForm" ref="SelectPoundForm" :inline="true" label-width="68px">
          <el-form-item label="统计方式" prop="SelectPoundForm.statistics">
            <el-input v-model="SelectPoundForm.statistics" placeholder="流水车号" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序方式" prop="SelectPoundForm.sort">
            <el-input v-model="SelectPoundForm.sort" placeholder="流水车号" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序方向" prop="SelectPoundForm.direction">
            <el-input v-model="SelectPoundForm.direction" placeholder="流水车号" clearable></el-input>
          </el-form-item>
          </el-form>
        </el-card>
        <el-card class="mb20">
          <el-col class="mb20" style="font-weight: bold;">
            <span>查询条件相关:</span>
          </el-col>
          <el-form :model="SelectPoundForm" ref="SelectPoundForm" :inline="true" label-width="68px">
            <el-col :span="24">

            </el-col>
            <el-form-item label="车牌号码" prop="SelectPoundForm.plateNum">
              <el-input v-model="SelectPoundForm.plateNum" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="发货单位" prop="SelectPoundForm.deliveryUnit">
              <el-input v-model="SelectPoundForm.deliveryUnit" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="收货单位" prop="SelectPoundForm.receivingUnit">
              <el-input v-model="SelectPoundForm.receivingUnit" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="货物名称" prop="SelectPoundForm.goodsName">
              <el-input v-model="SelectPoundForm.goodsName" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="货物规格" prop="SelectPoundForm.specification">
              <el-input v-model="SelectPoundForm.specification" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="流向" prop="SelectPoundForm.flowDirection">
              <el-input v-model="SelectPoundForm.flowDirection" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="出入库" prop="SelectPoundForm.viaType">
              <el-input v-model="SelectPoundForm.viaType" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="提煤单号" prop="SelectPoundForm.coalBillNum">
              <el-input v-model="SelectPoundForm.coalBillNum" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="日期" prop="keeper" >
              <el-date-picker
                clearable
                style="width: 100%"
                v-model="dateRange"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00']"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-card class="mb20">
        <el-table  v-loading="loading" :data="sheetList" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="55" align="center" />
<!--          <el-table-column label="过磅时间" align="center" prop="finalInspectionTime" />-->
          <el-table-column label="收货单位" align="center" prop="receivingUnit" v-if="this.SelectPoundForm.sort =='receiving_unit'"/>
          <el-table-column label="车牌号" align="center" prop="plateNum" v-if="this.SelectPoundForm.sort =='plate_num'"/>
          <el-table-column label="车数" align="center" prop="countPlateNum" />
<!--          <el-table-column label="货物名称" align="center" prop="goodsName" />-->
<!--          <el-table-column label="规格" align="center" prop="specification" />-->
          <el-table-column label="毛重" align="center" prop="grossWeight" />
          <el-table-column label="皮重" align="center" prop="tare" />
<!--          <el-table-column label="箱皮重" align="center" prop="tareWeight" />-->
          <el-table-column label="净重" align="center" prop="netWeight" />
<!--          <el-table-column label="供货单位" align="center" prop="deliveryUnit" />-->

<!--          <el-table-column label="磅单状态 " align="center" prop="status" :formatter="poundStatusFormat" />-->
<!--          <el-table-column label="箱号" align="center" prop="containerNum" />-->
<!--          <el-table-column label="保管员" align="center" prop="keeper" />-->
<!--          <el-table-column label="计量员" align="center" prop="measurer" />-->
<!--          <el-table-column label="备注" align="center" prop="remark" />-->
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="abolition(scope.row)"
                v-hasPermi="['pound:sheet:edit']"
              >作废申请</el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        <pagination-->
<!--          v-show="total>0"-->
<!--          :total="total"-->
<!--          :page.sync="queryParams.pageNum"-->
<!--          :limit.sync="queryParams.pageSize"-->
<!--          @pagination="getList"-->
<!--        />-->
      </el-card>
    </div>
  </el-row>
</template>

<script>
import { listSheet, getSheet, delSheet, addSheet, updateSheet,analysis,queryPoundStatisticsList } from "@/api/pound/poundlist";

export default {
  name: "Sheet",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 显示隐藏
      show:true,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 计量单表格数据
      sheetList: [],
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
      },
      //磅单查询条件
      SelectPoundForm:{
        //车牌号
        plateNum:'',
        //发货单位
        deliveryUnit:'',
        //收货单位
        receivingUnit:'',
        //承运单位
        Carrier:'',
        //货物名称
        goodsName:'',
        //合同号
        ContractNo:'',
        //货物规格
        specification:'',
        //流向
        flowDirection:'',
        //提煤单号
        coalBillNum:'',
        //以下为查询条件
        //统计方式
        statistics:'',
        //排序方式
        sort:'',
        //排序方向
        direction:'',
      },
    };
  },
  mounted() {
    //磅单状态
       this.getDicts("pound_measurement_status").then(response => {
      this.poundStatusOptions = response.data;
    });
    // this.getList();
  },
  methods: {
    /** 查询计量单列表 */
    getList() {
      this.loading = true;
      queryPoundStatisticsList(this.addDateRange(this.SelectPoundForm, this.dateRange)).then(response => {
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
      this. SelectPoundForm={
        //车牌号
        plateNum:'',
          //发货单位
          deliveryUnit:'',
          //收货单位
          receivingUnit:'',
          //承运单位
          Carrier:'',
          //货物名称
          goodsName:'',
          //合同号
          ContractNo:'',
          //货物规格
          specification:'',
          //流向
          flowDirection:'',
          //提煤单号
          coalBillNum:'',
          //以下为查询条件
          //统计方式
          statistics:'',
          //排序方式
          sort:'',
          //排序方向
          direction:'',
      };
      this.dateRange=[];
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.show=true
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.reset();
      // this.handleQuery();
    },
    // 磅单翻译
      poundStatusFormat(row, column) {
      return this.selectDictLabel(this.poundStatusOptions, row.status);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
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
    }
  }
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
