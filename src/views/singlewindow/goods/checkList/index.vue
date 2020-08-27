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
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="申报地海关" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入申报地海关"
                clearable
                size="small"
              >
                <!-- <el-tooltip slot="append" class="item" effect="dark" content="系统分配批次号" placement="top-start">
                  <el-button  icon="el-icon-plus" @click="numFun"></el-button>
                </el-tooltip>-->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申报状态" prop="postCode">
              <el-input
                @focus="$store.dispatch('originalManifest/changeStatus')"
                v-model="queryParams.postCode"
                placeholder="请输入申报状态"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="统一编号" prop="postCode">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="queryParams.postCode"
                placeholder="请输入统一编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预录入编号" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入预录入编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="海关编号" prop="postCode">
              <el-input
                @focus="dialogTableVisible = true"
                v-model="queryParams.postCode"
                placeholder="请输入海关编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备案号" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="请输入备案号"   />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="合同协议号" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入合同协议号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进境关别" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入进境关别"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="进口日期" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入进口日期"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申报日期" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入申报日期"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <el-form-item label="境内收发货人" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="18位社会信用代码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input
                v-model="queryParams.postCode"
                placeholder="10位海关代码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode" placeholder="10位检验检疫编码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode" placeholder="企业名称(中文)" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="15">
            <el-form-item label="境外收发货人" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="境外收发货人代码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode" placeholder="企业名称(外文)" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <el-form-item label="消费使用单位" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="18位社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode" placeholder="10位海关代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode" placeholder="10位检验检疫编码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode" placeholder="企业名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <el-form-item label="申报单位" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="18位社会信用代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode" placeholder="10位海关代码" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode" placeholder="10位检验检疫编码" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode" placeholder="企业名称" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex">
          <el-col :span="6">
             <el-form-item label="运输方式" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入运输方式"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="运输工具名称" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="运输工具名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="航次号" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入航次号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>

          <el-row type="flex">
            <el-col :span="12">
            <el-form-item label="提运单号" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入提运单号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
             <el-form-item label="监管方式" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入监管方式"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="征免性质" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="征免性质" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex" :gutter="10">
            <el-col :span="10">
            <el-form-item label="提运单号" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入提运单号"
                clearable
                size="small"
              />
            </el-form-item>
            </el-col>
              <el-col :span="2">
            <el-button icon="el-icon-more-outline" size="medium"></el-button>
          </el-col>
          <el-col :span="6">
             <el-form-item label="监管方式" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入监管方式"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="征免性质" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="征免性质" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
             <el-col :span="6">
             <el-form-item label="许可证号" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入许可证号"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="启运国(地区)" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="启运国(地区)" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
             <el-form-item label="经停港" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入经停港"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="成交方式" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="成交方式" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex">
             <el-col :span="4">
             <el-form-item label="运费" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode"  />
            </el-form-item>
          </el-col>
          <el-col :span="4">
             <el-form-item  prop="postCode" style="margin-left:-120px">
              <el-input
                v-model="queryParams.postCode"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="4">
             <el-form-item label="保险费" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
             <el-form-item  prop="postCode" style="margin-left:-120px">
              <el-input
                v-model="queryParams.postCode"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
           <el-col :span="4">
             <el-form-item label="杂费" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-form-item prop="postCode" style="margin-left:-120px">
              <el-input v-model="queryParams.postCode"  />
            </el-form-item>
          </el-col>
          <el-col :span="4">
             <el-form-item  prop="postCode" style="margin-left:-120px">
              <el-input
                v-model="queryParams.postCode"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item prop="postCode" label="件数">
              <el-input v-model="queryParams.postCode"  />
            </el-form-item>
            </el-col>
        </el-row>

        <el-row type="flex" :gutter="10">
          <el-col :span="12">
             <el-form-item prop="postCode" label="包装种类">
              <el-input v-model="queryParams.postCode"  />
            </el-form-item>
            </el-col>
            <el-col :span="3" style="margin-left:0px">
              <el-button type="primary" size="medium">其 他 包 装</el-button>
          </el-col>
          <el-col :span="7" style="margin-left:-65px">
             <el-form-item label="毛重(KG)" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入毛重(KG)"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item label="净重(KG)" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="净重(KG)" />
            </el-form-item>
          </el-col>
        </el-row>

          <el-row type="flex">
             <el-col :span="6">
             <el-form-item label="贸易国别(地区)" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入贸易国别(地区)"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="集装箱数" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="集装箱数" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随附单证" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="随附单证" />
            </el-form-item>
          </el-col>
          </el-row>
          
          <el-row type="flex">
            <el-col :span="6">
               <el-form-item label="入境口岸" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="入境口岸" />
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货物存放地点" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="货物存放地点" />
            </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="启运港" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="启运港" />
            </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex">
            <el-col :span="7">
                <el-form-item label="报关单类型" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="报关单类型" />
            </el-form-item>
            </el-col>
            <el-col :span="19" style="margin-left:40px">
              <el-form-item label="备注" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="备注" />
            </el-form-item>
            </el-col>
            <el-col :span="5" style="margin-left:0px">
              <el-button type="primary" size="medium"> 其 他 事 项 确 认</el-button>
            </el-col>
           </el-row>

           <el-row type="flex" :gutter="20">
             <el-col :span="7" style="margin-left:230px" >
             <el-button type="info" icon="el-icon-sort" @click="hide" circle></el-button>
             </el-col>
             <el-col :span="21" style="margin-left:-150px">
              <el-form-item label="标记唛码" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="标记唛码" />
            </el-form-item>
            </el-col>
             <el-col :span="5" style="margin-left:50px">
              <el-button type="primary" size="medium">业 务 事 项</el-button>
            </el-col>
           </el-row>
           
           <el-row type="flex" :style="{display:bodyHide}">
             <el-col :span="12">
               <el-form-item label="检验检疫受理机关" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="检验检疫受理机关" />
            </el-form-item>
             </el-col>
             <el-col :span="4">
                <el-form-item label="企业资质" prop="postCode">
              <el-input v-model="queryParams.postCode"/>
            </el-form-item>
             </el-col>
             <el-col :span="6" style="margin-left:-150px">
                <el-form-item  prop="postCode">
              <el-input v-model="queryParams.postCode"/>
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
             <el-form-item label="领证机关" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="请输入领证机关"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="口岸检验检疫机关" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="口岸检验检疫机关" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="启运日期" prop="postCode">
              <el-date-picker
              width="100%"
                class="datePicker"
                v-model="dateTimeVal"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="B/L号" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="B/L号" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex" :style="{display:bodyHide}">
             <el-col :span="12">
             <el-form-item label="目的地检验检疫机关" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="13" style="margin-left:20px">
              <el-form-item label="关联号码及理由" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="关联号码及理由" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-left:-140px">
             <el-form-item label="" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="关联理由" />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:50px">
               <el-button type="primary" size="medium">使 用 人</el-button>
          </el-col>
        </el-row>
        
        <el-row type="flex" :gutter="10" :style="{display:bodyHide}">
             <el-col :span="12">
             <el-form-item label="原箱运输" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                clearable
                size="small"
              />
             </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-left:0px">
              <el-form-item label="特殊业务标识" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="关联号码及理由" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-left:-90px">
             <el-form-item label="所需单证" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="关联理由" />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:0px">
               <el-button type="primary" size="medium">检 验 检 疫 签 证 申 报 要 素</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 提运单信息 -->
    <!-- <el-card class="mb20">
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
        <el-table-column prop="num" label="序号" min-width="120"/>
        <el-table-column prop="num" label="提(运)单号" min-width="120"/>
        <el-table-column prop="num" label="海关货物通关代码" min-width="150" />
        <el-table-column prop="num" label="货物总件数" min-width="120"/>
        <el-table-column prop="num" label="货物总毛重(kg)" min-width="120"/>
        <el-table-column prop="num" label="货物价值" min-width="120"/>
        <el-table-column prop="num" label="收货人名称" min-width="120"/>
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
            <el-form-item label="提（运）单号" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="提（运）单号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="变更原因" prop="postCode" >
              <el-button type="primary" size="mini" @click="detailVisible = true">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输条款" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="运输条款"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运费支付方法" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="运费支付方法"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="海关货物通关代码" prop="postCode" >
              <el-input
                @focus="dialogTableVisible2 = true"
                v-model="queryParams.postCode"
                placeholder="海关货物通关代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="跨境指运地" prop="postCode" >
              <el-date-picker
                class="datePicker"
                v-model="dateTimeVal"
                type="datetime"
                placeholder="选择日期时间" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物总件数" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="货物总件数"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包装种类" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="包装种类"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="货物体积(M3)" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="货物体积(M3)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物总毛重(KG)	" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="货物总毛重(KG)	"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货物价值" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="货物价值"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="金额类型	" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="金额类型	"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="拆箱人代码" prop="postCode" >
              <el-input
                v-model="queryParams.postCode"
                placeholder="拆箱人代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="途径国家或地区" prop="postCode" >
              <el-button type="primary" size="mini">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货人信息" prop="postCode" >
              <el-button type="primary" size="mini">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发货人信息" prop="postCode" >
              <el-button type="primary" size="mini">详细</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="通知人信息" prop="postCode" >
              <el-button type="primary" size="mini">详细</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="危险品联系人信息" prop="postCode" >
              <el-button type="primary" size="mini">详细</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>-->
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
        <el-table-column prop="num" label="规格" min-width="120" />
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
      <el-form :model="queryParams" ref="queryForm" label-width="160px">
        <el-row :gutter="10">
          <el-col :span="5" >
            <el-form-item label="项号" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="项号" clearable size="small"  />
            </el-form-item>
          </el-col>
          <el-col :span="5" >
            <el-form-item label="备案序号" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="备案序号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5" >
            <el-form-item label="商品编号" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="商品编号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item  label="检验检疫名称" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="检验检疫名称" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
             <el-button icon="el-icon-more-outline" type="info" circle></el-button>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="商品名称" prop="postCode">
               <el-input v-model="queryParams.postCode" placeholder="" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="危险品编号" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="危险品编号" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10">
          <el-col :span="5">
             <el-form-item label="成交数量" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="成交数量" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
             <el-form-item label="成交计量单位" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="成交计量单位" clearable size="small" />
            </el-form-item>
          </el-col>
           <el-col :span="5" >
             <el-form-item label="单价" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="单价" clearable size="small" />
            </el-form-item>
          </el-col>
           <el-col :span="5" style="margin-left:-90px">
             <el-form-item label="总价" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="总价" clearable size="small" />
            </el-form-item>
          </el-col>
           <el-col :span="4" style="margin-left:-40px">
             <el-form-item label="币制" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="币制" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex" :gutter="10">
          <el-col :span="5">
             <el-form-item label="法定第一数量" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="法定第一数量" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
             <el-form-item label="法定第一计量单位" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="法定第一计量单位" clearable size="small" />
            </el-form-item>
          </el-col>
           <el-col :span="5" >
             <el-form-item label="加工成品单耗版本号" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="加工成品单耗版本号" clearable size="small" />
            </el-form-item>
          </el-col>
           <el-col :span="5" style="margin-left:-90px">
             <el-form-item label="货号" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="货号" clearable size="small" />
            </el-form-item>
          </el-col>
           <el-col :span="4" style="margin-left:-40px">
             <el-form-item label="最终目的国(地区)" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="最终目的国(地区)" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10">
          <el-col :span="5">
             <el-form-item label="法定第二数量" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="法定第二数量" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
             <el-form-item label="法定第二计量单位" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="法定第二计量单位" clearable size="small" />
            </el-form-item>
          </el-col>
           <el-col :span="9" >
             <el-form-item label="原产国(地区)" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="原产国(地区)" clearable size="small" />
            </el-form-item>
          </el-col>
           <el-col :span="4" style="margin-left:-60px">
             <el-form-item label="原产地区" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="原产地区" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" >
           <el-col :span="1" style="margin-left:230px" >
             <el-button type="info" icon="el-icon-sort" @click="List1" circle></el-button>
             </el-col>
             <el-col :span="8" style="margin-left:40px" >
             <el-form-item label="境内目的地" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="境内目的地代码" clearable size="small" />
            </el-form-item>
          </el-col>
           <el-col :span="8" style="margin-left:-160px" >
             <el-form-item label="" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="境内目的地代码" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:-30px">
             <el-form-item label="征免方式" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="征免方式" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="10" :style="{display:List1Hide}">
          <el-col :span="18">
               <el-form-item label="检验检疫货物规格" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="检验检疫货物规格" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="1">
             <el-button icon="el-icon-more-outline" type="info" circle></el-button>
          </el-col>
          <el-col :span="4" style="margin-left:50px">
              <el-button type="primary" size="medium">业 务 事 项</el-button>
            </el-col>
        </el-row>

        <el-row type="flex" :gutter="10" :style="{display:List1Hide}">
          <el-col :span="9">
            <el-form-item label="货物属性" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="货物属性" clearable size="small" />
            </el-form-item>
          </el-col>
           <el-col :span="1">
             <el-button icon="el-icon-more-outline" type="info" circle></el-button>
          </el-col>
          <el-col :span="9" >
             <el-form-item label="用途" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="用途" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:50px">
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
        <el-table-column prop="num" label="序号" min-width="120" />
        <el-table-column prop="num" label="集装箱（器）编号" min-width="120" />
        <el-table-column prop="num" label="尺寸和类型" min-width="150" />
        <el-table-column prop="num" label="来源代码" min-width="120" />
        <el-table-column prop="num" label="重箱或空箱标识" min-width="120" />
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
            <el-form-item label="集装箱（器）编号" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="集装箱（器）编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="尺寸和类型" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="尺寸和类型" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="来源代码" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="来源代码" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="重箱或空箱标识" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="重箱或空箱标识"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <depParaList :tableVisible="dialogTableVisible" @choose="choose" @close="close"></depParaList>
    <depParaList2 :tableVisible="dialogTableVisible2" @choose="choose2" @close="close2"></depParaList2>
    <el-dialog title="通知人信息" :visible.sync="detailVisible">
      <el-form :model="queryParams" class="mb20" ref="queryForm" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="通知人代码" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="通知人代码" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通知人名称" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="通知人名称" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="通知人地址(街道,邮箱)" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="通知人地址(街道,邮箱)"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="联系号码" prop="postCode">
              <el-input v-model="queryParams.postCode" placeholder="联系号码" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通讯方式类别代码" prop="postCode">
              <el-input
                v-model="queryParams.postCode"
                placeholder="通讯方式类别代码"
                clearable
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
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
          >保存</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="btnDisable.delBtn"
            @click="handleDelete"
          >删除</el-button>
        </el-row>
      </el-form>
      <el-table
        class="mb20"
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="55" />
        <el-table-column prop="num" label="序号" min-width="120" />
        <el-table-column prop="num" label="联系号码" min-width="120" />
        <el-table-column prop="num" label="海关货物通关代码" min-width="150" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import depParaList from "./../components/depParaList";
import depParaList2 from "./../components/depParaList2";
export default {
  components: { depParaList, depParaList2 },
  data() {
    return {
      //表头隐藏显示
      bodyHide:'',
      //list隐藏显示
      List1Hide:'',
      detailVisible: false,
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
      statusOptions: [],
      dateTimeVal: "",
      data: [],
    };
  },
  mounted() {
    // 初始化
    this.init();
    //表头隐藏部分 默认不显示
    this.bodyHide='none';
    //List1 隐藏部分 默认不显示
    this.List1Hide='none';
  },
  methods: {
    //表头隐藏显示切换
     hide(){
       if (this.bodyHide=='') {
         this.bodyHide='none';
       } else {
         this.bodyHide='';
       }
    },
    //List1 隐藏显示切换
    List1(){
       if (this.List1Hide=='') {
         this.List1Hide='none';
       } else {
         this.List1Hide='';
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