<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="放行单号" prop="passNo">
        <el-input
          v-model="queryParams.passNo"
          placeholder="请输入放行单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入库单号" prop="instoreDocNo">
        <el-input
          v-model="queryParams.instoreDocNo"
          placeholder="请输入入库单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批次号" prop="batchNo">
        <el-input
          v-model="queryParams.batchNo"
          placeholder="请输入批次号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提运单号" prop="loadingBillNo">
        <el-input
          v-model="queryParams.loadingBillNo"
          placeholder="请输入提运单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="重量" prop="weight">
        <el-input
          v-model="queryParams.weight"
          placeholder="请输入重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="剩余重量" prop="residueWeight">
        <el-input
          v-model="queryParams.residueWeight"
          placeholder="请输入剩余重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="包装方式(集装箱，散装)" prop="packMode">
        <el-input
          v-model="queryParams.packMode"
          placeholder="请输入包装方式(集装箱，散装)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集装箱号1" prop="containerNo1">
        <el-input
          v-model="queryParams.containerNo1"
          placeholder="请输入集装箱号1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集装箱号2" prop="containerNo2">
        <el-input
          v-model="queryParams.containerNo2"
          placeholder="请输入集装箱号2"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集装箱号3" prop="containerNo3">
        <el-input
          v-model="queryParams.containerNo3"
          placeholder="请输入集装箱号3"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集装箱号4" prop="containerNo4">
        <el-input
          v-model="queryParams.containerNo4"
          placeholder="请输入集装箱号4"
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
          v-hasPermi="['place:passInstoreRelation:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:passInstoreRelation:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:passInstoreRelation:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:passInstoreRelation:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="passInstoreRelationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="放行单号" align="center" prop="passNo" />
      <el-table-column label="入库单号" align="center" prop="instoreDocNo" />
      <el-table-column label="批次号" align="center" prop="batchNo" />
      <el-table-column label="提运单号" align="center" prop="loadingBillNo" />
      <el-table-column label="重量" align="center" prop="weight" />
      <el-table-column label="剩余重量" align="center" prop="residueWeight" />
      <el-table-column label="包装方式(集装箱，散装)" align="center" prop="packMode" />
      <el-table-column label="集装箱号1" align="center" prop="containerNo1" />
      <el-table-column label="集装箱号2" align="center" prop="containerNo2" />
      <el-table-column label="集装箱号3" align="center" prop="containerNo3" />
      <el-table-column label="集装箱号4" align="center" prop="containerNo4" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="乐观锁" align="center" prop="revision" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:passInstoreRelation:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:passInstoreRelation:remove']"
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

    <!-- 添加或修改放行单与入库单关系 对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="放行单号" prop="passNo">
          <el-input v-model="form.passNo" placeholder="请输入放行单号" />
        </el-form-item>
        <el-form-item label="入库单号" prop="instoreDocNo">
          <el-input v-model="form.instoreDocNo" placeholder="请输入入库单号" />
        </el-form-item>
        <el-form-item label="批次号" prop="batchNo">
          <el-input v-model="form.batchNo" placeholder="请输入批次号" />
        </el-form-item>
        <el-form-item label="提运单号" prop="loadingBillNo">
          <el-input v-model="form.loadingBillNo" placeholder="请输入提运单号" />
        </el-form-item>
        <el-form-item label="重量" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入重量" />
        </el-form-item>
        <el-form-item label="剩余重量" prop="residueWeight">
          <el-input v-model="form.residueWeight" placeholder="请输入剩余重量" />
        </el-form-item>
        <el-form-item label="包装方式(集装箱，散装)" prop="packMode">
          <el-input v-model="form.packMode" placeholder="请输入包装方式(集装箱，散装)" />
        </el-form-item>
        <el-form-item label="集装箱号1" prop="containerNo1">
          <el-input v-model="form.containerNo1" placeholder="请输入集装箱号1" />
        </el-form-item>
        <el-form-item label="集装箱号2" prop="containerNo2">
          <el-input v-model="form.containerNo2" placeholder="请输入集装箱号2" />
        </el-form-item>
        <el-form-item label="集装箱号3" prop="containerNo3">
          <el-input v-model="form.containerNo3" placeholder="请输入集装箱号3" />
        </el-form-item>
        <el-form-item label="集装箱号4" prop="containerNo4">
          <el-input v-model="form.containerNo4" placeholder="请输入集装箱号4" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listPassInstoreRelation, getPassInstoreRelation, delPassInstoreRelation, addPassInstoreRelation, updatePassInstoreRelation } from "@/api/place/passInstoreRelation";

export default {
  name: "PassInstoreRelation",
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
      // 放行单与入库单关系 表格数据
      passInstoreRelationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        passNo: undefined,
        instoreDocNo: undefined,
        batchNo: undefined,
        loadingBillNo: undefined,
        weight: undefined,
        residueWeight: undefined,
        packMode: undefined,
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
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
    /** 查询放行单与入库单关系 列表 */
    getList() {
      this.loading = true;
      listPassInstoreRelation(this.queryParams).then(response => {
        this.passInstoreRelationList = response.rows;
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
        passNo: undefined,
        instoreDocNo: undefined,
        batchNo: undefined,
        loadingBillNo: undefined,
        weight: undefined,
        residueWeight: undefined,
        packMode: undefined,
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
        remark: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
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
      this.title = "添加放行单与入库单关系 ";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPassInstoreRelation(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改放行单与入库单关系 ";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updatePassInstoreRelation(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addPassInstoreRelation(this.form).then(response => {
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
      this.$confirm('是否确认删除放行单与入库单关系 编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPassInstoreRelation(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/passInstoreRelation/export', {
        ...this.queryParams
      }, `place_passInstoreRelation.xlsx`)
    }
  }
};
</script>