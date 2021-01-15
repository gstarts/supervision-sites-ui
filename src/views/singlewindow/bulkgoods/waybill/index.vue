<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <!-- <el-form-item label="所属场所id" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入所属场所id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="寄舱客户" prop="customsId">
        <el-input
          v-model="queryParams.customsId"
          placeholder="请输入寄舱客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提运单号" prop="customsNo" label-width="150px">
        <el-input
          v-model="queryParams.customsNo"
          placeholder="请输入提运单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="运输批次号" prop="batchNo">
        <el-input
          v-model="queryParams.batchNo"
          placeholder="请输入运输批次号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="通关单重量" prop="wieght">
        <el-input
          v-model="queryParams.wieght"
          placeholder="请输入通关单重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="最大剩余重量" prop="lastWieght" label-width="150px">
        <el-input
          v-model="queryParams.lastWieght"
          placeholder="请输入最大剩余重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最小剩余重量" prop="lastWieght2" label-width="150px">
        <el-input
          v-model="queryParams.lastWieght2"
          placeholder="请输入最小剩余重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="实际重量" prop="outWieght">
        <el-input
          v-model="queryParams.outWieght"
          placeholder="请输入实际重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态：0、有效，1、失效" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入状态：0、有效，1、失效"
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
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['manifest:iClearance:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['manifest:iClearance:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['manifest:iClearance:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['manifest:iClearance:export']"
        >导出</el-button>
      </el-col>
    </el-row> -->

    <el-table v-loading="loading" :data="iClearanceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="ID" align="center" prop="id" /> -->
      <!-- <el-table-column label="所属场所id" align="center" prop="placeId" /> -->
      <el-table-column label="寄舱客户" align="center" prop="customsId" />
      <el-table-column label="提运单号" align="center" prop="customsNo" />
      <el-table-column label="运输批次号" align="center" prop="batchNo" />
      <el-table-column label="通关单重量" align="center" prop="wieght" />
      <el-table-column label="剩余重量" align="center" prop="lastWieght" />
      <el-table-column label="建单时间" align="center" prop="createTime" />
      <el-table-column label="建单人" align="center" prop="createBy" />
      <!-- <el-table-column label="实际重量" align="center" prop="outWieght" />
      <el-table-column label="状态：0、有效，1、失效" align="center" prop="state" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="乐观锁" align="center" prop="revision" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manifest:iClearance:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manifest:iClearance:remove']"
          >删除</el-button> -->
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

    <!-- 添加或修改通关单 对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="所属场所id" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入所属场所id" />
        </el-form-item>
        <el-form-item label="寄舱客户" prop="customsId">
          <el-input v-model="form.customsId" placeholder="请输入寄舱客户" />
        </el-form-item>
        <el-form-item label="提运单号" prop="customsNo">
          <el-input v-model="form.customsNo" placeholder="请输入提运单号" />
        </el-form-item>
        <el-form-item label="运输批次号" prop="batchNo">
          <el-input v-model="form.batchNo" placeholder="请输入运输批次号" />
        </el-form-item>
        <el-form-item label="通关单重量" prop="wieght">
          <el-input v-model="form.wieght" placeholder="请输入通关单重量" />
        </el-form-item>
        <el-form-item label="剩余重量" prop="lastWieght">
          <el-input v-model="form.lastWieght" placeholder="请输入剩余重量" />
        </el-form-item>
        <el-form-item label="实际重量" prop="outWieght">
          <el-input v-model="form.outWieght" placeholder="请输入实际重量" />
        </el-form-item>
        <el-form-item label="状态：0、有效，1、失效" prop="state">
          <el-input v-model="form.state" placeholder="请输入状态：0、有效，1、失效" />
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
import { listIClearance, getIClearance, delIClearance, addIClearance, updateIClearance } from "@/api/manifest/iClearance";

export default {
  name: "IClearance",
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
      iClearanceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        customsId: undefined,
        customsNo: undefined,
        batchNo: undefined,
        wieght: undefined,
        lastWieght: undefined,
        lastWieght2: undefined,
        outWieght: undefined,
        state: undefined,
        revision: undefined
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
    /** 查询通关单 列表 */
    getList() {
      this.loading = true;
      listIClearance(this.queryParams).then(response => {
        this.iClearanceList = response.rows;
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
        customsId: undefined,
        customsNo: undefined,
        batchNo: undefined,
        wieght: undefined,
        lastWieght: undefined,
        outWieght: undefined,
        state: undefined,
        createBy: undefined,
        createTime: undefined,
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
      getIClearance(id).then(response => {
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
            updateIClearance(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addIClearance(this.form).then(response => {
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
          return delIClearance(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('manifest/iClearance/export', {
        ...this.queryParams
      }, `manifest_iClearance.xlsx`)
    }
  }
};
</script>