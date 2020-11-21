<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryParams" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择所属场所" @change="((val)=>{change(val, 'placeId')})">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="提煤单号" prop="coalBillNo">
        <el-input
          v-model="queryParams.coalBillNo"
          placeholder="请输入提煤单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="提煤客户" prop="receiveName">
        <el-input
          v-model="queryParams.receiveName"
          placeholder="请输入提煤客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="品名" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入品名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <!--        statusOptions-->
        <!--        <el-input-->
        <!--          v-model="queryParams.status"-->
        <!--          placeholder="请输入状态"-->
        <!--          clearable-->
        <!--          size="small"-->
        <!--          @keyup.enter.native="handleQuery"-->
        <!--        />-->
        <el-select v-model="queryParams.status" placeholder="请选择状态" size="small">
          <el-option
            v-for="dept in statusOptions"
            :key="dept.dictValue"
            :label="dept.dictLabel"
            :value="dept.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="仓储合同" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入仓储合同"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="建单时间" prop="createTime">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索
        </el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
        >重置
        </el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['place:big:add']"
        >新增
        </el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:big:edit']"
        >修改
        </el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:big:remove']"
        >删除
        </el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:big:export']"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table
      v-loading="loading"
      :data="bigList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"/>
      <!-- <el-table-column label="主键" align="center" prop="id" /> -->
      <el-table-column label="寄仓客户" align="center" prop="customerName"/>
      <el-table-column label="仓储合同" align="center" prop="contractNo"/>
      <el-table-column label="提煤单号" align="center" prop="coalBillNo"/>
      <el-table-column label="提煤客户" align="center" prop="receiveName"/>
      <el-table-column label="品名" align="center" prop="goodsName"/>
      <el-table-column label="提煤重量" align="center" prop="coalWeight"/>
      <el-table-column label="销售合同号" align="center" prop="salesContract"/>
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormatter"/>
      <el-table-column label="建单时间" align="center" prop="createTime"/>
      <!-- <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="乐观锁" align="center" prop="revision" /> -->
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
            icon="el-icon-detail"
            @click="detail(scope.row)"
            v-hasPermi="['place:big:query']"
          >详情
          </el-button>
          <el-button
            type="text"
            icon="el-icon-plus"
            size="mini"
            @click="handleImport(scope.row)"
            v-hasPermi="['place:big:Import']"
            v-show="scope.row.status != '1'"
          >导入
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:big:edit']"
            v-show="scope.row.status != '1'"
          >修改
          </el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:big:remove']"
            v-show="scope.row.status != '1'"
          >删除
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改导入文件记录 对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :data="form"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将车辆信息文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
      <!--      <el-form ref="form" :model="form" :label-position="left" size="mini">-->
      <!--        <el-form-item label="数据类型" prop="type">-->
      <!--          <el-select v-model="form.type" placeholder="请选择类型">-->
      <!--            <el-option-->
      <!--              v-for="item in typeList"-->
      <!--              :key="item.value"-->
      <!--              :label="item.label"-->
      <!--              :value="item.value">-->
      <!--            </el-option>-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
      <!--      </el-form>-->
    </el-dialog>
    <el-dialog :title="title" :visible.sync="open" append-to-body :before-close="closeDialog">
      <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属场所" prop="placeId">
              <el-select v-model="form.placeId" placeholder="请选择所属场所">
                <el-option
                  v-for="dept in depts"
                  :key="dept.deptId"
                  :label="dept.deptName"
                  :value="dept.deptId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="寄仓客户" prop="customerName">
              <el-select
                v-model="form.customerName" placeholder="请选择寄舱客户" filterable @change="((val)=>{change(val, 'eName')})">
                <el-option
                  v-for="dict in consumerOptions"
                  :key="dict.eName"
                  :label="dict.eName"
                  :value="dict.eName"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提煤单号" prop="coalBillNo">
              <el-input v-model="form.coalBillNo" placeholder="请输入提煤单号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仓储合同" prop="contractNo">
              <el-select v-model="form.contractNo" placeholder="请输入仓储合同" filterable
                         @change="((val)=>{change(val, 'contractNo')})">
                <el-option
                  v-for="item in contractOptions"
                  :key="item.contractNo"
                  :label="item.contractNo"
                  :value="item.contractNo"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="库位号" prop="storeCode">
              <el-select v-model="form.storeCode" placeholder="请输入库位号" @change="((val)=>{change(val, 'storeCode')})">
                <el-option
                  v-for="type in storeIds"
                  :key="type.storeCode"
                  :label="type.storeCode"
                  :value="type.storeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库存量(KG)" prop="netWeight">
              <el-input v-model="form.netWeight" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="receiveName">
              <el-input
                v-model="form.receiveName"
                placeholder="请输入客户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可分配重量(KG)" prop="distribution">
              <el-input v-model="form.distribution" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        <el-row>-->
        <!--          <el-col :span="12">-->
        <!--            <el-form-item label="承运单位" prop="carrier">-->
        <!--              &lt;!&ndash; <el-input-->
        <!--                v-model="form.carrier"-->
        <!--                placeholder="请输入承运单位"-->
        <!--              /> &ndash;&gt;-->
        <!--              <el-select v-model="form.carrier" filterable placeholder="请选择承运单位">-->
        <!--                <el-option-->
        <!--                  v-for="item in transUnitList"-->
        <!--                  :key="item.eName"-->
        <!--                  :label="item.eName"-->
        <!--                  :value="item.eName">-->
        <!--                </el-option>-->
        <!--              </el-select>-->
        <!--            </el-form-item>-->
        <!--          </el-col>-->
        <!--          <el-col :span="12">-->
        <!--            <el-form-item label="运输方式" prop="transportType">-->
        <!--              <el-select v-model="form.transportType">-->
        <!--                <el-option-->
        <!--                  v-for="type in transportOptions"-->
        <!--                  :key="type.dictValue"-->
        <!--                  :label="type.dictLabel"-->
        <!--                  :value="type.dictValue"-->
        <!--                />-->
        <!--              </el-select>-->

        <!--            </el-form-item>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="提煤重量(KG)" prop="coalWeight">
              <el-input v-model.number="form.coalWeight" placeholder="请输入重量"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物名称" prop="goodsName">
              <el-input v-model="form.goodsName" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="销售合同" prop="salesContract">
              <el-input v-model.number="form.salesContract" placeholder="请输入销售合同号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="app用户" prop="phone">
              <el-input v-model="form.phone" placeholder="app用户"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left: 120px">
          <el-col :span="12">
            <el-upload
              ref="uploadTwo"
              style="width: 100%"
              accept=".png, .jpg, .jpeg, .pdf"
              :action="uploadActionTwo"
              :headers="headersTwo"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :limit="1"
              :on-exceed="handleExceed"
              list-type="picture-card"
              :file-list="fileListT">
              <el-button size="mini" style="background: #91eae4">上传附件</el-button>
              <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“.png”或“.jpg”或“.jpeg”或“.pdf”格式文件！</div>
            </el-upload>
            <div>
              <span v-show="updateForm.minFileName">{{ updateForm.minBucketName }}{{ updateForm.minFileName }}</span>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-download"
                @click="handleDownload()"
                v-show="updateForm.minFileName"
              >下载
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="deleteBig()"
                v-show="updateForm.minFileName"
                v-hasPermi="['place:big:remove']"
              >删除
              </el-button>
            </div>
          </el-col>
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
import {listBig, getBig, delBig, addBig, updateBig, getReleaseWeight, delImport, listBigLike} from '@/api/place/big'
import {getToken} from '@/utils/auth'
import {listStoreContract} from '@/api/place/storeContract'
import {getStoreByIds} from '@/api/place/store'
import {getUserDepts} from '@/utils/charutils'
import {listInfo} from '@/api/basis/enterpriseInfo'

export default {
  name: 'Big',
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      //
      updateForm: {},
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      left: 'left',
      // 大提煤单 大提煤单表格数据
      bigList: [],
      transUnitList: [],//承运单位列表
      // 通关单类型与车辆信息
      typeList: [
        {value: '0', label: '提运单信息'},
        {value: '1', label: '车辆信息'}
      ],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层
      openImport: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        coalBillNo: undefined,
        contractNo: undefined,
        coalWeight: undefined,
        goodsName: undefined,
        receiveName: undefined,
        customerName: undefined,
        revision: undefined,
        status: undefined,
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      //上传参数
      // 第二个
      uploadActionTwo: process.env.VUE_APP_BASE_API + '/minio/files/place/upload/anyFile',
      uploadDataTwo: {},
      // uploading: false,
      fileListT: [],
      headersTwo: {
        'Authorization': '',
        'placeId': '',
        'bucketName': 'big',
        'filename': ''
      },
      // 校验重量
      weightParams: {
        coalType: undefined,
        id: undefined
      },
      // 客户名称列表
      consumerOptions: [],
      //运输方式
      transportOptions: [],
      //状态字典集
      statusOptions: [],
      // 表单校验
      rules: {


        placeId: [
          {required: true, message: '请选择场所', trigger: 'blur'}
        ],
        customerName: [
          {required: true, message: '请选择寄仓客户', trigger: 'blur'}
        ],
        coalBillNo: [
          {required: true, message: '提煤单号不能为空', trigger: 'blur'}
        ],
        coalWeight: [
          {required: true, message: '请输入', trigger: 'blur'},
          {type: 'number', message: '必须为数字值'}
        ],
        contractNo: [
          {required: true, message: '仓储合同不能为空', trigger: 'blur'}
        ],
        goodsName: [
          {required: true, message: '品名不能为空', trigger: 'blur'}
        ],
        carrier: [
          {required: true, message: '承运单位不能为空', trigger: 'blur'}
        ],
        transportType: [
          {required: true, message: '请选择运输方式', trigger: 'blur'}
        ],
        salesContract: [
          {required: true, message: '请输入销售合同', trigger: 'blur'}
        ],
        receiveName: [
          {required: true, message: '请输入客户名称', trigger: 'blur'}
        ],
        storeCode: [
          {required: true, message: '请选择库位', trigger: 'blur'}
        ],
      },
      // 场所名称列表
      depts: [],
      // 合同
      contractOptions: [],
      // 库位号
      storeIds: [],
      uploadAction: process.env.VUE_APP_BASE_API + '/place/big',
      uploadData: {},
      uploading: false,
      fileList: [],
      //时间组件
      dateRange: [],
      headers: {},
      // 文件导入参数

      // 文件上传第一个
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
        url: process.env.VUE_APP_BASE_API + '/place/big/importData'
      }
    }
  },
  created() {
    // 获取场所
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.form.placeId = this.queryParams.placeId
      this.getList()
      this.getConsumerInfo(this.queryParams.placeId)
      this.getTransportUnitInfo()
    }

    // 运输方式
    this.getDicts('place_transport_type').then(response => {
      this.transportOptions = response.data
    })
    //状态
    this.getDicts('place_coal_big_status').then(response => {
      this.statusOptions = response.data
      console.log(this.statusOptions)
    })
    //this.getList()
    const {tableId} = this.$route.query
    if (tableId) {
      this.queryParams.contractNo = tableId
      // 获取表详细信息
      listBig(this.queryParams).then((response) => {
        this.bigList = response.rows
        this.total = response.total
        this.queryParams.contractNo = undefined
      })
    }
  },
  methods: {
    /** 查询大提煤单列表 */
    getList() {
      this.loading = true
      listBigLike(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
        this.bigList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 客户信息列表 */
    getConsumerInfo(placeId) {
      let consumerParams = {eType: '2', deptId: placeId, companyType: '2'}
      listInfo(consumerParams).then(response => {
        this.consumerOptions = response.rows
      })
    },
    // 导入取消按钮
    cancelImport() {
      this.openImport = false
      this.reset()

    },
    // 取消按钮
    cancel() {
      this.open = false
      this.storeIds = []
      this.contractOptions = []
      //this.consumerOptions = []
      this.reset()
      this.$refs.uploadTwo.clearFiles()
    },
    closeDialog() {
      this.open = false
      this.cancel()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        coalBillNo: undefined,
        contractNo: undefined,
        coalWeight: undefined,
        goodsName: undefined,
        receiveName: undefined,
        customerName: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        revision: undefined
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
      this.resetForm('queryParams'),
        this.dateRange = [],
        this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加大提煤单'
      this.form.placeId = this.queryParams.placeId
    },
    /**详情按钮 */
    detail(row) {
      this.reset()
      this.$router.push({path: '/place/big/Selectbig', query: {'coalBillNo': row.coalBillNo}})
    },
    /** 导入按钮操作 */
    handleImport(row) {
      // 当前行的 提煤单号
      this.form.coalBillNo = row.coalBillNo
      this.form.placeId = row.placeId
      this.upload.open = true
      this.upload.title = '导入数据文件'
    },
    /** 校验重量*/
    checkWeight() {
      getReleaseWeight(this.weightParams).then(response => {
        if (response.code === 200) {
          this.form.distribution = response.data.distribution
          this.$forceUpdate()
        }
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getBig(id).then((response) => {
        this.form = response.data
        this.updateForm = response.data
        this.open = true
        this.title = '修改大提煤单'
      })
    },
    uploadProcess() {
      this.uploading = true
    },
    uploadError(err) {
      this.uploading = false
      this.$message.error('文件上传失败')
    },

    uploadBefore(file) {
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.coalWeight > this.form.netWeight) {
            return this.msgError('库存容量不足!')
          }
          if (this.form.coalWeight > this.form.distribution) {
            return this.msgError('超出可分配重量')
          }
          if (this.form.id != undefined) {
            updateBig(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              }
            })
          } else {
            addBig(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.queryParams.customerId = undefined
                this.open = false
                this.getList()
              }
            })
          }
        }
      })
    },
    /** 删除云上附件信息按钮操作 */
    deleteBig: function () {
      const id = this.form.id
      delImport(id)
      this.$refs.uploadTwo.clearFiles()
      getBig(id).then((response) => {
        this.form = response.data
        this.updateForm = response.data
        this.updateForm.minFileName = ''
        this.open = true
        this.title = '修改大提煤单'
      })
    },

    /** 限制上传pdf文件大小 */
    beforeUpload(file) {
      // var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      // const extension = testmsg === 'png'
      // const extension2 = testmsg === 'jpg'
      // const extension3 = testmsg === 'jpeg'
      // const extension4 = testmsg === 'pdf'
      const isLt2M = file.size / 1024 / 1024 < 1     //这里做文件大小限制
      // if(!extension && !extension2 && !extension3 && !extension4) {
      // 	this.$message({
      // 		message: '上传文件只能是 png,jpg,jpeg,pdf格式!',
      // 		type: 'warning'
      // 	});
      // }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 1MB!请等待读条完毕,并重新上传',
          type: 'error'
        });
      }
      // return extension || extension2 && isLt2M
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm(
        '是否确认删除大提煤单 大提煤单编号为"' + ids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function () {
          return delBig(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function () {
        })
    },
    /** 提交上传文件 */
    submitFileForm() {
      this.form.type = "1"
      if (this.form.type) {
        this.$refs.upload.submit()
        this.reset()
      } else {
        this.$alert('请选择上传文件类型')
      }
    },

    /***上传start ***/

    handleRemove() {

    },
    // 文件预览
    handlePreview(file) {
      window.open(file.url) //blob格式地址
    },
    // 文件上传成功
    uploadSuccess(response) {
      if (response.code !== 200) {
        this.$message.error(response.msg)
        this.uploading = false
        return false
      }
      this.$message.success("上传成功")
      this.uploading = true
      // this.$refs.uploadTwo.clearFiles()
      // 路径+文件名
      this.form.minObjectName = response.data.objectName
      // 文件名
      this.form.minFileName = response.data.name
      // 文件长度
      this.form.minFileLength = response.data.length
      // 桶名
      this.form.minBucketName = response.data.bucketName
      // 路径
      this.form.minPath = response.data.path
    },
    beforeRemove() {

    },
    handleExceed() {

    },

    //下载
    handleDownload() {
      console.log(this.updateForm)
      window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=' + this.updateForm.minBucketName + '&objectName=' + this.updateForm.minObjectName
    },

    /***上传end ***/
    // 文件上传成功处理（第一个）
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(response.msg, '导入结果', {dangerouslyUseHTMLString: true})
      this.getList()
    },
    // 下拉列表改变时激活
    change(val, name) {
      // 场所
      if (name === 'placeId') {
        this.queryParams.placeId = val
        this.form.placeId = val
        this.form.customerName = undefined
        this.form.contractNo = undefined
        this.form.storeCode = undefined
        this.storeIds = []
        this.contractOptions = []
        this.getConsumerInfo(val)
        this.getTransportUnitInfo()
        this.getList()
      }
      // 客户
      if (name === 'eName') {
        this.form.contractNo = undefined
        this.consumerOptions.forEach(element => {
          if (element.eName === val) {
            this.form.customerId = element.id
            this.weightParams.id = element.id
            this.queryParams.customerId = element.id
            listStoreContract(this.queryParams).then((response) => {
              this.contractOptions = response.rows
            })
          }
        })
      }


      // 合同
      if (name === 'contractNo') {
        this.form.storeCode = undefined
        this.contractOptions.forEach(element => {
          if (element.contractNo === val) {
            // 品名
            this.weightParams.coalType = element.goodsName
            this.form.goodsName = element.goodsName
            this.checkWeight()
            this.storeIds = element.params.contract
            const ids = element.storeIds
            getStoreByIds(ids).then(response => {
              this.storeIds = response.data
            })
          }
        })
      }
      // 库位
      if (name === 'storeCode') {
        this.storeIds.forEach(element => {
          if (element.storeCode === val) {
            this.form.netWeight = element.netWeight
            this.$forceUpdate()
          }
        })
      }
    },
    getTransportUnitInfo() { //查承运单位
      this.loading = true;
      let info = {"eType": '2', 'deptId': this.queryParams.placeId, 'companyType': '4'}
      listInfo(info).then(response => {
        this.transUnitList = response.rows;
        this.loading = false;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'place/big/export',
        {
          ...this.queryParams
        },
        `place_big.xlsx`
      )
    },
    statusFormatter(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
  }
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
