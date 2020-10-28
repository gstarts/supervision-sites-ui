<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          v-model="queryParams.placeId" placeholder="请选择场所" size="small" @change="getList">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
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
      <el-form-item label="电子车牌" prop="vehicleElecNo">
        <el-input
          v-model="queryParams.vehicleElecNo"
          placeholder="请输入电子车牌"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="车辆类型" prop="vehicleType">
        <el-select v-model="queryParams.vehicleType" placeholder="请选择车辆类型" clearable size="small">
          <el-option
            v-for="type in vehicle_type"
            :key="type.value"
            :label="type.label"
            :value="type.value"
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
          v-hasPermi="['system:vehicle_info:add']"
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
          v-hasPermi="['system:vehicle_info:edit']"
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
          v-hasPermi="['system:vehicle_info:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:vehicle_info:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="vehicle_infoList">
     <!-- <el-table-column type="selection" width="55" align="center"/>-->
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="车牌号" align="center" prop="vehicleNo"/>
      <el-table-column label="电子车牌" align="center" prop="vehicleElecNo"/>
      <el-table-column label="车辆类型" align="center" prop="vehicleType">
        <template slot-scope="scope">
          {{vehicle_type.find(item=>item.value === scope.row.vehicleType).label}}
        </template>
      </el-table-column>
      <el-table-column label="场所名称" align="center" prop="placeId">
        <template slot-scope="scope">
          {{depts.find(item=>item.deptId === scope.row.placeId).deptName}}
        </template>
      </el-table-column>
      <el-table-column label="场所编号" align="center" prop="placeId"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:vehicle_info:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:vehicle_info:remove']"
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

    <!-- 添加或修改vehicle对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
         <el-col :span="12">
           <el-form-item label="场所" prop="placeId">
             <el-select v-model="form.placeId" placeholder="请选择场站">
               <el-option
                 v-for="dept in depts1"
                 :key="dept.deptId"
                 :label="dept.deptName"
                 :value="dept.deptId"
               />
             </el-select>
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item label="车牌号" prop="vehicleNo">
             <el-input v-model="form.vehicleNo" placeholder="请输入车牌号"/>
           </el-form-item>
         </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="电子车牌" prop="vehicleElecNo">
              <el-input v-model="form.vehicleElecNo" placeholder="请输入电子车牌"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车辆类型" prop="vehicleType">
              <el-select v-model="form.vehicleType" placeholder="请选择车辆类型">
                <el-option
                  v-for="type in vehicle_type"
                  :key="type.value"
                  :label="type.label"
                  :value="type.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注"/>
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
		listVehicle_info,
		getVehicle_info,
		delVehicle_info,
		addVehicle_info,
		updateVehicle_info, listVehicleNoList
	} from "@/api/system/vehicle_info";
	import store from '@/store/index'
	import {getUserDepts} from '@/utils/charutils'

	export default {
		name: "Vehicle_info",
		data() {
			return {
				// 遮罩层
				loading: true,
				// 选中数组
				ids: [],
				depts: [],
        depts1: [],
				// 非单个禁用
				single: true,
				// 非多个禁用
				multiple: true,
				// 总条数
				total: 0,
				// vehicle表格数据
				vehicle_infoList: [],
				vehicle_type: [
					{'value': '1', 'label': '货运车辆'},
					{'value': '2', 'label': '行政车辆'}
				],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					vehicleNo: undefined,
					vehicleElecNo: undefined,
					placeId: undefined,
					vehicleType: undefined,
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					placeId: [
						{required: true, message: "场所不能为空", trigger: "change"}
          ],
					vehicleNo: [
						{required: true, message: "车牌号不能为空", trigger: "blur"}
					],
					vehicleType: [
						{required: true, message: "车辆类型不能为空", trigger: "change"}
          ]
				}
			};
		},
		created() {

			this.depts = getUserDepts('')

			this.depts1 = [...this.depts]
			this.depts.unshift({deptId: '', deptName: '全部'})

			if (this.depts.length > 0) {
				this.queryParams.placeId = this.depts[0].deptId
			}
			//this.depts = store.getters.dept.children
			//this.depts.push(store.getters.dept)
			//console.log(this.depts)
			this.getList();

		},
		methods: {
			/** 查询vehicle列表 */
			getList() {
				this.loading = true;
				listVehicle_info(this.queryParams).then(response => {
					this.vehicle_infoList = response.rows;
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
					vehicleNo: undefined,
					vehicleElecNo: undefined,
					placeId: undefined,
					vehicleType: undefined,
					createBy: undefined,
					createTime: undefined,
					updateBy: undefined,
					updateTime: undefined,
					remark: undefined
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
				this.title = "添加车辆信息";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getVehicle_info(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改车辆信息";
				});
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateVehicle_info(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								}
							});
						} else {
							addVehicle_info(this.form).then(response => {
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
				this.$confirm('是否确认删除vehicle编号为"' + ids + '"的数据项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function () {
					return delVehicle_info(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function () {
				});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('system/vehicle_info/export', {
					...this.queryParams
				}, `system_vehicle_info.xlsx`)
			}
		}
	};
</script>
