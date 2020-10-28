<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="提煤单号" prop="coalBillNo">
        <el-input
          v-model="queryParams.coalBillNo"
          placeholder="请输入提煤单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-table-column label="提煤单号" align="center" prop="coalBillNo"/>
      <el-table-column label="合同编号" align="center" prop="contractNo"/>
      <el-table-column label="提煤重量" align="center" prop="coalWeight"/>
      <el-table-column label="货物名称" align="center" prop="goodsName"/>
      <el-table-column label="收货单位" align="center" prop="receiveName"/>
      <el-table-column label="客户名称" align="center" prop="customerName"/>
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
          将通关单申报文件拖到此处，或
          <em>点击上传</em>
        </div>

        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
      <el-form ref="form" :model="form">
        <el-form-item label="数据类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择提煤单号">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="提煤单号" prop="coalBillNo">
              <el-input v-model="form.coalBillNo" placeholder="请输入放行单号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属场所" prop="placeId">
              <el-select v-model="form.placeId" placeholder="请选择所属场所" @change="((val)=>{change(val, 'placeId')})">
                <el-option
                  v-for="dept in depts"
                  :key="dept.deptId"
                  :label="dept.deptName"
                  :value="dept.deptId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同号" prop="contractNo">
              <el-select v-model="form.contractNo" placeholder="请输入合同号" @change="((val)=>{change(val, 'contractNo')})">
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
          <el-col :span="12">
            <el-form-item label="客户名称" prop="customerName">
              <el-input v-model="form.customerName" placeholder="请选择客户" :disabled="true"/>
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
            <el-form-item label="库存量" prop="netWeight">
              <el-input v-model="form.netWeight" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收货单位" prop="receiveName">
              <el-input
                v-model="form.receiveName"
                placeholder="请输入收货单位"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可分配重量" prop="distribution">
              <el-input v-model="form.distribution" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提煤重量" prop="coalWeight">
              <el-input v-model.number="form.coalWeight" placeholder="请输入放行量"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物名称" prop="goodsName">
              <el-input v-model="form.goodsName" disabled/>
            </el-form-item>
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
import { listBig, getBig, delBig, addBig, updateBig, getReleaseWeight } from '@/api/place/big'
import { getToken } from '@/utils/auth'
import { listStoreContract } from '@/api/place/storeContract'
import { getStoreByIds } from '@/api/place/store'
import { getUserDepts } from '@/utils/charutils'

export default {
  name: 'Big',
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
      // 大提煤单 大提煤单表格数据
      bigList: [],
      // 通关单类型与车辆信息
      typeList: [
        { value: '0', label: '提运单信息' },
        { value: '1', label: '车辆信息' }
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
        coalBillNo: undefined,
        contractNo: undefined,
        coalWeight: undefined,
        goodsName: undefined,
        receiveName: undefined,
        customerName: undefined,
        revision: undefined
      },
      // 表单参数
      form: {},
      // 校验重量
      weightParams: {
        goodsName: undefined,
        id: undefined
      },
      // 表单校验
      rules: {
        coalBillNo: [
          { required: true, message: '提煤单号不能为空', trigger: 'blur' }
        ],
        coalWeight: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ],
        contractNo: [
          { required: true, message: '合同号不能为空', trigger: 'blur' }
        ],
        goodsName: [
          { required: true, message: '品名不能为空', trigger: 'blur' }
        ]
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
      headers: {},
      // 文件导入参数
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
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/place/big/importData'
      }
    }
  },
  created() {
    // 获取场所
    this.depts = getUserDepts('0')
    this.getList()
    const { tableId } = this.$route.query
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
      listBig(this.queryParams).then((response) => {
        this.bigList = response.rows
        this.total = response.total
        this.loading = false
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
      this.storeIds=[]
      this.reset()
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
      this.resetForm('queryForm')
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
    },
    /**详情按钮 */
    detail(row) {
      this.reset()
      this.$router.push({ path: '/place/big/Selectbig', query: { 'coalBillNo': row.coalBillNo } })
    },
    /** 导入按钮操作 */
    handleImport(row) {
      // 当前行的 提煤单号
      this.form.coalBillNo = row.coalBillNo
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

    uploadSuccess(response) {
    },

    uploadBefore(file) {
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.coalWeight > this.form.netWeight) {
            return this.msgError('库存容量不足!')
          }
          if(this.form.coalWeight>this.form.distribution){
            return this.msgError("超出可分配重量")
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
                this.open = false
                this.getList()
              }
            })
          }
        }
      })
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
        .then(function() {
          return delBig(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function() {
        })
    },
    /** 提交上传文件 */
    submitFileForm() {
      if (this.form.type) {
        this.$refs.upload.submit()
        this.reset()
      } else {
        this.$alert('请选择上传文件类型')
      }
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true })
      this.getList()
    },
    // 下拉列表改变时激活
    change(val, name) {
      // 场所
      if (name === 'placeId') {
        this.queryParams.placeId = val
        listStoreContract(this.queryParams).then((response) => {
          this.contractOptions = response.rows
        })
      }

      // 合同
      if (name === 'contractNo') {
        this.contractOptions.forEach(element => {
          if (element.contractNo === val) {
            // 将得到的企业属性赋值到应用的对象中
            this.form.customerName = element.customerName
            // 客户id
            this.form.customerId = element.customerId
            this.weightParams.id = element.customerId
            // 品名
            this.weightParams.goodsName = element.goodsName
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
          }
        })
      }
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
    }
  }
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
