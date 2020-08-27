<template>
  <div class="app-container">
    <!-- 添加或修改入库通知单明细管理对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open"  append-to-body> -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
      v-if="inNoticeDocStutus!==1 && inNoticeDocStutus!=='1'"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item label="货物大类" prop="cargoCategory">
            <el-select v-model="form.cargoCategory">
              <el-option
                v-for="dict in classOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="CPO&PO" prop="cpoPo">
            <el-input v-model="form.cpoPo" placeholder="请输入CPO&PO" />
          </el-form-item>
        </el-col>
        <el-col :span="4" width="50px">
          <el-form-item label="快捷码" prop="shortcutCode">
            <el-input v-model="form.shortcutCode" placeholder="请输入快捷码" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="货号" prop="articleNumber">
            <el-input v-model="form.articleNumber" placeholder="请输入货号" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="品名" prop="productName">
            <el-input v-model="form.productName" placeholder="请输入品名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="件数单位" prop="packagesUnit">
            <el-select v-model="form.packagesUnit">
              <el-option
                v-for="dict in unitOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="件数" prop="packages">
            <el-input v-model="form.packages" placeholder="请输入件数" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="毛重(KGS)" prop="grossWeight">
            <el-input
              v-model="form.grossWeight"
              placeholder="请输入毛重(KGS)，只能输入数字"
              oninput="value=value.replace(/[^\d.]/g,'')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="唛头" prop="shippingMarks">
            <el-input v-model="form.shippingMarks" placeholder="请输入唛头" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="SRN号" prop="srnNo">
            <el-input v-model="form.srnNo" placeholder="请输入SRN号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="批次" prop="batch">
            <el-input v-model="form.batch" placeholder="请输入批次" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="Bag NO" prop="bagNo">
            <el-input v-model="form.bagNo" placeholder="请输入Bag NO" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="数量单位" prop="countUnit">
            <el-select v-model="form.countUnit">
              <el-option
                v-for="dict in unitOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="基准数量" prop="baseQuantity">
            <el-input
              v-model="form.baseQuantity"
              placeholder="请输入基准数量，只能输入数字"
              oninput="value=value.replace(/[^\d.]/g,'')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="净重(KGS)" prop="netWeight">
            <el-input
              v-model="form.netWeight"
              placeholder="请输入净重(KGS)，只能输入数字"
              oninput="value=value.replace(/[^\d.]/g,'')"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="皮重(KGS)" prop="tareWeight">
            <el-input
              v-model="form.tareWeight"
              placeholder="请输入皮重(KGS)，只能输入数字"
              oninput="value=value.replace(/[^\d.]/g,'')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="计费面积" prop="billingArea">
            <el-input
              v-model="form.billingArea"
              placeholder="请输入计费面积，只能输入数字"
              oninput="value=value.replace(/[^\d.]/g,'')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="调度库位" prop="storeId">
            <el-select v-model="form.storeId">
              <el-option
                v-for="dict in storeOptions"
                :key="dict.storeId"
                :label="dict.storeNo"
                :value="dict.storeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="仓管小组" prop="warehouseManagementTeam">
            <el-input v-model="form.warehouseManagementTeam" placeholder="请输入仓管小组" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="进报关单号" prop="customsDeclarationNo">
            <el-input v-model="form.customsDeclarationNo" placeholder="请输入进报关单号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="业务编号" prop="businessNo">
            <el-input v-model="form.businessNo" placeholder="请输入业务编号" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="品质" prop="quality">
            <el-input v-model="form.quality" placeholder="请输入品质" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </el-col>
      </el-row>
    </el-form>

    <br />
    <!-- </el-dialog> -->

    <el-table
      v-loading="loading"
      :data="tax_innoticedtlList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="入库通知单号" align="center" prop="inNoticeDocNo" />
      <el-table-column label="生成日期" align="center" prop="generateDate" width="180" />
      <el-table-column label="货物大类" align="center" prop="cargoCategory" :formatter="classFormat" />
      <el-table-column label="CPO&PO" align="center" prop="cpoPo" />
      <el-table-column label="快捷码" align="center" prop="shortcutCode" />
      <el-table-column label="货号" align="center" prop="articleNumber" />
      <el-table-column label="品名" align="center" prop="productName" />
      <el-table-column label="件数单位" align="center" prop="packagesUnit" :formatter="unitFormat" />
      <el-table-column label="件数" align="center" prop="packages" />
      <el-table-column label="毛重(KGS)" align="center" prop="grossWeight" />
      <el-table-column label="唛头" align="center" prop="shippingMarks" />
      <el-table-column label="SRN号" align="center" prop="srnNo" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="Bag NO" align="center" prop="bagNo" />
      <el-table-column label="数量单位" align="center" prop="countUnit" :formatter="unitFormat" />
      <el-table-column label="基准数量" align="center" prop="baseQuantity" />
      <el-table-column label="净重(KGS)" align="center" prop="netWeight" />
      <el-table-column label="皮重(KGS)" align="center" prop="tareWeight" />
      <el-table-column label="计费面积" align="center" prop="billingArea" />
      <el-table-column label="调度库位" align="center" prop="storeId" :formatter="storeFormat" />
      <el-table-column label="仓管小组" align="center" prop="warehouseManagementTeam" />
      <el-table-column label="进报关单号" align="center" prop="customsDeclarationNo" />
      <el-table-column label="业务编号" align="center" prop="businessNo" />
      <el-table-column label="品质" align="center" prop="quality" />
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column
        v-if="inNoticeDocStutus!==1 && inNoticeDocStutus!=='1'"
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:tax_innoticedtl:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:tax_innoticedtl:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getDtlData"
    />

    <!-- 添加或修改入库通知单明细管理对话框 -->
    <el-dialog :title="updatetitle" :visible.sync="updateopen" append-to-body>
      <el-form ref="updateform" :model="updateform" :rules="updaterules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="货物大类" prop="cargoCategory">
              <el-select v-model="updateform.cargoCategory">
                <el-option
                  v-for="dict in classOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="CPO&PO" prop="cpoPo">
              <el-input v-model="updateform.cpoPo" placeholder="请输入CPO&PO" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="快捷码" prop="shortcutCode">
              <el-input v-model="updateform.shortcutCode" placeholder="请输入快捷码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="货号" prop="articleNumber">
              <el-input v-model="updateform.articleNumber" placeholder="请输入货号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品名" prop="productName">
              <el-input v-model="updateform.productName" placeholder="请输入品名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="件数单位" prop="packagesUnit">
              <el-select v-model="updateform.packagesUnit">
                <el-option
                  v-for="dict in unitOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="件数" prop="packages">
              <el-input v-model="updateform.packages" placeholder="请输入件数" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毛重(KGS)" prop="grossWeight">
              <el-input v-model="updateform.grossWeight" placeholder="请输入毛重(KGS)" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="唛头" prop="shippingMarks">
              <el-input v-model="updateform.shippingMarks" placeholder="请输入唛头" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="SRN号" prop="srnNo">
              <el-input v-model="updateform.srnNo" placeholder="请输入SRN号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="批次" prop="batch">
              <el-input v-model="updateform.batch" placeholder="请输入批次" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Bag NO" prop="bagNo">
              <el-input v-model="updateform.bagNo" placeholder="请输入Bag NO" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="数量单位" prop="countUnit">
              <el-select v-model="updateform.countUnit">
                <el-option
                  v-for="dict in unitOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="基准数量" prop="baseQuantity">
              <el-input v-model="updateform.baseQuantity" placeholder="请输入基准数量" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="净重(KGS)" prop="netWeight">
              <el-input v-model="updateform.netWeight" placeholder="请输入净重(KGS)" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="皮重(KGS)" prop="tareWeight">
              <el-input v-model="updateform.tareWeight" placeholder="请输入皮重(KGS)" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计费面积" prop="billingArea">
              <el-input v-model="updateform.billingArea" placeholder="请输入计费面积" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调度库位" prop="storeId">
              <el-select v-model="updateform.storeId">
                <el-option
                  v-for="dict in storeOptions"
                  :key="dict.storeId"
                  :label="dict.storeNo"
                  :value="dict.storeId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓管小组" prop="warehouseManagementTeam">
              <el-input v-model="updateform.warehouseManagementTeam" placeholder="请输入仓管小组" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进报关单号" prop="customsDeclarationNo">
              <el-input v-model="updateform.customsDeclarationNo" placeholder="请输入进报关单号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务编号" prop="businessNo">
              <el-input v-model="updateform.businessNo" placeholder="请输入业务编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="品质" prop="quality">
              <el-input v-model="updateform.quality" placeholder="请输入品质" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="updateform.remarks" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdateForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listTax_innoticedtl,
  getTax_innoticedtl,
  delTax_innoticedtl,
  addTax_innoticedtl,
  updateTax_innoticedtl,
  listTax_innoticedtlbydocid,
  listByDept,
} from "@/api/tax/innoticedtl";

export default {
  name: "Tax_innoticedtl",
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
      // 入库通知单明细管理表格数据
      tax_innoticedtlList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      updatetitle: "",
      // 是否显示弹出层
      updateopen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        shippingMarks: [
          { required: true, message: "唛头不能为空", trigger: "blur" },
        ],
        batch: [{ required: true, message: "批次不能为空", trigger: "blur" }],
        packages: [
          { required: true, message: "件数不能为空", trigger: "blur" },
        ],
        customsDeclarationNo: [
          { required: true, message: "进报关单号不能为空", trigger: "blur" },
        ],
        grossWeight: [
          { required: true, message: "毛重(KGS)不能为空", trigger: "blur" },
        ],
        storeId: [
          { required: true, message: "请选择货位", trigger: "blur" },
        ],
      },

      // 表单参数
      updateform: {},
      // 表单校验
      updaterules: {
        shippingMarks: [
          { required: true, message: "唛头不能为空", trigger: "blur" },
        ],
        batch: [{ required: true, message: "批次不能为空", trigger: "blur" }],
        packages: [
          { required: true, message: "件数不能为空", trigger: "blur" },
        ],
        customsDeclarationNo: [
          { required: true, message: "进报关单号不能为空", trigger: "blur" },
        ],
      },
      //总单ID
      inNoticeDocId: this.$route.query.docId,
      //总单状态
      inNoticeDocStutus: this.$route.query.inNoticestatus,
      //总单部门ID
      deptId: this.$route.query.docDeptId,
      // 装货物大类字典
      classOptions: [],
      // 单位字典
      unitOptions: [],
       // 库位
      storeOptions: [],
    };
  },
  created() {
    //this.getList();
    this.getDtlData(this.inNoticeDocId);
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
    /** 查询入库通知单明细管理列表 */
    getList() {
      this.loading = true;
      listTax_innoticedtl(this.queryParams).then((response) => {
        this.tax_innoticedtlList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询入库通知单明细 */
    getDtlData(inNoticeDocId) {
      listTax_innoticedtlbydocid(inNoticeDocId).then((response) => {
        this.tax_innoticedtlList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

     /** 查询库位 */
    getStores() {
       listByDept(this.deptId).then((response) => {
        this.storeOptions = response.rows;
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

    // 取消按钮
    cancel() {
      this.updateopen = false;
    },
    // 表单重置
    updatereset() {
      this.updateform = {
        inNoticeDtlId: undefined,
        inNoticeDocId: undefined,
        inNoticeDocNo: undefined,
        generateDate: undefined,
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
        remarks: undefined,
      };
      this.resetForm("updateform");
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
      this.ids = selection.map((item) => item.inNoticeDtlId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "添加入库通知单明细管理";
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.updatereset();
      const inNoticeDtlId = row.inNoticeDtlId || this.ids;
      getTax_innoticedtl(inNoticeDtlId).then((response) => {
        this.updateform = response.data;
        this.updateform.cargoCategory = String(response.data.cargoCategory);
        this.updateform.packagesUnit = String(response.data.packagesUnit);
        this.updateform.countUnit = String(response.data.countUnit);

        this.updateopen = true;
        this.updatetitle = "修改入库通知单明细管理";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.inNoticeDocId = this.inNoticeDocId;
          if (this.form.inNoticeDtlId != undefined) {
            updateTax_innoticedtl(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getDtlData(this.inNoticeDocId);
              }
            });
          } else {
            addTax_innoticedtl(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getDtlData(this.inNoticeDocId);
              }
            });
          }
        }
      });
    },
    /** 提交按钮 */
    submitUpdateForm: function () {
      this.$refs["updateform"].validate((valid) => {
        if (valid) {
          this.updateform.inNoticeDocId = this.inNoticeDocId;
          if (this.updateform.inNoticeDtlId != undefined) {
            updateTax_innoticedtl(this.updateform).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.updateopen = false;
                this.getDtlData(this.inNoticeDocId);
              }
            });
          } else {
            addTax_innoticedtl(this.updateform).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.updateopen = false;
                this.getDtlData(this.inNoticeDocId);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const inNoticeDtlIds = row.inNoticeDtlId || this.ids;
      this.$confirm(
        '是否确认删除入库通知单明细管理编号为"' + inNoticeDtlIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delTax_innoticedtl(inNoticeDtlIds);
        })
        .then(() => {
          this.getDtlData(this.inNoticeDocId);
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "tax/tax_innoticedtl/export",
        {
          ...this.queryParams,
        },
        `tax_tax_innoticedtl.xlsx`
      );
    },
  },
};
</script>
