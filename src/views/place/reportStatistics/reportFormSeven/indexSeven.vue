<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-row>
        <el-col :span="6">
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
        </el-col>

        <el-col :span="6">
          <el-form-item label="寄仓客户" prop="storeCustomer">
            <!--<el-input v-model="form.storeCustomer" placeholder="请输入寄仓客户" disabled/>-->
            <el-select
              filterable
              clearable
              v-model="queryParams.customerName" placeholder="请选择寄仓客户" @change="changeCustomer">
              <el-option
                v-for="type in customerList"
                :key="type.customerName"
                :label="type.customerName"
                :value="type.customerName"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="寄仓合同" prop="checkContractNo">
            <el-select

              filterable
              clearable
              v-model="queryParams.checkContractNo"
              placeholder="请选择寄仓合同"
              size="small">
              <el-option
                v-for="dept in contractSubList"
                :key="dept.contractNo"
                :label="dept.contractNo"
                :value="dept.contractNo"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="提煤单号" prop="coalBillNo">
            <el-input
              v-model="queryParams.coalBillNo"
              placeholder="请输入提煤单号"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="6">
          <el-form-item label="品名" prop="goodsName">
            <el-select
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
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="客户名称" prop="receiveName">
            <el-input
              v-model="queryParams.receiveName"
              placeholder="请输入客户名称"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="销售合同" prop="salesContract">
            <el-input
              v-model="queryParams.salesContract"
              placeholder="请输入销售合同"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="承运单位" prop="carrier">
            <el-input
              v-model="queryParams.carrier"
              placeholder="请输入承运单位"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="运输方式" prop="transportType">
            <el-select
              clearable
              filterable
              v-model="queryParams.transportType"
              placeholder="请输入运输方式"
              size="small">
              <el-option
                v-for="dict in transportOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="制单人" prop="createBy">
            <el-input
              v-model="queryParams.createBy"
              placeholder="请输入制单人"
              clearable
              size="small"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="制单时间" prop="preparedtime">
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              align="right"
              size="small"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-row>

      <!--      <el-row>-->
      <!--        <el-form-item label="进/出库" prop="direction">-->
      <!--          <el-select-->
      <!--            v-model="queryParams.direction" placeholder="请选择进出场类型">-->
      <!--            <el-option-->
      <!--              v-for="type in directionDic"-->
      <!--              :key="type.key"-->
      <!--              :label="type.value"-->
      <!--              :value="type.key"-->
      <!--            />-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->

      <!--        <el-form-item label="品名" prop="goodsName">-->
      <!--          <el-select-->
      <!--            clearable-->
      <!--            v-model="queryParams.goodsName"-->
      <!--            placeholder="请选择品名"-->
      <!--            size="small">-->
      <!--            <el-option-->
      <!--              v-for="dict in goodsNameList"-->
      <!--              :key="dict.dictLabel"-->
      <!--              :label="dict.dictLabel"-->
      <!--              :value="dict.dictLabel"-->
      <!--            />-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
      <!--        <el-form-item label="时间" prop="startTime">-->
      <!--          <el-date-picker-->
      <!--            v-model="dateRange"-->
      <!--            type="datetimerange"-->
      <!--            value-format="yyyy-MM-dd"-->
      <!--            range-separator="至"-->
      <!--            start-placeholder="开始日期"-->
      <!--            end-placeholder="结束日期"-->
      <!--          :default-time="['06:00:00','06:00:00']">-->
      <!--          </el-date-picker>-->

      <!--          <el-date-picker-->
      <!--            v-model="dateRange"-->
      <!--            type="datetimerange"-->
      <!--            align="right"-->
      <!--            start-placeholder="开始日期"-->
      <!--            end-placeholder="结束日期"-->
      <!--            value-format="yyyy-MM-dd">-->
      <!--          </el-date-picker>-->
      <!--        </el-form-item>-->

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


      <!--        <el-form-item label="货物类型" prop="packMode">-->
      <!--          <el-select-->
      <!--            v-model="queryParams.packMode" placeholder="请选择货物类型">-->
      <!--            <el-option-->
      <!--              v-for="type in packModeDic"-->
      <!--              :key="type.key"-->
      <!--              :label="type.value"-->
      <!--              :value="type.key"-->
      <!--            />-->
      <!--          </el-select>-->
      <!--
        </el-form-item>-->
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-col :span="6">
            <el-button type="info" icon="fa fa-print" size="mini" @click="printShow"> 打印
            </el-button>
          </el-col>
        </el-col>
        <el-col :span="1.5">
          <download-excel
            class="export-excel-wrapper"
            :data="reportList"
            :fields="json_fields"
            :title="titleList"
            :footer="excelFooter"
            :default-value="defaultValue"
            name="嘉易达监管场所库存情况报表.xls">
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button type="primary" size="mini" @click="importExcel">导出EXCEL</el-button>
          </download-excel>
        </el-col>

        <el-col :span="1.5">
          <el-button type="info" size="mini" icon="fa fa-print" v-print="'#allPrint' " @click="print" ref="printBtn"
                     v-show="false"> 打印
          </el-button>
        </el-col>
      </el-row>

    </el-form>
    <!--    展示数据-->
    <el-table v-loading="loading" :data="reportList" :border="true" show-summary :summary-method="getSummaries">
      <el-table-column label="寄仓客户" align="center" prop="column1"/>
      <el-table-column label="寄仓合同号" align="center" prop="column2"/>
      <el-table-column label="客户名称" align="center" prop="column19"/>
      <el-table-column label="销售合同" align="center" prop="column20"/>

      <el-table-column label="提煤单号" align="center" prop="column3"/>
      <el-table-column label="品名" align="center" prop="column21"/>
      <el-table-column label="提煤单重量" align="center" prop="column4">
        <template slot-scope="scope">
          {{ (scope.row.column4/1000).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column label="已分配未完成车数" align="center" prop="column5"/>
      <el-table-column label="已分配未提离重量(吨)" align="center" prop="column6">
        <template slot-scope="scope">
          {{ (scope.row.column6/1000).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column label="已完成车数" align="center" prop="column7"/>

      <el-table-column label="已提离重量(吨)" align="center" prop="column8">
        <template slot-scope="scope">
          {{ (scope.row.column8/1000).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column label="剩余重量(吨)" align="center" prop="column9">
        <template slot-scope="scope">
          {{ (scope.row.column9/1000).toFixed(2)}}
        </template>
      </el-table-column>

      <el-table-column label="承运单位" align="center" prop="column22"/>
      <el-table-column label="运输方式" align="center" prop="column23" :formatter="transportFormatter"/>
      <el-table-column label="制单人" align="center" prop="column24">
        <template slot-scope="scope">
          {{ parseUserName(scope.row.column24) }}
        </template>
      </el-table-column>
      <el-table-column label="制单时间" align="center" prop="column25"/>

    </el-table>


    <!--打印区域 弹出窗打印-->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="100%"
    >
      <el-button type="info" icon="fa fa-print" v-print="'#allPrint'" size="mini" @click="print"
                 ref="printBtn" class="styleButton"> 打印
      </el-button>
      <div id="allPrint" v-show="true">
        <div v-for="(item,index) in newArray" style="page-break-after:always">
          <div :id="gennerateId(index)"></div>
          <div class="box-card" style="margin: 0 auto;font-size:15px;width:1700px;padding-left: 1px ;padding-top:50px"
               id="print">
            <!--      <div v-show="printSmallTitle">-->
            <div style="font-size: 30px;margin-bottom: 50px" align="center">
              <span>{{ printTitle }}</span><br>
            </div>

            <!--            <div>-->
            <!--              <span>{{timeTitle}}</span>-->
            <!--            </div>-->
            <!--      <div>-->
            <!--        <span>{{shipper}}</span>-->
            <!--      </div>-->
            <!--      </div>-->

            <el-table v-loading="loading" :data="item" id="analyouttable"
                      :header-cell-style="{background:'white',color:'black',border:'solid .5px black',fontSize:'10px',padding:'2 -3px',margin:'-2'}"
                      :cell-style="{border:'solid .4px black',fontSize:'5px',padding:'5px 0',color:'black'}"
                      style="border-right: solid 2px black;border-left: solid 2px black;border-top: solid 1px black;border-bottom: solid 2px black">
              <af-table-column label="寄仓客户" align="center" width="120%" prop="column1"/>
              <af-table-column label="寄仓合同号" align="center" width="120%" prop="column2"/>


              <af-table-column label="客户名称" align="center" width="120%" prop="column19"/>
              <af-table-column label="销售合同" align="center" width="100%" prop="column20"/>


              <af-table-column label="提煤单号" align="center" width="100%" prop="column3"/>

              <af-table-column label="品名" align="center" width="80%" prop="column21"/>

              <af-table-column label="提煤单重量" align="center" width="100%" prop="column4"/>
              <af-table-column label="已分配未完成车数" align="center" width="80%" prop="column5"/>
              <af-table-column label="已分配未提离重量(吨)" align="center" width="100%" prop="column6"/>

              <af-table-column label="已完成车数" align="center" width="60%" prop="column7"/>
              <af-table-column label="已提离重量(吨)" align="center" width="100%" prop="column8"/>
              <af-table-column label="剩余重量(吨)" align="center" width="80%" prop="column9"/>


              <af-table-column label="承运单位" align="center" width="100%" prop="column22"/>
              <af-table-column label="运输方式" align="center" width="100%" prop="column23"
                               :formatter="transportFormatter"/>

              <af-table-column label="制单人" align="center" width="90%" prop="column24">
                <template slot-scope="scope">
                  {{ parseUserName(scope.row.column24) }}
                </template>
              </af-table-column>
              <!--      制单时间需要查询条件，from to-->
              <af-table-column label="制单时间" align="center" width="160%" prop="column25"/>


            </el-table>

          </div>

        </div>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import {getUserDepts} from "@/utils/charutils";
import {listStoreContract} from "@/api/place/storeContract";
import {statisticsSeven} from "@/api/place/info";
import {listUser} from "@/api/system/user";

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
      showPrint: false,
      //打印按钮显示隐藏
      show: false,
      // 导出按钮显示隐藏
      showImport: false,
      // 导出标题集合
      titleList: [],
      printSmallTitle: false,
      userList: [],
      //打印集合
      newArray: [],
      //打印弹出方向
      direction: 'ttb',

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
        "寄仓客户": "column1",    //常规字段
        "合同号": "column2", //支持嵌套属性
        "客户名称": "column19",
        "销售合同": "column20",
        "提煤单号": "column3",
        "品名": "column21",
        "提煤单重量": {
          field: "column4",
          callback: (value) => {
            return (value / 1000).toFixed(2)
          }
        },
        "已分配未完成车辆": "column5",
        "已分配未提离重量": "column6",
        "已完成车辆": "column7",
        "已提离重量": "column8",
        "剩余重量": "column9",
        "承运单位": "column22",
        "运输方式": {
          field: "column23",
          callback: (value) => {
            let u = this.transportOptions.find(item => item.dictValue === value)
            if (u) {
              return value = u.dictLabel
            } else {
              return value
            }
          }
        },
        "制单人":
          {
            field: "column24",
            callback: (value) => {
              let u = this.userList.find(item => item.userName === value)
              if (u) {
                return value = u.nickName
              } else {
                return value
              }
            }
          },
        "制单时间": "column25",

      },
      // 默认值
      defaultValue: '',
      // Excel 页脚
      excelFooter: '',
      // 选中数组
      // 打印标题
      prinTtitle: '',
      // 标题时间
      timeTitle: '',
      //运输方式
      transportOptions: [],
      ids: [],
      depts: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      drawer: false,
      // 总条数
      total: 0,
      // 堆场报表表格数据
      reportList: [],
      // 寄仓合同
      contractList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      directionDic: [
        {'key': 1, 'value': '入库'},
        {'key': 0, 'value': '出库'},
      ],
      statisticsModeDic: [
        {'key': 1, 'value': '寄仓客户汇总'},
        {'key': 2, 'value': '寄仓客户明细'}
      ],
      packModeDic: [
        {'key': 1, 'value': '集装箱'},
        {'key': 2, 'value': '散货'}
      ],
      // 查询参数
      queryParams: {
        placeId: undefined,
        customerName: undefined,
        startTime: undefined,
        endTime: undefined,
        coalBillNo: undefined,
        checkContractNo: undefined,
        // 客户姓名
        receiveName: undefined,
        // 销售合同
        salesContract: undefined,
        //承运单位
        carrier: undefined,
        //运输方式
        transportType: undefined,
        // 制单人
        createBy: undefined,
        // 制单时间
        preparedtime: undefined,

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

    this.getInfo()
    // 运输方式
    this.getDicts('place_transport_type').then(response => {
      this.transportOptions = response.data
      console.log(this.transportOptions)
    })
    // this.titleList.push(this.prinTtitle);
    // 页面初始化获取时间0
    this.dateRange = ['', '']
    // var aData = new Date();
    // this.nowDate =
    //   aData.getFullYear() +
    //   "-" +
    //   (aData.getMonth() + 1) +
    //   "-" +
    //   (aData.getDate())+' '+'06:00:00';
    // this.dateRange[0] = this.nowDate;
    // this.nextDate =
    //   aData.getFullYear() +
    //   "-" +
    //   (aData.getMonth() + 1) +
    //   "-" +
    //   (aData.getDate()+1)+' '+'06:00:00';
    // this.dateRange[1] = this.nextDate;
    // this.dateRange[0]至{{this.dateRange[1]}}
    this.queryParams.startTime = this.dateRange[0]

    this.queryParams.endTime = this.dateRange[1]
    this.timeTitle = this.dateRange[0] + '至' + this.dateRange[1] + '按客户统计'
    // this.titleList.push(this.timeTitle)
    // this.titleList.push(this.shipper);
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getContract(this.queryParams.placeId, '1')
    }
    // 煤种 品名
    this.getDicts("coal_type").then(response => {
      this.goodsNameList = response.data;
    });

  },
  mounted() {
    this.getUserList()
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
          // console.log(this.userList)
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 打印按钮
    print() {
      this.printSmallTitle = true;
      clearTimeout(this.timer1);
      this.timer1 = setTimeout(() => {
        //设置延迟执行
        //this.reset();
        this.printSmallTitle = false;
      }, 2000);

    },

    // 打印预览
    printShow() {
      this.drawer = true;
      if (this.showPrint == false) {
        this.showPrint = true;
      } else {
        // this.$refs['printBtn'].$el.click()
      }
    },
    gennerateId: function (index) {
      return "printDiv" + index

    },

    importExcel() {

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
      // this.queryParams.startTime = this.dateRange[0]
      // this.queryParams.endTime = this.dateRange[1]
      //
      // if (!this.queryParams.startTime || !this.queryParams.endTime) {
      //   this.$message.warning('请选择时间范围')
      //   return false
      // }

      this.getInfo();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.dateRange = ['', '']
      this.handleQuery();
    },

    getInfo() {
      this.loading = true
      this.reportList = [],
        this.titleList = [],
        statisticsSeven(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.loading = false
          //this.result = response
          if (response.code === 200) {
            this.reportList = response.data
            let index = 0
            this.newArray = [];
            while (index < this.reportList.length) {
              this.newArray.push(this.reportList.slice(index, index += 10));
            }
            ;
            // console.log(this.reportList)
            let date = this.dateRange[0] != '' ? this.dateRange[0] + '至' + this.dateRange[1] : ''
            this.printTitle = '嘉易达监管场所' + date + '大提煤单统计报表'
            this.titleList.push(this.printTitle)


            // this.vehicleCount = response.data.vehicleCount
            // this.totalNetWeight = response.data.totalNetWeight
            // this.totalRoughWeight = response.data.totalRoughWeight
            // this.totalTareWeight = response.data.totalTareWeight
            // if(this.reportList.length>0){
            //   this.showImport = true;
            //   if (this.reportList.length>20) {
            //     this.$message.info('亲，数据量有点大，请你先导出在打印')
            //     this.show = false;
            //
            //   }else{
            //     this.show = true;
            //   }
            //
            // } else{
            //   this.show = false;
            //   this.showImport = false;
            //
            // }
            // this.excelFooter = '总车数'+':' + this.vehicleCount+"    " +'毛重合计' +':'+
            //   this.totalRoughWeight+"  "+'皮重合计'+':'+this.totalRoughWeight+"  "+'净重合计'+':'+this.totalTareWeight
            //
            // console.log(this.titleList+1111111112222222)
          }
        })
    },

    //场所改变时，去查对应场所的
    changePlace(event) {
      this.getContract(event, '1')
      this.getUserList()//更新用户列表
    },

    //获取场所下有效的合同 列表
    getContract(placeId, status) {
      //查找合同
      listStoreContract({placeId: placeId, status: status}).then((response) => {
          if (response.code === 200) {
            this.contractList = response.rows;
            if (this.contractList.length === 0) {
              //this.$message.warning("此场所没有有效的合同");
            } else {
              //重新给客户列表 赋值
              this.customerList = [];
              for (let contract of this.contractList) {
                if (!this.customerList.find((cus) => cus.customerId === contract.customerId)) {
                  this.customerList.push(contract);
                }
              }
            }
          }
        }
      );
    },

    changeCustomer(event) {
      //改变客户时
      //从合同列表中，把对应公司名字的合同都提取出来
      this.form.checkContractNo = "";
      this.contractSubList = this.contractList.filter(
        (item) => item.customerName === event
      );
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yard/report/export', {
        ...this.queryParams
      }, `yard_report.xlsx`)
    },
    changeStatistics(event) {
      if (event === 1) {
        this.queryParams.customerName = ''
      }
    },
    transportFormatter(row, column) {
      return this.selectDictLabel(this.transportOptions, row.column23);
    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);

            if (!isNaN(value) && (index === 6 || index === 7 || index === 8 || index === 9 || index === 10 || index === 11)) {
              return prev + curr;
            }
          }, 0);
          //sums[index] += '';
        } else {
          //sums[index] = '';
        }
      });
      sums[6] = (sums[6] / 1000).toFixed(2)
      sums[8] = (sums[8] / 1000).toFixed(2)
      sums[10] = (sums[10] / 1000).toFixed(2)
      sums[11] = (sums[11] / 1000).toFixed(2)
      return sums;
    }
  }
}
</script>
<style>
.countRow {
  margin-top: 8px;
}

  .countRow span {
    margin-right: 10px;
    font-size: 14px;
  }

  @page {
    margin: 6mm;
    /*横向*/
  }
  .el-drawer__body {
    overflow: auto;

  }
  .styleButton{
    position: fixed;
    top: 50px;
    margin-left: 1500px

  }
</style>
