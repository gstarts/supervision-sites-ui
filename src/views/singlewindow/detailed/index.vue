<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        :disabled="btnDisable.addBtn"
        @click="headHandleAdd"        
      >新增</el-button>
      <el-button
        type="success"
        icon="el-icon-edit"
        size="mini"
        :disabled="btnDisable.saveBtn"
        @click="nemsInvtHeadTypeSave"
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
      >导入</el-button>
        <el-button type="danger" icon="el-icon-thumb" size="mini" :disabled="btnDisable.repBtn" @click="handleReport" style="float:right">申报</el-button>
      <!-- <el-button type="primary" icon="el-icon-document-copy" size="mini" :disabled="btnDisable.copyBtn" @click="handleCopy">复制</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="mini" :disabled="btnDisable.refBtn" @click="handleRefresh">刷新</el-button>-->
    </div>
    <!-- 基本信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>表头</span>
      </div>
      <el-form :model="nemsInvtHeadType" ref="nemsInvtHeadType" label-width="160px">
        <el-row type="flex">
          <el-col :span="5">
            <el-form-item label="预录入统一编号" prop="seqNo">
              <el-input
                v-model="nemsInvtHeadType.seqNo"
                placeholder="请输入预录入统一编号"
                clearable
                size="mini"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
         

          <el-col :span="6">
            <el-form-item label="清单编号" prop="bondInvtNo">
              <el-input
                v-model="nemsInvtHeadType.bondInvtNo"
                placeholder="清单编号"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="清单类型" prop="invtType">
              <!-- <el-input v-model="nemsInvtHeadType.invtType" placeholder="清单类型" clearable size="mini" /> -->
              <el-select v-model="nemsInvtHeadType.invtType" placeholder="请选择清单类型" size="mini">
                <el-option
                  v-for="dict in invtTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                  
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手(账)册编号" prop="putrecNo">
              <el-input v-model="nemsInvtHeadType.putrecNo" placeholder="手(账)册编号" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="7">
            <el-form-item label="经营单位编码" prop="bizopEtpsno">
              <el-input
                v-model="nemsInvtHeadType.bizopEtpsno"
                placeholder="请输入经营单位编码"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
         <el-col :span="1" style="margin-top : 5px">
            <el-button size="mini" style="background-color:#00BFFF;color:#FFFFFF">刷新</el-button>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营单位社会信用代码" prop="bizopEtpsSccd">
              <el-input
                v-model="nemsInvtHeadType.bizopEtpsSccd"
                placeholder="经营单位社会信用代码"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营单位名称" prop="bizopEtpsNm">
              <el-input
                v-model="nemsInvtHeadType.bizopEtpsNm"
                placeholder="经营单位名称"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="7">
            <el-form-item label="加工单位编码" prop="rcvgdEtpsno">
              <el-input
                v-model="nemsInvtHeadType.rcvgdEtpsno"
                placeholder="请输入加工单位编码"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="1" style="margin-top : 5px">
            <el-button size="mini" style="background-color:#00BFFF;color:#FFFFFF">刷新</el-button>
          </el-col>
          <el-col :span="8">
            <el-form-item label="加工单位社会信用代码" prop="rvsngdEtpsSccd">
              <el-input
                v-model="nemsInvtHeadType.rvsngdEtpsSccd"
                placeholder="加工单位社会信用代码"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="加工单位名称" prop="rcvgdEtpsNm">
              <el-input
                v-model="nemsInvtHeadType.rcvgdEtpsNm"
                placeholder="加工单位名称"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="7">
            <el-form-item label="申报单位编码" prop="dclEtpsno">
              <el-input
                v-model="nemsInvtHeadType.dclEtpsno"
                placeholder="请输入申报单位编码"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="1" style="margin-top : 5px">
            <el-button size="mini" style="background-color:#00BFFF;color:#FFFFFF">刷新</el-button>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申报单位社会信用代码" prop="dclEtpsSccd">
              <el-input
                v-model="nemsInvtHeadType.dclEtpsSccd"
                placeholder="申报单位社会信用代码"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申报单位名称" prop="dclEtpsNm">
              <el-input v-model="nemsInvtHeadType.dclEtpsNm" placeholder="申报单位名称" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="录入单位编码" prop="inputCode">
              <el-input
                v-model="nemsInvtHeadType.inputCode"
                placeholder="请输入录入单位编码"
                clearable
                size="mini"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入单位社会信用代码" prop="inputCreditCode">
              <el-input
                v-model="nemsInvtHeadType.inputCreditCode"
                placeholder="录入单位社会信用代码"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入单位名称" prop="inputName">
              <el-input
                v-model="nemsInvtHeadType.inputName"
                placeholder="录入单位名称"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="6">
            <el-form-item label="企业内部编号" prop="etpsInnerInvtNo">
              <el-input
                v-model="nemsInvtHeadType.etpsInnerInvtNo"
                placeholder="请输入企业内部编号"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申报类型" prop="dclTypecd">
              <el-input v-model="nemsInvtHeadType.dclTypecd" placeholder="申报类型" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="录入日期" prop="inputTime">
              <el-date-picker
                class="datePicker"
                v-model="nemsInvtHeadType.inputTime"
                type="datetime"
                size="mini"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="清单申报日期" prop="invtDclTime">
              <el-date-picker
                class="datePicker"
                v-model="nemsInvtHeadType.invtDclTime"
                type="datetime"
                size="mini"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="料件、成品标志" prop="mtpckEndprdMarkcd" size="mini">
              <!-- <el-input
                v-model="nemsInvtHeadType.mtpckEndprdMarkcd"
                placeholder="请输入料件、成品标志"
                clearable
                size="mini"
              ></el-input> -->

              <el-select v-model="nemsInvtHeadType.mtpckEndprdMarkcd" placeholder="请选择料件、成品标志">
                <el-option
                  v-for="dict in mtpckEndprdMarkcdOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监管方式" prop="supvModecd">
              <!-- <el-input v-model="nemsInvtHeadType.supvModecd" placeholder="监管方式" clearable size="mini" /> -->
              <el-select v-model="nemsInvtHeadType.supvModecd" placeholder="请选择监管方式" size="mini">
                <el-option
                  v-for="dict in supvModecdOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运输方式" prop="trspModecd">
              <!-- <el-input v-model="nemsInvtHeadType.trspModecd" placeholder="运输方式" clearable size="mini" /> -->
              <el-select v-model="nemsInvtHeadType.trspModecd" placeholder="请选择运输方式" size="mini">
                <el-option
                  v-for="dict in trspModecdOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
          </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="6">
            <el-form-item label="进境关别" prop="impexpPortcd" size="mini">
              <!-- <el-input
                v-model="nemsInvtHeadType.impexpPortcd"
                placeholder="请输入进境关别"
                clearable
                size="mini"
              ></el-input> -->
              <el-select v-model="nemsInvtHeadType.impexpPortcd" placeholder="请选择进境关别">
                <el-option
                  v-for="dict in impexpPortcdOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
          </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主管海关" prop="dclPlcCuscd">
              <!-- <el-input v-model="nemsInvtHeadType.dclPlcCuscd" placeholder="主管海关" clearable size="mini" /> -->
              <el-select v-model="nemsInvtHeadType.dclPlcCuscd" placeholder="请选择主管海关" size="mini">
                <el-option
                  v-for="dict in dclPlcCuscdOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>

            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核扣标志" prop="vrfdedMarkcd">
              <el-input
                v-model="nemsInvtHeadType.vrfdedMarkcd"
                placeholder="核扣标志"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="启运国(地区)" prop="stshipTrsarvNatcd">
              <el-select v-model="nemsInvtHeadType.stshipTrsarvNatcd" placeholder="请选择启运国(地区)" size="mini">
                <el-option
                  v-for="dict in stshipTrsarvNatcdOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
                </el-select>
              <!-- <el-input
                v-model="nemsInvtHeadType.stshipTrsarvNatcd"
                placeholder="启运国(地区)"
                clearable
                size="mini"
              /> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="清单进出卡口状态" prop="invtIochkptStucd">
              <el-input
                v-model="nemsInvtHeadType.invtIochkptStucd"
                placeholder="清单进出卡口状态"
                clearable
                size="mini"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申报表编号" prop="applyNo">
              <el-input v-model="nemsInvtHeadType.applyNo" placeholder="申报表编号" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流转类型" prop="listType">
              <el-input v-model="nemsInvtHeadType.listType" placeholder="流转类型" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="6">
            <el-form-item label="报关标志" prop="dclcusFlag">
              <!-- <el-input v-model="nemsInvtHeadType.dclcusFlag" placeholder="报关标志" clearable size="mini"></el-input> -->

              <el-select v-model="nemsInvtHeadType.dclcusFlag" placeholder="请选择报关标志" size="mini">
                <el-option
                  v-for="dict in dclcusFlagOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否系统生成报关单" prop="genDecFlag">
              <!-- <el-input
                v-model="nemsInvtHeadType.genDecFlag"
                placeholder="是否系统生成报关单"
                clearable
                size="mini"
              /> -->
              <el-select v-model="nemsInvtHeadType.genDecFlag" placeholder="请选择是否系统生成报关单" size="mini">
                <el-option
                  v-for="dict in genDecFlagOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报关类型" prop="dclcusTypecd">
              <!-- <el-input
                v-model="nemsInvtHeadType.dclcusTypecd"
                placeholder="报关类型"
                clearable
                size="mini"
              /> -->
              <el-select v-model="nemsInvtHeadType.dclcusTypecd" placeholder="请选择报关类型">
                <el-option
                  v-for="dict in dclcusTypecdOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
                </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="报关单类型" prop="decType">
              <el-input v-model="nemsInvtHeadType.decType" placeholder="报关单类型" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="7">
            <el-form-item label="对应报关单编号" prop="entryNo">
              <el-input v-model="nemsInvtHeadType.entryNo" placeholder="对应报关单编号" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="对应报关单申报单位编码" prop="corrEntryDclEtpsNo" label-width="180px">
              <el-input
                v-model="nemsInvtHeadType.corrEntryDclEtpsNo"
                placeholder="对应报关单申报单位编码"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          
           <el-col :span="1" style="margin-top : 5px">
            <el-button size="mini" style="background-color:#00BFFF;color:#FFFFFF">刷新</el-button>
          </el-col>
          <el-col :span="8">
            <el-form-item label="对应报关单申报单位社会信用代码" prop="corrEntryDclEtpsSccd" label-width="230px">
              <el-input
                v-model="nemsInvtHeadType.corrEntryDclEtpsSccd"
                placeholder="对应报关单申报单位社会信用代码"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="24">
            <el-form-item label="对应报关单申报单位名称" prop="corrEntryDclEtpsNm" label-width="180px">
              <el-input
                v-model="nemsInvtHeadType.corrEntryDclEtpsNm"
                placeholder="请输入对应报关单申报单位名称"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="关联报关单编号" prop="rltEntryNo">
              <el-input
                v-model="nemsInvtHeadType.rltEntryNo"
                placeholder="请输入关联报关单编号"
                clearable
                size="mini"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联清单编号" prop="rltInvtNo">
              <el-input v-model="nemsInvtHeadType.rltInvtNo" placeholder="关联清单编号" clearable size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联手(账)册备案号" prop="rltPutrecNo">
              <el-input
                v-model="nemsInvtHeadType.rltPutrecNo"
                placeholder="关联手(账)册备案号"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="7">
            <el-form-item label="关联报关单境内收发货人编码" prop="rltEntryBizopEtpsno" label-width="200px">
              <el-input
                v-model="nemsInvtHeadType.rltEntryBizopEtpsno"
                placeholder="请输入关联报关单境内收发货人编码"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="margin-top : 5px">
            <el-button size="mini" style="background-color:#00BFFF;color:#FFFFFF">刷新</el-button>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="关联报关单境内收发货人社会信用代码"
              prop="rltEntryBizopEtpsSccd"
              label-width="250px"
            >
              <el-input
                v-model="nemsInvtHeadType.rltEntryBizopEtpsSccd"
                placeholder="关联报关单境内收发货人社会信用代码"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联报关单境内收发货人名称" prop="rltEntryBizopEtpsNm" label-width="250px">
              <el-input
                v-model="nemsInvtHeadType.rltEntryBizopEtpsNm"
                placeholder="关联报关单境内收发货人名称"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="7">
            <el-form-item
              label="关联报关单生产销售(消费使用)单位编码"
              prop="rltEntryRcvgdEtpsno"
              label-width="260px"
            >
              <el-input
                v-model="nemsInvtHeadType.rltEntryRcvgdEtpsno"
                placeholder="请输入关联报关单生产销售(消费使用)单位编码"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="margin-top : 5px">
            <el-button size="mini" style="background-color:#00BFFF;color:#FFFFFF">刷新</el-button>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="关联报关单生产销售(消费使用)社会信用代码"
              prop="rltEntryRvsngdEtpsSccd"
              label-width="290px"
            >
              <el-input
                v-model="nemsInvtHeadType.rltEntryRvsngdEtpsSccd"
                placeholder="关联报关单生产销售(消费使用)社会信用代码"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="关联报关单生产销售(消费使用)单位名称"
              prop="rltEntryRcvgdEtpsNm"
              label-width="260px"
            >
              <el-input
                v-model="nemsInvtHeadType.rltEntryRcvgdEtpsNm"
                placeholder="关联报关单生产销售(消费使用)单位名称"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="7">
            <el-form-item label="关联报关单申报单位编码" prop="rltEntryDclEtpsno" label-width="180px">
              <el-input
                v-model="nemsInvtHeadType.rltEntryDclEtpsno"
                placeholder="请输入关联报关单申报单位编码"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="margin-top : 5px">
            <el-button size="mini" style="background-color:#00BFFF;color:#FFFFFF">刷新</el-button>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联报关单申报单位社会信用代码" prop="rltEntryDclEtpsSccd" label-width="230px">
              <el-input
                v-model="nemsInvtHeadType.rltEntryDclEtpsSccd"
                placeholder="关联报关单申报单位社会信用代码"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联报关单申报单位名称" prop="rltEntryDclEtpsNm" label-width="180px">
              <el-input
                v-model="nemsInvtHeadType.rltEntryDclEtpsNm"
                placeholder="关联报关单申报单位名称"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="报关单申报日期" prop="entryDclTime">
              <el-input
                v-model="nemsInvtHeadType.entryDclTime"
                placeholder="请输入报关单申报日期"
                clearable
                size="mini"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注" prop="rmk">
              <el-input v-model="nemsInvtHeadType.rmk" placeholder="备注" clearable size="mini" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="报关单统一编号" prop="decNo">
              <el-input
                v-model="otherForm.decNo"
                placeholder="请输入报关单统一编号"
                clearable
                size="mini"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="报关单草稿(备注)" prop="decRmk">
              <el-input
                v-model="otherForm.decRmk"
                placeholder="报关单草稿(备注"
                clearable
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>


    <!-- 表体信息 -->
    <el-card class="mb20">
      <div slot="header" class="clearfix">
        <span>表体信息</span>
      </div>

      <el-form :model="bodyForm" ref="bodyForm" label-width="160px">
        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="序号" prop="gdsSeqno">
              <el-input
                v-model="bodyForm.gdsSeqno"
                placeholder="序号"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="备案序号" prop="putrecSeqno">
              <el-input
                v-model="bodyForm.putrecSeqno"
                placeholder="备案序号"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品料号" prop="gdsMtno">
              <el-input
                v-model="bodyForm.gdsMtno"
                placeholder="商品料号"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="报关单商品序号" prop="entryGdsSeqno">
              <el-input
                v-model="bodyForm.entryGdsSeqno"
                placeholder="报关单商品序号"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="流转申报表序号" prop="applyTbSeqno">
              <el-input
                v-model="bodyForm.applyTbSeqno"
                placeholder="流转申报表序号"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品编码" prop="gdecd">
              <el-input
                v-model="bodyForm.gdecd"
                placeholder="商品编码"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="商品名称" prop="gdsNm">
              <el-input
                v-model="bodyForm.gdsNm"
                placeholder="商品名称"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="规格型号" prop="gdsspcfModelDesc">
              <el-input
                v-model="bodyForm.gdsspcfModelDesc"
                placeholder="规格型号"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="币制" prop="dclCurrcd">
              <el-input
                v-model="bodyForm.dclCurrcd"
                placeholder="币制"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="申报计量单位" prop="dclUnitcd">
              <el-input
                v-model="bodyForm.dclUnitcd"
                placeholder="申报计量单位"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="法定计量单位" prop="lawfUnitcd">
              <el-input
                v-model="bodyForm.lawfUnitcd"
                placeholder="法定计量单位"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定第二计量单位" prop="secdLawfUnitcd">
              <el-input
                v-model="bodyForm.secdLawfUnitcd"
                placeholder="法定第二计量单位"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="申报数量" prop="dclQty">
              <el-input
                v-model="bodyForm.dclQty"
                placeholder="申报数量"
                clearable
                size="mini"
              
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="法定数量" prop="lawfQty">
              <el-input
                v-model="bodyForm.lawfQty"
                placeholder="法定数量"
                clearable
                size="mini"
              
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第二法定数量" prop="secdLawfQty">
              <el-input
                v-model="bodyForm.secdLawfQty"
                placeholder="第二法定数量"
                clearable
                size="mini"
             
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="企业申报单价" prop="dclUprcAmt">
              <el-input
                v-model="bodyForm.dclUprcAmt"
                placeholder="企业申报单价"
                clearable
                size="mini"
              
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="企业申报总价" prop="dclTotalAmt">
              <el-input
                v-model="bodyForm.dclTotalAmt"
                placeholder="企业申报总价"
                clearable
                size="mini"
              
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原产国(地区)" prop="natcd">
              <el-input
                v-model="bodyForm.natcd"
                placeholder="原产国(地区)"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="重量比例因子" prop="wtSfVal">
              <el-input
                v-model="bodyForm.wtSfVal"
                placeholder="重量比例因子"
                clearable
                size="mini"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="第一比例因子" prop="fstSfVal">
              <el-input
                v-model="bodyForm.fstSfVal"
                placeholder="第一比例因子"
                clearable
                size="mini"
            
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第二比例因子" prop="secdSfVal">
              <el-input
                v-model="bodyForm.secdSfVal"
                placeholder="第二比例因子"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="毛重" prop="grossWt">
              <el-input
                v-model="bodyForm.grossWt"
                placeholder="毛重"
                clearable
                size="mini"
             
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="净重" prop="netWt">
              <el-input
                v-model="bodyForm.netWt"
                placeholder="净重"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最终目的国(地区)" prop="destinationNatcd">
              <el-input
                v-model="bodyForm.destinationNatcd"
                placeholder="最终目的国(地区)"
                clearable
                size="mini"
              
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="征免方式" prop="lvyrlfModecd">
              <el-input
                v-model="bodyForm.lvyrlfModecd"
                placeholder="征免方式"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="单耗版本号" prop="ucnsVerno">
              <el-input
                v-model="bodyForm.ucnsVerno"
                placeholder="单耗版本号"
                clearable
                size="mini"
             
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="自动备案序号" prop="param3">
              <el-input
                v-model="otherForm.param3"
                placeholder="自动备案序号"
                clearable
                size="mini"
              
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top : -18px">
          <el-col :span="8">
            <el-form-item label="修改标志" prop="modfMarkcd">
              <el-input
                v-model="bodyForm.modfMarkcd"
                placeholder="修改标志"
                clearable
                size="mini"
              
              />
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="备注" prop="rmk">
              <el-input
                v-model="bodyForm.rmk"
                placeholder="备注"
                clearable
                size="mini"
               
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb20">
          <el-col>
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              :disabled="btnDisable.addBtn"
              @click="handleBodyAdd"
            >新增</el-button>
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="btnDisable.saveBtn"
              @click="handleChange($event,'body')"
            >修改</el-button>            
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="btnDisable.delBtn"
              @click="handleDelete($event,'body')"
            >删除</el-button>
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
            >商品快速查询</el-button>
            <span>&nbsp;&nbsp;注：对选中数据修改完成之后请点击左侧“保存”按钮</span>
          </el-col>
        </el-row>

        <el-table
          class="mb20"
          ref="nemsInvtListType"
          :data="nemsInvtListType"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          :cell-style="rowClass"
          @row-click='bodyFormClick'
          :row-class-name="tableRowClassName"
          @selection-change="SelectionChange"
        >
          <el-table-column type="selection" min-width="55" />
          <el-table-column prop="gdsSeqno" label="序号" min-width="60" />
          <el-table-column prop="putrecSeqno" label="备案序号" min-width="80" />
          <el-table-column prop="gdsMtno" label="商品料号" min-width="80" />
          <el-table-column prop="entryGdsSeqno" label="报关单商品序号" min-width="120" />
          <el-table-column prop="applyTbSeqno" label="流转申报表序号" min-width="120" />
          <el-table-column prop="gdecd" label="商品编码" min-width="80" />
          <el-table-column prop="gdsNm" label="商品名称" min-width="80" />
          <el-table-column prop="gdsspcfModelDesc" label="规格型号" min-width="80" />
          <el-table-column prop="dclUnitcd" label="申报计量单位" min-width="100" />
          <el-table-column prop="lawfUnitcd" label="法定计量单位" min-width="100" />
          <el-table-column prop="secdLawfUnitcd" label="法定第二计量单位" min-width="130" />
          <el-table-column prop="natcd" label="原产国(地区)" min-width="100" />
          <el-table-column prop="destinationNatcd" label="最终目的国(地区)" min-width="120" />
          <el-table-column prop="dclUprcAmt" label="企业申报单价" min-width="100" />
          <el-table-column prop="dclTotalAmt" label="企业申报总价" min-width="100" />
          <el-table-column prop="dclCurrcd" label="币制" min-width="60" />
          <el-table-column prop="modfMarkcd" label="修改标志" min-width="80" />
          <el-table-column prop="lawfQty" label="法定数量" min-width="80" />
          <el-table-column prop="secdLawfQty" label="第二法定数量" min-width="100" />
          <el-table-column prop="wtSfVal" label="重量比例因子" min-width="100" />
          <el-table-column prop="fstSfVal" label="第一比例因子" min-width="100" />
          <el-table-column prop="secdSfVal" label="第二比例因子" min-width="100" />
          <el-table-column prop="dclQty" label="申报数量" min-width="80" />
          <el-table-column prop="grossWt" label="毛重" min-width="60" />
          <el-table-column prop="netWt" label="净重" min-width="60" />
          <el-table-column prop="lvyrlfModecd" label="征免方式" min-width="80" />
          <el-table-column prop="ucnsVerno" label="单耗版本号" min-width="100" />
          <el-table-column prop="clyMarkcd" label="归类标志" min-width="80" />
          <el-table-column prop="param3" label="自动备案序号" min-width="120" />
          <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleBodyDelete(scope.$index,scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column> -->
        </el-table>
        <!-- <el-pagination
          class="right mb20"
          background
          layout="prev, pager, next"
          :current-page="page.num"
          :total="page.total"
          :page-size="page.size"
          @current-change="currentChange"
        /> -->

        <!-- <el-card class="mb20">
          <span>报关单草稿</span>
          <span
            style="color: red; font-size:13px;"
          >&nbsp;&nbsp;&nbsp;&nbsp; 重要提示：登录 货物申报系统 ，进入 货物申报 - 数据查询/统计 - 报关数据查询 界面，输入报关单统一编号“点击查询”即可调出报关单数据</span>
          <el-table
            class="mb20"
            ref="multipleTable"
            :data="data"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" min-width="55" />
            <el-table-column prop="decNo" label="报关单统一编号" min-width="120" />
            <el-table-column prop="entryGdsSeqno" label="报关单商品序号" min-width="120" />
            <el-table-column prop="gdecd" label="商品编码" min-width="80" />
            <el-table-column prop="gdsNm" label="商品名称" min-width="120" />
            <el-table-column prop="gdsspcfModelDesc" label="规格型号" min-width="120" />
            <el-table-column prop="dclQty" label="申报数量" min-width="80" />
            <el-table-column prop="dclUprcAmt" label="申报单价" min-width="80" />
            <el-table-column prop="dclCurrcd" label="申报币制" min-width="80" />
            <el-table-column prop="dclUnitcd" label="申报计量单位" min-width="100" />
            <el-table-column prop="lawfUnitcd" label="法定计量单位" min-width="100" />
            <el-table-column prop="secdLawfUnitcd" label="法定第二计量单位" min-width="130" />
            <el-table-column prop="natcd" label="原产国(地区)" min-width="100" />
            <el-table-column prop="destinationNatcd" label="最终目的国(地区)" min-width="120" />
            <el-table-column prop="lawfQty" label="法定数量" min-width="100" />
            <el-table-column prop="secdLawfQty" label="第二法定数量" min-width="100" />
            <el-table-column prop="ciqCode" label="检验检疫编码" min-width="100" />
            <el-table-column prop="declGoodsEname" label="商品英文名称" min-width="100" />
            <el-table-column prop="origPlaceCode" label="原产地区代码" min-width="100" />
            <el-table-column prop="purpose" label="用途代码" min-width="100" />
            <el-table-column prop="prodValidDt" label="产品有效期" min-width="100" />
            <el-table-column prop="prodQgp" label="产品保质期" min-width="100" />
            <el-table-column prop="goodsAttr" label="货物属性代码" min-width="100" />
            <el-table-column prop="stuff" label="成份/原料/组份" min-width="120" />
            <el-table-column prop="unCode" label="UN编码" min-width="80" />
            <el-table-column prop="dangName" label="危险货物名称" min-width="100" />
            <el-table-column prop="dangPackType" label="危包类别" min-width="80" />
            <el-table-column prop="dangPackSpec" label="危包规格" min-width="100" />
            <el-table-column prop="engManEntCnm" label="境外生产企业名称" min-width="140" />
            <el-table-column prop="noDangFlag" label="非危险化学品" min-width="120" />
            <el-table-column prop="destCode" label="目的地代码" min-width="100" />
            <el-table-column prop="goodsSpec" label="检验检疫货物规格" min-width="130" />
            <el-table-column prop="goodsModel" label="货物型号" min-width="80" />
            <el-table-column prop="goodsBrand" label="货物品牌" min-width="80" />
            <el-table-column prop="produceDate" label="生产日期" min-width="80" />
            <el-table-column prop="prodBatchNo" label="生产批号" min-width="100" />
            <el-table-column prop="districtCode" label="境内目的地/境内货源地" min-width="160" />
            <el-table-column prop="ciqName" label="检验检疫名称" min-width="120" />
            <el-table-column prop="mnufctrRegno" label="生产单位注册号" min-width="120" />
            <el-table-column prop="mnufctrRegName" label="生产单位名称" min-width="120" />
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
        </el-card> -->

        <!-- <el-card class="mb20">
          <span>报关单表头其他字段提单号</span>

          <el-form :model="nemsInvtDecHeadType" ref="nemsInvtDecHeadType" label-width="160px">
            <el-row type="flex" style="margin-top : 10px">
              <el-col :span="4.8">
                <el-form-item label="提单号" prop="billNo">
                  <el-input
                    v-model="nemsInvtDecHeadType.billNo"
                    placeholder="提单号"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="合同号" prop="contrNo">
                  <el-input
                    v-model="nemsInvtDecHeadType.contrNo"
                    placeholder="合同号"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4.8">
                <el-form-item label="征免性质" prop="cutMode">
                  <el-input
                    v-model="nemsInvtDecHeadType.cutMode"
                    placeholder="征免性质"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="成交方式" prop="transMode">
                  <el-input
                    v-model="nemsInvtDecHeadType.transMode"
                    placeholder="成交方式"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="单据类型" prop="type">
                  <el-input
                    v-model="nemsInvtDecHeadType.type"
                    placeholder="单据类型"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top : -18px">
              <el-col :span="4.8">
                <el-form-item label="运费币制" prop="feeCurr">
                  <el-input
                    v-model="nemsInvtDecHeadType.feeCurr"
                    placeholder="运费币制"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="运费标记" prop="feeMark">
                  <el-input
                    v-model="nemsInvtDecHeadType.feeMark"
                    placeholder="运费标记"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4.8">
                <el-form-item label="运费/率" prop="feeRate">
                  <el-input
                    v-model="nemsInvtDecHeadType.feeRate"
                    placeholder="运费/率"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="毛重" prop="grossWet">
                  <el-input
                    v-model="nemsInvtDecHeadType.grossWet"
                    placeholder="毛重"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="净重" prop="netWt">
                  <el-input
                    v-model="nemsInvtDecHeadType.netWt"
                    placeholder="净重"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top : -18px">
              <el-col :span="4.8">
                <el-form-item label="保险费币制" prop="insurCurr">
                  <el-input
                    v-model="nemsInvtDecHeadType.insurCurr"
                    placeholder="保险费币制"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="保险费标记" prop="insurMark">
                  <el-input
                    v-model="nemsInvtDecHeadType.insurMark"
                    placeholder="保险费标记"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4.8">
                <el-form-item label="保险费/率" prop="insurRate">
                  <el-input
                    v-model="nemsInvtDecHeadType.insurRate"
                    placeholder="保险费/率"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="包装种类" prop="wrapType">
                  <el-input
                    v-model="nemsInvtDecHeadType.wrapType"
                    placeholder="包装种类"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="件数" prop="packNo">
                  <el-input
                    v-model="nemsInvtDecHeadType.packNo"
                    placeholder="件数"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top : -18px">
              <el-col :span="4.8">
                <el-form-item label="杂费币制" prop="otherCurr">
                  <el-input
                    v-model="nemsInvtDecHeadType.otherCurr"
                    placeholder="杂费币制"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="杂费标志" prop="otherMark">
                  <el-input
                    v-model="nemsInvtDecHeadType.otherMark"
                    placeholder="杂费标志"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4.8">
                <el-form-item label="杂费/率" prop="otherRate">
                  <el-input
                    v-model="nemsInvtDecHeadType.otherRate"
                    placeholder="杂费/率"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="许可证编号" prop="licenseNo">
                  <el-input
                    v-model="nemsInvtDecHeadType.licenseNo"
                    placeholder="许可证编号"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="4.8">
                <el-form-item label="承诺事项" prop="promiseItems">
                  <el-input
                    v-model="nemsInvtDecHeadType.promiseItems"
                    placeholder="承诺事项"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top : -18px">
              <el-col :span="6">
                <el-form-item label="贸易国别" prop="tradeAreaCode">
                  <el-input
                    v-model="nemsInvtDecHeadType.tradeAreaCode"
                    placeholder="贸易国别"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="启运港代码" prop="despPortCode">
                  <el-input
                    v-model="nemsInvtDecHeadType.despPortCode"
                    placeholder="启运港代码"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经停港/指运港" prop="distinatePort">
                  <el-input
                    v-model="nemsInvtDecHeadType.distinatePort"
                    placeholder="经停港/指运港"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="存放地点" prop="goodsPlace">
                  <el-input
                    v-model="nemsInvtDecHeadType.goodsPlace"
                    placeholder="存放地点"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top : -18px">
              <el-col :span="6">
                <el-form-item label="运输工具代码及名称" prop="trafName">
                  <el-input
                    v-model="nemsInvtDecHeadType.trafName"
                    placeholder="运输工具代码及名称"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="入境/离境口岸代码" prop="entryPortCode">
                  <el-input
                    v-model="nemsInvtDecHeadType.entryPortCode"
                    placeholder="入境/离境口岸代码"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="境外发货人代码" prop="overseasConsignorCode">
                  <el-input
                    v-model="nemsInvtDecHeadType.overseasConsignorCode"
                    placeholder="境外发货人代码"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="境外发货人名称(外文)" prop="overseasConsignorEname">
                  <el-input
                    v-model="nemsInvtDecHeadType.overseasConsignorEname"
                    placeholder="境外发货人名称(外文)"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top : -18px">
              <el-col :span="6">
                <el-form-item label="境外收发货人名称" prop="overseasConsignorCname">
                  <el-input
                    v-model="nemsInvtDecHeadType.overseasConsignorCname"
                    placeholder="境外收发货人名称"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="境外收发货人地址" prop="overseasConsignorAddr">
                  <el-input
                    v-model="nemsInvtDecHeadType.overseasConsignorAddr"
                    placeholder="境外收发货人地址"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="境外收货人编码" prop="overseasConsigneeCode">
                  <el-input
                    v-model="nemsInvtDecHeadType.overseasConsigneeCode"
                    placeholder="境外收货人编码"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="境外收货人名称(外文)" prop="overseasConsigneeEname">
                  <el-input
                    v-model="nemsInvtDecHeadType.overseasConsigneeEname"
                    placeholder="境外收货人名称(外文)"
                    clearable
                    size="mini"
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card> -->

        <el-card class="mb20">
          <span>随附单据</span>
          <el-form :model="billForm" ref="billForm" label-width="160px">
            <el-row type="flex" style="margin-top : 10px">
              <el-col :span="8">
                <el-form-item label="业务单证类型" prop="blsType">
                  <el-input
                    v-model="billForm.blsType"
                    placeholder="业务单证类型"
                    clearable
                    size="mini"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="业务单证统一编号" prop="blsNo">
                  <el-input
                    v-model="billForm.blsNo"
                    placeholder="业务单证统一编号"
                    clearable
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上传人IC卡号" prop="icCardNo">
                  <el-input
                    v-model="billForm.icCardNo"
                    placeholder="上传人IC卡号"
                    clearable
                    size="mini"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top : -18px">
              <el-col :span="8">
                <el-form-item label="变更/修改次数" prop="chgTmsCnt">
                  <el-input
                    v-model="billForm.chgTmsCnt"
                    placeholder="变更/修改次数"
                    clearable
                    size="mini"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="随附单据格式" prop="acmpFormFmt">
                  <el-input
                    v-model="billForm.acmpFormFmt"
                    placeholder="随附单据格式"
                    clearable
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="随附单据类型" prop="acmpFormTypeCD">
                  <el-input
                    v-model="billForm.acmpFormTypeCD"
                    placeholder="随附单据类型"
                    clearable
                    size="mini"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row type="flex" style="margin-top : -18px">
              <el-col :span="8">
                <el-form-item label="随附单据编号" prop="acmpFormNo">
                  <el-input
                    v-model="billForm.acmpFormNo"
                    placeholder="随附单据编号"
                    clearable
                    size="mini"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="随附单据所属单位" prop="transferTradeCode">
                  <el-input
                    v-model="billForm.transferTradeCode"
                    placeholder="随附单据所属单位"
                    clearable
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="1" style="margin-top : 5px">
            <el-button size="mini" style="background-color:#00BFFF;color:#FFFFFF">刷新</el-button>
          </el-col>
              <el-col :span="8">
                <el-form-item label="随附单据所属单位名称" prop="transferTradeName">
                  <el-input
                    v-model="otherForm.transferTradeName"
                    placeholder="随附单据所属单位名称"
                    clearable
                    size="mini"
                  />
                </el-form-item>
              </el-col>

              
            </el-row>

            <el-row type="flex" style="margin-top : -18px">
              <el-col :span="8">
                <el-form-item label="清单商品序号" prop="invtGdsSeqNo">
                  <el-input
                    v-model="billForm.invtGdsSeqNo"
                    placeholder="清单商品序号"
                    clearable
                    size="mini"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item label="随附单据文件" prop="fileName">
                  <el-input
                    v-model="queryParams.fileName"
                    placeholder="随附单据文件"
                    clearable
                    size="mini"
                  />
                  <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  accept=".pdf"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                  :beforeUpload="beforeAvatarUpload">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传pgf文件，且不超过4M</div>
                </el-upload>

                </el-form-item>
              </el-col>


           
            </el-row>
          </el-form>
          <div style="background-color:#FFA07A">
            <span style="color: red; font-size:13px;">
              提醒：
              <br />1、附件大小要求不超过4M，如果文件过大，建议拆分多个上传；
              <br />2、附件格式要求：PDF文件；
              <br />3、同一附件类型可以上传多个附件；
              <br />4、附件传输过程中会出现传输失败的情况，请随时关注附件传输状态；
              <br />5、要求上传复印件的可上传原件的扫描件。
            </span>
          </div>
        </el-card>

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
              type="primary"
              icon="el-icon-document-copy"
              size="mini"
              :disabled="btnDisable.copyBtn"
              @click="handleCopy"
            >上传</el-button>
            <el-button
              type="primary"
              icon="el-icon-refresh"
              size="mini"
              :disabled="btnDisable.refBtn"
              @click="handleRefresh"
            >下载</el-button>
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
          <el-table-column prop="acmpFormSeqNo" label="随附单据序号" min-width="80" />
          <el-table-column prop="acmpFormFileNm" label="随附单据文件名称" min-width="80" />
          <el-table-column prop="acmpFormTypeCD" label="随附单据类型" min-width="80" />
          <el-table-column prop="acmpFormNo" label="随附单据编号" min-width="80" />
          <el-table-column prop="acmpBlsStatus" label="随附单据状态" min-width="80" />
          <el-table-column prop="invtGdsSeqNo" label="清单商品序号" min-width="80" />
          <el-table-column prop="transferTradeCode" label="随附单据所属单位" min-width="80" />
          <el-table-column prop="icCardNo" label="上传人IC卡号" min-width="80" />
          <el-table-column prop="fileName" label="随附单据存储名" min-width="80" />
          <el-table-column prop="acmpFormFmtname" label="随附单据格式" min-width="80" />
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
      </el-form>
    </el-card>

    <depParaList :tableVisible="dialogTableVisible" @choose="choose" @close="close"></depParaList>
    <depParaList2 :tableVisible="dialogTableVisible2" @choose="choose2" @close="close2"></depParaList2>
    <!-- <noticeInfo :detailVisible='detailVisible' @close='detailVisible = false'></noticeInfo> -->
  </div>
</template>

<script>
import depParaList from "./depParaList";
import depParaList2 from "./depParaList2";
// import noticeInfo from './noticeInfo.vue';

import { add, getNemsinvtheadtype } from "@/api/detailed/head";
export default {
  components: { depParaList, depParaList2 },
  data() {
    return {
      detailVisible: false,
      gridData: [],
      //文件上传
      fileList:[],
      // 清单类型
      invtTypeOptions:[],
      
      //料件、成品标志
      mtpckEndprdMarkcdOptions:[],
      // 监管方式
      supvModecdOptions:[],
      //运输方式
      trspModecdOptions:[],
      // 表体数据
      nemsInvtListType:[],
      // 进境关闭
      impexpPortcdOptions:[],
      //主管海关
      dclPlcCuscdOptions:[],
      // 启运国(地区)
      stshipTrsarvNatcdOptions:[],
      //报关标志
      dclcusFlagOptions:[],
      // 是否系统生成报关单
      genDecFlagOptions:[],
      //报关类型
      dclcusTypecdOptions:[],
      // 当前操作表体数据
      bodyIndex: -1,
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
        seqNo: undefined,
        bondInvtNo: undefined,
        invtType: undefined,
        putrecNo: undefined,
        bizopEtpsno: undefined,
        bizopEtpsSccd: undefined,
        bizopEtpsNm: undefined,
        rcvgdEtpsno: undefined,
        rvsngdEtpsSccd: undefined,
        rcvgdEtpsNm: undefined,
        dclEtpsno: undefined,
        dclEtpsSccd: undefined,
        dclEtpsNm: undefined,
        inputCode: undefined,
        inputCreditCode: undefined,
        inputName: undefined,
        etpsInnerInvtNo: undefined,
        dclTypecd: undefined,
        inputTime: undefined,
        invtDclTime: undefined,
        mtpckEndprdMarkcd: undefined,
        supvModecd: undefined,
        trspModecd: undefined,
        impexpPortcd: undefined,
        dclPlcCuscd: undefined,
        vrfdedMarkcd: undefined,
        stshipTrsarvNatcd: undefined,
        invtIochkptStucd: undefined,
        applyNo: undefined,
        listType: undefined,
        dclcusFlag: undefined,
        genDecFlag: undefined,
        dclcusTypecd: undefined,
        decType: undefined,
        entryNo: undefined,
        corrEntryDclEtpsNo: undefined,
        corrEntryDclEtpsSccd: undefined,
        corrEntryDclEtpsNm: undefined,
        rltEntryNo: undefined,
        rltInvtNo: undefined,
        rltPutrecNo: undefined,
        rltEntryBizopEtpsno: undefined,
        rltEntryBizopEtpsSccd: undefined,
        rltEntryBizopEtpsNm: undefined,
        rltEntryRcvgdEtpsno: undefined,
        rltEntryRvsngdEtpsSccd: undefined,
        rltEntryRcvgdEtpsNm: undefined,
        rltEntryDclEtpsno: undefined,
        rltEntryDclEtpsSccd: undefined,
        rltEntryDclEtpsNm: undefined,
        entryDclTime: undefined,
        rmk: undefined,
      },

      // 表单参数
      form: {
        nemsInvtHeadType:{},
        nemsInvtListType:[],
        nemsInvtDecHeadType:{},
      } ,
      nemsInvtHeadType: {
          seqNo: '',
          bondInvtNo: '',
          invtType: '',
          putrecNo: '',
          bizopEtpsno: '',
          bizopEtpsSccd: '',
          bizopEtpsNm: '',
          rcvgdEtpsno: '',
          rvsngdEtpsSccd: '',
          rcvgdEtpsNm: '',
          dclEtpsno: '',
          dclEtpsSccd: '',
          dclEtpsNm: '',
          inputCode: '',
          inputCreditCode: '',
          inputName: '',
          etpsInnerInvtNo: '',
          dclTypecd: '',
          inputTime: '',
          invtDclTime: '',
          mtpckEndprdMarkcd: '',
          supvModecd: '',
          trspModecd: '',
          impexpPortcd: '',
          dclPlcCuscd: '',
          vrfdedMarkcd: '',
          stshipTrsarvNatcd: '',
          invtIochkptStucd: '',
          applyNo: '',
          listType: '',
          dclcusFlag: '',
          genDecFlag: '',
          dclcusTypecd: '',
          decType: '',
          entryNo: '',
          corrEntryDclEtpsNo: '',
          corrEntryDclEtpsSccd: '',
          corrEntryDclEtpsNm: '',
          rltEntryNo: '',
          rltInvtNo: '',
          rltPutrecNo: '',
          rltEntryBizopEtpsno: '',
          rltEntryBizopEtpsSccd: '',
          rltEntryBizopEtpsNm: '',
          rltEntryRcvgdEtpsno: '',
          rltEntryRvsngdEtpsSccd: '',
          rltEntryRcvgdEtpsNm: '',
          rltEntryDclEtpsno: '',
          rltEntryDclEtpsSccd: '',
          rltEntryDclEtpsNm: '',
          entryDclTime: '',
          rmk: '',
        },
        otherForm: {

        },
        bodyForm: {},

        nemsInvtDecHeadType: {
          billNo: undefined,
        },
        billForm:{

        },

      statusOptions: [],
      dateTimeVal: "",
      dateTimeValOne: "",
      // 已选择数据      
      selectBodyForm: [],
      data: [],
    };
  },
  mounted() {
    // 初始化
    this.init();
    const  id =this.$route.query.id
    if(id){
      this.query(id)
    }
    const t = this.$route.query.type
    if(t){
       this.btnDisable = {
        addBtn: true,
        saveBtn: true,
        delBtn: true,
        repBtn: true,
        copyBtn: true,
        refBtn: true,
      }
    }
   
     /**清单类型 */
    this.getDicts("station_enterprise_type").then((response) => {
      this.invtTypeOptions = response.data;
    });

    /**料件、成品标志 */
    this.getDicts("station_enterprise_type").then((response) => {
      this.mtpckEndprdMarkcdOptions = response.data;
    });

     /**监管方式 */
    this.getDicts("station_enterprise_type").then((response) => {
      this.supvModecdOptions = response.data;
    });

     /**运输方式 */
    this.getDicts("station_enterprise_type").then((response) => {
      this.trspModecdOptions = response.data;
    });
    /**进境关别 */
     this.getDicts("station_enterprise_type").then((response) => {
      this.impexpPortcdOptions = response.data;
    });
  /** 主管海关*/
      this.getDicts("station_enterprise_type").then((response) => {
      this.dclPlcCuscdOptions = response.data;
    });

      /** 主管海关*/
      this.getDicts("station_enterprise_type").then((response) => {
      this.stshipTrsarvNatcdOptions = response.data;
    });

     /** 报关标志*/
      this.getDicts("station_enterprise_type").then((response) => {
      this.dclcusFlagOptions = response.data;
    });

    /** 报关标志*/
      this.getDicts("station_enterprise_type").then((response) => {
      this.genDecFlagOptions = response.data;
    });
    
    /** 报关类型*/
      this.getDicts("station_enterprise_type").then((response) => {
      this.dclcusTypecdOptions = response.data;
    });
    
    
  },
  methods: {
    async init() {
      // await this.depParaList()
    },   
    // 表格样式设置
    rowClass () {
       return 'text-align: center;'
    },
    // 查询方法
    query(id){
      getNemsinvtheadtype(id).then(res =>{
       if(res.code ==200){
         this.nemsInvtHeadType = res.data.nemsInvtHeadType;
         this.nemsInvtListType = res.data.nemsInvtListType;
       }
      })
    },
    
    // 新增
    handleAdd() {},
    // 暂存
    handleSave() {
      console.log("保存");
      this.$saveStore("a", "123");
    },
    // 删除
    handleDelete(e, name) {
      if (name === 'body') {
        console.log(this.nemsInvtListType)
        this.nemsInvtListType = this.nemsInvtListType.filter(el => !this.selectBodyForm.includes(el))
        // this.nemsInvtListType[this.bodyIndex].nemsInvtListType = this.nemsInvtListType
        console.log(this.nemsInvtListType)
      }
    },
    // 申报
    handleReport() {},
    // 复制
    handleCopy() {},
    // 刷新
    handleRefresh() {},


    //表头新增
    headHandleAdd() {
      this.nemsInvtHeadType = {}
      
    },
    //表头暂存
    nemsInvtHeadTypeSave:function() {    
      this.form.nemsInvtHeadType=this.nemsInvtHeadType;
      this.form.nemsInvtListType = this.nemsInvtListType;
      console.log(JSON.stringify(this.form));
            add(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("操作成功");   
              } else {
                this.msgError(response.msg);
              }
            });       
            this.reset()    
    },

    //表体新增
    handleBodyAdd(){
    this.nemsInvtListType.push(this.bodyForm)
    this.bodyForm = {};
    this.otherForm = {};
    console.log(JSON.stringify(this.nemsInvtListType))
    },
    // 点击某一条集装箱信息
    bodyFormClick(row, column, event) {
      console.log(row)
      this.bodyIndex = JSON.parse(JSON.stringify(row)).rowIndex
      this.bodyForm = JSON.parse(JSON.stringify(row))
    },
    SelectionChange(data) {
      console.log(data)
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
        this.nemsInvtListType[this.bodyIndex] = JSON.parse(JSON.stringify(this.bodyForm))
        this.nemsInvtListType = JSON.parse(JSON.stringify(this.nemsInvtListType))
        this.bodyIndex = -1
      }
    },
    // //表体删除
    // handleBodyDelete(index,row) {
    //   this.nemsInvtListType.splice(index, 1)
		// 		//this.form.containerCount = this.subList.length
		// 		console.log(this.nemsInvtListType)

    // },

    // 翻页
    currentChange(page) {
      console.log(page);
    },

// 表单重置
     reset() {
      this.nemsInvtHeadType = {}
      this.bodyForm = {};
      this.bodyForm = {};  
     },
    // handleExceed(files, fileList) {
    //     this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    //   },

    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      beforeAvatarUpload(file) {                 
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                
                
                const isLt2M = file.size / 1024 / 1024 < 4
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 4MB!',
                        type: 'warning'
                    });
                }
                return  isLt2M
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