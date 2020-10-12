<template>
  <div class="app-container">
    <!--<el-row>
     <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          @click="submitHeadForm"
          v-hasPermi="['report:head:edit']"
        >修改</el-button>
      </el-col>
    </el-row>-->
    <el-row :gutter="10" class="mb8">
      <el-button type="primary" icon="el-icon-plus" size="mini"  @click="handleAdd" :disabled="btnDisable">新增
      </el-button>
      <el-button type="success" icon="el-icon-edit" size="mini"  @click="addHeadForm" :disabled="btnDisable">暂存
      </el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete" :disabled="btnDisable">
        删除
      </el-button>
      <el-button type="danger" icon="el-icon-thumb" size="mini" @click="declare" style="float:right" disabled>申报
      </el-button>
    </el-row>    
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="form" ref="form" :rules="headRules" label-width="190px" size="mini">
        <el-row>
          <el-col :span="6">
            <el-form-item label="企业代码" prop="contractorCodeScc">
              <el-select v-model="form.head.contractorCodeScc" placeholder="请选择企业代码" @change="change">
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
          <el-col :span="6">
            <el-form-item label="运输工具代码" prop="borderTransportMeansId">
              <el-input
                v-model="borderTransportMeans.borderTransportMeansId"
                placeholder="请输入运输工具代码"
                clearable
                size="mini"

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输工具名称" prop="TransportMeansName">
              <el-input
                v-model="borderTransportMeans.name"
                placeholder="请输入运输工具名称"
                clearable
                size="mini"

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输方式代码" prop="typeCode">
              <el-select
                v-model="borderTransportMeans.typeCode"
                :disabled="true"
                placeholder="请选择运输方式"
              >
                <el-option
                  v-for="dict in TransportDictionary"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"

                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="货物运输批次号" prop="declarationId">
              <el-input v-model="declaration.declarationId" placeholder="请输入货物运输批次号"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承运人代码" prop="carrierId">
              <el-input
                v-model="carrier.carrierId"
                placeholder="请输入承运人代码"
                clearable
                size="mini"

              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="海关货物通关代码" prop="currentCode">
              <el-input
                v-model="governmentprocedure.currentCode"
                placeholder="请输入海关货物通关代码"
                clearable
                size="mini"

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="装货地代码" prop="loadinglocationId">
              <el-input
                v-model="loadinglocation.loadinglocationId"
                placeholder="请输入装货地代码"
                clearable
                size="mini"

              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="驾驶员代码" prop="masterId">
              <el-input
                v-model="borderTransportMeans.master.masterId"
                placeholder="请输入驾驶员代码"
                clearable
                size="mini"

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

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="抵境内第一目的港时间" prop="arrivalDateTime">
              <el-date-picker
                clearable
                style="width: 100%"
                v-model="borderTransportMeans.arrivalDateTime"
                type="datetime"
                value-format="yyyyMMddHHmmss"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="传输企业备案关区" prop="customsMaster">
              <el-select
                v-model="head.customsMaster"
                :disabled="true"
                placeholder="请选择传输企业备案关区"
                size="mini"
              >
                <el-option
                  v-for="dict in CustomsDictionary"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"

                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="进出境口岸海关代码" prop="declarationOfficeId">
              <el-select v-model="declaration.declarationOfficeId" placeholder="请选择进出境口岸海关">
                <el-option
                  v-for="dict in CustomsDictionary"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"

                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="确报传输人名称" prop="name">
              <el-input
                v-model="representativePerson.name"
                placeholder="请输入确报传输人名称"
                clearable
                size="mini"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="content">
              <el-input
                v-model="additionalInformation.content"
                placeholder="请输入备注"
                clearable
                size="mini"

              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>     
    </el-card>
    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          @click="submittForm"
          v-hasPermi="['report:head:edit']"
        >修改</el-button>
      </el-col>
    </el-row>-->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>托架/拖挂车信息</span>
      </div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-plus" size="mini"  @click="submitBodyForm" :disabled="btnDisable">新增
          </el-button>
          <el-button type="success" icon="el-icon-edit" size="mini"  @click="handleChange($event,'body')" :disabled="btnDisable">修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete($event,'body')" :disabled="btnDisable">
            删除
          </el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading" :data="headList" height="180px"  @row-click='bodyFormClick' :row-class-name="tableRowClassName" @selection-change="SelectionChange">
         <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" align="center" type="index"/>
        <el-table-column label="托架/拖挂车编号" align="center" prop="transportequipmentId"/>
        <el-table-column label="托架/拖挂车类型" align="center" prop="typeCode" :formatter="TrailerFormat"/>
        <el-table-column label="托架/拖挂车自重(kg)" align="center" prop="tareWeight"/>
      </el-table>

      <!-- <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
         size="mini"
      />-->
      <el-form :model="Tform" ref="Tform" :rules="bodyRules" :inline="true" label-width="180px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="托架/拖挂车编号" prop="transportequipmentId">
              <el-input v-model="transportEquipmentForm.transportequipmentId" placeholder="请输入托架/拖挂车编号" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="托架/拖挂车类型" prop="typeCode">
              <el-select v-model="transportEquipmentForm.typeCode" placeholder="请选择托架/拖挂车类型" size="mini">
                <el-option
                  v-for="dict in TrailerType"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"

                ></el-option>
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
    <!-- <el-row>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          @click="submitcForm"
          v-hasPermi="['report:head:edit']"
        >修改</el-button>
    </el-col>-->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>集装箱信息</span>
      </div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-plus" size="mini"  @click="coalBodyForm" :disabled="btnDisable">新增
          </el-button>
          <el-button type="success" icon="el-icon-edit" size="mini"  @click="handleChange($event,'coal')" :disabled="btnDisable" >修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete($event,'coal')" :disabled="btnDisable">
            删除
          </el-button>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="coalList" height="180px" @row-click='coalFormClick' :row-class-name="tableRowClassName" @selection-change="SelectionChange">
         <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" align="center" type="index"/>
        <el-table-column label="集装箱(器)编号" align="center" prop="transportequipmentId"/>
        <el-table-column
          label="集装箱(器)尺寸类型"
          align="center"
          prop="characteristicCode"
          :formatter="ContainerSizeFormat"
        />
        <el-table-column
          label="集装箱(器)来源代码"
          align="center"
          prop="supplierPartyTypeCode"
          :formatter="ContainerSourceFormat"
        />
        <el-table-column label="集装箱(器)自重kg" align="center" prop="tareWeight"/>
        <el-table-column
          label="集装箱（器）重箱或者空箱标识"
          align="center"
          prop="fullnessCode"
          :formatter="ContainerSelfWeightFormat"
        />
      </el-table>

      <el-form :model="Cform" ref="Cform" :rules="coalRules"  label-width="180px" size="mini">
        <el-row>
          <el-col :span="6">
            <el-form-item label="集装箱(器)编号" prop="transportequipmentId">
              <el-input v-model="transportequipment.transportequipmentId" placeholder="请输入集装箱(器)编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集装箱(器)尺寸类型" prop="characteristicCode">
              <el-select v-model="transportequipment.characteristicCode" placeholder="请选择集装箱(器)尺寸类型">
                <el-option
                  v-for="dict in ContainerSize"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集装箱(器)来源代码" prop="supplierPartyTypeCode">
              <el-select
                v-model="transportequipment.supplierPartyTypeCode"
                placeholder="请选择集装箱(器)来源代码"
              >
                <el-option
                  v-for="dict in ContainerSource"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集装箱(器)自重kg" prop="tareWeight">
              <el-input v-model="transportequipment.tareWeight" placeholder="请输入集装箱(器)自重kg"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="重箱或者空箱标识" prop="fullnessCode">
              <el-select v-model="transportequipment.fullnessCode" placeholder="请选择集装箱(器)重箱或者空箱标识">
                <el-option
                  v-for="dict in ContainerSelfWeight"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>        
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  delHead,
  exportHead,
  getCoal,
  getHead,
  getInfoHead,
  getTransport,
  add,
  updateDeclare
} from '@/api/manifest/rmft4406/head'
import { listInfo } from '@/api/basis/enterpriseInfo'
import noticeInfoVue from '../../rmft2401/noticeInfo.vue'

import { queryDetailsById } from '@/api/manifest/query'

export default {
  name: 'Head',
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 当前操作挂车表体数据
      bodyIndex: -1,
      // 当前操作集装箱表体数据
      coalIndex: -1,
      // 已选择数据      
      selectBodyForm: [],
      // 按钮禁用状态
      btnDisable: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      // 报文功能代码/报文类型代码
      head: {
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
      // 装货地代码
      loadinglocation: {
        loadinglocationId: ''
      },
      // 确报传输人名称
      representativePerson:{
        name: ""
      },
      //
      borderTransportMeans: {
        // 抵境内第一目的港时间
        arrivalDateTime: '',
        // 运输工具代码
        borderTransportMeansId: "",
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
      governmentprocedure: {
        // 海关货物通关代码
        currentCode: ""
      },
      transportequipment: {
        // 集装箱(器)编号
        transportequipmentId: '',
        // 重箱或者空箱标识
        fullnessCode: '',
        // 集装箱(器)尺寸类型
        characteristicCode: '',
        // 集装箱(器)来源代码
        supplierPartyTypeCode: '',
        // 集装箱(器)自重(KG)
        tareWeight: ''
      },
      headList: [],
      coalList: [],
      // 运输方式字典
      TransportDictionary: [],
      // 进出境口岸关区字典
      CustomsDictionary: [],
      // 托架/拖车类型字典
      TrailerType: [],
      // 集装箱(器)来源字典
      ContainerSource: [],
      // 企业信息列表
      enterpriseOptions: [],
      // 集装箱(器)尺寸类型字典
      ContainerSize: [],
      // 集装箱（器）重箱或者空箱标识
      ContainerSelfWeight: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        messageId: undefined,
        functionCode: undefined,
        messageType: undefined,
        senderId: undefined,
        receiverId: undefined,
        sendTime: undefined,
        version: undefined,
        declarationOfficeId: undefined,
        feedback: undefined,
        feedbackMsg: undefined,
        pid: undefined
      },
      AForm: {
        borderTransportMeans: {
          arrivalDateTime: '',
          borderTransportMeansId: '',
          name: '',
          typeCode: '4',
          master: {},
          transportEquipment: []
        },
        governmentprocedure: {},
        transportequipment: []
      },
      // 表单参数
      form: {
        head: {},
        declaration: {
          additionalInformation: {},
          carrier: {},
          loadinglocation: {},
          representativePerson: {},
          consignment: {
            // governmentprocedure:{},
            // transportEquipment:[],
          }
        }
      },
      // 挂车表单参数
      Tform: {

      },
      // 集装箱表单参数
      Cform: {
      },
      CID: undefined,
      TID: undefined,
      // 表单校验
      rules: {},
      headRules: {
        declarationId: [
          { required: false, message: '请输入货物运输批次号', trigger: 'blur' }
        ],

        declarationOfficeId: [
          {
            required: false,
            message: '请输入进出境口岸海关代码',
            trigger: 'blur'
          }
        ],
        contractorCodeScc: [
          { required: false, message: "请选择企业代码", trigger: "blur" },
        ],
        carrierId: [
          { required: false, message: '请输入承运人代码', trigger: 'blur' }
        ],
        loadinglocationId: [
          { required: false, message: '请输入装货地代码', trigger: 'blur' }
        ],
        // additionalInformation.content: [
        //   { required: true, message: "请输入备注信息", trigger: "blur" },
        // ],
        borderTransportMeansId: [
          { required: false, message: '请输入运输工具代码', trigger: 'blur' }
        ],
        TransportMeansName: [
          { required: false, message: '请输入运输工具名称', trigger: 'blur' }
        ],
        masterId: [
          { required: false, message: '请输入驾驶员代码', trigger: 'blur' }
        ],
        name: [
          { required: false, message: '请输入驾驶员名称', trigger: 'blur' }
        ],
        arrivalDateTime: [
          {
            required: false,
            message: '请输入抵境内第一目的港时间',
            trigger: 'blur'
          }
        ],
        currentCode: [
          {
            required: false,
            message: '请输入海关货物通关代码',
            trigger: 'blur'
          }
        ]
      },
      bodyRules: {
        transportequipmentId: [
          { required: false, message: '请输入托架/拖挂车编号', trigger: 'blur' }
        ],
        typeCode: [
          { required: false, message: '请输入托架/拖挂车类型', trigger: 'blur' }
        ],
        tareWeight: [
          { required: false, message: '请输入托架/拖挂车自重', trigger: 'blur' }
        ]
      },
      coalRules: {
        transportequipmentId: [
          { required: false, message: "请输入集装箱(器)编号", trigger: "blur" },
        ],
        characteristicCode: [
          {
            required: false,
            message: '请输入集装箱(器)尺寸类型',
            trigger: 'blur'
          }
        ],
        supplierPartyTypeCode: [
          {
            required: false,
            message: '请输入集装箱(器)来源代码',
            trigger: 'blur'
          }
        ],
        tareWeight: [
          {
            required: false,
            message: '请输入集装箱(器)自重kg',
            trigger: 'blur'
          }
        ],
        fullnessCode: [
          {
            required: false,
            message: "集装箱（器）重箱或者空箱标识",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // this.getList();
    // 获取企业信息列表
    this.enterpriseInfo()
    /** 运输方式字典 */
    this.getDicts('station_transport_fashion').then((response) => {
      this.TransportDictionary = response.data
    })
    /** 进出境口岸关区代码字典 */
    this.getDicts('hg_customs_code').then((response) => {
      this.CustomsDictionary = response.data
    })
    /** 托架/拖挂车类型字典 */
    this.getDicts('hg_trailer_type').then((response) => {
      this.TrailerType = response.data
    })
    /** 集装箱(器)来源字典 */
    this.getDicts('hg_container_source').then((response) => {
      this.ContainerSource = response.data
    })
    /** 集装箱(器)尺寸类型字典 */
    this.getDicts('hg_container_size_type').then((response) => {
      this.ContainerSize = response.data
    })
    /** 集装箱（器）重箱或者空箱标识 */
    this.getDicts('hg_container_self_weight').then((response) => {
      this.ContainerSelfWeight = response.data
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
        // console.log(data)      
        this.form.head.contractorCodeScc = data.contractorCodeScc
        this.head.customsMaster = data.customsMaster
        this.form.head = data
      }
    }
  },
  methods: {
    // 跳转后查询方法
    query(id){
      queryDetailsById(id).then(res =>{
       if(res.code ==200){
        //  this.nemsInvtHeadType = res.data.nemsInvtHeadType;
        //  this.headList = res.data.headList;        
        this.declaration = res.data.declaration
        this.declaration.mtHeadId = res.data.declaration.mtHeadId
        console.log(res.data.declaration)
        this.additionalInformation = res.data.declaration.additionalInformation
        this.carrier = res.data.declaration.carrier        
        this.representativePerson = res.data.declaration.representativePerson
        this.borderTransportMeans = res.data.declaration.consignment.borderTransportMeans
        this.governmentprocedure = res.data.declaration.consignment.governmentprocedure
        this.loadinglocation = res.data.declaration.loadinglocation
        this.headList = res.data.declaration.consignment.borderTransportMeans.transportEquipment
        this.coalList = res.data.declaration.consignment.transportequipment
        // console.log(res.data)
       }
      })
    },
    /** 查询表头信息列表 */
    getList() {
      this.loading = true
      getInfoHead().then((response) => {
        this.form.borderTransportMeans.typeCode = "4";
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 新增后表单查询 */
    getHeadList() {
      this.loading = true
      getHead(this.form.head.id).then((response) => {
        this.form = response.data
        this.total = response.total
        this.loading = false
      })
    },
    /** 查询挂车信息*/
    getListsmt() {
      getTransport(this.Tform).then((response) => {
        this.headList = response.rows
        this.total = response.total

      })
    },
    /**查询集装箱信息 */
    getListCoal() {
      getCoal(this.Cform).then((response) => {
        this.coalList = response.rows
        this.total = response.total
      })
    },
    // 企业申报信息列表
    enterpriseInfo() {
      listInfo(this.queryParams).then((response) => {
        this.enterpriseOptions = response.rows
      })
    },
    /** 修改*/
    handleSave(){},
    shopInfoSelectionChange(){
      console.log(data)

    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    //托架/拖挂车类型 翻译
    TrailerFormat(row, column) {
      return this.selectDictLabel(this.TrailerType, row.typeCode)
    },
    //集装箱(器)来源 翻译
    ContainerSourceFormat(row, column) {
      return this.selectDictLabel(
        this.ContainerSource,
        row.supplierPartyTypeCode
      )
    },
    //集装箱(器)尺寸类型 翻译
    ContainerSizeFormat(row, column) {
      return this.selectDictLabel(this.ContainerSize, row.characteristicCode)
    },
    //集装箱（器）重箱或者空箱标识翻译
    ContainerSelfWeightFormat(row, column) {
      return this.selectDictLabel(this.ContainerSelfWeight, row.fullnessCode)
    },

    // 表单重置
    reset() {
      this.declaration = {},
        this.additionalInformation = {},
        this.carrier = {},
        this.loadinglocation = {},
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
        this.governmentprocedure = {},
        this.transportequipment = {},
        this.headList = [],
        this.coalList = []
    },

    // 清空信息
    clearall: function() {
      this.clearBody()
      this.clearCoalBody()
      this.clearHead()
      // this.getList();
    },

    // 清空表头信息
    clearHead() {
      this.form = {
        head: {},
        declaration: {
          declarationId: undefined,
          declarationOfficeId: undefined
        },
        governmentprocedure:{
          currentCode: undefined
        },
        carrier: {
          carrierId: undefined
        },
        loadinglocation: {
          loadinglocationId: undefined
        },
        master:{
          masterId: undefined,
          name: undefined
        },
        additionalinformation: {
          content: undefined
        },
        borderTransportMeans: {
          borderTransportMeansId: undefined,
          name: undefined,
          typeCode: '4',
          arrivalDateTime: undefined
        }
      }
    },

    // 清空挂车信息
    clearBody() {
      this.Tform = {
        equipmentId: undefined,
        typeCode: undefined,
        tareWeight: undefined
      }
    },

    // 清空集装箱信息
    clearCoalBody() {
      this.Cform = {
        equipmentId: undefined,
        characteristicCode: undefined,
        supplierPartyTypeCode: undefined,
        tareWeight: undefined,
        fullnessCode: undefined,
      };
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.pid)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加【请填写功能名称】";
    },

    declare: function() {
      updateDeclare(this.form).then((response) => {
        if (response.code === 200) {
          this.msgSuccess('申报成功')
        } else {
          this.msgError(response.msg)
        }
      })
    },
    /** 表头提交按钮 */
    addHeadForm: function() {
      this.form.head.functionCode = "2";
      this.form.head.messageType = "MT4406";
      this.form.declaration = this.declaration
      this.form.declaration.additionalInformation = this.additionalInformation
      this.form.declaration.carrier = this.carrier
      this.form.declaration.loadinglocation = this.loadinglocation
      this.form.declaration.representativePerson = this.representativePerson
      this.AForm.transportequipment = this.coalList
      this.AForm.governmentprocedure = this.governmentprocedure
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
    /** 挂车表体提交按钮 */
    submitBodyForm: function() {
      this.headList.push(this.transportEquipmentForm)
      this.transportEquipmentForm = {}
    },

    /** 集装箱表体提交按钮 */
    coalBodyForm: function() {
      this.coalList.push(this.transportequipment)
      this.transportequipment = {}
    },


    /** 删除按钮操作 */
    handleDelete(row) {
      const pids = row.pid || this.ids;
      this.$confirm(
        '是否确认删除【请填写功能名称】编号为"' + pids + '"的数据项?',
        '警告',
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delHead(pids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有【请填写功能名称】数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportHead(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function() {
        })
    },
    // 点击某一条集装箱信息
    bodyFormClick(row, column, event) {
      this.bodyIndex = JSON.parse(JSON.stringify(row)).rowIndex
      this.transportEquipmentForm = JSON.parse(JSON.stringify(row))
    },
    coalFormClick(row, column, event) {
      this.coalIndex = JSON.parse(JSON.stringify(row)).rowIndex
      this.transportequipment = JSON.parse(JSON.stringify(row))
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
        this.transportEquipmentForm = {}
      }
      if (name === 'coal') {
        if (this.coalIndex === -1) return
        this.coalList[this.coalIndex] = JSON.parse(JSON.stringify(this.transportequipment))
        this.coalList = JSON.parse(JSON.stringify(this.coalList))
        this.coalIndex = -1
        this.transportequipment = {}
      }
      
    },
    // 删除
    handleDelete(e, name) {
      if (name === 'body') {
        this.headList = this.headList.filter(el => !this.selectBodyForm.includes(el))
        // this.headList[this.bodyIndex].headList = this.headList
      }
      if (name === 'coal') {
        this.coalList = this.coalList.filter(el => !this.selectBodyForm.includes(el))
      }
    },
    /** 选中值发生变化时触发 */
    change(event) {
      this.enterpriseOptions.forEach(element => {
        // console.log(element)
        if (element.contractorCodeScc === event) {
          // 将得到的企业属性赋值到应用的对象中
          this.representativePerson.name = element.stationPersonName
          // this.head.customsMaster = element.customsMaster
          // this.head.receiverId = element.receiverId
          // this.head.version = element.version
          // this.head.senderId = element.contractorCode + '_' + element.senderId
          this.form.head = element
        }
      })
    },
  }
}
</script>
<style lang="scss" scope>
.el-select {
  width: 100%
}
</style>
