<template>
  <el-row >
    <div class="app-container">
      <el-col :span="24">
        <el-card class="mb5">
          <el-col class="mb5" style="font-weight: bold;">
            <span>排序条件:</span>
          </el-col>
          <el-form :model="SelectPoundForm"  ref="SelectPoundForm" :inline="true" label-width="68px">
          <el-form-item label="统计方式" prop="statistics">
            <el-select v-model="SelectPoundForm.statistics" placeholder="请选择统计方式">
              <el-option
                v-for="dept in PoundInquireStatisticsOptions"
                :key="dept.dictValue"
                :label="dept.dictLabel"
                :value="dept.dictValue"
                value-key="dept[0].dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="排序方式" prop="sort">
            <el-select v-model="SelectPoundForm.sort" placeholder="请选择排序方式">
              <el-option
                v-for="dept in PoundInquireSortOptions"
                :key="dept.dictValue"
                :label="dept.dictLabel"
                :value="dept.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="排序方向" prop="direction">
            <el-select v-model="SelectPoundForm.direction" placeholder="请选择排序方向">
              <el-option
                v-for="dept in PoundInquireDirectionOptions"
                :key="dept.dictValue"
                :label="dept.dictLabel"
                :value="dept.dictValue"
              />
            </el-select>
          </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small"  @click="handleQuery">搜索</el-button>
            <el-button type="warning" icon="el-icon-refresh" size="small"  @click="resetQuery">重置</el-button>
          </el-form>
        </el-card>
        <el-card class="mb5">
          <el-col class="mb5" style="font-weight: bold;">
            <span>查询条件:</span>
          </el-col>
          <el-form :model="SelectPoundForm" ref="SelectPoundForm" :inline="true" label-width="68px">
            <el-col :span="24">
            </el-col>
            <el-form-item label="车牌号码" prop="plateNum">
              <el-input v-model="SelectPoundForm.plateNum" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="发货单位" prop="deliveryUnit">
              <el-input v-model="SelectPoundForm.deliveryUnit" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="收货单位" prop="receivingUnit">
              <el-input v-model="SelectPoundForm.receivingUnit" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="货物名称" prop="goodsName">
              <el-input v-model="SelectPoundForm.goodsName" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="货物规格" prop="specification">
              <el-input v-model="SelectPoundForm.specification" placeholder="流水车号" clearable></el-input>
            </el-form-item>
            <el-form-item label="流向" prop="flowDirection">
              <el-select v-model="SelectPoundForm.flowDirection" placeholder="请选择流向">
                <el-option
                  v-for="dept in stationIOFlagOptions"
                  :key="dept.dictValue"
                  :label="dept.dictLabel"
                  :value="dept.dictValue"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="出入库" prop="viaType">
              <el-select v-model="SelectPoundForm.viaType" placeholder="请选择流向">
                <el-option
                  v-for="dept in stationViaTypeOptions"
                  :key="dept.dictValue"
                  :label="dept.dictLabel"
                  :value="dept.dictValue"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="提煤单号" prop="coalBillNum">
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
                :default-time="['06:00:00']"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-card class="mb5">
        <el-table  v-loading="loading" :data="sheetList" >
          <el-table-column label="收货单位" align="center" prop="receivingUnit" v-if="this.SelectPoundForm.sort =='receiving_unit'"/>
          <el-table-column label="车牌号" align="center" prop="plateNum" v-if="this.SelectPoundForm.sort =='plate_num'"/>
          <el-table-column label="车数" align="center" prop="countPlateNum" />
          <el-table-column label="毛重" align="center" prop="grossWeight" />
          <el-table-column label="皮重" align="center" prop="tare" />
          <el-table-column label="净重" align="center" prop="netWeight" />
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
        <pagination
          v-show="conditionLogo"
          :total="total"
          :page.sync="SelectPoundForm.pageNum"
          :limit.sync="SelectPoundForm.pageSize"
          @pagination="getList"
        />
      </el-card>
    </div>
  </el-row>
</template>

<script>
import { listSheet, getSheet, delSheet, addSheet, updateSheet,analysis,queryPoundStatisticsList} from "@/api/pound/poundlist";

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
      //磅单查询条件
      SelectPoundForm:{
        pageNum: 1,
        pageSize: 10,
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
      //以下为Table隐藏/显示 标识
      DetailLogo:false,
      conditionLogo:false,
      //以下为字典项
      //流向
      stationIOFlagOptions:[],
      //车辆类型(出入库)
      stationViaTypeOptions:[],
      //统计方式
      PoundInquireStatisticsOptions:[],
      //排序方式
      PoundInquireSortOptions:[],
      //排序方向
      PoundInquireDirectionOptions:[],
    };
  },
  created() {
    //磅单状态
       this.getDicts("pound_measurement_status").then(response => {
      this.poundStatusOptions = response.data;
    });
       //流向
    this.getDicts("station_IO_flag").then(response => {
      this.stationIOFlagOptions = response.data;
    });
    //车辆类型(出入库)
    this.getDicts("station_via_type").then(response => {
      this.stationViaTypeOptions = response.data;
    });
    //统计方式
    this.getDicts("Pound_Inquire_statistics").then(response => {
      this.PoundInquireStatisticsOptions = response.data;
      this.SelectPoundForm.statistics=this.PoundInquireStatisticsOptions[0].dictLabel;
    });
    //排序方式
    this.getDicts("Pound_Inquire_sort").then(response => {
      this.PoundInquireSortOptions = response.data;
    });
    //排序方向
    this.getDicts("Pound_Inquire_direction").then(response => {
      this.PoundInquireDirectionOptions = response.data;
    });
  },
  methods: {
    /** 查询计量单列表 */
    getList() {
      this.loading = true;
      queryPoundStatisticsList(this.addDateRange(this.SelectPoundForm,this.dateRange)).then(response => {
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
      this.SelectPoundForm.pageNum = 1
      if(this.SelectPoundForm.statistics=='02' || this.SelectPoundForm.statistics == '按条件统计'){
        this.conditionLogo=true;
        this.DetailLogo=false;
        if(this.SelectPoundForm.sort==''){
          this.msgError("排序方式不可为空")
          return false;
        }
        this.getList();
      }else{
        this.msgError("统计方式不可为空")
        return false;
      }
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
    // // 多选框选中数据
    // handleSelectionChange(selection) {
    //   this.ids = selection.map(item => item.id)
    //   this.single = selection.length!=1
    //   this.multiple = !selection.length
    // },

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
    },

};
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
