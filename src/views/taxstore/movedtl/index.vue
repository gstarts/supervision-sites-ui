<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8"  v-if="this.moveDocStatus!== 1 && this.moveDocStatus!== '1'">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['tax:movedtl:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:movedtl:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:movedtl:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:movedtl:export']"
        >导出</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="movedtlList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="移仓前货位" align="center" prop="moveAllocationBefore" />
      <el-table-column label="移仓后货位" align="center" prop="moveAllocationAfter" />
      <el-table-column label="袋封号" align="center" prop="shippingMarks" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="入库时间" align="center" prop="generateDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.generateDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="this.moveDocStatus!== 1 && this.moveDocStatus!== '1'"
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:movedtl:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:movedtl:remove']"
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

    <!-- 添加或修改移库细单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="袋封号" prop="shippingMarks">
          <el-input v-model="form.shippingMarks" placeholder="请输入唛头" />
        </el-form-item>
        <el-form-item label="批次" prop="batch">
          <el-input v-model="form.batch" placeholder="请输入批次" />
        </el-form-item>
        <el-form-item label="移仓前货位" prop="moveAllocationBefore">
          <el-input v-model="form.moveAllocationBefore" placeholder="请输入移仓前货位" />
        </el-form-item>
        <el-form-item label="移仓后货位" prop="moveAllocationAfter">
          <el-input v-model="form.moveAllocationAfter" placeholder="请输入移仓后货位" />
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
  listMovedtl,
  getMovedtl,
  delMovedtl,
  addMovedtl,
  updateMovedtl,
  listIndtlbydocid,
} from "@/api/tax/movedtl";

export default {
  name: "Movedtl",
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
      // 移库细单表格数据
      movedtlList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        moveDocId: undefined,
        goodsId: undefined,
        moveAllocationBefore: undefined,
        moveAllocationAfter: undefined,
        shippingMarks: undefined,
        batch: undefined,
        generateDate: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      //总单ID
      moveDocId: this.$route.query.docId,
      //总单状态
      moveDocStatus:this.$route.query.docStatus,
    };
  },
  created() {
    this.getDtlData(this.moveDocId);
  },
  methods: {
    /** 查询移库细单列表 */
    getList() {
      this.loading = true;
      listMovedtl(this.queryParams).then((response) => {
        this.movedtlList = response.rows;
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
        moveDtlId: undefined,
        moveDocId: undefined,
        goodsId: undefined,
        moveAllocationBefore: undefined,
        moveAllocationAfter: undefined,
        shippingMarks: undefined,
        batch: undefined,
        generateDate: undefined,
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
      this.ids = selection.map((item) => item.moveDtlId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加移库细单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const moveDtlId = row.moveDtlId || this.ids;
      getMovedtl(moveDtlId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改移库细单";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.moveDocId=this.moveDocId;
          if (this.form.moveDtlId != undefined) {
            updateMovedtl(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addMovedtl(this.form).then((response) => {
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
      const moveDtlIds = row.moveDtlId || this.ids;
      this.$confirm(
        '是否确认删除移库细单编号为"' + moveDtlIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delMovedtl(moveDtlIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    /**加 */


    /** 查询明细 */
    getDtlData(moveDocId) {
      listIndtlbydocid(moveDocId).then((response) => {
        this.movedtlList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "tax/movedtl/export",
        {
          ...this.queryParams,
        },
        `tax_movedtl.xlsx`
      );
    },
  },
};
</script>