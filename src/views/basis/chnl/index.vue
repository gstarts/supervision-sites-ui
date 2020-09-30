<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          v-model="queryParams.stationId" placeholder="请选择场所" size="small" @change="getList">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
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
          v-hasPermi="['chnl:chnlConfig:add']"
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
          v-hasPermi="['chnl:chnlConfig:edit']"
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
          v-hasPermi="['chnl:chnlConfig:remove']"
        >删除
        </el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="chnlConfigList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="场所名称" align="center" prop="stationId">
        <template slot-scope="scope">
          {{depts.find(item=>item.deptId === scope.row.stationId).deptName}}
        </template>
      </el-table-column>
      <el-table-column label="场所编号" align="center" prop="stationId"/>
      <el-table-column label="通道代码" align="center" prop="cChnlNo"/>
      <el-table-column label="通道名称" align="center" prop="cChnlName"/>
      <el-table-column label="通道类型" align="center" prop="cChnlType" :formatter="chnlTypeFormat"/>
      <el-table-column label="使用状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['chnl:chnlConfig:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['chnl:chnlConfig:remove']"
          >删除
          </el-button>
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
    
    <!-- 添加或修改通道配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="监管场所" prop="stationId">
          <el-select v-model="form.stationId" placeholder="请选择场站">
            <el-option
              v-for="dept in depts1"
              :key="dept.deptId"
              :label="dept.deptName"
              :value="dept.deptId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="通道编号" prop="cChnlNo">
          <el-input v-model="form.cChnlNo" placeholder="请输入通道编号"/>
        </el-form-item>
        <el-form-item label="通道名称" prop="cChnlName">
          <el-input v-model="form.cChnlName" placeholder="请输入通道名称"/>
        </el-form-item>
        <el-form-item label="车道类型" prop="cChnlType">
          <el-select v-model="form.cChnlType" placeholder="请选择车道类型">
            <el-option
              v-for="dict in chnlTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}
            </el-radio>
          </el-radio-group>
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
	import {
		listChnlConfig,
		getChnlConfig,
		delChnlConfig,
		addChnlConfig,
		updateChnlConfig,
		exportChnlConfig
	} from "@/api/basis/chnlConfig";
	import {getUserDepts} from '@/utils/charutils'

	export default {
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
				// 通道配置表格数据
				chnlConfigList: [],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 通道类型数据字段
				chnlTypeOptions: [],
				// 状态数据字典
				statusOptions: [],
				// 场站列表
				stationOptions: [],

				//用户所在部门
				depts: [],
				depts1: [],
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					stationId: undefined,
					cChnlNo: undefined,
					cChnlName: undefined,
					cChnlType: undefined,
					version: undefined,
					crtime: undefined,
					cruser: undefined,
					crusername: undefined,
					del: undefined
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					stationId: [
						{required: true, message: "监管场所不能为空", trigger: "blur"},
					],
					cChnlNo: [
						{required: true, message: "通道编号不能为空", trigger: "blur"},
					],
					cChnlName: [
						{required: true, message: "通道名称不能为空", trigger: "blur"},
					],
					cChnlType: [
						{required: true, message: "车道类型不能为空", trigger: "blur"},
					],

				}
			};
		},
		created() {

			// 0 监管场所，1保税库，2堆场，3企业
			this.depts = getUserDepts('')

			this.depts1 = [...this.depts]
			this.depts.unshift({deptId: '', deptName: '全部'})
			console.log(this.depts)
			if (this.depts.length > 0) {
				this.queryParams.stationId = this.depts[0].deptId
				this.getList();
			}
			this.getDicts("station_chnl_type").then(response => {
				this.chnlTypeOptions = response.data;
			});
			// this.getDicts("s_dept_type").then(response => {
			// 	this.depts = response.data;
			// });
			this.getDicts("sys_normal_disable").then(response => {
				this.statusOptions = response.data;
			});

			this.getList();
			// this.getStations();
		},
		methods: {
			/** 查询通道配置列表 */
			getList() {
				this.loading = true;
				listChnlConfig(this.queryParams).then(response => {
					this.chnlConfigList = response.rows;
					this.total = response.total;
					this.loading = false;
				});
			},
			// /** 获取场站列表信息 */
			// getStations() {
			//   listInfo().then(response => {
			//     this.stationOptions = response.rows;
			//     console.log(response.rows)
			//   });
			// },
			// 取消按钮
			cancel() {
				this.open = false;
				this.reset();
			},
			// 通道类型翻译 cChnlType
			chnlTypeFormat(row, column) {
				return this.selectDictLabel(this.chnlTypeOptions, row.cChnlType);
			},
			// 数据状态字典翻译
			statusFormat(row, column) {
				return this.selectDictLabel(this.statusOptions, row.status);
			},
			// 表单重置
			reset() {
				this.form = {
					id: undefined,
					stationId: undefined,
					cChnlNo: undefined,
					cChnlName: undefined,
					cChnlType: undefined,
					version: undefined,
					crtime: undefined,
					cruser: undefined,
					crusername: undefined,
					status: "1",
					del: undefined
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
				this.ids = selection.map(item => item.id);
				this.single = selection.length != 1;
				this.multiple = !selection.length;
			},
			/** 新增按钮操作 */
			handleAdd() {
				this.reset();
				this.open = true;
				this.title = "添加通道配置";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids;
				getChnlConfig(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改通道配置";
				});
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateChnlConfig(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								} else {
									this.msgError(response.msg);
								}
							});
						} else {
							addChnlConfig(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("新增成功");
									this.open = false;
									this.getList();
								} else {
									this.msgError(response.msg);
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
					'是否确认删除通道配置编号为"' + ids + '"的数据项?',
					"警告",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
					.then(function () {
						return delChnlConfig(ids);
					})
					.then(() => {
						this.getList();
						this.msgSuccess("删除成功");
					})
					.catch(function () {
					});
			}
		}
	};
</script>
