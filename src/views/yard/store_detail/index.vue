<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="堆场ID" prop="yardId">
        <el-input
          v-model="queryParams.yardId"
          placeholder="请输入堆场ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域ID" prop="zoneId">
        <el-input
          v-model="queryParams.zoneId"
          placeholder="请输入区域ID"
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
      <el-form-item label="库位号" prop="sotreCode">
        <el-input
          v-model="queryParams.sotreCode"
          placeholder="请输入库位号"
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
      <el-form-item label="货物名称" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入货物名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货物种类" prop="goodsType">
        <el-input
          v-model="queryParams.goodsType"
          placeholder="请输入货物种类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="件数单位" prop="countUnit">
        <el-select v-model="queryParams.countUnit" placeholder="请选择件数单位" clearable size="small">
          <el-option
            v-for="dict in countUnitOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="毛重(KG)" prop="roughWight">
        <el-input
          v-model="queryParams.roughWight"
          placeholder="请输入毛重(KG)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="净重(KG)" prop="netWight">
        <el-input
          v-model="queryParams.netWight"
          placeholder="请输入净重(KG)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货物标识码" prop="goodsIdentificationCode">
        <el-input
          v-model="queryParams.goodsIdentificationCode"
          placeholder="请输入货物标识码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数量单位" prop="numUnit">
        <el-select v-model="queryParams.numUnit" placeholder="请选择数量单位" clearable size="small">
          <el-option
            v-for="dict in numUnitOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="报关单号" prop="declarationNo">
        <el-input
          v-model="queryParams.declarationNo"
          placeholder="请输入报关单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务编号" prop="businessNo">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入业务编号"
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
          v-hasPermi="['yard:store_detail:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['yard:store_detail:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['yard:store_detail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:store_detail:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="store_detailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="堆场ID" align="center" prop="yardId" />
      <el-table-column label="区域ID" align="center" prop="zoneId" />
      <el-table-column label="区域编号" align="center" prop="zoneCode" />
      <el-table-column label="库位号" align="center" prop="sotreCode" />
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo" />
      <el-table-column label="货物名称" align="center" prop="goodsName" />
      <el-table-column label="货物种类" align="center" prop="goodsType" />
      <el-table-column label="件数单位" align="center" prop="countUnit" :formatter="countUnitFormat" />
      <el-table-column label="毛重(KG)" align="center" prop="roughWight" />
      <el-table-column label="净重(KG)" align="center" prop="netWight" />
      <el-table-column label="货物标识码" align="center" prop="goodsIdentificationCode" />
      <el-table-column label="数量单位" align="center" prop="numUnit" :formatter="numUnitFormat" />
      <el-table-column label="报关单号" align="center" prop="declarationNo" />
      <el-table-column label="业务编号" align="center" prop="businessNo" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="更新人" align="center" prop="updateBy" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
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
            v-hasPermi="['yard:store_detail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yard:store_detail:remove']"
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

    <!-- 添加或修改堆场库存明细 对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="堆场ID" prop="yardId">
          <el-input v-model="form.yardId" placeholder="请输入堆场ID" />
        </el-form-item>
        <el-form-item label="区域ID" prop="zoneId">
          <el-input v-model="form.zoneId" placeholder="请输入区域ID" />
        </el-form-item>
        <el-form-item label="区域编号" prop="zoneCode">
          <el-input v-model="form.zoneCode" placeholder="请输入区域编号" />
        </el-form-item>
        <el-form-item label="库位号" prop="sotreCode">
          <el-input v-model="form.sotreCode" placeholder="请输入库位号" />
        </el-form-item>
        <el-form-item label="货物批次号" prop="goodsBatchNo">
          <el-input v-model="form.goodsBatchNo" placeholder="请输入货物批次号" />
        </el-form-item>
        <el-form-item label="货物名称" prop="goodsName">
          <el-input v-model="form.goodsName" placeholder="请输入货物名称" />
        </el-form-item>
        <el-form-item label="货物种类" prop="goodsType">
          <el-input v-model="form.goodsType" placeholder="请输入货物种类" />
        </el-form-item>
        <el-form-item label="件数单位">
          <el-select v-model="form.countUnit" placeholder="请选择件数单位">
            <el-option
              v-for="dict in countUnitOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毛重(KG)" prop="roughWight">
          <el-input v-model="form.roughWight" placeholder="请输入毛重(KG)" />
        </el-form-item>
        <el-form-item label="净重(KG)" prop="netWight">
          <el-input v-model="form.netWight" placeholder="请输入净重(KG)" />
        </el-form-item>
        <el-form-item label="货物标识码" prop="goodsIdentificationCode">
          <el-input v-model="form.goodsIdentificationCode" placeholder="请输入货物标识码" />
        </el-form-item>
        <el-form-item label="数量单位">
          <el-select v-model="form.numUnit" placeholder="请选择数量单位">
            <el-option
              v-for="dict in numUnitOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报关单号" prop="declarationNo">
          <el-input v-model="form.declarationNo" placeholder="请输入报关单号" />
        </el-form-item>
        <el-form-item label="业务编号" prop="businessNo">
          <el-input v-model="form.businessNo" placeholder="请输入业务编号" />
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
import { listStore_detail, getStore_detail, delStore_detail, addStore_detail, updateStore_detail } from "@/api/yard/store_detail";

export default {
  name: "Store_detail",
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
      // 堆场库存明细 表格数据
      store_detailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 件数单位字典
      countUnitOptions: [],
      // 数量单位字典
      numUnitOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        yardId: undefined,
        zoneId: undefined,
        zoneCode: undefined,
        sotreCode: undefined,
        goodsBatchNo: undefined,
        goodsName: undefined,
        goodsType: undefined,
        countUnit: undefined,
        roughWight: undefined,
        netWight: undefined,
        goodsIdentificationCode: undefined,
        numUnit: undefined,
        declarationNo: undefined,
        businessNo: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        yardId: [
          { required: true, message: "堆场ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("hg_measuring_unit").then(response => {
      this.countUnitOptions = response.data;
    });
    this.getDicts("hg_measuring_unit").then(response => {
      this.numUnitOptions = response.data;
    });
  },
  methods: {
    /** 查询堆场库存明细 列表 */
    getList() {
      this.loading = true;
      listStore_detail(this.queryParams).then(response => {
        this.store_detailList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 件数单位字典翻译
    countUnitFormat(row, column) {
      return this.selectDictLabel(this.countUnitOptions, row.countUnit);
    },
    // 数量单位字典翻译
    numUnitFormat(row, column) {
      return this.selectDictLabel(this.numUnitOptions, row.numUnit);
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
        zoneId: undefined,
        zoneCode: undefined,
        sotreCode: undefined,
        goodsBatchNo: undefined,
        goodsName: undefined,
        goodsType: undefined,
        countUnit: undefined,
        roughWight: undefined,
        netWight: undefined,
        goodsIdentificationCode: undefined,
        numUnit: undefined,
        declarationNo: undefined,
        businessNo: undefined,
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
      this.title = "添加堆场库存明细 ";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStore_detail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改堆场库存明细 ";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateStore_detail(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addStore_detail(this.form).then(response => {
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
      this.$confirm('是否确认删除堆场库存明细 编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStore_detail(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yard/store_detail/export', {
        ...this.queryParams
      }, `yard_store_detail.xlsx`)
    }
  }
};
</script>