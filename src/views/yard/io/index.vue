<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="堆场" prop="yardId">
        <el-select
          v-model="queryParams.yardId"
          placeholder="请选择堆场"
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
      <el-form-item label="出/入库单号" prop="businessNo" label-width="90px">
        <el-input
          v-model="queryParams.businessNo"
          placeholder="请输入出入库单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <!--<el-form-item label="业务状态" prop="state">
        <el-select v-model="queryParams.state" placeholder="请选择业务状态" clearable size="small">
          <el-option
            v-for="dict in stateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>-->
      <!--<el-form-item label="单证用途" prop="purpose">
        <el-select v-model="queryParams.purpose" placeholder="请选择单证用途" clearable size="small">
          <el-option
            v-for="dict in purposeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>-->
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
      </el-col>-->
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
    
    <el-table v-loading="loading" :data="ioList">
      <!--<el-table-column type="selection" width="55" align="center"/>-->
      <!--<el-table-column label="ID" align="center" prop="id"/>-->
      <el-table-column label="堆场" align="center" prop="yardId">
        <template slot-scope="scope">
          <span>{{depts.find(item=>item.deptId === scope.row.yardId).deptName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出入库单号" align="center" prop="ioNo"/>
      <el-table-column label="车牌号" align="center" prop="vehicleNo"/>
      <el-table-column label="集装箱数量" align="center" prop="containerCount"/>
      <!--<el-table-column label="集装箱号" align="center" prop="containerNo"/>-->
      <el-table-column label="出/入场状态" align="center" prop="ioState" :formatter="ioStateFormat"/>
      <el-table-column label="出/入场时间" align="center" prop="ioTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ioTime) }}</span>
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
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="gotoSub(scope.row)"
            v-hasPermi="['yard:io_sub:list']"
          >查看详情
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
  </div>
</template>

<script>
	import {listIo} from "@/api/yard/io";
	import {getUserDepts} from '@/utils/charutils'

	export default {
		name: "Io",
		data() {
			return {
				// 遮罩层
				loading: true,
				// 选中数组
				//场所列表
				depts: [],
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
				containerList: [],
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					businessNo: undefined,
					yardId: undefined,
					vehicleNo: undefined,
					ioState: undefined,
					ioTime: undefined,
					driverId: undefined,
					companyName: undefined,
					state: undefined,
				},
				zoneList: [],
				storeList: [],
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
			gotoSub(row) {
				this.$router.push({
          path: '/yard/io/detail',
          query: {
          	'yardId': row.yardId,
            'ioNo': row.ioNo
          }
        })
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
				this.download('yard/io/export', {
					...this.queryParams
				}, `yard_io.xlsx`)
			},
		}
	}
	;
</script>
