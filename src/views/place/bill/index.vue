<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">

      <el-form-item label="所属场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择所属场所" @change="placeChange">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"/>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="计费单 有编码规则" prop="billNo">
            <el-input
              v-model="queryParams.billNo"
              placeholder="请输入计费单 有编码规则"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>-->
      <!--      <el-form-item label="寄仓客户ID" prop="customerId">
              <el-input
                v-model="queryParams.customerId"
                placeholder="请输入寄仓客户ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <el-form-item label="寄仓客户" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入寄仓客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="合同ID" prop="contractId">
              <el-input
                v-model="queryParams.contractId"
                placeholder="请输入合同ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <el-form-item label="合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计费月份" prop="billMonth">
        <el-date-picker
          v-model="queryParams.billMonth"
          type="month"
          placeholder="选择计费月份"
          value-format="yyyy-MM"
          format="yyyy-MM" @change="handleQuery">
        </el-date-picker>
      </el-form-item>
      <!--      <el-form-item label="账单金额" prop="billAmount">
              <el-input
                v-model="queryParams.billAmount"
                placeholder="请输入账单金额"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <!--      <el-form-item label="计费周期开始时间" prop="timeStart">
              <el-date-picker clearable size="small" style="width: 200px"
                v-model="queryParams.timeStart"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择计费周期开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="计费周期结束时间" prop="timeEnd">
              <el-date-picker clearable size="small" style="width: 200px"
                v-model="queryParams.timeEnd"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择计费周期结束时间">
              </el-date-picker>
            </el-form-item>-->
      <!--      <el-form-item label="状态" prop="state">
              <el-input
                v-model="queryParams.state"
                placeholder="请输入状态"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <el-form-item label="审批状态" prop="approveState">
        <el-select v-model="queryParams.approveState" placeholder="请选择审批状态" clearable
                   size="small" @change="handleQuery">
          <el-option v-for="item in approveStateOptions"
                     :key="item.dictValue"
                     :value="item.dictValue"
                     :label="item.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="上报人" prop="upUser">
              <el-input
                v-model="queryParams.upUser"
                placeholder="请输入上报人"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="上报时间" prop="upTime">
              <el-date-picker clearable size="small" style="width: 200px"
                v-model="queryParams.upTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择上报时间">
              </el-date-picker>
            </el-form-item>-->
      <el-form-item label="上报状态" prop="upState">
        <el-select v-model="queryParams.upState" placeholder="请选择上报状态" clearable
                   size="small" @change="handleQuery">
          <el-option v-for="item in upStateOptions"
                     :key="item.dictValue"
                     :value="item.dictValue"
                     :label="item.dictLabel"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--    <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['place:bill:add']"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['place:bill:edit']"
            >修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['place:bill:remove']"
            >删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['place:bill:export']"
            >导出</el-button>
          </el-col>
        </el-row>-->

    <el-table v-loading="loading" :data="billList" :height="this.billList.length >5 ? tableHeight : 300">
      <!--      <el-table-column label="ID" align="center" prop="id"/>-->
      <af-table-column label="计费单" align="center" prop="billNo"/>
      <!--      <el-table-column label="场所ID" align="center" prop="placeId" />-->
      <!--      <el-table-column label="寄仓客户ID" align="center" prop="customerId" />-->
      <af-table-column label="寄仓客户" align="center" prop="customerName"/>
      <!--      <el-table-column label="合同ID" align="center" prop="contractId" />-->
      <af-table-column label="合同编号" align="center" prop="contractNo"/>
      <af-table-column label="煤种" align="center" prop="goodsName"/>
      <el-table-column label="计费月份" align="center" prop="billMonth"/>
      <el-table-column label="账单金额" align="center" prop="billAmount"/>
      <el-table-column label="增补金额" align="center" prop="addAmount"/>
      <el-table-column label="总金额" align="center" prop="totalAmount"/>
      <el-table-column label="计费周期开始时间" align="center" prop="timeStart" width="180"/>
      <el-table-column label="计费周期结束时间" align="center" prop="timeEnd" width="180"/>
      <!-- <el-table-column label="状态" align="center" prop="state"/>-->
      <el-table-column label="审批状态" align="center" prop="approveState" :formatter="approveStateFormat"/>
      <el-table-column label="上报状态" align="center" prop="upState" width="180" :formatter="upStateFormat"/>
      <el-table-column label="上报人" align="center" prop="upUser"/>
      <el-table-column label="上报时间" align="center" prop="upTime" width="180"/>
      <!--      <el-table-column label="备注" align="center" prop="remark"/>-->
      <el-table-column label="生成时间" align="center" prop="createTime" width="180"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="280" fixed="right">
        <template slot-scope="scope">
          <el-button
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="openDetail(scope.row)"
                     v-hasPermi="['place:billDetail:list']"
          >明细
          </el-button>
          <el-button v-show="scope.row.approveState !== '1' && scope.row.approveState !== '3' "
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="reCalcBillCost(scope.row)"
                     v-hasPermi="['place:bill:recalc']"
          >重新计算
          </el-button>
          <el-button v-show="scope.row.approveState === '0' || scope.row.approveState === '2'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleAuditOpen(scope.row)"
                     v-hasPermi="['place:approveHead:add']"
          >提交审批
          </el-button>
          <el-button v-show="scope.row.upState === '0' && scope.row.approveState === '1' "
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['place:bill:up']"
          >上报
          </el-button>
          <el-button v-show="scope.row.approveState === '0' && scope.row.upState === '0'"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row)"
                     v-hasPermi="['place:bill:remove']"
          >删除
          </el-button>
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

    <el-drawer
      title="计费明细"
      :visible.sync="billDetailView"
      :append-to-body="true"
      :close-on-press-escape="true"
      direction="btt"
      size="100%"
      :wrapperClosable="true"
      :style="{marginLeft:'200px'}"
      style="padding:10px"
      :with-header="true">
      <el-row style="padding: 0 20px 10px 20px;font-size: 14px">
        <el-col :span="12">
          客户名称：{{ currentBill.customerName }}
          合同编号：{{ currentBill.contractNo }}
          品名：{{ currentBill.goodsName }}
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="detailList" height="350">
        <!--        <el-table-column type="selection" width="55" align="center"/>
                <el-table-column label="ID" align="center" prop="id"/>
                <el-table-column label="账单ID" align="center" prop="billId"/>
                <el-table-column label="寄仓客户ID" align="center" prop="customerId"/>-->
        <af-table-column label="寄仓客户" align="center" prop="customerName"/>
        <!--        <el-table-column label="合同ID" align="center" prop="contactId"/>-->
        <af-table-column label="合同编号" align="center" prop="contractNo"/>
        <el-table-column label="计费项目" align="center" prop="billOption" :formatter="billOptionFormat"/>
        <el-table-column label="计费类型" align="center" prop="costRule.billType" :formatter="billTypeFormat"/>
        <el-table-column label="单价(元)" align="center" prop="price"/>
        <el-table-column label="数量(吨)" align="center" prop="quantity"/>
        <el-table-column label="金额(元)" align="center" prop="amount"/>
        <el-table-column label="来源" align="center" prop="dataSource" :formatter="dataSourceFormat"/>
        <!--        <el-table-column label="计费规则" align="center" prop="ruleId"/>-->
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <!--            <el-button v-show="scope.row.dataSource === '2'"
                                   size="mini"
                                   type="text"
                                   icon="el-icon-edit"
                                   @click="handleUpdate(scope.row)"
                                   v-hasPermi="['place:billDetail:edit']"
                        >修改
                        </el-button>-->
            <el-button
              v-show="scope.row.dataSource === '2' && (currentBill.approveState ==='0' || currentBill.approveState ==='2') && currentBill.upState ==='0'"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDeleteDetail(scope.row,scope.$index)"
              v-hasPermi="['place:billDetail:remove']"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-left:25px;margin-right:5px;margin-top:20px;overflow: auto;height: 260px"
           v-show=" (currentBill.approveState ==='0' || currentBill.approveState ==='2') && currentBill.upState ==='0'">
        <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="100px">
          <!--          <el-form-item label="账单ID" prop="billId">
                      <el-input v-model="form.billId" placeholder="请输入账单ID" />
                    </el-form-item>
                    <el-form-item label="寄仓客户ID" prop="customerId">
                      <el-input v-model="form.customerId" placeholder="请输入寄仓客户ID" />
                    </el-form-item>
                    <el-form-item label="寄仓客户名称" prop="customerName">
                      <el-input v-model="form.customerName" placeholder="请输入寄仓客户名称" />
                    </el-form-item>
                    <el-form-item label="合同ID" prop="contactId">
                      <el-input v-model="form.contactId" placeholder="请输入合同ID" />
                    </el-form-item>
                    <el-form-item label="合同编号" prop="contactNo">
                      <el-input v-model="form.contactNo" placeholder="请输入合同编号" />
                    </el-form-item>-->
          <el-form-item label="计费项目" prop="billOption">
            <el-select v-model="form.billOption" filterable placeholder="请选择计费项目">
              <el-option v-for="item in billOptions"
                         :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
            </el-select>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="form.price" placeholder="请输入单价"/>
          </el-form-item>
          <el-form-item label="数量" prop="quantity">
            <el-input v-model="form.quantity" placeholder="请输入数量"/>
          </el-form-item>
          <el-form-item label="金额" prop="amount">
            <el-input v-model="form.amount" placeholder="请输入金额"/>
          </el-form-item>
          <el-button type="primary" v-hasPermi="['place:billDetail:add']" @click="submitAddDetail">添 加</el-button>
        </el-form>
      </div>
    </el-drawer>

    <!-- 提交审批对话框 -->
    <el-dialog title="提交审批" :visible.sync="auditOpen" append-to-body>
      <el-form ref="approveForm" :model="approveForm" :rules="auditRules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="审批组" prop="auditGroup">
              <el-select v-model="approveForm.approveGroup" placeholder="请选择审批组">
                <el-option v-for="item in approveGroupList" :key="item.groupCode" :label="item.groupName"
                           :value="item.groupCode"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批人" prop="approveUser">
              <el-select placeholder="请选择审批人" v-model="approveForm.approveUser">
                <el-option
                  v-for="item in approveUserList"
                  :key="item.userName"
                  :label="item.nickName"
                  :value="item.userName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitApproveForm">确 定</el-button>
        <el-button @click="cancelApprove">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  addBill,
  delBill,
  delBillDetail,
  getBill,
  listBillLike,
  reCalcBillCost,
  updateBill
} from "@/api/place/bill/bill";
import {getUserDepts} from "@/utils/charutils";
import {addBillDetail, delBillDetailByObject, listBillDetail} from "@/api/place/bill/detail";
import {listGroup} from "@/api/place/group";
import {listUser} from "@/api/system/user";
import {addApproveHead} from "@/api/place/approve/approveHead";

export default {
  name: "Bill",
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

      // table 高度
      tableHeight: window.innerHeight - 280,
      // 总条数
      total: 0,
      // 计费单表格数据
      billList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      auditOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'id',
        isAsc: 'desc',
        billNo: undefined,
        placeId: undefined,
        customerId: undefined,
        customerName: undefined,
        contractId: undefined,
        contractNo: undefined,
        billMonth: undefined,
        billAmount: undefined,
        timeStart: undefined,
        timeEnd: undefined,
        state: undefined,
        approveState: undefined,
        upUser: undefined,
        upTime: undefined,
        upState: undefined,
        revision: undefined
      },
      // 表单参数
      form: {
        id: undefined,
        billId: undefined,
        customerId: undefined,
        customerName: undefined,
        contractId: undefined,
        contractNo: undefined,
        billOption: undefined,
        price: undefined,
        quantity: undefined,
        amount: undefined,
        dataSource: '2',
        ruleId: undefined,
      },
      // 表单校验
      rules: {
        billOption: [
          {'required': true, message: '计费项目不能为空', trigger: 'change'},
        ],
        amount: [ //金额，应该为正浮点数，保留两位小数
          {
            'required': true,
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: '金额须为整数或两位小数',
            trigger: 'blur'
          },
        ],
        price: [ //金额，应该为正浮点数，保留两位小数
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: '金额须为整数或两位小数',
            trigger: 'blur'
          },
        ],
        quantity: [
          {pattern: /^[1-9]\d*|0$/, message: '请填写正确的数值', trigger: 'blur'}
        ],
      },
      depts: [],
      billDetailView: false,
      detailList: [],
      currentBill: {
        customerName: undefined,
        contractNo: undefined,
        goodsName: undefined,
      },
      upStateOptions: [
        {'dictValue': '0', 'dictLabel': '未上报'},
        {'dictValue': '1', 'dictLabel': '已上报'},
      ],
      approveStateOptions: [
        {'dictValue': '0', 'dictLabel': '未提交'},
        {'dictValue': '1', 'dictLabel': '审批通过'},
        {'dictValue': '2', 'dictLabel': '审批不通过'},
        {'dictValue': '3', 'dictLabel': '待审批'},
      ],
      billOptions: [ //计费项目
        {dictValue: '1', dictLabel: '仓储费'},
        {dictValue: '2', dictLabel: '装货费'},
        {dictValue: '3', dictLabel: '卸货费'},
        {dictValue: '4', dictLabel: '超期仓储费'},
        {dictValue: '5', dictLabel: '其他费用'},
      ],
      dataSourceOptions: [
        {dictValue: '1', dictLabel: '系统计算'},
        {dictValue: '2', dictLabel: '人工录入'},
      ],
      billTypes: [//计费类型
        {dictValue: '1', dictLabel: '固定费'},
        {dictValue: '2', dictLabel: '计量费'},
        {dictValue: '3', dictLabel: '计量阶梯费'},
        {dictValue: '4', dictLabel: '计时阶梯费'},
        {dictValue: '5', dictLabel: '议价费'},
      ],
      approveForm: {
        classId: undefined,
        className: 'costBill',
        placeId: undefined,
        approveLevel: 1,
        docId: undefined,
        docNo: undefined,
        approveUser: undefined,
        approveGroup: undefined,
      },
      auditRules: {
        approveUser: [
          {'required': true, message: '审批人不能为空', trigger: 'change'},
        ],
      },
      userList: [],
      approveUserList: [],
      approveGroupList: [],
    }
  },
  created() {
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId;
      this.getList();
      this.getUserList()
    }
  },
  methods: {
    /** 查询计费单列表 */
    getList() {
      this.loading = true;
      listBillLike(this.queryParams).then(response => {
        this.billList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 提交取消按钮
    cancelApprove() {
      this.auditOpen = false;
      this.approveForm.placeId = this.queryParams.placeId
      this.approveForm.classId = undefined
      this.approveForm.className = 'costBill'
      this.approveForm.approveLevel = 1
      this.approveForm.docId = undefined
      this.approveForm.docNo = undefined
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        billId: undefined,
        customerId: undefined,
        customerName: undefined,
        contactId: undefined,
        contactNo: undefined,
        billOption: undefined,
        price: undefined,
        quantity: undefined,
        amount: undefined,
        dataSource: '2',
        ruleId: undefined,
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
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加计费单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBill(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改计费单";
      });
    },
    //打开 提交审批窗口
    handleAuditOpen(row) {
      // this.reset();
      //this.approveForm = row
      this.approveForm.placeId = this.queryParams.placeId
      this.approveForm.classId = row.id
      this.approveForm.className = 'costBill'
      this.approveForm.approveLevel = 1
      this.approveForm.docId = undefined
      this.approveForm.docNo = row.contractNo

      this.auditOpen = true
      //this.resetForm("approveForm");
    },
    /** 提交按钮 */
    submitAddDetail: function () {
      let detail = {...this.form}
      this.$refs["form"].validate(valid => {
        if (valid) {
          addBillDetail(detail).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              //清除form
              this.form.billOption = undefined
              this.form.price = undefined
              this.form.quantity = undefined
              this.form.amount = undefined
              this.open = false;
              this.detailList.push(response.data)
              this.getList();
            }
          })
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除计费单编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delBill(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },

    /** 删除按钮操作 */
    handleDeleteDetail(row, index) {
      this.$confirm('是否确认删除计费金额为"' + row.amount + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delBillDetailByObject(row);
      }).then(() => {
        this.detailList.splice(index, 1)
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download('place/bill/export', {
        ...this.queryParams
      }, `place_bill.xlsx`)
    },
    placeChange(event) {
      this.getList()
      this.getUserList()
    },
    //明细面板打开
    openDetail(row) {
      this.currentBill = {...row}
      console.log(this.currentBill)
      //先给form赋值
      this.form.billId = this.currentBill.id
      this.form.contactId = this.currentBill.contractId
      this.form.contractNo = this.currentBill.contractNo
      this.form.customerId = this.currentBill.customerId
      this.form.customerName = this.currentBill.customerName
      this.form.billOption = undefined
      this.form.price = undefined
      this.form.quantity = undefined
      this.form.amount = undefined
      this.billDetailView = true
      listBillDetail({billId: row.id, placeId: this.queryParams.placeId}).then(response => {
        if (response.code === 200) {
          this.detailList = response.rows
        }
      })
    },
    approveStateFormat(row, column) {
      return this.selectDictLabel(this.approveStateOptions, row.approveState);
    },
    upStateFormat(row, column) {
      return this.selectDictLabel(this.upStateOptions, row.upState);
    },
    billOptionFormat(row, column) {
      return this.selectDictLabel(this.billOptions, row.billOption);
    },
    dataSourceFormat(row, column) {
      return this.selectDictLabel(this.dataSourceOptions, row.dataSource);
    },
    billTypeFormat(row, column) {
      if (row.costRule && row.costRule.billType) {
        return this.selectDictLabel(this.billTypes, row.costRule.billType);
      }
      return ''
    },
    //重新计算
    reCalcBillCost(row) {
      this.$confirm('是否确认要重新计算"' + row.contractNo + '"的计费单?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {

      }).then(() => {
        this.loading = true
        reCalcBillCost(row.contractId, row.billMonth).then(response => {
          this.loading = false
          if (response.code === 200) {
            this.msgSuccess(response.msg)
            this.getList();
          }
        }).catch(e => {
          this.loading = false
        })
      }).catch(function () {
        this.loading = false
      })
    },
    //提交审批
    submitApproveForm() {
      //console.log("提交审批确定按钮")
      this.$refs["approveForm"].validate(valid => {
        if (valid) {
          this.loading = true
          addApproveHead(this.approveForm).then(response => {
            this.loading = false
            if (response.code === 200) {
              this.$message.success("提交成功")
              this.auditOpen = false
              this.getList()
              this.approveCancel()
            }
          }).catch(e => {
            this.loading = false
          })
        }
      })
    },
    getApproveGroupList() {
      listGroup({
        'placeId': this.queryParams.placeId,
        'state': '1',
        'groupCode': 'costAuditGroup', //组名固定了
      }).then(response => {
        if (response.code === 200) {
          this.approveGroupList = response.rows
          if (this.approveGroupList.length > 0) {
            this.approveForm.approveGroup = this.approveGroupList[0].groupCode
            //console.log(this.modifyGroupList[0].groupCode)
            this.groupApproveChange(this.approveGroupList[0].groupCode)
          }
        }
      })
    },
    groupApproveChange(event) {
      this.approveForm.approveUser = undefined
      this.approveUserList = []
      let group = this.approveGroupList.find(item => item.groupCode === event);
      if (group) {
        let users = group.userNames.split(',')
        for (let name of users) {
          this.approveUserList.push({
            'userName': name,
            'nickName': this.userList.find(item => item.userName === name).nickName
          })
        }
      }
      if (this.approveUserList.length === 1) { //如果组里只有一个人时，即直接把审批人显示出来
        this.approveForm.approveUser = this.approveUserList[0].userName
      }
    },
    getUserList() {
      listUser({'deptId': this.queryParams.placeId, 'delFlag': '0', 'userType': '00'}).then(response => {
        if (response.code === 200) {
          this.userList = response.rows
          this.getApproveGroupList()
        }
      });
    },
  }
}
;
</script>

<style scoped>
.expanded /deep/ .el-table__expanded-cell {
  padding: 2px;
  margin: 1px;
}
</style>
