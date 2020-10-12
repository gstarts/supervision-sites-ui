<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="handleAdd"
        :disabled="btnDisable"
      >新增</el-button>
      <el-button
        type="success"
        icon="el-icon-edit"
        size="mini"
        @click="AllSave"
        :disabled="btnDisable"
      >暂存</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="handleDelete"
        :disabled="btnDisable"
      >删除</el-button>
      <el-button type="danger" icon="el-icon-thumb" size="mini" @click="updateStatementCode" v-hasPermi="['waybill:declare:declare']" style="float:right" disabled>申报</el-button>
      <!--      <el-button-->
<!--        type="primary"-->
<!--        icon="el-icon-document-copy"-->
<!--        size="mini"-->
<!--        :disabled="btnDisable.copyBtn"-->
<!--        @click="handleCopy"-->
<!--      >复制</el-button>-->
<!--      <el-button-->
<!--        type="primary"-->
<!--        icon="el-icon-refresh"-->
<!--        size="mini"-->
<!--        :disabled="btnDisable.refBtn"-->
<!--        @click="handleRefresh"-->
<!--      >刷新</el-button>-->
    </div>
    <!-- 基本信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本备案信息填写</span>
      </div>
      <el-form :model="queryParams" ref="queryForm" label-width="160px" size="mini">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物运输批次号" prop="declarationId">
              <el-input
                v-model="declaration.declarationId"
                placeholder="货物运输批次号"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进出境口岸海关代码" prop="declarationOfficeID">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="declaration.declarationOfficeID"
                placeholder="进出境口岸海关代码"
                clearable

              />
            </el-form-item>
          </el-col>
<!--          <el-col :span="6">-->
<!--            <el-form-item label="承运人代码" prop="carrierId">-->
<!--              <el-input-->
<!--                v-model="declaration.carrier.carrierId"-->
<!--                placeholder="承运人代码"-->
<!--                clearable-->
<!--                -->
<!--              />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="6">
            <el-form-item label="企业代码" prop="postCode">
              <el-select v-model="head.unitCode" filterable placeholder="企业代码" @change="onChange" >
                <el-option
                  v-for="(item,index) in listInfo"
                  :key="index"
                  :label="item.eName"
                  :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="传输企业备案关区" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="传输企业备案关区"
                clearable

              />
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="确报传输人名称" prop="name">
              <el-input
                v-model="declaration.representativePerson.name"
                placeholder="确报传输人名称"
                clearable
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="content">
              <el-input
                v-model="declaration.additionalInformation.content"
                placeholder="备注"
                clearable

              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 运输工具信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>运输工具信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            :disabled="btnDisable"
            @click="transportMeansAdd"
          >新增</el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="btnDisable"
            @click="handleSave"
          >暂存</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="btnDisable"
            @click="handleDelete"
          >删除</el-button>
<!--          <el-button-->
<!--            type="danger"-->
<!--            icon="el-icon-thumb"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable.repBtn"-->
<!--            @click="handleReport"-->
<!--          >申报</el-button>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            icon="el-icon-document-copy"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable.copyBtn"-->
<!--            @click="handleCopy"-->
<!--          >复制</el-button>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            icon="el-icon-refresh"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable.refBtn"-->
<!--            @click="handleRefresh"-->
<!--          >刷新</el-button>-->
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="borderTransportMeansList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column type="index" prop="num" label="序号" min-width="120" align="center"/>
        <el-table-column prop="bordertransportmeansId" label="运输工具代码" min-width="120" align="center"/>
        <el-table-column prop="name" label="运输工具名称" min-width="150" align="center"/>
        <el-table-column prop="arrivalDateTime" label="抵达关境内第一目的港的日期和时间" min-width="200" align="center">
        <template slot-scope="scope">
              <span>{{ parseTime(scope.row.arrivalDateTime) }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="master.masterId" label="驾驶员代码" min-width="120" align="center"/>
        <el-table-column prop="master.name" label="驾驶员名称" min-width="120" align="center"/>
      </el-table>
      <el-pagination
        v-show="page.total>0"
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="queryParams" ref="queryForm" label-width="160px" size="mini">
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="运输工具代码" prop="bordertransportmeansId">
              <el-input v-model="borderTransportMeans.bordertransportmeansId" placeholder="运输工具代码" clearable  />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运输工具名称" prop="name">
              <el-input v-model="borderTransportMeans.name" placeholder="运输工具名称" clearable  />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运输方式代码" prop="typeCode">
              <el-select
                v-model="borderTransportMeans.typeCode"
                disabled
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
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="驾驶员代码" prop="masterId">
              <el-input
                @focus="dialogTableVisible2 = true"
                v-model="borderTransportMeans.master.masterId"
                placeholder="驾驶员代码"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="驾驶员名称" prop="name">
              <el-input
                @focus="dialogTableVisible2 = true"
                v-model="borderTransportMeans.master.name"
                placeholder="驾驶员名称"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="抵达第一目的港日期" prop="arrivalDateTime">
              <el-date-picker
                class="datePicker"
                v-model="borderTransportMeans.arrivalDateTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyyMMddHHmmss"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="途径国家或地区" prop="postCode" >
              <el-button type="primary"  @click="regionInfo=true">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="司乘人员数" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="司乘人员数"
                clearable

              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="健康状态" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="健康状态"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否预防接种" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="是否预防接种"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关锁信息" prop="postCode" >
              <el-button type="primary"  @click="detailVisible=true">详细</el-button>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
    </el-card>
    <!-- 托架/拖挂车信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>托架/拖挂车信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="trailerAdd"
            :disabled="btnDisable"
          >新增</el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            @click="handleSave"
            :disabled="btnDisable"
          >暂存</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDelete"
            :disabled="btnDisable"
          >删除</el-button>
<!--          <el-button-->
<!--            type="danger"-->
<!--            icon="el-icon-thumb"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable.repBtn"-->
<!--            @click="handleReport"-->
<!--          >申报</el-button>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            icon="el-icon-document-copy"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable.copyBtn"-->
<!--            @click="handleCopy"-->
<!--          >复制</el-button>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            icon="el-icon-refresh"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable.refBtn"-->
<!--            @click="handleRefresh"-->
<!--          >刷新</el-button>-->
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="trailerList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column type="index" prop="num" label="序号" min-width="120" align="center"/>
        <el-table-column prop="transportequipmentId" label="托架/拖挂车编号" min-width="120" align="center"/>
        <el-table-column prop="characteristicCode" label="托架/拖挂车类型" min-width="150" align="center" :formatter="Trailerformat" />
        <el-table-column prop="tareWeight" label="托架/拖挂车自重(KG)" min-width="120" align="center"/>
      </el-table>
      <el-pagination
        v-show="page.total>0"
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="queryParams" ref="queryForm" label-width="160px" size="mini">
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="托架/拖挂车编号" prop="transportequipmentId">
              <el-input
                v-model="trailer.transportequipmentId"
                placeholder="托架/拖挂车编号"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="托架/拖挂车类型" prop="characteristicCode">
              <el-select v-model="trailer.characteristicCode" placeholder="请输入托架/拖挂车类型" >
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
            <el-form-item label="托架/拖挂车自重(KG)" prop="tareWeight">
              <el-input
                v-model="trailer.tareWeight"
                placeholder="托架/拖挂车自重(KG)"
                clearable

              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 集装箱信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>集装箱信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            :disabled="btnDisable"
            @click="containerAdd"
          >新增</el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="btnDisable"
            @click="handleSave"
          >暂存</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="btnDisable"
            @click="handleDelete"
          >删除</el-button>
<!--          <el-button-->
<!--            type="danger"-->
<!--            icon="el-icon-thumb"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable"-->
<!--            @click="handleReport"-->
<!--          >申报</el-button>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            icon="el-icon-document-copy"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable"-->
<!--            @click="handleCopy"-->
<!--          >复制</el-button>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            icon="el-icon-refresh"-->
<!--            size="mini"-->
<!--            :disabled="btnDisable"-->
<!--            @click="handleRefresh"-->
<!--          >刷新</el-button>-->
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="transportEquipmentList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column type="index" prop="num" label="序号" min-width="120" align="center"/>
        <el-table-column prop="transportequipmentId" label="集装箱(器)编号" min-width="120" align="center"/>
        <el-table-column prop="fullnessCode" label="重箱或者空箱标识" min-width="150" align="center" :formatter="ContainerSelfWeightformat"/>
        <el-table-column prop="characteristicCode" label="集装箱(器)尺寸类型" min-width="120" align="center" :formatter="ContainerSizeformat"/>
        <el-table-column prop="supplierPartyTypeCode" label="集装箱(器)来源代码" min-width="120" align="center" :formatter="ContainerSourceformat"/>
        <el-table-column prop="tareWeight" label="集装箱(器)自重(KG)" min-width="120" align="center"/>
      </el-table>
      <el-pagination
        v-show="page.total>0"
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="queryParams" ref="queryForm" label-width="160px" size="mini">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="集装箱(器)编号" prop="transportequipmentId">
              <el-input
                v-model="transportEquipment.transportequipmentId"
                placeholder="集装箱(器)编号"
                clearable

              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="重箱或者空箱标识" prop="fullnessCode">
              <el-select v-model="transportEquipment.fullnessCode" placeholder="请选择集装箱(器)重箱或者空箱标识" >
              <el-option
                v-for="dict in ContainerSelfWeight"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集装箱(器)尺寸类型" prop="characteristicCode">
              <el-select v-model="transportEquipment.characteristicCode" placeholder="请选择集装箱(器)尺寸类型" >
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
              v-model="transportEquipment.supplierPartyTypeCode"
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
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="集装箱(器)自重(KG)" prop="tareWeight">
              <el-input
                v-model="transportEquipment.tareWeight"
                placeholder="集装箱(器)自重(KG)"
                clearable

              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="集装箱封志信息" prop="postCode">
              <el-button type="primary"  @click="dangerousInfo=true">详细</el-button>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
    </el-card>
    <!-- 字典1 -->
    <depParaList
      :tableVisible="dialogTableVisible"
      @choose="choose"
      @close="dialogTableVisible = false"
    ></depParaList>
    <!-- 字典2 -->
    <depParaList2
      :tableVisible="dialogTableVisible2"
      @choose="choose2"
      @close="dialogTableVisible2 = false"
    ></depParaList2>
    <!-- 关锁信息 -->
    <noticeInfo :detailVisible="detailVisible" @close="detailVisible = false"></noticeInfo>
    <!-- 变更原因 -->
    <changeReason :detailVisible="changeReason" @close="changeReason = false"></changeReason>
    <!-- 途径国家地区信息 -->
    <regionInfo :detailVisible="regionInfo" @close="regionInfo = false"></regionInfo>
    <!-- 集装箱(器)封志信息 -->
    <dangerousInfo :detailVisible="dangerousInfo" @close="dangerousInfo = false"></dangerousInfo>
    <!-- 发货人信息 -->
    <consignorInfo :detailVisible="consignorInfo" @close="consignorInfo = false"></consignorInfo>
    <!-- 收货人信息 -->
    <receivingInfo :detailVisible="receivingInfo" @close="receivingInfo = false"></receivingInfo>
  </div>
</template>

<script>
import depParaListJson from "@/mock/depParaList2.json";
import depParaList from "./../components/depParaList";
import depParaList2 from "./../components/depParaList2";
// 关锁信息
import noticeInfo from "./noticeInfo.vue";
// 变更原因
import changeReason from "./changeReason.vue";
// 途径国家地区信息
import regionInfo from "./regionInfo.vue";
// 集装箱(器)封志信息
import dangerousInfo from "./dangerousInfo.vue";
// 发货人信息
import consignorInfo from "./consignorInfo.vue";
// 收货人信息
import receivingInfo from "./receivingInfo.vue";
import { add,queryById } from "@/api/manifest/rmft5402_3402_4401/head";
import { listInfo } from '@/api/basis/enterpriseInfo'

export default {
  components: {
    depParaList,
    depParaList2,
    noticeInfo,
    changeReason,
    regionInfo,
    dangerousInfo,
    consignorInfo,
    receivingInfo,
  },
  data() {
    return {
      depParaVal: "",
      depParaListJson,
      detailVisible: false,
      changeReason: false,
      regionInfo: false,
      dangerousInfo: false,
      consignorInfo: false,
      receivingInfo: false,
      gridData: [],
      page: {
        num: 1,
        size: 10,
        total: 0,
      },
      dialogTableVisible: false,
      dialogTableVisible2: false,
      businessTypeOptions:[],
      // 按钮禁用状态
      btnDisable:false,
      // 查询参数
      queryParams: {
        postCode: undefined,
      },
      // 以json格式向后台传递
      form: {
        head:{},
        declaration:{
          consignmentVO_4401:{
            transportEquipment:[],
          },
        },
      },

      // 报文功能代码/报文类型代码
      head: {},
      // 表头信息表单
      declaration:{
        declarationOfficeID: undefined,
        declarationId: undefined ,
        carrier:{
          carrierId: undefined,
        },
        representativePerson:{
          name: undefined,
        },
        additionalInformation:{
          content: undefined,
        },
      },
      // 运输工具信息表单
      borderTransportMeans:{
        arrivalDateTime: undefined,
        bordertransportmeansId: undefined,
        name: undefined,
        typeCode: '4',
        // 驾驶员
        master:{
          masterId :undefined,
          name : undefined
        },
        transportEquipment: {
          transportequipmentId : undefined,
          characteristicCode: undefined,
          tareWeight: undefined
        },
      },
      AForm:{
        borderTransportMeans:{
          arrivalDateTime: undefined,
          bordertransportmeansId: undefined,
          name: undefined,
          typeCode: undefined,
          // 驾驶员
          master:{
            masterId :undefined,
            name : undefined
          },
          transportEquipment: [],
      },
      },
      // 托架/拖挂车信息表单
      trailer:{
        transportequipmentId : undefined,
        characteristicCode: undefined,
        tareWeight: undefined
      },
      // 集装箱信息表单
      transportEquipment:{
        transportequipmentId : undefined,
        fullnessCode: undefined,
        characteristicCode: undefined,
        supplierPartyTypeCode: undefined,
        tareWeight: undefined
      },
      // 运输工具List
      borderTransportMeansList: [],
      // 集装箱List
      transportEquipmentList: [],
      // 拖挂车List
      trailerList: [],

      statusOptions: [],
      dateTimeVal: "",
      data: [],
      // 企业代码
      listInfo: [],
      //挂车类型翻译
      TrailertypeOptions: [],
      // 集装箱(器)来源字典
      ContainerSource: [],
      // 集装箱(器)尺寸类型字典
      ContainerSize: [],
      // 集装箱（器）重箱或者空箱标识
      ContainerSelfWeight: [],
    };
  },
  mounted() {
    // 初始化
    this.init(
    );
    const id=this.$route.query.id;
    const flag=this.$route.query.flag;
    if(flag){
      this.btnDisable=true;
    }
    if(id){
      this.query(id);
    }
  },
  created() {
    //挂车类型字典翻译
    this.getDicts("hg_trailer_type").then((response) => {
      this.TrailertypeOptions = response.data;
    });
    // 运输方式
    this.getDicts('station_transport_fashion').then((response) => {
      this.businessTypeOptions = response.data
    })
    /** 集装箱(器)来源字典 */
    this.getDicts("hg_container_source").then((response) => {
      this.ContainerSource = response.data;
    });
    /** 集装箱(器)尺寸类型字典 */
    this.getDicts("hg_container_size_type").then((response) => {
      this.ContainerSize = response.data;
    });
    /** 集装箱（器）重箱或者空箱标识 */
    this.getDicts("hg_container_self_weight").then((response) => {
      this.ContainerSelfWeight = response.data;
    });
  },
  methods: {
    //详情页查询方法
    query(id){
      queryById(id).then(res=>{
        if(res.code === 200){
          this.declaration=res.data.declaration;
          // this.declaration.representativePerson=res.data.declaration.representativePerson;
          // this.declaration.additionalInformation=res.data.declaration.additionalInformation;
            this.borderTransportMeansList.push(res.data.declaration.consignmentVO_4401.borderTransportMeans)
          this.trailerList=res.data.declaration.consignmentVO_4401.borderTransportMeans.transportEquipment;
            this.transportEquipmentList=res.data.declaration.consignmentVO_4401.transportEquipment;
          this.head.unitCode=this.listInfo[0].eName;


        }
      })
    },
    async init() {
      // await this.depParaList()
      //  企业代码
      listInfo().then(data => {
        this.listInfo = data.rows
        console.log(data)
      })
    },
    //托架/拖挂车类型 翻译
    Trailerformat(row, column) {
      return this.selectDictLabel(this.TrailertypeOptions, row.characteristicCode);
    },
    //集装箱(器)来源 翻译
    ContainerSourceformat(row, column) {
      return this.selectDictLabel(
        this.ContainerSource,
        row.supplierPartyTypeCode
      );
    },
    //集装箱(器)尺寸类型 翻译
    ContainerSizeformat(row, column) {
      return this.selectDictLabel(this.ContainerSize, row.characteristicCode);
    },
    //集装箱（器）重箱或者空箱标识翻译
    ContainerSelfWeightformat(row, column) {
      return this.selectDictLabel(this.ContainerSelfWeight, row.fullnessCode);
    },

    // 整体暂存 = 新增
    AllSave() {
      this.form.head = this.listInfo.find(el => el.deptId === this.head.unitCode)
      this.form.head.messageType="MT4401"
      this.form.head.functionCode = "2";
      this.form.declaration = this.declaration;
      this.form.declaration.consignmentVO_4401 = this.AForm;
      this.form.declaration.consignmentVO_4401.transportEquipment = this.transportEquipmentList;
      console.log("--------------------")
      console.log(JSON.stringify(this.form));
      add(this.form).then((response) => {
        if (response.code === 200) {
          this.msgSuccess("新增成功");
          console.log(JSON.stringify(this.form));
        } else {
          this.msgError(response.msg);
        }
      });
      this.reset();
    },
    // 运输工具新增
    transportMeansAdd() {
      this.AForm.borderTransportMeans = this.borderTransportMeans,
      this.borderTransportMeansList.push(this.borderTransportMeans);
      this.borderTransportMeans = {
        arrivalDateTime: undefined,
        bordertransportmeansId: undefined,
        name: undefined,
        typeCode: undefined,
        master:{
          masterId :undefined,
          name : undefined
        },
      }
    },
    // 拖挂车新增
    trailerAdd() {
      if (this.borderTransportMeansList.length < 1){
        this.msgError("请先添加运输工具信息");
      }else {
        this.trailerList.push(this.trailer);
        this.AForm.borderTransportMeans.transportEquipment = this.trailerList;
        this.trailer = {}
      }
    },
    // 集装箱新增
    containerAdd() {
      if (this.borderTransportMeansList.length < 1){
        this.msgError("请先添加运输工具信息");
      }else {
        this.transportEquipmentList.push(this.transportEquipment);
        this.transportEquipment = {}
      }
    },

    // 表单清空
    reset() {
      this.declaration = {
        declarationOfficeID: undefined,
        declarationId: undefined ,
        carrier:{
          carrierId: undefined,
        },
        representativePerson:{
          name: undefined,
        },
        additionalInformation:{
          content: undefined,
        },
      },
      // 运输工具信息表单
      this.borderTransportMeans = {
        arrivalDateTime: undefined,
        bordertransportmeansId: undefined,
        name: undefined,
        typeCode: undefined,
        // 驾驶员
        master:{
          masterId :undefined,
          name : undefined
        },
        transportEquipment: {
          transportequipmentId : undefined,
          characteristicCode: undefined,
          tareWeight: undefined
        },
      },
      this.trailer = {},
      this.transportEquipment = {},
      this.borderTransportMeansList = [],
      this.transportEquipmentList = [],
      this.trailerList = []
    },

    // 新增
    handleAdd() {},
    // 暂存
    handleSave() {
      console.log("保存");
    },
    // 删除
    handleDelete() {},
    // 申报
    handleReport() {},
    // 复制
    handleCopy() {},
    // 刷新
    handleRefresh() {},
    // 翻页
    currentChange(page) {
      console.log(page);
    },
    // 组件选择
    choose(row) {
      // this.declaration.carrier.carrierId = row.codeName;
      this.declaration.declarationOfficeID = row.codeName;
      this.dialogTableVisible = false;
    },
    // 关闭组件
    close() {
      this.dialogTableVisible = false;
    },
    choose2(row) {
      this.borderTransportMeans.master.name = row.codeName;
      this.borderTransportMeans.master.masterId = row.codeValue;
      this.dialogTableVisible2 = false;
    },
    close2() {
      this.dialogTableVisible2 = false;
    },
    handleSelectionChange() {},
    numFun() {
      console.log(123);
    },
    /** 申报*/
    updateStatementCode(){},
    /** 回显方法*/
    onChange(id) {
      const data = this.listInfo.find(el => el.deptId === id)
      console.log(data)
      const code = data.customsMaster
      this.declaration.representativePerson.name = data.stationPersonName
    },
    // 请求接口
    depParaList() {
      return new Promise((resolve) => {
        this.$store
          .dispatch("originalManifest/depParaList", {
            tableName: "CUS_CUSTOMS",
            rowNum: 5000,
          })
          .then((data) => {
            resolve(data);
          });
      });
    },
  },
};
</script>

<style lang="scss" scope>
.right {
  text-align: right;
}
.datePicker {
  width: 100% !important;
}
.el-select{
  width: 100%;
}
</style>
