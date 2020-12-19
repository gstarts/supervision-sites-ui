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
      <el-form-item label="编号" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
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
          v-hasPermi="['workpoint:group:add']"
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
          v-hasPermi="['workpoint:group:edit']"
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
          v-hasPermi="['workpoint:group:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['workpoint:group:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="groupList">
      <!--<af-table-column type="selection" width="55" align="center"/>-->
      <!--      <el-table-column label="ID" align="center" prop="id"/>-->
      <el-table-column label="名称" align="center" prop="name"/>
      <el-table-column label="编号" align="center" prop="code"/>
      <el-table-column label="成员" align="center" prop="works">
        <template slot-scope="scope">
          {{ scope.row.jobWorkerList != null ? scope.row.jobWorkerList.map(item => item.workerName).join(',') : '' }}
        </template>
      </el-table-column>
      <el-table-column label="场所" align="center" prop="placeId" :formatter="formatPlace"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right"
                       style="width:140px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['workpoint:group:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['workpoint:group:remove']"
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

    <!-- 添加或修改作业小组对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="编号" prop="code">
              <el-input v-model="form.code" placeholder="请输入编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="成员" prop="works">
          <el-select multiple filterable v-model="form.works" placeholder="请选择成员" size="small" style="width:90%">
            <el-option
              v-for="worker in workerList"
              :key="worker.workerCode"
              :label="worker.workerName"
              :value="worker.workerCode">
              <span style="float: left">{{ worker.workerName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场所" prop="placeId">
          <el-select
            v-model="form.placeId" placeholder="请选择场所" clearable size="small">
            <el-option
              v-for="dept in depts"
              :key="dept.deptId"
              :label="dept.deptName"
              :value="dept.deptId"
            />
          </el-select>
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
import {listGroup, getGroup, delGroup, addGroup, updateGroup} from "@/api/workpoint/group";
import {listWorker} from "@/api/workpoint/worker";
import {getUserDepts} from "@/utils/charutils";

export default {
  name: "Group",
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
      // 作业小组表格数据
      groupList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        code: undefined,
        name: undefined,
        works: undefined,
        placeId: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        code: [
          {required: true, message: "编号不能为空", trigger: 'blur'}
        ],
        name: [
          {required: true, message: "名称不能为空", trigger: "blur"}
        ]
      },
      workerList: [],
      depts: []
    };
  },
  created() {
    this.depts = getUserDepts('')
    this.getWorkerList()
    this.getList();
    //console.log('depts')
    //console.log(this.depts)
    /*if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
    }*/
  },
  methods: {
    /** 查询作业小组列表 */
    getList() {
      this.loading = true;
      listGroup(this.queryParams).then(response => {
        this.groupList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getWorkerList() {
      listWorker({}).then(response => {
        this.workerList = response.rows;
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
        id: undefined,
        code: undefined,
        name: undefined,
        works: undefined,
        placeId: undefined,
        workerIds: undefined
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
      this.title = "添加作业小组";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      let works = []
      if (row.works != "") {
        works = row.works.split(',')
      }
      const id = row.id || this.ids
      getGroup(id).then(response => {
        this.form = response.data;
        this.form.works = works
        this.open = true;
        this.title = "修改作业小组";
      });

    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let works = this.form.works
          if (this.form.works.length > 0) {
            this.form.works = this.form.works.join(",")
          }
          if (this.form.id != undefined) {
            updateGroup(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            }).catch(err => {
              this.form.works = works
            });
          } else {
            addGroup(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            }).catch(err => {
              this.form.works = works
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除作业小组编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delGroup(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/group/export', {
        ...this.queryParams
      }, `workpoint_group.xlsx`)
    },
    formatPlace(row) {
      let place = this.depts.find(item => item.deptId === row.placeId)
      if (place) {
        return place.deptName
      }
      return row.placeId
    }
  }
}
</script>

<style lang="scss" scoped>

/*.el-select-dropdown__item {
  float: left;
  display: inline;
  padding:5px;
}*/

</style>
