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
                     v-model="queryParams.statisticsMode" placeholder="请选择统计方式" size="small">
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
        <el-form-item label="车辆状态" prop="direction">
          <el-select size="small"
            v-model="queryParams.direction" placeholder="请选择进车辆状态">
            <el-option
              v-for="type in directionDic"
              :key="type.key"
              :label="type.value"
              :value="type.key"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="寄仓客户" prop="deliveryUnit">
          <!--<el-input v-model="form.storeCustomer" placeholder="请输入寄仓客户" disabled/>-->
          <el-select size="small"
            filterable
            clearable
            v-model="queryParams.deliveryUnit" placeholder="请选择寄仓客户">
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
          <!--          <el-date-picker-->
          <!--            v-model="dateRange"-->
          <!--            type="datetimerange"-->
          <!--            value-format="yyyy-MM-dd"-->
          <!--            range-separator="至"-->
          <!--            start-placeholder="开始日期"-->
          <!--            end-placeholder="结束日期"-->
          <!--          :default-time="['06:00:00','06:00:00']">-->
          <!--          </el-date-picker>-->

          <el-date-picker
            v-model="dateRange"  size="small"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['06:00:00', '06:00:00']"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>

        <!--<el-form-item label="寄仓合同" prop="storeContractId">
          <el-select v-model="form.storeContractId" placeholder="请选择寄仓合同" @change="changeContract">
            <el-option
              v-for="type in contractSubList"
              :key="type.id"
              :label="type.contractNo"
              :value="type.id"
            />
          </el-select>
        </el-form-item>-->

        <!--<el-form-item label="品名" prop="goodsName">
          &lt;!&ndash;<el-input v-model="form.storeCustomer" placeholder="请输入寄仓客户" disabled/>&ndash;&gt;
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
      </el-row>
      <!--<el-form-item label="称重状态" prop="flowDirection">
        <el-select v-model="queryParams.storeState" placeholder="称重状态" @change="handleQuery">
          <el-option
            v-for="dept in store_stateDic"
            :key="dept.key"
            :label="dept.value"
            :value="dept.key"
          />
        </el-select>
      </el-form-item>-->
      <el-form-item label="车辆类型" prop="viaType">
        <el-select  size="small"
          v-model="queryParams.viaType" placeholder="请选择车辆类型">
          <el-option
            v-for="type in viaTypeDic"
            :key="type.key"
            :label="type.value"
            :value="type.key"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="承运单位" prop="transportUnit">
        <!--<el-input v-model="form.transportUnit" placeholder="请输入承运单位"/>-->
        <el-select v-model="queryParams.transportUnit" filterable clearable placeholder="请选择承运单位"  size="small">
          <el-option
            v-for="item in transUnitList"
            :key="item.eAbbreviation"
            :label="item.eAbbreviation"
            :value="item.eAbbreviation">
          </el-option>
        </el-select>
      </el-form-item>
      <!--        <el-form-item>-->
      <!--          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
      <!--          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
      <!--          <el-button type="info" icon="fa fa-print" v-print="'#allPrint'" @click="print" v-show="show"> 打印-->
      <!--          </el-button>-->
      <!--        </el-form-item>-->


      <el-form-item>
        <el-row :gutter="5">
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          </el-col>
          <el-col :span="6">
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="info" icon="fa fa-print" v-print="'#allPrint'" size="mini" @click="print"> 打印
            </el-button>
          </el-col>
          <el-col :span="6">
            <download-excel
              class="export-excel-wrapper"
              :data="reportList"
              :fields="json_fields"
              :title="titleList"
              :footer="excelFooter"
              :default-value="defaultValue"
              name="内蒙古嘉易达矿业有限公司统计报表.xls">
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
              <el-button type="primary" size="mini" @click="importExcel">导出EXCEL</el-button>
            </download-excel>
          </el-col>
        </el-row>
      </el-form-item>
      <!--      <download-excel-->
      <!--        class="export-excel-wrapper"-->
      <!--        :data="reportList"-->
      <!--        :fields="json_fields"-->
      <!--        :title="titleList"-->
      <!--        :footer="excelFooter"-->
      <!--        :default-value="defaultValue"-->
      <!--        name="内蒙古嘉易达矿业有限公司统计报表.xls">-->
      <!--        &lt;!&ndash; 上面可以自定义自己的样式，还可以引用其他组件button &ndash;&gt;-->
      <!--        <el-button type="primary" size="mini" @click="importExcel" v-show="showImport">导出EXCEL</el-button>-->
      <!--      </download-excel>-->
    </el-form>

    <!--    <div class="box-card" style="margin: 0 auto;font-size:18px;width:1000px;padding-left: 1px ;padding-top:50px"
             v-show="false">
          &lt;!&ndash;      <div v-show="printSmallTitle">&ndash;&gt;
          &lt;!&ndash;        <div style="padding-left: 300px;font-size: 20px;margin-bottom: 50px">&ndash;&gt;
          &lt;!&ndash;          &lt;!&ndash;        <span>{{this.printTitle}}</span><br>&ndash;&gt;&ndash;&gt;
          &lt;!&ndash;        </div>&ndash;&gt;
          &lt;!&ndash;        <div>&ndash;&gt;
          &lt;!&ndash;          <span>{{timeTitle}}</span>&ndash;&gt;
          &lt;!&ndash;        </div>&ndash;&gt;
          &lt;!&ndash;        <div>&ndash;&gt;
          &lt;!&ndash;          <span>{{shipper}}</span>&ndash;&gt;
          &lt;!&ndash;        </div>&ndash;&gt;
          &lt;!&ndash;      </div>&ndash;&gt;
          <el-table v-loading="loading" :data="reportList" id="analyouttable1"
                    :row-style="{height:'20px'}"
                    :header-cell-style="{background:'white',color:'black',border:'solid .5px black',fontSize:'14px',padding:'2 -3px',margin:'-2'}"
                    :cell-style="{border:'solid .5px black',fontSize:'14px',padding:'0',color:'black'}"
                    style="border-right: solid 2px black; border-left: solid 2px black;border-top: solid 1px black;border-bottom: solid 2px black">
            &lt;!&ndash;   checkConsumer   &ndash;&gt;
            &lt;!&ndash;      <af-table-column label="发货单位" align="center" prop="goodsName"/>&ndash;&gt;
            <el-table-column label="序号" type="index"/>
            <af-table-column label="客户" align="center" prop="deliveryUnit"/>
            &lt;!&ndash;<af-table-column label="合同号" align="center" prop="checkContractNo"/>&ndash;&gt;
            <af-table-column label="煤种" align="center" prop="goodsName"/>
            <af-table-column :label="queryParams.statisticsMode===1?'车数':'车号'" align="center" prop="plateNum"/>
            <af-table-column label="毛重" align="center" prop="grossWeight"/>
            <af-table-column label="皮重" align="center" prop="tare"/>
            <af-table-column label="净重" align="center" prop="netWeight"/>
          </el-table>
          <el-row class="countRow" v-show="reportList.length>0">
            <span v-show="vehicleCount>0">总车数:{{ vehicleCount }}</span>
            <span>毛重合计:{{ totalRoughWeight }}</span>
            <span>皮重合计:{{ totalTareWeight }}</span>
            <span>净重合计:{{ totalNetWeight }}</span>
          </el-row>
        </div>-->
    <!--     打印区域-->
    <!--    v-show="printShow"-->
    <!--    <div id="allPrint" v-show="printShow">-->
    <!--    <hr size="20px">-->
    <div id="allPrint">
      <div v-for="(item,index) in newArray" style="page-break-after:always">
        <div :id="generateId(index)"></div>
        <div class="box-card"
             style="margin: 0 auto 30px auto;font-size:18px;width:1000px;padding-left: 1px ;padding-top:20px;"
             v-show="true">
          <!--      <div v-show="printSmallTitle">-->
          <div style="padding-left: 300px;font-size: 20px;margin-bottom: 20px">
            <span>{{ printTitle }}</span><br>
          </div>
          <div style="font-size: 16px;margin-bottom: 5px;">
            <span>{{ timeTitle }}</span>
          </div>
          <div style="font-size: 16px;margin-bottom: 5px;">
            <span>{{ shipper }}</span>
          </div>
          <el-table v-loading="loading" :data="item" id="analyouttable"
                    :header-cell-style="{background:'white',color:'black',border:'solid .5px black',fontSize:'14px',padding:'0 -3px',margin:'-3'}"
                    :cell-style="{border:'solid .5px black',fontSize:'14px',padding:'0',color:'black'}"
                    style="border-right: solid 2px black;border-left: solid 2px black;border-top: solid 1px black;border-bottom: solid 2px black">
            <!--   checkConsumer   -->
            <!--      <af-table-column label="发货单位" align="center" prop="goodsName"/>-->
            <el-table-column label="序 号" type="index" align="center" width="70px">
              <template slot-scope="scope">{{ (scope.$index + 1) + 50 * index }}</template>
            </el-table-column>
            <af-table-column label="客 户" align="center" prop="deliveryUnit"/>
            <!--<af-table-column label="合同号" align="center" prop="checkContractNo"/>-->
            <af-table-column label="煤 种" align="center" prop="goodsName"/>
            <af-table-column :label="vehicleColumnName" align="center" prop="plateNum"/>
            <af-table-column label="毛 重 (吨)" align="right" prop="grossWeight" width="120px">
              <template slot-scope="scope">
                {{ scope.row.grossWeight.toFixed(2) }}
              </template>
            </af-table-column>
            <af-table-column label="皮 重 (吨)" align="right" prop="tare" width="120px">
              <template slot-scope="scope">
                {{ scope.row.tare.toFixed(2) }}
              </template>
            </af-table-column>
            <af-table-column label="净 重 (吨)" align="right" prop="netWeight" width="120px">
              <template slot-scope="scope">
                {{ scope.row.netWeight.toFixed(2) }}
              </template>
            </af-table-column>
          </el-table>
          <el-row class="countRow" v-show="index===newArray.length-1 ?  true : false">
            <span v-show="vehicleCount>0">总车数:{{ vehicleCount }} (辆)</span>
            <span>毛重合计:{{ totalRoughWeight }} (吨)</span>
            <span>皮重合计:{{ totalTareWeight }} (吨)</span>
            <span>净重合计:{{ totalNetWeight }} (吨)</span>
          </el-row>
        </div>
      </div>
      <!--                <el-row class="countRow" v-show="reportList.length>0">-->
      <!--                  <span v-show="vehicleCount>0">总车数:{{ vehicleCount }}</span>-->
      <!--                  <span>毛重合计:{{ totalRoughWeight }}</span>-->
      <!--                  <span>皮重合计:{{ totalTareWeight }}</span>-->
      <!--                  <span>净重合计:{{ totalNetWeight }}</span>-->
      <!--                </el-row>-->
    </div>
  </div>
  <!--  </div>-->

  <!--  </div>-->


</template>

<script>
import {getUserDepts} from "@/utils/charutils";
import {listStoreContract} from "@/api/place/storeContract";
import {report} from "@/api/pound/poundlist";
import {listInfo} from "@/api/basis/enterpriseInfo";

export default {
  name: "Report",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 控件日期时间
      dateRange: ['', ''],
      // 初始化时间
      nowDate: '',
      nextDate: '',
      //打印按钮显示隐藏
      show: true,
      // 导出按钮显示隐藏
      showImport: false,
      // 导出标题集合
      titleList: [],

      printShow: false,
      vehicleColumnName: '车 数',
      //发货单位
      shipper: '',
      // 导出格式
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ],
      // 导出Excel 字段
      json_fields: {
        "客户": "deliveryUnit",    //常规字段
        "煤种": "goodsName", //支持嵌套属性
        "车数": "plateNum",
        "毛重": "grossWeight",
        "皮重": "tare",
        "净重": "netWeight",

      },
      // 默认值
      defaultValue: '0',
      // Excel 页脚
      excelFooter: '',
      // 选中数组
      // 打印标题
      printTitle: '内蒙古嘉易达矿业有限公司统计报表',
      // 标题时间
      timeTitle: '',
      ids: [],
      depts: [],
      // 非单个禁用
      single: true,
      // 新的数组
      newArray: [],
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 堆场报表表格数据
      reportList: [],
      transUnitList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      directionDic: [
        {'key': '', 'value': '全部'},
        {'key': 'I', 'value': '未出场'},
        {'key': 'E', 'value': '已出场'},
      ],
      statisticsModeDic: [
        {'key': 1, 'value': '寄仓客户汇总'},
        {'key': 2, 'value': '寄仓客户明细'}
      ],
      packModeDic: [
        {'key': 1, 'value': '集装箱'},
        {'key': 2, 'value': '散货'}
      ],
      store_stateDic: [
        {'key': '2', 'value': '未完成'},
        {'key': '1', 'value': '已完成'},
      ],
      viaTypeDic: [
        {'key': '01', 'value': '蒙煤车'},
        {'key': '02', 'value': '外调车'},
      ],
      // 查询参数
      queryParams: {
        placeId: undefined,
        viaType: '01',
        deliveryUnit: undefined,
        startTime: undefined,
        endTime: undefined,
        statisticsMode: 1,
        packMode: 2,
        direction: '',
        transportUnit: undefined
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
    //this.titleList.push(this.printTitle);
    // 页面初始化获取时间0
    this.dateRange = ['', '']
    let aData = new Date();
    this.nowDate =
      aData.getFullYear() +
      "-" +
      (aData.getMonth() + 1) +
      "-" +
      (aData.getDate()) + ' ' + '06:00:00';
    this.dateRange[0] = this.nowDate;
    this.nextDate =
      aData.getFullYear() +
      "-" +
      (aData.getMonth() + 1) +
      "-" +
      (aData.getDate() + 1) + ' ' + '06:00:00';
    this.dateRange[1] = this.nextDate;
    // this.dateRange[0]至{{this.dateRange[1]}}
    this.queryParams.startTime = this.dateRange[0]

    this.queryParams.endTime = this.dateRange[1]
    // this.timeTitle = this.dateRange[0] + '至' + this.dateRange[1] + '按客户统计'
    // this.titleList.push(this.timeTitle)

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
    this.getTransportUnitInfo();
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
    // 打印按钮
    print() {
      //this.printShow = true;


      // this.timer2 = setTimeout(() => {
      //   this.printShow = false;
      // }, 2000);


      // this.printShow = false;
      // clearTimeout(this.timer1);
      // this.timer1 = setTimeout(() => {
      //   //设置延迟执行
      //   //this.reset();
      //   this.printShow = false;
      // }, 2000);

    },


    importExcel() {

    },

    // //合并单元格
    // arraySpanMethod({row, column, rowIndex, columnIndex}) {
    //   if ((rowIndex === 21 || rowIndex === 22) && columnIndex === 1) {
    //     return {
    //       rowspan: 1,
    //       colspan: 6
    //     }
    //   }
    // },


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
      this.vehicleColumnName = this.queryParams.statisticsMode === 1 ? '车 数' : '车 号'
      //先判断条件，再查询
      if (!this.dateRange || !this.dateRange[0] || !this.dateRange[1]) {
        this.$message.warning('请选择时间范围')
        return false
      }

      this.queryParams.startTime = this.dateRange[0]
      this.queryParams.endTime = this.dateRange[1]

      console.log(this.queryParams.startTime)

      if (!this.queryParams.startTime || !this.queryParams.endTime) {
        this.$message.warning('请选择时间范围')
        return false
      }

      //统计方式
      if (this.queryParams.statisticsMode === 2) {
        //判断时间
        // if (this.queryParams.customerName === undefined || this.queryParams.customerName === '') {
        //   this.$message.warning('请选择寄仓客户')
        //   return false
        // }
      }

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
      report(this.queryParams).then(response => {
        this.loading = false
        //this.result = response
        if (response.code === 200) {
          this.reportList = response.data.list
          if (this.reportList.length === 0) {
            this.$message.warning("没取到数据，请从新选取时间间隔")
          }
          //console.log(this.reportList)
          this.vehicleCount = response.data.vehicleCount
          this.totalNetWeight = response.data.totalNetWeight
          this.totalRoughWeight = response.data.totalRoughWeight
          this.totalTareWeight = response.data.totalTareWeight
          this.showImport = true;
          //打印数据，把数组拆分成多个数组放进一个新的数组
          let index = 0
          this.newArray = [];
          while (index < this.reportList.length) {
            this.newArray.push(this.reportList.slice(index, index += 50));
          }
          this.titleList = [];
          this.timeTitle = this.dateRange[0] + ' 至 ' + this.dateRange[1] + ' 磅单统计';
          this.titleList.push(this.timeTitle);

          if (this.queryParams.direction == '1') {
            this.shipper = '收货单位 : 嘉易达'
            this.titleList.push(this.shipper);
          } else {
            this.shipper = '发货单位 : 嘉易达'
            this.titleList.push(this.shipper);
          }

          this.excelFooter = '总车数' + ':' + this.vehicleCount + "    " + '毛重合计' + ':' +
            this.totalRoughWeight + "  " + '皮重合计' + ':' + this.totalTareWeight + "  " + '净重合计' + ':' + this.totalNetWeight
        }
      })
    },

    //场所改变时，去查对应场所的
    changePlace(event) {
      this.getContract(event, '1')
      this.getTransportUnitInfo()
    },

    // 打印操作，生成divID
    generateId: function (index) {
      return "printDiv" + index
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
              if (!this.customerList.find(cus => cus.customerName === contract.customerName)) {
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
    changeStatistics(event) {
      if (event === 1) {
        this.queryParams.deliveryUnit = ''
      }
    },
    getTransportUnitInfo() { //查承运单位
      this.loading = true;
      let info = {"eType": '2', 'deptId': this.queryParams.placeId, 'companyType': '4'}
      listInfo(info).then(response => {
        this.transUnitList = []
        if (response.code === 200 && response.rows.length > 0) {
          for (let item of response.rows) {
            if (!this.transUnitList.find(unit => unit.eAbbreviation === item.eAbbreviation)) {
              this.transUnitList.push(item)
            }
          }
        }

        //this.transUnitList = response.rows;
        this.loading = false;
      });
    },
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

@page {
  margin: 6mm;
}

</style>
