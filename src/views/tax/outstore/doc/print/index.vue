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
      <el-form-item label="出库通知单" prop="instoreNoticeNo">
        <el-input
          v-model="queryParams.outstoreNoticeNo" label-width="100px" :disabled="true"
          placeholder="请输入出库通知单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="8">
        <el-button
          type="info"
          icon="fa fa-print"
          v-print="'#print'"
          @click="print"
          v-hasPermi="['tax:outstore_notice:print']"
        > 打印
        </el-button>
      </el-col>

    </el-row>
    <div class="box-card" style="margin: 0 auto;font-size:18px;width:1600px;padding-left: 5px ;padding-top:20px"
         id="print">
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="14" style="text-align: center;font-size: 30px">
          OUTBOUND SHEET <br/>出库单
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="7" class="font14">
          Carrier Information 承运人信息
        </el-col>
        <el-col :span="7" class="font14">
          Buyer Information 客户信息
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="3" class="font14">
          Driver ID 司机证件号:
        </el-col>
        <el-col :span="4" class="font14">
          {{instoreNotice.driverIdCard}}
        </el-col>
        <el-col :span="7" class="font14">
          {{instoreNotice.receiveName}}
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="4" class="font14">
          Pickup vehicle no. 提货车头号
        </el-col>
        <el-col :span="3" class="font14">
          {{instoreNotice.primeMoverNo}}
        </el-col>
        <el-col :span="7" class="font14">
          销售订单号
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="4" class="font14">
          Pickup trailer no. 拖车登记号
        </el-col>
        <el-col :span="3" class="font14">
          {{instoreNotice.trailerNo}}
        </el-col>
        <el-col :span="7" class="font14">
          {{instoreNotice.soNo}}
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="4" class="font14">
          Product 产品:
        </el-col>
        <el-col :span="3" class="font14">
          {{instoreNotice.detailList[0].goodsName}}
        </el-col>
        <el-col :span="7" class="font14">
          Jinhang outbound ref no. 金航出库单号
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="4" class="font14">
          Producer 生产商:
        </el-col>
        <el-col :span="3" class="font14">
          <!--{{instoreNotice.checkConsumer}}-->Oyu Tolgoi LLC
        </el-col>
        <el-col :span="7" class="font14">
          {{instoreNotice.outDocNo}}
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="4" class="font14">
          Origin 原产地:
        </el-col>
        <el-col :span="3" class="font14">
          Mongolia
        </el-col>
        <el-col :span="4" class="font14">
          Pick Up Date 提货日期:
        </el-col>
        <el-col :span="3" class="font14">
          {{ parseTime(instoreNotice.genTime, '{y}-{m}-{d}') }}
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="4" class="font14">
          Packing mode 包装方式:
        </el-col>
        <el-col :span="3" class="font14">
          In bags
        </el-col>
        <el-col :span="4" class="font14">
          Shipment No.业务编号:
        </el-col>
        <el-col :span="3" class="font14">
          {{instoreNotice.businessNo}}
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="14">
          <el-table  v-loading="loading" :data="instore_notice_detailList"
                    :header-cell-style="{background:'white',color:'black',border:'solid .5px black',fontSize:'14px',padding:'3 -3px',margin:'-3'}"
                    :cell-style="{border:'solid .5px black',fontSize:'16px',padding:'8px 0',color:'black'}"
                    style="border-right: solid 2px black;border-left: solid 2px black;border-top: solid 1px black;border-bottom: solid 2px black"
          >
            <el-table-column prop="index" type="index" :label="'No.\n序号'" align="center" width="80px"/>
            <el-table-column :label="'Date of inbound\n入库日期'" align="center" width="200px">
              <template slot-scope="scope">
                {{ parseTime(instoreNotice.startTime, '{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column :label="'Storage Location\n存储位置'" align="center" prop="storeCode" width="200px"/>
            <el-table-column :label="'Lot Number\n批次号'" align="center" prop="batchNo" width="190px"/>
            <!-- <el-table-column label="数量" align="center" prop="">
               <template slot-scope="scope">
                 {{scope.row.remark === null?1:scope.row.remark}}
               </template>
             </el-table-column>-->
            <!--<el-table-column label="袋号" align="center" prop="bagNumber" />-->
            <el-table-column :label="'Bag Seal Number\n货袋封条号'" align="center" prop="bagSealNo"/>
            <!--<el-table-column label="预订货位号" align="center" prop="id" />-->
            <!--<el-table-column label="备注" align="center" prop="fleetName">
              <template slot-scope="scope"></template>
            </el-table-column>-->
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="padding:0;text-align: right">
        <el-col :span="14" class="font14" style="font-size: 17px;margin:0;padding: 0">
          <p>Total Valid Gross Weight 经以下各方确认有效总重量<span class="weight">{{instoreNotice.realRoughWeight}}</span> incl.wt
            of bag（含袋）</p>
          <p>OT provided gross weight for reference ( prior to inbound ) 以上货物OT入库前提供参考重量 <span
            class="weight">{{sum(instore_notice_detailList)}}</span>incl.wt of bag（含袋）</p>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8" class="font14">
          OT Supervisor Jinhang OT派驻金航主管
        </el-col>
        <el-col :span="8" class="font14">
          Jinhang Representative 金航代表
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8" class="font14">
          Date 日期:
        </el-col>
        <el-col :span="8" class="font14">
          Date 日期:
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 30px">
        <el-col :span="8" class="font14">
          Signature 签字:
        </el-col>
        <el-col :span="8" class="font14">
          Signature 签字:
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8" class="font14">
          Customer Representative 客户代表
        </el-col>
        <el-col :span="8" class="font14">
          Fleet Representative 车队代表
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8" class="font14">
          Date 日期:
        </el-col>
        <el-col :span="8" class="font14">
          Date 日期:
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 30px">
        <el-col :span="8" class="font14">
          Signature 签字:
        </el-col>
        <el-col :span="8" class="font14">
          Signature 签字:
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8" class="font14">
          Receiving Smelter收货冶炼厂 ( Only for Traders仅适用贸易商 )
        </el-col>
        <el-col :span="8" class="font14">

        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="4" class="font14">
          Delivery Date 送达日期:
        </el-col>
        <el-col :span="4" class="font14">
          {{ parseTime(instoreNotice.genTime, '{y}-{m}-{d}') }}
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8" class="font14">
          Signature 签字:
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
	import {
		getInstore_notice_detail,
		delInstore_notice_detail,
		addInstore_notice_detail,
		updateInstore_notice_detail
	} from "@/api/tax/instore_notice_detail";
	import {getUserDepts} from '@/utils/charutils'
	import {updateDocNotice} from '@/api/tax/instore_notice'
	import {getOutstore_notice_with_details} from '@/api/tax/outstore_notice'
	import {getStoreUsable} from '@/api/tax/store'
	import {getOutstore_doc_with_details} from '@/api/tax/outstore_doc'

	export default {
		name: "Outstore_notice_print",
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
					outstoreNoticeNo: undefined,
					packingUnit: undefined,
					placeId: undefined,
					bookStoreCode: undefined,
					orderByColumn: 'id',
					isAsc: 'desc'
				},
				// 表单参数
				form: {},
				// 表单校验
				printObj: {
					id: "dayin",
					popTitle: 'good print',
					extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
					endCallback: function () {
						console.log('over')
					}
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
				//listInstore_notice_detail(this.queryParams).then(response => {
				getOutstore_doc_with_details(this.queryParams.placeId, this.queryParams.outstoreNoticeNo).then(response => {
					console.log(response)
					if (response.code === 200) {
						this.instoreNotice = response.data
						this.instore_notice_detailList = response.data.detailList;
						/*let row17 = {
							bagSealNo: "",
							remark: response.data.detailList.length,
							goodsName: "合计",
							batchNo: "",
							packingUnit: ""

						}*/

						/*let row22 = {
							bagSealNo: "",
							bookStoreCode: "",
							goodsName: "",
							batchNo: "备注",
							packingUnit: ""
						}*/
						/*let row23 = {
							bagSealNo: "",
							bookStoreCode: "",
							goodsName: "",
							batchNo: "工组人员",
							packingUnit: ""

						}*/
						//this.instore_notice_detailList.push(row17)
						//this.instore_notice_detailList.push(row22)
						//this.instore_notice_detailList.push(row23)
						//this.total = response.data.detailList.length;
						this.loading = false;
					}
				});
			},
			//合并单元格
			/*arraySpanMethod({row, column, rowIndex, columnIndex}) {
				if ((rowIndex === this.instore_notice_detailList.length + 2) && columnIndex === 1) {
					return {
						rowspan: 1,
						colspan: 6
					}
				}
			},*/
			/*getIndex(index) {
				if (index <= 15) return index + 1
				return this.instore_notice_detailList[index].batchNo
			},*/
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

			print() {
				//console.log('打印了')
				//更新通知单打印时间
				if (this.instoreNotice.printTime == null) {
					updateDocNotice(this.instoreNotice.placeId, this.instoreNotice.outNoticeNo, 'outnotice', 'print')
				}
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
			},
			sum(arr) {
				let sum = 0;
				if(arr.length ===0) return sum
				for (let item of arr) {
					sum += item.bagRoughWeight
				}
				return sum;
			}
		}
	};
</script>

<style scoped>
  @page {
    size: auto A4 landscape;
    margin-left: 1.5cm;
    margin-bottom: 3mm;
    margin-top: 8mm;
    margin-right: 20px;
  }

  .font14 {
    font-size: 18px;
  }

  .elTable td {
    padding: 1px !important;
  }

  .elTable th {
    padding: 1px 10px !important;
  }

  .el-table .cell {
    /*text-align: center;*/
    white-space: pre-line; /*保留换行符*/
  }

  .weight {
    width: 120px;
    padding: 1px 8px;
    border-bottom: #1e1e1e 1px solid
  }

</style>
