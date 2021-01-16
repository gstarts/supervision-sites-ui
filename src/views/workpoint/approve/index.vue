<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          @change="placeChange"
          v-model="queryParams.placeId" placeholder="请选择场所" size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务编号" prop="businessNo">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入业务编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批状态" prop="approveState">
        <el-select v-model="queryParams.approveState"
                   placeholder="请选择审批状态"
                   clearable
                   size="small"
                   @change="handleQuery">
          <el-option
            v-for="dept in approveStateOptions"
            :key="dept.dictValue"
            :label="dept.dictLabel"
            :value="dept.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="提交日期" prop="applyTime">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.applyTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择提交日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="approveHeadList">
      <!-- <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="ID" align="center" prop="id"/>
      <!-- <el-table-column label="类型" align="center" prop="className"/>
      <el-table-column label="类ID" align="center" prop="classId"/>-->
      <!-- <el-table-column label="场所ID" align="center" prop="placeId" />-->
      <!--      <el-table-column label="工分记录编号" align="center">
              <template slot-scope="scope">
                {{ scope.row.workPointHead.id }}
              </template>
            </el-table-column>-->
      <el-table-column label="业务编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.workPointHead.businessNo }}
        </template>
      </el-table-column>
      <el-table-column label="单据类型" align="center">
        <template slot-scope="scope">
          {{ docTypeFormatter(scope.row.workPointHead) }}
        </template>
      </el-table-column>
      <el-table-column label="工分类型" align="center">
        <template slot-scope="scope">
          {{ pointTypeFormatter(scope.row.workPointHead) }}
        </template>
      </el-table-column>
      <el-table-column label="工分标准" align="center">
        <template slot-scope="scope">
          {{ pointStandardFormatter(scope.row.workPointHead) }}
        </template>
      </el-table-column>
      <el-table-column label="工分值" align="center">
        <template slot-scope="scope">
          {{ scope.row.workPointHead.standardScore }}
        </template>
      </el-table-column>
      <!--      <el-table-column label="审批级别" align="center" prop="approveLevel"/>-->
      <el-table-column label="单据号" align="center" prop="docNo"/>
      <!--<el-table-column label="单据ID" align="center" prop="docId" />-->
      <el-table-column label="审批状态" align="center" prop="approveState" :formatter="approveStateFormatter"/>
      <el-table-column label="提交人" align="center" prop="applyUser"/>
      <el-table-column label="提交日期" align="center" prop="applyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交原因" align="center" prop="applyReason"/>
      <!--      <el-table-column label="审批人" align="center" prop="approveUser" />-->
      <!--      <el-table-column label="附件ID" align="center" prop="attachments" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['workpoint:head:list']"
          >详情
          </el-button>
          <el-button v-show="scope.row.approveState === '1'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleApproveUpdate(scope.row)"
                     v-hasPermi="['workpoint:approveHead:edit']"
          >审批
          </el-button>
          <!--          <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                      @click="handleDelete(scope.row)"
                      v-hasPermi="['workpoint:approveHead:remove']"
                    >删除</el-button>-->
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

    <el-dialog title="审批" :visible.sync="approveUpdateOpen" append-to-body>
      <el-form ref="approveRecord" :model="approveRecord" :rules="approveRules" label-width="120px">
        <div v-show="continueApprove">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="审批结果" prop="approveResult">
                <el-select v-model="approveRecord.approveResult" @change="approveResultChange">
                  <el-option v-for="dict in approveResultDic"
                             :key="dict.dictValue"
                             :value="dict.dictValue"
                             :label="dict.dictLabel"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16" v-show="approveRecord.approveResult=== '0'">
              <el-form-item label="审批说明" prop="approveReason">
                <el-input v-model="approveRecord.approveReason" placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="10"
                v-show="approveRecord.approveResult==='1' && approveServerData.approveRecords && approveServerData.approveRecords.length +1 < approveServerData.approveLevel">
          <el-col :span="8">
            <el-form-item label="审批组" prop="auditGroup">
              <el-select v-model="approveRecord.auditGroup" filterable placeholder="请选择审批组" @change="groupChange">
                <el-option
                  v-for="item in auditGroupList"
                  :key="item.groupCode"
                  :label="item.groupName"
                  :value="item.groupCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下级审批人" prop="nextApproveUser">
              <el-select v-model="approveRecord.nextApproveUser" filterable placeholder="请选择审批人">
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

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"
                   v-hasPermi="['workpoint:approveHead:addRecord']"
                   @click="submitApproveRecordForm">确 定
        </el-button>
        <el-button @click="approveRecordCancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-drawer
      title="工分详情"
      :visible.sync="workerOpen"
      :append-to-body="true"
      :close-on-press-escape="true"
      direction="btt"
      size="500px"
      :wrapperClosable="true"
      :style="{marginLeft:'200px'}"
      style="padding:10px"
      :with-header="true">

      <el-form ref="record" :inline="true" label-width="68px">
        <el-table v-loading="loading" :data="headList" style="margin-bottom: 30px">
          <el-table-column label="业务日期" align="center" prop="businessTime"/>
          <el-table-column label="工分类型" align="center" prop="pointType" :formatter="pointTypeFormatter"/>
          <af-table-column label="工分标准" align="center" prop="pointStandard" :formatter="pointStandardFormatter"/>
          <el-table-column label="标准分值" align="center" prop="standardScore"/>
          <af-table-column label="业务编号" align="center" prop="businessNo"/>
          <af-table-column label="单据类型" align="center" prop="docType" :formatter="docTypeFormatter"/>
          <af-table-column label="通知单号" align="center" prop="docNo"/>
          <af-table-column label="寄仓客户" align="center" prop="customerName"/>
          <af-table-column label="审批状态" align="center" prop="approveState" :formatter="approveStateFormatter"/>
          <af-table-column label="备注" align="center" prop="remark"/>
        </el-table>
        <el-tabs active-name="worker" v-loading="drawLoading" style="padding: 0 10px">
          <el-tab-pane label="作业人员" name="worker">
            <el-table v-loading="loading" :data="workerRecordList" @selection-change="handleSelectionChange"
                      max-height="280px">
              <el-table-column fixed label="作业组" align="center" prop="groupCode" width="120px"
                               :formatter="groupFormatter"/>
              <af-table-column label="作业人员" prop="workerCode" :formatter="workerFormatter"/>
              <!--              <el-table-column label="工分">-->
              <af-table-column label="核定工分" align="center" prop="vouchScore"/>
              <af-table-column label="扣除工分" align="center" prop="deductScore"/>
              <af-table-column label="结余工分" align="center" prop="surplusScore"/>
              <af-table-column label="开始时间" align="center" prop="workStartTime" width="200"/>
              <af-table-column label="结束时间" align="center" prop="workOverTime" width="200"/>
              <af-table-column label="时间差(分钟)" align="center" prop="useTime"/>
              <af-table-column label="临时作业人员" align="center" prop="tempWorker">
                <template slot-scope="scope">
                  {{ workerFormatter2(scope.row.tempWorker) }}
                </template>
              </af-table-column>
              <af-table-column label="理货人/安全员" align="center" prop="tallyWorker">
                <template slot-scope="scope">
                  {{ workerFormatter2(scope.row.tallyWorker) }}
                </template>
              </af-table-column>
            </el-table>

          </el-tab-pane>
          <el-tab-pane label="作业设备" name="device">
            <el-table v-loading="loading" :data="deviceRecordList" max-height="280px">
              <el-table-column label="作业设备" align="center" prop="jobDevice" width="160px" :formatter="deviceFormatter"/>
              <af-table-column label="设备作业人员" align="center" prop="jobDeviceWorker" width="180px">
                <template slot-scope="scope">
                  {{ workerFormatter2(scope.row.jobDeviceWorker) }}
                </template>
              </af-table-column>
              <af-table-column label="设备开始时间" align="center" prop="deviceStartTime" width="200px"/>
              <af-table-column label="设备结束时间" align="center" prop="deviceOverTime" width="200px"/>
              <af-table-column label="设备耗时(分钟)" align="center" prop="deviceUseTime"/>
              <af-table-column label="设备开始里程" align="center" prop="deviceStartMileage"/>
              <af-table-column label="设备结束里程" align="center" prop="deviceOverMileage"/>
              <af-table-column label="设备耗里程" align="center" prop="deviceUseMileage"/>
              <af-table-column label="设备开始油表" align="center" prop="deviceStartOil"/>
              <af-table-column label="设备结束油表" align="center" prop="deviceOverOil"/>
              <af-table-column label="设备耗油" align="center" prop="deviceUseOil"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="审批记录" name="approve">
            <el-table v-loading="loading" :data="approveRecordList" max-height="280px">
              <el-table-column label="ID" align="center" prop="id"/>
              <!--              <el-table-column label="审批状态" align="center" prop="approveState"/>-->
              <el-table-column label="是否终审" align="center" prop="isFinally">
                <template slot-scope="scope">
                  {{ scope.row.isFinally === 1 ? '是' : '否' }}
                </template>
              </el-table-column>
              <el-table-column label="审批人" align="center" prop="approveUser">
                <template slot-scope="scope">
                  {{ userFormatter(scope.row.approveUser) }}
                </template>
              </el-table-column>
              <el-table-column label="审批时间" align="center" prop="approveTime" width="180"/>
              <el-table-column label="审批结果" align="center" prop="approveResult">
                <template slot-scope="scope">
                  {{ scope.row.approveResult === '1' ? '通过' : '不通过' }}
                </template>
              </el-table-column>
              <el-table-column label="审批说明" align="center" prop="approveReason"/>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {
  listApproveHead,
  getApproveHead,
  delApproveHead,
  addApproveHead,
  updateApproveHead, approveHeadWorkPointRecordGroup, listApproveHeadOne, approveHeadAddRecord
} from "@/api/workpoint/approveHead";
import {getUserDepts} from "@/utils/charutils";
import {listType} from "@/api/workpoint/type";
import {listDevice} from "@/api/workpoint/device";
import {listStandard} from "@/api/workpoint/standard";
import {listWorker} from "@/api/workpoint/worker";
import {listGroup} from "@/api/workpoint/group";
import {listUser} from "@/api/system/user";
import {listGroup as listAuditGroup} from "@/api/place/group";

export default {
  name: "ApproveHead",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      depts: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 审批主表表格数据
      approveHeadList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        className: undefined,
        classId: undefined,
        placeId: undefined,
        approveLevel: undefined,
        docNo: undefined,
        docId: undefined,
        approveState: undefined,
        applyUser: undefined,
        applyTime: undefined,
        applyReason: undefined,
        approveUser: undefined,
        attachments: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      workpointTypeList: [],
      workpointStandardList: [],
      docTypeOptions: [],
      approveStateOptions: [
        /*{'dictValue': '0', 'dictLabel': '未提交'},
        {'dictValue': '1', 'dictLabel': '待审批'},
        {'dictValue': '2', 'dictLabel': '审核通过'},
        {'dictValue': '3', 'dictLabel': '审核不通过'},*/
      ],
      workerOpen: false,
      drawLoading: false,
      deviceRecordList: [],
      workerRecordList: [],
      //currentData: undefined,
      allWorkers: [],
      approveRecordList: [],
      headList: [],
      approveUpdateOpen: false,
      approveRecord: {//审批记录的子对象
        id: undefined,
        parentId: undefined,
        approveState: undefined,
        isFinally: undefined,
        approveUser: undefined,
        approveResult: undefined,
        approveReason: undefined,
        remark: undefined,
        nextApproveUser: undefined,
      },
      //审批查询时返回的数据
      approveServerData: {},
      continueApprove: true, //是否继续审 控制是否显示提交审批记录的表单
      isFinallyApprove: false, //是否终审
      approveResultDic: [
        {dictValue: '1', dictLabel: '通过'},
        {dictValue: '0', dictLabel: '不通过'},
      ],
      approveRules: {
        nextApproveUser: [
          {required: true, message: '审批人不能为空', trigger: 'change'}
        ],
        approveResult: [
          {required: true, message: '审批结果不能为空', trigger: 'change'}
        ],
        approveReason: [
          {required: true, message: '审批说明不能为空', trigger: 'blur'}
        ],
      },
      rules1: { //通过只选审批结果
        approveResult: [
          {required: true, message: '审批结果不能为空', trigger: 'change'}
        ],
      },
      rules2: { //不通过
        approveResult: [
          {required: true, message: '审批结果不能为空', trigger: 'change'}
        ],
        approveReason: [
          {required: true, message: '审批说明不能为空', trigger: 'blur'}
        ],
      },
      rules3: {
        approveResult: [
          {required: true, message: '审批结果不能为空', trigger: 'change'}
        ],
        nextApproveUser: [
          {required: true, message: '审批人不能为空', trigger: 'change'}
        ],
      },

      auditUserList: [],
      auditGroupList: [],
    };
  },
  created() {
    //单据类型
    this.getDicts('workpoint_doc_type').then(response => {
      this.docTypeOptions = response.data;
    });
    this.getDicts('workpoint_approve_state').then(response => {
      this.approveStateOptions = response.data;
      this.approveStateOptions.splice(0,1)
    });
    this.getWorkpointTypeList()
    this.depts = getUserDepts('')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      //查询工分标准
      this.getWorkpointStandardDicList()
      this.getGroupList()
      this.getDeviceList()
      this.getUserList()
      this.getAuditGroupList()
      this.getList();
    }
    listWorker({}).then(response => {
      this.allWorkers = response.rows
    })
  },
  methods: {
    /** 查询审批主表列表 */
    getList() {
      this.loading = true;
      listApproveHead(this.queryParams).then(response => {
        this.approveHeadList = response.rows;
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
        className: undefined,
        classId: undefined,
        placeId: undefined,
        approveLevel: undefined,
        docNo: undefined,
        docId: undefined,
        approveState: undefined,
        applyUser: undefined,
        applyTime: undefined,
        applyReason: undefined,
        approveUser: undefined,
        attachments: undefined,
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
      this.title = "添加审批主表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.headList = []
      this.headList.push(row.workPointHead)
      // this.reset();
      // const id = row.id || this.ids
      this.workerOpen = true
      this.drawLoading = true
      approveHeadWorkPointRecordGroup(row.id).then(response => {
        this.drawLoading = false
        if (response.code === 200) {
          this.approveRecordList = response.data.approveRecordList
          if (response.data.workPointRecords.length > 0) {
            this.workerRecordList = []
            this.deviceRecordList = []
            for (let record of response.data.workPointRecords) {
              if (record.recordType === '1') {
                this.workerRecordList.push(record)
              } else if (record.recordType === '2') {
                this.deviceRecordList.push(record)
              }
            }
          }
        }
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateApproveHead(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addApproveHead(this.form).then(response => {
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
      this.$confirm('是否确认删除审批主表编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delApproveHead(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/approveHead/export', {
        ...this.queryParams
      }, `workpoint_approveHead.xlsx`)
    },
    placeChange() {
      this.getList()
      this.getGroupList()
      this.getDeviceList()
      this.getUserList()
      this.getAuditGroupList()
    },
    getUserList() {
      listUser({'deptId': this.queryParams.placeId, 'delFlag': '0'}).then(response => {
        if (response.code === 200) {
          this.userList = response.rows
          console.log(this.userList)
        }
      })
    },
    getGroupList() {//获取作业小组
      listGroup({'placeId': this.queryParams.placeId}).then(response => {
        this.groupList = response.rows;
        //console.log(response)
      });
    },
    //获取工分类型
    getWorkpointTypeList() {
      this.loading = true;
      listType({}).then(response => {
        this.workpointTypeList = response.rows;
        this.loading = false;
        //this.workpointStandardList = []
      });
    },
    //作业设备列表
    getDeviceList() {
      //jobDeviceList
      listDevice({'placeId': this.queryParams.placeId}).then(response => {
        if (response.code === 200) {
          this.jobDeviceList = response.rows
        }
      })
    },
    //工分标准列表
    getWorkpointStandardDicList() {
      this.workpointStandardOptions = []
      listStandard({'placeId': this.queryParams.placeId, 'state': '1'}).then(response => {
        this.workpointStandardOptions = response.rows;
      });
    },
    groupFormatter(row, column) {
      let group = this.groupList.find(item => item.code === row.groupCode)
      //console.log(group)
      if (group) {
        return group.name
      }
      return row.groupCode
    },
    workerFormatter(row, column) {
      let worker = this.allWorkers.find(item => item.workerCode === row.workerCode)
      if (worker) {
        return worker.workerName
      }
      return row.workerCode
    },
    workerFormatter2(code) {
      let worker = this.allWorkers.find(item => item.workerCode === code)
      if (worker) {
        return worker.workerName
      }
      return code
    },
    deviceFormatter(row, column) {
      let device = this.jobDeviceList.find(item => item.id == row.jobDevice)
      if (device) {
        return device.name
      }
      return row.jobDevice
    },
    pointTypeFormatter(row, column) {
      let type = this.workpointTypeList.find(item => item.code === row.pointType)
      if (type) {
        return type.name
      }
      return row.pointType
    },
    pointStandardFormatter(row, column) {
      let standard = this.workpointStandardOptions.find(item => item.code === row.pointStandard)
      if (standard) {
        return standard.name
      }
      return row.pointStandard
    },
    docTypeFormatter(row, column) {
      return this.selectDictLabel(this.docTypeOptions, row.docType);
    },
    approveStateFormatter(row, column) {
      return this.selectDictLabel(this.approveStateOptions, row.approveState)
    },
    userFormatter(userName, column) {
      let user = this.userList.find(item => item.userName === userName)
      if (user) {
        return user.nickName
      }
      return userName
    },
    //审批按钮
    handleApproveUpdate(row) {
      let data = {
        className: 'workPointHead',
        classId: row.workPointHead.id,
        placeId: row.workPointHead.placeId
      }
      //找到主审批记录
      listApproveHeadOne(data).then(response => {
        console.log('approve')
        console.log(response)
        if (response.code === 200) {
          this.approveUpdateOpen = true
          this.approveServerData = response.data
          this.approveRecord.parentId = this.approveServerData.id
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    groupChange(event) {
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
    },
    getAuditGroupList() {
      listAuditGroup({'placeId': this.queryParams.placeId, 'state': '1'}).then(response => {
        if (response.code === 200) {
          this.auditGroupList = response.rows
        }
      })
    },
    //审批结果改变
    approveResultChange(event) {
      if (event === '0') {//如果不通过
        // approveResult approveReason
        //则需要填写不通过的理由
        //两个值 审批结果和审批说明
        this.approveRules = this.rules2
        this.approveRecord.isFinally = 1
      } else if (event === '1') {//如果通过
        if (this.approveServerData.approveRecords && this.approveServerData.approveRecords.length + 1 < this.approveServerData.approveLevel) {
          //需要选下级审批人 approveResult  nextApproveUser
          this.approveRules = this.rules3
          this.approveRecord.isFinally = 0
        } else {
          //不选下级审批人，不用写说明只传 approveResult
          this.approveRecord.isFinally = 1
          this.approveRules = this.rules1
        }
      }
    },
    submitApproveRecordForm() {
      let that = this
      this.$refs["approveRecord"].validate(valid => {
        if (valid) {
          approveHeadAddRecord(this.approveRecord).then(response => {
            if (response.code === 200) {
              that.$message.success(response.msg)
              this.approveUpdateOpen = false
              this.getList()
              this.approveRecordCancel()
            }
          })
        }
      })
    },
    approveRecordCancel() {
      this.approveUpdateOpen = false
      this.approveRecord.approveReason = undefined
      this.approveRecord.parentId = undefined
      this.approveRecord.approveState = undefined
      this.approveRecord.isFinally = undefined
      this.approveRecord.approveUser = undefined
      this.approveRecord.approveResult = undefined
      this.approveRecord.approveReason = undefined
      this.approveRecord.remark = undefined
      this.approveRecord.nextApproveUser = undefined
    },
  }
};
</script>
