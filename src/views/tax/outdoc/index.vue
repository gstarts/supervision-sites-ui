<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="保税库" prop="deptId">
        <el-select
          v-model="queryParams.deptId"
          placeholder="请输入保税库ID"
          clearable
          size="small"
          @change="handleQuery">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="出库单号" prop="outDocNo">
        <el-input
          v-model="queryParams.outDocNo"
          placeholder="请输入出库单号"
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
          v-hasPermi="['tax:outdoc:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:outdoc:edit']"
        >修改</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:outdoc:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="outdocList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="出库单号" align="center" prop="outDocNo" />
      <el-table-column label="出库通知单号" align="center" prop="outNoticeDocNo" />
      <el-table-column label="寄舱客户名称" align="center" prop="sendCustomerName" />
      <el-table-column label="结算客户名称" align="center" prop="settlementCustomerName" />
      <el-table-column label="录入人姓名" align="center" prop="inputUserName" />
      <el-table-column label="细目笔数" align="center" prop="detailedCount" />
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
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
          >确认</el-button>
          <el-button
            v-if="scope.row.status !== 1"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:outdoc:edit']"
          >修改</el-button>
          <el-button
            v-if="scope.row.status !== 1"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:outdoc:remove']"
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

    <!-- 添加或修改出库单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="保税库" prop="deptId">
              <el-select v-model="form.deptId" placeholder="请选择保税库">
                <el-option
                  v-for="dept in depts"
                  :key="dept.deptId"
                  :label="dept.deptName"
                  :value="dept.deptId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库单号" prop="outDocNo">
              <el-input v-model="form.outDocNo" placeholder="请输入出库单号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库通知单号" prop="outNoticeDocNo">
              <el-input v-model="form.outNoticeDocNo" placeholder="请输入出库通知单号" />
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
            <el-form-item label="操作员" prop="operationUser">
              <el-input v-model="form.operationUser" placeholder="请输入操作员" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓管员" prop="storekeeper">
              <el-input v-model="form.storekeeper" placeholder="请输入仓管员" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出仓日期" prop="warehousingDate">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.warehousingDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择出仓日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进境时间" prop="entryTime">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.entryTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择进境时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="计费日期" prop="billingDate">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.billingDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择计费日期"
              ></el-date-picker>
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
          <el-col :span="8">
            <el-form-item label="业务编号" prop="businessNo">
              <el-input v-model="form.businessNo" placeholder="请输入业务编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="总计费吨" prop="totalChargeTons">
              <el-input v-model="form.totalChargeTons" placeholder="请输入总计费吨" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="OT序号" prop="otSerialNo">
              <el-input v-model="form.otSerialNo" placeholder="请输入OT序号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务归属" prop="businessOwnership">
              <el-input v-model="form.businessOwnership" placeholder="请输入业务归属" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
  listOutdoc,
  getOutdoc,
  delOutdoc,
  addOutdoc,
  updateOutdoc,
  changeDocStatus,
} from "@/api/tax/outdoc";
import {getUserDepts} from "@/utils/charutils";

export default {
  name: "Outdoc",
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
      // 出库单表格数据
      outdocList: [],
      //保税库列表
      depts: [],
      //第一个
      deptId: 0,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        outDocNo: undefined,
        outNoticeDocId: undefined,
        outNoticeDocNo: undefined,
        sendCustomerId: undefined,
        sendCustomerName: undefined,
        settlementCustomerId: undefined,
        settlementCustomerName: undefined,
        loadingMethod: undefined,
        operationUser: undefined,
        storekeeper: undefined,
        warehousingDate: undefined,
        entryTime: undefined,
        billingDate: undefined,
        operationMode: undefined,
        businessNo: undefined,
        totalChargeTons: undefined,
        otSerialNo: undefined,
        businessOwnership: undefined,
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
        detailedCount: undefined,
        status: undefined,
        remarks: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deptId: [
          {required: true, message: "请选择保税库", trigger: "blur"},
        ],
        outDocNo: [
          {required: true, message: "请输入出库单单号", trigger: "blur"},
        ],
        outNoticeDocNo: [
          {required: true, message: "请输入出库通知单单号", trigger: "blur"},
        ],
      },
      // 装货方式字典
      packOptions: [],
      // 操作方式字典
      handleOptions: [],
      // 日期范围
      dateRange: [],
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('1')
    if (this.depts.length > 0) {
      //默认选中第一个
      this.queryParams.deptId = this.depts[0].deptId;
      this.deptId = this.depts[0].deptId;
      this.getList()
    }
       //加载装货方式字典
    this.getDicts("tax_pack_type").then((response) => {
      this.packOptions = response.data;
    });
    //加载操作方式字典
    this.getDicts("tax_handle_type").then((response) => {
      this.handleOptions = response.data;
    });
  },
  methods: {
    /** 查询出库单列表 */
    getList() {
      this.loading = true;
      listOutdoc(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.outdocList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
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
      this.ids = selection.map((item) => item.outDocId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.form.deptId = this.deptId;
      this.open = true;
      this.title = "添加出库单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const outDocId = row.outDocId || this.ids;
      getOutdoc(outDocId).then((response) => {
        this.form = response.data;
        this.form.loadingMethod = String(response.data.loadingMethod);
        this.form.operationMode = String(response.data.operationMode);
        this.form.deptId = response.data.deptId;
        this.open = true;
        this.title = "修改出库单";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.outDocId != undefined) {
            updateOutdoc(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addOutdoc(this.form).then((response) => {
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
      const outDocIds = row.outDocId || this.ids;
      this.$confirm(
        '是否确认删除出库单编号为"' + outDocIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delOutdoc(outDocIds);
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
      const outDocId = row.outDocId || this.ids;
      const outDocStauts = row.status;
      this.$router.push({
        path: "outdocdtl/",
        query: { docId: outDocId, docStatus:outDocStauts},
      });
    },

    //状态修改
    handleStatusChange(row) {
      this.$confirm("确认要确认入库单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return changeDocStatus(row.outDocId);
        })
        .then(() => {
          this.msgSuccess("确认成功");
          this.getList();
        });
    },

    //状态处理
    statusFormat(row, column) {
      if (row.status == "0") {
        return "录入";
      } else {
        return "已确认";
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "tax/outdoc/export",
        {
          ...this.queryParams,
        },
        `tax_outdoc.xlsx`
      );
    },
  },
};
</script>
