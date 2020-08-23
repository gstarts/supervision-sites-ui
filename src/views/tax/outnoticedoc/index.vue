<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
      <el-form-item label="出库通知单号" prop="outNoticeDocNo">
        <el-input
          v-model="queryParams.outNoticeDocNo"
          placeholder="请输入出库通知单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['tax:outnoticedoc:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:outnoticedoc:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:outnoticedoc:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="outnoticedocList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="出库通知单号" align="center" prop="outNoticeDocNo" />
      <el-table-column label="预计出仓日期" align="center" prop="estimateOutDate" width="180"></el-table-column>
      <el-table-column label="寄舱客户名称" align="center" prop="sendCustomerName" />
      <el-table-column label="结算客户名称" align="center" prop="settlementCustomerName" />
      <el-table-column label="录入人姓名" align="center" prop="inputUserName" />
      <el-table-column label="细目笔数" align="center" prop="detailedCount" />
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-document" @click="handleDtl(scope.row)">查看明细</el-button>
          <el-button
            v-if="scope.row.status !== 1"
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleStatusChange(scope.row)"
          >审核</el-button>
          <el-button
            v-if="scope.row.status !== 1"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:outnoticedoc:edit']"
          >修改</el-button>
          <el-button
            v-if="scope.row.status !== 1"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:outnoticedoc:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改出库通知单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="出库通知单号" prop="outNoticeDocNo">
              <el-input v-model="form.outNoticeDocNo" placeholder="请输入出库通知单号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计出仓日期" prop="estimateOutDate">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.estimateOutDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择预计出仓日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="寄舱客户名称" prop="sendCustomerName">
              <el-input v-model="form.sendCustomerName" placeholder="请输入寄舱客户名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="结算客户名称" prop="settlementCustomerName">
              <el-input v-model="form.settlementCustomerName" placeholder="请输入结算客户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="装货方式" prop="loadingMethod">
               <el-select v-model="form.loadingMethod">
                <el-option
                  v-for="dict in packOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作方式" prop="operationMode">
                <el-select v-model="form.operationMode">
                <el-option
                  v-for="dict in handleOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务编号" prop="businessNumber">
              <el-input v-model="form.businessNumber" placeholder="请输入业务编号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="木质包装" prop="packingMethod">
               <el-radio-group v-model="form.packingMethod">
                <el-radio
                  v-for="dict in isOptions"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监管方式" prop="superviseMethod">
               <el-select v-model="form.superviseMethod">
                <el-option
                  v-for="dict in superviseOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="退税" prop="taxReimbursement">
               <el-radio-group v-model="form.taxReimbursement">
                <el-radio
                  v-for="dict in isOptions"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货源地" prop="goodsSource">
              <el-input v-model="form.goodsSource" placeholder="请输入货源地" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总计费吨" prop="totalChargeTons">
              <el-input v-model="form.totalChargeTons" placeholder="请输入总计费吨" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="装货时间" prop="loadingDate">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.loadingDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择装货时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出货时间" prop="shipmentDate">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.shipmentDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择出货时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="OT序号" prop="otSerialNo">
              <el-input v-model="form.otSerialNo" placeholder="请输入OT序号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务单号" prop="businessOrderNo">
              <el-input v-model="form.businessOrderNo" placeholder="请输入业务单号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="扩大共享级别" prop="expandSharingLevels">
              <el-input v-model="form.expandSharingLevels" placeholder="请输入扩大共享级别" />
            </el-form-item>
          </el-col>
              <el-col :span="8">
            <el-form-item label="录入人">
                <el-input v-model="form.inputUserName" placeholder />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="form.remarks" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listOutnoticedoc,
  getOutnoticedoc,
  delOutnoticedoc,
  addOutnoticedoc,
  updateOutnoticedoc,
  changeDocStatus,
} from "@/api/tax/outnoticedoc";

export default {
  name: "Outnoticedoc",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 出库通知单表格数据
      outnoticedocList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        outNoticeDocNo: undefined,
        estimateOutDate: undefined,
        sendCustomerId: undefined,
        sendCustomerName: undefined,
        settlementCustomerId: undefined,
        settlementCustomerName: undefined,
        loadingMethod: undefined,
        operationMode: undefined,
        businessNumber: undefined,
        packingMethod: undefined,
        superviseMethod: undefined,
        taxReimbursement: undefined,
        goodsSource: undefined,
        totalChargeTons: undefined,
        loadingDate: undefined,
        shipmentDate: undefined,
        otSerialNo: undefined,
        businessOrderNo: undefined,
        inputUserId: undefined,
        inputUserName: undefined,
        inputDate: undefined,
        approveUserId: undefined,
        approveUserName: undefined,
        approveDate: undefined,
        updateUserId: undefined,
        updateUserName: undefined,
        updateDate: undefined,
        printFlag: undefined,
        expandSharingLevels: undefined,
        detailedCount: undefined,
        status: undefined,
        remarks: undefined,
      },
      // 表单参数
      form: {},
      // 日期范围
      dateRange: [],
            // 状态字典
      statusOptions: [{ value: "0", label: "录入" }],
      // 装货方式字典
      packOptions: [],
      // 操作方式字典
      handleOptions: [],
      // 监管方式字典
      superviseOptions: [],
       // 是否
      isOptions: [
        { value: "0", label: "是" },
        { value: "1", label: "否" },
      ],
      // 表单校验
      rules: {
        outNoticeDocNo: [
          { required: true, message: "出库通知单号不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
     //加载装货方式字典
    this.getDicts("tax_pack_type").then((response) => {
      this.packOptions = response.data;
    });
    //加载操作方式字典
    this.getDicts("tax_handle_type").then((response) => {
      this.handleOptions = response.data;
    });
    //加载监管方式字典
    this.getDicts("tax_regulate_type").then((response) => {
      this.superviseOptions = response.data;
    });
  },
  methods: {
    /** 查询出库通知单列表 */
    getList() {
      this.loading = true;
      listOutnoticedoc(
        this.addDateRange(this.queryParams, this.dateRange)
      ).then((response) => {
        this.outnoticedocList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        status: "0",
        loadingMethod: "1",
        operationMode: "1",
        superviseMethod: "1",
        packingMethod: "0",
        taxReimbursement: "1",
        inputUserName: this.$store.getters.name,
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
      this.ids = selection.map((item) => item.outNoticeDocId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加出库通知单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const outNoticeDocId = row.outNoticeDocId || this.ids;
      getOutnoticedoc(outNoticeDocId).then((response) => {
        this.form = response.data;
         this.form.status = String(response.data.status);
        this.form.loadingMethod = String(response.data.loadingMethod);
        this.form.operationMode = String(response.data.operationMode);
        this.form.superviseMethod = String(response.data.superviseMethod);
        this.form.packingMethod = String(response.data.packingMethod);
        this.form.taxReimbursement = String(response.data.taxReimbursement);
        this.open = true;
        this.title = "修改出库通知单";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.outNoticeDocId != undefined) {
            updateOutnoticedoc(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addOutnoticedoc(this.form).then((response) => {
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
      const outNoticeDocIds = row.outNoticeDocId || this.ids;
      this.$confirm(
        '是否确认删除出库通知单编号为"' + outNoticeDocIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delOutnoticedoc(outNoticeDocIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    /** 查看明细操作 */
    handleDtl(row) {
      this.reset();
      const outNoticeDocId = row.outNoticeDocId;
      const outNoticeDocStauts = row.status;
      this.$router.push({
        path: "outnoticedtl/",
        query: { docId: outNoticeDocId, docStatus:outNoticeDocStauts},
      });
    },
    // 审核状态修改
    handleStatusChange(row) {
      this.$confirm("确认要审核通过出库通知单吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return changeDocStatus(row.outNoticeDocId, 1);
        })
        .then(() => {
          this.msgSuccess("审核成功");
          this.getList();
        });
    },
    //状态处理
    statusFormat(row, column) {
      if (row.status == "0") {
        return "录入";
      } else {
        return "已审核";
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "tax/outnoticedoc/export",
        {
          ...this.queryParams,
        },
        `tax_outnoticedoc.xlsx`
      );
    },
  },
};
</script>