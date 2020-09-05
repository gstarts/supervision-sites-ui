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
        @click="headSave"
      >暂存</el-button>
        <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport" style="float:right">申报</el-button>
      <!-- <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
      <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>-->
    </div>
    <!-- 基本信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="head" ref="head" label-width="160px">
        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="12">
            <el-form-item label="申报地海关" prop="declCustom">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="head.declCustom"
                placeholder="请输入申报地海关"
                clearable
                size="mini"
              >
                <!-- <el-tooltip slot="append" class="item" effect="dark" content="系统分配批次号" placement="top-start">
                  <el-button  icon="el-icon-plus" @click="numFun"></el-button>
                </el-tooltip>-->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单据状态" prop="listStatName">
              <el-input
                @focus="$store.dispatch('originalManifest/changeStatus')"
                v-model="backfillForm.listStatName"
                placeholder="单据状态"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="12">
            <el-form-item label="中心统一编号" prop="billSeq">
              <el-input
                v-model="responseForm.billSeq"
                placeholder="中心统一编号"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="海关编号" prop="listNo">
              <el-input
                v-model="backfillForm.listNo"
                placeholder="海关编号"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="6" style="margin-right:-160px">
            <el-form-item label="申报单位" prop="agentCode">
              <el-input v-model="head.agentCode" placeholder="申报单位" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-right:160px">
            <el-form-item label prop="agentName">
              <el-input
                v-model="head.agentName"
                placeholder
                clearable
                size="mini"
                style="width:157%"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="货物装载时间" prop="postCode" >
              <el-date-picker
                class="datePicker"
                v-model="dateTimeVal"
                type="datetime"
                placeholder="选择日期时间" />
            </el-form-item>
          </el-col>-->
          <el-col :span="6">
            <el-form-item label="进口口岸" prop="iEPort">
              <el-select v-model="head.iEPort" placeholder="进口口岸" clearable size="mini">
                <el-option
                  v-for="dict in ImportPort"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进口日期" prop="iEDate">
              <el-date-picker
                class="datePicker"
                v-model="head.iEDate"
                type="datetime"
                size="mini"
                placeholder="进口日期"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="6" style="margin-right:-160px">
            <el-form-item label="经营单位" prop="tradeCode">
              <el-input v-model="head.tradeCode" placeholder="企业海关代码" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-right:160px">
            <el-form-item label prop="tradeName">
              <el-input
                v-model="backfillForm.tradeName"
                placeholder="企业海关名称"
                clearable
                size="mini"
                style="width:157%"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备案号" prop="recordsNo">
              <el-input v-model="head.recordsNo" placeholder="备案号" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申报日期" prop="declDate">
              <el-date-picker
                class="datePicker"
                v-model="backfillForm.declDate"
                type="datetime"
                size="mini"
                :disabled="true"
                placeholder="申报日期"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="6" style="margin-right:-160px">
            <el-form-item label="收发货单位" prop="ownerCode">
              <el-input v-model="head.ownerCode" placeholder="企业海关代码" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-right:160px">
            <el-form-item label prop="tradeName">
              <el-input
                v-model="backfillForm.tradeName"
                placeholder="企业海关名称"
                clearable
                size="mini"
                style="width:157%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输方式" prop="trafMode">
              <el-select v-model="head.trafMode" placeholder="运输方式" clearable size="mini">
                <el-option
                  v-for="dict in typeOfShipping"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输工具名称" prop="shipName">
              <el-input v-model="head.shipName" placeholder="运输工具名称" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="6">
            <el-form-item label="航次号" prop="voyageNo">
              <el-input v-model="head.voyageNo" placeholder="航次号" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提运单号" prop="billNo">
              <el-input v-model="head.billNo" placeholder="提运单号" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="贸易方式" prop="tradeMode">
              <el-input v-model="head.tradeMode" placeholder="贸易方式" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="许可证号" prop="licenseNo">
              <el-input v-model="head.licenseNo" placeholder="许可证号" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="6">
            <el-form-item label="集装箱数" prop="contaNum">
              <el-input
                v-model="backfillForm.contaNum"
                placeholder="集装箱数"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="起运国(地区)" prop="tradeCountry">
              <el-select v-model="head.tradeCountry" placeholder="起运国(地区)" clearable size="mini">
                <el-option
                  v-for="dict in CountryOfOrigin"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="装运港(地区)" prop="destinationPort">
              <el-select v-model="head.destinationPort" placeholder="装运港(地区)" clearable size="mini">
                <el-option
                  v-for="dict in LoadingPort"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="件数" prop="packNum">
              <el-input v-model="head.packNum" placeholder="件数" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="6">
            <el-form-item label="包装种类" prop="wrapType">
              <el-select v-model="head.wrapType" placeholder="包装种类" clearable size="mini">
                <el-option
                  v-for="dict in PackageType"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="毛重" prop="grossWt">
              <el-input v-model="head.grossWt" placeholder="毛重" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="净重" prop="netWt">
              <el-input v-model="head.netWt" placeholder="净重" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="随附单证" prop="docuCodeCom">
              <el-input
                v-model="backfillForm.docuCodeCom"
                placeholder="随附单证"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="备注" prop="notes">
              <el-input v-model="head.notes" placeholder="备注" clearable size="mini" />
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
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            :disabled="btnDisable.addBtn"
            @click="commodityAdd"
          >新增</el-button>
          <!-- <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="headSave">暂存</el-button> -->
          <!-- <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
          <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>-->
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="goodsList"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="index" prop="gNo" label="序号" width="55" align="center" />
        <el-table-column prop="itemNo" label="备案序号" min-width="120" />
        <el-table-column prop="codeTs" label="商品编号" min-width="120" />
        <el-table-column prop="gName" label="商品名称" min-width="120" />
        <el-table-column prop="gModel" label="规格型号" min-width="120" />
        <el-table-column prop="gQty" label="申报数量" min-width="120" />
        <el-table-column prop="gUnit" label="计量单位" min-width="120" :formatter="UnitOfMeasurementFormat"/>
        <el-table-column prop="originalalCountry" label="原产国(地区)/消费国(地区)" min-width="200" :formatter="CountryFormat" />
        <el-table-column prop="declPrice" label="单价" min-width="100" />
        <el-table-column prop="declTotal" label="总价" min-width="100" />
        <el-table-column prop="tradeCurr" label="币制" min-width="100" :formatter="CurrencySystemFormat"/>
        <el-table-column prop="dutyMode" label="征免方式" min-width="100" :formatter="ModeOfCollectionFormat" />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="commodityDelete(scope.$index,scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />-->
      <el-form :model="commodityForm" ref="commodityForm" label-width="160px">
        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="6">
            <el-form-item label="序号" prop="gNo">
              <el-input
                v-model="backfillForm.gNo"
                placeholder="序号"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备案序号" prop="itemNo">
              <el-input
                v-model="commodityForm.itemNo"
                placeholder="备案序号"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品编号" prop="codeTs">
              <el-input v-model="commodityForm.codeTs" placeholder="商品编号" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="12">
            <el-form-item label="商品名称" prop="gName">
              <el-input v-model="commodityForm.gName" placeholder="商品名称" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号" prop="gModel">
              <el-input v-model="commodityForm.gModel" placeholder="规格型号" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="6">
            <el-form-item label="申报数量" prop="gQty">
              <el-input v-model="commodityForm.gQty" placeholder="申报数量" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="计量单位" prop="gUnit">
              <el-select  v-model="commodityForm.gUnit" placeholder="计量单位" clearable size="mini" >
                <el-option
                  v-for="dict in UnitOfMeasurement"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法定单位" prop="unit1">
              <el-input
                v-model="commodityForm.unit1"
                placeholder="法定单位"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="第二单位" prop="unit2">
              <el-input
                v-model="commodityForm.unit2"
                placeholder="第二单位"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-bottom:-25px">
          <el-col :span="6">
            <el-form-item label="单价" prop="declPrice">
              <el-input v-model="commodityForm.declPrice" placeholder="单价" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总价" prop="declTotal">
              <el-input v-model="commodityForm.declTotal" placeholder="总价" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="币制" prop="tradeCurr">
              <el-select  v-model="commodityForm.tradeCurr" placeholder="币制" clearable size="mini">
                <el-option
                  v-for="dict in CurrencySystem"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="原产国(地区)" prop="originalalCountry">
              <el-select  v-model="commodityForm.originalalCountry" placeholder="原产国(地区)" clearable size="mini">
                <el-option
                  v-for="dict in Country"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="征免方式" prop="dutyMode">
              <el-select v-model="commodityForm.dutyMode" placeholder="征免方式" clearable size="mini">
                <el-option
                  v-for="dict in ModeOfCollection"
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
          <!-- <el-button type="success" icon="el-icon-edit" size="mini" :disabled="btnDisable.saveBtn" @click="headSave">暂存</el-button> -->
          <!-- <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport">申报</el-button>
          <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>-->
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="contas"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="contaId" label="集装箱号" min-width="120" />
        <el-table-column prop="contaType" label="集装箱规格" min-width="150" :formatter="ContainerSpecificationsFormat" />
        <el-table-column prop="contaWt" label="集装箱自重" min-width="120" />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="containerDelete(scope.$index,scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />-->
      <el-form :model="containerForm" ref="containerForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="集装箱号" prop="contaId">
              <el-input v-model="containerForm.contaId" placeholder="集装箱号" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="集装箱规格" prop="contaType">
              <el-select  v-model="containerForm.contaType" placeholder="集装箱规格" clearable size="mini">
                <el-option
                  v-for="dict in ContainerSpecifications"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="集装箱自重" prop="contaWt">
              <el-input v-model="containerForm.contaWt" placeholder="集装箱自重" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 单证信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>单证信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            :disabled="btnDisable.addBtn"
            @click="documentsAdd"
          >新增</el-button>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="docs"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="docCode" label="随附单证代码" :formatter="DocumentCodeFormat"/>
        <el-table-column prop="certNo" label="随附单证编号" />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="documentsDelete(scope.$index,scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />-->
      <el-form :model="documentsForm" ref="documentsForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="随附单证代码" prop="docCode">
              <el-select  v-model="documentsForm.docCode" placeholder="随附单证代码" clearable size="mini">
                <el-option
                  v-for="dict in DocumentCode"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随附单证编号" prop="certNo">
              <el-input v-model="documentsForm.certNo" placeholder="随附单证编号" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <depParaList :tableVisible="dialogTableVisible" @choose="choose" @close="close"></depParaList>
    <depParaList2 :tableVisible="dialogTableVisible2" @choose="choose2" @close="close2"></depParaList2>
  </div>
</template>

<script>
import depParaList from "./../components/depParaList";
import depParaList2 from "./../components/depParaList2";
import { add } from "@/api/collectedNews/head";
export default {
  components: { depParaList, depParaList2,add },
  data() {
    return {
      detailVisible: false,
      gridData: [],
      // page: {
      //   num: 1,
      //   size: 10,
      //   total: 0,
      // },
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
      form: {
        // 表头对象
        head: {},
        // 商品项对象
        goodsList: [],
        // 集装箱对象
        contas: [],
        // 单证对象
        docs: [],
      },
      // 表单参数
      head: {
        declCustom: undefined,
        agentCode: undefined,
        agentName: undefined,
        iEPort: undefined,
        iEDate: undefined,
        tradeCode: undefined,
        recordsNo: undefined,
        ownerCode: undefined,
        trafMode: undefined,
        shipName: undefined,
        voyageNo: undefined,
        billNo: undefined,
        tradeMode: undefined,
        licenseNo: undefined,
        tradeCountry: undefined,
        destinationPort: undefined,
        packNum: undefined,
        wrapType: undefined,
        grossWt: undefined,
        netWt: undefined,
        notes: undefined,
      },
      // response表单
      responseForm: {
        billSeq: undefined,
      },
      // 回填表单
      backfillForm: {
        listStatName: undefined,
        listNo: undefined,
        tradeName: undefined,
        declDate: undefined,
        contaNum: undefined,
        docuCodeCom: undefined,
        // 商品项序号
        gNo: undefined,
      },
      // 商品表单参数
      commodityForm: {
        itemNo: undefined,
        codeTs: undefined,
        gName: undefined,
        gModel: undefined,
        gQty: undefined,
        gUnit: undefined,
        unit1: undefined,
        unit2: undefined,
        declPrice: undefined,
        declTotal: undefined,
        tradeCurr: undefined,
        originalalCountry: undefined,
        dutyMode: undefined,
      },
      // 集装箱表单参数
      containerForm: {
        contaId: undefined,
        contaType: undefined,
        contaWt: undefined,
      },
      // 单证参数
      documentsForm: {
        docCode: undefined,
        certNo: undefined,
      },
      // 商品List
      goodsList: [],
      // 集装箱List
      contas: [],
      // 单证List
      docs: [],
      statusOptions: [],
      dateTimeVal: "",
      data: [],
      // 包装种类字典
      PackageType: [],
      // 起运国字典
      CountryOfOrigin: [],
      // 进口口岸字典
      ImportPort: [],
      // 运输方式字典
      typeOfShipping: [],
      // 装运港字典
      LoadingPort: [],
      // 集装箱规格字典
      ContainerSpecifications: [],
      // 随附单证代码字典
      DocumentCode: [],
      // 币制字典
      CurrencySystem: [],
      // 原产国字典
      Country: [],
      // 征免方式字典
      ModeOfCollection: [],
      // 计量单位字典
      UnitOfMeasurement: [],
    };
  },
  created() {
    /** 征免方式字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.UnitOfMeasurement = response.data;
    });
    /** 征免方式字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.ModeOfCollection = response.data;
    });
    /** 原产国字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.Country = response.data;
    });
    /** 币制字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.CurrencySystem = response.data;
    });
    /** 随附单证代码字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.DocumentCode = response.data;
    });
    /** 集装箱规格字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.ContainerSpecifications = response.data;
    });
    /** 装运港字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.LoadingPort = response.data;
    });
    /** 运输方式字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.typeOfShipping = response.data;
    });
    /** 进口口岸字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.ImportPort = response.data;
    });
    /** 包装种类字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.PackageType = response.data;
    });
    /** 起运国字典 */
    this.getDicts("PaymentMethodCode").then((response) => {
      this.CountryOfOrigin = response.data;
    });
  },

  mounted() {
    // 初始化
    this.init();
  },
  methods: {
    async init() {
      // await this.depParaList()
    },

    // 整体刷新
    handleAdd() {
      this.reset();
    },
    // 商品项新增
    commodityAdd: function () {
      this.goodsList.push(this.commodityForm);
      this.commodityReset();
    },
    // 集装箱新增
    containerAdd: function () {
      this.contas.push(this.containerForm);
      this.backfillForm.contaNum = this.contas.length;
      this.containerReset();
    },
    // 单证新增
    documentsAdd: function () {
      this.docs.push(this.documentsForm);
      this.backfillForm.docuCodeCom = this.docs.length;
      this.documentsReset();
    },
    // 整体暂存(新增)
    headSave: function () {
      this.form.head = this.head;
      this.form.goodsList = this.goodsList;
      this.form.contas = this.contas;
      this.form.docs = this.docs;      
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

    /** 删除商品项列表按钮操作 */
    commodityDelete(index, row) {
      this.goodsList.splice(index, 1);
    },
    /** 删除集装箱列表按钮操作 */
    containerDelete(index, row) {
      this.contas.splice(index, 1);
    },
    /** 删除单证列表按钮操作 */
    documentsDelete(index, row) {
      this.docs.splice(index, 1);
    },
    // 表单重置
    reset() {
      this.head = {};
      this.commodityForm = {};
      this.containerForm = {};
      this.documentsForm = {};
      this.backfillForm = {};
      this.goodsList = [];
      this.contas = [];
      this.docs = [];
    },
    // 商品项表单重置
    commodityReset() {
      this.commodityForm = {};
    },
    // 集装箱表单重置
    containerReset() {
      this.containerForm = {};
    },
    // 单证表单重置
    documentsReset() {
      this.documentsForm = {};
    },
    // 集装箱规格 翻译
    ContainerSpecificationsFormat(row, column) {
      return this.selectDictLabel(this.ContainerSpecifications, row.contaType);
    },
    // 随附单证代码 翻译
    DocumentCodeFormat(row, column) {
      return this.selectDictLabel(this.DocumentCode, row.docCode);
    },
    // 币制 翻译
    CurrencySystemFormat(row, column) {
      return this.selectDictLabel(this.CurrencySystem, row.tradeCurr);
    },
    // 原产国 翻译
    CountryFormat(row, column) {
      return this.selectDictLabel(this.Country, row.originalalCountry);
    },
    // 征免方式 翻译
    ModeOfCollectionFormat(row, column) {
      return this.selectDictLabel(this.ModeOfCollection, row.dutyMode);
    },
    // 计量单位 翻译
    UnitOfMeasurementFormat(row, column) {
      return this.selectDictLabel(this.UnitOfMeasurement, row.gUnit);
    },
    // 申报
    handleReport() {},
    // 复制
    handleCopy() {},
    // 刷新
    handleRefresh() {},
    // // 翻页
    // currentChange(page) {
    //   // console.log(page);
    // },
    // 组件选择
    choose(row) {
      this.queryParams.postCode = row.codeName;
      this.head.declCustom = row.codeName;
      this.dialogTableVisible = false;
    },
    // 关闭组件
    close() {
      this.dialogTableVisible = false;
    },
    choose2(row) {
      this.queryParams.postCode = row.codeName;
      this.dialogTableVisible2 = false;
    },
    close2() {
      this.dialogTableVisible2 = false;
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