<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" style="display:none">
      <el-form-item label="场所" prop="placeId">
        <el-select
          v-model="queryParams.placeId" placeholder="请选择场所" size="small" :disabled="true">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="入库通知单号" prop="instoreNoticeNo">
        <el-input
          v-model="queryParams.instoreNoticeNo" label-width="100px" :disabled="true"
          placeholder="请输入入库通知单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="8">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['tax:instore_notice:print']"
        >打印
        </el-button>
      </el-col>
    </el-row>
    <div class="box-card" style="margin: 0 auto">
      <el-row :gutter="10">
        <el-col :span="2"> &nbsp;</el-col>
        <el-col :span="5">入库通知单</el-col>
        <el-col :span="2">GR</el-col>
        <el-col :span="5">{{instoreNotice.inNoticeNo}}</el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="2">日期:</el-col>
        <el-col :span="5">{{instoreNotice.genTime}}</el-col>
        <el-col :span="2">业务编号:</el-col>
        <el-col :span="5">{{instoreNotice.businessNo}}</el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="2">客户:</el-col>
        <el-col :span="4">{{instoreNotice.checkConsumer}}</el-col>
        <el-col :span="2">车牌号:</el-col>
        <el-col :span="4">{{instoreNotice.vehicleNo}}</el-col>
        <el-col :span="2">卸车日期:</el-col>
        <el-col :span="4"></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="2">开始时间:</el-col>
        <el-col :span="4"></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="2">批次:</el-col>
        <el-col :span="4">{{instoreNotice.batchNo}}</el-col>
        <el-col :span="2">司机名:</el-col>
        <el-col :span="4">{{instoreNotice.driverName}}</el-col>
        <el-col :span="2">完成日期:</el-col>
        <el-col :span="4"></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="15">
          <el-table border v-loading="loading" :data="instore_notice_detailList" :span-method="arraySpanMethod">
            <el-table-column label="收货人填写" align="center">
              <el-table-column type="index" :index="getIndex" label="序号" align="center" width="80px">
              </el-table-column>
              <el-table-column label="袋封号" align="center" prop="bagSealNo" width="250px"/>
              <el-table-column label="品名" align="center" prop="goodsName" width="240px"/>
              <el-table-column label="预订数量" align="center" prop="bookStoreCode">
                <template slot-scope="scope">
                  {{scope.row.bookStoreCode === null?1:scope.row.bookStoreCode}}
                </template>
              </el-table-column>
              <!--<el-table-column label="袋号" align="center" prop="bagNumber" />-->
              <el-table-column label="包装单位" align="center" prop="packingUnit"/>
              <el-table-column label="货位号" align="center" prop=""/>
              <!--<el-table-column label="预订货位号" align="center" prop="id" />-->
              <el-table-column label="是否已加工" align="center" prop="hasProcess">
                <template slot-scope="scope"></template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 15px; ">
        <el-col :span="2">装卸组:</el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="2">机械号:</el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="2">机械员:</el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="2">理货员签字:</el-col>
        <el-col :span="2"></el-col>
      </el-row>
    
    </div>
  
  
  </div>
</template>

<script>
	import {
		listInstore_notice_detail,
		getInstore_notice_detail,
		delInstore_notice_detail,
		addInstore_notice_detail,
		updateInstore_notice_detail
	} from "@/api/tax/instore_notice_detail";
	import {getUserDepts} from '@/utils/charutils'
	import {getInstore_notice_with_details} from '@/api/tax/instore_notice'

	export default {
		name: "Instore_notice_print",
		data() {
			return {
				// 遮罩层
				loading: false,
				// 选中数组
				ids: [],
				depts: [],
				instoreNotice: {},
				// 入库通知单明细表格数据
				instore_notice_detailList: [],
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
					instoreNoticeNo: undefined,
					packingUnit: undefined,
					placeId: undefined,
					bookStoreCode: undefined,
					orderByColumn: 'id',
					isAsc: 'desc'
				},
				// 表单参数
				form: {},
				// 表单校验

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
				this.queryParams.instoreNoticeNo = queryNoticeNo
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
				//listInstore_notice_detail(this.queryParams).then(response => {
				getInstore_notice_with_details(this.queryParams.placeId, this.queryParams.instoreNoticeNo).then(response => {
					console.log(response)
					if (response.code === 200) {
						this.instoreNotice = response.data
						this.instore_notice_detailList = response.data.detailList;
						let row21 = {
							bagSealNo: "",
							bookStoreCode: response.data.detailList.length,
							goodsName: "合计",
							batchNo: "",
							packingUnit: ""

						}
						let row22 = {
							bagSealNo: "",
							bookStoreCode: "",
							goodsName: "",
							batchNo: "备注",
							packingUnit: ""

						}
						let row23 = {
							bagSealNo: "",
							bookStoreCode: "",
							goodsName: "",
							batchNo: "工组人员",
							packingUnit: ""

						}
						this.instore_notice_detailList.push(row21)
						this.instore_notice_detailList.push(row22)
						this.instore_notice_detailList.push(row23)
						this.total = response.data.detailList.length;
						this.loading = false;
					}
				});
			},
      //合并单元格
			arraySpanMethod({row, column, rowIndex, columnIndex}) {
				if ((rowIndex === 21 || rowIndex === 22) && columnIndex === 1) {
					return {
						rowspan: 1,
						colspan: 6
					}
				}
			},
			getIndex(index) {
				console.log(index)
				if (index <= 19) return index + 1
				return this.instore_notice_detailList[index].batchNo
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
					instoreNoticeNo: undefined,
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
				this.queryParams.instoreNoticeNo = ''
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
				this.title = "添加入库通知单明细";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getInstore_notice_detail(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改入库通知单明细";
				});
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateInstore_notice_detail(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								}
							});
						} else {
							addInstore_notice_detail(this.form).then(response => {
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
				}).then(function () {
					return delInstore_notice_detail(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function () {
				});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('tax/instore_notice_detail/export', {
					...this.queryParams
				}, `tax_instore_notice_detail.xlsx`)
			}
		}
	};
</script>
