<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="75px">
      <el-form-item label="申请单编号" prop="applicationNumber" label-width=“50px”>
        <el-input
          v-model="queryParams.applicationNumber"
          placeholder="请输入申请单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="加油日期" prop="refuelingDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.refuelingDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择加油日期">
        </el-date-picker>
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
          v-hasPermi="['tax:fuel:add']"
        >新增</el-button>
      </el-col>
<!--      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:fuel:edit']"
        >修改</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:fuel:remove']"
        >删除</el-button>
      </el-col>
<!--      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:fuel:export']"
        >导出</el-button>
      </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="fuelList" @selection-change="handleSelectionChange" :border="true" >
      <el-table-column type="selection" width="55" align="center" />
      <!--<el-table-column label="ID" align="center" prop="id" />-->
      <el-table-column label="申请单编号" align="center" prop="applicationNumber" />
      <el-table-column label="加油站加油员" align="center" prop="gasStation" />
      <el-table-column label="公司加油人" align="center" prop="companyCheer" />
      <el-table-column label="证明人" align="center" prop="witness" />
      <el-table-column label="负责人" align="center" prop="principal" />
      <el-table-column label="加油日期" align="center" prop="refuelingDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.refuelingDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="加油量合计(公升)" align="center" prop="totalRefuelingAmount" />
      <el-table-column label="单价" align="center" prop="unitPrice" />
      <el-table-column label="总价" align="center" prop="totalPrice" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:fuel:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="handleDetail(scope.row)"
            v-hasPermi="['tax:fuel:remove']"
          >详情</el-button>
<!--          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:fuel:remove']"
          >删除</el-button>-->
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

    <!-- 添加或修改加油费管理主对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="申请单编号" prop="applicationNumber">
          <el-input v-model="form.applicationNumber" placeholder="请输入申请单编号" />
        </el-form-item>
        <el-form-item label="加油站加油员" prop="gasStation">
          <el-input v-model="form.gasStation" placeholder="请输入加油站加油员" />
        </el-form-item>
        <el-form-item label="公司加油人" prop="companyCheer">
          <el-input v-model="form.companyCheer" placeholder="请输入公司加油人" />
        </el-form-item>
        <el-form-item label="证明人" prop="witness">
          <el-input v-model="form.witness" placeholder="请输入证明人" />
        </el-form-item>
        <el-form-item label="负责人" prop="principal">
          <el-input v-model="form.principal" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="加油日期" prop="refuelingDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.refuelingDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择加油日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="加油量合计(公升)" prop="totalRefuelingAmount">
          <el-input v-model="form.totalRefuelingAmount" placeholder="请输入加油量合计(公升)" />
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="form.unitPrice" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="总价" prop="totalPrice">
          <el-input v-model="form.totalPrice" placeholder="请输入总价" />
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
import { listFuel, getFuel, delFuel, addFuel, updateFuel } from "@/api/tax/fuel";

export default {
  name: "Fuel",
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
      // 加油费管理主表格数据
      fuelList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        applicationNumber: undefined,
        gasStation: undefined,
        companyCheer: undefined,
        witness: undefined,
        principal: undefined,
        refuelingDate: undefined,
        totalRefuelingAmount: undefined,
        unitPrice: undefined,
        totalPrice: undefined,
        remark: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        applicationNumber: [
          { required: true, message: "申请单编号不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询加油费管理主列表 */
    getList() {
      this.loading = true;
      listFuel(this.queryParams).then(response => {
        this.fuelList = response.rows;
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
        applicationNumber: undefined,
        gasStation: undefined,
        companyCheer: undefined,
        witness: undefined,
        principal: undefined,
        refuelingDate: undefined,
        totalRefuelingAmount: undefined,
        unitPrice: undefined,
        totalPrice: undefined,
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
      this.title = "添加加油费管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      this.$router.push({path: '/tax/fuelchild', query: {id: id}})
      this.title = "修改";
      /*getFuel(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改加油费管理";
      });*/
    },

    // 详情页跳转
    handleDetail(row) {
      const id = row.id || this.ids
      // const data = this.router.find(el => el.messageType === row.messageType)
      // 调用 某页面 的初始化方法
      this.$router.push({path: '/tax/fuelchild', query: {id: id,flag:true}})
    },

    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateFuel(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addFuel(this.form).then(response => {
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
      this.$confirm('是否确认删除加油费管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFuel(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/fuel/export', {
        ...this.queryParams
      }, `tax_fuel.xlsx`)
    }
  }
};
</script>
