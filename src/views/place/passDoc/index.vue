<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择所属场所" @change="placeChange">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="放行单号" prop="passNo">
        <el-input
          v-model="queryParams.passNo"
          placeholder="请输入放行单号"
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

      <!--<el-form-item label="放行状态" prop="passState">
        <el-select
          v-model="queryParams.passState"
          placeholder="请输入放行状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        >
          <el-option
            v-for="dict in releaseStatus"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>-->
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
          v-hasPermi="['place:passDoc:add']"
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
          v-hasPermi="['place:passDoc:edit']"
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
          v-hasPermi="['place:passDoc:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:passDoc:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="passDocList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="放行单号" align="center" prop="passNo"/>
      <el-table-column label="寄仓客户" align="center" prop="checkConsumer"/>
      <el-table-column label="合同号" align="center" prop="contractNo"/>
      <el-table-column label="品名" align="center" prop="goodsName"/>
      <el-table-column label="放行量(KGS)" align="center" prop="passVolume"/>
<!--      <el-table-column label="放行状态" align="center" prop="passState" :formatter="ReleaseStatusFormat"/>-->
<!--      <el-table-column label="所属场所" align="center" prop="placeId" :formatter="corporationFormat"/>-->
      <el-table-column label="报送日期" align="center" prop="submitDate"/>
      <el-table-column label="送来日期" align="center" prop="submitBackDate"/>
      <el-table-column label="建单时间" align="center" prop="createTime"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="detail(scope.row)"
            v-hasPermi="['place:passDoc:query']"
          >详情
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:passDoc:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:passDoc:remove']"
          >删除
          </el-button>
          <!--<el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDownload(scope.row)"
          >下载
          </el-button>-->
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
    <!-- 添加或修改放行单 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="寄仓客户" prop="checkConsumer">
              <el-select
                v-model="form.checkConsumer" placeholder="请选择寄仓客户" filterable @change="((val)=>{change(val, 'eName')})"
                :disabled="formUpdateMode">
                <el-option
                  v-for="dict in consumerOptions"
                  :key="dict.id"
                  :label="dict.eName"
                  :value="dict.eName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品名" prop="goodsName">
              <el-input v-model="form.contractNo" style="display: none" />
              <el-select v-model="form.goodsName" placeholder="请选择煤种" @change="((val)=>{change(val, 'coalType')})"
                         :disabled="formUpdateMode">
                <el-option
                  v-for="dict in contractOptions"
                  :key="dict.id"
                  :label="dict.goodsName"
                  :value="dict.goodsName"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="放行单号" prop="passNo">
              <el-input v-model="form.passNo" placeholder="请输入放行单号" :disabled="formUpdateMode"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="放行量(KGS)" prop="passVolume">
              <el-input v-model.number="form.passVolume" placeholder="请输入放行量" :disabled="formUpdateMode"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="报送日期" prop="submitDate">
              <el-date-picker
                v-model="form.submitDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="送来日期" prop="submitBackDate">
              <el-date-picker
                v-model="form.submitBackDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
          </el-col>
          <el-col :span="10">
            <el-form-item label="可放行量" prop="release">
              <el-input v-model="form.release" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-left: 50px;padding-right: 50px">
          <el-col :span="24">
            <el-upload
              ref="upload"
              style="width: 100%"
              :action=uploadAction
              :headers="headers"
              accept=".png, .jpg, .jpeg, .pdf"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :limit="10"
              :on-exceed="handleExceed"
              :file-list="fileList"
              multiple>
              <el-button>上传附件</el-button>
              <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“.png”或“.jpg”或“.jpeg”或“.pdf”格式文件！</div>
            </el-upload>
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
import {addPassDoc, delPassDoc, getPassDoc, listPassDoc, updatePassDoc} from '@/api/place/passDoc'
import {listStoreContract} from '@/api/place/storeContract'
import {getUserDepts} from '@/utils/charutils'
import {listInfo} from '@/api/basis/enterpriseInfo'
import {getReleaseWeight} from '@/api/place/big'
import {getToken} from '@/utils/auth'
import {delAttachment, getPreview} from "@/api/place/attachment";

export default {
  name: 'PassDoc',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 合同列表
      contractOptions: [],
      // 放行状态字典
      releaseStatus: [],
      // 客户名称列表
      consumerOptions: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 放行单 表格数据
      passDocList: [],
      // 场所名称列表
      depts: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        passNo: undefined,
        checkConsumer: undefined,
        customerId: undefined,
        receiveName: undefined,
        passVolume: undefined,
        contractNo: undefined,
        goodsName: undefined,
        declarePassVolume: undefined,
        realPassVolume: undefined,
        businessNo: undefined,
        transportType: undefined,
        transportUnit: undefined,
        carTeam: undefined,
        passState: undefined
      },
      // 校验重量
      weightParams: {
        id: '',
        coalType: ''
      },
      // 表单参数
      form: {
        checkConsumer: undefined,
        contractNo: undefined,
      },
      // 煤种
      coalTypeOptions: [],
      /***上传参数start ***/
      uploadAction: process.env.VUE_APP_BASE_API + '/place/attachment/add',
      uploadData: {},
      uploading: false,
      fileList: [],
      headers: {'Authorization': 'Bearer ' + getToken(), 'bucketName': 'place', 'pathName': 'pass'},
      passStateDic: [
        //0，初始，1放行中，2放行完成)
        {'key': '0', 'value': '初始'},
        {'key': '1', 'value': '放行中'},
        {'key': '2', 'value': '放行完成'},
      ],
      /***上传参数end ***/
      // 表单校验
      rules: {
        checkConsumer: [
          {required: true, message: '请选择寄仓客户', trigger: ['blur', 'change']}
        ],
        passNo: [
          {required: true, message: '放行单号不能为空', trigger: 'blur'}
        ],
        passVolume: [
          {required: true, message: '请输入', trigger: 'blur'},
          {type: 'number', message: '必须为数字值'}
        ],
        contractNo: [
          {required: true, message: '合同号不能为空', trigger: 'blur'}
        ],
        goodsName: [
          {required: true, message: '品名不能为空', trigger: 'blur'}
        ]
      },
      dateRange: ['', ''],//时间组件
      formUpdateMode: false,
      attachmentList: [],//保存附件的id
    }
  },
  created() {
    // 获取场所
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList()
      this.getConsumerInfo(this.queryParams.placeId)
    }

    /** 放行状态字典 */
    this.getDicts('place_release_status').then((response) => {
      this.releaseStatus = response.data
    })
    /** 煤种类型*/
    this.getDicts('coal_type').then(response => {
      this.coalTypeOptions = response.data
    })

  },
  methods: {
    /** 查询放行单 列表 */
    getList() {
      this.loading = true
      /*this.addDateRange(this.queryParams, this.dateRange)
      this.queryParams.beginTime = this.dateRange[0]
      this.queryParams.endTime = this.dateRange[1]*/
      listPassDoc(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.passDocList = response.rows
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
    // 场所名称翻译
    corporationFormat(row, column) {
      let ccCorporationName = ''
      this.depts.forEach(element => {
        if (element.deptId == row.placeId) {
          ccCorporationName = element.deptName
        }
      })
      return ccCorporationName
    },

    // 放行状态翻译
    ReleaseStatusFormat(row, column) {
      return this.selectDictLabel(this.releaseStatus, row.passState)
    },
    // 取消按钮
    cancel() {
      //如果是新增的时候，点了取消，则删除文件记录
      if (this.form.id === undefined) {
        if (this.attachmentList.length > 0) {
          delAttachment(this.attachmentList).then(response => {
            this.attachmentList = []
          }).catch(err => {
            this.attachmentList = []
          })
        }
      } else {
        this.attachmentList = []
      }
      this.open = false
      this.storeIds = []
      //this.consumerOptions = []
      this.fileList = []
      this.$refs.upload.clearFiles()
      this.reset()

      this.weightParams = {
        id: '',
        coalType: ''
      }
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        passNo: undefined,
        checkConsumer: undefined,
        receiveName: undefined,
        passVolume: undefined,
        contractNo: undefined,
        goodsName: undefined,
        declarePassVolume: undefined,
        realPassVolume: undefined,
        businessNo: undefined,
        transportType: undefined,
        transportUnit: undefined,
        carTeam: undefined,
        passState: undefined,
        createTime: undefined,
        createBy: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        revision: undefined,
        submitDate: undefined,
        submitBackDate: undefined,
      }
      this.resetForm('form')
      this.queryParams.customerId = undefined
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
      this.title = '添加放行单 '
      this.form.placeId = this.queryParams.placeId
      this.formUpdateMode = false
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      this.formUpdateMode = true
      const id = row.id || this.ids
      getPassDoc(id).then(response => {
          this.form = response.data
          this.open = true
          this.title = '修改放行单 '


          this.fileList = []
          if (response.data.remark) {
            this.attachmentList = response.data.remark.split(',')
            for (let file of response.data.attachmentList) {
              this.fileList.push({
                'name': file.originalName,
                'url': file.objectName,
                'bucketName': file.bucketName,
                'id': file.id
              })
            }
          }

          //修改时，增加可放行量的显示
          let customer = this.consumerOptions.find(item => item.eName === this.form.checkConsumer)
          if (customer) {
            this.weightParams.id = customer.id
            this.weightParams.coalType = this.form.goodsName
            //debugger
            getReleaseWeight(this.weightParams).then(response => {
              this.form.release = response.data.release
              this.$forceUpdate()
            })
          }
        }
      )
    },
    /** 提交按钮 */
    submitForm: function () {
      console.log(this.form)
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.passVolume > this.form.release) {
            return this.msgError('可放行量不足！请联系客户')
          }
          if (this.form.id != undefined) {
            this.form.remark = this.attachmentList.join(',')
            updatePassDoc(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
                this.$refs.upload.clearFiles()
              }
            })
          } else {
            this.form.remark = this.attachmentList.join(',')
            addPassDoc(this.form).then(response => {
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
      this.$confirm('是否确认删除放行单 编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delPassDoc(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function () {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/passDoc/export', {
        ...this.queryParams
      }, `放行单.xlsx`)
    },
    /**详情按钮 */
    detail(row) {
      this.reset()
      const id = row.contractNo
      this.$router.push({path: '/place/big', query: {tableId: id}})
    },
    /***上传start ***/
    handleRemove() {
    },
    handlePreview(file) {
      let id = ''
      if (file.response) {
        id = file.response.data
      } else {
        id = file.id
      }
      // console.log(id)
      getPreview(id).then(response => {
        if (response.data) {
          window.open(response.data)
        }
      })
    },
// 文件上传成功
    uploadSuccess(response) {
      if (response.code !== 200) {
        this.$message.error(response.msg)
        this.uploading = false
        return false
      }

      this.uploading = true
      this.attachmentList.push(response.data)
      /*this.$message.success("上传成功")
      this.uploading = true
      this.$refs.upload.clearFiles()
      // 路径+文件名
      this.form.minObjectName = response.data.objectName
      // 文件名
      this.form.minFileName = response.data.name
      // 文件长度
      this.form.minFileLength = response.data.length
      // 桶名
      this.form.minBucketName = response.data.bucketName
      // 路径
      this.form.minPath = response.data.path*/
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10     //这里做文件大小限制
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!请等待读条完毕,并重新上传',
          type: 'error'
        });
      }
    },
//删除之前的钩子
    beforeRemove(file, fileList) {
      /* console.log(fileList)
       console.log(file)*/
      let index = fileList.indexOf(file)
      //console.log(index)
      let attachmentId = this.attachmentList[index];
      console.log(attachmentId)
      //console.log(this.attachmentList)
      //删除指定位置的元素
      this.attachmentList.splice(index, 1)
      //console.log(this.attachmentList)
      //删除文件 及附件记录
      delAttachment(attachmentId)
    },
    handleExceed() {
      this.$message.warning('最多只能上传10个附件')
    },
    uploadError(err) {
      this.uploading = false
      console.log(err)
      this.$message.error('文件上传失败')
    },
    /***上传end ***/

    /** 文件下载 */
    handleDownload(row) {
      window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=' + row.minBucketName + '&objectName=' + row.minObjectName
    },
// 下拉列表改变时激活
    change(val, name) {
      // 场所
      if (name === 'placeId') {
        this.queryParams.placeId = val
        this.getConsumerInfo(val)
      }
      // 煤种
      if (name === 'coalType') {
        this.contractOptions.forEach(element => {
          if (element.goodsName === val) {
            this.weightParams.coalType = val
            //获取合同号
            this.form.contractNo = element.contractNo

          }
        })
      }
      // 客户名称->寄仓客户id
      if (name === 'eName') {
        this.consumerOptions.forEach(element => {
          if (element.eName === val) {
            this.form.customerId = element.id
            this.weightParams.id = element.id
            this.queryParams.customerId = element.id
            listStoreContract(this.queryParams).then((response) => {
              this.form.goodsName = ''
              this.contractOptions = response.rows
              this.queryParams.customerId = undefined
            })
          }
        })
      }
      if (this.weightParams.coalType && this.weightParams.id) {
        getReleaseWeight(this.weightParams).then(response => {
          this.form.release = response.data.release
          this.$forceUpdate()
        })
      }
    },
    placeChange() {
      this.getConsumerInfo(this.queryParams.placeId)
      this.handleQuery()
    }
  }
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
