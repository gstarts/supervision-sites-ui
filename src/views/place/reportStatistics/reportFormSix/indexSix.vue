<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <!--      <el-row>-->
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
      <el-form-item>
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

        <el-col :span="6">
          <el-button type="info" icon="fa fa-print" size="mini" v-print="'#allPrint' " @click="print" ref="printBtn"
                     v-show="buttonShow"> 打印
          </el-button>
        </el-col>
      </el-form-item>
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
        <!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
        <!--        <el-form-item label="时间" prop="startTime">-->
        <!--&lt;!&ndash;          <el-date-picker&ndash;&gt;-->
        <!--&lt;!&ndash;            v-model="dateRange"&ndash;&gt;-->
        <!--&lt;!&ndash;            type="datetimerange"&ndash;&gt;-->
        <!--&lt;!&ndash;            value-format="yyyy-MM-dd"&ndash;&gt;-->
        <!--&lt;!&ndash;            range-separator="至"&ndash;&gt;-->
        <!--&lt;!&ndash;            start-placeholder="开始日期"&ndash;&gt;-->
        <!--&lt;!&ndash;            end-placeholder="结束日期"&ndash;&gt;-->
        <!--&lt;!&ndash;          :default-time="['06:00:00','06:00:00']">&ndash;&gt;-->
        <!--&lt;!&ndash;          </el-date-picker>&ndash;&gt;-->

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
        <!--        </el-form-item>-->

      </el-row>
    </el-form>
    <el-table v-loading="loading" :data="reportList"  :border="true" :height="this.reportList.length >5 ? tableHeight : 200">
      <el-table-column label="客户" align="center" prop="column1" />
      <!--<af-table-column label="合同号" align="center" prop="checkContractNo"/>-->
      <el-table-column label="合同" align="center" prop="column2" />
      <el-table-column label="总入库量(t)" align="center" prop="column7">
        <template slot-scope="scope">
          <span>{{ (scope.row.column7/1000).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="可申请放行量(t)" align="center" prop="column8">
        <template slot-scope="scope">
          <span>{{ (scope.row.column8/1000).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="放行单总量(t)" align="center" prop="column6">
        <template slot-scope="scope">
          <span>{{ (scope.row.column6/1000).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="已占用" align="center" prop="column4">
        <template slot-scope="scope">
          <span>{{ (scope.row.column4/1000).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="可分配提煤单总量(t)" align="center" prop="column5">
        <template slot-scope="scope">
          <span>{{ (scope.row.column5/1000).toFixed(2)}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--    打印区域-->
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
               id="print">
            <!--      <div v-show="printSmallTitle">-->
            <div style="padding-left: 300px;font-size: 30px;margin-bottom: 30px">
              <span>{{printTitle}}</span><br>
            </div>
            <!--      <div>-->
            <!--        <span>{{timeTitle}}</span>-->
            <!--      </div>-->
            <!--      <div>-->
            <!--        <span>{{shipper}}</span>-->
            <!--      </div>-->
            <!--      </div>-->

            <el-table v-loading="loading" :data="item" id="analyouttable"
                      :header-cell-style="{background:'white',color:'black',border:'solid .5px black',fontSize:'15px',padding:'2 -3px',margin:'-2'}"
                      :cell-style="{border:'solid .4px black',fontSize:'14px',padding:'10px 0',color:'black'}"
                      style="border-right: solid 2px black;border-left: solid 2px black;border-top: solid 1px black;border-bottom: solid 2px black">
              <af-table-column label="寄仓客户" align="center" prop="column1"/>
              <!--<af-table-column label="合同号" align="center" prop="checkContractNo"/>-->
              <af-table-column label="合同" align="center" prop="column2"></af-table-column>
              <el-table-column label="总入库量" align="center" prop="column7">
                <template slot-scope="scope">
                  <span>{{ (scope.row.column7/1000).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="可申请放行量" align="center" prop="column8">
                <template slot-scope="scope">
                  <span>{{ (scope.row.column8/1000).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <af-table-column label="放行单总量" align="center" prop="column6">
                <template slot-scope="scope">
                  <span>{{ (scope.row.column6/1000).toFixed(2)}}</span>
                </template>
              </af-table-column>
              <af-table-column label="已占用" align="center" prop="column4">
                <template slot-scope="scope">
                  <span>{{ (scope.row.column4/1000).toFixed(2)}}</span>
                </template>
              </af-table-column>
              <af-table-column label="可分配提煤单总量" align="center" prop="column5">
                <template slot-scope="scope">
                  <span>{{ (scope.row.column5/1000).toFixed(2)}}</span>
                </template>
              </af-table-column>
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
  import {statisticsSix} from "@/api/place/info";

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
        // 按钮显示
        buttonShow: false,
        //打印区域显示
        showPrint: false,
        //打印按钮显示隐藏
        show: false,
        // 导出按钮显示隐藏
        showImport: false,
        // 导出标题集合
        titleList: [],
        drawer: false,

        // table 高度
        tableHeight: window.innerHeight - 260,

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
          "合同": "column2", //支持嵌套属性
          "总入库量": {
            field: "column7",
            callback: (value) => {
              return value = (value / 1000).toFixed(2)
            }
          },
          "可申请放行量": {
            field: "column8",
            callback: (value) => {
              return value = (value / 1000).toFixed(2)
            }
          },
          "放行单总量": {
            field: "column6",
            callback: (value) => {
              return value = (value / 1000).toFixed(2)
            }
          },
          "已占用": {
            field: "column4",
            callback: (value) => {
              return value = (value / 1000).toFixed(2)
            }
          },
          "可分配提煤单总量": {
            field: "column5",
            callback: (value) => {
              return value = (value / 1000).toFixed(2)
            }
          },
        },
        // 默认值
        defaultValue: '0',
        // Excel 页脚
        excelFooter: '',
        // 选中数组
        // 打印标题
        prinTtitle: '',
        // 标题时间
        timeTitle: '',
        direction: 'ttb',
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

        newArray: [],
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
      //初始化数据
      //this.getInfo()
      // this.titleList.push(this.prinTtitle);
      // 页面初始化获取时间0
      //this.dateRange = ['', '']
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
      //this.queryParams.startTime = this.dateRange[0]

      //this.queryParams.endTime = this.dateRange[1]
      //this.timeTitle = this.dateRange[0] + '至' + this.dateRange[1] + '按客户统计'
      // this.titleList.push(this.timeTitle)
      // this.titleList.push(this.shipper);
      // 0 监管场所，1保税库，2堆场，3企业
      this.depts = getUserDepts('0')
      if (this.depts.length > 0) {
        this.queryParams.placeId = this.depts[0].deptId
        this.getContract(this.queryParams.placeId, '1')
      }
      //煤种 品名
      // this.getDicts("coal_type").then(response => {
      //   this.goodsNameList = response.data;
      // });
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

      // 打印预览
      printShow() {
        // 打印弹窗
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
        // //先判断条件，再查询
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
        this.handleQuery();
      },

      getInfo() {
        this.loading = true
        this.reportList = []
        this.titleList = []
        statisticsSix(this.queryParams).then(response => {
          this.loading = false
          //this.result = response
          if (response.code === 200) {
            this.reportList = response.data;
            this.printTitle = '嘉易达监管场所统计放行量报表'
            let index = 0
            this.newArray = [];
            while (index < this.reportList.length) {
              this.newArray.push(this.reportList.slice(index, index += 30));
            }
            ;
            //console.log(this.reportList)

            this.titleList.push(this.printTitle)
            console.log("==========")
            console.log(this.titleList)


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

      },
      // //场所变化 获取对应场所的合同
      getContract(placeId, status) {
        this.loading = true
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
          this.getInfo()
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
          this.queryParams.customerName = ''
        }
      },
      // getSummaries(param) {
      //   const {columns, data} = param;
      //   const sums = [];
      //   columns.forEach((column, index) => {
      //     //index就当table的下标 0 为起始表头
      //     if (index === 0) {
      //       sums[index] = '总重量';
      //       return;
      //     }
      //     const values = data.map(item => Number(item[column.property]));
      //     if (!values.every(value => isNaN(value))) {
      //       sums[index] = values.reduce((prev, curr) => {
      //         const value = Number(curr);
      //         //想计算哪行 index就等于那一行的下标 注意:下标起始值为0
      //         if (!isNaN(value) && index === 2) {
      //           return prev + curr;
      //         }
      //         if (!isNaN(value) && index === 3) {
      //           return prev + curr;
      //         }
      //         if (!isNaN(value) && index === 4) {
      //           return prev + curr;
      //         }
      //       }, 0);
      //     }
      //   });
      //   sums[2] = (sums[2] / 1000).toFixed(2);
      //   sums[3] = (sums[3] / 1000).toFixed(2);
      //   sums[4] = (sums[4] / 1000).toFixed(2);
      //   return sums;
      // }
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

  .styleButton{
    position: fixed;
    top: 50px;
    margin-left: 1500px

  }
  .app-container >>>.el-drawer__body{
    overflow: auto;
  }
</style>
