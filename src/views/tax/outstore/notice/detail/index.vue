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
      <el-form-item label="出库通知单号" prop="outstoreNoticeNo" label-width="180px">
        <el-input
          v-model="queryParams.outstoreNoticeNo"
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
      <!--<el-form-item label="净重" prop="bagNetWeight">
        <el-input
          v-model="queryParams.bagNetWeight"
          placeholder="请输入净重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="袋号" prop="bagNumber">
        <el-input
          v-model="queryParams.bagNumber"
          placeholder="请输入袋号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="毛重" prop="bagRoughWeight">
        <el-input
          v-model="queryParams.bagRoughWeight"
          placeholder="请输入毛重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="袋封号" prop="bagSealNo">
        <el-input
          v-model="queryParams.bagSealNo"
          placeholder="请输入袋封号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <!--<el-form-item label="是否已加工,0未加工，1已加工" prop="hasProcess">
        <el-input
          v-model="queryParams.hasProcess"
          placeholder="请输入是否已加工,0未加工，1已加工"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      
     <!-- <el-form-item label="包装单位" prop="packingUnit">
        <el-input
          v-model="queryParams.packingUnit"
          placeholder="请输入包装单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="货位号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入货位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['tax:outstore_notice_detail:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:outstore_notice_detail:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:outstore_notice_detail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:outstore_notice_detail:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="outstore_notice_detailList">
      <af-table-column label="出库通知单号" align="center" prop="outstoreNoticeNo"/>
      <af-table-column label="货位号" align="center" prop="storeCode" />
      <!--<af-table-column label="货位号" align="center" prop="id" />-->
      <!--<af-table-column label="货位号" align="center" prop="remark" />-->
      <af-table-column label="批次号" align="center" prop="batchNo" />
      <af-table-column label="品名" align="center" prop="goodsName" />
      <af-table-column label="袋封号" align="center" prop="bagSealNo" />
      <af-table-column label="袋号" align="center" prop="bagNumber" />
      <af-table-column label="净重" align="center" prop="bagNetWeight" />
      <af-table-column label="毛重" align="center" prop="bagRoughWeight" />
      <af-table-column label="包装单位" align="center" prop="packingUnit" />
      <af-table-column label="是否已加工" align="center" prop="hasProcess" />
      <!--<af-table-column label="场所ID" align="center" prop="placeId" />-->
      <!--<af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:outstore_notice_detail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:outstore_notice_detail:remove']"
          >删除</el-button>
        </template>
      </af-table-column>-->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改入库通知单明细对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="入库通知单号" prop="outstoreNoticeNo">
              <el-input v-model="form.outstoreNoticeNo" placeholder="请输入入库通知单号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="批次号" prop="batchNo">
              <el-input v-model="form.batchNo" placeholder="请输入批次号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="袋封号" prop="bagSealNo">
              <el-input v-model="form.bagSealNo" placeholder="请输入袋封号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="袋号" prop="bagNumber">
              <el-input v-model="form.bagNumber" placeholder="请输入袋号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="品名" prop="goodsName">
              <el-input v-model="form.goodsName" placeholder="请输入品名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="包装单位" prop="packingUnit">
              <el-input v-model="form.packingUnit" placeholder="请输入包装单位" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="货位号" prop="storeCode">
              <el-input v-model="form.storeCode" placeholder="请输入货位号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否已加工" prop="hasProcess">
              <el-input v-model="form.hasProcess" placeholder="请输入是否已加工,0未加工，1已加工" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="净重" prop="bagNetWeight">
              <el-input v-model="form.bagNetWeight" placeholder="请输入净重" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毛重" prop="bagRoughWeight">
              <el-input v-model="form.bagRoughWeight" placeholder="请输入毛重" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="场所ID" prop="placeId" style="display: none">
          <el-input v-model="form.placeId" placeholder="请输入场所ID" />
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
import { listOutstore_notice_detail, getOutstore_notice_detail, delOutstore_notice_detail, addOutstore_notice_detail, updateOutstore_notice_detail } from "@/api/tax/outstore_notice_detail";
import {getUserDepts} from '@/utils/charutils'

export default {
  name: "Outstore_notice_detail",
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
      // 入库通知单明细表格数据
      outstore_notice_detailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        bagNetWeight: undefined,
        bagNumber: undefined,
        bagRoughWeight: undefined,
        bagSealNo: undefined,
        batchNo: undefined,
        goodsName: undefined,
        hasProcess: undefined,
        outstoreNoticeNo: undefined,
        packingUnit: undefined,
        placeId: undefined,
        storeCode: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        placeId: [
          { required: true, message: "场所ID不能为空", trigger: "blur" }
        ],
	      outstoreNoticeNo: [
		      { required: true, message: "通知单号不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {

	  let queryPlaceId = this.$route.query.placeId
	  let queryNoticeNo = this.$route.query.noticeNo

	  // 参数不为空，并非参数在用户权限范围内
	  if (typeof (queryPlaceId) != 'undefined' && this.depts.findIndex((v) => {
		  return v.deptId === queryPlaceId
	  }) !== -1) {
		  this.queryParams.placeId = queryPlaceId
	  }
	  if (typeof (queryNoticeNo) != 'undefined') {
		  this.queryParams.outstoreNoticeNo = queryNoticeNo
	  }
	  this.depts = getUserDepts('1')
	  if (this.depts.length > 0) {
		  this.queryParams.placeId = this.depts[0].deptId
		  this.getList();
	  }
  },
  methods: {
    /** 查询入库通知单明细列表 */
    getList() {
      this.loading = true;
      listOutstore_notice_detail(this.queryParams).then(response => {
        this.outstore_notice_detailList = response.rows;
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
        bagNetWeight: undefined,
        bagNumber: undefined,
        bagRoughWeight: undefined,
        bagSealNo: undefined,
        batchNo: undefined,
        goodsName: undefined,
        hasProcess: undefined,
        outstoreNoticeNo: this.queryParams.outstoreNoticeNo,
        packingUnit: undefined,
        placeId: this.queryParams.placeId,
        storeCode: undefined
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
      this.title = "添加入库通知单明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOutstore_notice_detail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改入库通知单明细";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateOutstore_notice_detail(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addOutstore_notice_detail(this.form).then(response => {
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
      this.$confirm('是否确认删除入库通知单明细编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOutstore_notice_detail(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/outstore_notice_detail/export', {
        ...this.queryParams
      }, `tax_outstore_notice_detail.xlsx`)
    }
  }
};
</script>
