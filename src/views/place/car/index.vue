<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="车牌号" prop="plateNo">
        <el-input
          v-model="queryParams.plateNo"
          placeholder="请输入车牌号"
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
          v-hasPermi="['place:car:add']"
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
          v-hasPermi="['place:car:edit']"
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
          v-hasPermi="['place:car:remove']"
        >删除
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
          type="info"
          v-hasPermi="['place:car:Import']"
          @click="handleImport">
          导入
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="carList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="车牌号" align="center" prop="plateNo"/>
      <el-table-column label="净重" align="center" prop="netWeight"/>
      <el-table-column label="载重" align="center" prop="load"/>
      <el-table-column label="运输次数" align="center" prop="transportNum"/>
      <el-table-column label="分配次数" align="center" prop="allocationNum"/>
      <el-table-column label="提煤单号" align="center" prop="coalBillNo"/>
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
      <el-form ref="form" :model="form" :rules="rules" number label-width="120px" size="mini">
        <el-row>
          <!-- 所属场所 -->
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
          <el-col :span="12">
            <el-form-item label="提煤单号" prop="coalBillNo">
              <el-select v-model="form.coalBillNo" filterable placeholder="请选择提煤单号">
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
            <el-form-item label="车牌号" prop="plateNo">
              <el-input v-model="form.plateNo" placeholder="请输入车牌号"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="净重" prop="netWeight">
              <el-input v-model.number="form.netWeight" placeholder="请输入净重"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="载重" prop="load">
              <el-input v-model.number="form.load" placeholder="请输入载重"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="运输次数" prop="transportNum">
              <el-input v-model="form.transportNum" placeholder="请输入运输次数"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车辆类型" prop="transportNum">
              <el-select v-model="form.type" filterable placeholder="请选择提煤单号">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
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
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
      <el-form ref="form" :model="form" :label-position="left" label-width="80px" size="mini">
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
        <el-form-item label="提煤单号" prop="coalBillNo">
          <el-select v-model="form.coalBillNo" placeholder="请选择提煤单号" filterable>
            <el-option
              v-for="item in BigList"
              :key="item.coalBillNo"
              :label="item.coalBillNo"
              :value="item.coalBillNo"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { addCar, delCar, getCar, listCar, updateCar } from '@/api/place/car'
import { selectCoalBillNo } from '@/api/place/big'
import { getToken } from '@/utils/auth'
import { getUserDepts } from '@/utils/charutils'

export default {
  name: 'Car',
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
      // 外调车 表格数据
      carList: [],
      // 弹出层标题
      title: '',
      left: 'left',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        coalBillNo: undefined,
        plateNo: undefined,
        netWeight: undefined,
        load: undefined,
        transportNum: undefined,
        status: undefined,
        allocationNum: undefined,
        revision: undefined
      },
      // 表单参数
      form: {},
      //场所列表
      depts: [],
      // 车辆类型
      types: [
        { value: 'S', label: '散杂货' },
        { value: 'C', label: '集装箱' }
      ],
      // 表单校验
      rules: {
        placeId: [
          { required: true, message: '请选择提煤单', trigger: 'blur' }
        ],
        coalBillNo: [
          { required: true, message: '请选择提煤单', trigger: 'blur' }
        ],
        netWeight: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ],
        load: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ],
        plateNo: [
          { required: true, message: '车牌号不能为空', trigger: 'blur' }
        ],
        transportNum: [
          { required: true, message: '运输次数不能为空', trigger: 'blur' }
        ]

      },
      //提煤单号
      BigList: [],
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
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/place/car/importData'
      }
    }
  },
  created() {
    // 获取场所
    this.depts = getUserDepts('0')
    this.getList()

  },
  methods: {
    /** 查询外调车 列表 */
    getList() {
      this.loading = true
      listCar(this.queryParams).then(response => {
        this.carList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
      this.BigList = []
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        coalBillNo: undefined,
        plateNo: undefined,
        netWeight: undefined,
        load: undefined,
        transportNum: undefined,
        status: '1',
        allocationNum: undefined,
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加外调车 '
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCar(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改外调车 '
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateCar(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              }
            })
          } else {
            addCar(this.form).then(response => {
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
      this.$confirm('是否确认删除外调车 编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delCar(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/car/export', {
        ...this.queryParams
      }, `place_car.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '申报车辆导入'
      this.upload.open = true
      this.reset()
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true })
      this.getList()
    },
    // 提交上传文件
    submitFileForm() {
      if (this.form.coalBillNo&&this.form.placeId) {
        this.$refs.upload.submit()
      } else {
        this.$alert('请选择场所和提煤单号')
      }
    },
    change(val, name) {
      // 场所
      if (name === 'placeId') {
        //查询场所下的大提煤单中的所有提煤单号
        let placeId = val
        this.form.coalBillNo = undefined
        selectCoalBillNo({ 'placeId': placeId }).then(response => {
          this.BigList = response.rows
        })
      }
    },
    closeDialog() {
        this.open = false,
        this.upload.open = false,
        this.cancel()
    },
    /** 下载模板操作 */
    //货运车辆
    importTemplate() {
      window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=file&objectName=manifest/货运车辆导入模板.xlsx'
    }
  }
}
</script>
<style lang="scss" scope>
.el-select {
  width: 100%;
}
</style>
