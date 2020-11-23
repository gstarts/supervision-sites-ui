<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
<!--      <el-form-item label="场所编号" prop="placeId">-->
<!--        <el-input-->
<!--          v-model="queryParams.placeId"-->
<!--          placeholder="请输入场所编号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="提煤单号" prop="docNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.docNo"-->
<!--          placeholder="请输入提煤单号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="放行单号" prop="businessNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.businessNo"-->
<!--          placeholder="请输入放行单号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="场所名称" prop="placeId">
        <el-select @change="changePlace"
                   v-model="queryParams.placeId" placeholder="请选择场所" size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="寄仓客户" prop="customerName">
<!--        <el-input v-model="queryParams.customerName" placeholder="请输入寄仓客户" clearable size="small" @keyup.enter.native="handleQuery" />-->
        <el-select
          filterable
          clearable
          v-model="queryParams.customerName" placeholder="请选择寄仓客户" @change="changeCustomer">
          <el-option
            v-for="type in customerList"
            :key="type.customerName"
            :label="type.customerName"
            :value="type.customerName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="寄仓合同" prop="checkContractNo">
        <el-select

          filterable
          clearable
          v-model="queryParams.checkContractNo"
          placeholder="请选择寄仓合同"
          size="small">
          <el-option
            v-for="dept in contractSubList"
            :key="dept.contractNo"
            :label="dept.contractNo"
            :value="dept.contractNo"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="品名" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入品名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车号 " prop="vehicleNo">
        <el-input
          v-model="queryParams.vehicleNo"
          placeholder="请输入车号 "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提煤单号" prop="coalBillNo">
        <el-input
          v-model="queryParams.coalBillNo"
          placeholder="请输入提煤单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
        <el-form-item label="运输方式" prop="transportMode">
          <el-input
            v-model="queryParams.transportMode"
            placeholder="请输入运输方式"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
      <el-form-item label="销售合同号" prop="salesContractNo">
        <el-input
          v-model="queryParams.salesContractNo"
          placeholder="请输入销售合同号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车队名 " prop="vehicleTeam">
        <el-input
          v-model="queryParams.vehicleTeam"
          placeholder="请输入车队名 "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="入场司磅员" prop="inUser">
        <el-input
          v-model="queryParams.inUser"
          placeholder="请输入入场司磅员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出场司磅员" prop="outUser">
        <el-input
          v-model="queryParams.outUser"
          placeholder="请输入出场司磅员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="进场时间" prop="inTime">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--           v-model="queryParams.inTime"-->
<!--           type="date"-->
<!--           value-format="yyyy-MM-dd"-->
<!--           placeholder="选择进场时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="出场时间" prop="outTime">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.outTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择出场时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item label="查询时间类型" prop="queryLogo">
        <el-select
          v-model="queryParams.queryLogo" placeholder="请选择查询时间类型" size="small">
          <el-option
            v-for="dept in timeQueryTypeOption"
            :key="dept.dictValue"
            :label="dept.dictLabel"
            :value="dept.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="startTime">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
<!--      <el-form-item label="寄仓客户ID" prop="customerId">-->
<!--        <el-input-->
<!--          v-model="queryParams.customerId"-->
<!--          placeholder="请输入寄仓客户ID"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="客户id" prop="receiveId">-->
<!--        <el-input-->
<!--          v-model="queryParams.receiveId"-->
<!--          placeholder="请输入客户id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="客户名称" prop="receiveName">-->
<!--        <el-input-->
<!--          v-model="queryParams.receiveName"-->
<!--          placeholder="请输入客户名称"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="寄仓合同号" prop="checkContractNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.checkContractNo"-->
<!--          placeholder="请输入寄仓合同号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="蒙方磅单号 蒙方磅单号" prop="mongoliaBillNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.mongoliaBillNo"-->
<!--          placeholder="请输入蒙方磅单号 蒙方磅单号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->

<!--      <el-form-item label="挂车号1 " prop="trailerNo1">-->
<!--        <el-input-->
<!--          v-model="queryParams.trailerNo1"-->
<!--          placeholder="请输入挂车号1 "-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="挂车号2" prop="trailerNo2">-->
<!--        <el-input-->
<!--          v-model="queryParams.trailerNo2"-->
<!--          placeholder="请输入挂车号2"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->

<!--      <el-form-item label="蒙古磅净重 净重" prop="mongoliaNetWeight">-->
<!--        <el-input-->
<!--          v-model="queryParams.mongoliaNetWeight"-->
<!--          placeholder="请输入蒙古磅净重 净重"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="蒙古磅皮重 皮重" prop="mongoliaTareWeight">-->
<!--        <el-input-->
<!--          v-model="queryParams.mongoliaTareWeight"-->
<!--          placeholder="请输入蒙古磅皮重 皮重"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="车辆数量 " prop="vehicleCount">-->
<!--        <el-input-->
<!--          v-model="queryParams.vehicleCount"-->
<!--          placeholder="请输入车辆数量 "-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="司机姓名 " prop="driverName">-->
<!--        <el-input-->
<!--          v-model="queryParams.driverName"-->
<!--          placeholder="请输入司机姓名 "-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="车队联系人 " prop="vehicleTeamContact">-->
<!--        <el-input-->
<!--          v-model="queryParams.vehicleTeamContact"-->
<!--          placeholder="请输入车队联系人 "-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="车队联系电话" prop="vehicleTeamTel">-->
<!--        <el-input-->
<!--          v-model="queryParams.vehicleTeamTel"-->
<!--          placeholder="请输入车队联系电话"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="车型(双挂，单挂)" prop="vehicleType">-->
<!--        <el-select v-model="queryParams.vehicleType" placeholder="请选择车型(双挂，单挂)" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="计量单位(KG)" prop="measuringUnit">-->
<!--        <el-input-->
<!--          v-model="queryParams.measuringUnit"-->
<!--          placeholder="请输入计量单位(KG)"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="包装方式(集装箱，散装)" prop="packMode">-->
<!--        <el-input-->
<!--          v-model="queryParams.packMode"-->
<!--          placeholder="请输入包装方式(集装箱，散装)"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="集装箱号1" prop="containerNo1">-->
<!--        <el-input-->
<!--          v-model="queryParams.containerNo1"-->
<!--          placeholder="请输入集装箱号1"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="集装箱号2" prop="containerNo2">-->
<!--        <el-input-->
<!--          v-model="queryParams.containerNo2"-->
<!--          placeholder="请输入集装箱号2"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="集装箱号3" prop="containerNo3">-->
<!--        <el-input-->
<!--          v-model="queryParams.containerNo3"-->
<!--          placeholder="请输入集装箱号3"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="集装箱号4" prop="containerNo4">-->
<!--        <el-input-->
<!--          v-model="queryParams.containerNo4"-->
<!--          placeholder="请输入集装箱号4"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="净重" prop="netWeight">-->
<!--        <el-input-->
<!--          v-model="queryParams.netWeight"-->
<!--          placeholder="请输入净重"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="皮重" prop="tareWeight">-->
<!--        <el-input-->
<!--          v-model="queryParams.tareWeight"-->
<!--          placeholder="请输入皮重"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="毛重" prop="roughWeight">-->
<!--        <el-input-->
<!--          v-model="queryParams.roughWeight"-->
<!--          placeholder="请输入毛重"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="生成时间" prop="genTime">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.genTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择生成时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="生成人" prop="genBy">-->
<!--        <el-input-->
<!--          v-model="queryParams.genBy"-->
<!--          placeholder="请输入生成人"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="磅单打印时间" prop="poundTime">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.poundTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择磅单打印时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="磅单号" prop="poundNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.poundNo"-->
<!--          placeholder="请输入磅单号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="批次号" prop="batchNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.batchNo"-->
<!--          placeholder="请输入批次号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="提运单号" prop="loadingBillNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.loadingBillNo"-->
<!--          placeholder="请输入提运单号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="库位号" prop="storeCode">-->
<!--        <el-input-->
<!--          v-model="queryParams.storeCode"-->
<!--          placeholder="请输入库位号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="库位号2" prop="storeCode2">-->
<!--        <el-input-->
<!--          v-model="queryParams.storeCode2"-->
<!--          placeholder="请输入库位号2"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="库位号3" prop="storeCode3">-->
<!--        <el-input-->
<!--          v-model="queryParams.storeCode3"-->
<!--          placeholder="请输入库位号3"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="库位号4" prop="storeCode4">-->
<!--        <el-input-->
<!--          v-model="queryParams.storeCode4"-->
<!--          placeholder="请输入库位号4"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="生成舱单(0未生成，1已生成)" prop="hasManifest">-->
<!--        <el-input-->
<!--          v-model="queryParams.hasManifest"-->
<!--          placeholder="请输入生成舱单(0未生成，1已生成)"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="生成集报清单" prop="hasDeclare">-->
<!--        <el-input-->
<!--          v-model="queryParams.hasDeclare"-->
<!--          placeholder="请输入生成集报清单"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="生成进境确报" prop="hasTransit">-->
<!--        <el-input-->
<!--          v-model="queryParams.hasTransit"-->
<!--          placeholder="请输入生成进境确报"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="状态(0,待入场，2已入场，1已出场" prop="storeState">-->
<!--        <el-input-->
<!--          v-model="queryParams.storeState"-->
<!--          placeholder="请输入状态(0,待入场，2已入场，1已出场"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="文件ID" prop="fileId">-->
<!--        <el-input-->
<!--          v-model="queryParams.fileId"-->
<!--          placeholder="请输入文件ID"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="放行单号" prop="passNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.passNo"-->
<!--          placeholder="请输入放行单号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="乐观锁" prop="revision">-->
<!--        <el-input-->
<!--          v-model="queryParams.revision"-->
<!--          placeholder="请输入乐观锁"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="文件中的备注" prop="memo">-->
<!--        <el-input-->
<!--          v-model="queryParams.memo"-->
<!--          placeholder="请输入文件中的备注"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="蒙古毛重" prop="mongoliaRoughWeight">-->
<!--        <el-input-->
<!--          v-model="queryParams.mongoliaRoughWeight"-->
<!--          placeholder="请输入蒙古毛重"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->

<!--      </el-form-item>-->
<!--      <el-form-item label="发货方" prop="sendName">-->
<!--        <el-input-->
<!--          v-model="queryParams.sendName"-->
<!--          placeholder="请输入发货方"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->

<!--      <el-form-item label="预留1" prop="reserved1">-->
<!--        <el-input-->
<!--          v-model="queryParams.reserved1"-->
<!--          placeholder="请输入预留1"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="预留1" prop="reserved2">-->
<!--        <el-input-->
<!--          v-model="queryParams.reserved2"-->
<!--          placeholder="请输入预留1"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="预留1" prop="reserved3">-->
<!--        <el-input-->
<!--          v-model="queryParams.reserved3"-->
<!--          placeholder="请输入预留1"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="预留1" prop="reserved4">-->
<!--        <el-input-->
<!--          v-model="queryParams.reserved4"-->
<!--          placeholder="请输入预留1"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="通道号(进场)" prop="chnlNoI">-->
<!--        <el-input-->
<!--          v-model="queryParams.chnlNoI"-->
<!--          placeholder="请输入通道号(进场)"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="出场通道号" prop="chnlNoE">-->
<!--        <el-input-->
<!--          v-model="queryParams.chnlNoE"-->
<!--          placeholder="请输入出场通道号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="库位别名" prop="locationAlias">-->
<!--        <el-input-->
<!--          v-model="queryParams.locationAlias"-->
<!--          placeholder="请输入库位别名"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->



<!--      <el-form-item label="运输单位" prop="transportUnit">-->
<!--        <el-input-->
<!--          v-model="queryParams.transportUnit"-->
<!--          placeholder="请输入运输单位"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="派车单号" prop="dispatchNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.dispatchNo"-->
<!--          placeholder="请输入派车单号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="APP用户名" prop="appUser">-->
<!--        <el-input-->
<!--          v-model="queryParams.appUser"-->
<!--          placeholder="请输入APP用户名"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="数据来源" prop="dataSources">-->
<!--        <el-input-->
<!--          v-model="queryParams.dataSources"-->
<!--          placeholder="请输入数据来源"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="作废原因" prop="voidReason">-->
<!--        <el-input-->
<!--          v-model="queryParams.voidReason"-->
<!--          placeholder="请输入作废原因"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="司机手机号" prop="driverMobileNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.driverMobileNo"-->
<!--          placeholder="请输入司机手机号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="制单人" prop="makerBy">-->
<!--        <el-input-->
<!--          v-model="queryParams.makerBy"-->
<!--          placeholder="请输入制单人"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="箱皮重" prop="boxTareWeight">-->
<!--        <el-input-->
<!--          v-model="queryParams.boxTareWeight"-->
<!--          placeholder="请输入箱皮重"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="作废日期" prop="voidDate">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.voidDate"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择作废日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="制单时间" prop="makerTime">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.makerTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择制单时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
    </el-form>

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['place:outstoreDoc:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['place:outstoreDoc:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['place:outstoreDoc:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['place:outstoreDoc:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->

    <el-table v-loading="loading" :data="outstoreDocList" @selection-change="handleSelectionChange" height="645">
<!--      <el-table-column type="selection" width="55" align="center" />-->
<!--      <el-table-column label="ID 逻辑主键" align="center" prop="id" />-->
<!--      <el-table-column label="场所编号" align="center" prop="placeId" />-->
      <af-table-column label="出库单号" align="center" prop="id" />
      <af-table-column label="APP用户名" align="center" prop="appUser" />
      <el-table-column label="数据来源" align="center" prop="dataSources" />
      <el-table-column label="作废日期" align="center" prop="voidDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.voidDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作废原因" align="center" prop="voidReason" />
      <af-table-column label="合同签约客户" align="center" prop="customerName" />
      <af-table-column label="提煤单客户" align="center" prop="receiveName" />
      <af-table-column label="销售合同号" align="center" prop="salesContractNo" />
      <af-table-column label="提运单号" align="center" prop="loadingBillNo" />
      <el-table-column label="品名" align="center" prop="goodsName" />
      <af-table-column label="运输单位" align="center" prop="transportUnit" />
      <el-table-column label="运输方式" align="center" prop="transportMode" />
      <el-table-column label="库位号" align="center" prop="storeCode" />
      <af-table-column label="车号 " align="center" prop="vehicleNo" />
      <af-table-column label="进场时间" align="center" prop="inTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="出场时间" align="center" prop="outTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.outTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <el-table-column label="净重" align="center" prop="netWeight" />
      <el-table-column label="车队" align="center" prop="vehicleTeam" />
      <el-table-column label="车型" align="center" prop="vehicleType" />
      <el-table-column label="司机姓名 " align="center" prop="driverName" />
      <af-table-column label="司机手机号" align="center" prop="driverMobileNo" />
      <el-table-column label="制单人" align="center" prop="makerBy" />
      <af-table-column label="发料仓库" align="center" prop="sendName" />
      <el-table-column label="制单时间" align="center" prop="makerTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.makerTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
<!--      <af-table-column label="派车单号" align="center" prop="dispatchNo" />-->
<!--      <af-table-column label="集装箱号1" align="center" prop="containerNo1" />-->
<!--      <el-table-column label="皮重" align="center" prop="tareWeight" />-->
<!--      <el-table-column label="箱皮重" align="center" prop="boxTareWeight" />-->
<!--      <el-table-column label="毛重" align="center" prop="roughWeight" />-->
<!--      <el-table-column label="计量单位(KG)" align="center" prop="measuringUnit" />-->
<!--      <af-table-column label="备注" align="center" prop="remark" />-->
<!--      <el-table-column label="入场司磅员" align="center" prop="inUser" />-->
<!--      <el-table-column label="出场司磅员" align="center" prop="outUser" />-->
<!--      <el-table-column label="放行单号" align="center" prop="businessNo" />-->
<!--      <el-table-column label="寄仓客户ID" align="center" prop="customerId" />-->
<!--      <el-table-column label="客户id" align="center" prop="receiveId" />-->

<!--      <el-table-column label="寄仓合同号" align="center" prop="checkContractNo" />-->
<!--      <el-table-column label="蒙方磅单号 蒙方磅单号" align="center" prop="mongoliaBillNo" />-->
<!--      <el-table-column label="挂车号1 " align="center" prop="trailerNo1" />-->
<!--      <el-table-column label="挂车号2" align="center" prop="trailerNo2" />-->
<!--      <el-table-column label="蒙古磅净重 净重" align="center" prop="mongoliaNetWeight" />-->
<!--      <el-table-column label="蒙古磅皮重 皮重" align="center" prop="mongoliaTareWeight" />-->
<!--      <el-table-column label="车辆数量 " align="center" prop="vehicleCount" />-->

<!--      <el-table-column label="车队联系人 " align="center" prop="vehicleTeamContact" />-->
<!--      <el-table-column label="车队联系电话" align="center" prop="vehicleTeamTel" />-->
<!--      <el-table-column label="包装方式(集装箱，散装)" align="center" prop="packMode" />-->
<!--      <el-table-column label="集装箱号2" align="center" prop="containerNo2" />-->
<!--      <el-table-column label="集装箱号3" align="center" prop="containerNo3" />-->
<!--      <el-table-column label="集装箱号4" align="center" prop="containerNo4" />-->
<!--      <el-table-column label="生成时间" align="center" prop="genTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.genTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="生成人" align="center" prop="genBy" />-->
<!--      <el-table-column label="磅单打印时间" align="center" prop="poundTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.poundTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="磅单号" align="center" prop="poundNo" />-->
<!--      <el-table-column label="批次号" align="center" prop="batchNo" />-->
<!--      <el-table-column label="提运单号" align="center" prop="loadingBillNo" />-->

<!--      <el-table-column label="库位号2" align="center" prop="storeCode2" />-->
<!--      <el-table-column label="库位号3" align="center" prop="storeCode3" />-->
<!--      <el-table-column label="库位号4" align="center" prop="storeCode4" />-->
<!--      <el-table-column label="生成舱单(0未生成，1已生成)" align="center" prop="hasManifest" />-->
<!--      <el-table-column label="生成集报清单" align="center" prop="hasDeclare" />-->
<!--      <el-table-column label="生成进境确报" align="center" prop="hasTransit" />-->
<!--      <el-table-column label="状态(0,待入场，2已入场，1已出场" align="center" prop="storeState" />-->
<!--      <el-table-column label="文件ID" align="center" prop="fileId" />-->
<!--      <el-table-column label="放行单号" align="center" prop="passNo" />-->
<!--      <el-table-column label="乐观锁" align="center" prop="revision" />-->
<!--      <el-table-column label="文件中的备注" align="center" prop="memo" />-->
<!--      <el-table-column label="蒙古毛重" align="center" prop="mongoliaRoughWeight" />-->
<!--      <el-table-column label="预留1" align="center" prop="reserved1" />-->
<!--      <el-table-column label="预留1" align="center" prop="reserved2" />-->
<!--      <el-table-column label="预留1" align="center" prop="reserved3" />-->
<!--      <el-table-column label="预留1" align="center" prop="reserved4" />-->
<!--      <el-table-column label="通道号(进场)" align="center" prop="chnlNoI" />-->
<!--      <el-table-column label="出场通道号" align="center" prop="chnlNoE" />-->
<!--      <el-table-column label="库位别名" align="center" prop="locationAlias" />-->






<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['place:outstoreDoc:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['place:outstoreDoc:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改出库明细单对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="场所编号" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所编号" />
        </el-form-item>
        <el-form-item label="提煤单号" prop="docNo">
          <el-input v-model="form.docNo" placeholder="请输入提煤单号" />
        </el-form-item>
        <el-form-item label="放行单号" prop="businessNo">
          <el-input v-model="form.businessNo" placeholder="请输入放行单号" />
        </el-form-item>
        <el-form-item label="寄仓客户" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入寄仓客户" />
        </el-form-item>
        <el-form-item label="寄仓客户ID" prop="customerId">
          <el-input v-model="form.customerId" placeholder="请输入寄仓客户ID" />
        </el-form-item>
        <el-form-item label="客户id" prop="receiveId">
          <el-input v-model="form.receiveId" placeholder="请输入客户id" />
        </el-form-item>
        <el-form-item label="客户名称" prop="receiveName">
          <el-input v-model="form.receiveName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="寄仓合同号" prop="checkContractNo">
          <el-input v-model="form.checkContractNo" placeholder="请输入寄仓合同号" />
        </el-form-item>
        <el-form-item label="蒙方磅单号 蒙方磅单号" prop="mongoliaBillNo">
          <el-input v-model="form.mongoliaBillNo" placeholder="请输入蒙方磅单号 蒙方磅单号" />
        </el-form-item>
        <el-form-item label="车号 " prop="vehicleNo">
          <el-input v-model="form.vehicleNo" placeholder="请输入车号 " />
        </el-form-item>
        <el-form-item label="挂车号1 " prop="trailerNo1">
          <el-input v-model="form.trailerNo1" placeholder="请输入挂车号1 " />
        </el-form-item>
        <el-form-item label="挂车号2" prop="trailerNo2">
          <el-input v-model="form.trailerNo2" placeholder="请输入挂车号2" />
        </el-form-item>
        <el-form-item label="车队名 " prop="vehicleTeam">
          <el-input v-model="form.vehicleTeam" placeholder="请输入车队名 " />
        </el-form-item>
        <el-form-item label="蒙古磅净重 净重" prop="mongoliaNetWeight">
          <el-input v-model="form.mongoliaNetWeight" placeholder="请输入蒙古磅净重 净重" />
        </el-form-item>
        <el-form-item label="蒙古磅皮重 皮重" prop="mongoliaTareWeight">
          <el-input v-model="form.mongoliaTareWeight" placeholder="请输入蒙古磅皮重 皮重" />
        </el-form-item>
        <el-form-item label="车辆数量 " prop="vehicleCount">
          <el-input v-model="form.vehicleCount" placeholder="请输入车辆数量 " />
        </el-form-item>
        <el-form-item label="司机姓名 " prop="driverName">
          <el-input v-model="form.driverName" placeholder="请输入司机姓名 " />
        </el-form-item>
        <el-form-item label="车队联系人 " prop="vehicleTeamContact">
          <el-input v-model="form.vehicleTeamContact" placeholder="请输入车队联系人 " />
        </el-form-item>
        <el-form-item label="车队联系电话" prop="vehicleTeamTel">
          <el-input v-model="form.vehicleTeamTel" placeholder="请输入车队联系电话" />
        </el-form-item>
        <el-form-item label="车型(双挂，单挂)">
          <el-select v-model="form.vehicleType" placeholder="请选择车型(双挂，单挂)">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="计量单位(KG)" prop="measuringUnit">
          <el-input v-model="form.measuringUnit" placeholder="请输入计量单位(KG)" />
        </el-form-item>
        <el-form-item label="包装方式(集装箱，散装)" prop="packMode">
          <el-input v-model="form.packMode" placeholder="请输入包装方式(集装箱，散装)" />
        </el-form-item>
        <el-form-item label="集装箱号1" prop="containerNo1">
          <el-input v-model="form.containerNo1" placeholder="请输入集装箱号1" />
        </el-form-item>
        <el-form-item label="集装箱号2" prop="containerNo2">
          <el-input v-model="form.containerNo2" placeholder="请输入集装箱号2" />
        </el-form-item>
        <el-form-item label="集装箱号3" prop="containerNo3">
          <el-input v-model="form.containerNo3" placeholder="请输入集装箱号3" />
        </el-form-item>
        <el-form-item label="集装箱号4" prop="containerNo4">
          <el-input v-model="form.containerNo4" placeholder="请输入集装箱号4" />
        </el-form-item>
        <el-form-item label="净重" prop="netWeight">
          <el-input v-model="form.netWeight" placeholder="请输入净重" />
        </el-form-item>
        <el-form-item label="皮重" prop="tareWeight">
          <el-input v-model="form.tareWeight" placeholder="请输入皮重" />
        </el-form-item>
        <el-form-item label="毛重" prop="roughWeight">
          <el-input v-model="form.roughWeight" placeholder="请输入毛重" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="生成时间" prop="genTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.genTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择生成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生成人" prop="genBy">
          <el-input v-model="form.genBy" placeholder="请输入生成人" />
        </el-form-item>
        <el-form-item label="磅单打印时间" prop="poundTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.poundTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择磅单打印时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="磅单号" prop="poundNo">
          <el-input v-model="form.poundNo" placeholder="请输入磅单号" />
        </el-form-item>
        <el-form-item label="批次号" prop="batchNo">
          <el-input v-model="form.batchNo" placeholder="请输入批次号" />
        </el-form-item>
        <el-form-item label="提运单号" prop="loadingBillNo">
          <el-input v-model="form.loadingBillNo" placeholder="请输入提运单号" />
        </el-form-item>
        <el-form-item label="库位号" prop="storeCode">
          <el-input v-model="form.storeCode" placeholder="请输入库位号" />
        </el-form-item>
        <el-form-item label="库位号2" prop="storeCode2">
          <el-input v-model="form.storeCode2" placeholder="请输入库位号2" />
        </el-form-item>
        <el-form-item label="库位号3" prop="storeCode3">
          <el-input v-model="form.storeCode3" placeholder="请输入库位号3" />
        </el-form-item>
        <el-form-item label="库位号4" prop="storeCode4">
          <el-input v-model="form.storeCode4" placeholder="请输入库位号4" />
        </el-form-item>
        <el-form-item label="生成舱单(0未生成，1已生成)" prop="hasManifest">
          <el-input v-model="form.hasManifest" placeholder="请输入生成舱单(0未生成，1已生成)" />
        </el-form-item>
        <el-form-item label="生成集报清单" prop="hasDeclare">
          <el-input v-model="form.hasDeclare" placeholder="请输入生成集报清单" />
        </el-form-item>
        <el-form-item label="生成进境确报" prop="hasTransit">
          <el-input v-model="form.hasTransit" placeholder="请输入生成进境确报" />
        </el-form-item>
        <el-form-item label="状态(0,待入场，2已入场，1已出场" prop="storeState">
          <el-input v-model="form.storeState" placeholder="请输入状态(0,待入场，2已入场，1已出场" />
        </el-form-item>
        <el-form-item label="文件ID" prop="fileId">
          <el-input v-model="form.fileId" placeholder="请输入文件ID" />
        </el-form-item>
        <el-form-item label="放行单号" prop="passNo">
          <el-input v-model="form.passNo" placeholder="请输入放行单号" />
        </el-form-item>
        <el-form-item label="创建人" prop="createBy">
          <el-input v-model="form.createBy" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新人" prop="updateBy">
          <el-input v-model="form.updateBy" placeholder="请输入更新人" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="乐观锁" prop="revision">
          <el-input v-model="form.revision" placeholder="请输入乐观锁" />
        </el-form-item>
        <el-form-item label="文件中的备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入文件中的备注" />
        </el-form-item>
        <el-form-item label="蒙古毛重" prop="mongoliaRoughWeight">
          <el-input v-model="form.mongoliaRoughWeight" placeholder="请输入蒙古毛重" />
        </el-form-item>
        <el-form-item label="货物名称" prop="goodsName">
          <el-input v-model="form.goodsName" placeholder="请输入货物名称" />
        </el-form-item>
        <el-form-item label="发货方" prop="sendName">
          <el-input v-model="form.sendName" placeholder="请输入发货方" />
        </el-form-item>
        <el-form-item label="进场时间" prop="inTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.inTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择进场时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出场时间" prop="outTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.outTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出场时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预留1" prop="reserved1">
          <el-input v-model="form.reserved1" placeholder="请输入预留1" />
        </el-form-item>
        <el-form-item label="预留1" prop="reserved2">
          <el-input v-model="form.reserved2" placeholder="请输入预留1" />
        </el-form-item>
        <el-form-item label="预留1" prop="reserved3">
          <el-input v-model="form.reserved3" placeholder="请输入预留1" />
        </el-form-item>
        <el-form-item label="预留1" prop="reserved4">
          <el-input v-model="form.reserved4" placeholder="请输入预留1" />
        </el-form-item>
        <el-form-item label="通道号(进场)" prop="chnlNoI">
          <el-input v-model="form.chnlNoI" placeholder="请输入通道号(进场)" />
        </el-form-item>
        <el-form-item label="出场通道号" prop="chnlNoE">
          <el-input v-model="form.chnlNoE" placeholder="请输入出场通道号" />
        </el-form-item>
        <el-form-item label="库位别名" prop="locationAlias">
          <el-input v-model="form.locationAlias" placeholder="请输入库位别名" />
        </el-form-item>
        <el-form-item label="销售合同号" prop="salesContractNo">
          <el-input v-model="form.salesContractNo" placeholder="请输入销售合同号" />
        </el-form-item>
        <el-form-item label="提煤单号" prop="coalBillNo">
          <el-input v-model="form.coalBillNo" placeholder="请输入提煤单号" />
        </el-form-item>
        <el-form-item label="运输方式" prop="transportMode">
          <el-input v-model="form.transportMode" placeholder="请输入运输方式" />
        </el-form-item>
        <el-form-item label="运输单位" prop="transportUnit">
          <el-input v-model="form.transportUnit" placeholder="请输入运输单位" />
        </el-form-item>
        <el-form-item label="派车单号" prop="dispatchNo">
          <el-input v-model="form.dispatchNo" placeholder="请输入派车单号" />
        </el-form-item>
        <el-form-item label="APP用户名" prop="appUser">
          <el-input v-model="form.appUser" placeholder="请输入APP用户名" />
        </el-form-item>
        <el-form-item label="数据来源" prop="dataSources">
          <el-input v-model="form.dataSources" placeholder="请输入数据来源" />
        </el-form-item>
        <el-form-item label="作废原因" prop="voidReason">
          <el-input v-model="form.voidReason" placeholder="请输入作废原因" />
        </el-form-item>
        <el-form-item label="司机手机号" prop="driverMobileNo">
          <el-input v-model="form.driverMobileNo" placeholder="请输入司机手机号" />
        </el-form-item>
        <el-form-item label="制单人" prop="makerBy">
          <el-input v-model="form.makerBy" placeholder="请输入制单人" />
        </el-form-item>
        <el-form-item label="箱皮重" prop="boxTareWeight">
          <el-input v-model="form.boxTareWeight" placeholder="请输入箱皮重" />
        </el-form-item>
        <el-form-item label="作废日期" prop="voidDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.voidDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择作废日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="制单时间" prop="makerTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.makerTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择制单时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入场司磅员" prop="inUser">
          <el-input v-model="form.inUser" placeholder="请输入入场司磅员" />
        </el-form-item>
        <el-form-item label="出场司磅员" prop="outUser">
          <el-input v-model="form.outUser" placeholder="请输入出场司磅员" />
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
import { listOutstoreDoc,listOutstoreDocLike, getOutstoreDoc, delOutstoreDoc, addOutstoreDoc, updateOutstoreDoc } from "@/api/place/outstoreDoc";
import {getUserDepts} from "@/utils/charutils";
import {listStoreContract} from "@/api/place/storeContract";
export default {
  name: "OutstoreDoc",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 出库明细单表格数据
      outstoreDocList: [],
      //时间查询类型
      timeQueryTypeOption:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        queryLogo:'I',
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        docNo: undefined,
        businessNo: undefined,
        customerName: undefined,
        customerId: undefined,
        receiveId: undefined,
        receiveName: undefined,
        checkContractNo: undefined,
        mongoliaBillNo: undefined,
        vehicleNo: undefined,
        trailerNo1: undefined,
        trailerNo2: undefined,
        vehicleTeam: undefined,
        mongoliaNetWeight: undefined,
        mongoliaTareWeight: undefined,
        vehicleCount: undefined,
        driverName: undefined,
        vehicleTeamContact: undefined,
        vehicleTeamTel: undefined,
        vehicleType: undefined,
        measuringUnit: undefined,
        packMode: undefined,
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
        netWeight: undefined,
        tareWeight: undefined,
        roughWeight: undefined,
        genTime: undefined,
        genBy: undefined,
        poundTime: undefined,
        poundNo: undefined,
        batchNo: undefined,
        loadingBillNo: undefined,
        storeCode: undefined,
        storeCode2: undefined,
        storeCode3: undefined,
        storeCode4: undefined,
        hasManifest: undefined,
        hasDeclare: undefined,
        hasTransit: undefined,
        storeState: undefined,
        fileId: undefined,
        passNo: undefined,
        revision: undefined,
        memo: undefined,
        mongoliaRoughWeight: undefined,
        goodsName: undefined,
        sendName: undefined,
        inTime: undefined,
        outTime: undefined,
        reserved1: undefined,
        reserved2: undefined,
        reserved3: undefined,
        reserved4: undefined,
        chnlNoI: undefined,
        chnlNoE: undefined,
        locationAlias: undefined,
        salesContractNo: undefined,
        coalBillNo: undefined,
        transportMode: undefined,
        transportUnit: undefined,
        dispatchNo: undefined,
        appUser: undefined,
        dataSources: undefined,
        voidReason: undefined,
        driverMobileNo: undefined,
        makerBy: undefined,
        boxTareWeight: undefined,
        voidDate: undefined,
        makerTime: undefined,
        inUser: undefined,
        outUser: undefined
      },
      customerList:[],
      depts: [],
      contractSubList: [],
      dateRange:[],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        placeId: [
          { required: true, message: "场所编号不能为空", trigger: "blur" }
        ],
        docNo: [
          { required: true, message: "提煤单号不能为空", trigger: "blur" }
        ],
        vehicleNo: [
          { required: true, message: "车号 不能为空", trigger: "blur" }
        ],
        storeState: [
          { required: true, message: "状态(0,待入场，2已入场，1已出场不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getContract(this.queryParams.placeId, '1')
    }
    this.getDicts("time_query_type").then(response => {
      this.timeQueryTypeOption = response.data;
      console.log(this.timeQueryTypeOption)
    });
    this.getList();
  },
  methods: {
    /** 查询出库明细单列表 */
    getList() {
      this.loading = true;
      listOutstoreDocLike(this.addDateRange(this.queryParams,this.dateRange)).then(response => {
        this.outstoreDocList = response.rows;
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
        placeId: undefined,
        docNo: undefined,
        businessNo: undefined,
        customerName: undefined,
        customerId: undefined,
        receiveId: undefined,
        receiveName: undefined,
        checkContractNo: undefined,
        mongoliaBillNo: undefined,
        vehicleNo: undefined,
        trailerNo1: undefined,
        trailerNo2: undefined,
        vehicleTeam: undefined,
        mongoliaNetWeight: undefined,
        mongoliaTareWeight: undefined,
        vehicleCount: undefined,
        driverName: undefined,
        vehicleTeamContact: undefined,
        vehicleTeamTel: undefined,
        vehicleType: undefined,
        measuringUnit: undefined,
        packMode: undefined,
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
        netWeight: undefined,
        tareWeight: undefined,
        roughWeight: undefined,
        remark: undefined,
        genTime: undefined,
        genBy: undefined,
        poundTime: undefined,
        poundNo: undefined,
        batchNo: undefined,
        loadingBillNo: undefined,
        storeCode: undefined,
        storeCode2: undefined,
        storeCode3: undefined,
        storeCode4: undefined,
        hasManifest: undefined,
        hasDeclare: undefined,
        hasTransit: undefined,
        storeState: undefined,
        fileId: undefined,
        passNo: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        revision: undefined,
        memo: undefined,
        mongoliaRoughWeight: undefined,
        goodsName: undefined,
        sendName: undefined,
        inTime: undefined,
        outTime: undefined,
        reserved1: undefined,
        reserved2: undefined,
        reserved3: undefined,
        reserved4: undefined,
        chnlNoI: undefined,
        chnlNoE: undefined,
        locationAlias: undefined,
        salesContractNo: undefined,
        coalBillNo: undefined,
        transportMode: undefined,
        transportUnit: undefined,
        dispatchNo: undefined,
        appUser: undefined,
        dataSources: undefined,
        voidReason: undefined,
        driverMobileNo: undefined,
        makerBy: undefined,
        boxTareWeight: undefined,
        voidDate: undefined,
        makerTime: undefined,
        inUser: undefined,
        outUser: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      if(this.queryParams.queryLogo == undefined){
        this.msgError("查询时间类型不可为空,请选择")
        return
      }
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.dateRange=[];
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
      this.title = "添加出库明细单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOutstoreDoc(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改出库明细单";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateOutstoreDoc(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addOutstoreDoc(this.form).then(response => {
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
      this.$confirm('是否确认删除出库明细单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOutstoreDoc(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/outstoreDoc/export', {
        ...this.queryParams
      }, `place_outstoreDoc.xlsx`)
    },
    //场所改变时，去查对应场所的
    changePlace(event) {
      this.getContract(event, '1')
    },
    // //场所变化 获取对应场所的合同
    getContract(placeId, status) {
      //查找合同
      listStoreContract({'placeId': placeId, 'status': status}).then(response => {
        if (response.code === 200) {
          this.contractList = response.rows;
          if (this.contractList.length === 0) {
            //this.$message.warning('此场所没有有效的合同')
          } else {
            //重新给客户列表 赋值
            this.customerList = []
            for (let contract of this.contractList) {
              if (!this.customerList.find(cus => cus.customerId === contract.customerId)) {
                this.customerList.push(contract)
              }
            }
          }
        }
      });
    },
    changeCustomer(event) {
      //改变客户时
      //从合同列表中，把对应公司名字的合同都提取出来
      this.form.checkContractNo = "";
      this.contractSubList = this.contractList.filter(
        (item) => item.customerName === event
      );
    },
  }
};
</script>
