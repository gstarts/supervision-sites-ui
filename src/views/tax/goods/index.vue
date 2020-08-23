<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      
      
      <el-form-item label="唛头" prop="shippingMarks">
        <el-input
          v-model="queryParams.shippingMarks"
          placeholder="请输入唛头"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="SRN号" prop="srnNo">
        <el-input
          v-model="queryParams.srnNo"
          placeholder="请输入SRN号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批次" prop="batch">
        <el-input
          v-model="queryParams.batch"
          placeholder="请输入批次"
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
          v-hasPermi="['tax:goods:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:goods:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:goods:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:goods:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="goodsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="商品ID" align="center" prop="goodsId" />
      <el-table-column label="入库细单id" align="center" prop="inDtlId" />
      <el-table-column label="货物大类" align="center" prop="cargoCategory" />
      <el-table-column label="CPO&PO" align="center" prop="cpoPo" />
      <el-table-column label="快捷码" align="center" prop="shortcutCode" />
      <el-table-column label="货号" align="center" prop="articleNumber" />
      <el-table-column label="品名" align="center" prop="productName" />
      <el-table-column label="件数单位" align="center" prop="packagesUnit" />
      <el-table-column label="件数" align="center" prop="packages" />
      <el-table-column label="毛重(KGS)" align="center" prop="grossWeight" />
      <el-table-column label="唛头" align="center" prop="shippingMarks" />
      <el-table-column label="SRN号" align="center" prop="srnNo" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="Bag NO" align="center" prop="bagNo" />
      <el-table-column label="数量单位" align="center" prop="countUnit" />
      <el-table-column label="基准数量" align="center" prop="baseQuantity" />
      <el-table-column label="净重(KGS)" align="center" prop="netWeight" />
      <el-table-column label="皮重(KGS)" align="center" prop="tareWeight" />
      <el-table-column label="计费面积" align="center" prop="billingArea" />
      <el-table-column label="调度单位" align="center" prop="dispatchingUnit" />
      <el-table-column label="仓管小组" align="center" prop="warehouseManagementTeam" />
      <el-table-column label="进报关单号" align="center" prop="customsDeclarationNo" />
      <el-table-column label="业务编号" align="center" prop="businessNo" />
      <el-table-column label="品质" align="center" prop="quality" />
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:goods:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:goods:remove']"
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

    <!-- 添加或修改货品对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="入库细单id" prop="inDtlId">
          <el-input v-model="form.inDtlId" placeholder="请输入入库细单id" />
        </el-form-item>
        <el-form-item label="货物大类" prop="cargoCategory">
          <el-input v-model="form.cargoCategory" placeholder="请输入货物大类" />
        </el-form-item>
        <el-form-item label="CPO&PO" prop="cpoPo">
          <el-input v-model="form.cpoPo" placeholder="请输入CPO&PO" />
        </el-form-item>
        <el-form-item label="快捷码" prop="shortcutCode">
          <el-input v-model="form.shortcutCode" placeholder="请输入快捷码" />
        </el-form-item>
        <el-form-item label="货号" prop="articleNumber">
          <el-input v-model="form.articleNumber" placeholder="请输入货号" />
        </el-form-item>
        <el-form-item label="品名" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入品名" />
        </el-form-item>
        <el-form-item label="件数单位" prop="packagesUnit">
          <el-input v-model="form.packagesUnit" placeholder="请输入件数单位" />
        </el-form-item>
        <el-form-item label="件数" prop="packages">
          <el-input v-model="form.packages" placeholder="请输入件数" />
        </el-form-item>
        <el-form-item label="毛重(KGS)" prop="grossWeight">
          <el-input v-model="form.grossWeight" placeholder="请输入毛重(KGS)" />
        </el-form-item>
        <el-form-item label="唛头" prop="shippingMarks">
          <el-input v-model="form.shippingMarks" placeholder="请输入唛头" />
        </el-form-item>
        <el-form-item label="SRN号" prop="srnNo">
          <el-input v-model="form.srnNo" placeholder="请输入SRN号" />
        </el-form-item>
        <el-form-item label="批次" prop="batch">
          <el-input v-model="form.batch" placeholder="请输入批次" />
        </el-form-item>
        <el-form-item label="Bag NO" prop="bagNo">
          <el-input v-model="form.bagNo" placeholder="请输入Bag NO" />
        </el-form-item>
        <el-form-item label="数量单位" prop="countUnit">
          <el-input v-model="form.countUnit" placeholder="请输入数量单位" />
        </el-form-item>
        <el-form-item label="基准数量" prop="baseQuantity">
          <el-input v-model="form.baseQuantity" placeholder="请输入基准数量" />
        </el-form-item>
        <el-form-item label="净重(KGS)" prop="netWeight">
          <el-input v-model="form.netWeight" placeholder="请输入净重(KGS)" />
        </el-form-item>
        <el-form-item label="皮重(KGS)" prop="tareWeight">
          <el-input v-model="form.tareWeight" placeholder="请输入皮重(KGS)" />
        </el-form-item>
        <el-form-item label="计费面积" prop="billingArea">
          <el-input v-model="form.billingArea" placeholder="请输入计费面积" />
        </el-form-item>
        <el-form-item label="调度单位" prop="dispatchingUnit">
          <el-input v-model="form.dispatchingUnit" placeholder="请输入调度单位" />
        </el-form-item>
        <el-form-item label="仓管小组" prop="warehouseManagementTeam">
          <el-input v-model="form.warehouseManagementTeam" placeholder="请输入仓管小组" />
        </el-form-item>
        <el-form-item label="进报关单号" prop="customsDeclarationNo">
          <el-input v-model="form.customsDeclarationNo" placeholder="请输入进报关单号" />
        </el-form-item>
        <el-form-item label="业务编号" prop="businessNo">
          <el-input v-model="form.businessNo" placeholder="请输入业务编号" />
        </el-form-item>
        <el-form-item label="品质" prop="quality">
          <el-input v-model="form.quality" placeholder="请输入品质" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注" />
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
import { listGoods, getGoods, delGoods, addGoods, updateGoods } from "@/api/tax/goods";

export default {
  name: "Goods",
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
      // 货品表格数据
      goodsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        inDtlId: undefined,
        cargoCategory: undefined,
        cpoPo: undefined,
        shortcutCode: undefined,
        articleNumber: undefined,
        productName: undefined,
        packagesUnit: undefined,
        packages: undefined,
        grossWeight: undefined,
        shippingMarks: undefined,
        srnNo: undefined,
        batch: undefined,
        bagNo: undefined,
        countUnit: undefined,
        baseQuantity: undefined,
        netWeight: undefined,
        tareWeight: undefined,
        billingArea: undefined,
        dispatchingUnit: undefined,
        warehouseManagementTeam: undefined,
        customsDeclarationNo: undefined,
        businessNo: undefined,
        quality: undefined,
        remarks: undefined
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
    /** 查询货品列表 */
    getList() {
      this.loading = true;
      listGoods(this.queryParams).then(response => {
        this.goodsList = response.rows;
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
        goodsId: undefined,
        inDtlId: undefined,
        cargoCategory: undefined,
        cpoPo: undefined,
        shortcutCode: undefined,
        articleNumber: undefined,
        productName: undefined,
        packagesUnit: undefined,
        packages: undefined,
        grossWeight: undefined,
        shippingMarks: undefined,
        srnNo: undefined,
        batch: undefined,
        bagNo: undefined,
        countUnit: undefined,
        baseQuantity: undefined,
        netWeight: undefined,
        tareWeight: undefined,
        billingArea: undefined,
        dispatchingUnit: undefined,
        warehouseManagementTeam: undefined,
        customsDeclarationNo: undefined,
        businessNo: undefined,
        quality: undefined,
        remarks: undefined
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
      this.ids = selection.map(item => item.goodsId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加货品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const goodsId = row.goodsId || this.ids
      getGoods(goodsId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改货品";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.goodsId != undefined) {
            updateGoods(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addGoods(this.form).then(response => {
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
      const goodsIds = row.goodsId || this.ids;
      this.$confirm('是否确认删除货品编号为"' + goodsIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delGoods(goodsIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/goods/export', {
        ...this.queryParams
      }, `tax_goods.xlsx`)
    }
  }
};
</script>