<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="出入库单号" prop="businessNo" label-width="90px">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入出入库单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="堆场" prop="yardId">
        <el-select
          v-model="queryParams.yardId"
          placeholder="请输入堆场ID"
          clearable
          size="small"
          @change="handleQuery">
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
      <el-form-item label="出/入场状态" prop="ioState" label-width="90px">
        <el-select v-model="queryParams.ioState" placeholder="请选择出/入场状态" clearable size="small">
          <el-option
            v-for="dict in ioStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="出/入场时间" prop="ioTime" label-width="90px">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.ioTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择出/入场时间">
        </el-date-picker>
      </el-form-item>
      <!--<el-form-item label="来源" prop="formSite">
        <el-input
          v-model="queryParams.formSite"
          placeholder="请输入来源"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!-- <el-form-item label="去处" prop="toSite">
         <el-input
           v-model="queryParams.toSite"
           placeholder="请输入去处"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->
      <el-form-item label="司机ID" prop="driverId">
        <el-input
          v-model="queryParams.driverId"
          placeholder="请输入司机ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货运企业名称" prop="companyName" label-width="100px">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入货运企业名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务状态" prop="state">
        <el-select v-model="queryParams.state" placeholder="请选择业务状态" clearable size="small">
          <el-option
            v-for="dict in stateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单证用途" prop="purpose">
        <el-select v-model="queryParams.purpose" placeholder="请选择单证用途" clearable size="small">
          <el-option
            v-for="dict in purposeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
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
          v-hasPermi="['yard:io:add']"
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
          v-hasPermi="['yard:io:edit']"
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
          v-hasPermi="['yard:io:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:io:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="ioList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="出入库单号" align="center" prop="businessNo"/>
      <el-table-column label="堆场ID" align="center" prop="yardId"/>
      <el-table-column label="车牌号" align="center" prop="vehicleNo"/>
      <el-table-column label="集装箱数量" align="center" prop="containerCount"/>
      <el-table-column label="集装箱号" align="center" prop="containerNo"/>
      <el-table-column label="出/入场状态" align="center" prop="ioState" :formatter="ioStateFormat"/>
      <el-table-column label="出/入场时间" align="center" prop="ioTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ioTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源" align="center" prop="formSite"/>
      <el-table-column label="去处" align="center" prop="toSite"/>
      <el-table-column label="司机ID" align="center" prop="driverId"/>
      <el-table-column label="货运企业名称" align="center" prop="companyName"/>
      <el-table-column label="业务状态" align="center" prop="state" :formatter="stateFormat"/>
      <el-table-column label="单证用途" align="center" prop="purpose" :formatter="purposeFormat"/>
      <el-table-column label="更新人" align="center" prop="updateBy"/>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yard:io:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yard:io:remove']"
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
    
    <!-- 添加或修改集装箱进出记录 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body width="70%" :modal="true" close-on-click-modal>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="出入库单号" prop="businessNo">
              <el-input v-model="form.businessNo" placeholder="请输入出入库单号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="车牌号" prop="vehicleNo">
              <el-input v-model="form.vehicleNo" placeholder="请输入车牌号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="集装箱数量" prop="containerCount">
              <el-input-number :disabled="true" :min="0" v-model="form.containerCount" placeholder="请输入集装箱数量" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="集装箱号" prop="containerNo">
              <el-input v-model="form.containerNo" placeholder="请输入集装箱号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域" prop="zoneCode">
              <el-select v-model="form.zoneCode" placeholder="请输入区域"  @change="getStoreList">
                <el-option
                  v-for="zone in zoneList"
                  :key="zone.id"
                  :label="zone.zoneName+(zone.zoneCode<10?'0'+zone.zoneCode:zone.zoneCode)"
                  :value="zone.zoneName+(zone.zoneCode<10?'0'+zone.zoneCode:zone.zoneCode)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货位号" prop="zoneCode">
              <el-select v-model="form.storeCode" placeholder="请输入货位">
                <el-option
                  v-for="store in storeList"
                  :key="store.id"
                  :label="store.storeCode"
                  :value="store.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="出/入场状态">
              <el-select v-model="form.ioState" placeholder="请选择出/入场状态">
                <el-option
                  v-for="dict in ioStateOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出/入场时间" prop="ioTime">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.ioTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择出/入场时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="来源" prop="formSite">
              <el-input v-model="form.formSite" placeholder="请输入来源"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="去处" prop="toSite">
              <el-input v-model="form.toSite" placeholder="请输入去处"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="司机ID" prop="driverId">
              <el-input v-model="form.driverId" placeholder="请输入司机ID"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货运企业名称" prop="companyName">
              <el-input v-model="form.companyName" placeholder="请输入货运企业名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="业务状态">
              <el-select v-model="form.state" placeholder="请选择业务状态">
                <el-option
                  v-for="dict in stateOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单证用途">
              <el-select v-model="form.purpose" placeholder="请选择单证用途">
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
	import {listIo, getIo, delIo, addIo, updateIo} from "@/api/yard/io";
	import {getUserDepts} from '@/utils/charutils'
	import {listZone} from '../../../api/yard/zone'
	import {listStore} from '../../../api/yard/store'

	export default {
		name: "Io",
		data() {
			return {
				// 遮罩层
				loading: true,
				// 选中数组
				ids: [],
				//场所列表
				depts: [],
				// 非单个禁用
				single: true,
				// 非多个禁用
				multiple: true,
				// 总条数
				total: 0,
				// 集装箱进出记录 表格数据
				ioList: [],
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
        zoneList: [],
        storeList: [],
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					yardId: [
						{required: true, message: "堆场ID不能为空", trigger: "blur"}
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
						{required: true, message: "出/入场状态不能为空", trigger: "blur"}
					],
				}
			};
		},
		created() {
			this.getDicts("container_io_state").then(response => {
				this.ioStateOptions = response.data;
			});
			this.getDicts("yard_business_state").then(response => {
				this.stateOptions = response.data;
			});
			this.getDicts("yard_business_type").then(response => {
				this.purposeOptions = response.data;
			});

			// 0 监管场所，1保税库，2堆场，3企业
			this.depts = getUserDepts('2')
			if (this.depts.length > 0) {
				this.queryParams.yardId = this.depts[0].deptId
				this.getList()
			}

		},
		methods: {
			/** 查询集装箱进出记录 列表 */
			getList() {
				this.loading = true;
				listIo(this.queryParams).then(response => {
					this.ioList = response.rows;
					this.total = response.total;
					this.loading = false;
				});
			},
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
				this.reset();
			},
			// 表单重置
			reset() {
				this.form = {
					id: undefined,
					businessNo: undefined,
					yardId: undefined,
					vehicleNo: undefined,
					containerCount: undefined,
					containerNo: undefined,
					ioState: undefined,
					ioTime: undefined,
					formSite: undefined,
					toSite: undefined,
					driverId: undefined,
					companyName: undefined,
					state: undefined,
					purpose: undefined,
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
				this.title = "添加集装箱进出记录 ";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getIo(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改集装箱进出记录 ";
				});
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateIo(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								}
							});
						} else {
							addIo(this.form).then(response => {
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
				this.$confirm('是否确认删除集装箱进出记录 编号为"' + ids + '"的数据项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function () {
					return delIo(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function () {
				});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('yard/io/export', {
					...this.queryParams
				}, `yard_io.xlsx`)
			},
      //获取堆场的区域列表
      getYardZoneList(){
				if(this.form.yardId !== ''){
					listZone({'yardId':this.form.yardId,'zoneType':'1'}).then(response => {
						this.zoneList = []
						this.zoneList = response.rows
					});
        }else{
					this.zoneList = []
        }
      },
      getStoreList(){
				if(this.form.zoneCode !== ''){
					listStore({'yardId':this.form.yardId,'zoneType':'1','zoneCode':this.form.zoneCode,'storeState':'0'}).then(response => {
						this.storeList = []
						this.storeList = response.rows
					})
        }else{
					this.storeList = []
        }
				
      }
		}
	};
</script>
