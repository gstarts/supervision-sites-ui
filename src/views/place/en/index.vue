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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
        <el-form-item>
          <download-excel
            class="export-excel-wrapper"
            :data="outstoreDocList"
            :fields="json_fields"
            :title="titleList"
            :footer="excelFooter"
            :default-value="defaultValue"
            name="海关日报.xls">
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button type="primary" size="mini" @click="importExcel">导出EXCEL</el-button>
          </download-excel>
        </el-form-item>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="outstoreDocList" @selection-change="handleSelectionChange"  show-summary
              :summary-method="getTotal" >
      <el-table-column
        label="序号"
        align="center"
        prop="序号"
        type="index"
        fixed="left"

      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="公司简称" align="center" prop="companyName" fixed="left" width="120">
<!--        <template slot-scope="scope" >-->
<!--          <el-popover placement="top-start" width="200" trigger="hover" ref="popover5">-->
<!--            <slot>{{ scope.row.customerName }}</slot>-->
<!--          </el-popover>-->
<!--          <span v-popover:popover5>{{ chang(scope.row) }}</span>-->
<!--        </template>-->
      </el-table-column>

      <el-table-column
        label="煤种"
        align="center"
        prop="coalKind"
        fixed="left"
        width="130"
      />

      <el-table-column label="当日入库(露天存放)" align="center">
        <el-table-column
          label="车数(辆)"
          align="center"
          prop="lorryInTodayQtyYard"
        ></el-table-column>
        <el-table-column
          label="调入(吨)"
          align="center"
          prop="当日调入数量Kg露天"
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
          width="130"
        >
          <template slot-scope="scope">
            {{ scope.row.stockWtKgYard.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="1#煤棚"
          align="center"
          prop="库存Kg1号煤棚"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.stockWtKgShed1.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="2#煤棚"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.stockWtKgShed2.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="合计"
          align="center"

          width="120"
        >
          <template slot-scope="scope">
            {{ (scope.row.stockWtKgYard+scope.row.stockWtKgShed1+scope.row.stockWtKgShed2).toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="累计损耗(吨)" align="center" prop="累计损耗Kg" width="120">
        <template slot-scope="scope">
          {{ scope.row.coalLossWtKg.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="note" />

      <el-table-column label="本月累计调入" align="center">
        <el-table-column label="车数(辆)" align="center" prop="lorryInThisMonthQty"  ></el-table-column>
        <el-table-column
          label="吨数(吨)"
          align="center"
          width="130"
        >
          <template slot-scope="scope">
            {{ scope.row.coalInThisMonthWtKg.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="本月累计调出" align="center">
        <el-table-column label="车数(辆)" align="center" prop="lorryOutThisMonthQty" ></el-table-column>
        <el-table-column
          label="吨数(吨)"
          align="center"
          prop="当月调出数量Kg"
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
        prop="期初转入Kg"
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
        >
          <template slot-scope="scope">
            {{ scope.row.coalInThisYearWtKg.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="调出(吨)"
          align="center"
          width="130"
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
import { listEn, getEn, delEn, addEn, updateEn } from "@/api/place/en";
import {listStoreContract} from "@/api/place/storeContract";

export default {
  name: "En",
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
      // 场站日报表格数据
      enList: [],
      // 出库明细单表格数据
      outstoreDocList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
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
      titleList:[],
      // Excel 页脚
      excelFooter: '',
      // 默认值
      defaultValue: '0',
      // 表单校验
      rules: {
      },
      json_fields: {
        序号: {
          callback: (scope) => {
            if (scope) {
              this.num++;
            }
            if(this.outstoreDocList.length +1 == this.num){
              return '合计'
            }else{
              return this.num;
            }
          },
        },
        companyName: "公司名称",
        customerName: "寄仓客户",
        coalKind: "煤种",
        lorryInTodayQtyYard: "当日入库车数露天",
        coalInTodayWtKgYard: "当日调入数量Kg露天",
        lorryOutTodayQtyYard: "当日出库车数露天",
        coalOutTodayWtKgYard: "当日调出数量Kg露天",
        lorryInTodayQtyShed1: "当日入库车数1号煤棚",
        coalInTodayWtKgShed1: "当日调入数量Kg1号煤棚",
        lorryOutTodayQtyShed1: "当日出库车数1号煤棚",
        coalOutTodayWtKgShed1: "当日调出数量Kg1号煤棚",
        lorryInTodayQtyShed2: "当日入库车数2号煤棚",
        coalInTodayWtKgShed2: "当日调入数量Kg2号煤棚",
        lorryOutTodayQtyShed2: "当日出库车数2号煤棚",
        coalOutTodayWtKgShed2: "当日调出数量Kg2号煤棚",
        stockWtKgYard: "库存Kg露天",
        stockWtKgShed1: "库存Kg1号煤棚",
        stockWtKgShed2: "库存Kg2号煤棚",
        "库存(合计)": "库存合计",
        coalLossWtKg: "累计损耗Kg",
        note: "备注",
        lorryInThisMonthQty: "当月入库车数",
        coalInThisMonthWtKg: "当月调入数量Kg",
        lorryOutThisMonthQty: "当月出库车数",
        coalOutThisMonthWtKg: "当月调出数量Kg",
        coalInitWtKg: "期初转入Kg",
        lorryIntThisYearQty: "本年调入数量Kg",
        coalInThisYearWtKg: "本年调出数量Kg",
      },
    };
  },
  created() {

    // this.getList();
  },
  methods: {
    /** 查询场站日报列表 */
    getList() {
      debugger
      if (typeof this.queryParams.reportDate == "undefined"||this.queryParams.reportDate == "") {
        this.msgError("时间选择不可为空");
        return;
      }
      this.loading = true;
      this.titleList = [];
      listEn(this.queryParams).then(response => {
        this.outstoreDocList = response.rows;
        this.printTitle = "场站日报";
        this.total = response.total;
        this.titleList.push(this.printTitle);
        this.titleList.push(this.queryParams.beginTime);
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    chang(row){
      let name = row.公司名称
      if(name && name.length >= 6){
        return name.substring(0,6);
      }else{
        return name;
      }
    },

    //
    tongji :{
      customerName:undefined,
      coalKind:undefined,
      lorryInTodayQtyYard:undefined,
      coalInTodayWtKgYard:undefined,
      lorryOutTodayQtyYard: undefined,
      coalOutTodayWtKgYard : undefined,
      lorryInTodayQtyShed1 :undefined,
      coalInTodayWtKgShed1 :undefined,
      lorryOutTodayQtyShed1 :undefined,
      coalOutTodayWtKgShed1 :undefined,
      lorryInTodayQtyShed2 :undefined,
      coalInTodayWtKgShed2 :undefined,
      lorryOutTodayQtyShed2 : undefined,

      coalOutTodayWtKgShed2 :undefined,
      stockWtKgYard :undefined,
      stockWtKgShed1 :undefined,
      stockWtKgShed2 :undefined,
      库存合计 :undefined,
      coalLossWtKg :undefined,
      lorryInThisMonthQty :undefined,
      coalInThisMonthWtKg :undefined,
      lorryOutThisMonthQty :undefined,
      coalOutThisMonthWtKg :undefined,
      coalInitWtKg :undefined,
      lorryIntThisYearQty :undefined,
      coalInThisYearWtKg :undefined,

    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
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
      };
      this.resetForm("form");
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加场站日报";
    },
    getContract(placeId, status) {
      //查找合同
      listStoreContract({ placeId: placeId, status: status }).then(
        (response) => {
          if (response.code === 200) {
            this.contractList = response.rows;
            if (this.contractList.length === 0) {
              //this.$message.warning('此场所没有有效的合同')
            } else {
              //重新给客户列表 赋值
              this.customerList = [];
              for (let contract of this.contractList) {
                if (
                  !this.customerList.find(
                    (cus) => cus.customerId === contract.customerId
                  )
                ) {
                  this.customerList.push(contract);
                }
              }
            }
          }
        }
      );
    },
    importExcel() {
      this.outstoreDocList.push(this.tongji)
    },
    // 自定义合计栏
    getTotal(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every(value =>isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // sums[index];
          if(index === 1 || index === 2){
            return sums[index] = ''
          }
          if(index === 3 || index === 5 || index === 7 || index === 9 || index === 11 || index === 13 || index === 21 || index === 23  || index === 20){
            return sums[index]
          }
          if(index !== 0 || index !== 1 || index !== 2 || index !== 3 || index !== 5 || index !== 7 || index !== 9 || index !== 11 || index !== 13 || index !== 21 || index !== 23  || index !== 20){
            return  sums[index] = sums[index].toFixed(2);
          }
        } else {
          sums[index] = '';
        }
      });
      this.tongji.customerName = sums[0];
      this.tongji.lorryInTodayQtyYard = sums[3];
      this.tongji.coalInTodayWtKgYard = sums[4];
      this.tongji.lorryOutTodayQtyYard = sums[5];
      this.tongji.coalOutTodayWtKgYard = sums[6];
      this.tongji.lorryInTodayQtyShed1 = sums[7];
      this.tongji.coalInTodayWtKgShed1 = sums[8];
      this.tongji.lorryOutTodayQtyShed1 = sums[9];
      this.tongji.coalOutTodayWtKgShed1 = sums[10];
      this.tongji.lorryInTodayQtyShed2 = sums[11];
      this.tongji.coalInTodayWtKgShed2 = sums[12];
      this.tongji.lorryOutTodayQtyShed2 = sums[13];

      this.tongji.coalOutTodayWtKgShed2 = sums[14];
      this.tongji.stockWtKgYard = sums[15];
      this.tongji.stockWtKgShed1 = sums[16];
      this.tongji.stockWtKgShed2 = sums[17];
      this.tongji.库存合计 = sums[18];
      this.tongji.coalLossWtKg = sums[19];
      this.tongji.lorryInThisMonthQty = sums[21];
      this.tongji.coalInThisMonthWtKg = sums[22];
      this.tongji.lorryOutThisMonthQty = sums[23];
      this.tongji.coalOutThisMonthWtKg = sums[24];
      this.tongji.coalInitWtKg = sums[25];
      this.tongji.lorryIntThisYearQty = sums[26];
      this.tongji.coalInThisYearWtKg = sums[27];
      return sums;
    },




    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getEn(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改场站日报";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateEn(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addEn(this.form).then(response => {
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
      this.$confirm('是否确认删除场站日报编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delEn(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
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
