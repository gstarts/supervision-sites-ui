<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="No.ID" prop="attrId">
        <el-input
          v-model="queryParams.attrId"
          placeholder="请输入No.ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="箱属" prop="boxName">
        <el-input
          v-model="queryParams.boxName"
          placeholder="请输入箱属"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="箱型" prop="boxType">
        <el-input
          v-model="queryParams.boxType"
          placeholder="请输入箱型"
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
          v-hasPermi="['yard:container_attribute:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['yard:container_attribute:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['yard:container_attribute:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:container_attribute:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="container_attributeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!--<el-table-column label="ID" align="center" prop="id"/>-->
      <el-table-column label="No.ID" align="center" prop="attrId" />
      <el-table-column label="箱属" align="center" prop="boxName" />
      <el-table-column label="箱型" align="center" prop="boxType" />
      <el-table-column label="皮重(kg)" align="center" prop="boxTare" />
      <el-table-column label="可载重量(kg)" align="center" prop="boxLoad" />
      <el-table-column label="集装箱数量" align="center" prop="boxCount" />
      <el-table-column label="押金价格(￥)" align="center" prop="pledgePrice" />
      <el-table-column label="长(mm)" align="center" prop="length" />
      <el-table-column label="宽(mm)" align="center" prop="width" />
      <el-table-column label="高(mm)" align="center" prop="height" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yard:container_attribute:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yard:container_attribute:remove']"
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

    <!-- 添加或修改集装箱属性 对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="No.ID" prop="attrId">
          <el-input v-model="form.attrId" placeholder="请输入No.ID" />
        </el-form-item>
        <el-form-item label="箱属" prop="boxName">
          <el-input v-model="form.boxName" placeholder="请输入箱属" />
        </el-form-item>
        <el-form-item label="箱型" prop="boxType">
          <el-input v-model="form.boxType" placeholder="请输入箱型" />
        </el-form-item>
        <el-form-item label="皮重(kg)" prop="boxTare">
          <el-input v-model="form.boxTare" placeholder="请输入皮重(kg)" />
        </el-form-item>
        <el-form-item label="可载重量(kg)" prop="boxLoad">
          <el-input v-model="form.boxLoad" placeholder="请输入可载重量(kg)" />
        </el-form-item>
        <el-form-item label="集装箱数量" prop="boxCount">
          <el-input v-model="form.boxCount" placeholder="请输入集装箱数量" />
        </el-form-item>
        <el-form-item label="押金价格(￥)" prop="pledgePrice">
          <el-input v-model="form.pledgePrice" placeholder="请输入押金价格(￥)" />
        </el-form-item>
        <el-form-item label="长(mm)" prop="length">
          <el-input v-model="form.length" placeholder="请输入长(mm)" />
        </el-form-item>
        <el-form-item label="宽(mm)" prop="width">
          <el-input v-model="form.width" placeholder="请输入宽(mm)" />
        </el-form-item>
        <el-form-item label="高(mm)" prop="height">
          <el-input v-model="form.height" placeholder="请输入高(mm)" />
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
import { listContainer_attribute, getContainer_attribute, delContainer_attribute, addContainer_attribute, updateContainer_attribute } from "@/api/yard/container_attribute";

export default {
  name: "Container_attribute",
  data() {
    return {
	    showID: false,
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
      // 集装箱属性 表格数据
      container_attributeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        attrId: undefined,
        boxName: undefined,
        boxType: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        attrId: [
          { required: true, message: "No.ID不能为空", trigger: "blur" }
        ],
        boxName: [
          { required: true, message: "箱属不能为空", trigger: "blur" }
        ],
        boxType: [
          { required: true, message: "箱型不能为空", trigger: "blur" }
        ],
        boxTare: [
          { required: true, message: "皮重(kg)不能为空", trigger: "blur" }
        ],
        boxLoad: [
          { required: true, message: "可载重量(kg)不能为空", trigger: "blur" }
        ],
        boxCount: [
          { required: true, message: "集装箱数量不能为空", trigger: "blur" }
        ],
        pledgePrice: [
          { required: true, message: "押金价格(￥)不能为空", trigger: "blur" }
        ],
        length: [
          { required: true, message: "长(mm)不能为空", trigger: "blur" }
        ],
        width: [
          { required: true, message: "宽(mm)不能为空", trigger: "blur" }
        ],
        height: [
          { required: true, message: "高(mm)不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询集装箱属性 列表 */
    getList() {
      this.loading = true;
      listContainer_attribute(this.queryParams).then(response => {
        this.container_attributeList = response.rows;
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
        attrId: undefined,
        boxName: undefined,
        boxType: undefined,
        boxTare: undefined,
        boxLoad: undefined,
        boxCount: undefined,
        pledgePrice: undefined,
        length: undefined,
        width: undefined,
        height: undefined,
        remark: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加集装箱属性 ";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getContainer_attribute(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改集装箱属性 ";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateContainer_attribute(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addContainer_attribute(this.form).then(response => {
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
      this.$confirm('是否确认删除集装箱属性 编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delContainer_attribute(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yard/container_attribute/export', {
        ...this.queryParams
      }, `yard_container_attribute.xlsx`)
    }
  }
};
</script>
