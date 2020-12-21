<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <!-- 所属场所 -->
      <el-form-item label="所属场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择所属场所" @change="((val)=>{change(val, 'placeId')})">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="提煤单号" prop="coalBillNo">
        <el-input
          v-model="queryParams.coalBillNo"
          placeholder="请输入提煤单号"
          clearable
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
      <el-form-item label="状态" prop="storeState">
        <el-select v-model="queryParams.storeState" clearable placeholder="请选择状态" @change="handleQuery">
          <el-option
            v-for="dept in storeStateDic"
            :key="dept.dictValue"
            :label="dept.dictLabel"
            :value="dept.dictValue"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" type="warning" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['place:outstoreDoc:addcar']"
        >新增
        </el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:car:edit']"
        >修改
        </el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleMultiVoid"
          v-hasPermi="['place:outstoreDoc:void']"
        >作废
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <!--        <el-button-->
        <!--          type="warning"-->
        <!--          icon="el-icon-download"-->
        <!--          size="mini"-->
        <!--          @click="handleExport"-->
        <!--          v-hasPermi="['place:car:export']"-->
        <!--        >导出-->
        <!--        </el-button>-->
        <el-button
          icon="el-icon-download"
          size="mini"
          type="success"
          v-hasPermi="['place:outstoreDoc:import']"
          @click="handleImport">
          导入
        </el-button>
        <el-button
          size="mini"
          @click="print"
          :disabled="multiple"
          v-print="'#dayin'"
          type="info"
          icon="el-icon-printer">
          打印入门证
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="docList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" :selectable="checkboxInit"/>
      <el-table-column label="打印次数" align="center">
        <template scope="scope">
          <span v-if="scope.row.inCardPrintState ==='0' || scope.row.inCardPrintState == null "
                style="color:green">未打印</span>
          <span class="printSpan" v-else-if="scope.row.inCardPrintState !=='0'">{{ scope.row.inCardPrintState }}</span>
        </template>
      </el-table-column>
      <af-table-column label="ID" align="center" prop="id"/>
      <af-table-column label="车牌号" align="center" prop="vehicleNo"/>
      <af-table-column label="货净重(KG)" align="center" prop="vehicleGoodsNetWeight"/>
      <af-table-column label="车皮重(KG)" align="center" prop="vehicleTareWeight"/>
      <af-table-column label="分配序号" align="center" prop="serialNo"/>
      <af-table-column label="提煤单号" align="center" prop="coalBillNo"/>
      <af-table-column label="包装方式" align="center" prop="packMode" :formatter="packModeFormatter"/>
      <af-table-column label="车辆类型" align="center" prop="vehicleType"/>
      <af-table-column label="运输方式" align="center" prop="transportMode" :formatter="transModeFormatter" width="120px"/>
      <af-table-column label="承运单位" align="center" prop="transportUnit"/>
      <af-table-column label="申报海关" align="center" prop="isReportCustoms" :formatter="isReportFormatter"/>
      <af-table-column label="制单人" align="center" prop="makerBy"/>
      <af-table-column label="制单时间" align="center" prop="makerTime"/>
      <el-table-column label="作废人" align="center" prop="voidUser"
                       v-if="queryParams.storeState === '3'"></el-table-column>
      <el-table-column label="作废时间" align="center" width="180px" prop="voidDate"
                       v-if="queryParams.storeState === '3'"></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right" width="140px">
        <template scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="voidUpdate(scope.row)"
            v-hasPermi="['place:outstoreDoc:void']"
            v-show="scope.row.storeState === '0' ">作废
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-printer"
            v-print="'#dayinMake'"
            @click="printMake(scope.row)"
          >{{ scope.row.inCardPrintState == null || scope.row.inCardPrintState === '0' ? '打印' : '补打' }}
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

    <!-- 添加或修改外调车 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body :before-close="closeDialog">
      <el-form ref="form" :model="form" :rules="rules" number label-width="120px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="提煤单号" prop="coalBillNo">
              <el-select v-model="form.coalBillNo" filterable placeholder="请选择提煤单号" @change="getBigCanUse">
                <el-option
                  v-for="item in BigList"
                  :key="item.coalBillNo"
                  :label="item.coalBillNo"
                  :value="item.coalBillNo">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车牌号" prop="vehicleNo">
              <el-input v-model="form.vehicleNo" placeholder="请输入车牌号"/>
              <!--        <el-autocomplete
                              class="inline-input"
                              v-model="form.vehicleNo"
                              :fetch-suggestions="nameSearch"
                              placeholder="请输入车牌号"
                              @select="handleSelect"
                              style="width: 100%"
                              clearable
                            ></el-autocomplete>-->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="车皮重(KG)" prop="vehicleTareWeight">
              <el-input v-model="form.vehicleTareWeight" placeholder="请输入车皮重"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货净重(KG)" prop="vehicleGoodsNetWeight">
              <el-input v-model="form.vehicleGoodsNetWeight" placeholder="请输入货净重"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="包装方式" prop="packMode">
              <el-select v-model="form.packMode" filterable placeholder="请选择包装类型">
                <el-option
                  v-for="item in types"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车辆类型" prop="vehicleType">
              <el-select v-model="form.vehicleType" filterable placeholder="请选择车辆类型">
                <el-option
                  v-for="item in vehicleTypes"
                  :key="item.dictLabel"
                  :label="item.dictLabel"
                  :value="item.dictLabel">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="承运单位" prop="transportUnitId">
              <!--<el-input v-model="form.transportUnit" placeholder="请输入承运单位"/>-->
              <el-select v-model="form.transportUnitId" filterable placeholder="请选择承运单位" @change="getUnitName">
                <el-option
                  v-for="item in transUnitList"
                  :key="item.id"
                  :label="item.eAbbreviation"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运输次数" prop="transportNum">
              <el-input v-model.number="form.transportNum" placeholder="请输入运输次数"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="运输方式" prop="transportMode">
              <el-select v-model="form.transportMode" filterable placeholder="请选择运输方式">
                <el-option
                  v-for="item in transportModeDic"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否申报海关" prop="isReportCustoms">
              <el-select v-model="form.isReportCustoms" filterable placeholder="请选择是否申报海关">
                <el-option
                  v-for="item in reportTypes"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-left: 30px" v-show="form.coalBillNo">
          <el-alert
            :title="bigUseTip"
            type="warning"
            :closable="false">
          </el-alert>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" :loading="btnLoading">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--  货车导入弹出框  -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" :before-close="closeDialog">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        :file-list="fileList"
        :data="form"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将申报车辆文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>

      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="btnLoading" @click="submitFileForm">确 定</el-button>
        <!--<el-button @click="upload.open = false">取 消</el-button>-->
        <el-button @click="uploadCancel">取 消</el-button>
      </div>
      <el-form ref="uploadForm" :model="form" :rules="uploadRules" :label-position="left" label-width="80px"
               size="small">
        <!--<el-form-item label="所属场所" prop="placeId">
          <el-select v-model="form.placeId" placeholder="请选择所属场所" @change="((val)=>{change(val, 'placeId')})">
            <el-option
              v-for="dept in depts"
              :key="dept.deptId"
              :label="dept.deptName"
              :value="dept.deptId"
            />
          </el-select>
        </el-form-item>-->
        <el-form-item label="提煤单号" prop="coalBillNo" style="margin-top: 10px;">
          <el-select v-model="form.coalBillNo" placeholder="请选择提煤单号" filterable @change="getBigCanUse">
            <el-option
              v-for="item in BigList"
              :key="item.coalBillNo"
              :label="item.coalBillNo"
              :value="item.coalBillNo"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="承运单位" prop="transportUnitId">
          &lt;!&ndash;<el-input v-model="form.transportUnit" placeholder="请输入承运单位"/>&ndash;&gt;
          <el-select v-model="form.transportUnitId" filterable placeholder="请选择承运单位">
            <el-option
              v-for="item in transUnitList"
              :key="item.id"
              :label="item.eName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>-->
        <!-- <el-form-item label="运输方式" prop="transportMode">
           <el-select v-model="form.transportMode" filterable placeholder="请选择运输方式">
             <el-option
               v-for="item in transportModeDic"
               :key="item.dictValue"
               :label="item.dictLabel"
               :value="item.dictValue">
             </el-option>
           </el-select>
         </el-form-item>-->
        <!--<el-form-item label="申报海关" prop="isReportCustoms">
          <el-select v-model="form.isReportCustoms" filterable placeholder="请选择是否申报海关">
            <el-option
              v-for="item in reportTypes"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-row v-show="form.coalBillNo">
          <el-alert
            :title="bigUseTip"
            type="warning"
            :closable="false">
          </el-alert>
        </el-row>
      </el-form>

    </el-dialog>
    <!--打印区域-->
    <div id="dayin" v-show="show">
      <div v-for="(item,index) in printList" class="all" style="page-break-after:always">
        <div :id="gennerateId(index)"></div>
        <div class="headRow">{{ item.no }}</div>
        <div class="firstRow">
          <div class="firstRow1">
            <span>{{ item.createTime.substring(0, 10) }}</span>
          </div>
          <div class="firstRow2">
            <span class="contractNoStyle" style="display: flow-root">{{ item.checkContractNo }}</span>
          </div>
          <div class="firstRow3">
            <span class="coalBillNoStyle" style="display: flow-root">{{ item.docNo }}</span>
          </div>
        </div>
        <div class="secondRow">
          <div class="secondRow1">
            <span>{{ item.receiveName }}</span>
          </div>
          <div class="secondRow2">
            <span class="carriageStyle">{{ item.transportUnit }}</span>
          </div>
        </div>


        <div class="thirdRow">
          <div class="thirdRow1">
            <span>{{ item.goodsName }}</span>
          </div>
          <div class="thirdRow2">
            <!--    场所名      -->
            <span class="loadingStyle">{{ "嘉易达" }}</span>
          </div>

        </div>

        <div class="fourRow">
          <div class="fourRow1">
            <span>{{ item.vehicleNo }}</span>
          </div>
          <div class="fourRow2">
            <span class="receiptStyle" style="display: flow-root">{{ item.customerName }}</span>
          </div>

        </div>


        <div class="fiveRow">
          <span>{{ biller }}</span>
        </div>
      </div>
      <!--        <div class="nouse"></div>-->
    </div>


    <!--    补打-->
    <div id="dayinMake" v-show="showMake">
      <div v-for="(itemMake,index) in printMakeList" class="all">
        <div :id="gennerateId(index)"></div>
        <div class="headRow">{{ itemMake.no }}</div>
        <div class="firstRow">
          <div class="firstRow1">
            <span>{{ itemMake.createTime.substring(0, 10) }}</span>
          </div>
          <div class="firstRow2">
            <span class="contractNoStyle" style="display: flow-root">{{ itemMake.checkContractNo }}</span>
          </div>
          <div class="firstRow3">
            <span class="coalBillNoStyle" style="display: flow-root">{{ itemMake.docNo }}</span>
          </div>
        </div>
        <div class="secondRow">
          <div class="secondRow1">
            <span>{{ itemMake.receiveName }}</span>
          </div>
          <div class="secondRow2">
            <span class="carriageStyle">{{ itemMake.transportUnit }}</span>
          </div>
        </div>


        <div class="thirdRow">
          <div class="thirdRow1">
            <span>{{ itemMake.goodsName }}</span>
          </div>
          <div class="thirdRow2">
            <!--    场所名      -->
            <span class="loadingStyle">{{ "嘉易达" }}</span>
          </div>

        </div>

        <div class="fourRow">
          <div class="fourRow1">
            <span>{{ itemMake.vehicleNo }}</span>
          </div>
          <div class="fourRow2">
            <span class="receiptStyle" style="display: flow-root">{{ itemMake.customerName }}</span>
          </div>

        </div>
        <div class="fiveRow">
          <span>{{ billerMake + '(补打)' }}</span>
        </div>
        <!--        <div class="nouse"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
import {addCar, delCar, getCar, getCarInfo, listCar, updateCar} from '@/api/place/car'
import {getBigCanUse, selectCoalBillNo} from '@/api/place/big'
import {getToken} from '@/utils/auth'
import {getUserDepts} from '@/utils/charutils'
import {
  addOutstoreDocByCar,
  listOutstoreDocLike,
  multiVoidCar,
  updatePrintByIds,
  updateVoidCar
} from "@/api/place/outstoreDoc";
import {listInfo} from "@/api/basis/enterpriseInfo";

export default {
  name: 'Car',
  data() {
    return {
      btnLoading: false,
      // 遮罩层
      loading: true,
      docList: [],
      // 选中数组
      ids: [],
      vehicleNos: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 外调车 表格数据
      carList: [],
      // 弹出层标题
      title: '',
      left: 'left',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        id: undefined,
        pageNum: 1,
        pageSize: 20,
        coalBillNo: undefined,
        vehicleNo: undefined,
        transportNum: undefined,
        placeId: undefined,
        storeState: '0',
        orderByColumn: 'id',
        isAsc: 'desc',
        inCardPrintState: 1,
      },
      fileList: [],
      transUnitList: [],//承运单位列表
      // 表单参数
      form: {},
      //场所列表
      depts: [],
      // 车牌号列表
      //plateNoList: [],
      // 车辆类型
      types: [
        {dictValue: '2', dictLabel: '散装'},
        {dictValue: '1', dictLabel: '集装箱'}
      ],
      // 是否申报海关
      reportTypes: [
        {dictValue: '0', dictLabel: '不申报'},
        {dictValue: '1', dictLabel: '申报'}
      ],
      vehicleTypes: [
        {dictValue: '1', dictLabel: '单驱'},
        {dictValue: '2', dictLabel: '双驱'},
        {dictValue: '3', dictLabel: '单箱'},
        {dictValue: '4', dictLabel: '双箱'},
      ],
      transportModeDic: [
        /* {'dictValue': '1', dictLabel: '汽铁联运-散装'},
         {'dictValue': '2', dictLabel: '汽铁联运-集装箱'},
         {'dictValue': '3', dictLabel: '汽运短倒-散装'},
         {'dictValue': '4', dictLabel: '汽运短倒-集装箱'},
         {'dictValue': '5', dictLabel: '全程汽运-散装'},
         {'dictValue': '6', dictLabel: '全程汽运-集装箱'},*/
      ],
      // 表单校验
      rules: {
        placeId: [
          {required: true, message: '请选择场所', trigger: 'blur'}
        ],
        coalBillNo: [
          {required: true, message: '请选择提煤单', trigger: 'change'}
        ],
        vehicleGoodsNetWeight: [
          // {message: '货净重不能为空', trigger: 'blur'},
          //{type: 'number', message: '货净重必须是数字'},
          {pattern: /^\+?[1-9][0-9]*$/, message: '货净重必须是数字,且不能为0', trigger: 'blur'}
        ],
        vehicleTareWeight: [
          // {message: '车皮重不能为空', trigger: 'blur'},
          //{type: 'number', message: '车皮重必须是数字'},
          {pattern: /^\+?[1-9][0-9]*$/, message: '车皮重必须是数字,且不能为0', trigger: 'blur'}
        ],
        vehicleNo: [
          {required: true, message: '车牌号不能为空', trigger: 'blur'}
        ],
        isReportCustoms: [
          {required: true, message: '是否申报海关不能为空', trigger: 'blur'}
        ],
        transportNum: [
          {required: true, message: '运输次数不能为空', trigger: 'blur'},
          {type: 'number', message: '运输次数必须是数字'},
          {pattern: /^\+?[1-9][0-9]*$/, message: '运输次数不能小于1', trigger: 'blur'}
        ],
        packMode: [
          {required: true, message: '请选择包装类型', trigger: 'change'}
        ],
        vehicleType: [
          {required: true, message: '请选择车辆类型', trigger: 'change'}
        ],
        transportUnitId: [
          {required: true, message: '请选择承运单位', trigger: 'change'}
        ],
        transportMode: [
          {required: true, message: '请选择运输方式', trigger: 'change'}
        ]
      },
      uploadRules: {
        coalBillNo: [
          {required: true, message: '请选择提煤单', trigger: 'change'}
        ],
        /* transportUnitId: [
           {required: true, message: '运输方式不能为空', trigger: 'change'}
         ],*/
      },
      //提煤单号
      BigList: [],
      canAlloc: 0,//当前单子可分配的重量
      //文件导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {Authorization: 'Bearer ' + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/place/outstoreDoc/importData'
      },
      storeStateDic: [
        {'dictValue': '0', 'dictLabel': '未入场'},
        {'dictValue': '2', 'dictLabel': '已入场'},
        {'dictValue': '3', 'dictLabel': '作废'},
      ],
      //开单员
      biller: "",
      billerMake: "",
      show: false,
      showMake: false,
      // 打印数据list
      printList: [],
      //补打 打印数据list
      printMakeList: [],
      //大提煤单可用量提示信息
      bigUseTip: ''
    }
  },
  created() {
    // 获取场所
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId;
      //提煤单号
      selectCoalBillNo({'placeId': this.queryParams.placeId, 'status': '0'}).then(response => {
        this.BigList = response.rows
      })
      this.getList()
      this.getTransportUnitInfo()
    }
    // 外调车车牌号列表
    //this.getPlateNoList()
    /** 变更原因 */
    this.getDicts("place_transport_type").then((response) => {
      this.transportModeDic = response.data;
    });

  },
  methods: {
    /** 查询外调车 列表 */
    getList() {
      this.loading = true;
      listOutstoreDocLike(this.queryParams).then(response => {
        this.docList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /*getPlateNoList() {
      getCarInfo().then(res => {
        this.plateNoList = res.data
      })
    },*/
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
      this.bigUseTip = ''
      // this.$refs.upload.clearFiles()
      //清空提煤单号
      // this.BigList = []
    },
    uploadCancel() {
      this.upload.open = false
      this.reset()
      this.$refs.upload.clearFiles()
      this.bigUseTip = ''
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        coalBillNo: undefined,
        vehicleNo: undefined,
        vehicleTareWeight: undefined,
        vehicleGoodsNetWeight: undefined,
        packMode: '2',
        status: '0',
        vehicleType: undefined,
        transportUnit: undefined,
        transportUnitId: undefined,
        transportNum: undefined,
        isReportCustoms: undefined,
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.printList = selection
      console.log(this.printList)
      this.ids = selection.map(item => item.id)
      this.vehicleNos = selection.map(item => item.vehicleNo)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.form.placeId = this.queryParams.placeId //场所ID
      this.open = true
      this.title = '添加派车单 '
    },
    /** 修改按钮操作 */
    /*handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCar(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改外调车 '
      })
    },*/
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          //计算提煤量是否小于可分配重量
          if (this.form.vehicleGoodsNetWeight * this.form.transportNum > this.canAlloc) {
            this.$message.warning("提煤重量不能大于可分配重量")
            return false
          }
          this.btnLoading = true
          //this.form.transportUnit = this.transUnitList.find(item => item.id === this.form.transportUnitId).eName
          addOutstoreDocByCar(this.form, this.form.transportNum).then(response => {
            if (response.code === 200) {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
              this.btnLoading = false
            }
          }).catch((err) => {
            this.btnLoading = false
          })
        }
      })
    },
    /** 批量作废按钮 */
    handleMultiVoid(row) {
      //const ids = row.id || this.ids
      const vehicleNos = row.vehicleNo || this.vehicleNos
      console.log(vehicleNos)
      //return false
      this.$confirm('是否确认作废所选的派车单?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return multiVoidCar(vehicleNos)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function () {
      })
    },
    /** 作废状态更改 */
    voidUpdate(row) {
      if (row.id != undefined) {
        //row.status = "0";
        let that = this
        this.$confirm('确认要作废"' + row.vehicleNo + '"的数据?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          updateVoidCar(row).then((response) => {
            if (response.code === 200) {
              that.$message.success(response.msg);
              that.getList();
              //console.log(response.msg)
              //row.storeState = '3'
            }
          })
        }).then(() => {
          //this.msgSuccess("设置成功");
          //this.getList();
        }).catch(function () {

        });
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/car/export', {
        ...this.queryParams
      }, `place_car.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.reset()
      this.upload.title = '申报车辆导入'
      this.upload.open = true
      this.form.placeId = this.queryParams.placeId
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true

    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.bigUseTip = ''
      this.btnLoading = false
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(response.msg, '导入结果', {dangerouslyUseHTMLString: true})
      if (response.code === 200) {
        this.getList()
      }
    },
    // 提交上传文件
    submitFileForm() {
      this.btnLoading = true
      this.$refs['uploadForm'].validate(valid => {
        if (valid) {
          //console.log(this.form)
          // console.log(this.$refs.upload.$refs['upload-inner'].fileList)
          if (this.$refs.upload.$refs['upload-inner'].fileList.length === 0) {
            this.$message.warning('请选择要上传的文件')
            this.btnLoading = false
            return false
          }
          this.$refs.upload.submit()
          /*addOutstoreDocByCar(this.form, this.form.transportNum).then(response => {
            if (response.code === 200) {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
              this.loading = false
            }
          }).catch((err) => {
            this.loading = true
          })*/
        }
      })

      /* if (this.form.coalBillNo && this.form.placeId && this.form.reportType) {
         this.$refs.upload.submit()
       } else {
         this.$alert('请选择场所和提煤单号和是否申报海关')
       }*/
    },
    change(val, name) {
      // 场所
      if (name === 'placeId') {
        //查询场所下的大提煤单中的所有提煤单号
        this.form.placeId = this.queryParams.placeId
        this.form.coalBillNo = undefined
        selectCoalBillNo({'placeId': this.queryParams.placeId, 'status': '0'}).then(response => {
          this.BigList = response.rows
        })
        this.getList()
        this.getTransportUnitInfo()
      }

    },
    // 收发货单位建议
    /*nameSearch(queryString, cb) {
      let results = queryString ? this.plateNoList.filter(this.createFilter(queryString)) : this.plateNoList
      for (let item of results) {
        item.value = item.plateNo
      }
      cb(results)
    },*/

    createFilter(queryString) {

      return (item) => {
        return (item.plateNo.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      /*this.form.vehicleNo = item.plateNo
      this.form.netWeight = item.netWeight
      this.form. = item.form.load*/
    },
    closeDialog() {
      this.open = false
      this.upload.open = false
      this.cancel()
    },
    /** 下载模板操作 */
    //货运车辆
    importTemplate() {
      window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=file&objectName=manifest/货运车辆导入模板.xlsx'
    },
    packModeFormatter(row, column) {
      return this.selectDictLabel(this.types, row.packMode);
    },
    vehicleTypeFormatter(row, column) {
      return this.selectDictLabel(this.vehicleTypes, row.vehicleType);
    },
    transModeFormatter(row, column) {
      return this.selectDictLabel(this.transportModeDic, row.transportMode);
    },
    isReportFormatter(row, column) {
      return this.selectDictLabel(this.reportTypes, row.isReportCustoms);
    },
    getTransportUnitInfo() { //查承运单位
      this.loading = true;
      let info = {"eType": '2', 'deptId': this.queryParams.placeId, 'companyType': '4'}
      listInfo(info).then(response => {
        this.transUnitList = response.rows;
        this.loading = false;
      });
    },
    getUnitName(event) {//当承运单位变化时，算一下
      this.form.transportUnit = this.transUnitList.find(item => item.id === event).eAbbreviation
      //this.form.transportUnit = this.transUnitList.find(item => item.id === this.form.transportUnitId).eName
    },
    print() {
      /*console.log(this.ids)
      if (this.ids.length === 0) {
        this.$message.warning('请选择要打印的出门证')
        return false
      }*/
      this.show = true;
      this.biller = this.$store.state.user.nickName
      updatePrintByIds(this.ids).then(response => {
        if (response.code === 200) {
          this.msgSuccess("修改打印状态(次数)成功");
          this.getList()
        }
      })
      clearTimeout(this.timer);
      //清除延迟执行
      this.timer = setTimeout(() => {
        //设置延迟执行
        //this.reset();
        this.show = false;
      }, 2000);
    },
    printMake(row) {
      this.billerMake = this.$store.state.user.nickName
      this.printMakeList = []
      this.printMakeList.push(row)
      console.log(this.printMakeList)
      this.showMake = true;
      updatePrintByIds(row.id).then(response => {
        if (response.code === 200) {
          this.msgSuccess("修改打印状态(次数)成功");
          this.getList()
        }
      })
      clearTimeout(this.timerMake);
      //清除延迟执行
      this.timerMake = setTimeout(() => {
        //设置延迟执行
        //this.reset();
        this.showMake = false;
      }, 2000);
    },
    // 打印操作，生成divID
    gennerateId: function (index) {
      return "printDiv" + index
    },
    getBigCanUse(event) {
      getBigCanUse(event).then(response => {
        if (response.code === 200) {
          this.bigUseTip = '提煤总量：' + response.data.total + ', 可分配重量：' + response.data.canAlloc + ', 已分配未提离重量：' + response.data.holdUse + ' , 已提重量：' + response.data.hasUse + ', 未提重量：' + response.data.noUse +
            '。    有效车数：' + response.data.validVehicleCount + ', 已提车数：' + response.data.hasUseVehicleCount + ', 未提车数：' + response.data.noUseVehicleCount + ', 作废车数：' + response.data.badVehicleCount

          //{ "badVehicleCount": 0, "total": 914150, "validVehicleCount": 15, "noUseVehicleCount": 7, "noUse": 850246, "hasUseVehicleCount": 8, "hasUse": 63904 }
          this.canAlloc = response.data.canAlloc
        }
      })
    },
    //判断是否可选
    checkboxInit(row, index) {
      if (row.storeState === '3' || row.storeState === '1' || row.storeState === '2') {
        return 0;//不可勾选
      } else {
        return 1;
      }
    },
  },
}
</script>
<style lang="scss" scope>
.el-select {
  width: 100%;
}

@page {
  size: auto;
  margin: 3mm;
}

/*html {*/
/*  background-color: #ffffff;*/
/*  margin: 0px;*/
/*}*/

/*body {*/
/*  margin: 10mm 15mm 10mm 15mm;*/
/*}*/
.all {
  height: 470px;
  width: 1100px;
  /*margin-top: 80px;*/
  margin-left: 5px;
  /*border: 1px solid ;*/
  padding-top: 64px;
  /*margin-top: 1cm;*/
}

.headRow {
  height: 40px;
  width: 1000px;
  padding-left: 3.5cm;
  /*border: 1px solid ;*/
  //padding-top: 10px;
  //margin-top: 2.5cm;
}

.firstRow {
  border-width: 20px;
  height: 50px;
  width: 1100px;
  padding-left: 2cm;
  padding-top: 10px;
  /*border: 1px solid ;*/
  margin-top: 5px;
  //margin-top: 1cm;
}

.firstRow1 {
  border-width: 20px;
  /*border: 1px solid ;*/
  font-size: 20px;
  float: left;
}

.firstRow2 {
  width: 350px;
  margin-left: 50px;
  margin-left: 50px;
  /*border: 1px solid ;*/
  font-size: 20px;
  float: left;
  word-break: break-all;

}

.firstRow3 {
  margin-left: -80px;
  width: 470px;
  /*border: 1px solid ;*/
  font-size: 20px;
  float: left;
  word-break: break-all;
}

.contractNoStyle {
  margin-left: 4cm;

}

.coalBillNoStyle {
  margin-left: 6cm;
}

.secondRow {
  height: 50px;
  width: 1000px;
  padding-left: 2cm;
  margin-top: 0px;
  /*border: 1px solid ;*/
  /*padding-top: 15px;*/
}

.secondRow1 {
  /*border: 1px solid ;*/
  width: 500px;
  height: 40px;
  font-size: 20px;
  padding-top: 20px;
  float: left;
}

.secondRow2 {
  width: 400px;
  height: 40px;
  /*border: 1px solid ;*/
  font-size: 20px;
  /*padding-left: 20px;*/
  margin-top: 10px;
  padding-top: 10px;
  float: right;
}

.thirdRow {
  height: 60px;
  width: 1100px;
  padding-left: 2cm;
  /*border: 1px solid ;*/
  margin-top: 7px;
  /*padding-top: 35px;*/
  font-size: 20px;

}


.thirdRow1 {
  width: 500px;
  height: 40px;
  /*border: 1px solid ;*/
  /*margin-top: 15px;*/
  padding-top: 15px;
  /*!*padding-top: 35px;*!*/
  /*font-size: 22px;*/
  /*display: inline-block;*/
}

.thirdRow2 {
  width: 400px;
  height: 40px;
  /*border: 1px solid ;*/
  margin-top: -25px;
  padding-left: 30px;
  font-size: 20px;
  float: right;
  /*display: inline-block;*/
  margin-left: 30px;
}

.fourRow {
  height: 60px;
  width: 1000px;
  padding-left: 2cm;
  /*border: 1px solid ;*/
  /*padding-top: 55px;*/
  margin-top: -10px;
  /*float: right;*/
}

.fourRow1 {
  width: 400px;
  height: 40px;
  /*border: 1px solid ;*/
  font-size: 22px;
  word-break: break-all;
  float: left;
}

.fourRow2 {
  width: 400px;
  height: 40px;
  /*border: 1px solid ;*/
  font-size: 22px;
  word-break: break-all;
  padding-left: 80px;
  float: right;
}

/*#customerStyle{*/
/*  margin-left: 4cm;*/
/*}*/
.nullStyle {
  font-size: 20px;

}

.carriageStyle {
  /*margin-left: 17cm;*/
  /*margin-top: 20px;*/
  padding-left: 120px;
  font-size: 20px;
}

.loadingStyle {
  /*margin-left: 15.5cm;*/
  /*padding-left: 2cm;*/
}

.receiptStyle {


}

.fiveRow {
  height: 40px;
  width: 1000px;
  padding-left: 1cm;
  font-size: 22px;
  /*border: 1px solid ;*/
  margin-top: 1.3cm;
}

.nouse {
  height: 100px;
  width: 1000px;
  /*border: 1px solid*/
}

#dayin {
  height: 9.39cm;
  width: 21cm;
  /*border: 1px solid ;*/
}

#dayinMake {
  height: 9.39cm;
  width: 21cm;
  /*border: 1px solid ;*/
}

.printSpan {
  color: red;
  font-size: 15px;
  text-align: center;
  display: block;
}
</style>
