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
      <el-form-item label="车号" prop="vehicleNo">
        <el-input
          v-model="queryParams.vehicleNo"
          placeholder="请输入车号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车队" prop="vehicleTeam">
        <el-input
          v-model="queryParams.vehicleTeam"
          placeholder="请输入车队"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="司机" prop="driverName">
        <el-input
          v-model="queryParams.driverName"
          placeholder="请输入司机"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申报净重" prop="reportNetWeight">
        <el-input
          v-model="queryParams.reportNetWeight"
          placeholder="请输入申报净重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申报皮重" prop="reportTareWeight">
        <el-input
          v-model="queryParams.reportTareWeight"
          placeholder="请输入申报皮重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申报毛重" prop="reportRoughWeight">
        <el-input
          v-model="queryParams.reportRoughWeight"
          placeholder="请输入申报毛重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车型" prop="vehicleType">
        <el-select v-model="queryParams.vehicleType" placeholder="请选择车型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="箱数" prop="containerCount">
        <el-input
          v-model="queryParams.containerCount"
          placeholder="请输入箱数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="磅单净重" prop="poundNetWeight">
        <el-input
          v-model="queryParams.poundNetWeight"
          placeholder="请输入磅单净重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="磅单皮重" prop="poundTareWeight">
        <el-input
          v-model="queryParams.poundTareWeight"
          placeholder="请输入磅单皮重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="磅单毛重" prop="poundRoughWeight">
        <el-input
          v-model="queryParams.poundRoughWeight"
          placeholder="请输入磅单毛重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申报状态" prop="declareType">
        <el-select v-model="queryParams.declareType" placeholder="请选择申报状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="已申请重量" prop="applyVolumn">
        <el-input
          v-model="queryParams.applyVolumn"
          placeholder="请输入已申请重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="放行状态" prop="passState">
        <el-input
          v-model="queryParams.passState"
          placeholder="请输入放行状态"
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
          v-hasPermi="['place:passDocSub:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:passDocSub:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:passDocSub:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:passDocSub:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="passDocSubList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="放行单号" align="center" prop="passNo" />
      <el-table-column label="车号" align="center" prop="vehicleNo" />
      <el-table-column label="车队" align="center" prop="vehicleTeam" />
      <el-table-column label="司机" align="center" prop="driverName" />
      <el-table-column label="申报净重" align="center" prop="reportNetWeight" />
      <el-table-column label="申报皮重" align="center" prop="reportTareWeight" />
      <el-table-column label="申报毛重" align="center" prop="reportRoughWeight" />
      <el-table-column label="车型" align="center" prop="vehicleType" />
      <el-table-column label="箱数" align="center" prop="containerCount" />
      <el-table-column label="箱号" align="center" prop="containerNo" />
      <el-table-column label="磅单净重" align="center" prop="poundNetWeight" />
      <el-table-column label="磅单皮重" align="center" prop="poundTareWeight" />
      <el-table-column label="磅单毛重" align="center" prop="poundRoughWeight" />
      <el-table-column label="申报状态" align="center" prop="declareType" />
      <el-table-column label="已申请重量" align="center" prop="applyVolumn" />
      <el-table-column label="放行状态" align="center" prop="passState" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="乐观锁" align="center" prop="revision" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:passDocSub:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:passDocSub:remove']"
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

    <!-- 添加或修改放行单明细对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="放行单号" prop="passNo">
          <el-input v-model="form.passNo" placeholder="请输入放行单号" />
        </el-form-item>
        <el-form-item label="车号" prop="vehicleNo">
          <el-input v-model="form.vehicleNo" placeholder="请输入车号" />
        </el-form-item>
        <el-form-item label="车队" prop="vehicleTeam">
          <el-input v-model="form.vehicleTeam" placeholder="请输入车队" />
        </el-form-item>
        <el-form-item label="司机" prop="driverName">
          <el-input v-model="form.driverName" placeholder="请输入司机" />
        </el-form-item>
        <el-form-item label="申报净重" prop="reportNetWeight">
          <el-input v-model="form.reportNetWeight" placeholder="请输入申报净重" />
        </el-form-item>
        <el-form-item label="申报皮重" prop="reportTareWeight">
          <el-input v-model="form.reportTareWeight" placeholder="请输入申报皮重" />
        </el-form-item>
        <el-form-item label="申报毛重" prop="reportRoughWeight">
          <el-input v-model="form.reportRoughWeight" placeholder="请输入申报毛重" />
        </el-form-item>
        <el-form-item label="车型">
          <el-select v-model="form.vehicleType" placeholder="请选择车型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="箱数" prop="containerCount">
          <el-input v-model="form.containerCount" placeholder="请输入箱数" />
        </el-form-item>
        <el-form-item label="箱号" prop="containerNo">
          <el-input v-model="form.containerNo" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="磅单净重" prop="poundNetWeight">
          <el-input v-model="form.poundNetWeight" placeholder="请输入磅单净重" />
        </el-form-item>
        <el-form-item label="磅单皮重" prop="poundTareWeight">
          <el-input v-model="form.poundTareWeight" placeholder="请输入磅单皮重" />
        </el-form-item>
        <el-form-item label="磅单毛重" prop="poundRoughWeight">
          <el-input v-model="form.poundRoughWeight" placeholder="请输入磅单毛重" />
        </el-form-item>
        <el-form-item label="申报状态">
          <el-select v-model="form.declareType" placeholder="请选择申报状态">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="已申请重量" prop="applyVolumn">
          <el-input v-model="form.applyVolumn" placeholder="请输入已申请重量" />
        </el-form-item>
        <el-form-item label="放行状态" prop="passState">
          <el-input v-model="form.passState" placeholder="请输入放行状态" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人" prop="createBy">
          <el-input v-model="form.createBy" placeholder="请输入创建人" />
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
import { listPassDocSub, getPassDocSub, delPassDocSub, addPassDocSub, updatePassDocSub } from "@/api/place/passDocSub";

export default {
  name: "PassDocSub",
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
      // 放行单明细表格数据
      passDocSubList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        passNo: undefined,
        vehicleNo: undefined,
        vehicleTeam: undefined,
        driverName: undefined,
        reportNetWeight: undefined,
        reportTareWeight: undefined,
        reportRoughWeight: undefined,
        vehicleType: undefined,
        containerCount: undefined,
        containerNo: undefined,
        poundNetWeight: undefined,
        poundTareWeight: undefined,
        poundRoughWeight: undefined,
        declareType: undefined,
        applyVolumn: undefined,
        passState: undefined,
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
    /** 查询放行单明细列表 */
    getList() {
      this.loading = true;
      listPassDocSub(this.queryParams).then(response => {
        this.passDocSubList = response.rows;
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
        vehicleNo: undefined,
        vehicleTeam: undefined,
        driverName: undefined,
        reportNetWeight: undefined,
        reportTareWeight: undefined,
        reportRoughWeight: undefined,
        vehicleType: undefined,
        containerCount: undefined,
        containerNo: undefined,
        poundNetWeight: undefined,
        poundTareWeight: undefined,
        poundRoughWeight: undefined,
        declareType: undefined,
        applyVolumn: undefined,
        passState: undefined,
        createTime: undefined,
        createBy: undefined,
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
      this.title = "添加放行单明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPassDocSub(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改放行单明细";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updatePassDocSub(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addPassDocSub(this.form).then(response => {
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
      this.$confirm('是否确认删除放行单明细编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPassDocSub(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/passDocSub/export', {
        ...this.queryParams
      }, `place_passDocSub.xlsx`)
    }
  }
};
</script>