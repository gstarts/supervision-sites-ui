<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="堆场编号" prop="yardId">
        <el-input
          v-model="queryParams.yardId"
          placeholder="请输入堆场编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域编号" prop="zoneCode">
        <el-input
          v-model="queryParams.zoneCode"
          placeholder="请输入区域编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位编号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位状态" prop="storeStatus">
        <el-select v-model="queryParams.storeStatus" placeholder="请选择库位状态" clearable size="small">
          <el-option
            v-for="dict in storeStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="库位类型" prop="storeType">
        <el-select v-model="queryParams.storeType" placeholder="请选择库位类型" clearable size="small">
          <el-option
            v-for="dict in storeTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="箱号" prop="containerNo">
        <el-input
          v-model="queryParams.containerNo"
          placeholder="请输入箱号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货物批次号" prop="goodsBatchNo">
        <el-input
          v-model="queryParams.goodsBatchNo"
          placeholder="请输入货物批次号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入/出库单" prop="ioBillNo">
        <el-input
          v-model="queryParams.ioBillNo"
          placeholder="请输入入/出库单"
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
          v-hasPermi="['yard:history:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['yard:history:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['yard:history:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:history:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="historyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="堆场编号" align="center" prop="yardId" />
      <el-table-column label="区域编号" align="center" prop="zoneCode" />
      <el-table-column label="库位编号" align="center" prop="storeCode" />
      <el-table-column label="库位状态" align="center" prop="storeStatus" :formatter="storeStatusFormat" />
      <el-table-column label="库位类型" align="center" prop="storeType" :formatter="storeTypeFormat" />
      <el-table-column label="箱号" align="center" prop="containerNo" />
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo" />
      <el-table-column label="入/出库单" align="center" prop="ioBillNo" />
      <el-table-column label="记录时间" align="center" prop="recordTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.recordTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="修改人" align="center" prop="updateBy" />
      <el-table-column label="修改时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yard:history:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yard:history:remove']"
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

    <!-- 添加或修改库存历史记录 对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="堆场编号" prop="yardId">
          <el-input v-model="form.yardId" placeholder="请输入堆场编号" />
        </el-form-item>
        <el-form-item label="区域编号" prop="zoneCode">
          <el-input v-model="form.zoneCode" placeholder="请输入区域编号" />
        </el-form-item>
        <el-form-item label="库位编号" prop="storeCode">
          <el-input v-model="form.storeCode" placeholder="请输入库位编号" />
        </el-form-item>
        <el-form-item label="库位状态">
          <el-select v-model="form.storeStatus" placeholder="请选择库位状态">
            <el-option
              v-for="dict in storeStatusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位类型">
          <el-select v-model="form.storeType" placeholder="请选择库位类型">
            <el-option
              v-for="dict in storeTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="箱号" prop="containerNo">
          <el-input v-model="form.containerNo" placeholder="请输入箱号" />
        </el-form-item>
        <el-form-item label="货物批次号" prop="goodsBatchNo">
          <el-input v-model="form.goodsBatchNo" placeholder="请输入货物批次号" />
        </el-form-item>
        <el-form-item label="入/出库单" prop="ioBillNo">
          <el-input v-model="form.ioBillNo" placeholder="请输入入/出库单" />
        </el-form-item>
        <el-form-item label="记录时间" prop="recordTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.recordTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择记录时间">
          </el-date-picker>
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
import { listHistory, getHistory, delHistory, addHistory, updateHistory } from "@/api/yard/history";

export default {
  name: "History",
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
      // 库存历史记录 表格数据
      historyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 库位状态字典
      storeStatusOptions: [],
      // 库位类型字典
      storeTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        yardId: undefined,
        zoneCode: undefined,
        storeCode: undefined,
        storeStatus: undefined,
        storeType: undefined,
        containerNo: undefined,
        goodsBatchNo: undefined,
        ioBillNo: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        yardId: [
          { required: true, message: "堆场编号不能为空", trigger: "blur" }
        ],
        zoneCode: [
          { required: true, message: "区域编号不能为空", trigger: "blur" }
        ],
        storeCode: [
          { required: true, message: "库位编号不能为空", trigger: "blur" }
        ],
        storeStatus: [
          { required: true, message: "库位状态不能为空", trigger: "blur" }
        ],
        storeType: [
          { required: true, message: "库位类型不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("yard_store_state").then(response => {
      this.storeStatusOptions = response.data;
    });
    this.getDicts("yard_store_type").then(response => {
      this.storeTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询库存历史记录 列表 */
    getList() {
      this.loading = true;
      listHistory(this.queryParams).then(response => {
        this.historyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 库位状态字典翻译
    storeStatusFormat(row, column) {
      return this.selectDictLabel(this.storeStatusOptions, row.storeStatus);
    },
    // 库位类型字典翻译
    storeTypeFormat(row, column) {
      return this.selectDictLabel(this.storeTypeOptions, row.storeType);
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
        yardId: undefined,
        zoneCode: undefined,
        storeCode: undefined,
        storeStatus: undefined,
        storeType: undefined,
        containerNo: undefined,
        goodsBatchNo: undefined,
        ioBillNo: undefined,
        recordTime: undefined,
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
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加库存历史记录 ";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHistory(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改库存历史记录 ";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateHistory(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addHistory(this.form).then(response => {
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
      this.$confirm('是否确认删除库存历史记录 编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delHistory(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yard/history/export', {
        ...this.queryParams
      }, `yard_history.xlsx`)
    }
  }
};
</script>