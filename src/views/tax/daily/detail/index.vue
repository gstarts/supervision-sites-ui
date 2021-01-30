<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="运输批次" prop="shipmentNo">
        <el-input
          v-model="queryParams.shipmentNo"
          placeholder="请输入运输批次"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="销售合同号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入销售合同号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单号" prop="salesOrderNo">
        <el-input
          v-model="queryParams.salesOrderNo"
          placeholder="请输入订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批次" prop="lotNo">
        <el-input
          v-model="queryParams.lotNo"
          placeholder="请输入批次"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车队名称" prop="nameOfTruckFleet">
        <el-input
          v-model="queryParams.nameOfTruckFleet"
          placeholder="请输入车队名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车头-车板号" prop="primeMoverNoTrailerNo">
        <el-input
          v-model="queryParams.primeMoverNoTrailerNo"
          placeholder="请输入车头-车板号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="司机名称" prop="driverName">
        <el-input
          v-model="queryParams.driverName"
          placeholder="请输入司机名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车数" prop="truckQty">
        <el-input
          v-model="queryParams.truckQty"
          placeholder="请输入车数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户" prop="smelterName">
        <el-input
          v-model="queryParams.smelterName"
          placeholder="请输入客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数量" prop="qtyOfBags">
        <el-input
          v-model="queryParams.qtyOfBags"
          placeholder="请输入数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计达货日" prop="etaGqmd">
        <el-input
          v-model="queryParams.etaGqmd"
          placeholder="请输入预计达货日"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际达到日" prop="ataGqmd">
        <el-input
          v-model="queryParams.ataGqmd"
          placeholder="请输入实际达到日"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ot 单据-重量" prop="otGw">
        <el-input
          v-model="queryParams.otGw"
          placeholder="请输入ot 单据-重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ot 单据-wt" prop="otBagNetWt">
        <el-input
          v-model="queryParams.otBagNetWt"
          placeholder="请输入ot 单据-wt"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ot 单据-per" prop="otBagGrossWt">
        <el-input
          v-model="queryParams.otBagGrossWt"
          placeholder="请输入ot 单据-per"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金航入库磅单-重量" prop="gw">
        <el-input
          v-model="queryParams.gw"
          placeholder="请输入金航入库磅单-重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金航入库磅单-" prop="bagNetWt">
        <el-input
          v-model="queryParams.bagNetWt"
          placeholder="请输入金航入库磅单-"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金航入库磅单-" prop="bagGrossWt">
        <el-input
          v-model="queryParams.bagGrossWt"
          placeholder="请输入金航入库磅单-"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金航入库磅单-" prop="emptyTruckWt">
        <el-input
          v-model="queryParams.emptyTruckWt"
          placeholder="请输入金航入库磅单-"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际到达边境时间" prop="ataGmd1stCheckPoint">
        <el-input
          v-model="queryParams.ataGmd1stCheckPoint"
          placeholder="请输入实际到达边境时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="到达金航时间" prop="ataJhBt">
        <el-input
          v-model="queryParams.ataJhBt"
          placeholder="请输入到达金航时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="卸货开始时间" prop="startingTimeOfOffloading">
        <el-input
          v-model="queryParams.startingTimeOfOffloading"
          placeholder="请输入卸货开始时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="卸货完成时间" prop="endingTimeOfOffloading">
        <el-input
          v-model="queryParams.endingTimeOfOffloading"
          placeholder="请输入卸货完成时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="离开金航时间" prop="timeOfFleetDepartingJh">
        <el-input
          v-model="queryParams.timeOfFleetDepartingJh"
          placeholder="请输入离开金航时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位" prop="binCodeOfStorage">
        <el-input
          v-model="queryParams.binCodeOfStorage"
          placeholder="请输入库位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="破损袋数" prop="quantityOfDamagedBag">
        <el-input
          v-model="queryParams.quantityOfDamagedBag"
          placeholder="请输入破损袋数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="破损袋号" prop="damagedBagNo">
        <el-input
          v-model="queryParams.damagedBagNo"
          placeholder="请输入破损袋号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际出库时间" prop="atdJhBt">
        <el-input
          v-model="queryParams.atdJhBt"
          placeholder="请输入实际出库时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="queryParams.remarks"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="createdBy">
        <el-input
          v-model="queryParams.createdBy"
          placeholder="请输入创建人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="乐观锁" prop="version">
        <el-input
          v-model="queryParams.version"
          placeholder="请输入乐观锁"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createdTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.createdTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新人" prop="updatedBy">
        <el-input
          v-model="queryParams.updatedBy"
          placeholder="请输入更新人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="更新时间" prop="updatedTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.updatedTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择更新时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
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
          v-hasPermi="['manifest:detail:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['manifest:detail:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['manifest:detail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['manifest:detail:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="detailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="运输批次" align="center" prop="shipmentNo" />
      <el-table-column label="销售合同号" align="center" prop="contractNo" />
      <el-table-column label="订单号" align="center" prop="salesOrderNo" />
      <el-table-column label="批次" align="center" prop="lotNo" />
      <el-table-column label="车队名称" align="center" prop="nameOfTruckFleet" />
      <el-table-column label="车头-车板号" align="center" prop="primeMoverNoTrailerNo" />
      <el-table-column label="司机名称" align="center" prop="driverName" />
      <el-table-column label="车数" align="center" prop="truckQty" />
      <el-table-column label="客户" align="center" prop="smelterName" />
      <el-table-column label="数量" align="center" prop="qtyOfBags" />
      <el-table-column label="预计达货日" align="center" prop="etaGqmd" />
      <el-table-column label="实际达到日" align="center" prop="ataGqmd" />
      <el-table-column label="ot 单据-重量" align="center" prop="otGw" />
      <el-table-column label="ot 单据-wt" align="center" prop="otBagNetWt" />
      <el-table-column label="ot 单据-per" align="center" prop="otBagGrossWt" />
      <el-table-column label="金航入库磅单-重量" align="center" prop="gw" />
      <el-table-column label="金航入库磅单-" align="center" prop="bagNetWt" />
      <el-table-column label="金航入库磅单-" align="center" prop="bagGrossWt" />
      <el-table-column label="金航入库磅单-" align="center" prop="emptyTruckWt" />
      <el-table-column label="实际到达边境时间" align="center" prop="ataGmd1stCheckPoint" />
      <el-table-column label="到达金航时间" align="center" prop="ataJhBt" />
      <el-table-column label="卸货开始时间" align="center" prop="startingTimeOfOffloading" />
      <el-table-column label="卸货完成时间" align="center" prop="endingTimeOfOffloading" />
      <el-table-column label="离开金航时间" align="center" prop="timeOfFleetDepartingJh" />
      <el-table-column label="库位" align="center" prop="binCodeOfStorage" />
      <el-table-column label="破损袋数" align="center" prop="quantityOfDamagedBag" />
      <el-table-column label="破损袋号" align="center" prop="damagedBagNo" />
      <el-table-column label="实际出库时间" align="center" prop="atdJhBt" />
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column label="创建人" align="center" prop="createdBy" />
      <el-table-column label="乐观锁" align="center" prop="version" />
      <el-table-column label="创建时间" align="center" prop="createdTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人" align="center" prop="updatedBy" />
      <el-table-column label="更新时间" align="center" prop="updatedTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updatedTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['daily:detail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['daily:detail:remove']"
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

    <!-- 添加或修改日报明细 对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="运输批次" prop="shipmentNo">
          <el-input v-model="form.shipmentNo" placeholder="请输入运输批次" />
        </el-form-item>
        <el-form-item label="销售合同号" prop="contractNo">
          <el-input v-model="form.contractNo" placeholder="请输入销售合同号" />
        </el-form-item>
        <el-form-item label="订单号" prop="salesOrderNo">
          <el-input v-model="form.salesOrderNo" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="批次" prop="lotNo">
          <el-input v-model="form.lotNo" placeholder="请输入批次" />
        </el-form-item>
        <el-form-item label="车队名称" prop="nameOfTruckFleet">
          <el-input v-model="form.nameOfTruckFleet" placeholder="请输入车队名称" />
        </el-form-item>
        <el-form-item label="车头-车板号" prop="primeMoverNoTrailerNo">
          <el-input v-model="form.primeMoverNoTrailerNo" placeholder="请输入车头-车板号" />
        </el-form-item>
        <el-form-item label="司机名称" prop="driverName">
          <el-input v-model="form.driverName" placeholder="请输入司机名称" />
        </el-form-item>
        <el-form-item label="车数" prop="truckQty">
          <el-input v-model="form.truckQty" placeholder="请输入车数" />
        </el-form-item>
        <el-form-item label="客户" prop="smelterName">
          <el-input v-model="form.smelterName" placeholder="请输入客户" />
        </el-form-item>
        <el-form-item label="数量" prop="qtyOfBags">
          <el-input v-model="form.qtyOfBags" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="预计达货日" prop="etaGqmd">
          <el-input v-model="form.etaGqmd" placeholder="请输入预计达货日" />
        </el-form-item>
        <el-form-item label="实际达到日" prop="ataGqmd">
          <el-input v-model="form.ataGqmd" placeholder="请输入实际达到日" />
        </el-form-item>
        <el-form-item label="ot 单据-重量" prop="otGw">
          <el-input v-model="form.otGw" placeholder="请输入ot 单据-重量" />
        </el-form-item>
        <el-form-item label="ot 单据-wt" prop="otBagNetWt">
          <el-input v-model="form.otBagNetWt" placeholder="请输入ot 单据-wt" />
        </el-form-item>
        <el-form-item label="ot 单据-per" prop="otBagGrossWt">
          <el-input v-model="form.otBagGrossWt" placeholder="请输入ot 单据-per" />
        </el-form-item>
        <el-form-item label="金航入库磅单-重量" prop="gw">
          <el-input v-model="form.gw" placeholder="请输入金航入库磅单-重量" />
        </el-form-item>
        <el-form-item label="金航入库磅单-" prop="bagNetWt">
          <el-input v-model="form.bagNetWt" placeholder="请输入金航入库磅单-" />
        </el-form-item>
        <el-form-item label="金航入库磅单-" prop="bagGrossWt">
          <el-input v-model="form.bagGrossWt" placeholder="请输入金航入库磅单-" />
        </el-form-item>
        <el-form-item label="金航入库磅单-" prop="emptyTruckWt">
          <el-input v-model="form.emptyTruckWt" placeholder="请输入金航入库磅单-" />
        </el-form-item>
        <el-form-item label="实际到达边境时间" prop="ataGmd1stCheckPoint">
          <el-input v-model="form.ataGmd1stCheckPoint" placeholder="请输入实际到达边境时间" />
        </el-form-item>
        <el-form-item label="到达金航时间" prop="ataJhBt">
          <el-input v-model="form.ataJhBt" placeholder="请输入到达金航时间" />
        </el-form-item>
        <el-form-item label="卸货开始时间" prop="startingTimeOfOffloading">
          <el-input v-model="form.startingTimeOfOffloading" placeholder="请输入卸货开始时间" />
        </el-form-item>
        <el-form-item label="卸货完成时间" prop="endingTimeOfOffloading">
          <el-input v-model="form.endingTimeOfOffloading" placeholder="请输入卸货完成时间" />
        </el-form-item>
        <el-form-item label="离开金航时间" prop="timeOfFleetDepartingJh">
          <el-input v-model="form.timeOfFleetDepartingJh" placeholder="请输入离开金航时间" />
        </el-form-item>
        <el-form-item label="库位" prop="binCodeOfStorage">
          <el-input v-model="form.binCodeOfStorage" placeholder="请输入库位" />
        </el-form-item>
        <el-form-item label="破损袋数" prop="quantityOfDamagedBag">
          <el-input v-model="form.quantityOfDamagedBag" placeholder="请输入破损袋数" />
        </el-form-item>
        <el-form-item label="破损袋号" prop="damagedBagNo">
          <el-input v-model="form.damagedBagNo" placeholder="请输入破损袋号" />
        </el-form-item>
        <el-form-item label="实际出库时间" prop="atdJhBt">
          <el-input v-model="form.atdJhBt" placeholder="请输入实际出库时间" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="创建人" prop="createdBy">
          <el-input v-model="form.createdBy" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="乐观锁" prop="version">
          <el-input v-model="form.version" placeholder="请输入乐观锁" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createdTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createdTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新人" prop="updatedBy">
          <el-input v-model="form.updatedBy" placeholder="请输入更新人" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updatedTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updatedTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间">
          </el-date-picker>
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
import { listDetail, getDetail, delDetail, addDetail, updateDetail } from "@/api/tax/daily/detail";

export default {
  name: "Detail",
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
      // 日报明细 表格数据
      detailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'id',
        isAsc: 'desc',
        shipmentNo: undefined,
        contractNo: undefined,
        salesOrderNo: undefined,
        lotNo: undefined,
        nameOfTruckFleet: undefined,
        primeMoverNoTrailerNo: undefined,
        driverName: undefined,
        truckQty: undefined,
        smelterName: undefined,
        qtyOfBags: undefined,
        etaGqmd: undefined,
        ataGqmd: undefined,
        otGw: undefined,
        otBagNetWt: undefined,
        otBagGrossWt: undefined,
        gw: undefined,
        bagNetWt: undefined,
        bagGrossWt: undefined,
        emptyTruckWt: undefined,
        ataGmd1stCheckPoint: undefined,
        ataJhBt: undefined,
        startingTimeOfOffloading: undefined,
        endingTimeOfOffloading: undefined,
        timeOfFleetDepartingJh: undefined,
        binCodeOfStorage: undefined,
        quantityOfDamagedBag: undefined,
        damagedBagNo: undefined,
        atdJhBt: undefined,
        remarks: undefined,
        createdBy: undefined,
        version: undefined,
        createdTime: undefined,
        updatedBy: undefined,
        updatedTime: undefined
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
  },
  methods: {
    /** 查询日报明细 列表 */
    getList() {
      this.loading = true;
      listDetail(this.queryParams).then(response => {
        this.detailList = response.rows;
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
        shipmentNo: undefined,
        contractNo: undefined,
        salesOrderNo: undefined,
        lotNo: undefined,
        nameOfTruckFleet: undefined,
        primeMoverNoTrailerNo: undefined,
        driverName: undefined,
        truckQty: undefined,
        smelterName: undefined,
        qtyOfBags: undefined,
        etaGqmd: undefined,
        ataGqmd: undefined,
        otGw: undefined,
        otBagNetWt: undefined,
        otBagGrossWt: undefined,
        gw: undefined,
        bagNetWt: undefined,
        bagGrossWt: undefined,
        emptyTruckWt: undefined,
        ataGmd1stCheckPoint: undefined,
        ataJhBt: undefined,
        startingTimeOfOffloading: undefined,
        endingTimeOfOffloading: undefined,
        timeOfFleetDepartingJh: undefined,
        binCodeOfStorage: undefined,
        quantityOfDamagedBag: undefined,
        damagedBagNo: undefined,
        atdJhBt: undefined,
        remarks: undefined,
        createdBy: undefined,
        version: undefined,
        createdTime: undefined,
        updatedBy: undefined,
        updatedTime: undefined
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
      this.title = "添加日报明细 ";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDetail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改日报明细 ";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateDetail(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addDetail(this.form).then(response => {
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
      this.$confirm('是否确认删除日报明细 编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDetail(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('daily/detail/export', {
        ...this.queryParams
      }, `daily_detail.xlsx`)
    }
  }
};
</script>
