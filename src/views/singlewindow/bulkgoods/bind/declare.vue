<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
      <el-form-item label="寄舱客户" prop="bindkeyinfo">
        <el-input
          v-model="queryParams.customername"
          placeholder="请输入寄舱客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车牌号" prop="bindkeyinfo">
        <el-input
          v-model="queryParams.bindkeyinfo"
          placeholder="请输入车牌号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申报状态" prop="feedback">
        <el-select v-model="queryParams.feedback" placeholder="请选择申报状态" size="mini">
          <el-option
            v-for="dict in manageResultOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入时间" prop="optime">
        <el-date-picker clearable size="small" 
          v-model="queryParams.optime"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00']">
        </el-date-picker>        
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-thumb"
          size="mini"
          :disabled="multiple"
          @click="declare"
          v-hasPermi="['waybill:declare:declare']"
        >申报</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addTable1 = true"
          v-hasPermi="['waybill:declare:add']"
        >新增</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="declareList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="寄舱客户" align="center" prop="customername" />
      <el-table-column label="车牌号" align="center" prop="bindkeyinfo" />
      <el-table-column label="申报时间" align="center" prop="optime" />
      <el-table-column label="申报状态" align="center" prop="feedback" :formatter="manageResultFormat"/>
      <el-table-column label="海关回执信息" align="center" prop="feedbackMsg" />
      <!-- <el-table-column label="运输方式" align="center" prop="decltrafmode" :formatter="shipTypeFormat" />
      <el-table-column label="进出口标志" align="center" prop="ieflag" :formatter="inOutMarkFormat" />
      <el-table-column
        label="过卡车辆类型"
        align="center"
        prop="bayonetrdcode"
        :formatter="viaVehicleFormat"
      /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="artificialFinish(scope.row)"
            v-hasPermi="['waybill:declare:artificial']"
          >人工办结</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="deleteBody(scope.row)"
            v-hasPermi="['waybill:declare:remove']"
          >重新生成</el-button>
          <el-button
            type="text"
            icon="el-icon-detail"
            size="mini"
            @click="declare(scope.row)"
            v-hasPermi="['waybill:declare:declare']"
          >重新申报</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['waybill:declare:remove']"
          >申报详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增页 -->
    <addTable1 :detailVisible='addTable1' @close='addTableClose'></addTable1>

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
import {
  listDeclare,
  getDeclare,
  declareWaybill,
  addHead,
  addBody,
  updateDeclare,
  updateHead,
  updateBody,
  artificial,
  delBodyAll,
  exportDeclare
} from "@/api/bulkgoods/waybill/declare";
import {formatDate} from "@/utils";
import {listInfo} from "@/api/singlewindow_basic/info";
// 新增页
import addTable1 from './addTable1.vue';
export default {
  components: {
    addTable1
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 新增页弹窗
      addTable1: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 日期范围
      dateRange:[],
      // 总条数
      total: 0,
      // 提运单申报表格数据
      declareList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //运输方式
      shipTypeOptions: [],
      // 进出口标志
      inOutMarkOptions: [],
      manageResultOptions: [],
      //过卡车辆类型
      viaOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bindkeyinfo: undefined,
        optime: formatDate(new Date(),"yyyy-MM-dd"),
        // 只查询待审报数据
        feedback:"0",
        customername: undefined,
      },
      // 公司名称列表
      companyNameOptions: [],
      // 表头id
      headId: "",
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
    this.getlistInfo();
    this.getDicts("station_transport_fashion").then(response => {
      this.shipTypeOptions = response.data;
    });
    this.getDicts("station_IE_flag").then(response => {
      this.inOutMarkOptions = response.data;
    });
    this.getDicts("station_via_type").then(response => {
      this.viaOptions = response.data;
    });
    /** 申报状态 */
    this.getDicts("station_declear_status").then(response => {
      this.manageResultOptions = response.data;
    });
  },
  methods: {
    // 申报状态翻译
    manageResultFormat(row) {
      return this.selectDictLabel(this.manageResultOptions, row.feedback);
    },
    /** 查询提运单申报异常列表 */
    getList() {
      this.loading = true;
      listDeclare(this.queryParams).then(response => {
        this.declareList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 公司名称列表 */
    getlistInfo() {
      this.loading = true;
      listInfo().then(response => {
        this.companyNameOptions = response.rows;
      });
    },
    // 运输方式翻译
    shipTypeFormat(row, column) {
      return this.selectDictLabel(this.shipTypeOptions, row.decltrafmode);
    },
    // 进出口标志翻译
    inOutMarkFormat(row, column) {
      return this.selectDictLabel(this.inOutMarkOptions, row.ieflag);
    },
    // 过卡车辆类型
    viaVehicleFormat(row, column) {
      return this.selectDictLabel(this.viaOptions, row.bayonetrdcode);
    },
    // 新增页
    addTableClose() {
      this.addTable1 = false
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        sureid: undefined,
        optime: undefined,
        opuserid: undefined,
        bindkeytype: undefined,
        bindkeyinfo: undefined,
        rdcode: undefined,
        decltrafmode: undefined,
        ieflag: undefined,
        customsmaster: undefined,
        contractorcode: undefined,
        contractorcodescc: undefined,
        bayonetrdcode: undefined,
        vehicleweight: undefined,
        trailerweight: undefined,
        contaweight: undefined,
        feedback: undefined,
        feedbackMsg: undefined,
        feedbackTime: undefined,
        remark: undefined,
        enterpriseId: undefined
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
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加提运单申报";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      // this.$refs.import.showedit(id);
      this.$router.push({ path: "/singlewindow3/nuclearrelease/add", query: { tableId: id,show:false } });
    },

    /** 申报按钮操作 */
    declare(row) {
      const ids = row.id || this.ids;
      this.$confirm("是否确认进行申报提运单批量申报", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return declareWaybill(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("申报成功");
        })
        .catch(function() {});
    },

    /** 打开新增弹窗 */
    openAddDialog() {
      this.$refs.import.show();
    },
    /**驳回操作 */
     handlereject(row) {
      const ids = row.id || this.ids;
      this.$confirm("是否确认驳回?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return reject(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("驳回成功");
        })
        .catch(function() {});
    },
    /** 自动分配 */
    allocation() {},
    /**详情按钮 */
    // detail(row) {
    //   this.reset();
    //   const id = row.id || this.ids;
    //   this.$router.push({ path: "/singlewindow3/nuclearrelease/details", query: { tableId: id } });
    // }
    artificialFinish(row){
      this.reset();
      const id = row.id || this.ids;
       artificial(id)
        .then(() => {
          this.getList();
          this.msgSuccess("人工办结成功");
        })
        .catch(function () {
        });
    },
    deleteBody(row){
      this.reset();
      const id = row.id || this.ids;
       delBodyAll(id)
        .then(() => {
          this.getList();
        })
        .catch(function () {
        });
    },
  }
};
</script>