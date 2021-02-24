<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
    >
      <!-- <el-form-item label="申请时间" prop="applyTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.applyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择申请时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请用户" prop="applyUser">
        <el-input
          v-model="queryParams.applyUser"
          placeholder="请输入申请用户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批人" prop="auditUser">
        <el-input
          v-model="queryParams.auditUser"
          placeholder="请输入审批人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批时间" prop="auditTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.auditTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择审批时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="审批状态" prop="auditState">
        <el-select
          v-model="queryParams.auditState"
          placeholder="请输入审批状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
          @change="getList"
        >
          <el-option
            v-for="dict in approvalList"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="审批说明(不通过)" prop="auditReason">
        <el-input
          v-model="queryParams.auditReason"
          placeholder="请输入审批说明(不通过)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入库单id" prop="docId">
        <el-input
          v-model="queryParams.docId"
          placeholder="请输入入库单id"
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
      <el-form-item label="入库单号" prop="inDocNo">
        <el-input
          v-model="queryParams.inDocNo"
          placeholder="请输入入库单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="修改前库位号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入修改前库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="修改后的库位号" prop="modifyStoreCode">
        <el-input
          v-model="queryParams.modifyStoreCode"
          placeholder="请输入修改后的库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['tax:modify:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:modify:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:modify:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:modify:export']"
        >导出</el-button>
      </el-col>
    </el-row> -->

    <el-table
      v-loading="loading"
      :data="modifyList"
      @selection-change="handleSelectionChange"
      :height="this.modifyList.length >5 ? tableHeight : 200"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" type="index" align="center" />
      <!-- <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="申请时间" align="center" prop="applyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请用户" align="center" prop="applyUser" />
      <el-table-column label="申请说明" align="center" prop="applyReason" />
      <el-table-column label="审批人" align="center" prop="auditUser" />
      <el-table-column label="审批时间" align="center" prop="auditTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.auditTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="审批状态"
        align="center"
        prop="auditState"
        :formatter="approvaStatusFormat"
      />
      <!-- <el-table-column label="审批说明(不通过)" align="center" prop="auditReason" />
      <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="入库单id" align="center" prop="docId" />
      <el-table-column label="批次号" align="center" prop="batchNo" />
      <el-table-column label="入库单号" align="center" prop="inDocNo" />
      <el-table-column label="修改前库位号" align="center" prop="storeCode" />
      <el-table-column
        label="修改后的库位号"
        align="center"
        prop="modifyStoreCode"
      />
      <el-table-column
        label="申请时间"
        align="center"
        prop="applyTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.applyTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleApprove(scope.row)"
            v-hasPermi="['tax:modify:edit']"
            v-show="scope.row.auditState == '0'"
            >同意</el-button>
            <el-button v-show="scope.row.auditState == '0'" slot="reference" size="mini" type="text" @click="refuse(scope.row)">驳回</el-button>

          <!-- <el-popover placement="right" width="400" :ref="`popover-${scope.$index}`" :visible.sync="reviewVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
              <el-form-item label="审批失败说明" prop="auditReason">
                <el-input
                  v-model="form.auditReason"
                  placeholder="请输入审批失败说明"
                />
              </el-form-item>
            </el-form>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="primary"
                @click="handleCloseReview(scope)"
                >取消</el-button
              >
              <el-button type="primary" size="mini" @click="submitRefuse(scope)"
                >确定</el-button
              >
            </div>
          </el-popover> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改库位修改记录 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!-- <el-form-item label="申请时间" prop="applyTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.applyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择申请时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请用户" prop="applyUser">
          <el-input v-model="form.applyUser" placeholder="请输入申请用户" />
        </el-form-item>
        <el-form-item label="申请说明" prop="applyReason">
          <el-input
            v-model="form.applyReason"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="审批人" prop="auditUser">
          <el-input v-model="form.auditUser" placeholder="请输入审批人" />
        </el-form-item>
        <el-form-item label="审批时间" prop="auditTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.auditTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审批时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审批状态" prop="auditState">
          <el-input v-model="form.auditState" placeholder="请输入审批状态" />
        </el-form-item> -->
        <el-form-item label="审批说明(不通过)" prop="auditReason">
          <el-input
            v-model="form.auditReason"
            placeholder="请输入审批说明(不通过)"
          />
        </el-form-item>
        <!-- <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人" prop="createBy">
          <el-input v-model="form.createBy" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="更新人" prop="updateBy">
          <el-input v-model="form.updateBy" placeholder="请输入更新人" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.updateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="入库单id" prop="docId">
          <el-input v-model="form.docId" placeholder="请输入入库单id" />
        </el-form-item>
        <el-form-item label="批次号" prop="batchNo">
          <el-input v-model="form.batchNo" placeholder="请输入批次号" />
        </el-form-item>
        <el-form-item label="入库单号" prop="inDocNo">
          <el-input v-model="form.inDocNo" placeholder="请输入入库单号" />
        </el-form-item>
        <el-form-item label="修改前库位号" prop="storeCode">
          <el-input v-model="form.storeCode" placeholder="请输入修改前库位号" />
        </el-form-item>
        <el-form-item label="修改后的库位号" prop="modifyStoreCode">
          <el-input
            v-model="form.modifyStoreCode"
            placeholder="请输入修改后的库位号"
          />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRefuse()">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listModify,
  getModify,
  delModify,
  addModify,
  updateModify,
  modifyAgree,
} from "@/api/tax/modify";

export default {
  name: "Modify",
  data() {
    return {
      //高度自适应
      tableHeight:window.innerHeight - 280,
      // 遮罩层
      loading: true,
      reviewVisible: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 库位修改记录 表格数据
      modifyList: [],
      // 审批状态
      approvalList: [
        { dictValue: "0", dictLabel: "审批中" },
        { dictValue: "1", dictLabel: "通过" },
        { dictValue: "2", dictLabel: "不通过" },
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: "id",
        isAsc: "desc",
        applyTime: undefined,
        applyUser: undefined,
        applyReason: undefined,
        auditUser: undefined,
        auditTime: undefined,
        auditState: undefined,
        auditReason: undefined,
        docId: undefined,
        batchNo: undefined,
        inDocNo: undefined,
        storeCode: undefined,
        modifyStoreCode: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        applyTime: [
          { required: true, message: "申请时间不能为空", trigger: "blur" },
        ],
        applyUser: [
          { required: true, message: "申请用户不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询库位修改记录 列表 */
    getList() {
      this.loading = true;
      listModify(this.queryParams).then((response) => {
        this.modifyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 审批状态 字典翻译
    approvaStatusFormat(row) {
      return this.selectDictLabel(this.approvalList, row.auditState);
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
        applyTime: undefined,
        applyUser: undefined,
        applyReason: undefined,
        auditUser: undefined,
        auditTime: undefined,
        auditState: undefined,
        auditReason: undefined,
        createTime: undefined,
        createBy: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        docId: undefined,
        batchNo: undefined,
        inDocNo: undefined,
        storeCode: undefined,
        modifyStoreCode: undefined,
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加库位修改记录 ";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getModify(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改库位修改记录 ";
      });
    },
    /** 审批同意操作 */
    handleApprove(row) {
      modifyAgree(row);
      this.getList();
    },
    // /** 弹窗取消 */
    // handleCloseReview(scope) {
    //   this.form.auditReason = undefined;
    //   this.$refs[`popover-${scope.$index}`].doClose();
    // },
    /** 审批拒绝操作 */
    submitRefuse() {
      this.form.auditState = "2";
      updateModify(this.form).then((response) => {
        if (response.code === 200) {
          this.msgSuccess("操作成功,已驳回");
          // this.$refs[`popover-${scope.$index}`].doClose();
          this.cancel();
          this.getList();
        }
      });
    },
    refuse(row) {
      this.form = row;
      this.open = true
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateModify(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addModify(this.form).then((response) => {
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
      this.$confirm(
        '是否确认删除库位修改记录 编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delModify(ids);
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
        "tax/modify/export",
        {
          ...this.queryParams,
        },
        `tax_modify.xlsx`
      );
    },
  },
};
</script>
