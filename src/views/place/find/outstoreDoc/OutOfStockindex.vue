<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
      <el-form-item label="场所名称" prop="placeId">
        <el-select @change="handleQuery"
                   v-model="queryParams.placeId" placeholder="请选择场所" size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="寄仓客户" prop="customerName">
        <el-input v-model="queryParams.customerName" placeholder="请输入寄仓客户" clearable size="small"
                  @keyup.enter.native="handleQuery"/>
        <!--        <el-select
                  filterable
                  clearable
                  v-model="queryParams.customerName" placeholder="请选择寄仓客户" @change="changeCustomer">
                  <el-option
                    v-for="type in customerList"
                    :key="type.customerName"
                    :label="type.customerName"
                    :value="type.customerName"
                  />
                </el-select>-->
      </el-form-item>

      <el-form-item label="品名" prop="goodsName">
        <el-input v-model="queryParams.goodsName" placeholder="请输入寄仓合同编号" clearable size="small"
                  @keyup.enter.native="handleQuery"/>
        <!--        <el-select
                  clearable
                  filterable
                  v-model="queryParams.goodsName"
                  placeholder="请选择品名"
                  size="small">
                  <el-option
                    v-for="dict in goodsNameList"
                    :key="dict.dictLabel"
                    :label="dict.dictLabel"
                    :value="dict.dictLabel"
                  />
                </el-select>-->
      </el-form-item>
      <el-form-item label="状态" prop="storeState">
        <el-select v-model="queryParams.storeState" placeholder="请选择状态" clearable size="small" @change="handleQuery">
          <el-option
            v-for="dept in outStoreDocStateOption"
            :key="dept.dictValue"
            :label="dept.dictLabel"
            :value="dept.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-row>
        <el-form-item label="入场时间" prop="inTime">
          <el-date-picker
            v-model="dateRangeInTime"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出场时间" prop="outTime">
          <el-date-picker
            v-model="dateRangeOutTime"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
      </el-row>

      <div v-show="highSearch">
        <el-form-item label="寄仓合同" prop="checkContractNo">
          <el-input v-model="queryParams.checkContractNo" placeholder="请输入寄仓合同编号" clearable size="small"
                    @keyup.enter.native="handleQuery"/>
        </el-form-item>
        <el-form-item label="库位号" prop="storeCode">
          <el-input v-model="queryParams.storeCode" placeholder="请输入库位号" clearable size="small"
                    @keyup.enter.native="handleQuery"/>
        </el-form-item>
        <el-form-item label="提煤单号" prop="coalBillNo">
          <el-input
            v-model="queryParams.coalBillNo"
            placeholder="请输入提煤单号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="提煤客户" prop="receiveName">
          <el-input
            v-model="queryParams.receiveName"
            placeholder="请输入提煤客户"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="销售合同号" prop="salesContractNo">
          <el-input
            v-model="queryParams.salesContractNo"
            placeholder="请输入销售合同号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="车号 " prop="vehicleNo">
          <el-input
            v-model="queryParams.vehicleNo"
            placeholder="请输入车号 "
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="车型" prop="vehicleType">
          <el-select v-model="queryParams.vehicleType" placeholder="请选择车型" clearable size="small" @change="handleQuery">
            <el-option
              v-for="dept in outStoreVehicleTypesOption"
              :key="dept.dictValue"
              :label="dept.dictLabel"
              :value="dept.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="承运单位" prop="transportUnit">
          <el-input
            v-model="queryParams.transportUnit"
            placeholder="请输入承运单位"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="运输方式" prop="transportMode">
          <el-select v-model="queryParams.transportMode" filterable placeholder="请选择运输方式" @change="handleQuery">
            <el-option
              v-for="item in transportModeDic"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据来源" prop="dataSources">
          <el-select v-model="queryParams.dataSources" filterable placeholder="请选择数据来源" @change="handleQuery">
            <el-option
              v-for="item in outStoreDataSourcesOption"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入场司磅员" prop="inUser">
          <el-input
            v-model="queryParams.inUser"
            placeholder="请输入入场司磅员"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="出场司磅员" prop="outUser">
          <el-input
            v-model="queryParams.outUser"
            placeholder="请输入出场司磅员"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="highSearch = !highSearch">高级搜索</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:outstoreDoc:export']"
        >导出
        </el-button>
        <!--        <download-excel
                  class="export-excel-wrapper"
                  :data="outstoreDocList"
                  :fields="json_fields"
                  :title="titleList"
                  :footer="excelFooter"
                  :default-value="defaultValue"
                  name="嘉易达监管场所出库报表.xls">
                  &lt;!&ndash; 上面可以自定义自己的样式，还可以引用其他组件button &ndash;&gt;
                  <el-button type="primary" size="mini" @click="importExcel">导出EXCEL</el-button>
                </download-excel>-->
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="outstoreDocList" show-summary :summary-method="getSummaries" :height="this.outstoreDocList.length >5 ? tableHeight : 200">
      <af-table-column label="出库单号" align="center" prop="id"/>
      <el-table-column label="状态" width="110" align="center" prop="storeState" :formatter="outStoreDocStateFormatter"/>
      <af-table-column label="寄仓客户" align="center" prop="customerName"/>
      <el-table-column label="品名" align="center" prop="goodsName"/>
      <el-table-column label="库位号" align="center" prop="storeCodeAll"/>
      <af-table-column label="提煤单号" align="center" prop="coalBillNo"/>
      <af-table-column label="提煤客户" align="center" prop="receiveName"/>
      <af-table-column label="销售合同号" align="center" prop="salesContractNo"/>
      <af-table-column label="车号 " width="130" align="center" prop="vehicleNo"/>
      <el-table-column label="车型" align="center" prop="vehicleType"/>
      <af-table-column label="集装箱号" align="center" prop="containerNoAll"/>
      <el-table-column label="毛重" align="center" prop="roughWeight">
        <template slot-scope="scope">
          {{ scope.row.roughWeight.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="皮重" align="center" prop="tareWeight">
        <template slot-scope="scope">
          {{ scope.row.tareWeight.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="箱皮重" align="center" prop="boxTareWeight">
        <template slot-scope="scope">
          {{ scope.row.boxTareWeight.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="净重" align="center" prop="netWeight">
        <template slot-scope="scope">
          {{ scope.row.netWeight.toFixed(2) }}
        </template>
      </el-table-column>
      <af-table-column label="进场时间" align="center" prop="inTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="出场时间" align="center" prop="outTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.outTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </af-table-column>
      <el-table-column label="入场司磅员" align="center" prop="inUser">
        <template slot-scope="scope">
          {{ parseUserName(scope.row.inUser) }}
        </template>
      </el-table-column>
      <el-table-column label="出场司磅员" align="center" prop="outUser">
        <template slot-scope="scope">
          {{ parseUserName(scope.row.outUser) }}
        </template>
      </el-table-column>
      <el-table-column label="承运单位" align="center" prop="transportUnit"/>
      <el-table-column label="运输方式" width="110" align="center" prop="transportMode" :formatter="transModeFormatter"/>
      <!--      <af-table-column label="派车单号" align="center" prop="dispatchNo"/>-->
      <af-table-column label="提运单号" align="center" prop="loadingBillNo"/>
      <el-table-column label="数据来源" align="center" prop="dataSources" :formatter="outStoreDataSourcesFormatter"/>
      <af-table-column label="APP用户名" align="center" prop="appUser"/>
      <!--      <el-table-column label="司机姓名 " align="center" prop="driverName"/>
            <af-table-column label="司机手机号" align="center" prop="driverMobileNo"/>-->
      <el-table-column label="作废日期" align="center" prop="voidDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.voidDate, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作废原因" align="center" prop="voidReason"/>
      <el-table-column label="制单人" align="center" prop="makerBy">
        <template slot-scope="scope">
          {{ parseUserName(scope.row.makerBy) }}
        </template>
      </el-table-column>
      <el-table-column label="制单时间" align="center" prop="makerTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.makerTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计量单位" align="center" prop="measuringUnit">
        <template>
          <span>t</span>
        </template>
      </el-table-column>
      <af-table-column label="备注" align="center" prop="remark"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      :page-sizes="[20,30,50,200,400,500,1000,2000,3000,5000]"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  listOutstoreDoc,
  listOutstoreDocLike,
  getOutstoreDoc,
  delOutstoreDoc,
  addOutstoreDoc,
  updateOutstoreDoc, listOutstoreDocReportLike
} from "@/api/place/outstoreDoc";
import {getUserDepts} from "@/utils/charutils";
import {listStoreContract} from "@/api/place/storeContract";
import {listUser} from "@/api/system/user";

export default {
  name: "OutstoreDoc",
  data() {
    return {
      titleList: [],
      goodsNameList: [],
      highSearch: false,
      // Excel 页脚
      excelFooter: '',
      // 默认值
      defaultValue: '0',
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
      // 出库明细单表格数据
      outstoreDocList: [],

      // table 高度
      tableHeight: window.innerHeight - 280,
      //时间查询类型
      timeQueryTypeOption: [],
      //车型字典集
      outStoreVehicleTypesOption: [],
      //运输方式字典集
      transportModeDic: [],
      //数据来源字典集
      outStoreDataSourcesOption: [],
      //状态字典集
      outStoreDocStateOption: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        queryLogo: undefined,
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'id',
        isAsc: 'desc',
        placeId: undefined,
        customerName: undefined,
        // customerId: undefined,
        //receiveId: undefined,
        receiveName: undefined,
        checkContractNo: undefined,
        //mongoliaBillNo: undefined,
        vehicleNo: undefined,
        //trailerNo1: undefined,
        //trailerNo2: undefined,
        //vehicleTeam: undefined,
        //mongoliaNetWeight: undefined,
        //mongoliaTareWeight: undefined,
        //vehicleCount: undefined,
        //driverName: undefined,
        //vehicleTeamContact: undefined,
        //vehicleTeamTel: undefined,
        vehicleType: undefined,
        measuringUnit: undefined,
        packMode: undefined,
        //containerNo1: undefined,
        //containerNo2: undefined,
        //containerNo3: undefined,
        //containerNo4: undefined,
        //netWeight: undefined,
        //tareWeight: undefined,
        //roughWeight: undefined,
        //genTime: undefined,
        //genBy: undefined,
        //poundTime: undefined,
        //poundNo: undefined,
        //batchNo: undefined,
        //loadingBillNo: undefined,
        storeCode: undefined,
        //storeCode2: undefined,
        //storeCode3: undefined,
        //storeCode4: undefined,
        //hasManifest: undefined,
        //hasDeclare: undefined,
        //hasTransit: undefined,
        storeState: undefined,
        //fileId: undefined,
        //passNo: undefined,
        //revision: undefined,
        //memo: undefined,
        //mongoliaRoughWeight: undefined,
        goodsName: undefined,
        sendName: undefined,
        inTimeBegin: undefined,
        inTimeEnd: undefined,
        outTimeBegin: undefined,
        outTimeEnd: undefined,
        //reserved1: undefined,
        //reserved2: undefined,
        //reserved3: undefined,
        //reserved4: undefined,
        //chnlNoI: undefined,
        //chnlNoE: undefined,
        //locationAlias: undefined,
        salesContractNo: undefined,
        coalBillNo: undefined,
        transportMode: undefined,
        transportUnit: undefined,
        //dispatchNo: undefined,
        //appUser: undefined,
        dataSources: undefined,
        //voidReason: undefined,
        //driverMobileNo: undefined,
        //makerBy: undefined,
        //boxTareWeight: undefined,
        //voidDate: undefined,
        //makerTime: undefined,
        inUser: undefined,
        outUser: undefined
      },
      customerList: [],
      depts: [],
      contractSubList: [],
      dateRange: [],
      dataRange01: ['', ''],
      dateRangeInTime: [],
      dateRangeOutTime: [],
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      //this.getContract(this.queryParams.placeId, '1')
      this.getUserList()
    }
    this.getDicts("time_query_type").then(response => {
      this.timeQueryTypeOption = response.data;

    });
    //车辆类型翻译
    this.getDicts("outStore_vehicle_types").then(response => {
      this.outStoreVehicleTypesOption = response.data;
    });
    //运输方式
    this.getDicts("place_transport_type").then((response) => {
      this.transportModeDic = response.data;
    });
    //数据来源
    this.getDicts("outStore_data_sources").then((response) => {
      this.outStoreDataSourcesOption = response.data;
    });
    //状态
    this.getDicts("outStore_doc_state").then((response) => {
      this.outStoreDocStateOption = response.data;
    });
    // 煤种 品名
    this.getDicts("coal_type").then(response => {
      this.goodsNameList = response.data;
    });
    this.getList();
  },
  methods: {
    /** 查询出库明细单列表 */
    getList() {
      this.loading = true;
      this.titleList = [];
      listOutstoreDocReportLike(this.queryParams).then(response => {
        //this.dataRange01[0] = this.queryParams.beginTime
        //this.dataRange01[1] = this.queryParams.endTime
        this.outstoreDocList = response.rows;
        //this.printTitle = '嘉易达监管场所' + this.dataRange01[0] + '至' + this.dataRange01[1] + '出库统计报表'
        //this.titleList.push(this.printTitle)
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.processDateSearch()
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download('place/outstoreDoc/exportReport', {
        ...this.queryParams
      }, `出库明出表.xlsx`)
    },
    //场所改变时，去查对应场所的
    changePlace(event) {
      //this.getContract(event, '1')
      this.getUserList()
    },
    // //场所变化 获取对应场所的合同
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
    changeCustomer(event) {
      //改变客户时
      //从合同列表中，把对应公司名字的合同都提取出来
      this.form.checkContractNo = "";
      this.contractSubList = this.contractList.filter(
        (item) => item.customerName === event
      );
    },
    //运输方式 List翻译
    transModeFormatter(row, column) {
      return this.selectDictLabel(this.transportModeDic, row.transportMode);
    },
    outStoreDataSourcesFormatter(row, column) {
      return this.selectDictLabel(this.outStoreDataSourcesOption, row.dataSources);
    },
    outStoreDocStateFormatter(row, column) {
      return this.selectDictLabel(this.outStoreDocStateOption, row.storeState);
    },
    importExcel() {
    },
    //翻译用户名
    parseUserName(user) {
      let u = this.userList.find(item => item.userName === user)
      if (u) {
        return u.nickName
      } else {
        return user
      }
    },
    getUserList() {
      listUser({'deptId': this.queryParams.placeId}).then(response => {
        if (response.code === 200) {
          this.userList = response.rows
        }
      });
    },
    processDateSearch() {
      //入场时间
      if (this.dateRangeInTime && this.dateRangeInTime[0]) {
        this.queryParams.inTimeBegin = this.dateRangeInTime[0]
      } else {
        this.queryParams.inTimeBegin = undefined
      }
      if (this.dateRangeInTime && this.dateRangeInTime[1]) {
        this.queryParams.inTimeEnd = this.dateRangeInTime[1]
      } else {
        this.queryParams.inTimeEnd = undefined
      }
      //出场时间
      if (this.dateRangeOutTime && this.dateRangeOutTime[0]) {
        this.queryParams.outTimeBegin = this.dateRangeOutTime[0]
      } else {
        this.queryParams.outTimeBegin = undefined
      }
      if (this.dateRangeOutTime && this.dateRangeOutTime[1]) {
        this.queryParams.outTimeEnd = this.dateRangeOutTime[1]
      } else {
        this.queryParams.outTimeEnd = undefined
      }
    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '本页总重(t)';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value) && index === 11) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 12) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 13) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 14) {
              return prev + curr;
            }
          }, 0);
        }
      });
      //console.log(sums)
      //计算对应的列的总和/1000变成吨
      sums[11] = (sums[11] * 100 / 100).toFixed(2)
      sums[12] = (sums[12] * 100 / 100).toFixed(2)
      sums[13] = (sums[13] * 100 / 100).toFixed(2)
      sums[14] = (sums[14] * 100 / 100).toFixed(2)
      return sums;
    },
  }
};
</script>
