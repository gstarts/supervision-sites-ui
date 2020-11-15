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
            :value="dept.deptId"
          />
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
      <!--<el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:car:remove']"
        >删除
        </el-button>
      </el-col>-->
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

    <el-table v-loading="loading" :data="docList" @selection-change="handleSelectionChange">
      <af-table-column type="selection" width="55" align="center"/>
      <af-table-column label="ID" align="center" prop="id"/>
      <af-table-column label="车牌号" align="center" prop="vehicleNo"/>
      <af-table-column label="货净重(KG)" align="center" prop="vehicleGoodsNetWeight"/>
      <af-table-column label="车皮重(KG)" align="center" prop="vehicleTareWeight"/>
      <af-table-column label="分配序号" align="center" prop="serialNo"/>
      <af-table-column label="提煤单号" align="center" prop="coalBillNo"/>
      <af-table-column label="包装方式" align="center" prop="packMode" :formatter="packModeFormatter"/>
      <af-table-column label="车辆类型" align="center" prop="vehicleType"/>
      <af-table-column label="运输方式" align="center" prop="transportMode" :formatter="transModeFormatter"/>
      <af-table-column label="承运单位" align="center" prop="transportUnit"/>
      <af-table-column label="申报海关" align="center" prop="isReportCustoms" :formatter="isReportFormatter"/>
      <af-table-column label="制单人" align="center" prop="makerBy"/>
      <af-table-column label="制单时间" align="center" prop="makerTime"/>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="voidUpdate(scope.row)"
            v-hasPermi="['place:big:remove']"
            v-show="scope.row.storeState === '0' ">作废
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-print"
            @click="print(scope.row)"
            v-hasPermi="['place:big:remove']"
            v-show="(scope.row.inCardPrintState === '0' || scope.row.inCardPrintState === null) && scope.row.storeState === '0' && scope.row.serialNo ===0 ">
            打印入门证
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
            <el-form-item label="车牌号" prop="vehicleNo">
              <el-autocomplete
                class="inline-input"
                v-model="form.vehicleNo"
                :fetch-suggestions="nameSearch"
                placeholder="请输入车牌号"
                @select="handleSelect"
                style="width: 100%"
                clearable
              ></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="车皮重(KG)" prop="vehicleTareWeight">
              <el-input v-model.number="form.vehicleTareWeight" placeholder="请输入车皮重"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货净重(KG)" prop="vehicleGoodsNetWeight">
              <el-input v-model.number="form.vehicleGoodsNetWeight" placeholder="请输入货净重"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="包装类型" prop="packMode">
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
            <el-form-item label="承运单位" prop="transportUnit">
              <el-input v-model="form.transportUnit" placeholder="请输入承运单位"/>
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
        <el-button @click="upload.open = false">取 消</el-button>
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
        <el-form-item label="承运单位" prop="transportUnit">
          <el-input v-model="form.transportUnit" placeholder="请输入承运单位"/>
        </el-form-item>
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
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import {addCar, delCar, getCar, getCarInfo, listCar, updateCar} from '@/api/place/car'
import {selectCoalBillNo, updateVoidCar} from '@/api/place/big'
import {getToken} from '@/utils/auth'
import {getUserDepts} from '@/utils/charutils'
import {addOutstoreDocByCar, listOutstoreDocLike} from "@/api/place/outstoreDoc";

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
        vehicleNo: undefined,
        transportNum: undefined,
        placeId: undefined,
        storeState: '0',
        orderByColumn: 'id',
        isAsc: 'desc'
      },
      fileList: [],
      // 表单参数
      form: {},
      //场所列表
      depts: [],
      // 车牌号列表
      plateNoList: [],
      // 车辆类型
      types: [
        {dictValue: '2', dictLabel: '散杂货'},
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
        {'dictValue': '1', dictLabel: '汽铁联运-散装'},
        {'dictValue': '2', dictLabel: '汽铁联运-集装箱'},
        {'dictValue': '3', dictLabel: '汽运短倒-散装'},
        {'dictValue': '4', dictLabel: '汽运短倒-集装箱'},
        {'dictValue': '5', dictLabel: '全程汽运-散装'},
        {'dictValue': '6', dictLabel: '全程汽运-集装箱'},
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
          {required: true, message: '货净重不能为空', trigger: 'blur'},
          {type: 'number', message: '货净重必须是数字'},
          {pattern: /^\+?[1-9][0-9]*$/, message: '不能为0', trigger: 'blur'}
        ],
        vehicleTareWeight: [
          {required: true, message: '车皮重不能为空', trigger: 'blur'},
          {type: 'number', message: '车皮重必须是数字'},
          {pattern: /^\+?[1-9][0-9]*$/, message: '不能为0', trigger: 'blur'}
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
          {pattern: /^\+?[1-9][0-9]*$/, message: '不能为0', trigger: 'blur'}
        ],
        packMode: [
          {required: true, message: '请选择包装类型', trigger: 'change'}
        ],
        vehicleType: [
          {required: true, message: '请选择车辆类型', trigger: 'change'}
        ],
        /*transportUnit: [
          {required: true, message: '承运单位', trigger: 'change'}
        ],*/
      },
      uploadRules: {
        coalBillNo: [
          {required: true, message: '请选择提煤单', trigger: 'change'}
        ],
        transportUnit: [
          {required: true, message: '运输方式不能为空', trigger: 'blur'}
        ],
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
        headers: {Authorization: 'Bearer ' + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/place/outstoreDoc/importData'
      }
    }
  },
  created() {
    // 获取场所
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId;
      //提煤单号
      selectCoalBillNo({'placeId': this.queryParams.placeId}).then(response => {
        this.BigList = response.rows
      })
      this.getList()
    }
    // 外调车车牌号列表
    this.getPlateNoList()

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
    getPlateNoList() {
      getCarInfo().then(res => {
        this.plateNoList = res.data
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
      this.$refs.upload.clearFiles()
      //清空提煤单号
      // this.BigList = []
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
      this.ids = selection.map(item => item.id)
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
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(this.form)
          this.btnLoading = true
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
    /** 删除按钮操作 */
    /*handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除外调车 编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delCar(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function () {
      })
    },*/
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
          console.log('取消了')
          console.log(row)
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
      this.$refs['uploadForm'].validate(valid => {
        if (valid) {
          console.log(this.form)
          console.log(this.$refs.upload.$refs['upload-inner'].fileList)
          if (this.$refs.upload.$refs['upload-inner'].fileList.length === 0) {
            this.$message.warning('请选择要上传的文件')
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
        console.log(val)
        //查询场所下的大提煤单中的所有提煤单号
        this.form.placeId = this.queryParams.placeId
        console.log(this.form.placeId)
        this.form.coalBillNo = undefined
        selectCoalBillNo({'placeId': this.queryParams.placeId}).then(response => {
          this.BigList = response.rows
        })
        this.getList()
      }
    },
    // 收发货单位建议
    nameSearch(queryString, cb) {
      console.log("1")
      let results = queryString ? this.plateNoList.filter(this.createFilter(queryString)) : this.plateNoList
      for (let item of results) {
        item.value = item.plateNo
      }
      console.log(results);
      cb(results)
    },

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


  },

}
</script>
<style lang="scss" scope>
.el-select {
  width: 100%;
}
</style>
