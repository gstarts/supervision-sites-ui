<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="库位id" prop="storeId">
        <el-input
          v-model="queryParams.storeId"
          placeholder="请输入库位id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="商品ID" prop="goodsId">
        <el-input
          v-model="queryParams.goodsId"
          placeholder="请输入商品ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标识" prop="flag">
        <el-input
          v-model="queryParams.flag"
          placeholder="请输入标识"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入库数量" prop="inCount">
        <el-input
          v-model="queryParams.inCount"
          placeholder="请输入入库数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出库数量" prop="outCount">
        <el-input
          v-model="queryParams.outCount"
          placeholder="请输入出库数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发生时间" prop="hippenDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.hippenDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择发生时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="原单ID" prop="oldOrderId">
        <el-input
          v-model="queryParams.oldOrderId"
          placeholder="请输入原单ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原单类型" prop="oldOrderType">
        <el-select v-model="queryParams.oldOrderType" placeholder="请选择原单类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
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
          v-hasPermi="['tax:goodslst:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:goodslst:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:goodslst:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:goodslst:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="goodslstList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="明细ID" align="center" prop="goodsLstId" />
      <el-table-column label="库位id" align="center" prop="storeId" />
      <el-table-column label="库位编号" align="center" prop="storeNo" />
      <el-table-column label="商品ID" align="center" prop="goodsId" />
      <el-table-column label="标识" align="center" prop="flag" />
      <el-table-column label="入库数量" align="center" prop="inCount" />
      <el-table-column label="出库数量" align="center" prop="outCount" />
      <el-table-column label="发生时间" align="center" prop="hippenDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.hippenDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="原单ID" align="center" prop="oldOrderId" />
      <el-table-column label="原单类型" align="center" prop="oldOrderType" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:goodslst:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:goodslst:remove']"
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

    <!-- 添加或修改货品明细对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="库位id" prop="storeId">
          <el-input v-model="form.storeId" placeholder="请输入库位id" />
        </el-form-item>
        <el-form-item label="库位编号" prop="storeNo">
          <el-input v-model="form.storeNo" placeholder="请输入库位编号" />
        </el-form-item>
        <el-form-item label="商品ID" prop="goodsId">
          <el-input v-model="form.goodsId" placeholder="请输入商品ID" />
        </el-form-item>
        <el-form-item label="标识" prop="flag">
          <el-input v-model="form.flag" placeholder="请输入标识" />
        </el-form-item>
        <el-form-item label="入库数量" prop="inCount">
          <el-input v-model="form.inCount" placeholder="请输入入库数量" />
        </el-form-item>
        <el-form-item label="出库数量" prop="outCount">
          <el-input v-model="form.outCount" placeholder="请输入出库数量" />
        </el-form-item>
        <el-form-item label="发生时间" prop="hippenDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.hippenDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择发生时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="原单ID" prop="oldOrderId">
          <el-input v-model="form.oldOrderId" placeholder="请输入原单ID" />
        </el-form-item>
        <el-form-item label="原单类型">
          <el-select v-model="form.oldOrderType" placeholder="请选择原单类型">
            <el-option label="请选择字典生成" value="" />
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
import { listGoodslst, getGoodslst, delGoodslst, addGoodslst, updateGoodslst } from "@/api/tax/goodslst";

export default {
  name: "Goodslst",
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
      // 货品明细表格数据
      goodslstList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        storeId: undefined,
        storeNo: undefined,
        goodsId: undefined,
        flag: undefined,
        inCount: undefined,
        outCount: undefined,
        hippenDate: undefined,
        oldOrderId: undefined,
        oldOrderType: undefined
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
    /** 查询货品明细列表 */
    getList() {
      this.loading = true;
      listGoodslst(this.queryParams).then(response => {
        this.goodslstList = response.rows;
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
        goodsLstId: undefined,
        storeId: undefined,
        storeNo: undefined,
        goodsId: undefined,
        flag: undefined,
        inCount: undefined,
        outCount: undefined,
        hippenDate: undefined,
        oldOrderId: undefined,
        oldOrderType: undefined
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
      this.ids = selection.map(item => item.goodsLstId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加货品明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const goodsLstId = row.goodsLstId || this.ids
      getGoodslst(goodsLstId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改货品明细";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.goodsLstId != undefined) {
            updateGoodslst(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addGoodslst(this.form).then(response => {
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
      const goodsLstIds = row.goodsLstId || this.ids;
      this.$confirm('是否确认删除货品明细编号为"' + goodsLstIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delGoodslst(goodsLstIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/goodslst/export', {
        ...this.queryParams
      }, `tax_goodslst.xlsx`)
    }
  }
};
</script>