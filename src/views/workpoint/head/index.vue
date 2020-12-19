<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所ID" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入场所ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务日期" prop="businessTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.businessTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择业务日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工分类型" prop="pointType">
        <el-select v-model="queryParams.pointType" placeholder="请选择工分类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="工分标准" prop="pointStandard">
        <el-input
          v-model="queryParams.pointStandard"
          placeholder="请输入工分标准"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计分车数" prop="vehicleCount">
        <el-input
          v-model="queryParams.vehicleCount"
          placeholder="请输入计分车数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="通知单号" prop="docNo">
        <el-input
          v-model="queryParams.docNo"
          placeholder="请输入通知单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="通知单ID" prop="docId">
        <el-input
          v-model="queryParams.docId"
          placeholder="请输入通知单ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务编号" prop="bussinessNo">
        <el-input
          v-model="queryParams.bussinessNo"
          placeholder="请输入业务编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据类型" prop="docType">
        <el-select v-model="queryParams.docType" placeholder="请选择单据类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="寄仓客户" prop="costumerName">
        <el-input
          v-model="queryParams.costumerName"
          placeholder="请输入寄仓客户"
          clearable
          size="small"
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
      <el-form-item label="车型" prop="vehicleType">
        <el-select v-model="queryParams.vehicleType" placeholder="请选择车型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务部门" prop="untitled3">
        <el-input
          v-model="queryParams.untitled3"
          placeholder="请输入业务部门"
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
          v-hasPermi="['workpoint:head:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['workpoint:head:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['workpoint:head:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['workpoint:head:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="headList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="单据号" align="center" prop="id" />
      <el-table-column label="场所ID" align="center" prop="placeId" />
      <el-table-column label="业务日期" align="center" prop="businessTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工分类型" align="center" prop="pointType" />
      <el-table-column label="工分标准" align="center" prop="pointStandard" />
      <el-table-column label="计分车数" align="center" prop="vehicleCount" />
      <el-table-column label="通知单号" align="center" prop="docNo" />
      <el-table-column label="通知单ID" align="center" prop="docId" />
      <el-table-column label="业务编号" align="center" prop="bussinessNo" />
      <el-table-column label="单据类型" align="center" prop="docType" />
      <el-table-column label="寄仓客户" align="center" prop="costumerName" />
      <el-table-column label="车牌号" align="center" prop="vehicleNo" />
      <el-table-column label="车型" align="center" prop="vehicleType" />
      <el-table-column label="状态" align="center" prop="state" />
      <el-table-column label="业务部门" align="center" prop="untitled3" />
      <el-table-column label="审批状态" align="center" prop="approveState" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['workpoint:head:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['workpoint:head:remove']"
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

    <!-- 添加或修改工分信息对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="场所ID" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所ID" />
        </el-form-item>
        <el-form-item label="业务日期" prop="businessTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.businessTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择业务日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工分类型">
          <el-select v-model="form.pointType" placeholder="请选择工分类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="工分标准" prop="pointStandard">
          <el-input v-model="form.pointStandard" placeholder="请输入工分标准" />
        </el-form-item>
        <el-form-item label="计分车数" prop="vehicleCount">
          <el-input v-model="form.vehicleCount" placeholder="请输入计分车数" />
        </el-form-item>
        <el-form-item label="通知单号" prop="docNo">
          <el-input v-model="form.docNo" placeholder="请输入通知单号" />
        </el-form-item>
        <el-form-item label="通知单ID" prop="docId">
          <el-input v-model="form.docId" placeholder="请输入通知单ID" />
        </el-form-item>
        <el-form-item label="业务编号" prop="bussinessNo">
          <el-input v-model="form.bussinessNo" placeholder="请输入业务编号" />
        </el-form-item>
        <el-form-item label="单据类型">
          <el-select v-model="form.docType" placeholder="请选择单据类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="寄仓客户" prop="costumerName">
          <el-input v-model="form.costumerName" placeholder="请输入寄仓客户" />
        </el-form-item>
        <el-form-item label="车牌号" prop="vehicleNo">
          <el-input v-model="form.vehicleNo" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="车型">
          <el-select v-model="form.vehicleType" placeholder="请选择车型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item label="业务部门" prop="untitled3">
          <el-input v-model="form.untitled3" placeholder="请输入业务部门" />
        </el-form-item>
        <el-form-item label="审批状态" prop="approveState">
          <el-input v-model="form.approveState" placeholder="请输入审批状态" />
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
import { listHead, getHead, delHead, addHead, updateHead } from "@/api/workpoint/head";

export default {
  name: "Head",
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
      // 工分信息表格数据
      headList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        businessTime: undefined,
        pointType: undefined,
        pointStandard: undefined,
        vehicleCount: undefined,
        docNo: undefined,
        docId: undefined,
        bussinessNo: undefined,
        docType: undefined,
        costumerName: undefined,
        vehicleNo: undefined,
        vehicleType: undefined,
        state: undefined,
        untitled3: undefined,
        approveState: undefined,
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
    /** 查询工分信息列表 */
    getList() {
      this.loading = true;
      listHead(this.queryParams).then(response => {
        this.headList = response.rows;
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
        placeId: undefined,
        businessTime: undefined,
        pointType: undefined,
        pointStandard: undefined,
        vehicleCount: undefined,
        docNo: undefined,
        docId: undefined,
        bussinessNo: undefined,
        docType: undefined,
        costumerName: undefined,
        vehicleNo: undefined,
        vehicleType: undefined,
        state: undefined,
        untitled3: undefined,
        approveState: undefined,
        createTime: undefined,
        createBy: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined
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
      this.title = "添加工分信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHead(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工分信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateHead(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addHead(this.form).then(response => {
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
      this.$confirm('是否确认删除工分信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delHead(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/head/export', {
        ...this.queryParams
      }, `workpoint_head.xlsx`)
    }
  }
};
</script>