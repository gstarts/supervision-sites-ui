<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">

      <el-form-item label="时间" prop="startTime">
        <el-date-picker
          v-model="queryParams.beginTime"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"
                   v-hasPermi="['place:daily:list']" :loading="loading">搜索
        </el-button>
        <!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
      </el-form-item>
      <el-form-item>
        <download-excel
          class="export-excel-wrapper"
          :data="outstoreDocList2"
          :fields="json_fields"
          :title="titleList"
          :footer="excelFooter"
          :default-value="defaultValue"
          :name="'海关日报-'+queryParams.beginTime+'.xls'">
          <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
          <el-button type="primary" size="mini" @click="importExcel" :loading="loading">导出EXCEL</el-button>
        </download-excel>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="outstoreDocList" max-height="750" show-summary :summary-method="getSummaries">
      <!--      <el-table-column label="序号" align="center"  type="index" min-width="70" />-->
      <af-table-column label="寄仓客户" align="center" prop="column1"/>
      <el-table-column label="煤种" align="center" prop="column2"/>
      <el-table-column label="当日入库" align="center">
        <el-table-column label="车数" align="center" prop="column3"/>
        <el-table-column label="调入" align="center" prop="column4">
          <template slot-scope="scope">
            {{ scope.row.column4.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="当日出库" align="center">
        <el-table-column label="车数" align="center" prop="column5"/>
        <el-table-column label="调出" align="center" prop="column6">
          <template slot-scope="scope">
            {{ scope.row.column6.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="库存" align="center" prop="column7">
        <template slot-scope="scope">
          {{ scope.row.column7.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="本年累计调入" align="center">
        <el-table-column label="车数" align="center" prop="column14"/>
        <el-table-column label="吨数" align="center" prop="column15">
          <template slot-scope="scope">
            {{ scope.row.column15.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="本年累计调出" align="center">
        <el-table-column label="车数" align="center" prop="column16"/>
        <el-table-column label="吨数" align="center" prop="column17">
          <template slot-scope="scope">
            {{ scope.row.column17.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="期初转入" align="center" prop="column18">
        <template slot-scope="scope">
          {{ scope.row.column18.toFixed(2) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getUserDepts} from "@/utils/charutils";
import {customsDayList} from "@/api/place/instoreDoc";

export default {
  name: "OutstoreDoc",
  data() {
    return {
      titleList: [],
      // Excel 页脚
      excelFooter: '',
      // 默认值
      defaultValue: '',
      // 遮罩层
      loading: false,
      // 总条数
      // 出库明细单表格数据
      outstoreDocList: [],
      outstoreDocList2: [],

      lastRow: {},
      // 查询参数
      queryParams: {
        queryLogo: 'I',
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        beginTime: '',
      },
      depts: [],
      json_fields: {
        "寄仓客户": "column1",
        "煤种": "column2",
        "当日入库车数": "column3",
        "当日入库调入": "column4",
        "当日出库车数": "column5",
        "当日出库调出": "column6",
        "库存": "column7",
        "本年累计调入车数": "column14",
        "本年累计调入吨数": "column15",
        "本年累计调出车数": "column16",
        "本年累计调出吨数": "column17",
        "期初转入": "column18",

      },
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
    }
  },
  methods: {
    /** 查询出库明细单列表 */
    getList() {
      if (this.queryParams.beginTime === '') {
        this.msgError("时间选择不可为空");
        return
      }
      this.loading = true;
      this.titleList = [];
      this.outstoreDocList = []
      customsDayList(this.queryParams).then(response => {
        this.outstoreDocList = response.data;
        this.printTitle = '海关日报'
        this.titleList.push(this.printTitle)
        this.titleList.push(this.queryParams.beginTime);
        //this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList();
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download('place/outstoreDoc/export', {
        ...this.queryParams
      }, `place_outstoreDoc.xlsx`)
    },

    importExcel() {
      if (this.outstoreDocList.length === 0) {
        return this.$message.warning("导出无效,请先查询数据是否为空");
      }
      this.outstoreDocList2 = [...this.outstoreDocList]
      this.outstoreDocList2.push(this.lastRow)
    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 2 || index === 4 || index === 7 || index === 9) {
            return sums[index]
          }
          if (index === 3 || index === 5 || index === 6 || index === 8 || index === 10 || index === 11) {
           // console.log(index + '=' + sums[index])
            return sums[index] = sums[index].toFixed(2)
          }
        } else {
          sums[index] = '';
        }
      });

      this.lastRow.column1 = '总计'
      this.lastRow.column2 = ''
      this.lastRow.column3 = sums[2]
      this.lastRow.column4 = Number(sums[3])
      this.lastRow.column5 = sums[4]
      this.lastRow.column6 = Number(sums[5])
      this.lastRow.column7 = Number(sums[6])
      this.lastRow.column14 = sums[7]
      this.lastRow.column15 = Number(sums[8])
      this.lastRow.column16 = sums[9]
      this.lastRow.column17 = Number(sums[10])
      this.lastRow.column18 = Number(sums[11])
      //console.log(this.lastRow)
      return sums;
    },
  }
};
</script>
