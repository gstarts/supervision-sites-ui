<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="堆场编号" prop="yardCode">
        <el-input
          v-model="queryParams.yardCode"
          placeholder="请输入堆场编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="yardName">
        <el-input
          v-model="queryParams.yardName"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input
          v-model="queryParams.contact"
          placeholder="请输入联系人"
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
          v-hasPermi="['yard:info:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['yard:info:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['yard:info:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:info:export']"
        >导出</el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="yard_infoList" @selection-change="handleSelectionChange">
      <!--<el-table-column type="selection" width="55" align="center" fixed="left" />-->
      <el-table-column label="ID" align="center" prop="id" fixed="left" />
      <el-table-column label="堆场编号" align="center" >
        <template slot-scope="scope">
          <router-link :to="'/yard/zone/' + scope.row.id" class="link-type">
            <span>{{ scope.row.yardCode }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" prop="yardName" />
      <el-table-column label="简称" align="center" prop="sortName" />
      <el-table-column label="地址" align="center" prop="address" />
      <el-table-column label="面积(㎡)" align="center" prop="area" />
      <el-table-column label="所属企业" align="center" prop="company" />
      <el-table-column label="联系人" align="center" prop="contact" />
      <el-table-column label="联系电话" align="center" prop="phone" />
      <el-table-column label="集装箱容量" align="center" prop="containerCapacity" />
      <el-table-column label="集装箱报警(%)" align="center" prop="conainerAlarmValue" />
      <el-table-column label="散杂货容量" align="center" prop="bulkgoodsCapacity" />
      <el-table-column label="散杂货报警(%)" align="center" prop="bulkgoodsAlarmValue" />
      <el-table-column label="当前集装箱容量" align="center" prop="containerCount" />
      <el-table-column label="当前散杂货容量" align="center" prop="bulkgoodsCount" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yard:info:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yard:info:remove']"
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
    
    <!-- 添加或修改堆场基本信息对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="堆场编号" prop="yardCode">
          <el-input v-model="form.yardCode" placeholder="请输入堆场编号" />
        </el-form-item>
        <el-form-item label="名称" prop="yardName">
          <el-input v-model="form.yardName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="简称" prop="sortName">
          <el-input v-model="form.sortName" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="面积(㎡)" prop="area">
          <el-input v-model="form.area" placeholder="请输入面积(㎡)" />
        </el-form-item>
        <el-form-item label="所属企业" prop="company">
          <el-input v-model="form.company" placeholder="请输入所属企业" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="form.contact" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="集装箱容量" prop="containerCapacity">
          <el-input v-model="form.containerCapacity" placeholder="请输入集装箱容量" />
        </el-form-item>
        <el-form-item label="集装箱报警(%)" prop="conainerAlarmValue">
          <el-input v-model="form.conainerAlarmValue" placeholder="请输入集装箱容量报警阈值" />
        </el-form-item>
        <el-form-item label="散杂货容量" prop="bulkgoodsCapacity">
          <el-input v-model="form.bulkgoodsCapacity" placeholder="请输入散杂货容量" />
        </el-form-item>
        <el-form-item label="散杂货报警(%)" prop="bulkgoodsAlarmValue">
          <el-input v-model="form.bulkgoodsAlarmValue" placeholder="请输入散杂货容量报警阈值" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="当前集装箱容量" prop="containerCount">
          <el-input v-model="form.containerCount" placeholder="请输入当前集装箱容量" />
        </el-form-item>
        <el-form-item label="当前散杂货容量" prop="bulkgoodsCount">
          <el-input v-model="form.bulkgoodsCount" placeholder="请输入当前散杂货容量" />
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
	import { listYard_info, getYard_info, delYard_info, addYard_info, updateYard_info } from "@/api/yard/info";

	export default {
		name: "Yard_info",
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
				// 堆场基本信息表格数据
				yard_infoList: [],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					yardCode: undefined,
					yardName: undefined,
					contact: undefined,
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					yardCode: [
						{ required: true, message: "堆场编号不能为空", trigger: "blur" }
					],
					yardName: [
						{ required: true, message: "名称不能为空", trigger: "blur" }
					],
					containerCapacity: [
						{ required: true, message: "集装箱容量不能为空", trigger: "blur" }
					],
					conainerAlarmValue: [
						{ required: true, message: "集装箱容量报警阈值不能为空", trigger: "blur" }
					],
					bulkgoodsCapacity: [
						{ required: true, message: "散杂货容量不能为空", trigger: "blur" }
					],
					bulkgoodsAlarmValue: [
						{ required: true, message: "散杂货容量报警阈值不能为空", trigger: "blur" }
					],
				}
			};
		},
		created() {
      this.getList();
		},
		methods: {
			/** 查询堆场基本信息列表 */
			getList() {
				this.loading = true;
				listYard_info(this.queryParams).then(response => {
					this.yard_infoList = response.rows;
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
					yardCode: undefined,
					yardName: undefined,
					sortName: undefined,
					address: undefined,
					area: undefined,
					company: undefined,
					contact: undefined,
					phone: undefined,
					containerCapacity: undefined,
					conainerAlarmValue: undefined,
					bulkgoodsCapacity: undefined,
					bulkgoodsAlarmValue: undefined,
					remark: undefined,
					createBy: undefined,
					createTime: undefined,
					updateBy: undefined,
					updateTime: undefined,
					containerCount: undefined,
					bulkgoodsCount: undefined
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
				this.title = "添加堆场基本信息";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getYard_info(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改堆场基本信息";
				});
			},
			/** 提交按钮 */
			submitForm: function() {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateYard_info(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								}
							});
						} else {
							addYard_info(this.form).then(response => {
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
				this.$confirm('是否确认删除堆场编号为"' + row.yardCode + '"的数据项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function() {
					return delYard_info(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function() {});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('yard/info/export', {
					...this.queryParams
				}, `yard_info.xlsx`)
			}
		}
	};
</script>
