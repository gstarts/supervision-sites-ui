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
      <el-form-item label="入库单号" prop="instoreDocNo">
        <el-input
          v-model="queryParams.instoreDocNo"
          placeholder="请输入入库单号"
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
      <!--<el-form-item label="是否已加工" prop="hasProcess">
        <el-input
          v-model="queryParams.hasProcess"
          placeholder="请输入是否已加工,0未加工，1已加工"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      
      <!--<el-form-item label="包装单位" prop="packingUnit">
        <el-input
          v-model="queryParams.packingUnit"
          placeholder="请输入包装单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="场所ID" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入场所ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="预订货位号" prop="bookStoreCode">
        <el-input
          v-model="queryParams.bookStoreCode"
          placeholder="请输入预订货位号"
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
      <!--<el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['tax:instore_doc_detail:add']"
        >新增</el-button>
      </el-col>-->
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:instore_doc_detail:edit']"
        >修改</el-button>
      </el-col>-->
      <!--<el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:instore_doc_detail:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:instore_doc_detail:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="instore_doc_detailList" @selection-change="handleSelectionChange">
      <af-table-column type="selection" width="55" align="center" />
      <af-table-column label="ID" align="center" prop="id" />
      <af-table-column label="入库单号" align="center" prop="instoreDocNo" />
      <af-table-column label="货位号" align="center" prop="bookStoreCode" />
      <af-table-column label="批次号" align="center" prop="batchNo" />
      <af-table-column label="袋封号" align="center" prop="bagSealNo" />
      <af-table-column label="品名" align="center" prop="goodsName" />
      <af-table-column label="包装单位" align="center" prop="packingUnit" />
      <af-table-column label="净重" align="center" prop="bagNetWeight" />
      <af-table-column label="毛重" align="center" prop="bagRoughWeight" />
      <!--<af-table-column label="备注" align="center" prop="remark" />-->
      <af-table-column label="袋号" align="center" prop="bagNumber" />
      <af-table-column label="是否已加工" align="center" prop="hasProcess" />
      <!--<af-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:instore_doc_detail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:instore_doc_detail:remove']"
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

    <!-- 添加或修改入库单明细对话框 -->
    <!--<el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="预订货位号" prop="createBy">
          <el-input v-model="form.createBy" placeholder="请输入预订货位号" />
        </el-form-item>
        <el-form-item label="预订货位号" prop="createTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择预订货位号">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预订货位号" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入预订货位号" />
        </el-form-item>
        <el-form-item label="预订货位号" prop="updateBy">
          <el-input v-model="form.updateBy" placeholder="请输入预订货位号" />
        </el-form-item>
        <el-form-item label="预订货位号" prop="updateTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择预订货位号">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="净重" prop="bagNetWeight">
          <el-input v-model="form.bagNetWeight" placeholder="请输入净重" />
        </el-form-item>
        <el-form-item label="袋号" prop="bagNumber">
          <el-input v-model="form.bagNumber" placeholder="请输入袋号" />
        </el-form-item>
        <el-form-item label="毛重" prop="bagRoughWeight">
          <el-input v-model="form.bagRoughWeight" placeholder="请输入毛重" />
        </el-form-item>
        <el-form-item label="袋封号" prop="bagSealNo">
          <el-input v-model="form.bagSealNo" placeholder="请输入袋封号" />
        </el-form-item>
        <el-form-item label="批次号" prop="batchNo">
          <el-input v-model="form.batchNo" placeholder="请输入批次号" />
        </el-form-item>
        <el-form-item label="品名" prop="goodsName">
          <el-input v-model="form.goodsName" placeholder="请输入品名" />
        </el-form-item>
        <el-form-item label="是否已加工,0未加工，1已加工" prop="hasProcess">
          <el-input v-model="form.hasProcess" placeholder="请输入是否已加工,0未加工，1已加工" />
        </el-form-item>
        <el-form-item label="入库单号" prop="instoreDocNo">
          <el-input v-model="form.instoreDocNo" placeholder="请输入入库单号" />
        </el-form-item>
        <el-form-item label="包装单位" prop="packingUnit">
          <el-input v-model="form.packingUnit" placeholder="请输入包装单位" />
        </el-form-item>
        <el-form-item label="场所ID" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所ID" />
        </el-form-item>
        <el-form-item label="预订货位号" prop="bookStoreCode">
          <el-input v-model="form.bookStoreCode" placeholder="请输入预订货位号" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import { listInstore_doc_detail, getInstore_doc_detail, delInstore_doc_detail, addInstore_doc_detail, updateInstore_doc_detail } from "@/api/tax/instore_doc_detail";
import {getUserDepts} from '@/utils/charutils'

export default {
  name: "Instore_doc_detail",
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
      // 入库单明细表格数据
      instore_doc_detailList: [],
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
        instoreDocNo: undefined,
        packingUnit: undefined,
        placeId: undefined,
        bookStoreCode: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        instoreDocNo: [
          { required: true, message: "入库单号不能为空", trigger: "blur" }
        ],
        placeId: [
          { required: true, message: "场所ID不能为空", trigger: "blur" }
        ],
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
		  this.queryParams.instoreDocNo = queryNoticeNo
	  }
	  this.depts = getUserDepts('1')
	  if (this.depts.length > 0) {
		  this.queryParams.placeId = this.depts[0].deptId
		  this.getList();
	  }
  },
  methods: {
    /** 查询入库单明细列表 */
    getList() {
      this.loading = true;
      listInstore_doc_detail(this.queryParams).then(response => {
        this.instore_doc_detailList = response.rows;
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
        instoreDocNo: undefined,
        packingUnit: undefined,
        placeId: undefined,
        bookStoreCode: undefined
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
	    this.queryParams.instoreDocNo = ''
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
      this.title = "添加入库单明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInstore_doc_detail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改入库单明细";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateInstore_doc_detail(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addInstore_doc_detail(this.form).then(response => {
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
      this.$confirm('是否确认删除入库单明细编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delInstore_doc_detail(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/instore_doc_detail/export', {
        ...this.queryParams
      }, `tax_instore_doc_detail.xlsx`)
    }
  }
};
</script>
