<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
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
      <el-form-item label="批次号" prop="batchNo">
        <el-input
          v-model="queryParams.batchNo"
          placeholder="请输入批次号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入库通知单号" prop="inNoticeNo" label-width="100px">
        <el-input
          v-model="queryParams.inNoticeNo"
          placeholder="请输入入库通知单号"
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
      <!--<el-form-item label="寄舱合同" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入寄舱合同编号"
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
      </el-form-item>-->
      <!--<el-form-item label="提运单号" prop="deliveryNo">
        <el-input
          v-model="queryParams.deliveryNo"
          placeholder="请输入提运单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="司机姓名" prop="driverName">
        <el-input
          v-model="queryParams.driverName"
          placeholder="请输入司机姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="卸车结束时间" prop="endTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择卸车结束时间">
        </el-date-picker>
      </el-form-item>-->
      <!--<el-form-item label="车队名称" prop="fleetName">
        <el-input
          v-model="queryParams.fleetName"
          placeholder="请输入车队名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!-- <el-form-item label="通知单产生时间" prop="genTime">
         <el-date-picker clearable size="small" style="width: 200px"
           v-model="queryParams.genTime"
           type="date"
           value-format="yyyy-MM-dd"
           placeholder="选择通知单产生时间">
         </el-date-picker>
       </el-form-item>-->
      <!--<el-form-item label="件数" prop="goodsCount">
        <el-input
          v-model="queryParams.goodsCount"
          placeholder="请输入件数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      
      <!-- <el-form-item label="机械号" prop="mechanicalNo">
         <el-input
           v-model="queryParams.mechanicalNo"
           placeholder="请输入机械号"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->
      <!--<el-form-item label="机械员" prop="mechanicalPerson">
        <el-input
          v-model="queryParams.mechanicalPerson"
          placeholder="请输入机械员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="场所ID" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入场所ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车头号" prop="primeMoverNo">
        <el-input
          v-model="queryParams.primeMoverNo"
          placeholder="请输入车头号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="销售合同" prop="saleContractNo">
        <el-input
          v-model="queryParams.saleContractNo"
          placeholder="请输入销售合同号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单号" prop="soNo">
        <el-input
          v-model="queryParams.soNo"
          placeholder="请输入订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="卸车开始时间" prop="startTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择卸车开始时间">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item label="状态" prop="state">
        <el-select clearable
                   v-model="queryParams.state" placeholder="请选择状态" size="small">
          <el-option
            v-for="dept in stateDic"
            :key="dept.value"
            :label="dept.label"
            :value="dept.value"
          />
        </el-select>
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
      </el-form-item>
      <el-form-item label="装卸组" prop="unloadGroup">
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
          v-hasPermi="['tax:instore_notice:add']"
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
          v-hasPermi="['tax:instore_notice:edit']"
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
          v-hasPermi="['tax:instore_notice:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:instore_notice:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="instore_noticeList" @selection-change="handleSelectionChange">
      <!--<af-table-column type="selection" align="center" />-->
      <!--<af-table-column label="ID" align="center" prop="id" />-->
      <af-table-column label="入库通知单号" align="center" prop="inNoticeNo" width="190px"/>
      <!--<af-table-column label="备注" align="center" prop="remark" />-->
      <!--<af-table-column label="预订库位号" align="center" prop="bookStoreCode" width="180" />-->
      <af-table-column label="业务编号" align="center" prop="businessNo"/>
      <af-table-column label="寄舱客户" align="center" prop="checkConsumer" width="180px"/>
      <af-table-column label="寄舱合同编号" align="center" prop="contractNo"/>
      <af-table-column label="销售合同号" align="center" prop="saleContractNo"/>
      <af-table-column label="批次号" align="center" prop="batchNo"/>
      <af-table-column label="司机姓名" align="center" prop="driverName"/>
      <af-table-column label="车牌号" align="center" prop="vehicleNo" width="90px"/>
      <af-table-column label="车板号" align="center" prop="trailerNo" width="90px"/>
      <af-table-column label="车队号" align="center" prop="convoyNo"/>
      <af-table-column label="车队名称" align="center" prop="fleetName"/>
      <!-- <af-table-column label="报关单号" align="center" prop="customsDeclarationNo" />
       <af-table-column label="提运单号" align="center" prop="deliveryNo" />-->
      <!--<af-table-column label="卸车结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>-->
      <af-table-column label="件数" align="center" prop="goodsCount"/>
      <!--<af-table-column label="机械号" align="center" prop="mechanicalNo" />
      <af-table-column label="机械员" align="center" prop="mechanicalPerson" />-->
      <!--<af-table-column label="场所ID" align="center" prop="placeId" />-->
      <!--<af-table-column label="车头号" align="center" prop="primeMoverNo" />-->
      <af-table-column label="订单号" align="center" prop="soNo"/>
      <!--<af-table-column label="卸车开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>-->
      <!--<af-table-column label="理货员" align="center" prop="tallyClerk" />-->
      <af-table-column label="总毛重(KG)" align="center" prop="totalRoughWeight"/>
      <!--<af-table-column label="装卸组" align="center" prop="unloadGroup" />-->
      
      <!--<af-table-column label="工组人员" align="center" prop="workGroup" />-->
      <af-table-column label="状态" align="center" prop="state">
        <template slot-scope="scope">
          {{stateDic.find(item =>item.value === scope.row.state).label}}
        </template>
      </af-table-column>
      <af-table-column label="产生时间" align="center" prop="genTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.genTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="打印时间" align="center" prop="printTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.printTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="磅单时间" align="center" prop="poundTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.poundTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="完成时间" align="center" prop="competeTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.competeTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="归档时间" align="center" prop="archiveTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.archiveTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="190px">
        <template slot-scope="scope">
          <el-button v-show="scope.row.state==='1'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['tax:instore_notice:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleNoticeDetail(scope.row)"
            v-hasPermi="['tax:instore_notice_detail:list']"
          >明细
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleNoticePrint(scope.row)"
            v-hasPermi="['tax:instore_notice:print']"
          >打印
          </el-button>
          <el-button v-show="scope.row.templateId == null"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row)"
                     v-hasPermi="['tax:instore_notice:remove']"
          >删除
          </el-button>
          <!--<el-button v-show="scope.row.state === '1'"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="genDoc(scope.row)"
                     v-hasPermi="['tax:instore_notice:gen']"
          >生成入库单
          </el-button>-->
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
    
    <!-- 添加或修改入库通知单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="入库通知单号" prop="inNoticeNo">
              <el-input v-model="form.inNoticeNo" placeholder="请输入入库通知单号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务编号" prop="businessNo">
              <el-input v-model="form.businessNo" placeholder="请输入业务编号"/>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="寄舱客户" prop="checkConsumer">
              <el-input v-model="form.checkConsumer" placeholder="请输入寄舱客户"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="寄舱合同编号" prop="contractNo">
              <el-input v-model="form.contractNo" placeholder="请输入寄舱合同编号"/>
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
            <el-form-item label="批次号" prop="batchNo">
              <el-input v-model="form.batchNo" placeholder="请输入批次号"/>
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
            <el-form-item label="车牌号" prop="vehicleNo">
              <el-input v-model="form.vehicleNo" placeholder="请输入车牌号"/>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="车板号" prop="trailerNo">
              <el-input v-model="form.trailerNo" placeholder="请输入车板号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车队号" prop="convoyNo">
              <el-input v-model="form.convoyNo" placeholder="请输入车队号"/>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="车队名称" prop="fleetName">
              <el-input v-model="form.fleetName" placeholder="请输入车队名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="件数" prop="goodsCount">
              <el-input v-model="form.goodsCount" placeholder="请输入件数"/>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="订单号" prop="soNo">
              <el-input v-model="form.soNo" placeholder="请输入订单号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总毛重" prop="totalRoughWeight">
              <el-input v-model="form.totalRoughWeight" placeholder="请输入总毛重"/>
            </el-form-item>
          </el-col>
        </el-row>
       <!-- <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="状态" prop="state">
              <el-input v-model="form.state" placeholder="请输入状态"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产生时间" prop="genTime">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.genTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择通知单产生时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>-->
        
        <!--<el-row type="flex">
          <el-col :span="12">
            <el-form-item label="打印时间" prop="printTime">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.printTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择打印时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="磅单时间" prop="poundTime">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.poundTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择磅单时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        
        </el-row>
        
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="完成时间" prop="competeTime">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.competeTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择完成时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归档时间" prop="archiveTime">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.archiveTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择归档时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>-->
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
		listInstore_notice,
		getInstore_notice,
		delInstore_notice,
		addInstore_notice,
		updateInstore_notice, genStoreDoc
	} from "@/api/tax/instore_notice";
	import {getUserDepts} from '@/utils/charutils'

	export default {
		name: "Instore_notice",
		data() {
			return {
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
				instore_noticeList: [],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					batchNo: undefined,
					bookStoreCode: undefined,
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
					inNoticeNo: undefined,
					mechanicalNo: undefined,
					mechanicalPerson: undefined,
					placeId: undefined,
					primeMoverNo: undefined,
					saleContractNo: undefined,
					soNo: undefined,
					startTime: undefined,
					state: undefined,
					tallyClerk: undefined,
					totalRoughWeight: undefined,
					trailerNo: undefined,
					unloadGroup: undefined,
					vehicleNo: undefined,
					workGroup: undefined,
					orderByColumn: 'id',
					isAsc: 'desc'
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					inNoticeNo: [
						{required: true, message: "入库通知单号不能为空", trigger: "blur"}
					],
					placeId: [
						{required: true, message: "场所ID不能为空", trigger: "blur"}
					],
				},
				stateDic: [
					{'value': '1', 'label': '生成'},
					{'value': '2', 'label': '打印'},
					{'value': '3', 'label': '磅单'},
					{'value': '4', 'label': '完成'},
					{'value': '5', 'label': '归档'},
				]
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
			/** 查询入库通知单列表 */
			getList() {
				this.loading = true;
				listInstore_notice(this.queryParams).then(response => {
					this.instore_noticeList = response.rows;
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
					bookStoreCode: undefined,
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
					inNoticeNo: undefined,
					mechanicalNo: undefined,
					mechanicalPerson: undefined,
					placeId: this.queryParams.placeId,
					primeMoverNo: undefined,
					saleContractNo: undefined,
					soNo: undefined,
					startTime: undefined,
					state: undefined,
					tallyClerk: undefined,
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
				this.ids = selection.map(item => item.id)
				this.single = selection.length != 1
				this.multiple = !selection.length
			},
			/** 新增按钮操作 */
			handleAdd() {
				this.reset();
				this.open = true;
				this.title = "添加入库通知单";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getInstore_notice(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改入库通知单";
				});
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateInstore_notice(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								}
							});
						} else {
							addInstore_notice(this.form).then(response => {
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
				this.$confirm('是否确认删除入库通知单号为"' + row.inNoticeNo + '"的数据项及其子项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function () {
					return delInstore_notice(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function () {
				});
			},
			handleNoticeDetail(row) {
				console.log(row.inNoticeNo)
				this.$router.push({
					path: '/tax/instore/notice/detail',
					query: {
						'noticeNo': row.inNoticeNo,
						'placeId': row.placeId
					}
				})
			},
			handleNoticePrint(row) {
				console.log(row.inNoticeNo)
				this.$router.push({
					path: '/tax/instore/notice/print',
					query: {
						'noticeNo': row.inNoticeNo,
						'placeId': row.placeId
					}
				})
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('tax/instore_notice/export', {
					...this.queryParams
				}, `tax_instore_notice.xlsx`)
			},
			/*genDoc(row) {
				genStoreDoc(row.placeId, 1, row.inNoticeNo, 'A10103').then(response => {
					console.log(response)
          if(response.code === 200){
          	this.getList()
          }
				})
			}*/
		}
	};
</script>
