<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="堆场ID" prop="yardId">
        <el-input
          v-model="queryParams.yardId"
          placeholder="请输入堆场ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['yard:report:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['yard:report:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['yard:report:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:report:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="reportList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="堆场ID" align="center" prop="yardId" />
      <el-table-column label="集装箱库位总量" align="center" prop="containerStoreCount" />
      <el-table-column label="场内集装箱总量" align="center" prop="containerTotal" />
      <el-table-column label="空箱总量" align="center" prop="emptyTotal" />
      <el-table-column label="重箱总量" align="center" prop="fullTotal" />
      <el-table-column label="散杂货库位总量" align="center" prop="goodsStoreCount" />
      <el-table-column label="场内散杂货库位总量" align="center" prop="goodsCount" />
      <el-table-column label="散杂货总重量" align="center" prop="goodsWeightTotal" />
      <el-table-column label="场内散杂货总重" align="center" prop="goodsCurrentWeight" />
      <el-table-column label="报表类型" align="center" prop="reportType" :formatter="reportTypeFormat" />
      <el-table-column label="日期/月份" align="center" prop="reportDate" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yard:report:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yard:report:remove']"
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

    <!-- 添加或修改堆场报表对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="堆场ID" prop="yardId">
          <el-input v-model="form.yardId" placeholder="请输入堆场ID" />
        </el-form-item>
        <el-form-item label="集装箱库位总量" prop="containerStoreCount">
          <el-input v-model="form.containerStoreCount" placeholder="请输入集装箱库位总量" />
        </el-form-item>
        <el-form-item label="场内集装箱总量" prop="containerTotal">
          <el-input v-model="form.containerTotal" placeholder="请输入场内集装箱总量" />
        </el-form-item>
        <el-form-item label="空箱总量" prop="emptyTotal">
          <el-input v-model="form.emptyTotal" placeholder="请输入空箱总量" />
        </el-form-item>
        <el-form-item label="重箱总量" prop="fullTotal">
          <el-input v-model="form.fullTotal" placeholder="请输入重箱总量" />
        </el-form-item>
        <el-form-item label="散杂货库位总量" prop="goodsStoreCount">
          <el-input v-model="form.goodsStoreCount" placeholder="请输入散杂货库位总量" />
        </el-form-item>
        <el-form-item label="场内散杂货库位总量" prop="goodsCount">
          <el-input v-model="form.goodsCount" placeholder="请输入场内散杂货库位总量" />
        </el-form-item>
        <el-form-item label="散杂货总重量" prop="goodsWeightTotal">
          <el-input v-model="form.goodsWeightTotal" placeholder="请输入散杂货总重量" />
        </el-form-item>
        <el-form-item label="场内散杂货总重" prop="goodsCurrentWeight">
          <el-input v-model="form.goodsCurrentWeight" placeholder="请输入场内散杂货总重" />
        </el-form-item>
        <el-form-item label="报表类型">
          <el-select v-model="form.reportType" placeholder="请选择报表类型">
            <el-option
              v-for="dict in reportTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期/月份" prop="reportDate">
          <el-input v-model="form.reportDate" placeholder="请输入日期/月份" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listReport, getReport, delReport, addReport, updateReport } from "@/api/yard/report";

export default {
  name: "Report",
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
      // 堆场报表表格数据
      reportList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 报表类型字典
      reportTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        yardId: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        yardId: [
          { required: true, message: "堆场ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("reporting_period").then(response => {
      this.reportTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询堆场报表列表 */
    getList() {
      this.loading = true;
      listReport(this.queryParams).then(response => {
        this.reportList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 报表类型字典翻译
    reportTypeFormat(row, column) {
      return this.selectDictLabel(this.reportTypeOptions, row.reportType);
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
        yardId: undefined,
        containerStoreCount: undefined,
        containerTotal: undefined,
        emptyTotal: undefined,
        fullTotal: undefined,
        goodsStoreCount: undefined,
        goodsCount: undefined,
        goodsWeightTotal: undefined,
        goodsCurrentWeight: undefined,
        reportType: undefined,
        reportDate: undefined,
        remark: undefined,
        createdBy: undefined,
        createdTime: undefined,
        updateBy: undefined,
        updateTime: undefined
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
      this.title = "添加堆场报表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getReport(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改堆场报表";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateReport(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addReport(this.form).then(response => {
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
      this.$confirm('是否确认删除堆场报表编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delReport(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yard/report/export', {
        ...this.queryParams
      }, `yard_report.xlsx`)
    }
  }
};
</script>