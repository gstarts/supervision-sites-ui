<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="放行单号" prop="passNo">
        <el-input
          v-model="queryParams.passNo"
          placeholder="请输入放行单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="寄舱客户" prop="checkConsumer">
        <el-input
          v-model="queryParams.checkConsumer"
          placeholder="请输入寄舱客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货单位" prop="receiveName">
        <el-input
          v-model="queryParams.receiveName"
          placeholder="请输入收货单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="放行量" prop="passVolume">
        <el-input
          v-model="queryParams.passVolume"
          placeholder="请输入放行量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同号"
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
      <el-form-item label="已申请放行量" prop="declarePassVolume">
        <el-input
          v-model="queryParams.declarePassVolume"
          placeholder="请输入已申请放行量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已实际放行量" prop="realPassVolume">
        <el-input
          v-model="queryParams.realPassVolume"
          placeholder="请输入已实际放行量"
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
      <el-form-item label="运输方式" prop="transportType">
        <el-select v-model="queryParams.transportType" placeholder="请选择运输方式" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="运输单位" prop="transportUnit">
        <el-input
          v-model="queryParams.transportUnit"
          placeholder="请输入运输单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车队" prop="carTeam">
        <el-input
          v-model="queryParams.carTeam"
          placeholder="请输入车队"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="放行状态" prop="passState">
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
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="放行单号" align="center" prop="passNo"/>
      <el-table-column label="寄舱客户" align="center" prop="checkConsumer"/>
      <!-- <el-table-column label="收货单位" align="center" prop="receiveName" /> -->
      <el-table-column label="放行量" align="center" prop="passVolume"/>
      <!-- <el-table-column label="合同号" align="center" prop="contractNo" />
      <el-table-column label="品名" align="center" prop="goodsName" />
      <el-table-column label="已申请放行量" align="center" prop="declarePassVolume" />
      <el-table-column label="已实际放行量" align="center" prop="realPassVolume" />
      <el-table-column label="业务编号" align="center" prop="businessNo" />
      <el-table-column label="运输方式" align="center" prop="transportType" />
      <el-table-column label="运输单位" align="center" prop="transportUnit" />
      <el-table-column label="车队" align="center" prop="carTeam" /> -->
      <el-table-column label="放行状态" align="center" prop="passState" :formatter="ReleaseStatusFormat"/>
      <el-table-column label="所属场所" align="center" prop="placeId" :formatter="corporationFormat"/>
      <el-table-column label="创建时间" align="center" prop="createTime"/>
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="detail(scope.row)"
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
      <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="放行单号" prop="passNo">
              <el-input v-model="form.passNo" placeholder="请输入放行单号"/>
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
            <el-form-item label="寄舱客户" prop="checkConsumer">
              <el-input v-model="form.checkConsumer" placeholder="请输入寄舱客户" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="库位号" prop="businessNo">
              <el-select v-model="form.businessNo" placeholder="请输入库位号" @change="((val)=>{change(val, 'businessNo')})">
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
            <el-form-item label="库存量" prop="storeCapacity">
              <el-input v-model="form.storeCapacity" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="品名" prop="goodsName">
              <el-input v-model="form.goodsName" placeholder="请输入品名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="放行量" prop="passVolume">
              <el-input v-model.number="form.passVolume" placeholder="请输入放行量"/>
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
import { addPassDoc, delPassDoc, getPassDoc, listPassDoc, updatePassDoc } from '@/api/place/passDoc'
import { listStoreContract } from '@/api/place/storeContract'
import { getUserDepts } from '@/utils/charutils'
import { getStoreByIds } from '@/api/place/store'

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
      // 表单参数
      form: {},
      // 库位
      storeIds: [],
      // 表单校验
      rules: {
        passNo: [
          { required: true, message: '放行单号不能为空', trigger: 'blur' }
        ],
        passVolume: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ],
        contractNo: [
          { required: true, message: '合同号不能为空', trigger: 'blur' }
        ],
        goodsName: [
          { required: true, message: '品名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 获取场所
    this.depts = getUserDepts('0')
    /** 放行状态字典 */
    this.getDicts('place_release_status').then((response) => {
      this.releaseStatus = response.data
    })
    this.getList()
  },
  methods: {
    /** 查询放行单 列表 */
    getList() {
      this.loading = true
      listPassDoc(this.queryParams).then(response => {
        this.passDocList = response.rows
        this.total = response.total
        this.loading = false
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
      this.open = false
      this.reset()
      this.contractOptions = []
      this.storeIds = []
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
      this.title = '添加放行单 '
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getPassDoc(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改放行单 '
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.passVolume > this.form.storeCapacity) {
            return this.msgError('库存容量不足! 放行量请小于库存量')
          }
          if (this.form.id != undefined) {
            updatePassDoc(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              }
            })
          } else {
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
      }).then(function() {
        return delPassDoc(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/passDoc/export', {
        ...this.queryParams
      }, `place_passDoc.xlsx`)
    },
    /**详情按钮 */
    detail(row) {
      // this.reset();
      return this.$message('功能正在完善中...')
      // const id = row.id || this.ids
      // const data = this.router.find(el => el.messageType === row.messageType)
      // this.$router.push({ path: '/singlewindow' + data.path })
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
            this.form.checkConsumer = element.customerName
            this.storeIds = element.params.contract
            const ids = element.storeIds
            getStoreByIds(ids).then(response => {
              this.storeIds = response.data
            })
          }
        })
      }

      // 库位
      if (name === 'businessNo') {
        this.storeIds.forEach(element => {
          if (element.storeCode === val) {
            this.form.storeCapacity = element.storeCapacity
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
