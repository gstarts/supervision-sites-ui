<template>
<!--  磅单统计 -->
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
        <el-form-item label="统计方式" prop="businessNo">
          <el-select @change="changeStatistics"
                     v-model="queryParams.businessNo" placeholder="请选择统计方式" size="small">
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
        <el-form-item label="车辆状态" prop="storeState">
          <el-select size="small"
                     v-model="queryParams.storeState" placeholder="请选择进车辆状态">
            <el-option
              v-for="type in directionDic"
              :key="type.key"
              :label="type.value"
              :value="type.key"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="寄仓客户" prop="customerName">
          <!--<el-input v-model="form.storeCustomer" placeholder="请输入寄仓客户" disabled/>-->
          <el-select size="small"
                     filterable
                     clearable
                     v-model="queryParams.customerName" placeholder="请选择寄仓客户">
            <el-option
              v-for="type in customerList"
              :key="type.eName"
              :label="type.eName"
              :value="type.eName"
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
            v-model="dateRange" size="small"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['06:00:00', '06:00:00']"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-form-item label="车辆类型" prop="vehicleType">
        <el-select size="small"
                   v-model="queryParams.vehicleType" placeholder="请选择车辆类型">
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
        <el-select v-model="queryParams.transportUnit" filterable clearable placeholder="请选择承运单位" size="small">
          <el-option
            v-for="item in transUnitList"
            :key="item.eAbbreviation"
            :label="item.eAbbreviation"
            :value="item.eAbbreviation">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="5">
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" :loading="loading">搜索
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="info" icon="fa fa-print" size="mini" @click="preparePrint" :loading="loading"> 打印
            </el-button>
            <el-button type="info" icon="fa fa-print" v-print="'#allPrint'" size="mini" @click="print"
                       style="display:none" ref="printBtn"> 真打印
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="handleExport">导出EXCEL</el-button>
            <!--            <download-excel
                          class="export-excel-wrapper"
                          :data="reportList"
                          :fields="json_fields"
                          :title="titleList"
                          :footer="excelFooter"
                          :default-value="defaultValue"
                          name="内蒙古嘉易达矿业有限公司统计报表.xls">
                          &lt;!&ndash; 上面可以自定义自己的样式，还可以引用其他组件button &ndash;&gt;

                        </download-excel>-->
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

    <el-table v-loading="loading" :data="reportList" height="600" max-height="600">
      <!--   checkConsumer   -->
      <!--      <af-table-column label="发货单位" align="center" prop="goodsName"/>-->
      <el-table-column label="序号" type="index" fixed="left"/>
      <af-table-column label="客户" align="center" prop="deliveryUnit" fixed="left">
        <template slot-scope="scope">
          {{ queryParams.vehicleType === '01' ? scope.row.checkConsumer : scope.row.customerName }}
        </template>
      </af-table-column>
      <!--<af-table-column label="合同号" align="center" prop="checkContractNo"/>-->
      <af-table-column label="煤种" align="center" prop="goodsName"/>
      <af-table-column :label="vehicleColumnName" align="center" prop="vehicleNo" width="120"/>
      <af-table-column label="发货单位" align="center">
        <template slot-scope="scope">
          {{ queryParams.vehicleType === '01' ? scope.row.checkConsumer : '嘉易达' }}
        </template>
      </af-table-column>
      <af-table-column label="收货单位" align="center">
        <template slot-scope="scope">
          {{ queryParams.vehicleType === '01' ? '嘉易达' : scope.row.customerName }}
        </template>
      </af-table-column>
      <af-table-column label="承运单位" align="center" prop="transportUnit">
        <template slot-scope="scope">
          {{ queryParams.vehicleType === '01' ? '' : scope.row.transportUnit }}
        </template>
      </af-table-column>
      <af-table-column label="毛重(吨)" align="center" prop="roughWeight">
        <template slot-scope="scope">
          {{ scope.row.roughWeight.toFixed(2) }}
        </template>
      </af-table-column>
      <af-table-column label="皮重(吨)" align="center" prop="tareWeight">
        <template slot-scope="scope">
          {{ scope.row.tareWeight.toFixed(2) }}
        </template>
      </af-table-column>
      <af-table-column label="净重(吨)" align="center" prop="netWeight">
        <template slot-scope="scope">
          {{ scope.row.netWeight.toFixed(2) }}
        </template>
      </af-table-column>
      <af-table-column label="毛重时间" align="center" width="180" :formatter="roughTimeFormatter"/>
      <af-table-column label="皮重时间" align="center" width="180" :formatter="tareTimeFormatter"/>
      <af-table-column label="净重时间" align="center" width="180" :formatter="netTimeFormatter"/>
    </el-table>
    <el-row class="countRow" v-show="reportList.length>0" style="color:#606266">
      <span>总车数: {{ vehicleCount }} 辆 </span>
      <span>毛重合计: {{ totalRoughWeight }} 吨 </span>
      <span>皮重合计: {{ totalTareWeight }} 吨 </span>
      <span>净重合计: {{ totalNetWeight }} 吨 </span>
    </el-row>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      :page-sizes="[200,500,1000,2000]"
      @pagination="getInfo"
    />
    <!--     打印区域-->
    <!--    v-show="printShow"-->
    <!--    <div id="allPrint" v-show="printShow">-->
    <!--    <hr size="20px">-->
    <div style="height: 100px;width:100%"></div>
    <div id="allPrint" style="margin-top: 0" :style="{display: printShow}">
      <div v-for="(item,index) in newArray" style="page-break-after:always">
        <div :id="generateId(index)"></div>
        <div class="box-card"
             style="margin: 0 auto 30px auto;font-size:18px;width:1000px;padding-left: 1px ;padding-top:50px;"
        >
          <!--      <div v-show="printSmallTitle">-->
          <div style="padding-left: 320px;font-size: 20px;margin-bottom: 20px">
            <span>{{ printTitle }}</span><br>
          </div>
          <div style="font-size: 16px;margin-bottom: 10px;padding-left: 20px;">
            <span>{{ timeTitle }}</span>
          </div>
          <div style="font-size: 16px;margin-bottom: 10px;padding-left: 20px;">
            <span>{{ shipper }}</span>
          </div>
          <el-table :data="item" id="analyouttable"
                    :header-cell-style="{background:'white',color:'black',border:'solid .5px black',fontSize:'14px',padding:'0 -3px',margin:'-3'}"
                    :cell-style="{border:'solid .5px black',fontSize:'14px',padding:'1px 0',color:'black'}"
                    style="border-right: solid 2px black;border-left: solid 2px black;border-top: solid 1px black;border-bottom: solid 2px black">
            <!--   checkConsumer   -->
            <!--      <af-table-column label="发货单位" align="center" prop="goodsName"/>-->
            <el-table-column label="序 号" type="index" align="center" width="85px">
              <template slot-scope="scope">{{ (scope.$index + 1) + 40 * index }}</template>
            </el-table-column>
            <!--            <af-table-column v-show="queryParams.vehicleType === '01'" label="客 户" align="center" prop="checkConsumer"/>
                        <af-table-column v-show="queryParams.vehicleType === '02'" label="客 户" align="center" prop="customerName"/>
            -->
            <af-table-column label="客 户" align="center" prop="deliveryUnit">
              <template slot-scope="scope">
                {{ queryParams.vehicleType === '01' ? scope.row.checkConsumer : scope.row.customerName }}
              </template>
            </af-table-column>
            <!--<af-table-column label="合同号" align="center" prop="checkContractNo"/>-->
            <af-table-column label="煤 种" align="center" prop="goodsName" width="100"/>
            <af-table-column :label="vehicleColumnName" align="center" prop="vehicleNo" width="120"/>
            <af-table-column label="毛 重 (吨)" align="right" prop="roughWeight" width="120px">
              <template slot-scope="scope">
                {{ scope.row.roughWeight.toFixed(2) }}
              </template>
            </af-table-column>
            <af-table-column label="皮 重 (吨)" align="right" prop="tare" width="120px">
              <template slot-scope="scope">
                {{ scope.row.tareWeight.toFixed(2) }}
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
import {poundReport} from "@/api/pound/poundlist";
import {listInfo} from "@/api/basis/enterpriseInfo";
import {parseTime} from "@/utils/common";

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

      printShow: 'none',
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
      printList: [],
      transUnitList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      directionDic: [
        {'key': '', 'value': '全部'},
        {'key': '2', 'value': '未出场'},
        {'key': '1', 'value': '已出场'},
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
        checkConsumer: undefined,
        customerName: undefined,
        beginTime: undefined,
        endTime: undefined,
        businessNo: 1,
        storeState: '',
        vehicleType: '01',
        transportUnit: undefined,
        vehicleTeam: undefined,
        pageSize: 200,
        pageNum: 1,
      },
      totalNetWeight: 0,
      totalRoughWeight: 0,
      totalTareWeight: 0,
      vehicleCount: 0,
      queryCondition: {},
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
    //debugger
    this.dateRange[0] = parseTime(new Date()).substring(0, 10) + ' 06:00:00'
    let today = new Date()
    let dateTime = today.setDate(today.getDate() + 1);
    let tomorrow = new Date(dateTime);
    this.dateRange[1] = parseTime(tomorrow).substring(0, 10) + ' 06:00:00'
    // this.dateRange[0]至{{this.dateRange[1]}}
    this.queryParams.beginTime = this.dateRange[0]

    this.queryParams.endTime = this.dateRange[1]
    // this.timeTitle = this.dateRange[0] + '至' + this.dateRange[1] + '按客户统计'
    // this.titleList.push(this.timeTitle)

    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      //this.getContract(this.queryParams.placeId, '1')
      this.getCustomer()
      this.getTransportUnitInfo();
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
    // 打印按钮
    print() {
      this.printShow = ''
      this.timer2 = setTimeout(() => {
        this.printShow = 'none'
      }, 3000);
    },
    //预打印按钮 准备数据，然后调打印方法
    preparePrint() {
      //判断总量是否超过2000
      if (this.total > 2000) {
        return this.$message.warning("数据已超过2000条，请重新选择查询条件，缩小数据范围，再进行打印")
      }
      if (this.reportList.length === 0) {
        return this.$message.warning("请在有搜索结果之后,再进行打印")
      }

      this.queryParams.checkConsumer = this.queryParams.customerName
      this.queryParams.vehicleTeam = this.queryParams.transportUnit
      /*if (this.queryParams.vehicleType === '01') {
        this.queryParams.checkConsumer = this.queryParams.customerName
        this.queryParams.vehicleTeam = this.queryParams.transportUnit
      } else {
        this.queryParams.checkConsumer = undefined
        this.queryParams.vehicleTeam = undefined
      }*/
      //如果未分页或只有一页，则不用再查询，直接可以打印了
      if (this.total === 0 || this.total / this.queryParams.pageSize <= 1) {
        this.printList = this.setPrintData(this.reportList)

      } else {
        //重新加载数据，加载完成后，显示打印区域
        //this.loading = true
        this.queryCondition = {...this.queryParams}
        this.queryCondition.id = 0 //用于作昌否分页的变量，0不分页，1 分页
        this.queryCondition.vehicleTeam = this.queryParams.transportUnit

        this.loading = true
        this.printList = []
        poundReport(this.queryCondition).then(response => {
          this.loading = false
          //this.result = response
          if (response.code === 200 && response.data.rows.length > 0) {
            this.printList = this.setPrintData(response.data.rows)
          } else {
            return this.$message.warning("没取到数据，请从新选取时间间隔")
          }
        }).catch(e => {
          this.loading = false
        })
      }
    },
    setPrintData(list) {
      this.loading = true
      this.printShow = ''
      let printList = list
      //打印数据，把数组拆分成多个数组放进一个新的数组
      let index = 0
      this.newArray = [];
      while (index < printList.length) {
        this.newArray.push(printList.slice(index, index += 40));
      }
      this.titleList = [];
      this.timeTitle = this.dateRange[0] + ' 至 ' + this.dateRange[1] + ' 磅单统计';
      this.titleList.push(this.timeTitle);

      if (this.queryCondition.vehicleType === '01') {
        this.shipper = '收货单位 : 嘉易达'
        this.titleList.push(this.shipper);
      } else {
        this.shipper = '发货单位 : 嘉易达'
        this.titleList.push(this.shipper);
      }

      this.excelFooter = '总车数' + ':' + this.vehicleCount + " 辆   " + '毛重合计' + ':' +
        this.totalRoughWeight + " 吨 " + '皮重合计' + ':' + this.totalTareWeight + " 吨 " + '净重合计' + ':' + this.totalNetWeight + " 吨"

      //1秒后再打开
      let that = this
      setTimeout(function () {
        that.$refs['printBtn'].$el.click()
        that.loading = false
      }, 2000)
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.vehicleColumnName = this.queryParams.businessNo === 1 ? '车 数' : '车 号'
      //先判断条件，再查询
      if (!this.dateRange || !this.dateRange[0] || !this.dateRange[1]) {
        this.$message.warning('请选择时间范围')
        return false
      }
      this.queryParams.beginTime = this.dateRange[0]
      this.queryParams.endTime = this.dateRange[1]
      console.log(this.queryParams.beginTime)

      if (!this.queryParams.beginTime || !this.queryParams.endTime) {
        this.$message.warning('请选择时间范围')
        return false
      }
      //统计方式
      if (this.queryParams.businessNo === 2) {
        this.queryParams.id = 1; //分页
      }
      this.getInfo();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      // this.handleQuery();
      this.reportList = []
      this.printList = []
    },
    getInfo() {
      this.loading = true
      this.reportList = []
      //if (this.queryParams.vehicleType === '01') {
      this.queryParams.checkConsumer = this.queryParams.customerName
      this.queryParams.vehicleTeam = this.queryParams.transportUnit
      //} else {
      //  this.queryParams.checkConsumer = undefined
      //  this.queryParams.vehicleTeam = undefined
      //}
      /*if (this.queryParams.vehicleType === '02') {
        //this.queryParams.vehicleTeam = this.queryParams.transportUnit
        this.queryParams.checkConsumer = undefined
        this.queryParams.vehicleTeam = undefined
      } else {
        this.queryParams.checkConsumer = this.queryParams.customerName
        this.queryParams.vehicleTeam = this.queryParams.transportUnit
      }*/
      poundReport(this.queryParams).then(response => {
        this.loading = false
        //this.result = response
        if (response.code === 200) {
          this.reportList = response.data.rows
          this.total = response.data.total
          //this.reportList = response.data
          if (this.reportList.length === 0) {
            this.$message.warning("没取到数据，请从新选取时间间隔")
          }
          //console.log(this.reportList)
          this.vehicleCount = response.data.vehicleCount
          this.totalNetWeight = response.data.totalNetWeight
          this.totalRoughWeight = response.data.totalRoughWeight
          this.totalTareWeight = response.data.totalTareWeight
        }
      }).catch(e => {
        this.loading = false
      })
    },
    //场所改变时，去查对应场所的
    changePlace(event) {
      //this.getContract(event, '1')
      this.getCustomer()
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
      if (this.reportList.length === 0) {
        this.$message.warning('没有查询结果可以导出')
        return false
      }
      //先判断条件，再查询
      if (!this.dateRange || !this.dateRange[0] || !this.dateRange[1]) {
        this.$message.warning('请选择时间范围')
        return false
      }

      this.queryParams.beginTime = this.dateRange[0]
      this.queryParams.endTime = this.dateRange[1]

      if (!this.queryParams.beginTime || !this.queryParams.endTime) {
        this.$message.warning('请选择时间范围')
        return false
      }

      this.queryParams.checkConsumer = this.queryParams.customerName
      this.queryParams.vehicleTeam = this.queryParams.transportUnit

      /*if (this.queryParams.vehicleType === '01') {
        this.queryParams.checkConsumer = this.queryParams.customerName
        this.queryParams.vehicleTeam = this.queryParams.transportUnit
      } else {
        this.queryParams.checkConsumer = undefined
        this.queryParams.vehicleTeam = undefined
      }*/

      this.download('place/notice/pound/export', {
        ...this.queryParams
      }, `内蒙古嘉易达矿业有限公司统计报表.xlsx`)
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
    getCustomer() { //查寄仓客户
      this.loading = true;
      let info = {"eType": '2', 'deptId': this.queryParams.placeId, 'companyType': '2'}
      listInfo(info).then(response => {
        this.customerList = []
        if (response.code === 200 && response.rows.length > 0) {
          for (let item of response.rows) {
            if (!this.customerList.find(unit => unit.eName === item.eName)) {
              this.customerList.push(item)
            }
          }
        }
        //this.transUnitList = response.rows;
        this.loading = false;
      });
    },
    //毛重时间
    roughTimeFormatter(row, column) {
      if (this.queryParams.businessNo === 1) {
        return ''
      } else {
        if (this.queryParams.vehicleType === '01') {
          return row.inTime
        } else {
          return row.outTime
        }
      }
    },
    //皮重时间
    tareTimeFormatter(row, column) {
      if (this.queryParams.statisticsMode === 1) {
        return ''
      } else {
        if (this.queryParams.vehicleType === '01') {
          return row.outTime
        } else {
          return row.inTime
        }
      }
    },
    //净重时间
    netTimeFormatter(row, column) {
      if (this.queryParams.statisticsMode === 1) {
        return ''
      } else {
        //if (this.queryParams.viaType === '01') {
        return row.outTime
        // else {
        //return row.outTime
        //}
      }
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
