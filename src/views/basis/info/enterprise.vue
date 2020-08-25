<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="公司名称" prop="eName">
        <el-input
          v-model="queryParams.eName"
          placeholder="请输入公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司性质" prop="eType">
        <el-select v-model="queryParams.eType" placeholder="请选择公司性质" clearable size="small">
          <el-option
            v-for="dict in eEnterpriseTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
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
          v-hasPermi="['enterprise:info:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['enterprise:info:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['enterprise:info:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['enterprise:info:export']"
        >导出</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" />
      <el-table-column label="公司名称" align="center" prop="eName" />
      <el-table-column label="公司性质" align="center" prop="eType" :formatter="statusFormat" />
      <el-table-column label="公司地址" align="center" prop="eAddress" />
      <el-table-column label="法人" align="center" prop="eLegalPerson" />
      <el-table-column label="营业范围" align="center" prop="eBusinessScope" />
      <el-table-column label="备注信息" align="center" prop="remark" :show-overflow-tooltip="true" />
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
            v-hasPermi="['enterprise:info:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['enterprise:info:remove']"
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

    <!-- 添加或修改企业信息备案对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="公司名称" prop="eName">
              <el-input v-model="form.eName" placeholder="请输入公司名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司性质" prop="eType">
              <el-select v-model="form.eType" placeholder="请选择公司性质">
                <el-option
                  v-for="dict in eEnterpriseTypeOptions"
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
          <el-form-item label="监管场所" prop="deptId"  >
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
          <el-col :span="8">
            <el-form-item label="公司英文名称" prop="eEname">
              <el-input v-model="form.eEname" placeholder="请输入公司英文名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司简称" prop="eAbbreviation">
              <el-input v-model="form.eAbbreviation" placeholder="请输入公司简称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="公司地址" prop="eAddress">
          <el-input v-model="form.eAddress" placeholder="请输入公司地址" />
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label="法人" prop="eLegalPerson">
              <el-input v-model="form.eLegalPerson" placeholder="请输入法人" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人电话" prop="eLegalPersonPhone">
              <el-input v-model="form.eLegalPersonPhone" placeholder="请输入法人电话" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务联系人" prop="eBusinessPerson">
              <el-input v-model="form.eBusinessPerson" placeholder="请输入业务联系人" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="业务联系人电话" prop="eBusinessPersonPhone">
              <el-input v-model="form.eBusinessPersonPhone" placeholder="请输入业务联系人电话" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册时间" prop="eRegisterTime">
              <el-date-picker
                clearable
                size="small"
                style="width: 200px"
                v-model="form.eRegisterTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择注册时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业范围" prop="eBusinessScope">
              <el-input v-model="form.eBusinessScope" placeholder="请输入营业范围" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="海关编号" prop="customsMaster" :rules="form.eType==2">
              <el-input v-model="form.customsMaster" placeholder="请输入海关编号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织机构代码" prop="contractorCode" :rules="form.eType==2">
              <el-input v-model="form.contractorCode" placeholder="请输入组织机构代码" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="统一社会信用代码"
              prop="contractorCodeScc"
              label-width="150px"
              :rules="form.eType==2"
            >
              <el-input v-model="form.contractorCodeScc" placeholder="请输入统一社会信用代码" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="作业场所编号" prop="supvLoctCode" :rules="form.eType==2">
              <el-input v-model="form.supvLoctCode" placeholder="请输入作业场所编号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作人ID" prop="opUserId" :rules="form.eType==2">
              <el-input v-model="form.opUserId" placeholder="请输入操作人ID" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发送ID" prop="senderId" :rules="form.eType==2">
              <el-input v-model="form.senderId" placeholder="请输入发送ID" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="接收ID" prop="receiverId" :rules="form.eType==2">
              <el-input v-model="form.receiverId" placeholder="请输入接收ID" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接口协议版本号" prop="version" :rules="form.eType==2">
              <el-input v-model="version" placeholder="请输入接口协议版本号" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="确保传输人名称" prop="stationPersonName" :rules="form.eType==2">
              <el-input v-model="form.stationPersonName" placeholder="请输入确保传输人名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注信息" prop="remark">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入备注信息" />
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
import {
  listInfo,
  getInfo,
  delInfo,
  addInfo,
  updateInfo,
} from "@/api/basis/enterpriseInfo";
import { getUserDepts} from '@/utils/charutils'

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

      version: "1.0",
      // 企业信息备案表格数据
      infoList: [],

      //企业所在部门
				depts: [],

      eEnterpriseTypeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        eName: undefined,
        eType: undefined,
        eEname: undefined,
        eAbbreviation: undefined,
        eAddress: undefined,
        eLegalPerson: undefined,
        eLegalPersonPhone: undefined,
        eBusinessPerson: undefined,
        eBusinessPersonPhone: undefined,
        eRegisterTime: undefined,
        eBusinessScope: undefined,
        customsMaster: undefined,
        contractorCode: undefined,
        contractorCodeScc: undefined,
        supvLoctCode: undefined,
        opUserId: undefined,
        senderId: undefined,
        receiverId: undefined,
        version: undefined,
        deptId:undefined,
      },
      // 表单参数
      form: {
        version: "1.0",
      },
      // 表单校验
      rules: {
        eName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" },
        ],
        eType: [
          { required: true, message: "公司性质不能为空", trigger: "blur" },
        ],
         deptId: [
          { required: true, message: "监管场所不能为空", trigger: "blur" },
        ],

        eEname: [
          { required: true, message: "公司英文名称不能为空", trigger: "blur" },
        ],
        eAbbreviation: [
          { required: true, message: "公司简称不能为空", trigger: "blur" },
        ],
        eAddress: [
          { required: true, message: "公司地址不能为空", trigger: "blur" },
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
          { required: true, message: "操作人id不能为空", trigger: "blur" },
        ],

        senderId: [
          { required: true, message: "发送人ID不能为空", trigger: "blur" },
        ],

        receiverId: [
          { required: true, message: "接收人ID不能为空", trigger: "blur" },
        ],

        version: [
          { required: true, message: "版本号ID不能为空", trigger: "blur" },
        ],

        stationPersonName: [
          { required: true, message: "确保传输人名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {

    	// 0 监管场所，1保税库，2堆场，3企业
      this.depts = getUserDepts('0')
      console.log(this.depts)
			if (this.depts.length > 0) {
				this.queryParams.deptId = this.depts[0].deptId
				this.getList();
			}
    /**获取企业类型 */
    this.getDicts("station_enterprise_type").then((response) => {
      this.eEnterpriseTypeOptions = response.data;
    });
    this.getList();
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
        eType: undefined,
        eEname: undefined,
        eAbbreviation: undefined,
        eAddress: undefined,
        eLegalPerson: undefined,
        eLegalPersonPhone: undefined,
        eBusinessPerson: undefined,
        eBusinessPersonPhone: undefined,
        eRegisterTime: undefined,
        eBusinessScope: undefined,
        customsMaster: undefined,
        contractorCode: undefined,
        contractorCodeScc: undefined,
        supvLoctCode: undefined,
        opUserId: undefined,
        senderId: undefined,
        receiverId: undefined,
        version: undefined,
        remark: undefined,
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
      this.title = "添加企业信息备案";
    },

    // 字典状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.eEnterpriseTypeOptions, row.eType);
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
        "enterprise/info/export",
        {
          ...this.queryParams,
        },
        `enterprise_info.xlsx`
      );
    },
  },
};
</script>
<style scoped>
.el-tooltip_popper {
  font-size: 15px;
  max-width: 40%;
}
</style>