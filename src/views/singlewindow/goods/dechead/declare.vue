<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="100px"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="提运单号" prop="billNo">
            <el-input v-model="queryParams.billNo" placeholder="请输入提运单号" clearable size="small" @keyup.enter.native="handleQuery"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运输工具" prop="trafName">
            <el-input v-model="queryParams.trafName" placeholder="请输入运输工具" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="处理结果" prop="channel">
            <el-select v-model="queryParams.channel" placeholder="请输入处理结果" size="small">
              <el-option
                v-for="dept in declareOptions"
                :key="dept.dictValue"
                :label="dept.dictLabel"
                :value="dept.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
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
        </el-col>
      </el-row>
    </el-form>

    <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-thumb"
            size="mini"
            :disabled="multiple"
            @click="declare($event,'declare')"
            v-hasPermi="['manifest:head:declare']"
          >申报
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="declare($event,'del')"
            v-hasPermi="['manifest:head:remove']"
          >删除
          </el-button>
        </el-col>
      </el-row>

    <el-table
      v-loading="loading"
      :data="decheadList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="提运单号" align="center" prop="billNo" />
      <el-table-column label="运输工具代码及名称" align="center" prop="trafName" />
      <el-table-column label="处理结果" align="center" prop="channel" :formatter="declareFormatter" />
      <el-table-column label="海关回执代码" align="center" prop="responseCode" />
      <el-table-column label="海关回执信息" align="center" prop="errorMessage" />
      <el-table-column label="序列号" align="center" prop="clientSeqNo" />
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
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:dechead:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:dechead:remove']"
            >删除</el-button
          >
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

    
  </div>
</template>

<script>
import {
  listDechead,
  getDechead,
  delDechead,
  addDechead,
  updateDechead,
  declare,
  delDeclare,
} from "@/api/goods/dechead";

export default {
  name: "Dechead",
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
      // 【请填写功能名称】表格数据
      decheadList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 处理结果字典
      declareOptions:[
        {dictValue: '0', dictLabel: '初始'},
        {dictValue: '1', dictLabel: '待申报'},
        {dictValue: '2', dictLabel: '上传中'},
        {dictValue: '10', dictLabel: '调用成功'}
      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        agentCode: undefined,
        agentCodeScc: undefined,
        agentName: undefined,
        apprNo: undefined,
        billNo: undefined,
        type: undefined,
        billType: undefined,
        blNo: undefined,
        checkFlow: undefined,
        chkSurety: undefined,
        cmplDschrgDt: undefined,
        contrNo: undefined,
        copCode: undefined,
        copCodeScc: undefined,
        copName: undefined,
        correlationNo: undefined,
        correlationReasonFlag: undefined,
        custoMmaster: undefined,
        cutMode: undefined,
        dataSource: undefined,
        declareName: undefined,
        declCiqCode: undefined,
        declTrnRel: undefined,
        despDate: undefined,
        desPportCode: undefined,
        distinatePort: undefined,
        domesticConsigneeEname: undefined,
        ediId: undefined,
        ediRemark: undefined,
        ediRemark2: undefined,
        entryId: undefined,
        entryType: undefined,
        entyPortCode: undefined,
        feeCurr: undefined,
        feeMark: undefined,
        feeRate: undefined,
        goodsPlace: undefined,
        grossWet: undefined,
        ieDate: undefined,
        ieFlag: undefined,
        iePort: undefined,
        inputerName: undefined,
        inspOrgCode: undefined,
        insurCurr: undefined,
        insurMark: undefined,
        insurRate: undefined,
        licenseNo: undefined,
        manualno: undefined,
        markNo: undefined,
        netWt: undefined,
        noOtherPack: undefined,
        noteS: undefined,
        orgCode: undefined,
        origBoxFlag: undefined,
        otherCurr: undefined,
        otherMark: undefined,
        otherRate: undefined,
        overseasConsigneeCode: undefined,
        overseasConsigneeEname: undefined,
        overseasConsignorAddr: undefined,
        overseasConsignorCname: undefined,
        overseasConsignorCode: undefined,
        overseasConsignorEname: undefined,
        ownerCiqCode: undefined,
        ownerCode: undefined,
        ownerCodeScc: undefined,
        ownerName: undefined,
        packNo: undefined,
        partenerId: undefined,
        pDate: undefined,
        preEntryId: undefined,
        promiseItems: undefined,
        purpOrgCode: undefined,
        risk: undefined,
        seqNo: undefined,
        specDeclFlag: undefined,
        taxAaminMark: undefined,
        tgdNo: undefined,
        tradeAreaCode: undefined,
        tradeCiqCode: undefined,
        tradeCode: undefined,
        tradeCoScc: undefined,
        tradeCountry: undefined,
        tradeMode: undefined,
        tradeName: undefined,
        trafMode: undefined,
        trafName: undefined,
        transMode: undefined,
        wrapType: undefined,
        vsaOrgCode: undefined,
        noticeDate: undefined,
        channel: '0',
        note: undefined,
        resultInfo: undefined,
        typistno: undefined,
        messageId: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listDechead(this.queryParams).then((response) => {
        this.decheadList = response.rows;
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
        agentCode: undefined,
        agentCodeScc: undefined,
        agentName: undefined,
        apprNo: undefined,
        billNo: undefined,
        type: undefined,
        billType: undefined,
        blNo: undefined,
        checkFlow: undefined,
        chkSurety: undefined,
        cmplDschrgDt: undefined,
        contrNo: undefined,
        copCode: undefined,
        copCodeScc: undefined,
        copName: undefined,
        correlationNo: undefined,
        correlationReasonFlag: undefined,
        custoMmaster: undefined,
        cutMode: undefined,
        dataSource: undefined,
        declareName: undefined,
        declCiqCode: undefined,
        declTrnRel: undefined,
        despDate: undefined,
        desPportCode: undefined,
        distinatePort: undefined,
        domesticConsigneeEname: undefined,
        ediId: undefined,
        ediRemark: undefined,
        ediRemark2: undefined,
        entryId: undefined,
        entryType: undefined,
        entyPortCode: undefined,
        feeCurr: undefined,
        feeMark: undefined,
        feeRate: undefined,
        goodsPlace: undefined,
        grossWet: undefined,
        ieDate: undefined,
        ieFlag: undefined,
        iePort: undefined,
        inputerName: undefined,
        inspOrgCode: undefined,
        insurCurr: undefined,
        insurMark: undefined,
        insurRate: undefined,
        licenseNo: undefined,
        manualno: undefined,
        markNo: undefined,
        netWt: undefined,
        noOtherPack: undefined,
        noteS: undefined,
        orgCode: undefined,
        origBoxFlag: undefined,
        otherCurr: undefined,
        otherMark: undefined,
        otherRate: undefined,
        overseasConsigneeCode: undefined,
        overseasConsigneeEname: undefined,
        overseasConsignorAddr: undefined,
        overseasConsignorCname: undefined,
        overseasConsignorCode: undefined,
        overseasConsignorEname: undefined,
        ownerCiqCode: undefined,
        ownerCode: undefined,
        ownerCodeScc: undefined,
        ownerName: undefined,
        packNo: undefined,
        partenerId: undefined,
        pDate: undefined,
        preEntryId: undefined,
        promiseItems: undefined,
        purpOrgCode: undefined,
        risk: undefined,
        seqNo: undefined,
        specDeclFlag: undefined,
        taxAaminMark: undefined,
        tgdNo: undefined,
        tradeAreaCode: undefined,
        tradeCiqCode: undefined,
        tradeCode: undefined,
        tradeCoScc: undefined,
        tradeCountry: undefined,
        tradeMode: undefined,
        tradeName: undefined,
        trafMode: undefined,
        trafName: undefined,
        transMode: undefined,
        wrapType: undefined,
        vsaOrgCode: undefined,
        noticeDate: undefined,
        channel: undefined,
        note: undefined,
        resultInfo: undefined,
        typistno: undefined,
        messageId: undefined,
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
      this.title = "添加【请填写功能名称】";
    },
    /** 申报/多选删除按钮操作 */
    declare(e, name) {
      if (name === "declare") {
        declare(this.ids).then((response) => {
          if (response.code === 200) {
            this.msgSuccess("操作成功");
            this.getList();
          }
        });
      }
      if (name === "del") {
        delDeclare(this.ids).then((response) => {
          if (response.code === 200) {
            this.msgSuccess("删除成功");
            this.getList();
          }
        });
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.$router.push({
        path: "/singlewindows/goods",
        query: { id: row.id },
      });
      // const id = row.id || this.ids;
      // getDechead(id).then((response) => {
      //   this.form = response.data;
      //   this.open = true;
      //   this.title = "修改【请填写功能名称】";
      // });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateDechead(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addDechead(this.form).then((response) => {
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
      this.form.id = row.id;
      this.form.del = "1";
      updateDechead(this.form).then((response) => {
        if (response.code === 200) {
          this.msgSuccess("操作成功");
          this.getList();
        }
      });
      // const ids = row.id || this.ids;
      // this.$confirm(
      //   '是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?',
      //   "警告",
      //   {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   }
      // )
      //   .then(function () {
      //     return delDechead(ids);
      //   })
      //   .then(() => {
      //     this.getList();
      //     this.msgSuccess("删除成功");
      //   })
      //   .catch(function () {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "place/dechead/export",
        {
          ...this.queryParams,
        },
        `place_dechead.xlsx`
      );
    },
    declareFormatter(row, column) {
      return this.selectDictLabel(this.declareOptions, row.channel);
    },
  },
};
</script>