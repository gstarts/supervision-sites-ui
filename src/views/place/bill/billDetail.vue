<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="账单ID" prop="billId">
        <el-input
          v-model="queryParams.billId"
          placeholder="请输入账单ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="寄仓客户ID" prop="customerId">
        <el-input
          v-model="queryParams.customerId"
          placeholder="请输入寄仓客户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="寄仓客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入寄仓客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同ID" prop="contactId">
        <el-input
          v-model="queryParams.contactId"
          placeholder="请输入合同ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同编号" prop="contactNo">
        <el-input
          v-model="queryParams.contactNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计费项目" prop="billOption">
        <el-input
          v-model="queryParams.billOption"
          placeholder="请输入计费项目"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入单价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数量" prop="quantity">
        <el-input
          v-model="queryParams.quantity"
          placeholder="请输入数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入总金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="来源(1系统计算，2人工录入)" prop="dataSource">
        <el-input
          v-model="queryParams.dataSource"
          placeholder="请输入来源(1系统计算，2人工录入)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计费规则ID" prop="ruleId">
        <el-input
          v-model="queryParams.ruleId"
          placeholder="请输入计费规则ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="乐观锁" prop="revision">
        <el-input
          v-model="queryParams.revision"
          placeholder="请输入乐观锁"
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
          v-hasPermi="['place:detail:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:detail:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:detail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:detail:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="detailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="账单ID" align="center" prop="billId" />
      <el-table-column label="寄仓客户ID" align="center" prop="customerId" />
      <el-table-column label="寄仓客户名称" align="center" prop="customerName" />
      <el-table-column label="合同ID" align="center" prop="contactId" />
      <el-table-column label="合同编号" align="center" prop="contactNo" />
      <el-table-column label="计费项目" align="center" prop="billOption" />
      <el-table-column label="单价" align="center" prop="price" />
      <el-table-column label="数量" align="center" prop="quantity" />
      <el-table-column label="总金额" align="center" prop="amount" />
      <el-table-column label="来源(1系统计算，2人工录入)" align="center" prop="dataSource" />
      <el-table-column label="计费规则ID" align="center" prop="ruleId" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="乐观锁" align="center" prop="revision" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:detail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:detail:remove']"
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

    <!-- 添加或修改计费单明细对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="账单ID" prop="billId">
          <el-input v-model="form.billId" placeholder="请输入账单ID" />
        </el-form-item>
        <el-form-item label="寄仓客户ID" prop="customerId">
          <el-input v-model="form.customerId" placeholder="请输入寄仓客户ID" />
        </el-form-item>
        <el-form-item label="寄仓客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入寄仓客户名称" />
        </el-form-item>
        <el-form-item label="合同ID" prop="contactId">
          <el-input v-model="form.contactId" placeholder="请输入合同ID" />
        </el-form-item>
        <el-form-item label="合同编号" prop="contactNo">
          <el-input v-model="form.contactNo" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="计费项目" prop="billOption">
          <el-input v-model="form.billOption" placeholder="请输入计费项目" />
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="form.quantity" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="总金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入总金额" />
        </el-form-item>
        <el-form-item label="来源(1系统计算，2人工录入)" prop="dataSource">
          <el-input v-model="form.dataSource" placeholder="请输入来源(1系统计算，2人工录入)" />
        </el-form-item>
        <el-form-item label="计费规则ID" prop="ruleId">
          <el-input v-model="form.ruleId" placeholder="请输入计费规则ID" />
        </el-form-item>
        <el-form-item label="创建人" prop="createBy">
          <el-input v-model="form.createBy" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新人" prop="updateBy">
          <el-input v-model="form.updateBy" placeholder="请输入更新人" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="乐观锁" prop="revision">
          <el-input v-model="form.revision" placeholder="请输入乐观锁" />
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
import { listBillDetailLike, getBillDetail, delBillDetail, addBillDetail, updateBillDetail } from "@/api/place/bill/detail";

export default {
  name: "Detail",
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
      // 计费单明细表格数据
      detailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'id',
        isAsc: 'desc',
        billId: undefined,
        customerId: undefined,
        customerName: undefined,
        contactId: undefined,
        contactNo: undefined,
        billOption: undefined,
        price: undefined,
        quantity: undefined,
        amount: undefined,
        dataSource: undefined,
        ruleId: undefined,
        revision: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        billId: [
          { required: true, message: "账单ID不能为空", trigger: "blur" }
        ],
        ruleId: [
          { required: true, message: "计费规则ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询计费单明细列表 */
    getList() {
      this.loading = true;
      listBillDetailLike(this.queryParams).then(response => {
        this.detailList = response.rows;
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
        billId: undefined,
        customerId: undefined,
        customerName: undefined,
        contactId: undefined,
        contactNo: undefined,
        billOption: undefined,
        price: undefined,
        quantity: undefined,
        amount: undefined,
        dataSource: undefined,
        ruleId: undefined,
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
      this.title = "添加计费单明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBillDetail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改计费单明细";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateBillDetail(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addBillDetail(this.form).then(response => {
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
      this.$confirm('是否确认删除计费单明细编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delBillDetail(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/detail/export', {
        ...this.queryParams
      }, `place_detail.xlsx`)
    }
  }
};
</script>
