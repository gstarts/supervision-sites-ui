<template>
  <div class="app-container">
    
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="堆场" prop="yardId">
        <el-select v-model="yardId" placeholder="请选择堆场" size="small">
          <el-option
            v-for="yard in yard_infoList"
            :key="yard.id"
            :label="yard.yardCode+'-'+yard.yardName"
            :value="yard.id"
          />
        </el-select>
      </el-form-item>
      <!--<el-input
        v-model="queryParams.yardId"
        placeholder="请输入堆场ID"
        clearable
        size="small"
        @keyup.enter.native="handleQuery"
      />-->
      
      <el-form-item label="区域代码" prop="zoneCode">
        <el-input
          v-model="queryParams.zoneCode"
          placeholder="请输入区域代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域类型" prop="zoneType">
        <el-select v-model="queryParams.zoneType" placeholder="请选择区域类型" clearable size="small">
          <el-option
            v-for="dict in zoneTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="库位编号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位层数" prop="storeLevel">
        <el-input
          v-model="queryParams.storeLevel"
          placeholder="请输入库位层数"
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
          v-hasPermi="['yard:zone:add']"
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
          v-hasPermi="['yard:zone:edit']"
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
          v-hasPermi="['yard:zone:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:zone:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="zoneList" @selection-change="handleSelectionChange">
      <el-table-column label="ID" align="center" prop="id"/>
      <!--<el-table-column label="堆场ID" align="center" prop="yardId" />-->
      <el-table-column label="区域代码" align="center" prop="zoneCode"/>
      <el-table-column label="区域类型" align="center" prop="zoneType" :formatter="zoneTypeFormat"/>
      <el-table-column label="库位名称" align="center" prop="storeName"/>
      <el-table-column label="库位编号" align="center" prop="storeCode"/>
      <el-table-column label="库位层数" align="center" prop="storeLevel"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yard:zone:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yard:zone:remove']"
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
    
    <!-- 添加或修改堆场库位信息 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="堆场" prop="yardId">
          <el-input v-model="form.yardId" placeholder="请输入堆场ID" value="form.yardId" :disabled="true"/>
        </el-form-item>
        <el-form-item label="区域代码" prop="zoneCode">
          <el-input v-model="form.zoneCode" placeholder="请输入区域代码"/>
        </el-form-item>
        <el-form-item label="区域类型">
          <el-select v-model="form.zoneType" placeholder="请选择区域类型">
            <el-option
              v-for="dict in zoneTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位名称" prop="storeName">
          <el-input v-model="form.storeName" placeholder="请输入库位名称"/>
        </el-form-item>
        <el-form-item label="库位编号" prop="storeCode">
          <el-input v-model="form.storeCode" placeholder="请输入库位编号"/>
        </el-form-item>
        <el-form-item label="库位层数" prop="storeLevel">
          <el-input v-model="form.storeLevel" placeholder="请输入库位层数"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
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
	import {listZone, getZone, delZone, addZone, updateZone} from "@/api/yard/zone";
	import {listYard_info} from '@/api/yard/info'

	export default {
		name: "Zone",
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
				// 堆场库位信息 表格数据
				zoneList: [],
				//当前选中的yardId
				yardId: '',
				//堆场列表
				yard_infoList: [],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 区域类型字典
				zoneTypeOptions: [],
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					yardId: undefined,
					zoneCode: undefined,
					zoneType: undefined,
					storeCode: undefined,
					storeLevel: undefined,
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					yardId: [
						{required: true, message: "堆场ID不能为空", trigger: "blur"}
					],
					zoneCode: [
						{required: true, message: "区域代码不能为空", trigger: "blur"}
					],
					zoneType: [
						{required: true, message: "区域类型不能为空", trigger: "blur"}
					],
					storeCode: [
						{required: true, message: "库位编号不能为空", trigger: "blur"}
					],
					storeLevel: [
						{required: true, message: "库位层数不能为空", trigger: "blur"}
					],
				}
			};
		},
		created() {
			//接收参数
			this.yardId = this.$route.params && this.$route.params.yardId;
			this.getDicts("yard_zone_type").then(response => {
				this.zoneTypeOptions = response.data;
			});
   
			if (this.yardId === ':yardId') {
				this.loading = true
				listYard_info({}).then(response => {
					this.yard_infoList = response.rows;
					this.yardId = this.yard_infoList[0].id
          this.form.yardId = this.yardId
					this.queryParams.yardId = this.yard_infoList[0].id
					this.getList()
				});
			} else {
				listYard_info({}).then(response => {
					this.yard_infoList = response.rows;
					this.yardId = this.yard_infoList[0].id
				});
				this.queryParams.yardId = this.yardId
        this.form.yardId = this.yardId
				this.getList()
			}


		},
		methods: {
			/** 查询堆场库位信息 列表 */
			getList() {
				this.loading = true;
				listZone(this.queryParams).then(response => {
					this.zoneList = response.rows;
					this.total = response.total;
					this.loading = false;
				});
			},
			// 区域类型字典翻译
			zoneTypeFormat(row, column) {
				return this.selectDictLabel(this.zoneTypeOptions, row.zoneType);
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
					yardId: undefined,
					zoneCode: undefined,
					zoneType: undefined,
					storeName: undefined,
					storeCode: undefined,
					storeLevel: undefined,
					remark: undefined,
					createBy: undefined,
					createTime: undefined,
					updateBy: undefined,
					updateTime: undefined
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
				this.form.yardId = this.yardId
				this.title = "添加堆场库位信息 ";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getZone(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改堆场库位信息 ";
				});
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateZone(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								}
							});
						} else {
							addZone(this.form).then(response => {
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
				this.$confirm('是否确认删除堆场库位信息 编号为"' + ids + '"的数据项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function () {
					return delZone(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function () {
				});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('yard/zone/export', {
					...this.queryParams
				}, `yard_zone.xlsx`)
			}
		}
	};
</script>
