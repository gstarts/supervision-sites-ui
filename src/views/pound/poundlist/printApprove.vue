<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择场所" @change="changePlace">
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
      <!--      <af-table-column type="selection" width="55" align="center" />-->
      <af-table-column label="磅单ID" align="center" prop="poundId"/>
      <!--      <af-table-column label="申请人ID" align="center" prop="applyUserId" />-->
      <af-table-column label="申请人" align="center" prop="applyUserName">
        <template slot-scope="scope">
          {{ parseUserName(scope.row.applyUserName) }}
        </template>
      </af-table-column>
      <af-table-column label="申请时间" align="center" prop="applyTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>

      <af-table-column label="打印状态" align="center" prop="printStatus" :formatter="printApprovePrintStatusTypeFormat"/>
      <!--      <af-table-column label="审批用户ID" align="center" prop="approvalUserId" />-->
      <af-table-column label="审批用户" align="center" prop="approvalUserName">
        <template slot-scope="scope">
          {{ parseUserName(scope.row.approvalUserName) }}
        </template>
      </af-table-column>
      <af-table-column label="审批状态" align="center" prop="applyStatus"
                       :formatter="printApproveApplicationStatusTypeFormat"/>

      <af-table-column label="审批时间" align="center" prop="approvalTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.approvalTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="二审用户" align="center" prop="approveUser2">
        <template slot-scope="scope">
          {{ parseUserName(scope.row.approveUser2) }}
        </template>
      </af-table-column>

      <af-table-column label="二审状态" align="center" prop="applyStatus2"
                       :formatter="printApproveApplicationStatusTypeFormat2"/>
      <af-table-column label="二审时间" align="center" prop="approveTime2"/>

      <!--      <af-table-column label="乐观锁" align="center" prop="revision" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:print:edit']"
            v-if="scope.row.applyStatus==='0' || scope.row.applyStatus2==='0'"
          >审批
          </el-button>
          <!--          <span v-else-if="scope.row.applyStatus==='1'" class="applyStatus1">已同意</span>
                    <span v-else-if="scope.row.applyStatus==='2'" class="applyStatus2">已拒绝</span>-->
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
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!--    {"msg":"操作成功","code":200,"data":{"searchValue":null,"createBy":"songqingchuan","createTime":"2020-11-26 21:46:48","updateBy":"dinghuixian","updateTime":"2020-11-26 23:47:19","minBucketName":null,"minFileName":null,"minPath":null,"minFileLength":null,"minObjectName":null,"remark":"JG-2020-18","params":{},"id":23642,"finalInspectionTime":"","measurementNum":"","plateNum":"冀D3J672","goodsName":"5#原煤","specification":"","carrier":"","grossWeight":49050,"tare":14350,"tareWeight":null,"netWeight":34700,"netWeightE":null,"deliveryUnit":"嘉易达","receivingUnit":"内蒙古金格能源发展有限责任公司","flowDirection":"E","status":"0","coalBillNum":"JG-2020-18","containerNum":"","keeper":"","measurer":"dinghuixian","noticeNo":"24573","channelNumber":"CNGQD070052WI05","locationNumber":"B0801","stationId":"134","viaType":"02","statistics":null,"sort":null,"countPlateNum":0,"queryLogo":null,"transportUnit":"兴顺和","transportMode":"1","outChannelNumber":"CNGQD070052WI03","isModified":"0","inUser":"songqingchuan","inTime":"2020-11-26 21:46:48","outUser":"dinghuixian","outTime":"2020-11-26 23:47:19","errState":"0","errReason":null,"errTime":"2020-11-26 23:47:19","errUser":null,"preWeight":1.0,"direction":null,"packMode":"2","containerNum2":null,"containerNum3":null,"containerNum4":null,"printState":"0"}}    -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="磅单编号">{{ poundInfo.id }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车牌号">{{ poundInfo.plateNum }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="包装方式">{{ poundInfo.packMode === '1' ? '集装箱' : '散装' }}</el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="煤种">{{ poundInfo.goodsName }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">{{ poundInfo.flowDirection === 'E' ? '已完成' : '已进场' }}</el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="发货单位">{{ poundInfo.deliveryUnit }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货单位">{{ poundInfo.receivingUnit }}</el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="进场时间">{{ poundInfo.inTime }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出场时间">{{ poundInfo.outTime }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人">{{ form.applyUserName }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请时间">{{ form.applyTime }}</el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="申请原因">{{ form.applyFactor }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="磅单ID" prop="poundId" style="display: none">
          <el-input v-model="form.poundId" placeholder="请输入磅单ID" disabled/>
        </el-form-item>
        <!--        <el-form-item label="申请人" prop="applyUserName">
                  <el-input v-model="form.applyUserName" placeholder="请输入申请人名称" disabled/>
                </el-form-item>-->

        <!--        <el-form-item label="打印状态">
                  <el-select v-model="form.printStatus" placeholder="请选择申请状态" disabled size="small">
                    <el-option
                      v-for="dict in printApprovePrintStatusOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"/>
                  </el-select>
                </el-form-item>-->
        <!--        <el-form-item label="审批用户名称" prop="approvalUserName">
                  <el-input v-model="form.approvalUserName" placeholder="系统反填" disabled/>
                </el-form-item>
                <el-form-item label="申请时间" prop="approvalTime">
                  <el-input v-model="form.applyTime" placeholder="系统反填" disabled/>
                </el-form-item>
                <el-form-item label="申请原因" prop="applicationFactor">
                  <el-input v-model="form.applicationFactor" type="textarea" placeholder="系统反填" disabled/>
                </el-form-item>-->
        <!--如果1审状态不为0，说明1审完成，待2审-->
        <el-form-item label="审批状态" prop="applyStatus">
          <el-select v-model="form.applyStatus" placeholder="请选择申请状态" size="small" :disabled="approve1Status!=='0'"
                     @change="applyStatusChange">
            <el-option
              v-for="dict in applyStatusDict"
              :key="dict.key"
              :label="dict.value"
              :value="dict.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="审批原因" prop="approveFactor">
          <el-input v-model="form.approveFactor" type="textarea" placeholder="请输入审批原因"
                    :disabled="approve1Status!=='0'"/>
        </el-form-item>
        <el-row :gutter="10" v-show="approve1Status==='0' && form.applyStatus === '1'">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="审批组" prop="auditGroup">
                <el-select v-model="auditGroup" filterable placeholder="请选择审批组" @change="groupChange">
                  <el-option
                    v-for="item in auditGroupList"
                    :key="item.groupCode"
                    :label="item.groupName"
                    :value="item.groupCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第二审批人" prop="approveUser2">
                <el-select v-model="form.approveUser2" filterable placeholder="请选择第二审批人">
                  <el-option
                    v-for="item in auditUserList"
                    :key="item.userName"
                    :label="item.nickName"
                    :value="item.userName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row :gutter="10" v-show="isNeed2Approve && approve1Status!=='0'">
          <el-form-item label="二审状态" prop="applyStatus2">
            <el-select v-model="form.applyStatus2" placeholder="请选择二审状态" size="small"
                       @change="applyStatus2Change">
              <el-option
                v-for="dict in applyStatusDict"
                :key="dict.key"
                :label="dict.value"
                :value="dict.key"/>
            </el-select>
          </el-form-item>
          <el-form-item label="二审原因" prop="approveFactor2">
            <el-input v-model="form.approveFactor2" type="textarea" placeholder="请输入审批原因"/>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {delPrint, listPrint, updatePrint} from "@/api/place/print";
import {getUserDepts} from "@/utils/charutils";
import {listUser} from "@/api/system/user";
import {getSheetById} from "@/api/pound/poundlist";
import {listGroup} from "@/api/place/group";

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
        placeId: undefined,
        orderByColumn: 'apply_time',
        isAsc: 'desc',
      },
      // 表单参数
      form: {
        auditGroup: undefined,
        //磅单id
        poundId: '',
        //申请人名称
        applyUserName: '',
        //审批用户名称
        approvalUserName: '',
        //备注
        remark: '',
        //申请原因
        applicationFactor: '',
        //审批原因
        approveFactor: '',
      },
      // 表单校验
      rules: {
        applyStatus: [{required: true, message: '审批状态不能为空', trigger: 'change'}],
        approveFactor: [{required: true, message: '审批原因不能为空', trigger: 'blur'}],
      },
      rules1noPass: {
        applyStatus: [{required: true, message: '审批状态不能为空', trigger: 'change'}],
        approveFactor: [{required: true, message: '审批原因不能为空', trigger: 'blur'}],
      },
      rules1pass: {
        applyStatus: [{required: true, message: '审批状态不能为空', trigger: 'change'}],
        approveFactor: [{required: true, message: '审批原因不能为空', trigger: 'blur'}],
        approveUser2: [{required: true, message: '第二审批人不能为空', trigger: 'change'}],
      },
      rules2pass: {
        applyStatus: [{required: true, message: '审批状态不能为空', trigger: 'change'}],
        approveFactor: [{required: true, message: '审批原因不能为空', trigger: 'blur'}],
        approveUser2: [{required: true, message: '第二审批人不能为空', trigger: 'change'}],
        approveFactor2: [{required: true, message: '二审原因不能为空', trigger: 'blur'}],
        applyStatus2: [{required: true, message: '二审状态不能为空', trigger: 'change'}],
      },
      userList: [],
      auditGroupList: [],
      auditUserList: [],
      //申请状态字典集
      printApproveApplicationStatusOptions: [],
      applyStatusDict: [
        {'key': '1', value: '通过'},
        {'key': '2', value: '不通过'}
      ],
      //打印状态字典集
      printApprovePrintStatusOptions: [],
      poundInfo: {},
      isNeed2Approve: false, //是否需要2审
      approve1Status: '0',  //默认1审状态为0
      auditGroup: undefined
    };
  },
  created() {
    //申请状态字典翻译
    this.getDicts("printApprove_applicationStatus").then((response) => {
      this.printApproveApplicationStatusOptions = response.data
    });
    //打印状态字典翻译
    this.getDicts("printApprove_printStatus").then((response) => {
      this.printApprovePrintStatusOptions = response.data
    });
    this.depts = getUserDepts("0");
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
    }
    this.getList()
    this.getUserList()

  },
  methods: {
    getUserList() {
      listUser({'deptId': this.queryParams.placeId, 'delFlag': '0', 'userType': '00'}).then(response => {
        if (response.code === 200) {
          this.userList = response.rows
          this.getGroupList()
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
        revision: undefined,
      }
      this.resetForm("form");
      if (this.auditUserList.length === 1) { //如果组里只有一个人时，即直接把审批人显示出来
        this.form.approveUser2 = this.auditUserList[0].userName
      }
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
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 审批按钮操作 */
    handleUpdate(row) {
      //this.reset();
      // const id = row.id || this.ids
      // getPrint(id).then(response => {
      //   this.form = response.data;
      // });
      this.form = {...row}
      this.approve1Status = row.applyStatus //1审状态保存起来
      if (this.auditUserList.length === 1) { //如果组里只有一个人时，即直接把审批人显示出来
        this.form.approveUser2 = this.auditUserList[0].userName
      }
      //磅单ID
      /* this.form.poundId = row.poundId
       //申请人
       this.form.applyUserName = row.applyUserName
       //申请状态
       this.form.applyStatus = row.applyStatus
       //打印状态
       this.form.printStatus = row.printStatus
       //审批人
       this.form.approvalUserName = row.approvalUserName
       //申请时间
       this.form.applyTime = row.applyTime
       //申请原因
       this.form.applyFactor = row.applyFactor
       //备注
       this.form.remark = row.remark*/
      if (this.form.applyStatus === '0') this.form.applyStatus = '1'
      this.open = true
      this.title = "磅单打印审批"

      getSheetById(row.poundId).then(response => {
        if (response.code === 200) {
          //console.log(response.data)
          this.poundInfo = response.data
          if (this.form.applyStatus2) {//如果2审状态不为null 则是二审
            this.isNeed2Approve = true
          } else {
            //var strTime="2011-04-16"; //字符串日期格式
            if (this.poundInfo.outTime) {
              let date = new Date(Date.parse(this.poundInfo.outTime.replace(/-/g, "/"))); //转换成Data();
              let month = date.getMonth() + 1; //获取磅单月份
              let thisMonth = new Date().getMonth() + 1  //获取当前月份
              this.isNeed2Approve = month !== thisMonth;
            }
          }
          console.log("需要二审" + this.isNeed2Approve)
          //需要2审，并且1审已完成的
          if (this.isNeed2Approve === true && this.approve1Status !== '0') {
            this.rules = this.rules2pass
            this.form.applyStatus2 = '1'
          } else {
            this.rules = this.rules1pass
          }
        }
      })
    },
    /** 提交按钮 */
    submitForm: function () {
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
      }).then(function () {
        return delPrint(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/print/export', {
        ...this.queryParams
      }, `place_print.xlsx`)
    },
    //申请状态行翻译
    printApproveApplicationStatusTypeFormat(row, column) {
      return this.selectDictLabel(this.printApproveApplicationStatusOptions, row.applyStatus);
    },
    printApproveApplicationStatusTypeFormat2(row, column) {
      return this.selectDictLabel(this.printApproveApplicationStatusOptions, row.applyStatus2);
    },
    //打印状态行翻译
    printApprovePrintStatusTypeFormat(row, column) {
      return this.selectDictLabel(this.printApprovePrintStatusOptions, row.printStatus);
    },
    changePlace() {
      this.getList()
      this.getUserList()//更新用户列表
    },
    getGroupList() {
      listGroup({
        'placeId': this.queryParams.placeId,
        'state': '1',
        'groupCode': 'poundPrintAuditGroup2'
      }).then(response => {
        if (response.code === 200) {
          this.auditGroupList = response.rows
          if (this.auditGroupList.length > 0) {
            this.auditGroup = this.auditGroupList[0].groupCode
            this.groupChange(this.auditGroup)
          }
        }
      })
    },
    groupChange(event) {
      this.form.approveUser2 = undefined
      this.auditUserList = []
      let group = this.auditGroupList.find(item => item.groupCode === event);
      if (group) {
        let users = group.userNames.split(',')
        for (let name of users) {
          this.auditUserList.push({
            'userName': name,
            'nickName': this.userList.find(item => item.userName === name).nickName
          })
        }
      }
      if (this.auditUserList.length === 1) { //如果组里只有一个人时，即直接把审批人显示出来
        this.form.approveUser2 = this.auditUserList[0].userName
      }
    },
    //审批状态变化时
    applyStatusChange(event) {
      if (event === '2') {
        this.rules = this.rules1noPass
      } else if (event === '1') {
        this.rules = this.rules1pass
      }
    },
    applyStatus2Change(event) {

    }
  }
};
</script>
<style scoped>
.applyStatus1 {
  color: green;
  font-weight: bold;
  font-size: 15px;
}

.applyStatus2 {
  color: red;
  font-weight: bold;
  font-size: 15px;
}
</style>
