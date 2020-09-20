<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="保税库" prop="deptId">
        <el-select
          v-model="queryParams.deptId"
          placeholder="请输入保税库ID"
          clearable
          size="small"
          @change="handleQuery">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>

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
      <el-table-column label="货物大类" align="center" prop="cargoCategory" :formatter="classFormat" />
      <el-table-column label="CPO&PO" align="center" prop="cpoPo" />
      <el-table-column label="快捷码" align="center" prop="shortcutCode" />
      <el-table-column label="货号" align="center" prop="articleNumber" />
      <el-table-column label="品名" align="center" prop="productName" />
      <el-table-column label="件数单位" align="center" prop="packagesUnit" :formatter="unitFormat"/>
      <el-table-column label="件数" align="center" prop="packages" />
      <el-table-column label="毛重(KGS)" align="center" prop="grossWeight" />
      <el-table-column label="唛头" align="center" prop="shippingMarks" />
      <el-table-column label="SRN号" align="center" prop="srnNo" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="Bag NO" align="center" prop="bagNo" />
      <el-table-column label="数量单位" align="center" prop="countUnit" :formatter="unitFormat"/>
      <el-table-column label="基准数量" align="center" prop="baseQuantity" />
      <el-table-column label="净重(KGS)" align="center" prop="netWeight" />
      <el-table-column label="皮重(KGS)" align="center" prop="tareWeight" />
      <el-table-column label="计费面积" align="center" prop="billingArea" />
      <el-table-column label="调度库位" align="center" prop="storeId" :formatter="storeFormat"/>
      <el-table-column label="仓管小组" align="center" prop="warehouseManagementTeam" />
      <el-table-column label="进报关单号" align="center" prop="customsDeclarationNo" />
      <el-table-column label="业务编号" align="center" prop="businessNo" />
      <el-table-column label="品质" align="center" prop="quality" />
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-document" @click="handleDtl(scope.row)">查看明细</el-button>
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
  </div>
</template>

<script>
import { listGoods, getGoods, delGoods, addGoods, updateGoods ,listStores} from "@/api/tax/goods";
import {getUserDepts} from '@/utils/charutils'

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
      // 库位表格数据
      storeList: [],
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
      // 装货物大类字典
      classOptions: [],
      // 单位字典
      unitOptions: [],
      // 库位
      storeOptions: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('1')
    if (this.depts.length > 0) {
      //默认选中第一个
      this.queryParams.deptId = this.depts[0].deptId;
      this.deptId = this.depts[0].deptId;
      this.getList()
    }
    //货品大类字典
    this.getDicts("tax_goods_class").then((response) => {
      this.classOptions = response.data;
    });
    //货品单位字典
    this.getDicts("tax_goods_unit").then((response) => {
      this.unitOptions = response.data;
    });
    //获取库位
    this.getStores();
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
    /** 查询库位 */
    getStores() {
      listStores().then((response) => {
        this.storeOptions = response.rows;
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

    /** 查看明细操作 */
    handleDtl(row) {
      const goodsId = row.goodsId;
      this.$router.push({
        path: "goodslst/",
        query: {goodsId: goodsId},
      });
    },

    //单位字典翻译
    unitFormat(row, column) {
      return this.selectDictLabel(this.unitOptions, row.countUnit);
    },

    //单位字典翻译
    dunitFormat(row, column) {
      return this.selectDictLabel(this.unitOptions, row.dispatchingUnit);
    },

    //货物大类字典翻译
    classFormat(row, column) {
      return this.selectDictLabel(this.classOptions, row.cargoCategory);
    },

    //库位翻译
    storeFormat(row, column) {
      var storeName='';
      this.storeOptions.some(function(v){
        if(v.storeId == row.storeId) {
          storeName=v.storeNo;
          return true;
        }
      });
      return storeName;
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
