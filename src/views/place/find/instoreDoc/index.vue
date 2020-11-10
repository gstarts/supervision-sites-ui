<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <!-- <el-form-item label="场所编号" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入场所编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="通知单号" prop="docNo">
        <el-input
          v-model="queryParams.docNo"
          placeholder="请输入通知单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="业务编号" prop="businessNo">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入业务编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
       <el-form-item label="寄舱客户" prop="checkConsumer">
        <el-input
          v-model="queryParams.checkConsumer"
          placeholder="请输入寄舱客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="寄舱合同" prop="checkContractNo">
        <el-input
          v-model="queryParams.checkContractNo"
          placeholder="请输入寄舱合同"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="蒙方磅单" prop="mongoliaBillNo">
        <el-input
          v-model="queryParams.mongoliaBillNo"
          placeholder="请输入蒙方磅单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="车号" prop="vehicleNo">
        <el-input
          v-model="queryParams.vehicleNo"
          placeholder="请输入车号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      
      <!-- <el-form-item label="车型" prop="vehicleType">
        <el-select v-model="queryParams.vehicleType" placeholder="请选择车型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="计量单位" prop="measuringUnit">
        <el-input
          v-model="queryParams.measuringUnit"
          placeholder="请输入计量单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="包装方式" prop="packMode">
        <el-input
          v-model="queryParams.packMode"
          placeholder="请输入包装方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集装箱号" prop="containerNo1">
        <el-input
          v-model="queryParams.containerNo1"
          placeholder="请输入集装箱号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      
      <el-form-item label="净重" prop="netWeight">
        <el-input
          v-model="queryParams.netWeight"
          placeholder="请输入净重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="皮重" prop="tareWeight">
        <el-input
          v-model="queryParams.tareWeight"
          placeholder="请输入皮重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="毛重" prop="roughWeight">
        <el-input
          v-model="queryParams.roughWeight"
          placeholder="请输入毛重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="磅单号" prop="poundNo">
        <el-input
          v-model="queryParams.poundNo"
          placeholder="请输入磅单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批次号" prop="batchNo">
        <el-input
          v-model="queryParams.batchNo"
          placeholder="请输入批次号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提运单号" prop="loadingBillNo">
        <el-input
          v-model="queryParams.loadingBillNo"
          placeholder="请输入提运单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      

     
      <el-form-item label="状态" prop="storeState">
        <el-input
          v-model="queryParams.storeState"
          placeholder="请输入状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="放行单号" prop="passNo">
        <el-input
          v-model="queryParams.passNo"
          placeholder="请输入放行单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      
      <el-form-item label="货物名称" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入货物名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发货方" prop="sendName">
        <el-input
          v-model="queryParams.sendName"
          placeholder="请输入发货方"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="寄舱客户ID" prop="customerId">
        <el-input
          v-model="queryParams.customerId"
          placeholder="请输入寄舱客户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="进场时间" prop="inTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.inTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择进场时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="出场时间" prop="outTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.outTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择出场时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="供应商" prop="supplier">
        <el-input
          v-model="queryParams.supplier"
          placeholder="请输入供应商"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采购合同号" prop="purchaseContractNumber">
        <el-input
          v-model="queryParams.purchaseContractNumber"
          placeholder="请输入采购合同号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位别名" prop="locationAlias">
        <el-input
          v-model="queryParams.locationAlias"
          placeholder="请输入库位别名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> 
      <el-form-item label="进口合同" prop="importContractNumber">
        <el-input
          v-model="queryParams.importContractNumber"
          placeholder="请输入进口合同"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报关单号" prop="customsDeclarationNumber">
        <el-input
          v-model="queryParams.customsDeclarationNumber"
          placeholder="请输入报关单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="箱皮重" prop="boxTareWeight">
        <el-input
          v-model="queryParams.boxTareWeight"
          placeholder="请输入箱皮重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报关量" prop="customsWeight">
        <el-input
          v-model="queryParams.customsWeight"
          placeholder="请输入报关量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入境日期" prop="entryDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.entryDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择入境日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="报关日期" prop="customsDeclarationDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.customsDeclarationDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择报关日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="国检放行日期" prop="nationalInspectionReleaseDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.nationalInspectionReleaseDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择国检放行日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="境外发车日期" prop="overseasDepartureDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.overseasDepartureDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择境外发车日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="蒙方出库日期" prop="mongolianDeliveryDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.mongolianDeliveryDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择蒙方出库日期">
        </el-date-picker>
      </el-form-item> -->
      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="instoreDocList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="ID" align="center" prop="id" /> -->
      <el-table-column label="场所编号" align="center" prop="placeId" />
      <el-table-column label="通知单号" align="center" prop="docNo" />
      <el-table-column label="业务编号" align="center" prop="businessNo" />
      <el-table-column label="寄舱客户" align="center" prop="checkConsumer" />
      <el-table-column label="寄舱合同" align="center" prop="checkContractNo" />
      <el-table-column label="蒙方磅单" align="center" prop="mongoliaBillNo" />
      <el-table-column label="车号" align="center" prop="vehicleNo" />
      <el-table-column label="挂车号" align="center" prop="trailerNo1" />
      <!-- <el-table-column label="挂车号2" align="center" prop="trailerNo2" /> -->
      <el-table-column label="车队名" align="center" prop="vehicleTeam" />
      <el-table-column label="蒙古磅净重" align="center" prop="mongoliaNetWeight" />
      <el-table-column label="蒙古磅皮重" align="center" prop="mongoliaTareWeight" />
      <el-table-column label="车辆数量" align="center" prop="vehicleCount" />
      <el-table-column label="司机姓名" align="center" prop="driverName" />
      <el-table-column label="车队联系人" align="center" prop="vehicleTeamContact" />
      <el-table-column label="车队联系电话" align="center" prop="vehicleTeamTel" />
      <el-table-column label="车型" align="center" prop="vehicleType" />
      <el-table-column label="计量单位" align="center" prop="measuringUnit" />
      <el-table-column label="包装方式" align="center" prop="packMode" />
      <el-table-column label="集装箱号" align="center" prop="containerNo1" />
      <el-table-column label="净重" align="center" prop="netWeight" />
      <el-table-column label="皮重" align="center" prop="tareWeight" />
      <el-table-column label="毛重" align="center" prop="roughWeight" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="生成时间" align="center" prop="genTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.genTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生成人" align="center" prop="genBy" />
      <!-- <el-table-column label="磅单打印时间" align="center" prop="poundTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.poundTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="磅单号" align="center" prop="poundNo" />
      <el-table-column label="批次号" align="center" prop="batchNo" />
      <el-table-column label="提运单号" align="center" prop="loadingBillNo" />
      <el-table-column label="库位号" align="center" prop="storeCode" />
      
      <!-- <el-table-column label="生成舱单" align="center" prop="hasManifest" /> -->
      <!-- <el-table-column label="生成集报清单" align="center" prop="hasDeclare" /> -->
      <!-- <el-table-column label="生成进境确报" align="center" prop="hasTransit" /> -->
      <el-table-column label="状态" align="center" prop="storeState" />
      <el-table-column label="放行单号" align="center" prop="passNo" />
      <!-- <el-table-column label="乐观锁" align="center" prop="revision" /> -->
      <!-- <el-table-column label="文件中的备注" align="center" prop="memo" /> -->
      <el-table-column label="蒙古毛重" align="center" prop="mongoliaRoughWeight" />
      <el-table-column label="货物名称" align="center" prop="goodsName" />
      <el-table-column label="发货方" align="center" prop="sendName" />
      <el-table-column label="寄舱客户ID" align="center" prop="customerId" />
      <el-table-column label="进场时间" align="center" prop="inTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出场时间" align="center" prop="outTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.outTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入场通道" align="center" prop="inChannel" />
      <el-table-column label="出场通道" align="center" prop="outChannel" />
      <el-table-column label="入场司磅员" align="center" prop="inUser" />
      <el-table-column label="出场司磅员" align="center" prop="outUser" />
      <el-table-column label="供应商" align="center" prop="supplier" />
      <el-table-column label="采购合同号" align="center" prop="purchaseContractNumber" />
      <el-table-column label="库位别名" align="center" prop="locationAlias" />
      <el-table-column label="进口合同" align="center" prop="importContractNumber" />
      <el-table-column label="报关单号" align="center" prop="customsDeclarationNumber" />
      <el-table-column label="箱皮重" align="center" prop="boxTareWeight" />
      <el-table-column label="报关量" align="center" prop="customsWeight" />
      <el-table-column label="国检放行日期" align="center" prop="nationalInspectionReleaseDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.nationalInspectionReleaseDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="境外发车日期" align="center" prop="overseasDepartureDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.overseasDepartureDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="蒙方出库日期" align="center" prop="mongolianDeliveryDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.mongolianDeliveryDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入境日期" align="center" prop="entryDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.entryDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报关日期" align="center" prop="customsDeclarationDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.customsDeclarationDate, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="制单时间" align="center" prop="makerTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.makerTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="制单人" align="center" prop="makerBy" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:instoreDoc:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:instoreDoc:remove']"
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

    <!-- 添加或修改入库通知单 入库通知单对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="场所编号 场所编号" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所编号 场所编号" />
        </el-form-item>
        <el-form-item label="通知单号 通知单号" prop="docNo">
          <el-input v-model="form.docNo" placeholder="请输入通知单号 通知单号" />
        </el-form-item>
        <el-form-item label="业务编号" prop="businessNo">
          <el-input v-model="form.businessNo" placeholder="请输入业务编号" />
        </el-form-item>
        <el-form-item label="寄舱客户" prop="checkConsumer">
          <el-input v-model="form.checkConsumer" placeholder="请输入寄舱客户" />
        </el-form-item>
        <el-form-item label="寄舱合同" prop="checkContractNo">
          <el-input v-model="form.checkContractNo" placeholder="请输入寄舱合同" />
        </el-form-item>
        <el-form-item label="蒙方磅单" prop="mongoliaBillNo">
          <el-input v-model="form.mongoliaBillNo" placeholder="请输入蒙方磅单" />
        </el-form-item>
        <el-form-item label="车号 车号" prop="vehicleNo">
          <el-input v-model="form.vehicleNo" placeholder="请输入车号 车号" />
        </el-form-item>
        <el-form-item label="挂车号1 挂车号1" prop="trailerNo1">
          <el-input v-model="form.trailerNo1" placeholder="请输入挂车号1 挂车号1" />
        </el-form-item>
        <el-form-item label="挂车号2 挂车号2" prop="trailerNo2">
          <el-input v-model="form.trailerNo2" placeholder="请输入挂车号2 挂车号2" />
        </el-form-item>
        <el-form-item label="车队名 车队名" prop="vehicleTeam">
          <el-input v-model="form.vehicleTeam" placeholder="请输入车队名 车队名" />
        </el-form-item>
        <el-form-item label="蒙古磅净重 净重" prop="mongoliaNetWeight">
          <el-input v-model="form.mongoliaNetWeight" placeholder="请输入蒙古磅净重 净重" />
        </el-form-item>
        <el-form-item label="蒙古磅皮重 皮重" prop="mongoliaTareWeight">
          <el-input v-model="form.mongoliaTareWeight" placeholder="请输入蒙古磅皮重 皮重" />
        </el-form-item>
        <el-form-item label="车辆数量 车辆数量" prop="vehicleCount">
          <el-input v-model="form.vehicleCount" placeholder="请输入车辆数量 车辆数量" />
        </el-form-item>
        <el-form-item label="司机姓名 司机名称" prop="driverName">
          <el-input v-model="form.driverName" placeholder="请输入司机姓名 司机名称" />
        </el-form-item>
        <el-form-item label="车队联系人 车队联系人" prop="vehicleTeamContact">
          <el-input v-model="form.vehicleTeamContact" placeholder="请输入车队联系人 车队联系人" />
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
        <el-form-item label="集装箱号" prop="containerNo1">
          <el-input v-model="form.containerNo1" placeholder="请输入集装箱号" />
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
        <el-form-item label="状态(0,待入库，1已入库，2可放行，3已生成放行单)" prop="storeState">
          <el-input v-model="form.storeState" placeholder="请输入状态(0,待入库，1已入库，2可放行，3已生成放行单)" />
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
        <el-form-item label="寄舱客户ID" prop="customerId">
          <el-input v-model="form.customerId" placeholder="请输入寄舱客户ID" />
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
        <el-form-item label="入场通道" prop="inChannel">
          <el-input v-model="form.inChannel" placeholder="请输入入场通道" />
        </el-form-item>
        <el-form-item label="出场通道" prop="outChannel">
          <el-input v-model="form.outChannel" placeholder="请输入出场通道" />
        </el-form-item>
        <el-form-item label="入场司磅员" prop="inUser">
          <el-input v-model="form.inUser" placeholder="请输入入场司磅员" />
        </el-form-item>
        <el-form-item label="出场司磅员" prop="outUser">
          <el-input v-model="form.outUser" placeholder="请输入出场司磅员" />
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="form.supplier" placeholder="请输入供应商" />
        </el-form-item>
        <el-form-item label="采购合同号" prop="purchaseContractNumber">
          <el-input v-model="form.purchaseContractNumber" placeholder="请输入采购合同号" />
        </el-form-item>
        <el-form-item label="库位别名" prop="locationAlias">
          <el-input v-model="form.locationAlias" placeholder="请输入库位别名" />
        </el-form-item>
        <el-form-item label="进口合同" prop="importContractNumber">
          <el-input v-model="form.importContractNumber" placeholder="请输入进口合同" />
        </el-form-item>
        <el-form-item label="报关单号" prop="customsDeclarationNumber">
          <el-input v-model="form.customsDeclarationNumber" placeholder="请输入报关单号" />
        </el-form-item>
        <el-form-item label="箱皮重" prop="boxTareWeight">
          <el-input v-model="form.boxTareWeight" placeholder="请输入箱皮重" />
        </el-form-item>
        <el-form-item label="报关量" prop="customsWeight">
          <el-input v-model="form.customsWeight" placeholder="请输入报关量" />
        </el-form-item>
        <el-form-item label="国检放行日期" prop="nationalInspectionReleaseDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.nationalInspectionReleaseDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择国检放行日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="境外发车日期" prop="overseasDepartureDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.overseasDepartureDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择境外发车日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="蒙方出库日期" prop="mongolianDeliveryDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.mongolianDeliveryDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择蒙方出库日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入境日期" prop="entryDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.entryDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择入境日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报关日期" prop="customsDeclarationDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.customsDeclarationDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择报关日期">
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
        <el-form-item label="制单人" prop="makerBy">
          <el-input v-model="form.makerBy" placeholder="请输入制单人" />
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
import { listInstoreDocLike, getInstoreDoc, delInstoreDoc, addInstoreDoc, updateInstoreDoc } from "@/api/place/instoreDoc";

export default {
  name: "InstoreDoc",
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
      // 入库通知单 入库通知单表格数据
      instoreDocList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        docNo: undefined,
        businessNo: undefined,
        checkConsumer: undefined,
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
        customerId: undefined,
        inTime: undefined,
        outTime: undefined,
        inChannel: undefined,
        outChannel: undefined,
        inUser: undefined,
        outUser: undefined,
        supplier: undefined,
        purchaseContractNumber: undefined,
        locationAlias: undefined,
        importContractNumber: undefined,
        customsDeclarationNumber: undefined,
        boxTareWeight: undefined,
        customsWeight: undefined,
        nationalInspectionReleaseDate: undefined,
        overseasDepartureDate: undefined,
        mongolianDeliveryDate: undefined,
        entryDate: undefined,
        customsDeclarationDate: undefined,
        makerTime: undefined,
        makerBy: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        docNo: [
          { required: true, message: "通知单号 通知单号不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询入库通知单 入库通知单列表 */
    getList() {
      this.loading = true;
      listInstoreDocLike(this.queryParams).then(response => {
        this.instoreDocList = response.rows;
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
        checkConsumer: undefined,
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
        customerId: undefined,
        inTime: undefined,
        outTime: undefined,
        inChannel: undefined,
        outChannel: undefined,
        inUser: undefined,
        outUser: undefined,
        supplier: undefined,
        purchaseContractNumber: undefined,
        locationAlias: undefined,
        importContractNumber: undefined,
        customsDeclarationNumber: undefined,
        boxTareWeight: undefined,
        customsWeight: undefined,
        nationalInspectionReleaseDate: undefined,
        overseasDepartureDate: undefined,
        mongolianDeliveryDate: undefined,
        entryDate: undefined,
        customsDeclarationDate: undefined,
        makerTime: undefined,
        makerBy: undefined
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
      this.title = "添加入库通知单 入库通知单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInstoreDoc(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改入库通知单 入库通知单";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateInstoreDoc(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addInstoreDoc(this.form).then(response => {
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
      this.$confirm('是否确认删除入库通知单 入库通知单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delInstoreDoc(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/instoreDoc/export', {
        ...this.queryParams
      }, `place_instoreDoc.xlsx`)
    }
  }
};
</script>