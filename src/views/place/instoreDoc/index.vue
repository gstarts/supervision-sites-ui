<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          @change="placeChange"
          v-model="queryParams.placeId"
          placeholder="请选择场所"
          size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <!--<el-form-item label="通知单号 通知单号" prop="docNo">
        <el-input
          v-model="queryParams.docNo"
          placeholder="请输入通知单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="业务编号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入业务编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="寄舱客户" prop="checkConsumer">
        <el-select clearable
          v-model="queryParams.checkConsumer"
          placeholder="请选择寄舱客户"
          size="small">
          <el-option
            v-for="dept in customerList"
            :key="dept.customerName"
            :label="dept.customerName"
            :value="dept.customerName"
          />
        </el-select>

      </el-form-item>
      <el-form-item label="寄舱合同" prop="checkContractNo">
        <el-select clearable
          v-model="queryParams.checkContractNo"
          placeholder="请选择寄舱合同"
          size="small">
          <el-option
            v-for="dept in contractList"
            :key="dept.contractNo"
            :label="dept.contractNo"
            :value="dept.contractNo"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="品名" prop="goodsName">
        <el-select
          clearable
          v-model="queryParams.goodsName"
          placeholder="请选择品名"
          size="small">
          <el-option
            v-for="dict in goodsNameList"
            :key="dict.dictLabel"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>
      <!--<el-form-item label="蒙方磅单号" prop="mongoliaBillNo">
        <el-input
          v-model="queryParams.mongoliaBillNo"
          placeholder="请输入蒙方磅单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="车号" prop="vehicleNo">
        <el-input
          v-model="queryParams.vehicleNo"
          placeholder="请输入车号"
          clearable
          size="small"/>
      </el-form-item>
      <!--<el-form-item label="挂车号1 挂车号1" prop="trailerNo1">
        <el-input
          v-model="queryParams.trailerNo1"
          placeholder="请输入挂车号1 挂车号1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="挂车号2 挂车号2" prop="trailerNo2">
        <el-input
          v-model="queryParams.trailerNo2"
          placeholder="请输入挂车号2 挂车号2"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车队名 车队名" prop="vehicleTeam">
        <el-input
          v-model="queryParams.vehicleTeam"
          placeholder="请输入车队名 车队名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="蒙古磅净重 净重" prop="mongoliaNetWeight">
        <el-input
          v-model="queryParams.mongoliaNetWeight"
          placeholder="请输入蒙古磅净重 净重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="蒙古磅皮重 皮重" prop="mongoliaTareWeight">
        <el-input
          v-model="queryParams.mongoliaTareWeight"
          placeholder="请输入蒙古磅皮重 皮重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="车辆数量 车辆数量" prop="vehicleCount">
        <el-input
          v-model="queryParams.vehicleCount"
          placeholder="请输入车辆数量 车辆数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="司机姓名 司机名称" prop="driverName">
        <el-input
          v-model="queryParams.driverName"
          placeholder="请输入司机姓名 司机名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车队联系人 车队联系人" prop="vehicleTeamContact">
        <el-input
          v-model="queryParams.vehicleTeamContact"
          placeholder="请输入车队联系人 车队联系人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车队联系电话" prop="vehicleTeamTel">
        <el-input
          v-model="queryParams.vehicleTeamTel"
          placeholder="请输入车队联系电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="车型(双挂，单挂)" prop="vehicleType">
        <el-select v-model="queryParams.vehicleType" placeholder="请选择车型(双挂，单挂)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>-->
      <!--<el-form-item label="计量单位(吨)" prop="measuringUnit">
        <el-input
          v-model="queryParams.measuringUnit"
          placeholder="请输入计量单位(吨)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="包装方式(集装箱，散装)" prop="packMode">
        <el-input
          v-model="queryParams.packMode"
          placeholder="请输入包装方式(集装箱，散装)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="集装箱号1" prop="containerNo1">
        <el-input
          v-model="queryParams.containerNo1"
          placeholder="请输入集装箱号1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集装箱号2" prop="containerNo2">
        <el-input
          v-model="queryParams.containerNo2"
          placeholder="请输入集装箱号2"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集装箱号3" prop="containerNo3">
        <el-input
          v-model="queryParams.containerNo3"
          placeholder="请输入集装箱号3"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集装箱号4" prop="containerNo4">
        <el-input
          v-model="queryParams.containerNo4"
          placeholder="请输入集装箱号4"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!-- <el-form-item label="净重" prop="netWeight">
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
      </el-form-item>-->
      <!--<el-form-item label="生成时间" prop="genTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.genTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生成时间"
        >
        </el-date-picker>
      </el-form-item>-->
      <!-- <el-form-item label="生成人" prop="genBy">
        <el-input
          v-model="queryParams.genBy"
          placeholder="请输入生成人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="磅单打印时间" prop="poundTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.poundTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择磅单打印时间">
        </el-date-picker>
      </el-form-item>-->
      <!--<el-form-item label="磅单号" prop="poundNo">
        <el-input
          v-model="queryParams.poundNo"
          placeholder="请输入磅单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="批次号" prop="batchNo">
        <el-input
          v-model="queryParams.batchNo"
          placeholder="请输入批次号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="提运单号" prop="loadingBillNo">
        <el-input
          v-model="queryParams.loadingBillNo"
          placeholder="请输入提运单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="库位号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位号"
          clearable
          size="small"
        />
      </el-form-item>
      <!--<el-form-item label="库位号2" prop="storeCode2">
        <el-input
          v-model="queryParams.storeCode2"
          placeholder="请输入库位号2"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位号3" prop="storeCode3">
        <el-input
          v-model="queryParams.storeCode3"
          placeholder="请输入库位号3"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位号4" prop="storeCode4">
        <el-input
          v-model="queryParams.storeCode4"
          placeholder="请输入库位号4"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!-- <el-form-item label="生成舱单" prop="hasManifest">
        <el-input
          v-model="queryParams.hasManifest"
          placeholder="请输入生成舱单(0未生成，1已生成)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="生成集报清单" prop="hasDeclare">
        <el-input
          v-model="queryParams.hasDeclare"
          placeholder="请输入生成集报清单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="生成进境确报" prop="hasTransit">
        <el-input
          v-model="queryParams.hasTransit"
          placeholder="请输入生成进境确报"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="状态" prop="storeState">
        <el-select
          clearable
          v-model="queryParams.storeState"
          placeholder="请选择状态"
          size="small"
        >
          <el-option
            v-for="dept in storeStateDic"
            :key="dept.key"
            :label="dept.label"
            :value="dept.key"
          />
        </el-select>
      </el-form-item>

      <!--<el-form-item label="时间" prop="timeType">
        <el-select
          @change="setTime"
          clearable
          v-model="queryParams.remark"
          placeholder="请选择时间"
          size="small">
          <el-option
            v-for="time in timeDic"
            :key="time.key"
            :label="time.value"
            :value="time.key"
          />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>-->
      <!--<el-form-item label="文件ID" prop="fileId">
        <el-input
          v-model="queryParams.fileId"
          placeholder="请输入文件ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!-- <el-form-item label="放行单号" prop="passNo">
         <el-input
           v-model="queryParams.passNo"
           placeholder="请输入放行单号"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->
      <!-- <el-form-item label="乐观锁" prop="revision">
        <el-input
          v-model="queryParams.revision"
          placeholder="请输入乐观锁"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索
        </el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['place:instoreDoc:add']"
        >新增
        </el-button
        >
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:instoreDoc:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:instoreDoc:remove']"
          >删除</el-button
        >
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:instoreDoc:export']"
        >导出
        </el-button
        >
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="instoreDocList"
      @selection-change="handleSelectionChange">
      <!--<af-table-column type="selection" width="55" align="center" />-->
      <af-table-column label="ID" align="center" prop="id"/>
      <!--<af-table-column label="场所编号" align="center" prop="placeId"/>-->
      <af-table-column label="通知单号" align="center" prop="docNo"/>
      <!--<af-table-column label="业务编号" align="center" prop="storeCode" />-->
      <!-- <af-table-column label="发货客户" align="center" prop="sendName"/>-->
      <af-table-column label="寄舱客户" align="center" prop="checkConsumer"/>
      <af-table-column label="寄舱合同号" align="center" prop="checkContractNo"/>
      <af-table-column label="品名" align="center" prop="goodsName"/>
      <!--<af-table-column label="库位号" align="center" prop="storeCode"/>-->
      <!--<af-table-column label="蒙方磅单号" align="center" prop="mongoliaBillNo" />-->
      <af-table-column label="车号" align="center" prop="vehicleNo"/>
      <!--<af-table-column label="挂车号1 挂车号1" align="center" prop="trailerNo1" />
      <af-table-column label="挂车号2 挂车号2" align="center" prop="trailerNo2" />-->
      <af-table-column label="车队名" align="center" prop="vehicleTeam"/>
      <!-- <af-table-column label="蒙古磅毛重" align="center" prop="mongoliaRoughWeight" />-->
      <af-table-column label="蒙方皮重" align="center" prop="mongoliaTareWeight"/>
      <af-table-column label="蒙方净重" align="center" prop="mongoliaNetWeight"/>
      <!--<af-table-column label="车辆数量" align="center" prop="vehicleCount" />-->
      <af-table-column label="司机姓名" align="center" prop="driverName"/>
      <af-table-column label="车队联系人" align="center" prop="vehicleTeamContact"/>
      <af-table-column label="车队联系电话" align="center" prop="vehicleTeamTel"/>
      <!--<af-table-column label="车型(双挂，单挂)" align="center" prop="vehicleType"/>-->
      <af-table-column label="计量单位(KG)" align="center" prop="measuringUnit"/>
      <af-table-column label="包装方式" align="center" prop="packMode">
        <template slot-scope="scope">
          <span>{{ scope.row.packMode === "1" ? "集装箱" : "散装" }}</span>
        </template>
      </af-table-column>
      <af-table-column label="集装箱号1" align="center" prop="containerNo1"/>
      <af-table-column label="集装箱号2" align="center" prop="containerNo2"/>
      <af-table-column label="集装箱号3" align="center" prop="containerNo3"/>
      <af-table-column label="集装箱号4" align="center" prop="containerNo4"/>
      <af-table-column label="净重" align="center" prop="netWeight"/>
      <af-table-column label="皮重" align="center" prop="tareWeight"/>
      <af-table-column label="毛重" align="center" prop="roughWeight"/>
      <!-- <af-table-column label="备注" align="center" prop="remark" />-->
      <af-table-column label="库位号" align="center" prop="storeCode"/>
      <af-table-column label="库位号2" align="center" prop="storeCode2"/>
      <af-table-column label="库位号3" align="center" prop="storeCode3"/>
      <af-table-column label="库位号4" align="center" prop="storeCode4"/>
      <af-table-column label="生成时间" align="center" prop="genTime" width="180">
        <template slot-scope="scope">
          <span>{{
              parseTime(scope.row.genTime, "{y}-{m}-{d} {hh}:{mm}:{ss}")
            }}</span>
        </template>
      </af-table-column>
      <af-table-column label="生成人" align="center" prop="genBy"/>
      <af-table-column label="磅单打印时间" align="center" prop="poundTime" width="180">
        <template slot-scope="scope">
          <span>{{
              parseTime(scope.row.poundTime, "{y}-{m}-{d} {hh}:{mm}:{ss}")
            }}</span>
        </template>
      </af-table-column>
      <!--<af-table-column label="磅单号" align="center" prop="poundNo" />-->
      <af-table-column label="批次号" align="center" prop="batchNo"/>
      <!--<af-table-column label="提运单号" align="center" prop="loadingBillNo" />-->
      <af-table-column label="生成舱单" align="center" prop="hasManifest"/>
      <af-table-column label="生成集报清单" align="center" prop="hasDeclare"/>
      <af-table-column label="生成进境确报" align="center" prop="hasTransit"/>
      <af-table-column label="状态" align="center" prop="storeState">
        <template slot-scope="scope">
          {{
            storeStateDic.find((item) => item.key === scope.row.storeState).label
          }}
        </template>
      </af-table-column>
      <af-table-column label="进场时间" align="center" prop="inTime">
        <template slot-scope="scope">
          <span>{{
              parseTime(scope.row.inTime, "{y}-{m}-{d} {hh}:{mm}:{ss}")
            }}</span>
        </template>
      </af-table-column>
      <af-table-column label="进场通道" align="center" prop="inChannel"/>
      <af-table-column label="出场时间" align="center" prop="outTime">
        <template slot-scope="scope">
          <span>{{
              parseTime(scope.row.outTime, "{y}-{m}-{d} {hh}:{mm}:{ss}")
            }}</span>
        </template>
      </af-table-column>
      <af-table-column label="出场通道" align="center" prop="outChannel"/>
      <!--<af-table-column label="文件ID" align="center" prop="fileId" />-->
      <!--<af-table-column label="放行单号" align="center" prop="passNo"/>-->
      <!-- <af-table-column label="乐观锁" align="center" prop="revision" />-->
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.storeState === '0'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:instoreDoc:edit']">修改
          </el-button>
          <el-button
            v-show="scope.row.storeState === '0'"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:instoreDoc:remove']">删除
          </el-button>
        </template>
      </af-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改入库通知单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!-- <el-form-item label="场所编号 场所编号" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所编号 场所编号" />
        </el-form-item>
        <el-form-item label="通知单号 通知单号" prop="docNo">
          <el-input v-model="form.docNo" placeholder="请输入通知单号 通知单号" />
        </el-form-item>
        <el-form-item label="业务编号" prop="storeCode">
          <el-input v-model="form.storeCode" placeholder="请输入业务编号" />
        </el-form-item>
        <el-form-item label="寄舱客户" prop="checkConsumer">
          <el-input v-model="form.checkConsumer" placeholder="请输入寄舱客户" />
        </el-form-item>
        <el-form-item label="寄舱合同号" prop="checkContractNo">
          <el-input v-model="form.checkContractNo" placeholder="请输入寄舱合同号" />
        </el-form-item>
        <el-form-item label="蒙方磅单号 蒙方磅单号" prop="mongoliaBillNo">
          <el-input v-model="form.mongoliaBillNo" placeholder="请输入蒙方磅单号 蒙方磅单号" />
        </el-form-item>-->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="寄舱客户" prop="checkConsumer">
              <el-select
                filterable
                clearable
                v-model="form.checkConsumer"
                placeholder="请选择寄舱客户"
                @change="changeCustomer">
                <el-option
                  v-for="type in customerList"
                  :key="type.customerName"
                  :label="type.customerName"
                  :value="type.customerName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="寄舱合同" prop="checkContractNo">
              <el-select
                v-model="form.checkContractNo"
                placeholder="请选择寄舱合同"
                @change="changeContract"
              >
                <el-option
                  v-for="type in contractSubList"
                  :key="type.contractNo"
                  :label="type.contractNo"
                  :value="type.contractNo"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库位号" prop="storeCode">
              <el-select v-model="form.storeCode" placeholder="请输入库位号">
                <el-option
                  v-for="type in storeIds"
                  :key="type.storeCode"
                  :label="type.storeCode"
                  :value="type.storeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="11">
            <el-form-item label="车号" prop="vehicleNo">
              <el-input v-model="form.vehicleNo" placeholder="请输入车号"/>
            </el-form-item>
          </el-col>
          <!-- 蒙文键盘 -->
          <el-col :span="1">
            <el-popover placement="right" width="500" trigger="click">
              <SimpleKeyboard
                @onChange="mengwenInput"
                :input="form.vehicleNo"
              />
              <el-button
                slot="reference"
                class="fa fa-keyboard-o"
                size="mini"
              ></el-button>
            </el-popover>
          </el-col>
          <el-col :span="12">
            <el-form-item label="司机姓名" prop="driverName">
              <el-input
                v-model="form.driverName"
                placeholder="请输入司机姓名"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="蒙方净重(KG)" prop="mongoliaNetWeight">
              <el-input
                v-model.number="form.mongoliaNetWeight"
                placeholder="请输入蒙方净重"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="蒙方皮重(KG)" prop="mongoliaTareWeight">
              <el-input
                v-model.number="form.mongoliaTareWeight"
                placeholder="请输入蒙方皮重"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="车队联系人" prop="vehicleTeamContact">
              <el-input
                v-model="form.vehicleTeamContact"
                placeholder="请输入车队联系人"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车队联系电话" prop="vehicleTeamTel">
              <el-input
                v-model="form.vehicleTeamTel"
                placeholder="请输入车队联系电话"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!--<el-form-item label="挂车号1 挂车号1" prop="trailerNo1">
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
        </el-form-item>-->
        <!--<el-form-item label="计量单位(吨)" prop="measuringUnit">
          <el-input v-model="form.measuringUnit" placeholder="请输入计量单位(吨)" />
        </el-form-item>-->
        <!--<el-form-item label="包装方式(集装箱，散装)" prop="packMode">
          <el-input v-model="form.packMode" placeholder="请输入包装方式(集装箱，散装)" />
        </el-form-item>-->
        <el-row :gutter="10" v-show="form.packMode === '1'">
          <el-col :span="12">
            <el-form-item label="集装箱号1" prop="containerNo1">
              <el-input
                v-model="form.containerNo1"
                placeholder="请输入集装箱号1"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="集装箱号2" prop="containerNo2">
              <el-input
                v-model="form.containerNo2"
                placeholder="请输入集装箱号2"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-show="form.packMode === '1'">
          <el-col :span="12"
          >
            <el-form-item label="集装箱号3" prop="containerNo3">
              <el-input
                v-model="form.containerNo3"
                placeholder="请输入集装箱号3"
              />
            </el-form-item
            >
          </el-col>
          <el-col :span="12">
            <el-form-item label="集装箱号4" prop="containerNo4">
              <el-input
                v-model="form.containerNo4"
                placeholder="请输入集装箱号4"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!--<el-form-item label="净重" prop="netWeight">
          <el-input v-model="form.netWeight" placeholder="请输入净重" />
        </el-form-item>
        <el-form-item label="皮重" prop="tareWeight">
          <el-input v-model="form.tareWeight" placeholder="请输入皮重" />
        </el-form-item>
        <el-form-item label="毛重" prop="roughWeight">
          <el-input v-model="form.roughWeight" placeholder="请输入毛重" />
        </el-form-item>-->
        <!-- <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row> -->

        <!--<el-form-item label="生成时间" prop="genTime">
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
        </el-form-item>-->
        <!--<el-form-item label="状态(0,待入库，1已入库，2可放行，3已生成放行单)" prop="storeState">
          <el-input v-model="form.storeState" placeholder="请输入状态(0,待入库，1已入库，2可放行，3已生成放行单)" />
        </el-form-item>-->
        <!-- <el-form-item label="文件ID" prop="fileId">
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
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listInstoreDoc,
  getInstoreDoc,
  delInstoreDoc,
  addInstoreDoc,
  updateInstoreDoc,
} from "@/api/place/instoreDoc";
import {getUserDepts} from "@/utils/charutils";
import {listStoreContract} from "@/api/place/storeContract";
import SimpleKeyboard from "@/components/SimpleKeyboard/SimpleKeyboard";

export default {
  name: "InstoreDoc",
  components: {
    SimpleKeyboard,
  },
  data() {
    return {
      dateRange: ['',''],
      timeDic: [
        {'key':'1','value':'进场时间'},
        {'key':'0','value':'出场时间'}
      ],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      depts: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 入库通知单表格数据
      instoreDocList: [],
      importTypeDic: [
        {value: "1", label: "入库通知单"},
        {value: "0", label: "出库派车单"},
      ],
      storeIds: [],
      contractList: [],
      customerList: [], //寄舱客户列表
      contractSubList: [], //合同子集，在选定寄舱客户时，从合同表里取出对应客户的合同放入到这个集合中
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
        remark: undefined,
        checkConsumer: undefined,
        checkContractNo: undefined,
        mongoliaBillNo: undefined,
        vehicleNo: undefined,
        trailerNo1: undefined,
        templateType: undefined,
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
        beginTime: undefined,
        endTime: undefined,
        orderByColumn: "id",
        isAsc: "desc",
      },
      // 表单参数
      form: {},
      goodsNameList: [],
      // 表单校验
      rules: {
        docNo: [
          {required: true, message: "通知单号不能为空", trigger: "blur"},
        ],
        storeCode: [
          {
            type: "string",
            required: true,
            message: "库位号不能为空",
            trigger: "change",
          },
        ],
        checkConsumer: [
          {
            type: "string",
            required: true,
            message: "寄舱客户不能为空",
            trigger: "blur",
          },
        ],
        checkContractNo: [
          {required: true, message: "寄舱合同不能为空", trigger: "change"},
        ],
        vehicleNo: [
          {required: true, message: "车号不能为空", trigger: "blur"},
          {min: 8, max: 8, message: "请输入7位有效车号", trigger: "blur"}
        ],
        mongoliaNetWeight: [
          {required: true, message: "蒙方净重不能为空", trigger: "blur"},
          {type: "number", message: "请输入数字", trigger: "blur"},
        ],
        mongoliaTareWeight: [
          {required: true, message: "蒙方皮重不能为空", trigger: "blur"},
          {type: "number", message: "请输入数字", trigger: "blur"},
        ],
      },
      storeStateDic: [
        {key: "0", label: "未进场"},
        {key: "2", label: "已进场"},
        {key: "1", label: "已入库"},
      ],
    };
  },
  created() {
    this.dateRange = ['','']
    //this.queryParams.beginTime = this.dateRange[0]
    //this.queryParams.endTime = this.dateRange[1]
    this.depts = getUserDepts("0");
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId;
      this.getList();
      this.getContract(this.queryParams.placeId, "1");
    }
    //煤种 品名
    this.getDicts("coal_type").then(response => {
      this.goodsNameList = response.data;
    });
  },
  methods: {
    /** 查询入库通知单列表 */
    getList() {
      this.loading = true;

      if(this.queryParams.remark && this.queryParams.remark !== '' ){
          if(this.dateRange[0] !=='' && this.dateRange[1]!== ''){
            this.queryParams.beginTime = this.dateRange[0]
            this.queryParams.endTime = this.dateRange[1]
          }else{
            this.queryParams.remark = undefined
            this.queryParams.beginTime = undefined
            this.queryParams.endTime = undefined
          }
      }
      listInstoreDoc(this.queryParams).then((response) => {
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
        placeId: this.queryParams.placeId,
        docNo: undefined,
        //storeCode: undefined,
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
      };
      this.resetForm("form");
      this.contractSubList = [];
      //this.customerList = [];
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.form.placeId = this.queryParams.placeId
      this.getList();
      //this.getContract(this.queryParams.placeId, "1"); //加载这个场所下的合同
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 合同id取寄仓场所
    changeContract(event) {
      this.storeIds = [];
      this.form.storeCode = ""; //库位号对应的表单项
      this.contractSubList.forEach((element) => {
        if (element.contractNo === event) {
          //将得到的企业属性赋值到应用的对象中
          //this.form.checkConsumer = element.customerName
          this.storeIds = element.params.contract;
          if (this.storeIds.length > 0) {
          } else {
            this.$message.warning("此合同没有指定库位");
          }
          // this.form.storeCode = element.storeIds
        }
      });
    },
    //获取场所下有效的合同 列表
    getContract(placeId, status) {
      //查找合同
      listStoreContract({placeId: placeId, status: status}).then((response) => {
          if (response.code === 200) {
            this.contractList = response.rows;
            if (this.contractList.length === 0) {
              //this.$message.warning("此场所没有有效的合同");
            } else {
              //重新给客户列表 赋值
              this.customerList = [];
              for (let contract of this.contractList) {
                if (!this.customerList.find((cus) => cus.customerId === contract.customerId)) {
                  this.customerList.push(contract);
                }
              }
            }
          }
        }
      );
    },
    changeCustomer(event) {
      //改变客户时
      //从合同列表中，把对应公司名字的合同都提取出来
      this.form.checkContractNo = "";
      this.form.storeCode = "";
      this.contractSubList = this.contractList.filter(
        (item) => item.customerName === event
      );
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加入库通知单";
      //this.getContract(this.queryParams.placeId, "1"); //加载这个场所下的合同
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getInstoreDoc(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改入库通知单";

        this.contractSubList = this.contractList.filter((item) => item.customerName === this.form.checkConsumer);
        //this.changeContract(this.form.contractId)
        this.contractSubList.forEach((element) => {
          if (element.contractNo === this.form.checkContractNo) {
            //将得到的企业属性赋值到应用的对象中
            //this.form.checkConsumer = element.customerName
            this.storeIds = element.params.contract;
            if (this.storeIds.length > 0) {
            } else {
              this.$message.warning("此合同没有指定库位");
            }
            // this.form.storeCode = element.storeIds
          }
        });
      });

      //this.getContract(this.queryParams.placeId, "1"); //加载这个场所下的合同
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateInstoreDoc(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else { //新增
            this.form.templateType = "1";
            this.form.placeId = this.queryParams.placeId;
            //console.log(this.form)
            addInstoreDoc(this.form).then((response) => {
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
      this.$confirm(
        '是否确认删除入库通知单编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delInstoreDoc(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "place/instoreDoc/export",
        {
          ...this.queryParams,
        },
        `place_instoreDoc.xlsx`
      );
    },
    mengwenInput(input) {
      this.form.vehicleNo = input;
    },
    setTime(event){
      console.log(event)
      if(event==''){
        this.dateRange = ['','']
      }
    },
    placeChange(){
      this.getContract()
      this.getList()
    }
  },
};
</script>
