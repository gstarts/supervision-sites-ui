<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="时间" prop="startTime">
        <el-date-picker
          v-model="queryParams.reportDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList" :loading="loading">搜索</el-button>
        <el-form-item>
          <download-excel
            class="export-excel-wrapper"
            :data="outstoreDocList2"
            :fields="json_fields"
            :title="titleList"
            :footer="excelFooter"
            :default-value="defaultValue"
            :name=excelName>
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button type="primary" size="mini" @click="importExcel" :loading="loading">导出EXCEL</el-button>
          </download-excel>
        </el-form-item>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="outstoreDocList" max-height="750" show-summary :summary-method="getTotal">
      <el-table-column label="序号" align="center" prop="id" fixed="left">
      </el-table-column>

      <el-table-column label="公司简称" align="center" prop="companyName" fixed="left" width="120">
        <template slot-scope="scope">
          <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.customerName">
            <span style="cursor: pointer" slot="reference">{{ chang(scope.row) }}</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="煤种" align="center" prop="coalKind" fixed="left" width="130"/>

      <el-table-column label="当日入库(露天存放)" align="center">
        <el-table-column
          label="车数(辆)"
          align="center"
          prop="lorryInTodayQtyYard"
        ></el-table-column>
        <el-table-column
          label="调入(吨)"
          align="center"
          prop="coalInTodayWtKgYard"
        >
          <template slot-scope="scope">
            {{ scope.row.coalInTodayWtKgYard.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="当日出库(露天存放)" align="center">
        <el-table-column
          label="车数(辆)"
          align="center"
          prop="lorryOutTodayQtyYard"
        ></el-table-column>
        <el-table-column
          label="调出(吨)"
          align="center"
          prop="coalOutTodayWtKgYard"
        >
          <template slot-scope="scope">
            {{ scope.row.coalOutTodayWtKgYard.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="当日入库(1#煤棚)" align="center">
        <el-table-column
          label="车数(辆)"
          align="center"
          prop="lorryOutTodayQtyShed1"
        ></el-table-column>
        <el-table-column
          label="调入(吨)"
          align="center"
          prop="coalInTodayWtKgShed1"
        >
          <template slot-scope="scope">
            {{ scope.row.coalInTodayWtKgShed1.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="当日出库(1#煤棚)" align="center">
        <el-table-column
          label="车数(辆)"
          align="center"
          prop="lorryOutTodayQtyShed1"
        ></el-table-column>
        <el-table-column
          label="调出(吨)"
          align="center"
          prop="coalOutTodayWtKgShed1"
        >
          <template slot-scope="scope">
            {{ scope.row.coalOutTodayWtKgShed1.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="当日入库(2#煤棚)" align="center">
        <el-table-column
          label="车数(辆)"
          align="center"
          prop="lorryInTodayQtyShed2"
        ></el-table-column>
        <el-table-column
          label="调入(吨)"
          align="center"
          prop="coalInTodayWtKgShed2"
        >
          <template slot-scope="scope">
            {{ scope.row.coalInTodayWtKgShed2.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="当日出库(2#煤棚)" align="center">
        <el-table-column
          label="车数(辆)"
          align="center"
          prop="lorryOutTodayQtyShed2"
        ></el-table-column>
        <el-table-column
          label="调出(吨)"
          align="center"
          prop="coalOutTodayWtKgShed2"
        >
          <template slot-scope="scope">
            {{ scope.row.coalOutTodayWtKgShed2.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="库存(吨)" align="center">
        <el-table-column
          label="露天存放"
          align="center"
          prop="stockWtKgYard"
          width="130"
        >
          <template slot-scope="scope">
            {{ scope.row.stockWtKgYard.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="1#煤棚"
          align="center"
          prop="stockWtKgShed1"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.stockWtKgShed1.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="2#煤棚"
          align="center"
          prop="stockWtKgShed2"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.stockWtKgShed2.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="合计"
          align="center"
          prop="stockWt"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.stockWt.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="累计损耗(吨)" align="center" prop="coalLossWtKg" width="120">
        <template slot-scope="scope">
          {{ scope.row.coalLossWtKg.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="note"/>

      <el-table-column label="本月累计调入" align="center">
        <el-table-column label="车数(辆)" align="center" prop="lorryInThisMonthQty"></el-table-column>
        <el-table-column
          label="吨数(吨)"
          align="center"
          prop="coalInThisMonthWtKg"
          width="130"
        >
          <template slot-scope="scope">
            {{ scope.row.coalInThisMonthWtKg.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="本月累计调出" align="center">
        <el-table-column label="车数(辆)" align="center" prop="lorryOutThisMonthQty"></el-table-column>
        <el-table-column
          label="吨数(吨)"
          align="center"
          prop="coalOutThisMonthWtKg"
          width="130"
        >
          <template slot-scope="scope">
            {{ scope.row.coalOutThisMonthWtKg.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="期初转入(吨)"
        align="center"
        prop="coalInitWtKg"
        width="130"
      >
        <template slot-scope="scope">
          {{ scope.row.coalInitWtKg.toFixed(2) }}
        </template>
      </el-table-column>

      <el-table-column label="本年累计" align="center">
        <el-table-column
          label="调入(吨)"
          width="130"
          align="center"
          prop="coalInThisYearWtKg"
        >
          <template slot-scope="scope">
            {{ scope.row.coalInThisYearWtKg.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="调出(吨)"
          align="center"
          width="130"
          prop="coalOutThisYearWtKg"
        >
          <template slot-scope="scope">
            {{ scope.row.coalOutThisYearWtKg.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>

    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import {listDaily} from "@/api/place/daily";

export default {
  name: "siteDaily",
  data() {
    return {
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
      // 出库明细单表格数据
      outstoreDocList: [],
      outstoreDocList2: [],
      excelName: undefined,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      num: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'id',
        isAsc: 'desc',
        reportDate: undefined,
        companyName: undefined,
        customerName: undefined,
        coalKind: undefined,
        lorryInTodayQtyYard: undefined,
        coalInTodayWtKgYard: undefined,
        lorryOutTodayQtyYard: undefined,
        coalOutTodayWtKgYard: undefined,
        lorryInTodayQtyShed1: undefined,
        coalInTodayWtKgShed1: undefined,
        lorryOutTodayQtyShed1: undefined,
        coalOutTodayWtKgShed1: undefined,
        lorryInTodayQtyShed2: undefined,
        coalInTodayWtKgShed2: undefined,
        lorryOutTodayQtyShed2: undefined,
        coalOutTodayWtKgShed2: undefined,
        stockWtKgYard: undefined,
        stockWtKgShed1: undefined,
        stockWtKgShed2: undefined,
        coalLossWtKg: undefined,
        coalInitWtKg: undefined,
        lorryInThisMonthQty: undefined,
        coalInThisMonthWtKg: undefined,
        lorryOutThisMonthQty: undefined,
        coalOutThisMonthWtKg: undefined,
        lorryIntThisYearQty: undefined,
        coalInThisYearWtKg: undefined,
        lorryOutThisYearQty: undefined,
        coalOutThisYearWtKg: undefined,
        note: undefined
      },
      // 表单参数
      form: {},
      titleList: [],
      // Excel 页脚
      excelFooter: '',
      // 默认值
      defaultValue: '',
      // 表单校验
      rules: {},
      json_fields: {
        /*序号: {
          callback: (scope) => {
            debugger
            if (scope) {
              this.num++;
            }
            if (this.outstoreDocList.length + 1 === this.num) {
              return '合计'
            } else {
              return this.num;
            }
          },
        },*/
        序号: 'id',
        公司简称: "companyName",
        寄仓客户: "customerName",
        煤种: "coalKind",
        当日入库车数露天: "lorryInTodayQtyYard",
        当日调入数量Kg露天: "coalInTodayWtKgYard",
        当日出库车数露天: "lorryOutTodayQtyYard",
        当日调出数量Kg露天: "coalOutTodayWtKgYard",
        当日入库车数1号煤棚: "lorryInTodayQtyShed1",
        当日调入数量Kg1号煤棚: "coalInTodayWtKgShed1",
        当日出库车数1号煤棚: "lorryOutTodayQtyShed1",
        当日调出数量Kg1号煤棚: "coalOutTodayWtKgShed1",
        当日入库车数2号煤棚: "lorryInTodayQtyShed2",
        当日调入数量Kg2号煤棚: "coalInTodayWtKgShed2",
        当日出库车数2号煤棚: "lorryOutTodayQtyShed2",
        当日调出数量Kg2号煤棚: "coalOutTodayWtKgShed2",
        库存Kg露天: "stockWtKgYard",
        库存Kg1号煤棚: "stockWtKgShed1",
        库存Kg2号煤棚: "stockWtKgShed2",
        库存合计: "stockWt",
        累计损耗Kg: "coalLossWtKg",
        备注: "note",
        当月入库车数: "lorryInThisMonthQty",
        当月调入数量Kg: "coalInThisMonthWtKg",
        当月出库车数: "lorryOutThisMonthQty",
        当月调出数量Kg: "coalOutThisMonthWtKg",
        期初转入Kg: "coalInitWtKg",
        本年调入数量Kg: "coalInThisYearWtKg",
        本年调出数量Kg: "coalOutThisYearWtKg",
      },
      tongji: {
        id: undefined,
        companyName: undefined,
        customerName: undefined,
        // index: undefined,
        coalKind: undefined,
        lorryInTodayQtyYard: undefined,
        coalInTodayWtKgYard: undefined,
        lorryOutTodayQtyYard: undefined,
        coalOutTodayWtKgYard: undefined,
        lorryInTodayQtyShed1: undefined,
        coalInTodayWtKgShed1: undefined,
        lorryOutTodayQtyShed1: undefined,
        coalOutTodayWtKgShed1: undefined,
        lorryInTodayQtyShed2: undefined,
        coalInTodayWtKgShed2: undefined,
        lorryOutTodayQtyShed2: undefined,

        coalOutTodayWtKgShed2: undefined,
        stockWtKgYard: undefined,
        stockWtKgShed1: undefined,
        stockWtKgShed2: undefined,
        stockWt: undefined,
        coalLossWtKg: undefined,
        lorryInThisMonthQty: undefined,
        coalInThisMonthWtKg: undefined,
        lorryOutThisMonthQty: undefined,
        coalOutThisMonthWtKg: undefined,
        coalInitWtKg: undefined,
        lorryIntThisYearQty: undefined,
        coalInThisYearWtKg: undefined,

      },
    };
  },
  created() {

    // this.getList();
  },
  methods: {
    /** 查询场站日报列表 */
    getList() {
      if (typeof this.queryParams.reportDate == "undefined" || this.queryParams.reportDate == "") {
        this.msgError("时间选择不可为空");
        return;
      }
      this.loading = true;
      this.titleList = [];
      listDaily(this.queryParams).then(response => {
        this.outstoreDocList = response.rows;

        //序号用id索引填充
        this.outstoreDocList.forEach((item, index) => {
          item.id = index + 1;
          //计算煤的会计
          item.stockWt = item.stockWtKgYard + item.stockWtKgShed1 + item.stockWtKgShed2
        })

        this.printTitle = "场站日报";
        this.titleList.push(this.printTitle);
        this.titleList.push(this.queryParams.reportDate);
        this.loading = false;
      });
    },
    chang(row) {
      let name = row.companyName
      if (name && name.length > 6) {
        return name.substring(0, 6);
      } else {
        return name;
      }
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    importExcel() {
      this.excelName = "场站日报" + this.queryParams.reportDate + ".xls"
      //console.log('this.tongji')
      //console.log(this.tongji)
      this.outstoreDocList2 = [...this.outstoreDocList]
      this.outstoreDocList2.push(this.tongji)
    },
    // 自定义合计栏
    getTotal(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        /* if (index === 18) {
           sums[index] = (Number(sums[15]) + Number(sums[16]) + Number(sums[17])).toFixed(2)
           return;
         }*/
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // sums[index];
          if (index === 1 || index === 2 || index === 20) {
            return sums[index] = ''
          }
          if (index === 3 || index === 5 || index === 7 || index === 9 || index === 11 || index === 13 || index === 21 || index === 23) {
            return sums[index]
          }
          if (index === 4 || index === 6 || index === 8 || index === 10 || index === 12 || index === 14 || index === 15 || index === 16 || index === 17 || index === 18 || index === 19 || index === 22 || index === 24 || index === 25 || index === 26 || index === 27) {
            return sums[index] = sums[index].toFixed(2);
          }
        } else {
          sums[index] = '';
        }
      });

      this.tongji.id = '合计'
      this.tongji.customerName = ''
      this.tongji.companyName = " "
      this.tongji.coalKind = " "
      this.tongji.lorryInTodayQtyYard = sums[3]  //当日入库车数露天
      this.tongji.coalInTodayWtKgYard = Number(sums[4]) //当日调入数量Kg露天
      this.tongji.lorryOutTodayQtyYard = sums[5]
      this.tongji.coalOutTodayWtKgYard = Number(sums[6])
      this.tongji.lorryInTodayQtyShed1 = sums[7]
      this.tongji.coalInTodayWtKgShed1 = Number(sums[8])
      this.tongji.lorryOutTodayQtyShed1 = sums[9]
      this.tongji.coalOutTodayWtKgShed1 = Number(sums[10])
      this.tongji.lorryInTodayQtyShed2 = sums[11]
      this.tongji.coalInTodayWtKgShed2 = Number(sums[12])
      this.tongji.lorryOutTodayQtyShed2 = sums[13]
      this.tongji.coalOutTodayWtKgShed2 = Number(sums[14])
      this.tongji.stockWtKgYard = Number(sums[15])
      this.tongji.stockWtKgShed1 = Number(sums[16])
      this.tongji.stockWtKgShed2 = Number(sums[17])
      this.tongji.stockWt = Number(sums[18])
      this.tongji.coalLossWtKg = Number(sums[19])

      this.tongji.lorryInThisMonthQty = sums[21]
      this.tongji.coalInThisMonthWtKg = Number(sums[22])
      this.tongji.lorryOutThisMonthQty = sums[23]
      this.tongji.coalOutThisMonthWtKg = Number(sums[24])

      this.tongji.coalInitWtKg = Number(sums[25])

      this.tongji.coalInThisYearWtKg = Number(sums[26])
      this.tongji.coalOutThisYearWtKg = Number(sums[27])

      console.log('this.sums')
      console.log(sums)
      console.log(this.tongji)
      return sums;
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/en/export', {
        ...this.queryParams
      }, `place_en.xlsx`)
    }
  }
};
</script>
