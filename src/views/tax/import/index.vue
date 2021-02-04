<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
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
      <el-form-item label="文件名" prop="fileName">
        <el-input
          v-model="queryParams.fileName"
          placeholder="请输入文件名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="模板类型" prop="templateType">
        <el-select v-model="queryParams.templateType" placeholder="请选择模板类型" clearable size="small">
          <el-option
            v-for="type in importTypeDic"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="导入日期" prop="updateTime">
        <el-date-picker
          v-model="queryParams.updateTime"
          type="date"
          placeholder="请选择日期"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
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
          v-hasPermi="['tax:import:add']"
        >导入
        </el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:import:edit']"
        >修改</el-button>
      </el-col>-->
      <!--<el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:import:remove']"
        >删除
        </el-button>
      </el-col>-->
      <!--<el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:import:export']"
        >下载
        </el-button>
      </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="importList">
      <!--<af-table-column type="selection" width="55" align="center"/>-->
      <!--<af-table-column label="场所编号" align="center" prop="placeId" />-->
      <af-table-column label="ID" align="center" prop="id" width="60px"/>
      <af-table-column label="模板类型" align="center" width="100px">
        <template slot-scope="scope">
          {{ importTypeDic.find(item => item.value === scope.row.templateType).label }}
        </template>
      </af-table-column>
      <af-table-column label="业务编号" align="center" prop="businessNo"/>
      <af-table-column label="寄仓客户" align="center" prop="storeCustomer"/>
      <af-table-column label="结算客户" align="center" prop="settlementCustomer"/>
      <af-table-column label="发货单位" align="center" prop="sendName"/>
      <af-table-column label="收货单位" align="center" prop="receiveName"/>
      <!--      <af-table-column label="运输方式" align="center" prop="transportMode">
              <template slot-scope="scope">
                {{ (scope.row.transportMode && scope.row.transportMode === '2') ? '上站' : '长途' }}
              </template>
            </af-table-column>-->
      <af-table-column label="文件路径" align="center" prop="path"/>
      <af-table-column label="文件名" align="center" prop="fileName"/>
      <!--<af-table-column label="是否生成报关数据" align="center" prop="isGenReport"/>
      <af-table-column label="是否生成出入库通知单" align="center" prop="isGenStoreNotice"/>-->
      <af-table-column label="文件大小" align="center" prop="fileLength" width="100px"/>
      <af-table-column label="创建人" align="center" prop="updateBy" width="100px"/>
      <af-table-column label="创建时间" align="center" prop="updateTime" width="180px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </af-table-column>
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-show="scope.row.isGenStoreNotice===0 && scope.row.templateType ==='1' "
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     :loading="noticeGening"
                     @click="handleGenNotice(scope.row)"
                     v-hasPermi="['tax:import:genNotice']"
          >生成入库通知单
          </el-button>
          <el-button v-show="scope.row.isGenStoreNotice===0 && scope.row.templateType ==='0' "
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     :loading="noticeGening"
                     @click="handleGenNotice(scope.row)"
                     v-hasPermi="['tax:import:genNotice']"
          >生成出库通知单
          </el-button>
          <span v-show="scope.row.isGenStoreNotice===1">已生成通知单</span>
          <el-button v-show="scope.row.isGenReport===0 && scope.row.templateType === '2'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleGenReport(scope.row)"
                     v-hasPermi="['tax:import:genReport']"
          >生成报关数据
          </el-button>
          <span v-show="scope.row.isGenReport===1">已生成报关数据</span>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-download"
            @click="handleDownload(scope.row)"
            v-hasPermi="['tax:import:download']"
          >下载
          </el-button>
          <el-button v-show="scope.row.templateType === '2' && scope.row.isGenReport !==0"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="customsDelete(scope.row)"
                     v-hasPermi="['tax:customs:remove']"
          >删除报关数据
          </el-button>
          <el-button v-show="scope.row.templateType === '1' && scope.row.isGenStoreNotice === 1 "
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDeleteInstoreData(scope.row)"
                     v-hasPermi="['tax:import:deleteInstoreData']"
          >删除入库通知单数据及文件
          </el-button>
          <el-button v-show="scope.row.templateType === '0' && scope.row.isGenStoreNotice === 1 "
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDeleteOutstoreData(scope.row)"
                     v-hasPermi="['tax:import:deleteOutstoreData']"
          >删除出库通知单数据及文件
          </el-button>
          <el-button v-show="scope.row.isGenReport ===0 && scope.row.isGenStoreNotice ===0"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row)"
                     v-hasPermi="['tax:import:remove']"
          >删除文件
          </el-button>
        </template>
      </af-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改导入文件记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!--<el-form-item label="模板类型，1入库知单，0出库通知单" prop="createBy">
          <el-input v-model="form.createBy" placeholder="请输入模板类型，1入库知单，0出库通知单" />
        </el-form-item>k
        <el-form-item label="模板类型，1入库知单，0出库通知单" prop="createTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择模板类型，1入库知单，0出库通知单">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="模板类型，1入库知单，0出库通知单" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入模板类型，1入库知单，0出库通知单" />
        </el-form-item>
        <el-form-item label="模板类型，1入库知单，0出库通知单" prop="updateBy">
          <el-input v-model="form.updateBy" placeholder="请输入模板类型，1入库知单，0出库通知单" />
        </el-form-item>
        <el-form-item label="模板类型，1入库知单，0出库通知单" prop="updateTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择模板类型，1入库知单，0出库通知单">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否生成报关数据" prop="isGenReport">
          <el-input v-model="form.isGenReport" placeholder="请输入是否生成报关数据" />
        </el-form-item>
        -->
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="模板类型" prop="templateType">
              <el-select v-model="form.templateType" size="small" style="width: 100%" placeholder="请选择模板类型"
                         @change="templateChange">
                <el-option
                  v-for="type in importTypeDic"
                  :key="type.value"
                  :label="type.label"
                  :value="type.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务编号" prop="businessNo" v-show="noticeType">
              <el-input v-model="form.businessNo" placeholder="请输入业务编号"
                        clearable size="small" style="width: 100%"
                        @keyup.enter.native="getInstoreDocByBusinessNo">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="寄仓客户" prop="storeCustomer" v-show="noticeType">
              <el-select v-model="form.storeCustomer" size="small" style="width: 100%" filterable clearable
                         placeholder="请选择寄仓客户" @change="setStoreCustomer" :disabled="form.templateType==='0'?true:false">
                <el-option
                  v-for="type in contractList"
                  :key="type.id"
                  :label="type.customerName"
                  :value="type.customerName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算客户" prop="settlementCustomer" v-show="noticeType">
              <el-select v-model="form.settlementCustomer" size="small" style="width: 100%" filterable clearable
                         placeholder="请选择结算客户" @change="setSettlementCustomer" disabled>
                <el-option
                  v-for="type in contractList1"
                  :key="type.id"
                  :label="type.customerName"
                  :value="type.customerName"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-show="noticeType">
          <el-col :span="12">
            <el-form-item label="发货单位" prop="sendName">
              <el-select v-model="form.sendName" size="small" style="width: 100%" filterable clearable
                         placeholder="请选择发货单位" disabled>
                <el-option
                  v-for="type in nameList"
                  :key="type.key"
                  :label="type.value"
                  :value="type.key"
                />
              </el-select>
              <!--              <el-autocomplete size="small" style="width: 100%"
                              class="inline-input"
                              v-model="form.sendName"
                              :fetch-suggestions="nameSearch"
                              placeholder="请输入发货单位"
                              @select="handleSelect"
                              clearable
                            ></el-autocomplete>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货单位" prop="receiveName">
              <el-select v-model="form.receiveName" size="small" style="width: 100%" filterable clearable
                         placeholder="请选择收货单位" disabled>
                <el-option
                  v-for="type in nameList"
                  :key="type.key"
                  :label="type.value"
                  :value="type.key"
                />
              </el-select>
              <!--              <el-autocomplete size="small" style="width: 100%"
                              class="inline-input"
                              v-model="form.receiveName"
                              :fetch-suggestions="nameSearch"
                              placeholder="请输入收货单位"
                              clearable
                              @select="handleSelect2"
                            ></el-autocomplete>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-show="transType">
          <el-col :span="12">
            <el-form-item label="运输方式" prop="transportMode">
              <el-select v-model="form.transportMode" placeholder="请选择运输方式" size="small" style="width: 100%">
                <el-option
                  v-for="type in transportModeList"
                  :key="type.key"
                  :label="type.value"
                  :value="type.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="text-align: center">
          <el-upload
            class="upload-demo"
            ref="upload"
            :limit="1"
            accept=".xlsx,.xls,.xlsm"
            drag
            :action=uploadAction
            :headers="headers"
            :on-progress="uploadProcess"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="uploadBefore"
            :disabled="uploading"
            :file-list="fileList"
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件
              <el-button
                size="mini"
                type="text"
                icon="el-icon-download"
                v-show="form.templateType!==''"
                @click="handleTemplateDownload">{{ templateDownTxt }}
              </el-button>
            </div>
          </el-upload>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" :loading="uploading">导入</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {
  listImport,
  getImport,
  delImport,
  customsDel,
  addImport,
  genNotice,
  delInstoreDataAndFile, delOutstoreDataAndFile
} from "@/api/tax/import";
import {getUserDepts} from '@/utils/charutils'
import {listContract} from '@/api/tax/contract'
import {getToken} from '@/utils/auth'
import {getDocByBusinessNo} from "@/api/tax/instore_doc";
import {listOutstore_docNo} from "@/api/tax/outstore_doc";
import {getInfo} from "@/api/basis/enterpriseInfo";


export default {
  name: "Import",
  data() {
    return {
      templateDownTxt: '',
      enterpriseInfoId: undefined,
      // 遮罩层
      loading: false,
      noticeGening: false,
      // 选中数组
      ids: [],
      //客户合同
      contractList: [],
      //客户合同
      contractList1: [
        {id: "奥云陶勒盖 Oyu Tolgaoi Limited",customerName: "奥云陶勒盖 Oyu Tolgaoi Limited"}
      ],
      nameList: [
        {"key":"金航保税库 Jinhang Bonded Warehouse","value": "金航保税库 Jinhang Bonded Warehouse"},
        {"key": "奥云陶勒盖 Oyu Tolgoi Limited","value": "奥云陶勒盖 Oyu Tolgoi Limited"},
        {"key": "金航保税库","value": "金航保税库"},
        {"key": "飞尚铜业","value": "飞尚铜业"},
        {"key": "东营方圆","value": "东营方圆"},
        {"key": "山东方泰","value": "山东方泰"},
        {"key": "紫金铜业","value": "紫金铜业"},
        {"key": "阳谷祥光","value": "阳谷祥光"},
        {"key": "山东恒邦","value": "山东恒邦"},
        {"key": "赤峰云铜","value": "赤峰云铜"},
        {"key": "赤峰金剑","value": "赤峰金剑"},
        {"key": "金川集团","value": "金川集团"},
        {"key": "包头华鼎","value": "包头华鼎"},
        {"key": "托克中国","value": "托克中国"},
        {"key": "青岛方泰","value": "青岛方泰"},
        {"key": "灵宝黄金","value": "灵宝黄金"},
        {"key": "浙江和鼎","value": "浙江和鼎"},
        {"key": "浙江富冶","value": "浙江富冶"},
        {"key": "中原黄金","value": "中原黄金"},
        {"key": "东营鲁方","value": "东营鲁方"},
        {"key": "北方铜业","value": "北方铜业"},
        {"key": "江西铜业","value": "江西铜业"},
        {"key": "豫光金铅","value": "豫光金铅"},
        {"key": "深圳江铜","value": "深圳江铜"},
        {"key": "富冶和鼎","value": "富冶和鼎"},
        {"key": "青海铜业","value": "青海铜业"},
        {"key": "白银有色","value": "白银有色"},
        {"key": "吉林紫金","value": "吉林紫金"},

      ],
      //机构列表
      depts: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 导入文件记录表格数据
      importList: [],
      importTypeDic: [
        {value: '1', label: '入库通知单'},
        {value: '0', label: '出库通知单'},
        {value: '2', label: '报关数据单'}
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        businessNo: undefined,
        fileName: undefined,
        isGenReport: undefined,
        isGenStoreNotice: undefined,
        objectName: undefined,
        path: undefined,
        placeId: undefined,
        templateType: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      // 表单参数
      form: {
        templateType: undefined,
        storeCustomer: undefined,
        settlementCustomer: undefined,
        storeContractId: undefined,
        settlementContractId: undefined,
        id: undefined,
        createBy: undefined,
        createTime: undefined,
        remark: undefined,
        updateBy: undefined,
        updateTime: undefined,
        bucketName: undefined,
        fileName: undefined,
        isGenReport: undefined,
        isGenStoreNotice: undefined,
        objectName: undefined,
        path: undefined,
        placeId: undefined,
        sendName: undefined,
        receiveName: undefined,
      },
      noticeType: true,
      transType: false,
      rules: {},
      // 表单校验
      rules1: {
        templateType: [
          {type: "string", required: true, message: "模板类型不能为空", trigger: "change"}
        ],
        storeCustomer: [
          {type: "string", required: true, message: "寄仓客户不能为空", trigger: "change"}
        ],
        settlementCustomer: [
          {type: "string", required: true, message: "结算客户不能为空", trigger: "change"}
        ],
        businessNo: [
          {type: "string", required: true, message: "业务编号不能为空", trigger: "change"}
        ],
        sendName: [
          {type: "string", required: true, message: "发货单位不能为空", trigger: "change"}
        ],
        receiveName: [
          {type: "string", required: true, message: "收货单位不能为空", trigger: "change"}
        ]
      },
      rules2: {
        templateType: [
          {type: "string", required: true, message: "模板类型不能为空", trigger: "change"}
        ]
      },
      rules3: {
        templateType: [
          {type: "string", required: true, message: "模板类型不能为空", trigger: "change"}
        ],
        storeCustomer: [
          {type: "string", required: true, message: "寄仓客户不能为空", trigger: "change"}
        ],
        settlementCustomer: [
          {type: "string", required: true, message: "结算客户不能为空", trigger: "change"}
        ],
        sendName: [
          {type: "string", required: true, message: "发货单位不能为空", trigger: "change"}
        ],
        receiveName: [
          {type: "string", required: true, message: "收货单位不能为空", trigger: "change"}
        ],
        transportMode: [
          {type: "string", required: true, message: "运输方式不能为空", trigger: "change"}
        ],
        businessNo: [
          {type: "string", required: true, message: "业务编号不能为空", trigger: "change"}
        ],
      },
      uploadAction: process.env.VUE_APP_BASE_API + '/minio/files/tax/upload',
      uploadData: {},
      uploading: false,

      headers: {
        'Authorization': '',
        'templateType': '',
        'placeId': '',
        'bucketName': ''
      },
      fileList: [],
      disabled: false,
      transportModeList: [
        {'key': '1', 'value': '长途'},
        {'key': '2', 'value': '上站'},
      ]
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.importTypeDic = [
      {value: '1', label: '入库通知单'},
      {value: '0', label: '出库通知单'},
      {value: '2', label: '报关数据单'}
    ]

    listContract({'placeId': this.queryParams.placeId}).then(response => {
      this.contractList = response.rows;
    });
    this.depts = getUserDepts('1')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
    }
    this.rules = this.rules1
  },
  methods: {
    /** 查询导入文件记录列表 */
    getList() {
      this.loading = true;
      listImport(this.queryParams).then(response => {
        this.importList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      //this.$refs.upload.$refs['upload-inner'].fileList =[]
      this.$refs.upload.clearFiles()
    },
    // 表单重置
    reset() {
      this.form = {
        templateType: undefined,
        storeCustomer: undefined,
        settlementCustomer: undefined,
        storeContractId: undefined,
        settlementContractId: undefined,
        id: undefined,
        createBy: undefined,
        createTime: undefined,
        remark: undefined,
        updateBy: undefined,
        updateTime: undefined,
        bucketName: undefined,
        fileName: undefined,
        isGenReport: undefined,
        isGenStoreNotice: undefined,
        objectName: undefined,
        path: undefined,
        placeId: undefined,
        sendName: undefined,
        receiveName: undefined,

      };
      this.uploading = false
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
      //this.reset();
      this.open = true;
      this.title = "导入模板文件";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getImport(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改导入文件记录";
      });
    },
    //下载
    handleDownload(row) {
      window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=' + row.bucketName + '&objectName=' + row.objectName
    },
    //生成出入库通知单
    handleGenNotice(row) {
      this.$confirm('生成通知单前请确认文件格式正确无误?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        genNotice(row.id).then(response => {
          this.loading = false
          if (response.code === 200) {
            this.msgSuccess("通知单生成成功");
            row.isGenStoreNotice = 1
          }
        }).catch(err => {
          this.loading = false
          console.log("取消生成通知单")
        })
      }).catch((err) => {
        this.loading = false
        console.log("取消生成通知单")
      });
    },
    handleGenReport(row) {
      this.$confirm('生成报关数据单前请确认文件格式正确无误?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        genNotice(row.id).then(response => {
          this.loading = false
          if (response.code === 200) {
            this.msgSuccess("报关数据生成成功");
            row.isGenReport = 1
          } else {
            this.msgError("报关数据生成失败");
          }
        }).catch(err => {
          this.loading = false
          console.log("报关数据生成失败")
        })
      }).catch((err) => {
        this.loading = false
        console.log("取消生成通知单")
      });
    },
    uploadProcess() {
      this.uploading = true
    },
    uploadBefore(file) {
      /*alert("要上传")
      console.log(file)
      if(!file){
        this.$message.error('请选择要上传的文件22')
        return false
      }*/
    },
    uploadSuccess(response) {
      if (response.code !== 200) {
        this.$message.error(response.msg)
        this.uploading = false
        return false
      }
      this.uploading = true
      this.$refs.upload.clearFiles()
      this.form.createTime = response.data.createTime
      this.form.bucketName = this.headers.bucketName
      this.form.fileName = response.data.name
      this.form.objectName = response.data.objectName
      this.form.placeId = this.queryParams.placeId
      this.form.fileLength = response.data.length

      if(this.form.templateType === '1'){
        this.form.transportMode = '1'
      }

      addImport(this.form).then(response => {
        console.log('上传数据')
        if (response.code === 200) {
          this.$message.success("上传成功")
          //this.msgSuccess("上传成功");
          this.uploading = false
          this.open = false;
          this.cancel()
          this.getList();
        } else {
          this.uploading = false
          console.log(response)
          this.msgError('创建记录失败')
        }
      }).catch(err => {
        this.uploading = false
      })
    },
    uploadError(err) {
      this.uploading = false
      console.log(err)
      this.$message.error('文件上传失败')
    },
    /** 提交上传按钮 */
    submitForm: function () {
      //console.log(this.fileList)
      //console.log(this.$refs.upload.$refs['upload-inner'].fileList)
      //console.log(this.$refs.upload.fileList)
      /*if (this.$refs.upload.fileList.length === 0) {
        this.$message.error('请选择要上传的文件')
        return
      }*/
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.$refs.upload.$refs['upload-inner'].fileList.length === 0) {
            this.$message.error('请选择要上传的文件')
            return false
          }
          this.uploading = true
          this.headers.Authorization = 'Bearer ' + getToken()
          this.headers.placeId = this.queryParams.placeId
          console.log('this.form.templateType=' + this.form.templateType)
          this.headers.templateType = this.form.templateType
          this.headers.bucketName = 'tax'
          this.$refs.upload.submit();
        }
      });
      /*if (this.form.id != undefined) {
        updateImport(this.form).then(response => {
          if (response.code === 200) {
            this.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          }
        });
      } else {
        addImport(this.form).then(response => {
          if (response.code === 200) {
            this.msgSuccess("新增成功");
            this.open = false;
            this.getList();
          }
        });
      }*/

    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除导入文件记录编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delImport(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 删除报关数据操作 */
    customsDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除导入文件记录编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return customsDel(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    setStoreCustomer() {
      let customer = this.contractList.find(item => item.customerName === this.form.storeCustomer)
      if (customer) {
        this.form.storeContractId = customer.id
      }

    },
    setSettlementCustomer() {
      let customer = this.contractList.find(item => item.customerName === this.form.settlementCustomer)
      if (customer) {
        this.form.settlementContractId = customer.id
      }
    },
    templateChange() {
      console.log(this.form.templateType)
      if (this.form.templateType === '1') { //入库通知单
        this.rules = this.rules1
        this.noticeType = true
        this.transType = false
        this.templateDownTxt = '入库通知单模板下载'
        this.form.storeCustomer = undefined
        this.form.businessNo = undefined
        this.form.settlementCustomer = '奥云陶勒盖 Oyu Tolgoi Limited'
        this.form.sendName = '奥云陶勒盖 Oyu Tolgoi Limited'
        this.form.receiveName = '金航保税库 Jinhang Bonded Warehouse'
        this.setStoreCustomer() //寄仓合同ID
        this.setSettlementCustomer() //设置结算客户id
        this.$forceUpdate()
      } else if (this.form.templateType === '0') {
        this.rules = this.rules3
        this.noticeType = true
        this.transType = true
        this.form.storeCustomer = undefined
        this.form.settlementCustomer = '奥云陶勒盖 Oyu Tolgoi Limited'
        this.templateDownTxt = '出库通知单模板下载'
        this.form.receiveName = undefined
        this.form.sendName = '金航保税库'
        this.$forceUpdate()
      } else if (this.form.templateType === '2') {
        this.templateDownTxt = '报关数据单模板下载'
        this.form.businessNo = undefined
        this.form.settlementCustomer = '奥云陶勒盖 Oyu Tolgoi Limited'
        this.form.storeCustomer = undefined
        this.form.storeContractId = undefined
        this.form.settlementContractId = undefined
        this.rules = this.rules2
        this.form.sendName = undefined
        this.form.receiveName = undefined
        this.noticeType = false
        this.transType = false
        this.$forceUpdate()
      }
      //this.$forceUpdate()
      console.log(this.form)
    },
    // 收发货单位建议
    nameSearch(queryString, cb) {
      let results = queryString ? this.nameList.filter(this.createFilter(queryString)) : this.nameList
      cb(results)
    },
    createFilter(queryString) {
      return (name) => {
        return (name.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      this.form.sendName = item.value
    },
    handleSelect2(item) {
      this.form.receiveName = item.value
    },
    //模板下载
    handleTemplateDownload() {
      let objectName = undefined
      if (this.form.templateType === '1') {
        objectName = '金航入库通知单模板.xlsx'
        // this.templateDownTxt = '入库通知单模板下载'
        // window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=tax&objectName=金航入库通知单模板.xlsx'
      } else if (this.form.templateType === '0') {
        // this.templateDownTxt = '出库通知单模板下载'
        objectName = '金航出库通知单模板.xls'
        //  window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=tax&objectName=金航出库通知单模板.xls'
      } else if (this.form.templateType === '2') {
        // this.templateDownTxt = '报关数据单模板下载'
        objectName = '金航报关数据单模板.xlsx'
        // window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=tax&objectName=金航报关数据单模板.xlsx'
      }
      window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=tax&objectName=' + objectName
    },
    //通过业务编号获取入库单信息
    getInstoreDocByBusinessNo() {
      //console.log(this.form.businessNo)
      //如果是出库单时，在业务编号中，回车
      if (this.form.templateType === '0' && this.form.businessNo) {
        //用业务编号，从出库单中获取寄仓客户和 结算客户 的数据
        listOutstore_docNo(this.form).then(response => {
          if (response.code === 200) {
            this.enterpriseInfoId = response.rows[0].customerId
            this.getEnterpriseInfo();
            // this.form.storeCustomer = response.data.checkConsumer
            // this.form.settlementCustomer = '奥云陶勒盖 Oyu Tolgoi Limited'
            // this.setStoreCustomer()
            // this.setSettlementCustomer()
          }
        })
      }
    },
    //获取企业信息备案表信息
    getEnterpriseInfo() {
      console.log(this.enterpriseInfoId)
        getInfo(this.enterpriseInfoId).then(response => {
          if (response.code === 200) {
            this.form.receiveName = response.data.eName
            this.form.storeCustomer = response.data.eEname
            // this.form.settlementCustomer = '奥云陶勒盖 Oyu Tolgoi Limited'
            // this.setStoreCustomer()
            // this.setSettlementCustomer()
          }
        })
      },
    /** 删除入库通知单数据及文件 */
    handleDeleteInstoreData(row) {
      let that = this
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除业务编号为"' + row.businessNo + '"的入库通知单数据及文件?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delInstoreDataAndFile(row).then(response => {
          if (response.code === 200) {
            that.msgSuccess("删除成功");
            that.getList()
          }
        })
      }).then(() => {
      }).catch(function () {})
    },
    //删除出库通知单及文件
    handleDeleteOutstoreData(row) {
      let that = this
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除业务编号为"' + row.businessNo + '"的出库通知单数据及文件?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delOutstoreDataAndFile(row).then(response => {
          if (response.code === 200) {
            that.msgSuccess("删除成功");
            that.getList();
          }
        });
      }).then(() => {}).catch(function () {})
    },
  }
}
</script>
