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
      <el-form-item label="合同ID" prop="contactId">
        <el-input
          v-model="queryParams.contactId"
          placeholder="请输入合同ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户ID" prop="customerId">
        <el-input
          v-model="queryParams.customerId"
          placeholder="请输入客户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="计费项目" prop="billOption">
        <el-input
          v-model="queryParams.billOption"
          placeholder="请输入计费项目"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计费周期" prop="billCycle">
        <el-input
          v-model="queryParams.billCycle"
          placeholder="请输入计费周期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计费类型" prop="billType">
        <el-select v-model="queryParams.billType" placeholder="请选择计费类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="费率(元)" prop="billPrice">
        <el-input
          v-model="queryParams.billPrice"
          placeholder="请输入费率(元)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计费单位" prop="billUnit">
        <el-input
          v-model="queryParams.billUnit"
          placeholder="请输入计费单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="阶梯单位" prop="stageUnit">
        <el-input
          v-model="queryParams.stageUnit"
          placeholder="请输入阶梯单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计费(账单)名称" prop="billName">
        <el-input
          v-model="queryParams.billName"
          placeholder="请输入计费(账单)名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数量单位" prop="quantityUnit">
        <el-input
          v-model="queryParams.quantityUnit"
          placeholder="请输入数量单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计量起始" prop="quantityBegin">
        <el-input
          v-model="queryParams.quantityBegin"
          placeholder="请输入计量起始"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计量结束" prop="quantityEnd">
        <el-input
          v-model="queryParams.quantityEnd"
          placeholder="请输入计量结束"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计时单位(天、月)" prop="timeUnit">
        <el-input
          v-model="queryParams.timeUnit"
          placeholder="请输入计时单位(天、月)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计时起始" prop="timeStart">
        <el-input
          v-model="queryParams.timeStart"
          placeholder="请输入计时起始"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计时结束" prop="timeEnd">
        <el-input
          v-model="queryParams.timeEnd"
          placeholder="请输入计时结束"
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
          v-hasPermi="['place:costRule:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:costRule:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:costRule:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:costRule:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="costRuleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="场所ID" align="center" prop="placeId" />
      <el-table-column label="合同ID" align="center" prop="contactId" />
      <el-table-column label="合同编号" align="center" prop="contractNo" />
      <el-table-column label="客户ID" align="center" prop="customerId" />
      <el-table-column label="客户名称" align="center" prop="customerName" />
      <el-table-column label="计费项目" align="center" prop="billOption" />
      <el-table-column label="计费周期" align="center" prop="billCycle" />
      <el-table-column label="计费类型" align="center" prop="billType" />
      <el-table-column label="费率(元)" align="center" prop="billPrice" />
      <el-table-column label="计费单位" align="center" prop="billUnit" />
      <el-table-column label="阶梯单位" align="center" prop="stageUnit" />
      <el-table-column label="计费(账单)名称" align="center" prop="billName" />
      <el-table-column label="数量单位" align="center" prop="quantityUnit" />
      <el-table-column label="计量起始" align="center" prop="quantityBegin" />
      <el-table-column label="计量结束" align="center" prop="quantityEnd" />
      <el-table-column label="计时单位(天、月)" align="center" prop="timeUnit" />
      <el-table-column label="计时起始" align="center" prop="timeStart" />
      <el-table-column label="计时结束" align="center" prop="timeEnd" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="乐观锁" align="center" prop="revision" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:costRule:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:costRule:remove']"
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

    <!-- 添加或修改计费规则记录对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="场所ID" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所ID" />
        </el-form-item>
        <el-form-item label="合同ID" prop="contactId">
          <el-input v-model="form.contactId" placeholder="请输入合同ID" />
        </el-form-item>
        <el-form-item label="合同编号" prop="contractNo">
          <el-input v-model="form.contractNo" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="客户ID" prop="customerId">
          <el-input v-model="form.customerId" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="计费项目" prop="billOption">
          <el-input v-model="form.billOption" placeholder="请输入计费项目" />
        </el-form-item>
        <el-form-item label="计费周期" prop="billCycle">
          <el-input v-model="form.billCycle" placeholder="请输入计费周期" />
        </el-form-item>
        <el-form-item label="计费类型">
          <el-select v-model="form.billType" placeholder="请选择计费类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="费率(元)" prop="billPrice">
          <el-input v-model="form.billPrice" placeholder="请输入费率(元)" />
        </el-form-item>
        <el-form-item label="计费单位" prop="billUnit">
          <el-input v-model="form.billUnit" placeholder="请输入计费单位" />
        </el-form-item>
        <el-form-item label="阶梯单位" prop="stageUnit">
          <el-input v-model="form.stageUnit" placeholder="请输入阶梯单位" />
        </el-form-item>
        <el-form-item label="计费(账单)名称" prop="billName">
          <el-input v-model="form.billName" placeholder="请输入计费(账单)名称" />
        </el-form-item>
        <el-form-item label="数量单位" prop="quantityUnit">
          <el-input v-model="form.quantityUnit" placeholder="请输入数量单位" />
        </el-form-item>
        <el-form-item label="计量起始" prop="quantityBegin">
          <el-input v-model="form.quantityBegin" placeholder="请输入计量起始" />
        </el-form-item>
        <el-form-item label="计量结束" prop="quantityEnd">
          <el-input v-model="form.quantityEnd" placeholder="请输入计量结束" />
        </el-form-item>
        <el-form-item label="计时单位(天、月)" prop="timeUnit">
          <el-input v-model="form.timeUnit" placeholder="请输入计时单位(天、月)" />
        </el-form-item>
        <el-form-item label="计时起始" prop="timeStart">
          <el-input v-model="form.timeStart" placeholder="请输入计时起始" />
        </el-form-item>
        <el-form-item label="计时结束" prop="timeEnd">
          <el-input v-model="form.timeEnd" placeholder="请输入计时结束" />
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
import { listCostRuleLike, getCostRule, delCostRule, addCostRule, updateCostRule } from "@/api/place/bill/rule";

export default {
  name: "CostRule",
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
      // 计费规则记录表格数据
      costRuleList: [],
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
        placeId: undefined,
        contactId: undefined,
        contractNo: undefined,
        customerId: undefined,
        customerName: undefined,
        billOption: undefined,
        billCycle: undefined,
        billType: undefined,
        billPrice: undefined,
        billUnit: undefined,
        stageUnit: undefined,
        billName: undefined,
        quantityUnit: undefined,
        quantityBegin: undefined,
        quantityEnd: undefined,
        timeUnit: undefined,
        timeStart: undefined,
        timeEnd: undefined,
        revision: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        contactId: [
          { required: true, message: "合同ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询计费规则记录列表 */
    getList() {
      this.loading = true;
      listCostRuleLike(this.queryParams).then(response => {
        this.costRuleList = response.rows;
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
        contactId: undefined,
        contractNo: undefined,
        customerId: undefined,
        customerName: undefined,
        billOption: undefined,
        billCycle: undefined,
        billType: undefined,
        billPrice: undefined,
        billUnit: undefined,
        stageUnit: undefined,
        billName: undefined,
        quantityUnit: undefined,
        quantityBegin: undefined,
        quantityEnd: undefined,
        timeUnit: undefined,
        timeStart: undefined,
        timeEnd: undefined,
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
      this.title = "添加计费规则记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCostRule(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改计费规则记录";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateCostRule(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCostRule(this.form).then(response => {
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
      this.$confirm('是否确认删除计费规则记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCostRule(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/costRule/export', {
        ...this.queryParams
      }, `place_costRule.xlsx`)
    }
  }
};
</script>
