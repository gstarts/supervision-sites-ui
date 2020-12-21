<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
      <el-form-item label="寄仓客户" prop="customerName">
        <!--<el-input v-model="form.storeCustomer" placeholder="请输入寄仓客户" disabled/>-->
        <el-select
          filterable
          clearable
          v-model="queryParams.customerName" placeholder="请选择寄仓客户">
          <el-option
            v-for="type in customerList"
            :key="type.customerName"
            :label="type.customerName"
            :value="type.customerName"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="煤种" prop="goodsName">
        <el-select
          clearable
          filterable
          v-model="queryParams.goodsName" placeholder="请选择煤种"
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
          v-model="queryParams.beginTime"
          type="month"
          placeholder="选择日期"
          value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="时间" prop="startTime">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item>
       <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" v-hasPermi="['place:inStoreDoc:customsMonthHz']">搜索</el-button>
        <!--<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" >搜索</el-button>-->
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>

      <el-form-item>
        <download-excel
          class="export-excel-wrapper"
          :data="outstoreDocList"
          :fields="json_fields"
          :title="titleList"
          :footer="excelFooter"
          :default-value="defaultValue"
          name="每日调入调出汇总表.xls">
          <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
          <el-button type="primary" size="mini" @click="importExcel">导出EXCEL</el-button>
        </download-excel>
      </el-form-item>
    </el-form>

    <el-table ref="table" v-loading="loading" :data="outstoreDocList" max-height="700" :border="true" show-summary>
      <el-table-column label="日期" align="center" prop="column19" />
      <el-table-column label="当日入库车数" align="center" prop="column13" />
      <el-table-column label="当日调入数量" align="center" prop="column4" />
      <el-table-column label="当日出库车数" align="center" prop="column5" />
      <el-table-column label="当日调出数量" align="center" prop="column6" />
      <el-table-column label="库存" align="center" prop="column7" />
    </el-table>
  </div>
</template>

<script>
import { listOutstoreDoc,listOutstoreDocLike, getOutstoreDoc, delOutstoreDoc, addOutstoreDoc, updateOutstoreDoc } from "@/api/place/outstoreDoc";
import {getUserDepts} from "@/utils/charutils";
import {listStoreContract} from "@/api/place/storeContract";
import {customsDayList, customsMonthHz, customsMonthList} from "@/api/place/instoreDoc";
export default {
  name: "OutstoreDoc",
  data() {
    return {
      titleList:[],
      // Excel 页脚
      excelFooter: '',
      // 默认值
      defaultValue: '0',
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
      // 调入调出汇总表格数据
      outstoreDocList: [],
      //时间查询类型
      timeQueryTypeOption:[],
      //车型字典集
      outStoreVehicleTypesOption:[],
      //运输方式字典集
      transportModeDic:[],
      //数据来源字典集
      outStoreDataSourcesOption:[],
      //导出汇总库存
      outHZ:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        queryLogo:'I',
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        docNo: undefined,
        businessNo: undefined,
        //customerName: undefined,
        customerId: undefined,
        receiveId: undefined,
        receiveName: undefined,
        checkContractNo: undefined,
        mongoliaBillNo: undefined,
        vehicleNo: undefined,
        trailerNo1: undefined,
        trailerNo2: undefined,
        vehicleTeam: undefined,
        mongoliaNetWeight: undefined,
        mongoliaTareWeight: undefined,
        vehicleCount: undefined,
        driverName: undefined,
        vehicleTeamContact: undefined,
        vehicleTeamTel: undefined,
        vehicleType: undefined,
        measuringUnit: undefined,
        packMode: undefined,
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
        netWeight: undefined,
        tareWeight: undefined,
        roughWeight: undefined,
        genTime: undefined,
        genBy: undefined,
        poundTime: undefined,
        poundNo: undefined,
        batchNo: undefined,
        loadingBillNo: undefined,
        storeCode: undefined,
        storeCode2: undefined,
        storeCode3: undefined,
        storeCode4: undefined,
        hasManifest: undefined,
        hasDeclare: undefined,
        hasTransit: undefined,
        storeState: undefined,
        fileId: undefined,
        passNo: undefined,
        revision: undefined,
        memo: undefined,
        mongoliaRoughWeight: undefined,
        //goodsName: undefined,
        sendName: undefined,
        inTime: undefined,
        outTime: undefined,
        reserved1: undefined,
        reserved2: undefined,
        reserved3: undefined,
        reserved4: undefined,
        chnlNoI: undefined,
        chnlNoE: undefined,
        locationAlias: undefined,
        salesContractNo: undefined,
        coalBillNo: undefined,
        transportMode: undefined,
        transportUnit: undefined,
        dispatchNo: undefined,
        appUser: undefined,
        dataSources: undefined,
        voidReason: undefined,
        driverMobileNo: undefined,
        makerBy: undefined,
        boxTareWeight: undefined,
        voidDate: undefined,
        makerTime: undefined,
        inUser: undefined,
        outUser: undefined,
        beginTime:'',
        customerName: '',
        goodsName: '',
        hzKc: 'hzKc',
      },
      customerList:[],
      depts: [],
      contractSubList: [],
      dateRange:[],
      dataRange01:['',''],
      goodsNameList: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        placeId: [
          { required: true, message: "场所编号不能为空", trigger: "blur" }
        ],
        docNo: [
          { required: true, message: "提煤单号不能为空", trigger: "blur" }
        ],
        vehicleNo: [
          { required: true, message: "车号 不能为空", trigger: "blur" }
        ],
        storeState: [
          { required: true, message: "状态(0,待入场，2已入场，1已出场不能为空", trigger: "blur" }
        ],
      },
      json_fields:{
        "日期":"column19",
        //"寄仓客户":"column1",
        //"煤种":"column2",
        "当日入库车数":"column13",
        "当日调入数量":"column4",
        "当日出库车数":"column5",
        "当日调出数量":"column6",
        "库存":"column7",
      },
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getContract(this.queryParams.placeId, '1')
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
    // this.getList();
    //煤种 品名
    this.getDicts("coal_type").then(response => {
      this.goodsNameList = response.data;
    });
  },
  methods: {
    /** 查询出库明细单列表 */
    getList() {
      if(this.queryParams.customerName==''){
        this.msgError("寄仓客户选择不可为空");
        return
      }
      if(this.queryParams.goodsName==''){
        this.msgError("煤种选择不可为空");
        return
      }
      if(this.queryParams.beginTime==''){
        this.msgError("时间选择不可为空");
        return
      }
      /*if(this.dateRange.length==0){
        this.msgError("时间选择不可为空");
        return
      }*/

      this.loading = true;
      this.titleList=[];
      customsMonthHz(this.queryParams,this.dateRange).then(response => {
        this.outstoreDocList = response.data.cvHzKc;
        this.outHZ = response.data.hzKc;
        this.printTitle = '每日调入调出汇总表'
        this.titleList.push(this.printTitle)
        this.titleList.push("库存(结转上月):" + this.outHZ);
        this.total = response.total;
        this.loading = false;
      });
      /*customsMonthHz(this.addDateRange(this.queryParams,this.dateRange)).then(response => {
        this.dataRange01[0]=this.queryParams.beginTime
        this.dataRange01[1]=this.queryParams.endTime
        this.outstoreDocList = response.data;
        this.printTitle = '调入调出汇总表'
        this.titleList.push(this.printTitle)
        this.titleList.push(this.dataRange01[0] + '-' + this.dataRange01[1]);
        this.total = response.total;
        this.loading = false;
      });*/
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
        placeId: undefined,
        docNo: undefined,
        businessNo: undefined,
        customerName: undefined,
        customerId: undefined,
        receiveId: undefined,
        receiveName: undefined,
        checkContractNo: undefined,
        mongoliaBillNo: undefined,
        vehicleNo: undefined,
        trailerNo1: undefined,
        trailerNo2: undefined,
        vehicleTeam: undefined,
        mongoliaNetWeight: undefined,
        mongoliaTareWeight: undefined,
        vehicleCount: undefined,
        driverName: undefined,
        vehicleTeamContact: undefined,
        vehicleTeamTel: undefined,
        vehicleType: undefined,
        measuringUnit: undefined,
        packMode: undefined,
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
        netWeight: undefined,
        tareWeight: undefined,
        roughWeight: undefined,
        remark: undefined,
        genTime: undefined,
        genBy: undefined,
        poundTime: undefined,
        poundNo: undefined,
        batchNo: undefined,
        loadingBillNo: undefined,
        storeCode: undefined,
        storeCode2: undefined,
        storeCode3: undefined,
        storeCode4: undefined,
        hasManifest: undefined,
        hasDeclare: undefined,
        hasTransit: undefined,
        storeState: undefined,
        fileId: undefined,
        passNo: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        revision: undefined,
        memo: undefined,
        mongoliaRoughWeight: undefined,
        goodsName: undefined,
        sendName: undefined,
        inTime: undefined,
        outTime: undefined,
        reserved1: undefined,
        reserved2: undefined,
        reserved3: undefined,
        reserved4: undefined,
        chnlNoI: undefined,
        chnlNoE: undefined,
        locationAlias: undefined,
        salesContractNo: undefined,
        coalBillNo: undefined,
        transportMode: undefined,
        transportUnit: undefined,
        dispatchNo: undefined,
        appUser: undefined,
        dataSources: undefined,
        voidReason: undefined,
        driverMobileNo: undefined,
        makerBy: undefined,
        boxTareWeight: undefined,
        voidDate: undefined,
        makerTime: undefined,
        inUser: undefined,
        outUser: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      /*if(this.queryParams.queryLogo == undefined){
        this.msgError("查询时间类型不可为空,请选择")
        return
      }*/
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange=[];
      this.resetForm("queryForm");
      //this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加出库明细单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOutstoreDoc(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改出库明细单";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateOutstoreDoc(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addOutstoreDoc(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除出库明细单编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delOutstoreDoc(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/outstoreDoc/export', {
        ...this.queryParams
      }, `place_outstoreDoc.xlsx`)
    },
    //场所改变时，去查对应场所的
    changePlace(event) {
      this.getContract(event, '1')
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
      if(this.outstoreDocList.length == 0){
        this.$message("导出无效,请先查询数据是否为空。");
      }
    },
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        //index就当table的下标 0 为起始表头
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            //想计算哪行 index就等于那一行的下标 注意:下标起始值为0
            if (!isNaN(value) && index === 1) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 2) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 3) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 4) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 5) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 6) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 7) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 8) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 9) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 10) {
              return prev + curr;
            }
          }, 0);
        }
      });
      //输出一下得出的结果 是一个数组
      console.log(sums)
      //如果想对合计结果做处理可以使用如下方法(下方为处理低9列数据 除以1000 保留两位小数)
      sums[9]=(sums[9]/1000).toFixed(2);
      return sums;
    }
  }
};
</script>
