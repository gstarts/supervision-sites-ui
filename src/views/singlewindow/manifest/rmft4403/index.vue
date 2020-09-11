<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb20">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增
        </el-button>
        <el-button type="success" icon="el-icon-edit" size="mini" @click="handleSave">暂存
        </el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete">
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
      <el-form :model="AllForm" ref="AllForm" label-width="190px" size="mini">
        <el-row>
          <el-col :span="6">
            <el-form-item label="货物运输批次号" >
              <el-input v-model="AllForm.Declaration.declarationId" placeholder="请输入货物运输批次号"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输工具代码" >
              <el-input
                v-model="AllForm.BorderTransportMeans.borderTransportMeansId"
                placeholder="请输入运输工具代码"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输工具名称" >
              <el-input
                v-model="AllForm.BorderTransportMeans.name"
                placeholder="请输入运输工具名称"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输方式代码">
              <el-select
                v-model="AllForm.BorderTransportMeans.typeCode"
                disabled
                placeholder="系统反填"
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
            <el-form-item label="进出境口岸海关代码" >
              <el-select
                v-model="AllForm.Declaration.declarationOfficeId"
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
            <el-form-item label="承运人代码" >
              <el-input
                v-model="AllForm.Carrier.carrierId"
                placeholder="请输入承运人代码"
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="驾驶员代码" >
              <el-input
                v-model="AllForm.Master.masterId"
                placeholder="请输入驾驶员代码"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="驾驶员名称">
              <el-input
                v-model="AllForm.Master.name"
                placeholder="请输入驾驶员名称"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="司乘人员人数" >
              <el-input
                v-model="AllForm.Declaration.numStaffMember"
                placeholder="请输入司乘人员人数"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="健康状态" >
              <el-select
                v-model="AllForm.Declaration.healthStatusText"
                placeholder="请选择健康状态"
                style="width:100%"
              >
                <el-option
                  v-for="dict in healthStatusOption"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否有预防接种" >
              <el-select
                v-model="AllForm.Declaration.vaccinateText"
                placeholder="请选择是否有预防接种"
                style="width:100%"
              >
                <el-option
                  v-for="dict in VaccinationOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="margin-left:220px">
            <el-button @click="routingContryIdTextButton">途 径 国 家 或 地 区</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="抵境内第一目的港时间" >
              <el-date-picker
                v-model="AllForm.BorderTransportMeans.arrivalDateTime"
                style="width:100%"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确报传输人名称" >
              <el-input
                v-model="AllForm.RepresentativePerson.name"
                :disabled="true"
                placeholder="系统反填"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="传输企业备案关区" prop="head.customsmaster">
              <el-input
                v-model="form.head.customsmaster"
                :disabled="true"
                placeholder="系统反填"
                clearable
                size="mini"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="企业代码" >
              <el-select v-model="head.unitCode" filterable placeholder="企业代码" size="mini">
                <el-option
                  v-for="(item,index) in listInfo"
                  :key="index"
                  :label="item.eName"
                  :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="18">
            <el-form-item label="备注" >
              <el-input
                v-model="AllForm.AdditionalInformation.content"
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
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addnewcar">新增
          </el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" @click="handleSave">暂存
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete">
            删除
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="AllForm.TransportEquipment" height="300px" v-loading="loading"  @selection-change="shopInfoSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column label="序号" align="center" type="index"/>
        <el-table-column label="托架/拖挂车编号" align="center" prop="equipmentId"/>
        <el-table-column label="托架/拖挂车类型" align="center" prop="typeCode" :formatter="Trailerformat"/>
        <el-table-column label="托架/拖挂车自重(kg)" align="center" prop="tareWeight"/>
      </el-table>
      <!-- :rules="headRuless" -->
      <el-form :model="TransportEquipmentForm" ref="TransportEquipmentForm" :inline="true" label-width="180px"
               size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item label="托架/拖挂车编号">
              <el-input v-model="TransportEquipmentForm.equipmentId" placeholder="请输入托架/拖挂车编号" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="托架/拖挂车类型" >
              <el-select v-model="TransportEquipmentForm.typeCode" placeholder="请输入托架/拖挂车类型">
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
              <el-input v-model="TransportEquipmentForm.tareWeight" placeholder="请输入托架/拖挂车自重" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 途径国家或地区 弹出框 -->
      <el-dialog title="选择国家/地区信息" :visible.sync="routingContryIdTextPopup">
        <el-form :model="routingContryIdTextForm" ref="routingContryIdTextForm" class="mb20" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="选择国家/地区" >
                <el-select v-model="routingContryIdTextForm.routingContryIdText" clearable placeholder="请选择选择国家/地区">
                  <el-option
                    v-for="item in routingContryIdTextOptions"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="1">
              <el-button @click="routingContryIdTextAdd">新 增</el-button>
            </el-col>
          </el-row>
          <el-table
            class="mb20"
            ref="multipleTable"
            :data="AllForm.Declaration"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column label="序号" align="center" type="index" min-width="200"/>
            <el-table-column prop="routingContryIdText" align="center" label="国家/地区代码" min-width="150"/>
          </el-table>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { delHead, getHead, listemptycar, updateCode } from '@/api/manifest/rmft4404/emptycar/Head/head'

import { listInfo } from '@/api/basis/enterpriseInfo'

export default {
  name: 'Head',
  data() {
    return {
      // 遮罩层
      loading: false,
      //途径国家或地区 弹出框
      routingContryIdTextPopup: false,
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
      // 企业信息列表
      enterpriseOptions: [],
      //运输方式字典翻译
      businessTypeOptions: [],
      //挂车类型翻译
      TrailertypeOptions: [],
      //进出境口岸海关代码
      customsCodeTypeOptions: [],
      //是否有预防接种	字典值
      VaccinationOptions: [],
      //健康状态 字典值
      healthStatusOption: [],
      //途经国家/地区信息
      routingContryIdTextOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        eType: '1'
      },
      //最大的对象
      AllForm: {
        Head: {},
        Declaration: {
          //进出境口岸海关代码
          DeclarationOfficeID: undefined,
          //货物运输批次号
          ID: undefined,
          //司乘人员人数
          numStaffMember: undefined,
          //健康状态
          healthStatusText: undefined,
          //是否有预防接种
          vaccinateText: undefined
          //地区
          // routingContryIdText:[],
        },
        AdditionalInformation: {
          //备注
          content: undefined
        },
        Carrier: {
          //承运人代码
          carrierId: undefined
        },
        Master: {
          //驾驶员代码
          masterId: undefined,
          //驾驶员名称
          name: undefined
        },
        BorderTransportMeans: {
          //运输工具代码
          borderTransportMeansId: undefined,
          //运输工具名称
          name: undefined,
          //运输方式代码
          typeCode: '4',
          //运输工具抵达关境内第一个目的港的日期和时间
          arrivalDateTime: undefined
        },
        RepresentativePerson: {
          //舱单传输人名称
          name: undefined
        },
        TransportEquipment: []
      },
      //地区前端对象
      routingContryIdTextForm: {
        routingContryIdText: undefined
      },
      //
      TransportEquipmentForm: {
        //托架或拖挂车编号
        equipmentId: undefined,
        //托架或拖挂车自重
        tareWeight: undefined,
        //托架或拖挂车类型代码
        typeCode: undefined
      },
      // 表单参数
      head: {},
      form: {
        head: {
          customsmaster: undefined,
          contractorcodescc: undefined,
          stationPersonName: undefined
        },
        declaration: {},
        // transportcontractdocument:{},
        governmentprocedure: {},
        carrier: {},
        loadinglocation: {},
        master: {},
        additionalinformation: {}
      },
      // 表单校验
      Tform: {
        transportId: undefined,
        tareWeight: undefined,
        typeCode: undefined,
        manifestDeclarationId: undefined,
        equipmentType: 2
      },
      rules: {},
      headList: [],
      // 企业代码
      listInfo: []
    }
  },
  created() {
    this.init()
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
    //是否有预防接种字典翻译
    this.getDicts('sw_LCL_logo').then((response) => {
      this.VaccinationOptions = response.data
    })
    //健康状态字典翻译
    this.getDicts('sw_health_status').then((response) => {
      this.healthStatusOption = response.data
    })
    //途径国家/地区信息
    this.getDicts('sw_route_country').then((response) => {
      this.routingContryIdTextOptions = response.data
    })
  },
  methods: {
    async init() {
      // await this.depParaList()
      //  企业代码
      listInfo().then(data => {
        this.listInfo = data.rows
        console.log(data)
      })
    },
    //途径国家或地区新增
    routingContryIdTextAdd() {

      this.routingContryIdTextForm = {}
      console.log(this.AllForm.Declaration.routingContryIdText)
    },
    //途径国家或地区弹出按钮
    routingContryIdTextButton() {
      this.routingContryIdTextPopup = true
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

    delectempty() {
      this.TransportEquipmentForm = {}
    },
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
    handleAdd(){},
    /** 表头提交按钮 */
    submitForm: function() {
      this.AllForm.Head = this.listInfo.find(el => el.deptId === this.head.unitCode)
      this.AllForm.Head.messageType = 'MT4403'
      this.AllForm.Head.functionCode = '2'
      console.log(JSON.stringify(this.AllForm))
      //新增后清空表单
      this.AllForm.Declaration = {}
      this.AllForm.AdditionalInformation = {}
      this.AllForm.Carrier = {}
      this.AllForm.Master = {}
      this.AllForm.BorderTransportMeans = {}
      this.AllForm.RepresentativePerson = {}
      this.AllForm.TransportEquipment = []
      this.AllForm.Declaration.routingContryIdText = []
      this.AllForm.BorderTransportMeans.typeCode = '4'

    },
    shopInfoSelectionChange(data) {
      console.log(data)
    },
    handleSave(){},
    // //挂车新增按钮
    addnewcar: function() {
      this.loading = true
      this.AllForm.TransportEquipment.push(this.TransportEquipmentForm)
      this.TransportEquipmentForm = {}
      this.loading = false
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
    /** 选中值发生变化时触发 */
    change(event) {
      this.enterpriseOptions.forEach(element => {
        console.log(element)
        if (element.contractorCodeScc === event) {
          // 将得到的企业属性赋值到应用的对象中
          this.form.head.contractorCodeScc = element.contractorCodeScc
          this.form.head.customsMaster = element.customsMaster
          this.form.head.receiverId = element.receiverId
          this.form.head.version = element.version
          this.form.head.senderId = element.contractorCode + '_' + element.senderId
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
