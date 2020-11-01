<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-form-item label="场所名称" prop="placeId">
          <el-select @change="changePlace"
                     v-model="queryParams.placeId" placeholder="请选择场所" size="small">
            <el-option
              v-for="dept in depts"
              :key="dept.deptId"
              :label="dept.deptName"
              :value="dept.deptId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="统计方式" prop="statisticsMode">
          <el-select @change="changeStatistics"
            v-model="queryParams.statisticsMode" placeholder="请选择统计方式">
            <el-option
              v-for="type in statisticsModeDic"
              :key="type.key"
              :label="type.value"
              :value="type.key"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>

        <el-form-item label="进/出库" prop="direction">
          <el-select
            v-model="queryParams.direction" placeholder="请选择进出场类型">
            <el-option
              v-for="type in directionDic"
              :key="type.key"
              :label="type.value"
              :value="type.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="寄舱客户" prop="storeCustomer">
          <!--<el-input v-model="form.storeCustomer" placeholder="请输入寄舱客户" disabled/>-->
          <el-select
            filterable
            clearable
            v-model="queryParams.customerName" placeholder="请选择寄舱客户">
            <el-option
              v-for="type in customerList"
              :key="type.customerName"
              :label="type.customerName"
              :value="type.customerName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="品名" prop="goodsName">
          <el-select
            clearable
            v-model="queryParams.goodsName"
            placeholder="请选择品名"
            size="small">
            <el-option
              v-for="dict in goodsNameList"
              :key="dict.dictLabel"
              :label="dict.dictLabel"
              :value="dict.dictLabel"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="startTime">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <!--<el-form-item label="寄舱合同" prop="storeContractId">
          <el-select v-model="form.storeContractId" placeholder="请选择寄舱合同" @change="changeContract">
            <el-option
              v-for="type in contractSubList"
              :key="type.id"
              :label="type.contractNo"
              :value="type.id"
            />
          </el-select>
        </el-form-item>-->

        <!--<el-form-item label="品名" prop="goodsName">
          &lt;!&ndash;<el-input v-model="form.storeCustomer" placeholder="请输入寄舱客户" disabled/>&ndash;&gt;
          <el-select
            filterable
            clearable
            v-model="queryParams.goodsName" placeholder="请选择品名">
            <el-option
              v-for="type in customerList"
              :key="type.customerName"
              :label="type.customerName"
              :value="type.customerName"
            />
          </el-select>
        </el-form-item>-->

        <el-form-item label="货物类型" prop="packMode">
          <el-select
            v-model="queryParams.packMode" placeholder="请选择货物类型">
            <el-option
              v-for="type in packModeDic"
              :key="type.key"
              :label="type.value"
              :value="type.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-table v-loading="loading" :data="reportList">
      <af-table-column label="客户" align="center" prop="checkConsumer"/>
      <!--<af-table-column label="合同号" align="center" prop="checkContractNo"/>-->
      <af-table-column label="煤种" align="center" prop="goodsName"/>
      <af-table-column label="车数" align="center" prop="vehicleNo"/>
      <af-table-column label="毛重" align="center" prop="roughWeight"/>
      <af-table-column label="皮重" align="center" prop="tareWeight"/>
      <af-table-column label="净重" align="center" prop="netWeight"/>
    </el-table>
    <el-row class="countRow" v-show="reportList.length>0">
      <span v-show="vehicleCount>0">总车数:{{ vehicleCount }}</span>
      <span>毛重合计:{{ totalRoughWeight }}</span>
      <span>皮重合计:{{ totalTareWeight }}</span>
      <span>净重合计:{{ totalNetWeight }}</span>
    </el-row>
  </div>
</template>

<script>
import {getUserDepts} from "@/utils/charutils";
import {listStoreContract} from "@/api/place/storeContract";
import {statistics} from "@/api/place/info";

export default {
  name: "Report",
  data() {
    return {
      // 遮罩层
      loading: false,
      dateRange: ['', ''],
      // 选中数组
      ids: [],
      depts: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 堆场报表表格数据
      reportList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      directionDic: [
        {'key': 1, 'value': '入库'},
        {'key': 0, 'value': '出库'},
      ],
      statisticsModeDic: [
        {'key': 1, 'value': '寄舱客户汇总'},
        {'key': 2, 'value': '寄舱客户明细'}
      ],
      packModeDic: [
        {'key': 1, 'value': '集装箱'},
        {'key': 2, 'value': '散货'}
      ],
      // 查询参数
      queryParams: {
        placeId: undefined,
        direction: 1,
        customerName: undefined,
        startTime: undefined,
        endTime: undefined,
        statisticsMode: 1,
        packMode: 2
      },
      totalNetWeight: 0,
      totalRoughWeight: 0,
      totalTareWeight: 0,
      vehicleCount: 0,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        yardId: [
          {required: true, message: "堆场ID不能为空", trigger: "blur"}
        ],
      },
      customerList: [],
      contractSubList: [],
      result: {},
      goodsNameList: []
    };
  },
  created() {
    this.dateRange = ['', '']
    this.queryParams.startTime = this.dateRange[0]
    this.queryParams.endTime = this.dateRange[1]
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getContract(this.queryParams.placeId, '1')
    }
    //煤种 品名
    this.getDicts("coal_type").then(response => {
      this.goodsNameList = response.data;
    });
  },
  methods: {
    /** 查询堆场报表列表 */
    getList() {
      //this.loading = true;
      /*listReport(this.queryParams).then(response => {
        this.reportList = response.rows;
        this.total = response.total;
        this.loading = false;
      });*/
    },
    // 报表类型字典翻译
    reportTypeFormat(row, column) {
      return this.selectDictLabel(this.reportTypeOptions, row.reportType);
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
        yardId: undefined,
        containerStoreCount: undefined,
        containerTotal: undefined,
        emptyTotal: undefined,
        fullTotal: undefined,
        goodsStoreCount: undefined,
        goodsCount: undefined,
        goodsWeightTotal: undefined,
        goodsCurrentWeight: undefined,
        reportType: undefined,
        reportDate: undefined,
        remark: undefined,
        createdBy: undefined,
        createdTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      //先判断条件，再查询
      this.queryParams.startTime = this.dateRange[0]
      this.queryParams.endTime = this.dateRange[1]

      if (!this.queryParams.startTime || !this.queryParams.endTime) {
        this.$message.warning('请选择时间范围')
        return false
      }

      //统计方式
      if (this.queryParams.statisticsMode === 2) {
        //判断时间
        if (this.queryParams.customerName === undefined || this.queryParams.customerName === '') {
          this.$message.warning('请选择寄舱客户')
          return false
        }
      }

      console.log(this.queryParams)
      this.getInfo();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    getInfo() {
      this.loading = true
      this.reportList = []
      statistics(this.queryParams).then(response => {
        this.loading = false
        //this.result = response
        if (response.code === 200) {
          this.reportList = response.data.list
          //console.log(this.reportList)
          this.vehicleCount = response.data.vehicleCount
          this.totalNetWeight = response.data.totalNetWeight
          this.totalRoughWeight = response.data.totalRoughWeight
          this.totalTareWeight = response.data.totalTareWeight
        }
      })
    },

    //场所改变时，去查对应场所的
    changePlace(event) {
      this.getContract(event, '1')
    },

    //场所变化 获取对应场所的合同
    getContract(placeId, status) {
      //查找合同
      listStoreContract({'placeId': placeId, 'status': status}).then(response => {
        if (response.code === 200) {
          this.contractList = response.rows;
          if (this.contractList.length === 0) {
            //this.$message.warning('此场所没有有效的合同')
          } else {
            //重新给客户列表 赋值
            this.customerList = []
            for (let contract of this.contractList) {
              if (!this.customerList.find(cus => cus.customerId === contract.customerId)) {
                this.customerList.push(contract)
              }
            }
          }
        }
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yard/report/export', {
        ...this.queryParams
      }, `yard_report.xlsx`)
    },
    changeStatistics(event){
      if(event === 1){
        this.queryParams.customerName = ''
      }
    }
  }
};
</script>
<style scoped>
.countRow {
  margin-top: 8px;
}

.countRow span {
  margin-right: 10px;
  font-size: 14px;
}
</style>
