<template>
  <div class="app-container">
    <!--    根据日期区间，期初库存（开始时间前的库存），当期入库，当期出库，当期库存，-->
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
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
      <!--      <el-form-item label="寄仓合同" prop="column2">
              <el-input
                v-model="queryParams.column2"
                placeholder="请输入寄仓合同"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <el-form-item label="寄仓客户" prop="storeCustomer">
        <!--<el-input v-model="form.storeCustomer" placeholder="请输入寄仓客户" disabled/>-->
        <el-select
          filterable
          clearable
          v-model="queryParams.customerName" placeholder="请选择寄仓客户" @change="handleQuery">
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
          filterable
          v-model="queryParams.goodsName"
          placeholder="请选择品名"
          size="small"
          @change="handleQuery">
          <el-option
            v-for="dict in goodsNameList"
            :key="dict.dictLabel"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>


      <!--        <el-form-item label="统计方式" prop="statisticsMode">-->
      <!--          <el-select @change="changeStatistics"-->
      <!--            v-model="queryParams.statisticsMode" placeholder="请选择统计方式">-->
      <!--            <el-option-->
      <!--              v-for="type in statisticsModeDic"-->
      <!--              :key="type.key"-->
      <!--              :label="type.value"-->
      <!--              :value="type.key"-->
      <!--            />-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
      <!--      </el-row>-->

      <el-row>
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
            v-model="dateRange"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']">
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

        <el-form-item>
          <!--          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
          <!--          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
          <!--          <el-button type="info" icon="fa fa-print" v-print="'#print' " @click="print"> 打印-->
          <!--          </el-button>-->
          <el-row :gutter="5">
            <el-col :span="6">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            </el-col>
            <el-col :span="6">
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="info" icon="fa fa-print" size="mini" @click="printShow"> 打印
              </el-button>
            </el-col>
            <el-col :span="6">
              <download-excel
                class="export-excel-wrapper"
                type="xls"
                :data="reportList"
                :fields="json_fields"
                :title="titleList"
                :footer="excelFooter"
                :default-value="defaultValue"
                :stringifyLongNum="true"
                name="内蒙古嘉易达矿业有限公司统计报表.xls">
                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                <el-button type="primary" size="mini" @click="importExcel">导出EXCEL</el-button>
              </download-excel>
            </el-col>
            <!--            -->

              <el-button type="info" icon="fa fa-print" v-print="'#allPrint'" size="mini" @click="print"
                         v-show="buttonShow" ref="printBtn" > 打印
              </el-button>

          </el-row>
        </el-form-item>
      </el-row>
      <!--      <download-excel-->
      <!--        class="export-excel-wrapper"-->
      <!--        :data="reportList"-->
      <!--        :fields="json_fields"-->
      <!--        :title="titleList"-->
      <!--        :footer="excelFooter"-->
      <!--        :default-value="defaultValue"-->
      <!--        name="嘉易达监管场所库存情况报表.xls">-->
      <!--        &lt;!&ndash; 上面可以自定义自己的样式，还可以引用其他组件button &ndash;&gt;-->
      <!--        <el-button type="primary" size="mini" @click="importExcel">导出EXCEL</el-button>-->
      <!--      </download-excel>-->
    </el-form>
    <el-table v-loading="loading" :data="reportList" :height="this.reportList.length >5 ? tableHeight : 200">
      <af-table-column label="寄仓客户" align="center" prop="column1"/>
      <af-table-column label="寄仓合同" align="center" prop="column2"/>
      <af-table-column label="品名" align="center" prop="column3"/>
      <af-table-column label="期初库存(t)" align="center" width="130px" prop="column4">
        <template slot-scope="scope">
          {{ (scope.row.column4).toFixed(2) }}
        </template>
      </af-table-column>
      <el-table-column label="本期" align="center">
        <af-table-column prop="column6" label="入车数" align="center">
        </af-table-column>
        <af-table-column
          prop="column7"
          label="入重量（t）"
          align="center">
          <template slot-scope="scope">
            {{ (scope.row.column7).toFixed(2) }}
          </template>
        </af-table-column>

        <af-table-column
          prop="column8"
          label="出车数"
          align="center"
        >
        </af-table-column>
        <af-table-column
          prop="column9"
          label="出重量（t）"
          align="center"
        >
          <template slot-scope="scope">
            {{ (scope.row.column9).toFixed(2) }}
          </template>
        </af-table-column>


        <af-table-column label="亏吨(t)" align="center" prop="column10">
          <template slot-scope="scope">
            {{ (scope.row.column10).toFixed(2) }}
          </template>
        </af-table-column>
        <af-table-column label="库存(t)" align="center" prop="column11">
          <template slot-scope="scope">
            <span>{{ (scope.row.column11).toFixed(2) }}</span>
          </template>
        </af-table-column>
      </el-table-column>

      <el-table-column label="库存差(t)" align="center" prop="column12">
        <template slot-scope="scope">
          {{
          (scope.row.column12).toFixed(2)
          }}
        </template>
      </el-table-column>
    </el-table>

    <!--打印区域 弹出窗打印-->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="100%"
    >
      <el-button type="info" icon="fa fa-print" v-print="'#allPrint'" size="mini" @click="print"
                 ref="printBtn"  class="styleButton"> 打印
      </el-button>
      <div id="allPrint" v-show="showPrint">
        <div v-for="(item,index) in newArray" style="page-break-after:always">
          <div :id="gennerateId(index)"></div>
          <div class="box-card" style="margin: 0 auto;font-size:15px;width:1100px;padding-left: 1px ;padding-top:50px"
          >
            <!--   <div v-show="printSmallTitle">-->
            <div style="padding-left: 300px;font-size: 20px;margin-bottom: 50px">
              <span>{{printTitle}}</span><br>
              <span>{{dateTime }}</span>
            </div>
            <!--        <div>-->
            <!--          <span>{{timeTitle}}</span>-->
            <!--        </div>-->
            <!--      <div>-->
            <!--        <span>{{shipper}}</span>-->
            <!--      </div>-->
            <!--      </div>-->
            <!--  show-summary :summary-method="getSummaries"-->
            <el-table v-loading="loading" :data="item" id="analyouttable"
                      :header-cell-style="{background:'white',color:'black',border:'solid .5px black',fontSize:'15px',padding:'2 -3px',margin:'-2'}"
                      :cell-style="{border:'solid .4px black',fontSize:'14px',padding:'10px 0',color:'black'}"
                      style="border-right: solid 2px black;border-left: solid 2px black;border-top: solid 1px black;border-bottom: solid 2px black" >
              <af-table-column label="寄仓客户" align="center" width="120%" prop="column1"/>
              <af-table-column label="寄仓合同" align="center" width="120%" prop="column2"/>
              <af-table-column label="品名" align="center" prop="column3" width="80%"/>
              <el-table-column label="期初库存(t)" align="center" prop="column4">
                <template slot-scope="scope">
                  {{ (scope.row.column4).toFixed(2) }}
                </template>
              </el-table-column>
              <el-table-column label="本期" align="center">
                <el-table-column prop="column6" label="入车数" align="center" width="70%">
                </el-table-column>
                <af-table-column
                  prop="column7"
                  label="入重量（t）"
                  align="center"
                  width="100%">
                  <template slot-scope="scope">
                    {{ (scope.row.column7).toFixed(2) }}
                  </template>
                </af-table-column>

                <el-table-column
                  prop="column8"
                  label="出车数"
                  align="center"
                  width="70%">
                </el-table-column>
                <af-table-column
                  prop="column9"
                  label="出重量（t）"
                  align="center"
                  width="100%">
                  <template slot-scope="scope">
                    {{ (scope.row.column9).toFixed(2) }}
                  </template>
                </af-table-column>


                <el-table-column label="亏吨(t)" align="center" width="60px" prop="column10">
                  <template slot-scope="scope">
                    {{ (scope.row.column10).toFixed(2) }}
                  </template>
                </el-table-column>
                <el-table-column label="库存(t)" align="center" prop="column11">
                  <template slot-scope="scope">
              <span>{{
                  (scope.row.column11).toFixed(2)
                }}</span>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column label="库存差(t)" align="center" prop="column12" width="120px">
                <template slot-scope="scope">
                  {{
                  (scope.row.column12).toFixed(2)
                  }}
                </template>
              </el-table-column>
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
  import {statisticsMonth} from "@/api/place/info";

  export default {
    name: "Report",
    data() {
      return {
        column11: undefined,
        // 遮罩层
        loading: false,
        // 控件日期时间
        dateRange: ['', ''],
        // 初始化时间
        nowDate: '',
        nextDate: '',
        //打印按钮显示隐藏
        show: false,
        //打印弹窗
        drawer: false,
        dateTime: '',
        // 打印按钮隐藏
        buttonShow: false,
        //打印区域显示
        showPrint: false,
        // 导出按钮显示隐藏
        showImport: false,
        // 导出标题集合
        titleList: [],
        // 打印集合
        newArray: [],

        // table 高度
        tableHeight: window.innerHeight - 280,

        printSmallTitle: false,

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
          "寄仓合同": "column2", //支持嵌套属性
          "品名": "column3",
          "期初库存": "column4",
          "入车数": "column6",
          "入重量(t)": "column7",
          "出车数": "column8",
          "出重量(t)": "column9",
          "亏吨(t)": "column10",
          "库存(t)": "column11",
          "库存差(t)": "column12",
        },
        // 默认值
        defaultValue: '',
        // Excel 页脚
        excelFooter: '',
        // 选中数组
        // 打印标题
        printTitle: '',
        // 标题时间
        timeTitle: '',
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
        //打印弹窗方向
        direction: 'ttb',
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
          goodsName: undefined,
          placeId: undefined,
          customerName: undefined,
          column2: undefined,
          startTime: undefined,
          endTime: undefined,
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
      // this.titleList.push(this.printTitle);
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

      printShow() {
        // 打印浮动弹窗
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

      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // },

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
        console.log(this.dateRange)

        this.queryParams.startTime = this.dateRange[0]
        this.queryParams.endTime = this.dateRange[1]

        // if (!this.queryParams.startTime || !this.queryParams.endTime) {
        //   this.$message.warning('请选择时间范围')
        //   return false
        // }
        this.getInfo();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = [];
        this.queryParams.goodsName = undefined
        this.queryParams.customerName = undefined
      },
      getInfo() {
        this.loading = true
        this.reportList = []
        this.titleList = []
        statisticsMonth(this.queryParams).then(response => {
          this.loading = false
          //this.result = response
          if (response.code === 200) {
            this.reportList = response.data
            //console.log(this.reportList)

            let index = 0
            this.newArray = [];
            while (index < this.reportList.length) {
              this.newArray.push(this.reportList.slice(index, index += 17));
            }
            ;
            this.printTitle = '嘉易达监管场所库存对比统计报表';
            this.dateTime = this.dateRange[0] + '至' + this.dateRange[1]
            console.log(this.printTitle)
            this.titleList.push(this.printTitle)
            this.titleList.push(this.dateTime)


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
        console.log(this.depts + 1511)
        this.getContract(event, '1')
        this.getInfo();
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
                if (!this.customerList.find(cus => cus.customerName === contract.customerName)) {
                  this.customerList.push(contract)
                }
              }
            }
          }
        });
      },
      /** 导出按钮操作 */
      /*handleExport() {
        this.download('yard/report/export', {
          ...this.queryParams
        }, `yard_report.xlsx`)
      },*/
      changeStatistics(event) {
        if (event === 1) {
          this.queryParams.customerName = ''
        }
      },
      /*getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总重';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
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

        sums[3] = Number.parseFloat(sums[3]).toFixed(3) //期初库存
        sums[4] = Number.parseFloat(sums[4]) //入车数
        sums[5] = Number.parseFloat(sums[5]).toFixed(3) //入重量
        sums[6] = Number.parseFloat(sums[6]) //出车数
        sums[7] = Number.parseFloat(sums[7]).toFixed(3) //出重量
        sums[8] = Number.parseFloat(sums[8]).toFixed(3) //亏吨
        sums[9] = (this.getColumn11()).toFixed(3) //库存
        sums[10] = (this.getColumn12()).toFixed(3)//库存差

        /!*
        * "寄仓客户": "column1",    //常规字段
          "寄仓合同": "column2", //支持嵌套属性
          "品名": "column3",
          "期初库存": "column4",
          "入车数": "column6",
          "入重量(t)": "column7",
          "出车数": "column8",
          "出重量(t)": "column9",
          "亏吨(t)": "column10",
          "库存(t)": "column11",
          "库存差(t)": "column12",
        * *!/

        let total = {
          column1: '总重',
          column2: '',
          column3: '',
          column4: sums[3],
          //column5: '',
          column6: sums[4],
          column7: sums[5],
          column8: sums[6],
          column9: sums[7],
          column10: sums[8],
          column11: sums[9],
          column12: sums[10],

        }
        //this.reportList.push(total)
        return sums;
      },*/
      //根据reportList中对应的列，求和 list中为对象，通过reduce 计算每个对象的值 累加求和
      //库存汇总
      /*getColumn11() {
        if (this.reportList.length === 0) return 0
        return this.reportList.reduce(function (previousValue, currentValue) {
          let a = previousValue + Number.parseFloat(currentValue.column4) + Number.parseFloat(currentValue.column7) - Number.parseFloat(currentValue.column9) + Number.parseFloat(currentValue.column10)
          return a;
        }, 0)
      },*/
      /*getColumn12() {//库存差
        if (this.reportList.length === 0) return 0
        return this.reportList.reduce(function (previousValue, currentValue) {
          let b = previousValue + Number.parseFloat(currentValue.column4) + Number.parseFloat(currentValue.column7) - Number.parseFloat(currentValue.column9)
          return b;
        }, 0)
      },*/

      /**
       * Math.abs(scope.row.column4 - (scope.row.column4 + scope.row.column7 - scope.row.column9 + scope.row.column10)).toFixed(3)
       */
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

  .app-container >>>.el-drawer__body{
    overflow: auto;
  }
  .styleButton{
    position: fixed;
    top: 50px;
    margin-left: 1500px

  }

</style>
