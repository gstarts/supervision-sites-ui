<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        :disabled="btnDisable.addBtn"
        @click="handleAdd"
      >新增</el-button>
      <el-button
        type="success"
        icon="el-icon-edit"
        size="mini"
        :disabled="btnDisable.saveBtn"
        @click="AllSave"
      >暂存</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        :disabled="btnDisable.delBtn"
        @click="handleDelete"
      >删除</el-button>
      <el-button
        type="danger"
        icon="el-icon-thumb"
        size="mini"
        :disabled="btnDisable.repBtn"
        @click="handleReport"
      >申报</el-button>
      <el-button
        type="primary"
        icon="el-icon-document-copy"
        size="mini"
        :disabled="btnDisable.copyBtn"
        @click="handleCopy"
      >复制</el-button>
      <el-button
        type="primary"
        icon="el-icon-refresh"
        size="mini"
        :disabled="btnDisable.refBtn"
        @click="handleRefresh"
      >刷新</el-button>
    </div>
    <!-- 基本信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本备案信息填写</span>
      </div>
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
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
                @focus="$store.dispatch('originalManifest/changeStatus')"
                v-model="declaration.declarationOfficeID"
                placeholder="进出境口岸海关代码"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承运人代码" prop="carrierId">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="declaration.carrier.carrierId"
                placeholder="承运人代码"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="传输企业备案关区" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="传输企业备案关区"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row type="flex">
          <!-- <el-col :span="6">
            <el-form-item label="企业代码" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="企业代码" clearable size="mini" />
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="确报传输人名称" prop="name">
              <el-input
                v-model="declaration.representativePerson.name"
                placeholder="确报传输人名称"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="content">
              <el-input
                v-model="declaration.additionalInformation.content"
                placeholder="备注"
                clearable
                size="mini"
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
            :disabled="btnDisable.addBtn"
            @click="transportMeansAdd"
          >新增</el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="btnDisable.saveBtn"
            @click="handleSave"
          >暂存</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="btnDisable.delBtn"
            @click="handleDelete"
          >删除</el-button>
          <el-button
            type="danger"
            icon="el-icon-thumb"
            size="mini"
            :disabled="btnDisable.repBtn"
            @click="handleReport"
          >申报</el-button>
          <el-button
            type="primary"
            icon="el-icon-document-copy"
            size="mini"
            :disabled="btnDisable.copyBtn"
            @click="handleCopy"
          >复制</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            size="mini"
            :disabled="btnDisable.refBtn"
            @click="handleRefresh"
          >刷新</el-button>
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
        <el-table-column prop="num" label="序号" min-width="120" align="center"/>
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
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="运输工具代码" prop="bordertransportmeansId">
              <el-input v-model="borderTransportMeans.bordertransportmeansId" placeholder="运输工具代码" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运输工具名称" prop="name">
              <el-input v-model="borderTransportMeans.name" placeholder="运输工具名称" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运输方式代码" prop="typeCode">
              <el-input v-model="borderTransportMeans.typeCode" placeholder="运输方式代码" clearable size="mini" />
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
                size="mini"
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
                size="mini"
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
                size="mini"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="途径国家或地区" prop="postCode" >
              <el-button type="primary" size="mini" @click="regionInfo=true">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="司乘人员数" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="司乘人员数"
                clearable
                size="mini"
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
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否预防接种" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="是否预防接种"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关锁信息" prop="postCode" >
              <el-button type="primary" size="mini" @click="detailVisible=true">详细</el-button>
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
            :disabled="btnDisable.addBtn"
            @click="trailerAdd"
          >新增</el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="btnDisable.saveBtn"
            @click="handleSave"
          >暂存</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="btnDisable.delBtn"
            @click="handleDelete"
          >删除</el-button>
          <el-button
            type="danger"
            icon="el-icon-thumb"
            size="mini"
            :disabled="btnDisable.repBtn"
            @click="handleReport"
          >申报</el-button>
          <el-button
            type="primary"
            icon="el-icon-document-copy"
            size="mini"
            :disabled="btnDisable.copyBtn"
            @click="handleCopy"
          >复制</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            size="mini"
            :disabled="btnDisable.refBtn"
            @click="handleRefresh"
          >刷新</el-button>
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
        <el-table-column type="index" prop="num" label="序号" min-width="120" />
        <el-table-column prop="transportequipmentId" label="托架/拖挂车编号" min-width="120" />
        <el-table-column prop="characteristicCode" label="托架/拖挂车类型" min-width="150" />
        <el-table-column prop="tareWeight" label="托架/拖挂车自重(KG)" min-width="120" />
      </el-table>
      <el-pagination
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="托架/拖挂车编号" prop="transportequipmentId">
              <el-input
                v-model="trailer.transportequipmentId"
                placeholder="托架/拖挂车编号"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="托架/拖挂车类型" prop="characteristicCode">
              <el-input
                v-model="trailer.characteristicCode"
                placeholder="托架/拖挂车类型"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="托架/拖挂车自重(KG)" prop="tareWeight">
              <el-input
                v-model="trailer.tareWeight"
                placeholder="托架/拖挂车自重(KG)"
                clearable
                size="mini"
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
            :disabled="btnDisable.addBtn"
            @click="containerAdd"
          >新增</el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="btnDisable.saveBtn"
            @click="handleSave"
          >暂存</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="btnDisable.delBtn"
            @click="handleDelete"
          >删除</el-button>
          <el-button
            type="danger"
            icon="el-icon-thumb"
            size="mini"
            :disabled="btnDisable.repBtn"
            @click="handleReport"
          >申报</el-button>
          <el-button
            type="primary"
            icon="el-icon-document-copy"
            size="mini"
            :disabled="btnDisable.copyBtn"
            @click="handleCopy"
          >复制</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            size="mini"
            :disabled="btnDisable.refBtn"
            @click="handleRefresh"
          >刷新</el-button>
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
        <el-table-column type="index" prop="num" label="序号" min-width="120" />
        <el-table-column prop="transportequipmentId" label="集装箱(器)编号" min-width="120" />
        <el-table-column prop="fullnessCode" label="重箱或者空箱标识" min-width="150" />
        <el-table-column prop="characteristicCode" label="集装箱(器)尺寸类型" min-width="120" />
        <el-table-column prop="supplierPartyTypeCode" label="集装箱(器)来源代码" min-width="120" />
        <el-table-column prop="tareWeight" label="集装箱(器)自重(KG)" min-width="120" />
      </el-table>
      <el-pagination
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="集装箱(器)编号" prop="transportequipmentId">
              <el-input
                v-model="transportEquipment.transportequipmentId"
                placeholder="集装箱(器)编号"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="重箱或者空箱标识" prop="fullnessCode">
              <el-input
                v-model="transportEquipment.fullnessCode"
                placeholder="重箱或者空箱标识"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集装箱(器)尺寸类型" prop="characteristicCode">
              <el-input
                v-model="transportEquipment.characteristicCode"
                placeholder="集装箱(器)尺寸类型"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集装箱(器)来源代码" prop="supplierPartyTypeCode">
              <el-input
                v-model="transportEquipment.supplierPartyTypeCode"
                placeholder="集装箱(器)来源代码"
                clearable
                size="mini"
              />
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
                size="mini"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="集装箱封志信息" prop="postCode">
              <el-button type="primary" size="mini" @click="dangerousInfo=true">详细</el-button>
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
      // 按钮禁用状态
      btnDisable: {
        addBtn: false,
        saveBtn: false,
        delBtn: false,
        repBtn: true,
        copyBtn: false,
        refBtn: false,
      },
      // 查询参数
      queryParams: {
        postCode: undefined,
      },
      // 以json格式向后台传递
      form: {
        head:{},
        declaration:{        
          consignment:{
            
            transportEquipment:[], 
          },  
          
        },        
      },

      // 报文功能代码/报文类型代码
      head: {
        functionCode: "2",
        messageType: "MT4401",
      },
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
      AAA:{
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
    };
  },
  mounted() {
    // 初始化
    this.init();
  },
  methods: {
    async init() {
      // await this.depParaList()
    },
    // 整体暂存 = 新增
    AllSave() {
      this.form.head = this.head;
      this.form.declaration = this.declaration;
      this.form.declaration.consignment = this.AAA;
      // this.form.declaration.consignment.borderTransportMeans.transportEquipment = this.trailerList;
      this.form.declaration.consignment.transportEquipment = this.transportEquipmentList;
      console.log(JSON.stringify(this.form));
      
    },
    // 运输工具新增
    transportMeansAdd() {
      this.AAA.borderTransportMeans = this.borderTransportMeans,
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
      // this.AAA.borderTransportMeans.transportEquipment.push(this.trailer);
      console.log(this.AAA)
      this.trailerList.push(this.trailer);
      this.AAA.borderTransportMeans.transportEquipment = this.trailerList;
      this.trailer = {}
    },  
    // 集装箱新增
    containerAdd() {
      this.transportEquipmentList.push(this.transportEquipment);
      this.transportEquipment = {}
    },  

    // 新增
    handleAdd() {},
    // 暂存
    handleSave() {
      console.log("保存");
      // this.$saveStore("a","123")
      // this.$getStore('a')
      // this.$delStore("a")
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
      this.declaration.carrier.carrierId = row.codeName;
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
  width: auto !important;
}
</style>