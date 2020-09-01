<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        :disabled="btnDisable.addBtn"
        @click="SingleAll"
      >新增</el-button>
      <!-- <el-button
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
      >复制</el-button>-->
      <el-button
        type="primary"
        icon="el-icon-refresh"
        size="mini"
        :disabled="btnDisable.refBtn"
        @click="handleRefresh"
      >刷新</el-button>
      <el-button type="danger" size="mini" icon="el-icon-thumb" style="float:right" disabled>申报</el-button>
    </div>
    <!-- 基本信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="dechead" ref="dechead" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="申报地海关" prop="custoMmaster">
              <el-select v-model="dechead.custoMmaster" clearable placeholder="请选择申报地海关">
                <el-option
                  v-for="item in customsOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申报状态" prop="postCode">
              <el-input :disabled="true" placeholder="系统反填" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="统一编号" prop="seqNo">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="dechead.seqNo"
                placeholder="请输入统一编号"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预录入编号" prop="preEntryId">
              <el-input
                v-model="dechead.preEntryId"
                placeholder="请输入预录入编号"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="海关编号" prop="entryId">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="dechead.entryId"
                placeholder="请输入海关编号"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label="进境关别" prop="iePort">
              <el-input v-model="dechead.iePort" placeholder="请输入进境关别" />
            </el-form-item>-->
            <el-form-item label="进境关别" prop="iePort">
              <el-select v-model="dechead.iePort" clearable placeholder="请选择进境关别">
                <el-option
                  v-for="item in customsOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="备案号" prop="manualno">
              <el-input v-model="dechead.manualno" placeholder="请输入备案号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同协议号" prop="contrNo">
              <el-input v-model="dechead.contrNo" placeholder="请输入合同协议号" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="进口日期" prop="ieDate">
              <el-input v-model="dechead.ieDate" placeholder="请输入进口日期" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申报日期" prop="postCode">
              <el-input :disabled="true" placeholder="系统反填" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <el-form-item label="境内收发货人" prop="tradeCoScc">
              <el-input v-model="dechead.tradeCoScc" placeholder="18位社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="tradeCode" style="margin-left:-120px">
              <el-input v-model="dechead.tradeCode" placeholder="10位海关代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="tradeCiqCode" style="margin-left:-120px">
              <el-input v-model="dechead.tradeCiqCode" placeholder="10位检验检疫编码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="domesticConsigneeEname" style="margin-left:-120px">
              <el-input v-model="dechead.domesticConsigneeEname" placeholder="企业名称(中文)" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="15">
            <el-form-item label="境外收发货人" prop="overseasConsignorCode">
              <el-input v-model="dechead.overseasConsignorCode" placeholder="境外收发货人代码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="overseasConsignorEname" style="margin-left:-120px">
              <el-input v-model="dechead.overseasConsignorEname" placeholder="企业名称(外文)" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <el-form-item label="消费使用单位" prop="ownerCodeScc">
              <el-input v-model="dechead.ownerCodeScc" placeholder="18位社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="ownerCode" style="margin-left:-120px">
              <el-input v-model="dechead.ownerCode" placeholder="10位海关代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="ownerCiqCode" style="margin-left:-120px">
              <el-input v-model="dechead.ownerCiqCode" placeholder="10位检验检疫编码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="ownerName" style="margin-left:-120px">
              <el-input v-model="dechead.ownerName" placeholder="企业名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <el-form-item label="申报单位" prop="agentCodeScc">
              <el-input v-model="dechead.agentCodeScc" placeholder="18位社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="agentCode" style="margin-left:-120px">
              <el-input v-model="dechead.agentCode" placeholder="10位海关代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="declCiqCode" style="margin-left:-120px">
              <el-input v-model="dechead.declCiqCode" placeholder="10位检验检疫编码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="agentName" style="margin-left:-120px">
              <el-input v-model="dechead.agentName" placeholder="企业名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="6">
            <!-- <el-form-item label="运输方式" prop="trafMode">
              <el-input v-model="dechead.trafMode" placeholder="请输入运输方式" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="运输方式" prop="trafMode">
              <el-select v-model="dechead.trafMode" clearable placeholder="请选择运输方式">
                <el-option
                  v-for="item in transportOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输工具名称" prop="trafName">
              <el-input v-model="dechead.trafName" placeholder="运输工具名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="航次号" prop="decfreetxt.voyNo">
              <el-input v-model="decfreetxt.voyNo" placeholder="请输入航次号" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="提运单号" prop="billNo">
              <el-input v-model="dechead.billNo" placeholder="请输入提运单号" clearable size="small" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="2">
            <el-button icon="el-icon-more-outline" size="medium"></el-button>
          </el-col>-->
          <el-col :span="6">
            <!-- <el-form-item label="监管方式" prop="tradeMode">
              <el-input v-model="dechead.tradeMode" placeholder="请输入监管方式" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="监管方式" prop="tradeMode">
              <el-select v-model="dechead.tradeMode" clearable placeholder="请选择监管方式">
                <el-option
                  v-for="item in regulateOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="征免性质" prop="cutMode">
              <el-input v-model="dechead.cutMode" placeholder="征免性质" />
            </el-form-item>-->
            <el-form-item label="征免性质" prop="cutMode">
              <el-select v-model="dechead.cutMode" clearable placeholder="请选择征免性质">
                <el-option
                  v-for="item in exemptionOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="许可证编号" prop="licenseNo">
              <el-input v-model="dechead.licenseNo" placeholder="请输入许可证编号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="启运国(地区)" prop="tradeCountry">
              <el-input v-model="dechead.tradeCountry" placeholder="启运国(地区)" />
            </el-form-item>-->
            <el-form-item label="启运国(地区)" prop="tradeCountry">
              <el-select v-model="dechead.tradeCountry" clearable placeholder="请选择启运国(地区)">
                <el-option
                  v-for="item in areaCodesOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="经停港" prop="distinatePort">
              <el-input v-model="dechead.distinatePort" placeholder="请输入经停港" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="经停港" prop="distinatePort">
              <el-select v-model="dechead.distinatePort" clearable placeholder="请选择经停港">
                <el-option
                  v-for="item in ofStopOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="成交方式" prop="transMode">
              <el-input v-model="dechead.transMode" placeholder="成交方式" />
            </el-form-item>-->
            <el-form-item label="成交方式" prop="transMode">
              <el-select v-model="dechead.transMode" clearable placeholder="请选择成交方式">
                <el-option
                  v-for="item in methodOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="4">
            <!-- <el-form-item label="运费标记" prop="feeMark">
              <el-input v-model="dechead.feeMark" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="运费标记" prop="feeMark">
              <el-select v-model="dechead.feeMark" clearable placeholder>
                <el-option
                  v-for="item in rateOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="feeRate" style="margin-left:-120px">
              <el-input v-model="dechead.feeRate" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <!-- <el-form-item prop="feeCurr" style="margin-left:-120px">
              <el-input v-model="dechead.feeCurr" clearable size="small" />
            </el-form-item>-->
            <el-form-item label prop="feeCurr" style="margin-left:-120px">
              <el-select v-model="dechead.feeCurr" clearable placeholder>
                <el-option
                  v-for="item in currencySystemOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <!-- <el-form-item label="保险费标记" prop="insurMark">
              <el-input v-model="dechead.insurMark" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="保险费标记" prop="insurMark">
              <el-select v-model="dechead.insurMark" clearable placeholder>
                <el-option
                  v-for="item in rateOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="insurRate" style="margin-left:-120px">
              <el-input v-model="dechead.insurRate" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <!-- <el-form-item prop="insurCurr" style="margin-left:-120px">
              <el-input v-model="dechead.insurCurr" clearable size="small" />
            </el-form-item>-->
            <el-form-item label prop="insurCurr" style="margin-left:-120px">
              <el-select v-model="dechead.insurCurr" clearable placeholder>
                <el-option
                  v-for="item in currencySystemOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="4">
            <!-- <el-form-item label="杂费标记" prop="otherMark">
              <el-input v-model="dechead.otherMark" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="杂费标记" prop="otherMark">
              <el-select v-model="dechead.otherMark" clearable placeholder>
                <el-option
                  v-for="item in rateOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="otherRate" style="margin-left:-120px">
              <el-input v-model="dechead.otherRate" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <!-- <el-form-item prop="otherCurr" style="margin-left:-120px">
              <el-input v-model="dechead.otherCurr" clearable size="small" />
            </el-form-item>-->
            <el-form-item label prop="otherCurr" style="margin-left:-120px">
              <el-select v-model="dechead.otherCurr" clearable placeholder>
                <el-option
                  v-for="item in currencySystemOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="packNo" label="件数">
              <el-input v-model="dechead.packNo" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <!-- <el-form-item prop="wrapType" label="包装种类">
              <el-input v-model="dechead.wrapType" />
            </el-form-item>-->
            <el-form-item label="包装种类" prop="wrapType">
              <el-select v-model="dechead.wrapType" clearable placeholder="请选择包装种类">
                <el-option
                  v-for="item in PaymentMethodCodeOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="毛重(KG)" prop="grossWet">
              <el-input v-model="dechead.grossWet" placeholder="请输入毛重(KG)" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="净重(KG)" prop="netWt">
              <el-input v-model="dechead.netWt" placeholder="净重(KG)" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="6">
            <!-- <el-form-item label="贸易国别(地区)" prop="tradeAreaCode">
              <el-input
                v-model="dechead.tradeAreaCode"
                placeholder="请输入贸易国别(地区)"
                clearable
                size="small"
              />
            </el-form-item>-->
            <el-form-item label="贸易国别(地区)" prop="tradeAreaCode">
              <el-select v-model="dechead.tradeAreaCode" clearable placeholder="请选择贸易国别(地区)">
                <el-option
                  v-for="item in areaCodesOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集装箱数" prop="postCode">
              <el-input v-model="dechead.postCode" placeholder="集装箱数" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随附单证" prop="postCode">
              <el-input v-model="dechead.postCode" placeholder="随附单证" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="6">
            <!-- <el-form-item label="入境口岸" prop="entyPortCode">
              <el-input v-model="dechead.entyPortCode" placeholder="入境口岸" />
            </el-form-item>-->
            <el-form-item label="入境口岸" prop="entyPortCode">
              <el-select v-model="dechead.entyPortCode" clearable placeholder="请选择入境口岸">
                <el-option
                  v-for="item in codeOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物存放地点" prop="goodsPlace">
              <el-input v-model="dechead.goodsPlace" placeholder="货物存放地点" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="启运港" prop="desPportCode">
              <el-input v-model="dechead.desPportCode" placeholder="启运港" />
            </el-form-item>-->
            <el-form-item label="启运港" prop="desPportCode">
              <el-select v-model="dechead.desPportCode" clearable placeholder="请选择启运港">
                <el-option
                  v-for="item in ofStopOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex">
          <el-col :span="7">
            <!-- <el-form-item label="报关单类型" prop="entryType">
              <el-input v-model="dechead.entryType" placeholder="报关单类型" />
            </el-form-item>-->
            <el-form-item label="报关单类型" prop="entryType">
              <el-select v-model="dechead.entryType" clearable placeholder="请选择报关单类型">
                <el-option
                  v-for="item in declarationTypeOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="19" style="margin-left:40px">
            <el-form-item label="备注" prop="noteS">
              <el-input v-model="dechead.noteS" placeholder="备注" />
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left:0px">
            <el-button type="primary" size="medium" @click="matter">其 他 事 项 确 认</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="2">
            <el-button type="info" icon="el-icon-sort" @click="hide" circle></el-button>
          </el-col>
          <el-col :span="8" style="margin-left:-50px">
            <el-form-item label="标记唛码" prop="markNo">
              <el-input v-model="dechead.markNo" placeholder="标记唛码" />
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-left:-50px">
            <el-form-item label="业务事项">
              <el-select v-model="commodityForm.goodsAttr" multiple placeholder="请选择">
                <el-option
                  v-for="item in businessMattersOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :style="{display:bodyHide}">
          <el-col :span="12">
            <!-- <el-form-item label="检验检疫受理机关" prop="orgCode">
              <el-input v-model="dechead.orgCode" placeholder="检验检疫受理机关" />
            </el-form-item>-->
            <el-form-item label="检验检疫受理机关" prop="orgCode">
              <el-select v-model="dechead.orgCode" clearable placeholder="请选择检验检疫受理机关">
                <el-option
                  v-for="item in TestOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="企业资质" prop="CopCode">
              <el-input v-model="dechead.CopCode" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:-150px">
            <el-form-item prop="CopName">
              <el-input v-model="dechead.CopName" :disabled="true" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="3" style="margin-left:10px">
            <el-button icon="el-icon-arrow-left" type="info" @click="left" circle></el-button>
          </el-col>
          <el-col :span="3" style="margin-left:-160px">
            <el-button icon="el-icon-arrow-right" type="info" @click="right" circle></el-button>
          </el-col>-->
          <el-col :span="3" style="margin-left:-160px">
            <el-button icon="el-icon-more-outline" type="info" @click="CopList" circle></el-button>
          </el-col>
        </el-row>

        <el-row type="flex" :style="{display:bodyHide}">
          <el-col :span="6">
            <!-- <el-form-item label="领证机关" prop="vsaOrgCode">
              <el-input v-model="dechead.vsaOrgCode" placeholder="请输入领证机关" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="领证机关" prop="vsaOrgCode">
              <el-select v-model="dechead.vsaOrgCode" clearable placeholder="请选择领证机关">
                <el-option
                  v-for="item in TestOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="口岸检验检疫机关" prop="inspOrgCode">
              <el-input v-model="dechead.inspOrgCode" placeholder="口岸检验检疫机关" />
            </el-form-item>-->
            <el-form-item label="口岸检验检疫机关" prop="inspOrgCode">
              <el-select v-model="dechead.inspOrgCode" clearable placeholder="请选择口岸检验检疫机关">
                <el-option
                  v-for="item in TestOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="启运日期" prop="despDate">
              <el-date-picker
                width="100%"
                class="datePicker"
                v-model="dechead.despDate"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="B/L号" prop="blNo">
              <el-input v-model="dechead.blNo" placeholder="B/L号" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :style="{display:bodyHide}">
          <el-col :span="12">
            <!-- <el-form-item label="目的地检验检疫机关" prop="purpOrgCode">
              <el-input v-model="dechead.purpOrgCode" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="目的地检验检疫机关" prop="purpOrgCode">
              <el-select v-model="dechead.purpOrgCode" clearable placeholder="请选择目的地检验检疫机关">
                <el-option
                  v-for="item in TestOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13" style="margin-left:20px">
            <el-form-item label="关联号码及理由" prop="correlationNo">
              <el-input v-model="dechead.correlationNo" placeholder="关联号码及理由" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-left:-140px">
            <!-- <el-form-item label prop="correlationReasonFlag">
              <el-input v-model="dechead.correlationReasonFlag" placeholder="关联理由" />
            </el-form-item>-->
            <el-form-item label prop="correlationReasonFlag">
              <el-select v-model="dechead.correlationReasonFlag" clearable placeholder="关联理由">
                <el-option
                  v-for="item in TestOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:50px">
            <el-button type="primary" size="medium" @click="user">使 用 人</el-button>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10" :style="{display:bodyHide}">
          <el-col :span="12">
            <!-- <el-form-item label="原箱运输" prop="origBoxFlag">
              <el-input v-model="dechead.origBoxFlag" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="原箱运输" prop="origBoxFlag">
              <el-select v-model="dechead.origBoxFlag" clearable placeholder="请选择原箱运输">
                <el-option
                  v-for="item in TestOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-left:0px">
            <!-- <el-form-item label="特种业务标识" prop="specDeclFlag">
              <el-input v-model="dechead.specDeclFlag" placeholder="特种业务标识" />
            </el-form-item>-->
            <el-form-item label="特种业务标识" prop="specDeclFlag">
              <el-select v-model="dechead.specDeclFlag" multiple placeholder="请选择特种业务标识">
                <el-option
                  v-for="item in TestOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-left:-90px">
            <el-form-item label="所属单证" prop="postCode">
              <el-input v-model="dechead.postCode" placeholder="所属单证" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:0px">
            <el-button type="primary" size="medium">检 验 检 疫 签 证 申 报 要 素</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>进口/出口报关单表体</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            :disabled="btnDisable.addBtn"
            @click="CommodityItemAdd"
          >新增</el-button>
          <!-- <el-button
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
            @click="CommodityItemdelete"
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
          >复制</el-button>-->
          <el-button
            type="primary"
            icon="el-icon-refresh"
            size="mini"
            :disabled="btnDisable.refBtn"
            @click="CommodityItemRefresh"
          >刷新</el-button>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="declist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column prop="gNo" label="项号" min-width="120" />
        <el-table-column label="序号" align="center" type="index" />
        <el-table-column prop="contrItem" label="备案序号" min-width="120" />
        <el-table-column prop="codeTs" label="商品编号" min-width="150" />
        <el-table-column prop="ciqName" label="检验检疫名称" min-width="120" />
        <el-table-column prop="gName" label="商品名称" min-width="120" />
        <el-table-column prop="gModel" label="商品规格、型号" min-width="120" />
        <el-table-column prop="gQty" label="成交数量" min-width="120" />
        <el-table-column prop="gUnit" label="成交单位" min-width="120"   />
        <el-table-column prop="declPrice" label="成交单价" min-width="150" />
        <el-table-column prop="declTotal" label="成交总价" min-width="120" />
        <el-table-column prop="tradeCurr" label="成交币制" min-width="120" :formatter="transactionUnitformat"/>
        <el-table-column prop="originCountry" label="原产国(地区)" min-width="120" :formatter="originCountryformat"/>
        <el-table-column prop="destinationCountry" label="最终目的国" min-width="120" :formatter="areaCodesOptionsformat"/>
        <el-table-column prop="dutyMode" label="征免方式" min-width="120"  :formatter="dutyModeformat"/>
        <el-table-column prop="goodsSpec" label="检验检疫货物规格" min-width="120" />
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
      <el-pagination
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="commodityForm" ref="commodityForm" label-width="160px">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="项号" prop="gNo">
              <el-input
                v-model="commodityForm.gNo"
                placeholder="项号"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="备案序号" prop="contrItem">
              <el-input
                v-model="commodityForm.contrItem"
                placeholder="备案序号"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商品编号" prop="codeTs">
              <el-input v-model="commodityForm.codeTs" placeholder="商品编号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检验检疫名称" prop="ciqName">
              <el-input
                v-model="commodityForm.ciqName"
                placeholder="检验检疫名称"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-more-outline" type="info" circle></el-button>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="商品名称" prop="gName">
              <el-input v-model="commodityForm.gName" placeholder clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品规格、型号" prop="gModel">
              <el-input
                v-model="commodityForm.gModel"
                placeholder="商品规格、型号"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10">
          <el-col :span="5">
            <el-form-item label="成交数量" prop="gQty">
              <el-input v-model="commodityForm.gQty" placeholder="成交数量" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <!-- <el-form-item label="成交计量单位" prop="gUnit">
              <el-input v-model="commodityForm.gUnit" placeholder="成交计量单位" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="成交计量单位" prop="gUnit">
              <el-select v-model="commodityForm.gUnit" clearable placeholder="请选择">
                <el-option
                  v-for="item in transactionUnitOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="成交单价" prop="declPrice">
              <el-input
                v-model="commodityForm.declPrice"
                placeholder="成交单价"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left:-90px">
            <el-form-item label="成交总价" prop="declTotal">
              <el-input
                v-model="commodityForm.declTotal"
                placeholder="成交总价"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:-40px">
            <!-- <el-form-item label="成交币制" prop="tradeCurr">
              <el-input
                v-model="commodityForm.tradeCurr"
                placeholder="成交币制"
                clearable
                size="small"
              />
            </el-form-item>-->
            <el-form-item label="成交币制" prop="tradeCurr">
              <el-select v-model="commodityForm.tradeCurr" clearable placeholder="请选择">
                <el-option
                  v-for="item in currencySystemOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10">
          <el-col :span="5">
            <el-form-item label="法定第一数量" prop="firstQty">
              <el-input
                v-model="commodityForm.firstQty"
                placeholder="法定第一数量"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="法定第一计量单位" prop="firstUnit">
              <el-input
                v-model="commodityForm.firstUnit"
                placeholder="法定第一计量单位"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="加工成品单耗版本号" prop="exgVersion">
              <el-input
                v-model="commodityForm.exgVersion"
                placeholder="加工成品单耗版本号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left:-90px">
            <el-form-item label="货号" prop="exgNo">
              <el-input v-model="commodityForm.exgNo" placeholder="货号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:-40px">
            <el-form-item label="最终目的国(地区)" prop="transMode">
              <el-select v-model="commodityForm.destinationCountry" clearable placeholder="最终目的国(地区)">
                <el-option
                  v-for="item in areaCodesOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10">
          <el-col :span="5">
            <el-form-item label="法定第二数量" prop="secondQty">
              <el-input
                v-model="commodityForm.secondQty"
                placeholder="法定第二数量"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="法定第二计量单位" prop="secondUnit">
              <el-input
                v-model="commodityForm.secondUnit"
                placeholder="法定第二计量单位"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <!-- <el-form-item label="原产国(地区)" prop="originCountry">
              <el-input
                v-model="commodityForm.originCountry"
                placeholder="原产国(地区)"
                clearable
                size="small"
              />
            </el-form-item>-->
            <el-form-item label="原产国(地区)" prop="originCountry">
              <el-select v-model="commodityForm.originCountry" clearable placeholder="请选择原产国(地区)">
                <el-option
                  v-for="item in areaCodesOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:-60px">
            <!-- <el-form-item label="原产地区" prop="origPlaceCode">
              <el-input
                v-model="commodityForm.origPlaceCode"
                placeholder="原产地区"
                clearable
                size="small"
              />
            </el-form-item>-->
            <el-form-item label="原产地区" prop="origPlaceCode">
              <el-select v-model="commodityForm.origPlaceCode" clearable placeholder="请选择">
                <el-option
                  v-for="item in originOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="1" style="margin-left:230px">
            <el-button type="info" icon="el-icon-sort" @click="List1" circle></el-button>
          </el-col>
          <el-col :span="8" style="margin-left:40px">
            <el-form-item label="境内目的地" prop="districtCode">
              <el-input
                v-model="commodityForm.districtCode"
                placeholder="境内目的地代码"
                clearable
                size="small"
              />
            </el-form-item>
            <!-- <el-form-item label="境内目的地" prop="districtCode">
              <el-select v-model="dechead.districtCode" clearable placeholder="请选择境内目的地">
                <el-option
                  v-for="item in TestOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item> -->
          </el-col>
          <el-col :span="8" style="margin-left:-160px">
            <el-form-item label prop="destCode">
              <el-input
                v-model="commodityForm.destCode"
                placeholder="目的地代码"
                clearable
                size="small"
              />
            </el-form-item>
            <!-- <el-form-item label prop="destCode">
              <el-select v-model="dechead.destCode" clearable placeholder="目的地代码">
                <el-option
                  v-for="item in TestOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item> -->
          </el-col>
          <el-col :span="4" style="margin-left:-30px">
            <!-- <el-form-item label="征免方式" prop="dutyMode">
              <el-input v-model="commodityForm.dutyMode" placeholder="征免方式" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="征免方式" prop="dutyMode">
              <el-select v-model="commodityForm.dutyMode" clearable placeholder="请选择">
                <el-option
                  v-for="item in exemptionMethodOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10" :style="{display:List1Hide}">
          <el-col :span="18">
            <el-form-item label="检验检疫货物规格" prop="goodsSpec">
              <el-input
                v-model="commodityForm.goodsSpec"
                placeholder="检验检疫货物规格"
                clearable
                size="small"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button icon="el-icon-more-outline" type="info" @click="specification" circle></el-button>
          </el-col>
          <el-col :span="4" style="margin-left:100px">
            <el-button type="primary" size="medium">产 品 资 质</el-button>
          </el-col>
        </el-row>

        <el-row type="flex" :style="{display:List1Hide}">
          <el-col :span="9">
            <el-form-item label="货物属性">
              <el-select v-model="commodityForm.goodsAttr" multiple placeholder="请选择">
                <el-option
                  v-for="item in TestOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1">
            <el-button icon="el-icon-more-outline" type="info" circle></el-button>
          </el-col>-->
          <el-col :span="9">
            <el-form-item label="用途" prop="useTo">
              <el-input v-model="commodityForm.useTo" placeholder="用途" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:135px">
            <el-button type="primary" size="medium">危 险 货 物 信 息</el-button>
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
          <!-- <el-button
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
          >复制</el-button>-->
          <el-button
            type="primary"
            icon="el-icon-refresh"
            size="mini"
            :disabled="btnDisable.refBtn"
            @click="containerRefresh"
          >刷新</el-button>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="deccontainers"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column prop="containerId" label="集装箱号" min-width="200" />
        <el-table-column prop="containerMd" label="集装箱规格" min-width="150" :formatter="containerMdformat"/>
        <el-table-column prop="lclFlag" label="拼箱标识" min-width="120" :formatter="lclFlagformat"/>
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
      <el-pagination
        class="right mb20"
        background
        layout="prev, pager, next"
        :current-page="page.num"
        :total="page.total"
        :page-size="page.size"
        @current-change="currentChange"
      />
      <el-form :model="containerForm" ref="containerForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="集装箱号" prop="containerId">
              <el-input
                v-model="containerForm.containerId"
                placeholder="集装箱号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="集装箱规格" prop="containerMd">
              <el-input
                v-model="containerForm.containerMd"
                placeholder="集装箱规格"
                clearable
                size="small"
              />
            </el-form-item>-->
            <el-form-item label="集装箱规格" prop="containerMd">
              <el-select v-model="containerForm.containerMd" clearable placeholder="集装箱规格">
                <el-option
                  v-for="item in specificationOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="自重(KG)" prop="containerWt">
              <el-input
                v-model="containerForm.containerWt"
                placeholder="自重(KG)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="拼箱标识" prop="lclFlag">
              <el-input v-model="containerForm.lclFlag" placeholder="拼箱标识" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="拼箱标识" prop="lclFlag">
              <el-select v-model="containerForm.lclFlag" clearable placeholder="请选择拼箱标识">
                <el-option
                  v-for="item in LCLlogoOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="23">
            <el-form-item label="商品项号关系" prop="goodsNo">
              <el-input
                v-model="containerForm.goodsNo"
                placeholder="商品项号关系"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1" style="margin-left:10px">
            <el-button icon="el-icon-more-outline" type="info" circle></el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 随附单证 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>随附单证</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            :disabled="btnDisable.addBtn"
            @click="DocumentsAdd"
          >新增</el-button>
          <!-- <el-button
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
          >复制</el-button>-->
          <el-button
            type="primary"
            icon="el-icon-refresh"
            size="mini"
            :disabled="btnDisable.refBtn"
            @click="DocumentsRefresh"
          >刷新</el-button>
        </el-col>
      </el-row>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="declicensedocus"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column prop="docuCode" label="单证代码" min-width="200" :formatter="docuCodeformat"/>
        <el-table-column prop="certCode" label="单证编号" min-width="150" />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="DocumentsDelete(scope.$index,scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
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
      <el-form :model="DocumentsForm" ref="DocumentsForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <!-- <el-form-item label="随附单证代码" prop="docuCode">
              <el-input v-model="DocumentsForm.docuCode" placeholder="随附单证代码" clearable size="small" />
            </el-form-item>-->
            <el-form-item label="随附单证代码" prop="docuCode">
              <el-select v-model="DocumentsForm.docuCode" clearable placeholder="请选择随附单证代码">
                <el-option
                  v-for="item in documentCodeOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随附单证编号" prop="certCode">
              <el-input
                v-model="DocumentsForm.certCode"
                placeholder="随附单证编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="mb20">
      <el-form :model="decfreetxt" ref="decfreetxt" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="关联报关单" prop="relId">
              <el-input v-model="decfreetxt.relId" placeholder="关联报关单" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联备案" prop="relManNo">
              <el-input v-model="decfreetxt.relManNo" placeholder="关联备案" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="保税/监管场地" prop="bonNo">
              <el-input v-model="decfreetxt.bonNo" placeholder="保税/监管场地" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货场代码" prop="cusFie">
              <el-input v-model="decfreetxt.cusFie" placeholder="货场代码" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 其他事项确认弹出框 -->
    <el-dialog title="其他事项确认" :visible.sync="MatterconFirmation">
      <el-form :model="temporaryForm" class="mb20" ref="temporaryForm" label-width="250px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="特殊关系确认" prop="temporary1">
              <el-input
                v-model="temporaryForm.temporary1"
                placeholder="通知人代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="价格影响确认" prop="temporary1">
              <el-input
                v-model="temporaryForm.temporary2"
                placeholder="通知人名称"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="与货物有关的特许权使用费支付确认" prop="temporary1">
              <el-input
                v-model="temporaryForm.temporary3"
                placeholder="通知人地址(街道,邮箱)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑使用人信息" :visible.sync="userPopup">
      <el-form :model="userForm" class="mb20" ref="userForm" label-width="130px">
        <el-row :gutter="10">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-refresh-left"
              @click="userRefresh"
            >刷新</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="userAdd">保存</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用单位联系人" prop="useOrgPersonCode">
              <el-input
                v-model="userForm.useOrgPersonCode"
                placeholder="使用单位联系人"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用单位联系电话" prop="useOrgPersonTel">
              <el-input
                v-model="userForm.useOrgPersonTel"
                placeholder="使用单位联系电话"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 使用人编辑信息List -->
        <el-table
          class="mb20"
          ref="multipleTable"
          :data="decuser"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="55" />
          <el-table-column label="序号" align="center" type="index" min-width="200" />
          <el-table-column prop="useOrgPersonCode" label="使用单位联系人" min-width="200" />
          <el-table-column prop="useOrgPersonTel" label="使用单位联系电话" min-width="150" />
        </el-table>
      </el-form>
    </el-dialog>

    <el-dialog title="编辑检验检疫货物规格" :visible.sync="specificationPopup">
      <el-form :model="specificationForm" class="mb20" ref="specificationForm" label-width="130px">
        <el-row>
          <el-col :span="18">
            <el-form-item label="成分/原料/组分" prop="specification1">
              <el-input
                v-model="specificationForm.specification1"
                placeholder="成分/原料/组分"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="产品有效期" prop="specification2">
              <el-date-picker
                v-model="specificationForm.specification2"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="产品保质期(天)" prop="specification3">
              <el-input
                v-model="specificationForm.specification3"
                placeholder="产品保质期(天)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="境外生产企业" prop="specification4">
              <el-input
                v-model="specificationForm.specification4"
                placeholder="境外生产企业"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="货物规格" prop="specification5">
              <el-input
                v-model="specificationForm.specification5"
                placeholder="货物规格"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="货物型号" prop="specification6">
              <el-input
                v-model="specificationForm.specification6"
                placeholder="货物型号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="货物品牌" prop="specification7">
              <el-input
                v-model="specificationForm.specification7"
                placeholder="货物品牌"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="生产日期" prop="specification8">
              <el-date-picker
                v-model="specificationForm.specification8"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="生产批次" prop="specification9">
              <el-input
                v-model="specificationForm.specification9"
                placeholder="生产批次"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-edit"
              @click="specificationAdd"
            >确定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑企业资质信息" :visible.sync="CopPopup">
      <el-form :model="specificationForm" class="mb20" ref="specificationForm" label-width="130px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="生产批次" prop="specification9">
              <el-input
                v-model="specificationForm.specification9"
                placeholder="生产批次"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产批次" prop="specification9">
              <el-input
                v-model="specificationForm.specification9"
                placeholder="生产批次"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-table
          class="mb20"
          ref="multipleTable"
          :data="decuser"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="55" />
          <el-table-column label="序号" align="center" type="index" min-width="200" />
          <el-table-column prop="useOrgPersonCode" label="使用单位联系人" min-width="200" />
          <el-table-column prop="useOrgPersonTel" label="使用单位联系电话" min-width="150" />
        </el-table>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import depParaList from "./../components/depParaList";
// import depParaList2 from "./../components/depParaList2";
import { add } from "@/api/declare/declare";
export default {
  // components: { depParaList, depParaList2 },
  data() {
    return {
      //表头隐藏显示
      bodyHide: "",
      //list隐藏显示
      List1Hide: "",
      //事项确认弹出框 默认false
      MatterconFirmation: false,
      //编辑使用人信息
      userPopup: false,
      //编辑检验检疫货物规格
      specificationPopup: false,
      //编辑企业资质信息弹出框
      CopPopup: false,
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
      //前端字段
      temporaryForm: {
        //其他事项确认
        temporary1: undefined,
        temporary2: undefined,
        temporary3: undefined,
      },
      //使用人弹出框前端字段
      userForm: {
        useOrgPersonCode: undefined,
        useOrgPersonTel: undefined,
      },
      //编辑检验检疫货物规格
      specificationForm: {
        specification1: "",
        specification2: "",
        specification3: "",
        specification4: "",
        specification5: "",
        specification6: "",
        specification7: "",
        specification8: "",
        specification9: "",
      },
      //使用人List
      decuser: [],
      //商品项信息List
      declist: [],
      //集装箱号List
      deccontainers: [],
      //随附单证List
      declicensedocus: [],
      // 查询参数
      queryParams: {
        postCode: undefined,
      },
      //进口/出口报关单表头 DecHead
      dechead: {
        //其他业务事项确认
        promiseItmes: undefined,
        //申报地海关
        custoMmaster: undefined,
        //申报状态 不填写
        //统一编号
        seqNo: undefined,
        //预录入编号
        preEntryId: undefined,
        //海关编号
        entryId: undefined,
        //进境关别
        iePort: undefined,
        //备案号
        manualno: undefined,
        //合同协议号
        contrNo: undefined,
        //进口日期
        ieDate: undefined,
        //申报日期 不填写
        dDate: undefined,
        //境内收发货人
        tradeCoScc: undefined,
        //境内收发货人10位海关代码
        tradeCode: undefined,
        //境内收发货人10位检验检疫编码
        tradeCiqCode: undefined,
        //境内收发货人企业名称(中文)
        DomesticConsigneeEname: undefined,
        //境外收发货人
        overseasConsignorCode: undefined,
        //境外收发货人企业名称(中文)
        overseasConsignorEname: undefined,
        //消费使用单位
        ownerCodeScc: undefined,
        //消费使用单位10位海关代码
        ownerCode: undefined,
        //消费使用单位10位检验检疫编码
        ownerCiqCode: undefined,
        //消费使用单位企业名称
        ownerName: undefined,
        //申报单位
        agentCodeScc: undefined,
        //申报单位10位海关代码
        agentCode: undefined,
        //申报单位10位检验检疫编码
        declCiqCode: undefined,
        //申报单位企业名称
        agentName: undefined,
        //运输方式
        trafMode: undefined,
        //运输工具名称
        trafName: undefined,
        //提运单号
        billNo: undefined,
        //监管方式
        tradeMode: undefined,
        //征免性质
        cutMode: undefined,
        //许可证编号
        licenseNo: undefined,
        //启运国(地区)
        tradeCountry: undefined,
        //经停港
        distinatePort: undefined,
        //成交方式
        transMode: undefined,
        //运费标记
        feeMark: undefined,
        //运费率
        feeRate: undefined,
        //运费币制
        feeCurr: undefined,
        //保险费标记
        insurMark: undefined,
        //保险费率
        insurRate: undefined,
        //保险费币制
        insurCurr: undefined,
        //杂费标记
        otherMark: undefined,
        //杂费率
        otherRate: undefined,
        //杂费币制
        otherCurr: undefined,
        //件数
        packNo: undefined,
        //包装种类
        wrapType: undefined,
        //毛重(KG)
        grossWet: undefined,
        //净重(KG)
        netWt: undefined,
        //贸易国别(地区)
        tradeAreaCode: undefined,
        //入境口岸
        entyPortCode: undefined,
        //存放地点
        goodsPlace: undefined,
        //启运港
        desPportCode: undefined,
        //报关单类型
        entryType: undefined,
        //备注
        noteS: undefined,
        //标记唛码
        markNo: undefined,
        //检验检疫受理机关
        orgCode: undefined,
        //录入单位代码
        CopCode: undefined,
        //录入单位名称
        CopName: undefined,
        //领证机关
        vsaOrgCode: undefined,
        //口岸检验检疫机关
        inspOrgCode: undefined,
        //启运日期
        despDate: undefined,
        //B/L号
        blNo: undefined,
        //目的地检验检疫机关
        purpOrgCode: undefined,
        //关联号码
        correlationNo: undefined,
        //关联理由
        correlationReasonFlag: undefined,
        //原箱运输
        origBoxFlag: undefined,
        //特种业务标识
        specDeclFlag: undefined,
        //所属单证  不填写
      },
      //进口/出口报关单表体 DecList
      commodityForm: {
        //项号
        gNo: undefined,
        //备案序号
        contrItem: undefined,
        //商品编号
        codeTs: undefined,
        //检验检疫名称
        ciqName: undefined,
        //商品名称
        gName: undefined,
        //商品规格、型号
        gModel: undefined,
        //成交数量
        gQty: undefined,
        //成交计量单位
        gUnit: undefined,
        //成交单价
        declPrice: undefined,
        //成交总价
        declTotal: undefined,
        //成交币制
        tradeCurr: undefined,
        //法定第一数量
        firstQty: undefined,
        //第一计量单位
        firstUnit: undefined,
        //加工成品单耗版本号 (版本号)
        exgVersion: undefined,
        //货号
        exgNo: undefined,
        //最终目的国(地区)
        destinationCountry: undefined,
        //法定第二数量
        secondQty: undefined,
        //法定第二计量单位
        secondUnit: undefined,
        //原产国(地区)
        originCountry: undefined,
        //原产地区代码
        origPlaceCode: undefined,
        //境内目的地
        districtCode: undefined,
        //目的地代码
        destCode: undefined,
        //征免方式
        dutyMode: undefined,
        //检验检疫货物规格
        goodsSpec: undefined,
        //货物属性(代码)
        goodsAttr: undefined,
        //用途//生产厂家
        useTo: undefined,
      },
      //报关单集装箱 DecContainer
      containerForm: {
        //集装箱号
        containerId: undefined,
        //集装箱规格
        containerMd: undefined,
        //自重(KG)
        containerWt: undefined,
        //拼箱标识
        lclFlag: undefined,
        //商品项号
        goodsNo: undefined,
      },
      //随附单证 DecLicenseDocus
      DocumentsForm: {
        //随附单证代码
        docuCode: undefined,
        //随附单证编号
        certCode: undefined,
      },
      //报关单自由文本信息 DecFreeTxt
      decfreetxt: {
        //关联报关单号
        relId: undefined,
        //关联备案号
        relManNo: undefined,
        //保税/监管场地
        bonNo: undefined,
        //货场代码
        cusFie: undefined,
        //航次号
        voyNo: undefined,
      },
      //整体表单
      AllForm: {
        dechead: {},
        decfreetxt: {},
        declist: [],
        deccontainers: [],
        declicensedocus: [],
        decuser: [],
      },
      //业务属性 字典值
      businessMattersOptions:[],
      //临时字典
      TestOptions: [],
      //申报地海关/进境关别/入境口岸字典值
      customsOptions: [],
      //监管方式字典值
      regulateOptions: [],
      //运输方式 字典值
      transportOptions: [],
      //征免性质字典值
      exemptionOptions: [],
      //成交方式 字典值
      methodOptions: [],
      //运费/保险费/杂费 率 字典值
      rateOptions: [],
      //币制/运费率标记/保险费标记/杂费标记  字典值
      currencySystemOptions: [],
      //包装种类字典值
      PaymentMethodCodeOptions: [],
      //入境口岸字典值
      codeOptions: [],
      //报关单类型字典值
      declarationTypeOptions: [],
      //成交计量单位字典值
      transactionUnitOptions: [],
      //最终目的国(地区)/原产国(地区)/贸易国别(地区)/启运国(地区) 字典值
      areaCodesOptions: [],
      //原产地区字典值
      originOptions: [],
      //征免方式字典值
      exemptionMethodOptions: [],
      //集装箱规格字典值
      specificationOptions: [],
      //拼箱标识字典值
      LCLlogoOptions: [],
      //随附单证代码字典值
      documentCodeOptions: [],
      //经停港/启运港字典值
      ofStopOptions:[],

      statusOptions: [],
      dateTimeVal: "",
      data: [],
    };
  },
  // 集装箱数
  // contaCount: undefined,
  // 随附单证
  // attaDocuCdstr: undefined,
  created() {
    //业务事项 字典翻译
    this.getDicts("dy_business_matters").then((response) => {
      this.businessMattersOptions = response.data;
    });
    
    //临时字典翻译
    this.getDicts("sys_user_sex").then((response) => {
      this.TestOptions = response.data;
    });
    //申报地海关/进境关别/入境口岸字典翻译
    this.getDicts("hg_customs_code").then((response) => {
      this.customsOptions = response.data;
    });
    //监管方式字典翻译
    this.getDicts("tax_regulate_type").then((response) => {
      this.regulateOptions = response.data;
    });
    //运输方式 字典翻译
    this.getDicts("dy_mode_of_transport").then((response) => {
      this.transportOptions = response.data;
    });
    //征免性质字典翻译
    this.getDicts("dy_nature_of_exemption").then((response) => {
      this.exemptionOptions = response.data;
    });
    //成交方式 字典翻译
    this.getDicts("dy_transaction_method").then((response) => {
      this.methodOptions = response.data;
    });

    //运费/保险费/杂费 率 字典翻译
    this.getDicts("dy_rate").then((response) => {
      this.rateOptions = response.data;
    });
    //币制/运费率标记/保险费标记/杂费标记  字典翻译
    this.getDicts("dy_currency_system").then((response) => {
      this.currencySystemOptions = response.data;
    });
    //包装种类 字典翻译
    this.getDicts("PaymentMethodCode").then((response) => {
      this.PaymentMethodCodeOptions = response.data;
    });
    //入境口岸 字典翻译
    this.getDicts("hg_customs_code").then((response) => {
      this.codeOptions = response.data;
    });
    //报关单类型 字典翻译
    this.getDicts("dy_customs_declaration_type").then((response) => {
      this.declarationTypeOptions = response.data;
    });
    //成交计量单位 字典翻译
    this.getDicts("dy_transaction_unit").then((response) => {
      this.transactionUnitOptions = response.data;
    });
    //最终目的国(地区)/原产国(地区) 字典翻译
    this.getDicts("dy_area_codes").then((response) => {
      this.areaCodesOptions = response.data;
    });
    //原产地区 字典翻译
    this.getDicts("dy_origin").then((response) => {
      this.originOptions = response.data;
    });
    //征免方式 字典翻译
    this.getDicts("dy_nature_of_exemption").then((response) => {
      this.exemptionMethodOptions = response.data;
    });
    //集装箱规格 字典翻译
    this.getDicts("dy_container_specification").then((response) => {
      this.specificationOptions = response.data;
    });
    //拼箱标识 字典翻译
    this.getDicts("dy_LCL_logo").then((response) => {
      this.LCLlogoOptions = response.data;
    });
    //随附单证代码 字典翻译
    this.getDicts("dy_attached_document_code").then((response) => {
      this.documentCodeOptions = response.data;
    });
    //经停港 字典翻译
    this.getDicts("dy_port_of_stop").then((response) => {
      this.ofStopOptions = response.data;
    });
  },
  mounted() {
    // 初始化
    this.init();
    //表头隐藏部分 默认不显示
    this.bodyHide = "none";
    //List1 隐藏部分 默认不显示
    this.List1Hide = "none";
  },
  methods: {
    //
    Trailerformat(row, column) {
      return this.selectDictLabel(this.TrailertypeOptions, row.typeCode);
    },
    //币制
    transactionUnitformat(row, column){
      return this.selectDictLabel(this.currencySystemOptions, row.tradeCurr);
    },
    // 最终目的国(地区)
    areaCodesOptionsformat(row, column){
      return this.selectDictLabel(this.areaCodesOptions, row.destinationCountry);
    },
    //原产国(地区) List翻译
    originCountryformat(row, column){
      return this.selectDictLabel(this.areaCodesOptions, row.originCountry);
    },
    //征免方式 翻译
    dutyModeformat(row, column){
      return this.selectDictLabel(this.exemptionOptions, row.dutyMode);
    },
    //集装箱规格
    containerMdformat(row, column){
      return this.selectDictLabel(this.specificationOptions, row.containerMd);
    },
    //拼箱标识
    lclFlagformat(row, column){
      return this.selectDictLabel(this.LCLlogoOptions, row.lclFlag);
    },
    //随单附证
    docuCodeformat(row, column){
      return this.selectDictLabel(this.documentCodeOptions, row.docuCode);
    },
    // //成交计量单位
    //   transactionUnitformat(row, column){
    //   console.log(row.tradeCurr);
    //   return this.selectDictLabel(this.currencySystemOptions, row.tradeCurr);
    // },
    //整体新增
    SingleAll() {
      this.dechead.promiseItmes =
        this.temporaryForm.temporary1 +
        this.temporaryForm.temporary2 +
        this.temporaryForm.temporary3;
        this.dechead.specDeclFlag=this.dechead.specDeclFlag.join(",");
        console.log(this.dechead.specDeclFlag);
      this.AllForm.dechead = this.dechead;
      this.AllForm.decfreetxt = this.decfreetxt;
      this.AllForm.deccontainers = this.deccontainers;
      this.AllForm.declicensedocus = this.declicensedocus;
      this.AllForm.decuser = this.decuser;
      this.AllForm.declist = this.declist;
      console.log(JSON.stringify(this.AllForm));
      add(this.AllForm).then((response) => {
        if (response.code === 200) {
          this.msgSuccess("新增成功");
          console.log(JSON.stringify(this.AllForm));
        } else {
          this.msgError(response.msg);
        }
      });
    },
    //使用人清空
    userRefresh() {
      this.userForm = {};
    },
    //使用人弹出框保存
    userAdd() {
      this.decuser.push(this.userForm);
      this.userForm = {};
    },
    //使用人弹框
    user() {
      this.userPopup = true;
    },
    //其他事项确认弹窗
    matter() {
      this.MatterconFirmation = true;
    },
    //编辑检验检疫货物规格弹窗
    specification() {
      this.specificationPopup = true;
    },
    //编辑检验检疫货物规格弹窗确定按钮
    specificationAdd() {
      this.commodityForm.goodsSpec = [
        this.specificationForm.specification1,
        this.specificationForm.specification2,
        this.specificationForm.specification3,
        this.specificationForm.specification4,
        this.specificationForm.specification5,
        this.specificationForm.specification6,
        this.specificationForm.specification7,
        this.specificationForm.specification8,
        this.specificationForm.specification9,
      ].join();
      this.specificationPopup = false;
    },
    //进口/出口报关单表体清空
    CommodityItemRefresh() {
      this.declist = [];
    },
    //进口/出口报关单表体保存
    CommodityItemAdd() {
      //下拉多选 数组转换为字符串
      this.commodityForm.goodsAttr = this.commodityForm.goodsAttr.join(",");
      this.declist.push(this.commodityForm);
      console.log(this.declist);
      this.commodityForm = {};
    },
    //进口/出口报关单表体 List删除
    commodityDelete(index, row) {
      this.declist.splice(index, 1);
    },
    //集装箱信息 List删除
    containerDelete(index, row) {
      this.deccontainers.splice(index, 1);
    },
    //随单附证
    DocumentsDelete(index, row) {
      this.declicensedocus.splice(index, 1);
    },
    //集装箱保存按钮
    containerAdd() {
      this.deccontainers.push(this.containerForm);
      this.containerForm = {};
    },
    //集装箱List清空按钮
    containerRefresh() {
      this.deccontainers = [];
    },
    //随附单证保存按钮
    DocumentsAdd() {
      this.declicensedocus.push(this.DocumentsForm);
      this.DocumentsForm = {};
    },
    DocumentsRefresh() {
      this.declicensedocus = [];
    },
    //企业资质弹出框
    CopList() {
      this.CopPopup = true;
    },
    //表头隐藏显示切换
    hide() {
      if (this.bodyHide == "") {
        this.bodyHide = "none";
      } else {
        this.bodyHide = "";
      }
    },
    //List1 隐藏显示切换
    List1() {
      if (this.List1Hide == "") {
        this.List1Hide = "none";
      } else {
        this.List1Hide = "";
      }
    },
    async init() {
      // await this.depParaList()
    },
    // 新增
    handleAdd() {},
    // 暂存
    handleSave() {
      this.$saveStore("a", "123");
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
    currentChange(page) {},
    // 组件选择
    choose(row) {
      this.queryParams.postCode = row.codeName;
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
    handleSelectionChange() {},
    numFun() {},

    // 请求接口
    // depParaList() {
    //   return new Promise((resolve) => {
    //     this.$store
    //       .dispatch("originalManifest/depParaList", {
    //         tableName: "CUS_CUSTOMS",
    //         rowNum: 5000,
    //       })
    //       .then((data) => {
    //         resolve(data);
    //       });
    //   });
    // },
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
.el-select {
  width: 100%;
}
</style>