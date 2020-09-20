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
      <!--<el-form-item label="文件桶" prop="bucketName">
        <el-input
          v-model="queryParams.bucketName"
          placeholder="请输入文件桶名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="文件名" prop="fileName">
        <el-input
          v-model="queryParams.fileName"
          placeholder="请输入文件名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      
      <el-form-item label="模板类型" prop="templateType">
        <el-select v-model="queryParams.templateType" placeholder="请选择模板类型" clearable size="small">
          <el-option
            v-for="type in importTypeDic"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="导入日期" prop="updateTime">
        <el-date-picker
          v-model="queryParams.updateTime"
          type="date"
          placeholder="请选择日期"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
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
          v-hasPermi="['tax:import:add']"
        >导入
        </el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:import:edit']"
        >修改</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tax:import:remove']"
        >删除
        </el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:import:export']"
        >下载
        </el-button>
      </el-col>-->
    </el-row>
    
    <el-table v-loading="loading" :data="importList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--<el-table-column label="场所编号" align="center" prop="placeId" />-->
      <el-table-column label="ID" align="center" prop="id" width="60px"/>
      <el-table-column label="模板类型" align="center" width="100px">
        <template slot-scope="scope">
          {{importTypeDic.find(item=> item.value ===scope.row.templateType ).label}}
        </template>
      </el-table-column>
      <el-table-column label="寄舱客户" align="center" prop="storeCustomer"/>
      <el-table-column label="文件路径" align="center" prop="path"/>
      <el-table-column label="文件名" align="center" prop="fileName"/>
      <!--<el-table-column label="是否生成报关数据" align="center" prop="isGenReport"/>
      <el-table-column label="是否生成出入库通知单" align="center" prop="isGenStoreNotice"/>-->
      <el-table-column label="文件大小" align="center" prop="fileLength" width="100px"/>
      <el-table-column label="创建人" align="center" prop="updateBy" width="100px"/>
      <el-table-column label="创建时间" align="center" prop="updateTime" width="180px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-show="scope.row.isGenStoreNotice===0 && scope.row.templateType ==='0' "
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     :loading="noticeGening"
                     @click="handleGenNotice(scope.row)"
                     v-hasPermi="['tax:import:genNotice']"
          >生成出库通知单
          </el-button>
          <span v-show="scope.row.isGenStoreNotice===1">已生成通知单</span>
          <el-button v-show="scope.row.isGenReport===0 && scope.row.templateType === '2'"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleGenReport(scope.row)"
                     v-hasPermi="['tax:import:genReport']"
          >生成报关数据
          </el-button>
          <span v-show="scope.row.isGenReport===1">已生成报关数据</span>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-download"
            @click="handleDownload(scope.row)"
            v-hasPermi="['tax:import:download']"
          >下载
          </el-button>
          <el-button v-show="scope.row.isGenReport ===0 && scope.row.isGenStoreNotice ===0"
                     size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row)"
                     v-hasPermi="['tax:import:remove']"
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
    
    <!-- 添加或修改导入文件记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!--<el-form-item label="模板类型，1入库知单，0出库通知单" prop="createBy">
          <el-input v-model="form.createBy" placeholder="请输入模板类型，1入库知单，0出库通知单" />
        </el-form-item>
        <el-form-item label="模板类型，1入库知单，0出库通知单" prop="createTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择模板类型，1入库知单，0出库通知单">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="模板类型，1入库知单，0出库通知单" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入模板类型，1入库知单，0出库通知单" />
        </el-form-item>
        <el-form-item label="模板类型，1入库知单，0出库通知单" prop="updateBy">
          <el-input v-model="form.updateBy" placeholder="请输入模板类型，1入库知单，0出库通知单" />
        </el-form-item>
        <el-form-item label="模板类型，1入库知单，0出库通知单" prop="updateTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择模板类型，1入库知单，0出库通知单">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="文件桶名称" prop="bucketName">
          <el-input v-model="form.bucketName" placeholder="请输入文件桶名称" />
        </el-form-item>
        <el-form-item label="文件名" prop="fileName">
          <el-input v-model="form.fileName" placeholder="请输入文件名" />
        </el-form-item>
        <el-form-item label="是否生成报关数据" prop="isGenReport">
          <el-input v-model="form.isGenReport" placeholder="请输入是否生成报关数据" />
        </el-form-item>
        <el-form-item label="是否生成出入库通知单" prop="isGenStoreNotice">
          <el-input v-model="form.isGenStoreNotice" placeholder="请输入是否生成出入库通知单" />
        </el-form-item>
        <el-form-item label="对象名称" prop="objectName">
          <el-input v-model="form.objectName" placeholder="请输入对象名称" />
        </el-form-item>
        <el-form-item label="文件路径" prop="path">
          <el-input v-model="form.path" placeholder="请输入文件路径" />
        </el-form-item>
        <el-form-item label="场所编号" prop="placeId">
          <el-input v-model="form.placeId" placeholder="请输入场所编号" />
        </el-form-item>-->
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="模板类型" prop="templateType">
              <el-select v-model="form.templateType" placeholder="请选择模板类型" @change="templateChange">
                <el-option
                  v-for="type in importTypeDic"
                  :key="type.value"
                  :label="type.label"
                  :value="type.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务编号" prop="businessNo" v-show="noticeType">
              <el-input v-model="form.businessNo" placeholder="请输入业务编号"
                        clearable
                        size="small">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="寄舱客户" prop="storeCustomer" v-show="noticeType">
              <el-select v-model="form.storeCustomer" placeholder="请选择寄舱客户" @change="setStoreCustomer">
                <el-option
                  v-for="type in contractList"
                  :key="type.id"
                  :label="type.customerName +'('+ type.contractNo+')'"
                  :value="type.customerName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算客户" prop="settlementCustomer" v-show="noticeType">
              <el-select v-model="form.settlementCustomer" placeholder="请选择结算客户" @change="setSettlementCustomer">
                <el-option
                  v-for="type in contractList"
                  :key="type.id"
                  :label="type.customerName +'('+ type.contractNo+')'"
                  :value="type.customerName"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="text-align: center">
          <el-upload
            class="upload-demo"
            ref="upload"
            :limit="1"
            accept=".xlsx,.xls,.xlsm"
            drag
            :action=uploadAction
            :headers="headers"
            :on-progress="uploadProcess"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="uploadBefore"
            :disabled="uploading"
            :file-list="fileList"
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件</div>
          </el-upload>
        </el-row>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" :loading="uploading">导入</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    
    </el-dialog>
  </div>
</template>

<script>
	import {listImport, getImport, delImport, addImport, genNotice} from "@/api/tax/import";
	import {getUserDepts} from '@/utils/charutils'
	import {getToken} from '@/utils/auth'
	import {addContract, listContract, updateContract} from '@/api/tax/contract'

	export default {
		name: "Import",
		data() {
			return {
				// 遮罩层
				loading: false,
				noticeGening: false,
				// 选中数组
				ids: [],
				//客户合同
				contractList: [],
				//机构列表
				depts: [],
				// 非单个禁用
				single: true,
				// 非多个禁用
				multiple: true,
				// 总条数
				total: 0,
				// 导入文件记录表格数据
				importList: [],
				importTypeDic: [
					{value: '1', label: '入库通知单'},
					{value: '0', label: '出库通知单'},
					{value: '2', label: '报关数据单'}
				],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					bucketName: undefined,
					fileName: undefined,
					isGenReport: undefined,
					isGenStoreNotice: undefined,
					objectName: undefined,
					path: undefined,
					placeId: undefined,
					templateType: undefined,
					orderByColumn: 'id',
					isAsc: 'desc'
				},
				// 表单参数
				form: {
					templateType: '',
					businessNo: '',
					storeCustomer: '',
					settlementCustomer: '',
					storeContractId: '',
					settlementContractId: ''
				},
				noticeType: true,
				rules: {},
				// 表单校验
				rules1: {
					templateType: [
						{required: true, message: "模板类型不能为空", trigger: "change"}
					],
					storeCustomer: [
						{required: true, message: "寄舱客户不能为空", trigger: "change"}
					],
					settlementCustomer: [
						{required: true, message: "结算客户不能为空", trigger: "change"}
					],
					businessNo: [
						{required: true, message: "业务编号不能为空", trigger: "blur"}
					]
				},
				rules2: {
					templateType: [
						{required: true, message: "模板类型不能为空", trigger: "change"}
					]
				},
				uploadAction: process.env.VUE_APP_BASE_API + '/minio/files/tax/upload',
				uploadData: {},
				uploading: false,

				headers: {
					'Authorization': '',
					'templateType': '',
					'placeId': '',
					'bucketName': ''
				},
        fileList: [],
			};
		},
		created() {
			// 0 监管场所，1保税库，2堆场，3企业
			this.importTypeDic = [
				{value: '1', label: '入库通知单'},
				{value: '0', label: '出库通知单'},
				{value: '2', label: '报关数据单'}
			]
			listContract({'placeId': this.queryParams.placeId}).then(response => {
				this.contractList = response.rows;
			});
			this.depts = getUserDepts('1')
			if (this.depts.length > 0) {
				this.queryParams.placeId = this.depts[0].deptId
				this.getList();
			}
			this.rules = this.rules1
		},
		methods: {
			/** 查询导入文件记录列表 */
			getList() {
				this.loading = true;
				listImport(this.queryParams).then(response => {
					this.importList = response.rows;
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
					templateType: undefined,
					storeCustomer: undefined,
					settlementCustomer: undefined,
					storeContractId: undefined,
					settlementContractId: undefined,
					id: undefined,
					createBy: undefined,
					createTime: undefined,
					remark: undefined,
					updateBy: undefined,
					updateTime: undefined,
					bucketName: undefined,
					fileName: undefined,
					isGenReport: undefined,
					isGenStoreNotice: undefined,
					objectName: undefined,
					path: undefined,
					placeId: undefined,
				};
				this.uploading = false
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
				//this.reset();
				this.open = true;
				this.title = "导入模板文件";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getImport(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改导入文件记录";
				});
			},
			//下载
			handleDownload(row) {
				window.location.href = process.env.VUE_APP_BASE_API + '/minio/files/download?bucketName=' + row.bucketName + '&objectName=' + row.objectName
			},
			//生成出入库通知单
			handleGenNotice(row) {
				this.$confirm('生成通知单前请确认文件格式正确无误?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loading = true
					genNotice(row.id).then(response => {
						this.loading = false
						if (response.code == '200') {
							this.msgSuccess("通知单生成成功");
							row.isGenStoreNotice = 1
						} else {
							this.msgError("通知单生成失败");
						}
					}).catch(err => {
						this.loading = false
						colsone.log("取消生成通知单")
					})
				}).catch((err) => {
					this.loading = false
					colsone.log("取消生成通知单")
				});
			},
			handleGenReport(row) {
			},
			uploadProcess() {
				this.uploading = true
			},
      uploadBefore(file){
				/*alert("要上传")
				console.log(file)
				if(!file){
					this.$message.error('请选择要上传的文件22')
					return false
        }*/
      },
			uploadSuccess(response) {
				if(response.code !==200){
					this.$message.error(response.msg)
					this.uploading = false
          return false
        }
				this.uploading = true
				this.$refs.upload.clearFiles()
				console.log(response.data)
				this.form.createTime = response.data.createTime
				this.form.bucketName = this.headers.bucketName
				this.form.fileName = response.data.name
				this.form.objectName = response.data.objectName
				this.form.placeId = this.queryParams.placeId
				this.form.fileLength = response.data.length

				addImport(this.form).then(response => {
					if (response.code === 200) {
						this.uploading = false
						this.msgSuccess("上传成功");
						this.open = false;
						this.getList();
					} else {
						this.uploading = false
						console.log(response)
						this.msgError('创建记录失败')
					}
				}).catch(err => {
					this.uploading = false
				})
			},
			uploadError(err) {
				this.uploading = false
				console.log(err)
				this.$message.error('文件上传失败')
			},
			/** 提交上传按钮 */
			submitForm: function () {
				//console.log(this.fileList)
				//console.log(this.$refs.upload.$refs['upload-inner'].fileList)
				//console.log(this.$refs.upload.fileList)
				/*if (this.$refs.upload.fileList.length === 0) {
					this.$message.error('请选择要上传的文件')
					return
				}*/
				this.$refs["form"].validate(valid => {
					if (valid) {
						if(this.$refs.upload.$refs['upload-inner'].fileList.length === 0){
								this.$message.error('请选择要上传的文件')
								return false
            }
						this.uploading = true
						this.headers.Authorization = 'Bearer ' + getToken()
						this.headers.placeId = this.queryParams.placeId
						console.log('this.form.templateType=' + this.form.templateType)
						this.headers.templateType = this.form.templateType
						this.headers.bucketName = 'tax'
						this.$refs.upload.submit();
					}
				});
				/*if (this.form.id != undefined) {
          updateImport(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }
          });
        } else {
          addImport(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            }
          });
        }*/

			},
			/** 删除按钮操作 */
			handleDelete(row) {
				const ids = row.id || this.ids;
				this.$confirm('是否确认删除导入文件记录编号为"' + ids + '"的数据项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function () {
					return delImport(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function () {
				});
			},
			setStoreCustomer() {
				this.form.storeContractId = this.contractList.find(item => item.customerName === this.form.storeCustomer).id
				console.log(this.form)
			},
			setSettlementCustomer() {
				this.form.settlementContractId = this.contractList.find(item => item.customerName === this.form.settlementCustomer).id
				console.log(this.form)
			},
			templateChange() {
				console.log(this.form.templateType)
				if (this.form.templateType === '0' || this.form.templateType === '1') {
					this.rules = this.rules1
					this.noticeType = true
				} else {
					this.form.businessNo = ''
					this.form.settlementCustomer = ''
					this.form.storeCustomer = ''
					this.form.storeContractId = ''
					this.form.settlementContractId = ''
					this.rules = this.rules2
					this.noticeType = false
				}
			}
		}
	};
</script>
