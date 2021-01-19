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
      <!--<el-form-item label="净重" prop="bagNetWeight">
        <el-input
          v-model="queryParams.bagNetWeight"
          placeholder="请输入净重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--      <el-form-item label="袋号" prop="bagNumber">
              <el-input
                v-model="queryParams.bagNumber"
                placeholder="请输入袋号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <!--<el-form-item label="毛重" prop="bagRoughWeight">
        <el-input
          v-model="queryParams.bagRoughWeight"
          placeholder="请输入毛重"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--      <el-form-item label="袋封号" prop="bagSealNo">
              <el-input
                v-model="queryParams.bagSealNo"
                placeholder="请输入袋封号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="批次号" prop="batchNo">
              <el-input
                v-model="queryParams.batchNo"
                placeholder="请输入批次号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <!--<el-form-item label="品名" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入品名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!-- <el-form-item label="是否已加工" prop="hasProcess">
         <el-input
           v-model="queryParams.hasProcess"
           placeholder="请输入是否已加工"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->
      <!-- <el-form-item label="包装单位" prop="packingUnit">
         <el-input
           v-model="queryParams.packingUnit"
           placeholder="请输入包装单位"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>-->

      <!--      <el-form-item label="库位号" prop="storeCode">
              <el-input
                v-model="queryParams.storeCode"
                placeholder="请输入库位号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <!--      <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>-->
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!--<el-col :span="1.5">
           <el-button
             type="warning"
             icon="el-icon-download"
             size="mini"
             @click="handleExport"
             v-hasPermi="['tax:goods_info:export']"
           >导出</el-button>
         </el-col>-->
    </el-row>
    <el-table row-key="id" :tree-props="{children: 'children'}" :height="height"
              v-loading="loading" :data="goodsList" style="margin-right: 10px">
<!--      <el-table-column label="ID" align="center" prop="id"/>-->
      <el-table-column label="客户" align="left" prop="checkConsumer" fixed="left" min-width="180"/>
      <el-table-column label="批次号" align="center" prop="goodsBatchNo" min-width="140"/>
      <el-table-column label="库位" align="center" prop="storeCode" min-width="80"/>
      <el-table-column label="品名" align="center" prop="goodsName" min-width="160"/>
<!--      <el-table-column label="品质" align="center" prop=""/>-->
      <el-table-column label="入库时间" align="center" prop="createTime" min-width="180"/>
      <el-table-column label="入库车牌" align="center" prop="vehicleNo" min-width="100"/>
      <el-table-column label="货主" align="center" prop="sendName" min-width="220"/>
      <el-table-column label="订单号" align="center" prop="soNo" min-width="120"/>
      <el-table-column label="入库单号" align="center" prop="inDocNo" min-width="160"/>
      <el-table-column label="结算客户" align="center" prop="settlementCustomer" min-width="220"/>
      <el-table-column label="销售合同号" align="center" prop="saleContractNo" min-width="120"/>
      <el-table-column label="业务编号" align="center" prop="businessNo" min-width="80"/>
      <el-table-column label="计量单位" align="center" prop="goodsUnit"/>
      <el-table-column label="入库量" align="center" prop="goodsCount"/>
      <el-table-column label="库存量" align="center" prop="storeGoodsCount"/>
      <el-table-column label="皮重" align="center" prop="poundTareWeight" min-width="100"/>
      <el-table-column label="毛重" align="center" prop="poundRoughWeight" min-width="100"/>
      <el-table-column label="净重" align="center" prop="poundNetWeight" min-width="100"/>
    </el-table>
  </div>
</template>

<script>
import {getUserDepts} from '@/utils/charutils'
import {getStoreNow} from "@/api/tax/store";

export default {
  name: "Goods_info",
  data() {
    return {
      height: 400,
      // 遮罩层
      loading: false,
      // 选中数组
      depts: [],
      goodsList: [],
      queryParams: {
        placeId: undefined,
      },
    };
  },
  created() {
    this.depts = getUserDepts('1')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
    }
  },
  methods: {
    /** 查询货物信息列表 */
    getList() {
      this.loading = true;
      getStoreNow(this.queryParams.placeId).then(response => {
        this.goodsList = response.data;
        //console.log("-----多级数据----")
        //console.log(this.goodsList)
        //console.log("---------")
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
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/goods_info/export', {
        ...this.queryParams
      }, `tax_goods_info.xlsx`)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.height = document.body.clientHeight - 195 + "px"
      window.onresize = () => {
        this.height = document.body.clientHeight - 195 + "px"
      }
    })
  },
};
</script>
