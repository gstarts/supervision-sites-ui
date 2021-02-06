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
                   v-hasPermi="['place:inStoreDoc:customsDay']" :loading="loading">搜索
        </el-button>
        <!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
      </el-form-item>
      <el-form-item>
        <download-excel
          class="export-excel-wrapper"
          :data="outstoreDocList"
          :fields="json_fields"
          :title="titleList"
          :footer="excelFooter"
          :default-value="defaultValue"
          :name="'海关日报-'+queryParams.beginTime+'.xls'">
          <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
          <el-button type="primary" size="mini" @click="exportExcel" :loading="loading">导出EXCEL</el-button>
        </download-excel>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="outstoreDocList" max-height="645">
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
import {
  listOutstoreDoc,
  listOutstoreDocLike,
  getOutstoreDoc,
  delOutstoreDoc,
  addOutstoreDoc,
  updateOutstoreDoc
} from "@/api/place/outstoreDoc";
import {getUserDepts} from "@/utils/charutils";
import {listStoreContract} from "@/api/place/storeContract";
import {customsDayList} from "@/api/place/instoreDoc";

export default {
  name: "CustomsDay1",
  data() {
    return {
      titleList: [],
      // Excel 页脚
      excelFooter: '',
      // 默认值
      defaultValue: '',
      // 遮罩层
      loading: false,

      // 出库明细单表格数据
      outstoreDocList: [],
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

      dateRange: [],
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
      // this.getContract(this.queryParams.placeId, '1')
    }

  },
  methods: {
    /** 查询出库明细单列表 */
    getList() {
      if (this.queryParams.beginTime === '') {
        this.$message.warning("时间选择不可为空");
        return
      }
      this.loading = true
      this.titleList = []
      this.outstoreDocList = []
      customsDayList(this.queryParams, this.dateRange).then(response => {
        this.outstoreDocList = response.data;
        this.printTitle = '海关日报'
        this.titleList.push(this.printTitle)
        this.titleList.push(this.queryParams.beginTime);

        //y计算每列的总和
        this.lastRow.column1 = '总计'
        this.lastRow.column2 = undefined
        this.lastRow.column3 = this.outstoreDocList.reduce(function (total, item, index, arr) {
          return total + Number(item.column3)
        }, 0)
        this.lastRow.column4 = Number((this.outstoreDocList.reduce(function (total, item, index, arr) {
          return total + item.column4
        }, 0)).toFixed(2))

        this.lastRow.column5 = this.outstoreDocList.reduce(function (total, item, index, arr) {
          return total + item.column5
        }, 0)

        this.lastRow.column6 = Number((this.outstoreDocList.reduce(function (total, item, index, arr) {
          return total + item.column4
        }, 0)).toFixed(2))

        this.lastRow.column7 = Number((this.outstoreDocList.reduce(function (total, item, index, arr) {
          return total + item.column7
        }, 0)).toFixed(2))

        this.lastRow.column14 = this.outstoreDocList.reduce(function (total, item, index, arr) {
          return total + item.column14
        }, 0)

        this.lastRow.column15 = Number((this.outstoreDocList.reduce(function (total, item, index, arr) {
          return total + item.column15
        }, 0)).toFixed(2))

        this.lastRow.column16 = this.outstoreDocList.reduce(function (total, item, index, arr) {
          return total + item.column16
        }, 0)

        this.lastRow.column17 = Number((this.outstoreDocList.reduce(function (total, item, index, arr) {
          return total + item.column17
        }, 0)).toFixed(2))
        this.lastRow.column18 = Number((this.outstoreDocList.reduce(function (total, item, index, arr) {
          return total + item.column18
        }, 0)).toFixed(2))

        this.outstoreDocList.push(this.lastRow)

        this.loading = false;
      })
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
    exportExcel() {
      if (this.outstoreDocList.length === 0) {
        return this.$message.warning("导出无效,请先查询数据是否为空");
      }
    },
  }
};
</script>
