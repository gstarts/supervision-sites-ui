<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="堆场" prop="yardId">
        <el-select v-model="queryParams.yardId" placeholder="请选择堆场">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <!--<el-form-item label="作业单号" prop="operationId">
        <el-input
          v-model="queryParams.operationId"
          placeholder="请输入作业单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="作业类型" prop="operationType">
        <el-select v-model="queryParams.operationType" placeholder="请选择作业类型" clearable size="small">
          <el-option
            v-for="dict in operationTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="箱号" prop="containerNo">
        <el-input
          v-model="queryParams.containerNo"
          placeholder="请输入箱号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="箱原库位号" prop="containerOldStoreCode">
        <el-input
          v-model="queryParams.containerOldStoreCode"
          placeholder="请输入箱原库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="箱新库位号" prop="containerNewStoreCode">
        <el-input
          v-model="queryParams.containerNewStoreCode"
          placeholder="请输入箱新库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="散杂货库位号" prop="goodsStoreCode">
        <el-input
          v-model="queryParams.goodsStoreCode"
          placeholder="请输入散杂货库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="货物批次号" prop="goodsBatchNo" label-width="100px">
        <el-input
          v-model="queryParams.goodsBatchNo"
          placeholder="请输入货物批次号"
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
          v-hasPermi="['yard:operation:add']"
        >新增
        </el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['yard:operation_sub:edit']"
        >修改
        </el-button>
      </el-col>-->
      <!--<el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['yard:operation_sub:remove']"
        >删除
        </el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:operation:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="operation_subList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="作业单号" align="center" prop="operationId"/>
      <el-table-column label="堆场" align="center" prop="yardId">
        <template slot-scope="scope">
          <span> {{depts.find(item=>item.deptId === scope.row.yardId).deptName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="作业类型" align="center" prop="operationType" :formatter="operationTypeFormat"/>
      <el-table-column label="箱号" align="center" prop="containerNo"/>
      <el-table-column label="箱原库位号" align="center" prop="containerOldStoreCode"/>
      <el-table-column label="箱新库位号" align="center" prop="containerNewStoreCode"/>
      <!--<el-table-column label="散杂货库位号" align="center" prop="goodsStoreCode"/>-->
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="更新人" align="center" prop="updateBy"/>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yard:operation_sub:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yard:operation_sub:remove']"
          >删除
          </el-button>
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
    
    <!-- 添加或修改作业子单对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!--<el-form-item label="ID" prop="id">
          <el-input v-model="form.id" placeholder="请输入ID"/>
        </el-form-item>-->
        <el-form-item label="作业单号" prop="operationId">
          <el-input v-model="form.operationId" placeholder="请输入作业单号">
            <template slot="append">
              <el-button type="primary" icon="el-icon-magic-stick" @click="generateId"></el-button>
            </template>
          </el-input>
        </el-form-item>
        
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="堆场" prop="yardId">
              <el-select v-model="form.yardId" placeholder="请选择堆场" :disabled="true">
                <el-option
                  v-for="dept in depts"
                  :key="dept.deptId"
                  :label="dept.deptName"
                  :value="dept.deptId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业类型" prop="operationType">
              <el-select v-model="form.operationType" placeholder="请选择作业类型" :disabled="true">
                <el-option
                  v-for="dict in operationTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="箱号" prop="containerNo">
              <el-input v-model="form.containerNo" placeholder="请输入箱号" @keyup.enter.native="getContainerFromStore"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物批次号" prop="goodsBatchNo">
              <el-input v-model="form.goodsBatchNo" placeholder="请输入货物批次号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="原区域" prop="oldZoneCode">
              <el-select v-model="form.oldZoneCode" placeholder="请输入区域" @change="listStore">
                <el-option
                  v-for="zone in zoneList"
                  :key="zone.id"
                  :label="zone.zoneName+(zone.zoneCode<10?'0'+zone.zoneCode:zone.zoneCode)"
                  :value="zone.zoneName+(zone.zoneCode<10?'0'+zone.zoneCode:zone.zoneCode)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原货位号" prop="containerOldStoreCode">
              <el-select v-model="form.containerOldStoreCode" placeholder="请输入货位" @change="getStoreGoods">
                <el-option
                  v-for="store in storeList"
                  :key="store.id"
                  :label="store.storeCode"
                  :value="store.storeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="新区域" prop="newZoneCode">
              <el-select v-model="form.newZoneCode" placeholder="请输入区域" @change="listStore2">
                <el-option
                  v-for="zone in zoneList"
                  :key="zone.id"
                  :label="zone.zoneName+(zone.zoneCode<10?'0'+zone.zoneCode:zone.zoneCode)"
                  :value="zone.zoneName+(zone.zoneCode<10?'0'+zone.zoneCode:zone.zoneCode)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新货位号" prop="containerNewStoreCode">
              <el-select v-model="form.containerNewStoreCode" placeholder="请输入货位" @change="compareStoreCode">
                <el-option
                  v-for="store in storeList2"
                  :key="store.id"
                  :label="store.storeCode"
                  :value="store.storeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
	import {
		listOperation_sub,
		getOperation_sub,
		delOperation_sub,
		addOperation_sub,
	} from "@/api/yard/operation_sub"

	import {listZone} from '@/api/yard/zone'
	import {listStoreCanUse} from '@/api/yard/store'
	import {getUserDepts} from '@/utils/charutils'
	import {getStore_detail_byStoreCode, listStore_detail} from '@/api/yard/store_detail'
	import {genTimeCode} from '@/utils/common'

	export default {
		name: "Operation_sub",
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
				// 作业子单表格数据
				operation_subList: [],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 作业类型字典
				operationTypeOptions: [],
				zoneList: [],
				storeList: [],
				storeList2: [],
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					operationId: undefined,
					yardId: undefined,
					operationType: undefined,
					containerNo: undefined,
					//containerOldStoreCode: undefined,
					//containerNewStoreCode: undefined,
					//goodsStoreCode: undefined,
					goodsBatchNo: undefined
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					operationId: [
						{required: true, message: "作业单号不能为空", trigger: "blur"}
					],
					yardId: [
						{required: true, message: "堆场不能为空", trigger: "change"}
					],
					operationType: [
						{required: true, message: "作业不能为空", trigger: "change"}
					],
					zoneType: [
						{required: true, message: "区域类型不能为空", trigger: "change"}
					],
					containerNo: [
						{required: true, message: "区域名称不能为空", trigger: "blur"}
					],
					oldZoneCode: [
						{required: true, message: "原区域不能为空", trigger: "change"}
					],
					containerOldStoreCode: [
						{required: true, message: "原货位号不能为空", trigger: "change"}
					],
					newZoneCode: [
						{required: true, message: "新区域不能为空", trigger: "change"}
					],
					containerNewStoreCode: [
						{required: true, message: "新货位号不能为空", trigger: "change"}
					],
				}
			};
		},
		created() {
			this.depts = getUserDepts('2')
			console.log(this.depts)
			if (this.depts.length > 0) {
				this.queryParams.yardId = this.depts[0].deptId
				this.form.yardId = this.depts[0].deptId
				this.getList()
				this.getYardZoneList()
			}
			this.getDicts("site_operation_type").then(response => {
				this.operationTypeOptions = response.data;
			});
		},
		methods: {
			/** 查询作业子单列表 */
			getList() {
				this.loading = true;
				listOperation_sub(this.queryParams).then(response => {
					this.operation_subList = response.rows;
					this.total = response.total;
					this.loading = false;
				});
			},
			// 作业类型字典翻译
			operationTypeFormat(row, column) {
				return this.selectDictLabel(this.operationTypeOptions, row.operationType);
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
					operationId: undefined,
					yardId: undefined,
					operationType: undefined,
					containerNo: undefined,
					containerOldStoreCode: undefined,
					containerNewStoreCode: undefined,
					//goodsStoreCode: undefined,
					goodsBatchNo: undefined,
					oldZoneCode: undefined,
					newZoneCode: undefined,
					//remark: undefined,
					//field2: undefined,
					//createBy: undefined,
					//createTime: undefined,
					//updateBy: undefined,
					//updateTime: undefined
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
				this.single = selection.length !== 1
				this.multiple = !selection.length
			},
			/** 新增按钮操作 */
			handleAdd() {
				this.reset();
				this.form.yardId = this.queryParams.yardId
				this.form.operationType = '0' //移库操作
				this.open = true;
				this.title = "添加作业单";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getOperation_sub(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改作业单";
				});
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$refs["form"].validate(valid => {
					if (valid) {
						addOperation_sub(this.form).then(response => {
							if (response.code === 200) {
								this.msgSuccess("新增成功");
								this.open = false;
								this.getList();
							}
						});
					}
				});
			},
			/** 删除按钮操作 */
			handleDelete(row) {
				const ids = row.id || this.ids;
				this.$confirm('是否确认删除作业子单编号为"' + ids + '"的数据项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function () {
					return delOperation_sub(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function () {
				});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('yard/operation_sub/export', {
					...this.queryParams
				}, `yard_operation_sub.xlsx`)
			},
			//获取堆场的区域列表
			getYardZoneList() {
				if (this.queryParams.yardId !== '') {
					listZone({'yardId': this.queryParams.yardId, 'zoneType': '1'}).then(response => {
						this.zoneList = []
						this.zoneList = response.rows
					});
				} else {
					this.zoneList = []
				}
			},
			listStore() {//查询所有已占用的库位
				this.form.containerOldStoreCode = ''
				this.form.containerNo = ''
				this.form.goodsBatchNo = ''
				this.storeList = []
				if (this.form.oldZoneCode !== '') {
					listStoreCanUse({
						'yardId': this.form.yardId,
						'zoneType': '1',
						'zoneCode': this.form.oldZoneCode,
						'storeState': '1' //先择占用
					}).then(response => {
						if (response.total === 0) {
							this.$message.warning("此区域无可移货位")

						} else {
							this.storeList = response.rows
						}
					})
				} else {
					this.storeList = []
				}
			},
			listStore2() {//查询所有未占用的库位
				this.form.containerNewStoreCode = ''
				this.storeList2 = []
				if (this.form.newZoneCode !== '') {
					listStoreCanUse({
						'yardId': this.form.yardId,
						'zoneType': '1',
						'zoneCode': this.form.newZoneCode,
						'storeState': '0' //先择占用
					}).then(response => {
						if (response.total === 0) {
							this.$message.warning("此区域无可移货位")
						} else {
							this.storeList2 = response.rows
						}
					})
				} else {
					this.storeList2 = []
				}
			},
			//根据库位号，查询库位详细
			getStoreGoods: function () {
				getStore_detail_byStoreCode(this.form.yardId, this.form.containerOldStoreCode)
					.then(response => {
						console.log(response.data)
						//debugger
						this.form.containerNo = response.data.containerNo
						this.form.goodsBatchNo = response.data.goodsBatchNo
						console.log(this.form)
					})
			},
			getContainerFromStore() {
				listStore_detail({'containerNo': this.form.containerNo, 'yardId': this.form.yardId})
					.then(response => {
						console.log(response)
						if (response.total === 0) {
							this.$message.warning('集装箱不在此库存中')
						} else {
							console.log(response.rows[0])
							this.form.containerNo = response.rows[0].containerNo
							this.form.goodsBatchNo = response.rows[0].goodsBatchNo
							this.form.oldZoneCode = response.rows[0].zoneCode
							this.form.containerOldStoreCode = response.rows[0].storeCode
						}
					})
			},
			//比较货位号
			compareStoreCode() {
				//如果是同一个库位的不同层级
				if (this.form.containerOldStoreCode.substring(0, 7) === this.form.containerNewStoreCode.substring(0, 7)) {
					this.$message.warning('无法移动到相同货位')
					this.form.containerNewStoreCode = ''
				}
			},
			generateId() {
				this.form.operationId = this.form.yardId + '-' + this.form.operationType + "-" + genTimeCode(new Date())
			}
		}
	};
</script>
