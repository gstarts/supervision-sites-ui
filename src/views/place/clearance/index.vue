<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="通关单号" prop="customsNo">
        <el-input
          v-model="queryParams.customsNo"
          placeholder="请输入通关单号"
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
          v-hasPermi="['place:clearance:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:clearance:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:clearance:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:clearance:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="clearanceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" type="index" />
      <el-table-column label="通关单号" align="center" prop="customsNo" />
      <el-table-column label="运输批次号" align="center" prop="batchNo" />
      <el-table-column label="提煤单号" align="center" prop="coalBillNo" />
      <el-table-column label="通关单重量" align="center" prop="wieght" />
      <el-table-column label="已使用重量" align="center" prop="oldWieght">
        <template slot-scope="scope">
          <span>{{scope.row.wieght-scope.row.lastWieght}}</span>
        </template>
      </el-table-column>
      <el-table-column label="剩余重量" align="center" prop="lastWieght" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改通关单 对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="提煤单号" prop="coalBillNo">
          <el-select v-model="form.coalBillNo" filterable placeholder="请选择提煤单号">
            <el-option
              v-for="item in BigList"
              :key="item.coalBillNo"
              :label="item.coalBillNo"
              :value="item.coalBillNo">
            </el-option>
          </el-select>
      </el-form-item>
        <el-form-item label="通关单号" prop="customsNo">
          <el-input v-model="form.customsNo" placeholder="请输入通关单号" />
        </el-form-item>
        <el-form-item label="运输批次号" prop="batchNo">
          <el-input v-model="form.batchNo" placeholder="请输入运输批次号" />
        </el-form-item>
        <el-form-item label="通关单重量" prop="wieght">
          <el-input v-model="form.wieght" placeholder="请输入通关单重量" />
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
import { listClearance, getClearance, delClearance, addClearance, updateClearance } from "@/api/place/clearance";
import {selectCoalBillNo} from "@/api/place/big";
export default {
  name: "Clearance",
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
      // 通关单 表格数据
      clearanceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        coalBillNo: undefined,
        customsNo: undefined,
        batchNo: undefined,
        wieght: undefined,
        lastWieght: undefined,
        outWieght: undefined,
        revision: undefined,
        oldwieght:0,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      //提煤单号
      BigList:[],
    };
  },
  created() {
    this.getList();
    //查询大提煤单中的所有提煤单号
    selectCoalBillNo().then(response =>{
      this.BigList=response.rows;
      console.log(this.BigList)
    });
  },
  methods: {
    /** 查询通关单 列表 */
    getList() {
      this.loading = true;
      listClearance(this.queryParams).then(response => {
        this.clearanceList = response.rows;
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
        coalBillNo: undefined,
        customsNo: undefined,
        batchNo: undefined,
        wieght: undefined,
        lastWieght: undefined,
        outWieght: undefined,
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
      this.title = "添加通关单 ";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getClearance(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改通关单 ";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateClearance(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addClearance(this.form).then(response => {
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
      this.$confirm('是否确认删除通关单 编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delClearance(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/clearance/export', {
        ...this.queryParams
      }, `place_clearance.xlsx`)
    }
  }
};
</script>
<style lang="scss" scope>
.el-select {
  width: 100%;
}
</style>
