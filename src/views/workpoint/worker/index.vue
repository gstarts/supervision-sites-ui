<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <!--      <el-form-item label="场所" prop="placeId">
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
            </el-form-item>-->
      <el-form-item label="人员姓名" prop="workerName">
        <el-input
          v-model="queryParams.workerName"
          placeholder="请输人员姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员编号" prop="workerCode">
        <el-input
          v-model="queryParams.workerCode"
          placeholder="请输入人员编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员类型" prop="workerType">
        <el-select
          @change="handleQuery"
          v-model="queryParams.workerType" placeholder="请选择人员类型" clearable size="small">
          <el-option
            v-for="dept in workerTypeOptions"
            :key="dept.dictValue"
            :label="dept.dictLabel"
            :value="dept.dictValue"
          />
        </el-select>
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
          v-hasPermi="['workpoint:worker:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['workpoint:worker:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['workpoint:worker:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['workpoint:worker:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="workerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--<el-table-column label="ID" align="center" prop="id"/>-->
      <el-table-column label="人员姓名" align="center" prop="workerName"/>
      <el-table-column label="人员编号" align="center" prop="workerCode"/>
      <el-table-column label="人员类型" align="center" prop="workerType" :formatter="workerTypeFormat" />
      <!--      <el-table-column label="场所" align="center" prop="placeId"/>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['workpoint:worker:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['workpoint:worker:remove']"
          >删除
          </el-button>
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

    <!-- 添加或修改工人名单 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="人员姓名" prop="workerName">
              <el-input v-model="form.workerName" placeholder="请输入工作人员姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人员编号" prop="workerCode">
              <el-input v-model="form.workerCode" placeholder="请输入人员编号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="人员类型" prop="workerType">
              <el-select
                @change="handleQuery"
                v-model="form.workerType" placeholder="请选择人员类型" clearable size="small">
                <el-option
                  v-for="dept in workerTypeOptions"
                  :key="dept.dictValue"
                  :label="dept.dictLabel"
                  :value="dept.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
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
import {listWorker, getWorker, delWorker, addWorker, updateWorker} from "@/api/workpoint/worker";
import {getUserDepts} from "@/utils/charutils";

export default {
  name: "Worker",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      depts: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 工人名单 表格数据
      workerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        workerName: undefined,
        workerCode: undefined,
        placeId: undefined,
        workerType: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        workerName: [
          {type: "string", required: true, message: "人员姓名不能为空", trigger: "blur"}
        ],
        workerCode: [
          {type: "string", required: true, message: "人员编号不能为空", trigger: "blur"}
        ]
      },
      workerTypeOptions: []
    };
  },
  created() {
    this.getDicts("job_worker_type").then(response => {
      this.workerTypeOptions = response.data;
    });
    this.getList();
    //this.depts = getUserDepts('')
    /*if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId

    }*/
    //workerTypeOptions 工人类型

  },
  methods: {
    /** 查询工人名单 列表 */
    getList() {
      this.loading = true;
      listWorker(this.queryParams).then(response => {
        this.workerList = response.rows;
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
        workerName: undefined,
        workerCode: undefined,
        workerType: undefined,
        placeId: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
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
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加作业人员信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWorker(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改作业人员信息";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateWorker(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addWorker(this.form).then(response => {
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
      this.$confirm('是否确认删除工人名单 编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delWorker(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/worker/export', {
        ...this.queryParams
      }, `workpoint_worker.xlsx`)
    },
    workerTypeFormat(row, column) {
      return this.selectDictLabel(this.workerTypeOptions, row.workerType);
    },
  }
};
</script>
