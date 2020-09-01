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
            v-for="dict in stateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否可用" prop="enabled">
        <el-select v-model="queryParams.enabled" placeholder="请选择是否可用" clearable size="small">
          <el-option
            v-for="dict in enabledOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否在用" prop="used">
        <el-select v-model="queryParams.used" placeholder="请选择是否在用" clearable size="small">
          <el-option
            v-for="dict in usedOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="箱属" prop="attrId">
        <el-select v-model="queryParams.attrId" placeholder="请选择箱属" clearable size="small">
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
      <el-form-item label="空重状态" prop="heavy">
        <el-select v-model="queryParams.heavy" placeholder="请选择空重箱状态" clearable size="small">
          <el-option
            v-for="dict in heavyOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="在场状态" prop="insite">
        <el-select v-model="queryParams.insite" placeholder="请选择在场状态" clearable size="small">
          <el-option
            v-for="dict in insiteOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="场所ID" prop="siteId">
        <el-input
          v-model="queryParams.siteId"
          placeholder="请输入场所ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务状态" prop="businessType">
        <el-select v-model="queryParams.businessType" placeholder="请选择业务状态" clearable size="small">
          <el-option
            v-for="dict in ioStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          ></el-option>
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
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yard:history:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="historyList">
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="集装箱号" align="center" prop="containerNo" width="120px"/>
      <el-table-column label="RFID_NO" align="center" prop="rfidNo"/>
      <el-table-column label="状态" align="center" prop="state" :formatter="stateFormat"/>
      <el-table-column label="是否可用" align="center" prop="enabled" :formatter="enabledFormat"/>
      <el-table-column label="是否在用" align="center" prop="used" :formatter="usedFormat"/>
      <el-table-column label="空重状态" align="center" prop="heavy" :formatter="heavyFormat"/>
      <el-table-column label="在场状态" align="center" prop="insite" :formatter="insiteFormat"/>
      <el-table-column label="场所编号" align="center" prop="siteId"/>
      <el-table-column label="业务状态" align="center" prop="businessType" :formatter="businessTypeFormat"/>
      <el-table-column label="箱属" align="center">
        <template slot-scope="scope">
          {{container_attributeList.find(item=>item.attrId === scope.row.attrId).boxName}}
        </template>
      </el-table-column>
      <el-table-column label="箱型" align="center" width="150px">
        <template slot-scope="scope">
          {{(container_attributeList.find(item=>item.attrId === scope.row.attrId)).boxType}}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="更新人" align="center" prop="updateBy"/>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180px"></el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
	import {listHistory} from "@/api/yard/container_history";
	import {listContainer_attribute} from '@/api/yard/container_attribute'

	export default {
		name: "Container_History",
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
				// 集装箱信息历史记录 表格数据
				ioStateOptions: [],
				historyList: [],
				stateOptions: [],
				// 是否可用字典
				enabledOptions: [],
				// 是否在用字典
				usedOptions: [],
				// 空重箱状态字典
				heavyOptions: [],
				// 在场状态字典
				insiteOptions: [],
				container_attributeList: [],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					containerNo: undefined,
					rfidNo: undefined,
					state: undefined,
					enabled: undefined,
					used: undefined,
					attrId: undefined,
					heavy: undefined,
					insite: undefined,
					siteId: undefined,
					businessType: undefined,
				},
				// 表单参数
				form: {},
				// 表单校验
				rules: {
					containerNo: [
						{required: true, message: "集装箱号不能为空", trigger: "blur"}
					],
				}
			};
		},
		created() {
			this.getDicts("container_io_state").then(response => {
				this.ioStateOptions = response.data;
			});
			this.getDicts("hg_container_state").then(response => {
				this.stateOptions = response.data;
			});
			this.getDicts("hg_container_enabled").then(response => {
				this.enabledOptions = response.data;
			});
			this.getDicts("hg_container_used").then(response => {
				this.usedOptions = response.data;
			});
			this.getDicts("yard_container_heavy_state").then(response => {
				this.heavyOptions = response.data;
			});
			this.getDicts("yard_container_insite_state").then(response => {
				this.insiteOptions = response.data;
			});
			this.getList();
			this.getContainerAttributeList()
		},
		methods: {
			// 状态字典翻译
			stateFormat(row, column) {
				return this.selectDictLabel(this.stateOptions, row.state);
			},
			// 是否可用字典翻译
			enabledFormat(row, column) {
				return this.selectDictLabel(this.enabledOptions, row.enabled);
			},
			// 是否在用字典翻译
			usedFormat(row, column) {
				return this.selectDictLabel(this.usedOptions, row.used);
			},
			// 空重箱状态字典翻译
			heavyFormat(row, column) {
				return this.selectDictLabel(this.heavyOptions, row.heavy);
			},
			// 在场状态字典翻译
			insiteFormat(row, column) {
				return this.selectDictLabel(this.insiteOptions, row.insite);
			},
			businessTypeFormat(row, column) {
				return this.selectDictLabel(this.ioStateOptions, row.businessType)
			},
			/** 查询集装箱信息历史记录 列表 */
			getList() {
				this.loading = true;
				listHistory(this.queryParams).then(response => {
					this.historyList = response.rows;
					this.total = response.total;
					this.loading = false;
				});
			},
			// 取消按钮
			cancel() {
				this.open = false;
				this.reset();
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
			/** 导出按钮操作 */
			handleExport() {
				this.download('yard/container/history/export', {
					...this.queryParams
				}, `yard_history.xlsx`)
			},
			//加载集装箱属性列表作为字典
			getContainerAttributeList() {
				this.loading = true;
				listContainer_attribute({}).then(response => {
					this.container_attributeList = response.rows;
					//console.log(this.container_infoList)
					this.loading = false;
					//加载完属性表，再加载数据表
				});
			},
		}
	};
</script>
