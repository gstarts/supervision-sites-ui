<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择场所">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区域编号" prop="zoneCode">
        <el-input
          v-model="queryParams.zoneCode"
          placeholder="请输入区域编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位状态" prop="storeState">
        <el-select v-model="queryParams.storeState" placeholder="请选择库位状态" clearable size="small">
          <el-option
            v-for="dict in storeStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="货物批次号" prop="goodsBatchNo" label-width="100px">
        <el-input
          v-model="queryParams.goodsBatchNo"
          placeholder="请输入货物批次号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货物名称" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入货物名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="货物种类" prop="goodsType">
        <el-input
          v-model="queryParams.goodsType"
          placeholder="请输入货物种类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="件数单位" prop="countUnit">
        <el-select v-model="queryParams.countUnit" placeholder="请选择件数单位" clearable size="small">
          <el-option
            v-for="dict in countUnitOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="毛重(KG)" prop="roughWight">
        <el-input
          v-model="queryParams.roughWight"
          placeholder="请输入毛重(KG)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="净重(KG)" prop="netWight">
        <el-input
          v-model="queryParams.netWight"
          placeholder="请输入净重(KG)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="货物标识码" prop="goodsIdentificationCode" label-width="90px">
        <el-input
          v-model="queryParams.goodsIdentificationCode"
          placeholder="请输入货物标识码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="数量单位" prop="numUnit">
        <el-select v-model="queryParams.numUnit" placeholder="请选择数量单位" clearable size="small">
          <el-option
            v-for="dict in numUnitOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>-->
      <el-form-item label="报关单号" prop="declarationNo">
        <el-input
          v-model="queryParams.declarationNo"
          placeholder="请输入报关单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务编号" prop="businessNo">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入业务编号"
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
      <!--<el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['place:store_detail:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:store_detail:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:store_detail:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:detail:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="store_detailList">
      <!--<el-table-column type="selection" width="55" align="center" />-->
      <!--<el-table-column label="ID" align="center" prop="id" />-->
      <el-table-column label="场所" align="center" prop="placeId" :fixed="true">
        <template slot-scope="scope">
          {{depts.find(item=>item.deptId === scope.row.placeId).deptName}}
        </template>
      </el-table-column>
      <!--<el-table-column label="区域ID" align="center" prop="zoneId" />-->
      <el-table-column label="区域编号" align="center" prop="zoneCode"/>
      <el-table-column label="库位号" align="center" prop="storeCode" width="100px"/>
      <el-table-column label="报关单号" align="center" prop="declarationNo"/>
      <el-table-column label="集装箱号" align="center" prop="containerNo" width="100px"/>
      <el-table-column label="空/重状态" align="center" prop="isHeavy" :formatter="heavyStateFormat"/>
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo" width="100px"/>
      <el-table-column label="货物名称" align="center" prop="goodsName"/>
      <el-table-column label="货物种类" align="center" prop="goodsType"/>
      <el-table-column label="件数单位" align="center" prop="countUnit"/>
      <el-table-column label="毛重(KG)" align="center" prop="roughWight"/>
      <el-table-column label="净重(KG)" align="center" prop="netWight"/>
      <el-table-column label="货物标识码" align="center" prop="goodsIdentificationCode" width="100px"/>
      <el-table-column label="数量单位" align="center" prop="numUnit"/>
      <el-table-column label="业务编号" align="center" prop="businessNo"/>
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
            v-hasPermi="['place:store_detail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:store_detail:remove']"
          >删除</el-button>
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
  </div>
</template>

<script>
	import {listStore_detail} from "@/api/place/store_detail";
	import {getUserDepts} from '@/utils/charutils'

	export default {
		name: "Store_detail",
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
				storeStateOptions: [],
				// 场所库存明细 表格数据
				store_detailList: [],
				// 弹出层标题
				title: "",
				heavyOptions: [],
				// 是否显示弹出层
				open: false,
				// 件数单位字典
				countUnitOptions: [],
				// 数量单位字典
				numUnitOptions: [],
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					placeId: undefined,
					zoneCode: undefined,
					storeCode: undefined,
					storeState: undefined,
					goodsBatchNo: undefined,
					goodsName: undefined,
					goodsIdentificationCode: undefined,
					declarationNo: undefined,
					businessNo: undefined,
				},
			};
		},
		created() {
			//接收参数
			let queryPlaceId = this.$route.query.placeId
			let queryStoreCode = this.$route.query.storeCode

			this.getDicts("yard_store_state").then(response => {
				this.storeStateOptions = response.data;
			})
			this.getDicts("yard_container_heavy_state").then(response => {
				this.heavyOptions = response.data
			});
			this.depts = getUserDepts('0')
			if (this.depts.length > 0) {
				this.queryParams.placeId = this.depts[0].deptId
				// 参数不为空，并非参数在用户权限范围内
				if (typeof (queryPlaceId) != 'undefined' && this.depts.findIndex((v) => {
					return v.deptId === queryPlaceId
				}) !== -1) {
					this.queryParams.placeId = queryPlaceId
				}
				if (typeof (queryStoreCode) != 'undefined') {
					this.queryParams.storeCode = queryStoreCode
				}
				this.getList();
			}
		},
		methods: {
			heavyStateFormat(row, column) {
				return this.selectDictLabel(this.heavyOptions, row.isHeavy);
			},
			/** 查询场所库存明细 列表 */
			getList() {
				this.loading = true;
				listStore_detail(this.queryParams).then(response => {
					this.store_detailList = response.rows;
					this.total = response.total;
					this.loading = false;
				});
			},

			/** 搜索按钮操作 */
			handleQuery() {
				this.queryParams.pageNum = 1;
				this.getList();
			},
			/** 重置按钮操作 */
			resetQuery() {
				this.resetForm("queryForm");
				this.queryParams.placeId = this.depts[0].deptId
        this.queryParams.storeCode = ''
				this.handleQuery();
			},

			/** 导出按钮操作 */
			handleExport() {
				this.download('place/store_detail/export', {
					...this.queryParams
				}, `place_store_detail.xlsx`)
			}
		}
	};
</script>
