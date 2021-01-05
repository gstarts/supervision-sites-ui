<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入场所ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="父级ID" prop="headId">
        <el-input
          v-model="queryParams.headId"
          placeholder="请输入父级ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作业小组" prop="groupCode">
        <el-input
          v-model="queryParams.groupCode"
          placeholder="请输入作业小组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作业人员" prop="workerCode">
        <el-input
          v-model="queryParams.workerCode"
          placeholder="请输入作业人员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="核定工分" prop="vouchScore">
        <el-input
          v-model="queryParams.vouchScore"
          placeholder="请输入核定工分"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="扣除工分" prop="deductScore">
        <el-input
          v-model="queryParams.deductScore"
          placeholder="请输入扣除工分"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结余工分" prop="surplusScore">
        <el-input
          v-model="queryParams.surplusScore"
          placeholder="请输入结余工分"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="通知单号" prop="docNo">
        <el-input
          v-model="queryParams.docNo"
          placeholder="请输入通知单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据类型" prop="docType">
        <el-select v-model="queryParams.docType" placeholder="请选择单据类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="寄仓客户" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
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
      <el-form-item label="业务日期" prop="businessTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.businessTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择业务日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工分类型" prop="pointTypeCode">
        <el-input
          v-model="queryParams.pointTypeCode"
          placeholder="请输入工分类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工分标准" prop="pointStandardCode">
        <el-input
          v-model="queryParams.pointStandardCode"
          placeholder="请输入工分标准"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标准分数" prop="standardSocre">
        <el-input
          v-model="queryParams.standardSocre"
          placeholder="请输入标准分数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计分车数" prop="vehicleCount">
        <el-input
          v-model="queryParams.vehicleCount"
          placeholder="请输入计分车数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="开始时间" prop="workStartTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.workStartTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="workOverTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.workOverTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间差(分钟)" prop="useTime">
        <el-input
          v-model="queryParams.useTime"
          placeholder="请输入时间差(分钟)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="临时作业人员" prop="tempWorker">
        <el-input
          v-model="queryParams.tempWorker"
          placeholder="请输入临时作业人员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="理货人/安全员" prop="tallyWorker">
        <el-input
          v-model="queryParams.tallyWorker"
          placeholder="请输入理货人/安全员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作业设备" prop="jobDevice">
        <el-input
          v-model="queryParams.jobDevice"
          placeholder="请输入作业设备"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备作业人员" prop="jobDeviceWorker">
        <el-input
          v-model="queryParams.jobDeviceWorker"
          placeholder="请输入设备作业人员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备开始时间" prop="deviceStartTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.deviceStartTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择设备开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="设备结束时间" prop="deviceOverTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.deviceOverTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择设备结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="设备耗时(分钟)" prop="deviceUseTime">
        <el-input
          v-model="queryParams.deviceUseTime"
          placeholder="请输入设备耗时(分钟)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备开始里程" prop="deviceStartMileage">
        <el-input
          v-model="queryParams.deviceStartMileage"
          placeholder="请输入设备开始里程"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备结束里程" prop="deviceOverMileage">
        <el-input
          v-model="queryParams.deviceOverMileage"
          placeholder="请输入设备结束里程"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备耗里程" prop="deviceUseMileage">
        <el-input
          v-model="queryParams.deviceUseMileage"
          placeholder="请输入设备耗里程"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备开始油表" prop="deviceStartOil">
        <el-input
          v-model="queryParams.deviceStartOil"
          placeholder="请输入设备开始油表"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备结束油表" prop="deviceOverOil">
        <el-input
          v-model="queryParams.deviceOverOil"
          placeholder="请输入设备结束油表"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备耗油" prop="deviceUseOil">
        <el-input
          v-model="queryParams.deviceUseOil"
          placeholder="请输入设备耗油"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['workpoint:record:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['workpoint:record:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['workpoint:record:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['workpoint:record:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="recordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="场所ID" align="center" prop="placeId" />
      <el-table-column label="父级ID" align="center" prop="headId" />
      <el-table-column label="作业小组" align="center" prop="groupCode" />
      <el-table-column label="作业人员" align="center" prop="workerCode" />
      <el-table-column label="核定工分" align="center" prop="vouchScore" />
      <el-table-column label="扣除工分" align="center" prop="deductScore" />
      <el-table-column label="结余工分" align="center" prop="surplusScore" />
      <el-table-column label="通知单号" align="center" prop="docNo" />
      <el-table-column label="单据类型" align="center" prop="docType" />
      <el-table-column label="寄仓客户" align="center" prop="customerName" />
      <el-table-column label="车牌号" align="center" prop="vehicleNo" />
      <el-table-column label="业务日期" align="center" prop="businessTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工分类型" align="center" prop="pointTypeCode" />
      <el-table-column label="工分标准" align="center" prop="pointStandardCode" />
      <el-table-column label="标准分数" align="center" prop="standardSocre" />
      <el-table-column label="计分车数" align="center" prop="vehicleCount" />
      <el-table-column label="业务编号" align="center" prop="businessNo" />
      <el-table-column label="开始时间" align="center" prop="workStartTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workStartTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="workOverTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.workOverTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间差(分钟)" align="center" prop="useTime" />
      <el-table-column label="临时作业人员" align="center" prop="tempWorker" />
      <el-table-column label="理货人/安全员" align="center" prop="tallyWorker" />
      <el-table-column label="作业设备" align="center" prop="jobDevice" />
      <el-table-column label="设备作业人员" align="center" prop="jobDeviceWorker" />
      <el-table-column label="设备开始时间" align="center" prop="deviceStartTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deviceStartTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备结束时间" align="center" prop="deviceOverTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deviceOverTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备耗时(分钟)" align="center" prop="deviceUseTime" />
      <el-table-column label="设备开始里程" align="center" prop="deviceStartMileage" />
      <el-table-column label="设备结束里程" align="center" prop="deviceOverMileage" />
      <el-table-column label="设备耗里程" align="center" prop="deviceUseMileage" />
      <el-table-column label="设备开始油表" align="center" prop="deviceStartOil" />
      <el-table-column label="设备结束油表" align="center" prop="deviceOverOil" />
      <el-table-column label="设备耗油" align="center" prop="deviceUseOil" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['workpoint:record:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['workpoint:record:remove']"
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

    <!-- 添加或修改工分记录对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="场所ID" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所ID" />
        </el-form-item>
        <el-form-item label="父级ID" prop="headId">
          <el-input v-model="form.headId" placeholder="请输入父级ID" />
        </el-form-item>
        <el-form-item label="作业小组" prop="groupCode">
          <el-input v-model="form.groupCode" placeholder="请输入作业小组" />
        </el-form-item>
        <el-form-item label="作业人员" prop="workerCode">
          <el-input v-model="form.workerCode" placeholder="请输入作业人员" />
        </el-form-item>
        <el-form-item label="核定工分" prop="vouchScore">
          <el-input v-model="form.vouchScore" placeholder="请输入核定工分" />
        </el-form-item>
        <el-form-item label="扣除工分" prop="deductScore">
          <el-input v-model="form.deductScore" placeholder="请输入扣除工分" />
        </el-form-item>
        <el-form-item label="结余工分" prop="surplusScore">
          <el-input v-model="form.surplusScore" placeholder="请输入结余工分" />
        </el-form-item>
        <el-form-item label="通知单号" prop="docNo">
          <el-input v-model="form.docNo" placeholder="请输入通知单号" />
        </el-form-item>
        <el-form-item label="单据类型">
          <el-select v-model="form.docType" placeholder="请选择单据类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="寄仓客户" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入寄仓客户" />
        </el-form-item>
        <el-form-item label="车牌号" prop="vehicleNo">
          <el-input v-model="form.vehicleNo" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="业务日期" prop="businessTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.businessTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择业务日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工分类型" prop="pointTypeCode">
          <el-input v-model="form.pointTypeCode" placeholder="请输入工分类型" />
        </el-form-item>
        <el-form-item label="工分标准" prop="pointStandardCode">
          <el-input v-model="form.pointStandardCode" placeholder="请输入工分标准" />
        </el-form-item>
        <el-form-item label="标准分数" prop="standardSocre">
          <el-input v-model="form.standardSocre" placeholder="请输入标准分数" />
        </el-form-item>
        <el-form-item label="计分车数" prop="vehicleCount">
          <el-input v-model="form.vehicleCount" placeholder="请输入计分车数" />
        </el-form-item>
        <el-form-item label="业务编号" prop="businessNo">
          <el-input v-model="form.businessNo" placeholder="请输入业务编号" />
        </el-form-item>
        <el-form-item label="开始时间" prop="workStartTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.workStartTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="workOverTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.workOverTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时间差(分钟)" prop="useTime">
          <el-input v-model="form.useTime" placeholder="请输入时间差(分钟)" />
        </el-form-item>
        <el-form-item label="临时作业人员" prop="tempWorker">
          <el-input v-model="form.tempWorker" placeholder="请输入临时作业人员" />
        </el-form-item>
        <el-form-item label="理货人/安全员" prop="tallyWorker">
          <el-input v-model="form.tallyWorker" placeholder="请输入理货人/安全员" />
        </el-form-item>
        <el-form-item label="作业设备" prop="jobDevice">
          <el-input v-model="form.jobDevice" placeholder="请输入作业设备" />
        </el-form-item>
        <el-form-item label="设备作业人员" prop="jobDeviceWorker">
          <el-input v-model="form.jobDeviceWorker" placeholder="请输入设备作业人员" />
        </el-form-item>
        <el-form-item label="设备开始时间" prop="deviceStartTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.deviceStartTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择设备开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="设备结束时间" prop="deviceOverTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.deviceOverTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择设备结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="设备耗时(分钟)" prop="deviceUseTime">
          <el-input v-model="form.deviceUseTime" placeholder="请输入设备耗时(分钟)" />
        </el-form-item>
        <el-form-item label="设备开始里程" prop="deviceStartMileage">
          <el-input v-model="form.deviceStartMileage" placeholder="请输入设备开始里程" />
        </el-form-item>
        <el-form-item label="设备结束里程" prop="deviceOverMileage">
          <el-input v-model="form.deviceOverMileage" placeholder="请输入设备结束里程" />
        </el-form-item>
        <el-form-item label="设备耗里程" prop="deviceUseMileage">
          <el-input v-model="form.deviceUseMileage" placeholder="请输入设备耗里程" />
        </el-form-item>
        <el-form-item label="设备开始油表" prop="deviceStartOil">
          <el-input v-model="form.deviceStartOil" placeholder="请输入设备开始油表" />
        </el-form-item>
        <el-form-item label="设备结束油表" prop="deviceOverOil">
          <el-input v-model="form.deviceOverOil" placeholder="请输入设备结束油表" />
        </el-form-item>
        <el-form-item label="设备耗油" prop="deviceUseOil">
          <el-input v-model="form.deviceUseOil" placeholder="请输入设备耗油" />
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
import { listRecord, getRecord, delRecord, addRecord, updateRecord } from "@/api/workpoint/record";

export default {
  name: "Record",
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
      // 工分记录表格数据
      recordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
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
        standardSocre: undefined,
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
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询工分记录列表 */
    getList() {
      this.loading = true;
      listRecord(this.queryParams).then(response => {
        this.recordList = response.rows;
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
        standardSocre: undefined,
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
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加工分记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRecord(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工分记录";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateRecord(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addRecord(this.form).then(response => {
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
      this.$confirm('是否确认删除工分记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRecord(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('workpoint/record/export', {
        ...this.queryParams
      }, `workpoint_record.xlsx`)
    }
  }
};
</script>
