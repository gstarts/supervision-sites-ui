<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="集装箱号" prop="containerNo">
        <el-input
          v-model="queryParams.containerNo"
          placeholder="请输入集装箱号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="RFID_NO" prop="rfidNo">
        <el-input
          v-model="queryParams.rfidNo"
          placeholder="请输入RFID_NO"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="queryParams.state" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in hg_container_state"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否可用" prop="enabled">
        <el-select v-model="queryParams.enabled" placeholder="请选择是否可用" clearable size="small">
          <el-option
            v-for="dict in hg_container_enabled"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否在用" prop="used">
        <el-select v-model="queryParams.used" placeholder="请选择是否在用" clearable size="small">
          <el-option
            v-for="dict in hg_container_used"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="箱属" prop="attrId">
        <el-select v-model="queryParams.attrId" placeholder="请选择箱属" clearable size="small" >
          <!--<el-option  label="请选择箱属" value=""/>-->
          <el-option
            v-for="item in container_attributeList"
            :key="item.attrId"
            :label="item.boxName+'-'+item.boxType"
            :value="item.attrId">
            <!--<span>{{item.attrId}}-{{item.boxName}}-{{item.boxType}}</span>-->
          </el-option>
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
          v-hasPermi="['yard:container_info:add']"
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
          v-hasPermi="['yard:container_info:edit']"
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
          v-hasPermi="['yard:container_info:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:container_info:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="container_infoList" @selection-change="handleSelectionChange">
      <!--<el-table-column type="selection" width="55" align="center"/>-->
      <el-table-column label="ID" align="center" prop="id" width="80px" />
      <el-table-column label="集装箱号" align="center" width="120px" prop="containerNo"/>
      <el-table-column label="RFID_NO" align="center" prop="rfidNo"/>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{hg_container_state.find(item=>item.dictValue == scope.row.state).dictLabel}}
        </template>
      </el-table-column>
      <el-table-column label="是否可用" align="center" >
        <template slot-scope="scope">
          {{hg_container_enabled.find(item=>item.dictValue == scope.row.enabled).dictLabel}}
        </template>
      </el-table-column>
      <el-table-column label="是否在用" align="center" >
        <template slot-scope="scope">
          {{hg_container_used.find(item=>item.dictValue == scope.row.used).dictLabel}}
        </template>
      </el-table-column>
      <!--<el-table-column label="属性" align="center" prop="attrId" />-->
      <el-table-column label="箱属" align="center">
        <template slot-scope="scope">
          {{container_attributeList.find(item=>item.attrId === scope.row.attrId).boxName}}
        </template>
      </el-table-column>
      <el-table-column label="箱型" align="center">
        <template slot-scope="scope">
          {{(container_attributeList.find(item=>item.attrId === scope.row.attrId)).boxType}}
        </template>
      </el-table-column>
      <el-table-column label="净重(kg)" align="center">
        <template slot-scope="scope">
          {{container_attributeList.find(item=>item.attrId === scope.row.attrId).boxTare}}
        </template>
      </el-table-column>
      <el-table-column label="可载重(kg)" align="center">
        <template slot-scope="scope">
          {{container_attributeList.find(item=>item.attrId === scope.row.attrId).boxLoad}}
        </template>
      </el-table-column>
      <el-table-column label="尺寸(长*宽*高mm)" align="center">
        <template slot-scope="scope">
          {{container_attributeList.find(item=>item.attrId===scope.row.attrId).length}}*{{container_attributeList.find(item=>item.attrId === scope.row.attrId).width}}*{{container_attributeList.find(item=>item.attrId === scope.row.attrId).height}}
        </template>
      </el-table-column>
      <!--<el-table-column label="备注" align="center" prop="remark" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yard:container_info:edit']">修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yard:container_info:remove']">删除
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
    
    <!-- 添加或修改集装箱基本信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="集装箱号" prop="containerNo">
          <el-input v-model="form.containerNo" placeholder="请输入集装箱号"/>
        </el-form-item>
        <el-form-item label="RFID_NO" prop="rfidNo">
          <el-input v-model="form.rfidNo" placeholder="请输入RFID_NO"/>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option
              v-for="dict in hg_container_state"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用" prop="enabled">
          <el-select v-model="form.enabled" placeholder="请选择是否可用">
            <el-option
              v-for="dict in hg_container_enabled"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否在用" prop="used">
          <el-select v-model="form.used" placeholder="请选择是否在用">
            <el-option
              v-for="dict in hg_container_used"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="箱属" prop="attrId">
          <el-select v-model="form.attrId" placeholder="请选择属性">
            <el-option
              v-for="item in container_attributeList"
              :key="item.attrId"
              :label="item.boxName+'-'+item.boxType"
              :value="item.attrId" />
          </el-select>
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
	import {
		listContainer_info,
		getContainer_info,
		delContainer_info,
		addContainer_info,
		updateContainer_info
	} from "@/api/yard/container_info";
	import {listContainer_attribute} from '@/api/yard/container_attribute'

	export default {
		name: "Container_info",
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
				// 集装箱基本信息表格数据
				container_infoList: [],
				container_attributeList: [],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					containerNo: undefined,
					rfidNo: undefined,
					state: undefined,
					enabled: undefined,
					used: undefined,
					attrId: undefined,
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					containerNo: [
						{required: true, message: "集装箱号不能为空", trigger: "blur"}
					],
					state: [
						{required: true, message: "状态不能为空", trigger: "change"}
					],
					enabled: [
						{required: true, message: "是否可用不能为空", trigger: "change"}
					],
					used: [
						{required: true, message: "是否在用不能为空", trigger: "change"}
					],
					attrId: [
						{required: true, message: "箱属不能为空", trigger: "change"}
					],
				},
        //字典
				hg_container_state:[],
				hg_container_enabled:[],
				hg_container_used:[]
			};
		},
		created() {
			//先加载字典类型
			this.getContainerAttributeList()
			this.getDicts("hg_container_state").then(response => {
				this.hg_container_state = response.data;
			})
			this.getDicts("hg_container_enabled").then(response => {
				this.hg_container_enabled = response.data;
			})
			this.getDicts("hg_container_used").then(response => {
				this.hg_container_used = response.data;
			})
			
		},
		methods: {
			/** 查询集装箱基本信息列表 */
			getList() {
				this.loading = true;
				listContainer_info(this.queryParams).then(response => {
					this.container_infoList = response.rows;

					this.total = response.total;
					this.loading = false;
				});
			},
      //加载集装箱属性列表作为字典
			getContainerAttributeList() {
				this.loading = true;
				listContainer_attribute({}).then(response => {
					this.container_attributeList = response.rows;
					//console.log(this.container_infoList)
					this.loading = false;
					this.getList() //加载完属性表，再加载数据表
				});
			},
			// 字典状态字典翻译
			statusFormat(row, column) {
				return this.selectDictLabel(this.statusOptions, row.status);
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
					containerNo: undefined,
					rfidNo: undefined,
					state: undefined,
					enabled: undefined,
					used: undefined,
					attrId: undefined,
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
				this.title = "添加集装箱基本信息";
			},
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids
				getContainer_info(id).then(response => {
					this.form = response.data;
					this.open = true;
					this.title = "修改集装箱基本信息";
				});
			},
			/** 提交按钮 */
			submitForm: function () {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.id != undefined) {
							updateContainer_info(this.form).then(response => {
								if (response.code === 200) {
									this.msgSuccess("修改成功");
									this.open = false;
									this.getList();
								}
							});
						} else {
							addContainer_info(this.form).then(response => {
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
				this.$confirm('是否确认删除集装箱记录编号为"' + ids + '"的数据项?', "警告", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function () {
					return delContainer_info(ids);
				}).then(() => {
					this.getList();
					this.msgSuccess("删除成功");
				}).catch(function () {
				});
			},
			/** 导出按钮操作 */
			handleExport() {
				this.download('yard/container_info/export', {
					...this.queryParams
				}, `yard_container_info.xlsx`)
			}
		}
	};
</script>
