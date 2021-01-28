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
      <el-form-item label="出库单号" prop="outDocNo">
        <el-input
          v-model="queryParams.outDocNo"
          placeholder="请输入出库单号"
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
      <el-form-item label="业务编号" prop="businessNo">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入业务编号"
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

      <el-form-item label="车牌号" prop="vehicleNo">
        <el-input
          v-model="queryParams.vehicleNo"
          placeholder="请输入车牌号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button
          size="mini"
          @click="print"
          type="info"
          :disabled="multiple"
          icon="el-icon-printer">
          打印
        </el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:outstore_doc:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="outstore_docList" @selection-change="handleSelectionChange">
      <af-table-column type="selection" width="55" align="center" />
      <af-table-column label="ID" align="center" prop="id" />
      <af-table-column label="出库单号" align="center" prop="outDocNo" />
     <!-- <af-table-column label="备注" align="center" prop="remark" />-->
      <af-table-column label="批次号" align="center" prop="batchNo" />
      <af-table-column label="业务编号" align="center" prop="businessNo" />
      <af-table-column label="销售合同号" align="center" prop="saleContractNo" />
      <af-table-column label="寄仓客户" align="center" prop="checkConsumer" />
      <af-table-column label="寄仓合同编号" align="center" prop="contractNo" />
      <!--<af-table-column label="车队号" align="center" prop="convoyNo" />-->
      <!--<af-table-column label="报关单号" align="center" prop="customsDeclarationNo" />
      <af-table-column label="提运单号" align="center" prop="deliveryNo" />-->
      <af-table-column label="司机姓名" align="center" prop="driverName" />
      <af-table-column label="司机身份证号" align="center" prop="driverIdCard" />
      <!--<af-table-column label="卸车结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>-->
      <!--<af-table-column label="车队名称" align="center" prop="fleetName" />-->
      <af-table-column label="产生时间" align="center" prop="genTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.genTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="件数" align="center" prop="goodsCount" />
      <af-table-column label="嘉友司机" align="center" prop="jyDriver" />
      <!--<af-table-column label="机械号" align="center" prop="mechanicalNo" />
      <af-table-column label="机械员" align="center" prop="mechanicalPerson" />
      <af-table-column label="车头号" align="center" prop="primeMoverNo" />-->
      <af-table-column label="订单号" align="center" prop="soNo" />
      <!--<af-table-column label="卸车开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
        </template>
      </af-table-column>-->
      <af-table-column label="运输方式" align="center" prop="transportMode" >
        <template slot-scope="scope">
          {{ scope.row.transportMode && scope.row.transportMode==='2'?'短倒':'长途' }}
        </template>
      </af-table-column>
      <af-table-column label="状态" align="center" prop="state" />
      <af-table-column label="库位号" align="center" prop="storeCode" />
      <!--<af-table-column label="理货员" align="center" prop="tallyClerk" />
      <af-table-column label="捆扎加固人员" align="center" prop="tieUpPerson" />-->
      <af-table-column label="净重(含袋)" align="center" prop="realRoughWeight" />
      <af-table-column label="毛重" align="center" prop="totalRoughWeight" />
      <af-table-column label="皮重" align="center" prop="tareWeight" />
      <af-table-column label="车板号" align="center" prop="trailerNo" />
      <af-table-column label="装卸组" align="center" prop="unloadGroup" />
      <af-table-column label="车牌号" align="center" prop="vehicleNo" />
      <af-table-column label="工组人员" align="center" prop="workGroup" />
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <!--<el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:outstore_doc:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:outstore_doc:remove']"
          >删除</el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDetail(scope.row)"
            v-hasPermi="['tax:outstore_doc_detail:list']"
          >明细</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handlePrint(scope.row)"
            v-hasPermi="['tax:outstore_doc:print']"
          >打印</el-button>
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

  </div>
</template>

<script>
import { listOutstore_doc, getOutstore_doc, delOutstore_doc, addOutstore_doc, updateOutstore_doc } from "@/api/tax/outstore_doc";
import {getUserDepts} from '@/utils/charutils'
import {updateDocNotice} from '@/api/tax/instore_notice'

export default {
  name: "Outstore_doc",
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
      // 出库单表格数据
      outstore_docList: [],

      inNoticeNoList: [],
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
        outDocNo: undefined,
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
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        placeId: [
          { required: true, message: "场所ID不能为空", trigger: "blur" }
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
    /** 查询出库单列表 */
    getList() {
      this.loading = true;
      listOutstore_doc(this.queryParams).then(response => {
        this.outstore_docList = response.rows;
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
        outDocNo: undefined,
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
      this.inNoticeNoList = selection.map(item => item.outDocNo)
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加出库单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOutstore_doc(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改出库单";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateOutstore_doc(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addOutstore_doc(this.form).then(response => {
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
      this.$confirm('是否确认删除出库单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOutstore_doc(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/outstore_doc/export', {
        ...this.queryParams
      }, `tax_outstore_doc.xlsx`)
    },
	  handleNoticeDetail(row) {
		  console.log(row.inNoticeNo)
		  this.$router.push({
			  path: '/tax/outstore/notice/detail',
			  query: {
				  'noticeNo': row.inNoticeNo,
				  'placeId': row.placeId
			  }
		  })
	  },
	  handlePrint(row) {
		  console.log(row.inNoticeNo)
      this.inNoticeNoList.push(row.outDocNo)
		  this.$router.push({
			  path: '/tax/outstore/doc/print',
			  query: {
				  'noticeNo': this.inNoticeNoList,
				  'placeId': row.placeId
			  }
		  })
	  },

    // 批量打印
    print() {
      this.$router.push({
        path: '/tax/outstore/doc/print',
        query: {
          'noticeNo': this.inNoticeNoList,
          'placeId': this.queryParams.placeId
        }
      })
    },
	  handleDetail(row) {
		  this.$router.push({
			  path: '/tax/outstore/doc/detail',
			  query: {
				  'noticeNo': row.inDocNo,
				  'placeId': row.placeId
			  }
		  })
	  },
  }
};
</script>
