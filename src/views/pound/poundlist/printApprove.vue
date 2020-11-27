<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="stationId">
        <el-select v-model="queryParams.stationId" placeholder="请选择场所" @change="changePlace">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="磅单ID" prop="poundId">
        <el-input
          v-model="queryParams.poundId"
          placeholder="请输入磅单ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="申请人ID" prop="applyUserId">-->
<!--        <el-input-->
<!--          v-model="queryParams.applyUserId"-->
<!--          placeholder="请输入申请人ID"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="申请人" prop="applyUserName">
        <el-input
          v-model="queryParams.applyUserName"
          placeholder="请输入申请人名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请状态" prop="applyStatus">
        <el-select v-model="queryParams.applyStatus" placeholder="请选择申请状态" clearable size="small">
          <el-option
            v-for="dict in printApproveApplicationStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"/>
        </el-select>
      </el-form-item>
      <el-form-item label="打印状态" prop="printStatus">
        <el-select v-model="queryParams.printStatus" placeholder="请选择打印状态" clearable size="small">
          <el-option
            v-for="dict in printApprovePrintStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"/>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="审批用户ID" prop="approvalUserId">-->
<!--        <el-input-->
<!--          v-model="queryParams.approvalUserId"-->
<!--          placeholder="请输入审批用户ID"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="审批用户名称" prop="approvalUserName">-->
<!--        <el-input-->
<!--          v-model="queryParams.approvalUserName"-->
<!--          placeholder="请输入审批用户名称"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="申请时间" prop="applyTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.applyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择申请时间">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="审批时间" prop="approvalTime">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.approvalTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择审批时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="乐观锁" prop="revision">-->
<!--        <el-input-->
<!--          v-model="queryParams.revision"-->
<!--          placeholder="请输入乐观锁"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['place:print:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['place:print:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['place:print:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['place:print:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->

    <el-table v-loading="loading" :data="printList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="磅单ID" align="center" prop="poundId" />
<!--      <el-table-column label="申请人ID" align="center" prop="applyUserId" />-->
      <el-table-column label="申请人" align="center" prop="applyUserName" >
        <template slot-scope="scope">
          {{parseUserName(scope.row.applyUserName)}}
        </template>
      </el-table-column>
      <el-table-column label="申请状态" align="center" prop="applyStatus" :formatter="printApproveApplicationStatusTypeFormat" />
      <el-table-column label="打印状态" align="center" prop="printStatus" :formatter="printApprovePrintStatusTypeFormat" />
<!--      <el-table-column label="审批用户ID" align="center" prop="approvalUserId" />-->
      <el-table-column label="审批用户名称" align="center" prop="approvalUserName" >
        <template slot-scope="scope">
          {{parseUserName(scope.row.approvalUserName)}}
        </template>
      </el-table-column>
      <el-table-column label="申请时间" align="center" prop="applyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批时间" align="center" prop="approvalTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.approvalTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
<!--      <el-table-column label="乐观锁" align="center" prop="revision" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:print:edit']"
            v-if="scope.row.applyStatus==='0'"
          >审批</el-button>
          <span v-else-if="scope.row.applyStatus==='1'" class="applyStatus1">已同意</span>
          <span v-else-if="scope.row.applyStatus==='2'" class="applyStatus2">已拒绝</span>
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['place:print:remove']"-->
<!--          >删除</el-button>-->
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

    <!-- 磅单打印审批弹出框-->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="磅单ID" prop="poundId">
          <el-input v-model="form.poundId" placeholder="请输入磅单ID" disabled/>
        </el-form-item>
        <el-form-item label="申请人" prop="applyUserName">
          <el-input v-model="form.applyUserName" placeholder="请输入申请人名称" disabled/>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-select v-model="form.applyStatus" placeholder="请选择申请状态"  size="small">
            <el-option
              v-for="dict in printApproveApplicationStatusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"/>
          </el-select>
        </el-form-item>
        <el-form-item label="打印状态">
          <el-select v-model="form.printStatus" placeholder="请选择申请状态" disabled size="small">
            <el-option
              v-for="dict in printApprovePrintStatusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"/>
          </el-select>
        </el-form-item>
        <el-form-item label="审批用户名称" prop="approvalUserName">
          <el-input v-model="form.approvalUserName" placeholder="系统反填" disabled/>
        </el-form-item>
        <el-form-item label="申请时间" prop="approvalTime">
          <el-input v-model="form.applyTime" placeholder="系统反填" disabled/>
        </el-form-item>
        <el-form-item label="申请原因" prop="applicationFactor">
          <el-input v-model="form.applicationFactor" type="textarea" placeholder="系统反填" disabled/>
        </el-form-item>
        <el-form-item label="审批原因" prop="approveFactor">
          <el-input v-model="form.approveFactor" type="textarea" placeholder="请输入审批原因" />
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
import { listPrint, getPrint, delPrint, addPrint, updatePrint } from "@/api/place/print";
import {listGroup} from "@/api/place/group";
import {getUserDepts} from "@/utils/charutils";
import {listUser} from "@/api/system/user";

export default {
  name: "Print",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      printList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        poundId: undefined,
        applyUserId: undefined,
        applyUserName: undefined,
        applyStatus: undefined,
        printStatus: undefined,
        approvalUserId: undefined,
        approvalUserName: undefined,
        applyTime: undefined,
        approvalTime: undefined,
        revision: undefined,
        stationId:undefined
      },
      // 表单参数
      form: {
        auditGroup:undefined,
        //磅单id
        poundId: '',
        //申请人名称
        applyUserName: '',
        //审批用户名称
        approvalUserName: '',
        //备注
        remark: '',
        //申请原因
        applicationFactor:'',
        //审批原因
        approveFactor:'',
      },
      // 表单校验
      rules: {
      },
      userList: [],
      auditGroupList: [],
      auditUserList: [],
      //申请状态字典集
      printApproveApplicationStatusOptions:[],
      //打印状态字典集
      printApprovePrintStatusOptions:[],
    };
  },
  created() {

    //申请状态字典翻译
    this.getDicts("printApprove_applicationStatus").then((response) => {
      this.printApproveApplicationStatusOptions = response.data;
    });
    //打印状态字典翻译
    this.getDicts("printApprove_printStatus").then((response) => {
      this.printApprovePrintStatusOptions = response.data;
    });
    this.depts = getUserDepts("0");
    if (this.depts.length > 0) {
      this.queryParams.stationId = this.depts[0].deptId;
    }
    // this.getList();
  },
  methods: {
    getUserList() {
      listUser({'deptId': this.queryParams.stationId, 'delFlag': '0'}).then(response => {
        if (response.code === 200) {
          this.userList = response.rows
          console.log("==============")
          console.log(this.userList)
        }
      });
    },
    //翻译用户名
    parseUserName(user) {
      let u = this.userList.find(item => item.userName === user)
      if (u) {
        return u.nickName
      } else {
        return user
      }
    },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listPrint(this.queryParams).then(response => {
        this.printList = response.rows;
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
        poundId: undefined,
        applyUserId: undefined,
        applyUserName: undefined,
        applyStatus: "0",
        printStatus: "0",
        approvalUserId: undefined,
        approvalUserName: undefined,
        applyTime: undefined,
        approvalTime: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        revision: undefined
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
      // this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 审批按钮操作 */
    handleUpdate(row) {
      this.reset();
      // const id = row.id || this.ids
      // getPrint(id).then(response => {
      //   this.form = response.data;
      // });
      //磅单ID
      this.form.poundId=row.poundId
      //申请人
      this.form.applyUserName=row.applyUserName
      //申请状态
      this.form.applyStatus=row.applyStatus
      //打印状态
      this.form.printStatus=row.printStatus
      //审批人
      this.form.approvalUserName=row.approvalUserName
      //申请时间
      this.form.applyTime=row.applyTime
      //申请原因
      this.form.applicationFactor=row.applicationFactor
      //备注
      this.form.remark=row.remark
      this.open = true;
      this.title = "磅单打印审批";
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            updatePrint(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("审批成功");
                this.open = false;
                this.getList();
              }
            });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPrint(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/print/export', {
        ...this.queryParams
      }, `place_print.xlsx`)
    },
    //申请状态行翻译
    printApproveApplicationStatusTypeFormat  (row,column){
      return this.selectDictLabel(this.printApproveApplicationStatusOptions,row.applyStatus);
    },
    //打印状态行翻译
    printApprovePrintStatusTypeFormat(row,column){
      return this.selectDictLabel(this.printApprovePrintStatusOptions,row.printStatus);
    },
    changePlace(){
      this.getUserList()//更新用户列表
    }
  }
};
</script>
<style scoped>
.applyStatus1{
  color: green;
  font-weight: bold;
  font-size: 15px;
}
.applyStatus2{
  color: red;
  font-weight: bold;
  font-size: 15px;
}
</style>
