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
          <el-form-item label="堆场" prop="yardId">
            <el-select v-model="form.yardId" placeholder="请选择堆场" @change="getYardZoneList">
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
          <el-form-item label="进/出场状态">
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
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="车牌号" prop="vehicleNo">
            <el-input v-model="form.vehicleNo" placeholder="请输入车牌号"/>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-popover placement="right" width="500" trigger="click">
            <SimpleKeyboard @onChange="mengwenInput" :input="form.vehicleNo" />
            <el-button slot="reference" class="fa fa-keyboard-o" size="mini"></el-button>
          </el-popover>
        </el-col>
        <el-col :span="6">
          <el-form-item label="集装箱数量" prop="containerCount">
            <el-input-number :disabled="true" :min="0" v-model="form.containerCount" placeholder="请输入集装箱数量"
                             controls-position="right"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="司机ID" prop="driverId">
            <el-input v-model="form.driverId" placeholder="请输入司机ID"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货运企业名称" prop="companyName">
            <el-input v-model="form.companyName" placeholder="请输入货运企业名称"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
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
      <el-col :span="6">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['yard:io:reduce']"
        >添加集装箱信息
        </el-button>
      </el-col>
      <el-col :span="6" :offset="12">
        <el-button type="primary" @click="submitForm" size="mini" v-hasPermi="['yard:io:reduce']">提 交</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="subList" @selection-change="handleSelectionChange">
      <!--<el-table-column type="selection" width="55" align="center"/>-->
      <el-table-column type="index" label="ID" align="center" prop="id"/>
      <!-- <el-table-column label="父级进出场单号id" align="center" prop="parentId"/>-->
      <el-table-column label="堆场" align="center" prop="yardId">
        <template slot-scope="scope">
          <span>{{depts.find(item=>item.deptId === scope.row.yardId).deptName}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="进出场单号" align="center" prop="ioNo"/>-->
      <el-table-column label="集装箱号" align="center" prop="containerNo" width="120px"/>
      <el-table-column label="空/重箱" align="center" prop="isHeavy">
        <template slot-scope="scope">
          {{heavyOptions.find(item=>item.dictValue === scope.row.isHeavy).dictLabel}}
        </template>
      </el-table-column>
      <el-table-column label="区域编号" align="center" prop="zoneCode"/>
      <el-table-column label="库位号" align="center" prop="storeCode"/>
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo"/>
      <el-table-column label="报关单号" align="center" prop="declarationNo"/>
      <el-table-column label="业务编号" align="center" prop="businessNo"/>
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
      <!--<el-dialog :title="title" :visible.sync="open" append-to-body>-->
      <el-form ref="form2" :model="ioSub" :rules="rulesSub" label-width="120px" style="padding-right: 40px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="集装箱号" prop="containerNo">
              <el-input v-model="ioSub.containerNo" placeholder="请输入集装箱号" @keyup.enter.native="getContainerFromStore"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="空/重状态" prop="heavyState">
              <el-select v-model="ioSub.isHeavy" placeholder="空重状态">
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
              <el-select v-model="ioSub.zoneCode" placeholder="请输入区域" @change="listStore">
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
          <!--<el-form-item label="父级进出场单号id" prop="parentId">
            <el-input v-model="ioSub.parentId" placeholder="请输入父级进出场单号id"/>
          </el-form-item>-->
          <el-form-item label="进出场单号" prop="ioNo">
            <el-input v-model="ioSub.ioNo" placeholder="请输入进出场单号"/>
          </el-form-item>
          <el-form-item label="堆场ID" prop="yardId">
            <el-input v-model="ioSub.yardId" placeholder="请输入堆场ID"/>
          </el-form-item>
        </div>
        <el-row v-show="ioSub.isHeavy==='1'">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="报关单号" prop="declarationNo">
                <el-input v-model="ioSub.declarationNo" placeholder="请输入报关单号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货物批次号" prop="goodsBatchNo">
                <el-input v-model="ioSub.goodsBatchNo" placeholder="请输入货物批次号"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="货物名称" prop="goodsName">
                <el-input v-model="ioSub.goodsName" placeholder="请输入货物名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货物种类">
                <el-select v-model="ioSub.goodsType" placeholder="请选择货物种类">
                  <el-option label="请选择字典生成" value=""/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="毛重(KG)" prop="roughWight">
                <el-input v-model="ioSub.roughWight" placeholder="请输入毛重(KG)"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="净重(KG)" prop="netWight">
                <el-input v-model="ioSub.netWight" placeholder="请输入净重(KG)"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="业务编号" prop="businessNo">
                <el-input v-model="ioSub.businessNo" placeholder="请输入业务编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货物标识码" prop="goodsIdentificationCode">
                <el-input v-model="ioSub.goodsIdentificationCode" placeholder="请输入货物标识码"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="件数单位" prop="countUnit">
                <el-input v-model="ioSub.countUnit" placeholder="请输入件数单位"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数量单位">
                <el-select v-model="ioSub.numUnit" placeholder="请选择数量单位">
                  <el-option label="请选择字典生成" value=""/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ioSub.remark" type="textarea" placeholder="请输入备注"/>
        </el-form-item>
        <el-row style="margin: 0 auto">
          <el-col :span="8" :offset="16">
            <el-button type="primary" @click="addSub">添 加</el-button>
            <el-button @click="cancel">关 闭</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!--</el-dialog>-->
    </el-drawer>
  </div>
</template>

<script>
	import {getIo, reduceIo} from "@/api/yard/io";
	import {getUserDepts} from '@/utils/charutils'
	import {listZone} from '@/api/yard/zone'
	import {listStoreCanUse} from '@/api/yard/store'
	import {getStore_detail_byStoreCode} from '@/api/yard/store_detail'
	import {listStore_detail} from '@/api/yard/store_detail'
	import {genTimeCode} from '@/utils/common'
	import SimpleKeyboard from "@/components/SimpleKeyboard/SimpleKeyboard"

	export default {
		name: "IoOut",
    components: {
	    SimpleKeyboard
    },
		data() {
			return {
				// 遮罩层
				loading: false,
				// 选中数组
				ids: [],
				//场所列表
				depts: [],
				// 非单个禁用
				single: true,
				// 非多个禁用
				multiple: false,
				// 总条数
				total: 0,
				// 集装箱进出记录 表格数据
				subList: [],
				ioSub: {
					containerNo: '',
					isHeavy: '',
					remark: '',
					storeCode: '',
			    zoneCode: '',
					yardId: ''
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
					yardId: undefined,
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
				form: {
					ioNo: undefined,
					yardId: undefined,
					ioState: undefined,
					state: undefined,
					vehicleNo: undefined,
					containerCount: 0,
					driverId: undefined,
					companyName: undefined,
					purpose: undefined,
					formSite: undefined,
					toSite: undefined,
					remark: undefined,
				},
				containerIo: [],
				// 表单校验
				// 表单校验
				rules: {
					ioNo: [
						{required: true, message: "入库单号不能为空", trigger: "blur"}
					],
					yardId: [
						{required: true, message: "堆场不能为空", trigger: "change"}
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
					]
				},
				rulesSub: {
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
				}
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
			//初始业务状态就只有执行
			this.form.state = '3'
			this.form.ioState = '0' //进场
			this.form.purpose = '0' //出库
			//初始集装箱数量0
			this.form.containerCount = 0

			// 0 监管场所，1保税库，2堆场，3企业
			this.depts = getUserDepts('2')
			if (this.depts.length > 0) {
				this.queryParams.yardId = this.depts[0].deptId
				this.form.yardId = this.depts[0].deptId
				this.getYardZoneList()
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
			//添加集装箱到列表
			addSub() {
				this.$refs['form2'].validate(valid => {
					if (valid) {
						//加入后还得判断是否有重复的库位,集装箱号是否重复，返回-1是不重复
						if (this.subList.findIndex((v) => {
							return v.storeCode === this.ioSub.storeCode
						}) !== -1) {
							this.$message.warning("此货位已添加进列表")
							return
						}

						if (this.subList.findIndex((v) => {
							return v.containerNo === this.ioSub.containerNo
						}) !== -1
						) {
							this.$message.warning("此集装箱已在列表中")
							return
						}

						//this.subList.push(cloneObject(this.ioSub))
						this.subList.push({...this.ioSub})
						//this.form.containerCount = this.subList.length
						this.ioSub.containerNo = ''//清空集装箱号
						this.ioSub.zoneCode = ''
						this.ioSub.storeCode = '' //清空货位号
						this.ioSub.isHeavy = ''
						this.ioSub.remark = ''

						console.log(this.subList)
						console.log(this.form.containerCount)
					}
				})
				//if (this.subList.length > 1) { //必须里面有超过1个值的时候，才判断

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
				});

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
				this.open = true;
				this.title = "添加集装箱信息";
			},
			//自动设置单证用途
			setPurpose(state) {
				this.form.purpose = state
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$forceUpdate()
				console.log(this.ioSub.storeCode)
				this.$refs["form"].validate(valid => {
					if (valid) {
						if(this.subList.length === 0){
							this.$message.error("没有添加集装箱信息")
							return
						}
						reduceIo({'io': this.form, 'subList': this.subList}).then(response => {
							if (response.code === 200) {
								this.msgSuccess("操作成功");
								this.open = false;
							}
						});
					}
				});
			},
			/** 删除集装箱列表按钮操作 */
			handleDelete(index, row) {
				this.subList.splice(index, 1)
				console.log(this.subList)

			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('yard/io/export', {
					...this.queryParams
				}, `yard_io.xlsx`)
			},
			//获取堆场的区域列表
			getYardZoneList() {
				if (this.form.yardId !== '') {
					listZone({'yardId': this.form.yardId, 'zoneType': '1'}).then(response => {
						this.zoneList = []
						this.zoneList = response.rows
					});
				} else {
					this.zoneList = []
				}
			},
			//列出库位列表
			listStore() {
				this.ioSub.storeCode = ''
				this.ioSub.containerNo = ''
				this.ioSub.isHeavy = ''
				this.ioSub.remark = ''
				this.storeList = []
				if (this.ioSub.zoneCode !== '') {
					listStoreCanUse({
						'yardId': this.form.yardId,
						'zoneType': '1',
						'zoneCode': this.ioSub.zoneCode,
						'storeState': '1' //先择占用的库位
					}).then(response => {
						if (response.total === 0) {
							this.$message.warning("此区域无可用的货位")
						} else {
							this.storeList = response.rows
						}
					})
				} else {
					this.storeList = []
				}
			},
			//根据库位号，查询库位详细
			getStoreGoods: function () {
				getStore_detail_byStoreCode(this.form.yardId, this.ioSub.storeCode)
					.then(response => {
						console.log(response.data)
						//debugger
						this.ioSub.containerNo = response.data.containerNo
						this.ioSub.isHeavy = response.data.isHeavy
						this.ioSub.yardId = response.data.yardId
            this.$forceUpdate()
					})
			},
			getContainerFromStore() {
				listStore_detail({'containerNo': this.ioSub.containerNo, 'yardId': this.form.yardId})
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
			generateId() {
				this.form.ioNo = this.form.yardId + '-' + this.form.ioState + "-" + genTimeCode(new Date())
				this.$forceUpdate() //强刷
			},
			refresh(){
				this.$forceUpdate()
			},
			mengwenInput(input) {
				this.form.vehicleNo = input;
			},
		}
	}
</script>
