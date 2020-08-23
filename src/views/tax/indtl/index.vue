<template>
  <div class="app-container">
    <el-form ref="addform" :model="addform" :rules="addfromRules" label-width="120px" v-if="this.inDocStatus!== 1 && this.inDocStatus!== '1'">
      <el-row>
        <el-col :span="8">
          <el-form-item label="货物大类" prop="cargoCategory">
            <el-select v-model="addform.cargoCategory">
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
            <el-input v-model="addform.cpoPo" placeholder="请输入CPO&PO" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="快捷码" prop="shortcutCode">
            <el-input v-model="addform.shortcutCode" placeholder="请输入快捷码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="货号" prop="articleNumber">
            <el-input v-model="addform.articleNumber" placeholder="请输入货号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品名" prop="productName">
            <el-input v-model="addform.productName" placeholder="请输入品名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="件数单位" prop="packagesUnit">
            <el-select v-model="addform.packagesUnit">
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
            <el-input v-model="addform.packages" placeholder="请输入件数" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毛重(KGS)" prop="grossWeight">
            <el-input v-model="addform.grossWeight" placeholder="请输入毛重(KGS)" oninput="value=value.replace(/[^\d.]/g,'')"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="唛头" prop="shippingMarks">
            <el-input v-model="addform.shippingMarks" placeholder="请输入唛头" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="SRN号" prop="srnNo">
            <el-input v-model="addform.srnNo" placeholder="请输入SRN号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="批次" prop="batch">
            <el-input v-model="addform.batch" placeholder="请输入批次" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Bag NO" prop="bagNo">
            <el-input v-model="addform.bagNo" placeholder="请输入Bag NO" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="数量单位" prop="countUnit">
            <el-select v-model="addform.countUnit">
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
            <el-input v-model="addform.baseQuantity" placeholder="请输入基准数量" oninput="value=value.replace(/[^\d.]/g,'')"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="净重(KGS)" prop="netWeight">
            <el-input v-model="addform.netWeight" placeholder="请输入净重(KGS)" oninput="value=value.replace(/[^\d.]/g,'')"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="皮重(KGS)" prop="tareWeight">
            <el-input v-model="addform.tareWeight" placeholder="请输入皮重(KGS)" oninput="value=value.replace(/[^\d.]/g,'')"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计费面积" prop="billingArea">
            <el-input v-model="addform.billingArea" placeholder="请输入计费面积" oninput="value=value.replace(/[^\d.]/g,'')"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调度库位" prop="storeId">
            <el-select v-model="addform.storeId">
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
            <el-input v-model="addform.warehouseManagementTeam" placeholder="请输入仓管小组" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="进报关单号" prop="customsDeclarationNo">
            <el-input v-model="addform.customsDeclarationNo" placeholder="请输入进报关单号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务编号" prop="businessNo">
            <el-input v-model="addform.businessNo" placeholder="请输入业务编号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="品质" prop="quality">
            <el-input v-model="addform.quality" placeholder="请输入品质" />
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="submitAddForm">确 定</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table v-loading="loading" :data="indtlList" @selection-change="handleSelectionChange">
      <el-table-column label="入库单号" align="center">{{ inDocNo }}</el-table-column>
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
      <el-table-column label="调度库位" align="center" prop="storeId" :formatter="storeFormat"/>
      <el-table-column label="仓管小组" align="center" prop="warehouseManagementTeam" />
      <el-table-column label="进报关单号" align="center" prop="customsDeclarationNo" />
      <el-table-column label="业务编号" align="center" prop="businessNo" />
      <el-table-column label="品质" align="center" prop="quality" />
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column
        v-if="this.inDocStatus!== 1 && this.inDocStatus!== '1'"
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
            v-hasPermi="['tax:indtl:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:indtl:remove']"
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

    <!-- 添加或修改入库细单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="updateForm" :model="updateForm" :rules="updateFormRules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="货物大类" prop="cargoCategory">
              <el-select v-model="updateForm.cargoCategory">
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
              <el-input v-model="updateForm.cpoPo" placeholder="请输入CPO&PO" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="快捷码" prop="shortcutCode">
              <el-input v-model="updateForm.shortcutCode" placeholder="请输入快捷码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="货号" prop="articleNumber">
              <el-input v-model="updateForm.articleNumber" placeholder="请输入货号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品名" prop="productName">
              <el-input v-model="updateForm.productName" placeholder="请输入品名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="件数单位" prop="packagesUnit">
              <el-select v-model="updateForm.packagesUnit">
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
              <el-input v-model="updateForm.packages" placeholder="请输入件数" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毛重(KGS)" prop="grossWeight">
              <el-input v-model="updateForm.grossWeight" placeholder="请输入毛重(KGS)" oninput="value=value.replace(/[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="唛头" prop="shippingMarks">
              <el-input v-model="updateForm.shippingMarks" placeholder="请输入唛头" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="SRN号" prop="srnNo">
              <el-input v-model="updateForm.srnNo" placeholder="请输入SRN号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="批次" prop="batch">
              <el-input v-model="updateForm.batch" placeholder="请输入批次" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Bag NO" prop="bagNo">
              <el-input v-model="updateForm.bagNo" placeholder="请输入Bag NO" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="数量单位" prop="countUnit">
              <el-select v-model="updateForm.countUnit">
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
              <el-input v-model="updateForm.baseQuantity" placeholder="请输入基准数量" oninput="value=value.replace(/[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="净重(KGS)" prop="netWeight">
              <el-input v-model="updateForm.netWeight" placeholder="请输入净重(KGS)" oninput="value=value.replace(/[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="皮重(KGS)" prop="tareWeight">
              <el-input v-model="updateForm.tareWeight" placeholder="请输入皮重(KGS)"  oninput="value=value.replace(/[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计费面积" prop="billingArea">
              <el-input v-model="updateForm.billingArea" placeholder="请输入计费面积"  oninput="value=value.replace(/[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调度库位" prop="storeId">
               <el-select v-model="updateForm.storeId" >
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
              <el-input v-model="updateForm.warehouseManagementTeam" placeholder="请输入仓管小组" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进报关单号" prop="customsDeclarationNo">
              <el-input v-model="updateForm.customsDeclarationNo" placeholder="请输入进报关单号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务编号" prop="businessNo">
              <el-input v-model="updateForm.businessNo" placeholder="请输入业务编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="品质" prop="quality">
              <el-input v-model="updateForm.quality" placeholder="请输入品质" />
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
  listIndtl,
  getIndtl,
  delIndtl,
  addIndtl,
  updateIndtl,
  listIndtlbydocid,
  listStores,
} from "@/api/tax/indtl";

export default {
  name: "Indtl",
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
      // 入库细单表格数据
      indtlList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
      },
      // 表单参数
      addform: {},
      // 表单参数
      updateForm: {},
      //总单ID
      inDocId: this.$route.query.docId,
      //总单单号
      inDocNo: this.$route.query.docNo,
      //总单状态
      inDocStatus: this.$route.query.docStatus,
      // 装货物大类字典
      classOptions: [],
      // 单位字典
      unitOptions: [],
      // 库位
      storeOptions: [],
      // 表单校验
      addfromRules: {
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
        storeId: [
          { required: true, message: "请选择货位", trigger: "blur" },
        ],
        
      },
      // 表单校验
      updateFormRules: {
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
    };
  },
  created() {
    this.getDtlData(this.inDocId);
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
    /** 查询入库细单列表 */
    getList() {
      this.loading = true;
      listIndtl(this.queryParams).then((response) => {
        this.indtlList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询入库明细 */
    getDtlData(inDocId) {
      listIndtlbydocid(inDocId).then((response) => {
        this.indtlList = response.rows;
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
      this.open = false;
      this.updateReset();
    },

    // 表单重置
    updateReset() {
      this.updateForm = {
        inDtlId: undefined,
        inDocId: undefined,
      };
      this.resetForm("updateForm");
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
      this.ids = selection.map((item) => item.inDtlId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加入库细单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.updateReset();
      const inDtlId = row.inDtlId || this.ids;
      getIndtl(inDtlId).then((response) => {
        this.updateForm = response.data;
        this.updateForm.cargoCategory = String(response.data.cargoCategory);
        this.updateForm.packagesUnit = String(response.data.packagesUnit);
        this.updateForm.countUnit = String(response.data.countUnit);
        this.open = true;
        this.title = "修改入库细单";
      });
    },
    /** 提交按钮 */
    submitAddForm: function () {
      this.$refs["addform"].validate((valid) => {
        if (valid) {
          this.addform.inDocId = this.inDocId;
          if (this.addform.inDtlId != undefined) {
            updateIndtl(this.addform).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getDtlData(this.inDocId);
              }
            });
          } else {
            addIndtl(this.addform).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getDtlData(this.inDocId);
              }
            });
          }
        }
      });
    },
    /** 提交按钮 */
    submitUpdateForm: function () {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          this.updateForm.inDocId = this.inDocId;
          if (this.updateForm.inDtlId != undefined) {
            updateIndtl(this.updateForm).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getDtlData(this.inDocId);
              }
            });
          } else {
            addIndtl(this.updateForm).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getDtlData(this.inDocId);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const inDtlIds = row.inDtlId || this.ids;
      this.$confirm(
        '是否确认删除入库细单编号为"' + inDtlIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delIndtl(inDtlIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "tax/indtl/export",
        {
          ...this.queryParams,
        },
        `tax_indtl.xlsx`
      );
    },
  },
};
</script>