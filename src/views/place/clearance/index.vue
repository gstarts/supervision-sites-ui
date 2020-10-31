<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="提运单号" prop="customsNo">
        <el-input
          v-model="queryParams.customsNo"
          placeholder="请输入提运单号"
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
          v-hasPermi="['place:clearance:add']"
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
          v-hasPermi="['place:clearance:edit']"
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
          v-hasPermi="['place:clearance:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <!--        <el-button-->
        <!--          type="warning"-->
        <!--          icon="el-icon-download"-->
        <!--          size="mini"-->
        <!--          @click="handleExport"-->
        <!--          v-hasPermi="['place:clearance:export']"-->
        <!--        >导入</el-button>-->
        <el-button
          size="mini"
          icon="el-icon-download"
          type="info"
          @click="handleImport"
          v-hasPermi="['place:clearance:Import']"
        >导入
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="clearanceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="提运单号" align="center" prop="customsNo"/>
      <el-table-column label="运输批次号" align="center" prop="batchNo"/>
      <el-table-column label="提煤单号" align="center" prop="coalBillNo"/>
      <el-table-column label="提运单重量" align="center" prop="wieght"/>
      <el-table-column label="已使用重量" align="center" prop="oldWieght">
        <template slot-scope="scope">
          <span>{{ scope.row.wieght - scope.row.lastWieght }}</span>
        </template>
      </el-table-column>
      <el-table-column label="剩余重量" align="center" prop="lastWieght"/>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改提运单 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body :before-close="closeDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="mini">
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
       <!-- 应急需求变更       -->
        <el-form-item label="寄舱客户" prop="coalBillNo">
          <el-select v-model="form.coalBillNo" filterable placeholder="请选择寄舱客户">
            <el-option
              v-for="item in consumerOptions"
              :key="item.id"
              :label="item.eName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提运单号" prop="customsNo">
          <el-input v-model="form.customsNo" placeholder="请输入提运单号"/>
        </el-form-item>
        <el-form-item label="运输批次号" prop="batchNo">
          <el-input v-model="form.batchNo" placeholder="请输入运输批次号"/>
        </el-form-item>
        <el-form-item label="提运单重量" prop="wieght">
          <el-input v-model.number="form.wieght" placeholder="请输入提运单重量"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" :before-close="closeDialog">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url "
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        :data="form"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将提运单申报文件拖到此处，或
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
        <el-form-item label="寄舱客户" prop="coalBillNo">
          <el-select v-model="form.coalBillNo" filterable placeholder="请选择寄舱客户">
            <el-option
              v-for="item in consumerOptions"
              :key="item.id"
              :label="item.eName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addClearance, delClearance, getClearance, listClearance, updateClearance } from '@/api/place/clearance'
import { selectCoalBillNo } from '@/api/place/big'
import { getToken } from '@/utils/auth'
import { getUserDepts } from '@/utils/charutils'
import { listInfo } from '@/api/basis/enterpriseInfo'

export default {
  name: 'Clearance',
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
      left: 'left',
      // 弹出层标题
      title: '',
      //场所列表
      depts: [],
      // 是否显示弹出层
      open: false,
      // 寄舱客户
      consumerOptions:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        coalBillNo: undefined,
        customsNo: undefined,
        batchNo: undefined,
        wieght: undefined,
        lastWieght: undefined,
        outWieght: undefined,
        revision: undefined,
        oldwieght: 0
      },
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
        url: process.env.VUE_APP_BASE_API + '/place/clearance/importData'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        coalBillNo: [
          { required: true, message: '请选择提煤单', trigger: 'blur' }
        ],
        customsNo: [
          { required: true, message: '请选择提运单号', trigger: 'blur' }
        ],
        batchNo: [
          { required: true, message: '请选择运输批次号', trigger: 'blur' }
        ],
        wieght: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ]
      },
      //提煤单号
      BigList: [],
      //查询列表List
      clearanceList: []
    }
  },
  created() {
    // 获取场所
    this.depts = getUserDepts('0')
    this.getList()

  },
  methods: {
    /** 查询提运单 列表 */
    getList() {
      this.loading = true
      listClearance(this.queryParams).then(response => {
        this.clearanceList = response.rows
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
        customsNo: undefined,
        batchNo: undefined,
        wieght: undefined,
        lastWieght: undefined,
        outWieght: undefined,
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
      this.title = '添加提运单 '
      this.form.placeId=this.depts[0].deptId
      this.getConsumerInfo(this.form.placeId)
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getClearance(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改提运单 '
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateClearance(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              }
            })
          } else {
            addClearance(this.form).then(response => {
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
      this.$confirm('是否确认删除提运单 编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delClearance(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/clearance/export', {
        ...this.queryParams
      }, `place_clearance.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '提运单申报导入'
      this.upload.open = true
      this.reset()
      this.form.placeId=this.depts[0].deptId
      this.getConsumerInfo(this.form.placeId)
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
    /** 客户信息列表 */
    getConsumerInfo(placeId) {
      let consumerParams = { eType: '2',deptId:placeId }
      listInfo(consumerParams).then(response => {
        this.consumerOptions = response.rows
        console.log( this.consumerOptions )
      })
    },
    change(val, name) {
      // 场所
      if (name === 'placeId') {
        //查询场所下的大提煤单中的所有提煤单号
        this.getConsumerInfo(val)

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
      window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=file&objectName=manifest/提运单导入模板.xlsx'
    }
  }
}
</script>
<style lang="scss" scope>
.el-select {
  width: 100%;
}
</style>
