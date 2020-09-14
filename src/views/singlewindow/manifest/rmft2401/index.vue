<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn" @click="handleAdd">新增
      </el-button>
      <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="handleSave">暂存
      </el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn" @click="handleDelete">
        删除
      </el-button>
      <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport"
                 style="float:right">申报
      </el-button>
      <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn"
                 @click="handleCopy">复制
      </el-button>
      <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">
        刷新
      </el-button>
    </div>
    <!-- 基本信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="basicParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物运输批次号" prop="voyageNo">
              <el-input
                v-model="basicParams.declaration.declarationId"
                placeholder="货物运输批次号"
                clearable
                size="small"
              >
                <!-- <el-tooltip slot="append" class="item" effect="dark" content="系统分配批次号" placement="top-start">
                  <el-button  icon="el-icon-plus" @click="getVoyageNo"></el-button>
                </el-tooltip> -->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输方式代码" prop="trafMode">
              <el-input
                @focus="$store.dispatch('originalManifest/changeStatus')"
                v-model="basicParams.borderTransportMeans.typeCode"
                placeholder="运输方式代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进出境口岸海关代码" prop="customsCodeName">
              <el-select v-model="basicParams.declaration.declarationOfficeId" filterable placeholder="进出境口岸海关代码">
                <el-option
                  v-for="item in hg_customs_code"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承运人代码" prop="carrierCode">
              <el-input
                v-model="basicParams.carrierIdentification.manifestDeclarationId"
                placeholder="承运人代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="运输工具代理企业代码" prop="transAgentCode">
              <el-input
                v-model="basicParams.agent.agentId"
                placeholder="运输工具代理企业代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物装载时间" prop="loadingDate">
              <el-date-picker
                class="datePicker"
                v-model="basicParams.loadingLocation.loadingDateTime"
                type="datetime"
                placeholder="选择日期时间"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="卸货地代码" prop="loadingLocationCode">
              <el-input
                v-model="basicParams.unloadingLocation.unloadinglocationId"
                placeholder="卸货地代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="到达卸货地日期" prop="arrivalDate">
              <el-date-picker
                class="datePicker"
                v-model="basicParams.unloadingLocation.arrivalDateTime"
                type="date"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="传输企业备案关区" prop="customMasterName">
              <el-select v-model="basicParams.customMasterName" filterable placeholder="传输企业备案关区">
                <el-option
                  v-for="item in hg_customs_code"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业代码" prop="unitCode">
              <el-select v-model="basicParams.unitCode" filterable placeholder="企业代码">
                <el-option
                  v-for="(item,index) in listInfo"
                  :key="index"
                  :label="item.eName"
                  :value="item.deptId">
                </el-option>
              </el-select>
              <!-- <el-input
                v-model="basicParams.unitCode"
                placeholder="企业代码"
                clearable
                size="small"
                disabled
              /> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="中蒙数据交换项" prop="postCode" >
              <el-input
                v-model="basicParams.postCode"
                placeholder="中蒙数据交换项"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="additionalInformation">
              <el-input
                v-model="basicParams.additionalInformation.content"
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
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn"
                     @click="handleAdd($event,'waybill')">新增
          </el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn"
                     @click="handleChange($event,'waybill')">修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn"
                     @click="handleDelete($event,'waybill')">删除
          </el-button>
          <span>&nbsp;&nbsp;注：对选中数据修改完成之后请点击左侧“保存”按钮</span>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="waybillList"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        @row-click='waybillClick'
        :row-class-name="tableRowClassName"
        @selection-change="waybillSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column type="index" label="序号" min-width="120"/>
        <el-table-column prop="transportcontrantionId" label="提(运)单号" min-width="120"/>
        <el-table-column prop="currentCode" label="海关货物通关代码" min-width="150"/>
        <el-table-column prop="totalPackageQuantity" label="货物总件数" min-width="120"/>
        <el-table-column prop="grossMassMeasure" label="货物总毛重(kg)" min-width="120"/>
        <el-table-column prop="valueAmount" label="货物价值" min-width="120"/>
        <el-table-column prop="consigneeName" label="收货人名称" min-width="120"/>
      </el-table>
      <el-form :model="waybill" ref="waybill" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="提（运）单号" prop="transportcontrantionId">
              <el-input
                v-model="waybill.transportcontrantionId"
                placeholder="提（运）单号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="变更原因" prop="chgCodeAddBtn">
              <el-button type="primary" size="mini" @click="changeReason=true">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输条款" prop="conditionCode">
              <el-select v-model="waybill.conditionCode" filterable placeholder="运输条款" size="small">
                <el-option
                  v-for="item in shippingTerms"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运费支付方法" prop="paymentMethodCode">
              <el-select v-model="waybill.paymentMethodCode" filterable placeholder="运费支付方法" size="small">
                <el-option
                  v-for="item in freightPaymentMethod"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="海关货物通关代码" prop="currentCode">
              <el-select v-model="waybill.currentCode" filterable placeholder="海关货物通关代码">
                <el-option
                  v-for="item in currentCode"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="跨境指运地" prop="transitdestinationId">
              <el-input
                v-model="waybill.transitdestinationId"
                placeholder="跨境指运地"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物总件数" prop="totalPackageQuantity">
              <el-input
                v-model="waybill.totalPackageQuantity"
                placeholder="货物总件数"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包装种类" prop="WrapType">
              <el-select v-model="waybill.WrapType" filterable multiple collapse-tags placeholder="包装种类" size="small">
                <el-option
                  v-for="item in PaymentMethodCode"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物体积(M3)" prop="grossVolumeMeasure">
              <el-input
                v-model="waybill.grossVolumeMeasure"
                placeholder="货物体积(M3)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物总毛重(KG)	" prop="grossMassMeasure">
              <el-input
                v-model="waybill.grossMassMeasure"
                placeholder="货物总毛重(KG)	"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物价值" prop="valueAmount">
              <el-input
                v-model="waybill.valueAmount"
                placeholder="货物价值"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="金额类型	" prop="currencyType">
              <el-select v-model="waybill.currencyType" filterable multiple collapse-tags placeholder="金额类型" size="small">
                <el-option
                  v-for="item in currencySystem"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="拆箱人代码" prop="deconsolidatorId">
              <el-input
                v-model="waybill.deconsolidatorId"
                placeholder="拆箱人代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="途径国家或地区" prop="routingCountryCode">
              <el-button type="primary" size="mini" @click="regionInfo = true">详细</el-button>
              <el-select v-model="waybill.routingCountryCode" filterable multiple collapse-tags placeholder="途径国家或地区">
                <el-option
                  v-for="item in routingContry"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="收货人信息" prop="consignee">
              <el-button type="primary" size="mini" @click="receivingInfo = true">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发货人信息" prop="consignor">
              <el-button type="primary" size="mini" @click="consignorInfo = true">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="通知人信息" prop="notifyInfo">
              <el-button type="primary" size="mini" @click='detailVisible = true'>详细</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">

          <el-col :span="6">
            <el-form-item label="危险品联系人信息" prop="undgInfo">
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
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn"
                     @click="handleAdd($event,'shopInfo')">新增
          </el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn"
                     @click="handleChange($event,'shopInfo')">修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn"
                     @click="handleDelete($event,'shopInfo')">删除
          </el-button>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="shopInfoList"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        @row-click='shopInfoClick'
        :row-class-name="tableRowClassName"
        @selection-change="shopInfoSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column type="index" label="序号" min-width="120"/>
        <el-table-column prop="sequenceNumeric" label="商品项序号" min-width="120"/>
        <el-table-column prop="quantityQuantity" label="商品项件数" min-width="150"/>
        <el-table-column prop="cargoDescription" label="商品项简要描述" min-width="120"/>
        <el-table-column prop="goodsMeasure" label="商品项毛重(kg)" min-width="120"/>
      </el-table>
      <el-form :model="shopInfo" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="商品项序号" prop="sequenceNumeric">
              <el-input
                v-model="shopInfo.sequenceNumeric"
                placeholder="商品项序号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品项件数" prop="quantityQuantity">
              <el-input
                v-model="shopInfo.quantityQuantity"
                placeholder="商品项件数"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包装种类" prop="goodsPackTypeCode">
              <el-select v-model="shopInfo.goodsPackTypeCode" filterable placeholder="包装种类">
                <el-option
                  v-for="item in PaymentMethodCode"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品项毛重(KG)" prop="goodsMeasure">
              <el-input
                v-model="shopInfo.goodsMeasure"
                placeholder="商品项毛重(KG)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="商品项简要描述" prop="cargoDescription">
              <el-input
                v-model="shopInfo.cargoDescription"
                placeholder="商品项简要描述"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="危险品编号" prop="classificationId">
              <el-select v-model="shopInfo.classificationId" filterable placeholder="危险品编号" size="small">
                <el-option
                  v-for="item in dangerousGoodsNumber"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品HS编码" prop="HSCode">
              <el-input
                v-model="shopInfo.HSCode"
                placeholder="商品HS编码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品项描述补充信息" prop="description">
              <el-input
                v-model="shopInfo.description"
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
          <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="btnDisable.addBtn"
                     @click="handleAdd($event,'containerInfo')">新增
          </el-button>
          <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn"
                     @click="handleChange($event,'containerInfo')">修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="btnDisable.delBtn"
                     @click="handleDelete($event,'containerInfo')">删除
          </el-button>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="containerInfoList"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        @row-click='containerInfoClick'
        :row-class-name="tableRowClassName"
        @selection-change="containerInfoSelectionChange">
        <el-table-column type="selection" min-width="55"/>
        <el-table-column type="index" label="序号" min-width="120"/>
        <el-table-column prop="equipmentId" label="集装箱（器）编号" min-width="120"/>
        <el-table-column prop="characteristicCode" label="尺寸和类型" min-width="150"/>
        <el-table-column prop="supplierPartyTypeCode" label="来源代码" min-width="120"/>
        <el-table-column prop="fullnessCode" label="重箱或空箱标识" min-width="120"/>
      </el-table>
      <el-form :model="containerInfo" ref="containerInfo" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="集装箱（器）编号" prop="equipmentId">
              <el-input
                v-model="containerInfo.equipmentId"
                placeholder="集装箱（器）编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="尺寸和类型" prop="characteristicCode">
              <el-input
                v-model="containerInfo.characteristicCode"
                placeholder="尺寸和类型"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="来源代码" prop="supplierPartyTypeCode">
              <el-input
                v-model="containerInfo.supplierPartyTypeCode"
                placeholder="来源代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="重箱或空箱标识" prop="fullnessCode">
              <el-input
                v-model="containerInfo.fullnessCode"
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
    <depParaList2 :tableVisible='dialogTableVisible2' @choose="choose2"
                  @close='dialogTableVisible2 = false'></depParaList2>
    <!-- 通知人信息 -->
    <noticeInfo :detailVisible='detailVisible' @close='noticeInfoClose'></noticeInfo>
    <!-- 变更原因 -->
    <changeReason :detailVisible='changeReason' @close='changeReasonClose'></changeReason>
    <!-- 途径国家地区信息 -->
    <regionInfo :detailVisible='regionInfo' @close='regionInfoClose'></regionInfo>
    <!-- 危险品联系人信息 -->
    <dangerousInfo :detailVisible='dangerousInfo' @close='dangerousInfoClose'></dangerousInfo>
    <!-- 发货人信息 -->
    <consignorInfo :detailVisible='consignorInfo' @close='consignorInfoClose'></consignorInfo>
    <!-- 收货人信息 -->
    <receivingInfo :detailVisible='receivingInfo' @close='receivingInfoClose'></receivingInfo>
  </div>
</template>

<script>
import depParaListJson from '@/mock/depParaList2.json'
import depParaList from './../components/depParaList'
import depParaList2 from './../components/depParaList2'
// 通知人信息
import noticeInfo from './noticeInfo.vue'
// 变更原因
import changeReason from './changeReason.vue'
// 途径国家地区信息
import regionInfo from './regionInfo.vue'
// 危险品联系人信息
import dangerousInfo from './dangerousInfo.vue'
// 发货人信息
import consignorInfo from './consignorInfo.vue'
// 收货人信息
import receivingInfo from './receivingInfo.vue'

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
    receivingInfo
  },
  data() {
    return {
      depParaVal: '',
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
        total: 0
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
        refBtn: false
      },
      // 基础信息
      basicParams: {
        declaration: {
          declarationOfficeId: '',// 进出境口岸海关代码
          declarationId: ''//货物运输批次号
        },
        borderTransportMeans: {
          typeCode: ''//运输方式代码
        },
        carrierIdentification: {
          manifestDeclarationId: '' // 承运人代码
        },
        agent: {
          agentId: ''//运输工具代理企业代码
        },
        loadingLocation: {
          // loadinglocationId:'', // 装货地代码
          loadingDateTime: '' // 货物装载时间
        },
        unloadingLocation: {
          unloadinglocationId: '', //卸货地代码
          arrivalDateTime: '' // 到达卸货地日期
        },
        representativePerson: {
          name: '' //舱单传输人名称
        },
        additionalInformation: {
          content: '' //备注
        }
      },
      // 提运单信息
      waybillList: [],
      waybill: {
        WrapType: '',//包装种类
        currencyType: '',//金额类型
        consigneeName: '',//收货人名称
        transportcontrantionId: '',//提（运）单号
        conditionCode: '',//运输条款
        paymentMethodCode: '',//运费支付方法
        currentCode: '',//海关货物通关代码
        transitdestinationId: '',//跨境指运地
        totalPackageQuantity: '',//货物总件数
        grossVolumeMeasure: '',//货物体积(M3)
        grossMassMeasure: '',//货物总毛重(KG)
        valueAmount: '',//货物价值
        deconsolidatorId: '',//拆箱人代码
        chgCodeAddBtn: [],//变更原因
        notifyInfo: [],//通知人信息
        undgInfo: [],//危险品联系人信息
        routingCountryCode: [],//途径国家或地区
        consignee: '',//收货人信息
        consignor: [],//发货人信息
        shopInfoList: [], // 商品项信息
        containerInfoList: [], // 集装箱信息
      },
      // 商品项信息
      shopInfoList: [],
      shopInfo: {
        sequenceNumeric: '', // 商品项序号
        quantityQuantity: '', //  商品项件数
        goodsMeasure: '', // 商品项毛重(KG)
        cargoDescription: '', // 商品项简要描述
        description: '', // 商品项描述补充信息
        classificationId: '', //  危险品编号
        HSCode:'', // 商品HS编码
        goodsPackTypeCode:'' // 包装种类
      },
      // 集装箱信息
      containerInfoList: [],
      containerInfo: {

        equipmentId: '', // 集装箱（器）编号
        characteristicCode: '', // 尺寸和类型
        supplierPartyTypeCode: '', // 来源代码
        fullnessCode: '' // 重箱或空箱标识
      },
      statusOptions: [],
      dateTimeVal: '',
      data: [],
      // 进出境口岸关区代码字典
      hg_customs_code: [],
      // 海关货物通关代码
      currentCode: [],
      // 包装种类
      PaymentMethodCode: [],
      // 途径国家
      routingContry: [],
      // 企业代码
      listInfo: [],
      // 当前操作提运单数据
      waybillIndex: -1,
      // 当前操作商品项数据
      shopInfoIndex: -1,
      // 当前操作集装箱数据
      containerInfoIndex: -1,
      // 已选择数据
      selectwaybill: [],
      selectshopInfo: [],
      selectcontainerInfo: []
    }
  },
  mounted() {
    // 初始化
    this.init()
  },
  watch: {
    'basicParams.voyageNo': {
      handler: function(newVal) {
        this.basicParams.voyageNo = newVal.toUpperCase()
      }
    }
  },
  methods: {
    async init() {
      // await this.depParaList()
      this.hgCustomsCode()
      //  企业代码
      listInfo().then(data => {
        this.listInfo = data.rows
        console.log(data)
      })
    },

    // 暂存
    handleSave() {
      console.log('保存')
      this.saveList()
    },
    // 申报
    handleReport() {
    },
    // 复制
    handleCopy() {
    },
    // 刷新
    handleRefresh() {
    },
    // 组件选择
    choose(row) {
      this.basicParams.postCode = row.codeName
      this.dialogTableVisible = false
    },
    // 关闭组件
    close() {
      this.dialogTableVisible = false
    },
    choose2(row) {
      this.basicParams.postCode = row.codeName
      this.dialogTableVisible2 = false
    },
    close2() {
      this.dialogTableVisible2 = false
    },
    handleSelectionChange() {
    },
    numFun() {
      console.log(123)
    },
    // 点击某一条提运单
    waybillClick(row, column, event) {
      console.log(row)
      this.waybillIndex = JSON.parse(JSON.stringify(row)).rowIndex
      // 切换商品项显示信息
      this.shopInfoList = this.waybillList[this.waybillIndex].shopInfoList
      // 切换集装箱显示信息
      this.containerInfoList = this.waybillList[this.waybillIndex].containerInfoList

      this.waybill = JSON.parse(JSON.stringify(row))
      // 通知人信息弹窗赋值
      this.$store.dispatch('originalManifest/noticeInfo', this.waybill.notifyInfo)
      this.$store.dispatch('originalManifest/changeReason', this.waybill.chgCodeAddBtn)
      this.$store.dispatch('originalManifest/dangerousInfo', this.waybill.undgInfo)
      this.$store.dispatch('originalManifest/consignorInfo', this.waybill.consignor)
      this.$store.dispatch('originalManifest/receivingInfo', this.waybill.consignee)
    },
    waybillSelectionChange(data) {
      console.log(data)
      this.selectwaybill = data
    },
    // 点击某一条商品项信息
    shopInfoClick(row, column, event) {
      console.log(row)
      this.shopInfoIndex = JSON.parse(JSON.stringify(row)).rowIndex
      this.shopInfo = JSON.parse(JSON.stringify(row))
    },
    shopInfoSelectionChange(data) {
      console.log(data)
      this.selectshopInfo = data
    },
    // 点击某一条集装箱信息
    containerInfoClick(row, column, event) {
      console.log(row)
      this.containerInfoIndex = JSON.parse(JSON.stringify(row)).rowIndex
      this.containerInfo = JSON.parse(JSON.stringify(row))

    },
    containerInfoSelectionChange(data) {
      console.log(data)
      this.selectcontainerInfo = data
    },
    // 表格删除
    handleDelete(e, name) {
      if (name === 'waybill') {
        this.waybillList = this.waybillList.filter(el => !this.selectwaybill.includes(el))
      }
      if (name === 'shopInfo') {
        this.shopInfoList = this.shopInfoList.filter(el => !this.selectshopInfo.includes(el))
        this.waybillList[this.waybillIndex].shopInfoList = this.shopInfoList
      }
      if (name === 'containerInfo') {
        this.containerInfoList = this.containerInfoList.filter(el => !this.selectcontainerInfo.includes(el))
        this.waybillList[this.waybillIndex].containerInfoList = this.containerInfoList
      }
      this.dataEmpty(name)
    },
    // 表格添加
    handleAdd(e, name) {
      if (name === 'waybill') {
        this.waybillList.push(this.waybill)
      }
      if (name === 'shopInfo') {

        if (this.waybillList.length <= 0) {
          console.log('请先保存提运单信息')
        } else {
          if (this.waybillIndex == -1) {
            this.waybillList[0].shopInfoList.push({ ...this.shopInfo })
            this.shopInfoList = this.waybillList[0].shopInfoList
          } else {
            this.waybillList[this.waybillIndex].shopInfoList.push({ ...this.shopInfo })
            this.shopInfoList = this.waybillList[this.waybillIndex].shopInfoList
          }
        }

      }
      if (name === 'containerInfo') {
        if (this.waybillList.length <= 0) {
          console.log('请先保存提运单信息')
        } else {
          if (this.waybillIndex == -1) {
            this.waybillList[0].containerInfoList.push({ ...this.containerInfo })
            this.containerInfoList = this.waybillList[0].containerInfoList
          } else {
            this.waybillList[this.waybillIndex].containerInfoList.push({ ...this.containerInfo })
            this.containerInfoList = this.waybillList[this.waybillIndex].containerInfoList
          }
        }
      }
      this.dataEmpty(name)
    },
    // 表格修改
    handleChange(e, name) {
      if (name === 'waybill') {
        if (this.waybillIndex === -1) return
        this.waybillList[this.waybillIndex] = JSON.parse(JSON.stringify(this.waybill))
        this.waybillList = JSON.parse(JSON.stringify(this.waybillList))
        this.waybillIndex = -1
      }
      if (name === 'shopInfo') {
        if (this.shopInfoIndex === -1) return
        this.shopInfoList[this.shopInfoIndex] = JSON.parse(JSON.stringify(this.shopInfo))
        this.shopInfoList = JSON.parse(JSON.stringify(this.shopInfoList))
        this.shopInfoIndex = -1
      }
      if (name === 'containerInfo') {
        if (this.containerInfoIndex === -1) return
        this.containerInfoList[this.containerInfoIndex] = JSON.parse(JSON.stringify(this.containerInfo))
        this.containerInfoList = JSON.parse(JSON.stringify(this.containerInfoList))
        this.containerInfoIndex = -1
      }
    },
    // 表格清空
    dataEmpty(name) {
      if (name === 'waybill') {
        // 保存成功后重置弹窗内数据
        this.$store.dispatch('originalManifest/noticeInfo', [])
        this.$store.dispatch('originalManifest/changeReason', { list: [] })
        this.$store.dispatch('originalManifest/dangerousInfo', [])
        this.$store.dispatch('originalManifest/consignorInfo', [])
        this.$store.dispatch('originalManifest/receivingInfo', { consigneeList: [], manifestContactList: [] })
        this.waybill = {
          WrapType: '',//包装种类
          currencyType: '',//金额类型
          chgCodeAddBtn: [],//变更原因
          notifyInfo: [],//通知人信息
          undgInfo: [],//危险品联系人信息

          transportcontrantionId: '',//提（运）单号
          conditionCode: '',//运输条款
          paymentMethodCode: '',//运费支付方法
          currentCode: '',//海关货物通关代码
          transitdestinationId: '',//跨境指运地
          totalPackageQuantity: '',//货物总件数
          grossVolumeMeasure: '',//货物体积(M3)
          grossMassMeasure: '',//货物总毛重(KG)
          valueAmount: '',//货物价值
          deconsolidatorId: '',//拆箱人代码
          routingCountryCode: [],//途径国家或地区
          consignee: '',//收货人信息
          consignor: [],//发货人信息
          shopInfoList: [], // 商品项信息
          containerInfoList:[], // 集装箱
        }
      }
      if (name === 'shopInfo') {
        this.shopInfo = {
          sequenceNumeric: '', // 商品项序号
          quantityQuantity: '', //  商品项件数
          goodsMeasure: '', // 商品项毛重(KG)
          cargoDescription: '', // 商品项简要描述
          description: '', // 商品项描述补充信息
          classificationId: '' //  危险品编号
        }
      }
      if (name === 'containerInfo') {
        this.containerInfo = {
          contaId: '',//集装箱（器）编号
          contaSizeType: '',//尺寸和类型
          contaSuppId: '',//来源代码
          contaLoadedType: ''//重箱或空箱标识
        }
      }
    },
    // 添加index
    tableRowClassName(data) {
      //把每一行的索引放进row
      data.row.rowIndex = data.rowIndex
    },
    // 请求接口
    depParaList() {
      return new Promise(resolve => {
        this.$store.dispatch('originalManifest/depParaList', { tableName: 'CUS_CUSTOMS', rowNum: 5000 }).then(data => {
          resolve(data)
        })
      })
    },
    // 字典数据
    hgCustomsCode() {
      /** 进出境口岸关区代码字典 */
      this.getDicts('hg_customs_code').then((response) => {
        this.hg_customs_code = response.data
      })
      /** 进出境口岸关区代码字典 */
      this.getDicts('sw_current_code').then((response) => {
        this.currentCode = response.data
      })
      /** 包装种类代码字典 */
      this.getDicts('sw_packag_type').then((response) => {
        this.PaymentMethodCode = response.data
      })
      /** 途经国家 */
      this.getDicts('sw_routing_contry').then((response) => {
        this.routingContry = response.data
      })
      /** 运费支付方法 */
      this.getDicts('sw_freight_payment_method').then((response) => {
        this.freightPaymentMethod = response.data
      })
      /** 金额类型 */
      this.getDicts('sw_currency_system').then((response) => {
        this.currencySystem = response.data
      })
      /** 运输条款 */
      this.getDicts('sw_shipping_terms').then((response) => {
        this.shippingTerms = response.data
      })
      /** 危险品编号 */
      this.getDicts('sw_dangerous_goods_number').then((response) => {
        this.dangerousGoodsNumber = response.data
      })
    },
    // 通知人信息关闭
    noticeInfoClose() {
      this.waybill.notifyInfo = this.$store.state.originalManifest.noticeInfo
      this.detailVisible = false
    },
    // 变更原因
    changeReasonClose() {
      this.waybill.chgCodeAddBtn = this.$store.state.originalManifest.changeReason
      this.changeReason = false
    },
    // 途径国家地区信息
    regionInfoClose() {
      this.waybill.routingCountryCode = this.$store.state.originalManifest.regionInfo
      this.regionInfo = false
    },
    // 危险品联系人信息
    dangerousInfoClose() {
      this.waybill.undgInfo = this.$store.state.originalManifest.dangerousInfo
      this.dangerousInfo = false
    },
    // 发货人信息
    consignorInfoClose() {
      this.waybill.consignor = this.$store.state.originalManifest.consignorInfo
      this.consignorInfo = false
    },
    // 收货人信息
    receivingInfoClose() {
      this.waybill.consignee = this.$store.state.originalManifest.receivingInfo
      this.waybill.consigneeName = this.$store.state.originalManifest.receivingInfo.name
      this.receivingInfo = false
    },
    // 获取货物运输批次号
    getVoyageNo() {
      this.$store.dispatch('originalManifest/getVoyageNo').then(data => {
        console.log(data)
        if (data.code === 200) {
          this.basicParams.voyageNo = data.msg
        }
      })
    },
    saveList() {
      const { basicParams, waybillList } = this
      // 隐藏企业代码数据
      basicParams.head = this.listInfo.find(el => el.deptId === basicParams.unitCode)
      basicParams.head.messageType="MT2401"
      basicParams.head.functionCode="9"
      const subData = {
        basicParams,
        waybillList,
      }

      this.$store.dispatch('originalManifest/saveList', subData).then(data => {
        console.log(data)
        if (data.code === 200) {

        }
      })
    }
  }

}
</script>

<style lang="scss" scope>
.right {
  text-align: right;
}

.datePicker {
  width: auto !important;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
