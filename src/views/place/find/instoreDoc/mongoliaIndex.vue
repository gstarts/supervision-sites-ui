<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryParams" :inline="true" label-width="100px">
      <el-row>
        <el-form-item label="场所名称" prop="placeId">
          <el-select v-model="queryParams.placeId" placeholder="请选择场所" size="small" @change="handleQuery">
            <el-option
              v-for="dept in depts"
              :key="dept.deptId"
              :label="dept.deptName"
              :value="dept.deptId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="寄仓客户" prop="checkConsumer">
          <el-input
            v-model="queryParams.checkConsumer"
            placeholder="请输入寄仓客户"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="品名" prop="goodsName">
          <el-input
            v-model="queryParams.goodsName"
            placeholder="请输入货物名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态" prop="storeState">
          <el-select
            v-model="queryParams.storeState" placeholder="请选择状态" clearable size="small" @change="handleQuery">
            <el-option
              v-for="dept in inStoreOption"
              :key="dept.dictValue"
              :label="dept.dictLabel"
              :value="dept.dictValue"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="入场时间" prop="inTime">
          <el-date-picker
            v-model="dateRangeInTime"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出场时间" prop="outTime">
          <el-date-picker
            v-model="dateRangeOutTime"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="境外发车时间" prop="overseasDepartureDate">
          <el-date-picker
            v-model="overseasDepartureDate"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入库完成时间" prop="inCompleteTime">
          <el-date-picker
            v-model="inCompleteTime"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <div v-show="highSearch">
        <el-form-item label="寄仓合同号" prop="checkContractNo">
          <el-input
            v-model="queryParams.checkContractNo"
            placeholder="请输入寄仓合同号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="采购合同号" prop="purchaseContractNumber">
          <el-input
            v-model="queryParams.purchaseContractNumber"
            placeholder="请输入采购合同号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="车号" prop="vehicleNo">
          <el-input
            v-model="queryParams.vehicleNo"
            placeholder="请输入车号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="库位号" prop="storeCode">
          <el-input
            v-model="queryParams.storeCode"
            placeholder="请输入库位号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="集装箱号" prop="containerNo1">
          <el-input
            v-model="queryParams.containerNo1"
            placeholder="请输入集装箱号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="车型" prop="vehicleType">
          <el-input
            v-model="queryParams.vehicleType"
            placeholder="请输入车型"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="运输单位" prop="vehicleTeam">
          <el-input
            v-model="queryParams.vehicleTeam"
            placeholder="请输入运输单位"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item label="包装方式" prop="packMode">
          <el-select
            v-model="queryParams.packMode" placeholder="请选择包装方式" size="small" @change="handleQuery">
            <el-option
              v-for="dept in packModeOption"
              :key="dept.dictValue"
              :label="dept.dictLabel"
              :value="dept.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="入场司磅员" prop="inUser">
          <el-input
            v-model="queryParams.inUser"
            placeholder="请输入入场司磅员"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="出场司磅员" prop="outUser">
          <el-input
            v-model="queryParams.outUser"
            placeholder="请输入出场司磅员"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
      </div>
      <!--      <el-form-item label="查询时间类型" prop="queryLogo">
              <el-select
                v-model="queryParams.queryLogo" placeholder="请选择查询时间类型" size="small">
                <el-option
                  v-for="dept in timeQueryTypeOption"
                  :key="dept.dictValue"
                  :label="dept.dictLabel"
                  :value="dept.dictValue"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="时间" prop="startTime">
              <el-date-picker
                v-model="dateRange"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="highSearch = !highSearch">高级搜索</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-col :span="1.5">
          <el-button
            type="warning"
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
          >导出
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['place:instoreDoc:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:instoreDoc:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:instoreDoc:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:instoreDoc:export']"
        >导出</el-button>
      </el-col>
    </el-row> -->

    <el-table v-loading="loading" :data="instoreDocList" show-summary :summary-method="getSummaries" height="645">
      <!--    <el-table v-loading="loading" :data="instoreDocList" height="645">-->
      <!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="入库单号" align="center" prop="id"/>
      <af-table-column label="寄仓客户" align="center" prop="checkConsumer"/>

      <af-table-column label="寄仓合同号" align="center" prop="checkContractNo"/>
      <el-table-column label="品名" align="center" prop="goodsName"/>
      <el-table-column label="车辆信息" align="center">
        <el-table-column label="车号" align="center" prop="vehicleNo" width="90"/>
        <el-table-column label="车数" align="center" prop="vehicleCount"/>
        <!--          <template slot-scope="scope">1</template>
                </el-table-column>-->
      </el-table-column>
      <el-table-column label="场所" align="center">
        <el-table-column label="毛重" align="center" prop="roughWeight">
          <template slot-scope="scope">
            <span>{{ (scope.row.roughWeight).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="皮重" align="center" prop="tareWeight">
          <template slot-scope="scope">
            <span>{{ (scope.row.tareWeight).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="箱皮重" align="center" prop="boxTareWeight">
          <template slot-scope="scope">
            <span>{{ (scope.row.boxTareWeight).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="净重" align="center" prop="netWeight">
          <template slot-scope="scope">
            <span>{{ (scope.row.netWeight).toFixed(2) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="进场时间" align="center" prop="inTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出场时间" align="center" prop="outTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.outTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <af-table-column label="库位号" align="center" prop="storeCodeAll"/>
      <el-table-column label="蒙古磅单" align="center">
        <af-table-column label="蒙方磅单号" align="center" prop="mongoliaBillNo"/>
        <el-table-column label="蒙方毛重" align="center" prop="mongoliaRoughWeight">
          <template slot-scope="scope">
            <span>{{ (scope.row.mongoliaRoughWeight).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <af-table-column label="蒙古磅皮重" align="center" prop="mongoliaTareWeight">
          <template slot-scope="scope">
            <span>{{ (scope.row.mongoliaTareWeight).toFixed(2) }}</span>
          </template>
        </af-table-column>
        <af-table-column label="蒙古磅净重" align="center" prop="mongoliaNetWeight">
          <template slot-scope="scope">
            <span>{{ (scope.row.mongoliaNetWeight).toFixed(2) }}</span>
          </template>
        </af-table-column>
      </el-table-column>
      <el-table-column label="集装箱号" align="center" prop="containerNoAll"/>
      <el-table-column label="供应商" align="center" prop="supplier"/>
      <af-table-column label="采购合同号" align="center" prop="purchaseContractNumber"/>
      <af-table-column label="采购单价" align="center" prop="purPrice"/>
      <el-table-column label="境外出库日期" align="center" prop="mongolianDeliveryDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.mongolianDeliveryDate, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运输单位" align="center" prop="vehicleTeam"/>
      <el-table-column label="计量单位" align="center" prop="measuringUnit">
        <template>
          <span>t</span>
        </template>
      </el-table-column>
      <el-table-column label="入境日期" align="center" prop="entryDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.entryDate, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报关日期" align="center" prop="customsDeclarationDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.customsDeclarationDate, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报关量" align="center" prop="customsWeight"/>
      <el-table-column label="报关单号" align="center" prop="customsDeclarationNumber"/>
      <el-table-column label="国检放行日期" align="center" prop="nationalInspectionReleaseDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.nationalInspectionReleaseDate, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包装方式" align="center" prop="packMode" :formatter="packModeTypeFormat"/>
      <el-table-column label="车型" align="center" prop="vehicleType"/>
      <af-table-column label="备注" align="center" prop="remark"/>

      <!--      <af-table-column fixed="right" align="center" label="总净重"></af-table-column>-->
      <!--      <af-table-column fixed="right" align="center" label="蒙方净重"></af-table-column>-->

      <!--      <el-table-column label="场所编号" align="center" prop="placeId" />-->
      <!--      <el-table-column label="通知单号" align="center" prop="docNo" />-->
      <!--      <el-table-column label="业务编号" align="center" prop="businessNo" />-->
      <!--      <el-table-column label="挂车号" align="center" prop="trailerNo1" />-->
      <!--      <el-table-column label="车辆数量" align="center" prop="vehicleCount" />-->
      <!--      <el-table-column label="司机姓名" align="center" prop="driverName" />-->
      <!--      <el-table-column label="车队联系人" align="center" prop="vehicleTeamContact" />-->
      <!--      <el-table-column label="车队联系电话" align="center" prop="vehicleTeamTel" />-->
      <!--      <el-table-column label="生成时间" align="center" prop="genTime" width="180">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ parseTime(scope.row.genTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="生成人" align="center" prop="genBy" />-->
      <!--      <el-table-column label="磅单打印时间" align="center" prop="poundTime" width="180">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ parseTime(scope.row.poundTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="磅单号" align="center" prop="poundNo" />-->
      <!--      <el-table-column label="批次号" align="center" prop="batchNo" />-->
      <!--      <el-table-column label="提运单号" align="center" prop="loadingBillNo" />-->

      <!--      <el-table-column label="生成舱单" align="center" prop="hasManifest" />-->
      <!--      <el-table-column label="生成集报清单" align="center" prop="hasDeclare" />-->
      <!--      <el-table-column label="生成进境确报" align="center" prop="hasTransit" />-->
      <!--      <el-table-column label="状态)" align="center" prop="storeState" />-->
      <!--      <el-table-column label="放行单号" align="center" prop="passNo" />-->
      <!--      <el-table-column label="蒙古毛重" align="center" prop="mongoliaRoughWeight" />-->

      <!--      <el-table-column label="发货方" align="center" prop="sendName" />-->
      <!--      <el-table-column label="寄仓客户ID" align="center" prop="customerId" />-->

      <!--      <el-table-column label="入场通道" align="center" prop="inChannel" />-->
      <!--      <el-table-column label="出场通道" align="center" prop="outChannel" />-->
      <!--      <el-table-column label="入场司磅员" align="center" prop="inUser" />-->
      <!--      <el-table-column label="出场司磅员" align="center" prop="outUser" />-->


      <!--      <el-table-column label="库位别名" align="center" prop="locationAlias" />-->
      <!--      <el-table-column label="进口合同号" align="center" prop="importContractNumber" />-->


      <!--      <el-table-column label="境外发车日期" align="center" prop="overseasDepartureDate" width="180">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ parseTime(scope.row.overseasDepartureDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->


      <!--      <el-table-column label="制单时间" align="center" prop="makerTime" width="180">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ parseTime(scope.row.makerTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="制单人" align="center" prop="makerBy" />-->
      <!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button-->
      <!--            size="mini"-->
      <!--            type="text"-->
      <!--            icon="el-icon-edit"-->
      <!--            @click="handleUpdate(scope.row)"-->
      <!--            v-hasPermi="['place:instoreDoc:edit']"-->
      <!--          >修改</el-button>-->
      <!--          <el-button-->
      <!--            size="mini"-->
      <!--            type="text"-->
      <!--            icon="el-icon-delete"-->
      <!--            @click="handleDelete(scope.row)"-->
      <!--            v-hasPermi="['place:instoreDoc:remove']"-->
      <!--          >删除</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      :page-sizes="[20,30,50,200,400,500,1000,2000,3000,5000]"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  listInstoreDocLike,
  getInstoreDoc,
  delInstoreDoc,
  addInstoreDoc,
  updateInstoreDoc, listInstoreReportLike
} from "@/api/place/instoreDoc";
import {getUserDepts} from "@/utils/charutils";

export default {
  name: "InstoreDoc",
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
      // 入库通知单 入库通知单表格数据
      instoreDocList: [],
      //时间查询类型
      timeQueryTypeOption: [],
      //包装方式字典集
      packModeOption: [],
      //入库状态字典集
      inStoreOption: [],
      //场所集
      depts: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      highSearch: false,
      // 查询参数
      queryParams: {
        //queryLogo: 'I',
        //vehicleNoCount: 0,
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        //docNo: undefined,
        //businessNo: undefined,
        checkConsumer: undefined,
        checkContractNo: undefined,
        //mongoliaBillNo: undefined,
        vehicleNo: undefined,
        //trailerNo1: undefined,
        //trailerNo2: undefined,
        vehicleTeam: undefined,
        //mongoliaNetWeight: undefined,
        //mongoliaTareWeight: undefined,
        //vehicleCount: undefined,
        //driverName: undefined,
        //vehicleTeamContact: undefined,
        //vehicleTeamTel: undefined,
        vehicleType: undefined,
        //measuringUnit: undefined,
        packMode: undefined,
        containerNo1: undefined,
        //containerNo2: undefined,
        //containerNo3: undefined,
        //containerNo4: undefined,
        //netWeight: undefined,
        //tareWeight: undefined,
        //roughWeight: undefined,
        //genTime: undefined,
        //genBy: undefined,
        //poundTime: undefined,
        //poundNo: undefined,
        //batchNo: undefined,
        //loadingBillNo: undefined,
        storeCode: undefined,
        //storeCode2: undefined,
        //storeCode3: undefined,
        //storeCode4: undefined,
        //hasManifest: undefined,
        //hasDeclare: undefined,
        //hasTransit: undefined,
        storeState: undefined,
        //fileId: undefined,
        //passNo: undefined,
        //revision: undefined,
        //memo: undefined,
        //mongoliaRoughWeight: undefined,
        goodsName: undefined,
        //sendName: undefined,
        //customerId: undefined,
        inTimeBegin: undefined,
        inTimeEnd: undefined,
        outTimeBegin: undefined,
        outTimeEnd: undefined,
        //inChannel: undefined,
        //outChannel: undefined,
        inUser: undefined,
        outUser: undefined,
        //supplier: undefined,
        //purchaseContractNumber: undefined,
        //locationAlias: undefined,
        //importContractNumber: undefined,
        //customsDeclarationNumber: undefined,
        //boxTareWeight: undefined,
        //customsWeight: undefined,
        //nationalInspectionReleaseDate: undefined,
        //overseasDepartureDate: undefined,
        //mongolianDeliveryDate: undefined,
        //entryDate: undefined,
        //customsDeclarationDate: undefined,
        //makerTime: undefined,
        //makerBy: undefined,
        //purPrice: 0,
        outCarTimeBegin: undefined,
        outCarTimeEnd: undefined,
        instoreTimeBegin: undefined,
        instoreTimeEnd: undefined,

        orderByColumn: 'id',
        isAsc: 'desc',
      },
      // 表单参数
      form: {},
      rules: {},
      dateRange: [],
      dateRangeInTime: ['', ''], //入场时间
      dateRangeOutTime: ['', ''],//出场时间
      overseasDepartureDate: ['', ''],//境外发车时间
      inCompleteTime: ['', ''],//入为完成时间

      // 默认值
      packModeTypeFormatTranslation: '',
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
    }
    this.getList();
    this.getDicts("time_query_type").then(response => {
      this.timeQueryTypeOption = response.data;
    });

    this.getDicts("pack_mode").then(response => {
      this.packModeOption = response.data;
      console.log("包装方式字典")
      console.log(this.packModeOption)
    });
    this.getDicts("inStore_doc_state").then(response => {
      this.inStoreOption = response.data;
    });
  },

  methods: {
    /** 查询入库通知单 入库通知单列表 */
    getList() {
      this.loading = true;

      this.titleList = [];
      //处理时间查询条件
      this.processDateSearch()

      listInstoreReportLike(this.queryParams).then(response => {
        this.instoreDocList = response.rows;
        this.total = response.total;
        //this.dataRange01[0] = this.queryParams.beginTime
        //this.dataRange01[1] = this.queryParams.endTime
        //this.outstoreDocList = response.rows;
        //this.printTitle = '嘉易达监管场所' + this.dataRange01[0] + '至' + this.dataRange01[1] + '入库统计报表'
        //this.titleList.push(this.printTitle)
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
      this.queryParams = {
        placeId: this.depts[0].deptId,
        queryLogo: 'I',
        vehicleNoCount: 0,
        pageNum: 1,
        pageSize: 20,
        //placeId: undefined,
        docNo: undefined,
        businessNo: undefined,
        checkConsumer: undefined,
        checkContractNo: undefined,
        mongoliaBillNo: undefined,
        vehicleNo: undefined,
        trailerNo1: undefined,
        trailerNo2: undefined,
        vehicleTeam: undefined,
        mongoliaNetWeight: undefined,
        mongoliaTareWeight: undefined,
        vehicleCount: undefined,
        driverName: undefined,
        vehicleTeamContact: undefined,
        vehicleTeamTel: undefined,
        vehicleType: undefined,
        measuringUnit: undefined,
        packMode: undefined,
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
        netWeight: undefined,
        tareWeight: undefined,
        roughWeight: undefined,
        genTime: undefined,
        genBy: undefined,
        poundTime: undefined,
        poundNo: undefined,
        batchNo: undefined,
        loadingBillNo: undefined,
        storeCode: undefined,
        storeCode2: undefined,
        storeCode3: undefined,
        storeCode4: undefined,
        hasManifest: undefined,
        hasDeclare: undefined,
        hasTransit: undefined,
        storeState: undefined,
        fileId: undefined,
        passNo: undefined,
        revision: undefined,
        memo: undefined,
        mongoliaRoughWeight: undefined,
        goodsName: undefined,
        sendName: undefined,
        customerId: undefined,
        inTime: undefined,
        outTime: undefined,
        inChannel: undefined,
        outChannel: undefined,
        inUser: undefined,
        outUser: undefined,
        supplier: undefined,
        purchaseContractNumber: undefined,
        locationAlias: undefined,
        importContractNumber: undefined,
        customsDeclarationNumber: undefined,
        boxTareWeight: undefined,
        customsWeight: undefined,
        nationalInspectionReleaseDate: undefined,
        overseasDepartureDate: undefined,
        mongolianDeliveryDate: undefined,
        entryDate: undefined,
        customsDeclarationDate: undefined,
        makerTime: undefined,
        makerBy: undefined
      };
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      /*if (this.queryParams.queryLogo == undefined) {
        this.msgError("查询时间类型不可为空,请选择")
        return
      }*/
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.reset();
      this.dateRange = [];
      this.handleQuery();
    },


    /** 导出按钮操作 */
    handleExport() {
      this.processDateSearch()
      this.download('place/instoreDoc/exportReport', {
        ...this.queryParams
      }, `入库明细表报表.xlsx`)
    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '本页总重(t)';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value) && index === 9) {
              return prev + curr;
            }
            if (!isNaN(value) && index === 16) {
              //.toFixed(2)
              return prev + curr;
            }
          }, 0);
        }
      });
      //console.log(sums)
      //计算对应的列的总和/1000变成吨
      sums[9] = (sums[9] * 100 / 100).toFixed(2)
      sums[16] = (sums[16] * 100 / 100).toFixed(2)
      return sums;
    },
    //包装方式行翻译
    packModeTypeFormat(row) {
      this.packModeTypeFormatTranslation = this.selectDictLabel(this.packModeOption, row.packMode);
      return this.selectDictLabel(this.packModeOption, row.packMode);
    },
    processDateSearch() {
      //入场时间
      if (this.dateRangeInTime && this.dateRangeInTime[0]) {
        this.queryParams.inTimeBegin = this.dateRangeInTime[0]
      } else {
        this.queryParams.inTimeBegin = undefined
      }
      if (this.dateRangeInTime && this.dateRangeInTime[1]) {
        this.queryParams.inTimeEnd = this.dateRangeInTime[1]
      } else {
        this.queryParams.inTimeEnd = undefined
      }
      //出场时间
      if (this.dateRangeOutTime && this.dateRangeOutTime[0]) {
        this.queryParams.outTimeBegin = this.dateRangeOutTime[0]
      } else {
        this.queryParams.outTimeBegin = undefined
      }
      if (this.dateRangeOutTime && this.dateRangeOutTime[1]) {
        this.queryParams.outTimeEnd = this.dateRangeOutTime[1]
      } else {
        this.queryParams.outTimeEnd = undefined
      }
      //境外发车时间
      if (this.overseasDepartureDate && this.overseasDepartureDate[0]) {
        this.queryParams.outCarTimeBegin = this.overseasDepartureDate[0]
      } else {
        this.queryParams.outCarTimeBegin = undefined
      }
      if (this.overseasDepartureDate && this.overseasDepartureDate[1]) {
        this.queryParams.outCarTimeEnd = this.overseasDepartureDate[1]
      } else {
        this.queryParams.outCarTimeEnd = undefined
      }
      //入库完成时间
      if (this.inCompleteTime && this.inCompleteTime[0]) {
        this.queryParams.instoreTimeBegin = this.inCompleteTime[0]
      } else {
        this.queryParams.instoreTimeBegin = undefined
      }
      if (this.inCompleteTime && this.inCompleteTime[1]) {
        this.queryParams.instoreTimeEnd = this.inCompleteTime[1]
      } else {
        this.queryParams.instoreTimeEnd = undefined
      }
    },
  }
};
</script>
