<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="130px">
      <!-- <el-form-item label="申请编号" prop="applyNo">
        <el-input
          v-model="queryParams.applyNo"
          placeholder="请输入申请编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
       <el-form-item label="经营企业名称" prop="bizopEtpsnm">
        <el-input
          v-model="queryParams.bizopEtpsnm"
          placeholder="请输入经营企业名称"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经营企业编号" prop="bizopEtpsno">
        <el-input
          v-model="queryParams.bizopEtpsno"
          placeholder="请输入经营企业编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经营企业社会信用代码" prop="bizopEtpsSccd">
        <el-input
          v-model="queryParams.bizopEtpsSccd"
          placeholder="请输入经营企业社会信用代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保税清单编号" prop="bondInvtNo">
        <el-input
          v-model="queryParams.bondInvtNo"
          placeholder="请输入保税清单编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="变更次数" prop="chgTmsCnt">
        <el-input
          v-model="queryParams.chgTmsCnt"
          placeholder="请输入变更次数"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对应报关单申报单位名称" prop="corrEntryDclEtpsnm">
        <el-input
          v-model="queryParams.corrEntryDclEtpsnm"
          placeholder="请输入对应报关单申报单位名称"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对应报关单申报单位代码" prop="corrEntryDclEtpsno">
        <el-input
          v-model="queryParams.corrEntryDclEtpsno"
          placeholder="请输入对应报关单申报单位代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对应报关单申报单位社会统一信用代码" prop="corrEntryDclEtpsSccd">
        <el-input
          v-model="queryParams.corrEntryDclEtpsSccd"
          placeholder="请输入对应报关单申报单位社会统一信用代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否报关标志" prop="dclcusFlag">
        <el-input
          v-model="queryParams.dclcusFlag"
          placeholder="请输入是否报关标志"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报关类型代码" prop="dclcusTypecd">
        <el-input
          v-model="queryParams.dclcusTypecd"
          placeholder="请输入报关类型代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="申报企业名称" prop="dclEtpsNm">
        <el-input
          v-model="queryParams.dclEtpsNm"
          placeholder="请输入申报企业名称"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="申报企业编号" prop="dclEtpsno">
        <el-input
          v-model="queryParams.dclEtpsno"
          placeholder="请输入申报企业编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申报企业社会信用代码" prop="dclEtpsSccd">
        <el-input
          v-model="queryParams.dclEtpsSccd"
          placeholder="请输入申报企业社会信用代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申报地关区代码" prop="dclPlcCuscd">
        <el-input
          v-model="queryParams.dclPlcCuscd"
          placeholder="请输入申报地关区代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申报类型(1-备案申请 2-变更申请 3-删除申请)" prop="dclTypecd">
        <el-input
          v-model="queryParams.dclTypecd"
          placeholder="请输入申报类型(1-备案申请 2-变更申请 3-删除申请)"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报关单类型" prop="decType">
        <el-select v-model="queryParams.decType" placeholder="请选择报关单类型" clearable size="mini">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="报关单申报时间" prop="entryDclTime">
        <el-input
          v-model="queryParams.entryDclTime"
          placeholder="请输入报关单申报时间"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对应报关单编号" prop="entryNo">
        <el-input
          v-model="queryParams.entryNo"
          placeholder="请输入对应报关单编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报关状态" prop="entryStucd">
        <el-input
          v-model="queryParams.entryStucd"
          placeholder="请输入报关状态"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="企业内部清单编号" prop="etpsInnerInvtNo">
        <el-input
          v-model="queryParams.etpsInnerInvtNo"
          placeholder="请输入企业内部清单编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="正式核扣时间" prop="formalVrfdedTime">
        <el-input
          v-model="queryParams.formalVrfdedTime"
          placeholder="请输入正式核扣时间"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否生成报关单:1-生成 2-不生成" prop="genDecFlag">
        <el-input
          v-model="queryParams.genDecFlag"
          placeholder="请输入是否生成报关单:1-生成 2-不生成"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申报人ic卡号" prop="icCardNo">
        <el-input
          v-model="queryParams.icCardNo"
          placeholder="请输入申报人ic卡号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="进出口标记代码" prop="impexpMarkcd">
        <el-input
          v-model="queryParams.impexpMarkcd"
          placeholder="请输入进出口标记代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="进出境关别" prop="impexpPortcd">
        <el-input
          v-model="queryParams.impexpPortcd"
          placeholder="请输入进出境关别"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="录入单位代码" prop="inputCode">
        <el-input
          v-model="queryParams.inputCode"
          placeholder="请输入录入单位代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="录入单位社会信用代码" prop="inputCreditCode">
        <el-input
          v-model="queryParams.inputCreditCode"
          placeholder="请输入录入单位社会信用代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="录入单位名称" prop="inputName">
        <el-input
          v-model="queryParams.inputName"
          placeholder="请输入录入单位名称"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->      
      <el-form-item label="申报状态" prop="manageResult">
        <el-select v-model="queryParams.manageResult" placeholder="请选择申报状态" size="mini">
          <el-option
            v-for="dict in manageResultOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入时间" prop="createTime">
        <el-date-picker
          clearable
          size="mini"
          style="width: 350px"
          v-model="dateRange"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00']"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="清单申报时间" prop="invtdclTime">
        <el-input
          v-model="queryParams.invtdclTime"
          placeholder="请输入清单申报时间"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="清单进出卡口状态代码" prop="invtIochkptStucd">
        <el-input
          v-model="queryParams.invtIochkptStucd"
          placeholder="请输入清单进出卡口状态代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="清单类型" prop="invtType">
        <el-select v-model="queryParams.invtType" placeholder="请选择清单类型" clearable size="mini">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="计征金额" prop="levyBlamt">
        <el-input
          v-model="queryParams.levyBlamt"
          placeholder="请输入计征金额"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="清单状态" prop="listStat">
        <el-input
          v-model="queryParams.listStat"
          placeholder="请输入清单状态"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流转类型" prop="listType">
        <el-select v-model="queryParams.listType" placeholder="请选择流转类型" clearable size="mini">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="料件成品标记代码" prop="mtpckEndprdMarkcd">
        <el-input
          v-model="queryParams.mtpckEndprdMarkcd"
          placeholder="请输入料件成品标记代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报关单同步修改标志" prop="needEntryModified">
        <el-input
          v-model="queryParams.needEntryModified"
          placeholder="请输入报关单同步修改标志"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="核放单生成标志代码" prop="passportUsedTypecd">
        <el-input
          v-model="queryParams.passportUsedTypecd"
          placeholder="请输入核放单生成标志代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预核扣时间" prop="prevdTime">
        <el-input
          v-model="queryParams.prevdTime"
          placeholder="请输入预核扣时间"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备案编号" prop="putrecNo">
        <el-input
          v-model="queryParams.putrecNo"
          placeholder="请输入备案编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货企业名称" prop="rcvgdEtpsnm">
        <el-input
          v-model="queryParams.rcvgdEtpsnm"
          placeholder="请输入收货企业名称"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货企业编号" prop="rcvgdEtpsno">
        <el-input
          v-model="queryParams.rcvgdEtpsno"
          placeholder="请输入收货企业编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联报关单境内收发货人名称" prop="rltEntryBizopEtpsnm">
        <el-input
          v-model="queryParams.rltEntryBizopEtpsnm"
          placeholder="请输入关联报关单境内收发货人名称"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联报关单境内收发货人编号" prop="rltEntryBizopEtpsno">
        <el-input
          v-model="queryParams.rltEntryBizopEtpsno"
          placeholder="请输入关联报关单境内收发货人编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联报关单境内收发货人社会信用代码" prop="rltEntryBizopEtpsSccd">
        <el-input
          v-model="queryParams.rltEntryBizopEtpsSccd"
          placeholder="请输入关联报关单境内收发货人社会信用代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联报关单申报单位名称" prop="rltEntryDclEtpsNm">
        <el-input
          v-model="queryParams.rltEntryDclEtpsNm"
          placeholder="请输入关联报关单申报单位名称"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联报关单申报单位编号" prop="rltEntryDclEtpsno">
        <el-input
          v-model="queryParams.rltEntryDclEtpsno"
          placeholder="请输入关联报关单申报单位编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联报关单申报单位社会信用代码" prop="rltEntryDclEtpsSccd">
        <el-input
          v-model="queryParams.rltEntryDclEtpsSccd"
          placeholder="请输入关联报关单申报单位社会信用代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联报关单编号" prop="rltEntryNo">
        <el-input
          v-model="queryParams.rltEntryNo"
          placeholder="请输入关联报关单编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联报关单收发货单位名称" prop="rltEntryRcvgdEtpsNm">
        <el-input
          v-model="queryParams.rltEntryRcvgdEtpsNm"
          placeholder="请输入关联报关单收发货单位名称"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联报关单收发货单位编号" prop="rltEntryRcvgdEtpsno">
        <el-input
          v-model="queryParams.rltEntryRcvgdEtpsno"
          placeholder="请输入关联报关单收发货单位编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联报关单收发货单位社会信用代码" prop="rltEntryRvsngdEtpsSccd">
        <el-input
          v-model="queryParams.rltEntryRvsngdEtpsSccd"
          placeholder="请输入关联报关单收发货单位社会信用代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联清单编号" prop="rltInvtNo">
        <el-input
          v-model="queryParams.rltInvtNo"
          placeholder="请输入关联清单编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联备案编号" prop="rltPutrecNo">
        <el-input
          v-model="queryParams.rltPutrecNo"
          placeholder="请输入关联备案编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收发货企业社会信用代码" prop="rvsngdEtpssccd">
        <el-input
          v-model="queryParams.rvsngdEtpssccd"
          placeholder="请输入收发货企业社会信用代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="中心统一编号" prop="seqNo">
        <el-input
          v-model="queryParams.seqNo"
          placeholder="请输入中心统一编号"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="起运/运抵国(地区）" prop="stshipTrsarvNatcd">
        <el-input
          v-model="queryParams.stshipTrsarvNatcd"
          placeholder="请输入起运/运抵国(地区）"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="监管方式代码" prop="supvModecd">
        <el-input
          v-model="queryParams.supvModecd"
          placeholder="请输入监管方式代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运输方式代码" prop="trspModecd">
        <el-input
          v-model="queryParams.trspModecd"
          placeholder="请输入运输方式代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="核扣标记代码" prop="vrfdedMarkcd">
        <el-input
          v-model="queryParams.vrfdedMarkcd"
          placeholder="请输入核扣标记代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      
      <el-form-item label="核扣标记代码" prop="createDate">
        <el-input
          v-model="queryParams.createDate"
          placeholder="请输入核扣标记代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="核扣标记代码" prop="reason">
        <el-input
          v-model="queryParams.reason"
          placeholder="请输入核扣标记代码"
          clearable
          size="mini"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-thumb"
          size="mini"
          :disabled="multiple"
          @click="declare"
          v-hasPermi="['manifest:head:declare']"
        >申报</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['manifest:nemsinvtheadtype:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['manifest:nemsinvtheadtype:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['manifest:nemsinvtheadtype:export']"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="nemsinvtheadtypeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="核扣标记代码" align="center" prop="id" />
      <!-- <el-table-column label="申请编号" align="center" prop="applyNo" />
      <el-table-column label="经营企业名称" align="center" prop="bizopEtpsnm" />
      <el-table-column label="经营企业编号" align="center" prop="bizopEtpsno" />
      <el-table-column label="经营企业社会信用代码" align="center" prop="bizopEtpsSccd" />
      <el-table-column label="保税清单编号" align="center" prop="bondInvtNo" />
      <el-table-column label="变更次数" align="center" prop="chgTmsCnt" />
      <el-table-column label="对应报关单申报单位名称" align="center" prop="corrEntryDclEtpsnm" />
      <el-table-column label="对应报关单申报单位代码" align="center" prop="corrEntryDclEtpsno" />
      <el-table-column label="对应报关单申报单位社会统一信用代码" align="center" prop="corrEntryDclEtpsSccd" /> -->
      <el-table-column label="是否报关标志" align="center" prop="dclcusFlag" />
      <el-table-column label="报关类型代码" align="center" prop="dclcusTypecd" />
      <el-table-column label="申报企业名称" align="center" prop="dclEtpsNm" />
      <el-table-column label="申报企业编号" align="center" prop="dclEtpsno" />
      <!-- <el-table-column label="申报企业社会信用代码" align="center" prop="dclEtpsSccd" />
      <el-table-column label="申报地关区代码" align="center" prop="dclPlcCuscd" />
      <el-table-column label="申报类型(1-备案申请 2-变更申请 3-删除申请)" align="center" prop="dclTypecd" />
      <el-table-column label="报关单类型" align="center" prop="decType" />
      <el-table-column label="报关单申报时间" align="center" prop="entryDclTime" />
      <el-table-column label="对应报关单编号" align="center" prop="entryNo" />
      <el-table-column label="报关状态" align="center" prop="entryStucd" />
      <el-table-column label="企业内部清单编号" align="center" prop="etpsInnerInvtNo" />
      <el-table-column label="正式核扣时间" align="center" prop="formalVrfdedTime" />
      <el-table-column label="是否生成报关单:1-生成 2-不生成" align="center" prop="genDecFlag" /> -->
      <el-table-column label="申报状态" align="center" prop="manageResult" :formatter="manageResultFormat"/>
      <!-- <el-table-column label="进出口标记代码" align="center" prop="impexpMarkcd" />
      <el-table-column label="进出境关别" align="center" prop="impexpPortcd" />
      <el-table-column label="录入单位代码" align="center" prop="inputCode" />
      <el-table-column label="录入单位社会信用代码" align="center" prop="inputCreditCode" /> -->
      <el-table-column label="录入单位名称" align="center" prop="inputName" />
      <el-table-column label="录入时间" align="center" prop="createTime" />
      <!-- <el-table-column label="清单申报时间" align="center" prop="invtdclTime" />
      <el-table-column label="清单进出卡口状态代码" align="center" prop="invtIochkptStucd" />
      <el-table-column label="清单类型" align="center" prop="invtType" />
      <el-table-column label="计征金额" align="center" prop="levyBlamt" />
      <el-table-column label="清单状态" align="center" prop="listStat" />
      <el-table-column label="流转类型" align="center" prop="listType" />
      <el-table-column label="料件成品标记代码" align="center" prop="mtpckEndprdMarkcd" />
      <el-table-column label="报关单同步修改标志" align="center" prop="needEntryModified" />
      <el-table-column label="核放单生成标志代码" align="center" prop="passportUsedTypecd" />
      <el-table-column label="预核扣时间" align="center" prop="prevdTime" />
      <el-table-column label="备案编号" align="center" prop="putrecNo" />
      <el-table-column label="收货企业名称" align="center" prop="rcvgdEtpsnm" />
      <el-table-column label="收货企业编号" align="center" prop="rcvgdEtpsno" />
      <el-table-column label="关联报关单境内收发货人名称" align="center" prop="rltEntryBizopEtpsnm" />
      <el-table-column label="关联报关单境内收发货人编号" align="center" prop="rltEntryBizopEtpsno" />
      <el-table-column label="关联报关单境内收发货人社会信用代码" align="center" prop="rltEntryBizopEtpsSccd" />
      <el-table-column label="关联报关单申报单位名称" align="center" prop="rltEntryDclEtpsNm" />
      <el-table-column label="关联报关单申报单位编号" align="center" prop="rltEntryDclEtpsno" />
      <el-table-column label="关联报关单申报单位社会信用代码" align="center" prop="rltEntryDclEtpsSccd" />
      <el-table-column label="关联报关单编号" align="center" prop="rltEntryNo" />
      <el-table-column label="关联报关单收发货单位名称" align="center" prop="rltEntryRcvgdEtpsNm" />
      <el-table-column label="关联报关单收发货单位编号" align="center" prop="rltEntryRcvgdEtpsno" />
      <el-table-column label="关联报关单收发货单位社会信用代码" align="center" prop="rltEntryRvsngdEtpsSccd" />
      <el-table-column label="关联清单编号" align="center" prop="rltInvtNo" />
      <el-table-column label="关联备案编号" align="center" prop="rltPutrecNo" />
      <el-table-column label="备注" align="center" prop="rmk" />
      <el-table-column label="收发货企业社会信用代码" align="center" prop="rvsngdEtpssccd" />
      <el-table-column label="中心统一编号" align="center" prop="seqNo" />
      <el-table-column label="起运/运抵国(地区）" align="center" prop="stshipTrsarvNatcd" />
      <el-table-column label="监管方式代码" align="center" prop="supvModecd" />
      <el-table-column label="运输方式代码" align="center" prop="trspModecd" />
      <el-table-column label="核扣标记代码" align="center" prop="vrfdedMarkcd" />
      <el-table-column label="核扣标记代码" align="center" prop="manageResult" />
      <el-table-column label="核扣标记代码" align="center" prop="createDate" />
      <el-table-column label="核扣标记代码" align="center" prop="reason" /> -->
      <el-table-column label="操作" align="center" class-name="mini-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="detail(scope.row)"
          >详情
          </el-button>
          <el-button
            v-if="scope.row.statementCode=='10' || scope.row.statementCode=='20'|| scope.row.statementCode=='0'|| scope.row.statementCode=='FF'|| scope.row.statementCode=='3' "
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manifest:nemsinvtheadtype:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manifest:nemsinvtheadtype:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="申请编号" prop="applyNo">
          <el-input v-model="form.applyNo" placeholder="请输入申请编号" />
        </el-form-item>
        <el-form-item label="经营企业名称" prop="bizopEtpsnm">
          <el-input v-model="form.bizopEtpsnm" placeholder="请输入经营企业名称" />
        </el-form-item>
        <el-form-item label="经营企业编号" prop="bizopEtpsno">
          <el-input v-model="form.bizopEtpsno" placeholder="请输入经营企业编号" />
        </el-form-item>
        <el-form-item label="经营企业社会信用代码" prop="bizopEtpsSccd">
          <el-input v-model="form.bizopEtpsSccd" placeholder="请输入经营企业社会信用代码" />
        </el-form-item>
        <el-form-item label="保税清单编号" prop="bondInvtNo">
          <el-input v-model="form.bondInvtNo" placeholder="请输入保税清单编号" />
        </el-form-item>
        <el-form-item label="变更次数" prop="chgTmsCnt">
          <el-input v-model="form.chgTmsCnt" placeholder="请输入变更次数" />
        </el-form-item>
        <el-form-item label="对应报关单申报单位名称" prop="corrEntryDclEtpsnm">
          <el-input v-model="form.corrEntryDclEtpsnm" placeholder="请输入对应报关单申报单位名称" />
        </el-form-item>
        <el-form-item label="对应报关单申报单位代码" prop="corrEntryDclEtpsno">
          <el-input v-model="form.corrEntryDclEtpsno" placeholder="请输入对应报关单申报单位代码" />
        </el-form-item>
        <el-form-item label="对应报关单申报单位社会统一信用代码" prop="corrEntryDclEtpsSccd">
          <el-input v-model="form.corrEntryDclEtpsSccd" placeholder="请输入对应报关单申报单位社会统一信用代码" />
        </el-form-item>
        <el-form-item label="是否报关标志" prop="dclcusFlag">
          <el-input v-model="form.dclcusFlag" placeholder="请输入是否报关标志" />
        </el-form-item>
        <el-form-item label="报关类型代码" prop="dclcusTypecd">
          <el-input v-model="form.dclcusTypecd" placeholder="请输入报关类型代码" />
        </el-form-item>
        <el-form-item label="申报企业名称" prop="dclEtpsNm">
          <el-input v-model="form.dclEtpsNm" placeholder="请输入申报企业名称" />
        </el-form-item>
        <el-form-item label="申报企业编号" prop="dclEtpsno">
          <el-input v-model="form.dclEtpsno" placeholder="请输入申报企业编号" />
        </el-form-item>
        <el-form-item label="申报企业社会信用代码" prop="dclEtpsSccd">
          <el-input v-model="form.dclEtpsSccd" placeholder="请输入申报企业社会信用代码" />
        </el-form-item>
        <el-form-item label="申报地关区代码" prop="dclPlcCuscd">
          <el-input v-model="form.dclPlcCuscd" placeholder="请输入申报地关区代码" />
        </el-form-item>
        <el-form-item label="申报类型(1-备案申请 2-变更申请 3-删除申请)" prop="dclTypecd">
          <el-input v-model="form.dclTypecd" placeholder="请输入申报类型(1-备案申请 2-变更申请 3-删除申请)" />
        </el-form-item>
        <el-form-item label="报关单类型">
          <el-select v-model="form.decType" placeholder="请选择报关单类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="报关单申报时间" prop="entryDclTime">
          <el-input v-model="form.entryDclTime" placeholder="请输入报关单申报时间" />
        </el-form-item>
        <el-form-item label="对应报关单编号" prop="entryNo">
          <el-input v-model="form.entryNo" placeholder="请输入对应报关单编号" />
        </el-form-item>
        <el-form-item label="报关状态" prop="entryStucd">
          <el-input v-model="form.entryStucd" placeholder="请输入报关状态" />
        </el-form-item>
        <el-form-item label="企业内部清单编号" prop="etpsInnerInvtNo">
          <el-input v-model="form.etpsInnerInvtNo" placeholder="请输入企业内部清单编号" />
        </el-form-item>
        <el-form-item label="正式核扣时间" prop="formalVrfdedTime">
          <el-input v-model="form.formalVrfdedTime" placeholder="请输入正式核扣时间" />
        </el-form-item>
        <el-form-item label="是否生成报关单:1-生成 2-不生成" prop="genDecFlag">
          <el-input v-model="form.genDecFlag" placeholder="请输入是否生成报关单:1-生成 2-不生成" />
        </el-form-item>
        <el-form-item label="申报人ic卡号" prop="icCardNo">
          <el-input v-model="form.icCardNo" placeholder="请输入申报人ic卡号" />
        </el-form-item>
        <el-form-item label="进出口标记代码" prop="impexpMarkcd">
          <el-input v-model="form.impexpMarkcd" placeholder="请输入进出口标记代码" />
        </el-form-item>
        <el-form-item label="进出境关别" prop="impexpPortcd">
          <el-input v-model="form.impexpPortcd" placeholder="请输入进出境关别" />
        </el-form-item>
        <el-form-item label="录入单位代码" prop="inputCode">
          <el-input v-model="form.inputCode" placeholder="请输入录入单位代码" />
        </el-form-item>
        <el-form-item label="录入单位社会信用代码" prop="inputCreditCode">
          <el-input v-model="form.inputCreditCode" placeholder="请输入录入单位社会信用代码" />
        </el-form-item>
        <el-form-item label="录入单位名称" prop="inputName">
          <el-input v-model="form.inputName" placeholder="请输入录入单位名称" />
        </el-form-item>
        <el-form-item label="录入时间" prop="createTime">
          <el-input v-model="form.createTime" placeholder="请输入录入时间" />
        </el-form-item>
        <el-form-item label="清单申报时间" prop="invtdclTime">
          <el-input v-model="form.invtdclTime" placeholder="请输入清单申报时间" />
        </el-form-item>
        <el-form-item label="清单进出卡口状态代码" prop="invtIochkptStucd">
          <el-input v-model="form.invtIochkptStucd" placeholder="请输入清单进出卡口状态代码" />
        </el-form-item>
        <el-form-item label="清单类型">
          <el-select v-model="form.invtType" placeholder="请选择清单类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="计征金额" prop="levyBlamt">
          <el-input v-model="form.levyBlamt" placeholder="请输入计征金额" />
        </el-form-item>
        <el-form-item label="清单状态" prop="listStat">
          <el-input v-model="form.listStat" placeholder="请输入清单状态" />
        </el-form-item>
        <el-form-item label="流转类型">
          <el-select v-model="form.listType" placeholder="请选择流转类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="料件成品标记代码" prop="mtpckEndprdMarkcd">
          <el-input v-model="form.mtpckEndprdMarkcd" placeholder="请输入料件成品标记代码" />
        </el-form-item>
        <el-form-item label="报关单同步修改标志" prop="needEntryModified">
          <el-input v-model="form.needEntryModified" placeholder="请输入报关单同步修改标志" />
        </el-form-item>
        <el-form-item label="核放单生成标志代码" prop="passportUsedTypecd">
          <el-input v-model="form.passportUsedTypecd" placeholder="请输入核放单生成标志代码" />
        </el-form-item>
        <el-form-item label="预核扣时间" prop="prevdTime">
          <el-input v-model="form.prevdTime" placeholder="请输入预核扣时间" />
        </el-form-item>
        <el-form-item label="备案编号" prop="putrecNo">
          <el-input v-model="form.putrecNo" placeholder="请输入备案编号" />
        </el-form-item>
        <el-form-item label="收货企业名称" prop="rcvgdEtpsnm">
          <el-input v-model="form.rcvgdEtpsnm" placeholder="请输入收货企业名称" />
        </el-form-item>
        <el-form-item label="收货企业编号" prop="rcvgdEtpsno">
          <el-input v-model="form.rcvgdEtpsno" placeholder="请输入收货企业编号" />
        </el-form-item>
        <el-form-item label="关联报关单境内收发货人名称" prop="rltEntryBizopEtpsnm">
          <el-input v-model="form.rltEntryBizopEtpsnm" placeholder="请输入关联报关单境内收发货人名称" />
        </el-form-item>
        <el-form-item label="关联报关单境内收发货人编号" prop="rltEntryBizopEtpsno">
          <el-input v-model="form.rltEntryBizopEtpsno" placeholder="请输入关联报关单境内收发货人编号" />
        </el-form-item>
        <el-form-item label="关联报关单境内收发货人社会信用代码" prop="rltEntryBizopEtpsSccd">
          <el-input v-model="form.rltEntryBizopEtpsSccd" placeholder="请输入关联报关单境内收发货人社会信用代码" />
        </el-form-item>
        <el-form-item label="关联报关单申报单位名称" prop="rltEntryDclEtpsNm">
          <el-input v-model="form.rltEntryDclEtpsNm" placeholder="请输入关联报关单申报单位名称" />
        </el-form-item>
        <el-form-item label="关联报关单申报单位编号" prop="rltEntryDclEtpsno">
          <el-input v-model="form.rltEntryDclEtpsno" placeholder="请输入关联报关单申报单位编号" />
        </el-form-item>
        <el-form-item label="关联报关单申报单位社会信用代码" prop="rltEntryDclEtpsSccd">
          <el-input v-model="form.rltEntryDclEtpsSccd" placeholder="请输入关联报关单申报单位社会信用代码" />
        </el-form-item>
        <el-form-item label="关联报关单编号" prop="rltEntryNo">
          <el-input v-model="form.rltEntryNo" placeholder="请输入关联报关单编号" />
        </el-form-item>
        <el-form-item label="关联报关单收发货单位名称" prop="rltEntryRcvgdEtpsNm">
          <el-input v-model="form.rltEntryRcvgdEtpsNm" placeholder="请输入关联报关单收发货单位名称" />
        </el-form-item>
        <el-form-item label="关联报关单收发货单位编号" prop="rltEntryRcvgdEtpsno">
          <el-input v-model="form.rltEntryRcvgdEtpsno" placeholder="请输入关联报关单收发货单位编号" />
        </el-form-item>
        <el-form-item label="关联报关单收发货单位社会信用代码" prop="rltEntryRvsngdEtpsSccd">
          <el-input v-model="form.rltEntryRvsngdEtpsSccd" placeholder="请输入关联报关单收发货单位社会信用代码" />
        </el-form-item>
        <el-form-item label="关联清单编号" prop="rltInvtNo">
          <el-input v-model="form.rltInvtNo" placeholder="请输入关联清单编号" />
        </el-form-item>
        <el-form-item label="关联备案编号" prop="rltPutrecNo">
          <el-input v-model="form.rltPutrecNo" placeholder="请输入关联备案编号" />
        </el-form-item>
        <el-form-item label="备注" prop="rmk">
          <el-input v-model="form.rmk" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="收发货企业社会信用代码" prop="rvsngdEtpssccd">
          <el-input v-model="form.rvsngdEtpssccd" placeholder="请输入收发货企业社会信用代码" />
        </el-form-item>
        <el-form-item label="中心统一编号" prop="seqNo">
          <el-input v-model="form.seqNo" placeholder="请输入中心统一编号" />
        </el-form-item>
        <el-form-item label="起运/运抵国(地区）" prop="stshipTrsarvNatcd">
          <el-input v-model="form.stshipTrsarvNatcd" placeholder="请输入起运/运抵国(地区）" />
        </el-form-item>
        <el-form-item label="监管方式代码" prop="supvModecd">
          <el-input v-model="form.supvModecd" placeholder="请输入监管方式代码" />
        </el-form-item>
        <el-form-item label="运输方式代码" prop="trspModecd">
          <el-input v-model="form.trspModecd" placeholder="请输入运输方式代码" />
        </el-form-item>
        <el-form-item label="核扣标记代码" prop="vrfdedMarkcd">
          <el-input v-model="form.vrfdedMarkcd" placeholder="请输入核扣标记代码" />
        </el-form-item>
        <el-form-item label="核扣标记代码" prop="manageResult">
          <el-input v-model="form.manageResult" placeholder="请输入核扣标记代码" />
        </el-form-item>
        <el-form-item label="核扣标记代码" prop="createDate">
          <el-input v-model="form.createDate" placeholder="请输入核扣标记代码" />
        </el-form-item>
        <el-form-item label="核扣标记代码" prop="reason">
          <el-input v-model="form.reason" placeholder="请输入核扣标记代码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listNemsinvtheadtype, declareBonded, getNemsinvtheadtype, delNemsinvtheadtype, addNemsinvtheadtype, updateNemsinvtheadtype } from "@/api/detailed/nemsinvtheadtype";

export default {
  name: "Nemsinvtheadtype",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 日期范围
      dateRange: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      nemsinvtheadtypeList: [],
      // 申报状态
      manageResultOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        applyNo: undefined,
        bizopEtpsnm: undefined,
        bizopEtpsno: undefined,
        bizopEtpsSccd: undefined,
        bondInvtNo: undefined,
        chgTmsCnt: undefined,
        corrEntryDclEtpsnm: undefined,
        corrEntryDclEtpsno: undefined,
        corrEntryDclEtpsSccd: undefined,
        dclcusFlag: undefined,
        dclcusTypecd: undefined,
        dclEtpsNm: undefined,
        dclEtpsno: undefined,
        dclEtpsSccd: undefined,
        dclPlcCuscd: undefined,
        dclTypecd: undefined,
        decType: undefined,
        entryDclTime: undefined,
        entryNo: undefined,
        entryStucd: undefined,
        etpsInnerInvtNo: undefined,
        formalVrfdedTime: undefined,
        genDecFlag: undefined,
        icCardNo: undefined,
        impexpMarkcd: undefined,
        impexpPortcd: undefined,
        inputCode: undefined,
        inputCreditCode: undefined,
        inputName: undefined,
        createTime: undefined,
        invtdclTime: undefined,
        invtIochkptStucd: undefined,
        invtType: undefined,
        levyBlamt: undefined,
        listStat: undefined,
        listType: undefined,
        mtpckEndprdMarkcd: undefined,
        needEntryModified: undefined,
        passportUsedTypecd: undefined,
        prevdTime: undefined,
        putrecNo: undefined,
        rcvgdEtpsnm: undefined,
        rcvgdEtpsno: undefined,
        rltEntryBizopEtpsnm: undefined,
        rltEntryBizopEtpsno: undefined,
        rltEntryBizopEtpsSccd: undefined,
        rltEntryDclEtpsNm: undefined,
        rltEntryDclEtpsno: undefined,
        rltEntryDclEtpsSccd: undefined,
        rltEntryNo: undefined,
        rltEntryRcvgdEtpsNm: undefined,
        rltEntryRcvgdEtpsno: undefined,
        rltEntryRvsngdEtpsSccd: undefined,
        rltInvtNo: undefined,
        rltPutrecNo: undefined,
        rmk: undefined,
        rvsngdEtpssccd: undefined,
        seqNo: undefined,
        stshipTrsarvNatcd: undefined,
        supvModecd: undefined,
        trspModecd: undefined,
        vrfdedMarkcd: undefined,
        manageResult: undefined,
        createDate: undefined,
        reason: undefined,
        manageResult: undefined,
        createTime: undefined,     

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    /** 申报状态 */
    this.getDicts("station_declear_status").then(response => {
      this.manageResultOptions = response.data;
    });
  },
  methods: {
    // 申报状态翻译
    manageResultFormat(row) {
      return this.selectDictLabel(this.manageResultOptions, row.manageResult);
    },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listNemsinvtheadtype(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.nemsinvtheadtypeList = response.rows;
        console.log(this.nemsinvtheadtypeList)
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        applyNo: undefined,
        bizopEtpsnm: undefined,
        bizopEtpsno: undefined,
        bizopEtpsSccd: undefined,
        bondInvtNo: undefined,
        chgTmsCnt: undefined,
        corrEntryDclEtpsnm: undefined,
        corrEntryDclEtpsno: undefined,
        corrEntryDclEtpsSccd: undefined,
        dclcusFlag: undefined,
        dclcusTypecd: undefined,
        dclEtpsNm: undefined,
        dclEtpsno: undefined,
        dclEtpsSccd: undefined,
        dclPlcCuscd: undefined,
        dclTypecd: undefined,
        decType: undefined,
        entryDclTime: undefined,
        entryNo: undefined,
        entryStucd: undefined,
        etpsInnerInvtNo: undefined,
        formalVrfdedTime: undefined,
        genDecFlag: undefined,
        icCardNo: undefined,
        impexpMarkcd: undefined,
        impexpPortcd: undefined,
        inputCode: undefined,
        inputCreditCode: undefined,
        inputName: undefined,
        createTime: undefined,
        invtdclTime: undefined,
        invtIochkptStucd: undefined,
        invtType: undefined,
        levyBlamt: undefined,
        listStat: undefined,
        listType: undefined,
        mtpckEndprdMarkcd: undefined,
        needEntryModified: undefined,
        passportUsedTypecd: undefined,
        prevdTime: undefined,
        putrecNo: undefined,
        rcvgdEtpsnm: undefined,
        rcvgdEtpsno: undefined,
        rltEntryBizopEtpsnm: undefined,
        rltEntryBizopEtpsno: undefined,
        rltEntryBizopEtpsSccd: undefined,
        rltEntryDclEtpsNm: undefined,
        rltEntryDclEtpsno: undefined,
        rltEntryDclEtpsSccd: undefined,
        rltEntryNo: undefined,
        rltEntryRcvgdEtpsNm: undefined,
        rltEntryRcvgdEtpsno: undefined,
        rltEntryRvsngdEtpsSccd: undefined,
        rltInvtNo: undefined,
        rltPutrecNo: undefined,
        rmk: undefined,
        rvsngdEtpssccd: undefined,
        seqNo: undefined,
        stshipTrsarvNatcd: undefined,
        supvModecd: undefined,
        trspModecd: undefined,
        vrfdedMarkcd: undefined,
        manageResult: undefined,
        createDate: undefined,
        reason: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getNemsinvtheadtype(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateNemsinvtheadtype(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addNemsinvtheadtype(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delNemsinvtheadtype(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('manifest/nemsinvtheadtype/export', {
        ...this.queryParams
      }, `manifest_nemsinvtheadtype.xlsx`)
    },
    /** 申报按钮操作 */
    declare(row) {
      const ids = row.id || this.ids;
      this.$confirm("是否确认进行批量申报", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return declareBonded(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("申报成功");
        })
        .catch(function() {});
    },
    /**详情按钮 */
    detail(row) {
      // this.reset();
      return this.$message('功能正在完善中...')
      const id = row.id || this.ids
      const data = this.router.find(el => el.messageType === row.messageType)
      this.$router.push({ path: '/singlewindow' + data.path })
    }
  }
};
</script>