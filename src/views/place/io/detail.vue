<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          v-model="queryParams.placeId"
          placeholder="请选择场所"
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
      <!--<el-form-item label="父级进出场单号id" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入父级进出场单号id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="进出场单号" prop="ioNo" label-width="90px">
        <el-input
          v-model="queryParams.ioNo"
          placeholder="请输入进出场单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="集装箱号" prop="containerNo">
         <el-input
           v-model="queryParams.containerNo"
           placeholder="请输入集装箱号"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->
      <!--<el-form-item label="库位号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="货物批次号" prop="goodsBatchNo" label-width="90px">
        <el-input
          v-model="queryParams.goodsBatchNo"
          placeholder="请输入货物批次号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item label="货物名称" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入货物名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出/入场时间" prop="ioTime" label-width="90px">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.updateTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择出/入场时间">
        </el-date-picker>
      </el-form-item>
      <!--<el-form-item label="货物种类" prop="goodsType">
        <el-select v-model="queryParams.goodsType" placeholder="请选择货物种类" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>-->
      <!--<el-form-item label="货物标识码" prop="goodsIdentificationCode">
        <el-input
          v-model="queryParams.goodsIdentificationCode"
          placeholder="请输入货物标识码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    
    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
         <el-button
           type="primary"
           icon="el-icon-plus"
           size="mini"
           @click="handleAdd"
           v-hasPermi="['yard:io_sub:add']"
         >新增</el-button>
       </el-col>
       <el-col :span="1.5">
         <el-button
           type="success"
           icon="el-icon-edit"
           size="mini"
           :disabled="single"
           @click="handleUpdate"
           v-hasPermi="['yard:io_sub:edit']"
         >修改</el-button>
       </el-col>
       <el-col :span="1.5">
         <el-button
           type="danger"
           icon="el-icon-delete"
           size="mini"
           :disabled="multiple"
           @click="handleDelete"
           v-hasPermi="['yard:io_sub:remove']"
         >删除</el-button>
       </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:goods_io_detail:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="io_subList">
      <!--<el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />-->
      <!--<el-table-column label="父级进出场单号id" align="center" prop="parentId" />-->
      <el-table-column label="场所" align="center" prop="placeId" :fixed="true" width="90px">
        <template slot-scope="scope">
          <span>{{depts.find(item=>item.deptId == scope.row.placeId).deptName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="库位号" align="center" prop="storeCode" width="120px"/>
      <el-table-column label="进出场单号" align="center" prop="ioNo" width="180px"/>
      <el-table-column label="集装箱号" align="center" prop="containerNo" width="120px"/>
      <el-table-column label="报关单号" align="center" prop="declarationNo" width="120px"/>
      <!--<el-table-column label="区域编号" align="center" prop="areaCode" />-->
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo" width="120px"/>
      <el-table-column label="业务编号" align="center" prop="businessNo"/>
      <el-table-column label="货物名称" align="center" prop="goodsName"/>
      <el-table-column label="货物种类" align="center" prop="goodsType"/>
      <el-table-column label="件数单位" align="center" prop="countUnit"/>
      <el-table-column label="毛重(KG)" align="center" prop="roughWight"/>
      <el-table-column label="净重(KG)" align="center" prop="netWight"/>
      <el-table-column label="货物标识码" align="center" prop="goodsIdentificationCode"/>
      <el-table-column label="数量单位" align="center" prop="numUnit"/>
      <el-table-column label="更新人" align="center" prop="updateBy"/>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="160px"/>
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
	import {listIo_sub, getIo_sub, delIo_sub, addIo_sub, updateIo_sub} from "@/api/place/goods_io_detail";
	import {getUserDepts} from '@/utils/charutils'

	export default {
		name: "Io_sub",
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
				// 集装箱进出场子单 表格数据
				io_subList: [],
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					ioNo: undefined,
					containerNo: undefined,
					placeId: undefined,
					storeCode: undefined,
					goodsBatchNo: undefined,
					declarationNo: undefined,
					businessNo: undefined,
					goodsName: undefined,
					updateTime: undefined,
				},
			};
		},
		created() {
			let queryPlaceId = this.$route.query.placeId
			let ioNo = this.$route.query.ioNo

			// 0 监管场所，1保税库，2场所，3企业
			this.depts = getUserDepts('0')
			if (this.depts.length > 0) {
				this.queryParams.placeId = this.depts[0].deptId
				// 参数不为空，并非参数在用户权限范围内
				if (typeof (queryPlaceId) != 'undefined' && this.depts.findIndex((v) => {
					return v.deptId === queryPlaceId
				}) !== -1) {
					this.queryParams.placeId = queryPlaceId
				}
				if (typeof (ioNo) != 'undefined') {
					this.queryParams.ioNo = ioNo
				}
				this.getList()
			}
		},
		methods: {
			/** 查询集装箱进出场子单 列表 */
			getList() {
				this.loading = true;
				listIo_sub(this.queryParams).then(response => {
					this.io_subList = response.rows;
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
				this.queryParams.ioNo = ''
				this.queryParams.deptId = this.depts[0].deptId
				this.handleQuery();
			},
			handleExport() {
				this.download('place/goods_io_detail/export', {
					...this.queryParams
				}, `place_io_sub.xlsx`)
			}
		}
	};
</script>
