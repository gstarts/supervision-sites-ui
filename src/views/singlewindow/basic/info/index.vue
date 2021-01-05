<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="场所" prop="deptId">
        <el-select
          v-model="queryParams.deptId" placeholder="请选择场所" size="small" @change="getList">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称" prop="eName">
        <el-input v-model="queryParams.eName" placeholder="请输入公司名称" />
      </el-form-item>
      <!-- <el-form-item label="是否要报散杂货：0、不报，1、自动报，2、手动报" prop="isReport">
        <el-select v-model="queryParams.isReport" placeholder="请选择是否要报散杂货：0、不报，1、自动报，2、手动报" clearable size="small">
          <el-option
            v-for="dict in isReportOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item> -->
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['workpoint:info:add']"
          >新增</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['workpoint:info:edit']"
          >修改</el-button
        >
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['workpoint:info:remove']"
          >删除</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['workpoint:info:export']"
          >导出</el-button
        >
      </el-col> -->
    </el-row>

    <el-table
      v-loading="loading"
      :data="infoList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"/>
      <!-- <el-table-column label="是否要报散杂货：0、不报，1、自动报，2、手动报" align="center" prop="id" /> -->
      <el-table-column label="序号" type="index"/>
      <el-table-column label="公司名称" align="center" prop="eName" />
      <el-table-column label="海关编号" align="center" prop="customsMaster" />
      <el-table-column
        label="组织机构代码"
        align="center"
        prop="contractorCode"
      />
      <el-table-column
        label="统一社会信用代码"
        align="center"
        prop="contractorCodeScc"
      />
      <el-table-column
        label="作业场所编号"
        align="center"
        prop="supvLoctCode"
      />
      <el-table-column label="操作人ID" align="center" prop="opUserId" />
      <el-table-column label="发送ID" align="center" prop="senderId" />
      <el-table-column label="接收ID" align="center" prop="receiverId" />
      <el-table-column label="接口协议版本号" align="center" prop="version" />
      <!-- <el-table-column label="备注信息" align="center" prop="remark" /> -->
      <el-table-column
        label="确报传输人名称"
        align="center"
        prop="stationPersonName"
      />
      <!-- <el-table-column label="自动生成报文程序是否在运行" align="center" prop="reportIsRun" :formatter="isRunFormat"/> -->
      <el-table-column
        label="是否申报散杂货"
        align="center"
        prop="isReport"
        :formatter="isReportFormat"
      />
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
            v-hasPermi="['workpoint:info:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['workpoint:info:remove']"
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

    <!-- 添加或修改企业信息备案对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="监管场所" prop="deptId">
              <el-select v-model="form.deptId" placeholder="请选择场站">
                <el-option
                  v-for="dept in depts"
                  :key="dept.deptId"
                  :label="dept.deptName"
                  :value="dept.deptId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><el-form-item label="是否申报" prop="isReport">
              <el-select
                v-model="form.isReport"
                placeholder="请选择是否申报"
              >
                <el-option
                  v-for="dict in isReportOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="parseInt(dict.dictValue)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>        
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="eName">
              <el-input v-model="form.eName" placeholder="请选择公司名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="海关编号" prop="customsMaster">
              <el-input
                v-model="form.customsMaster"
                placeholder="请输入海关编号"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><el-form-item label="组织机构代码" prop="contractorCode">
              <el-input
                v-model="form.contractorCode"
                placeholder="请输入组织机构代码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><el-form-item label="统一社会信用代码" prop="contractorCodeScc">
              <el-input
                v-model="form.contractorCodeScc"
                placeholder="请输入统一社会信用代码"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8"
            ><el-form-item label="操作人ID" prop="opUserId">
              <el-input v-model="form.opUserId" placeholder="请输入操作人ID" />
            </el-form-item>
          </el-col>
          <el-col :span="8"
            ><el-form-item label="发送ID" prop="senderId">
              <el-input v-model="form.senderId" placeholder="请输入发送ID" />
            </el-form-item>
          </el-col>
          <el-col :span="8"
            ><el-form-item label="接收ID" prop="receiverId">
              <el-input v-model="form.receiverId" placeholder="请输入接收ID" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><el-form-item label="接口协议版本号" prop="version">
              <el-input
                v-model="form.version"
                placeholder="请输入接口协议版本号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><el-form-item label="确报传输人名称" prop="stationPersonName">
              <el-input
                v-model="form.stationPersonName"
                placeholder="请输入确报传输人名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            ><el-form-item label="作业场所编号" prop="supvLoctCode">
              <el-input
                v-model="form.supvLoctCode"
                placeholder="请输入作业场所编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注信息" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注信息" />
            </el-form-item>
          </el-col>
        </el-row>      

        <!-- <el-form-item label="自动生成报文程序是否在运行" prop="reportIsRun">
          <el-select v-model="form.reportIsRun" placeholder="请输入自动生成报文程序是否在运行">
            <el-option
              v-for="dict in isRun"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listInfo,
  getInfo,
  delInfo,
  addInfo,
  updateInfo,
} from "@/api/singlewindow_basic/info";
import {getUserDepts} from '@/utils/charutils'


export default {
  name: "Info",
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
      // 企业信息备案表格数据
      infoList: [],
      // 弹出层标题
      title: "",
      //企业所在部门
      depts: [],
      // 是否显示弹出层
      open: false,
      // 是否要报散杂货：0、不报，1、自动报，2、手动报字典
      isReportOptions: [
        { dictValue: 0, dictLabel: "不报" },
        { dictValue: 1, dictLabel: "自动报" },
        { dictValue: 2, dictLabel: "手动报" },
      ],
      // 自动生成报文程序是否在运行
      isRun: [
        { dictValue: 0, dictLabel: "未运行" },
        { dictValue: 1, dictLabel: "运行" },
      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        eName: undefined,
        customsMaster: undefined,
        contractorCode: undefined,
        contractorCodeScc: undefined,
        supvLoctCode: undefined,
        opUserId: undefined,
        senderId: undefined,
        receiverId: undefined,
        version: undefined,
        stationPersonName: undefined,
        reportIsRun: undefined,
        isReport: undefined,
        deptId: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deptId: [
          {required: true, message: "监管场所不能为空", trigger: "blur"},
        ],
        eName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" },
        ],
        customsMaster: [
          { required: true, message: "海关编号不能为空", trigger: "blur" },
        ],
        contractorCode: [
          { required: true, message: "组织机构代码不能为空", trigger: "blur" },
        ],
        contractorCodeScc: [
          {
            required: true,
            message: "统一社会信用代码不能为空",
            trigger: "blur",
          },
        ],
        supvLoctCode: [
          { required: true, message: "作业场所编号不能为空", trigger: "blur" },
        ],
        opUserId: [
          { required: true, message: "操作人ID不能为空", trigger: "blur" },
        ],
        senderId: [
          { required: true, message: "发送ID不能为空", trigger: "blur" },
        ],
        receiverId: [
          { required: true, message: "接收ID不能为空", trigger: "blur" },
        ],
        version: [
          {
            required: true,
            message: "接口协议版本号不能为空",
            trigger: "blur",
          },
        ],
        // remark: [
        //   { required: true, message: "备注信息不能为空", trigger: "blur" },
        // ],
        stationPersonName: [
          {
            required: true,
            message: "确报传输人名称不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('')
    console.log(this.depts)
    if (this.depts.length > 0) {
      this.queryParams.deptId = this.depts[0].deptId
      this.getList();
    }
    this.getList();
    // this.getDicts("station_declear_status").then(response => {
    //   this.isReportOptions = response.data;
    // });
  },
  methods: {
    /** 查询企业信息备案列表 */
    getList() {
      this.loading = true;
      listInfo(this.queryParams).then((response) => {
        this.infoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 是否要报散杂货：0、不报，1、自动报，2、手动报字典翻译
    isReportFormat(row, column) {
      return this.selectDictLabel(this.isReportOptions, row.isReport);
    },
    // 自动生成报文程序是否在运行：0、未运行，1、运行 翻译
    isRunFormat(row, column) {
      return this.selectDictLabel(this.isRun, row.reportIsRun);
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
        eName: undefined,
        customsMaster: undefined,
        contractorCode: undefined,
        contractorCodeScc: undefined,
        supvLoctCode: undefined,
        opUserId: undefined,
        senderId: undefined,
        receiverId: undefined,
        version: undefined,
        remark: undefined,
        stationPersonName: undefined,
        reportIsRun: undefined,
        isReport: undefined,
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
      this.form.deptId = this.queryParams.deptId
      this.open = true;
      this.title = "添加企业信息备案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getInfo(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改企业信息备案";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateInfo(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addInfo(this.form).then((response) => {
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
        '是否确认删除企业信息备案编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delInfo(ids);
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
        "workpoint/info/export",
        {
          ...this.queryParams,
        },
        `workpoint_info.xlsx`
      );
    },
  },
};
</script>
<style scoped>
.el-select{
  width : 100%;
}
</style>