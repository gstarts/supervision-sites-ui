<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
<!--      <el-row>-->
<!--        <el-col :span="6">-->
<!--          <el-form-item label="单据号" prop="documentNo">-->
<!--            <el-input-->
<!--              v-model="queryParams.documentNo"-->
<!--              placeholder="请输入单据号"-->
<!--              clearable-->
<!--              size="small"-->
<!--              @keyup.enter.native="handleQuery"-->
<!--            />-->
<!--          </el-form-item>-->
<!--        </el-col>-->

<!--        <el-col :span="6">-->
<!--          <el-form-item label="lot_no" prop="lotNo">-->
<!--            <el-input-->
<!--              v-model="queryParams.lotNo"-->
<!--              placeholder="请输入lot_no"-->
<!--              clearable-->
<!--              size="small"-->
<!--              @keyup.enter.native="handleQuery"-->
<!--            />-->
<!--          </el-form-item>-->
<!--        </el-col>-->

<!--        <el-col :span="6">-->
<!--          <el-form-item label="shipment_no" prop="shipmentNo" label-width="100px">-->
<!--            <el-input-->
<!--              v-model="queryParams.shipmentNo"-->
<!--              placeholder="请输入shipment_no"-->
<!--              clearable-->
<!--              size="small"-->
<!--              @keyup.enter.native="handleQuery"-->
<!--            />-->
<!--          </el-form-item>-->
<!--        </el-col>-->

<!--        <el-col :span="6">-->
<!--          <el-form-item label="车队名称" prop="fleetName">-->
<!--            <el-input-->
<!--              v-model="queryParams.fleetName"-->
<!--              placeholder="请输入车队名称"-->
<!--              clearable-->
<!--              size="small"-->
<!--              @keyup.enter.native="handleQuery"-->
<!--            />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->

      <!--      <el-form-item label="业务部门" prop="businessDepartment">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.businessDepartment"-->
      <!--          placeholder="请输入业务部门"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="业务时间" prop="businessDate">-->
      <!--        <el-date-picker clearable size="small" style="width: 200px"-->
      <!--          v-model="queryParams.businessDate"-->
      <!--          type="date"-->
      <!--          value-format="yyyy-MM-dd"-->
      <!--          placeholder="选择业务时间">-->
      <!--        </el-date-picker>-->
      <!--      </el-form-item>-->


      <!--      <el-form-item label="通知单车数" prop="carNumber">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.carNumber"-->
      <!--          placeholder="请输入通知单车数"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="录入人" prop="entryPerson">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.entryPerson"-->
      <!--          placeholder="请输入录入人"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="查询时间" prop="entryTime">
        <el-date-picker clearable size="small" style="width: 200px"
                        v-model="queryParams.stringTime"
                        placeholder="请输入查询时间"
                        type="date"
                        value-format="yyyy-MM-dd">
                        placeholder="选择录入时间">
        </el-date-picker>
      </el-form-item>


      <!--      <el-form-item label="修改人" prop="updatePerson">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.updatePerson"-->
      <!--          placeholder="请输入修改人"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->

      <!--      <el-form-item label="审核人" prop="reviewer">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.reviewer"-->
      <!--          placeholder="请输入审核人"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
<!--      <el-form-item label="审核日期" prop="reviewDate">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--                        v-model="queryParams.reviewDate"-->
<!--                        type="datetime"-->
<!--                        value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                        placeholder="选择审核日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->

      <!--      <el-form-item label="备注" prop="remarks">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.remarks"-->
      <!--          placeholder="请输入备注"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->

      <!--      <el-form-item label="执行" prop="status">-->
      <!--        <el-select v-model="queryParams.status" placeholder="请选择执行" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button type="info" icon="fa fa-print" v-print="'#allPrint'" size="mini" > 打印
        </el-button>
      </el-form-item>
    </el-form>

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['tax:management:add']"-->
<!--        >新增-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['tax:management:edit']"-->
<!--        >修改-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['tax:management:remove']"-->
<!--        >删除-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['tax:management:export']"-->
<!--        >导出-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <div id="allPrint">
      <div  align="center">
        <span style="font-size: 30px"  >{{this.queryParams.stringTime}}各区库存数据</span>
      </div>
    <div class="box-card" style="margin: 0 auto;font-size:18px;width:1000px;padding-left: 1px ;padding-top:50px">
    <el-table v-loading="loading" :data="managementList" @selection-change="handleSelectionChange"
              :header-cell-style="{background:'white',color:'black',border:'solid .5px black',fontSize:'16px',padding:'3 -3px',margin:'-3'}"
              :cell-style="{border:'solid .5px black',fontSize:'18px',padding:'12px 0',color:'black'}"
              style="border-right: solid 2px black;border-left: solid 2px black;border-top: solid 1px black;border-bottom: solid 2px black">

      <!-- <el-table-column label="主键" align="center" prop="id"/>-->
      <el-table-column label="库存区域" align="center" prop="code"/>
      <el-table-column label="批号的数量" align="center" prop="batchNo"/>
      <el-table-column label="库存量" align="center" prop="sm"/>

    </el-table>
  </div>
    </div>

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
  import {listManagement, getManagement, delManagement, addManagement, updateManagement,listReportDate} from "@/api/tax/management";

  export default {
    name: "Inventorydata",
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
        // 司机食宿管理表格数据
        managementList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,

        // 查询参数
        queryParams: {
          batchNo:undefined,
          code:undefined,
          sm:undefined,
          stringTime:'',
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {}
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询司机食宿管理列表 */
      getList() {
        this.loading = true;
        listReportDate(this.queryParams).then(response => {
          this.managementList = response.data;
          // this.total = response.total;
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
          documentNo: undefined,
          businessDepartment: undefined,
          businessDate: undefined,
          shipmentNo: undefined,
          lotNo: undefined,
          carNumber: undefined,
          entryPerson: undefined,
          entryTime: undefined,
          fleetName: undefined,
          updatePerson: undefined,
          updateTime: undefined,
          reviewer: undefined,
          reviewDate: undefined,
          remarks: undefined,
          status: 0
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
        this.title = "添加司机食宿管理";
      },
      // /** 修改按钮操作 */
      // handleUpdate(row) {
      //   this.reset();
      //   const id = row.id || this.ids;
      //   this.$router.push({path: '/tax/managementDetail', query: {id: id}})
      //   this.title = "修改";
      //   // getManagement(id).then(response => {
      //   //   this.form = response.data;
      //   //   this.open = true;
      //   //   this.title = "修改司机食宿管理";
      //   // });
      //
      // },
      //
      // // 详情页跳转
      // handleDetail(row) {
      //   const id = row.id || this.ids
      //   // const data = this.router.find(el => el.messageType === row.messageType)
      //   // 调用 某页面 的初始化方法
      //   this.$router.push({path: '/tax/managementDetail', query: {id: id,flag:true}})
      // },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateManagement(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addManagement(this.form).then(response => {
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
        this.$confirm('是否确认删除司机食宿管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delManagement(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('tax/management/export', {
          ...this.queryParams
        }, `tax_management.xlsx`)
      }
    }
  };
</script>
