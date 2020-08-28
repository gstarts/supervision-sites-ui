<template>
  <div class="app-container">
    <!-- 按钮组 --> 
    <div class="mb20">
      <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd">新增</el-button>
      <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave">暂存</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete">删除</el-button>
      <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
      <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>
    </div>
    <!-- 基本信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物运输批次号" prop="voyageNo" >
              <el-input
                v-model="queryParams.voyageNo"
                placeholder="货物运输批次号"
                clearable
                size="small"
              >
                <el-tooltip slot="append" class="item" effect="dark" content="系统分配批次号" placement="top-start">
                  <el-button  icon="el-icon-plus" @click="numFun"></el-button>
                </el-tooltip>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输方式代码" prop="trafMode" >
              <el-input
              @focus="$store.dispatch('originalManifest/changeStatus')"
                v-model="queryParams.trafMode"
                placeholder="运输方式代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进出境口岸海关代码" prop="customsCodeName" >
              <el-select v-model="queryParams.customsCodeName" filterable placeholder="进出境口岸海关代码">
                <el-option
                  v-for="item in CustomsDictionary"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承运人代码" prop="carrierCode" >
              <el-input
                v-model="queryParams.carrierCode"
                placeholder="承运人代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="运输工具代理企业代码" prop="transAgentCode" >
              <el-input
                v-model="queryParams.transAgentCode"
                placeholder="运输工具代理企业代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        <el-col :span="6">
            <el-form-item label="货物装载时间" prop="loadingDate" >
              <el-date-picker
                class="datePicker"
                v-model="queryParams.loadingDate"
                type="datetime"
                placeholder="选择日期时间" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="卸货地代码" prop="loadingLocationCode" >
              <el-input
                v-model="queryParams.loadingLocationCode"
                placeholder="卸货地代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="到达卸货地日期" prop="arrivalDate" >
              <el-date-picker
                class="datePicker"
                v-model="queryParams.arrivalDate"
                type="datetime"
                placeholder="选择日期时间" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="传输企业备案关区" prop="customMasterName" >
              <el-select v-model="queryParams.customMasterName" filterable placeholder="传输企业备案关区">
                <el-option
                  v-for="item in CustomsDictionary"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业代码" prop="unitCode" >
              <el-input
                v-model="queryParams.unitCode"
                placeholder="企业代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="舱单传输人名称" prop="msgRepName" >
              <el-input
                v-model="queryParams.msgRepName"
                placeholder="舱单传输人名称"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="additionalInformation" >
              <el-input
                v-model="queryParams.additionalInformation"
                placeholder="备注"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 提运单信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>提运单信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd">新增</el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave">暂存</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete">删除</el-button>
          <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
          <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>
          <span>&nbsp;&nbsp;注：对选中数据修改完成之后请点击左侧“保存”按钮</span>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column prop="index" label="序号" min-width="120"/>
        <el-table-column prop="billNo" label="提(运)单号" min-width="120"/>
        <el-table-column prop="goodsCustomsStat" label="海关货物通关代码" min-width="150" />
        <el-table-column prop="packNum" label="货物总件数" min-width="120"/>
        <el-table-column prop="grossWt" label="货物总毛重(kg)" min-width="120"/>
        <el-table-column prop="goodsValue" label="货物价值" min-width="120"/>
        <el-table-column prop="consigneeName" label="收货人名称" min-width="120"/>
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
      <el-form :model="waybill" ref="waybill" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="提（运）单号" prop="billNo" >
              <el-input
                v-model="waybill.billNo"
                placeholder="提（运）单号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="变更原因" prop="chgCodeAddBtn" >
              <el-button type="primary" size="mini" @click="changeReason=true">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输条款" prop="conditionCodeName" >
              <el-input
                v-model="waybill.conditionCodeName"
                placeholder="运输条款"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运费支付方法" prop="paymentType" >
              <el-input
                v-model="waybill.paymentType"
                placeholder="运费支付方法"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="海关货物通关代码" prop="goodsCustomsStat" >
              <el-input
                @focus="dialogTableVisible2 = true"
                v-model="waybill.goodsCustomsStat"
                placeholder="海关货物通关代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="跨境指运地" prop="transLocationId" >
              <el-input
                v-model="waybill.transLocationId"
                placeholder="跨境指运地"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物总件数" prop="packNum" >
              <el-input
                v-model="waybill.packNum"
                placeholder="货物总件数"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包装种类" prop="packType" >
              <el-input
                v-model="waybill.packType"
                placeholder="包装种类"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物体积(M3)" prop="cube" >
              <el-input
                v-model="waybill.cube"
                placeholder="货物体积(M3)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物总毛重(KG)	" prop="grossWt" >
              <el-input
                v-model="waybill.grossWt"
                placeholder="货物总毛重(KG)	"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物价值" prop="goodsValue" >
              <el-input
                v-model="waybill.goodsValue"
                placeholder="货物价值"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="金额类型	" prop="currencyType" >
              <el-input
                v-model="waybill.currencyType"
                placeholder="金额类型	"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="拆箱人代码" prop="consolidatorId" >
              <el-input
                v-model="waybill.consolidatorId"
                placeholder="拆箱人代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="途径国家或地区" prop="countryInfoAddBtn" >
              <el-button type="primary" size="mini" @click="regionInfo = true">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货人信息" prop="consigneeInfo" >
              <el-button type="primary" size="mini" @click="receivingInfo = true">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发货人信息" prop="consigorInfo" >
              <el-button type="primary" size="mini" @click="consignorInfo = true">详细</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="通知人信息" prop="notifyInfo" >
              <el-button type="primary" size="mini" @click='detailVisible = true'>详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="危险品联系人信息" prop="undgInfo" >
              <el-button type="primary" size="mini" @click="dangerousInfo = true">详细</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 商品项信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>商品项信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd">新增</el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave">暂存</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete">删除</el-button>
          <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
          <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column prop="index" label="序号" min-width="120"/>
        <el-table-column prop="goodsSeqNo" label="商品项序号" min-width="120"/>
        <el-table-column prop="goodsPackNum" label="商品项件数" min-width="150" />
        <el-table-column prop="goodsBriefDesc" label="商品项简要描述" min-width="120"/>
        <el-table-column prop="goodsGrossWt" label="商品项毛重(kg)" min-width="120"/>
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
      <el-form :model="shopInfo" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="商品项序号" prop="goodsSeqNo" >
              <el-input
                v-model="shopInfo.goodsSeqNo"
                placeholder="商品项序号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品项件数" prop="goodsPackNum" >
              <el-input
                v-model="shopInfo.goodsPackNum"
                placeholder="商品项件数"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包装种类" prop="goodsPackTypeCode" >
              <el-input
                v-model="shopInfo.goodsPackTypeCode"
                placeholder="包装种类"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品项毛重(KG)" prop="goodsGrossWt" >
              <el-input
                v-model="shopInfo.goodsGrossWt"
                placeholder="商品项毛重(KG)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="商品项简要描述" prop="goodsBriefDesc" >
              <el-input
                @focus="dialogTableVisible2 = true"
                v-model="shopInfo.goodsBriefDesc"
                placeholder="商品项简要描述"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="危险品编号" prop="undgNoName" >
              <el-input
                v-model="shopInfo.undgNoName"
                placeholder="危险品编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品HS编码" prop="HSCode" >
              <el-input
                v-model="shopInfo.HSCode"
                placeholder="商品HS编码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品项描述补充信息" prop="goodsDetailDesc" >
              <el-input
                v-model="shopInfo.goodsDetailDesc"
                placeholder="商品项描述补充信息"
                clearable
                size="small"
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
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd">新增</el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave">暂存</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete">删除</el-button>
          <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
          <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column prop="index" label="序号" min-width="120"/>
        <el-table-column prop="contaId" label="集装箱（器）编号" min-width="120"/>
        <el-table-column prop="contaSizeType" label="尺寸和类型" min-width="150" />
        <el-table-column prop="contaSuppId" label="来源代码" min-width="120"/>
        <el-table-column prop="contaLoadedType" label="重箱或空箱标识" min-width="120"/>
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
      <el-form :model="containerInfo" ref="containerInfo" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="集装箱（器）编号" prop="contaId" >
              <el-input
                v-model="containerInfo.contaId"
                placeholder="集装箱（器）编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="尺寸和类型" prop="contaSizeType" >
              <el-input
                v-model="containerInfo.contaSizeType"
                placeholder="尺寸和类型"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="来源代码" prop="contaSuppId" >
              <el-input
                v-model="containerInfo.contaSuppId"
                placeholder="来源代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="重箱或空箱标识" prop="contaLoadedType" >
              <el-input
                v-model="containerInfo.contaLoadedType"
                placeholder="重箱或空箱标识"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 字典1 -->
    <depParaList :tableVisible='dialogTableVisible' @choose="choose" @close='dialogTableVisible = false'></depParaList>
    <!-- 字典2 -->
    <depParaList2 :tableVisible='dialogTableVisible2' @choose="choose2" @close='dialogTableVisible2 = false'></depParaList2>
    <!-- 通知人信息 -->
    <noticeInfo :detailVisible='detailVisible' @close='detailVisible = false'></noticeInfo>
    <!-- 变更原因 -->
    <changeReason :detailVisible='changeReason' @close='changeReason = false'></changeReason>
    <!-- 途径国家地区信息 -->
    <regionInfo :detailVisible='regionInfo' @close='regionInfo = false'></regionInfo>
    <!-- 危险品联系人信息 -->
    <dangerousInfo :detailVisible='dangerousInfo' @close='dangerousInfo = false'></dangerousInfo>
    <!-- 发货人信息 -->
    <consignorInfo :detailVisible='consignorInfo' @close='consignorInfo = false'></consignorInfo>
    <!-- 收货人信息 -->
    <receivingInfo :detailVisible='receivingInfo' @close='receivingInfo = false'></receivingInfo>

    
  </div>
</template>

<script>
import depParaListJson from '@/mock/depParaList2.json';
import depParaList from './../components/depParaList';
import depParaList2 from './../components/depParaList2';
// 通知人信息
import noticeInfo from './noticeInfo.vue';
// 变更原因
import changeReason from './changeReason.vue';
// 途径国家地区信息
import regionInfo from './regionInfo.vue';
// 危险品联系人信息
import dangerousInfo from './dangerousInfo.vue';
// 发货人信息
import consignorInfo from './consignorInfo.vue';
// 收货人信息
import receivingInfo from './receivingInfo.vue';




export default {
  components:{depParaList,depParaList2,noticeInfo,changeReason,regionInfo,dangerousInfo,consignorInfo,receivingInfo},
  data(){
    return{
      
      depParaVal:'',
      depParaListJson,
      detailVisible:false,
      changeReason:false,
      regionInfo:false,
      dangerousInfo:false,
      consignorInfo:false,
      receivingInfo:false,
      gridData: [],
      page:{
        num:1,
        size:10,
        total:0
      },
      dialogTableVisible:false,
      dialogTableVisible2:false,
      // 按钮禁用状态
      btnDisable:{
        addBtn:false,
        saveBtn:false,
        delBtn:false,
        repBtn:true,
        copyBtn:false,
        refBtn:false,
      },
      // 查询参数
      queryParams: {
        voyageNo:'',//货物运输批次号
        trafMode:'',//运输方式代码
        customsCodeName:'',//进出境口岸海关代码
        carrierCode:'',//承运人代码
        transAgentCode:'',//运输工具代理企业代码
        loadingDate:'',//货物装载时间
        loadingLocationCode:'',//卸货地代码
        arrivalDate:'',//到达卸货地日期
        customMasterName:'',//传输企业备案关区
        unitCode:'',//企业代码
        msgRepName:'',//舱单传输人名称
        additionalInformation:'',//备注
        postCode: undefined
      },
      // 提运单信息
      waybill:{
        billNo:'',//提（运）单号
        chgCodeAddBtn:'',//变更原因
        conditionCodeName:'',//运输条款
        paymentType:'',//运费支付方法
        goodsCustomsStat:'',//海关货物通关代码
        transLocationId:'',//跨境指运地
        packNum:'',//货物总件数
        packType:'',//包装种类
        cube:'',//货物体积(M3)
        grossWt:'',//货物总毛重(KG)
        goodsValue:'',//货物价值
        currencyType:'',//金额类型
        consolidatorId:'',//拆箱人代码
        countryInfoAddBtn:'',//途径国家或地区
        consigneeInfo:'',//收货人信息
        consigorInfo:'',//发货人信息
        notifyInfo:'',//通知人信息
        undgInfo:'',//危险品联系人信息
      },
      // 商品项信息
      shopInfo:{
        goodsSeqNo:'',//商品项序号
        goodsPackNum:'',//商品项件数
        goodsPackTypeCode:'',//包装种类
        goodsGrossWt:'',//商品项毛重(KG)
        goodsBriefDesc:'',//商品项简要描述
        undgNoName:'',//危险品编号
        HSCode:'',//商品HS编码
        goodsDetailDesc:'',//商品项描述补充信息
      },
      // 集装箱信息
      containerInfo:{
        contaId:'',//集装箱（器）编号
        contaSizeType:'',//尺寸和类型
        contaSuppId:'',//来源代码
        contaLoadedType:'',//重箱或空箱标识
      },
      statusOptions:[],
      dateTimeVal:'',
      data:[],
      // 进出境口岸关区代码字典
      CustomsDictionary:[]
    }
  },
  mounted(){
    // 初始化
    this.init()
  },
  methods:{
    async init(){
      // await this.depParaList()
      this.hgCustomsCode()
    },
    // 新增
    handleAdd(){},
    // 暂存
    handleSave(){
      console.log('保存');
      // this.$saveStore("a","123")
      // this.$getStore('a')
      // this.$delStore("a")
    },
    // 删除
    handleDelete(){},
    // 申报
    handleReport(){},
    // 复制
    handleCopy(){},
    // 刷新
    handleRefresh(){},
    // 翻页
    currentChange(page){
      console.log(page);
    },
    // 组件选择
    choose(row){
      this.queryParams.postCode = row.codeName
      this.dialogTableVisible=false
    },
    // 关闭组件
    close(){
      this.dialogTableVisible=false
    },
    choose2(row){
      this.queryParams.postCode = row.codeName
      this.dialogTableVisible2=false
    },
    close2(){
      this.dialogTableVisible2=false
    },
    handleSelectionChange(){},
    numFun(){
      console.log(123)
    },
    // 请求接口
    depParaList(){
      return new Promise(resolve=>{
        this.$store.dispatch('originalManifest/depParaList',{tableName: 'CUS_CUSTOMS',rowNum: 5000}).then(data=>{
          resolve(data);
        })
      })
    },
    hgCustomsCode(){
      /** 进出境口岸关区代码字典 */
      this.getDicts("hg_customs_code").then((response) => {
        this.CustomsDictionary = response.data;
      });
    }
  }

}
</script>

<style lang="scss" scope>
.right{
  text-align: right;
}
.datePicker{
  width: auto !important;
}
</style>