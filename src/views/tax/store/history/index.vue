<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择场所">
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
      <el-form-item label="袋封号" prop="bagSealNo">
        <el-input
          v-model="queryParams.bagSealNo"
          placeholder="请输入袋封号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="品名" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入品名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="是否已加工" prop="hasProcess">
        <el-input
          v-model="queryParams.hasProcess"
          placeholder="请输入是否已加工"
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
     <!-- <el-form-item label="场所ID" prop="placeId">
        <el-input
          v-model="queryParams.placeId"
          placeholder="请输入场所ID"
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
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
          v-hasPermi="['tax:goods_info_history:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:goods_info_history:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:goods_info_history:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:goods_info_history:export']"
        >导出</el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="goods_info_historyList">
     <!-- <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="库位号" align="center" prop="id" />
      <el-table-column label="库位号" align="center" prop="remark" />-->
      <el-table-column label="库位号" align="center" prop="storeCode" />
      <el-table-column label="批次号" align="center" prop="batchNo" />
      <el-table-column label="袋封号" align="center" prop="bagSealNo" />
      <el-table-column label="品名" align="center" prop="goodsName" />
      <el-table-column label="袋号" align="center" prop="bagNumber" />
      <el-table-column label="净重" align="center" prop="bagNetWeight" />
      <el-table-column label="毛重" align="center" prop="bagRoughWeight" />
      <el-table-column label="包装单位" align="center" prop="packingUnit" />
      <el-table-column label="入库单号" align="center" prop="inDocNo" />
      <el-table-column label="出库单号" align="center" prop="outDocNo" />
      
      <!--<el-table-column label="是否已加工" align="center" prop="hasProcess" />-->
      <!--<el-table-column label="场所ID" align="center" prop="placeId" />-->
      <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:goods_info_history:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:goods_info_history:remove']"
          >删除</el-button>
        </template>
      </el-table-column>-->
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
	import { listGoods_info_history, getGoods_info_history, delGoods_info_history, addGoods_info_history, updateGoods_info_history } from "@/api/tax/goods_info_history";
	import {getUserDepts} from '@/utils/charutils'

	export default {
		name: "Goods_info_history",
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
				// 货物历史信息表格数据
				goods_info_historyList: [],
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
			/** 查询货物历史信息列表 */
			getList() {
				this.loading = true;
				listGoods_info_history(this.queryParams).then(response => {
					this.goods_info_historyList = response.rows;
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
					packingUnit: undefined,
					placeId: undefined,
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
				this.title = "添加货物历史信息";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getGoods_info_history(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改货物历史信息";
				});
			},
			/** 提交按钮 */
			submitForm: function() {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateGoods_info_history(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								}
							});
						} else {
							addGoods_info_history(this.form).then(response => {
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
				this.$confirm('是否确认删除货物历史信息编号为"' + ids + '"的数据项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function() {
					return delGoods_info_history(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function() {});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('tax/goods_info_history/export', {
					...this.queryParams
				}, `tax_goods_info_history.xlsx`)
			}
		}
	};
</script>
