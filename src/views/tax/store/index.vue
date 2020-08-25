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
      <el-form-item label="库位编号" prop="storeNo">
        <el-input
          v-model="queryParams.storeNo"
          placeholder="请输入库位编号"
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
          v-hasPermi="['tax:store:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:store:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:store:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:store:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="storeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="库位编号" align="center" prop="storeNo" />
      <el-table-column label="区域编号" align="center" prop="zoneCode" />
      <el-table-column label="保税库" align="center" prop="deptId" />
      <el-table-column label="库位状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:store:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:store:remove']"
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

    <!-- 添加或修改库位对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
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
        <el-form-item label="库位编号" prop="storeNo">
          <el-input v-model="form.storeNo" placeholder="请输入库位编号" />
        </el-form-item>
        <el-form-item label="区域编号" prop="zoneCode">
          <el-input v-model="form.zoneCode" placeholder="请输入区域编号" />
        </el-form-item>
        <el-form-item label="库位状态">
            <el-select v-model="form.status">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
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
import { listStore, getStore, delStore, addStore, updateStore } from "@/api/tax/store";
import {getUserDepts} from '@/utils/charutils'

export default {
  name: "Store",
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
      // 库位表格数据
      storeList: [],
      //保税库列表
      depts: [],
      // 状态字典
      statusOptions: [{value: "0", label: "未使用"},{value: "1", label: "已使用"}],
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
        storeNo: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deptId: [
          {required: true, message: "请选择保税库", trigger: "blur"},
        ],
        storeNo: [
          {required: true, message: "请输入库位编码", trigger: "blur"},
        ],
        zoneCode: [
          {required: true, message: "请输入区域编码", trigger: "blur"},
        ],
      }
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
    /** 查询库位列表 */
    getList() {
      this.loading = true;
      listStore(this.queryParams).then(response => {
        this.storeList = response.rows;
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
        storeId: undefined,
        storeNo: undefined,
        status: 0
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
      this.ids = selection.map(item => item.storeId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.form.status='0';
      this.form.deptId = this.deptId;
      this.open = true;
      this.title = "添加库位";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const storeId = row.storeId || this.ids
      getStore(storeId).then(response => {
        this.form = response.data;
        this.form.status = String(response.data.status);
        this.form.deptId = response.data.deptId;
        this.open = true;
        this.title = "修改库位";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.storeId != undefined) {
            updateStore(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addStore(this.form).then(response => {
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
      const storeIds = row.storeId || this.ids;
      this.$confirm('是否确认删除库位编号为"' + storeIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStore(storeIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },

    //状态处理
    statusFormat(row, column) {
      if (row.status == "0") {
        return "未使用";
      } else {
        return "已使用";
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/store/export', {
        ...this.queryParams
      }, `tax_store.xlsx`)
    }
  }
};
</script>
