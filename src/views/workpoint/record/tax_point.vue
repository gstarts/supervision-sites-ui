<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          @change="handleQuery"
          v-model="queryParams.placeId" placeholder="请选择场所" clearable size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工作日期" prop="workDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.workDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择工作日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工人编号" prop="workerId">
        <el-input
          v-model="queryParams.workerId"
          placeholder="请输入工人编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="工分类型" prop="pointTypeId">
        <el-input
          v-model="queryParams.pointTypeId"
          placeholder="请输入工分类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="工分标准" prop="pointStandardId">
        <el-input
          v-model="queryParams.pointStandardId"
          placeholder="请输入工分标准"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="工分值" prop="score">
        <el-input
          v-model="queryParams.score"
          placeholder="请输入工分值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="工单类型" prop="docType">
        <el-select v-model="queryParams.docType" placeholder="请选择工单类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <!--<el-form-item label="工单编号" prop="docNo">
        <el-input
          v-model="queryParams.docNo"
          placeholder="请输入工单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="作业小组" prop="jobGroupId">
        <el-input
          v-model="queryParams.jobGroupId"
          placeholder="请输入作业小组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="业务编号" prop="businessNo">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入业务编号(一个编号对应多个单号)"
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
          v-hasPermi="['workpoint:record:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['workpoint:record:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['workpoint:record:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['workpoint:record:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="recordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="工作日期" align="center" prop="workDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工人编号" align="center" prop="workerId" />
      <el-table-column label="工分类型" align="center" prop="pointTypeId" />
      <el-table-column label="工分标准" align="center" prop="pointStandardId" />
      <el-table-column label="工分值" align="center" prop="score" />
      <el-table-column label="场所" align="center" prop="placeId" />
      <el-table-column label="工单类型(入库单，出库单)" align="center" prop="docType" />
      <el-table-column label="工单编号" align="center" prop="docNo" />
      <el-table-column label="作业小组" align="center" prop="jobGroupId" />
      <el-table-column label="业务编号(一个编号对应多个单号)" align="center" prop="businessNo" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['workpoint:record:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['workpoint:record:remove']"
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

    <!-- 添加或修改 工分记录对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="场所" prop="placeId">
              <el-select
                v-model="form.placeId" placeholder="请选择场所" size="small">
                <el-option
                  v-for="dept in depts"
                  :key="dept.deptId"
                  :label="dept.deptName"
                  :value="dept.deptId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作日期" prop="workDate">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.workDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择工作日期"
                              :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="工分标准" prop="pointStandardId">
              <el-input v-model="form.pointStandardId" placeholder="请输入工分标准" />
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12"></el-col>
          <el-col :span="12"></el-col>
        </el-row>



        <el-form-item label="工人编号" prop="workerId">
          <el-input v-model="form.workerId" placeholder="请输入工人编号" />
        </el-form-item>
        <el-form-item label="工分类型" prop="pointTypeId">
          <el-input v-model="form.pointTypeId" placeholder="请输入工分类型" />
        </el-form-item>
        <el-form-item label="工分标准" prop="pointStandardId">
          <el-input v-model="form.pointStandardId" placeholder="请输入工分标准" />
        </el-form-item>
        <el-form-item label="工分值" prop="score">
          <el-input v-model="form.score" placeholder="请输入工分值" />
        </el-form-item>
        <el-form-item label="场所" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所" />
        </el-form-item>
        <el-form-item label="工单类型(入库单，出库单)">
          <el-select v-model="form.docType" placeholder="请选择工单类型(入库单，出库单)">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="工单编号" prop="docNo">
          <el-input v-model="form.docNo" placeholder="请输入工单编号" />
        </el-form-item>
        <el-form-item label="作业小组" prop="jobGroupId">
          <el-input v-model="form.jobGroupId" placeholder="请输入作业小组" />
        </el-form-item>
        <el-form-item label="业务编号(一个编号对应多个单号)" prop="businessNo">
          <el-input v-model="form.businessNo" placeholder="请输入业务编号(一个编号对应多个单号)" />
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
import { listRecord, getRecord, delRecord, addRecord, updateRecord } from "@/api/workpoint/record";
import {getUserDepts} from "@/utils/charutils";

export default {
  name: "Record",
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
      //  工分记录表格数据
      recordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        workDate: undefined,
        workerId: undefined,
        pointTypeId: undefined,
        pointStandardId: undefined,
        score: undefined,
        placeId: undefined,
        docType: undefined,
        docNo: undefined,
        jobGroupId: undefined,
        businessNo: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      depts: [],
      pointStandardList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      }
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('1')
    this.getList();
  },
  methods: {
    /** 查询 工分记录列表 */
    getList() {
      this.loading = true;
      listRecord(this.queryParams).then(response => {
        this.recordList = response.rows;
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
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        revision: undefined,
        id: undefined,
        workDate: undefined,
        workerId: undefined,
        pointTypeId: undefined,
        pointStandardId: undefined,
        score: undefined,
        placeId: undefined,
        docType: undefined,
        docNo: undefined,
        jobGroupId: undefined,
        businessNo: undefined
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
      this.title = "添加 工分记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRecord(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改 工分记录";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateRecord(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addRecord(this.form).then(response => {
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
      this.$confirm('是否确认删除 工分记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRecord(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/record/export', {
        ...this.queryParams
      }, `workpoint_record.xlsx`)
    }
  }
};
</script>
