<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId" v-show="false">
        <el-select
          v-model="queryParams.placeId" placeholder="请选择场所" size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="出库通知单号" prop="outNoticeNo" label-width="180px;" v-show="false">
        <el-input
          v-model="queryParams.outNoticeNo"
          placeholder="请输入出库通知单号"
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
      <el-form-item label="业务编号" prop="businessNo" v-show="false">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入业务编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="寄仓客户" prop="checkConsumer">
         <el-input
           v-model="queryParams.checkConsumer"
           placeholder="请输入寄仓客户"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->
      <!--<el-form-item label="寄仓合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入寄仓合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="车队号" prop="convoyNo">
        <el-input
          v-model="queryParams.convoyNo"
          placeholder="请输入车队号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="报关单号" prop="customsDeclarationNo">
        <el-input
          v-model="queryParams.customsDeclarationNo"
          placeholder="请输入报关单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提运单号" prop="deliveryNo">
        <el-input
          v-model="queryParams.deliveryNo"
          placeholder="请输入提运单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="司机姓名" prop="driverName">
        <el-input
          v-model="queryParams.driverName"
          placeholder="请输入司机姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="卸车结束时间" prop="endTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择卸车结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="车队名称" prop="fleetName">
        <el-input
          v-model="queryParams.fleetName"
          placeholder="请输入车队名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="产生时间" prop="genTime" v-show="false">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.genTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择通知单产生时间">
        </el-date-picker>
      </el-form-item>
      <!--<el-form-item label="件数" prop="goodsCount">
        <el-input
          v-model="queryParams.goodsCount"
          placeholder="请输入件数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="嘉友司机" prop="jyDriver">
        <el-input
          v-model="queryParams.jyDriver"
          placeholder="请输入嘉友司机"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="机械号" prop="mechanicalNo">
        <el-input
          v-model="queryParams.mechanicalNo"
          placeholder="请输入机械号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机械员" prop="mechanicalPerson">
        <el-input
          v-model="queryParams.mechanicalPerson"
          placeholder="请输入机械员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="车头号" prop="primeMoverNo">
        <el-input
          v-model="queryParams.primeMoverNo"
          placeholder="请输入车头号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="销售合同号" prop="saleContractNo">
        <el-input
          v-model="queryParams.saleContractNo"
          placeholder="请输入销售合同号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!-- <el-form-item label="订单号" prop="soNo">
         <el-input
           v-model="queryParams.soNo"
           placeholder="请输入订单号"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->
      <!--<el-form-item label="卸车开始时间" prop="startTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择卸车开始时间">
        </el-date-picker>
      </el-form-item>-->
      <!--<el-form-item label="状态,未完成，磅单记录时标记，已完成" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入状态,未完成，磅单记录时标记，已完成"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="库位号" prop="storeCode" v-show="false">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="理货员" prop="tallyClerk">
        <el-input
          v-model="queryParams.tallyClerk"
          placeholder="请输入理货员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!-- <el-form-item label="捆扎加固人员" prop="tieUpPerson">
         <el-input
           v-model="queryParams.tieUpPerson"
           placeholder="请输入捆扎加固人员"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->
      <!--<el-form-item label="总毛重" prop="totalRoughWeight">
        <el-input
          v-model="queryParams.totalRoughWeight"
          placeholder="请输入总毛重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="车板号" prop="trailerNo">
        <el-input
          v-model="queryParams.trailerNo"
          placeholder="请输入车板号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="装卸组" prop="unloadGroup">
        <el-input
          v-model="queryParams.unloadGroup"
          placeholder="请输入装卸组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="车牌号" prop="vehicleNo">
        <el-input
          v-model="queryParams.vehicleNo"
          placeholder="请输入车牌号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="工组人员" prop="workGroup">
        <el-input
          v-model="queryParams.workGroup"
          placeholder="请输入工组人员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
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
          v-hasPermi="['tax:outstore_notice:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:outstore_notice:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:outstore_notice:remove']"
        >删除
        </el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['tax:outstore_notice:export']"-->
<!--        >导出-->
<!--        </el-button>-->
<!--      </el-col>-->
      <el-button
        size="mini"
        @click="print"
        type="info"
        :disabled="multiple"
        icon="el-icon-printer">
        打印
      </el-button>
    </el-row>

    <el-table v-loading="loading" :data="outstore_noticeList" @selection-change="handleSelectionChange">
       <af-table-column type="selection" width="55" align="center" />
      <!--<af-table-column label="ID" align="center" prop="id" />-->
      <af-table-column label="出库通知单号" align="center" prop="outNoticeNo"/>
      <!--<af-table-column label="备注" align="center" prop="remark" />-->
      <af-table-column label="批次号" align="center" prop="batchNo"/>
      <af-table-column label="业务编号" align="center" prop="businessNo"/>
      <af-table-column label="寄仓客户" align="center" prop="checkConsumer"/>
      <af-table-column label="寄仓合同编号" align="center" prop="contractNo"/>
      <!--<af-table-column label="车队号" align="center" prop="convoyNo" />-->
      <!--<af-table-column label="报关单号" align="center" prop="customsDeclarationNo" />
      <af-table-column label="提运单号" align="center" prop="deliveryNo" />-->
      <af-table-column label="司机姓名" align="center" prop="driverName"/>
      <af-table-column label="司机身份证号" align="center" prop="driverIdCard"/>
      <!--<af-table-column label="卸车结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>-->
      <af-table-column label="运输方式" align="center" prop="transportMode" >
        <template slot-scope="scope">
          {{ scope.row.transportMode && scope.row.transportMode==='2'?'短倒':'长途' }}
        </template>
      </af-table-column>
      <af-table-column label="生成时间" align="center" prop="genTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.genTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="打印时间" align="center" prop="printTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.printTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="完成时间" align="center" prop="completeTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.completeTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="归档时间" align="center" prop="archiveTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.archiveTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="件数" align="center" prop="goodsCount"/>
      <!--<af-table-column label="嘉友司机" align="center" prop="jyDriver" />
      <af-table-column label="机械号" align="center" prop="mechanicalNo" />
      <af-table-column label="机械员" align="center" prop="mechanicalPerson" />

      <af-table-column label="场所ID" align="center" prop="placeId" />-->
      <af-table-column label="车牌号" align="center" prop="vehicleNo"/>
      <af-table-column label="车板号" align="center" prop="trailerNo"/>
      <af-table-column label="车头号" align="center" prop="primeMoverNo"/>
      <af-table-column label="销售合同号" align="center" prop="saleContractNo"/>
      <af-table-column label="订单号" align="center" prop="soNo"/>
        <!--<af-table-column label="卸车开始时间" align="center" prop="startTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
          </template>
        </af-table-column>-->
      <af-table-column label="状态" align="center" prop="state"/>
      <af-table-column label="库位号" align="center" prop="storeCode"/>
      <af-table-column label="理货员" align="center" prop="tallyClerk"/>
      <af-table-column label="捆扎加固人员" align="center" prop="tieUpPerson"/>
      <af-table-column label="总毛重" align="center" prop="totalRoughWeight"/>
      <af-table-column label="客户" align="center" prop="receiveName"/>
      <!-- <af-table-column label="装卸组" align="center" prop="unloadGroup" />-->
      <!--<af-table-column label="工组人员" align="center" prop="workGroup" />-->
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:outstore_notice:edit']"
          >修改
          </el-button>
          <el-button v-show="scope.row.templateId === null"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row)"
                     v-hasPermi="['tax:outstore_notice:remove']"
          >删除
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleNoticeDetail(scope.row)"
            v-hasPermi="['tax:outstore_notice_detail:list']"
          >明细
          </el-button>
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleNoticePrint(scope.row)"-->
<!--            v-hasPermi="['tax:outstore_notice:print']"-->
<!--          >打印-->
<!--          </el-button>-->
          <el-button v-show="scope.row.archiveTime === null"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleNoticeArchive(scope.row)"
            v-hasPermi="['tax:outstore_notice:archive']"
          >归档
          </el-button>
        </template>
      </af-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改出库通知单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="出库通知单号" prop="outNoticeNo">
              <el-input v-model="form.outNoticeNo" placeholder="请输入出库通知单号"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="批次号" prop="batchNo">
              <el-input v-model="form.batchNo" placeholder="请输入批次号"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="业务编号" prop="businessNo">
              <el-input v-model="form.businessNo" placeholder="请输入业务编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单号" prop="soNo">
              <el-input v-model="form.soNo" placeholder="请输入订单号"/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="寄仓客户" prop="checkConsumer">
              <el-input v-model="form.checkConsumer" placeholder="请输入寄仓客户"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="寄仓合同编号" prop="contractNo">
              <el-input v-model="form.contractNo" placeholder="请输入寄仓合同编号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="司机姓名" prop="driverName">
              <el-input v-model="form.driverName" placeholder="请输入司机姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="司机身份证号" prop="driverIdCard">
              <el-input v-model="form.driverIdCard" placeholder="请输入司机司机身份证号"/>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">
            <el-form-item label="通知单产生时间" prop="genTime">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.genTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择通知单产生时间">
              </el-date-picker>
            </el-form-item>
          </el-col>-->
        </el-row>

        <el-row type="flex">

          <!--<el-col :span="12">
            <el-form-item label="车牌号" prop="vehicleNo">
              <el-input v-model="form.vehicleNo" placeholder="请输入车牌号"/>
            </el-form-item>
          </el-col>-->
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="车头号" prop="primeMoverNo">
              <el-input v-model="form.primeMoverNo" placeholder="请输入车头号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车板号" prop="trailerNo">
              <el-input v-model="form.trailerNo" placeholder="请输入车板号"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="销售合同号" prop="saleContractNo">
              <el-input v-model="form.saleContractNo" placeholder="请输入销售合同号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="件数" prop="goodsCount">
              <el-input v-model="form.goodsCount" placeholder="请输入件数"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <!--<el-col :span="12">
            <el-form-item label="状态" prop="state">
              <el-input v-model="form.state" placeholder="请输入状态,未完成，磅单记录时标记，已完成"/>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="库位号" prop="storeCode">
              <!-- <el-date-picker clearable size="small" style="width: 200px"
                v-model="form.storeCode"
               type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择库位号">
              </el-date-picker> -->
              <el-input v-model="form.storeCode" placeholder="请输入库位号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="理货员" prop="tallyClerk">
              <el-input v-model="form.tallyClerk" placeholder="请输入理货员"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="捆扎加固人员" prop="tieUpPerson">
              <el-input v-model="form.tieUpPerson" placeholder="请输入捆扎加固人员"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="总毛重" prop="totalRoughWeight">
              <el-input v-model="form.totalRoughWeight" placeholder="请输入总毛重"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户" prop="receiveName">
              <el-input v-model="form.receiveName" placeholder="请输入客户"/>
            </el-form-item>
          </el-col>

        </el-row>

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
		listOutstore_notice,
		getOutstore_notice,
		delOutstore_notice,
		addOutstore_notice,
		updateOutstore_notice
	} from "@/api/tax/outstore_notice";
	import {getUserDepts} from '@/utils/charutils'
	import {updateDocNotice} from '@/api/tax/instore_notice'

	export default {
		name: "Outstore_notice",
		data() {
			return {
				// 遮罩层
				loading: false,
				// 选中数组
				ids: [],
				depts: [],
				// 非单个禁用
				single: true,
				// 非多个禁用
				multiple: true,
				// 总条数
				total: 0,
				// 出库通知单表格数据
				outstore_noticeList: [],

        inNoticeNoList:[],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					batchNo: undefined,
					businessNo: undefined,
					checkConsumer: undefined,
					contractNo: undefined,
					convoyNo: undefined,
					customsDeclarationNo: undefined,
					deliveryNo: undefined,
					driverName: undefined,
					endTime: undefined,
					fleetName: undefined,
					genTime: undefined,
					goodsCount: undefined,
					jyDriver: undefined,
					mechanicalNo: undefined,
					mechanicalPerson: undefined,
					outNoticeNo: undefined,
					placeId: undefined,
					primeMoverNo: undefined,
					saleContractNo: undefined,
					soNo: undefined,
					startTime: undefined,
					state: undefined,
					storeCode: undefined,
					tallyClerk: undefined,
					tieUpPerson: undefined,
					totalRoughWeight: undefined,
					trailerNo: undefined,
					unloadGroup: undefined,
					vehicleNo: undefined,
					workGroup: undefined,
					orderByColumn: 'id',
					isAsc: 'desc'
				},
				stateDic: [
					{'value': '1', 'label': '生成'},
					{'value': '2', 'label': '打印'},
					{'value': '3', 'label': '磅单'},
					{'value': '4', 'label': '完成'},
					{'value': '5', 'label': '归档'},
				],
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					placeId: [
						{required: true, message: "场所ID不能为空", trigger: "blur"}
					],
				}
			};
		},
		created() {
			this.depts = getUserDepts('1')
			if (this.depts.length > 0) {
				this.queryParams.placeId = this.depts[0].deptId
				this.getList();
			}
		},
		methods: {
			/** 查询出库通知单列表 */
			getList() {
				this.loading = true;
				listOutstore_notice(this.queryParams).then(response => {
					this.outstore_noticeList = response.rows;
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
					createBy: undefined,
					createTime: undefined,
					remark: undefined,
					updateBy: undefined,
					updateTime: undefined,
					batchNo: undefined,
					businessNo: undefined,
					checkConsumer: undefined,
					contractNo: undefined,
					convoyNo: undefined,
					customsDeclarationNo: undefined,
					deliveryNo: undefined,
					driverName: undefined,
					endTime: undefined,
					fleetName: undefined,
					genTime: undefined,
					goodsCount: undefined,
					jyDriver: undefined,
					mechanicalNo: undefined,
					mechanicalPerson: undefined,
					outNoticeNo: undefined,
					placeId: undefined,
					primeMoverNo: undefined,
					saleContractNo: undefined,
					soNo: undefined,
					startTime: undefined,
					state: undefined,
					storeCode: undefined,
					tallyClerk: undefined,
					tieUpPerson: undefined,
					totalRoughWeight: undefined,
					trailerNo: undefined,
					unloadGroup: undefined,
					vehicleNo: undefined,
					workGroup: undefined
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
			  this.inNoticeNoList = selection.map(item => item.outNoticeNo)
				this.ids = selection.map(item => item.id)
				this.single = selection.length != 1
				this.multiple = !selection.length
			},
			/** 新增按钮操作 */
			handleAdd() {
				this.reset();
				this.open = true;
				this.title = "添加出库通知单";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getOutstore_notice(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改出库通知单";
				});
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateOutstore_notice(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								}
							});
						} else {
							addOutstore_notice(this.form).then(response => {
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
				this.$confirm('是否确认删除出库通知单号为"' + row.outNoticeNo + '"的数据及其子项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function () {
					return delOutstore_notice(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function () {
				});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('tax/outstore_notice/export', {
					...this.queryParams
				}, `tax_outstore_notice.xlsx`)
			},
      //打印
			handleNoticePrint(row) {
        this.inNoticeNoList.push(row .outNoticeNo)
				console.log(row.outNoticeNo)
				this.$router.push({
					path: '/tax/outstore/notice/print',
					query: {
						'noticeNo': this.inNoticeNoList,
						'placeId': row.placeId
					}
				})
			},


      // 批量打印
      print(){
        this.$router.push({
          path: '/tax/outstore/notice/print',
          query: {
            'noticeNo': this.inNoticeNoList,
            'placeId': this.queryParams.placeId
          }
        })
        console.log(this.inNoticeNoList.length)

      },
			handleNoticeDetail(row) {
				console.log(row.outNoticeNo)
				this.$router.push({
					path: '/tax/outstore/notice/detail',
					query: {
						'noticeNo': row.outNoticeNo,
						'placeId': row.placeId
					}
				})
			},
			handleNoticeArchive(row){
				console.log(row)
				updateDocNotice(row.placeId, row.outNoticeNo, 'outnotice', 'archive').then(response=>{
					if(response.code ===200){
						this.$message.success("归档成功")
						this.getList()
					}
				})
			}
		}
	};
</script>
