<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb20">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" :disabled="btnDisable">新增
        </el-button>
        <el-button type="success" icon="el-icon-edit" size="mini" @click="submitForm" :disabled="btnDisable">暂存
        </el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete" :disabled="btnDisable">
          删除
        </el-button>
      </el-col>
      <el-button type="danger" icon="el-icon-thumb" size="mini" @click="updateStatementCode"
                 v-hasPermi="['waybill:declare:declare']" style="float:right" disabled>申报
      </el-button>
    </el-row>
    <!-- :rules="headRules" -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="form" ref="form" label-width="190px" size="mini">
        <el-row>
          <el-col :span="6">
            <el-form-item label="货物运输批次号" prop="declarationId">
              <el-input v-model="declaration.declarationId" placeholder="请输入货物运输批次号"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输工具代码" prop="borderTransportMeansId">
              <el-input
                v-model="borderTransportMeans.borderTransportMeansId"
                placeholder="请输入运输工具代码"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输工具名称" prop="name">
              <el-input
                v-model="borderTransportMeans.name"
                placeholder="请输入运输工具名称"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输方式代码" prop="typeCode">
              <el-select
                v-model="borderTransportMeans.typeCode"
                disabled
                placeholder="系统反填"
                style="width:100%"
              >
                <el-option
                  :disabled="true"
                  v-for="dict in businessTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="进出境口岸海关代码" prop="declarationOfficeId">
              <el-select
                v-model="declaration.declarationOfficeId"
                placeholder="请选择进出境口岸海关代码"
                style="width:100%"
              >
                <el-option
                  v-for="dict in customsCodeTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承运人代码" prop="carrierId">
              <el-input
                v-model="carrier.carrierId"
                placeholder="请输入承运人代码"
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="海关货物通关代码" prop="currentCode">
              <el-input
                v-model="governmentProcedure.currentCode"
                placeholder="请输入海关货物通关代码"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="装货地代码" prop="loadingLocationId">
              <el-input
                v-model="loadingLocation.loadingLocationId"
                placeholder="请输入装货地代码"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="驾驶员代码" prop="masterId">
              <el-input
                v-model="borderTransportMeans.master.masterId"
                placeholder="请输入驾驶员代码"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="驾驶员名称" prop="name">
              <el-input
                v-model="borderTransportMeans.master.name"
                placeholder="请输入驾驶员名称"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>          
          <el-col :span="12">
            <el-form-item label="抵境内第一目的港时间" prop="arrivalDateTime">
              <el-date-picker
                v-model="borderTransportMeans.arrivalDateTime"
                style="width:100%"
                type="datetime"
                value-format="yyyyMMddHHmmss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传输企业备案关区" prop="customsMaster">
              <el-input
                v-model="head.customsMaster"
                :disabled="true"
                placeholder="系统反填"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业代码" prop="contractorCodeScc">
              <el-select v-model="form.head.contractorcodescc" placeholder="请选择" @change="change">
                <el-option
                  v-for="item in enterpriseOptions"
                  :key="item.contractorCodeScc"
                  :label="item.contractorCodeScc"
                  :value="item.contractorCodeScc"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确报传输人名称" prop="name">
              <el-input
                v-model="representativePerson.name"
                :disabled="true"
                placeholder="系统反填"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="content">
              <el-input
                v-model="additionalInformation.content"
                placeholder="请输入备注"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>托架/拖挂车信息</span>
      </div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addnewcar" :disabled="btnDisable">新增
          </el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" @click="handleChange($event,'body')" :disabled="btnDisable">修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete($event,'body')" :disabled="btnDisable">
            删除
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="headList" height="300px" v-loading="loading" @row-click='bodyFormClick' :row-class-name="tableRowClassName" @selection-change="SelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="序号" align="center" type="index"/>
        <el-table-column label="托架/拖挂车编号" align="center" prop="transportequipmentId"/>
        <el-table-column label="托架/拖挂车类型" align="center" prop="typeCode" :formatter="Trailerformat"/>
        <el-table-column label="托架/拖挂车自重(kg)" align="center" prop="tareWeight"/>
      </el-table>
      <!-- :rules="headRuless" -->
      <el-form :model="Tform" ref="Tform" :inline="true" label-width="180px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="托架/拖挂车编号" prop="transportequipmentId">
              <el-input v-model="transportEquipmentForm.transportequipmentId" placeholder="请输入托架/拖挂车编号" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="托架/拖挂车类型" prop="typeCode">
              <el-select v-model="transportEquipmentForm.typeCode" placeholder="请输入托架/拖挂车类型" size="mini">
                <el-option
                  v-for="dict in TrailertypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="托架/拖挂车自重(kg)" prop="tareWeight">
              <el-input v-model="transportEquipmentForm.tareWeight" placeholder="请输入托架/拖挂车自重" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  listHead,
  getHead,
  delHead,
  addHead,
  updateHead,
  exportHead,
  addbody,
  edit,
  init,
  add,
  listemptycar,
  emptycarAll,
  updateCode
} from '@/api/manifest/rmft4404/emptycar/Head/head'

import { listInfo } from '@/api/basis/enterpriseInfo'
import { queryDetailsById } from '@/api/manifest/query'

export default {
  name: 'Head',
  data() {
    return {
      // 遮罩层
      loading: false,
      //关联挂车表 id
      Did: undefined,
      //Head 唯一messageid
      Aid: undefined,
      // 选中数组
      ids: [],
      idALL: undefined,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 报文头信息表格数据
      headList: [],
      // 企业信息列表
      enterpriseOptions: [],
      //运输方式字典翻译
      businessTypeOptions: [],
      //挂车类型翻译
      TrailertypeOptions: [],
      //进出境口岸海关代码
      customsCodeTypeOptions: [],
      // 当前操作表体数据
      bodyIndex: -1,
      // 已选择数据      
      selectBodyForm: [],
      // 按钮禁用状态
      btnDisable: false,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        eType: '1'
      },

      Tform: {},
      // 报文功能代码/报文类型代码
      head: {
        functionCode: '',
        messageType: ''
      },
      // 进出境口岸海关代码, 货物运输批次号
      declaration: {
        declarationOfficeId: '',
        declarationId: ''
      },
      // 备注
      additionalInformation: {
        content: ''
      },
      // 承运人代码
      carrier: {
        carrierId: ''
      },
      // // 装货地代码
      // loadingLocation: {
      //   loadingLocationId: ''
      // },
      // 确报传输人名称
      representativePerson: {
        name: ''
      },
      //
      borderTransportMeans: {
        // 抵境内第一目的港时间
        arrivalDateTime: '',
        // 运输工具代码
        borderTransportMeansId: '',
        // 运输工具名称
        name: '',
        // 运输方式代码
        typeCode: '4',
        // 驾驶员信息
        master: {
          // 驾驶员代码
          masterId: '',
          // 驾驶员名称
          name: ''
        }
      },
      // 托架/拖挂车信息
      transportEquipmentForm: {
        // 托架/拖挂车编号
        transportequipmentId: '',
        // 托架/拖挂车类型
        typeCode: '',
        // 托架/拖挂车自重
        tareWeight: ''
      },
      // governmentProcedure: {
      //   // 海关货物通关代码
      //   currentCode: ''
      // },
      AForm: {
        borderTransportMeans: {
          arrivalDateTime: '',
          borderTransportMeansId: '',
          name: '',
          typeCode: '4',
          master: {},
          transportEquipment: []
        },
        // governmentProcedure: {}
      },
      // 表单参数
      form: {
        head: {},
        declaration: {
          additionalInformation: {},
          carrier: {},
          // loadingLocation: {},
          representativePerson: {},
          consignment: {}
        }
      },
      rules: {}
    }
  },
  mounted() {
    // 获取企业信息列表
    this.enterpriseInfo()
    //挂车类型字典翻译
    this.getDicts('hg_trailer_type').then((response) => {
      this.TrailertypeOptions = response.data
    })
    //运输方式代码翻译
    this.getDicts('station_transport_fashion').then((response) => {
      this.businessTypeOptions = response.data
    })
    //进出境口岸海关代码
    this.getDicts('hg_customs_code').then((response) => {
      this.customsCodeTypeOptions = response.data
    })
    const  id =this.$route.query.id
    const flag = this.$route.query.flag
    if (flag) {
      this.btnDisable = true
    }
    if(id){
      this.query(id)
    }
  },
  watch: {
    'representativePerson.name': {      
      handler: function(newVal) {     
        const data = this.enterpriseOptions.find(el => el.stationPersonName === newVal)        
        this.form.head.contractorcodescc = data.contractorCodeScc,
        this.head.customsMaster = data.customsMaster,
        this.head = data,
        this.head.functionCode = '2',
        this.head.messageType = 'MT4404'
      }
    }
  },
  methods: {
    // 查询方法
    query(id){
      queryDetailsById(id).then(res =>{
       if(res.code ==200){
        //  this.nemsInvtHeadType = res.data.nemsInvtHeadType;
        //  this.headList = res.data.headList;        
        this.declaration = res.data.declaration
        this.declaration.mtHeadId = res.data.declaration.mtHeadId
        console.log(111111)
        this.additionalInformation = res.data.declaration.additionalInformation
        this.carrier = res.data.declaration.carrier        
        this.representativePerson = res.data.declaration.representativePerson
        this.borderTransportMeans = res.data.declaration.consignment.borderTransportMeans
        this.headList = res.data.declaration.consignment.borderTransportMeans.transportEquipment
        console.log(res.data)
       }
      })
    },
    //托架/拖挂车类型 翻译
    Trailerformat(row, column) {
      return this.selectDictLabel(this.TrailertypeOptions, row.typeCode)
    },
    // 企业申报信息列表
    enterpriseInfo() {
      listInfo(this.queryParams).then((response) => {
        this.enterpriseOptions = response.rows
      })
    },
    //查询空载挂车新增
    selectempty() {
      listemptycar(this.Lid).then((response) => {
        this.headList = response.rows
      })
    },
    //页面初始化 回填数据
    initialization() {
      this.loading = true
      init().then((response) => {
        this.form.contractorcodescc = response.data.contractorcodescc
        this.form.stationPersonName = response.data.stationPersonName
        this.form.customsmaster = response.data.customsmaster
        this.form.borderTransportMeans.typeCode = '4'
        this.loading = false
      })
    },
    // 表单重置
    reset() {
      this.declaration = {},
        this.additionalInformation = {},
        this.carrier = {},
        // this.loadingLocation = {},
        this.representativePerson = {},
        this.borderTransportMeans = {
          arrivalDateTime: '',
          borderTransportMeansId: '',
          name: '',
          typeCode: '4',
          master: {
            masterId: '',
            name: ''
          }
        },
        this.transportEquipmentForm = {},
        // this.governmentProcedure = {},
        this.headList = []
    },
    resetcar() {
      this.Tform = {}
    },
    //重置表头按钮
    emptyall() {
      this.reset()
      // this.initialization();
    },
    //重置空载按钮
    delectempty() {
      this.resetcar()
    },
    //handleAdd
    handleAdd(){},
    shopInfoSelectionChange(data){
      console.log(data)

    },
    /** 暂存按钮*/
    handleSave(){},
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.messageid)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    handleUpdate(row) {
      this.reset()
      const messageid = row.messageid || this.ids
      getHead(messageid).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改报文头信息'
      })
    },
    /** 表头提交按钮 */
    submitForm: function() {
      this.form.head = this.head
      this.form.declaration = this.declaration
      this.form.declaration.additionalInformation = this.additionalInformation
      this.form.declaration.carrier = this.carrier
      // this.form.declaration.loadingLocation = this.loadingLocation
      this.form.declaration.representativePerson = this.representativePerson
      // this.AForm.governmentProcedure = this.governmentProcedure
      this.AForm.borderTransportMeans = this.borderTransportMeans
      this.AForm.borderTransportMeans.transportEquipment = this.headList
      this.form.declaration.consignment = this.AForm
      add(this.form).then((response) => {
        if (response.code === 200) {
          this.msgSuccess("新增成功");
          console.log(JSON.stringify(this.form));
        } else {
          this.msgError(response.msg);
        }
      });
      this.reset()
    },
    // //挂车新增按钮
    addnewcar: function() {
      this.headList.push(this.transportEquipmentForm)
      this.transportEquipmentForm = {}
    },
    //数据申报状态按钮
    updateStatementCode: function() {
      this.form.messageid = this.Aid
      updateCode(this.form).then((response) => {
        if (response.code === 200) {
          this.msgSuccess('申报成功')
          // this.reset();
        } else {
          this.msgError(response.msg)
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const messageids = row.messageid || this.ids
      this.$confirm(
        '是否确认删除报文头信息编号为"' + messageids + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(function() {
          return delHead(messageids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function() {
        })
    },
    // 点击某一条集装箱信息
    bodyFormClick(row, column, event) {
      this.bodyIndex = JSON.parse(JSON.stringify(row)).rowIndex
      this.transportEquipmentForm = JSON.parse(JSON.stringify(row))
    },
    SelectionChange(data) {
      this.selectBodyForm = data
    },
    // 添加index
    tableRowClassName(data) {
      //把每一行的索引放进row
      data.row.rowIndex = data.rowIndex
    },
    // 表格修改
    handleChange(e, name) {
      if (name === 'body') {
        if (this.bodyIndex === -1) return
        this.headList[this.bodyIndex] = JSON.parse(JSON.stringify(this.transportEquipmentForm))
        this.headList = JSON.parse(JSON.stringify(this.headList))
        this.bodyIndex = -1
      }
      this.transportEquipmentForm = {}
    },
    // 删除
    handleDelete(e, name) {
      if (name === 'body') {
        this.headList = this.headList.filter(el => !this.selectBodyForm.includes(el))
        // this.headList[this.bodyIndex].headList = this.headList
      }
    },
    /** 选中值发生变化时触发 */
    change(event) {
      this.enterpriseOptions.forEach(element => {
        // console.log(element);
        if (element.contractorCodeScc === event) {
          // 将得到的企业属性赋值到应用的对象中
          this.representativePerson.name = element.stationPersonName
          this.head = element
          this.head.functionCode = '2',
          this.head.messageType = 'MT4404'
        }
      })

    }

  }
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
