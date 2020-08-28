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
    </div>
    <!-- 基本信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :model="form" ref="form" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="申报地海关" prop="CustomMaster">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="form.CustomMaster"
                placeholder="请输申报地海关"
                clearable
                size="small"
              />
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
            <el-form-item label="统一编号" prop="SeqNo">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="form.SeqNo"
                placeholder="请输入统一编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预录入编号" prop="PreEntryId">
              <el-input v-model="form.PreEntryId" placeholder="请输入预录入编号" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="海关编号" prop="EntryId">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="form.EntryId"
                placeholder="请输入海关编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进境关别" prop="IEPort">
              <el-input v-model="form.IEPort" placeholder="请输入进境关别" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="备案号" prop="ManualNo">
              <el-input v-model="form.ManualNo" placeholder="请输入备案号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同协议号" prop="ContrNo">
              <el-input v-model="form.ContrNo" placeholder="请输入合同协议号" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="进口日期" prop="IEDate">
              <el-input v-model="form.IEDate" placeholder="请输入进口日期" clearable size="small" />
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
            <el-form-item label="境内收发货人" prop="TradeCoScc">
              <el-input v-model="form.TradeCoScc" placeholder="18位社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="TradeCode" style="margin-left:-120px">
              <el-input v-model="form.TradeCode" placeholder="10位海关代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="DomesticConsigneeEname" style="margin-left:-120px">
              <el-input v-model="form.DomesticConsigneeEname" placeholder="10位检验检疫编码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="form.postCode" placeholder="企业名称(中文)" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="15">
            <el-form-item label="境外收发货人" prop="OverseasConsignorCode">
              <el-input v-model="form.OverseasConsignorCode" placeholder="境外收发货人代码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="OverseasConsignorEname" style="margin-left:-120px">
              <el-input v-model="form.OverseasConsignorEname" placeholder="企业名称(外文)" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <el-form-item label="消费使用单位" prop="ownerName">
              <el-input v-model="form.ownerName" placeholder="18位社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="form.postCode" placeholder="10位海关代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="form.postCode" placeholder="10位检验检疫编码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="form.postCode" placeholder="企业名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <el-form-item label="申报单位" prop="AgentCodeScc">
              <el-input v-model="form.AgentCodeScc" placeholder="18位社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="AgentCode" style="margin-left:-120px">
              <el-input v-model="form.AgentCode" placeholder="10位海关代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="DeclCiqCode" style="margin-left:-120px">
              <el-input v-model="form.DeclCiqCode" placeholder="10位检验检疫编码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="AgentName" style="margin-left:-120px">
              <el-input v-model="form.AgentName" placeholder="企业名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="运输方式" prop="TrafMode">
              <el-input v-model="form.TrafMode" placeholder="请输入运输方式" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输工具名称" prop="TrafName">
              <el-input v-model="form.TrafName" placeholder="运输工具名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="航次号" prop="DecFreeTxt.VoyNo">
              <el-input
                v-model="form.DecFreeTxt.VoyNo"
                placeholder="请输入航次号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="提运单号" prop="BillNo">
              <el-input v-model="form.BillNo" placeholder="请输入提运单号" clearable size="small" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="2">
            <el-button icon="el-icon-more-outline" size="medium"></el-button>
          </el-col>-->
          <el-col :span="6">
            <el-form-item label="监管方式" prop="TradeMode">
              <el-input v-model="form.TradeMode" placeholder="请输入监管方式" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="征免性质" prop="CutMode">
              <el-input v-model="form.CutMode" placeholder="征免性质" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="许可证编号" prop="LicenseNo">
              <el-input v-model="form.LicenseNo" placeholder="请输入许可证编号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="启运国(地区)" prop="TradeCountry">
              <el-input v-model="form.TradeCountry" placeholder="启运国(地区)" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经停港" prop="DistinatePort">
              <el-input v-model="form.DistinatePort" placeholder="请输入经停港" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="成交方式" prop="TransMode">
              <el-input v-model="form.TransMode" placeholder="成交方式" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="4">
            <el-form-item label="运费标记" prop="FeeMark">
              <el-input v-model="form.FeeMark" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="FeeRate" style="margin-left:-120px">
              <el-input v-model="form.FeeRate" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="FeeCurr" style="margin-left:-120px">
              <el-input v-model="form.FeeCurr" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="保险费标记" prop="InsurMark">
              <el-input v-model="form.InsurMark" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="InsurRate" style="margin-left:-120px">
              <el-input v-model="form.InsurRate" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="InsurCurr" style="margin-left:-120px">
              <el-input v-model="form.InsurCurr" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="4">
            <el-form-item label="杂费标记" prop="OtherMark">
              <el-input v-model="form.OtherMark" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="OtherRate" style="margin-left:-120px">
              <el-input v-model="form.OtherRate" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="OtherCurr" style="margin-left:-120px">
              <el-input v-model="form.OtherCurr" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="PackNo" label="件数">
              <el-input v-model="form.PackNo" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item prop="WrapType" label="包装种类">
              <el-input v-model="form.WrapType" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="毛重(KG)" prop="GrossWet">
              <el-input v-model="form.GrossWet" placeholder="请输入毛重(KG)" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="净重(KG)" prop="NetWt">
              <el-input v-model="form.NetWt" placeholder="净重(KG)" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="贸易国别(地区)" prop="TradeAreaCode">
              <el-input
                v-model="form.TradeAreaCode"
                placeholder="请输入贸易国别(地区)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集装箱数" prop="postCode">
              <el-input v-model="form.postCode" placeholder="集装箱数" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随附单证" prop="postCode">
              <el-input v-model="form.postCode" placeholder="随附单证" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="入境口岸" prop="EntyPortCode">
              <el-input v-model="form.EntyPortCode" placeholder="入境口岸" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物存放地点" prop="GoodsPlace">
              <el-input v-model="form.GoodsPlace" placeholder="货物存放地点" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="启运港" prop="DespPortCode">
              <el-input v-model="form.DespPortCode" placeholder="启运港" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex">
          <el-col :span="7">
            <el-form-item label="报关单类型" prop="EntryType">
              <el-input v-model="form.EntryType" placeholder="报关单类型" />
            </el-form-item>
          </el-col>
          <el-col :span="19" style="margin-left:40px">
            <el-form-item label="备注" prop="NoteS">
              <el-input v-model="form.NoteS" placeholder="备注" />
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
            <el-form-item label="标记唛码" prop="MarkNo">
              <el-input v-model="form.MarkNo" placeholder="标记唛码" />
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-left:-50px">
            <el-form-item label="业务事项">
              <el-select v-model="value1" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :style="{display:bodyHide}">
          <el-col :span="12">
            <el-form-item label="检验检疫受理机关" prop="OrgCode">
              <el-input v-model="form.OrgCode" placeholder="检验检疫受理机关" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="企业资质" prop="entQualifTypeCodeS">
              <el-input v-model="form.entQualifTypeCodeS" />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:-150px">
            <el-form-item prop="entQualifTypeCodeSName">
              <el-input v-model="form.entQualifTypeCodeSName" />
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left:10px">
            <el-button icon="el-icon-arrow-left" type="info" circle></el-button>
          </el-col>
          <el-col :span="3" style="margin-left:-160px">
            <el-button icon="el-icon-arrow-right" type="info" circle></el-button>
          </el-col>
          <el-col :span="3" style="margin-left:-160px">
            <el-button icon="el-icon-more-outline" type="info" circle></el-button>
          </el-col>
        </el-row>

        <el-row type="flex" :style="{display:bodyHide}">
          <el-col :span="6">
            <el-form-item label="领证机关" prop="VsaOrgCode">
              <el-input v-model="form.VsaOrgCode" placeholder="请输入领证机关" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="口岸检验检疫机关" prop="InspOrgCode">
              <el-input v-model="form.InspOrgCode" placeholder="口岸检验检疫机关" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="启运日期" prop="DespDate">
              <el-date-picker
                width="100%"
                class="datePicker"
                v-model="form.DespDate"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="B/L号" prop="BLNo">
              <el-input v-model="form.BLNo" placeholder="B/L号" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :style="{display:bodyHide}">
          <el-col :span="12">
            <el-form-item label="目的地检验检疫机关" prop="PurpOrgCode">
              <el-input v-model="form.PurpOrgCode" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="13" style="margin-left:20px">
            <el-form-item label="关联号码及理由" prop="CorrelationNo">
              <el-input v-model="form.CorrelationNo" placeholder="关联号码及理由" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-left:-140px">
            <el-form-item label prop="CorrelationReasonFlag">
              <el-input v-model="form.CorrelationReasonFlag" placeholder="关联理由" />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:50px">
            <el-button type="primary" size="medium" @click="user">使 用 人</el-button>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10" :style="{display:bodyHide}">
          <el-col :span="12">
            <el-form-item label="原箱运输" prop="OrigBoxFlag">
              <el-input v-model="form.OrigBoxFlag" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-left:0px">
            <el-form-item label="特种业务标识" prop="SpecDeclFlag">
              <el-input v-model="form.SpecDeclFlag" placeholder="特种业务标识" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-left:-90px">
            <el-form-item label="所属单证" prop="postCode">
              <el-input v-model="form.postCode" placeholder="所属单证" :disabled="true" />
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
        <span>商品项信息</span>
      </div>
      <el-row type="flex" class="mb20">
        <el-col>
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
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column prop="num" label="项号" min-width="120" />
        <el-table-column prop="num" label="备案序号" min-width="120" />
        <el-table-column prop="num" label="商品编号" min-width="150" />
        <el-table-column prop="num" label="检验检疫名称" min-width="120" />
        <el-table-column prop="num" label="商品名称" min-width="120" />
        <el-table-column prop="num" label="商品规格、型号" min-width="120" />
        <el-table-column prop="num" label="成交数量" min-width="120" />
        <el-table-column prop="num" label="成交单位" min-width="120" />
        <el-table-column prop="num" label="单价" min-width="150" />
        <el-table-column prop="num" label="总价" min-width="120" />
        <el-table-column prop="num" label="币制" min-width="120" />
        <el-table-column prop="num" label="原产国(地区)" min-width="120" />
        <el-table-column prop="num" label="最终目的国" min-width="120" />
        <el-table-column prop="num" label="征免方式" min-width="120" />
        <el-table-column prop="num" label="监管要求" min-width="120" />
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
              <el-input v-model="commodityForm.gNo" placeholder="项号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="备案序号" prop="ContrItem">
              <el-input
                v-model="commodityForm.ContrItem"
                placeholder="备案序号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商品编号" prop="CodeTS">
              <el-input v-model="commodityForm.CodeTS" placeholder="商品编号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检验检疫名称" prop="CiqName">
              <el-input
                v-model="commodityForm.CiqName"
                placeholder="检验检疫名称"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-more-outline" type="info" circle></el-button>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="商品名称" prop="GName">
              <el-input v-model="commodityForm.GName" placeholder clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品规格、型号" prop="GModel">
              <el-input
                v-model="commodityForm.GModel"
                placeholder="商品规格、型号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10">
          <el-col :span="5">
            <el-form-item label="成交数量" prop="GQty">
              <el-input v-model="commodityForm.GQty" placeholder="成交数量" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="成交计量单位" prop="GUnit">
              <el-input v-model="commodityForm.GUnit" placeholder="成交计量单位" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="成交单价" prop="DeclTotal">
              <el-input
                v-model="commodityForm.DeclTotal"
                placeholder="成交单价"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left:-90px">
            <el-form-item label="成交总价" prop="DeclTotal">
              <el-input
                v-model="commodityForm.DeclTotal"
                placeholder="成交总价"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:-40px">
            <el-form-item label="成交币制" prop="TradeCurr">
              <el-input
                v-model="commodityForm.TradeCurr"
                placeholder="成交币制"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10">
          <el-col :span="5">
            <el-form-item label="法定第一数量" prop="FirstQty">
              <el-input
                v-model="commodityForm.FirstQty"
                placeholder="法定第一数量"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="法定第一计量单位" prop="FirstUnit">
              <el-input
                v-model="commodityForm.FirstUnit"
                placeholder="法定第一计量单位"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="加工成品单耗版本号" prop="ExgVersion">
              <el-input
                v-model="commodityForm.ExgVersion"
                placeholder="加工成品单耗版本号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left:-90px">
            <el-form-item label="货号" prop="ExgNo">
              <el-input v-model="commodityForm.ExgNo" placeholder="货号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:-40px">
            <el-form-item label="最终目的国(地区)" prop="DestinationCountry">
              <el-input
                v-model="commodityForm.DestinationCountry"
                placeholder="最终目的国(地区)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10">
          <el-col :span="5">
            <el-form-item label="法定第二数量" prop="SecondQty">
              <el-input
                v-model="commodityForm.SecondQty"
                placeholder="法定第二数量"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="法定第二计量单位" prop="SecondUnit">
              <el-input
                v-model="commodityForm.SecondUnit"
                placeholder="法定第二计量单位"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="原产国(地区)" prop="OriginCountry">
              <el-input
                v-model="commodityForm.OriginCountry"
                placeholder="原产国(地区)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:-60px">
            <el-form-item label="原产地区" prop="OrigPlaceCode">
              <el-input
                v-model="commodityForm.OrigPlaceCode"
                placeholder="原产地区"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="1" style="margin-left:230px">
            <el-button type="info" icon="el-icon-sort" @click="List1" circle></el-button>
          </el-col>
          <el-col :span="8" style="margin-left:40px">
            <el-form-item label="境内目的地" prop="DistrictCode">
              <el-input
                v-model="commodityForm.DistrictCode"
                placeholder="境内目的地代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-left:-160px">
            <el-form-item label prop="DestCode">
              <el-input
                v-model="commodityForm.DestCode"
                placeholder="目的地代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:-30px">
            <el-form-item label="征免方式" prop="DutyMode">
              <el-input v-model="commodityForm.DutyMode" placeholder="征免方式" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10" :style="{display:List1Hide}">
          <el-col :span="18">
            <el-form-item label="检验检疫货物规格" prop="GoodsSpec">
              <el-input
                v-model="commodityForm.GoodsSpec"
                placeholder="检验检疫货物规格"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button icon="el-icon-more-outline" type="info" circle></el-button>
          </el-col>
          <el-col :span="4" style="margin-left:100px">
            <el-button type="primary" size="medium">业 务 事 项</el-button>
          </el-col>
        </el-row>

        <el-row type="flex" :style="{display:List1Hide}">
          <el-col :span="9">
            <el-form-item label="货物属性" prop="GoodsAttr">
              <el-input
                v-model="commodityForm.GoodsAttr"
                placeholder="货物属性"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1">
            <el-button icon="el-icon-more-outline" type="info" circle></el-button>
          </el-col>-->
          <el-col :span="9">
            <el-form-item label="用途" prop="UseTo">
              <el-input v-model="commodityForm.UseTo" placeholder="用途" clearable size="small" />
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
            @click="handleAdd"
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
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column prop="num" label="集装箱号" min-width="200" />
        <el-table-column prop="num" label="集装箱规格" min-width="150" />
        <el-table-column prop="num" label="拼箱标识" min-width="120" />
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
            <el-form-item label="集装箱号" prop="ContainerId">
              <el-input
                v-model="containerForm.ContainerId"
                placeholder="集装箱号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="集装箱规格" prop="ContainerMd">
              <el-input
                v-model="containerForm.ContainerMd"
                placeholder="集装箱规格"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="自重(KG)" prop="ContainerWt">
              <el-input
                v-model="containerForm.ContainerWt"
                placeholder="自重(KG)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拼箱标识" prop="LclFlag">
              <el-input v-model="containerForm.LclFlag" placeholder="拼箱标识" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="23">
            <el-form-item label="商品项号关系" prop="GoodsNo">
              <el-input
                v-model="containerForm.GoodsNo"
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
            @click="handleAdd"
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
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column prop="num" label="单证代码" min-width="200" />
        <el-table-column prop="num" label="单证编号" min-width="150" />
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
          <el-col :span="12">
            <el-form-item label="随附单证代码" prop="DocuCode">
              <el-input v-model="queryParams.DocuCode" placeholder="随附单证代码" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随附单证编号" prop="CertCode">
              <el-input v-model="queryParams.CertCode" placeholder="随附单证编号" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="mb20">
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="关联报关单" prop="RelId">
              <el-input v-model="queryParams.RelId" placeholder="关联报关单" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联备案" prop="RelManNo">
              <el-input v-model="queryParams.RelManNo" placeholder="关联备案" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="保税/监管场地" prop="BonNo">
              <el-input v-model="queryParams.BonNo" placeholder="保税/监管场地" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货场代码" prop="CusFie">
              <el-input v-model="queryParams.CusFie" placeholder="货场代码" clearable size="small" />
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
            <el-button type="primary" plain size="mini" icon="el-icon-refresh-left" @click="userRefresh">刷新</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="userAdd">保存</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用单位联系人" prop="user1">
              <el-input v-model="userForm.user1" placeholder="使用单位联系人" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用单位联系电话" prop="user2">
              <el-input v-model="userForm.user2" placeholder="使用单位联系电话" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 使用人编辑信息List -->
        <el-table class="mb20" ref="multipleTable" :data="UserList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" min-width="55" />
          <el-table-column label="序号" align="center" type="index" min-width="200" />
          <el-table-column prop="user1" label="使用单位联系人" min-width="200" />
          <el-table-column prop="user2" label="使用单位联系电话" min-width="150" />
        </el-table>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import depParaList from "./../components/depParaList";
// import depParaList2 from "./../components/depParaList2";
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
      //使用人弹出框前端字段
      userForm: {
        user1: undefined,
        user2: undefined,
      },
      //使用人List
      UserList: [],
      //前端字段
      temporaryForm: {
        //其他事项确认
        temporary1: undefined,
        temporary2: undefined,
        temporary3: undefined,
        //集装箱数
        // contaCount: undefined,
        //随附单证
        // attaDocuCdstr: undefined,
      },
      // 查询参数
      queryParams: {
        postCode: undefined,
      },
      //进口/出口报关单表头 DecHead
      form: {
        //申报地海关
        CustomMaster: undefined,
        //申报状态 不填写
        //统一编号
        SeqNo: undefined,
        //预录入编号
        PreEntryId: undefined,
        //海关编号
        EntryId: undefined,
        //进境关别
        IEPort: undefined,
        //备案号
        ManualNo: undefined,
        //合同协议号
        ContrNo: undefined,
        //进口日期
        IEDate: undefined,
        //申报日期 不填写
        dDate: undefined,
        //境内收发货人
        TradeCoScc: undefined,
        //境内收发货人10位海关代码
        TradeCode: undefined,
        //境内收发货人10位检验检疫编码
        TradeCiqCode: undefined,
        //境内收发货人企业名称(中文)
        DomesticConsigneeEname: undefined,
        //境外收发货人
        OverseasConsignorCode: undefined,
        //境外收发货人企业名称(中文)
        OverseasConsignorEname: undefined,
        //消费使用单位
        OwnerName: undefined,
        //消费使用单位10位海关代码
        ownerCode: undefined,
        //消费使用单位10位检验检疫编码
        OwnerCiqCode: undefined,
        //消费使用单位企业名称
        ownerName: undefined,
        //申报单位
        AgentCodeScc: undefined,
        //申报单位10位海关代码
        AgentCode: undefined,
        //申报单位10位检验检疫编码
        DeclCiqCode: undefined,
        //申报单位企业名称
        AgentName: undefined,
        //运输方式
        TrafMode: undefined,
        //运输工具名称
        TrafName: undefined,
        //航次号
        DecFreeTxt: {
          VoyNo: undefined,
        },
        //提运单号
        BillNo: undefined,
        //监管方式
        TradeMode: undefined,
        //征免性质
        CutMode: undefined,
        //许可证编号
        LicenseNo: undefined,
        //启运国(地区)
        TradeCountry: undefined,
        //经停港
        DistinatePort: undefined,
        //成交方式
        TransMode: undefined,
        //运费标记
        FeeMark: undefined,
        //运费率
        FeeRate: undefined,
        //运费币制
        FeeCurr: undefined,
        //保险费标记
        InsurMark: undefined,
        //保险费率
        InsurRate: undefined,
        //保险费币制
        InsurCurr: undefined,
        //杂费标记
        OtherMark: undefined,
        //杂费率
        OtherRate: undefined,
        //杂费币制
        OtherCurr: undefined,
        //件数
        PackNo: undefined,
        //包装种类
        WrapType: undefined,
        //毛重(KG)
        GrossWet: undefined,
        //净重(KG)
        NetWt: undefined,
        //贸易国别(地区)
        TradeAreaCode: undefined,
        //入境口岸
        EntyPortCode: undefined,
        //存放地点
        GoodsPlace: undefined,
        //启运港
        DespPortCode: undefined,
        //报关单类型
        EntryType: undefined,
        //备注
        NoteS: undefined,
        //标记唛码
        MarkNo: undefined,
        //检验检疫受理机关
        OrgCode: undefined,
        //企业资质
        entQualifTypeCodeS: undefined,
        //企业资质2
        entQualifTypeCodeSName: undefined,
        //领证机关
        VsaOrgCode: undefined,
        //口岸检验检疫机关
        InspOrgCode: undefined,
        //启运日期
        DespDate: undefined,
        //B/L号
        BLNo: undefined,
        //目的地检验检疫机关
        PurpOrgCode: undefined,
        //关联号码
        CorrelationNo: undefined,
        //关联理由
        CorrelationReasonFlag: undefined,
        //原箱运输
        OrigBoxFlag: undefined,
        //特种业务标识
        SpecDeclFlag: undefined,
        //所属单证  不填写
      },
      //进口/出口报关单表体 DecList
      commodityForm: {
        //项号
        gNo: undefined,
        //备案序号
        ContrItem: undefined,
        //商品编号
        CodeTS: undefined,
        //检验检疫名称
        CiqName: undefined,
        //商品名称
        GName: undefined,
        //商品规格、型号
        GModel: undefined,
        //成交数量
        GQty: undefined,
        //成交计量单位
        GUnit: undefined,
        //成交单价
        DeclPrice: undefined,
        //成交总价
        DeclTotal: undefined,
        //成交币制
        TradeCurr: undefined,
        //法定第一数量
        FirstQty: undefined,
        //第一计量单位
        FirstUnit: undefined,
        //加工成品单耗版本号 (版本号)
        ExgVersion: undefined,
        //货号
        ExgNo: undefined,
        //最终目的国(地区)
        DestinationCountry: undefined,
        //法定第二数量
        SecondQty: undefined,
        //法定第二计量单位
        SecondUnit: undefined,
        //原产国(地区)
        OriginCountry: undefined,
        //原产地区代码
        OrigPlaceCode: undefined,
        //境内目的地
        DistrictCode: undefined,
        //目的地代码
        DestCode: undefined,
        //征免方式
        DutyMode: undefined,
        //检验检疫货物规格
        GoodsSpec: undefined,
        //货物属性(代码)
        GoodsAttr: undefined,
        //用途//生产厂家
        UseTo: undefined,
      },
      //报关单集装箱 DecContainer
      containerForm: {
        //集装箱号
        ContainerId: undefined,
        //集装箱规格
        ContainerMd: undefined,
        //自重(KG)
        ContainerWt: undefined,
        //拼箱标识
        LclFlag: undefined,
        //商品项号
        GoodsNo: undefined,
      },
      //随附单证 DecLicenseDocus
      DocumentsForm: {
        //随附单证代码
        DocuCode: undefined,
        //随附单证编号
        CertCode: undefined,
      },
      //报关单自由文本信息 DecFreeTxt
      CustomsDeclarationForm: {
        //关联报关单号
        RelId: undefined,
        //关联备案号
        RelManNo: undefined,
        //保税/监管场地
        BonNo: undefined,
        //货场代码
        CusFie: undefined,
      },
      statusOptions: [],
      dateTimeVal: "",
      data: [],
    };
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
    //使用人清空
    userRefresh() {
      this.userForm = {};
    },
    //使用人弹出框保存
    userAdd() {
      console.log(this.userForm);
      this.UserList.push(this.userForm);
    },
    //其他事项确认弹窗
    matter() {
      this.MatterconFirmation = true;
    },
    //使用人弹框
    user() {
      this.userPopup = true;
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
      console.log("保存");
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
    currentChange(page) {
      console.log(page);
    },
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
    numFun() {
      console.log(123);
    },
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
</style>