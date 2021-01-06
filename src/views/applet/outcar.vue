<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <!-- 所属场所 -->
      <el-form-item label="所属场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择所属场所" @change="((val)=>{change(val, 'placeId')})">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="提煤单号" prop="coalBillNo">
        <el-input
          v-model="queryParams.coalBillNo"
          placeholder="请输入提煤单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车牌号" prop="vehicleNo">
        <el-input
          v-model="queryParams.vehicleNo"
          placeholder="请输入车牌号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="打印状态" prop="inCardPrintState">
        <el-select v-model="queryParams.inCardPrintState" clearable placeholder="请选择状态" @change="handleQuery">
          <el-option
            v-for="dept in storeStateDic"
            :key="dept.dictValue"
            :label="dept.dictLabel"
            :value="dept.dictValue"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" type="warning" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          size="mini"
          @click="print"
          :disabled="multiple"
          v-print="'#dayin'"
          type="info"
          icon="el-icon-printer">
          打印入门证
        </el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="docList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" :selectable="checkboxInit"/>
      <el-table-column label="打印状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.inCardPrintState === '0' ? '未打' : '已打' }}
        </template>
      </el-table-column>
      <af-table-column label="车牌号" align="center" prop="vehicleNo"/>
      <af-table-column label="货净重(KG)" align="center" prop="vehicleGoodsNetWeight"/>
      <af-table-column label="车皮重(KG)" align="center" prop="vehicleTareWeight"/>
      <af-table-column label="提煤单号" align="center" prop="coalBillNo"/>
      <af-table-column label="承运单位" align="center" prop="transportUnit"/>
      <af-table-column label="制单时间" align="center" prop="createTime"/>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right" width="140px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-printer"
            v-print="'#dayin'"
            @click="printMake(scope.row)"
          >{{ scope.row.inCardPrintState == null || scope.row.inCardPrintState === '0' ? '打印' : '补打' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!--打印区域-->
    <div id="dayin" v-show="show">
      <div v-for="(item,index) in printList" class="all" style="page-break-after:always">
        <div v-for="(value,index2) in [1,2,3]" class="container">
          <el-row class="padding">
            <el-col :span="16">序号：No {{ item.no }}</el-col>
            <el-col :span="8">编号：JYD- {{ item.id }}</el-col>
          </el-row>
          <table class="data-table" style="width:100%;border:black 2px solid;border-spacing: 0;margin-bottom: 5em;">
            <thead>
            <tr>
              <th colspan="7" class="padding" style="border-bottom: black 1px solid">嘉易达堆场入门证</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td style="border-left: none;">日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
              <td style="border-right: black 2px solid;padding-right: 2px">{{ item.createTime.substring(0, 10) }}</td>
              <td style="padding-right: 2px">合 同 号</td>
              <td style="padding-right: 2px">{{ item.checkContractNo }}</td>
              <td style="padding-right: 2px">提煤单号</td>
              <td style="border-right: black 2px solid;padding-right: 0">{{ item.coalBillNo }}</td>
              <td style="border-bottom: black 2px solid;border-right: none;border-left: none">签章</td>
            </tr>
            <tr>
              <td style="border-left: none">客户单位</td>
              <td colspan="3">{{ item.customerName }}</td>
              <td>承运单位</td>
              <td style="border-right: black 2px solid">{{ item.transportUnit }}</td>
            </tr>
            <tr>
              <td style="border-left: none">煤&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种</td>
              <td colspan="3">{{ item.goodsName }}</td>
              <td>装货地址</td>
              <td style="border-right: black 2px solid">嘉易达</td>
            </tr>
            <tr>
              <td style="border-bottom: none;border-left: none">车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</td>
              <td colspan="3" style="border-bottom: none">{{ item.vehicleNo }}</td>
              <td style="border-bottom: none">收货单位</td>
              <td style="border-bottom: none;border-right: none;border-right: black 2px solid">{{
                  item.customerName
                }}
              </td>
            </tr>
            <tr>
              <td colspan="7" style="border-top: black 2px solid;border-left: none;border-right: none">
                注：本入门证有效期俩日，涂改无效，过期无效。运输车辆驶离场地后嘉易达堆场不承担任何法律责任
              </td>
            </tr>
            <tr>
              <td colspan="7" style="border-bottom: none;border-left: none;border-right: none">
                <div style="width:20%;float: left">开单员：{{ biller }}</div>
                <div style="width:20%;float: left">嘉易达现场：</div>
                <div style="width:20%;float: left">收货现场：</div>
                <div style="width:20%;float: left">装载：</div>
                <div style="width:20%;float: left">司机：</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserDepts} from '@/utils/charutils'
import {updatePrintByIds} from "@/api/place/outstoreDoc";
import {carList} from "@/api/applet/outcar";

export default {
  name: 'Car',
  data() {
    return {
      btnLoading: false,
      // 遮罩层
      loading: true,
      docList: [],
      // 选中数组
      ids: [],
      vehicleNos: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 外调车 表格数据
      carList: [],
      // 弹出层标题
      title: '',
      left: 'left',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        id: undefined,
        pageNum: 1,
        pageSize: 20,
        coalBillNo: undefined,
        vehicleNo: undefined,
        transportNum: undefined,
        placeId: undefined,
        inCardPrintState: undefined,
        orderByColumn: 'id',
        isAsc: 'desc',
      },
      fileList: [],
      transUnitList: [],//承运单位列表
      // 表单参数
      form: {},
      //场所列表
      depts: [],
      // 车牌号列表
      //提煤单号
      //BigList: [],
      //canAlloc: 0,//当前单子可分配的重量
      //文件导入参数
      storeStateDic: [
        {'dictValue': '0', 'dictLabel': '未打印'},
        {'dictValue': '1', 'dictLabel': '已打印'},
      ],
      //开单员
      biller: "",
      //billerMake: "",
      show: false,
      //showMake: false,
      // 打印数据list
      printList: [],
      //补打 打印数据list
      //printMakeList: [],
      //大提煤单可用量提示信息
      //bigUseTip: ''
    }
  },
  created() {
    // 获取场所
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId;
      this.getList()
    }
  },
  methods: {
    /** 查询外调车 列表 */
    getList() {
      this.loading = true;
      carList(this.queryParams).then(response => {
        this.loading = false
        if (response.code === 200) {
          this.docList = response.rows
          this.total = response.total
        } else {
          this.$message.warning(response.msg)
        }
      })
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.printList = selection
      console.log(this.printList)
      this.ids = selection.map(item => item.id)
      this.vehicleNos = selection.map(item => item.vehicleNo)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download('place/outstoreDoc/export', {
        ...this.queryParams
      }, `place_car.xlsx`)
    },

    change(val, name) {
      // 场所
      if (name === 'placeId') {
        //查询场所下的大提煤单中的所有提煤单号
        this.form.placeId = this.queryParams.placeId
        this.form.coalBillNo = undefined
        this.getList()
      }
    },

    print() {
      /*console.log(this.ids)
      if (this.ids.length === 0) {
        this.$message.warning('请选择要打印的出门证')
        return false
      }*/
      this.show = true;
      this.biller = this.$store.state.user.nickName
      updatePrintByIds(this.ids).then(response => {
        if (response.code === 200) {
          this.msgSuccess("修改打印状态(次数)成功");
          this.getList()
        }
      })
      clearTimeout(this.timer);
      //清除延迟执行
      this.timer = setTimeout(() => {
        //设置延迟执行
        //this.reset();
        this.show = false;
      }, 2000);
    },
    printMake(row) {
      this.biller = this.$store.state.user.nickName
      this.printList = []
      this.printList.push(row)
      //console.log(this.printMakeList)
      this.show = true;
      updatePrintByIds(row.id).then(response => {
        if (response.code === 200) {
          this.msgSuccess("修改打印状态(次数)成功");
          this.getList()
        }
      })
      clearTimeout(this.timerMake);
      //清除延迟执行
      this.timerMake = setTimeout(() => {
        //设置延迟执行
        //this.reset();
        this.show = false;
      }, 2000);
    },
    //判断是否可选
    checkboxInit(row, index) {
      if (row.storeState === '3' || row.storeState === '1' || row.storeState === '2') {
        return 0;//不可勾选
      } else {
        return 1;
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}

@page {
  size: auto;
  margin: 3mm;
}

/*html {*/
/*  background-color: #ffffff;*/
/*  margin: 0px;*/
/*}*/

/*body {*/
/*  margin: 10mm 15mm 10mm 15mm;*/
/*}*/
.all {
  height: 470px;
  width: 1100px;
  /*margin-top: 80px;*/
  margin-left: 5px;
  /*border: 1px solid ;*/
  padding-top: 72px;
  /*margin-top: 1cm;*/
}

.headRow {
  height: 40px;
  width: 1000px;
  padding-left: 3.5cm;
  /*border: 1px solid ;*/
  //padding-top: 10px;
  //margin-top: 2.5cm;
}

.firstRow {
  border-width: 20px;
  height: 50px;
  width: 1100px;
  padding-left: 2cm;
  padding-top: 10px;
  /*border: 1px solid ;*/
  margin-top: 8px;
  //margin-top: 1cm;
}

.firstRow1 {
  border-width: 20px;
  /*border: 1px solid ;*/
  font-size: 20px;
  float: left;
}

.firstRow2 {
  width: 350px;
  margin-left: 50px;
  margin-left: 50px;
  /*border: 1px solid ;*/
  font-size: 20px;
  float: left;
  word-break: break-all;

}

.firstRow3 {
  margin-left: -80px;
  width: 470px;
  /*border: 1px solid ;*/
  font-size: 20px;
  float: left;
  word-break: break-all;
}

.contractNoStyle {
  margin-left: 4cm;

}

.coalBillNoStyle {
  margin-left: 6cm;
}

.secondRow {
  height: 50px;
  width: 1000px;
  padding-left: 2cm;
  margin-top: 0px;
  /*border: 1px solid ;*/
  /*padding-top: 15px;*/
}

.secondRow1 {
  /*border: 1px solid ;*/
  width: 500px;
  height: 40px;
  font-size: 20px;
  padding-top: 20px;
  float: left;
}

.secondRow2 {
  width: 400px;
  height: 40px;
  /*border: 1px solid ;*/
  font-size: 20px;
  /*padding-left: 20px;*/
  margin-top: 10px;
  padding-top: 10px;
  float: right;
}

.thirdRow {
  height: 60px;
  width: 1100px;
  padding-left: 2cm;
  /*border: 1px solid ;*/
  margin-top: 10px;
  /*padding-top: 35px;*/
  font-size: 20px;

}


.thirdRow1 {
  width: 500px;
  height: 40px;
  /*border: 1px solid ;*/
  /*margin-top: 15px;*/
  padding-top: 15px;
  /*!*padding-top: 35px;*!*/
  /*font-size: 22px;*/
  /*display: inline-block;*/
}

.thirdRow2 {
  width: 400px;
  height: 40px;
  /*border: 1px solid ;*/
  margin-top: -25px;
  padding-left: 30px;
  font-size: 20px;
  float: right;
  /*display: inline-block;*/
  margin-left: 30px;
}

.fourRow {
  height: 60px;
  width: 1000px;
  padding-left: 2cm;
  /*border: 1px solid ;*/
  /*padding-top: 55px;*/
  margin-top: 5px;
  /*float: right;*/
}

.fourRow1 {
  width: 400px;
  height: 40px;
  /*border: 1px solid ;*/
  font-size: 22px;
  word-break: break-all;
  float: left;
}

.fourRow2 {
  width: 400px;
  height: 40px;
  /*border: 1px solid ;*/
  font-size: 22px;
  word-break: break-all;
  padding-left: 80px;
  float: right;
}

/*#customerStyle{*/
/*  margin-left: 4cm;*/
/*}*/
.nullStyle {
  font-size: 20px;

}

.carriageStyle {
  /*margin-left: 17cm;*/
  /*margin-top: 20px;*/
  padding-left: 120px;
  font-size: 20px;
}

.loadingStyle {
  /*margin-left: 15.5cm;*/
  /*padding-left: 2cm;*/
}

.receiptStyle {


}

.fiveRow {
  height: 40px;
  width: 1000px;
  padding-left: 1cm;
  font-size: 22px;
  /*border: 1px solid ;*/
  margin-top: 1.3cm;
}

.nouse {
  height: 100px;
  width: 1000px;
  /*border: 1px solid*/
}

#dayin {
  height: 9.39cm;
  width: 21cm;
  /*border: 1px solid ;*/
}

#dayinMake {
  height: 9.39cm;
  width: 21cm;
  /*border: 1px solid ;*/
}

.printSpan {
  color: red;
  font-size: 15px;
  text-align: center;
  display: block;
}

.card {
  /*border: black 1px solid;*/
}

.padding {
  padding: 14px 16px;
  font-size: 20px;
}

.both-bolder {
  border-left: black 1px solid;
  border-right: black 1px solid;
}

.right-bolder {
  border-right: black 1px solid;
  border-bottom: black 1px solid;
}

.left-bolder {
  border-left: black 1px solid;
}

.data-table td {
  padding: 14px 16px;
  font-size: 18px;
  border: black 1px solid;
}
</style>
