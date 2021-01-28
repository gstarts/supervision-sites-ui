<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          v-model="queryParams.placeId" placeholder="请选择场所" size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="计费方式" prop="chargeMethod">
        <el-input
          v-model="queryParams.chargeMethod"
          placeholder="请输入计费方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计费方式" prop="chargeMode">
        <el-input
          v-model="queryParams.chargeMode"
          placeholder="请输入计费方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计费周期" prop="chargePeriod">
        <el-input
          v-model="queryParams.chargePeriod"
          placeholder="请输入计费周期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      
      
      <!--<el-form-item label="失效日期" prop="endDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择失效日期">
        </el-date-picker>
      </el-form-item>-->
      
      <!--<el-form-item label="结算周期" prop="settlementEriod">
        <el-input
          v-model="queryParams.settlementEriod"
          placeholder="请输入结算周期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="签订日期" prop="signDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.signDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择签订日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="生效日期" prop="startDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.startDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生效日期">
        </el-date-picker>
      </el-form-item>-->
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
          v-hasPermi="['tax:contract:add']"
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
          v-hasPermi="['tax:contract:edit']"
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
          v-hasPermi="['tax:contract:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:contract:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="contractList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="合同编号" align="center" prop="contractNo"/>
      <el-table-column label="客户名称" align="center" prop="customerName"/>
      <el-table-column label="签订日期" align="center" prop="signDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生效日期" align="center" prop="startDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="失效日期" align="center" prop="endDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计费方式" align="center" prop="chargeMethod"/>
      <el-table-column label="计费方式" align="center" prop="chargeMode"/>
      <el-table-column label="计费周期" align="center" prop="chargePeriod"/>
      <!--<el-table-column label="场所ID" align="center" prop="placeId" />-->
      <el-table-column label="结算周期" align="center" prop="settlementPeriod"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:contract:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:contract:remove']"
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
    
    <!-- 添加或修改仓储合同对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="合同编号" prop="contractNo">
              <el-input v-model="form.contractNo" placeholder="请输入合同编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="customerName">
              <el-select v-model="form.customerName" style="width: 100%" filterable clearable
                         placeholder="请输入客户名称" @change="setStoreCustomer">
                <el-option
                  v-for="type in contractList1"
                  :key="type.id"
                  :label="type.eName"
                  :value="type.eName"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="生效日期" prop="startDate">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.startDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择生效日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="失效日期" prop="endDate">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.endDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择失效日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="签订日期" prop="signDate">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.signDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择签订日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计费方法" prop="chargeMethod">
              <el-input v-model="form.chargeMethod" placeholder="请输入计费方式"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="计费方式" prop="chargeMode">
              <el-input v-model="form.chargeMode" placeholder="请输入计费方式"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计费周期" prop="chargePeriod">
              <el-input v-model="form.chargePeriod" placeholder="请输入计费周期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12"><el-form-item label="结算周期" prop="settlementPeriod">
            <el-input v-model="form.settlementEriod" placeholder="请输入结算周期"/>
          </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注"/>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="场所ID" prop="placeId" style="display: none">
          <el-input v-model="form.placeId" placeholder="请输入场所ID"/>
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
	import {listContract, getContract, delContract, addContract, updateContract} from "@/api/tax/contract";
  import {getUserDepts} from '@/utils/charutils'
  import {listInfo} from "@/api/basis/enterpriseInfo";

	export default {
		name: "Contract",
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
				// 仓储合同表格数据
        contractList: [],
      	// 寄舱客户
        contractList1: [],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					chargeMethod: undefined,
					chargeMode: undefined,
					chargePeriod: undefined,
					contractNo: undefined,
					customerName: undefined,
					endDate: undefined,
					placeId: undefined,
					settlementEriod: undefined,
					signDate: undefined,
          startDate: undefined,
          // 寄仓客户类型
          companyType: '2',
          deptId: undefined
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					placeId: [
						{required: true, message: "场所ID不能为空", trigger: "blur"}
					],
					contractNo: [
						{required: true, message: "合同编号不能为空", trigger: "blur"}
					],
					customerName:[
						{required: true, message: "客户名称不能为空", trigger: "blur"}
          ]
				}
			};
		},
		created() {
			this.depts = getUserDepts('1')
			if (this.depts.length > 0) {
				this.queryParams.placeId = this.depts[0].deptId
				this.getList();
      }
      this.queryParams.deptId = this.queryParams.placeId
      listInfo(this.queryParams).then(response => {
        this.contractList1 = response.rows;
      });
		},
		methods: {
			/** 查询仓储合同列表 */
			getList() {
				this.loading = true;
				listContract(this.queryParams).then(response => {
					this.contractList = response.rows;
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
					createBy: undefined,
					createTime: undefined,
					remark: undefined,
					updateBy: undefined,
					updateTime: undefined,
					chargeMethod: undefined,
					chargeMode: undefined,
					chargePeriod: undefined,
					contractNo: undefined,
					customerName: undefined,
					endDate: undefined,
					placeId: this.queryParams.placeId,
					settlementPeriod: undefined,
					signDate: undefined,
          startDate: undefined,
          customerId: undefined
				};
				this.resetForm("form");
      },
      setStoreCustomer() {
        let customer = this.contractList1.find(item => item.eName === this.form.customerName)
        if (customer) {          
          this.form.customerName = customer.eName
          this.form.customerId = customer.id
          console.log(this.form)
        }

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
				this.title = "添加仓储合同";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getContract(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改仓储合同";
				});
			},
			/** 提交按钮 */
			submitForm: function () {
				this.form.placeId = this.queryParams.placeId
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateContract(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								}
							});
						} else {
              console.log(this.form)
							addContract(this.form).then(response => {
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
				this.$confirm('是否确认删除仓储合同编号为"' + ids + '"的数据项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function () {
					return delContract(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function () {
				});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('tax/contract/export', {
					...this.queryParams
				}, `tax_contract.xlsx`)
			}
		}
	};
</script>
