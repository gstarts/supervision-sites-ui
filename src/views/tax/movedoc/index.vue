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
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
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
          v-hasPermi="['tax:movedoc:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:movedoc:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:movedoc:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="movedocList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="客户名称" align="center" prop="customerName" />
      <el-table-column label="移库开始时间" align="center" prop="inputDate" width="180"></el-table-column>
      <el-table-column label="移库完成时间" align="center" prop="finishDate" width="180"></el-table-column>
      <el-table-column label="操作人名称" align="center" prop="operatorUserName" />
      <el-table-column label="审核人名称" align="center" prop="approveUserName" />
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="录入时间" align="center" prop="addTime" width="180"></el-table-column>
      <el-table-column label="装卸组" align="center" prop="handGroup" />
      <el-table-column label="机械号" align="center" prop="machineNo" />
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
            v-hasPermi="['tax:movedoc:edit']"
          >修改</el-button>
          <el-button
            v-if="scope.row.status !== 1"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:movedoc:remove']"
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

    <!-- 添加或修改移库单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">

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
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="移库开始时间" prop="inputDate">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.inputDate"
            type="datetime"
            value-format="yyyy-mm-dd  HH:mm"
            placeholder="选择移库开始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="移库完成时间" prop="finishDate">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.finishDate"
            type="datetime"
            value-format="yyyy-mm-dd  HH:mm"
            placeholder="选择移库完成时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="装卸组" prop="handGroup">
          <el-input v-model="form.handGroup" placeholder="请输入装卸组" />
        </el-form-item>
        <el-form-item label="机械号" prop="machineNo">
          <el-input v-model="form.machineNo" placeholder="请输入机械号" />
        </el-form-item>
            <el-form-item label="录入人">
                <el-input v-model="form.inputUserName" readonly />
            </el-form-item>

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
  listMovedoc,
  getMovedoc,
  delMovedoc,
  addMovedoc,
  updateMovedoc,
  changeDocStatus,
} from "@/api/tax/movedoc";
import {getUserDepts} from "@/utils/charutils";

export default {
  name: "Movedoc",
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
      // 移库单表格数据
      movedocList: [],
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
        customerId: undefined,
        customerName: undefined,
        inputDate: undefined,
        finishDate: undefined,
        operatorUserId: undefined,
        operatorUserName: undefined,
        approveUserId: undefined,
        approveUserName: undefined,
        status: undefined,
        addTime: undefined,
        handGroup: undefined,
        machineNo: undefined,
      },
      // 表单参数
      form: {},
      // 日期范围
      dateRange: [],
      // 表单校验
      rules: {
        deptId: [
          {required: true, message: "请选择保税库", trigger: "blur"},
        ],
      },
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
  },
  methods: {
    /** 查询移库单列表 */
    getList() {
      this.loading = true;
      listMovedoc(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.movedocList = response.rows;
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
      this.ids = selection.map((item) => item.moveDocId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.form.deptId = this.deptId;
      this.open = true;
      this.title = "添加移库单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const moveDocId = row.moveDocId || this.ids;
      getMovedoc(moveDocId).then((response) => {
        this.form = response.data;
        this.form.deptId = response.data.deptId;
        this.open = true;
        this.title = "修改移库单";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.moveDocId != undefined) {
            updateMovedoc(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addMovedoc(this.form).then((response) => {
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
      const moveDocIds = row.moveDocId || this.ids;
      this.$confirm(
        '是否确认删除移库单编号为"' + moveDocIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delMovedoc(moveDocIds);
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
      const moveDocId = row.moveDocId;
      const moveDocStauts = row.status;
      this.$router.push({
        path: "movedtl/",
        query: { docId: moveDocId, docStatus: moveDocStauts },
      });
    },

    //状态修改
    handleStatusChange(row) {
      this.$confirm("确认要确认移库单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return changeDocStatus(row.moveDocId);
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
        return "已审核";
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "tax/movedoc/export",
        {
          ...this.queryParams,
        },
        `tax_movedoc.xlsx`
      );
    },
  },
};
</script>
