<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="入库单号" prop="ioNo">
            <el-input v-model="form.ioNo" placeholder="请输入入库单号">
              <template slot="append">
                <el-button type="primary" icon="el-icon-magic-stick" @click="generateId"></el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="场所" prop="placeId">
            <el-select v-model="form.placeId" placeholder="请选择场所" @change="generateId">
              <el-option
                v-for="dept in depts"
                :key="dept.deptId"
                :label="dept.deptName"
                :value="dept.deptId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="目标区域" prop="zoneType">
            <el-select v-model="form.zoneType" placeholder="请选择区域类型" clearable size="small" @change="getPlaceZoneList">
              <el-option
                v-for="dict in zoneTypeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="进/出场状态" prop="ioState">
            <el-select v-model="form.ioState" placeholder="请选择进/出场状态" @change="setPurpose(form.ioState)"
                       :disabled="true">
              <el-option
                v-for="dict in ioStateOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="业务状态">
            <el-select v-model="form.state" placeholder="请选择业务状态" :disabled="true">
              <el-option
                v-for="dict in stateOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车牌号" prop="vehicleNo">
            <el-input v-model="form.vehicleNo" placeholder="请输入车牌号" :disabled="formLock"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="需用库位数" prop="containerCount">
            <el-input-number :disabled="true" :min="0" v-model="form.containerCount" placeholder="请输入集装箱数量"
                             controls-position="right"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单证用途">
            <el-select v-model="form.purpose" placeholder="请选择单证用途" :disabled="true">
              <el-option
                v-for="dict in purposeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="司机ID" prop="driverId">
            <el-input v-model="form.driverId" placeholder="请输入司机ID"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货运企业名称" prop="companyName">
            <el-input v-model="form.companyName" placeholder="请输入货运企业名称" :disabled="formLock"/>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="form.ioState==='1'">
          <el-form-item label="来源" prop="formSite">
            <el-input v-model="form.formSite" placeholder="请输入来源"/>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="form.ioState==='0'">
          <el-form-item label="去处" prop="toSite">
            <el-input v-model="form.toSite" placeholder="请输入去处"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入内容"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col :span="12">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['place:goods_detail_io:add']"
        >添加货物信息
        </el-button>
        <el-button type="primary" @click="submitForm" size="mini">提 交</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="subList">
      <!--<el-table-column type="selection" width="55" align="center"/>-->
      <el-table-column type="index" label="ID" align="center" prop="id"/>
      <!--<el-table-column label="父级进出场单号id" align="center" prop="parentId"/>-->
      <el-table-column label="场所" align="center" prop="placeId">
        <template slot-scope="scope">
          <span>{{depts.find(item=>item.deptId === scope.row.placeId).deptName}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="进出场单号" align="center" prop="ioNo"/>-->
      <el-table-column label="集装箱号" align="center" prop="containerNo" width="120px"/>
      <el-table-column label="空/重箱" align="center" prop="isHeavy" :formatter="isHeavyFormat"/>
      <el-table-column label="区域编号" align="center" prop="zoneCode"/>
      <el-table-column label="库位号" align="center" prop="storeCode"/>
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo"/>
      <el-table-column label="报关单号" align="center" prop="declarationNo"/>
      <el-table-column label="业务编号" align="center" prop="businessNo"/>
      <el-table-column label="唛头" align="center" prop="shippingMarks"/>
      <el-table-column label="srnNo" align="center" prop="srnNO"/>
      <el-table-column label="品质" align="center" prop="quality"/>
      <el-table-column label="货物名称" align="center" prop="goodsName"/>
      <el-table-column label="货物种类" align="center" prop="goodsType"/>
      <el-table-column label="件数单位" align="center" prop="countUnit"/>
      <el-table-column label="毛重(KG)" align="center" prop="roughWight"/>
      <el-table-column label="净重(KG)" align="center" prop="netWight"/>
      <el-table-column label="货物标识码" align="center" prop="goodsIdentificationCode"/>
      <el-table-column label="数量单位" align="center" prop="numUnit"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index,scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加或修改集装箱进出场子单 对话框 -->
    <el-drawer
      :title="title"
      :visible.sync="open"
      direction="rtl">
      <el-form ref="form2" :model="ioSub" :rules="rulesIf" label-width="120px" style="padding-right:40px">
        <el-row :gutter="10" v-show="showContainer">
          <el-col :span="12">
            <el-form-item label="集装箱号" prop="containerNo">
              <el-input v-model="ioSub.containerNo" placeholder="请输入集装箱号" @keyup.enter.native="getContainerFromStore"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="空/重状态" prop="isHeavy">
              <el-select v-model="ioSub.isHeavy" placeholder="空重状态" @change="changeRule">
                <el-option
                  v-for="dict in heavyOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="区域" prop="zoneCode">
              <el-select v-model="ioSub.zoneCode" placeholder="请选择区域" @change="listStore">
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
            <el-form-item label="货位号" prop="storeCode">
              <el-select v-model="ioSub.storeCode" placeholder="请选择货位" @change="getStoreGoods">
                <el-option
                  v-for="store in storeList"
                  :key="store.id"
                  :label="store.storeCode"
                  :value="store.storeCode"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="display:none">
          <el-form-item label="进出场单号" prop="ioNo">
            <el-input v-model="ioSub.ioNo" placeholder="请输入进出场单号"/>
          </el-form-item>
          <el-form-item label="场所" prop="placeId">
            <el-input v-model="ioSub.placeId" placeholder="请输入场所"/>
          </el-form-item>
        </div>
        <el-row v-show="ioSub.isHeavy==='1' || form.zoneType==='2'">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="报关单号" prop="declarationNo">
                <el-input v-model="ioSub.declarationNo" placeholder="请输入报关单号" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货物批次号" prop="goodsBatchNo">
                <el-input v-model="ioSub.goodsBatchNo" placeholder="请输入货物批次号" :disabled="true"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="唛头" prop="shippingMarks">
                <el-input v-model="ioSub.shippingMarks" placeholder="请输入唛头" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="srnNo" prop="srnNo">
                <el-input v-model="ioSub.srnNo" placeholder="请输入srnNo" :disabled="true"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="货物名称" prop="goodsName">
                <el-input v-model="ioSub.goodsName" placeholder="请输入货物名称" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货物种类">
                <el-select v-model="ioSub.goodsType" placeholder="请选择货物种类" :disabled="true">
                  <el-option label="请选择字典生成" value=""/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="毛重(KG)" prop="roughWight">
                <el-input v-model="ioSub.roughWight" placeholder="请输入毛重(KG)" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净重(KG)" prop="netWight">
                <el-input v-model="ioSub.netWight" placeholder="请输入净重(KG)" :disabled="true"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="业务编号" prop="businessNo">
                <el-input v-model="ioSub.businessNo" placeholder="请输入业务编号" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货物标识码" prop="goodsIdentificationCode">
                <el-input v-model="ioSub.goodsIdentificationCode" placeholder="请输入货物标识码" :disabled="true"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="件数单位" prop="countUnit">
                <el-input v-model="ioSub.countUnit" placeholder="请输入件数单位" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数量单位">
                <el-select v-model="ioSub.numUnit" placeholder="请选择数量单位" :disabled="true">
                  <el-option label="请选择字典生成" value=""/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="品质" prop="quality">
                <el-input v-model="ioSub.quality" placeholder="请输入品质" :disabled="true"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ioSub.remark" type="textarea" placeholder="请输入内容" :disabled="true"/>
        </el-form-item>
        <el-row style="margin: 0 auto">
          <el-col :span="8" :offset="16">
            <el-button type="primary" @click="addSub">添 加</el-button>
            <el-button @click="cancel">关 闭</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
	import {getIo, reduceIo} from "@/api/place/io";
	import {getUserDepts} from '@/utils/charutils'
	import {listZone} from '@/api/place/zone'
	import {listStoreCanUse} from '@/api/place/store'
	import {genTimeCode} from '@/utils/common'
	import {getStore_detail_byStoreCode, listStore_detail} from '@/api/place/store_detail'

	export default {
		name: "IoIn",
		data() {
			return {
				// 遮罩层
				loading: false,
				// 选中数组
				ids: [],
				formLock: false,//锁定表单,添加集装箱信息后，不得再修改表头
				//场所列表
				depts: [],
				rulesIf: {}, //用于确定最终表单用哪个规则来校验
				showContainer: false,
				// 非单个禁用
				zoneTypeOptions: [],
				single: true,
				// 非多个禁用
				multiple: false,
				// 总条数
				total: 0,
				// 集装箱进出记录 表格数据
				subList: [],
				ioSub: {
					containerNo: undefined,
					storeCode: undefined,
					isHeavy: undefined,
					zoneCode: undefined,
					goodsBatchNo: undefined,
					shippingMarks: undefined,
					srnNo: undefined,
					goodsName: undefined,
					goodsType: undefined,
					netWeight: undefined,
					roughWight: undefined,
					businessNo: undefined,
					goodsIdentificationCode: undefined,
					countUnit: undefined,
					numUnit: undefined,
					remark: undefined
				},
				heavyOptions: [],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 出/入场状态字典
				ioStateOptions: [],
				// 业务状态字典
				stateOptions: [],
				// 单证用途字典
				purposeOptions: [],
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					businessNo: undefined,
					placeId: undefined,
					vehicleNo: undefined,
					ioState: undefined,
					ioTime: undefined,
					formSite: undefined,
					toSite: undefined,
					driverId: undefined,
					companyName: undefined,
					state: undefined,
					purpose: undefined,
				},
				//区域列表
				zoneList: [],
				//库位列表
				storeList: [],
				// containerIo的属性
				form: {},
				containerIo: [],
				// 表单校验
				rules: { //页面头部表单验证
					ioNo: [
						{required: true, message: "入库单号不能为空", trigger: "blur"}
					],
					placeId: [
						{required: true, message: "场所不能为空", trigger: "change"}
					],
					vehicleNo: [
						{required: true, message: "车牌号不能为空", trigger: "blur"}
					],
					containerCount: [
						{required: true, message: "集装箱数量不能为空", trigger: "blur"}
					],
					containerNo: [
						{required: true, message: "集装箱号不能为空", trigger: "blur"}
					],
					ioState: [
						{required: true, message: "出/入场状态不能为空", trigger: "change"}
					],
					companyName: [
						{required: true, message: "货运企业名称不能为空", trigger: "blur"}
					],
					zoneType: [
						{required: true, message: "目标区域不能为空", trigger: "change"}
					],
				},
				rulesContainerLight: { //空箱规则
					containerNo: [
						{required: true, message: "集装箱号不能为空", trigger: "blur"},
					],
					isHeavy: [
						{required: true, message: "空重状态不能为空", trigger: "change"}
					],
					zoneCode: [
						{required: true, message: "区域不能为空", trigger: "change"}
					],
					storeCode: [
						{required: true, message: "货位号不能为空", trigger: "change"}
					],
				},
				rulesContainerHeavy: { //重箱规则
					containerNo: [
						{required: true, message: "集装箱号不能为空", trigger: "blur"},
					],
					isHeavy: [
						{required: true, message: "空重状态不能为空", trigger: "change"}
					],
					zoneCode: [
						{required: true, message: "区域不能为空", trigger: "change"}
					],
					storeCode: [
						{required: true, message: "货位号不能为空", trigger: "change"}
					],
					declarationNo: [
						{required: true, message: "报关单号不能为空", trigger: "blur"}
					],
					goodsBatchNo: [
						{required: true, message: "货物批次号不能为空", trigger: "blur"}
					]
				},
				rulesGoods: { //货物规则
					zoneCode: [
						{required: true, message: "区域不能为空", trigger: "change"}
					],
					storeCode: [
						{required: true, message: "货位号不能为空", trigger: "change"}
					],
					declarationNo: [
						{required: true, message: "报关单号不能为空", trigger: "blur"}
					],
					goodsBatchNo: [
						{required: true, message: "货物批次号不能为空", trigger: "blur"}
					]
				},
			};
		},
		created() {
			this.getDicts("container_io_state").then(response => {
				this.ioStateOptions = response.data;
			});
			this.getDicts("yard_container_heavy_state").then(response => {
				this.heavyOptions = response.data
			});
			this.getDicts("yard_business_state").then(response => {
				this.stateOptions = response.data;
			});
			this.getDicts("site_document_purpose").then(response => {
				this.purposeOptions = response.data;
			});
			this.getDicts("yard_zone_type").then(response => {
				this.zoneTypeOptions = response.data;
			});
			//初始业务状态就只有执行
			this.form.state = '3'
			this.form.ioState = '0' //进场
			this.form.purpose = '0'
			//初始集装箱数量0
			this.form.containerCount = 0

			// 0 监管场所，1保税库，2场所，3企业
			this.depts = getUserDepts('0')
			if (this.depts.length > 0) {
				this.queryParams.placeId = this.depts[0].deptId
				this.form.placeId = this.depts[0].deptId
				this.getPlaceZoneList()
				this.generateId()
			}
		},
		watch: { //监听list长度，设置集装箱数量
			subList: {
				handler(val, oldValue) {
					this.form.containerCount = val.length
				}
			}
		},
		methods: {
			isHeavyFormat(row, column) {
				return this.selectDictLabel(this.heavyOptions, row.isHeavy);
			},
			//添加集装箱到列表
			addSub() {
				this.$refs["form2"].validate(valid => {
					if (valid) {
						if (this.subList.findIndex((v) => {
							return v.storeCode === this.ioSub.storeCode
						}) !== -1) {
							this.$message.warning("库货已被其它箱选中")
							return
						}
						if(this.ioSub.containerNo && this.ioSub.containerNo !== ''){ //如果集装箱
							if (this.subList.findIndex((v) => {
								return v.containerNo === this.ioSub.containerNo
							}) !== -1
							) {
								this.$message.warning("集装箱号已添加")
								return
							}
						}

						this.ioSub.placeId = this.form.placeId
						console.log(this.ioSub)
						this.subList.push({...this.ioSub})



						this.ioSub = {
							containerNo: undefined,
							storeCode: undefined,
							isHeavy: undefined,
							zoneCode: undefined,
							goodsBatchNo: undefined,
							shippingMarks: undefined,
							srnNo: undefined,
							goodsName: undefined,
							goodsType: undefined,
							netWeight: undefined,
							roughWight: undefined,
							businessNo: undefined,
							goodsIdentificationCode: undefined,
							countUnit: undefined,
							numUnit: undefined,
							remark: undefined
						}
						console.log(this.subList)
						console.log(this.form.containerCount)
					}
				});
				//if (this.subList.length > 1) { //必须里面有超过1个值的时候，才判断
				//加入后还得判断是否有重复的库位,集装箱号是否重复，返回-1是不重复

			},
			/** 查询集装箱进出记录 列表 */
			/*getList() {
				this.loading = true;
				listIo(this.queryParams).then(response => {
					this.ioList = response.rows;
					this.total = response.total;
					this.loading = false;
				});
			},*/
			// 出/入场状态字典翻译
			ioStateFormat(row, column) {
				return this.selectDictLabel(this.ioStateOptions, row.ioState);
			},
			// 业务状态字典翻译
			stateFormat(row, column) {
				return this.selectDictLabel(this.stateOptions, row.state);
			},
			// 单证用途字典翻译
			purposeFormat(row, column) {
				return this.selectDictLabel(this.purposeOptions, row.purpose);
			},
			// 取消按钮
			cancel() {
				this.open = false;
			},
			// 表单重置
			reset() {
				this.$confirm('重置将清空您所填写的数据项', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					console.log("确定")
				}).then(() => {
					console.log('执行了')
					this.subList = []
				}).catch(function () {
					console.log("取消")
				})
			},
			/** 搜索按钮操作 */
			handleQuery() {
				this.queryParams.pageNum = 1;
				this.getList();
			},
			/** 重置按钮操作 */
			resetQuery() {

				this.reset()
				this.subList = []
				//this.resetForm("queryForm");
				//this.handleQuery();
			},
			// 多选框选中数据
			handleSelectionChange(selection) {
				this.ids = selection.map(item => item.id)
				this.single = selection.length != 1
				this.multiple = !selection.length
			},
			/** 新增按钮操作 */
			handleAdd() {
				//this.reset();
				this.$refs["form"].validate(valid => {
					if (valid) {
						this.open = true;
						this.title = "添加货物信息";
					}
				})

			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getIo(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改货物信息";
				});
			},
			//自动设置单证用途
			setPurpose(state) {
				this.form.purpose = state
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.subList.length === 0) {
							this.$message.error("没有添加集装箱信息")
							return
						}
						reduceIo({'io': this.form, 'subList': this.subList}).then(response => {
							if (response.code === 200) {
								this.msgSuccess("出库成功");
								this.open = false;
							}
						})
					}
				});
			},
			/** 删除集装箱列表按钮操作 */
			handleDelete(index, row) {
				this.subList.splice(index, 1)
				console.log(this.subList)
			},
			//获取场所的区域列表 ,要先择库位类型，是集装箱，还是散杂货
			getPlaceZoneList() {
				this.subList = []
				if (this.form.placeId !== '' && this.form.zoneType) {
					listZone({'placeId': this.form.placeId, 'zoneType': parseInt(this.form.zoneType)}).then(response => {
						this.zoneList = []
						this.zoneList = response.rows
						if (this.zoneList.length === 0) {
							this.$message.warning("此场所没有划分对应区域")
						}
					})
					if (this.form.zoneType === '2') { //散杂货 改变校验规则
						this.rulesIf = this.rulesGoods
						this.showContainer = false
						this.ioSub.containerNo = ''
						this.ioSub.isHeavy = ''
					} else {
						this.rulesIf = this.rulesContainerLight
						this.showContainer = true
						this.ioSub.containerNo = ''
						this.ioSub.isHeavy = ''
					}
				} else {
					this.zoneList = []
				}
			},
			listStore() {
				//清除库位号
				this.ioSub.storeCode = ''
				this.storeList = []
				if (this.ioSub.zoneCode !== '') {
					listStoreCanUse({
						'placeId': this.form.placeId,
						'zoneType': parseInt(this.form.zoneType),
						'zoneCode': this.ioSub.zoneCode,
						'storeState': '1' //先择空
					}).then(response => {
						if (response.total === 0) {
							this.$message.warning("此区域无可用货位")
						} else {
							this.storeList = response.rows
						}
					})
				} else {
					this.storeList = []
				}
				this.$forceUpdate()
			},
			generateId() {
				this.form.ioNo = this.form.placeId + '-' + this.form.ioState + "-" + genTimeCode(new Date())
				this.$forceUpdate() //强刷
			},
			//根据库位号，查询库位详细
			getStoreGoods: function () {
				this.$forceUpdate()
				getStore_detail_byStoreCode(this.form.placeId, this.ioSub.storeCode)
					.then(response => {
						console.log(response.data)
						//debugger
						this.ioSub.containerNo = response.data.containerNo
						this.ioSub.isHeavy = response.data.isHeavy
						this.ioSub.placeId = response.data.placeId
						this.ioSub = {
							containerNo: response.data.containerNo,
							storeCode: response.data.storeCode,
							isHeavy: response.data.isHeavy,
							zoneCode: response.data.zoneCode,
							goodsBatchNo: response.data.goodsBatchNo,
							shippingMarks: response.data.goodsBatchNo,
							srnNo: response.data.srnNo,
							goodsName: response.data.goodsName,
							goodsType: response.data.goodsType,
							netWeight: response.data.netWeight,
							roughWight: response.data.roughWight,
							businessNo: response.data.businessNo,
							goodsIdentificationCode: response.data.goodsIdentificationCode,
							countUnit: response.data.countUnit,
							numUnit: response.data.numUnit,
							remark: response.data.remark
						}
						this.$forceUpdate()
					})
			},
			getContainerFromStore() {
				listStore_detail({'containerNo': this.ioSub.containerNo, 'placeId': this.form.placeId})
					.then(response => {
						console.log(response)
						if (response.total === 0) {
							this.$message.warning('集装箱不在此库存中')
						} else {
							console.log(response.rows[0])
							this.ioSub = {...response.rows[0]}
						}
					})
			},
			refresh() {
				this.$forceUpdate()
			},
			changeRule() {//动态改变校验规则
				if (this.ioSub.isHeavy === '1') {
					this.rulesIf = this.rulesContainerHeavy
				} else {
					this.rulesIf = this.rulesContainerLight
				}
			}
		}
	}
</script>
