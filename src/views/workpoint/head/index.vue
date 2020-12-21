<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          @change="placeChange"
          v-model="queryParams.placeId" placeholder="请选择场所" clearable size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务日期" prop="businessTime">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.businessTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择业务日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工分类型" prop="pointType">
        <el-select v-model="queryParams.pointType" placeholder="请选择工分类型" clearable size="small">
          <el-option label="请选择字典生成" value=""/>
        </el-select>
      </el-form-item>
      <el-form-item label="工分标准" prop="pointStandard">
        <el-input
          v-model="queryParams.pointStandard"
          placeholder="请输入工分标准"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="计分车数" prop="vehicleCount">
              <el-input
                v-model="queryParams.vehicleCount"
                placeholder="请输入计分车数"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <el-form-item label="通知单号" prop="docNo">
        <el-input
          v-model="queryParams.docNo"
          placeholder="请输入通知单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="通知单ID" prop="docId">
              <el-input
                v-model="queryParams.docId"
                placeholder="请输入通知单ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"/>
            </el-form-item>-->
      <el-form-item label="业务编号" prop="businessNo">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入业务编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据类型" prop="docType">
        <el-select v-model="queryParams.docType" placeholder="请选择单据类型" clearable size="small">
          <el-option label="请选择字典生成" value=""/>
        </el-select>
      </el-form-item>
      <el-form-item label="寄仓客户" prop="costumerName">
        <el-input
          v-model="queryParams.costumerName"
          placeholder="请输入寄仓客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车牌号" prop="vehicleNo">
        <el-input
          v-model="queryParams.vehicleNo"
          placeholder="请输入车牌号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="车型" prop="vehicleType">
              <el-select v-model="queryParams.vehicleType" placeholder="请选择车型" clearable size="small">
                <el-option label="请选择字典生成" value=""/>
              </el-select>
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
      <el-form-item label="业务部门" prop="businessDept">
        <el-input
          v-model="queryParams.businessDept"
          placeholder="请输入业务部门"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批状态" prop="approveState">
        <el-select v-model="queryParams.approveState"
                   placeholder="请输入审批状态"
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
          v-hasPermi="['workpoint:head:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['workpoint:head:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['workpoint:head:remove']"
        >删除
        </el-button>
      </el-col>
      <!--<el-col :span="1.5">
              <el-button
                type="warning"
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                v-hasPermi="['workpoint:head:export']"
              >导出
              </el-button>
            </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="headList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center"/>-->
      <af-table-column label="单据号" align="center" prop="id"/>
      <af-table-column label="场所" align="center" prop="placeId"/>
      <af-table-column label="业务日期" align="center" prop="businessTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessTime, '{y}-{m}-{d}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="工分类型" align="center" prop="pointType"/>
      <af-table-column label="工分标准" align="center" prop="pointStandard"/>
      <af-table-column label="标准分值" align="center" prop="standardScore"/>
      <af-table-column label="计分车数" align="center" prop="vehicleCount"/>
      <af-table-column label="通知单号" align="center" prop="docNo"/>
      <af-table-column label="通知单ID" align="center" prop="docId"/>
      <af-table-column label="业务编号" align="center" prop="businessNo"/>
      <af-table-column label="单据类型" align="center" prop="docType"/>
      <af-table-column label="寄仓客户" align="center" prop="costumerName"/>
      <af-table-column label="车牌号" align="center" prop="vehicleNo"/>
      <af-table-column label="车型" align="center" prop="vehicleType"/>
      <!--<el-table-column label="状态" align="center" prop="state"/>-->
      <af-table-column label="业务部门" align="center" prop="businessDept"/>
      <af-table-column label="审批状态" align="center" prop="approveState"/>
      <af-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="140px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['workpoint:head:edit']">修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleUpdateWorkers(scope.row)"
            v-hasPermi="['workpoint:head:edit']">作业人员
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-submit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['workpoint:head:edit']">提交
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['workpoint:head:remove']"
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
      @pagination="getList"/>
    <!-- 添加或修改工分信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="单据类型" prop="docType">
              <el-select
                v-model="form.docType" placeholder="请选择单据类型" clearable size="small">
                <el-option
                  v-for="dic in docTypeOptions"
                  :key="dic.dictValue"
                  :label="dic.dictLabel"
                  :value="dic.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工分类型" prop="pointType">
              <el-select v-model="form.pointType" placeholder="请选择工分类型" @change="pointTypeChange">
                <el-option
                  v-for="dept in workpointTypeList"
                  :key="dept.code"
                  :label="dept.name"
                  :value="dept.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工分标准" prop="pointStandard">
              <el-select v-model="form.pointStandard" placeholder="请选择工分标准" @change="standardChange">
                <el-option
                  v-for="dept in workpointStandardList"
                  :key="dept.code"
                  :label="dept.name+' ['+dept.score+'分]'"
                  :value="dept.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="业务编号" prop="businessNo">
              <el-input v-model="form.businessNo" placeholder="请输入业务编号" @keyup.enter.native="getDocByBusinessNo"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通知单号" prop="docNo">
              <el-input v-model="form.docNo" placeholder="请输入通知单号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务日期" prop="businessTime">
              <el-date-picker clearable size="small"
                              v-model="form.businessTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择业务日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="寄仓客户" prop="costumerName">
              <el-input v-model="form.costumerName" placeholder="请输入寄仓客户"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车牌号" prop="vehicleNo">
              <el-input v-model="form.vehicleNo" placeholder="请输入车牌号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车型">
              <el-input v-model="form.vehicleType" placeholder="请输入车型">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="计分车数" prop="vehicleCount">
              <el-input v-model="form.vehicleCount" placeholder="请输入计分车数"/>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="8">
                      <el-form-item label="状态" prop="state">
                        <el-input v-model="form.state" placeholder="请输入状态"/>
                      </el-form-item>
                    </el-col>-->
          <el-col :span="8">
            <el-form-item label="业务部门" prop="businessDept">
              <el-input v-model="form.businessDept" placeholder="请输入业务部门"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        <el-form-item label="审批状态" prop="approveState">
                  <el-input v-model="form.approveState" placeholder="请输入审批状态"/>
                </el-form-item>-->
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
      <el-table v-show="form.docType==='1'" v-loading="loading" :data="instoreDocList" max-height="220px"
                style="cursor: pointer"
                @row-dblclick="copyToInDoc">
        <!--    <el-table-column label="ID" align="center" prop="id"/>-->
        <af-table-column label="入库单号" align="center" prop="inDocNo"/>
        <af-table-column label="业务编号" align="center" prop="businessNo"/>
        <af-table-column label="业务日期" align="center" prop="updateTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
          </template>
        </af-table-column>
        <af-table-column label="寄仓客户" align="center" prop="checkConsumer"/>
        <af-table-column label="车牌号" align="center" prop="vehicleNo"/>
        <af-table-column label="状态" align="center" prop="state"/>
      </el-table>

    </el-dialog>
    <el-drawer
      title="编辑作业人员"
      :visible.sync="workerOpen"
      :append-to-body="true"
      :close-on-press-escape="false"
      direction="btt"
      size="550px"
      :wrapperClosable="false"
      :style="{marginLeft:'200px'}"
      :before-close="drawBeforeClose"
      :with-header="true">
      <el-form :model="workers" ref="workers" :inline="true" label-width="68px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="作业小组" prop="docType">
              <el-select v-model="workers.groupCode" placeholder="请选择作业小组" size="small" @change="getWorkerList">
                <el-option v-for="group in groupList"
                           :key="group.code"
                           :value="group.code"
                           :label="group.name"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="recordList" @selection-change="handleSelectionChange" max-height="300px">
          <!-- <el-table-column type="selection" width="55" align="center"/>-->
          <af-table-column label="单据号" align="center" prop="id"/>
          <af-table-column label="作业组" align="center" prop="groupCode" :formatter="groupFormatter"/>
          <af-table-column label="作业人员" prop="workerCode" :formatter="workerFormatter"/>
          <af-table-column label="核定工分" align="center" prop="vouchScore">
            <template slot-scope="scope">
              <el-input v-model="scope.row.vouchScore" size="mini"></el-input>
            </template>
          </af-table-column>
          <af-table-column label="扣除工分" align="center" prop="deductScore">
            <template slot-scope="scope">
              <el-input v-model="scope.row.deductScore" size="mini"></el-input>
            </template>
          </af-table-column>
          <af-table-column label="结余工分" align="center" prop="surplusScore">
            <template slot-scope="scope">
              <el-input v-model="scope.row.surplusScore" size="mini"></el-input>
            </template>
          </af-table-column>
          <!--          <el-table-column label="通知单号" align="center" prop="docNo"/>
                    <el-table-column label="单据类型" align="center" prop="docType"/>
                    <el-table-column label="寄仓客户" align="center" prop="customerName"/>
                    <el-table-column label="车牌号" align="center" prop="vehicleNo"/>
                    <el-table-column label="业务日期" align="center" prop="businessTime" width="180">
                      <template slot-scope="scope">
                        <span>{{ parseTime(scope.row.businessTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
                      </template>
                    </el-table-column>-->
          <!--          <el-table-column label="工分类型" align="center" prop="pointTypeCode"/>
                    <el-table-column label="工分标准" align="center" prop="pointStandardCode"/>
                    <el-table-column label="标准分数" align="center" prop="standardScore"/>
                    <el-table-column label="计分车数" align="center" prop="vehicleCount"/>
                    <el-table-column label="业务编号" align="center" prop="businessNo"/>-->
          <af-table-column label="开始时间" align="center" prop="workStartTime" width="190">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.workStartTime" type="datetime"
                              placeholder="选择日期时间" size="mini" style="width:180px">
              </el-date-picker>
            </template>
          </af-table-column>
          <af-table-column label="结束时间" align="center" prop="workOverTime" width="190">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.workOverTime" type="datetime"
                              placeholder="选择日期时间" size="mini" style="width:180px">
              </el-date-picker>
            </template>
          </af-table-column>
          <af-table-column label="时间差(分钟)" align="center" prop="useTime"/>
          <af-table-column label="临时作业人员" align="center" prop="tempWorker">
            <template slot-scope="scope">
              <el-select v-model="scope.row.tempWorker" placeholder="请选择临时作业人员" size="mini">
                <el-option v-for="worker in allWorkers"
                           :key="worker.workerCode"
                           :value="group.workerCode"
                           :label="group.workerName"/>
              </el-select>
            </template>
          </af-table-column>
          <af-table-column label="理货人/安全员" align="center" prop="tallyWorker">
            <template slot-scope="scope">
              <el-select v-model="scope.row.tallyWorker" placeholder="请选择理货人/安全员" size="mini">
                <el-option v-for="worker in allWorkers"
                           :key="worker.workerCode"
                           :value="group.workerCode"
                           :label="group.workerName"/>
              </el-select>
            </template>
          </af-table-column>
          <af-table-column label="作业设备" align="center" prop="jobDevice"/>
          <af-table-column label="设备作业人员" align="center" prop="jobDeviceWorker"/>
          <af-table-column label="设备开始时间" align="center" prop="deviceStartTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.deviceStartTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
            </template>
          </af-table-column>
          <el-table-column label="设备结束时间" align="center" prop="deviceOverTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.deviceOverTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备耗时(分钟)" align="center" prop="deviceUseTime"/>
          <el-table-column label="设备开始里程" align="center" prop="deviceStartMileage"/>
          <el-table-column label="设备结束里程" align="center" prop="deviceOverMileage"/>
          <el-table-column label="设备耗里程" align="center" prop="deviceUseMileage"/>
          <el-table-column label="设备开始油表" align="center" prop="deviceStartOil"/>
          <el-table-column label="设备结束油表" align="center" prop="deviceOverOil"/>
          <el-table-column label="设备耗油" align="center" prop="deviceUseOil"/>

        </el-table>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {listHead, getHead, delHead, addHead, updateHead} from "@/api/workpoint/head";
import {getUserDepts} from "@/utils/charutils";
import {listType} from "@/api/workpoint/type";
import {listStandard} from "@/api/workpoint/standard";
import {listInstore_doc} from "@/api/tax/instore_doc";
import store from "@/store";
import {listGroup} from "@/api/workpoint/group";
import {listWorker} from "@/api/workpoint/worker";

export default {
  name: "Head",
  data() {
    return {
      sidebar: undefined,
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
      // 工分信息表格数据
      headList: [],
      recordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      workerOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        businessTime: undefined,
        pointType: undefined,
        pointStandard: undefined,
        vehicleCount: undefined,
        docNo: undefined,
        docId: undefined,
        businessNo: undefined,
        docType: undefined,
        costumerName: undefined,
        vehicleNo: undefined,
        vehicleType: undefined,
        state: undefined,
        businessDept: undefined,
        approveState: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      workpointTypeList: [],
      workpointStandardList: [],
      docTypeOptions: [],
      instoreDocList: [],
      outstoreDocList: [],
      approveStateOptions: [
        {'dictValue': '0', 'dictLabel': '未提交'},
        {'dictValue': '1', 'dictLabel': '待审核'},
        {'dictValue': '2', 'dictLabel': '审核通过'},
        {'dictValue': '3', 'dictLabel': '审核不通过'},
      ],
      allWorkers: [],
      workers: {},
      groupList: [],
      record: {
        id: undefined,
        placeId: undefined,
        headId: undefined,
        groupCode: undefined,
        workerCode: undefined,
        vouchScore: undefined,
        deductScore: undefined,
        surplusScore: undefined,
        docNo: undefined,
        docType: undefined,
        customerName: undefined,
        vehicleNo: undefined,
        businessTime: undefined,
        pointTypeCode: undefined,
        pointStandardCode: undefined,
        standardScore: undefined,
        vehicleCount: undefined,
        businessNo: undefined,
        workStartTime: undefined,
        workOverTime: undefined,
        useTime: undefined,
        tempWorker: undefined,
        tallyWorker: undefined,
        jobDevice: undefined,
        jobDeviceWorker: undefined,
        deviceStartTime: undefined,
        deviceOverTime: undefined,
        deviceUseTime: undefined,
        deviceStartMileage: undefined,
        deviceOverMileage: undefined,
        deviceUseMileage: undefined,
        deviceStartOil: undefined,
        deviceOverOil: undefined,
        deviceUseOil: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined
      },
    }
  },
  created() {
    //单据类型
    this.getDicts('workpoint_doc_type').then(response => {
      this.docTypeOptions = response.data;
    });

    //获取工分类型
    this.getWorkpointTypeList()
    this.depts = getUserDepts('')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
      //查询工分标准
      this.getGroupList()
      //this.getWorkpointStandardList()
    }
    this.sidebar = store.getters.sidebar
    //获取所有的工人名单
    listWorker({}).then(response => {
      this.allWorkers = response.rows
    })
  },
  methods: {
    /** 查询工分信息列表 */
    getList() {
      this.loading = true;
      listHead(this.queryParams).then(response => {
        this.headList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.instoreDocList = []
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        placeId: undefined,
        businessTime: undefined,
        pointType: undefined,
        pointStandard: undefined,
        vehicleCount: undefined,
        docNo: undefined,
        docId: undefined,
        businessNo: undefined,
        docType: undefined,
        costumerName: undefined,
        vehicleNo: undefined,
        vehicleType: undefined,
        state: undefined,
        businessDept: undefined,
        approveState: undefined,
        createTime: undefined,
        createBy: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        standardScore: undefined,
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
      this.title = "添加工分信息";
      this.form.placeId = this.queryParams.placeId
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHead(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工分信息";
      });
    },
    /** 修改人员按钮操作 */
    handleUpdateWorkers(row) {
      //this.reset();
      this.workerOpen = true
      //设置表单内容
      ///...
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateHead(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addHead(this.form).then(response => {
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
      this.$confirm('是否确认删除工分信息编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delHead(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/head/export', {
        ...this.queryParams
      }, `workpoint_head.xlsx`)
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
    /** 查询 工分标准列表 */
    getWorkpointStandardList(code) {
      //this.loading = true
      this.workpointStandardList = []
      listStandard({'placeId': this.form.placeId, 'state': '1', 'pointCode': code}).then(response => {
        this.workpointStandardList = response.rows;
        // this.loading = false;
      });
    },
    placeChange() { //场所变化
      //this.getWorkpointStandardList()
      this.getList()
      this.getGroupList()
    },
    //工分类型变化
    pointTypeChange(event) {
      this.getWorkpointStandardList(event)
    },
    //通过业务编号获取对应的通知单信息
    getDocByBusinessNo() {
      if (!this.form.placeId || !this.form.docType) {
        return false
      }
      if (this.form.placeId === 104) {//金航
        switch (this.form.docType) {
          case '1': //入库单
            listInstore_doc({
              'state': '1',
              'placeId': this.form.placeId,
              'businessNo': this.form.businessNo
            }).then(response => {
              if (response.code === 200) {
                console.log(response.rows)
                this.instoreDocList = response.rows
              }
            }).catch(err => {
              console.log(err)
              this.$message.error("未找到对应的单据")
              return false
            })
            break
          case '0':
            break
          default:
            break
        }
      }
    },
    //双击表格行，将row的信息赋值给工分信息表
    copyToInDoc(row) {
      this.form.docNo = row.inDocNo
      this.form.costumerName = row.checkConsumer
      this.form.vehicleNo = row.vehicleNo
      this.form.vehicleCount = 1
      this.form.state = row.state
      this.form.businessTime = row.updateTime
      this.form.businessNo = row.businessNo
      this.form.docId = row.id
    },
    standardChange(event) {
      let stand = this.workpointStandardList.find(item => item.code === event)
      if (stand) {
        this.form.standardScore = stand.score
      }
    },
    drawBeforeClose() {
      this.workerOpen = false
    },
    getGroupList() {//获取作业小组
      listGroup({'placeId': this.queryParams.placeId}).then(response => {
        this.groupList = response.rows;
        //console.log(response)
      });
    },
    getWorkerList(event) {//小组变化时，变更表格里面的人员
      let works = this.groupList.find(item => item.code === event)
      if (works != null) {
        this.workerList = works.jobWorkerList
        this.workers.workerCode = []
        console.log(this.workerList)
        for (let work of this.workerList) {
          console.log(work)
          let worker = {...this.record}
          worker.workerCode = work.workerCode
          worker.groupCode = event
          this.plusWorker(worker)
        }
      }
    },
    plusWorker(worker) {
      let workerIn = this.recordList.find(item => item.workerCode === worker.workerCode)
      if (!workerIn) {
        this.recordList.push(worker)
      }
    },
    reduceWorker(worker) {

    },
    groupFormatter(row, column) {
      let group = this.groupList.find(item => item.code === row.groupCode)
      if (group) {
        return group.name
      }
      return row.groupCode
    },
    workerFormatter(row, column) {
      let worker = this.workerList.find(item => item.workerCode === row.workerCode)
      if (worker) {
        return worker.workerName
      }
      return row.workerCode
    }

  }
};
</script>
