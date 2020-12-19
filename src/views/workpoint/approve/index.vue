<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="单据类型" prop="docType">
        <el-select v-model="queryParams.docType" placeholder="请选择单据类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="场所ID" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入场所ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据号" prop="docNo">
        <el-input
          v-model="queryParams.docNo"
          placeholder="请输入单据号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据ID" prop="docId">
        <el-input
          v-model="queryParams.docId"
          placeholder="请输入单据ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批状态" prop="approveState">
        <el-input
          v-model="queryParams.approveState"
          placeholder="请输入审批状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否终审" prop="isFinally">
        <el-input
          v-model="queryParams.isFinally"
          placeholder="请输入是否终审"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提交人" prop="applyUser">
        <el-input
          v-model="queryParams.applyUser"
          placeholder="请输入提交人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提交日期" prop="applyTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.applyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择提交日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="提交原因" prop="applyReason">
        <el-input
          v-model="queryParams.applyReason"
          placeholder="请输入提交原因"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批人" prop="approveUser">
        <el-input
          v-model="queryParams.approveUser"
          placeholder="请输入审批人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批时间" prop="approveTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.approveTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择审批时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审批结果" prop="approveResult">
        <el-input
          v-model="queryParams.approveResult"
          placeholder="请输入审批结果"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批说明" prop="approveReason">
        <el-input
          v-model="queryParams.approveReason"
          placeholder="请输入审批说明"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="附件ID" prop="attachments">
        <el-input
          v-model="queryParams.attachments"
          placeholder="请输入附件ID"
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
          v-hasPermi="['workpoint:approve:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['workpoint:approve:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['workpoint:approve:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['workpoint:approve:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="approveList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="单据类型" align="center" prop="docType" />
      <el-table-column label="场所ID" align="center" prop="placeId" />
      <el-table-column label="单据号" align="center" prop="docNo" />
      <el-table-column label="单据ID" align="center" prop="docId" />
      <el-table-column label="审批状态" align="center" prop="approveState" />
      <el-table-column label="是否终审" align="center" prop="isFinally" />
      <el-table-column label="提交人" align="center" prop="applyUser" />
      <el-table-column label="提交日期" align="center" prop="applyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交原因" align="center" prop="applyReason" />
      <el-table-column label="审批人" align="center" prop="approveUser" />
      <el-table-column label="审批时间" align="center" prop="approveTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.approveTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批结果" align="center" prop="approveResult" />
      <el-table-column label="审批说明" align="center" prop="approveReason" />
      <el-table-column label="附件ID" align="center" prop="attachments" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['workpoint:approve:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['workpoint:approve:remove']"
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

    <!-- 添加或修改工分审批对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="单据类型">
          <el-select v-model="form.docType" placeholder="请选择单据类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="场所ID" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所ID" />
        </el-form-item>
        <el-form-item label="单据号" prop="docNo">
          <el-input v-model="form.docNo" placeholder="请输入单据号" />
        </el-form-item>
        <el-form-item label="单据ID" prop="docId">
          <el-input v-model="form.docId" placeholder="请输入单据ID" />
        </el-form-item>
        <el-form-item label="审批状态" prop="approveState">
          <el-input v-model="form.approveState" placeholder="请输入审批状态" />
        </el-form-item>
        <el-form-item label="是否终审" prop="isFinally">
          <el-input v-model="form.isFinally" placeholder="请输入是否终审" />
        </el-form-item>
        <el-form-item label="提交人" prop="applyUser">
          <el-input v-model="form.applyUser" placeholder="请输入提交人" />
        </el-form-item>
        <el-form-item label="提交日期" prop="applyTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.applyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择提交日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="提交原因" prop="applyReason">
          <el-input v-model="form.applyReason" placeholder="请输入提交原因" />
        </el-form-item>
        <el-form-item label="审批人" prop="approveUser">
          <el-input v-model="form.approveUser" placeholder="请输入审批人" />
        </el-form-item>
        <el-form-item label="审批时间" prop="approveTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.approveTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审批时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审批结果" prop="approveResult">
          <el-input v-model="form.approveResult" placeholder="请输入审批结果" />
        </el-form-item>
        <el-form-item label="审批说明" prop="approveReason">
          <el-input v-model="form.approveReason" placeholder="请输入审批说明" />
        </el-form-item>
        <el-form-item label="附件ID" prop="attachments">
          <el-input v-model="form.attachments" placeholder="请输入附件ID" />
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
import { listApprove, getApprove, delApprove, addApprove, updateApprove } from "@/api/workpoint/approve";

export default {
  name: "Approve",
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
      // 工分审批表格数据
      approveList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        docType: undefined,
        placeId: undefined,
        docNo: undefined,
        docId: undefined,
        approveState: undefined,
        isFinally: undefined,
        applyUser: undefined,
        applyTime: undefined,
        applyReason: undefined,
        approveUser: undefined,
        approveTime: undefined,
        approveResult: undefined,
        approveReason: undefined,
        attachments: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询工分审批列表 */
    getList() {
      this.loading = true;
      listApprove(this.queryParams).then(response => {
        this.approveList = response.rows;
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
        id: undefined,
        docType: undefined,
        placeId: undefined,
        docNo: undefined,
        docId: undefined,
        approveState: undefined,
        isFinally: undefined,
        applyUser: undefined,
        applyTime: undefined,
        applyReason: undefined,
        approveUser: undefined,
        approveTime: undefined,
        approveResult: undefined,
        approveReason: undefined,
        attachments: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        revision: undefined
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
      this.title = "添加工分审批";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getApprove(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工分审批";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateApprove(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addApprove(this.form).then(response => {
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
      this.$confirm('是否确认删除工分审批编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delApprove(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/approve/export', {
        ...this.queryParams
      }, `workpoint_approve.xlsx`)
    }
  }
};
</script>